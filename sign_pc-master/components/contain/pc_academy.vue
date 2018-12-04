<template>
	<div class="leftCont">
		<h3>学院管理<img src="/img/font/add.svg" alt="新增" title="新增" @click="addAca"/></h3>
		<div class="list">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr><th>学院编号</th><th>学院名称</th><th colspan="2">操作</th></tr>
				<tr v-for="v in arr">
					<td>{{v.aca_id}}</td>
					<td>{{v.aca_name}}</td>
					<td @click="changeAca($event)" class="pointer">重命名</td>
					<td @click="deleteAca($event)" class="pointer">删除</td>
				</tr>
			</table>
		</div>
		

		<!-- 添加框 -->
		<div class="add" v-show="isAdd">
			<div class="cont">
				<h5>请输入新增的学院名称</h5>
				<input type="text" v-model="addVal"/>
				<p><span @click="yesAdd">确定</span><span @click="noAdd">取消</span></p>
			</div>
		</div>
		<!-- 修改框 -->
		<div class="add" v-show="isChange">
			<div class="cont">
				<h5>请修改学院名称</h5>
				<input type="text" v-model="chaVal" />
				<p><span @click="yesCha">确定</span><span @click="noCha">取消</span></p>
			</div>
		</div>
		
		<!-- 删除框 -->
		<div class="add" v-show="isDelete">
			<div class="cont">
				<h5>删除学院</h5>
				<h6>删除后所属学院的专业将会删除</h6>
				<p>
					<span @click="yesDel">确定</span>
					<span @click="noDel">取消</span>
				</p>
			</div>
		</div>
		
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
		
		<!-- 分页 -->
		<xpage :total-pages="page" :total="total" :current-page="current"  @pagechanged="onPageChange" v-show="total>9"/>
		
	</div>
</template>

<script>
	import xpage from "../pc_page.vue";
	import $ from 'jQuery';
	export default{
		data(){
			return {
				//添加
				isAdd:false,
				addVal:"",
				//修改
				isChange:false,
				chaVal:"",
				//删除
				isDelete:false,
				del:false,
				//提示信息
				message:'',
				isError:false,
				arr:"",
				//分页
				//当前的页码
				current:1,
				//数据的总条数
				total:0,
				//当前数据的总页数
				page:1,
				id:'',
				state:1
			}
		},
		components:{
			xpage
		},
		methods:{
			//添加学院
			addAca(){
				this.isAdd = true;
			},
			noAdd(){
				this.isAdd = false;
			},
			yesAdd(){
				var _this = this;
				if(this.addVal.length==0){
					this.isError = true;
					this.message = '学院名称不可为空！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else if(!/[\u4e00-\u9fa5]/g.test(this.addVal)){
					this.isError = true;
					this.message = '学院名称只能为中文！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else{
					var val = this.addVal;
					var isAdd = false;
					for (var i in this.arr) {
						if(this.arr[i].aca_name == val){
							this.isError = true;
							this.message = '该学院已存在！';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
							this.addVal = '';
							isAdd = false;
							break;
						}else{
							isAdd = true;
						}
					}
					if(isAdd){
						var _this = this;
						$.ajax({
							type:"post",
							url:"http://localhost:3000/addAca",
							data:{
								name:val
							},
							success(data){
								data = JSON.parse(data);
								_this.isError = true;
								_this.message = '添加成功！';
								setTimeout(function(){
									_this.isError = false;
									_this.message = '';
									_this.addVal = '';
									_this.isAdd = false;
									location.reload();
								},1000)
							}
						});
					}
				}
			},
			//修改学院
			changeAca(e){
				this.isChange = true;
				this.id = $(e.target).prev().prev().html();
				this.chaVal = $(e.target).prev().html();
			},
			yesCha(){
				var _this = this;
				this.state = 1;
				this.updateAca();
				this.isError = true;
				this.message = '修改成功！';
				setTimeout(function(){
					_this.isError = false;
					_this.message = '';
					location.reload();
				},1000)
			},
			noCha(){
				this.isChange = false;
			},
			//删除学院
			deleteAca(e){
				this.id = $(e.target).prev().prev().prev().html();
				this.chaVal = $(e.target).prev().prev().html();
				this.isDelete = true;
			},
			isDel(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/isDeleteAca",
					async:false,
					data:{
						id:_this.id
					},
					success(data){
						data = JSON.parse(data);
						if(data[0].total==0){
							_this.del = true;
							console.log("2if:"+_this.del)
						}else{
							_this.del = false;
							console.log("else"+_this.del)
						}
					}
				});
			},
			yesDel(){
				var _this = this;
				this.isDel();
				if(this.del){
					this.state = 0;
					this.chaVal = 
					this.updateAca();
					this.isError = true;
					this.message = '已成功删除该学院';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
						location.reload();
					},1000)
//					location.reload();
//					this.isDelete = false;
				}else{
					this.isError = true;
					this.message = '该学院仍有专业开设，不可删除！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}
				var _this = this;
				setTimeout(function(){
			       	_this.isError = false;
					_this.isDelete = false;
			    }, 1000);
				
			},
			noDel(){
				this.isDelete = false;
			},
			// 分页
			onPageChange(page) {
		      	this.current = page;
		      	var _this = this;
				var arr = [];
		     	 $.ajax({
					type:"post",
					url:"http://localhost:3000/getAca",
					data:{
						start:(page-1)*9
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arr.push(data[i])
							}
						}
						_this.arr = arr;
					}
				});
		   	},
		   	//修改信息
		   	updateAca(){
		   		console.log(this.id,this.chaVal)
		   		var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeAca",
					data:{
						id:_this.id,
						name:_this.chaVal,
						state:_this.state
					},
					success(data){
						data = JSON.parse(data);
					}
				});
		   	},
		   	//获取所有学院信息
		  	getAllAca(){
		  		var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getAcaTotal",
					async:true,
					success(data){
						data = JSON.parse(data);
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total/9)
					}
				});
		   		$.ajax({
					type:"post",
					url:"http://localhost:3000/getAca",
					data:{
						start:0
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arr.push(data[i])
							}
						}
						this.current = 1;
						_this.arr = arr;
					}
				});
		  	}
		},
		mounted(){
			this.getAllAca();
		}
	}
</script>

<style scoped="scoped">
	/*显示所有列表样式*/
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
	table {
		width: 100%;
		text-align: center;
		font-size: 14px;
		margin-top: 20px;
	}
	
	table tr {
		height: 28px;
	}
	/*标题样式*/
	h3{
		width: 100%;height: 30px;
		font: 16px/30px "微软雅黑";
		text-align: center;
	}
	h3 img{
		float: right;
		margin-right: 15px;
		margin-top: 5px;
		width: 20px;height: 20px;
		cursor: pointer;
	}
	/*添加框样式设置*/
	.add{
		width: 100%;height: 100%;
		position: absolute;
		top: 0;left: 0;
		background-color: rgba(0,0,0,0.5);
	}
	.cont{
		width: 280px;
		height: 150px;
		background-color: gainsboro;
		border-radius: 6px;
		position: absolute;
		top: 0;left: 0;right: 0;bottom: 0;
		margin: auto;
	}
	.cont h5{
		margin: 0;padding: 0;
		height: 50px;
		text-align: center;
		font:16px/50px "微软雅黑";
		color: #000;
	}
	.cont p{
		height: 39px;width: 100%;
		overflow: hidden;
		border-top: 1px solid #666666;
	}
	.cont p span{
		float: left;
		width: 139px;height: 39px;
		text-align: center;
		color: #666666;
		font:14px/39px "微软雅黑";
		cursor: pointer;
	}
	.cont p span:first-of-type{
		border-right: 1px solid #666666;
	}
	.cont input{
		display: block;
		margin: 15px auto;
		height: 28px;width: 200px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		text-indent: 10px;
	}
	.cont h6{
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