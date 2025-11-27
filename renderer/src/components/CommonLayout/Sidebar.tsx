import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, message as antdMessage } from 'antd';
import type { MenuProps } from 'antd';
import {
    PlusOutlined,
    UnorderedListOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';





// TODO: 修到一半, 丢着不用管, 让我完工


const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

interface SidebarProps {
    collapsed: boolean;
    onChannelChange?: (channel: { channelId: string; channelName: string }) => void;
    currentUserId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onChannelChange, currentUserId }) => {


    const {
        token: { colorBgContainer },
    } = theme.useToken(); // Focus 更变时可以用

    const [messageApi, contextHolder] = antdMessage.useMessage();

    const [channels, setChannels] = useState<string[]>([]);
    const [channelNames, setChannelNames] = useState<{ [key: string]: string }>({});
    const [selectedKey, setSelectedKey] = useState<string>('');

    useEffect(() => {
        async function fetchChannels() {
            if (!currentUserId) {
                setChannels([]);
                setChannelNames({});
                setSelectedKey('');
                return;
            }

            try {
                setLoading(true);
                const { data } = await channelApi.getUserChannels(currentUserId);
                console.log(data);

                setChannels(data.map((ch) => ch.channelId));

                const map: { [key: string]: string } = {};
                data.forEach((ch) => (map[ch.channelId] = ch.channelName));
                setChannelNames(map);

                setSelectedKey('');
            } catch (error) {
                console.error('获取频道列表失败:', error);
                setChannels([]);
                setChannelNames({});
                setSelectedKey('');
                messageApi.error('获取频道列表失败');
            } finally {
                setLoading(false);
            }
        }

        fetchChannels();
    }, [currentUserId]);

    const handleAddChannel = () => {
        if (!currentUserId) {
            messageApi.error('请先登录以添加频道');
            return;
        }
        setIsModalOpen(true);
    };


    const handleChannelClick = (key: string) => {
        setSelectedKey(key);
        onChannelChange?.({
            channelId: key,
            channelName: channelNames[key]
        });
    };

    const channelListItems: MenuItem[] =
        channels.length > 0
            ? channels.map((channelId) =>
                getItem(channelNames[channelId] ?? '未知频道', channelId),
            )
            : [getItem('未加入任何频道', 'empty')];


    const children = {
        aboutWe: (
            <div className="border-t shrink-0 mb-7">
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[]}
                    onClick={({ key }) => { if (key === '3') console.log('点击关于我们'); }}
                    className="border-r-0"
                    items={[
                        {
                            key: '3',
                            icon: <InfoCircleOutlined />,
                            label: '关于我们',
                        },
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
                <div className="p-4 flex items-center justify-center h-16">
                    {!collapsed ? (
                        <h1 className="text-xl font-bold">SimpleChat</h1>
                    ) : (
                        <div className="text-xl font-bold">SC</div>
                    )}
                </div>

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

                {children.aboutWe}

            </Sider>


            {contextHolder}
      // channelModal
        </>
    );
};

export default Sidebar;