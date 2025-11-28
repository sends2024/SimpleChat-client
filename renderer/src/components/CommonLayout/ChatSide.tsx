import React, { useState, useEffect, useMemo } from 'react';
import { Button, message as antdMessage } from 'antd';

import { parseJWT } from '@/utils'
import { useChannelStoreFactory } from '@/store'
import { ChannelSchema, UserSchema } from '@/models'
import MessageBubble from '../ChatPage/MessageBubble';


interface ChatPageProps {
    authToken: string
    userInfo: UserSchema
    channelInfo: ChannelSchema
}

export default function ChatSide({
    authToken,
    userInfo,
    channelInfo
}: ChatPageProps) {
    const DEFAULT_USERNAME = '用户';

    const currentUserId = parseJWT(authToken).user_id
    const { username } = userInfo
    const { channelID, channelName } = channelInfo;

    const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected'>('disconnected');
    const [message, setMessage] = useState('');

    const isDefault = !channelID;

    const channelStoreFactory = useChannelStoreFactory(
        channelID,
        {
            uid: currentUserId,
            cid: channelID,
            token: authToken,
            username: username
        },
        channelInfo,
    )

    const history = channelStoreFactory(state => state.history)
    const usersInfo = channelStoreFactory(state => state.usersInfo)


    useEffect(() => {
        if (!authToken) {
            antdMessage.error('请先登入')
            return;
        }

        const loadChannel = async () => {
            if (!channelID || !authToken) return;

            try {
                // 初始化
                channelStoreFactory(state => state.getAllUsers())
                channelStoreFactory(state => state.getHistory())

                channelStoreFactory(state => state.wsInfo) // 连接 ws
                setConnectionStatus('connected');

            } catch (error) {
                console.error('加载频道失败:', error);
                antdMessage.error('加载频道失败: ' + (error as any).message);
                setConnectionStatus('disconnected');
            }
        };

        if (channelID) {
            loadChannel();
        } else {
            channelStoreFactory(state => state.wsInfo.close)
        }

        return () => {
            channelStoreFactory(state => state.wsInfo.close)
        };
    }, [channelID, authToken]);


    const handleSendMessage = () => {
        if (!message.trim()) {
            antdMessage.warning('消息不能为空');
            return;
        }
    }

    const parseUsersMap = useMemo(() => {
        return Object.fromEntries(usersInfo.map(u => [u.user_id, u]));
    }, [usersInfo]);

    return (
        <div className="relative w-full h-full">
            {isDefault ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-2xl font-bold mb-4">欢迎使用 SimpleChat</h1>
                    <p className="text-gray-600">请选择频道以开始交流。</p>
                </div>
            ) : (
                <>
                    <div className="absolute top-0 left-0 w-full h-[75%] overflow-auto p-4 flex flex-col gap-2">
                        {history.map((msg) => {
                            const user = parseUsersMap[msg.sender_id]
                            return (
                                <MessageBubble
                                    key={`${user ? user.username : msg.sender_id}-${msg.sent_at}`}
                                    username={user ? user.username : DEFAULT_USERNAME}
                                    avatarUrl={user ? user.avatar_url : ""}
                                    message={msg.content}
                                    isSelf={msg.sender_id === currentUserId}
                                />
                            )
                        })}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-[25%] z-0 !pb-0 flex flex-col">
                        <div className="h-full">
                            <div className="py-4 bg-gray-100 rounded-md">
                                <textarea
                                    className="w-full h-20 resize-none px-7 text-base outline-none border-none bg-gray-100"
                                    placeholder={`在「${channelName}」中输入消息...`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex justify-end !pt-2 bg-white">
                                <Button
                                    type="primary"
                                    className="!px-6 !py-1.5"
                                    onClick={handleSendMessage}
                                    disabled={!message.trim() || connectionStatus !== 'connected'}
                                    loading={connectionStatus === 'disconnected'}
                                >
                                    {connectionStatus === 'connected' ? '发送' : '未连接'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
