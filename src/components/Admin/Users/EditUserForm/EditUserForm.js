import React, {useState, useCallback} from 'react';
import { Avatar, Form, Input, Icon, Select, Button, Row, Col } from 'antd';
import { useDropzone } from "react-dropzone";//compomente basado en HOOKS
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import "./EditUserForm.scss";

export default function EditUserForm (props) {
    const { user } = props;
    const [avatar, setAvatar] = useState();

    //console.log(avatar);
    

    return(
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <h2>EditUserForm</h2>
            {user.email}
        </div>
    )
}

function UploadAvatar(props) {
    const {avatar, setAvatar} = props;
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });
    return(
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar}/>
            ) : (
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    )
}