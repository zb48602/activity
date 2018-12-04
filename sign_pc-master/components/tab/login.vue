<template>
	<div class="login">
		<h3>
			<img src="/img/logo.png"/>
		</h3>
		<div class="test">
			
		</div>
		<div class="cont">
			<input type="text" v-model="name" placeholder="请输入账号" />
			<input type="password" v-model="pass" placeholder="请输入密码" />
			<p>
				<span>
					<input type="checkbox" name="rem" id="rem" value="1" />
					<label for="rem">记住密码</label>
				</span>
				<!--<em>
					<input type="checkbox" name="nologin" id="nologin" value="0" />
					<label for="nologin">7天免登录</label>
				</em>-->
			</p>
			<button @click="login">登录</button>
		</div>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default {
		data() {
			return {
				//提示信息
				message:'',
				isError:false,
				//用户名
				name: '',
				//密码
				pass: ''
				//记住密码
				//7天免登陆
			}
		},
		methods: {
			login(){
				var _this = this;
				if(this.name.length!=0&&this.pass.length!=0){
					if($("#rem").prop("checked")){
						localStorage.setItem("name",this.name);
						localStorage.setItem("pass",this.pass)
					}
					$.ajax({
						type:"post",
						url:"http://localhost:3000/login",
						data:{
							name:this.name,
							pass:this.pass
						},
						success(data){
							data = JSON.parse(data);
							if(data.length!=0){
								var status = data[0].man_type;
								sessionStorage.setItem("state",true);
								sessionStorage.setItem("status",status);
								sessionStorage.setItem('num',1);
								location.href = '#/index'
							}else{
								sessionStorage.setItem("state",false);
								sessionStorage.setItem("status",'');
								_this.isError = true;
								_this.message = '用户名或密码错误！';
								setTimeout(function(){
									_this.message = '';
									_this.isError = false;
								},1000)
							}
//							console.log(data)
						}
					});
				}else{
					this.isError = true;
					this.message = '用户名或密码不可为空！';
					setTimeout(function(){
						_this.message = '';
						_this.isError = false;
					},1000)
				}
			}
		},
		mounted(){
			var name = localStorage.getItem("name");
			var pass = localStorage.getItem("pass");
			if(name&&pass){
				this.name = name;
				this.pass = pass;
				$("#rem").attr("checked",'true');
			}
			
		}
	}
</script>

<style scoped="scoped">
	.login {
		width: 260px;
		position: absolute;
		top: 20%;
		left: 45%;
		/*background: rgba(255,255,255,0.5);*/
	}
	/*图片*/
	
	.login h3 {
		height: 70px;
		width: 100%;
		margin: 15px 0;
	}
	
	.login h3 img {
		display: block;
		height: 70px;
		width: 70px;
		margin: 0 auto;
	}
	/*内容*/
	
	.cont {
		background: rgba(255, 100, 0, 0.2);
		border-radius: 8px;
		width: 230px;
		padding: 15px;
	}
	/*输入框样式*/
	
	.cont input {
		width: 208px;
		height: 38px;
		padding: 0 10px;
		margin-bottom: 15px;
		height: 30px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		outline: none;
		color: #fff;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.2);
		font:14px/38px "微软雅黑";
	}
	
	.cont p {
		height: 20px;
		color: #fff;
		margin-bottom: 10px;
	}
	/*记住密码*/
	
	.cont p span {
		float: left;
		height: 20px;
	}
	
	.cont p input {
		padding: 0;
		margin: 0;
		width: 14px;
		height: 14px;
		vertical-align: middle
	}
	
	.cont p label {
		padding-left: 5px;
		font: 12px/20px "微软雅黑";
	}
	/*7天免登陆*/
	
	.cont p em {
		float: right;
		height: 20px;
		font-style: normal;
	}
	/*登录*/
	
	button {
		width: 230px;
		height: 38px;
		padding: 0 10px;
		/*margin-bottom: 10px;*/
		height: 30px;
		border: 1px solid rgba(255, 100, 0, 0.5);
		outline: none;
		color: #fff;
		border-radius: 4px;
		background: rgba(255, 100, 0, 0.3);
		cursor: pointer;
	}
	/*透明三角形*/
	
	.test {
		position: absolute;
		top: 80px;left: 120px;
		width: 0;
		height: 0;
		border-width: 10px 10px;
		border-style: solid;
		border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0) rgba(255, 100, 0, 0.2) rgba(255, 255, 255, 0);
	}
	/*提示信息*/
	input::-webkit-input-placeholder{
        color:#fff;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#fff;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#fff;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:#fff;
    }
    .message{
		position: absolute;
		z-index: 5;
		width: 280px;
		top: 41%;left: 50%;
		margin-left: -140px;
		/*background-color: white;*/
	}
	.message p{
		width: 100%;height: 100%;
		font:bold 16px/30px "微软雅黑";
		color: red;
		border:none;
		text-align: center;
	}
</style>