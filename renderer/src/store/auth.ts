import { create } from 'zustand'
import { UserSchema } from '@/models'
import { authRequest } from '@/api'
type loginPayload = { userName: string; password: string }
type registerPayload = { userName: string; password: string; email: string }

interface UserState {
    user: UserSchema
    login: (payload: loginPayload) => Promise<boolean>
    autoLogin: () => Promise<boolean>
    register: (payload: registerPayload) => Promise<boolean>
    setUser: (data: Partial<UserSchema>) => void
    logout: () => void
}

export const useAuthStore = create<UserState>((set, get) => ({
    user: {
        userName: '',
        password: '',
        email: '',
        avatarURL: ''
    },
    setUser: (data) => {
        set((state) => ({
            user: {
                ...state.user,
                ...data
            }
        }))
    },
    autoLogin: async () => {
        const authToken = localStorage.getItem('token')
        if (authToken) {
            if (authToken === 'valuable') {
                console.log('自动登录')
            }
        }
        return false
    },
    login: async (payload) => {
        const result = await authRequest.loginRequest(payload)
        if (result) {
            get().setUser(payload)
            get().setUser({ avatarURL: result.avatar_url })

            localStorage.setItem('authToken', result.token)
            return true
        }
        return false
    },
    register: async (payload) => {
        const result = await authRequest.registerRequest(payload)
        if (result === null) {
            get().setUser(payload)
            console.log('注册成功')
            return true
        }
        return false
    },
    logout: () => {
        get().setUser({
            userName: '',
            password: '',
            email: ''
        })
        localStorage.setItem('authToken', '')
    }
}))
