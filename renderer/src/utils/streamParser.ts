export async function streamParser(
    reader: any,
    onMessage: (text: string) => void,
    onFinish?: () => void
) {
    const decoder = new TextDecoder('utf-8')
    let buffer = ''
    //持续中
    while (1) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        let lines = buffer.split('\n')

        // 最后一行可保留
        buffer = lines.pop() || ''

        for (let line of lines) {
            line = line.trim()

            if (!line.startsWith('data:')) continue

            const data = line.replace(/^data:\s*/, '')

            if (data === '[DONE]') {
                onFinish?.()
                return
            }

            try {
                const json = JSON.parse(data)
                const delta = json.choices?.[0]?.delta?.content

                if (delta) onMessage(delta)
            } catch (err) {
                console.error('解析失败:', err, line)
            }
        }
    }

    onFinish?.()
}
