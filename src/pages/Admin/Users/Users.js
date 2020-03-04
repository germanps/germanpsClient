import React, { useState, useEffect } from 'react';
import './Users.scss';
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';
import ListUsers from "../../../components/Admin/Users/ListUsers";

export default function Users() {

    //stado usuarios
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();    

    //didmount
    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
    }, [token]);

    return(
        <div className="users">
            <ListUsers 
                usersActive={usersActive}
                usersInactive={usersInactive}
            />
        </div>
    );
}