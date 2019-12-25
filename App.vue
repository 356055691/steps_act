<script>
import { mapMutations } from 'vuex';
import { _POST } from './libs/http';

export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    uni.getStorage({
      key: 'USER_ID',
      success: (res) => {
        this.autoLogin();
        // this.setLogin(res.data);
      },
      fail: (error) => {
        uni.clearStorage();
      }
    });
    uni.getStorage({
      key: 'USER_INFO',
      success: (res) => {
        this.setUser(res.data);
      },
      fail: (error) => {
        uni.clearStorage();
      }
    });
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    ...mapMutations({
      setLogin: 'setLogin',
      setUser: 'setUser'
    }),
    autoLogin() {
      uni.showLoading({
        title: '自动登录中'
      });
      uni.login({
        success: (res) => {
          if (res.code) {
            _POST('/login/login', {
              code: res.code
            }).then((res) => {
              if (res && res.code && res.code === 'Y') {
                uni.setStorage({
                  key: 'USER_ID',
                  data: res.userId,
                  success: () => {
                    this.setLogin(res.userId);
                    uni.hideLoading();
                  }
                });
              }
            });
          } else {
            uni.showToast({
              title: '自动登录失败，请手动退出再登录',
              icon: 'none',
              duration: 4000
            });
          }
        }
      });
    }
  }
};
</script>

<style>
page {
  width: 100%;
  height: 100%;
  max-width: 750upx;
  margin: 0 auto;
  position: relative;
}
view {
  box-sizing: border-box;
}
.eps-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
