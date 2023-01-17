import axios from '../utils/request'

// 搜索
export const search = (params) => {
  return axios({
    method: 'get',
    url: '/search',
    params,
  })
}

// 搜索建议
export const suggest = (params) => {
  return axios({
    method: 'get',
    url: '/search/suggest',
    params,
  })
}
// 获取音乐url
export const songUrl = (params) => {
  return axios({
    method: 'get',
    url: '/song/url',
    params,
  })
}
// 获取我的喜欢音乐
export const playlist = (params) => {
  return axios({
    method: 'get',
    url: 'playlist/detail?id=6858720456',
    params,
  })
}
// 获取我的喜欢音乐
export const songDetail = (params) => {
  return axios({
    method: 'get',
    url: 'song/detail',
    params,
  })
}
// 获取歌词
export const lyric = (params) => {
  return axios({
    method: 'get',
    url: 'lyric',
    params,
  })
}