import { AxiosPromise } from 'axios'
import request from '../utils/request'
import { IMenuListRes } from './i_http'

export const  http_getmenu = (url: string, data: any): AxiosPromise<IMenuListRes> => {
  return request({ method: 'get', url, data })
}