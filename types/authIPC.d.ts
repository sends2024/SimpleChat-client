type succeededAuthPayload = {
    userName: string
    avatarURL: string
    email: string
    password?: string
}
export default interface authIPC {
    succeededAuth: (payload: succeededAuthPayload) => void
    logout: () => void
    init: (callback) => void
}
