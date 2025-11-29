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
        return await http.post<null>('/channels/join', {
            invite_code: payload.invite_code
        })
    },

    leaveChannelRequest: async (channelID: string) => {
        return await http.post<null>(`/channels/${channelID}/leave`, {})
    },

    getAllChannelsRequest: async () => {
        return await http.get<channelsResponse>('/channels/list', {})
    },

    getMembersRequest: async (channelID: string) => {
        return await http.get<membersResponse>(`/channels/${channelID}/members`, {})
    },

    getMessagesRequest: async (channelID: string, beforeTime: string) => {
        return await http.get<messagesResponse>(`/channels/${channelID}/history`, {
            params: {
                before: beforeTime
            }
        })
    }
}
