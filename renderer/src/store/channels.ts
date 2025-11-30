import { channelRequests } from '@/api'
import type { ChannelSchema } from '@/models'
import { log } from 'console'
import { create } from 'zustand'
type ChannelsStore = {
    channels: ChannelSchema[]
    currentChannel ?: ChannelSchema | null
    setCurrentChannel: (channelID: string, channelName: string, isOwner: boolean) => Promise<void>
    getAllChannels: () => Promise<ChannelSchema[]>
}
export const useChannelsStore = create<ChannelsStore>((set, get) => ({
    channels: [] as ChannelSchema[],
    currentChannel: null,
    async setCurrentChannel(channelID: string, channelName: string, isOwner: boolean) {
        const newChannel: ChannelSchema = {
            channelID,
            channelName,
            isOwner
        }
        
        set({ currentChannel: newChannel })
    },
    async getAllChannels() {
        if (localStorage.getItem('authToken')) {
            const res = await channelRequests.getAllChannelsRequest()

            const allChannels = res.channels.map((channel) => ({
                channelID: channel.channel_id,
                channelName: channel.channel_name,
                isOwner: channel.is_owner
            }))

            set({ channels: allChannels })
            
            return allChannels
        }
        
        return []
    }
}))
