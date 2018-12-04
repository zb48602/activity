<template>
	<div class="app-login">
		<img src="/img/logo.png" alt="重庆科技学院" />
		<h3>
			<img src="/img/people.png"/><input type="text" placeholder="请输入学号" />
		</h3>
		<h3>
			<img src="/img/pass.png"/>
			<input type="password" placeholder="请输入密码" />
		</h3>
		<p>
			<input type="button" value="登录" />
			<span>没有账号？请点击<a href="#/register">注册</a></span>
		</p>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.app-login {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 3rem;
	}
	/*logo*/
	.app-login img{
		width: 11rem;
		height: 11rem;
		margin-bottom: 1.7rem;
	}
	/*输入框*/
	.app-login h3{
		width: 27rem;height: 4rem;
		margin-bottom: 1.7rem;
		border-radius: 0.4rem;
		background-color: #ebebeb;
		display: flex;
		justify-content: center;
    	align-items: center;
	}
	.app-login h3 img{
		width: 2.5rem;height: 2.5rem;
		margin: 0;
		padding-right: 0.5rem;
	}
	.app-login h3 input{
		width: 23rem;
		height: 4rem;
		color: #aaa;
		font: 1.5rem/4rem "微软雅黑";
		background-color: #ebebeb;
	}
	/*登录按钮*/
	.app-login p{
		width: 27rem;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.app-login p input{
		width: 27rem;
		height: 4rem;
		background-color: #f64141;
		color: #fff;
		border-radius: 0.4rem;
		font: 1.5rem/4rem "微软雅黑";
	}
	.app-login p span{
		color: #666;
		margin-top: 0.8rem;
		font: 0.6rem/1.8rem "微软雅黑";
	}
	.app-login p span a {
		padding: 0 0.25rem;
	}
	/**/
</style>