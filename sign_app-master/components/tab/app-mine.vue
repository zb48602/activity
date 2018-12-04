<template>
	<div class="mine">
		<header>
			<img src="/img/animal1.jpg"/>
			<span><img src="/img/1.jpg"/></span>
		</header>
		<p>
			<b>皮玉婕</b>
			<strong>2014441637</strong>
			<span>电气与信息工程学院</span>
			<span>计算机科学与技术</span>
		</p>
		<a href="#/own"><img src="/img/font/star.svg"/><span>个人信息</span></a>
		<a href="#/inmess"><img src="/img/font/siginin2.svg"/><span>报名查询</span></a>
		<a href="#/upmess"><img src="/img/font/change.svg"/><span>签到查询</span></a>
		<a href="#/setting" class="bottom"><img src="/img/font/shezhi.svg"/><span>设置</span></a>
		<a href="#/login" class="bottom"><img src="/img/font/exit.svg"/><span>退出</span></a>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	/*我的页面*/
	.mine{
		display: flex;
		flex-direction: column;
		padding-bottom: 5rem;
	}
	.mine header{
		width: 100%;
		height: 20rem;
		display: flex;
		justify-content: center;
		align-items: center;
		/*margin-bottom: 1.5rem;*/
		position: relative;
		padding-bottom: 1.8rem;
	}
	.mine header img{
		width: 100%;height: 100%;
	}
	.mine header span{
		position: absolute;
		bottom: 0;left: 50%;
		margin-left: -4rem;
	}
	.mine header span img{
		width:8rem;height: 8rem;
		border-radius: 5rem;
		border: 1px solid #F64141;
	}
	.mine p{
		padding:0.6rem 1.8rem 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid #E5E5E5;
	}
	.mine p span{
		color: #666;
		font: 1.4rem/2rem "微软雅黑";
	}
	.mine p b{
		font:700 1.8rem/2.1rem "微软雅黑";
		color: #333;
	}
	.mine p strong{
		font: 1.6rem/2rem "微软雅黑";
	}
	.mine a{
		margin: 0 1.5rem;
		display: flex;
		align-items: center;
		height: 5rem;
		color: #666;
		font-size: 1.6rem;
		border-bottom: 1px solid #d8b2b2;
	}
	.mine a img{
		display: flex;
		width: 2rem;height: 2rem;
		padding:0 1rem;
		align-items: center;
	}
	.bottom{
		border-bottom: 1px solid #d8b2b2;
	}
</style>