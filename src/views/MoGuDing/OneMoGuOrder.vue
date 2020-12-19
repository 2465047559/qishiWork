<template>
  <div>
    <el-form ref="form"
             :model="this.$store.state.MoGuData"
             label-width="120px"
             size="medium"
             style="float: left; text-align: left;width: 700px">
      <el-form-item label="用户ID">
        <el-input v-model="this.$store.state.MoGuData._openid" readonly></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="this.$store.state.MoGuData.moGuPhone" readonly></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="this.$store.state.MoGuData.moGuPassword" readonly></el-input>
      </el-form-item>
      <el-form-item label="打卡地点">
        <el-input v-model="this.$store.state.MoGuData.moGuAddress" readonly></el-input>
      </el-form-item>
      <el-form-item label="上班打卡时间">
        <el-input v-model="this.$store.state.MoGuData.moGuSTARTTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="下班打卡时间">
        <el-input v-model="this.$store.state.MoGuData.moGuENDTime" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否支付">
        <el-select v-model="payStateValue"
                   placeholder="请选择"
                   @change="payStateChooseOption">
          <el-option
                  v-for="item in payStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单当前状态">
        <el-select v-model="moGuStateValue"
                   placeholder="请选择"
                   @change="moGuStateChooseOption">
          <el-option
                  v-for="item in moGuStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改资源内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "OneMoGuOrder",
    data(){
      return{
        //蘑菇丁支付状态
        payStateOptions: [{value: false, label: '未支付'}, {value:true , label: '已支付'},],
        payStateValue:this.$store.state.MoGuData.moGuPayState === true? '已支付' : '未支付',
        moGuStateOptions:[
          {value: '未打卡',label: '未打卡',},
          {value: '打卡中',label: '打卡中',},
          {value: '已改变', label: '已改变',},
        ],
        moGuStateValue:this.$store.state.MoGuData.moGuState
      }
    },
    methods:{
      payStateChooseOption(event){
        this.$store.state.MoGuData.moGuPayState = event;  //修改选中的类型
      },
      moGuStateChooseOption(event){
        this.$store.state.MoGuData.moGuState = event;  //修改选中的类型
      },
      onSubmit(){
        this.$axios({
          url: "/api/tcb/databaseupdate?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query":
                "db.collection(\"moGuOrder\").doc(\""+this.$store.state.MoGuData._id+"\").update({data:{" +
                "moGuPayState: "+this.$store.state.MoGuData.moGuPayState+"," +
                "moGuState:\""+this.$store.state.MoGuData.moGuState+"\""+
                "}})",
          }
        }).then( res => {
          console.log(res);
          if (res.data.errcode === 0){
            this.$message({
              message: '修改资源信息成功',
              type: 'success'
            });
            setTimeout(this.goBack,2000)

          }
        }).catch( err => {
          console.log(err);
        })
      },
      //返回上一级
      goBack(){
        this.$router.go(-1);
      }

    }
  }
</script>

<style scoped>

</style>