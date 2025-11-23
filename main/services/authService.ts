import { windowsManager } from '../windows'

class AuthService {
    constructor() {}
    authSuccess(payload: any) {
        /*  登录成功后，关闭登录窗口，打开正常的应用窗口,待加载完毕时发送事件 */
        if (windowsManager.get('auth')) {
            windowsManager.close('auth')
            const mainWin = windowsManager.create('main')
            mainWin.webContents.once('did-finish-load', () => {
                mainWin.webContents.send('auth:init', payload)
            })
        }
    }
    /* 退出登录后，返回登录页面 */
    logout() {
        if (windowsManager.get('main')) {
            windowsManager.close('main')
            windowsManager.create('auth')
        }
    }
}
export const authService = new AuthService()
