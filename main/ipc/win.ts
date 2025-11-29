import { ipcMain } from 'electron'
import { WindowKey, windowsManager } from '../windows'

export function registerWinHandler() {
    ipcMain.on('win:close', (_event, key: WindowKey) => {
        windowsManager.close(key)
    })
    ipcMain.on('win:minimize', (_event, key: WindowKey) => {
        windowsManager.minimize(key)
    })
    ipcMain.on('win:open', (_event, key: WindowKey) => {
        windowsManager.create(key)
    })
    ipcMain.on('win:exit', (_event) => {
        windowsManager.closeAll()
    })
}
