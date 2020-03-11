import React, {useState, useEffect} from 'react';
import { Switch, List, Avatar, Button, Icon, notification, Modal as AntdModal } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';
import './ListUsers.scss';

const { confirm } = AntdModal;

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    //states
    const [viewUsersActives, setUsersActives] = useState()
    const [viewModal, setViewModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () => {
        setViewModal(true);
        setModalTitle("Nuevo usuario");
        setModalContent(
            
            <AddUserForm 
                setViewModal={setViewModal}
                setReloadUsers={setReloadUsers}
            />
        );
    }
    
    return(
        <div className="list-users">

            <div className="list-user__header">

                <div className="list-users__switch">
                    <Switch 
                        defaultChecked={!usersActive}
                        onChange={() => setUsersActives(!viewUsersActives)}
                    />
                    <span>
                        {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
                    </span>
                </div>

                <Button
                    type="btn-primary"
                    className="btn-primary"
                    onClick={addUserModal}
                >
                    Nuevo Usuario
                </Button>

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

    const showDeleteConfirm = () => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id).then(response => {
                    notification["success"]({
                        message: "Usuario eliminado correctamente"
                    });
                    setReloadUsers(true);//reload doom 
                }).catch(err => {
                    notification["error"]({
                        message: err
                    })
                })
            }
        });
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
                        onClick={showDeleteConfirm}
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

    const showDeleteConfirm = () => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando usuario",
            content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id).then(response => {
                    notification["success"]({
                        message: "Usuario eliminado correctamente"
                    });
                    setReloadUsers(true);//reload doom 
                }).catch(err => {
                    notification["error"]({
                        message: err
                    })
                })
            }
        });
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
                        onClick={showDeleteConfirm}
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