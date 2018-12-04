<template>
	<div class="leftCont">
		<h3>修改活动信息</h3>
			<div class="cont">
				<p><span>活动名称：</span><input type="text" v-model="name"/></p>
				<p><span>活动类别：</span>
					<select name="genType" v-model="genre">
						<option v-for="a in arrGen" :value="a.gen_id">
							{{a.gen_name}}
						</option>
					</select>
				</p>
				<p><span>主办单位：</span><input type="text" v-model="sponsor"/></p>
				<p><span>年级限制：</span>
					<select name="gradeType" v-model="graVal">
						<option value="0">全部</option>
						<option v-for="a in arrGra" :value="a.gra_id" >
							{{a.gra_name}}
						</option>
					</select>
				</p>
				<p><span>所需人数：</span><input type="text" v-model="num"/></p>
				<p>
					<span>活动开始时间：</span>
					<date-picker field="myDate" placeholder="开始时间" v-model="date1" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
					<select name="hour1" v-model="hours1" class="timer">
						<option value="00">00</option>
				<option v-for="h in hour" :value="h">{{h}}</option>
					</select>
					<b>:</b>
					<select name="minute1" v-model="minute1" class="timer">
						<option value="00">00</option>
				<option v-for="m in minute" :value="m">{{m}}</option>
					</select>
				</p>
				<p><span>义工奖励：</span>
					<input type="text" v-model="volunteer"/>
				</p>
				<p><span>活动结束时间：</span>
					<date-picker field="myDate" placeholder="截止时间" v-model="date2" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
					<select name="hour2" v-model="hours2" class="timer">
						<option value="00">00</option>
				<option v-for="h in hour" :value="h">{{h}}</option>
					</select>
					<b>:</b>
					<select name="minute2" v-model="minute2" class="timer">
						<option value="00">00</option>
						<option v-for="m in minute" :value="m">{{m}}</option>
					</select>
				</p>
				<p><span>学分奖励：</span>
					<input type="text" v-model="credit"/>
				</p>
				<p><span>报名限制：</span>
					<select name="acaType" v-model="acaVal" @change="getMajor">
						<option value="0">全部</option>
						<option v-for="a in arrAca" :value="a.aca_id" >
							{{a.aca_name}}
						</option>
					</select>
					<select name="majorType" v-model="majorVal">
						<option value="0" selected="selected">全部</option>
						<option v-for="a in arrMaj" :value="a.major_id">{{a.major_name}}</option>
					</select>
				</p>
				<p><span>举行地点：</span><input type="text" v-model="address"/></p>
				<p class="allWidth"><span>活动内容：</span><textarea name="cont" rows="8" cols="87" v-model="cont"></textarea></p>
			</div>
			<button @click="update">提交</button>
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
	import $ from 'jQuery';
	export default{
		data(){
			return {
				date1:'',
				date2:'',
				hours1:'',
				minute1:'',
				hours2:'',
				minute2:'',
				hour:'',
				//提示信息
				message:'',
				isError:false,
				//分钟数组
				minute:'',
				arr:'',
				//活动名称
				name:'',
				//人数
				num:'',
				//主办方
				sponsor:'',
				//内容
				cont:'',
				//学分
				credit:'',
				//义工
				volunteer:'',
				//地址
				address:'',
				//年级要求
				arrGra:'',
				graVal:0,
				//活动类型
				genre:'',
				arrGen:'',
				//学院要求
				acaVal:0,
				arrAca:'',
				//专业要求
				majorVal:0,
				arrMaj:''
			}
		},
		components:{
			'date-picker': myDatepicker
		},
		methods:{
			//设置小时
			setHour(){
				var hourArr = [];
				for (var i = 9;i < 24;i++) {
					var h;
					if(i<10){
						h = '0'+i;
					}else{
						h = i;
					}
					hourArr.push(h)
				}
				this.hour = hourArr;
			},
			//设置分钟
			setMinute(){
				var minuteArr = [];
				for (var i = 10;i < 60;i+=10) {
					var h;
					if(i<10){
						h = '0'+i;
					}else{
						h = i;
					}
					minuteArr.push(h)
				}
				this.minute = minuteArr;
			},
			//获取活动类别
			getGenre(){
				var _this = this;
				var arrGen = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getGenreOnce",
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arrGen.push(data[i]);
							}
						}
						_this.arrGen = arrGen;
						_this.genre = arrGen[0].gen_id;
					}
				});
			},
			//获取专业
			getMajor(){
				var _this = this;
				var arrMaj = [];
				if(this.acaVal!=0){
					var id = parseInt(this.acaVal)
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
							_this.arrMaj = arrMaj;
						}
					});
				}
			},
			//获取学院
			getAca(){
				var _this = this;
				var arrAca = [];
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
					}
				});
			},
			//获取年级
			getGrade(){
				var _this = this;
				var arrGra = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getGrade",
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arrGra.push(data[i]);
							}
						}
						_this.arrGra = arrGra;
					}
				});
			},
			//获取所有活动信息
			getAct(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getActById",
					data:{
						id:this.$route.params.id
					},
					success(data){
						data = JSON.parse(data);
						console.log(data)
						_this.name = data[0].act_name;
						_this.cont = data[0].act_text;
						_this.address = data[0].act_address;
						_this.credit = data[0].credit;
						_this.num = data[0].act_num;
						_this.volunteer = data[0].volunteer;
						_this.sponsor = data[0].act_sponsor;
						var b_year = data[0].begin_time.split(' ')[0];
						_this.date1 = b_year;
						var s_year = data[0].stop_time.split(' ')[0];
						_this.date2 = s_year;
						var b_time = data[0].begin_time.split(' ')[1];
						var s_time = data[0].stop_time.split(' ')[1];
						var b_hour = b_time.split(':')[0];
						var s_hour = s_time.split(':')[0];
						var b_minute = b_time.split(':')[1];
						var s_minute = s_time.split(':')[1];
						_this.hours1 = b_hour;
						_this.hours2 = s_hour;
						_this.minute1 = b_minute;
						_this.minute2 = s_minute;
						_this.acaVal = data[0].academy;
						_this.getMajor();
						_this.majorVal = data[0].major;
						_this.isReturn()
					}
				});
			},
			//上传
			update(){
				var _this = this;
				var btime = this.date1 + ' ' + this.hours1+':'+this.minute1;
				var stime = this.date2 + ' ' + this.hours2+':'+this.minute2;
				console.log(this.credit)
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeAct",
					data:{
						name:this.name,
						address:this.address,
						begin_time:btime,
						stop_time:stime,
						genre:this.genre,
						num:this.num,
						sponsor:this.sponsor,
						aca:this.acaVal,
						major:this.majorVal,
						grade:this.graVal,
						credit:this.credit,
						volunteer:this.volunteer,
						cont:this.cont,
						id:this.$route.params.id
					},
					success(data){
						data = JSON.parse(data);
						this.isError = true;
						this.message = '修改成功';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							location.href = '#/index/showAct';
						},1000)
						
					}
				});
			},
			isReturn(){
				var _this = this;
				//当前时间
				var times = new Date();
				var year = times.getFullYear();
				var month = times.getMonth()+1;
				var day = times.getDate();
				//活动开始时间
				var byear = this.date1.split('/')[0];
				var bmon = this.date1.split('/')[1];
				var bday = this.date1.split('/')[2];
				byear = parseInt(byear);
				bmon = parseInt(bmon)
				bday = parseInt(bday)
				//当前时间小于活动开始时间时将允许删除
				if(year>byear||(byear==year&&((month>bmon)||(month==bmon&&day>=bday)))){
					this.isError = true;
					this.message = '该活动已结束，不可修改！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
						_this.isDelete = false;
						location.href = '#/index/showAct'
					},2000)
				}
			}
		},
		mounted(){
			var _this = this;
			//设置小时
			this.setHour();
			//设置分钟
			this.setMinute();
			//获取年级
			this.getGrade();
			//获取学院
			this.getAca();
			//获取活动类别
			this.getGenre();
			this.id = this.$route.params.id;
			this.getAct();
//			this.isReturn();
		}
	}
</script>

<style scoped="scoped">
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
	/*标题*/
	h3{
		width: 100%;
		font-weight: normal;
		text-align: center;
		font:18px/44px "微软雅黑";
	}
	/*内容*/
	.cont{
		width: 760px;
		padding: 0 20px;
		overflow: hidden;
	}
	/*每一个内容样式*/
	.cont p{
		width: 360px;height: 30px;
		padding: 0 10px 9px;
		float: left;
		font:12px/30px "微软雅黑";
	}
	/*每一个输入提示信息样式*/
	.cont p span{
		float: left;
		width: 90px;
	}
	/*每一个input框样式设置*/
	.cont p input{
		width: 200px;
		padding: 0 15px;
		height: 30px;
		border:none;
		font:12px/30px "微软雅黑";
		/*border-radius: 4px;*/
	}
	/*文本域内容设置*/
	.cont .allWidth{
		width: 740px;height: auto;
		/*margin: 0 auto;*/
	}
	.cont textarea{
		outline: none;
		border: none;
		padding: 0;
		float: left;
		width: 610px;
	}
	/*提交按钮样式*/
	button{
		display: block;
		border: none;
		padding: 0;
		margin: 0 auto;
		width: 80px;height: 30px;
		font: 14px/30px "微软雅黑";
		color: #FFFFFF;
		background-color: rgba(255,100,0,0.4);
		border-radius: 8px;
		cursor: pointer;
	}
	/**/
	/*时间选择器*/
	.vue-datepicker{
		float: left;
    	top: 0px;
	}
	.leftCont p b{
		float: left;
		/*margin-top: 15px;*/
	}
	.leftCont .timer{
		float: left;
		width: 50px;
		text-align: center;
		margin: 0 5px 0;
	}
	select{
		float: left;
		height: 30px;
		width: 110px;
		margin-right: 10px;
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
