var app = getApp();

Page({
  data: {
    message: "",
    url: ""
  },
  onLaunch: function() {
    console.log('App Launch');
  },

  onLoad: function(a) {
    console.log('App onLoad');
    var t = this;
    // t.setData({
    //   url: "https://appr76lorax3099.h5.xiaoeknow.com"
    // })
    var url1 = "https://appr76lorax3099.h5.xiaoeknow.com";
    wx.navigateTo({
      url: "/hr_album/pages/h5/h5?url="+url1, //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success: function() {}, //成功后的回调；
      fail: function() {}, //失败后的回调；
      complete: function() {} //结束后的回调(成功，失败都会执行)
    });
  },
  onReady: function() {
    console.log('App onReady');
  },
  onShow: function() {
    console.log('App onShow');
  },
  onShareAppMessage: function() {
    console.log('App onShareAppMessage');
  },
  onHide: function() {
    console.log('App Hide');
  },
  setMini: function(e) {
    wx.navigateToMiniProgram({
      appId: 'wxfbeed0e33382ff43',
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }

    });

  }

})