import { ipcMain } from 'electron'
import { authService } from '../services'

export function registerAuthHandler() {
    ipcMain.on('auth:succeededAuth', () => {
        console.log('succeededAuth')
        authService.authSuccess()
    })
    ipcMain.on('auth:logout', () => {
        console.log('logout')
        authService.logout()
    })
}
