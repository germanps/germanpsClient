import React, {useEffect, useState} from 'react';
import { Switch, List, Button, Icon, Modal as AntdModal, notification } from 'antd';
import Modal from '../../../Modal/Modal';
import DragSortableList from 'react-drag-sortable';
import "./MenuWebList.scss";
import { updateMenuApi, activateMenuApi, deleteMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

const { confirm } = AntdModal;

export default function MenuWebList(props){
    const { menu, setReloadMenu } = props;

    //states
    const [listItems, setListItems] = useState([])
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        menu.forEach(item => {
            listItemsArray.push({
                content: (
                    <MenuItem 
                        item={item} 
                        activateMenu={activateMenu} 
                        editMenuWebModal={editMenuWebModal}
                        deleteMenu={deleteMenu}
                    />
                )
            })
        });

        setListItems(listItemsArray);
    }, [menu]);

    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status).then(response => {
            notification["success"]({
                message: response
            });
        })
    }


    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
        
        const accessToken = getAccessTokenApi();
        
        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        });
    };

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Nuevo menú");
        setModalContent(
            <AddMenuWebForm
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenu={setReloadMenu}
            />   
        );
    }

    const deleteMenu = menu => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: "Eliminando menú",
            content: `¿Estas seguro que quieres eliminar el menú? ${menu.title}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteMenuApi(accessToken, menu._id).then(response => {
                    notification["success"]({
                        message: response
                    })
                    setReloadMenu(true);
                }).catch(() => {
                    notification["error"]({
                        message: "Error del servidor, intentelo mas tarde."
                    });
                })
            }
        })
        
    }

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editando menú: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm 
                setIsVisibleModal={setIsVisibleModal}
                setReloadMenu={setReloadMenu}
                menu={menu}
            />
        );
    }

    return (

        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={addMenuWebModal}>
                    Crear menú
                </Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList 
                    items={listItems}
                    onSort={onSort}
                    type="vertical"
                />
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}

function MenuItem(props) {
    const { item, activateMenu, editMenuWebModal, deleteMenu } = props;
    return(
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)} />,
                <Button type="primary" onClick={() => editMenuWebModal(item)}>
                    <Icon type="edit" />
                </Button>,
                <Button type="danger" onClick={() => deleteMenu(item)}>
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}