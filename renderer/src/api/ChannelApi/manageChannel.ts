import { http } from '../'

const authToken = localStorage.getItem('authToken')
let channelID = 'test Channel ID'
let memberID = 'test member ID'

type createChannelPayload = { channel_name: string }
type createChannelResponse = { channel_id: string; channel_name: string; is_owner: boolean }

type getInviteCodeResponse = { invite_code: string } 

type changeChannelNamePayload = { new_name: string }


export const profileRequest = {
    createChannelRequest: async (payload: createChannelPayload) => {
        return await http.pat<createChannelResponse>('/api/channel/create', {
            channel_name: payload.channel_name
        }, {
            headers: {
                Authorization: authToken
            }
        })
    },

    deleteChannelRequest: async () => {
        return await http.delete<null>(
            `/api/channel/${channelID}`,
            {
                headers: {
                    Authorization: authToken
                }
            }
        )
    },

    deleteMemberRequest: async () => {
        return await http.delete<null>(
            `/api/channel/${channelID}/member/${memberID}`,
            {
                headers: {
                    Authorization: authToken
                }
            }
        )
    },

    getInviteCodeRequest: async() => {
        return await http.get<getInviteCodeResponse>(
            `/api/channel/${channelID}/invite`,
            {
                headers: {
                    Authorization: authToken
                }
            }
        )
    },

    changeChannelNameRequest: async (payload: changeChannelNamePayload) => {
        return await http.pat<null>(`/api/channel/${channelID}`, {
            new_name: payload.new_name,
        }, {
            headers: {
                Authorization: authToken
            }
        })
    },
}
