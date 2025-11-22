import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { Button } from 'antd'
export default function LoginPage() {
    const authStore = useAuthStore()
    const handleLogin = async () => {
        if (await authStore.login({ userName: '1', password: '2' })) {
            console.log('登录')
            window.api.authIPC.succeededAuth()
        }
    }
    const handleAutoLogin = async () => {
        if (await authStore.autoLogin()) {
            console.log('自动登录')
        }
    }

    useEffect(() => {
        handleAutoLogin()
    }, [])

    return (
        <>
            <Button onClick={handleLogin}>登录</Button>
        </>
    )
}
