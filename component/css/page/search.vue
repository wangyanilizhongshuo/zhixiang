<template>
	<view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style>
	#Jump{
	    width:30px;
	    height:30px;
	    display: block;
	    z-index:99;
	    cursor: pointer;
	}
	.packets{
	    position: fixed;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    z-index: 2100;
	    cursor: pointer;
	    display: none;
	    background-color: #f1f1f1;
	} 

	.top-search{ 
	    width:calc(100% - 60px);
	    position:absolute;
	    left:40px;
	    top:7px;
	    z-index:99;
	}
	#search-cont{
	    border-radius: 8px;
	    height: 30px;
	    line-height:30px;
	    font-size:14px;   
	    width:100%;
	    text-indent:10px; 
	    background: #dddddd78; 
	}
	.boder-bottom{ border-bottom:1px solid #e6e6e6;} 
	.search-close{
	    width: 44px;
	    height: 44px;
	    position: absolute;
	    left: 0rem;
	    top: 0;
	    background-image: url(http://zxyp.hzbixin.cn/files/71931600653800034.jpg);
	    background-repeat: no-repeat;
	    background-size: 40% 40%;
	    background-position: 10px center;
	}
</style>
