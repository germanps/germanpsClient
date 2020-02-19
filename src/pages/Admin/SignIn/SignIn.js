import React from 'react';
import {Layout, Tabs} from 'antd';
import { Redirect } from "react-router-dom";
import Logo from '../../../assets/img/png/logo-squalo.png';
import "./SignIn.scss";

export default function SignIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;
    return(
        <Layout className="sign-in">
            <Content className="sign-in__content">
                <h1 className="sign-in__content-logo">
                    <img src={Logo} alt="Germán Pla Sepúlveda" />
                </h1>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            Componente loginForm
                        </TabPane>
                        <TabPane tab={<span>Nuevo usuario</span>} key="2">
                            Component RegisterForm
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}