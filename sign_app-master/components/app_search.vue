<template>
	<div class="search">
		<p>
			<input type="text" /><em>取消</em>
		</p>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	/*搜索栏*/
	.search{
		padding: 0 1rem;height: 4rem;
		background-color: #F64141;
		align-items: center;
		justify-content: center;
	}
	.search p{
		width: 100%;height: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 3rem;
		background-color: #fff;
		font-size: 1.8rem;
	}
	.search p i{
		display: flex;
		padding-left: 2rem;
		padding-right: 1rem;
	}
	.search p em{
		display: flex;
		width: 5rem;
		font-style: normal;
		color: #666;
		padding-right: 2rem;
	}
	.search p input{
		display: flex;
		height: 3rem;
		width: 100%;
		border-radius: 3rem;
		font-size: 1.8rem;
	}
</style>