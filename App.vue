<script>
import { mapMutations } from 'vuex';

export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    uni.getStorage({
      key: 'USER_ID',
      success: (res) => {
        this.setLogin(res.data);
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
    })
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
</style>
