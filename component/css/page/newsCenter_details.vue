<template>
	<view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style>
	body{ background:#f7f7f7 }
    .news{ border-top:1px solid #e6e6e6; margin-top: 44px;}
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

    .news-details{
        background: #fff;
        padding:15px 2% 15px; 
        color: #000;
        font-size:14px;
    }
    .news-details .cr{
        color: #aaaaaa;
        font-size:13px;
    }
    .news-titel{ font-size:16px; margin-bottom:5px; }
    .news-time{ margin-bottom:8px; }
</style>
