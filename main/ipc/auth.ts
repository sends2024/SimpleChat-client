import { ipcMain } from 'electron'
import { authService } from '../services'

export function registerAuthHandler() {
    ipcMain.on('auth:succeededAuth', (_event, payload) => {
        authService.authSuccess(payload)
    })
    ipcMain.on('auth:logout', () => {
        console.log('logout')
        authService.logout()
    })
}
