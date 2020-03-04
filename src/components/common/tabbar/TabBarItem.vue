<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"> <slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path:String,
      activeColor: {
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        //isActive:false
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : { }
      }
    },
    methods:{
      itemClick(){
        //console.log("item");
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  /*每一份文字均等分*/
  .tab-bar-item{
    flex: 1;
    text-align: center;
    /*tabbar高度一般是49px*/
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    /*取消文字和图片之间的间隙*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
