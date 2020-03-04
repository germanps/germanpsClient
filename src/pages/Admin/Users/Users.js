import React, { useState, useEffect } from 'react';
import './Users.scss';
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';

export default function Users() {

    //stado usuarios
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();

    console.log("usersActives: ", usersActive);
    console.log("usersInactives: ", usersInactive);
    

    //didmount
    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response);
        });
    }, [token]);

    return(
        <div className="users">
            lista usuarios
        </div>
    );
}