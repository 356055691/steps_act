<template>
  <div style="width: 100%; height: 100%;">
    <img src="/static/bg.jpg" />
    <view class="page">
      联合在校大学生之中有公益之心的青年，一起锻炼身体，做扶贫公益的联盟。让青年刀客们拥有自律向上，心地善良和强健的体魄。
    </view>
    <button @tap="loginFun">一键登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {
    loginFun(res) {
      wx.login({
        success (res) {
          console.log(res);
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://daokeleague.mynatapp.cc/jibu-web/login/login',
              method: "POST",
              data: {
                code: res.code
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(data) {
                console.log(data);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  }
}
</script>

<style>
page {
  width: 100%;
  height: 100%;
  position: relative;
}
view {
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
}
.page {
  width: 690upx;
  background: rgba(255, 255, 255, 0.5);
  padding: 20upx 30upx;
  font-size: 32upx;
  position: absolute;
  top: 80upx;
  left: 30upx;
  border-radius: 10upx;
  color: #444;
}
</style>
