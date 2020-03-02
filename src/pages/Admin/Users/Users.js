import React, { useState, useEffect } from 'react';
import './Users.scss';
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersApi } from '../../../api/user';

export default function Users() {

    //stado usuarios
    const [users, setUsers] = useState([]);
    const token = getAccessTokenApi();

    //didmount
    useEffect(() => {
        getUsersApi(token).then(response => {
            setUsers(response);
        });
    }, [token]);

    return(
        <div className="users">
            lista usuarios
        </div>
    );
}