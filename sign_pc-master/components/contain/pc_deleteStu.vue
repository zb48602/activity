<template>
	<div class="leftCont">
		<h3>学生退学或休学管理</h3>
		<div class="cont">
			<div class="search">
				<p>
					<span>请输入学生学号：</span>
					<input type="text" v-model="stu_id" />
				</p>
				<img src="/img/font/search.svg" @click="toSearchStu"/>
			</div>
			<div class="detail" v-show="isTrue">
				<p>学号：{{stu_id}}</p>
				<p>姓名：{{stu_name}}</p>
				<p>性别：{{stu_sex}}</p>
				<p>学院：{{academy}}</p>
				<p>专业：{{major}}</p>
				<p>年级：{{grade}}</p>
				<p>班级：{{classes}}</p>
				<p>义工：{{volunteer}}</p>
				<p>学分：{{credit}}</p>
				<button @click="isDel">休学（退学）</button>
			</div>
		</div>
		<!-- 删除框 -->
		<div class="add" v-show="isDelete">
			<div class="conts">
				<h5>休学（退学）</h5>
				<h6>是否对该生进行休学（退学）？</h6>
				<p>
					<span @click="yesDel">确定</span>
					<span @click="isDel">取消</span>
				</p>
			</div>
		</div>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				isTrue:false,
				isDelete:false,
				stu_id:'',
				stu_name:"皮玉婕",
				stu_sex:"女",
				academy:"电气与信息工程学院",
				major:"计算机科学与技术",
				grade:2014,
				classes:3,
				volunteer:1.6,
				credit:0.3,
				//提示信息
				message:'',
				isError:false
			}
		},
		methods:{
			toSearchStu(){
				var id = this.stu_id;
				var _this = this;
				if(/^[0-9]{10}$/.test(id)){
					this.isError = false;
					this.isTrue = true,
					$.ajax({
						type:"post",
						url:"http://localhost:3000/getStu",
						data:{
							id:this.stu_id
						},
						success(data){
							data = JSON.parse(data);
							console.log(data)
							_this.stu_name = data[0].stu_name;
							if(data[0].stu_sex==0){
								_this.stu_sex = '男';
							}else{
								_this.stu_sex = '女';
							}
							
							_this.academy = data[0].aca_name;
							_this.major = data[0].major_name;
							_this.grade = data[0].gra_name;
							_this.classes = data[0].classes;
							_this.volunteer = data[0].stu_volunteer;
							_this.credit = data[0].stu_credit
						}
					});
				}else{
					this.isError = true;
					this.message = '该学生不存在，请正确输入学号（学号由10位数字组成）';
					this.stu_id = ''
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},2000)
					
				}
			},
			isDel(){
				this.isDelete = !this.isDelete;
			},
			yesDel(){
				var _this = this;
				console.log(this.stu_id)
				$.ajax({
					type:"post",
					url:"http://localhost:3000/delStu",
					data:{
						id:this.stu_id
					},
					success(data){
						_this.isError = true;
						_this.message = '休学（退学）成功！';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							_this.isDelete  = false;
							_this.isTrue = false;
							_this.stu_id = '';
						},1000)
						
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	/*通用样式设置*/
	.leftCont{
		float: right;
		width: 800px;
		min-height: 440px;
		padding: 10px;
		color: #fff;
		margin-right: 10px;
		background-color: rgba(255, 100, 0, 0.3);
		position: relative;
	}
	h3{
		width: 100%;
		font-weight: normal;
		text-align: center;
		font:18px/44px "微软雅黑";
	}
	/*搜索样式*/
	.search{
		height: 40px;width: 400px;
		padding:0 10px;
		border: 1px solid #DCDCDC;
		border-radius: 5px;
		margin: 0 auto;
	}
	.search p{
		float: left;
		height: 40px;width: 370px;
		font:14px/40px "微软雅黑";
	}
	.search p span{
		float: left;
		width: 130px;
	}
	.search p input{
		float: left;
		height: 30px;width: 230px;
		padding-left: 10px;
		margin: 5px 0;
		border-radius: 5px;
	}
	.search img{
		float: right;
		width: 20px;height: 20px;
		margin: 10px 0;
		cursor: pointer;
	}
	/*详情*/
	.detail{
		width: 300px;
		margin: 10px auto;
	}
	.detail p{
		width: 100%;height: 30px;
		font:14px/30px "微软雅黑";
	}
	/*提交按钮样式*/
	button{
		display: block;
		border: none;
		padding: 0 15px;
		margin: 10px auto;
		height: 40px;
		font: 14px/40px "微软雅黑";
		color: #FFFFFF;
		background-color: rgba(255,100,0,0.4);
		border-radius: 8px;
		cursor: pointer;
	}
	/*错误提示*/
	.error{
		width: 250px;
		margin: 10px auto;
		border-radius: 5px;
		background-color: gainsboro;
		position: absolute;
		top: 40%;left: 50%;
		margin-left: -125px;
		
	}
	.error h4{
		text-align: center;
		font:bold 16px/50px "微软雅黑";
		color: red;
	}
	/*删除框*/
	.add{
		width: 100%;height: 100%;
		position: absolute;
		top: 0;left: 0;
		background-color: rgba(0,0,0,0.5);
	}
	.conts{
		width: 280px;
		height: 150px;
		background-color: gainsboro;
		border-radius: 6px;
		position: absolute;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
	}
	.conts h5{
		margin: 0;padding: 0;
		height: 50px;
		text-align: center;
		font:16px/50px "微软雅黑";
		color: #000;
	}
	.conts h6{
		margin: 15px auto;
		height: 30px;
		text-align: center;
		color: red;
		font: 14px/30px "微软雅黑";
		
	}
	.conts p{
		height: 39px;width: 100%;
		overflow: hidden;
		border-top: 1px solid #666666;
	}
	.conts p span{
		float: left;
		width: 139px;height: 39px;
		text-align: center;
		color: #666666;
		font:14px/39px "微软雅黑";
		cursor: pointer;
	}
	.conts p span:first-of-type{
		border-right: 1px solid #666666;
	}
	/*提示信息*/
    .message{
		position: absolute;
		z-index: 5;
		width: 280px;
		top: 40%;left: 50%;
		margin-left: -140px;
		border-radius: 5px;
		background-color: red;
	}
	.message p{
		width: 250px;height: 100%;
		padding: 15px;
		font:bold 18px/30px "微软雅黑";
		color: white;
		border:none;
		text-align: center;
	}
</style>