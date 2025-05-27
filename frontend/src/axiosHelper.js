import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-type"] = 'application/json'


export const request = (method, url, data, includeAuth = true) => {
    const headers = {};

    //only if includeAuth is true the token will be sent in the header - for register and login, it will be false
    if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return axios({ method, url, data, headers });
};

