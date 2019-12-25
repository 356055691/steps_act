<template>
  <view class="page-act-list">
    <view class="list" v-if="list && list.length > 0">
      <view class="item" v-for="(item, index) in list" :key="index">
        <navigator :url="`/pages/pay/index?id=${item.id}`">
          <view class="top">
            <view class="name eps-1">{{ item.activity_name }}</view>
            <view v-if="item.status === 0" class="status status-0">未开始</view>
            <view v-if="item.status === 1" class="status status-1">进行中</view>
            <view v-if="item.status === 2" class="status status-2">已结束</view>
          </view>
          <view class="middle">
            <view class="text">活动时间：{{ item.start_time }}-{{ item.end_time }}</view>
            <view class="text">所需步数：{{ item.steps }}步</view>
            <view class="text">报名费用：{{ item.price }}元</view>
          </view>
        </navigator>
      </view>
    </view>
    <view v-else class="no-data">
      <view v-if="isLogin">您还没有参加任何活动哦~</view>
      <view v-else>请先登录哦~</view>
    </view>
  </view>
</template>

<script>
import { _POST } from '../../libs/http';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      list: []
    };
  },
  onShow() {
    this.getList();
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    getList() {
      if (this.isLogin) {
        _POST('/activity/listActivity', {
          userId: this.isLogin
        }).then((res) => {
          if (res && res.code && res.code === 'S') {
            if (res && res.data && res.data.length > 0) {
              this.list = res.data;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.page-act-list {
  min-height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  .no-data {
    text-align: center;
    line-height: 400upx;
    color: #444;
    font-size: 32upx;
  }
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
