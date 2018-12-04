<template>
	<div class="detAct leftCont">
		<div class="cont">
			<p>活动名称：{{name}} </p>
			<p>活动时间：{{begin_time}} -- {{stop_time}}</p>
			<p>活动条件：无</p>
			<p>举行地点：{{address}}</p>
			<p>类型：科技竞赛</p>
			<p>主办方：{{sponsor}}</p>
			<p>人数：{{num}}</p>
			<p>奖励：{{credit}}学分,{{volunteer}}义工时</p>
			<p>{{cont}}</p>
		</div>
		<div class="doEvent">
			<router-link :to="'/index/changeAct/'+this.id">修改</router-link>
			<span @click="toDelete">删除</span>
		</div>
		<!-- 删除框 -->
		<div class="add" v-show="isDelete">
			<div class="conts">
				<h5>删除活动</h5>
				<h6>删除后所属报名及签到信息将会被删除</h6>
				<p>
					<span @click="yesDel">确定</span>
					<span @click="toDelete">取消</span>
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
				isDelete:false,
				//提示信息
				message:'',
				isError:false,
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
				//
				begin_time:'',
				//
				stop_time:'',
				id:''
			}
		},
		methods:{
			toDelete(){
				this.isDelete = !this.isDelete;
			},
			del(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/actIsDel",
					data:{
						id:this.id
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							$.ajax({
								type:"post",
								url:"http://localhost:3000/delAct",
								data:{
									id:_this.id
								},
								success(data){
									_this.isError = true;
									_this.message = '删除成功';
									setTimeout(function(){
										_this.isError = false;
										_this.message = '';
										_this.isDelete = false;
										location.href = '#/index/showAct'
									},1000)
								}
							});
						}else{
							$.ajax({
								type:"post",
								url:"http://localhost:3000/deleteAct",
								data:{
									id:_this.id
								},
								success(data){
									_this.isError = true;
									_this.message = '删除成功';
									setTimeout(function(){
										_this.isError = false;
										_this.message = '';
										_this.isDelete = false;
										location.href = '#/index/showAct';
									},1000)
								}
							});
						}
					}
				});
			},
			yesDel(){
				var _this = this;
				//当前时间
				var times = new Date();
				var year = times.getFullYear();
				var month = times.getMonth()+1;
				var day = times.getDate();
				//活动开始时间
				var byear = this.begin_time.split(' ')[0].split('/')[0];
				var bmon = this.begin_time.split(' ')[0].split('/')[1];
				var bday = this.begin_time.split(' ')[0].split('/')[2];
				//当前时间小于活动开始时间时将允许删除
				if(year>byear||(byear==year&&((month>bmon)||(month==bmon&&day>=bday)))){
					this.isError = true;
					this.message = '该活动已结束，不可删除！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
						_this.isDelete = false;
					},1000)
				}else{
					this.del();
				}
			},
			isDel(){
			}
		},
		mounted(){
			this.id = this.$route.params.id;
			var _this = this;
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getActById",
				data:{
					id:this.$route.params.id
				},
				success(data){
					data = JSON.parse(data);
					_this.name = data[0].act_name;
					_this.cont = data[0].act_text;
					_this.address = data[0].act_address;
					_this.credit = data[0].credit;
					_this.num = data[0].act_num;
					_this.volunteer = data[0].volunteer;
					_this.sponsor = data[0].act_sponsor;
					_this.begin_time= data[0].begin_time;
					_this.stop_time = data[0].stop_time;
				}
			});
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
	.leftCont .cont{
		width: 100%;height: 400px;
		overflow:auto;overflow-x:hidden;
	}
	.cont p{
		font:14px/26px "微软雅黑";
	}
	.doEvent{
		width: 180px;height: 40px;
		margin: 0 auto;
		font: 16px/30px "微软雅黑";
		text-align: center;
	}
	.doEvent a{
		float: left;
		color: #fff;
		width: 60px;height: 30px;
		margin-top: 10px;
		background-color: rgba(255,100,0,0.3);
		border-radius: 6px;
	}
	.doEvent span{
		float: right;
		margin-top: 10px;
		color: #fff;
		width: 60px;height: 30px;
		background-color: rgba(255,100,0,0.3);
		border-radius: 6px;
		cursor: pointer;
	}
	/*添加框样式设置*/
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
	.conts input{
		display: block;
		margin: 15px auto;
		height: 28px;width: 200px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		text-indent: 10px;
	}
	.conts h6{
		margin: 15px auto;
		height: 30px;
		text-align: center;
		color: red;
		font:14px/30px "微软雅黑";
	}
	.pointer{
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