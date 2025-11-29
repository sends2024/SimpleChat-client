export type ChannelSchema = {
    channelID: string
    channelName: string
    isOwner: boolean
}
export type MessageSchema = {
    sender_id: string
    content: string
    sent_at: string
}

export type UsersInfoSchema = {
    user_id: string
    username: string
    avatar_url: string
}