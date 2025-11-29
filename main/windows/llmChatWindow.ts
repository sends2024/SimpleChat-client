import { BrowserWindow } from 'electron'
import path from 'node:path'
import { RENDERER_DIST, VITE_DEV_SERVER_URL, VITE_PUBLIC } from '../config'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export function createLLMWindow() {
    const win = new BrowserWindow({
        icon: path.join(VITE_PUBLIC, 'icon.ico'),
        width: 480,
        height: 672,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(`${VITE_DEV_SERVER_URL}#/llm`)
    } else {
        win.loadFile(path.join(RENDERER_DIST, 'index.html'), { hash: '/llm' })
    }
    return win
}
