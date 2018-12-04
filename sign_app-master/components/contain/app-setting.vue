<template>
	<div class="setting">
		<xheader2>设置</xheader2>
		<div class="cont">
			<a href="#/safe">账号与安全</a>
			<a href="##">隐私</a>
			<a href="##">关于我们</a>
			<a href="#">帮助与反馈</a>
		</div>
	</div>
</template>

<script>
	import xheader2 from "../app-header2.vue";
	export default{
		components:{
			xheader2
		},
		methods:{
			return_mine(){
				location.href = '#/index/mine'
			}
		}
	}
</script>

<style scoped="scoped">
	.setting{
		width: 100%;
		display: flex;
		padding-top: 4.6rem;
		flex-direction: column;
	}
	/*内容*/
	.cont{
		padding: 0 1.6rem;
		display: flex;
		flex-direction: column;
		
	}
	.cont a{
		display: block;
		padding: 0 1.2rem;
		border-bottom: 1px solid #d8b2b2;
		height: 5rem;line-height: 5rem;
		background-color: #fff;
		font-size: 1.6rem;
		color: #666;
	}
</style>