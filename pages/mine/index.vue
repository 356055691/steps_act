<template>
  <view class="page-mine">
    <view class="base-info">
      <view class="pic">
        <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
      </view>
      <view v-if="isLogin" class="name">{{ userInfo.nickName || '--'}}</view>
      <view v-else class="name" @tap="goLogin">去登录</view>
      <view v-if="isLogin" class="exit" @tap="exitFun">注销</view>
    </view>
    <view class="info-list">
      <view class="addr-c">
        <view class="title">收货人</view>
        <view class="text">{{ baseInfo.contact_name }}</view>
      </view>
      <view class="addr-c">
        <view class="title">手机号</view>
        <view class="text">{{ baseInfo.contact_tel }}</view>
      </view>
      <view class="addr-c">
        <view class="title">收货地址</view>
        <view class="text">{{ baseInfo.address }}</view>
      </view>
    </view>
    <navigator v-if="isLogin" url="/pages/mine/edit">
      <view class="edit-btn">修改收货信息</view>
    </navigator>
    <view v-else class="edit-btn disabled">修改收货信息</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { _POST } from '../../libs/http';

export default {
  data() {
    return {
      userInfo: {},
      baseInfo: {}
    };
  },
  onShow() {
    uni.getStorage({
      key: 'USER_INFO',
      success: (res) => {
        this.userInfo = res.data;
      }
    });
    this.getUserInfo();
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    ...mapMutations({
      setLogin: 'setLogin',
      setUser: 'setUser',
      exit: 'exit'
    }),
    getUserInfo() {
      if (this.isLogin) {
        _POST('/address/query', {
          userId: this.isLogin
        }).then((res) => {
          if (res && res.code && res.code === 'Y') {
            if (res.data) {
              this.baseInfo = res.data;
            }
          } else {
            uni.showToast({
              title: res.msg || '接口异常，请稍后再试~~',
              icon: 'none',
              duration: 2000
            });
          }
        });
      }
    },
    exitFun() {
      this.userInfo = {};
      this.baseInfo = {};
      this.exit();
      uni.clearStorage();
    },
    goLogin() {
      uni.switchTab({
        url: '/pages/act/index'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-mine {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .info-list {
    padding: 20upx 0;
    background-color: #fff;
  }
  .base-info {
    background-color: #a5cd34;
    width: 100%;
    height: 160upx;
    padding: 30upx 40upx;
    box-shadow: 0 10upx 10upx #aaa;
    margin-bottom: 20upx;
    .pic {
      width: 100upx;
      height: 100upx;
      border-radius: 50upx;
      float: left;
      background-color: #fff;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      width: 450upx;
      height: 100upx;
      line-height: 100upx;
      color: #fff;
      font-size: 36upx;
      padding-left: 30upx;
      float: left;
    }
    .exit {
      width: 120upx;
      height: 50upx;
      line-height: 50upx;
      margin-top: 25upx;
      text-align: center;
      color: #a5cd34;
      background: #fff;
      border-radius: 10upx;
      float: right;
    }
  }
  .addr-c {
    width: 100%;
    padding: 0 30upx;
    background-color: #fff;
    .title {
      color: #999;
      font-size: 28upx;
      border-bottom: solid 1upx #ccc;
      line-height: 50upx;
      margin-bottom: 5px;
    }
    .text {
      padding-bottom: 20upx;
      color: #444;
      font-size: 32upx;
      height: 50upx;
    }
  }
  .edit-btn {
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