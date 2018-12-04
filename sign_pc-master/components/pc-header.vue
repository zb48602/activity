<template>
	<div class="header">
		<div class="head">
			<img src="/img/login-logo.png"/>
			<!--<ul>
				<li><a href="#">报名管理</a></li>
				<li><a href="#">签到管理</a></li>
				<li><a href="#">学生管理</a></li>
				<li><a href="#">账户管理</a></li>
			</ul>-->
		</div>
	</div>
</template>

<script>
</script>

<style>
	.header{
		width: 100%;height: 70px;
		/*background: linear-gradient(to right, #f7aa90, #bb9ecc);*/ 
		background: linear-gradient(to left,#F64141, orange); 
	}
	.head{
		width: 1000px;
		height: 70px;
		margin: 0 auto;
	}
	.head img{
		height: 70px;
		float: left;
	}
	.head ul{
		float: right;
		height: 50px;
		padding-top: 20px;
		font:16px/50px "微软雅黑";
	}
	.head ul li{
		float: left;
	}
	.head ul li a{
		padding-left:20px;
		color: #fff;
	}
</style>