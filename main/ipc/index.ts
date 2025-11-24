import { registerAuthHandler } from './auth'
import { registerWinHandler } from './win'

export function registerAppHandlers() {
    registerAuthHandler()
    registerWinHandler()
}
