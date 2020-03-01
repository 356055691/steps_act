<template>
  <view class="page-edit-adr">
    <input placeholder="请输入收货人姓名" v-model="contactName" />
    <input placeholder="请输入收货人电话" v-model="contactTel" />
    <div class="city-input">
      <input placeholder="请输入省市区" v-model="area" />
      <view class="cover" @tap="changeShow('QS_Picekr_city')"></view>
    </div>
    <input placeholder="请输入详细地址" v-model="address" />
    <view class="edit-btn" @tap="editFun">保存</view>
    <QSpicker
      type="city"
      ref="QS_Picekr_city"
      mode="bottom"
      top="200px"
      pickerId="city_1"
      :dataSet="citySet"
      showReset
      @confirm="confirm($event)"
    />
  </view>
</template>

<script>
import { _POST } from '../../libs/http';
import { mapState } from 'vuex';
import QSpicker from '@/components/QuShe-picker/QuShe-picker.vue';

export default {
  components: {
    QSpicker
  },
  data() {
    return {
      citySet: {
        defaultValue: [0, 0, 0]
      },
      contactName: '',
      contactTel: '',
      address: '',
      area: ''
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    changeShow(name) {
      this.$refs[name].show();
    },
    confirm(res) {
      if (res && res.data && res.data.label) {
        let city = res.data.label;
        city = city.replace(/[\-]/g, '');
        this.area = city;
      }
    },
    getUserInfo() {
      if (this.isLogin) {
        _POST('/address/query', {
          userId: this.isLogin
        }).then((res) => {
          if (res && res.code && res.code === 'Y') {
            if (res.data) {
              this.contactName = res.data.contact_name;
              this.contactTel = res.data.contact_tel;
              this.address = res.data.address;
              this.area = res.data.area;
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
    },
    editFun() {
      if (!this.isLogin) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 4000
        });
        return false;
      }
      if (!this.contactName || !this.contactTel || !this.address || !this.area) {
        uni.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 4000
        });
        return false;
      }
      if (!(/^1[34578]\d{9}$/.test(this.contactTel))) {
        uni.showToast({
          title: '手机格式不正确',
          icon: 'none',
          duration: 4000
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
        area: this.area,
        userId: this.isLogin
      }).then((res) => {
        uni.hideLoading();
        if (res && res.code && res.code === 'Y') {
          uni.showToast({
            title: '保存成功',
            duration: 4000
          });
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/mine/index'
            });
          }, 2000);
        } else {
          uni.showToast({
            title: res.msg || '保存失败',
            icon: 'none',
            duration: 4000
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
  .city-input {
    position: relative;
    .cover {
      width: 690upx;
      height: 80upx;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 9;
    }
  }
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
