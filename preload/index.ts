import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer, contextBridge } from 'electron'
import { authIPC } from './auth'

/* 此处扩展暴露到渲染进程的api */
const api = {
    authIPC
}
/* 此处为环境变量 */
const env = {
    httpURL: process.env.HTTP_SERVICE_URL
}
/* 暴露方法给渲染进程 */
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', { ipcRenderer })
        contextBridge.exposeInMainWorld('api', api)
        contextBridge.exposeInMainWorld('env', env)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
    window.env = env
}
