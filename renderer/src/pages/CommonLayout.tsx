import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import { Header } from '@/components/CommonLayout/Header'
import { Outlet } from 'react-router-dom'

export function CommonLayout() {
    return (
        <>
            <Layout className="w-full h-full">
                <Sider width="25%" className="bg-blue-100"></Sider>
                <Layout>
                    <Header></Header>
                    <Content>
                        <Outlet></Outlet>
                    </Content>
                    <Footer className="bg-red"></Footer>
                </Layout>
            </Layout>
        </>
    )
}
