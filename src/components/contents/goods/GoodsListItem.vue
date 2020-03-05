<template>
  <div class="GoodsListItem">
    <img :src="goodsItem.show.img" alt="">
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
