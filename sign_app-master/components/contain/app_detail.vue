<template>
	<div class="detail">
		<header>
			<a href="#/index/signin"><img src="/img/font/return1.svg"/></a>
			<span>重庆科技学院</span>
			<i></i>
		</header>
		<div class="title" v-for="a in arr">
			<img src="/img/timg.jpg"/>
			<span><img src="/img/1.jpg"/></span>
			<h3>{{a.act_name}}</h3>
			<p>主办方： <b>{{a.act_sponsor}}</b></p>
			<!--<em>2017-11-15</em>-->
		</div>
		<div class="cont" v-for="a in arr">
			
			<p>活动时间：{{a.begin_time}}---{{a.stop_time}} </p>
			<p>举行地点：{{a.act_address}}</p>
			<p>类型：{{a.gen_name}}</p>
			<p>人数：{{a.act_num}}</p>
			<!--<p>2017年11月10日上午8时准时在比赛官网公布题目，各参赛队伍在比赛截止时间前登录比赛官网提交一篇论文。比赛分A、B、C、D题，题目类型分别为MCM（A、B题，比较注重理论和思路）和ICM（C、D题，比较注重实际应用）风格的题目，A题为研究生组，B、C题是本科组（任选一题），D题为专科组。</p>-->
			<p>{{a.act_text}}</p>
		</div>
		<button v-show="isShow" @click="checkIsInsert">报名</button>
		<span v-show="!isShow" class="notChecked">报名已结束</span>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return{
				arr:'',
				id:'',
				mes_id:'',
				sign_num:0,
				isShow:true
			}
		},
		mounted(){
			var _this = this;
			var arr = []
			this.id = this.$route.params.id;
			console.log(this.id)
			$.ajax({
				type:"post",
				url:"http://localhost:3001/getActById",
				data:{
					id:this.id
				},
				success(data){
					data = JSON.parse(data);
					var thetime =data[0].begin_time;
					var d=new   Date(Date.parse(thetime .replace(/-/g,"/")));
					var curDate=new Date();
					if(d <= curDate){
						_this.isShow = false
					}
					arr.push(data[0])
					_this.arr = arr;
				}
			});
		},
		methods:{
			signin(){
				$.ajax({
					type:"post",
					url:"http://localhost:3001/insertEnroll",
					data:{
						id:Number(localStorage.getItem('id')),
						mes_id:this.mes_id
					},
					success(data){
						data = JSON.parse(data);
						location.href = '#/index/signin'
					}
				});
			},
			checkIsInsert(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3001/checkIsInsert",
					data:{
						id:this.id
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0) {
							_this.mes_id = data[0].mes_id;
							var num = data[0].c;
							if(num<_this.arr[0].act_num){
								_this.isAdd();
							}else{
								console.log('人数已达上限')
							}
						}
					}
				});
			},
			isAdd(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3001/isSign",
					data:{
						id:Number(localStorage.getItem('id')),
						mes_id:this.mes_id
					},
					success(data){
						data = JSON.parse(data);
						if(data.length==0){
							_this.signin();
						}else{
							console.log('已报名')
						}
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	/*详情页样式设计*/
	
	.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*头部样式设置*/
	header{
		display: flex;
		width: 100%;
		height:4.6rem;
		background-color: #F64141;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		align-items: center;
		font: 2rem/4.6rem "微软雅黑";
		position: fixed;
		z-index: 2;
		top: 0;
	}
	header i{
		display: flex;
	}
	header a{
		display: flex;
		padding-left: 1.2rem;
	}
	header a img{
		width: 2rem;height: 2rem;
	}
	/*标题栏样式*/
	.title{
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		border-bottom: 2px solid #E5E5E5;
		margin-top: 4.7rem;
	}
	.title img{
		width: 100%;height: 20rem;
		margin-bottom: 2rem;
	}
	.title span{
		position: absolute;
		top: 18rem;left: 2rem;
	}
	.title span img{
		width:4rem;height: 4rem;
		border-radius: 5rem;
		border: 1px solid #F64141;
		margin: 0;
	}
	.title h3{
		padding: 0 1.5rem;
		text-align: center;
		font:700 2.3rem/3rem "微软雅黑";
		color: #000;
	}
	.title p{
		margin-top: 0.5rem;
		padding: 0 1.8rem;
		color: #373737;
		font: 1.5rem/2rem "微软雅黑";
	}
	.title p b{
		padding-left: 0.5rem;
		font-weight: normal;
		text-align: left;
	}
	.title em{
		display: flex;
		padding-left:1.8rem;
		font-style: normal;
		color: #989898;
		font:1.2rem/2rem "微软雅黑";
	}
	/**/
	.cont{
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid #E5E5E5;
	}
	.cont h3 {
		text-align: center;
		font-size: 2.3rem;
		color: #000;
	}
	
	.cont p {
		font: 1.5rem/2.2rem "微软雅黑";
		color: #333;
		width: 100%;
	}
	button{
		margin: 1.5rem;
		color: #fff;
		height: 3.5rem;
		width: 15rem;
		background-color: #F64141;
		font: 2rem/3rem "微软雅黑";
		text-align: center;
		border-radius: 0.4rem;
		background: linear-gradient(to bottom, #F64141, red); 
	}
	.notChecked{
		margin: 1.5rem;
		color: #fff;
		height: 3.5rem;
		width: 15rem;
		background-color: #F64141;
		font: 2rem/3rem "微软雅黑";
		text-align: center;
		border-radius: 0.4rem;
		background: linear-gradient(to bottom, #424242, gray); 
	}
</style>