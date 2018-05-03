<template>
  <div class="hello">
    <div class="header">
        <h2>{{ msg }}</h2>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">{{$t("navMenu[0].name")}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ msg }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      v-loading="loading"
      element-loading-text="加载中"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="80"
        v-if="false">
      </el-table-column>
      <template v-for="item in test">
        <el-table-column
          :property="item.property"
          :label="item.label"
          v-if="true">
        </el-table-column>
      </template>
      <el-table-column
        property="date"
        label="日期"
        v-if="false">
      </el-table-column>
      <el-table-column
        property="id"
        label="接口ID">
      </el-table-column>
      <el-table-column
        property="data"
        label="数据">
      </el-table-column>
      <el-table-column
        property="des"
        label="描述">
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleWatch(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="block">
      <el-pagination
        layout="total,prev, pager, next"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <span>接口地址：http:10.86.87.112:3003/api/apidetail?id={{selectId}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import fetch from '../../core/http'

export default {
  name: 'interface',
  data () {
    return {
      msg: this.$t("navMenu[0].childMenu[1]"),
      totalNum : 0,
      dialogVisible: false,
      selectId:null,
      tableData: [],
      loading:true,
      test:[
        {label:'zyz',property:"des"},
        {label:'id',property:"id"},
      ]
    }
  },
  async created(){
      const { content } = await fetch.get('/api/getapi',{pageNum:1});
      content.data = content.data.map((item)=>{
        item.data = JSON.stringify(item.data);
        return item;
      })
      this.tableData = content.data;
      this.totalNum = content.count;
      this.loading = false;

  },
  methods:{
    handleSizeChange(val){
      console.log(`${val}`)
    },
    async handleCurrentChange(val){
      this.loading = true;
      const { content } = await fetch.get('/api/getapi',{pageNum:val});
      this.tableData = content.data;
      this.loading = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleWatch(index, row){
      this.dialogVisible = true;
      this.selectId = row.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.header{
  display:flex;
  align-items: center;
  padding:2px 10px;
}
.header h2{
  flex:1;
}
.block{
  margin:10px;
}
</style>