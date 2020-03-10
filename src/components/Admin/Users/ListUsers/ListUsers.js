import React, {useState, useEffect} from 'react';
import { Switch, List, Avatar, Button, Icon } from 'antd';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import { getAvatarApi } from "../../../../api/user";
import './ListUsers.scss';

export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
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
                    setViewModal={setViewModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                /> 
            ) : ( 
                <UsersInactives 
                    usersInactive={usersInactive} 
                    setViewModal={setViewModal}
                    etModalTitle={setModalTitle}
                    setModalContent={setModalContent}
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
        setModalContent
    } = props;

    const editUser = user => {
        setViewModal(true);
        setModalTitle(
            `Editar usuario ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`
        );
        setModalContent(<EditUserForm user={user}/>)
    }

    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} /> }
        />
    );
}

function UserActive(props) {
    const { user, editUser } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else{
            setAvatar(null)
        }
    }, [user])

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
                        onClick={() => console.log("Desactivar usuario")}
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
    const {usersInactive, setViewModal, setModalTitle, setModalContent} = props;
    return (
        <List 
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} /> }
        />
    );
}

function UserInactive(props) {
    const { user } = props;
    const [ avatar, setAvatar ] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        }else{
            setAvatar(null)
        }
    }, [user])

    return(
        <List.Item
            actions={[
                    <Button 
                        className="btn-primary"
                        onClick={() => console.log("activar usuario")}
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