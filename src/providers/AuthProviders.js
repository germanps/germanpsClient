import React, {useState, useEffect, createContext} from 'react';
import jwtDecode from 'jwt-decode';
import { 
    getAccessTokenApi, 
    refreshAccessTokenApi,
    getRefreshTokenApi, 
    logOut 
} from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props) {
    const {children} = props;
    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    //didMount
    useEffect(() => {
        checkUserLogin(setUser)
    }, []);

    return  <AuthContext.Provider
                value={user}
            >
                {children}
            </AuthContext.Provider>
}

function checkUserLogin(setUser) {
    const accessToken = getAccessTokenApi();

    if (!accessToken) {
        //si ha caducado el accessToken
        const refreshToken = getRefreshTokenApi();
        
        if (!refreshToken) {
            //si ha caducado el refreshToken
            logOut();
            setUser({
                user: null,
                isLoading: false
            })
        } else {
            //actualizamos el refreshToken
            refreshAccessTokenApi(refreshToken);
        }
    } else{
        setUser({
            user: jwtDecode(accessToken),
            isLoading: false
        })
    }
    
}