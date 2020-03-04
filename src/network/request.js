import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // baseURI: 'http://106.54.54.237:8000/api/wh'或http://123.207.32.32:8000/api/wh
    baseURL: 'http://123.207.32.32:8000/api/wh',
    timeout: 5000
  })
  //2.axios的拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  },err => {

  })
  //2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })
  //3.发送真正的网络请求,应为返回的是一个promise，所有其他地方在调用的时候直接.then
  return instance(config)
}
