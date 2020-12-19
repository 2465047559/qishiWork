<template>
<!--  打卡中的界面-->
  <div>
    <mo-gu-table :moGuState="moGuState"></mo-gu-table>
  </div>
</template>

<script>
  import MoGuTable from "./MoGuTable";
  export default {
    name: "MoGuIng",
    components: {MoGuTable},
    data(){
      return{
        moGuState: '打卡中',
      }
    }
  }
</script>

<style scoped>

</style>