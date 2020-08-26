rem_to_vw

rem与vw转换比: 
	默认: 
		html{
		    font-size: 16px;
		}

	light7.min.css 未确定
		html{font-size:20px}
		@media only screen and (min-width:400px){html{font-size:21.33px!important}
		}
		@media only screen and (min-width:414px){html{font-size:22.08px!important}
		}
		@media only screen and (min-width:480px){html{font-size:25.6px!important}
		}
		1rem = 20px 固定 与rem无关
		1rem = 200px
		calc( rem数值 * 20px)
		文件后缀
			_20.css
			等价于
			* 20px
		路径: 
			项目/static/common/commons/rem_to_vw/main_20.css

	h5已有适配rem大小
		1rem = 100px (750px)
		7.5rem = 750px = 100vw
		calc( rem数值 * 20px)
		文件后缀
			_7.5.css
			等价于
			/ 750 * 100 * 100vw  未确定
		路径: 
			项目/static/common/commons/rem_to_vw/main_7.5.css



