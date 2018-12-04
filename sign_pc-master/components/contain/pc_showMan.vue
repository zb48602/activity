<template>
	<div class="leftCont">
		<h3>管理人员管理<img src="/img/font/add.svg" alt="新增" title="新增" @click="addAca"/></h3>
		<div class="list">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr>
					<th>发布者编号</th>
					<th>发布者姓名</th>
					<th>操作</th>
				</tr>
				<tr v-for="v in arr">
					<td>{{v.id}}</td>
					<td>{{v.name}}</td>
					<td @click="deleteAca($event)" class="toClick">删除</td>
				</tr>
			</table>
		</div>
		<div class="add" v-show="isShow">
			<div class="cont">
				<h5>请输入新增的姓名</h5>
				<input type="text" name="acamedy" id="acamedy" v-model="name"/>
				<select name="sex" v-model="sex">
					<option value="0">男</option>
					<option value="1">女</option>
				</select>
				<p><span @click="yesAdd">确定</span><span @click="addAca">取消</span></p>
			</div>
		</div>
		<div class="add" v-show="isDelete">
			<div class="cont">
				<h5>删除发布者</h5>
				<h6>该发布者将无法再登录系统</h6>
				<p><span @click="yesDel">确定</span><span @click="deleteAca">取消</span></p>
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
	import $ from 'jQuery';
	import xpage from "../pc_page.vue";
	export default {
		data() {
			return {
				//提示信息
				message:'',
				isError:false,
				isShow: false,
				isDelete: false,
				arr:'',
				//当前的页码
				current:1,
				//数据的总条数
				total:0,
				//当前数据的总页数
				page:1,
				name:'',
				sex:0,
				id:''
			}
		},
		components:{
			xpage
		},
		methods: {
			// 分页
			onPageChange(page) {
		      	this.current = page;
		      	var _this = this;
				var arr = [];
		     	$.ajax({
					type:"post",
					url:"http://localhost:3000/getManPage",
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
			addAca() {
				this.isShow = !this.isShow
			},
			deleteAca(e) {
				this.isDelete = !this.isDelete;
				this.id = $(e.target).prev().prev().html();
			},
			yesDel(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/delMan",
					data:{
						id:this.id
					},
					success(data){
						_this.isError = true;
						_this.message = '删除成功！';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							location.reload();
						},1000);
					}
				});
			},
			yesAdd(){
				var name = this.name;
				var _this = this;
				var isAdd = false;
				if(name.length==0){
					this.isError = true;
					this.message = '管理员姓名不可为空！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else{
					for(var i in this.arr){
						if(name==this.arr[i].name){
							this.isError = true;
							this.message = '该管理员已存在！';
							isAdd = false;
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
								_this.name = '';
							},1000);
							break;
						}else{
							isAdd = true;
						}
					}
					if(isAdd){
						$.ajax({
							type:"post",
							url:"http://localhost:3000/addMan",
							data:{
								name:this.name,
								sex:this.sex
							},
							success(data){
								_this.isError = true;
								_this.message = '添加成功！';
								isAdd = false;
								setTimeout(function(){
									_this.isError = false;
									_this.message = '';
									location.reload();
								},1000);
							}
						});
					}
				}
				
			}
		},
		mounted(){
			var _this = this;
			var arr = [];
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getManTotal",
				async:true,
				success(data){
					data = JSON.parse(data);
					_this.total = data[0].total;
					_this.page = Math.ceil(_this.total/9)
				}
			});
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getMan",
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for (var i in data) {
							var id = data[i].man_id;
							var name = data[i].man_name;
							var type = data[i].man_type;
							var datas = {};
							if(type==1){
								datas.id = id;
								datas.name = name;
								datas.type = type;
								arr.push(datas)
							}
						}
						_this.arr = arr;
					}
//					console.log(data)
				}
			});
		}
	}
</script>

<style scoped="scoped">
	/*显示所有列表样式*/
	
	.leftCont {
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
	
	h3 {
		width: 100%;
		height: 30px;
		font: 16px/30px "微软雅黑";
		text-align: center;
	}
	
	h3 img {
		float: right;
		margin-right: 15px;
		margin-top: 5px;
		width: 20px;
		height: 20px;
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
		/*display: block;*/
		float: left;
		margin: 15px 9px;
		height: 28px;width: 200px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		text-indent: 10px;
	}
	.cont select{
		margin: 15px 0;
	    height: 30px;
	    border-radius: 5px;
	    padding: 5px;
	}
	.cont h6{
		margin: 15px auto;
		height: 30px;
		text-align: center;
		color: red;
		font:14px/30px "微软雅黑";
	}
	
	.toClick {
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