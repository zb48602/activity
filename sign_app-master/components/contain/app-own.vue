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
					<em>pyj</em>
				</p>
			</h4>
			<h4>
				<span>性别</span>
				<p>
					<em>女</em>
				</p>
			</h4>
			<h4>
				<span>年龄</span>
				<p>
					<em>23</em>
				</p>
			</h4>
			<h4>
				<span>年级</span>
				<p>
					<em>2000</em>
				</p>
			</h4>
			<h4>
				<span>学号</span>
				<p>
					<em>201xxxxxx</em>
				</p>
			</h4>
			<h4>
				<span>学院</span>
				<p>
					<em>电气与信息工程学院</em>
				</p>
			</h4>
			<h4>
				<span>专业</span>
				<p>
					<em>计算机科学与技术</em>
				</p>
			</h4>
			<h4>
				<span>手机</span>
				<p>
					<em>133xxxxxxxx</em>
				</p>
			</h4>
		</div>
	</div>
</template>

<script>
	//公共组件
	import xheader2 from "../app-header2.vue";
	export default{
		components:{
			xheader2
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