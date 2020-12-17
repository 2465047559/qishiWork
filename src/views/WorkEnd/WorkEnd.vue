<template>
  <div>
    <my-table :orderState="orderState"></my-table>
  </div>
</template>

<script>
  import MyTable from "../MyTable";
  export default {
    name: "WorkEnd",
    components: {MyTable},
    data(){
      return{
        orderState: '已完成',
      }
    },
  }
</script>

<style scoped>

</style>