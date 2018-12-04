<template>
	<div class="footer">
		<a href="#/index/home" :class="{'footer-check':num == 1}" @click="checked(1)">
			<img src="/img/font/shouye.svg"/>
			<span>首页</span>
		</a>
		<a href="#/index/activity" :class="{'footer-check':num == 2}" @click="checked(2)">
			<img src="/img/font/activity.svg"/>
			<span>活动</span>
		</a>
		<a href="#/index/signin" :class="{'footer-check':num == 3}" @click="checked(3)">
			<img src="/img/font/signin1.svg"/>
			<span>报名</span>
		</a>
		<a href="#/index/mine" :class="{'footer-check':num == 4}" @click="checked(4)">
			<img src="/img/font/mine.svg"/>
			<span>我的</span>
		</a>
	</div>
</template>

<script>
	import $ from 'jQuery';
	import Vue from 'vue'
	export default{
		data(){
			return {
				num:1
			}
		},
		methods:{
			checked(num){
				this.num = num;
				sessionStorage.setItem("footerChecked",num);
			}
		},
		mounted(){
			this.num = sessionStorage.getItem("footerChecked");
		}
	}
</script>

<style>
	/*底部样式设置*/
	.footer{
		height: 5rem;width: 100%;
		background-color: #F64141;
		border-top: 1px solid #d8b2b2;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.footer a{
		display: flex;
		flex: 1;height: 5rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 1.5rem;
	}
	.footer a img{
		width: 2rem;height: 2rem;
	}
	/*选中样式更改*/
	.footer .footer-check{
		background-color: red;
	}
</style>