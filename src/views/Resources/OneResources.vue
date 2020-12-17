<template>
  <div>
    <el-form ref="form"
             :model="this.$store.state.ResourcesData"
             label-width="120px"
             size="medium"
             style="float: left; text-align: left;width: 700px">
      <el-form-item label="资源名称">
        <el-input v-model="this.$store.state.ResourcesData.shoppingName"></el-input>
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select v-model="value"
                   placeholder="请选择"
                   @change="chooseOption">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源图片地址">
        <el-input v-model="this.$store.state.ResourcesData.shoppingImg" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="资源图片预览">
        <el-image
                style="width: 90px; height: 90px"
                :src="this.$store.state.ResourcesData.shoppingImg">
        </el-image>
      </el-form-item>
      <el-form-item label="资源分享链接">
        <el-input v-model="this.$store.state.ResourcesData.shoppingHref" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改资源内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "OneResources",
    data(){
      return{
        options: [
          {
          value: '0',
          label: '编程软件'
        }, {
          value: '1',
          label: '图片资源'
        }, {
          value: '2',
          label: '编程文档'
        }, {
          value: '3',
          label: 'SSM项目'
        }, {
          value: '4',
          label: '其他资源'
        }],
        value: this.$store.state.ResourcesData.myShoppingIndex === 0? '编程软件':
          this.$store.state.ResourcesData.myShoppingIndex === 1? '图片资源' :
            this.$store.state.ResourcesData.myShoppingIndex === 2? '编程文档' :
              this.$store.state.ResourcesData.myShoppingIndex === 3? 'SSM项目' : '其他资源',
      }
    },
    methods:{
      chooseOption(event){
        this.$store.state.ResourcesData.myShoppingIndex = event;  //修改选中的类型
      },
      
      //修改资源内容
      onSubmit(){
        this.$axios({
          url: "/api/tcb/databaseupdate?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"myShopping\").doc(\""+this.$store.state.ResourcesData._id+"\").update({data:{" +
              "myShoppingIndex: "+this.$store.state.ResourcesData.myShoppingIndex+"," +
              "shoppingHref:\""+this.$store.state.ResourcesData.shoppingHref+"\","+
              "shoppingImg:\""+this.$store.state.ResourcesData.shoppingImg+"\","+
              "shoppingName:\""+this.$store.state.ResourcesData.shoppingName+"\""+
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
    },
  }
</script>

<style scoped>

</style>