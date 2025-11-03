import { BrowserWindow } from 'electron'
import path from 'node:path'
import { RENDERER_DIST, VITE_DEV_SERVER_URL, VITE_PUBLIC } from '../config'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export function createMainWindow() {
    const win = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs')
        }
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
    return win
}
