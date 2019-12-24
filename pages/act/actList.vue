<template>
  <view class="page-act-list">
    <view class="list">
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-0">未开始</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-1">进行中</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
      <view class="item">
        <view class="top">
          <view class="name eps-1">活动名称活动名称活动名称活动名称活动名称</view>
          <view class="status status-2">已结束</view>
        </view>
        <view class="middle">
          <view class="text">活动时间：2019.09.01-2020.01.01</view>
          <view class="text">所需步数：200步</view>
          <view class="text">报名费用：100元</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.page-act-list {
  min-height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  .list {
    padding-bottom: 10upx;
    padding-top: 20upx;
    .item {
      width: 690upx;
      background-color: #fff;
      padding: 30upx;
      border-radius: 10upx;
      margin: 0 auto 20px;
      .top {
        height: 80upx;
        line-height: 80upx;
        margin-bottom: 10upx;
        .name {
          width: 480upx;
          height: 80upx;
          line-height: 80upx;
          font-size: 36upx;
          color: #444;
          float: left;
        }
        .status {
          width: 150upx;
          height: 80upx;
          line-height: 80upx;
          float: left;
          text-align: right;
        }
        .status-0 {
          color: green;
        }
        .status-1 {
          color: red;
        }
        .status-2 {
          color: #999;
        }
      }
      .middle {
        .text {
          font-size: 26upx;
          line-height: 40upx;
          color: #999;
        }
      }
    }
  }
}
</style>
