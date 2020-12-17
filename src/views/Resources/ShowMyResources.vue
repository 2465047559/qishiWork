<template>
  <div>
    <el-table
            v-loading="loading"
            element-loading-text="骑士作业排名加载中..."
            :data="tableData"
            :highlight-current-row="true"
            :lazy="true"
            border
            style="width: 100%;">
      <el-table-column
              prop="shoppingName"
              label="资源名称"
              align="center"
              width="180">
      </el-table-column>
      <el-table-column
              prop=""
              align="center"
              label="资源图标"
              width="120">
        <template scope="scope">
          <el-image
                  style="width: 90px; height: 90px"
                  :src="scope.row.shoppingImg">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
              prop="myShoppingIndex"
              align="center"
              label="资源类型"
              width="130">
        <template scope="scope">
          <span>{{scope.row.myShoppingIndex === 0? '编程软件':
            scope.row.myShoppingIndex === 1? '图片资源':
            scope.row.myShoppingIndex === 2? '编程文档':
            scope.row.myShoppingIndex === 3? 'SSM项目': '其他资源'}}</span>
        </template>
      </el-table-column>
      <el-table-column
              prop="shoppingHref"
              align="center"
              label="资源链接">
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       width="250">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入资源名称">
            <el-button slot="append" icon="el-icon-search" @click="searchOneResource"></el-button>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)">修改资源</el-button>
      
          <el-button style="margin-left: 20px"
                     size="mini"
                     type="danger"
                     @click="orderDelete(scope.$index, scope.row)">资源下架</el-button>
    
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            :page-size="5"
            :pager-count="11"
            style="text-align: left"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="this.$store.state.ResourcesTotal">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "ShowMyResources",
    data() {
      return {
        tableData: [],
        nowPage: 1,
        search: '',
        loading: true,
      }
    },
    methods:{
      //获取所有的资源长度
      getMyResourcesTotal(){
        this.$axios({
          url: "/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"myShopping\").count()"
          }
        }).then( res => {
          //console.log("获取长度",res.data.data.length);
          this.$store.commit("getResourcesTotal",res.data.pager.Total);  //获取长度并且提交到全局
        }).catch( err => {
          console.log(err);
        })
      },
      
      //获取所有的资源
      getMyResources(){
        this.loading = true;
        this.tableData = [];
        let query = "db.collection(\"myShopping\").limit(5).skip("+((this.nowPage-1)*5)+").get()";
        //发送请求
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": query
          },
        }).then( res => {
          console.log(res);
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.tableData.push(JSON.parse(res.data.data[i]));
          }
          //console.log(this.tableData);
          this.loading = false;
        }).catch( err => {
          console.log(err);
        })
      },

      //当页面发生改变的时候
      handleCurrentChange(val) {
        //this.$store.commit("getNowPage",val);  //设置当前页面
        this.nowPage = val;
        this.getMyResources();
      },

      //商品详情
      handleEdit(index, row) {
        this.$store.commit("getResourcesData",row);  //将用户点击的订单详情提交到全局
        this.$router.push("/oneResources");
      },
      
      //删除资源
      orderDelete(index, row){
        this.$confirm('此操作将永久下架该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteResource(row._id,index);
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'+row._id
          });
        });
      },
      
      //删除资源方法
      deleteResource(_id,index){
        //发送请求
        this.$axios({
          url:"/api/tcb/databasedelete?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": "db.collection(\"myShopping\").where({_id:\""+_id+"\"}).remove()"
          },
        }).then( res => {
          console.log(res);
          if (res.data.errmsg === "ok"){
            this.$message({
              type: 'success',
              message: '删除成功!'+_id
            });
            this.tableData.splice(1,index);  //从数组中移除
          }
        }).catch( err => {
          console.log(err);
        })
      },
      
      //查找当个资源
      searchOneResource(){
        this.loading = true;
        this.tableData = [];
        //发送请求
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": "db.collection('myShopping')\n" +
              "  .where({\n" +
              "    shoppingName: \""+this.search+"\"\n" +
              "  })\n" +
              "  .get()\n"
          },
        }).then( res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.tableData.push(JSON.parse(res.data.data[i]));
          }
          this.loading = false;
        }).catch( err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getMyResourcesTotal();  //获取所有的长度
      this.getMyResources();  //获取当前页的资源
    }
  }
</script>

<style scoped>

</style>