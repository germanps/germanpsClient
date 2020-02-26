import React from 'react';
import "./LoginForm.scss";
import { Form, Icon, Input, Button, notification } from 'antd';

export default function LoginForm() {
    return (
        <Form className="login-form">
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button" value="Entrar"/>
            </Form.Item>
        </Form>
    )
}