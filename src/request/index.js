import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://fr.qfdk.me' : 'http://localhost:5000', // 这里是本地express启动的服务地址
    timeout: 8000 // request timeout
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

instance.isCancel = axios.isCancel;
instance.CancelToken = axios.CancelToken;

export default instance;
