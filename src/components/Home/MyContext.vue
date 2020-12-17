<template>
  <!--服务端界面-->
  <div>
    <el-container>
      <el-aside width="200px">
        <home-aside/>
      </el-aside>
    <el-container>
      <el-header>
        <home-head/>
      </el-header>
      <el-main>
        <home-main/>
      </el-main>
      <el-footer>
        <home-footer/>
      </el-footer>
    </el-container>
    </el-container>
  </div>
</template>

<script>
  import {Container,Aside,Header,Main,Footer} from 'element-ui'
  import HomeHead from "../Head/HomeHead";
  import HomeMain from "../Main/HomeMain";
  import HomeFooter from "../Footer/HomeFooter";
  import HomeAside from "../Aside/HomeAside";
  export default {
    name: "MyContext",
    components:{
      HomeAside,
      HomeFooter,
      HomeMain,
      HomeHead,
      [Container.name]: Container,
      [Aside.name]: Aside,
      [Header.name]: Header,
      [Main.name]: Main,
      [Footer.name]: Footer,
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 50px;
  }
  .el-header{
    text-align: left;
    padding: 0px;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: left;
    height: 870px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 750px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>