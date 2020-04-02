import  React, {useState} from 'react';
import { Form, Icon, Input, Button, Select, notification } from 'antd';
import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import './AddMenuWebForm.scss';

export default function AddMenuWebAddMenuWebForm(props) {

    const { setIsVisibleModal, setReloadMenu } = props;

    //States
    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = e => {
        e.preventDefault();
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        }
        
        if (!finalData.title || !finalData.url || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        }else{
            const accessToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order = 1000;

            addMenuApi(accessToken, finalData).then(response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setReloadMenu(true);
            }).catch(() => {
                notification["error"]({
                    message: "Error en el servidor"
                });
            })
        }
    }

    return(
        <div className="add-menu-web-form">
            <AddForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            />
        </div>
    );
}

function AddForm(props) {

    const { menuWebData, setMenuWebData, addMenu} = props;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{width: 90}}
            onChange={e => setMenuWebData({ ...menuWebData, http: e })}
        >
            <Select.Option value="http://">http://</Select.Option>
            <Select.Option value="https://">https://</Select.Option>
        </Select>
    )

    return(
        <Form className="form-add" onSubmit={addMenu}>
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
                    addonBefore={selectBefore}
                    //prefix={<Icon type="link" />}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear menú
                </Button>
            </Form.Item>
        </Form>
    );
}