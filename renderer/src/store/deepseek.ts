import { create } from 'zustand'
import deepSeekService, { LLMService } from '@/api/llm'
import { MsgRequest } from '@/models'
import { streamParser } from '@/utils/streamParser'
interface DsState {
    api: LLMService
    history: MsgRequest[]
    chat: (content: string, stream?: boolean, onMessage?: any, onFinish?: any) => any
}

export const useDsStore = create<DsState>((set, get) => ({
    api: deepSeekService,
    history: [] as MsgRequest[],
    /* 当开启流式时，必须有onMessage */
    chat: async (content: string, stream: boolean = false, onMessage?: any, onFinish?: any) => {
        /* 简单判断 */
        if (!stream && (onFinish || onMessage)) return
        const reqMsgs = get().history
        const newMsg = {
            role: 'user',
            content: content
        }
        reqMsgs.push(newMsg)
        try {
            const res = await get().api.chat(reqMsgs)
            console.log(res)
            if (!stream) {
                set((state) => ({
                    history: [...state.history, newMsg, res.choices[0].message.content]
                }))
                return res.choices[0].message.content
            } else if (stream && onMessage) {
                streamParser(res.reader(), onMessage, onFinish)
            }
        } catch (error) {
            console.error(error)
        }
    }
}))
