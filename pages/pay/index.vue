<template>
  <view class="page-pay">
    <view class="des">
      <view class="title">
        报名须知
      </view>
      <view class="text">
        报名须知报名须知报名须知报名须知报名须知报名须知报名须知报名须知
      </view>
    </view>
    <view class="pay-btn" @tap="payFun">微信支付</view>
  </view>
</template>

<script>
export default {
  methods: {
    payFun() {
      uni.showLoading({
        title: '支付中'
      });
      setTimeout(() => {
        uni.hideLoading();
        uni.navigateTo({
          url: '/pages/act/index'
        });
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-pay {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .des {
    width: 100%;
    padding: 30upx;
    background-color: #fff;
    .title {
      color: #999;
      font-size: 30upx;
      margin-bottom: 20upx;
    }
    .text {
      color: #444;
      font-size: 34upx;
    }
  }
  .pay-btn {
    width: 690upx;
    height: 90upx;
    border-radius: 45upx;
    background-color: #a5cd34;
    box-shadow: 0 10upx 10upx #aaa;
    color: #fff;
    font-size: 32upx;
    line-height: 90upx;
    text-align: center;
    position: absolute;
    bottom: 90upx;
    left: 30upx;
    right: 30upx;
  }
}
</style>
