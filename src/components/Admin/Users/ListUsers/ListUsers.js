import React, {useState} from 'react';
import { Switch, List, Avatar, Button, Icon } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
    //states
    const [viewUsersActives, setUsersActives] = useState()
    
    return(
        <div className="list-users">
            <div className="list-users__switch">
                <Switch 
                    defaultChecked={!usersActive}
                    onChange={() => setUsersActives(!viewUsersActives)}
                />
                <span>
                    {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
                </span>
            </div>
            {viewUsersActives ? ( 
                <UsersActive usersActive={usersActive}/> 
            ) : ( 
                <UsersInactives usersInactive={usersInactive} /> 
            )}
        </div>
    )
}


function UsersActive(props) {
    const {usersActive} = props;
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions={[
                            <Button 
                                type="primary"
                                onClick={() => console.log("Editar usuario")}
                            >
                                <Icon type="edit" />
                            </Button>,
                            <Button 
                                type="danger"
                                onClick={() => console.log("Desactivar usuario")}
                            >
                                <Icon type="stop" />
                            </Button>,
                            <Button 
                                type="danger"
                                onClick={() => console.log("Borrar usuario")}
                            >
                                <Icon type="delete" />
                            </Button>
                        ]}
                    >
                    <List.Item.Meta 
                        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}  />}
                        title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastname ? user.lastname : '...'}
                        `}
                        description={user.email}
                    />

                </List.Item>
            )}
        />
    );
}

function UsersInactives(props) {
    const {usersInactive} = props;
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item
                    actions={[
                            <Button 
                                type="primary"
                                onClick={() => console.log("Activar usuario")}
                            >
                                <Icon type="check" />
                            </Button>,
                            <Button 
                                type="danger"
                                onClick={() => console.log("Borrar usuario")}
                            >
                                <Icon type="delete" />
                            </Button>
                        ]}
                    >
                    <List.Item.Meta 
                        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar}  />}
                        title={`
                            ${user.name ? user.name : '...'} 
                            ${user.lastname ? user.lastname : '...'}
                        `}
                        description={user.email}
                    />

                </List.Item>
            )}
        />
    );
}