import {
    AdminChannelRequest,
    channelRequests,
    createWebSocketService,
    WebSocketService
} from '@/api'
import { ChannelSchema, MessageSchema, UsersInfoSchema } from '@/models'
import { create } from 'zustand'

type ChannelState = {
    id: string
    channel: ChannelSchema
    wsInfo: WebSocketService
    history: MessageSchema[]
    usersInfo: UsersInfoSchema[]
    pushNewMsg: (msgs: MessageSchema[]) => void
    disband: () => void
    banMember: (memberID: string) => void
    getInviteCode: () => void
    updateChannelName: (newName: string) => void
    getHistory: (beforeTime: string) => Promise<MessageSchema[]>
    getAllUsers: () => Promise<Array<{ user_id: string; username: string; avatar_url: string }>>
}
export const useChannelStoreFactory = (
    id: string,
    wsInfo: { uid: string; cid: string; token: string; username: string },
    channelInfo: ChannelSchema
) => {
    return create<ChannelState>((set, get) => ({
        id: id,
        channel: channelInfo,
        wsInfo: createWebSocketService(wsInfo),
        history: [],
        usersInfo: [],
        async disband() {
            if (channelInfo.isOwner) {
                await AdminChannelRequest.deleteChannelRequest(get().channel.channelID)
            }
        },
        async banMember(memberID: string) {
            if (channelInfo.isOwner) {
                await AdminChannelRequest.deleteMemberRequest(get().channel.channelID, memberID)
            }
        },
        async getInviteCode() {
            if (channelInfo.isOwner) {
                return await AdminChannelRequest.getInviteCodeRequest(get().channel.channelID)
            }
        },
        async updateChannelName(newName: string) {
            if (channelInfo.isOwner) {
                await AdminChannelRequest.changeChannelNameRequest(newName, get().channel.channelID)
            }
        },
        async getHistory(beforeTime: string) {
            const res = await channelRequests.getMessagesRequest(
                get().channel.channelID,
                beforeTime
            )

            set((state) => ({
                history: [...res.messages, ...state.history]
            }))
            return res.messages
        },
        async getAllUsers() {
            const res = await channelRequests.getMembersRequest(get().channel.channelID)

            set(() => ({
                usersInfo: res.members
            }))

            return res.members
        },
        pushNewMsg(msgs: MessageSchema[]) {
            set((state) => ({
                history: [...state.history, ...msgs]
            }))
        }
    }))
}
