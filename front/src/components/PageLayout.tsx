import React from 'react';
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Header, Content, Footer, Sider } = Layout;

type PropsType = {
    children: JSX.Element | JSX.Element[]
}

const items: MenuProps['items'] = [
    {
        key: 1,
        icon: <Link href='/'><HomeOutlined /></Link>,
        label: 'Home'
    }
]

const PageLayout: React.FC<PropsType> = ({ children }) => {
    return (

        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Image src={'/babydick.jpg'} width={'200'} height={'200'} alt='babydick.jpg'/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Content>{children}</Content>
                <Footer>Kévin PARIS</Footer>
            </Layout>
        </Layout>
    );
};

export default PageLayout;
