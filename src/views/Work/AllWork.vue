<template>
  <!--所有作业-->
  <div>
    <my-table :orderState="orderState"></my-table>
  </div>
</template>

<script>
  import MyTable from "../MyTable";
  import {formatdate} from '../../utils/dataFormat'
  export default {
    name: "AllWork",
    components:{
      MyTable,
    },
    data() {
      return {
        tableData: [],
        orderState: '',
        //nowPageIndex: 0
      }
    },
    methods: {
      //获取所有的订单条数
      getMyOrderNumber(){
        this.$axios({
          url: "/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.env,
            "query": "db.collection(\"myOrder\").count()"
          }
        }).then( res => {
          //console.log("获取长度",res.data.data.length);
          console.log(res);
          this.$store.commit("getTotal",res.data.pager.Total)
          console.log(this.$store.state.Total);
        }).catch( err => {
          console.log(err);
        })
      },
    },
    beforeMount() {
      this.getMyOrderNumber();  //获取总计入条数
    },
  }
</script>

<style scoped>
</style>