import { create } from 'zustand'
import { UserSchema } from '@/models'
type loginPayload = { userName: string; password: string }
type registerPayload = { userName: string; password: string; email: string }

interface UserState {
    user: UserSchema
    login: (payload: loginPayload) => Promise<boolean>
    autoLogin: () => Promise<boolean>
    register: (payload: registerPayload) => Promise<boolean>
    setUser: (data: Partial<UserSchema>) => void
}

export const useAuthStore = create<UserState>((set, get) => ({
    user: {
        userName: '',
        password: '',
        email: ''
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
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token')
            if (token === 'valuable') {
                return true
            }
        }
        return false
    },
    login: async (payload) => {
        if (payload.userName && payload.password) {
            get().setUser(payload)
            return true
        }
        return false
    },
    register: async (payload) => {
        if (payload.userName && payload.password && payload.email) {
            get().setUser(payload)
            return true
        }
        return false
    }
}))
