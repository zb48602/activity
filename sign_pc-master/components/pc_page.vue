<template>
	<ul class="page">
        <li>
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">首页</button>
        </li>
        <li>
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">上一页</button>
        </li>
        <li v-for="page in pages">
            <!--<button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"> {{ page.name }}</button>-->
            <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{active: isPageActive(page.name)}"> {{ page.name }}</button>
<!--</li>-->
        </li>
        <li>
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">下一页</button>
        </li>
        <li>
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">尾页</button>
        </li>
    </ul>
</template>

<script>
	export default {
		props: {
			//最大可点击按钮
	        maxVisibleButtons: {
	            type: Number,
	            required: false,
	            default: 3
	        },
	        //总页数
	        totalPages: {
	            type: Number,
	            required: true
	        },
	        //总条数
	        total: {
	            type: Number,
	            required: true
	        },
	        //当前点击页码
	        currentPage: {
	            type: Number,
	            required: true
	        }
	   },
		methods: {
			//点击跳转首页
			onClickFirstPage: function () {
	            this.$emit('pagechanged', 1)
	        },
	        //点击跳转上一页
	        onClickPreviousPage: function () {
	            this.$emit('pagechanged', this.currentPage - 1)
	        },
	        //点击页码
	        onClickPage: function (page) {
	            this.$emit('pagechanged', page)
	        },
	        //点击下一页
	        onClickNextPage: function () {
	            this.$emit('pagechanged', this.currentPage + 1)
	        },
	        //点击尾页按钮
	        onClickLastPage: function () {
	            this.$emit('pagechanged', this.totalPages)
	        },
	        //是否处于被点击状态
	        isPageActive: function (page) {
	            return this.currentPage === page;
	        }
		},
		computed: {
			//检测是否处于首页
			isInFirstPage: function () {
	            return this.currentPage === 1
	        },
	        //检测是否处于尾页
	        isInLastPage: function () {
	            return this.currentPage === this.totalPages
	        },
	        //
	        startPage: function () {
	        	//如果点击的为当前页返回1
	            if (this.currentPage === 1) {
	                return 1
	            }
	            //如果点击的等于总的页数返回 总页数-2
	            else if (this.currentPage === this.totalPages) {
	                return this.totalPages - this.maxVisibleButtons + 2
	            }
	            else {
	            	return this.currentPage - 1
	            }
        	},
	        endPage: function () {
	            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
	        },
	        pages: function () {
	            const range = [];
	            for (let i = this.startPage; i <= this.endPage; i+=1) {
	                range.push({
	                    name: i,
	                    isDisabled: i === this.currentPage
	                })
	            }
	            return range
	       	}
		}
	}
</script>

<style scoped="scoped">
	/*分页样式*/
	.page {
		height: 26px;
		margin: 10px auto 0;
		text-align: center;
		font: 12px/24px "微软雅黑";
		position: absolute;
		left: 50%;bottom: 20px;
		margin-left: -190px;
	}
	
	.page li {
		height: 26px;
		float: left;
		padding: 0 5px;
		font-style: normal;
		border: 1px solid #666;
		margin-left: 5px;
		
		/*cursor: pointer;*/
	}
	
	.page button {
		display: block;
		width: 100%;height: 100%;
		font-style: normal;
		background: rgba(0,0,0,0);
		cursor: pointer;
	}
	.active{
		background-color: rgba(255,100,0,0.6);
	}
</style>