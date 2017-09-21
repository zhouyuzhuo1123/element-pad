<template>
<div class="login">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" placeholder="string"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="onSubmit">登陆</el-button>
    </el-form-item>
  </el-form>
  <div class="block">
    <i class="el-icon-information"></i>用户名将做为用户唯一标识
  </div>
</div>
</template>

<script>
  import fetch from '../core/http'
  export default {
    data() {
      return {
        msg:this.$t("navMenu[0].childMenu[0]"),
        form:{
        	username:'nihao'
        }
      }
    },
    methods: {
      onSubmit() {
        if(this.form.username){
    			localStorage.username = this.form.username;
    			this.$router.push('interface')
        } else {
        	this.$message('用户名还是要有的');
        }
      }
    }
  }

</script>

<style>
.login{
	display:flex;
	flex-direction:column;
	height:100%;
	align-items:center;
	justify-content:center;
}

</style>
