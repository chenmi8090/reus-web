import axios from 'axios'
import { getToken } from '@/utils/auth'

const enviorment = process.env
const baseURL = (enviorment.NODE_ENV === 'development') ? enviorment.BASE_API : ''
const path = '/reus'
// 创建axios实例
const service = axios.create({
  baseURL: baseURL + path,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

export default service
