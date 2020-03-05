<template>
  <div class="goods">
<goods-list-item v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsList",
    props: {
      goods: {
        type:Array,
        defaults(){
          return[]
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  /*商品列表显示俩行*/
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
