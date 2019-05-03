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
    t.setData({
      url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.novabracelet"
    })
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