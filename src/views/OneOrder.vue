<template>
  <div>
    <el-form ref="form"
             :model="oneOrder"
             size="medium"
             style="float: left; text-align: left;width: 700px"
             label-width="120px">
      <el-form-item label="订单ID">
        <el-input v-model="oneOrder._id" readonly></el-input>
      </el-form-item>
      <el-form-item label="用户ID">
      <el-input v-model="oneOrder._openID" readonly></el-input>
    </el-form-item>
      <el-form-item label="作业语言">
        <el-input v-model="oneOrder.orderName" readonly></el-input>
      </el-form-item>
      <el-form-item label="订单说明">
        <el-input v-model="oneOrder.orderExplain" type="textarea" readonly></el-input>
      </el-form-item>
      <el-form-item label="反馈名称">
        <el-input v-model="oneOrder.orderWantName" readonly></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="datetime"
                          placeholder="选择日期"
                          v-model="oneOrder.orderCreateTime"
                          style="width: 100%;" readonly></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker placeholder="选择时间"
                          type="datetime"
                          v-model="oneOrder.orderLastTime"
                          style="width: 100%;" readonly></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="效果图">
      <el-image
              style="width: 90px; height: 90px"
              :preview-src-list="srcList"
              :src="oneOrder.orderImg">
      </el-image>
    </el-form-item>
      <el-form-item label="订单预计金额">
        <el-col :span="11">
          <el-input v-model="oneOrder.orderMin">
            <template slot="append">¥</template>
          </el-input>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model="oneOrder.orderMax">
            <template slot="append">¥</template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="订单最终金额">
        <el-input v-model="oneOrder.orderMoney"><template slot="append">¥</template></el-input>
      </el-form-item>
      <el-form-item label="订金金额">
        <el-input v-model="oneOrder.orderGiveMoney"><template slot="append">¥</template></el-input>
      </el-form-item>
      <el-form-item label="订金状态">
        <el-radio v-model="oneOrder.orderBeforePayState" label="未付款">未付款</el-radio>
        <el-radio v-model="oneOrder.orderBeforePayState" label="已付款">已付款</el-radio>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-radio v-model="oneOrder.orderPayState" label="未付款">未付款</el-radio>
        <el-radio v-model="oneOrder.orderPayState" label="已付款">已付款</el-radio>
      </el-form-item>
      <el-form-item label="用户是否删除">
        <el-radio v-model="oneOrder.orderLookState" disabled  label="1">未删除</el-radio>
        <el-radio v-model="oneOrder.orderLookState" disabled label="0">已删除</el-radio>
      </el-form-item>
      <el-form-item label="订单当前状态">
        <el-radio v-model="oneOrder.orderState" label="待开发">待开发</el-radio>
        <el-radio v-model="oneOrder.orderState" label="开发中">开发中</el-radio>
        <el-radio v-model="oneOrder.orderState" label="已完成">已完成</el-radio>
      </el-form-item>
      <el-form-item label="反馈消息">
        <el-input v-model="oneOrder.orderFeedBack" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {Form,FormItem,Col,TimePicker, DatePicker,Option
    ,Select,Input,Image,Radio,Button} from 'element-ui'
  export default {
    name: "OneOrder",
    components:{
      [Form.name] : Form,
      [FormItem.name]: FormItem,
      [Col.name]: Col,
      [Radio.name]: Radio,
      [TimePicker.name]: TimePicker,
      [DatePicker.name]: DatePicker,
      [Option.name]: Option,
      [Select.name]: Select,
      [Input.name]: Input,
      [Image.name]: Image,
      [Button.name]: Button,
    },
    data(){
      return{
        oneOrder: this.$store.state.clickTableData,
        srcList: [this.$store.state.clickTableData.orderImg]
      }
    },
    methods:{
      //提交修改
      onSubmit(){
        this.$axios({
          url: "/api/tcb/databaseupdate?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"myOrder\").doc(\""+this.oneOrder._id+"\").update({data:{" +
              "orderMin: "+this.oneOrder.orderMin+"," +
              "orderMax: "+this.oneOrder.orderMax+"," +
              "orderMoney:"+this.oneOrder.orderMoney+","+
              "orderPayState:\""+this.oneOrder.orderPayState+"\","+
              "orderState:\""+this.oneOrder.orderState+"\","+
              "orderFeedBack:\""+this.oneOrder.orderFeedBack+"\","+
              "orderGiveMoney:\""+this.oneOrder.orderGiveMoney+"\","+
              "orderBeforePayState:\""+this.oneOrder.orderBeforePayState+"\""+
              "}})",
          }
        }).then( res => {
          console.log(res);
          if (res.data.errcode === 0){
            this.$message({
              message: '修改订单信息成功',
              type: 'success'
            });
            setTimeout(this.goBack,2000)
            
          }
        }).catch( err => {
          console.log(err);
        })
      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>

</style>