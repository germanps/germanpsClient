import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import './RegisterForm.scss';
import { 
    emailValidation, 
    minLengthValidation 
} from '../../../utils/formValidation';
import { signUpApi } from "../../../api/user";

export default function RegisterForm () {

    //states
    const [input, setInput] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });
    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    })


    //Methods
    const handleInputValidation = e => {
        const { type, name } = e.target
        if(type === "email"){
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)//returns true or false
            })
        }
        if (type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)//return true or false
            })
        }
        if(type === "checkbox"){
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            })
        }
    }
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

    const handleSubmitForm = async e => {
        e.preventDefault();
        const { email, password, repeatPassword, privacyPolicy } = formValid;
        // const emailVal = input.email;
        const passwordVal = input.password;
        const repeatPasswordVal = input.repeatPassword;
        // const privacyPolicyVal = input.privacyPolicy;
        if(!email || !password || !repeatPassword || !privacyPolicy){
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        }else{
            if(passwordVal !== repeatPasswordVal){
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales"
                });
            }else{
                // Validación del front OK 
                const result = await signUpApi(input);
                // Validamos desde el servidor
                if(!result.ok){
                    notification["error"]({
                        message: result.message
                    })
                } else {
                    notification["success"]({
                        message: result.message
                    })
                    resetForm();
                }
            }
        }
    }

    const resetForm = () => {
        // quitamos las clases de los inputs
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }
        // reseteamos los estados
        setInput({
            email: "",
            password: "",
            repeatPassword: "",
            privacyPolicy: false
        });
        setFormValid({
            email: false,
            password: false,
            repeatPassword: false,
            privacyPolicy: false
        })
    }

    return(
        <Form className="register-form" onSubmit={handleSubmitForm} onChange={handleChangeForm}>
            <Form.Item> 
                <Input
                    prefix={<Icon type="user" style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    className="register-form__input"
                    value={input.email}
                    onChange={handleInputValidation}
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
                    onChange={handleInputValidation}
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
                    onChange={handleInputValidation}
                />
            </Form.Item>
            <Form.Item className="no-margin"> 
                <Checkbox
                   name="privacyPolicy"
                   checked={input.privacyPolicy}
                   onChange={handleInputValidation}
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