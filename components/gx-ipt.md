本组件是自定义键盘数字键盘，支持小数点输入，身份证号码输入(X)，密码输入，密码框长度可自定义，键盘和输入框分离，可分别单独使用；
支持同一个页面同时使用多个输入框，如果大家觉得不够完善，欢迎提出，写插件不易，该插件花费了我很多时间，好用的话请5星好评，打赏一杯奶茶也可以。
本组件目前兼容微信小程序、H5、APP。其他平台没试过

### 有问题请加群询问，第一时间解决问题，邮件不经常看。
### QQ交流群(学习干货多多) 811956471

### 或者在页面script中引入组件，并注册组件
```
import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
import passwordInput from '@/components/password-input/password-input.vue'
export default {
   numberKeyboard,
   passwordInput
}
```

### 下面是一个页面只使用一个密码框的完整示例
```
<template>
  <view class="main">
    <view class="title">一般用法</view>
    <view class="item" @tap='KeyboarOpen'>
      <password-input :numLng='password'></password-input>
    </view>
    <number-keyboard tabBar ref='KeyboarHid' @input='onInput' psdLength='6'></number-keyboard>
  </view>
</template>
<script>
  import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
  import passwordInput from '@/components/password-input/password-input.vue'
  export default {
    components: {
      numberKeyboard,
      passwordInput
    },
    data() {
      return {
        password: "", //输入的内容
      }
    },
    onLoad() {
      //因为此时实例没有挂载完成，需要延迟操作
      setTimeout(() => {
        this.$refs.KeyboarHid.open()
      }, 50)
    },
    methods: {
      //打开键盘
      KeyboarOpen(e) {
        this.$refs.KeyboarHid.open();
      },
      //输入的值
      onInput(val) {
        this.password = val;
      }
    }
  }
</script>
<style scoped>
  .main {
    padding: 0rpx 40rpx;
  }
  .ipt {
    border-bottom: 1rpx solid #CCCCCC;
  }
  .item {
    padding: 10rpx 0rpx;
  }
  .title {
    margin: 30rpx 0;
  }
</style>
```
### 特别注意：如果页面使用多个输入框，需要给每个输入框配置 data-key  作为唯一标记，还需要配置一下valArr 参数，具体用法请看示例


### 键盘属性
| 名称                         | 类型           | 默认值                        | 描述                                               |
| ----------------------------|--------------- | -------
| psdLength                   |Number, String  | ''                            |限制输入框的长度 空值不限制，默认不限制|
| keyboardNum                 |Array, Object   |[1, 2, 3, 4, 5, 6, 7, 8, 9]    | 键盘码|
| otherNum                   |Number, String   | ''                            | 特殊键盘码：可选值：.或者X  默空 |
| tabBar                      |Boolean         | false                         | 是否在需要打开键盘时隐藏底部tabBar关闭键盘展示tabBar |
| value                      |String           | ''                            | 实现输入框和键盘双向绑定 |

### 输入框属性
| 名称                        | 类型             | 默认值          | 描述                                               |
| ----------------------------|---------------  | -------------   | ---------------------------------------------------|
| plaintext                   | Boolean         | true            | 是否明文 默认密文|
| numLng                      | String, Number  | ''              |键盘输入的val               |
| psdIptNum                   | String, Number  | 6               |键盘输入的val               |


### 键盘事件
| 名称             | 说明            
| -----------------|------------------
| reset           | 重置 清空
| deleteKeyboar   | 删除输入框内容


### 输入框事件 -----暂无
| 名称             | 参数              | 描述                      |
| -----------------|------------------ | --------------------------|
|                  |                   |                           |
