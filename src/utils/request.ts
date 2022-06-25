
// 封装请求
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getSessionStorage } from './util'
import { ElMessage } from 'element-plus'
// 请求
const request = axios.create({
    baseURL: "/",
    timeout: 10000
})
// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
    //请求头设置
    let token = getSessionStorage('token') || ''
    config.headers && (config.headers.Authorization = token)
    return config
}, err => {
    console.log(err);
})
// 响应拦截
request.interceptors.response.use((res: AxiosResponse) => {
    // 对响应码的处理
    const { msg: message='' } = res.data
    switch (res.status) {
        case 200:
            ElMessage({
                message,
                type: 'success',
            })
            break;
        case 400:
            ElMessage({
              message,
              type: 'warning',
            })
            break;
        case 401:
            ElMessage({
              message,
              type: 'warning',
            })
            break;
        case 403:
            ElMessage({
              message,
              type: 'warning',
            })
            break;
        case 404:
            ElMessage({
              message,
              type: 'warning',
            })
            break;
        case 500:
            ElMessage({
              message,
              type: 'error',
            })
            break;
    }
    return res.data
}, err => {
    console.log('请求失败==>', err);
})
export default request