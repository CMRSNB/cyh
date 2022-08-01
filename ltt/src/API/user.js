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
