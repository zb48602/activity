
import babelpolyfill from 'babel-polyfill'
import Vue from "vue";
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 全局样式
import "./template/base.css";
//选项卡组件
import home from "./components/tab/app_home.vue";
import mine from "./components/tab/app_mine.vue";
import signin from "./components/tab/app_signin.vue";
import activity from "./components/tab/app_activity.vue";
import actType from "./components/tab/app_activityType.vue";
//容器组件
import detail from "./components/contain/app_detail.vue";
import index from "./components/contain/app_index.vue";
import login from "./components/contain/app_login.vue";
import setting from "./components/contain/app_setting.vue";
import own from "./components/contain/app_own.vue";
import upmess from "./components/contain/app_upMess.vue";
import inmess from "./components/contain/app_inMess.vue";
import register from "./components/contain/app_register.vue";
import safe from "./components/contain/app_safe.vue";
//公共组件
import footer from "./components/app_footer.vue";
import header from "./components/app_header.vue";
import search from "./components/app_search.vue";
// 配置路由
var router = new VueRouter({
	routes:[
		// 默认进入页面的时候跳转到登录页
		{
			path: '/',
			redirect: '/login'
		},
		{
			//登录路由
			path: "/login",
            component: login
        },
		//选项卡
		{
			path: '/index',
			component: index,
			children:[
				{
					//首页
					path: "home",
                    component: home
				},{
					//报名
					path: "signin",
                    component: signin
				},{
					//我的
					path: "mine",
                    component: mine
				},{
					//活动
					path: "activity",
                    component: activity
				},{
					path: '/index',
					redirect: '/index/home'
				},{
					//活动
					path: "actType/:id",
                    component: actType
				}
			]
		},
		//其他页面
		{
			//个人信息
			path: "/own",
            component: own
		},
			//报名查询
		{
			path: "/inmess",
        	component: inmess
		},
			//签到查询
		{
			path: "/upmess",
    		component: upmess
		},
			//安全设置
		//设置
		{
			path: '/setting',
			component: setting
		},
		{
			path: '/safe',
			component: safe
		},
		//详情
		{
			name:'detail',
			path: '/detail/:id',
			component: detail
		},
		//注册
		{
			path: '/register',
			component: register
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
	`,
	components: { home }
})