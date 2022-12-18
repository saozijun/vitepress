import axios from '../utils/request'
// 登录
export const login=(params)=>{
  return axios({
    method:'get',
    url:'login/cellphone',
    params,
  })
}
// 游客登录
export const register=(params)=>{
    return axios({
      method:'get',
      url:'/register/anonimous',
      params,
    })
  }