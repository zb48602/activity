import Vue from "vue";
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 状态管理
import Vuex from 'vuex';
Vue.use(Vuex)
import moment from 'vue-moment'
Vue.use(moment); 
// 全局样式
import "./template/base.css";
//选项卡组件
//活动
import addAct from "./components/contain/pc_addAct.vue";
import showAct from "./components/contain/pc_showAct.vue";
import changeAct from "./components/contain/pc_changeAct.vue";
import detailAct from "./components/contain/pc_detailAct.vue";
import genre from "./components/contain/pc_genre.vue";
//报名
import addEnroll from "./components/contain/pc_addEnroll.vue";
import showEnroll from "./components/contain/pc_showEnroll.vue";
import changeEnroll from "./components/contain/pc_changeEnroll.vue";
import detailEnroll from "./components/contain/pc_detailEnroll.vue";
//签到
import showSign from "./components/contain/pc_showSign.vue";
import detailSign from "./components/contain/pc_detailSign.vue";
//学生
import addStu from "./components/contain/pc_addStu.vue";
import deleteStu from "./components/contain/pc_deleteStu.vue";
import changeStu from "./components/contain/pc_changeStu.vue";
//院系
import academy from "./components/contain/pc_academy.vue";
import major from "./components/contain/pc_major.vue";
//账号
import showMan from "./components/contain/pc_showMan.vue";
import showOwn from "./components/contain/pc_showOwn.vue";
//容器组件
import login from "./components/tab/login.vue";
import index from "./components/tab/pc-index.vue";
// 配置路由
var router = new VueRouter({
	routes:[
		// 默认进入页面的时候跳转到登录页
		{
			path: '/',
			redirect: '/login'
		},
		//登录页面
		{
			path:"/login",
			component:login
		},
		//其他页面
		{
			//个人信息
			path: "/index",
            component: index,
            children:[
            	{
            		path: "addAct",
           			component: addAct
            	},
            	{
            		path:"showAct",
            		component:showAct
            	},
            	{
            		path:"changeAct/:id",
            		component:changeAct
            	},
            	{
            		path:"detailAct/:id",
            		component:detailAct
            	},
            	{
            		path:"genre",
            		component:genre
            	},
            	{
            		name:"addById",
            		path:"addEnroll",
            		component:addEnroll
            	},
            	{
            		path:"showEnroll",
            		component:showEnroll
            	},
            	{
            		path:"changeEnroll/:id",
            		component:changeEnroll
            	},
            	{
            		path:"detailEnroll/:id",
            		component:detailEnroll
            	},
            	{
            		path:"showSign",
            		component:showSign
            	},
            	{
            		path:"detailSign/:id",
            		component:detailSign
            	},
            	{
            		path:"addStu",
            		component:addStu
            	},
            	{
            		path:"deleteStu",
            		component:deleteStu
            	},
            	{
            		path:"changeStu",
            		component:changeStu
            	},
            	{
            		path:"academy",
            		component:academy
            	},
            	{
            		path:"major",
            		component:major
            	},
            	{
            		path:"showMan",
            		component:showMan
            	},
            	{
            		path:"showOwn",
            		component:showOwn
            	}
            ]
		}
	]
})
new Vue({
	el: "#app",
	router,
	template: `
        <div>
            <router-view></router-view> 
        </div>
    `
})