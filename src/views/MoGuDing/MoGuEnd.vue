<template>
<!--  没打卡订单-->
  <div>
    <mo-gu-table :moGuState="moGuState"></mo-gu-table>
  </div>
</template>

<script>
  import MoGuTable from "./MoGuTable";
  export default {
    name: "MoGuEnd",
    components: {MoGuTable},
    data(){
      return{
        moGuState: '未打卡',
      }
    }
  }
</script>

<style scoped>

</style>