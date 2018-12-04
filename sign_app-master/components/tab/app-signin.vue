<template>
	<div class="sign-in">
		<div class="title">
			<p>
				<select :class="{'check':num == 1}" @click="checked(1)" name="inType">
					<option value="t0" selected="selected">显示全部</option>
					<option value="t1">考试预约</option>
					<option value="t2">学术讲座</option>
					<option value="t3">科技创新</option>
					<option value="t4">文化活动</option>
					<option value="t5">科学竞赛</option>
					<option value="t6">学术讲座</option>
					<option value="t7">名著阅读</option>
					<option value="t8">创业教育</option>
				</select>
				<!--<b :class="{'check':num == 1}" @click="checked(1)">全部信息</b>-->
				<b :class="{'check':num == 2}" @click="checked(2)" class="border">可报名</b>
			</p>
		</div>
		<!--<h3>报名</h3>-->
		<a href="#/detail">
			<img src="/img/timg.jpg" />
			<p>
				<strong>2017年“数创杯”全国大学生数学建模挑战赛</strong>
				<em>内容简介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
		<a href="#">
			<img src="/img/logo.png" />
			<p>
				<strong>“成语英雄大赛”活动</strong>
				<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
		<a href="#">
			<img src="/img/logo.png" />
			<p>
				<strong>校园“阅读马拉松”活动</strong>
				<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
		<a href="#">
			<img src="/img/logo.png" />
			<p>
				<strong>一颗鸡蛋的飞天梦"鸡蛋格勒保卫战"高空护蛋大赛</strong>
				<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
		<a href="#">
			<img src="/img/logo.png" />
			<p>
				<strong>“21天计划”运动打卡活动</strong>
				<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
		<a href="#">
			<img src="/img/logo.png" />
			<p>
				<strong>"朝花夕拾"树叶情书原创大赛</strong>
				<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>

			</p>
			<b><img src="/img/font/signin.svg"/></b>
		</a>
	</div>
</template>

<script>
	//公共组件
	export default{
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