/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

interface Window {
  electron: typeof import("@electron-toolkit/preload").electronAPI;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  api: {};
}
