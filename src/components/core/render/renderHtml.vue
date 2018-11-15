<template>
<div class="block-content" ref="blockContent">
  <grid-layout
    :layout="renderData"
    :col-num="12"
    :row-height="30"
    :is-draggable="false"
    :is-resizable="false"
    :vertical-compact="false"
    :margin="[10, 10]"
    :use-css-transforms="false"
    style="overflow:auto;height:100%;z-index: 1;"
  >
  <div v-for="item in renderData" 
   ref="moveblock" style="position:relative">
  <grid-item
     :x="item.x"
     :y="item.y"
     :w="item.w"
     :h="item.h"
     :i="item.i"
     :isDraggable="false"
     :key = "item.i"
     >
    <div style="width:100%;height:100%;overflow:auto;">
      <component :is="item.name" :enterData="item"></component> 
    </div>
  </grid-item>
  </div>
</grid-layout> 
</div>
</template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  /*import test  from '../../test.vue'*/
  import tests from '../../tests.vue'
  export default {
    data() {
      return {
        layout: []
      };
    },
    async created(){
     console.log(this.renderData)
    },
    async mounted(){     
      this.$refs.blockContent.oncontextmenu=function(){return false;} 
    },
    props:{
			renderData:{
				type:Array,
				default(){
					return []
				}
			}
    },
    methods: {
     
    },
    components:{
      GridLayout,
      GridItem,
      /*test,*/
      tests
    }
  }
</script>

<style scoped>
.block-content{
  position:relative;
  height:100%;
  overflow: auto;
}
.list-box{
  display: inline-block;
  width:30%;
  height:100px;
  margin: 1.5%;
  background: #efe1e1;
}
.list-box .detail{
  display: block;
  height: 100%;
  text-decoration:none
}
.list-box .title{
  display: flex;
  font-size: 14px;
}
.list-box .title .name{
  background: #d89191;
  color: #fff;
  flex: 1;
}
.list-box .title .id{
  background: #a6d252;
  color:#fff;
  padding: 0 10px;
}
.top-bar{
  width:100%;
  height:5%;
  box-shadow: 0 0 16px rgba(0,0,0,.16);
  z-index: 2;
  display: flex;
  justify-content:flex-end;
  align-items:center;
  padding-right:20px;
  box-sizing: border-box;
}

.left-block-content::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.left-block-content::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #0e69b0;
}
.left-block-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    bbackground: #fff;
}
.testblock{
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px dotted #ff5000;
  margin:10px;
  background: #4e95cd;
  color:#FFF;
  border-radius: 5px;
}
.none{
  display: none;
}
.show{
  display: block;
}
.eidtBtn{
  position:absolute;
  left:10px;
  bottom:10px;
  cursor: pointer;
  color:#0e69b0;
}
.eidtBtn i{
  margin-right:8px;
}
</style>


