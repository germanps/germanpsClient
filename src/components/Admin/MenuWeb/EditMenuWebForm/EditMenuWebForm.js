import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props){
    const { setIsVisibleModal, setReloadMenu, menu } = props;
    const [ menuWebData, setMenuWebData] = useState({});

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu]) //se actualiza cada vez que se modifique el menú

    const editMenu = e => {
        e.preventDefault();

        if (!menuWebData.title || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        }else{
            const accessToken = getAccessTokenApi();
            updateMenuApi(accessToken, menuWebData._id, menuWebData)
                .then(response => {
                    notification["success"]({
                        message: response 
                    });
                    setIsVisibleModal(false);
                    setReloadMenu(true);
                }).catch(() => {
                    notification["error"]({
                        message: "Error del servidor, intentarlo mas tarde."
                    })
                })
        }
        
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                editMenu={editMenu}
            />
        </div>
    )
}


function EditForm(props) {
    const { menuWebData, setMenuWebData, editMenu } = props;
    return(
        <Form className="form-edit" onSubmit={editMenu}>
            <Form.Item>
                <Input 
                    prefix={<Icon type="font-size" />}
                    placeholder="Título"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<Icon type="link" />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Editar menú
                </Button> 
            </Form.Item>
        </Form>
    );
}