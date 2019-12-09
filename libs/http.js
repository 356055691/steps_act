const baseUrl = 'https://www.tencentschool.com/jibu-web';
function _POST(url, params) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${url}`,
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

function _GET(url, params) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseUrl}${url}`,
      method: 'GET',
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
  _POST,
  _GET
};