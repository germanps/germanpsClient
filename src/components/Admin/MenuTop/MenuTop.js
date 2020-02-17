import React from 'react';
import "./MenuTop.scss";
import logo from '../../../assets/img/png/logo-squalo.png';
import { Button, Icon } from 'antd';

export default function MenuTop () {

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <div className="menu-top__left-wrapper">
                    <img className="menu-top__left-wrapper__log" src={logo} alt="Germán Pla"/>
                </div>
                <Button
                    type="link"
                    onClick={() => console.log("click menu")}
                    className=""
                >
                    <Icon type="menu-fold" />
                </Button>
            </div>
            <div className="menu-right">
                <Button 
                    type="link" 
                    onClick={() => console.log('click disconnect')}
                    className=""
                >
                    <Icon type="poweroff" />
                </Button>
            </div>
        </div>
    )
}