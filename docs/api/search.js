import axios from '../utils/request'

// 搜索
export const search=(params)=>{
    return axios({
      method:'get',
      url:'/search',
      params,
    })
  }

  // 搜索建议
export const suggest=(params)=>{
  return axios({
    method:'get',
    url:'/search/suggest',
    params,
  })
}

  // 获取音乐url
  export const songUrl=(params)=>{
    return axios({
      method:'get',
      url:'/song/url',
      params,
    })
  }