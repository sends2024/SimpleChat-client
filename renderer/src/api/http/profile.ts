import { http } from '.'

type changePwdPayload = { old_password: string; new_password: string }

type changeAvatarResponse = { avatar_url: string }

export const profileRequest = {
    changePwdRequest: async (payload: changePwdPayload) => {
        return await http.patch<null>('/api/user/password', {
            old_password: payload.old_password,
            new_password: payload.new_password
        })
    },

    changeAvatarRequest: async (form: File) => {
        const formData = new FormData()
        formData.append('avatar', form)

        return await http.put<changeAvatarResponse>('/api/user/avatar', formData, {})
    }
}
