import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Icon, Slider} from 'antd';
import './SlideMenu.scss';

export default function SlideMenu(){
    const { Sider } = Layout;
    return(
        <Sider className="aside-menu">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to={"/admin"}>
                        <Icon type="home" />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/admin/menu-web"}>
                        <Icon type="menu" />
                        <span className="nav-text">Menu web</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}