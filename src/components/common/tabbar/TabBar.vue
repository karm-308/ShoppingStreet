<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  /*文字水平分布*/
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /*将tabbar固定在下面*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*上边框有阴影  box-shadow：x,y,模糊程度，颜色*/
    box-shadow: 0 -3px 1px rgba(100,100,100,0.2);
  }
</style>
