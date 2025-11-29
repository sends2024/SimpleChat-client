import React, { useState, useEffect } from 'react'
import { Layout, Menu, theme, message as antdMessage } from 'antd'
import type { MenuProps } from 'antd'
import { PlusOutlined, UnorderedListOutlined, InfoCircleOutlined, RobotOutlined } from '@ant-design/icons'

import ChannelModal from '../ModalComp/ChannelModal'
import { useChannelsStore } from '@/store/channels'
import { log } from 'console'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}

interface SidebarProps {
    collapsed: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const {
        token: { colorBgContainer }
    } = theme.useToken() // Focus 更变时可以用


    const authToken = localStorage.getItem('authToken') || null

    const [messageApi, contextHolder] = antdMessage.useMessage()

    const channelStore = useChannelsStore()
    const channels = channelStore.channels

    const [channelNames, setChannelNames] = useState<{ [key: string]: string }>({})
    const [selectedKey, setSelectedKey] = useState<string>('')

    const [modalState, setModalState] = useState(false)





    useEffect(() => {
        async function fetchChannels() {
            if (!authToken) {
                setChannelNames({})
                setSelectedKey('')
                return
            }

            try {
                channelStore.getAllChannels()

                const map: { [key: string]: string } = {}
                channels.forEach((ch) => (map[ch.channelID] = ch.channelName))
                setChannelNames(map)

                setSelectedKey('')
            } catch (error) {
                console.error('获取频道列表失败:', error);
                setChannelNames({});
                setSelectedKey('');
                messageApi.error('获取频道列表失败');
            }
        }

        fetchChannels()
    }, [channels, authToken])

    const handleAddChannel = () => {
        if (!authToken) {
            messageApi.error('请先登录以添加频道')
            return
        }
        setModalState(true)
    }



    const openAiChat = async () => {
        const APP_PATH = 'C:\\Users\\32316\\AppData\\Local\\Programs\\xiao-you-chat\\xiao-you-chat.exe';
        try {
            const { spawn } = await import('child_process');
            spawn(APP_PATH, [], {
                detached: true,
                stdio: 'ignore' as const
            });

            console.log('应用程序启动成功');
        } catch (error) {
            console.error('启动应用程序失败:', error);
        }
    };




    const handleChannelClick = (key: string) => {
        console.log(key, channelNames[key]);
        
        setSelectedKey(key)
        channelStore.setCurrentChannel(key, channelNames[key], channels.find(ch => ch.channelID === key)?.isOwner || false)
    }

    const channelListItems: MenuItem[] =
        channels.length > 0
            ? channels.map((channels) => getItem(channelNames[channels.channelID] ?? '未知频道', channels.channelID))
            : [getItem('未加入任何频道', 'empty')]

    const children = {
        sidebarHeader: (
            <div className="p-4 flex items-center justify-center h-16">
                {!collapsed ? (
                    <h1 className="text-xl font-bold">SimpleChat</h1>
                ) : (
                    <div className="text-xl font-bold">SC</div>
                )}
            </div>
        ),

        aiChannel: (
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[]}
                onClick={({ key }) => {
                    if (key === 'ai-channel') openAiChat();
                }}
                className="border-r-0"
                items={[
                    {
                        key: 'ai-channel',
                        icon: <RobotOutlined />,
                        label: 'AI 助手',
                    },
                ]}
            />
        ),

        addChannel: (
            <Menu
                theme="light"
                mode="inline"
                selectedKeys={[]}
                onClick={({ key }) => {
                    if (key === 'add-channel') handleAddChannel();
                }}
                className="border-r-0"
                items={[
                    {
                        key: 'add-channel',
                        icon: <PlusOutlined />,
                        label: '添加频道',
                    },
                ]}
            />
        ),

        channelList: (
            <div className="channel-list flex-1 h-2/3 min-h-0">
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    onClick={({ key }) => {
                        if (key !== 'empty' && key !== 'add-channel') {
                            handleChannelClick(key);
                        }
                    }}
                    className="border-r-0"
                    items={[
                        getItem(
                            '频道列表',
                            'channels',
                            <UnorderedListOutlined />,
                            channelListItems,
                        ),
                    ]}
                />
            </div>
        ),

        aboutWe: (
            <div className="border-t shrink-0">
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[]}
                    onClick={({ key }) => {
                        if (key === '3') console.log('点击关于我们')
                    }}
                    className="border-r-0"
                    items={[
                        {
                            key: '3',
                            icon: <InfoCircleOutlined />,
                            label: '关于我们'
                        }
                    ]}
                />
            </div>
        )
    }

    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={250}
                style={{ background: colorBgContainer }}
                className="flex flex-col h-full border-r border-gray-200"
            >
                {children.sidebarHeader}

                {children.aiChannel}

                {children.addChannel}

                {children.channelList}

                {children.aboutWe}
            </Sider>

            {contextHolder}
            {/* channelModal */}
            <ChannelModal
                authToken={authToken}
                modalState={modalState}
                setModalState={setModalState}
            />
        </>
    )
}
