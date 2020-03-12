import React, {useEffect, useState} from 'react';


export default function MenuWebList(props){
    const { menu, setReloadMenu } = props;

    return (
        <div className="menu-web-list">
            {menu.map(item => (
                <p key={item._id}>{item.title}</p>
            ))}
        </div>
    );
}