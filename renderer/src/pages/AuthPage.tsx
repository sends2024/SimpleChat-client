import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import AuthForm from '@/components/AuthPage/AuthForm'
export default function LoginPage() {
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
                    <span className="font-bold text-5">欢迎使用 SimpleChat</span>
                </div>

                <AuthForm></AuthForm>
            </div>
        </>
    )
}
