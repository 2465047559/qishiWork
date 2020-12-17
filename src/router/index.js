import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const WorkIndex = () => import('../views/WorkIndex/WorkIndex');  //作业首页
const AllWork = () => import('../views/Work/AllWork');  //所有作业
const OneOrder = () => import('../views/OneOrder'); //单个作业
const WaitWork = () => import('../views/WaitWork/MyWaitWork')  //待开发作业
const WaitSendWork = () => import('../views/WaitSendWork/WaitSendWork') //待回馈作业
const WorkEnd = () => import('../views/WorkEnd/WorkEnd');  //已完成作业

//资源展示界面
const ShowMyResources = () => import('../views/Resources/ShowMyResources');  //展示所有资源
const OneResources = () => import('../views/Resources/OneResources');  //当个资源界面
const AddResource = () => import('../views/Resources/AddResource'); //添加新的资源
const routes = [
  {
    name: "WorkIndex",
    path: '/',
    component: WorkIndex
  },
  {
    name: "WorkIndex",
    path: '/workIndex',
    component: WorkIndex
  },
  // 所有作业
  {
    Name: "AllWork",
    path: '/allWork',
    component: AllWork,
  },
  //单个订单
  {
    Name: "OneOrder",
    path: '/oneOrder',
    component: OneOrder,
  },
  //待开发作业
  {
    Name: "WaitWork",
    path: '/waitWork',
    component: WaitWork,
  },
  //待反馈作业
  {
    Name: "WaitSendWork",
    path: '/waitSendWork',
    component: WaitSendWork,
  },
  //已完成作业
  {
    Name: "WorkEnd",
    path: '/workEnd',
    component: WorkEnd,
  },
  //展示所有资源
  {
    Name: "ShowMyResources",
    path: '/showMyResources',
    component: ShowMyResources,
  },
  //单个资源
  {
    Name: "OneResources",
    path: '/oneResources',
    component: OneResources,
  },
  //添加新的资源
  {
    Name: "AddResource",
    path: '/addResource',
    component: AddResource,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
