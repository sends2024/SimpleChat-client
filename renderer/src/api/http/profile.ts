import { http } from '.'

const authToken = localStorage.getItem('authToken')
const avatarFile = 'Test Avatar Path'

type changePwdPayload = { old_password: string; new_password: string }

type changeAvatarResponse = { avatar_url: string; }

export const profileRequest = {
    changePwdRequest: async (payload: changePwdPayload) => {
        return await http.pat<null>('/api/user/password', {
            old_password: payload.old_password,
            new_password: payload.new_password
        })
    },

    changeAvatarRequest: async (form: File) => {
        const formData = new FormData()
        formData.append('avatar', form)

        return await http.put<changeAvatarResponse>(
            '/api/user/avatar',
            formData,
            {
                headers: {
                    Authorization: authToken
                }
            }
        );
    }
}
