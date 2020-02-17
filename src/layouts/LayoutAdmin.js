import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from "antd";
import "./LayoutAdmin.scss";
import MenuTop from "../components/Admin/MenuTop";

export default function LayoutAdmin(props) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    
    
    return(
        <Layout>
            {/* TO DO: Aside menu} */}
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">
                    Germán Pla 
                </Footer>
            </Layout>
         
        </Layout>
    );
}


function LoadRoutes({routes}) {
    return(
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}