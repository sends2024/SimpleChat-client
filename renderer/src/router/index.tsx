import { createHashRouter, Navigate } from 'react-router'
import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'
import { CommonLayout } from '@/pages/CommonLayout'
import { useChannelsStore } from '@/store/channels'
import { ChatPage } from '@/pages/ChatPage'
import { LLMChatPage } from '@/pages/LLMChatPage'
import { ChannelSchema } from '@/models'

const channels = /* (await useChannelsStore.getState().getAllChannels()) ||  */[] as ChannelSchema[]
const dynamicChildren = channels.map((channel) => ({
    path: channel.channelID,
    name: `channel_${channel.channelID}`,
    Component: () => <ChatPage channel={channel} />
})) 
const route = [
    {
        name: 'index',
        path: '/',
        Component: () => <Navigate to="/layout" replace />
    },
    {
        name: 'auth',
        path: '/auth',
        Component: AuthPage
    },
    {
        name: 'LLM',
        path: '/llm',
        Component: LLMChatPage
    },
    {
        path: '/layout',
        Component: CommonLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'home',
                Component: HomePage
            },
            ...dynamicChildren
        ]
    }
]
const router = createHashRouter(route)
export default router
