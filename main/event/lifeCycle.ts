import { app } from 'electron'
import { windowsManager } from '../windows'

export function registerAppLifecycle() {
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (!windowsManager.get('main')) {
            windowsManager.create('main')
        }
    })
}
