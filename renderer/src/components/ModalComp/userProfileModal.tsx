import React from 'react';
import { Modal, Form, Input, Button, Avatar, Upload, Space, Typography } from 'antd';
import { UserOutlined, UploadOutlined, LockOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface UserProfileModalProps {
  visible: boolean;
  userName?: string;
  userAvatar?: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  userName = '当前用户',
  userAvatar
}) => {

    const handleOk = async () => {

    }

    const handleCancel = () => {
        
    }

  return (
    <Modal
      title="用户设置"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          保存
        </Button>,
      ]}
      width={400}
      style={{
        borderRadius: '8px',
      }}
    >
      {/* 头像和用户名区域 - 水平布局 */}
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
          padding: '16px 0',
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        {/* 头像在左边 */}
        <div style={{ marginRight: 16 }}>
          <Avatar
            size={64}
            src={userAvatar}
            icon={!userAvatar ? <UserOutlined /> : undefined}
            style={{ 
              backgroundColor: '#1890ff',
              border: '3px solid #f0f0f0'
            }}
          />
        </div>
        
        {/* 用户名和更换头像按钮在右边 */}
        <div style={{ flex: 1 }}>
          <Text 
            strong 
            style={{ 
              fontSize: '16px',
              color: '#262626',
              display: 'block',
              marginBottom: 8
            }}
          >
            {userName}
          </Text>
          <Upload showUploadList={false}>
            <Button 
              icon={<UploadOutlined />} 
              type="dashed"
              size="small"
              style={{
                borderRadius: '6px'
              }}
            >
              更换头像
            </Button>
          </Upload>
        </div>
      </div>

      {/* 密码修改表单 */}
      <Form layout="vertical">
        <Form.Item
          name="currentPassword"
          label={
            <Text strong style={{ color: '#595959' }}>
              原密码
            </Text>
          }
          style={{ marginBottom: 16 }}
        >
          <Input.Password
            placeholder="请输入原密码"
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            size="large"
            style={{
              borderRadius: '6px',
              border: '1px solid #d9d9d9'
            }}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={
            <Text strong style={{ color: '#595959' }}>
              新密码
            </Text>
          }
          style={{ marginBottom: 16 }}
        >
          <Input.Password
            placeholder="请输入新密码"
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            size="large"
            style={{
              borderRadius: '6px',
              border: '1px solid #d9d9d9'
            }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={
            <Text strong style={{ color: '#595959' }}>
              确认密码
            </Text>
          }
          style={{ marginBottom: 8 }}
        >
          <Input.Password
            placeholder="请再次输入新密码"
            prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
            size="large"
            style={{
              borderRadius: '6px',
              border: '1px solid #d9d9d9'
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserProfileModal;