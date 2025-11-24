import { useAuthStore } from '@/store/auth'
import { useEffect } from 'react'
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import AuthForm from '@/components/AuthPage/AuthForm'
export default function LoginPage() {
    const authStore = useAuthStore()
    const user = authStore.user
    const handleLogin = async () => {
        const res = await authStore.login({ userName: user.userName, password: user.password })
        if (res) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }
    const handleRegister = async () => {
        if (
            await authStore.register({
                userName: user.userName,
                password: user.password,
                email: user.email
            })
        ) {
            window.api.authIPC.succeededAuth(useAuthStore.getState().user)
        }
    }

    useEffect(() => {}, [])

    return (
        <>
            <div className="auth-page flex flex-col h-full items-center ">
                <div className="btn-group self-end m-2">
                    <Button
                        onClick={() => window.api.windowIPC.close('auth')}
                        type="text"
                        icon={<PoweroffOutlined style={{ fontSize: 20 }} />}
                    ></Button>
                </div>
                <div className="title  p-5">
                    <span className="font-bold text-5">欢迎使用 SimPleChat</span>
                </div>

                <AuthForm></AuthForm>
            </div>
        </>
    )
}
