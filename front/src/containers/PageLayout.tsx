import { ContactsOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React from 'react';

import { Layout } from 'antd';
import Image from 'next/image';
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
        icon: <Link href='/aboutMe'><ContactsOutlined /></Link>,
        label: 'About Me'
    }
]

const PageLayout: React.FC<PropsType> = ({ children }) => {
    return (

        <LayoutContainer>
            <MenuContainer>
                <Image src={"/name_header.png"} alt="Franck Courtat" width={50} height={50} style={{ margin: '5px 15px' }} />
                {/* <NavBar
                    items={items}
                    theme='light'
                    mode='horizontal'
                    style={{ width: '50vw', opacity: 0.5 }}
                /> */}
            </MenuContainer>
            <ContentContainer>{children}</ContentContainer>
            <FooterContainer>© Kévin PARIS - Tous droits réservés</FooterContainer>
        </LayoutContainer >
    );
};

const LayoutContainer = styled(Layout)`
    min-height: 100vh;
    background: #292653;
`

const ContentContainer = styled(Content)`
    height: auto;
    /* padding-left: 15vw;
    padding-right: 15vw; */
`

const MenuContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom-right-radius: 30px 40px;
    border-bottom-left-radius: 30px 40px;
    backdrop-filter: blur(8px);
    box-shadow: -1px 1px 17px 5px #ffffff inset;
`

const NavBar = styled(Menu)`

`

const FooterContainer = styled(Footer)`
`

export default PageLayout;
