import { useAuthStore } from '@/store'
import { Form, Tabs, Button, Input, Checkbox } from 'antd'
import { useState } from 'react'
type loginFieldType = {
    username?: string
    password?: string
    remember?: string
}
type registerFieldType = {
    userName?: string
    password?: string
    confirmPassword?: string
    email?: string
}
export default function AuthForm() {
    const [tab, setTab] = useState<'login' | 'register'>('login')
    const authStore = useAuthStore()

    const handleTabChange = (key: string) => {
        if (key === 'login' || key === 'register') {
            setTab(key)
        }
    }

    const handleLogin = async (payload: { username: string; password: string }) => {
        console.log(payload)
        const res = await authStore.login({
            username: payload.username,
            password: payload.password
        })

        if (res) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }
    const handleRegister = async (payload: {
        username: string
        password: string
        email: string
    }) => {
        if (
            await authStore.register({
                username: payload.username,
                password: payload.password,
                email: payload.email
            })
        ) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }

    const items = [
        {
            key: 'login',
            label: '登录',
            children: (
                <Form onFinish={handleLogin} layout="vertical" autoComplete="off">
                    <Form.Item<loginFieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<loginFieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<loginFieldType> label={null} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item className="flex flex-col items-center">
                        <Button htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            )
        },
        {
            key: 'register',
            label: '注册',
            children: (
                <Form
                    onFinish={handleRegister}
                    layout="vertical"
                    autoComplete="off"
                    /* 缩小表单元素外边距，默认为8 */
                    className="[&_.ant-form-item]:mb-2"
                >
                    <Form.Item<registerFieldType>
                        label="用户名"
                        name="userName"
                        rules={[{ required: true, message: '用户名为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<registerFieldType>
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: '邮箱为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<registerFieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<registerFieldType>
                        label="确认密码"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: '请确认你的密码!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'))
                                }
                            })
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item className="flex flex-col items-center">
                        <Button htmlType="submit">注册</Button>
                    </Form.Item>
                </Form>
            )
        }
    ]

    return (
        <>
            <Tabs
                className="no-drag"
                activeKey={tab}
                onChange={handleTabChange}
                centered
                items={items}
            />
        </>
    )
}
