import { createRequire } from 'node:module'
import path from 'node:path'
// 此处require为导入不支持esm导入的包时所用
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const require = createRequire(import.meta.url)
process.env.APP_ROOT = path.join(__dirname, '..')
export const APP_ROOT = process.env.APP_ROOT
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dev-build')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST

export const VITE_PUBLIC = process.env.VITE_PUBLIC
