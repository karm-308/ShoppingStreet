<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <!--如果搞一个插槽，插槽外部定义的东西就会搬过来-->
    <slot></slot>
  </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: "Scroll",
    //定义probeType的变量
    props: {
      probeType: {
        type: Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scorll: null
      }
    },
    mounted(){
      //创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        //定义probeType变量
        probeType: this.probeType,
        //上拉加载更多
        pullUpLoad: this.pullUpLoad
      });
      //监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        //console.log(position);
        //因为主要真正应用在home上，所以子组件对外自定义事件
        this.$emit('scroll',position)
      });
      //监听上拉加载更多
      this.scroll.on('pullingUp',()=> {
        //console.log("上拉加载更多");
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x,y,time=600){
        this.scroll.scrollTo(x,y,time)
      },
      //完成加载更多之后传给home清除记录
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
