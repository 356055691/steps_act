<template>
  <view class="page-act">
    <swiper class="swiper" :circular="true" :indicator-dots="true">
      <swiper-item v-for="(item, index) in adList" :key="index" @tap="joinFun(item)">
        <view class="swiper-item">
          <image v-if="item.pic" :src="item.pic"></image>
          <view class="no-pic" v-else>
            <view class="tip-1">404</view>
            <view class="tip-2">~活动图片找不到了~</view>
          </view>
          <view class="join-btn">查看详情</view>
          <view class="intro">{{ item.activity_name }}</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="step-c">
      <view class="step">
        <view class="title">我的步数</view>
        <button v-if="noStep" class="no-step" open-type="openSetting">点击开启</button>
        <text v-else>{{ steps || '--'}}</text>
      </view>
    </view>
    <button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="getUserInfo" class="login-btn">一键登录</button>
    <button v-else class="login-btn">已登录</button>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { _POST } from '../../libs/http';

export default {
  data() {
    return {
      steps: '',
      noStep: false,
      adList: []
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onShow() {
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
    getAds() {
      _POST('/activity/list', {}).then((res) => {
        if (res && res.code && res.code === 'S') {
          this.adList = res.data;
          this.adList = res.data.sort(this.compare('status'));
        } else {
          uni.showToast({
            title: res.msg || '接口异常，请稍后再试~~',
            icon: 'none',
            duration: 4000
          });
        }
      });
    },
    compare(property) {
      return (a,b) => {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
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
              if (res.data && res.data.steps) {
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
    joinFun(data) {
      if (this.isLogin) {
        let params = `&id=${data.id}`;
        uni.navigateTo({
          url: `/pages/pay/index?${params}`
        });
      } else {
        uni.showModal({
          title: '提示',
          content: '亲，要先登录才能参加活动哦~~',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-act {
  .swiper {
    width: 750upx;
    height: 480upx;
    .swiper-item {
      width: 100%;
      height: 100%;
      position: relative;
      .join-btn {
        width: 140upx;
        height: 60upx;
        line-height: 60upx;
        text-align: center;
        color: #fff;
        background-color: #a5cd34;
        font-size: 24upx;
        border-radius: 4upx;
        position: absolute;
        left: 50%;
        margin-left: -70upx;
        bottom: 80upx;
      }
      .no-pic {
        width: 750upx;
        height: 480upx;
        background-color: #f5f5f5;
        .tip-1 {
          margin-top: 80upx;
          display: inline-block;
          width: 100%;
          height: 150upx;
          line-height: 150upx;
          font-size: 100upx;
          text-align: center;
          color: #333;
        }
        .tip-2 {
          display: inline-block;
          width: 100%;
          height: 60upx;
          line-height: 60upx;
          font-size: 30upx;
          margin-bottom: 190upx;
          text-align: center;
          color: #999;
        }
      }
      image {
        width: 100%;
        height: 100%;
      }
      .intro {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 0 30upx;
        color: #444;
        text-align: right;
        width: 750upx;
        height: 80upx;
        line-height: 80upx;
        text-align: right;
        font-size: 30upx;
      }
    }
  }
  .step-c {
    padding: 30upx;
    margin-top: 30upx;
    .title {
      font-size: 32upx;
      color: #fff;
      text-align: center;
      line-height: 50upx;
      position: absolute;
      top: 50upx;
      left: -10upx;
      width: 280upx;
    }
    .step {
      position: relative;
      width: 280upx;
      height: 280upx;
      border-radius: 140upx;
      color: #fff;
      text-align: center;
      line-height: 280upx;
      background-color: #a5cd34;
      border: solid 10upx #d9f197;
      font-size: 60upx;
      font-weight: bold;
      margin: 0 auto;
    }
    .no-step {
      font-size: 30upx;
      background: none;
      border: none;
      color: #fff;
      display: inline-block;
      margin-top: 120upx !important;
    }
  }
  .login-btn {
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
