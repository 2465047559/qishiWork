import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: '',   //获取小程序的access_token
    env: 'yangnai-6ge67wo746e558a9',  //云开发环境
    tableData:[],  //获取到的表格数据
    clickTableData:[],  //用户点击的订单详情
    ResourcesData: [], //用户点击了资源详情
    Total: 1,   //用来记录订单总数量
    ResourcesTotal: 1, //用来记录当前资源总页数
    NowPage: 1,  //用来记录当前页
  },
  mutations: {
    //获取小程序的access_token
    getAccessToken(state,str){
      state.access_token = str;
    },
    //设置获取到的表格数据
    getTableData(state,str){
      state.tableData = str
    },
    //设置总数量
    getTotal(state,num){
      state.Total = num
    },
    //设置当前页
    getNowPage(state,num){
      state.NowPage = num;
    },
    //设置用户点击的详情界面
    getClickTableData(state,order){
      state.clickTableData = order;
    },
    //获取资源总页数
    getResourcesTotal(state,num){
      state.ResourcesTotal = num;
    },
    //设置资源详情
    getResourcesData(state,array){
      state.ResourcesData = array
    },
  },

  actions: {
    //获取小程序的access_token
    getAccessToken(state,str){
      state.access_token = str;
    },
    //设置获取到的表格数据
    getTableData(state,str){
      state.tableData = str
    },
    //设置总数量
    getTotal(state,num){
      state.Total = num
    },
    //设置当前页
    getNowPage(state,num){
      state.NowPage = num;
    },
    //设置用户点击的详情界面
    getClickTableData(state,order){
      state.clickTableData = order;
    },
    //获取资源总页数
    getResourcesTotal(state,num){
      state.ResourcesTotal = num;
    },
    //设置资源详情
    getResourcesData(state,array){
      state.ResourcesData = array
    },
  },

})
