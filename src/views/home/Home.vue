<template>

  <div id="home">
    <nav-bar class="home-color">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="LoadMore">
      <home-swiper :banners="banners"/>
      <home-recommand-view :recommends="recommends"/>
      <feature-view/>
      <!--监听里面往外面传的数据-->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import HomeRecommandView from './childComps/HomeRecommandView'
  import FeatureView from './childComps/featureView'


  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/contents/tabControl/TabControl';
  import GoodsList from 'components/contents/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/contents/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,//首页导航
      HomeSwiper,//轮播图
      TabControl,//导航控制栏
      GoodsList,//商品列表
      Scroll,//滚动条
      FeatureView,
      HomeRecommandView,//推荐列表
      BackTop//上拉列表


    },
    data() {
      return {
        //result:null
        banners: [],
        recommends: [],
        //默认显示第一页数据
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        //  默认当前的类型是pop
        currentType: 'pop',
        //定义变量，说明上拉箭头是否显示
        isShowBackTop:false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
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
      /*
      *
      * 事件监听相关的
      * */
      tabClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      //监听上拉按钮,利用ref拿到，Scroll.vue上的scroll对象
      backClick(){
        //console.log("click");
        //第一种
       // this.$refs.scroll.scroll.scrollTo(0,0,500)
       // 第二种
        this.$refs.scroll.scrollTo(0,0)
      },
      //从子组件中自定义的事件，拿取实时监听的位置
      contentScroll(position){
        //console.log(position);
        this.isShowBackTop = (-position.y) > 1000

      },
      //上拉加载更多
      LoadMore(){
        //console.log('111');
        //针对对应的类型加载更多的数据
        this.getHomeGoods(this.currentType)
      },
      /*
      * 网络请求相关的
      * */
      //create1
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res);
          //this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      //create2
      getHomeGoods(type) {
        //动态获取页数，可以复用,取出原来的page + 1
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          //局部变量会销毁，如何保存里面的数据
          //console.log(res);
          //将数组进行解析塞到list上去
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

        //  完成加载之后清掉记录
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /*vh  适口高度*/
    height: 100vh;
    position: relative;
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
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /*滚动条高度*/
  .content{
    /*计算滚动条高度*/
    /*height: calc(100% - 93px);*/
    overflow: hidden;
    /*margin-top: 50px;*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
