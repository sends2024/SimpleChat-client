import ChatSide from "@/components/CommonLayout/ChatSide"
import { useAuthStore } from "@/store"

export default function HomePage() {
    const authStore = useAuthStore()
    

    return (
        <ChatSide 
            authToken={localStorage.getItem('authToken') || ''}
            userInfo={authStore.user}
        >

        </ChatSide>
    )
}
