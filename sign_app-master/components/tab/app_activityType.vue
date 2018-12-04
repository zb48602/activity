<template>
	<div class="content">
		<div class="title">
			<p>
				<select :class="{'check':num == 1}" @click="checked(1)" name="inType" @change="changeGen" v-model="genre">
					<option value="00" selected="selected">显示全部</option>
					<option v-for="a in arr" :value="a.gen_id"  >{{a.gen_name}}</option>
				</select>
				<b :class="{'check':num == 2}" @click="checked(2)" class="border">最新活动</b>
			</p>
		</div>
		<div class="cont">
			<router-link v-for="(a,index) in actArr" :to="'/detail/'+a.act_id" :key="index">
				<img src="/img/timg.jpg" />
				<p>
					<b>{{a.act_name}}</b>
					<em>{{a.act_text}}</em>
				</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	import $ from 'jQuery';
	export default{
		data(){
			return {
				num:1,
				genre:'00',
				arr:'',
				actArr:''
			}
		},
		methods:{
			checked(num){
				this.num = num;
				if(num==2){
					var _this = this;
				var actArr = [];
					$.ajax({
						type:"post",
						url:"http://localhost:3001/getActAll",
						success(data){
							data = JSON.parse(data);
							if(data.length!=0){
								for (var i in data) {
									var thetime =data[i].begin_time;
						            var   d=new   Date(Date.parse(thetime .replace(/-/g,"/")));
						            var   curDate=new   Date();
						           	if(d >curDate){
						            	actArr.push(data[i])
						            }
								}
								_this.actArr = actArr;
							}
						}
					});
				}
			},
			//获取所有活动信息
			getActAll(){
				var _this = this;
				var actArr = [];
				$.ajax({
					type:"post",
					url:"http://localhost:3001/getActAll",
					success(data){
						data = JSON.parse(data);
						if(data.length!=0){
							for (var i in data) {
								actArr.push(data[i])
							}
							_this.actArr = actArr;
						}
					}
				});
			},
			//根据传入的类型显示不同的信息
			changeGen(){
				var _this = this;
				var arr = [];
				if(this.genre == '00'){
					this.getActAll();
				}else{
					$.ajax({
						type:"post",
						url:"http://localhost:3001/getActByGenre",
						data:{
							genre:this.genre
						},
						success(data){
							data = JSON.parse(data);
							for (var i in data) {
								arr.push(data[i])
							}
							_this.actArr = arr;
						}
					});
				}
				
			}
		},
		mounted(){
			var id = this.$route.params.id;
			var _this = this;
			var arr = [];
			$.ajax({
				type:"post",
				url:"http://localhost:3001/getGenre",
				success(data){
					data = JSON.parse(data);
					if(data.length!=0){
						for (var i in data) {
							arr.push(data[i])
						}
						_this.arr = arr;
					}
				}
			});
			this.genre = id;
			this.changeGen();
		}
	}
</script>

<style scoped="scoped">
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
		width: 70%;
		display: flex;
		flex: 6;
		flex-direction: column;
		justify-content: center;
	}
	
	.cont a p b {
		height: 1.5rem;
		color: #55585e;
		font-size: 1.3rem;
		line-height: 2.5rem;
	}
	
	.cont a p em {
		height: 2.7rem;
		font-size: 1rem;
		font-style: normal;
		width: 100%;
		overflow: hidden;
		color: #909090;
		white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 2.7rem;
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