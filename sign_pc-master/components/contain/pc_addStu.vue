<template>
	<div class="addAct leftCont">
		<h3>新生入学</h3>
		<div class="cont">
			<p><span>学生姓名：</span><input type="text" v-model="name"/></p>
			<p><span>性别：</span>
				<input type="radio" name="sex" id="sex" value="0" checked="checked"/>男
				<input type="radio" name="sex" id="sex" value="1" />女
			</p>
			<p><span>生日：</span>
				<date-picker field="myDate" placeholder="出生日期" v-model="birth" format="yyyy/mm/dd" :backward="true" :no-today="true" :forward="false"></date-picker>
			</p>
			<p><span>身份证号：</span><input type="text" v-model="id_card"/></p>
			<p><span>班级：</span><input type="text" v-model="classes"/></p>
			<p><span>学院：</span>
				<select name="acaType" v-model="academy" @change="getMajor">
					<option v-for="a in arrAca" :value="a.aca_id" >
						{{a.aca_name}}
					</option>
				</select>
			</p>
			<p><span>专业：</span>
				<select name="majorType" v-model="major">
					<option v-for="a in arrMaj" :value="a.major_id">{{a.major_name}}</option>
				</select>
			</p>
			<p><span>年级：</span>
				<select name="graType" v-model="grade">
					<option v-for="a in arrGra" :value="a.gra_id">{{a.gra_name}}</option>
				</select>
			</p>
		</div>
		<button @click="addStu">提交</button>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import 'babel-polyfill'; //因为使用了es6的一些方法，需要babel垫片，如果你项目中已有相关兼容性方案，可忽略
	import Vue from 'vue';
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入对应的组件
	import $ from 'jQuery'
	export default{
		data(){
			return {
				//提示信息
				message:'',
				isError:false,
				//生日
				birth:'',
				//姓名
				name:'',
				//身份证号
				id_card:'',
				//班级
				classes:'',
				//学院
				academy:'',
				arrAca:'',
				//专业
				major:'',
				arrMaj:'',
				//性别
				sex:'',
				//
				arrGra:'',
				grade:''
			}
		},
		components:{
			'date-picker': myDatepicker
		},
		methods:{
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
			addStu(){
				var _this = this;
				//判断内容是否为空
				if(this.name.length==0||this.birth.length==0||this.id_card.length==0||this.classes.length==0){
					this.isError = true;
					this.message = '学生信息未填写完整！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else{
					//判断身份证号码是否合法及与生日是否相同
					if(/^[1-9][0-9]{17}$/.test(this.id_card)){
						var time = this.id_card.slice(6,14);
						var time2 = this.birth.split('/')[0]+this.birth.split('/')[1]+this.birth.split('/')[2];
						if(time==time2&&(/^[0-9]{1,2}$/.test(this.classes))){
							var sex = $('input:radio:checked').val();
							var pass = this.id_card.slice(12);
							$.ajax({
								type:"post",
								url:"http://localhost:3000/addStu",
								data:{
									name:this.name,
									academy:this.academy,
									major:this.major,
									id:this.id_card,
									birth:this.birth,
									classes:this.classes,
									sex:sex,
									pass:pass,
									grade:this.grade
								},
								success(data){
									_this.isError = true;
									_this.message = '添加成功';
									setTimeout(function(){
										_this.isError = false;
										_this.message = '';
										location.reload();
									},1000)
								}
							});
						}else{
							_this.isError = true;
							_this.message = '生日与身份证号不匹配';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
						}
					}
				}
			}
		},
		mounted(){
			var _this = this;
			var arrAca = [];
			var arrGra = [];
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
						_this.academy = data[0].aca_id;
					}
					_this.arrAca = arrAca;
					_this.getMajor();
				}
			});
			//获取年级
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getGrade",
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for (var i in data) {
							arrGra.push(data[i]);
						}
						_this.grade = data[0].gra_id;
					}
					_this.arrGra = arrGra;
				}
			});
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
	.addAct p {
		/*float: left;*/
		width: 420px;height: 30px;
		padding: 5px 0;
		margin: 0 auto;
		/*height: 26px;*/
		font: 12px/26px "微软雅黑";
	}
	.addAct p span {
		display: block;
		float: left;
		width: 90px;
	}
	
	.addAct p input[type="text"] {
		float: left;
		height: 26px;
		width: 245px;
		padding-left: 6px;
	}
	/*单选按钮*/
	
	.addAct p input[type="radio"] {
		padding: 0;
		width: 15px;
		height: 15px;
	}
	select{
		float: left;
		height: 30px;
		padding: 0 10px;
		margin-right: 10px;
	}
	/*文本域*/
	
	.addAct .allWidth {
		width: 100%;
	}
	.actReward{
		margin-left: 5px;
	}
	textarea{
		outline: none;
		border: none;
		padding: 0;
	}
	/*提交按钮样式*/
	button{
		display: block;
		border: none;
		padding: 0;
		margin: 10px auto;
		width: 80px;height: 30px;
		font: 14px/30px "微软雅黑";
		color: #FFFFFF;
		background-color: rgba(255,100,0,0.4);
		border-radius: 8px;
		cursor: pointer;
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
<style type="text/css">
	.vue-datepicker {
		float: left;
	}
</style>