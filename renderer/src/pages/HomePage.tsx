import { Button } from 'antd'

export default function HomePage() {
    const handleLogout = () => {
        console.log('logout')
        window.api.authIPC.logout()
    }
    return (
        <>
            <h1 className="text-pink-100">Home</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}
