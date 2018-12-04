<template>
	<div class="list">
		<ul>
			<li :class="{'yell':num==1}" @click="toShow(1)">
				<p @click="toShow(1)">
					<img src="/img/font/huodong.svg" />
					<span>活动管理</span>
				</p>
				<ol v-show="num==1">
					<li>
						<a href="#/index/addAct">新增活动</a>
					</li>
					<li>
						<a href="#/index/showAct">查询活动</a>
					</li>
					<li>
						<a href="#/index/genre">类别管理</a>
					</li>
				</ol>
			</li>
			<li :class="{'yell':num==2}" @click="toShow(2)">
				<p @click="toShow(2)">
					<img src="/img/font/baoming.svg" />
					<span>报名管理</span>
				</p>
				<ol v-show="num==2">
					<li>
						<a href="#/index/addEnroll">新增报名表</a>
					</li>
					<li>
						<a href="#/index/showEnroll">查询报名表</a>
					</li>
				</ol>
			</li>
			<li :class="{'yell':num==3}" @click="toShow(3)">
				<p @click="toShow(3)">
					<img src="/img/font/qian.svg" />
					<span>签到管理</span>
				</p>
				<ol v-show="num==3">
					<li>
						<a href="#/index/showSign">签到查询</a>
					</li>
				</ol>
			</li>
			<li v-show="status"  :class="{'yell':num==4}" @click="toShow(4)">
				<p @click="toShow(4)">
					<img src="/img/font/student.svg" />
					<span>学生管理</span>
				</p>
				<ol v-show="num==4">
					<li>
						<a href="#/index/addStu">新生入学</a>
					</li>
					<li>
						<a href="#/index/deleteStu">学生休学</a>
					</li>
					<li>
						<a href="#/index/changeStu">修改信息</a>
					</li>
				</ol>
			</li>
			<li v-show="status" :class="{'yell':num==5}" @click="toShow(5)">
				<p @click="toShow(5)">
					<img src="/img/font/xueyuan.svg" />
					<span>院系管理</span>
				</p>
				<ol v-show="num == 5">
					<li>
						<a href="#/index/academy">学院管理</a>
					</li>
					<li>
						<a href="#/index/major">专业管理</a>
					</li>
				</ol>
			</li>
			<li :class="{'yell':num==6}" @click="toShow(6)">
				<p @click="toShow(6)">
					<img src="/img/font/zhanghu.svg" />
					<span>账户管理</span>
				</p>
				<ol v-show="num == 6">
					<li>
						<a href="#/index/showOwn">个人信息</a>
					</li>
					<li v-show="status">
						<a href="#/index/showMan">发布者管理</a>
					</li>
				</ol>
			</li>

		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: '',
				status: ''
			}
		},
		methods: {
			toShow(id) {
				this.num = id;
				sessionStorage.setItem('num',id);
				this.num = sessionStorage.getItem('num');
			}
		},
		mounted() {
			var status = sessionStorage.getItem("status");
			this.num = sessionStorage.getItem('num');
			if(status == 0) {
				this.status = true;
			} else {
				this.status = false;
			}
//			sessionStorage.setItem('num',1);
//			this.num = sessionStorage.getItem('num');
		}
	}
</script>

<style scoped="scoped">
	.list {
		float: left;
		width: 160px;
		min-height: 460px;
		color: #fff;
		background-color: rgba(255, 100, 0, 0.3);
	}
	
	.list ul {
		width: 145px;
		padding-left: 15px;
	}
	
	.list ul li {
		width: 100%;
		cursor: pointer;
		font: 16px/40px "微软雅黑";
	}
	
	.list ul li p {
		font: 16px/40px "微软雅黑";
	}
	
	.list li p img {
		width: 20px;
		height: 20px;
		vertical-align: text-bottom;
		margin-right: 3px;
	}
	/*二级菜单*/
	.list li ol {
		width: 115px;
		padding-left: 30px;
	}
	
	.list li ol li {
		height: 30px;
		font: 14px/30px "微软雅黑";
		/*background-color: rgba(0,0,0,0.4);*/
	}
	.list li ol img {
		width: 20px;
		height: 20px;
		vertical-align: text-bottom;
		margin-right: 3px;
	}
	a {
		color: #fff;
	}
	
	a:hover {
		color: #FFA500;
	}
	.yell p{
		color: yellow;
	}
</style>