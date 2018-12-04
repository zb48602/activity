<template>
	<div class="app-login">
		<img src="/img/logo.png" alt="重庆科技学院" />
		<h3>
			<img src="/img/people.png"/><input type="text" placeholder="请输入学号或手机号" v-model="id" />
		</h3>
		<h3>
			<img src="/img/pass.png"/>
			<input type="password" placeholder="请输入密码" v-model="psw"/>
		</h3>
		<p>
			<input type="button" value="登录" @click="login"/>
			<span>没有账号？请点击<a href="#/register">注册</a></span>
		</p>
		<div class="message" v-show="isMess">
			<p>{{message}}</p>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				id:'',
				psw:'',
				//提示信息
				message:'提示信息',
				isMess:false
			}
		},
		mounted(){
			var id = localStorage.getItem('id');
			var psw = localStorage.getItem('psw');
			var state = localStorage.getItem('state');
			if(id!=null&&psw!=null&&state==1){
				location.href = '#/index/home';
			}else if(id!=null&&psw!=null&&state==0){
				this.id = id;
				this.psw = psw;
			}
		},
		methods:{
			login(){
				var _this = this;
				if(this.id.length!=0&&this.psw.length!=0){
					if(/^[0-9]{10,11}$/.test(this.id)){
						$.ajax({
							type:"post",
							url:"http://localhost:3001/login",
							data:{
								id:parseInt(this.id),
								psw:this.psw
							},
							success(data){
								data = JSON.parse(data);
								if(data.length!=0){
									localStorage.setItem("id",data[0].stu_id);
									localStorage.setItem("psw",_this.psw);
									localStorage.setItem("state",1);
									location.href = '#/index/home';
								}else{
									_this.isMess = true;
									_this.message = '用户名或密码错误，请重新输入！';
									_this.psw = '';
									setTimeout(function(){
										_this.isMess = false;
										_this.message = '';
									},1000)
								}
							}
						});
					}else{
						this.isMess = true;
						this.message = '用户名只能为学号或手机号！';
						setTimeout(function(){
							_this.isMess = false;
							_this.message = '';
						},1000)
					}
				}else{
					this.isMess = true;
					this.message = '用户名或密码不可为空！';
					setTimeout(function(){
						_this.isMess = false;
						_this.message = '';
					},1000)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.app-login {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
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
		font: 2rem/4rem "微软雅黑";
	}
	.app-login p span{
		color: #666;
		margin-top: 0.8rem;
		font: 1rem/1.8rem "微软雅黑";
	}
	.app-login p span a {
		padding: 0 0.25rem;
	}
	/**/
	/*提示信息样式设置*/
	.app-login .message{
		width: 27rem;
		padding: 1rem 0;
		position: absolute;
		background-color: red;
		border-radius: 0.4rem;
	}
	.app-login .message p{
		width: 100%;
		color: #fff;
		text-align: center;
		font:bold 2rem/4rem "微软雅黑";
	}
</style>