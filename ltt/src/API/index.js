import axios from 'axios';
axios.defaults.baseURL =
  "https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http";

// 响应拦截
axios.interceptors.response.use((res)=>{
  console.log(res);
  return res.data
})

export default axios;