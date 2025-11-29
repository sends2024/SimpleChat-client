import { StandardResponse } from '@/models'
import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
/* 构建HTTP服务示例 */
export const httpInstance = axios.create({
    baseURL: `${window.env.serviceURL}/api`,
    timeout: 10000
})
/* 统一的请求拦截处理 */
httpInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config
})
/* 统一的响应拦截处理 */
httpInstance.interceptors.response.use(
    <T>(res: AxiosResponse<StandardResponse<T>>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { msg, data } = res.data
        return res
    },
    (error) => {
        message.error(error)
        return Promise.reject(new Error(error))
    }
)
export const http = {
    get: async <T>(url: string, config?: AxiosRequestConfig) => {
        const res = await httpInstance.get<StandardResponse<T>>(url, config)
        return res.data.data
    },
    post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const res = await httpInstance.post<StandardResponse<T>>(url, data, config)
        return res.data.data
    },
    patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const res = await httpInstance.patch<StandardResponse<T>>(url, data, config)
        return res.data.data
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig) => {
        const res = await httpInstance.delete<StandardResponse<T>>(url, config)
        return res.data.data
    },
    put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const res = await httpInstance.put<StandardResponse<T>>(url, data, config)
        return res.data.data
    }
}

export * from './auth'
export * from './channel'
