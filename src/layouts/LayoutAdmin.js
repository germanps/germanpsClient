import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from "antd";
import "./LayoutAdmin.scss";
import MenuTop from "../components/Admin/MenuTop";
import SlideMenu from "../components/Admin/SlideMenu";
import SignIn from "./../pages/Admin/SignIn";

export default function LayoutAdmin(props) {
    
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    const [ menuCollapsed, setMenuCollapsed ] = useState(false);

    const user = null;

    if (!user) {
        return(
            <>  
                <Route path="/admin/login" component={SignIn} />
                <Redirect to="/admin/login" />
            </>
        )
    }
    
    return(
        <Layout>
            <SlideMenu menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop 
                        menuCollapsed={menuCollapsed}
                        setMenuCollapsed={setMenuCollapsed}
                    />
                </Header>
                <div className="layout-admin_wrapper" style={{marginLeft: menuCollapsed ? "80px" : "200px"}}>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes} />
                    </Content>
                    <Footer className="layout-admin__footer">
                        Germán Pla 
                    </Footer>
                </div>
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