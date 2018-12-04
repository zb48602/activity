<template>
	<div class="sign-in">
		<div class="title">
			<p>
				<b :class="{'check':num == 1}" @click="checked(1)">可报名活动</b>
				<b :class="{'check':num == 2}" @click="checked(2)" class="border">报名结束</b>
			</p>
		</div>
		<!--<h3>报名</h3>-->
		<router-link v-for="(a,index) in arr" :to="'/detail/'+a.act_id" :key="index">
			<img src="/img/timg.jpg" />
			<p>
				<strong>{{a.act_name}}0</strong>
				<em>{{a.act_text}}</em>
			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</router-link>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				num:1,
				arr:''
			}
		},
		methods:{
			checked(num){
				this.num = num;
				var arr = [];
				var _this = this;
				if(num==1){
					this.getEnroll();
				}
				if(num==2){
					$.ajax({
						type:"post",
						url:"http://localhost:3001/getEnroll",
						success(data){
							data = JSON.parse(data);
							if(data.length!=0){
								for(var i in data){
									var thetime =data[i].mes_begin;
						            var   d=new   Date(Date.parse(thetime .replace(/-/g,"/")));
						            var   curDate=new   Date();
						           	if(d <= curDate){
						            	arr.push(data[i])
						            }
//									arr.push(data[i]);
								}
								_this.arr = arr;
							}
						}
					});
				}
			},
			getEnroll(){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3001/getEnroll",
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for(var i in data){
								var thetime =data[i].mes_begin;
					            var   d=new   Date(Date.parse(thetime .replace(/-/g,"/")));
					            var   curDate=new   Date();
					           	if(d > curDate){
					            	arr.push(data[i])
					            }
//									arr.push(data[i]);
							}
							_this.arr = arr;
						}
					}
				});
			}
		},
		mounted(){
			this.getEnroll();
		}
	}
</script>

<style scoped="scoped">
	/*报名页面样式设置*/
	
	.sign-in {
		display: flex;
		flex-direction: column;
		padding-bottom: 5rem;
		/*align-items: center;*/
		/*justify-content: center;*/
	}
	.sign-in h3{
		height: 5rem;width: 20rem;
		text-align: center;
		font-size: 2rem;line-height: 5rem;
		background:url(/img/font/xian.png) no-repeat;
		background-size: 20rem 7rem;
		color: #333;
	}
	.sign-in a {
		height:5.2rem;
		padding: 0.95rem 1rem;
		display: flex;
		justify-content: flex-start;
		border-bottom: 2px solid #e8e8ea;
		color: #666;
	}
	
	.sign-in a img {
		display: flex;
		height: 5.2rem;width: 5.2rem;
	}
	
	.sign-in a p {
		padding:0 1rem;
		height: 5.2rem;width: 100%;
		display: flex;flex: 6;
		flex-direction: column;
		justify-content: center;
	}
	
	.sign-in a p strong {
		color: #55585e;
		font-size: 1.3rem;
	}
	
	.sign-in a p em {
		height: 1.5rem;
		font-size: 1rem;
		font-style: normal;
		width: 100%;
		overflow: hidden;
		color: #909090;
	}
	
	.sign-in a b {
		display: flex;
		font: 500 1rem/3rem "微软雅黑";
		width: 5rem;
		height: 5rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.4rem;
	}
	/*头部分类*/
	.title{
		display: flex;
		/*width: 100%;*/
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
		width: 50%;
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
	.title select{
		padding: 0 2rem;
		display: flex;height: 3rem;
		flex: 1;
		color: #F64141;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		display: flex;
		position: relative;
		font-weight: 700;
	}
	/*.title select option{
		background-color: #fff;
		color: #F64141;
	}*/
</style>