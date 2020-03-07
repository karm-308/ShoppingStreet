<template>
  <div class="GoodsListItem">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div class="info">
      <p>{{goodsItem.title}}</p>
      <span class="price">${{goodsItem.price}}</span>
      <!--收藏图标-->
      <img src="~assets/images/home/cfav.svg"/>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return{}
        }
      }
    },
    methods: {
      //监听图片是否加载完
      imageLoad(){
        //console.log('imageLoad');
        //用事件总线发射事件,在首页进行监听,默认$bus为空，所以得用vue原型增加一个事件，在main.js
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .GoodsListItem{
    position: relative;
    margin: 0 0 50px 0;
    color: #666666;
    font-size: 14px;
    width: 48%;
  }
.GoodsListItem img{
  border-radius: 15px;
  width: 100%;
}
  .info{
    position: absolute;
    left: 10px;
    bottom: -40px;
  }
  .info p{
    width:150px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .info img{
    width: 17px;
    height: 17px;
    padding-top: 3px;
  }
  .info .price{
    color: palevioletred;
    margin-left: 20px;
  }

</style>
