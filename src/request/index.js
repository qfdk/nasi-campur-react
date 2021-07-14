import axios from 'axios';
import qs from 'qs';

let instance = axios.create({
    baseURL: 'https://fr.qfdk.me', // 这里是本地express启动的服务地址
    timeout: 5000 // request timeout
});
instance.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        if (typeof (config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
            config.data = qs.stringify(config.data);
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(async data => {
    return data;
}, error => {
    if (error.response) {
        if (error.response.status === 500) {
            console.log('服务器错误，请联系管理员处理');
        }
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error);
    }
});

export default instance;
