<template>
<div class="hello">
  <div class="header">
      <h2>{{ msg }}</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t("navMenu[0].name")}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ msg }}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
  <el-form ref="form" :model="form" label-width="80px" style="margin:40px;width:60%;min-width:600px;">
    <el-form-item label="接口ID">
      <el-input v-model="form.id" placeholder="string"></el-input>
    </el-form-item>
    <div calss="block">
      <el-row v-for="(param,index) in params" :key="index">
        <el-col :span="10">
          <el-form-item label="key">
            <el-input v-model="param.key" @change="validate(param.key,index)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="value">
            <el-input v-model="param.value"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="delparams(index)" class="btn-del btn" v-if="params.length > 1">-</el-button>
          <el-button type="primary" @click="addparams" class="btn-add btn" v-if="index == (params.length-1)">+</el-button>
          
        </el-col>
      </el-row>
    </div>
    <el-form-item label="接口说明">
      <el-input type="textarea" v-model="form.des" placeholder=""></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.prevent="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
  <div class="block" v-if="showApi">
    接口地址：http:10.86.87.112:3003/api/apidetail?id={{form.id}}
  </div>
</div>
</template>

<script>
  import fetch from '../../core/http'
  export default {
    data() {
      return {
        msg:this.$t("navMenu[0].childMenu[0]"),
        form: {
          id: '',
          data:null,
          des:''
        },
        params:[
          {key:'',value:''}
        ]
      }
    },
    computed:{
      showApi:function(){
        return this.form.id !== ''
      }
    },
    methods: {
      async onSubmit() {
        if(this.form.id){
           let map = {};
           this.params.forEach((items)=>{
              if(items.key && items.key) map[items.key] = JSON.parse(items.value)
           })
           this.form.data = map;
          // const data = await fetch.post('/api/setapi',{body:this.form});
          // data.success &&　this.$message(data.msg || '保存成功');
        }else{
           this.$message('接口id还是要有的');
        }
         
      },
      addparams(){
        this.params.push({key:'',value:''})
      },
      delparams(index){
        this.params.splice(index,1);
      },
      validate(data,index){
        this.params[index].key = this.params[index].key.replace(/[^A-Za-z]/g,'')
      }
    }
  }

</script>

<style>
.header{
  display:flex;
  align-items: center;
  padding:2px 10px;
}
.header h2{
  flex:1;
}
.btn{
  margin-left:10px
}
</style>