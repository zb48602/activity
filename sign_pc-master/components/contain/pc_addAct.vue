<template>
	<div class="leftCont">
		<h3>发布活动</h3>
			<div class="cont">
				<p><span>活动名称：</span><input type="text" v-model="name" @blur="textName"/></p>
				<p><span>活动类别：</span>
					<select name="genType" v-model="genre">
						<option v-for="a in arrGen" :value="a.gen_id">{{a.gen_name}}</option>
					</select>
				</p>
				<p>
					<span>活动开始时间：</span>
					<date-picker field="myDate" placeholder="开始时间" v-model="begin_time" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
					<!-- 设置开始的小时 -->
					<select name="begin_hour" v-model="b_hour" class="timer">
						<option value="00">00</option>
						<option v-for="h in hour" :value="h.val">{{h.name}}</option>
					</select>
					<b>:</b>
					<!-- 设置分钟 -->
					<select name="begin_minute" v-model="b_minute" class="timer">
						<option value="00">00</option>
						<option v-for="m in minute" :value="m.val">{{m.name}}</option>
					</select>
				</p>
				<p><span>活动结束时间：</span>
					<date-picker field="myDate" placeholder="截止时间" v-model="stop_time" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
					<select name="stop_hour" v-model="s_hour" class="timer">
						<option value="00">00</option>
						<option v-for="h in hour" :value="h.val">{{h.name}}</option>
					</select>
					<b>:</b>
					<!-- 设置分钟 -->
					<select name="s_minute" v-model="s_minute" class="timer">
						<option value="00">00</option>
						<option v-for="m in minute" :value="m.val">{{m.name}}</option>
					</select>
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
				<p><span>年级限制：</span>
					<select name="gradeType" v-model="graVal">
						<option value="0">全部</option>
						<option v-for="a in arrGra" :value="a.gra_id" >
							{{a.gra_name}}
						</option>
					</select>
				</p>
				<p><span>主办单位：</span><input type="text" v-model="sponsor" @blur="textName"/></p>
				<p><span>所需人数：</span><input type="text" v-model="num" @blur="textNum"/></p>
				<p><span>义工奖励：</span>
					<input type="text" v-model="volunteer" @blur="textFloat"/>
				</p>
				<p><span>学分奖励：</span>
					<input type="text" v-model="credit" @blur="textFloat"/>
				</p>
				<p><span>举行地点：</span><input type="text" v-model="address" @blur="textNotNull"/></p>
				<p class="allWidth"><span>活动内容：</span><textarea name="cont" rows="8" cols="87" v-model="content" @blur="textNotNull"></textarea></p>
			</div>
			<button @click="upload">提交</button>
			
			<!-- 提示信息 -->
			<div class="message" v-show="isError">
				<p v-text="message"></p>
			</div>
		
		</div>
		
</template>

<script>
	import 'babel-polyfill'; //因为使用了es6的一些方法，需要babel垫片，如果你项目中已有相关兼容性方案，可忽略
	import $ from 'jQuery';
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入对应的组件
	export default{
		data(){
			return {
				//活动名称
				name:'',
				//活动开始时间
				begin_time:'',
				hours1:9,
				minute1:0,
					//小时
				b_hour:'00',
					//分钟
				b_minute:'00',
				//活动结束时间
				stop_time:'',
				hours2:9,
				minute2:0,
					//小时
				s_hour:'00',
					//分钟
				s_minute:'00',
				//小时数组
				hour:'',
				//分钟数组
				minute:'',
				//活动举行地点
				address:'',
				//活动类型
				genre:'',
				arrGen:'',
				//学院要求
				acaVal:0,
				arrAca:'',
				//专业要求
				majorVal:0,
				arrMaj:'',
				//年级要求
				arrGra:'',
				graVal:0,
				//主办单位
				sponsor:'',
				//人数要求
				num:'',
				//学分奖励
				credit:0.0,
				//义工奖励
				volunteer:0.0,
				//具体内容
				content:'',
				//提示信息
				message:'',
				isError:false,
				//是否可以提交
				isUpdate:false
			}
		},
		components:{
			'date-picker': myDatepicker
		},
		mounted(){
			//页面加载时显示时分的数据
			this.setHour();
			this.setMinute();
			var _this = this;
			var arrGen = [];
			var arrAca = [];
			var arrGra = [];
			//获取活动类别
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
			//获取所有学院和专业信息
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
			//获取所有年级
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
		methods:{
			//设置小时
			setHour(){
				var hourArr = [];
				for (var i = 9;i < 24;i++) {
					var obj = {}
					if (i<10) {
						obj.name = '0'+i;
					}else{
						obj.name = i;
					}
					obj.val = i;
					hourArr.push(obj)
				}
				this.hour = hourArr;
			},
			//设置分钟
			setMinute(){
				var minuteArr = [];
				for (var i = 10;i < 60;i+=10) {
					var obj = {}
					obj.name = i;
					obj.val = i;
					minuteArr.push(obj)
				}
				this.minute = minuteArr;
			},
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
			//验证活动名称或主办单位输入是否正确
			textName(){
				var _this = this;
				if(this.name.length==0||this.sponsor.length==0){
					this.isError = true;
					this.message = "活动名称或主办单位不可为空！";
					this.isUpdate = false;
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else if(/^[0-9]*$/.test(this.name)||/^[0-9]*$/.test(this.sponsor)){
					this.isError = true;
					this.message = '活动名称或主办单位不可为纯数字';
					this.isUpdate = false;
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					this.isUpdate = true;
				}
			},
			//验证人数
			textNum(){
				var _this = this;
				if(this.num.length==0){
					this.isError = true;
					this.message = "活动所需人数不可为空！";
					this.isUpdate = false;
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else if(!/^[0-9]{2,5}$/.test(this.num)){
					this.isError = true;
					this.isUpdate = false;
					this.message = '人数必须为大于10小于9999的纯数字';
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					this.isUpdate = true;
					this.num = parseInt(this.num)
				}
			},
			//验证学分和义工
			textFloat(){
				var _this = this;
				if(this.credit.length==0||this.volunteer.length==0){
					this.isError = true;
					this.isUpdate = false;
					this.message = "学分或义工奖励不可为空！";
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else if(!/^([1-9]{1})|(0.[0-9]{1})|0$/.test(this.volunteer)){
					this.isUpdate = false;
					this.isError = true;
					this.message = '学分或义工必须为小数';
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					this.isUpdate = false;
				}
			},
			//验证内容或地址不为空
			textNotNull(){
				var _this = this;
				if(this.content.length==0||this.address.length==0){
					this.isError = true;
					this.isUpdate = false;
					this.message = "活动内容或举行地址不可为空！";
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					this.isUpdate = true;
				}
			},
			//点击提交按钮触发
			upload(){
				//时间相关验证
				var _this = this;
				var year1 = this.begin_time.split('/')[0];
				var year2 = this.stop_time.split('/')[0];
				var month1 = this.begin_time.split('/')[1];
				var month2 = this.stop_time.split('/')[1];
				var day1 = this.begin_time.split('/')[2];
				var day2 = this.stop_time.split('/')[2];
//				//判断内容不可为空
				if(this.begin_time.length==0||this.stop_time.length==0){
					this.isError = true;
					this.message = "时间不可为空";
					this.isUpdate = false;
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					//判断截止日期年月日是否大于开始日期
					//验证年月日
					
					if(year2<year1||(year2>=year1 && month2<month1)||day2<day1){
						this.isError = true;
						this.isUpdate = false;
						this.message = "活动时间不合法";
						setTimeout(function(){
							_this.isError = false;
						},1000)
					}else if(year1==year2&&month1==month2&&day2==day1){
						if(this.s_hour>this.b_hour){
							this.isUpdate = true;
						}else if(this.s_hour==this.b_hour){
							if(this.b_minute<this.s_minute){
								this.isUpdate = true;
							}else{
								this.isError = true;
								this.isUpdate = false;
								this.message = "活动时间不合法";
								setTimeout(function(){
									_this.isError = false;
								},1000)
							}
						}else{
							this.isError = true;
							this.isUpdate = false;
							this.message = "活动时间不合法";
							setTimeout(function(){
								_this.isError = false;
							},1000)
						}
					}else{
						this.isUpdate = true;
					}
				}
				if(this.content.length==0||this.address.length==0||this.credit.length==0||this.volunteer.length==0||this.num.length==0||this.name.length==0||this.sponsor.length==0){
					this.isError = true;
					this.isUpdate = false;
					this.message = "请完善信息";
					setTimeout(function(){
						_this.isError = false;
					},1000)
				}else{
					this.insert();
				}
				
			},
			insert(){
				var _this = this;
				var academy;
				var major;
				var bengin = this.begin_time + ' ' +this.b_hour + ':' +this.b_minute;
				var stops = this.stop_time + ' ' +this.s_hour + ':' +this.s_minute;
				if(this.acaVal=='0000'){
					academy = 0;
				}else{
					academy = parseInt(this.acaVal);
				}
				if(this.majorVal=='0000'){
					major = 0
				}else{
					major = parseInt(this.majorVal);
				}
				$.ajax({
					type:"post",
					url:"http://localhost:3000/addAct",
					data:{
						name:_this.name,
						address:_this.address,
						begin_time:bengin,
						stop_time:stops,
						genre:_this.genre,
						num:_this.num,
						sponsor:_this.sponsor,
						aca:academy,
						major:major,
						grade:_this.graVal,
						credit:_this.credit,
						volunteer:_this.volunteer,
						cont:_this.content
					},
					success(data){
						data = JSON.parse(data)
						var id = data.insertId;
						_this.$router.push({name:'addById',params:{
							id:id
						}})
					}
				});
			}
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
		position: relative;
		background-color: rgba(255, 100, 0, 0.3);
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
		/*display: block;*/
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
