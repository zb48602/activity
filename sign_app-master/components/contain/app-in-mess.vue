<template>
	<div class="in_mess">
		<xheader2>报名情况</xheader2>
		<div class="title">
			<p>
				<b :class="{'check':num == 1}" @click="checked(1)">显示全部</b>
				<b :class="{'check':num == 2}" @click="checked(2)" class="border">报名成功</b>
				<b :class="{'check':num == 3}" @click="checked(3)">报名失败</b>
			</p>
			
		</div>
		<div class="cont">
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/successed.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/error.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/successed.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/error.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/successed.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/error.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/successed.svg"/></b>
			</a>
			<a href="#/detail">
				<em><img src="/img/timg.jpg" /></em>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<b><img src="/img/font/error.svg"/></b>
			</a>
		</div>
	</div>
</template>

<script>
	//公共组件
	import xheader2 from "../app-header2.vue";
	export default{
		components:{
			xheader2
		},
		data(){
			return {
				num:1
			}
		},
		methods:{
			checked(num){
				this.num = num
			}
		}
	}
</script>

<style scoped="scoped">
	.in_mess{
		display: flex;
		width: 100%;
		padding-top: 4.6rem;
		flex-direction: column;
	}
	.title{
		display: flex;
		padding: 1rem 2rem;
		height: 3rem;
		background-color: #F64141;
	}
	.title p{
		display: flex;
		width:100%;height: 3rem;
		background-color: #fff;
		border: 1px solid #fff;
		border-radius: 0.2rem;
	}
	.title b{
		display: flex;height: 3rem;
		flex: 1;
		color: #F64141;
		font-style: normal;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		
	}
	.title .check{
		background-color: #F64141;
		color: #fff;
	}
	.border{
		border-left: 1px solid #F64141;
		border-right: 1px solid #F64141;
	}
	/*内容区*/
	.cont{
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
	}
	.cont a {
		display: flex;
		height:5.2rem;width: 100%;
		padding: 0.95rem 0;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 2px solid #e8e8ea;
		color: #666;
	}
	.cont a strong {
		display: flex;
		padding:0 1rem;
		height: 5.2rem;
		color: #55585e;
		font-size: 1.5rem;
	}
	.cont a b{
		display: flex;
	}
	.cont a b img{
		width: 2rem;height:2rem;
	}
	.cont a em{
		display: flex;
	}
	.cont a em img{
		width: 5.2rem;height:5.2rem;
	}
</style>