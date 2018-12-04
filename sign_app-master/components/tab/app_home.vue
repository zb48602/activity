<template>
	<div class="content">
		<swiper :options="swiperOption" ref="mySwiper" class="sweiper">
			<swiper-slide v-for="(i,index) in imgsrc"><img :src="i.act_img" class="swipersrc" @click="toDetail(i.act_id)"  :key="index"/></swiper-slide>
			<!--<swiper-slide><img :src="imgsrc[0]" class="swipersrc" /></swiper-slide>
			<swiper-slide><img :src="imgsrc[1]" class="swipersrc" /></swiper-slide>
			<swiper-slide><img :src="imgsrc[2]" class="swipersrc" /></swiper-slide>-->
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
		<div class="cont">
			<p>
				<router-link @click="checkChange" :to="'/index/actType/'+a.gen_id" v-for="(a,index) in arr" :key="index" >
					<img :src="a.gen_img" />
					<em>{{a.gen_name}}</em>
				</router-link>
			</p>
		</div>
		<div class="notice">
			<img src="/img/notice.jpg" />
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper';
	Vue.use(VueAwesomeSwiper)
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import "../../template/swiper-4.1.0.min.css";
	import $ from 'jQuery';
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				imgsrc:'',
				swiperOption: { //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/ 

					notNextTick: true,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false
					},
					loop: true,
					direction: 'horizontal',
					grabCursor: true,
					setWrapperSize: true,
					autoHeight: true,
					pagination: {
						el: '.swiper-pagination'
					},
					centeredSlides: true,
					paginationClickable: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					keyboard: true,
					mousewheelControl: true,
					observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
					debugger: true
				},
				arr:[]
			}
		},
		mounted(){
			var _this = this;
			var arr = [];
			var imgsrc = [];
			$.ajax({
				type:"post",
				url:"http://localhost:3001/getGenre",
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for(var i in data){
							arr.push(data[i]);
						}
						_this.arr = arr;
					}
				}
			});
			$.ajax({
				type:"post",
				url:"http://localhost:3001/getActWithPic",
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for(var i in data){
							imgsrc.push(data[i]);
						}
						_this.imgsrc = imgsrc;
					}
				}
			});
		},
		methods:{
			checkChange(){
				sessionStorage.setItem("footerChecked",2);
			},
			toDetail(id){
				sessionStorage.setItem("footerChecked",3);
				this.$router.push({name:'detail',params:{id:id}});
			}
		}
	}
</script>

<style scoped="scoped">
	.sweiper{
		width: 100%;
		overflow: hidden;
	}
	.swipersrc{
		display: flex;
		width:100%;
		height:15rem;
	}
	/*内容区样式设置*/
	
	.content {
		width: 100%;
		padding-bottom: 5rem;
		display: flex;
		flex-direction: column;
	}
	/*内容区*/
	.cont {
		display: flex;
		flex-direction: column;
		/*margin: 1rem 0;*/
		border-bottom: 2px solid #E5E5E5;
		border-top: 2px solid #E5E5E5;
	}
	
	.cont p {
		/*height: 7rem;*/
		display: flex;
		margin: 0 1.8rem;
		flex-wrap: wrap;
		/*border-bottom: 1px solid #E5E5E5;*/
	}
	
	.cont p a {
		display: flex;
		width: 33%;
		height: 7rem;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		color: #666;
		box-sizing: border-box;
		/*border-right: 1px solid #E5E5E5;*/
		padding: 1.3rem 0;
	}
	
	.cont p a img {
		display: flex;
		width: 2.4rem;
		height: 2.4rem;
	}
	
	.cont p a em {
		font-style: normal;
	}
	
	.notice {
		width: 100%;
	}
	
	.notice img {
		width: 100%;
	}
</style>