import { BASE_PATH, API_VERSION } from './config';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';
import jwtDecode from 'jwt-decode';

export function getAccessToken() {
   const accessToken = localStorage.getItem(ACCESS_TOKEN);
   //verificar fecha de expiración del token
   if (!accessToken || accessToken === "null") {
       return null;
   }

   return willExpireToken(accessToken) ? null : accessToken;
}
export function getRefreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken || refreshToken === "null") {
        return null
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
}

export function  refreshAccessToken(refreshToken){
    const url = `${BASE_PATH}/api/${API_VERSION}/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-type": "application/json"
        }
    };
    fetch(url, params)
        .then(response => {
            if (response.status != 200) {
                return null
            }
            return response.json();
        })
        .then(result => {
            if (!result) {
                // el token ha caducado y no se puede refrescar el token, se deslogea
                logOut();
            }else{
                const {accessToken, refreshToken} = result;
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshAccessToken);
            }
        })
}

export function logOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}


//Comprobar fechas de expiración de los tokens
function willExpireToken(token){
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + seconds) / 1000;

    //si el token ha caducado, retorna true, si no ha caducado retorna false
    return now > exp;
}