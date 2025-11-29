export default interface windowIPC {
    close: (key: string) => void
    minimize: (key: string) => void
    open: (key: string) => void
    exit: () => void
}
