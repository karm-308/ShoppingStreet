<template>
<div class="recommand">
  <div v-for="item in recommends" class="recommandItem">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
  export default {
    name: "HomeRecommandView",
    props: {
      recommends:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommand{
  display: flex;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #666666;
  /*上面，左右，下面*/
  padding: 10px 0 20px;
  border-bottom: 8px solid #eeeeee;
}
  .recommandItem{
    flex: 1;
  }
  img{
    width: 70px;
    height: 70px;
  }
</style>
