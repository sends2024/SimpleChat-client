import { Layout, Button, Avatar, Dropdown, message, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/store';
import { useChannelsStore } from '@/store/channels';
import Sidebar from '@/components/CommonLayout/Sidebar';


const userMenuItems: MenuProps['items'] = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Profile',
    },
    {
        key: '2',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
    {
        type: 'divider',
    },
    {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
    },
    {
        type: 'divider',
    },
    {
        key: 'exit',
        icon: <PoweroffOutlined />,
        label: 'Exit',
    },
];


export function CommonLayout() {
    
    const authStore = useAuthStore()
    const channelStore = useChannelsStore()

    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
        authStore.logout();
    }

    if (key === 'exit') {
        authStore.logout();
        window.api.windowIPC.exit();
    }
};

    return (
        <>
            <Layout hasSider className="w-full h-full">
                <Sidebar
                    collapsed={collapsed}
                />
                <Layout>
                    <Header
                        style={{
                            background: '#fff',
                            padding: 0,
                        }}
                        className="drag-region flex items-center border-b"
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="!w-13 h-16"
                        />
                        <span className="text-lg font-semibold">{channelStore.currentChannel?.channelName}</span>
                        <div className="ml-auto pr-4 mr-6">
                            <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} placement="bottomRight">
                                <div className="flex items-center cursor-pointer">
                                    <Avatar icon={<UserOutlined />} className="mr-2" />
                                    {!collapsed && <span className="font-medium">{authStore.user.username}</span>}
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
