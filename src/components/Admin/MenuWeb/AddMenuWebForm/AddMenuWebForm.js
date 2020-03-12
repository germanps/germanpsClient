import  React, {useState} from 'react';
import { Form, Icon, Input, Button, Select, notification } from 'antd';
import './AddMenuWebForm.scss';

export default function AddMenuWebAddMenuWebForm(props) {

    return(
        <div className="add-menu-web-form">
            <AddForm />
        </div>
    );
}

function AddForm(props) {

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{width: 90}}
        >
            <Select.Option value="http://">http://</Select.Option>
            <Select.Option value="https://">https://</Select.Option>
        </Select>
    )

    return(
        <Form className="form-add">
            <Form.Item>
                <Input 
                    prefix={<Icon type="font-size" />}
                    placeholder="Título"
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    
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