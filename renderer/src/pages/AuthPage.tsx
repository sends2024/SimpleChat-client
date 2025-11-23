import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { Button } from 'antd'
export default function LoginPage() {
    const authStore = useAuthStore()
    const handleLogin = async () => {
        const res = await authStore.login({ userName: 'nwzxx', password: '1239' })
        if (res) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }
    const handleRegister = async () => {
        if (
            await authStore.register({
                userName: 'nwzxx',
                password: '1239',
                email: '123@gmail.com'
            })
        ) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }

    useEffect(() => {}, [])

    return (
        <>
            <Button onClick={handleLogin}>登录</Button>
            <Button onClick={handleRegister}>注册</Button>
        </>
    )
}
