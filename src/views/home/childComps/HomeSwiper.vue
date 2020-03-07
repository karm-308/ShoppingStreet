<template>
  <Swiper>
    <swiper-item v-for="item in banners">
        <a :href="item.link">
          <!--imageLoad监听图片是否加载完-->
        <img :src="item.image" @load="imageLoad"/>
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/Swiper';
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return[]
        }
      }
    },
    data(){
      return{
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      //通过自定义事件传给home,判断图片是否加载，如果加载了就不要重复加载
      imageLoad(){
        if (!this.isLoad){
          this.$emit('swipperImageLoad');
          this.isLoad = true
        }
        //console.log('.....');
      }
    }
  }
</script>

<style scoped>

</style>
