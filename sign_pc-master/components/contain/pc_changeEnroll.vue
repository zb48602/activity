<template>
	<div class="addEnroll leftCont">
		<h3>修改报名信息</h3>
		<p>
			<span>活动名称：</span>
			<em>{{name}}</em>
		</p>
		<p>
			<span>报名开始时间：</span>
			<date-picker field="myDate" placeholder="开始时间" v-model="date1" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
			<select name="hour1" v-model="hours1" class="timer">
				<option value="00">00</option>
				<option v-for="h in hourArr" :value="h">{{h}}</option>
			</select>
			<b>:</b>
			<select name="minute1" v-model="minute1" class="timer">
				<option value="00">00</option>
				<option v-for="m in minuteArr" :value="m">{{m}}</option>
			</select>
		</p>
		<p>
			<span>报名截止时间：</span>
			<date-picker field="myDate" placeholder="截止时间" v-model="date2" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
			<select name="hour2" v-model="hours2" class="timer">
				<option value="00">00</option>
			    <option v-for="h in hourArr" :value="h">{{h}}</option>
			</select>
			<b>:</b>
			<select name="minute2" v-model="minute2" class="timer">
				<option value="00">00</option>
				<option v-for="m in minuteArr" :value="m">{{m}}</option>
			</select>
		</p>
		<p>
			<span>是否需要进行签到：</span>
			<input type="radio" name="sign" id="yes" value="0" checked="checked" />是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="sign" id="yes" value="1" />否
		</p>
		<button @click="update">提交</button>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import 'babel-polyfill';
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; 
	import $ from 'jQuery'
	export default{
		data(){
			return {
				//提示信息
				message:'',
				isError:false,
				//年月日
				date1:'',
				date2:'',
				//时
				hours1:9,
				minute1:0,
				//分
				hours2:9,
				minute2:0,
				name:'',
				//时分数组
				hourArr:'',
				minuteArr:''
//				hour:''
			}
		},
		components:{
			'date-picker': myDatepicker
		},
		mounted(){
			//设置小时
			this.setHour();
			//设置分钟
			this.setMinute();
			var _this = this;
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getMessById",
				data:{
					id:this.$route.params.id
				},
				success(data){
					data = JSON.parse(data);
					_this.name = data[0].act_name;
					_this.date1 = data[0].mes_begin.split(' ')[0];
					_this.date2 = data[0].mes_stop.split(' ')[0];
					_this.hours1 = data[0].mes_begin.split(' ')[1].split(':')[0];
					_this.hours2 = data[0].mes_stop.split(' ')[1].split(':')[0];
					_this.minute1 = data[0].mes_begin.split(' ')[1].split(':')[1];
					_this.minute2 = data[0].mes_stop.split(' ')[1].split(':')[1];
					var day = Date.parse(_this.date2);
					var day1 = Date.parse(new Date());
					if(day1>day){
						_this.isError = true;
						_this.message = '活动报名已截止，信息不可修改';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							location.href = '#/index/showEnroll'
						},2000)
					}
				}
			});
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
				this.hourArr = hourArr;
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
				this.minuteArr = minuteArr

			},
			update(){
				var _this = this;
				var byear = this.date1.split('/')[0];
				var bmont = this.date1.split('/')[1];
				var bday = this.date1.split('/')[2];
				var syear = this.date2.split('/')[0];
				var smont = this.date2.split('/')[1];
				var sday = this.date2.split('/')[2];
				if(byear>syear||(byear==syear&&((bmont>smont)||(bmont==smont&&bday>=sday)))){
					
					this.isError = true;
					this.message = '报名截止时间应大于开始时间';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}
				var btime = this.date1 + ' '+ this.hours1 + ':'+this.minute1;
				var stime = this.date2 + ' '+ this.hours2 + ':'+this.minute2;
				var sign = $('input:radio:checked').val();
				$.ajax({
					type:"post",
					url:"http://localhost:3000/updateMess",
					data:{
						id:this.$route.params.id,
						btime:btime,
						stime:stime,
						sign:sign
					},
					success(data){
						_this.isError = true;
						_this.message = '修改成功';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							location.href = '#/index/showEnroll'
						},1000)
//						
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
	/*添加活动表样式*/
	.addEnroll p{
		height: 60px;
		width: 600px;
		margin: 0 auto;
		font:14px/30px  "微软雅黑";
	}
	.addEnroll p span{
		float: left;
		width: 150px;
		font:16px/60px "微软雅黑";
	}
	.addEnroll p em{
		float: left;
		font:14px/60px "微软雅黑";
	}
	.addEnroll p select{
		float: left;
		height: 30px;
		margin-top: 15px;
	}
	.addEnroll p input[type="text"]{
		float: left;
		background-color: rgba(0,0,0,0);
		height: 30px;width: 400px;
		margin-top: 10px;
		border-bottom: 1px solid #fff;
		font:14px/30px  "微软雅黑";
	}
	.addEnroll p i{
		float: right;
	}
		/*单选按钮*/
	.addEnroll p input[type="radio"]{
		margin-top: 23px;
	}
	.addEnroll button{
		display: block;
		width: 120px;height: 40px;
		margin: 20px auto;
		border-radius: 4px;
		background: rgba(255,100,0,0.5);
    	color: #fff;
    	font:16px/40px  "微软雅黑";
    	cursor: pointer;
	}
	table {
		width: 100%;
		text-align: center;
		font-size: 14px;
		margin-top: 20px;
	}
	
	table tr {
		height: 28px;
	}
	/*时间选择器*/
	.vue-datepicker{
		float: left;
    	top: 15px;
	}
	/**/
	.addEnroll p b{
		float: left;
		margin-top: 15px;
	}
	.addEnroll .timer{
		/*display: block;*/
		width: 50px;
		text-align: center;
		margin: 15px 5px 0;
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