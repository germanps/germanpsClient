import React from 'react';
import "./EditUserForm.scss";

export default function EditUserForm (props) {
    const { user } = props;
    return(
        <div className="edit-user-form">
            <h2>EditUserForm</h2>
            {user.email}
        </div>
    )
}