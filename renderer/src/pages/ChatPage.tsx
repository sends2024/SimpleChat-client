import { ChannelSchema } from '@/models'

type ChatPageProps = {
    channel: ChannelSchema
}
export function ChatPage({ channel }: ChatPageProps) {
    return <>{channel}</>
}
