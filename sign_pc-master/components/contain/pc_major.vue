<template>
	<div class="leftCont">
		<h3>专业管理<img src="/img/font/add.svg" alt="新增" title="新增" @click="addMajor"/></h3>
		<!-- 内容显示 -->
		<div class="list">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr>
					<th>专业编号</th>
					<th>专业名称</th>
					<th>所属学院</th>
					<th colspan="2">操作</th>
				</tr>
				<tr v-for="v in arr">
					<td>{{v.major_id}}</td>
					<td>{{v.major_name}}</td>
					<td :data-id = "v.aca_id">{{v.aca_name}}</td>
					<td @click="chaMajor($event)" class="toClick">修改</td>
					<td @click="delMajor($event)" class="toClick">删除</td>
				</tr>
			</table>
		</div>
		
		<!-- 新增专业 -->
		<div class="change" v-show="isAdd">
			<div class="cont">
				<h5>请输入新增的专业名称</h5>
				<input type="text" v-model="addVal"/>
				<select name="acamedy" v-model="addAca">
					<option  v-for="a in allAca" :value="a.aca_id">{{a.aca_name}}</option>
				</select>
				<p>
					<span @click="yesAdd">确定</span>
					<span @click="addMajor">取消</span>
				</p>
			</div>
		</div>
		
		<!-- 修改专业 -->
		<div class="change" v-show="isCha">
			<div class="cont">
				<h5>修改专业名称或所属学院</h5>
				<input type="text" v-model="chaVal" />
				<select name="acamedy" v-model="chaAca">
					<option  v-for="a in allAca" :value="a.aca_id">{{a.aca_name}}</option>
				</select>
				<p>
					<span @click="yesCha">确定</span>
					<span @click="chaMajor">取消</span>
				</p>
			</div>
		</div>
		
		<!-- 删除专业 -->
		<div class="add" v-show="isDel">
			<div class="cont">
				<h5>删除专业</h5>
				<h6>删除该专业后系统其它地方将不显示该专业信息，是否删除该专业?</h6>
				<p>
					<span @click="yesDel">确定</span>
					<span @click="delMajor">取消</span>
				</p>
			</div>
		</div>
		
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
		<!-- 分页 -->
		<Xpage :total-pages="page" :total="total" :current-page="current"  v-show="total>9" @pagechanged="onPageChange"></Xpage>
	</div>
</template>

<script>
	import $ from 'jQuery';
	import xpage from "../pc_page.vue";
	export default {
		data() {
			return {
				//id
				majorId:'',
				acaId:'',
				//所有学院信息
				allAca:'',
				//提示信息
				message:'',
				isError:false,
				//添加
				isAdd:false,
				addVal:'',
				addAca:'',
				//修改
				isCha:false,
				chaVal:'',
				chaAca:'',
				//删除
				isDel:false,
				state:1,
				//分页
				arr:'',
				//当前的页码
				current:1,
				//数据的总条数
				total:0,
				//当前数据的总页数
				page:1
				//添加输入框值
				
			}
		},
		components:{
			'Xpage':xpage
		},
		methods: {
			//添加专业
			addMajor(){
				this.isAdd = !this.isAdd;
				this.getAllAca();
			},
			yesAdd(){
				var _this = this;
				if(this.addVal.length==0){
					this.isError = true;
					this.message = '专业名称不可为空！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else if(!/[\u4e00-\u9fa5]/g.test(this.addVal)){
					this.isError = true;
					this.message = '专业名称只能为中文！';
					setTimeout(function(){
						_this.isError = false;
						_this.message = '';
					},1000)
				}else{
					var val = this.addVal;
					var isAdd = false;
					for (var i in this.arr) {
						if(this.arr[i].major_name == val){
							this.addVal = '';
							this.isError = true;
							this.message = '该专业已存在';
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
							isAdd = false;
							break;
						}else{
							isAdd = true;
						}
					}
					if(isAdd){
						var _this = this;
						this.isError = true;
						this.message = '添加成功';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
						},1000)
						$.ajax({
							type:"post",
							url:"http://localhost:3000/addMajor",
							data:{
								name:val,
								id:_this.addAca
							},
							success(data){
								data = JSON.parse(data);
								_this.addVal = '';
								_this.isError = false;
								_this.message = '';
								_this.isAdd = false;
								location.reload();
							}
						});
					}
				}
			},
			//修改专业名称或所属学院
			chaMajor(e){
				this.isCha = !this.isCha;
				this.chaVal = $(e.target).prev().prev().html();
				this.majorId = $(e.target).prev().prev().prev().html();
				this.acaId = $(e.target).prev().attr("data-id");
				this.chaAca = this.acaId;
				this.getAllAca();
			},
			yesCha(){
				this.state = 1;
				this.updateMajor();
				this.isCha = false;
			},
			//删除专业
			delMajor(e){
				this.isDel = true;
				this.majorId = $(e.target).prev().prev().prev().prev().html();
				this.chaVal = $(e.target).prev().prev().prev().html();
				this.acaId = $(e.target).prev().prev().attr("data-id");
				this.chaAca = this.acaId;
			},
			yesDel(){
				this.state = 0;
				this.updateMajor();
				this.isDel = false;
			},
			//获取所有学院
			getAllAca(){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getAcaOnce",
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								arr.push(data[i])
							}
							_this.addAca = arr[0].aca_id;
						}
						_this.allAca = arr;
					}
				});
			},
			//修改内容
			updateMajor(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/changeMajor",
					data:{
						id:_this.majorId,
						name:_this.chaVal,
						state:_this.state,
						aca_id:_this.chaAca
					},
					success(data){
						data = JSON.parse(data);
						_this.isError = true;
						_this.message = '成功！';
						setTimeout(function(){
							_this.isError = false;
							_this.message = '';
							location.reload();
						},1000)
					}
				});
			},
			//分页
			onPageChange: function (page) {
		      	this.current = page;
		      	var _this = this;
				var arr = [];
		     	 $.ajax({
					type:"post",
					url:"http://localhost:3000/getMajor",
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
				url:"http://localhost:3000/getMajorTotal",
				async:true,
				success(data){
					data = JSON.parse(data);
					_this.total = data[0].total;
					_this.page = Math.ceil(_this.total/9)
				}
			});
			$.ajax({
				type:"post",
				url:"http://localhost:3000/getMajor",
				data:{
					start:0
				},
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for (var i in data) {
						arr.push(data[i])
						}
						_this.arr = arr;
					}
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
	/*修改样式*/
	
	.change select {
		display: block;
		margin: 10px auto;
		height: 30px;width: 200px;
	}
	
	.change {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.cont {
		width: 280px;
		height: 190px;
		background-color: gainsboro;
		border-radius: 6px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	
	.cont h5 {
		margin: 0;
		padding: 0;
		height: 50px;
		text-align: center;
		font: 16px/50px "微软雅黑";
		color: #000;
	}
	
	.cont p {
		height: 39px;
		width: 100%;
		overflow: hidden;
		border-top: 1px solid #666666;
	}
	
	.cont p span {
		float: left;
		width: 139px;
		height: 39px;
		text-align: center;
		color: #666666;
		font: 14px/39px "微软雅黑";
		cursor: pointer;
	}
	
	.cont p span:first-of-type {
		border-right: 1px solid #666666;
	}
	
	.cont input {
		display: block;
		margin: 15px auto;
		height: 28px;
		width: 200px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		text-indent:10px;
	}
	
	.cont h6 {
		width: 230px;
		margin: 20px auto;
		text-align: center;
		color: red;
		font: 14px/30px "微软雅黑";
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