import { useAuthStore } from '@/store'
import { Form, Tabs, Button } from 'antd'
import { useState } from 'react'
export default function AuthForm() {
    const [tab, setTab] = useState<'login' | 'register'>('login')
    const authStore = useAuthStore()
    const user = authStore.user

    const handleTabChange = () => {
        if (tab === 'login') {
            setTab('register')
        } else {
            setTab('login')
        }
    }

    const handleLogin = async () => {
        const res = await authStore.login({ userName: user.userName, password: user.password })
        if (res) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }

    return (
        <>
            <Tabs activeKey={tab} onChange={handleTabChange} centered>
                <Tabs.TabPane tab="登录" key="login">
                    <Form onFinish={handleLogin} layout="vertical">
                        {/* 显示登录错误信息 */}
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="注册" key="register">
                    <Form></Form>
                </Tabs.TabPane>
            </Tabs>
        </>
    )
}
