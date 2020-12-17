<template>
  <!--头部-->
  <div class="myHead">
    <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            router
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
      <el-menu-item index="1" route="/allWork">所有作业</el-menu-item>
      <el-menu-item index="2" route="/waitWork">待开发作业</el-menu-item>
      <el-menu-item index="3" route="/waitSendWork">开发中作业</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {Menu,MenuItem,MenuItemGroup,Submenu} from 'element-ui'
  export default {
    name: "HomeHead",
    components:{
      [Menu.name]: Menu,
      [MenuItem.name]: MenuItem,
      [MenuItemGroup.name]: MenuItemGroup,
      [Submenu.name]: Submenu
    },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(){}
    }
  }
</script>

<style scoped>
  .myHead{
    width: 100%;
    height: 60px;
  }
  .el-menu-demo{
    width: 100%;
    float: left;
  }
</style>