import { MsgRequest } from '@/models'

export class LLMService {
    private url: string
    private key: string
    private model: string
    constructor(url: string, key: string, model: string) {
        this.url = url
        this.key = key
        this.model = model
    }
    async chat(msgs: Array<MsgRequest>, stream: boolean = true) {
        try {
            const res = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.key}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: msgs,
                    stream: stream
                })
            })
            //非流式可直接使用
            if (!stream) return await res.json()
            //解析
            return res
        } catch (error) {
            console.error(error)
        }
    }
}

const deepSeekService = new LLMService(
    window.env.deepseekURL,
    window.env.deepseekAPIKEY,
    'deepseek-chat'
)
export default deepSeekService
