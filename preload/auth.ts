import { ipcRenderer } from 'electron'

export const authIPC = {
    succeededAuth() {
        ipcRenderer.send('auth:succeededAuth')
    },
    logout() {
        ipcRenderer.send('auth:logout')
    }
}
