<template>
	<div id="head">
      <div class="title">{{$t("title")}}{{username}}</div>
      <el-dropdown @command="handleCommand">
        <img class="head-logo" src="../../assets/logo.jpg" draggable="true" @dragstart="drag" id="drag1" />
        <el-dropdown-menu slot="dropdown">
          	<el-dropdown-item command="1">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
export default {
	name:'AppHead',
	data(){
		return {
      username:localStorage.username
    }
	},
  methods:{
    handleCommand(command){
      if(command == 1){
        localStorage.username = '';
        this.$router.push('login')
      }
    },
    drag(e){
      console.log(e)
    }
  },
	props: {
	    items: {
	      type: Array,
	      default: []
	    }
	}
}
</script>
<style scoped>
#head{
  height:70px;
  width:100%;
  background: #0d0646;
  box-shadow: 0px 2px 4px #FF5000;
  display:flex;
  align-items: center;
  color:#FFF;
}
#head .title{
  flex:1;
  margin-left:20px;
  font-size:20px
}
#head .head-logo{
  width: 50px;
  margin-right: 20px;
  border-radius: 100%;
  cursor: pointer;
}
	
</style>