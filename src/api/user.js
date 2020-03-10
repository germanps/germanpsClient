import { BASE_PATH, API_VERSION } from './config';

export function signUpApi(data) {
    const url = `${BASE_PATH}/api/${API_VERSION}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }    

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {           
            if(result.user){
                return {ok: true, message: "Usuario creado correctamente!"}
            }
            return {ok: false,message: result.message}
        })
        .catch(err => {
            return { ok: false,message: err.message }
        });

}

export function signInApi(data){
    const url = `${BASE_PATH}/api/${API_VERSION}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
            
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        })
    
}

export function getUsersApi(token) {//enviamos el token para su comprobación
    const url = `${BASE_PATH}/api/${API_VERSION}/users`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function getUsersActiveApi(token, status) {//enviamos el token para su comprobación
    const url = `${BASE_PATH}/api/${API_VERSION}/users-active?active=${status}`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
}

export function uploadAvatarApi(token, avatar, userId) {
    const url = `${BASE_PATH}/api/${API_VERSION}/upload-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: token
        }
    }
    return fetch(url, params).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });
}

export function getAvatarApi(avatarName) {
    const url = `${BASE_PATH}/api/${API_VERSION}/get-avatar/${avatarName}`;
    return fetch(url).then(response => {
        return response.url;
    }).catch(err => {
        return err.message;
    });
}