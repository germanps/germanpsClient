import React, {useEffect, useState} from 'react';
import { Switch, List, Button, Icon, Modal as AntdModal, notification } from 'antd';
import Modal from '../../../Modal/Modal';
import DragSortableList from 'react-drag-sortable';
import "./MenuWebList.scss";
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from "../../../../api/auth";

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
                    <MenuItem item={item} />
                )
            })
        });

        setListItems(listItemsArray);
    }, [menu]);


    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
        
        const accessToken = getAccessTokenApi();
        
        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        });
    };

    return (

        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary">
                    Menu menú
                </Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList 
                    items={listItems}
                    onSort={onSort}
                    type="vertical"
                />
            </div>
        </div>
    );
}

function MenuItem(props) {
    const { item } = props;
    return(
        <List.Item
            actions={[
                <Switch defaultChecked={item.active} />,
                <Button type="primary">
                    <Icon type="edit" />
                </Button>,
                <Button type="danger">
                    <Icon type="delete" />
                </Button>
            ]}
        >
            <List.Item.Meta title={item.title} description={item.url} />
        </List.Item>
    )
}