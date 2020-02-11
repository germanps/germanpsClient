import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from "antd";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    
    
    return(
        <Layout>
            <h2>Menu Sidebar</h2>
            <Layout>
                <Header>header...</Header>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
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