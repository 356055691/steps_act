<template>
  <view class="page-act">
    <view class="banner">
      <view class="pic">
        <image src="/static/banner.jpg"></image>
      </view>
      <view class="des">
        活动简介：联合在校大学生之中有公益之心的青年，一起锻炼身体，做扶贫公益的联盟。让青年刀客们拥有自律向上，心地善良和强健的体魄。
      </view>
      <view class="join-btn" @tap="joinFun">我要参加&nbsp;&gt;&gt;</view>
    </view>
    <view class="step-c">
      <view class="step">
        <view class="title">我的步数</view>
        {{ steps || '--'}}
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
      steps: ''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onLoad() {
    if (this.isLogin) {
      this.getSteops();
    }
  },
  methods: {
    ...mapMutations({
      setLogin: 'setLogin',
      setUser: 'setUser'
    }),
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
              uni.setStorage({
                key: 'USER_ID',
                data: res.userId,
                success: () => {
                  this.setLogin(res.userId);
                  this.getSteops();
                  uni.hideLoading();
                }
              });
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    },
    getSteops() {
      this.steps = 99999;
    },
    joinFun() {
      if (this.isLogin) {
        uni.navigateTo({
          url: '/pages/pay/index'
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
  .banner {
    width: 100%;
    height: 480upx;
    position: relative;
    .pic {
      width: 100%;
      height: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .des {
      position: absolute;
      width: 750upx;
      height: 480upx;
      padding: 30upx;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      font-size: 30upx;
    }
    .join-btn {
      width: 200upx;
      height: 40upx;
      color: #fff;
      font-size: 30upx;
      line-height: 40upx;
      text-align: center;
      position: absolute;
      bottom: 30upx;
      right: 30upx;
      font-weight: bold;
      text-decoration: underline;
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
      font-size: 70upx;
      font-weight: bold;
      margin: 0 auto;
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
