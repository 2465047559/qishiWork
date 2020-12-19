<template>
  <div>
    <el-table border
              :data="tableData"
              :highlight-current-row="true"
              :lazy="true"
              style="width: 100%;">
      <!--      订单编号 orderID-->
      <el-table-column
              label="订单编号"
              width="160"
              fixed="left"
              align="center"
              prop="_id">
      </el-table-column>

<!--      用户openid-->
      <el-table-column
              label="用户ID"
              width="160"
              align="center"
              prop="_openid">
      </el-table-column>

<!--      用户账号-->
      <el-table-column
              label="用户账号"
              width="160"
              align="center"
              prop="moGuPhone">
      </el-table-column>

<!--      用户密码-->
      <el-table-column
              label="用户密码"
              width="160"
              align="center"
              prop="moGuPassword">
      </el-table-column>

      <!--      打卡地址-->
      <el-table-column
              label="用户密码"
              width="160"
              align="center"
              prop="moGuAddress">
      </el-table-column>

      <!--      上班打卡时间-->
      <el-table-column
              label="上班打卡时间"
              width="160"
              align="center"
              prop="moGuSTARTTime">
      </el-table-column>

      <!--      下班打卡时间-->
      <el-table-column
              label="下班打卡时间"
              width="160"
              align="center"
              prop="moGuENDTime">
      </el-table-column>

      <!--      支付状态-->
      <el-table-column
              label="支付状态"
              width="160"
              align="center"
              prop="">
        <template scope="scope">
          <span>{{scope.row.moGuPayState === false? '未支付':'已支付'}}</span>
        </template>
      </el-table-column>

      <!--      价格-->
      <el-table-column
              label="价格"
              width="160"
              align="center"
              prop="moGuClickTime">
      </el-table-column>

      <!--      当前状态-->
      <el-table-column
              label="当前状态"
              width="160"
              align="center"
              prop="moGuState">
      </el-table-column>

      <el-table-column fixed="right"
                       align="center"
                       width="250">
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入资源名称">
            <el-button slot="append" icon="el-icon-search" @click="searchMoGu"></el-button>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="success"
                  @click="GoToMoGu(scope.$index, scope.row)">订单详情</el-button>

          <el-button
                  size="mini"
                  type="danger"
                  @click="DeleteMoGu(scope.$index, scope.row)">删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            :page-size="9"
            :pager-count="11"
            style="text-align: left"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="this.$store.state.MoGuTotal">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "MoGuTable",
    data(){
      return{
        tableData:[],
        nowPage: 1,
        search:'',
        moGuState: '',  //用户记录订单状态
      }
    },
    props:['moGuState'],
    methods:{
      //获取蘑菇丁总条数
      getMoGuOrderNumber(){
        this.$axios({
          url: "/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"moGuOrder\").count()"
          }
        }).then( res => {
          console.log("获取长度",res.data.data.length);
          this.$store.commit("getMoGuTotal",res.data.pager.Total);  //获取长度并且提交到全局
        }).catch( err => {
          console.log(err);
        })
      },

      //获取当前页的蘑菇丁数据
      getMoGuOrder(){
        console.log(this.moGuState);
        let query = "db.collection(\"moGuOrder\").limit(9).skip("+((this.nowPage-1)*9)+").get()";
        if (this.moGuState !== ''){
          query = "db.collection('moGuOrder')\n" +
              "  .where({\n" +
              "    moGuState: \""+this.moGuState+"\",\n" +
              "  })\n" +
              "  .skip(0)\n" +
              "  .limit(10)\n" +
              "  .get()\n"
        }
        this.tableData = [];
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
          console.log(this.tableData);
        }).catch( err => {
          console.log(err);
        })
      },

      //蘑菇丁搜索
      searchMoGu(){
        this.tableData = [];
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": "yangnai-6ge67wo746e558a9",
            "query": "db.collection('moGuOrder')\n" +
                "  .where({\n" +
                "    _id: \""+this.search+"\"\n" +
                "  })\n" +
                "  .get()\n"
          },
        }).then( res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.tableData.push(JSON.parse(res.data.data[i]));
          }
        }).catch( err => {
          console.log(err);
        })
      },

      //前往当个蘑菇丁界面
      GoToMoGu(index, row){
        this.$store.commit("getMoGuData",row);   //提交到全局
        this.$router.push("/oneMoGuOrder");   //前往当个详情界面
      },

      //删除蘑菇丁订单
      DeleteMoGu(index,row){

      },

      //当前页发生变化的时候
      handleCurrentChange(val){
        this.nowPage = val;
        this.getMoGuOrder();
      },
    },
    created() {
      this.getMoGuOrderNumber();  //获取总页数
      this.getMoGuOrder();  //获取当前页的数据
    }
  }
</script>

<style scoped>

</style>