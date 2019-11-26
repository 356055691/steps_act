<template>
  <view class="page-mine">
    <view class="base-info">
      <view class="pic"></view>
      <view class="name">微信昵称</view>
    </view>
    <view class="addr-c">
      <view class="title">收货地址</view>
      <view class="text">江苏省南京市建邺区团结路200号10楼721室江苏省南京市建邺区团结路200号10楼721室</view>
    </view>
    <navigator url="/pages/mine/edit">
      <view class="edit-btn">修改地址</view>
    </navigator>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-mine {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .base-info {
    background-color: #a5cd34;
    width: 100%;
    height: 160upx;
    padding: 30upx 40upx;
    box-shadow: 0 10upx 10upx #aaa;
    .pic {
      width: 100upx;
      height: 100upx;
      border-radius: 50upx;
      float: left;
      background-color: #fff;
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
    margin-top: 30upx;
    width: 100%;
    padding: 30upx;
    background-color: #fff;
    .title {
      color: #999;
      font-size: 30upx;
      border-bottom: solid 1upx #ccc;
    }
    .text {
      margin-top: 20upx;
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