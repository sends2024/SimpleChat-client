import { http } from '../..'


const authToken = localStorage.getItem('authToken')
let channelID = 'test Channel ID'
const beforeTime = '2025-11-09T19:32:14Z'

type joinChannelPayload = { invite_code: string }

type channelsResponse = { 
    channels: Array<{
        channel_id: string;
        channel_name: string;
        is_owner: boolean;
    }>
}

type membersResponse = { 
    members: Array<{
        user_id: string;
        username: string;
        avatar_url: string;
    }>
}

type messagesResponse = { 
    messages: Array<{
        sender_id: string;
        content: string;
        sent_at: string;
    }>
}

export const channelRequests = {
    joinChannelRequest: async (payload: joinChannelPayload) => {
        return await http.post<null>('/users/login', {
            invite_code: payload.invite_code
        }, {
            headers: {
                Authorization: authToken,
            }
        })
    },

    leaveChannelRequest: async (payload: null) => {
        return await http.post<null>(`/api/channels/${channelID}/leave`, {}, {
            headers: {
                Authorization: authToken
            }
        })
    },

    getChannelsRequest: async () => {
        return await http.get<channelsResponse>('/api/channels/list', {
            headers: {
                Authorization: authToken
            }
        })
    },

    getMembersRequest: async () => {
        return await http.get<membersResponse>(`/api/channels/${channelID}/members`, {
            headers: {
                Authorization: authToken
            }
        })
    },

    getMessagesRequest: async () => {
        return await http.get<membersResponse>(`/api/channels/${channelID}/history?before=${beforeTime}`, {
            headers: {
                Authorization: authToken
            }
        })
    },
}
