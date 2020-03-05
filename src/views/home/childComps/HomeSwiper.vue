<template>
  <Swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image"/>
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
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

</style>
