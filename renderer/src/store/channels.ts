import { channelRequests } from '@/api'
import { ChannelSchema } from '@/models'
import { create } from 'zustand'
type ChannelsStore = {
    channels: ChannelSchema[]
    getAllChannels: () => Promise<ChannelSchema[]>
}
export const useChannelsStore = create<ChannelsStore>((set, get) => ({
    channels: [] as ChannelSchema[],
    async getAllChannels() {
        const res = await channelRequests.getAllChannelsRequest()

        const channels = res.channels.map((channel) => ({
            channelID: channel.channel_id,
            channelName: channel.channel_name,
            isOwner: channel.is_owner
        }))
        set({ channels })
        return channels
    }
}))
