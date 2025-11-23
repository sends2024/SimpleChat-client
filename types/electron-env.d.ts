/// <reference types="vite-plugin-electron/electron-env" />
import authIPC from './authIPC'
declare namespace NodeJS {
    interface ProcessEnv {
        APP_ROOT: string
        VITE_PUBLIC: string
    }
}

declare global {
    //用于暴露preload部分的ipc给渲染进程
    interface Window {
        electron: typeof import('@electron-toolkit/preload').electronAPI
        api: {
            authIPC: authIPC
        }
        env: {
            httpURL
        }
    }
}
