<template>
  <render-html :renderData="previewData"></render-html>
</template>

<script>
  import renderHtml from "./core/render/renderHtml.vue";
  export default {
    data() {
      return {
        
      };
    },
    created(){
    	//console.log(this.previewData)
    },
    props:{
			previewData:{
				type:Array,
				default(){
					return []
				}
			}
    },
    components:{
      renderHtml
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

