<template>
  <view class="page-new-index">
    <image mode="widthFix" class="index-pic" :src="act.pic"></image>
    <view class="btn-c">
      <button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn">一键登录</button>
      <template v-else>
        <view class="btn" v-if="act.status === 0" @tap="payFun">立即报名</view>
        <view class="btn" v-if="act.status === 1">报名已截止</view>
        <view class="btn" v-if="act.status === 2">活动已结束</view>
      </template>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { _POST } from '../../libs/http';

export default {
  data() {
    return {
      act: {}
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onShow() {
    this.getAds();
  },
  methods: {
    ...mapMutations({
      setLogin: 'setLogin',
      setUser: 'setUser'
    }),
    getAds() {
      _POST('/activity/list', {}).then((res) => {
        if (res && res.code && res.code === 'S') {
          this.act = res.data[0];
        } else {
          uni.showToast({
            title: res.msg || '接口异常，请稍后再试~~',
            icon: 'none',
            duration: 4000
          });
        }
      });
    },
    getUserInfo(res) {
      if (res && res.detail && res.detail.errMsg === 'getUserInfo:ok') {
        this.userInfo = JSON.parse(res.detail.rawData);
        uni.setStorage({
          key: 'USER_INFO',
          data: this.userInfo,
          success: () => {
            this.setUser(this.userInfo);
            this.loginFun();
          }
        });
      }
    },
    loginFun() {
      uni.showLoading({
        title: '登录中'
      });
      uni.login({
        success: (res) => {
          if (res.code) {
            _POST('/login/login', {
              code: res.code
            }).then((res) => {
              if (res && res.code && res.code === 'Y') {
                uni.setStorage({
                  key: 'USER_ID',
                  data: res.userId,
                  success: () => {
                    this.setLogin(res.userId);
                    // this.getSteps();
                    uni.hideLoading();
                  }
                });
              }
            });
          } else {
            uni.showToast({
              title: '登录失败！',
              icon: 'none',
              duration: 4000
            });
          }
        }
      });
    },
    payFun() {
      uni.showLoading({
        title: '唤起支付中'
      });
      _POST('/payment/pay', {
        userId: this.isLogin,
        activityId: this.act.id
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
                setTimeout(() => {
                  uni.switchTab({
                    url: '/pages/mine/index'
                  });
                }, 4000);
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
.page-new-index {
  position: relative;
  .index-pic {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .btn {
    width: 250upx;
    height: 60upx;
    border-radius: 10upx;
    background-color: #a5cd34;
    color: #fff;
    font-size: 28upx;
    line-height: 60upx;
    text-align: center;
    position: absolute;
    bottom: 30upx;
    left: 250upx;
    right: 250upx;
  }
}
</style>
