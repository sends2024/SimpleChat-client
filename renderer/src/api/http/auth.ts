import { http } from '.'

type loginPayload = { username: string; password: string }
type loginResponse = { avatar_url: string; token: string }
type registerPayload = { username: string; password: string; email: string }
type registerResponse = null
export const authRequest = {
    loginRequest: async (payload: loginPayload) => {
        return await http.post<loginResponse>(
            '/users/login',
            {
                username: payload.username,
                password: payload.password
            },
            {}
        )
    },
    registerRequest: async (payload: registerPayload) => {
        return await http.post<registerResponse>('/users/register', {
            username: payload.username,
            password: payload.password,
            email: payload.email
        })
    }
}
