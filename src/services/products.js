import { get,post } from '../utils/request'

export function fetchProducts(params){
  // 当发送get请求的时候axios需要把参数放在params中
  return get('/api/v1/products',{
    params
  })
}

export function Login(params){
  return post('api/v1/auth/login',params)
}
