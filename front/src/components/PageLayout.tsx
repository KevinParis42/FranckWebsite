import { FileImageOutlined, HomeOutlined, ContactsOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react';

import { Layout } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const { Content, Footer, } = Layout;

type PropsType = {
    children: JSX.Element | JSX.Element[]
}

const items: MenuProps['items'] = [
    {
        key: 1,
        icon: <Link href='/'><HomeOutlined /></Link>,
        label: 'Home'
    },
    {
        key: 2,
        icon: <Link href='/gallery'><FileImageOutlined /></Link>,
        label: 'Galery'
    },
    {
        key: 3,
        icon: <Link href='/'><ContactsOutlined /></Link>,
        label: 'About Me'
    }
]

const PageLayout: React.FC<PropsType> = ({ children }) => {
    return (

        <LayoutContainer>
            <Menu
                items={items}
                theme='light'
                mode='horizontal'
            />
            <ContentContainer>{children}</ContentContainer>
            <FooterContainer>© Kévin PARIS - Tous droits réservés</FooterContainer>
        </LayoutContainer >
    );
};

const LayoutContainer = styled(Layout)`
    height: 100vh;
`

const ContentContainer = styled(Content)`
    padding: 15px;
`

const FooterContainer = styled(Footer)`
`

export default PageLayout;
