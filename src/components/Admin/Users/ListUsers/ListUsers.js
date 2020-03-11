import React, {useState, useEffect} from 'react';
import { Switch, List, Avatar, Button, Icon, notification } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi, activateUserApi } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';
import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    //states
    const [viewUsersActives, setUsersActives] = useState()
    const [viewModal, setViewModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    
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
                <UsersActive 
                    usersActive={usersActive}
                    setReloadUsers={setReloadUsers}
                /> 
            ) : ( 
                <UsersInactives 
                    usersInactive={usersInactive} 
                    setViewModal={setViewModal}
                    etModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                /> 
            )}

            <Modal
                title={modalTitle}
                isVisible={viewModal}
                setIsVisible={() => setViewModal(!viewModal)}
            >
                {modalContent}
            </Modal>

        </div>
    )
}


function UsersActive(props) {
    const {
        usersActive, 
        setViewModal, 
        setModalTitle, 
        setModalContent,
        setReloadUsers
    } = props;

    const editUser = user => {
        setViewModal(true);
        setModalTitle(
            `Editar usuario ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`
        );
        setModalContent(<EditUserForm user={user} setViewModal={setViewModal} setReloadUsers={setReloadUsers} />)
    }

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} /> }
        />
    );
}

function UserActive(props) {
    const { user, editUser, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else{
            setAvatar(null)
        }
    }, [user]);

    const descativateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false).then(response => {
            notification["success"]({
                message: response
            })
        }).catch(err => {
            notification["error"]({
                message: err
            })
        });
        setReloadUsers(true);//reload doom 
    }

    return(
        <List.Item
            actions={[
                    <Button 
                        className="btn-primary"
                        onClick={() => editUser(user)}
                    >
                        <Icon type="edit" />
                    </Button>,
                    <Button 
                        className="btn-warning"
                        onClick={descativateUser}
                    >
                        <Icon type="stop" />
                    </Button>,
                    <Button 
                        className="btn-danger"
                        onClick={() => console.log("Borrar usuario")}
                    >
                        <Icon type="delete" />
                    </Button>
                ]}
            >
            <List.Item.Meta 
                avatar={<Avatar src={avatar ? avatar : NoAvatar}  />}
                title={`
                    ${user.name ? user.name : '...'} 
                    ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email}
            />

        </List.Item>
    );
}

function UsersInactives(props) {
    const { usersInactive, setReloadUsers } = props;
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} /> }
        />
    );
}

function UserInactive(props) {
    const { user, setReloadUsers } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else{
            setAvatar(null)
        }
    }, [user]);


    const ativateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true).then(response => {
            notification["success"]({
                message: response
            })
        }).catch(err => {
            notification["error"]({
                message: err
            })
        });
        setReloadUsers(true);//reload doom 
    }


    return(
        <List.Item
            actions={[
                    <Button 
                        className="btn-primary"
                        onClick={ativateUser}
                    >
                        <Icon type="check" />
                    </Button>,
                    <Button 

                        className="btn-danger"
                        onClick={() => console.log("Borrar usuario")}
                    >
                        <Icon type="delete" />
                    </Button>
                ]}
            >
            <List.Item.Meta 
                avatar={<Avatar src={avatar ? avatar : NoAvatar}  />}
                title={`
                    ${user.name ? user.name : '...'} 
                    ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email}
            />

        </List.Item>
    );
}