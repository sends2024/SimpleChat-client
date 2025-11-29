type WSMessage = Record<string, any>

export class WebSocketService {
    private ws!: WebSocket //实例对象
    private url: string //连接地址（其实是固定的）
    private reconnectTimer: any = null //重连计时器
    private heartbeatTimer: any = null //心跳计时器
    private reconnectDelay = 3000 // 重连间隔
    private heartbeatInterval = 15000 // 心跳间隔
    private isManualClose = false //人为关闭
    onMessageHandler?: (msg: any) => void //消息回调
    constructor(uid: string, cid: string, token: string, userName: string) {
        const params = new URLSearchParams({
            user_id: uid,
            channel_id: cid,
            userName: userName,
            token: token
        }).toString()

        this.url = `${window.env.wsServiceURL}/ws/chat?${params}`

        this.connect()
    }

    private connect() {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
            console.log('连接频道')
            this.startHeartbeat()
        }

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log('收到JSON消息:', data)
                if (this.onMessageHandler) {
                    this.onMessageHandler(data)
                }
            } catch {
                console.log('收到非 JSON 消息:', event.data)
            }
        }

        this.ws.onerror = (err) => {
            console.error('WebSocket错误:', err)
        }

        this.ws.onclose = () => {
            // console.log('WebSocket closed')

            this.stopHeartbeat()

            if (!this.isManualClose) {
                // console.log('尝试重连中...')
                this.reconnect()
            }
        }
    }

    private reconnect() {
        if (this.reconnectTimer) return
        this.reconnectTimer = setTimeout(() => {
            this.connect()
            this.reconnectTimer = null
        }, this.reconnectDelay)
    }

    /** 发送 JSON 数据 */
    send(data: WSMessage) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data))
        } else {
            console.warn('WebSocket 未连接，消息将丢弃:', data)
        }
    }

    /** 心跳保活 */
    private startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            this.send({ type: 'ping' })
        }, this.heartbeatInterval)
    }

    private stopHeartbeat() {
        clearInterval(this.heartbeatTimer)
    }

    /** 手动关闭，不再重连 */
    close() {
        this.isManualClose = true
        this.ws.close()
        this.stopHeartbeat()
    }
}
type wsInfo = {
    uid: string
    cid: string
    token: string
    username: string
}
export const createWebSocketService = (wsInfo: wsInfo) => {
    return new WebSocketService(wsInfo.uid, wsInfo.cid, wsInfo.token, wsInfo.username)
}
