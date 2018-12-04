<template>
	<div class="leftCont">
		<h3>新增报名信息</h3>
		<p>
			<span>活动名称：</span>
			<select id="actName" v-model="actName" v-show="isSelect" class="iswidth" @change="getBTime">
				<option v-for="a in arr" :value="a.act_id" :data-time = "a.begin_time">{{a.act_name}}</option>
			</select>
			<!--<input type="text" />-->
			<b v-show="!isSelect">{{actName}}</b>
		</p>
		<p>
			<span>报名开始时间：</span>
			<date-picker field="myDate" placeholder="开始时间" v-model="begin" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
			<!-- 设置开始的小时 -->
			<select name="begin_hour" v-model="b_hour">
				<option value="00">00</option>
				<option v-for="h in hour" :value="h.val">{{h.name}}</option>
			</select>
			<b>:</b>
			<!-- 设置分钟 -->
			<select name="begin_minute" v-model="b_minute">
				<option value="00">00</option>
				<option v-for="m in minute" :value="m.val">{{m.name}}</option>
			</select>
		</p>
		<p>
			<span>报名截止时间：</span>
			<date-picker field="myDateStop" placeholder="截止时间" v-model="stops" format="yyyy/mm/dd" :backward="false" :no-today="true" :forward="true"></date-picker>
			<select name="stop_hour" v-model="s_hour">
				<option value="00">00</option>
				<option v-for="h in hour" :value="h.val">{{h.name}}</option>
			</select>
			<b>:</b>
			<!-- 设置分钟 -->
			<select name="s_minute" v-model="s_minute">
				<option value="00">00</option>
				<option v-for="m in minute" :value="m.val">{{m.name}}</option>
			</select>
		</p>
		<p>
			<span>是否需要进行签到：</span>
			<input type="radio" name="sign" id="yes" value="0" checked="checked" />是&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="radio" name="sign" id="yes" value="1" />否
		</p>
		<button @click="toAdd">提交</button>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import 'babel-polyfill'; //因为使用了es6的一些方法，需要babel垫片，如果你项目中已有相关兼容性方案，可忽略
	import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'; //引入对应的组件
	import $ from 'jQuery';
	export default{
		data(){
			return {
				//提示信息
				message:'',
				isError:false,
				//开始时间
					//年月日
				begin:'',
					//小时
				b_hour:'00',
					//分钟
				b_minute:'00',
				//截止时间
					//年月日
				stops:'',
					//小时
				s_hour:'00',
					//分钟
				s_minute:'00',
				//小时数组
				hour:'',
				//分钟数组
				minute:'',
				//是否显示下拉菜单
				isSelect:false,
				//当直接打开新增页面时显示
				arr:'',
				actName:'',
				id:'',
				begin_time:''
			}
		},
		components:{
			'date-picker': myDatepicker
		},
		methods:{
			getBTime(){
				var opt = $("#actName").val();
				this.begin_time = $("#actName").find("option:selected").attr("data-time");
			},
			toAdd(){
				//报名开始时间
				var byear = this.begin.split('/')[0];
				var bmont = parseInt(this.begin.split('/')[1]);
				var bday = parseInt(this.begin.split('/')[2]);
				var syear = this.stops.split('/')[0];
				var smont = parseInt(this.stops.split('/')[1]);
				var sday = parseInt(this.stops.split('/')[2]);
				//活动开始时间
				console.log(this.begin_time)
				var year =  this.begin_time.split('/')[0];
				var month = parseInt(this.begin_time.split('/')[1]);
				var day = parseInt(this.begin_time.split('/')[2]);
				var _this = this;
				//验证时间是否合法:不为空
				if(this.begin.length!=0&&this.stops.length!=0){
					//验证截止日期是否大于开始日期
					if(byear>syear||(byear==syear&&((bmont>smont)||(bmont==smont&&bday>=sday)))){
						this.isError = true;
						this.message = '报名截止时间应大于开始时间';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
						},1000)
					}else{
						//判断活动开始时间是否大于截止时间
						if(syear>year||(syear==year&&((smont>month)||(smont==month&&sday>=day)))){
							this.isError = true;
							this.message = '报名截止时间应小于活动开始时间';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
						}else{
							var btime = this.begin+' '+this.b_hour+':'+this.b_minute;
							var stime = this.stops+' '+this.s_hour+':'+this.s_minute;
							var sign = $('input:radio:checked').val();
							var id = this.id;
							$.ajax({
								type:"post",
								url:"http://localhost:3000/addMess",
								data:{
									id:id,
									btime:btime,
									stime:stime,
									sign:sign
								},
								success(data){
									_this.isError = true;
									_this.message = '新增成功';
									setTimeout(function(){
										_this.isError = false;
										_this.message = '';
										location.href = '#/index/showEnroll';
									},1000)
								}
							});
						}
					}
				}else{
					this.isError = true;
					this.message = '仍有内容未填写！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}
			},
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
			}
		},
		mounted(){
			//页面加载时显示时分的数据
			this.setHour();
			this.setMinute();
			var id = this.$route.params.id;
			var _this = this;
			if(id){
				this.id = id;
				this.isSelect = false;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getActName",
					async:true,
					data:{
						id:id
					},
					success(data){
						data = JSON.parse(data);
						_this.begin_time = data[0].begin_time;
						_this.actName = data[0].act_name
						
					}
				});
			}else{
				var arr = [];
				this.isSelect = true;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getActNoMess",
					async:true,
					data:{
						id:id
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arr.push(data[i]);
							}
							_this.arr = arr;
						}
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
	/*每行样式*/
	.leftCont p{
		height: 60px;
		width: 600px;
		margin: 0 auto;
		font:14px/30px  "微软雅黑";
	}
	/*每行标题*/
	.leftCont p span{
		float: left;
		width: 150px;
		font:16px/60px "微软雅黑";
	}
	/*单选按钮*/
	.leftCont p input[type="radio"]{
		margin-top: 23px;
	}
	/*提交按钮*/
	.leftCont button{
		display: block;
		width: 120px;height: 40px;
		margin: 20px auto;
		border-radius: 4px;
		background: rgba(255,100,0,0.5);
    	color: #fff;
    	font:16px/40px  "微软雅黑";
    	cursor: pointer;
	}
	/*冒号和活动名称样式*/
	.leftCont p b{
		float: left;
		font-size: 14px;
		margin-top: 15px;
	}
	/*小时与分钟的样式*/
	.leftCont select{
		float: left;
		/*display: block;*/
		width: 70px;height: 30px;
		line-height: 30px;
		padding:0 15px;
		text-align: center;
		margin: 15px 5px 0;
	}
	.leftCont .iswidth{
		width: 360px;
		padding:0 20px;
		margin: 15px 0 0;
	}
	/*时间选择器*/
	.vue-datepicker{
		float: left;
    	top: 15px;
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
	/*select{
		height: 30px;
		appearance:none;
-moz-appearance:none;
-webkit-appearance:none;
	}	*/
</style>