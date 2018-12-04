<template>
	<div class="header">
		<header>
			<i @click="searchShow" >
				<!--<img src="/img/font/search.svg"/>-->
			</i>
			<span>重庆科技学院</span>
			<i><img src="/img/font/saoyisao.svg"/></i>
		</header>
		<div class="search" v-show="isShow" id="searchBar">
			<p>
				<img class="none" src="/img/font/sousuo.svg"/>
				<input type="text" id="input" />
				<img class="none" @click="clear" src="/img/font/no.svg"/>
				<span @click="toShow"><img src="/img/font/sousuo.svg"/><b>搜索</b></span>
				
			</p>
			<em @click="notShow">取消</em>
		</div>
	</div>
	
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				isShow:false
			}
		},
		methods:{
			searchShow(){
				this.isShow = !this.isShow
			},
			clear(){
				$("#input").val("")
			},
			notShow(){
				$("#searchBar").removeClass("search-check");
			},
			toShow(){
				$("#searchBar").addClass("search-check");
			}
		}
	}
</script>

<style scoped="scoped">
	header{
		padding: 0 1.2rem;
		height:4.6rem;
		background-color: #F64141;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
		align-items: center;
		font: 2rem/4.6rem "微软雅黑";
		/*border-bottom: 1px solid #d8b2b2;*/
	}
	header i{
		display: flex;
	}
	header i img{
		width: 2rem;height: 2rem;
	}
	/*搜索栏*/
	.search{
		display:flex;
		padding:0 1.2rem;
		height: 3.4rem;
		background-color: #F64141;
		align-items: center;
		justify-content: center;
	}
	.search p{
		display: flex;
		width: 100%;height: 2.5rem;
		position: relative;
		background-color: #fff;
		border-radius: 2.5rem;
	}
	.search p span{
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #8a8a8a;
		top: 0;left: 0;right: 0;bottom: 0;
	}
	.search p span b{
		font-weight: normal;
		display: flex;
		padding-left: 0.5rem;
	}
	.search .none{
		display: none;
	}
	.search em{
		display: none;
	}
	.search img{
		width: 1.5rem;height: 1.5rem;
	}
	.search p input{
		border-radius: 2.5rem;
		width: 100%;
		font-size: 1.6rem;
	}
	.header .search-check{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header .search-check p{
		padding: 0 1.5rem;
		width: 80%;
		align-items: center;
		justify-content: space-between;
	}
	.header .search-check p input{
		padding-left: 1rem;
	}
	.header .search-check em{
		font-style: normal;
		display: flex;
		color: #fff;
		font-size: 1.4rem;
	}
	.header .search-check p span{
		display: none;
	}
	.header .search-check .none{
		display: flex;
	}
</style>