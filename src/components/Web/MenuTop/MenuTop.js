import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import SocialLinks from '../SocialLinks';
import Logo  from '../../../assets/img/png/logo-squalo.png';
import { getMenuApi } from '../../../api/menu';
import "./MenuTop.scss";


export default function MenuTop(){
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        getMenuApi().then(response => {
            const arrayMenuActive = [];
            response.menusStored.forEach(item => {
                if(item.active){
                    arrayMenuActive.push(item);
                }
                // item.active && arrayMenuActive.push(item);
            });
            setMenuData(arrayMenuActive);
        });
    }, [])
    return(
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={'/'}>
                    <img src={Logo} alt="logo germanps" />
                </Link>
            </Menu.Item>
            {menuData.map(item => {
                //diferenciar links externos
                const external = item.url.indexOf("http") > -1 ? true : false;
                if(external){
                    return(
                        <Menu.Item key={item._id} className="menu-top-web_item">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        </Menu.Item>
                    );
                }
                return(
                    <Menu.Item key={item._id} className="menu-top-web_item">
                        <Link to={item.url}>{item.title}</Link>
                    </Menu.Item>
                )
            })}
            <SocialLinks />
        </Menu>  
    );
}