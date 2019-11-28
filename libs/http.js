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
        reject(error);
      }
    });
  });
}

export {
  _POST
};