import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer, Sider } = Layout;

type PropsType = {
    children: JSX.Element | JSX.Element[]
}


const AdminPageLayout: React.FC<PropsType> = ({ children }) => {
    return (

        <LayoutContainer>
            <Header>Admin Panel</Header>
            <ContentContainer>{children}</ContentContainer>
            <Footer>Kévin PARIS</Footer>
        </LayoutContainer>
    );
};

const LayoutContainer = styled(Layout)`
    display: flex;
    height: 100vh;
`

const ContentContainer = styled(Content)`
    flex: 1;
    margin-top: 2%;
    padding-left: 10vw;
    padding-right: 10vw;
`

export default AdminPageLayout;
