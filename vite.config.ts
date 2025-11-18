import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
    root: path.join(__dirname, 'renderer'),
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'renderer/src')
        }
    },
    plugins: [
        react(),
        electron({
            main: {
                // Shortcut of `build.lib.entry`.
                entry: path.join(__dirname, 'main/index.ts'),
                vite: {
                    build: {
                        outDir: path.join(__dirname, 'dev-build'),
                        emptyOutDir: true,
                        rollupOptions: {
                            input: path.join(__dirname, 'main/index.ts'),
                            output: {
                                entryFileNames: 'main.mjs'
                            }
                        }
                    }
                }
            },
            preload: {
                input: path.join(__dirname, 'preload/index.ts'),
                vite: {
                    build: {
                        outDir: path.join(__dirname, 'dev-build'),
                        emptyOutDir: false,
                        rollupOptions: {
                            input: path.join(__dirname, 'preload/index.ts'),
                            output: {
                                entryFileNames: 'preload.mjs'
                            }
                        }
                    }
                }
            },
            renderer:
                process.env.NODE_ENV === 'test'
                    ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
                      undefined
                    : {}
        }),
        UnoCSS()
    ],
    build: {
        outDir: path.join(__dirname, 'dist'),
        emptyOutDir: true
    }
})
