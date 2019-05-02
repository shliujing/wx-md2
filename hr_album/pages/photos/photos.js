var app = getApp();

Page({
  data: {
    message: ""
  },
  onLaunch: function() {
    console.log('App Launch')
  },

  onLoad: function(a) {
    console.log('App onLoad')
  },
  onReady: function() {
    console.log('App onReady')
  },
  onShow: function() {
    console.log('App onShow')
  },
  onShareAppMessage: function() {
    console.log('App onShareAppMessage')
  },
  onHide: function() {
    console.log('App Hide')
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