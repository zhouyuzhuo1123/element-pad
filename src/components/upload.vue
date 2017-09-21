<template>
    <el-upload
		class="upload-demo"
		ref="upload"
		action="http://localhost:3003/api/log"
		:data="datas"
		:on-preview="handlePreview"
		:on-remove="handleRemove"
		:file-list="fileList"
		:on-success= "callback"
		:auto-upload="false">
		<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        datas:{name:'zyz'}
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      callback(){
      	console.log(111)
      }
    }
  }
</script>

