import Vue from 'vue'
import Router from 'vue-router'

//懒加载
const Home = () => import ('../views/home/Home');
const ShopCart = () => import ('../views/shopcart/ShopCart');
const Profile = () => import ('../views/profile/Profile');
const Category = () => import ('../views/category/Category');

//1.通过插件安装路由
Vue.use(Router)

//2.创建Router对象,配置路由和组件之间的映射关系
const routes = [
  {
    path: '/',
    redirect: 'Home'

  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcart',
    component: ShopCart
  }
];

//3.将Router对象传入vue实例中
export default new Router({
  mode:'history',
  //4.应用routes对象
  routes
})
