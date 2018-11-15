<template>
<div class="block-content" ref="blockContent">
  <div v-for="item in widgetlist" class="list-box">
    <a :href="'#/widget?id='+item.id" class="detail">
      <div class="title">
        <span class="name">{{item.name}}</span>
        <span class="id">{{item.id}}</span>
      </div>
    </a>
  </div>
</div>
</template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  import fetch from '../core/http'
  var testLayout = [
      {"x":0,"y":0,"w":2,"h":5,"i":"0",block:{},"editBtn":false},
      {"x":2,"y":0,"w":2,"h":4,"i":"1"},
  ];

  export default {
    data() {
      return {
        layout: [],
        widgetlist:[]
      };
    },
    async mounted(){
      /*this.$refs.moveblock.forEach((dom)=>{
          dom.onselectstart = function(){
            return false
          }
      })*/
      const data = await fetch.get('/api/widgetlist');
      this.widgetlist = data.content.data;
      this.$refs.blockContent.oncontextmenu=function(){return false;} 
    },
    methods: {
      moveIn(index){
        this.layout.forEach((its,j)=>{
          if(its.i == index){
            this.layout[j].editBtn = true
          }
        })
      },
      moveOut(index){
        this.layout.forEach((its,j)=>{
          if(its.i == index){
            this.layout[j].editBtn = false
          }
        })
      },
      addBlock(){
        this.layout.push({"x":2,"y":0,"w":4,"h":8,"i":this.index++,"editBtn":false})
        this.$nextTick(()=>{
          this.$refs.moveblock[this.$refs.moveblock.length-1].onselectstart = function(){
            return false
          }
        })
       
      },
      async clickEvent(val){
        console.log(this.layout)
        //const data = await fetch.post('/api/setapi',{body:this.layout});
        return false
      },
      rightEvent(val){
        console.log(val)
        return false
      },
      zyz(index){
        this.layout.forEach((its,j)=>{
          if(its.i == index){
            this.layout.splice(j,1)
          }
        })
      }
    },
    components:{
      GridLayout,
      GridItem
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
  height:150px;
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

