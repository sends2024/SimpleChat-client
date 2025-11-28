import { CloseOutlined, MinusOutlined, QuestionOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export function Header() {
    return (
        <>
            {/* 感觉加不加gap都无所谓 */}
            <div className="btn-group flex justify-end pb-1 bg-gray-200  h-8">
                <Button icon={<QuestionOutlined style={{ fontSize: 15 }}
                />} type="text"></Button>
                <Button
                    onClick={() => window.api.windowIPC.minimize('main')}
                    icon={<MinusOutlined style={{ fontSize: 15 }} />}
                    type="text"
                ></Button>
                <Button
                    onClick={() => window.api.windowIPC.close('main')}
                    icon={<CloseOutlined style={{ fontSize: 15 }} />}
                    type="text"
                ></Button>
            </div>
        </>
    )
}
