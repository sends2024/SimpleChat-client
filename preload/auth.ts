import { ipcRenderer } from 'electron'
type succeededAuthPayload = {
    userName: string
    avatarURL: string
    email: string
    password?: string
}

let authInitCb: any = null
let pendingPayload: any = null
let rendererReady = false
/* 由于框架问题，导致注册钩子常在接收信息后触发注册，因而使用的缓存机制 */
ipcRenderer.on('auth:init', (_event, payload) => {
    if (!rendererReady) {
        pendingPayload = payload
        return
    }

    authInitCb?.(payload)
})
export const authIPC = {
    succeededAuth(payload: succeededAuthPayload) {
        ipcRenderer.send('auth:succeededAuth', payload)
    },
    logout() {
        ipcRenderer.send('auth:logout')
    },
    /* 注册回调函数，使用缓存 */
    init(callback: (payload) => void) {
        rendererReady = true
        authInitCb = callback
        if (pendingPayload) {
            callback(pendingPayload)
            pendingPayload = null
        }
    }
}
