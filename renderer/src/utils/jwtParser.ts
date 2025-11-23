/**
 * 解析 JWT 并返回 payload
 * @param {string} token JWT 字符串
 * @returns {object|null} payload 对象，解析失败返回 null
 */
export function parseJWT(token: string) {
    if (!token) return null

    // 去掉 Bearer 前缀（如果有）
    if (token.startsWith('Bearer ')) {
        token = token.slice(7)
    }

    const parts = token.split('.')
    if (parts.length !== 3) {
        console.error('Invalid JWT format')
        return null
    }

    try {
        const payloadBase64 = parts[1]
        // Base64Url 解码
        const payload = JSON.parse(atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')))
        return payload
    } catch (err) {
        console.error('Failed to parse JWT:', err)
        return null
    }
}
