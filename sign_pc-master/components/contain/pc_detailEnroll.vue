<template>
	<div class="leftCont">
		<h3>报名详情</h3>
		<table border="1" cellspacing="0" cellpadding="1">
			<tr>
				<th>编号</th>
				<th>活动学号</th>
				<th>姓名</th>
				<th>学院</th>
				<th>专业</th>
			</tr>
			<tr v-for="a in arr">
				<td>{{a.enr_id}}</td>
				<td>{{a.stu_id}}</td>
				<th>{{a.stu_name}}</th>
				<td>{{a.aca_name}}</td>
				<td>{{a.major_name}}</td>
			</tr>
		</table>
		
		<xpage :total-pages="page" :total="total" :current-page="current" @pagechanged="onPageChange" v-show="total>9" />
	</div>
</template>

<script>
	import $ from 'jQuery';
	import xpage from "../pc_page.vue";
	export default {
		data() {
			return {
				//当前的页码
				current: 1,
				//数据的总条数
				total: 0,
				//当前数据的总页数
				page: 1,
				isShow: false,
				isDelete:false,
				arr:''
			}
		},
		methods: {
			clear() {
				$("#input").val("")
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
			onPageChange(page) {
				this.current = page;
				this.getEnroll(page);
			},
			getEnroll(start){
				var arr = [];
				var _this = this;
				var id = this.$route.params.id;
				if(start == 0) {
					start = 1;
				}
				$.ajax({
					type:"post",
					url:"http://localhost:3000/detailEnrollById",
					data:{
						id:id,
						start:(start - 1) * 9
					},
					success(data){
						data = JSON.parse(data)
						if(data.length!=0){
							for (var i in data) {
								arr.push(data[i])
							}
							_this.arr = arr;
						}
					},
				});
			},
			getLen(){
				var _this = this;
				$.ajax({
					type:"post",
					url:"http://localhost:3000/detailEnrollByIdTotal",
					data:{
						id:this.$route.params.id
					},
					success(data){
						data = JSON.parse(data)
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total / 9);
					},
				});
			}
		},
		components: {
			xpage
		},
		mounted(){
			this.getEnroll(0);
			this.getLen();
		}
	}
</script>

<style scoped="scoped">
	/*通用样式设置*/
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
	h3{
		width: 100%;
		font-weight: normal;
		text-align: center;
		font:18px/44px "微软雅黑";
	}
	/*table表样式*/
	table {
		width: 100%;
		text-align: center;
		font-size: 14px;
		/*margin-top: 20px;*/
	}
	
	table tr {
		height: 28px;
	}
	/*搜索栏样式设置*/
	
	.search {
		width: 100%;
		height: 40px;
		box-sizing: border-box;
		padding: 5px 10px;
	}
	
	.search span {
		float: left;
		font: 14px/30px "微软雅黑";
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
		color: #000;
	}
	/*搜索框*/
	
	.search p {
		float: left;
		width: 300px;
		height: 22px;
		border: 1px solid #fff;
		border-radius: 14px;
		position: relative;
		padding: 0 10px;
		margin: 3px 10px 3px 70px;
		/*margin: 0 auto;*/
	}
	
	.search p img {
		float: left;
		width: 16px;
		height: 16px;
		margin-top: 3px;
	}
	
	.search em {
		cursor: pointer;
		font-style: normal;
		font: 12px/28px "微软雅黑";
	}
	/*定位样式*/
	
	.search p span {
		position: absolute;
		width: 100%;
		height: 16px;
		font: 12px/15px "微软雅黑";
		margin-top: 3px;
		left: 0;
		text-align: center;
	}
	
	.search p span img {
		float: none;
		vertical-align: text-bottom;
		margin: 0;
	}
	
	.search p span b {
		padding-left: 5px;
	}
	/*搜索框*/
	
	.search p input {
		float: left;
		width: 255px;
		height: 22px;
		padding-left: 5px;
		background-color: rgba(255, 255, 255, 0);
	}
	/*新增按钮样式*/
	.search strong {
		float: right;
		width: 20px;
		height: 20px;
		margin: 5px 0;
	}
	
	.search strong img {
		border: 0;
		width: 100%;
		cursor: pointer;
	}
	a{
		color: #fff;
	}
</style>