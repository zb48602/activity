<template>
	<div class="leftCont">
		<h3>学生信息修改</h3>
			<div class="cont">
				<div class="search">
					<p>
						<span>请输入学生学号：</span>
						<input type="text" v-model="stu_id" />
					</p>
					<img src="/img/font/search.svg" @click="toSearchStu"/>
				</div>
				<div class="detail" v-show="isTrue">
					<div>
						<span>学号：{{stu_id}}</span>
						<span>姓名：{{stu_name}}</span>
						<span>性别：{{stu_sex}}</span>
						<span>年级：{{grade}}</span>
					</div>
					<p>学院：
						<select name="acaType" v-model="academy" @change="getMajor">
							<option v-for="a in arrAca" :value="a.aca_id" >
								{{a.aca_name}}
							</option>
						</select>
					</p>
					<p>专业：
						<select name="majorType" v-model="major">
							<option v-for="a in arrMaj" :value="a.major_id">{{a.major_name}}</option>
						</select>
					</p>
					<p>班级：<input type="text" name="classes" id="classes" v-model="classes"/></p>
					<p>义工：<input type="text" name="volunteer" id="volunteer" v-model="volunteer"/></p>
					<p>学分：<input type="text" name="credit" id="credit" v-model="credit"/></p>
					<button @click="changeStu">提交</button>
				</div>
				<div class="error" v-show="isError">
					<h4>该学生不存在，请正确输入学号（学号由10位数字组成）</h4>
				</div>
			</div>
		</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				isTrue:false,
				stu_id:'',
				stu_name:"皮玉婕",
				stu_sex:"女",
				//学院
				academy:'',
				arrAca:'',
				//专业
				major:'',
				arrMaj:'',
				grade:2014,
				classes:3,
				volunteer:1.6,
				credit:0.3,
				isError:false
			}
		},
		methods:{
			toSearchStu(){
				var _this = this;
				var arrAca = [];
				var id = this.stu_id;
				if(/^[0-9]{10}$/.test(id)){
					this.isError = false;
					this.isTrue = true;
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
							
							_this.academy = data[0].aca_id;
							_this.major = data[0].major_id;
							_this.grade = data[0].gra_name;
							_this.classes = data[0].classes;
							_this.volunteer = data[0].stu_volunteer;
							_this.credit = data[0].stu_credit
						}
					});
					//获取学院
					$.ajax({
						type:"post",
						url:"http://localhost:3000/getAcaOnce",
						success(data){
							data = JSON.parse(data);
							if(data.length!=0){
								for (var i in data) {
									arrAca.push(data[i]);
								}
							}
							_this.arrAca = arrAca;
							_this.getMajor();
						}
					});
				}else{
					this.isError = true;
					this.stu_id = ''
				}
			},
			getMajor(){
				var _this = this;
				var arrMaj = [];
				if(this.academy!=0){
					var id = parseInt(this.academy)
					$.ajax({
						type:"post",
						url:"http://localhost:3000/getMajorById",
						data:{
							id:id
						},
						success(data){
							data = JSON.parse(data);
							if(data.length!=0){
								for (var i in data) {
									arrMaj.push(data[i]);
								}
							}
							_this.major = data[0].major_id;
							_this.arrMaj = arrMaj;
						}
					});
				}
			},
			changeStu(){
				var _this = this;
				console.log(this.credit)
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeStu",
					data:{
						id:this.stu_id,
						academy:this.academy,
						major:this.major,
						classes:this.classes,
						credit:this.credit,
						volunteer:this.volunteer
					},
					success(data){
						_this.isDelete  = false;
						_this.isTrue = false;
						_this.stu_id = '';
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
		font:14px/30px "微软雅黑";
	}
	.detail div{
		width: 100%;height: 60px;
	}
	.detail div span{
		float: left;
		width: 150px;height: 30px;
	}
	.detail p{
		width: 100%;height: 30px;
		margin: 10px 0;
	}
	.detail p input{
		float: right;
		height: 26px;
		width: 235px;
		padding-left: 15px;
		border-radius: 4px;
	}
	.detail p select{
		float: right;
		height: 26px;
		width: 250px;
		padding-left: 15px;
		border-radius: 4px;
	}
	/*提交按钮样式*/
	button{
		display: block;
		border: none;
		padding: 0 20px;
		margin: 20px auto;
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
	}
	.error h4{
		text-align: center;
		font:bold 16px/50px "微软雅黑";
		color: red;
	}
</style>