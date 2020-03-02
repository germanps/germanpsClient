import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './SlideMenu.scss';

function SlideMenu(props){    
    const { menuCollapsed, location } = props;
    //location.pathname => nos dará la ruta que estamos para ponerla por default
    const { Sider } = Layout;
    return(
        <Sider className="aside-menu" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <Icon type="home" />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                    <Link to={"/admin/users"}>
                        <Icon type="user" />
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default  withRouter(SlideMenu)