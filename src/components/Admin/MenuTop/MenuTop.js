import React from 'react';
import "./MenuTop.scss";
import logo from '../../../assets/img/png/logo-squalo.png';
import { Button, Icon } from 'antd';
import { logOut } from '../../../api/auth';

export default function MenuTop (props) {
    
    const { menuCollapsed, setMenuCollapsed } = props;

    const logoutUser = () => {
        logOut();
        window.location.reload();
    }
    
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <div className="menu-top__left-wrapper">
                    <img className="menu-top__left-wrapper__log" src={logo} alt="Germán Pla"/>
                </div>
                <Button
                    type="link"
                    onClick={() => setMenuCollapsed(!menuCollapsed) }
                    className=""
                >
                    <Icon type={menuCollapsed ? "menu-unfold" : "menu-fold"} />
                </Button>
            </div>
            <div className="menu-right">
                <Button 
                    type="link" 
                    onClick={ logoutUser }
                    className=""
                >
                    <Icon type="poweroff" />
                </Button>
            </div>
        </div>
    )
}