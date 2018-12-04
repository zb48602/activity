<template>
	<div>
		<xheader />
		<router-view></router-view>
		<xfooter />
	</div>
</template>

<script>
	//公共组件
	import xfooter from "../app-footer.vue";
	import xheader from "../app-header.vue";
	export default{
		components:{
			xheader,
			xfooter
		}
	}
</script>

<style>
</style>