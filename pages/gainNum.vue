<template>
    <view>
        <div class="content content1">
          
            <div class="gainNum-top ma-top44">
                <p class="my-num">我的积分：<span class="num">{{personlist.points}}</span></p>
                <div class="gain-data">
                    <p class="Num-text1"> 连签: <span>{{personlist.sign_day}}</span></p>
                    <p class="Num-text2"> 本月累计签到: <span>{{personlist.sign_day}}</span></p>
                </div>
            </div>
            <div class="gainNum-center">
                <!-- href="javascript:;" -->
                <div class="gainNum-button"><a href   @tap='savePoint'>签到</a></div>
               <div class="gainNum-list">
                    <div class="gainNum-list1"><img lad="1" src="http://zxyp.hzbixin.cn/files/51671600416290025.jpg">第一天</div>
                    
                    <div class="gainNum-list1">
                        <img lad="1" src="http://zxyp.hzbixin.cn/files/24641600416328725.jpg">
                        <span>第一天</span>
                    </div>
                    <div class="gainNum-list1"><img lad="2" src="http://zxyp.hzbixin.cn/files/24641600416328725.jpg">
                        <span>第二天</span>
                    </div>
                    <div class="gainNum-list1">
                        <img lad="3" src=" http://zxyp.hzbixin.cn/files/24641600416328725.jpg">
                        <span>第三天</span>
                    </div>
                    <div class="gainNum-list1"><img lad="4" src=" http://zxyp.hzbixin.cn/files/24641600416328725.jpg">
                        <span>第四天</span>
                    </div>
                </div>
                <p class="title-1 title-jifen">积分任务</p>
            </div>
            <div class="gainNum-down">
                <!-- <p class="title-1">积分任务</p> -->
                <div class="down-box">
                    <!--  @click='jump' data-url='/pages/personData' -->
                    <div class="gainNum-content" >
                        <img src="http://zxyp.hzbixin.cn/files/13081600416420301.jpg">
                        <div class="gainNum-item">
                            <p>完善资料</p>
                            <img src="http://zxyp.hzbixin.cn/files/25991600416456960.jpg">
                            <span>+2000</span>
                            <div class="to-finish" v-if="!unFinish" @tap="jumpPerson" ><a class="bockactive"   >去完成</a></div>
                            <div class="to-finish" v-if="unFinish"><a class="bockactive"  style="color:#bfbfbf" >已完成</a></div>
						</div>
                    </div>
                    <div class="gainNum-content">
                        <img src="http://zxyp.hzbixin.cn/files/22681600416540804.jpg">
                        <div class="gainNum-item">
                            <p class="title-2">视频答题</p>
                            <img src="http://zxyp.hzbixin.cn/files/25991600416456960.jpg">
                            <span class="title-3">+10</span>
                            <div class="to-finish">
                                <a class="bockactive" url="video/video">去完成</a>
                            </div>
                        </div>
                    </div>
                  
                    <div class="gainNum-content">
                        <img src="http://zxyp.hzbixin.cn/files/91600416587804.jpg">
                        <div class="gainNum-item">
                            <p class="title-2">我的二维码</p>
                            <img src="http://zxyp.hzbixin.cn/files/96611600416683186.jpg">
                            <span class="title-3">+1000</span>
                            <div class="to-finish">
                                <a class="bockactive"  url="myTwoCode">去完成</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mask-layer gainNum-layer" style="display: block;" v-if="jifen_show"  ></div>
            <div class="gainNum-success" v-if="jifen_show" >
                <img src="http://zxyp.hzbixin.cn/files/92911600416727021.jpg">
                <p class="gainNum-text1">获得<span>{{jifen.point}}</span>积分</p>
                <p class="gainNum-text2">当前共有<span>{{jifen.totalPoint}}</span>积分</p>
                <div class="gainNum-btn" @click='jifen_show=false' >确定</div>
            </div>
        </div>
		<view class="hbyOccurFlag"  v-if="signalFlag">{{signalMsg}}</view>
    </view>
</template>
<script>
    import light7_min from "@/component/css/light7_min";
    import main from "@/component/css/main";
    import wq from "@/component/css/wq";

    import gainNum from "@/component/css/page/gainNum";

    export default {

        components: {
            gainNum,
            wq,
            main,
            light7_min,
        },
        data() {
            return {    
				signalFlag:false,
				signalMsg:'',
                jifen_show: false,
				// 个人详细信息
				personlist:'',
				// 各个项得分
				list:'',
				jifen:'',
				// 个人资料没有完成
				unFinish:false
            }
        },
		onLoad(){
			this.getData();
			this.getList();
		},
		onShow(){
			this.getData();
		},
		
        methods: {
			jumpPerson(){
				// console.log(fasdf)
				uni.navigateTo({
					url:'/pages/personData'
				})
			},
			 // 得到开始的数据
                 getData(){
					 let  that =this;
					 let id =wx.getStorageSync('user').id
					 uni.wjw_http({
						 url:'user/info/'+id,
						 type:'post'
						
					 }).then(res=>{
						 if(res.status ==0){
							  that.personlist=res.result;
							  if(that.personlist.hasSetPayPass ==0){
								  that.unFinish=false;
							  }else{
								  that.unFinish=true;
							  }
							  
						 }
					 })
				 },
				 // 得到列表数据
				 getList(){
					 let id = wx.getStorageSync('user').id
					 uni.wjw_http({
						 url:'task/list',
						 type:'post',
						 data:{
							 userId:id
						 }
					 }).then(res=>{
						 if(res.status ==0){
							  console.log(res)
						 }
					 })
				 },
				 // 签到后保存积分
				 savePoint(){
					 let that=this;
					 let id = wx.getStorageSync('user').id
					 uni.wjw_http({
						 url:'usertask/save',
						 type:'post',
						 data:{
							 task_id:1,
							 userId:id
						 }
					 }).then(res=>{
						 if(res.status ==0){
							that.jifen= res.result;
							that.jifen_show=true;
						 }else{
							 this.signalFlag=true;
							 this.signalMsg=res.msg;
							 setTimeout(()=>{
								 this.signalFlag=false;
							 },2500)
							 // console.log(res)
						 }
						
					 }).catch(res=>{
						 console.log(res.msg)
					 })
				 }
        }
    }
</script>
<style scoped lang="scss">
	.ma-top44{
		margin-top: 0rpx!important;
	}
	.hbyOccurFlag{
		position: absolute;
		top:400rpx;
		left:250rpx;
		background-color: green;
		width:300rpx;height:130rpx;
		line-height: 130rpx;
		background-color: #000;
		color:#fff;
		text-align: center;
		opacity: 0.7;
		border-radius: 20rpx;
	}
</style>
