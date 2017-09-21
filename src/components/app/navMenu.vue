<template>
<div id="body">
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>{{$t("navMenu[0].name")}}</template>
      <el-menu-item-group>
        <a href="#/interFace"><el-menu-item index="1-1">{{$t("navMenu[0].childMenu[0]")}}</el-menu-item></a>
        <a href="#/interFaceList"><el-menu-item index="1-2">{{$t("navMenu[0].childMenu[1]")}}</el-menu-item></a>
      </el-menu-item-group>
    </el-submenu>
    <a href="#/language"><el-menu-item index="3"><i class="el-icon-setting"></i>{{$t("navMenu[3].name")}}</el-menu-item></a>
    <a href="#/upload"><el-menu-item index="3"><i class="el-icon-setting"></i>upload</el-menu-item></a>
  </el-menu>
  <div class="content">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
	name:'AppBody',
	data(){
		return {}
	},
	methods: {
	    handleOpen(key, keyPath) {
	      console.log(key, keyPath);
	    },
	    handleClose(key, keyPath) {
	      console.log(key, keyPath);
	    }
	}
}
</script>
<style scoped>
#body{
  display:flex;
  flex:1;
}
.el-menu-vertical-demo{
  width:200px;
}
.content{
  display:flex;
  flex-direction:column;
  height:100%;
  overflow:auto;
  flex:1;
}
	
</style>
