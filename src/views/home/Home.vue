<template>
  <div id="home">
    <nav-bar class="home-color"><div slot="center">购物街</div></nav-bar>
    <!--另外找一个导航控制器固定在顶部-->
    <tab-control ref="tabControl"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" class="tab-control"v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="LoadMore">
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad"/>
      <home-recommand-view :recommends="recommends"/>
      <feature-view/>
      <!--监听里面往外面传的数据-->
      <tab-control ref="tabContro2"
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
  import {debounce} from "common/utils";

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
        isShowBackTop:false,
        //获取tabcontrol的offsetTop
        tabOffsetTop: 0,
      //  默认情况下不需要吸顶
        isTabFixed:false,
      //  离开时，保存一个位置信息
        saveY:0
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
    destroyed(){
      console.log('home destory');
    },
    //离开时, 保存一个位置信息saveY.
   // * 进来时, 将位置设置为原来保存的位置saveY信息即可.
    activated(){
     // console.log("....");
      this.$refs.scroll.scrollTo(0, this.saveY,0)
      //  返回时候刷新一次
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //console.log("+++++");
      this.saveY = this.$refs.scroll.getScrollY();

    },
    mounted(){
      //将refresh传到的bounce上，执行debounce函数
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      //  组件创建完之后，等待监听发射的图片加载事件
      this.$bus.$on('itemImageLoad',()=>{
        //防止被调用30次，所以不要执行refresh函数，将refresh传到的bounce上，执行debounce函数
        //console.log('11111111');
        //  直接调用scroll的refresh方法
        //this.$refs.scroll.refresh()
        refresh()
      })
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
      //  因为有两个导航控制器，所以要设置一直的index
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabContro2.currentIndex = index;
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
        //判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      //  决定tabControl是否吸顶（position:fixed）,isShowBackTop动态绑定class
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //上拉加载更多
      LoadMore(){
        this.getHomeGoods(this.currentType)
      },
      //拿到加载完的轮播图之后再进行计算offsetTop
      swipperImageLoad(){
        //  获取tabcontrol的offsetTop
        //  所有的组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabContro2.$el.offsetTop;
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
    /*padding-top: 44px;*/
    /*vh  适口高度*/
    height: 100vh;
    position: relative;
  }

  .home-color {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*简单实现导航控制器固定,因为不是原生的滚动条，所以没有效果了*/
  /*.tab-control {*/
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 9;*/
  /*}*/
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
  .tab-control{
    position: relative;
    z-index: 9;
  }

</style>
