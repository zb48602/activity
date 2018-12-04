<template>
	<div class="leftCont">
		<h3>签到信息显示</h3>
		<div class="search">
			<span @click="getAllSign">显示所有</span>
			<p>
				<select name="searchType" v-model="search">
					<option value="id">通过id查询</option>
					<option value="name">通过名称查询</option>
				</select>
				<input type="text" v-model="val"/>
				<img src="/img/font/search.svg" @click="searchVal"/>
				<img @click="clear" src="/img/font/no.svg" />
			</p>
			<strong><img src="/img/font/add.svg" title="新增" @click="toAddAct()"/></strong>
		</div>
		<div class="listShow">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr><th>报名表编号</th><th>活动名称</th><th>签到人数</th><th>报名人数</th><th>签到率</th><th>操作</th></tr>
				<tr v-for="v in arr"><td>{{v.mes_id}}</td><td>{{v.act_name}}</td><td>{{v.num}}</td><td>{{v.len}}</td><td>{{parseInt(v.num/v.len*100)}}%</td><td><router-link :to="'/index/detailSign/'+v.mes_id">详情</router-link></td></tr>
				
			</table>
		</div>
		<xpage :total-pages="page" :total="total" :current-page="current"  @pagechanged="onPageChange" v-show="total>9"/>
		<div class="delete" v-show="isDelete">
			<h3>提示</h3>
			<b>您确定删除这条记录吗？</b>
			<p><span>确认</span><span  @click="toDelete">取消</span></p>		
		</div>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
	</div>
</template>

<script>
	import xpage from "../pc_page.vue";
	import $ from 'jQuery';
	export default {
		data() {
			return {
				isShow: false,
				isDelete:false,
				//提示信息
				message:'',
				isError:false,
				arr:'',
				//当前的页码
				current:1,
				//数据的总条数
				total:0,
				//当前数据的总页数
				page:1,
				//搜索方式
				search:'id',
				//input框内容
				val:'',
				//判断是否为搜索的分页显示
				isPage:0
			}
		},
		methods: {
			clear() {
				this.val = ''
			},
			notShow() {
				this.isShow = false;
			},
			toShow() {
				this.isShow = true
			},
			toAddAct(){
				location.href = "#/index/addAct"
			},
			toDelete(){
				this.isDelete = !this.isDelete;
			},
			getAllSign(){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getMesTotal",
					async:true,
					success(data){
						data = JSON.parse(data);
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total/9)
					}
				});
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getSign",
					async:true,
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
			},
			searchVal(){
				var way = this.search;
				var _this = this;
				var arr = [];
				if(this.val.length!=0&&way=='id'){
					if(/^[0-9]*$/.test(this.val)){
						$.ajax({
							type:"post",
							url:"http://localhost:3000/getSignId",
							async:true,
							data:{
								id:parseInt(this.val)
							},
							success(data){
								data = JSON.parse(data);
								console.log(data.length)
								if(data.length!=0){
									for(var i in data){
										arr.push(data[i])
									}
									_this.arr = arr;
									_this.total = 1;
									_this.page = 1;
								}else{
									_this.isError = true;
									_this.message = '无该编号签到信息存在！';
									_this.val = '';
									setTimeout(function(){
										_this.isError = false;
										_this.message = '';
									},1000)
								}
							}
						});
					}
				}else if(this.val.length!=0&&way=='name'){
					this.getSignByName(this.val,'该活动无对应报名信息!',0);
					this.isPage = 1;
				}
			},
			getSignByName(name,mess,numPage){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getSignByName",
					async:true,
					data:{
						start:numPage,
						name:name
					},
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for(var i in data){
								arr.push(data[i])
							}
							_this.arr = arr;
						}else{
							_this.isError = true;
							_this.message = mess;
							setTimeout(function(){
								_this.isError = false;
								_this.message = '';
							},1000)
						}
					}
				});
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getMesByNameTotal",
					data:{
						name:name,
					},
					success(data){
						data = JSON.parse(data);
						_this.total = data[0].total;
						console.log(_this.total)
						_this.page = Math.ceil(_this.total/9)
					}
				});
			},
			onPageChange(page) {
		      	this.current = page;
		      	var _this = this;
				var arr = [];
		     	 $.ajax({
					type:"post",
					url:"http://localhost:3000/getSign",
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
		components:{
			xpage
		},
		mounted(){
			this.getAllSign();
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
		position: relative;
		background-color: rgba(255, 100, 0, 0.3);
	}
	/*标题样式设置*/
	h3{
		width:100%;height: 30px;
		font:16px/30px "微软雅黑";
		text-align: center;
	}
	/*下拉菜单*/
	select {
		float: left;
		height: 30px;
		background-color: rgba(0, 0, 0, 0);
		font: 14px/30px "微软雅黑";
		color: #fff;
	}
	select option{
		color: #000000;
	}
	/*搜索边框样式及位置设置*/
	.search{
		width: 100%;height: 28px;
		margin: 4px 0;
	}
	.search p{
		float: left;
		width: 450px;
		height: 26px;
		font:14px/24px "微软雅黑";
		padding: 0 10px;
		border-radius: 15px;
		border:1px solid #fff;
	}
	/*搜索下拉菜单样式设置*/
	.search select{
		float: left;
		height: 24px;
		background-color: rgba(0, 0, 0, 0);
		font: 14px/24px "微软雅黑";
		color: #fff;
	}
	.search option{
		color: #000;
	}
	/*搜索框设置*/
	.search input{
		float: left;
		width: 282px;
		height: 24px;
		padding-left: 5px;
		background-color: rgba(255, 255, 255, 0);
	}
	/*图标设置*/
	.search p img {
		float: left;
		width: 20px;
		height: 20px;
		margin: 2px 0;
		margin-left: 7px;
	}
	/*添加设置*/
	.search strong{
		float: right;
		width: 20px;
		height: 20px;
		margin: 2px 0;
	}
	.search strong img{
		border: 0;
		width: 100%;
		cursor: pointer;
	}
	/*显示所有按钮显示*/
	.search span{
		cursor: pointer;
		/*float: left;*/
		margin-left: 10px;
		font:14px/26px "微软雅黑";
	}
	
	.showAct table {
		width: 100%;
		text-align: center;
		font-size: 14px;
		margin-top: 20px;
	}
	
	.showAct table tr {
		height: 28px;
	}
	/*删除弹出*/
	.delete{
		position: absolute;
		width: 200px;height: 130px;
		top: 50%;margin-top: -75px;
		left: 50%;margin-left: -100px;
		background-color: #fff;
	}
	.delete h3{
		width: 100%;
		height: 30px;
		box-sizing: border-box;
		padding-left: 15px;
		background-color: rgba(255,100,0,0.4);
		font:14px/30px "微软雅黑";
	}
	.delete b{
		display: block;
		width: 100%;height: 50px;
		font:14px/50px "微软雅黑";
		text-align: center;
		color: #FFA500;
	}
	.delete p{
		width: 110px;height: 30px;
		margin: 0 auto;
	}
	.delete span{
		float: left;
		margin-left: 10px;
		width: 40px;
		background-color: rgba(255,100,0,0.4);
		font:14px/30px "微软雅黑";
		text-align: center;
		cursor: pointer;
	}
	/*删除按钮样式*/
	.toDelete{
		cursor: pointer;
	}
	/*表格样式*/
	table{
		width: 100%;
    	text-align: center;
    	font-size: 14px;
	}
	table tr{
		height: 28px;
	}
	a{
		color: #fff;
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