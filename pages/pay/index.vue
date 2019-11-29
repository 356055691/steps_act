<template>
  <view class="page-pay">
    <view class="des-c">
      <view class="des">
        <view class="title">
          活动名称：
        </view>
        <view class="text">
          {{ name }}
        </view>
      </view>
      <view class="des">
        <view class="title">
          剩余名额：
        </view>
        <view class="text">
          {{ num }}
        </view>
      </view>
      <view class="des">
        <view class="title">
          所需步数：
        </view>
        <view class="text">
          {{ steps }}
        </view>
      </view>
      <view class="des">
        <view class="title">
          报名费：
        </view>
        <view class="text">
          {{ price }} 元
        </view>
      </view>
      <view class="des">
        <view class="title">
          活动说明：
        </view>
        <view class="text" v-if="status === '0'">
          活动即将开始，火热报名中！
        </view>
        <view class="text" v-if="status === '1'">
          活动已经开始，报名通道已经关闭！
        </view>
        <view class="text" v-if="status === '2'">
          活动已经结束，快去看看你获奖了没！
        </view>
      </view>
    </view>
    <view v-if="status === '0'" class="pay-btn" @tap="payFun">我要报名</view>
    <view v-if="status === '1'" class="pay-btn disabled">报名已截止</view>
    <navigator v-if="isLogin" :url="`/pages/act/list?id=${id}`">
      <view v-if="status === '2'" class="pay-btn">查看获奖名单</view>
    </navigator>
  </view>
</template>

<script>
import { _POST } from '../../libs/http';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      id: 0,
      num: 0,
      price: 0,
      status: '0',
      steps: 0
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onLoad(option) {
    if (option) {
      this.name = option.name;
      this.id = option.id;
      this.num = option.num;
      this.price = option.price ? Number(option.price / 100).toFixed(2) : '0.00';
      this.status = option.status;
      this.steps = option.steps;
    }
  },
  methods: {
    payFun() {
      uni.showLoading({
        title: '唤起支付中'
      });
      _POST('/payment/pay', {
        userId: this.isLogin,
        activityId: this.id
      }).then((res) => {
        uni.hideLoading();
        if (res && res.code && res.code === 'Y') {
          if (res.data) {
            const data = res.data;
            uni.requestPayment({
              provider: 'wxpay',
              timeStamp: String(data.timeStamp),
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success: (res) => {
                uni.showToast({
                  title: '支付成功',
                  duration: 2000
                });
              },
              fail: (err) => {
                uni.showToast({
                  title: '支付异常',
                  icon: 'none',
                  duration: 2000
                });
              }
            });
          }
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-pay {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .des-c {
    padding: 40upx;
    background-color: #fff;
  }
  .des {
    clear: both;
    min-height: 80upx;
    padding: 15upx 0;
    line-height: 50upx;
    .title {
      color: #999;
      font-size: 30upx;
      width: 150upx;
      text-align: right;
      float: left;
    }
    .text {
      padding-left: 20upx;
      color: #444;
      font-size: 34upx;
      width: 520upx;
      float: left;
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
  .disabled {
    background-color: #ccc;
    color: #fff;
    box-shadow: none;
  }
}
</style>
