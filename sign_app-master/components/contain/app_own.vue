<template>
	<div class="own">
		<xheader2>个人信息</xheader2>
		<div class="cont">
			<h4>
				<span>头像</span>
				<p>
					<img src="/img/1.jpg"/>
				</p>
			</h4>
			<h4>
				<span>姓名</span>
				<p>
					<em>{{person.name}}</em>
				</p>
			</h4>
			<h4>
				<span>性别</span>
				<p>
					<em>{{person.sex}}</em>
				</p>
			</h4>
			<h4>
				<span>年龄</span>
				<p>
					<em>{{person.age}}</em>
				</p>
			</h4>
			<h4>
				<span>年级</span>
				<p>
					<em>{{person.grade}}</em>
				</p>
			</h4>
			<h4>
				<span>学号</span>
				<p>
					<em>{{person.id}}</em>
				</p>
			</h4>
			<h4>
				<span>学院</span>
				<p>
					<em>{{person.aca}}</em>
				</p>
			</h4>
			<h4>
				<span>专业</span>
				<p>
					<em>{{person.major}}</em>
				</p>
			</h4>
			<h4>
				<span>手机</span>
				<p>
					<em>{{person.phone}}</em>
				</p>
			</h4>
		</div>
	</div>
</template>

<script>
	//公共组件
	import $ from 'jQuery';
	import xheader2 from "../app_header2.vue";
	export default{
		components:{
			xheader2
		},
		data(){
			return{
				person:'',
				id:''
			}
		},
		mounted(){
			this.id = localStorage.getItem('id');
			var _this = this;
			var person = {}
			$.ajax({
				type:"post",
				url:"http://localhost:3001/getStuById",
				data:{
					id:this.id
				},
				success(data){
					data = JSON.parse(data);
					for (var i in data) {
						person.name = data[0].stu_name;
						person.aca = data[0].aca_name;
						person.major = data[0].major_name;
						person.id = data[0].stu_id;
						person.phone = data[0].phone;
						person.grade = data[0].gra_name;
						if(data[0].stu_sex==0){
							person.sex = '男'
						}else{
							person.sex = '女'
						}
						var year = data[0].stu_birth.split('/')[0];
						var mon = data[0].stu_birth.split('/')[1];
						var d = new Date();
						var month = d.getMonth()+1;
						var years = d.getFullYear();
						if(parseInt(mon)>month){
							person.age = years-year-1;
						}else{
							person.age = years - year
						}
					}
					_this.person = person;
				}
			});
		}
	}
</script>

<style scoped="scoped">
	.cont{
		display: flex;
		padding: 5.6rem 2rem 1rem;
		flex-direction: column;
	}
	.cont h4{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #e4e3e8;
		font-size: 1.5rem;
	}
	.cont h4 p{
		height: 4.3rem;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.cont h4 p img{
		width: 3rem;height: 3rem;
	}
	.cont h4 p em{
		color: #666;
		font-style: normal;
	}
</style>