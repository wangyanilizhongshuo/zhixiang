<template>
	<view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style>
	.left-area .nav-bar {
	    width: 180rpx;
	    height: 100%;
	    background-color: #FFF6F8 !important;
	    overflow-y: scroll;
	}

	.classify-area .left-area .nav-item-active {
	    background-color: #ffffff;
	    border-bottom: unset;
	    color: #FF7295 !important;
	}

	.classify-area .nav-item-active::before {
	    content: '';
	    width: 0.1rem;
	    height: 100%;
	    background-color: #FF7295 !important;
	    position: absolute;
	    left: 0;
	    top: 0;
	}

	.classify-area .left-area .nav-item {
	  /*  width: 4.1rem;
	    height: 2.4rem; */
		width: 180rpx!important;
		height: 100rpx!important;
	    line-height: 100rpx;
	    text-align: center;
	    font-size: .7rem;
	    position: relative;
	    border-bottom: 0 !important;
	    color: #FF7295 !important;
	}

	.goods-name {
	    padding: 0;
	}
</style>
