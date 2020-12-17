<template>
  <!--待开发作业-->
  <div>
    <my-table :orderState="orderState"></my-table>
  </div>
</template>

<script>
  import MyTable from "../MyTable";
  export default {
    name: "MyWaitWork",
    data(){
      return{
        orderState: '待开发',
      }
    },
    components: {MyTable}
  }
</script>

<style scoped>

</style>