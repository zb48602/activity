<template>
	<div>
		<xheader />
		<router-view></router-view>
		<xfooter />
	</div>
</template>

<script>
	//公共组件
	import xfooter from "../app_footer.vue";
	import xheader from "../app_header.vue";
	export default{
		components:{
			xheader,
			xfooter
		},
		mounted(){
			var id = localStorage.getItem('id');
			if(id.length==0){
				location.href = '#/'
			}
		}
	}
</script>

<style>
</style>