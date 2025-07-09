import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log("Axios base URL set to:", axios.defaults.baseURL);
axios.defaults.headers.post["Content-type"] = 'application/json';

//deal with 401 and 403s here instead of checking whether a token exists on every single page
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const request = (method, url, data, includeAuth = true) => {
    const headers = {};

    //only if includeAuth is true the token will be sent in the header - for register and login, it will be false
    if (includeAuth) {
        const token = sessionStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return axios({ method, url, data, headers });
};

