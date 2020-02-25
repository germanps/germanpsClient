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

    fetch(url, params)
        .then(response => {
            //return response.json();
            console.log(response);
            
        })

}