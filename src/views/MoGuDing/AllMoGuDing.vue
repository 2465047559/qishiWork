<template>
<!--  所有订单界面-->
  <div>
    <mo-gu-table :moGuState="moGuState"></mo-gu-table>
  </div>
</template>

<script>
  import MoGuTable from "./MoGuTable";
  export default {
    name: "AllMoGuDing",
    components: {MoGuTable},
    data(){
      return{
        moGuState: '',
      }
    },
    message: ""
  }
</script>

<style scoped>

</style>