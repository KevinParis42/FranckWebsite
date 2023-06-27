import { ContactsOutlined, FileImageOutlined, HomeOutlined } from '@ant-design/icons';
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
        icon: <Link href='/'><ContactsOutlined /></Link>,
        label: 'About Me'
    }
]

const PageLayout: React.FC<PropsType> = ({ children }) => {
    return (

        <LayoutContainer>
            <MenuContainer>
                <NavBar
                    items={items}
                    theme='light'
                    mode='horizontal'
                />
            </MenuContainer>
            <ContentContainer>{children}</ContentContainer>
            <FooterContainer>© Kévin PARIS - Tous droits réservés</FooterContainer>
        </LayoutContainer >
    );
};

const LayoutContainer = styled(Layout)`
    height: 100vh;
    background: rgb(44,134,226);
    background: linear-gradient(150deg, rgba(44,134,226,1) 0%, rgba(63,28,194,1) 35%, rgba(3,16,94,1) 90%);

`

const ContentContainer = styled(Content)`
    padding-left: 15vw;
    padding-right: 15vw;
`

const MenuContainer = styled.div`
    background: url('/hero.jpg') no-repeat;
    background-size: cover;
    background-position-y: 70%;
    height: 25vh;
    opacity: 50%;

`

const NavBar = styled(Menu)`
    height: 7vh;
    background-color: rgba(255, 255, 255, 0.4);
    border-bottom-right-radius: 30px 40px;
    border-bottom-left-radius: 30px 40px;
    backdrop-filter: blur(8px);
    box-shadow: -1px 1px 17px 5px #ffffff inset

;
`

const FooterContainer = styled(Footer)`
`

export default PageLayout;
