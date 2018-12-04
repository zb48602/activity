<template>
	<div class="register">
		<img src="/img/logo.png" alt="重庆科技学院" />
		<h3>
			<img src="/img/people.png"/><input type="text" placeholder="请输入学号" />
		</h3>
		<h3>
			<img src="/img/font/yanzheng1.svg"/>
			<input type="password" placeholder="请输入密码" />
		</h3>
		<h3>
			<img src="/img/font/phone.svg"/>
			<input type="text" placeholder="请输入绑定手机号" />
			<img src="/img/font/check.svg" class="check"/>
		</h3>
		<h3>
			<img src="/img/font/yanzheng.svg"/>
			<input type="text" placeholder="请输入手机验证码" />
			
		</h3>
		<p>
			<input type="button" value="注册" />
		</p>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.register {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 3rem;
	}
	/*logo*/
	.register img{
		width: 11rem;
		height: 11rem;
		margin-bottom: 1.7rem;
	}
	/*输入框*/
	.register h3{
		width: 24rem;height: 4rem;
		margin-bottom: 1.7rem;
		border-radius: 0.4rem;
		background-color: #ebebeb;
		display: flex;
		justify-content: center;
    	align-items: center;
    	padding: 0 1.5rem;
	}
	.register h3 img{
		width: 2.5rem;height: 2.5rem;
		margin: 0;
		padding-right: 0.5rem;
	}
	.register h3 input{
		width: 23rem;
		height: 4rem;
		color: #aaa;
		font: 1.5rem/4rem "微软雅黑";
		background-color: #ebebeb;
	}
	/*登录按钮*/
	.register p{
		width: 27rem;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.register p input{
		width: 27rem;
		height: 4rem;
		background-color: #f64141;
		color: #fff;
		border-radius: 0.4rem;
		font: 1.5rem/4rem "微软雅黑";
	}
	.register p span{
		color: #666;
		margin-top: 0.8rem;
		font: 0.6rem/1.8rem "微软雅黑";
	}
	.register p span a {
		padding: 0 0.25rem;
	}
	/*点击按钮*/
	.register .check{
		width: 4rem;height: 4rem;
		padding: 0;
	}
</style>