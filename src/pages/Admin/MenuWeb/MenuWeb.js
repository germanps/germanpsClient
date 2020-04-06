import React, { useEffect, useState } from 'react';
import { getMenuApi } from '../../../api/menu';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';

export default function MenuWeb() {

    const [menu, setMenu] = useState([]);
    const [reloadMenu, setReloadMenu] = useState(false);

    useEffect(() => {
        getMenuApi().then(response => {
            setMenu(response.menusStored);
        })
        setReloadMenu(false);
    }, [reloadMenu]);//cuando reloaMenu cambia de valor se vuelve a ejecutar el useEffect

    return(
        <div className="menu-web">
            <MenuWebList menu={menu} setReloadMenu={setReloadMenu} />
        </div>
    );
}