<template>
  <view class="page-new-index">
    <image mode="widthFix" class="index-pic" :src="act.pic"></image>
    <view class="btn-c">
      <button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="getUserInfo" class="btn">一键登录</button>
      <button v-else-if="noStep" class="btn" open-type="openSetting">授权获取步数</button>
      <template v-else>
        <template v-if="act.status === 0">
          <view class="btn" v-if="baseInfo.isEnroll === '1'" @tap="payFun">立即报名</view>
          <view class="btn" v-if="baseInfo.isEnroll === '0'">已报名</view>
        </template>
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
  watch: {
    isLogin(val) {
      if (val) {
        this.getBaseInfo();
      }
    }
  },
  data() {
    return {
      noStep: false,
      act: {},
      baseInfo: {}
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onShow() {
    if(this.isLogin) {
      this.getBaseInfo();
    }
    this.getAds();
    setTimeout(() => {
      if (this.isLogin) {
        this.getSteps();
      } else {
        this.steps = '';
      }
    }, 1000);
  },
  methods: {
    ...mapMutations({
      setLogin: 'setLogin',
      setUser: 'setUser'
    }),
    getSteps() {
      uni.getSetting({
        success: (res) => {
          if (JSON.stringify(res.authSetting) === '{}' || res.authSetting['scope.werun'] === undefined) {
            // 首次校验
            this.steopFun();
          } else {
            const werun = res.authSetting['scope.werun'];
            if (werun) {
              // 已同意
              this.steopFun();
            } else {
              // 已拒绝
              this.noStep = true;
            }
          }
        }
      });
    },
    steopFun() {
      uni.getWeRunData({
        success: (data) => {
          _POST('/record/steps', {
            encryptedData: data.encryptedData,
            iv: data.iv,
            userId: this.isLogin
          }).then((res) => {
            if (res && res.code && res.code === 'Y') {
              if (res.data && res.data) {
                this.steps = res.data.steps;
                this.noStep = false;
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
        fail: (error) => {
          console.log(error);
          this.noStep = true;
        }
      });
    },
    getBaseInfo() {
      if (this.isLogin) {
        _POST('/address/query', {
          userId: this.isLogin
        }).then((res) => {
          if (res && res.code && res.code === 'Y') {
            if (res.data) {
              this.baseInfo = res.data;
              if (!this.baseInfo.address || !this.baseInfo.area) {
                uni.switchTab({
                  url: '/pages/mine/index'
                });
              }
            }
          } else {
            uni.showToast({
              title: res.msg || '接口异常，请稍后再试~~',
              icon: 'none',
              duration: 4000
            });
          }
        });
      }
    },
    getAds() {
      _POST('/activity/list', {}).then((res) => {
        if (res && res.code && res.code === 'S') {
          this.act = res.data[0];
          this.act.pic = `${this.act.pic}?tmp=${Math.random()}`;
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
                    this.getSteps();
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
    width: 350upx;
    height: 80upx;
    border-radius: 10upx;
    background-color: #a5cd34;
    color: #fff;
    font-size: 32upx;
    line-height: 80upx;
    text-align: center;
    position: fixed;
    bottom: 80upx;
    left: 200upx;
    right: 250upx;
  }
}
</style>
