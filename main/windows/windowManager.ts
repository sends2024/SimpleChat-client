import { BrowserWindow } from 'electron'
import { createMainWindow } from './mainWindow'
import { createAuthWindow } from './authWindow'

export type WindowKey = 'main' | 'auth'

export interface WindowCreator {
    key: WindowKey
    create: () => BrowserWindow
}
const windowCreators: Record<WindowKey, () => BrowserWindow> = {
    main: createMainWindow,
    auth: createAuthWindow
}
class WindowsManager {
    private windows = new Map<WindowKey, BrowserWindow>()
    create(key: WindowKey): BrowserWindow {
        if (this.windows.has(key)) {
            const existing = this.windows.get(key)!
            if (!existing.isDestroyed()) {
                existing.focus()
                return existing
            }
        }

        const creator = windowCreators[key]
        if (!creator) {
            throw new Error(`Unknown window key: ${key}`)
        }

        const win = creator()
        this.windows.set(key, win)

        win.on('closed', () => {
            this.windows.delete(key)
        })

        return win
    }

    get(key: WindowKey): BrowserWindow | undefined {
        return this.windows.get(key)
    }

    close(key: WindowKey): void {
        const win = this.windows.get(key)
        if (win && !win.isDestroyed()) win.close()
    }

    closeAll(): void {
        for (const win of this.windows.values()) {
            if (!win.isDestroyed()) win.close()
        }
        this.windows.clear()
    }

    getAllKeys(): WindowKey[] {
        return [...this.windows.keys()]
    }
}
export const windowsManager = new WindowsManager()
