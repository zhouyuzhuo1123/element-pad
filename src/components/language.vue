<template>
  <div class="block">
    <span>{{$t("navMenu[3].name")}}:</span>
    <el-radio-group v-model="radio3" @change="choiceLang">
      <el-radio-button label="中文"></el-radio-button>
      <el-radio-button label="English"></el-radio-button>
      <el-radio-button label="日本語"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        radio3:''
      };
    },
    methods:{
      choiceLang(lang){
        localStorage.lang = lang === '中文' ? 'zh-cn' : lang === 'English' ? 'en' : 'ja';
        Vue.config.lang = localStorage.lang
      }
    }
  }
</script>
<style>
.block{
  padding:20px;
  align-items:center;
  display:flex;
}

</style>