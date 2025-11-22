import { app } from 'electron'
import { windowsManager } from '../windows'

export function registerAppLifecycle() {
    /* 先打开鉴权/登录窗口 */
    windowsManager.create('auth')
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}
