import { http } from '.'

type loginPayload = { userName: string; password: string }
type loginResponse = { avatar_url: string; token: string }
type registerPayload = { userName: string; password: string; email: string }
type registerResponse = null
export const authRequest = {
    loginRequest: async (payload: loginPayload) => {
        return await http.post<loginResponse>(
            '/users/login',
            {
                userName: payload.userName,
                password: payload.password
            },
            {}
        )
    },
    registerRequest: async (payload: registerPayload) => {
        return await http.post<registerResponse>('/users/register', {
            userName: payload.userName,
            password: payload.password,
            email: payload.email
        })
    }
}
