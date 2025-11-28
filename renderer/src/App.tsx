import { RouterProvider } from 'react-router'
import router from './router'
import { useAuthStore } from './store'
import { useEffect } from 'react'

function App() {
    /* 此处执行信息注册 */
    const authStore = useAuthStore()
    useEffect(() => {
        window.api.authIPC.init((payload) => {
            console.log(payload)
            authStore.setUser(payload)
        })
    }, [])
    return (
        <>
            <RouterProvider router={router} ></RouterProvider>
        </>
    )
}

export default App
