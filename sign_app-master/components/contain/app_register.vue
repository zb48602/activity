<template>
	<div class="register">
		<img src="/img/logo.png" alt="重庆科技学院" />
		<h3>
			<img src="/img/people.png"/>
			<input type="text" placeholder="请输入学号" v-model="stu_id" />
		</h3>
		<h3>
			<img src="/img/font/yanzheng1.svg"/>
			<input type="password" placeholder="请输入密码" v-model="psw"/>
		</h3>
		<h3>
			<img src="/img/font/phone.svg"/>
			<input type="text" placeholder="请输入绑定手机号" v-model="phone"/>
			<img src="/img/font/check.svg" class="check"/>
		</h3>
		<!--<h3>
			<img src="/img/font/yanzheng.svg"/>
			<input type="text" placeholder="请输入手机验证码" />
			
		</h3>-->
		<p>
			<input type="button" value="注册" @click="regist"/>
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
			return{
				stu_id:'',
				psw:'',
				phone:'',
				//提示信息
				message:'提示信息',
				isMess:false
			}
		},
		methods:{
			regist(){
				var _this = this;
				if(this.stu_id.length!=0&&this.psw.length!=0&&this.phone.length!=0){
					if(/^[0-9]{10}$/.test(this.stu_id)&&/^[0-9]{11}$/.test(this.phone)){
						//判断该手机号是否已被注册
						$.ajax({
							type:"post",
							url:"http://localhost:3001/checkPhone",
							data:{
								num:parseInt(this.phone)
							},
							success(data){
								data = JSON.parse(data);
								if(data.length==0){
									_this.login();
								}else{
									_this.isMess = true;
									_this.message = '您已注册，即将跳转登录页面';
									setTimeout(function(){
										_this.isMess = false;
										_this.message = '';
										_this.phone = '';
										location.href = '#/';
									},1000)
								}
							}
						});
						//进行注册
					}else{
						this.isMess = true;
						this.message = '学号或手机号不合法，请重新输入！';
						setTimeout(function(){
							_this.isMess = false;
							_this.message = '';
						},1000)
					}
				}else{
					this.isMess = true;
					this.message = '仍有内容为空，请输入完整！';
					setTimeout(function(){
						_this.isMess = false;
						_this.message = '';
					},1000)
				}
			},
			login(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3001/regist",
					data:{
						id:parseInt(this.stu_id),
						psw:this.psw,
						num:this.phone
					},
					success(data){
						data = JSON.parse(data);
						console.log(data)
						if(data.affectedRows==1){
							localStorage.setItem("id",_this.stu_id);
							localStorage.setItem("psw",_this.psw);
							localStorage.setItem("state",1);
							location.href = '#/index/home';
						}else{
							_this.isMess = true;
							_this.message = '学号或密码错误，请重新输入！';
							_this.psw = '';
							setTimeout(function(){
								_this.isMess = false;
								_this.message = '';
							},1000)
						}
					}
				});
			}
		}
	}
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
	/*提示信息样式设置*/
	.register .message{
		width: 27rem;
		padding: 1rem;
		position: absolute;
		background-color: red;
		border-radius: 0.4rem;
	}
	.register .message p{
		width: 100%;
		color: #fff;
		text-align: center;
		font:bold 2rem/4rem "微软雅黑";
	}
</style>