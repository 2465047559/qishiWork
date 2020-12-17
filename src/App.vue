<template>
  <div>
    <my-context/>
  </div>
</template>

<script>
  import MyContext from "./components/Home/MyContext";
  export default {
    name: "App",
    components: {MyContext},
    methods:{
      //获取AccessToken
      getAccessToken(){
        this.$axios.get('/api/cgi-bin/token',{
          params:{
            grant_type:'client_credential',
            appid: 'wx05f0b1c1d60970ab',
            secret: '8465b0c1316d3c6a8bb2290c86f124ee'
          }
        }).then( res => {
          this.$store.commit("getAccessToken",res.data.access_token);  //将小程序的access_token提交到全局
          this.$store.commit("getNowPage",1)
          //console.log("AccessToken",res.data.access_token);
          //console.log("Vue",this.$store.state.access_token);
        }).catch( err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getAccessToken();
    }
  }
</script>

<style scoped>

</style>