import React, { useState } from 'react';
import "./LoginForm.scss";
import { Form, Icon, Input, Button, notification } from 'antd';
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

export default function LoginForm() {

    //states
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    //Methods
    const handleChangeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async e => {
        e.preventDefault();
        
        const result = await signInApi(inputs);
        
        if(result.message) {
            //si existe un mensaje es de error
            notification["error"]({
                message: result.message
            });
        }else{
            //guardamos en localstorage
            const {accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            notification['success']({
                message: "Login correcto"
            });
            window.location.href = "/admin";
        } 
    }

    return (
        <Form className="login-form" onChange={handleChangeForm} onSubmit={handleLogin}>
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
                <Button htmlType="submit" className="login-form__button">Entrar</Button>
            </Form.Item>
        </Form>
    )
}