import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'

import { createHashRouter, Navigate } from 'react-router'

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
    },
    {
        name: 'auth',
        path: '/auth',
        Component: AuthPage
    }
]
const router = createHashRouter(route)
export default router
