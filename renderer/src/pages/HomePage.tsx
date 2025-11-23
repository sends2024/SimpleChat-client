import { useAuthStore } from '@/store'
import { Button } from 'antd'

export default function HomePage() {
    const authStore = useAuthStore()
    const handleLogout = () => {
        console.log('logout')
        window.api.authIPC.logout()
    }
    return (
        <>
            <h1 className="text-pink-100">{`欢迎回来${authStore.user.userName}`}</h1>
            <h1 className="text-pink-100">{`你的邮箱${authStore.user.email}`}</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}
