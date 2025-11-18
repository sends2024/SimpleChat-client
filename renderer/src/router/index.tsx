import HomePage from '@/pages/HomePage'
import { createBrowserRouter, Navigate } from 'react-router'

const route = [
    {
        name: 'index',
        path: '/',
        Component: () => <Navigate to="/home" replace />
    },
    {
        name: 'home',
        path: '/home',
        Component: HomePage
    }
]
const router = createBrowserRouter(route)
export default router
