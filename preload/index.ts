import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer, contextBridge } from 'electron'
import { authIPC } from './auth'

/* 此处扩展暴露到渲染进程的api */
const api = {
    authIPC
}
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', { ipcRenderer })
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
}
