<template>
	<view>
		<button    open-type="contact" sessionFrom="weapp">>
		<!-- <button   open-type="contact" sessionFrom="weapp"> -->
		      <text>客服帮助</text> 
		</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				pages:1,
				content:'',
				picture:''
			};
		},
		onLoad(){
			this.getRecord()
		},
		methods: {
			// 聊天的列表
			getRecord(){
				let that=this;
				uni.wjw_http({
					url:'app/cdconsultationrecordcommunication/list',
					type:'get',
					data:{
						page:that.pages,
						limit:8
					}
				}).then(res=>{
					if(res.code ==0){
						console.log(res.data)
						
					}
				})
			},
			relation(){
				let that=this;
				uni.wjw_http({
					url:'app/cdconsultationrecordcommunication/chat',
					data:{
						issues:that.content,
						
					}
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	/*\pages\category\mybk\prof\consult\info\info.vue*/
	@import "../../../../../../colorui/main.css";
	@import "../../../../../../colorui/icon.css";
	page{
	  padding-bottom: 100upx;
	}
</style>
