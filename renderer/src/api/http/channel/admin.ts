import { http } from '../..'


type createChannelPayload = { channel_name: string }

type createChannelResponse = { channel_id: string; channel_name: string; is_owner: boolean }

type getInviteCodeResponse = { invite_code: string }

type changeChannelNamePayload = { new_name: string }

export const AdminChannelRequest = {
    createChannelRequest: async (payload: createChannelPayload) => {
        return await http.patch<createChannelResponse>('/api/channel/create', {
            channel_name: payload.channel_name
        })
    },

    deleteChannelRequest: async (channelID: string) => {
        return await http.delete<null>(`/api/channel/${channelID}`)
    },

    deleteMemberRequest: async (channelID: string,memberID: string) => {
        return await http.delete<null>(`/api/channel/${channelID}/member/${memberID}`)
    },

    getInviteCodeRequest: async (channelID:string) => {
        return await http.get<getInviteCodeResponse>(`/api/channel/${channelID}/invite`)
    },

    changeChannelNameRequest: async (payload: changeChannelNamePayload, channelID: string) => {
        return await http.patch<null>(`/api/channel/${channelID}`, {
            new_name: payload.new_name
        })
    }
}
