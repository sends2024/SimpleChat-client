import { windowsManager } from '../windows'

class AuthService {
    constructor() {}
    authSuccess() {
        /*  登录成功后，关闭登录窗口，打开正常的应用窗口 */
        if (windowsManager.get('auth')) {
            windowsManager.close('auth')
            windowsManager.create('main')
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
