import { useDsStore } from '@/store'
import { Button } from 'antd'
import { useState } from 'react'

export function LLMChatPage() {
    const dsStore = useDsStore()
    const [content, setContent] = useState('')
    return (
        <>
            <Button
                onClick={async () => {
                    setContent(await dsStore.chat('你是谁'))
                    console.log(content)
                }}
            ></Button>
            <h1>{content}</h1>
        </>
    )
}
