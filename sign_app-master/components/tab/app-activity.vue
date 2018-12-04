<template>
	<div class="content">
		<div class="title">
			<p>
				<select :class="{'check':num == 1}" @click="checked(1)" name="inType">
					<option value="t0" selected="selected">显示全部</option>
					<option value="t1">考试预约</option>
					<option value="t2">学术讲座</option>
					<option value="t3">科技创新</option>
					<option value="t4">文化活动</option>
					<option value="t5">科学竞赛</option>
					<option value="t6">学术讲座</option>
					<option value="t7">名著阅读</option>
					<option value="t8">创业教育</option>
				</select>
				<!--<b :class="{'check':num == 1}" @click="checked(1)">全部信息</b>-->
				<b :class="{'check':num == 2}" @click="checked(2)" class="border">最新活动</b>
			</p>
		</div>
		<div class="cont">
			<a href="#/detail">
				<img src="/img/timg.jpg" />
				<p>
					<b>铃声叮当梦悠长—“铃动校园”风铃节</b>
					<em>内容简介</em>
				</p>
			</a>
			<a href="#">
				<img src="/img/logo.png" />
				<p>
					<b>标题</b>
					<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>
				</p>
			</a>
			<a href="#">
				<img src="/img/logo.png" />
				<p>
					<b>标题</b>
					<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>
				</p>
			</a>
			<a href="#">
				<img src="/img/logo.png" />
				<p>
					<b>标题</b>
					<em>感和使命使,学校面向全校学生公开招募优秀学生作为2018 年寒假招生宣传志愿者,以寒假社会实践形式,回到高中母校对辽宁工程技术大学进行宣传推介</em>
				</p>
			</a>
			<a href="#">
				<img src="/img/timg.jpg" />
				<p>
					<b>铃声叮当梦悠长—“铃动校园”风铃节</b>
					<em>内容简介</em>
				</p>
			</a>
		</div>
	</div>
</template>

<script>
	//公共组件
	export default{
		data(){
			return {
				num:1
			}
		},
		methods:{
			checked(num){
				this.num = num
			}
		}
	}
</script>

<style lang="less" scoped>
	/*内容区样式设置*/
	
	.content {
		width: 100%;
		padding-bottom: 5rem;
		display: flex;
		flex-direction: column;
	}
	.content h3{
		height: 5rem;width: 20rem;
		text-align: center;
		font-size: 2rem;line-height: 5rem;
		background:url(/img/font/xian.png) no-repeat;
		background-size: 20rem 7rem;
		color: #333;
	}
	.cont {
		display: flex;
		flex-direction: column;
	}
	.cont a {
		height: 5.2rem;
		padding: 0.95rem 1rem;
		display: flex;
		justify-content: flex-start;
		border-bottom: 2px solid #e8e8ea;
		color: #666;
	}
	
	.cont a img {
		display: flex;
		height: 5.2rem;
		width: 5.2rem;
	}
	
	.cont a p {
		padding: 0 1rem;
		height: 5.2rem;
		width: 100%;
		display: flex;
		flex: 6;
		flex-direction: column;
		justify-content: center;
	}
	
	.cont a p b {
		height: 1.5rem;
		color: #55585e;
		font-size: 1.3rem;
	}
	
	.cont a p em {
		height: 1.5rem;
		font-size: 1rem;
		font-style: normal;
		width: 100%;
		overflow: hidden;
		color: #909090;
		/*white-space: nowrap;
				text-overflow: ellipsis;*/
	}
	/*头部分类*/
	.title{
		display: flex;
		/*width: 100%;*/
		padding: 1rem 2rem;
		height: 3rem;
		background-color: #F64141;
	}
	.title p{
		display: flex;
		width:100%;height: 3rem;
		background-color: #fff;
		border: 1px solid #fff;
		border-radius: 0.2rem;
	}
	.title b{
		display: flex;height: 3rem;
		width: 50%;
		color: #F64141;
		font-style: normal;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		
	}
	.title .check{
		background-color: #F64141;
		color: #fff;
	}
	.border{
		border-left: 1px solid #F64141;
		border-right: 1px solid #F64141;
	}
	.title select{
		padding: 0 2rem;
		display: flex;height: 3rem;
		flex: 1;
		color: #F64141;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		display: flex;
		position: relative;
		font-weight: 700;
	}
</style>