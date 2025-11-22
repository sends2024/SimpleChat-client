import { app } from 'electron'
import { registerAppLifecycle } from './event'
import { registerAppHandlers } from './ipc'

app.whenReady().then(async () => {
    registerAppLifecycle()
    registerAppHandlers()
})
