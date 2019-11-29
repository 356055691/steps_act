function _POST(url, params) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `https://daokeleague.mynatapp.cc/jibu-web${url}`,
      method: 'POST',
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        resolve(res.data);
      },
      fail(error) {
        uni.showToast({
          title: '接口异常，请稍后再试~~',
          icon: 'none',
          duration: 2000
        });
        reject(error);
      }
    });
  });
}

function _GET(url, params) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `https://daokeleague.mynatapp.cc/jibu-web${url}`,
      method: 'GET',
      data: params,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        resolve(res.data);
      },
      fail(error) {
        uni.showToast({
          title: '接口异常，请稍后再试~~',
          icon: 'none',
          duration: 2000
        });
        reject(error);
      }
    });
  });
}

export {
  _POST,
  _GET
};