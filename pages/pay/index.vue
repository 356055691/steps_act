<template>
  <view class="page-pay">
    <!-- <image v-if="pic" class="pic" :src="pic"></image> -->
    <view class="base-info">
      <view class="name eps-1">{{ name }}</view>
      <view class="num">报名人数：{{ total }}</view>
    </view>
    <view class="date-c">
      活动时间：{{ start_time }} 至 {{ end_time }}
    </view>
    <view class="step-c">
      所需步数：<text class="step">{{ steps }}步</text>
    </view>
    <view class="price-c">
      报名价格：
      <text v-if="price" class="price">
        {{ price }}元
      </text>
      <text v-else class="price">
        免费
      </text>
    </view>
    <view class="des-c">
      <view class="des">
        <view class="title">
          活动状态：
        </view>
        <view class="text" v-if="status === 0">
          活动即将开始，火热报名中！
        </view>
        <view class="text" v-if="status === 1">
          活动已经开始，报名结束！
        </view>
        <view class="text" v-if="status === 2">
          活动已经结束，快去看看你获奖了没！
        </view>
      </view>
      <view class="des">
        <view class="title">
          活动详情：
        </view>
        <view class="big-name">{{ name }}</view>
        <view class="text">
          {{ remark }}
        </view>
      </view>
    </view>
    <image v-if="pic" class="ad-pic" :src="pic" mode="widthFix"></image>
    <view class="btn-c">
      <view v-if="status === 0" class="pay-btn" @tap="payFun">
        <view class="tip-1">{{ steps }}步</view>
        <view class="tip-2">立即报名</view>
      </view>
      <view v-if="status === 1" class="pay-btn disabled">报名已截止</view>
      <navigator v-if="isLogin" :url="`/pages/act/list?id=${id}`">
        <view v-if="status === 2" class="pay-btn">查看获奖名单</view>
      </navigator>
    </view>
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
      status: 0,
      steps: 0,
      remark: '',
      pic: '',
      total: 0,
      start_time: '',
      end_time: ''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onLoad(option) {
    if (option) {
      this.id = option.id;
    }
  },
  onShow() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      _POST('/activity/listDetail', {
        activityId: this.id
      }).then((res) => {
        if (res && res.code && res.code === 'S')  {
          if (res.data && res.data.length > 0) {
            const data = res.data[0];
            this.name = data.activity_name;
            this.num = data.limit_num;
            this.pic = data.pic;
            this.price = data.price ? Number(data.price).toFixed(2) : 0;
            this.remark = data.remark;
            this.status = data.status;
            this.steps = data.steps;
            this.type = data.type;
            this.total = data.total_report;
            this.start_time = data.start_time;
            this.end_time = data.end_time;
          }
        } else {
          uni.showToast({
            title: res.msg || '接口异常，请稍后再试~~',
            icon: 'none',
            duration: 4000
          });
        }
      });
    },
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
                  title: '报名成功',
                  duration: 4000
                });
              },
              fail: (err) => {
                uni.showToast({
                  title: '支付异常',
                  icon: 'none',
                  duration: 4000
                });
              }
            });
          }
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 4000
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
  background-color: #fff;
  .big-name {
    text-align: center;
    line-height: 80upx;
    margin-bottom: 20upx;
    font-size: 38upx;
  }
  .pic {
    width: 750upx;
    height: 480upx;
    vertical-align: top;
  }
  .ad-pic {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .base-info {
    width: 750upx;
    height: 100upx;
    padding: 0 30upx;
    border-top: solid 20upx #f5f5f5;
    margin-bottom: 10upx;
    .name {
      width: 450upx;
      height: 80upx;
      line-height: 80upx;
      font-size: 36upx;
      color: #444;
      float: left;
    }
    .num {
      width: 240upx;
      height: 80upx;
      line-height: 80upx;
      float: right;
      color: red;
      font-size: 28upx;
      text-align: right;
    }
  }
  .date-c {
    width: 750upx;
    height: 40upx;
    line-height: 40upx;
    padding: 0 30upx;
    font-size: 26upx;
    color: #666;
  }
  .price-c {
    width: 750upx;
    height: 80upx;
    line-height: 40upx;
    padding: 0 30upx;
    font-size: 26upx;
    color: #666;
    border-bottom: solid 20upx #f5f5f5;
    padding-bottom: 20upx;
    .price {
      padding-left: 5upx;
      color: red;
    }
  }
  .step-c {
    width: 750upx;
    height: 40upx;
    line-height: 40upx;
    font-size: 26upx;
    color: #666;
    padding: 0 30upx;
    .step {
      padding-left: 5upx;
      color: #24c5c0;
    }
  }
  .des-c {
    padding: 30upx;
    background-color: #fff;
  }
  .des {
    min-height: 80upx;
    padding: 15upx 0;
    .title {
      color: #999;
      font-size: 30upx;
    }
    .text {
      color: #444;
      font-size: 34upx;
    }
    .free {
      color: red;
    }
  }
  .btn-c {
    width: 750upx;
    height: 110upx;
    margin-bottom: 0;
    margin-bottom: constant(safe-area-inset-bottom);  
    margin-bottom: env(safe-area-inset-bottom);
  }
  .pay-btn {
    width: 750upx;
    height: 110upx;
    background-color: #a5cd34;
    padding: 15upx 0;
    color: #fff;
    font-size: 32upx;
    line-height: 80upx;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);  
    bottom: env(safe-area-inset-bottom);
    .tip-1 {
      width: 750upx;
      height: 50upx;
      line-height: 50upx;
      font-size: 34upx;
    }
    .tip-2 {
      width: 750upx;
      height: 30upx;
      line-height: 30upx;
      font-size: 24upx;
    }
  }
  .disabled {
    background-color: #ccc;
    color: #fff;
    box-shadow: none;
  }
}
</style>
