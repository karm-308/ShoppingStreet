import {request} from './request';

//banner，recommend
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })

}
//http://123.207.32.32:8000/api/wh/home/data?type=pop&page=1
//http://123.207.32.32:8000/api/wh/home/data?type=sell&page=1
//http://123.207.32.32:8000/api/wh/home/data?type=new&page=1
//封装商品列表相关的，需要传递参数
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
