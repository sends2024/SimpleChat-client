import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'

import { createHashRouter, Navigate } from 'react-router'
import { Children } from 'react'
import { CommonLayout } from '@/pages/CommonLayout'

const route = [
    {
        name: 'index',
        path: '/',
        Component: () => <Navigate to="/layout" replace />
    },
    {
        name: 'auth',
        path: '/auth',
        Component: AuthPage
    },
    {
        path: '/layout',
        Component: CommonLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'home',
                Component: HomePage
            }
        ]
    }
]
const router = createHashRouter(route)
export default router
