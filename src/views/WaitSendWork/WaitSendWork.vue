<template>
  <div>
    <my-table :orderState="orderState"></my-table>
  </div>
</template>

<script>
  import MyTable from "../MyTable";
  export default {
    name: "WaitSendWork",
    components: {MyTable},
    data(){
      return{
        orderState: '开发中',
      }
    },
  }
</script>

<style scoped>

</style>