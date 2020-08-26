<template>
	<view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style>
	html,
	body {
	    height: 100%;
	    overflow: hidden
	}

	.news {
	    border-top: 1px solid #e6e6e6;
	    margin-top: 44px;
	    overflow: hidden;

	}

	#listwrap {
	    overflow: auto;
	    height: 100%;
	    z-index: 1
	}

	.content {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    overflow: auto;
	    -webkit-overflow-scrolling: touch;
	}

	#setAllRead {
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    color: #00b7ee;
	}

	.news-list2 {
	    position: relative;
	    border-bottom: 1px solid #e6e6e6;
	}

	.news-list2 .img-full {
	    width: 50px;
	    height: 50px;
	    float: left;
	    position: relative;
	}

	.news-list2 .img-full .spot {
	    position: absolute;
	    top: -1px;
	    right: 0px;
	    background: #db0002fc;
	    width: 7px;
	    height: 7px;
	    border-radius: 50%;
	    display: block;
	    z-index: 10;
	}

	.news-list2 .typeimg {
	    width: 50px;
	    height: 50px;
	}

	.news-list2 .news-info {
	    margin-left: 15px;
	    text-align: left;
	    float: left;
	}

	.news-text2 {
	    font-size: 12px;
	    color: #c5c5c5;
	    position: absolute;
	    top: 4px;
	    right: 10px;
	}

	.news-list2 .news-cont {
	    font-size: 14px;
	    color: #aaaaaa;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

	.news-text1 {
	    margin-bottom: 8px;
	    font-size: 14px;
	}

	.weui-swiped-btn {
	    line-height: 4;
	    text-align: center;
	    width: 50px;
	    padding: 0;
	}
</style>
