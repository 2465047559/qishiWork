<template>
  <div>
    <el-form ref="form"
             :model="fromResource"
             label-width="120px"
             size="medium"
             style="float: left; text-align: left;width: 700px">
      <el-form-item label="资源名称">
        <el-input v-model="fromResource.shoppingName"></el-input>
      </el-form-item>
      <el-form-item label="资源类型">
        <el-select v-model="fromResource.myShoppingIndex"
                   placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源图片地址">
        <el-input v-model="fromResource.shoppingImg" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="资源图片预览">
        <el-image
                style="width: 90px; height: 90px"
                :src="fromResource.shoppingImg">
        </el-image>
      </el-form-item>
      <el-form-item label="资源分享链接">
        <el-input v-model="fromResource.shoppingHref" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "AddResource",
    data(){
      return{
        fromResource:{
          shoppingName: '',
          shoppingImg: '',
          shoppingHref: '',
          myShoppingIndex: '',
        },
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
      }
    },
    methods:{
      //新增资源
      onSubmit(){
        console.log(this.fromResource);
        this.$axios({
          url: "/api/tcb/databaseadd?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"myShopping\").add({data:{" +
              "myShoppingIndex: "+this.fromResource.myShoppingIndex+"," +
              "shoppingHref:\""+this.fromResource.shoppingHref+"\","+
              "shoppingImg:\""+this.fromResource.shoppingImg+"\","+
              "shoppingName:\""+this.fromResource.shoppingName+"\""+
              "}})",
          }
        }).then( res => {
          console.log(res);
          if (res.data.errcode === 0){
            this.$message({
              message: '添加资源成功',
              type: 'success'
            });
            setTimeout(this.goBack,2000)

          }
        }).catch( err => {
          console.log(err);
        })
      },

      goBack(){
        this.$router.push('/showMyResources')
      }
    }
  }
</script>

<style scoped>

</style>