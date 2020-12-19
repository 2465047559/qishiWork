<template>
<!--  修改过订单-->
  <div>
    <mo-gu-table :moGuState="moGuState"></mo-gu-table>
  </div>
</template>

<script>
  import MoGuTable from "./MoGuTable";
  export default {
    name: "MoGuUpdate",
    components: {MoGuTable},
    data(){
      return{
        moGuState: '已改变',
      }
    }
  }
</script>

<style scoped>

</style>