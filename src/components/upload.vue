<template>
<div class="block-content" ref="blockContent">
  <div class="left-block-content">
      <div class="testblock" v-for="(block,idx) in blockList" @click="addBlock(idx)">{{block.name}}</div>
  </div>
  <div class="top-bar">
    <el-button type="success" size="small" @click="previewVisible = true" >预览</el-button>
    <el-button type="success" size="small">重置</el-button>
    <el-button type="warning" size="small" @click="dialogFormVisible = true">提交</el-button>
    <el-button type="danger" size="small">退出</el-button>
  </div>
  <grid-layout
    :layout="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
    style="margin-left:200px;overflow:auto;height:95%;background:#EEE;z-index: 1;"
  >
  <div v-for="item in layout" @dblclick="clickEvent(item.i)" 
    @contextmenu="rightEvent(item.i)" ref="moveblock" style="position:relative" @mouseover="moveIn(item.i)" @mouseout="moveOut(item.i)">
      <grid-item style="background:#CCC;" 
       :x="item.x"
       :y="item.y"
       :w="item.w"
       :h="item.h"
       :i="item.i"
       :isDraggable="true"
       :key = "item.i"
       @resize="resizeEvent"
       @move="moveEvent"
       @resized="resizedEvent"
       @moved="movedEvent"
      >
      <div>
        {{item.title}}
      </div>
      <div>
        <span :class="{eidtBtn:true, none:true,show :item.editBtn }"><i @click.stop="deletes(item.i)" class="el-icon-delete2"></i><i @click.stop="editBlock(item)" class="el-icon-setting"></i></span>
      </div>
      </grid-item>
    </div>
  </grid-layout>
  <el-dialog title="页面基本信息" :visible.sync="dialogFormVisible"> 
    <el-form :model="form">
      <el-form-item label="页面ID">
        <el-input v-model="form.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="页面名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submits" >确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="模块配置" :visible.sync="dialogComponentEditVisible"> 
    <div>
      <label>可选字段配置：</label>
      <template v-for="item in curComponent">
        <div class="item-list">
          <span class="label">{{item.label}}</span>
          <el-switch
            v-model="item.isshow"
            on-color="#13ce66"
            off-color="#ff4949">
          </el-switch>
        </div>
      </template>
    </div>
    <div>
      <label>样式配置：</label>
      
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogComponentEditVisible = false">确 定</el-button>
      <!-- <el-button type="primary" @click="submits" >确 定</el-button> -->
    </div>
  </el-dialog>
  
  <el-dialog title="页面预览" :visible.sync="previewVisible"> 
    <div>
      <preview-detail :previewData="layout"></preview-detail>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="previewVisible = false">确 定</el-button>
      <!-- <el-button type="primary" @click="submits" >确 定</el-button> -->
    </div>
  </el-dialog>

</div>
</template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  import fetch from '../core/http'
  import previewDetail  from './previewDetail.vue'
  var testLayout = [
    /*  {"x":0,"y":0,"w":2,"h":5,"i":"0",block:{},"editBtn":false},
      {"x":2,"y":0,"w":2,"h":4,"i":"1"},*/
  ];

  var blockList = [
    { title:'表格测试模块一',
      name:'test',
      configurable:true,
      class:[
        'zyz'
      ],
      option:{
        index:true,
        fields:[
          {label:'日期',property:"date",isshow:true},
          {label:'接口ID',property:"id",isshow:true},
          {label:'数据',property:"data",isshow:true},
          {label:'描述',property:"des",isshow:true},
        ]
    }},
    { title:'表格测试模块二',
      name:'tests',
      configurable:true,
      class:[
        'zyz'
      ],
      option:{
        index:true,
        fields:[
          {label:'日期',property:"date",isshow:true},
          {label:'接口ID',property:"id",isshow:true},
          {label:'数据',property:"data",isshow:true},
          {label:'描述',property:"des",isshow:true},
        ]
    }},
  ];
  export default {
    data() {
      return {
        layout: [],
        blockList: blockList,
        index:0,
        dialogFormVisible:false,
        dialogComponentEditVisible:false,
        previewVisible:false,
        form:{
          name:'',
          id:''
        },
        curComponent:[

        ],
        ComponentSelect:[

        ],
      };
    },
    mounted(){
      /*this.$refs.moveblock.forEach((dom)=>{
          dom.onselectstart = function(){
            return false
          }
      })*/
      this.$refs.blockContent.oncontextmenu=function(){return false;} 
    },
    methods: {
      //宽度等分12份;
      moveEvent: function(i, newX, newY){
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resizeEvent: function(i, newH, newW){
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW);
      },
      movedEvent: function(i, newX, newY){
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
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
      addBlock(idx){
        let ops = Object.assign({"x":2,"y":0,"w":4,"h":8,i:this.index++,"blockName":'',"editBtn":false},blockList[idx])
        this.layout.push(ops)
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
      deletes(index){
        this.layout.forEach((its,j)=>{
          if(its.i == index){
            this.layout.splice(j,1)
          }
        })
      },
      editBlock(val){
        this.dialogComponentEditVisible = true;
        this.curComponent = val.option.fields
      },
      async submits(){
        const datas = {
          name:this.form.name,
          id:this.form.id,
          data:this.layout,
        }
        const data = await fetch.post('/api/widget',{body:datas});
        data.success &&　this.$message(data.msg || '保存成功');
        this.dialogFormVisible = false;
      },
      changes(val){
        console.log(val)
      },
      preview(){
        this.$router.push({ path: 'widget', query: {data:this.layout}})
      }
    },
    components:{
      GridLayout,
      GridItem,
      previewDetail
    }
  }
</script>

<style scoped>
.block-content{
  position:relative;
  height:100%;
  overflow: hidden;
  display: flex;
  flex-direction:column;
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
.left-block-content{
  width:200px;
  height:95%;
  position:absolute;
  left:0;
  top:5%;
  background: #FFF;
  overflow:auto;
  z-index: 1;
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
  background: url('../assets/chart.png') center center no-repeat;
  background-size:contain;
  cursor: pointer;
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

.item-list{
  display: flex;
  padding: 10px;
}
.item-list .label{
  width:20%;
}
</style>

