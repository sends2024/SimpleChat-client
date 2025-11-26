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
