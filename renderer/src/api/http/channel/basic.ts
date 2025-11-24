import { http } from '../..'

type joinChannelPayload = { invite_code: string }

type channelsResponse = {
    channels: Array<{
        channel_id: string
        channel_name: string
        is_owner: boolean
    }>
}

type membersResponse = {
    members: Array<{
        user_id: string
        username: string
        avatar_url: string
    }>
}

type messagesResponse = {
    messages: Array<{
        sender_id: string
        content: string
        sent_at: string
    }>
    cursor: string
}

export const channelRequests = {
    joinChannelRequest: async (payload: joinChannelPayload) => {
        return await http.post<null>('/users/login', {
            invite_code: payload.invite_code
        })
    },

    leaveChannelRequest: async (channelID: string) => {
        return await http.post<null>(`/api/channels/${channelID}/leave`, {})
    },

    getChannelsRequest: async () => {
        return await http.get<channelsResponse>('/api/channels/list', {})
    },

    getMembersRequest: async (channelID: string) => {
        return await http.get<membersResponse>(`/api/channels/${channelID}/members`, {})
    },

    getMessagesRequest: async (channelID: string, beforeTime: string) => {
        return await http.get<messagesResponse>(`/api/channels/${channelID}/history`, {
            params: {
                before: beforeTime
            }
        })
    }
}
