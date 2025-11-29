import { http } from '../..'

type createChannelPayload = { channel_name: string }

type createChannelResponse = { channel_id: string; channel_name: string; is_owner: boolean }

type getInviteCodeResponse = { invite_code: string }

export const AdminChannelRequest = {
    createChannelRequest: async (payload: createChannelPayload) => {
        return await http.patch<createChannelResponse>('/channel/create', {
            channel_name: payload.channel_name
        })
    },

    deleteChannelRequest: async (channelID: string) => {
        return await http.delete<null>(`/channel/${channelID}`)
    },

    deleteMemberRequest: async (channelID: string, memberID: string) => {
        return await http.delete<null>(`/channel/${channelID}/member/${memberID}`)
    },

    getInviteCodeRequest: async (channelID: string) => {
        return await http.get<getInviteCodeResponse>(`/channel/${channelID}/invite`)
    },

    changeChannelNameRequest: async (newName: string, channelID: string) => {
        return await http.patch<null>(`/channel/${channelID}`, {
            new_name: newName
        })
    }
}
