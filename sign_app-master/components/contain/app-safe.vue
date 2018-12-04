<template>
	<div class="safe">
		<div class="head">
			<i><img src="/img/font/return1.svg" @click="return_mine"/></i>
			<span>账号安全</span>
			<i> </i>
		</div>
		<div class="cont">
			<span @click="showPass">修改密码</span>
			<span @click="showNum">更换绑定手机</span>
		</div>
		<div class="changePass" v-show="passShow">
			<h3>修改密码</h3>
			<p>
				<span>原密码：</span>
				<input type="password" />
			</p>
			<p>
				<span>新密码：</span>
				<input type="password" />
			</p>
			<p>
				<span>确认密码：</span>
				<input type="password" />
			</p>
			<button>确定</button>
			<b v-text="mess"></b>
		</div>
		<div class="changeNum" v-show="numShow">
			<h3>更换手机号</h3>
			<p>
				<span>手机号:</span>
				<input type="text" />
				<img src="/img/font/check.svg"/>
			</p>
			<p>
				<span>验证码:</span>
				<input type="text" />
			</p>
			<button>确定</button>
		</div>
		<strong v-show="mShow" @click="hide"></strong>
	</div>
</template>

<script>
	export default{
		methods:{
			return_mine(){
				location.href = '#/setting';
			},
			showPass(){
				this.passShow = true;
				this.mShow = true;
			},
			showNum(){
				this.numShow = true;
				this.mShow = true;
			},
			hide(){
				this.passShow = false;
				this.numShow = false;
				this.mShow = false;
			}
		},
		data(){
			return {
				mess:"密码不可为纯数字!",
				passShow:false,
				numShow:false,
				mShow:false
			}
		}
	}
</script>

<style scoped="scoped">
	.head{
		padding: 0 1.6rem;
		width: 100%;
		height:4.6rem;
		background-color: #F64141;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		align-items: center;
		font: 2rem/4.6rem "微软雅黑";
		position: fixed;
		top: 0;
		box-sizing: border-box;
	}
	.head i{
		display: flex;
	}
	.head i img{
		width: 2rem;height: 2rem;
	}
	/*内容*/
	.cont{
		padding: 0 1.6rem;
		display: flex;
		flex-direction: column;
		padding-top: 4.6rem;
	}
	.cont span{
		display: block;
		padding: 0 1.2rem;
		border-bottom: 1px solid #d8b2b2;
		height: 5rem;line-height: 5rem;
		background-color: #fff;
		font-size: 1.6rem;
		color: #666;
	}
	/*修改密码*/
	.changePass{
		width: 24rem;height: 25rem;
		position: absolute;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		align-items: center;
		padding:0 2rem;
		z-index: 3;
	}
	.changePass h3{
		color: #F64141;
		text-align: center;
		font: 2rem/3rem "微软雅黑";
		padding: 1rem 0;
	}
	.changePass p{
		display: flex;height: 3rem;
		align-items: center;
		padding:1rem 0;
	}
	.changePass p span{
		display: flex;
		width: 7rem;height: 3rem;
		font-size: 1.5rem;
	}
	.changePass p input{
		height: 3rem;
		font-size: 1.5rem;
		border-bottom: 1px solid #ccc;
	}
	.changePass button{
		width: 10rem;height: 3rem;
		background-color: #F64141;
		font: 2rem/3rem "微软雅黑";
		text-align: center;
		border-radius: 0.4rem;
		background: linear-gradient(to bottom, #F64141, red); 
		color: #fff;
	}
	.changePass b{
		position: absolute;
		width: 15rem;height: 2rem;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
		padding: 1rem;
		color: red;
		font-style: normal;
		text-align: center;
		font: 1.5rem/2rem "微软雅黑";
		background-color: rgba(0,0,0,0.3);
		display: none;
	}
	/*更换手机*/
	.changeNum{
		width: 24rem;height: 20rem;
		position: absolute;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		align-items: center;
		padding:0 2rem;
		z-index: 3;
	}
	.changeNum h3{
		color: #F64141;
		text-align: center;
		font: 2rem/3rem "微软雅黑";
		padding: 1rem 0;
	}
	.changeNum p{
		display: flex;height: 3rem;
		align-items: center;
		padding:1rem 0;
		position: relative;
	}
	.changeNum p img{
		position: absolute;
		right: 0;
		width: 3rem;height: 3rem;
	}
	.changeNum p span{
		display: flex;
		width: 5rem;height: 3rem;
		font-size: 1.5rem;
	}
	.changeNum p input{
		height: 3rem;
		font-size: 1.5rem;
		border-bottom: 1px solid #ccc;
	}
	.changeNum button{
		width: 10rem;height: 3rem;
		background-color: #F64141;
		font: 2rem/3rem "微软雅黑";
		text-align: center;
		border-radius: 0.4rem;
		background: linear-gradient(to bottom, #F64141, red); 
		color: #fff;
	}
	.changeNum b{
		position: absolute;
		width: 15rem;height: 2rem;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
		padding: 1rem;
		color: red;
		font-style: normal;
		text-align: center;
		font: 1.5rem/2rem "微软雅黑";
		background-color: rgba(0,0,0,0.3);
		display: none;
	}
	/*蒙版*/
	strong{
		position: absolute;
		top: 0;
		z-index: 2;
		width: 100%;height: 100%;
		background-color: rgba(0,0,0,0.5);
	}
</style>