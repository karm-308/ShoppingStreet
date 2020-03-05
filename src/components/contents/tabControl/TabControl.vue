<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="ItemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex:0
      }
    },
    props: {
      titles: {
        type: Array,
        default(){
          return{}
        }
      }
    },
    methods: {
      ItemClick(index){
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
.tab-control{
  width: 100%;
  height: 30px;
  display: flex;
  text-align: center;
  padding-top: 6px;
  font-weight: bold;
  /*解决导航控制器停留不透明*/
  background-color: #fff;
  z-index: 9;

}
  .tab-control-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
.active span{
  border-bottom: 3px solid var(--color-tint);
  padding: 3px;
}
</style>
