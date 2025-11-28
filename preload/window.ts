import { ipcRenderer } from 'electron'

export const windowIPC = {
    close: (key: string) => {
        ipcRenderer.send('win:close', key)
    },
    minimize: (key: string) => {
        ipcRenderer.send('win:minimize', key)
    }
}
