import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import './RegisterForm.scss';

export default function RegisterForm () {

    //state
    const [input, setInput] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });


    const handleChangeForm = e => {
        if(e.target.name === "privacyPolicy"){
            setInput({
                ...input,
                [e.target.name] : e.target.checked
            })
            return;
        }
        setInput({ 
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        console.log(input);
        
    }

    return(
        <Form className="register-form" onSubmit={handleSubmitForm}>
            <Form.Item> 
                <Input
                    prefix={<Icon type="user" style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    value={input.email}
                    onChange={handleChangeForm}
                />
            </Form.Item>
            <Form.Item> 
                <Input
                    prefix={<Icon type="lock" style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register-form__input"
                    value={input.password}
                    onChange={handleChangeForm}
                />
            </Form.Item>
            <Form.Item > 
                <Input
                    prefix={<Icon type="lock" style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir contraseña"
                    className="register-form__input"
                    value={input.repeatPassword}
                    onChange={handleChangeForm}
                />
            </Form.Item>
            <Form.Item className="no-margin"> 
                <Checkbox
                   name="privacyPolicy"
                   checked={input.privacyPolicy}
                   onChange={handleChangeForm}
                >
                    He leído y acepto la política de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item> 
                <Button
                    htmlType="submit"
                    className="register-form__button"
                >
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    )
}