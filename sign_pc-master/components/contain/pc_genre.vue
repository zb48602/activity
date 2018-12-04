<template>
	<div class="leftCont">
		<h3>活动类别管理<img src="/img/font/add.svg" alt="新增" title="新增" @click="addGenre"/></h3>
		<div class="list">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr><th>活动类型编号</th><th>活动类型名称</th><th colspan="2">操作</th></tr>
				<tr v-for="v in arr">
					<td>{{v.gen_id}}</td>
					<td>{{v.gen_name}}</td>
					<td @click="changeGenre($event)" class="toClick">重命名</td>
					<td @click="deleteGenre($event)" class="toClick">删除</td>
				</tr>
			</table>
		</div>
		
		<xpage :total-pages="page" :total="total" :current-page="current"  @pagechanged="onPageChange" v-show="total>9"/>
		
		<div class="add" v-show="isShow">
			<div class="cont">
				<h5>请输入新增的活动类别名称</h5>
				<input type="text" name="acamedy" id="acamedy" v-model="addName" />
				<p><span @click="yesAdd">确定</span><span @click="addGenre">取消</span></p>
			</div>
		</div>
		<div class="add" v-show="isChange">
			<div class="cont">
				<h5>请修改活动类别名称</h5>
				<input type="text" name="acamedy" id="acamedy" v-model="changeVal"/>
				<p><span @click="yesChange">确定</span><span @click="noChange">取消</span></p>
			</div>
		</div>
		<div class="add" v-show="isDelete">
			<div class="cont">
				<h5>删除该类别</h5>
				<h6>删除后将不再出现该类别信息</h6>
				<p><span @click="yesDelete">确定</span><span @click="noDelete">取消</span></p>
			</div>
		</div>
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import xpage from "../pc_page.vue";
	import $ from 'jQuery';
	export default{
		data(){
			return {
				isShow:false,
				isChange:false,
				isDelete:false,
				isError:false,
				addName:'',
				message:'',
				arr:"",
				//当前的页码
				current:1,
				//数据的总条数
				total:0,
				//当前数据的总页数
				page:1,
				changeVal:'',
				changeId:'',
				deleteVal:'',
				deleteId:''
			}
		},
		components:{
			xpage
		},
		methods:{
			//添加类别
			addGenre(){
				this.isShow = !this.isShow;
				this.addName = '';
				this.isError = false;
			},
			yesAdd(){
				var isAdd = false;
				var _this = this;
		    	if(this.addName.length==0){
		    		this.isError = true;
					this.message = '活动名称不可为空！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
		    	}else{
		    		for(var i in this.arr){
		    			if(this.addName == this.arr[i].gen_name){
		    				this.isError = true;
							this.message = '该活动类别已存在！';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
		    				this.addName = '';
		    				isAdd = false;
		    				break;
		    			}else if(/^[0-9]*$/.test(this.addName)){
		    				this.isError = true;
							this.message = '活动名称不可为数字！';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
		    				isAdd = false;
		    			}else{
		    				isAdd = true;
		    			}
		    		}
		    		if(isAdd==true){
	    				$.ajax({
							type:"post",
							url:"http://localhost:3000/addGenre",
							data:{
								name:this.addName
							},
							success(data){
								_this.isError = true;
								_this.message = '添加成功！';
								setTimeout(function(){
									_this.isError = false;
									_this.message = '';
									_this.isShow = false;
									_this.isAdd = false;
								},1000)
							}
						});
						this.getGenre();
		    		}
		    	}
			},
			//修改类别
			changeGenre(e){
				this.isChange = !this.isChange;
				this.isError = false;
				this.changeVal = $(e.target).prev().html();
				this.changeId = $(e.target).prev().prev().html();
			},
			yesChange(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeGenre",
					data:{
						id:_this.changeId,
						name:_this.changeVal,
						state:1
					},
					success(data){
						_this.isError = true;
						_this.message = '修改成功！';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							_this.getGenre();
						},1000)
					}
				});
				this.isChange = !this.isChange;
				this.isError = false;
			},
			noChange(){
				this.isChange = !this.isChange;
				this.isError = false;
			},
			//删除类别
			deleteGenre(e){
				var _this = this;
				this.deleteVal = $(e.target).prev().prev().html();
				this.deleteId = $(e.target).prev().prev().prev().html();
				this.isDelete = !this.isDelete;
				this.isError = false;
			},
			yesDelete(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeGenre",
					data:{
						id:this.deleteId,
						name:this.deleteVal,
						state:0
					},
					success(data){
						_this.isError = true;
						_this.message = '删除成功！';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							_this.getGenre();
						},1000)
					}
				});
				this.isDelete = !this.isDelete;
				this.isError = false;
			},
			noDelete(){
				this.isDelete = !this.isDelete;
				this.isError = false;
			},
			//显示所有
			getGenre(){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getGenre",
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
						_this.arr = arr;
					}
				});
			},
			//分页
			onPageChange(page) {
		      	this.current = page;
		      	var _this = this;
				var arr = [];
		     	$.ajax({
					type:"post",
					url:"http://localhost:3000/getGenre",
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
		    }
		},
		mounted(){
			var _this = this;
			var arr = [];
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getGenreTotal",
				async:true,
				success(data){
					data = JSON.parse(data);
					_this.total = data[0].total;
					_this.page = Math.ceil(_this.total/9)
				}
			});
			this.getGenre();
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
	.toClick{
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