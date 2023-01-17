import axios from '../utils/request'
// 登录
export const login=(params)=>{
  return axios({
    method:'get',
    url:'login/cellphone',
    params:{...params,csrf_token:"c96c3dd8c373fc01e4fcf20273562c60"},
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
// 登录状态
export const loginStatus=(params)=>{
  return axios({
    method:'get',
    url:'/login/status',
    params,
  })
}

// 退出登录
export const logout=(params)=>{
  return axios({
    method:'get',
    url:'/logout',
    params,
  })
}

// 获取用户歌单
export const playlist=(params)=>{
  return axios({
    method:'get',
    url:'/user/playlist',
    params,
  })
}