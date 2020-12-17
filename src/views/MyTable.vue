<template>
  <div>
    <el-table
            v-loading="loading"
            element-loading-text="骑士作业排名加载中..."
            :data="myTable.filter(data => !search || data._id.toLowerCase().includes(search.toLowerCase()))"
            border
            :highlight-current-row="true"
            :lazy="true"
            style="width: 100%;">
      <el-table-column
              label="序号"
              fixed="left"
              type="index"
              width="80"
              align="center"
              :index="indexMethod">
      </el-table-column>
      <!--      订单编号 orderID-->
      <el-table-column
              label="订单编号"
              width="160"
              fixed="left"
              align="center"
              prop="_id">
      </el-table-column>
      
      <!--      用户头像 userImg-->
      <el-table-column
              label="用户头像"
              width="120"
              align="center"
              prop="userImg">
        <template scope="scope">
          <el-image
                  style="width: 90px; height: 90px"
                  :src="scope.row.userImg">
          </el-image>
        </template>
      </el-table-column>
      
      <!--      用户名称 userName-->
      <el-table-column
              label="用户名称"
              width="130"
              align="center"
              prop="userName">
      </el-table-column>
      
      <!--      作业语言 orderName-->
      <el-table-column
              label="作业语言"
              width="100"
              align="center"
              prop="orderName">
      </el-table-column>
      
      <!--      作业说明 orderExplain-->
      <el-table-column
              label="作业说明"
              align="center"
              width="180"
              prop="orderExplain">
      </el-table-column>
      
      <!--      作业效果图 orderImg-->
      <el-table-column
              label="作业效果图"
              min-width="120"
              align="center"
              prop="">
        <template scope="scope">
          <el-image
                  style="width: 90px; height: 90px"
                  :preview-src-list="srcList"
                  :src="scope.row.orderImg">
          </el-image>
        </template>
      </el-table-column>
      
      <!--      预计金额-->
      <el-table-column
              label="预计金额"
              width="180"
              align="center"
              prop="">
        <template scope="scope">
          <span>{{scope.row.orderMin}}RMB -- {{scope.row.orderMax}}RMB</span>
        </template>
      </el-table-column>
      
      <!--      支付定金金额  orderGiveMoney-->
      <el-table-column
              width="120"
              label="订金金额"
              align="center"
              prop="orderGiveMoney">
      </el-table-column>
      
      <!--      订单金额   orderMoney-->
      <el-table-column
              label="订单金额"
              width="120"
              align="center"
              prop="orderMoney">
      </el-table-column>
      
      <!--      创建时间 orderCreateTime-->
      <el-table-column
              label="创建时间"
              width="180"
              align="center"
              prop="orderCreateTime">
      </el-table-column>
      
      <!--      最晚时间 orderLastTime-->
      <el-table-column
              label="最晚时间"
              align="center"
              width="180"
              prop="orderLastTime">
      </el-table-column>
      
      <!--      订单状态 orderLookState-->
      <el-table-column
              label="订单状态"
              align="center"
              width="90"
              prop="orderState"
              :filters="[{ text: '待开发', value: '待开发' }, { text: '开发中', value: '开发中' },{ text: '已完成', value: '已完成' }]"
              :filter-method="filterOrderState"
              filter-placement="bottom-end"
              >
        <template slot-scope="scope">
          <el-tag
                  :type="scope.row.orderState === '待开发' ? 'primary' :
                  scope.row.orderState === '开发中'? 'warning' : 'success'"
                  disable-transitions>{{scope.row.orderState}}</el-tag>
        </template>
        
      </el-table-column>
  
      <!--      作业支付状态 orderPayState-->
      <el-table-column
              label="支付状态"
              align="center"
              width="90"
              prop="orderPayState"
              :filters="[{ text: '未付款', value: '未付款' }, { text: '已付款', value: '已付款' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
                  :type="scope.row.orderPayState === '未付款' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.orderPayState}}</el-tag>
        </template>
      </el-table-column>
  
      <!--用户是否删除-->
      <el-table-column
              label="用户是否删除"
              align="center"
              width="90"
              prop=""
              :filters="[{ text: '已删除', value: '0' }, { text: '未删除', value: '1' }]"
              :filter-method="filterUserDelete"
              filter-placement="bottom-end">
        <template scope="scope">
          <el-tag
                  :type="scope.row.orderLookState === '0' ? 'danger' : 'success'"
                  disable-transitions>{{scope.row.orderLookState === '0' ? "已删除": "未删除"}}</el-tag>
          <span></span>
        </template>
      </el-table-column>
      
      <el-table-column fixed="right"
                       align="center"
                       width="250">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入商品编号">
            <el-button slot="append" icon="el-icon-search" @click="searchOneOrder"></el-button>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)">订单详情</el-button>
  
          <el-button style="margin-left: 20px"
                     size="mini"
                     type="danger"
                     @click="orderDelete(scope.$index, scope.row)">删除订单</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            :page-size="5"
            :pager-count="11"
            style="text-align: left"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="this.$store.state.Total">
    </el-pagination>
  </div>
</template>

<script>
  import {Table,TableColumn,Button,Input,Image,Pagination} from 'element-ui'
  import {formatdate} from '../utils/dataFormat'
  export default {
    name: "MyTable",
    components:{
      [Table.name]: Table,
      [Button.name]: Button,
      [Input.name]: Input,
      [TableColumn.name]: TableColumn,
      [Image.name]: Image,
      [Pagination.name]:Pagination,
    },
    data() {
      return {
        tableData: [],
        myTable:[],
        nowPage: 1,
        search: '',
        srcList: [],  //图片预览
        orderState: '',  //商品状态
        loading: true,
      }
    },
    methods: {
      filterTag(value, row) {
        return row.orderPayState === value;
      },
      filterUserDelete(value, row){
        return row.orderLookState === value;
      },
      filterOrderState(value, row){
        return row.orderState === value;
      },
      //商品详情
      handleEdit(index, row) {
        this.$store.commit("getClickTableData",row);  //将用户点击的订单详情提交到全局
        this.$router.push("/oneOrder");
      },
      //删除订单
      orderDelete(index, row){
        console.log(row._id);
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'+row._id
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'+row._id
          });
        });
      },
      //获取订单信息
      getMyOrder(){
        this.loading = true;
        let query = "db.collection(\"myOrder\").limit(5).skip("+((this.nowPage-1)*5)+").get()";
        if (this.orderState != ''){
          query = "db.collection('myOrder')\n" +
            "  .where({\n" +
            "    orderState: \""+this.orderState+"\",\n" +
            "  })\n" +
            "  .skip("+((this.nowPage-1)*5)+")\n" +
            "  .limit(5)\n" +
            "  .get()\n"
        }
        this.myTable = [];
        //发送请求
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": query
          },
        }).then( res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.tableData[i] = JSON.parse(res.data.data[i]);
          }
          //格式化时间
          for (let i=0;i<this.tableData.length;i++){
            //console.log(this.tableData[i].orderCreateTime.$date);
            //console.log(this.tableData[i].orderLastTime.$date);
            this.tableData[i].orderCreateTime = formatdate(
              new Date(this.tableData[i].orderCreateTime.$date),'yyyy-MM-dd hh:mm:ss'); //格式化创建时间

            this.tableData[i].orderLastTime = formatdate(
              new Date(this.tableData[i].orderLastTime.$date),'yyyy-MM-dd hh:mm:ss'
            ); //格式化创建时间
          }
          //获取图片
          for(let i=0;i<this.tableData.length;i++){
            if (this.tableData[i].orderImg != '') {
              let file_list = [{
                "fileid":this.tableData[i].orderImg,
                "max_age":7200
              }]
              this.$axios({
                url: "/api/tcb/batchdownloadfile?access_token="+this.$store.state.access_token+"",
                method: "POST",
                data:{
                  "env": "yangnai-6ge67wo746e558a9",
                  "file_list" : file_list
                }
              }).then( res =>{
                this.tableData[i].orderImg =  res.data.file_list[0].download_url;  //设置图片
                this.srcList.push(this.tableData[i].orderImg);  //添加到大图预览
              })
            }
            
          }
          
          this.$store.commit("getTableData",this.tableData)  //提交到全局
          
          //获取到全局并赋值到myTable中
          for (let i=0;i<this.$store.state.tableData.length;i++){
            if (this.$store.state.tableData[i].orderCreateTime == "NaN-aN-aN aN:aN:aN"){
            }else {
              this.myTable.push(this.$store.state.tableData[i]);
            }
            
          }
          this.loading = false;
        }).catch( err => {
          console.log(err);
        })
      },
      //当页面发生改变的时候
      handleCurrentChange(val) {
        //this.$store.commit("getNowPage",val);  //设置当前页面
        this.nowPage = val;
        this.getMyOrder();
        console.log("当前页面",val);
      },
      //搜索用户订单
      searchOneOrder(){
        this.loading = false;
        this.myTable = [];
        //发送请求
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": "db.collection('myOrder')\n" +
              "  .where({\n" +
              "    _id: \""+this.search+"\"\n" +
              "  })\n" +
              "  .get()\n"
          },
        }).then( res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.tableData[i] = JSON.parse(res.data.data[i]);
          }
          //格式化时间
          for (let i=0;i<this.tableData.length;i++){
            //console.log(this.tableData[i].orderCreateTime.$date);
            //console.log(this.tableData[i].orderLastTime.$date);
            this.tableData[i].orderCreateTime = formatdate(
              new Date(this.tableData[i].orderCreateTime.$date),'yyyy-MM-dd hh:mm:ss'); //格式化创建时间

            this.tableData[i].orderLastTime = formatdate(
              new Date(this.tableData[i].orderLastTime.$date),'yyyy-MM-dd hh:mm:ss'
            ); //格式化创建时间
          }
          //获取图片
          for(let i=0;i<this.tableData.length;i++){
            if (this.tableData[i].orderImg != '') {
              let file_list = [{
                "fileid":this.tableData[i].orderImg,
                "max_age":7200
              }]
              this.$axios({
                url: "/api/tcb/batchdownloadfile?access_token="+this.$store.state.access_token+"",
                method: "POST",
                data:{
                  "env": "yangnai-6ge67wo746e558a9",
                  "file_list" : file_list
                }
              }).then( res =>{
                this.tableData[i].orderImg =  res.data.file_list[0].download_url;  //设置图片
                this.srcList.push(this.tableData[i].orderImg);  //添加到大图预览
              })
            }

          }

          this.$store.commit("getTableData",this.tableData)  //提交到全局

          //获取到全局并赋值到myTable中
          for (let i=0;i<this.$store.state.tableData.length;i++){
            if (this.$store.state.tableData[i].orderCreateTime == "NaN-aN-aN aN:aN:aN"){
            }else {
              this.myTable.push(this.$store.state.tableData[i]);
            }

          }
          this.loading = true;
        }).catch( err => {
          console.log(err);
        })
      },
      
      //索引
      indexMethod(index){
        return index+1;
      }
    },
    props:['orderState'],
    watch:{
      orderState: (val) =>{
        this.orderState = val;
      }
    },
    created() {
      this.getMyOrder();
    }
  }
</script>

<style scoped>

</style>