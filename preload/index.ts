import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer, contextBridge } from 'electron'
import { authIPC } from './auth'
import { windowIPC } from './window'

/* 此处扩展暴露到渲染进程的api */
const api = {
    authIPC,
    windowIPC
}
/* 此处为环境变量，详细读取见主进程config */
const env = {
    serviceURL: process.env.SERVICE_URL,
    deepseekURL: process.env.DEEPSEEK_URL,
    deepseekAPIKEY: process.env.DEEPSEEK_APIKEY
}
console.log(env)
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
