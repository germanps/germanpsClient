import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Row, Col } from "antd";
import "./LayoutBasic.scss";

export default function LayoutBasic(props) {

    const { routes } = props;
    const { Content, Footer } = Layout;

    // return(
    //     <Layout>
    //         <h2>Menu...</h2>
    //         <Layout>
    //             <Content>
    //                 <LoadRoutes routes={routes} />
    //             </Content>
    //             <Footer>
    //                 Germán Pla 
    //             </Footer>
    //         </Layout>
    //     </Layout>
    // );
    return(
        <Row>
            <Col lg={4} />
            <Col lg={16}>
                <p>MenuTop</p>
                <LoadRoutes routes={routes} />
                <Footer>
                     Germán Pla 
                 </Footer>
            </Col>
            <Col lg={4} />
        </Row>
    )
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