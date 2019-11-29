<template>
  <view class="page-act-list">
    <view class="title">获奖名单</view>
    <view class="tips">注：请获奖者保持电话畅通，店家将尽快与您取得联系哦</view>
    <view class="list-c">
      <view class="list-item" v-for="(item, index) in list" :key="index">
        <view class="num">{{ index + 1 }}</view>
        <view class="name">{{ item.contact_name }}</view>
        <view class="tel">{{ item.contact_tel }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { _GET } from '../../libs/http';

export default {
  data() {
    return {
      id: 0,
      list: []
    };
  },
  onLoad(option) {
    if (option) {
      this.id = option.id;
      this.getList();
    }
  },
  methods: {
    getList() {
      _GET('/address/list', {
        activityId: this.id
      }).then((res) => {
        if (res && res.code && res.code === 'Y') {
          this.list = res.data;
          this.list.forEach((val) => {
            val.contact_tel = val.contact_tel.substr(0, 3) + '****' + val.contact_tel.substr(7);  
          });
        } else {
          uni.showToast({
            title: '接口异常，请稍后再试~~',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-act-list {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #444;
  .title {
    line-height: 100upx;
    font-weight: bold;
    text-align: center;
    font-size: 34upx;
  }
  .tips {
    font-size: 24upx;
    color: red;
    padding: 0 30upx;
  }
  .list-c {
    padding: 30upx 0;
    .list-item {
      width: 750upx;
      height: 80upx;
      line-height: 80upx;
      background-color: #fff;
      font-size: 32upx;
      border-bottom: solid 1upx #f0f0f0;
      .num {
        width: 100upx;
        float: left;
        text-align: center;
      }
      .name {
        width: 300upx;
        float: left;
      }
      .tel {
        width: 350upx;
        float: left;
        text-align: center;
      }
    }
  }
}
</style>