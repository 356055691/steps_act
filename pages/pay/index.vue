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
          {{ price }}
        </view>
      </view>
    </view>
    <view v-if="status === '0'" class="pay-btn disabled">未开始</view>
    <view v-if="status === '1'" class="pay-btn" @tap="payFun">微信支付</view>
    <navigator v-if="isLogin" url="/pages/act/list">
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
      this.price = option.price;
      this.status = option.status;
      this.steps = option.steps;
    }
  },
  methods: {
    payFun() {
      _POST('/payment/pay', {
        userId: this.isLogin
      }).then((res) => {
        console.log(res);
      });
      // uni.showLoading({
      //   title: '支付中'
      // });
      // setTimeout(() => {
      //   uni.hideLoading();
      //   uni.navigateTo({
      //     url: '/pages/act/index'
      //   });
      // }, 2000);
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
    height: 80upx;
    line-height: 80upx;
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
