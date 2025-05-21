import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-type"] = 'application/json'

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};

