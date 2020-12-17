<template>
  <div>
<!--    logo区-->
    <div class="myLogo">
      <img src="../../assets/logo.png">
    </div>
    
<!--    功能区-->
    <div>
      <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
<!--        作业内容-->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-shopping-cart-2"></i>
            <span>作业内容</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" route="/allWork">所有作业</el-menu-item>
            <el-menu-item index="1-2" route="/waitWork">待开发作业</el-menu-item>
            <el-menu-item index="1-3" route="/waitSendWork">开发中作业</el-menu-item>
            <el-menu-item index="1-4" route="/workEnd">已完成作业</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
<!--        资源展示-->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span>资源列表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" route="/showMyResources">所有资源</el-menu-item>
            <el-menu-item index="2-2" route="/addResource">新增资源</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeAside",
    methods: {
    }
  }
</script>

<style scoped>
  .myLogo{
    width: 200px;
    height: 150px;
    background-color: #545c64;
  }
  .myLogo img{
    width: 100px;
    height: 100px;
    margin: 25px 50px;
    border-radius: 100px;
  }
</style>