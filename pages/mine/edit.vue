<template>
  <view class="page-edit-adr">
    <input placeholder="请输入收货人姓名" v-model="contactName" />
    <input placeholder="请输入收货人电话" v-model="contactTel" />
    <input placeholder="请输入收货人地址" v-model="address" />
    <view class="edit-btn" @tap="editFun">保存</view>
  </view>
</template>

<script>
import { _POST } from '../../libs/http';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      contactName: '',
      contactTel: '',
      address: ''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  methods: {
    editFun() {
      if (!this.isLogin) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      if (!this.contactName || !this.contactTel || !this.address) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      if (!(/^1[34578]\d{9}$/.test(this.contactTel))) {
        uni.showToast({
          title: '手机格式不正确',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
      uni.showLoading({
        title: '保存中'
      });
      _POST('/address/add', {
        contactName: this.contactName,
        contactTel: this.contactTel,
        address: this.address,
        userId: this.isLogin
      }).then((res) => {
        if (res && res.code && res.code === 'Y') {
          uni.hideLoading();
          uni.showToast({
            title: '保存成功',
            duration: 2000
          });
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/mine/index'
            });
          }, 2000);
        } else {
          uni.showToast({
            title: '保存失败',
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
    margin-bottom: 20upx;
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
    bottom: 100upx;
    left: 30upx;
    right: 30upx;
  }
}
</style>
