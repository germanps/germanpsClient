import React from 'react';
import {Layout, Tabs} from 'antd';
import { Redirect } from "react-router-dom";
import Logo from '../../../assets/img/png/logo-squalo.png';
import video from '../../../assets/video/video-intro.mp4';
import RegisterForm from '../../../components/Admin/RegisterForm';
import "./SignIn.scss";

export default function SignIn() {
    const { Content } = Layout;
    const { TabPane } = Tabs;
    return(
        <Layout className="sign-in">
            <video loop muted autoPlay>
                <source src={video}/>
            </video>
            <Content className="sign-in__content">
                <div className="sign-in__content__logo-wrapper">
                    <h1 className="sign-in__content__logo-wrapper--logo">
                        <img src={Logo} alt="Germán Pla Sepúlveda" />
                    </h1> 
                    <span className="sign-in__content__logo-wrapper--name">&#123; german<span className="sign-in__content__logo-wrapper--bold">ps</span> &#125;</span>
                </div>
                <div className="sign-in__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Entrar</span>} key="1">
                            Componente loginForm
                        </TabPane>
                        <TabPane tab={<span>Nuevo usuario</span>} key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    )
}