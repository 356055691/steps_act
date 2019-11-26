<template>
  <view class="page-edit-adr">
    <input placeholder="请输入新的地址" />
    <navigator url="/pages/mine/index" open-type="switchTab">
      <view class="edit-btn">确认并返回</view>
    </navigator>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-edit-adr {
  width: 100%;
  height: 100%;
  padding: 30upx;
  background-color: #fff;
  input {
    width: 690upx;
    line-height: 80upx;
    height: 80upx;
    border-bottom: solid 1upx #ccc;
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
