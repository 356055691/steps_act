<template>
  <view class="page-mine">
    <view class="base-info">
      <view class="pic">
        <image :src="userInfo.avatarUrl"></image>
      </view>
      <view class="name">{{ userInfo.nickName || '--'}}</view>
    </view>
    <view class="info-list">
      <view class="addr-c">
        <view class="title">收货人</view>
        <view class="text">张三</view>
      </view>
      <view class="addr-c">
        <view class="title">手机号</view>
        <view class="text">16666666666</view>
      </view>
      <view class="addr-c">
        <view class="title">收货地址</view>
        <view class="text">{{ addr }}</view>
      </view>
    </view>
    <navigator url="/pages/mine/edit">
      <view class="edit-btn">修改收货信息</view>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      addr: '江苏省南京市建邺区团结路200号10楼721室江苏省南京市建邺区团结路200号10楼721室'
    };
  },
  onLoad() {
    uni.getStorage({
      key: 'USER_INFO',
      success: (res) => {
        this.userInfo = res.data;
      }
    });
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
      width: 570upx;
      height: 100upx;
      line-height: 100upx;
      color: #fff;
      font-size: 36upx;
      padding-left: 30upx;
      float: left;
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
}
</style>