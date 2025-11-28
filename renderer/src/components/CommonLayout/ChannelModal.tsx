import { useState, useEffect } from 'react'
import { Modal, Input, message as antdMessage } from 'antd'

interface channelModalProps {
    modalState: boolean
    setModalState?: (open: boolean) => void
    authToken: string | null
}

export default function ChannelModal({ authToken, modalState, setModalState }: channelModalProps) {
    const [messageApi, contextHolder] = antdMessage.useMessage()

    // Modal 状态管理

    const [loadingState, setLoadingState] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')

    const isNumeric = (channelName: string): boolean => /^\d+$/.test(channelName)

    const handleOk = async () => {
        if (!authToken) {
            messageApi.error('用户未登录，无法添加频道')
            return
        }
        if (!newChannelName.trim()) {
            messageApi.warning('频道名称或邀请码不能为空')
            return
        }

        try {
            setLoadingState(true)

            // TODO: store 没做, 调用一下API 基本好了
            if (isNumeric(newChannelName)) {
                // 检测传进来的值是否为 邀请码, 直接调用joinChannelApi
                // join channel store and api
                messageApi.success(`成功加入频道「${newChannelName}」`)
            } else {
                // 如果不是邀请码 那么就是创建频道的频道名称了
                // add channel store and api
                messageApi.success(`成功创建频道「${newChannelName}」`)
            }

            return
        } catch (error) {
            messageApi.error('加入/添加频道失败: ' + (error as any).message)
        } finally {
            setLoadingState(false)
            setNewChannelName('')
        }
    }

    const setOpen = (value: boolean) => {
        modalState = value;
        setModalState?.(value);
    };

    const handleCancel = () => {
        setOpen(false)
        setNewChannelName('')
    }

    return (
        <>
            {contextHolder} // 添加 antdMessage Modal 局部使用
            <Modal
                title="添加频道"
                open={modalState}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="加入"
                cancelText="取消"
                confirmLoading={loadingState}
            >
                <Input
                    placeholder="请输入频道名称"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    onPressEnter={handleOk}
                />
            </Modal>
        </>
    )
}
