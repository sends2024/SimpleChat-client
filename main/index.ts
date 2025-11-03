import { app } from 'electron'
import { windowsManager } from './windows'
import { registerAppLifecycle } from './event'

app.whenReady().then(async () => {
    windowsManager.create('main')
    registerAppLifecycle()
})
