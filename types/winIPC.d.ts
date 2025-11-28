export default interface windowIPC {
    close: (key: string) => void
    minimize: (key: string) => void
}
