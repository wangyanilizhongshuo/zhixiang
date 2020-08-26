<template>
	<view>
		
	</view>
</template>

<script>
	export default {}
</script>

<style>
	 body{ overflow:auto;
	    position: static;
	}  
	.total{
	 text-align: right; 
	 line-height:40px;
	 padding:0 15px;
	 font-size:14px; 
	}
	.handle{
	    display:none;
	    text-align:right;
	    padding: 0 10px;
	    background:#fff;
	    border-top:1px solid #e6e6e6; 
	}
	#totnum{ margin:0 4px;}
	#shopname2  {
	    position: absolute;
	    width: auto;
	    height: auto;
	    line-height: 12.5px;
	    color: #414141;
	    left: 39px;
	    top: 3px;
	    font-size: 13px;
	}
	  .wpop-box{ 
	    position: fixed;
	    top: 0;
	    left:0;
	    width: 100%;
	    height: 100%;
	    z-index: 10000;
	    cursor: pointer;
	}
	.wpop-bg{
	    background-color: rgba(0,0,0,.2);
	    position: fixed;
	    top: 0;
	    left:0;
	    width: 100%;
	    height: 100%;
	    z-index: 10005;
	    cursor: pointer; 
	}
	.refund-checkbox{
	    margin-right:5px; 
	    float: left;
	    position: relative;
	}
	label.label-checkbox i.icon-form-checkbox {
	    margin: .10rem 0;
	}
	.refund-but{ cursor: pointer;}
	.middle>img {
	    position: absolute;
	    height: 15px;
	    width: 3.5%;
	    left: 3%;
	    top: 25px;
	}
	.middle {
	    padding:13px 0 0 30px; 
	}
	.middle-number{
	    position: absolute;
	    height: 10px;
	    color: #414141;
	    font-size: 12px;
	    right:4%;
	    top: 15.5px;
	    z-index:99;
	}
	.middle p{ margin:0 8px 4px; }
</style>
