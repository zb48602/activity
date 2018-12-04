<template>
	<div class="leftCont">
		<h3>{{title}}签到详情</h3>
		<div class="showWay">
			<img src="/img/font/out.svg" title="导出" @click="show" />
			<select name="showWay" v-model="showWay">
				<option value="0" selected="selected">全部</option>
				<option value="1">已签到</option>
				<option value="2">未签到</option>
			</select>
		</div>
		<table border="1" cellspacing="0" cellpadding="1" id="tableData">
			<tr>
				<th>序号</th>
				<th>学号</th>
				<th>学院</th>
				<th>专业</th>
				<th>年级</th>
				<th>班级</th>
				<th>报名学生姓名</th>
				<th>签到情况</th>
			</tr>
			<tr v-for="v in arr">
				<td>{{v.num}}</td>
				<td>{{v.id}}</td>
				<td>{{v.aca}}</td>
				<td>{{v.major}}</td>
				<td>{{v.gra}}</td>
				<td>{{v.cla}}</td>
				<td>{{v.name}}</td>
				<td>{{v.state}}</td>
			</tr>
		</table>

		<!-- 添加框 -->
		<div class="output" v-show="isShow">
			<div class="cont">
				<em>请选择导出数量</em>
				<h6>
					<input id="all" type="checkbox" value="all"/>
					<span>全部</span>
					<span>或：第</span>
					<input type="text" v-model="begin"/>
					<span>至</span>
					<input type="text" v-model="end"/>
				</h6>

				<p>
					<span @click="yes">确定</span>
					<span @click="show">取消</span>
				</p>
			</div>
		</div>

		<xpage :total-pages="page" :total="total" :current-page="current" @pagechanged="onPageChange" v-show="total>9" />
	</div>
</template>

<script>
	import xpage from "../pc_page.vue";
	import $ from 'jQuery';
	export default {
		data() {
			return {
				title: "2017年“数创杯”全国大学生数学建模挑战赛",
				//当前的页码
				current: 1,
				//数据的总条数
				total: 0,
				//当前数据的总页数
				page: 1,
				isShow: false,
				isDelete: false,
				arr: '',
				showWay: 0,
				state: 3,
				begin:'',
				end:'',
				arrlist:[]
			}
		},
		methods: {
			export2Excel() {
				require.ensure([], () => {
					const {
						export_json_to_excel
					} = require('../vendor/Export2Excel');
					//表头
					const tHeader = ['序号', '学号', '学院', '专业', '年级', '班级', '报名学生姓名', '签到情况'];
					//对应字段
					const filterVal = ['num', 'id', 'aca', 'major', 'gra', 'cla', 'name', 'state'];
					//数据源
					const list = this.arrlist;
					const data = this.formatJson(filterVal, list);
					export_json_to_excel(tHeader, data, '列表excel');
				})
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]))
			},
			yes() {
				this.arrlist = [];
				//如果导出全部
				if($('#all').is(':checked')){
					if(this.state==1||this.state==0){
						var way = 'getSignByStateAll';
					}else{
						var way = 'getSignByIdAll';
					}
					this.out(way);
				}else if(this.begin.length!=0&&this.end.length!=0){
					//如果导出部分
					if(this.state==1||this.state==0){
						var way = 'getSignByStateSome';
					}else{
						var way = 'getSignByIdSome';
					}
					this.out(way);
				}
			},
			out(way){
				var _this = this;
				$.ajax({
					type: "post",
					url: "http://localhost:3000/"+way,
					async: true,
					data: {
						id: this.$route.params.id,
						begin:this.begin-1,
						end:(this.end-this.begin+1),
						state:this.state
					},
					success(data){
						data = JSON.parse(data);
						for (var i in data) {
							var num = parseInt(i) + 1;
							var id = data[i].stu_id;
							var name = data[i].stu_name;
							var aca = data[i].aca_name;
							var major = data[i].major_name;
							var cla = data[i].classes;
							var gra = data[i].gra_name;
							if(data[i].sign_state == 0) {
								var state = '未签到'
							} else {
								var state = '已签到'
							}
							var datas = {};
							datas.num = num;
							datas.id = id;
							datas.name = name;
							datas.aca = aca;
							datas.major = major;
							datas.cla = cla;
							datas.gra = gra;
							datas.state = state;
							_this.arrlist.push(datas)
						}
						_this.export2Excel();
					}
				});
			},
			show() {
				this.isShow = !this.isShow;
			},
			toAddAct() {
				location.href = "#/index/addAct"
			},
			toDelete() {
				this.isDelete = !this.isDelete;
			},
			getAll(start) {
				if(start == 0) {
					start = 1;
				}
				var _this = this;
				var arr = [];
				$.ajax({
					type: "post",
					url: "http://localhost:3000/getSignById",
					async: true,
					data: {
						id: this.$route.params.id,
						start: (start - 1) * 9
					},
					success(data) {
						data = JSON.parse(data);
						for(var i in data) {
							var num = parseInt(i) + 1;
							var id = data[i].stu_id;
							var name = data[i].stu_name;
							var aca = data[i].aca_name;
							var major = data[i].major_name;
							var cla = data[i].classes;
							var gra = data[i].gra_name;
							if(data[i].sign_state == 0) {
								var state = '未签到'
							} else {
								var state = '已签到'
							}
							var datas = {};
							datas.num = num;
							datas.id = id;
							datas.name = name;
							datas.aca = aca;
							datas.major = major;
							datas.cla = cla;
							datas.gra = gra;
							datas.state = state;
							arr.push(datas)
						}
						_this.arr = arr;
					}
				});
			},
			getByState(start) {
				if(start == 0) {
					start = 1
				}
				var _this = this;
				var arr = [];
				$.ajax({
					type: "post",
					url: "http://localhost:3000/getSignByIdState",
					async: true,
					data: {
						id: this.$route.params.id,
						start: (start - 1) * 9,
						state: Number(this.state)
					},
					success(data) {
						data = JSON.parse(data);
						for(var i in data) {
							var num = parseInt(i) + 1;
							var id = data[i].stu_id;
							var name = data[i].stu_name;
							var aca = data[i].aca_name;
							var major = data[i].major_name;
							var cla = data[i].classes;
							var gra = data[i].gra_name;
							if(data[i].sign_state == 0) {
								var state = '未签到'
							} else {
								var state = '已签到'
							}
							var datas = {};
							datas.num = num;
							datas.id = id;
							datas.name = name;
							datas.aca = aca;
							datas.major = major;
							datas.cla = cla;
							datas.gra = gra;
							datas.state = state;
							arr.push(datas)
						}
						_this.arr = arr;
					}
				});
			},
			onPageChange(page) {
				this.current = page;
				var _this = this;
				var arr = [];
				if(this.state == 0 || this.state == 1) {
					this.getByState(page);
				} else {
					this.getAll(page);
				}
			},
			getTotal() {
				var _this = this;
				var arr = [];
				$.ajax({
					type: "post",
					url: "http://localhost:3000/getSignByIdTotal",
					data: {
						id: this.$route.params.id
					},
					success(data) {
						data = JSON.parse(data);
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total / 9);
					}
				});
			},
			getStateTotal() {
				var _this = this;
				var arr = [];
				$.ajax({
					type: "post",
					url: "http://localhost:3000/getSignByStateTotal",
					data: {
						id: this.$route.params.id,
						state: this.state
					},
					success(data) {
						data = JSON.parse(data);
						_this.total = data[0].total;
						_this.page = Math.ceil(_this.total / 9);
					}
				});
			}
		},
		mounted() {
			this.getAll(0);
			this.getTotal();
		},
		components: {
			xpage
		},
		watch: {
			showWay: function() {
				var _this = this;
				var arr = [];
				if(this.showWay == 1) {
					this.state = 1;
					this.getByState(0);
					this.getStateTotal()
				} else if(this.showWay == 2) {
					this.state = 0;
					this.getByState(0);
					this.getStateTotal()
				} else {
					this.state = 3;
					this.getAll(0);
					this.getTotal();
				}
				//	   			this.page = 1
			}
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
	
	.showWay {
		position: absolute;
		top: 20px;
		right: 10px;
	}
	
	.showWay img {
		float: right;
		height: 20px;
		width: 20px;
		margin-left: 10px;
		margin-top: 5px;
		cursor: pointer;
	}
	
	h3 {
		width: 100%;
		font-weight: normal;
		text-align: center;
		font: 18px/44px "微软雅黑";
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
	/*下拉菜单*/
	
	select {
		float: left;
		height: 30px;
		background-color: rgba(0, 0, 0, 0);
		font: 14px/30px "微软雅黑";
		color: #fff;
	}
	
	select option {
		color: #000;
	}
	
	a {
		color: #fff;
	}
	
	.output {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.cont {
		width: 280px;
		height: 150px;
		background-color: gainsboro;
		border-radius: 6px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.cont em {
		display: block;
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
	.cont h6 input {
		float: left;
		height: 28px;
		width: 30px;
		border: 1px solid #DCDCDC;
		border-radius: 4px;
		text-indent: 10px;
	}
	.cont h6 input[type="checkbox"]{
		width: 14px;height: 14px;
		margin-top: 8px;
	}
	.cont h6 span{
		float: left;
		margin: 0 5px;
	}
	.cont h6 {
		width: 230px;height: 30px;
		margin: 15px auto;
		text-align: center;
		color: red;
		font: 14px/30px "微软雅黑";
	}
</style>