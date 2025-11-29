import { useState, useEffect } from 'react'
import { Modal, Input, message as antdMessage } from 'antd'
import { AdminChannelRequest, channelRequests } from '@/api/http/channel'
import { useChannelsStore } from '@/store/channels'

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

    const channelStore = useChannelsStore()

    const isNumeric = (channelName: string): boolean => /^\d+$/.test(channelName)

    const setOpen = (value: boolean) => {
        modalState = value;
        setModalState?.(value);
    };

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

            if (isNumeric(newChannelName)) {
                channelRequests.joinChannelRequest({ invite_code: newChannelName })
                messageApi.success(`成功加入频道「${newChannelName}」`)
            } else {
                AdminChannelRequest.createChannelRequest({ channel_name: newChannelName })
                messageApi.success(`成功创建频道「${newChannelName}」`)
            }

            channelStore.getAllChannels()
            return
        } catch (error) {
            messageApi.error('加入/添加频道失败: ' + (error as any).message)
        } finally {
            setLoadingState(false)
            setNewChannelName('')
        }
    }

    const handleCancel = () => {
        setOpen(false)
        setNewChannelName('')
    }

    return (
        <>
            {/* 添加 antdMessage Modal 局部使用 */}
            {contextHolder}
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
