import { ChannelSchema } from '@/models'
import { create } from 'zustand'
type ChannelsStore = {
    channels: ChannelSchema[]
    getAllChannels: () => ChannelSchema[]
}
export const useChannelsStore = create<ChannelsStore>((set, get) => ({
    channels: [] as ChannelSchema[],
    getAllChannels() {
        return []
    }
}))
