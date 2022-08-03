import axios from './index'

export function login(params){ 
    return axios.post('/user/login',params)
}
export function getuserInfo(params){
    return axios.post('/user/getuserInfo',params)
}//获取用户信息


export function scqn(params){
  return axios.post("/upload/token",params)
}//上传7牛云获取token
export function scqny(params){
 return  axios.post("https://upload-z1.qiniup.com", params)
}//上传7牛云获取图片连接
export function scwz(params){
  return axios.post('/api/get_fav_list',params)
}//文章收仓
export function ls(params){
  return axios.post('/api/get_history_list?uid=60eb03731ccee70001adb1d0&skip&limit',params)
}//文章历史
export function editUserInfo(params){
  return axios.post('/user/editUserInfo',params)
}//修改用户信息
export function wdfb(params){
  return axios.post('/api/get_user_article_list?uid=60eb03731ccee70001adb1d0&skip&limit',params)
}//我的发布
export function shfb(params){
  return axios.post('/api/del_user_article',params)
}//删除发布