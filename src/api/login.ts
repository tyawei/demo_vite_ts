import { AxiosPromise } from 'axios'
import request from '../utils/request.js'
import { ILogin, ILoginRes } from './i_http'

export const  http_login = (url: string, data: ILogin): AxiosPromise<ILoginRes> => {
  return request({ method: 'post', url, data })
}