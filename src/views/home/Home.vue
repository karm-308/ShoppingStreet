<template>

  <div id="home">
    <nav-bar class="home-color"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
    <home-recommand-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
    <goods-list :goods="goods['pop'].list"/>
    <ul>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
      <li>列表1</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper';
  import TabControl from 'components/contents/tabControl/TabControl';

  import GoodsList from 'components/contents/goods/GoodsList'

  import HomeRecommandView from './childComps/HomeRecommandView'
  import FeatureView from './childComps/featureView'


  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      TabControl,
      GoodsList,

      HomeRecommandView,
      FeatureView

    },
    data() {
      return {
        //result:null
        banners: [],
        recommends: [],
        //默认显示第一页数据
        goods:{
          'pop' : {page:0, list:[]},
          'new' : {page:0, list:[]},
          'sell' : {page:0, list:[]}
        }
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      //2.请求商品数据,每种数据的第一组类型
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      //create1
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          //console.log(res);
          //this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      //create2
      getHomeGoods(type){
        //动态获取页数，可以复用,取出原来的page + 1
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          //局部变量会销毁，如何保存里面的数据
          //console.log(res);
          //将数组进行解析塞到list上去
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-color {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  /*简单实现导航控制器固定*/
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>
