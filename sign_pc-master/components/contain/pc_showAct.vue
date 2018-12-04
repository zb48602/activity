<template>
	<div class="showAct leftCont">
		<h3>显示活动列表</h3>
		<div class="search">
			<span @click="getActAll">显示所有</span>
			<p>
				<select name="searchType" v-model="search">
					<option value="id">通过id查询</option>
					<option value="name">通过名称查询</option>
					<option value="genre">通过类别查询</option>
					<option value="address">通过地址查询</option>
				</select>
				<input type="text" v-model="val"/>
				<img src="/img/font/search.svg" @click="searchVal"/>
				<img @click="clear" src="/img/font/no.svg" />
			</p>
			<strong><img src="/img/font/add.svg" title="新增" @click="toAddAct()"/></strong>
		</div>
		<div class="listShow">
			<table border="1" cellspacing="0" cellpadding="1">
				<tr>
					<th>序号</th>
					<th>名称</th>
					<th>类别</th>
					<th>地点</th>
					<!--<th>时间</th>-->
					<th>人数</th>
					<th colspan="2">操作</th>
				</tr>
				<tr v-for="v in arr">
					<td>{{v.act_id}}</td>
					<td>{{v.act_name}}</td>
					<td>{{v.gen_name}}</td>
					<td>{{v.act_address}}</td>
					<!--<td>{{v.begin_time}}</td>-->
					<td>{{v.act_num}}</td>
					<td><router-link :to="'/index/detailAct/'+v.act_id">详情</router-link></td>
					<td><router-link :to="'/index/changeAct/'+v.act_id">编辑</router-link></td>
					<!--<td @click="toDelete" class="toDelete">删除</td>-->
				</tr>
			</table>
		</div>
		<!-- 提示信息 -->
		<div class="message" v-show="isError">
			<p v-text="message"></p>
		</div>
		<xpage :total-pages="page" :total="total" :current-page="current"  @pagechanged="onPageChange" v-show="total>9"/>
	</div>
</template>

<script>
	import xpage from "../pc_page.vue";
	import $ from 'jQuery';
	export default {
		data() {
			return {
				isShow: false,
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
				id:'',
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
				this.val = '';
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
			//根据活动的名称，类别或举行地址查询活动信息
			getActByOther(name,genre,address,mess,numPage){
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getActByOther",
					async:true,
					data:{
						start:numPage,
						name:name,
						genre:genre,
						address:address
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
					url:"http://localhost:3000/getActByOtherTotal",
					data:{
						name:name,
						genre:genre,
						address:address
					},
					success(data){
						data = JSON.parse(data);
						_this.total = data[0].total;
						console.log(_this.total)
						_this.page = Math.ceil(_this.total/9)
					}
				});
			},
			//获取所有的活动信息
			getActAll(){
				this.isPage = 0;
				this.val = '';
				var _this = this;
				var arr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getActTotal",
					async:true,
					success(data){
						data = JSON.parse(data);
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total/9);
						_this.isPage = 0;
					}
				});
				$.ajax({
					type:"post",
					url:"http://localhost:3000/getAct",
					async:true,
					data:{
						start:0
					},
					success(data){
						data = JSON.parse(data);
	//					console.log(data)
						if(data.length!=0){
							for(var i in data){
								arr.push(data[i])
							}
							_this.arr = arr;
						}
					}
				});
			},
			//input框改变内容搜索
			searchVal(){
				var way = this.search;
				var _this = this;
				var arr = [];
				if(this.val.length!=0){
					switch(way){
						case 'id':
							if(/^[0-9]*$/.test(this.val)){
								$.ajax({
									type:"post",
									url:"http://localhost:3000/getActById",
									async:true,
									data:{
										id:parseInt(this.val)
									},
									success(data){
										data = JSON.parse(data);
										if(data.length!=0){
											for(var i in data){
												arr.push(data[i])
											}
											_this.arr = arr;
											_this.total = 1;
											_this.page = 1;
										}else{
											_this.isError = true;
											_this.message = '无该编号存在！';
											setTimeout(function(){
												_this.isError = false;
												_this.message = '';
											},1000)
										}
									}
								});
							}
						break;
						case 'name':
							this.getActByOther(this.val,'','','该名称活动不存在!',0);
						break;
						case 'genre':
							this.getActByOther('',this.val,'','该类别无活动信息!',0);
						break;
						default:
							this.getActByOther('','',this.val,'该地址无活动举行!',0);
						break;
					}
					this.isPage = 1;
				}
			},
			onPageChange(page) {
		      	this.current = page;
		      	console.log(this.current)
		      	var _this = this;
				var arr = [];
				if(this.isPage==0){
					$.ajax({
						type:"post",
						url:"http://localhost:3000/getAct",
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
				}else{
					switch (this.search){
						case 'id':
							if(/^[0-9]*$/.test(this.val)){
								$.ajax({
									type:"post",
									url:"http://localhost:3000/getActById",
									async:true,
									data:{
										id:parseInt(this.val)
									},
									success(data){
										data = JSON.parse(data);
										if(data.length!=0){
											for(var i in data){
												arr.push(data[i])
											}
											_this.arr = arr;
											_this.total = 1;
											_this.page = 1;
										}else{
											_this.isError = true;
											_this.message = '无该编号存在！';
											setTimeout(function(){
												_this.isError = false;
												_this.message = '';
											},1000)
										}
									}
								});
							}
						case 'name':
							this.getActByOther(this.val,'','','该名称活动不存在!',(page-1)*9);
						break;
						case 'genre':
							this.getActByOther('',this.val,'','该类别无活动信息!',(page-1)*9);
						break;
						default:
							this.getActByOther('','',this.val,'该地址无活动举行!',(page-1)*9);
						break;	break;
					}
				}
		   	}
		},
		components:{
			xpage
		},
		mounted(){
			this.getActAll()
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
	h3{
		width: 100%;
		font-weight: normal;
		text-align: center;
		font:18px/44px "微软雅黑";
		margin: 0;
	}
	
	.showAct table {
		width: 100%;
		text-align: center;
		font-size: 14px;
		/*margin-top: 20px;*/
	}
	
	.showAct table tr {
		height: 28px;
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
	/*删除按钮样式*/
	.toDelete{
		cursor: pointer;
	}
	/*超链接样式*/
	a{
		color: #fff;
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
</style>