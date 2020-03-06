<template>

</template>

<script>
  // 导入better-scroll
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data(){
      return{
        scroll:null

      }
    },
    //组件创建完之后才有DOM属性
    mounted(){
       this.scroll = new BScroll('.wrapper',{
         probeType: 3,
         pullUpLoad:true

      });
      this.scroll.on('scroll',(position)=> {
        //console.log(position);
      });
      this.scroll.on('pullingUp',()=>{
        console.log("上拉加载更多");
      })
    }
  }
</script>

<style scoped>
  /*better-scroll实现局部滚动设置*/
.wrapper{
  height: 150px;
  background-color: red;
  /*超出的高度隐藏*/
  overflow: hidden;
  /*在y轴可以滚动*/
  /*overflow-y: scroll;*/
}
</style>
