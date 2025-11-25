import { useAuthStore } from '@/store'
import { Layout, Button, theme, Avatar, Dropdown, message } from 'antd';


export default function HomePage() {
    const authStore = useAuthStore()
    const handleLogout = () => {
        console.log('logout')
        window.api.authIPC.logout()
    }
    
    let isDefault = true;

    return (
        <>
            <div className="relative w-full h-full">
                {isDefault ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-2xl font-bold mb-4">欢迎使用 SimpleChat</h1>
                    <p className="text-gray-600">请选择频道以开始交流。</p>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}
