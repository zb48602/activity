<template>
	<div class="detail">
		<header>
			<a href="#/index/activity"><img src="/img/font/return1.svg"/></a>
			<span>重庆科技学院</span>
			<i></i>
		</header>
		<div class="title">
			<img src="/img/timg.jpg"/>
			<span><img src="/img/1.jpg"/></span>
			<h3>2017年“数创杯”全国大学生数学建模挑战赛</h3>
			<p>主办方： <b>数创杯”全国大学生数学建模挑战赛组织委员会、陕西创新人才发展研究院、172校园活动网</b></p>
			<em>2017-11-15</em>
		</div>
		<div class="cont">
			
			<p>开始时间：2017-11-17 14：00 </p>
			<p>举行地点：A211</p>
			<p>类型：科技竞赛</p>
			<p>人数：200</p>
			<p>2017年11月10日上午8时准时在比赛官网公布题目，各参赛队伍在比赛截止时间前登录比赛官网提交一篇论文。比赛分A、B、C、D题，题目类型分别为MCM（A、B题，比较注重理论和思路）和ICM（C、D题，比较注重实际应用）风格的题目，A题为研究生组，B、C题是本科组（任选一题），D题为专科组。</p>
			<p>
					奖励形式
	
	   1、比赛设特等奖、一等奖、二等奖、三等奖和优秀奖。每组设特等奖1个队伍，各奖励1000元；一、二、三等奖获得荣誉证书，分别占各组报名队数的5%、15%、25%；凡成功上交有效论文的队将获优秀奖荣誉证书。三等奖以上的论文，评委老师将提供论文评价；二等奖以上的论文，主办单位择优推荐到学术期刊免费发表。
	
	   2、比赛将根据所指导队伍的获奖情况评出“优秀指导教师”若干名。
	
	   3、比赛将根据各校的参赛情况和志愿者情况评出“优秀志愿者”和“优秀组织工作者”若干名以及“优秀组织奖”若干项。
				</p>
		</div>
		<button>报名</button>
	</div>
</template>

<script>
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
</style>