import Toast from '../../../dist/toast/toast';

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    current: 0,
    animationData: {},
    animationData2: {}
  },
  onLoad: function(options) {
    var t = this;
    var classify = options.classify;
    var schoolid = options.schoolid;
    var searchIndex = options.searchIndex;
    app.util.request({
      url: "entry/wxapp/getclassify",
      method: "post",
      showLoading: !1,
      dataType: "json",
      data:{
        classify: classify,
        openid: wx.getStorageSync('openid'),
        page: 1,
        schoolid: schoolid,
        searchIndex: searchIndex,
      },
      success: function (a) {
        if(!a) return 0;
        t.setData({
          imgUrls: a.data
        });
      }
    });
    this.stretch(250)
  },
  change(e) {
    this.setData({
      current: e.detail.current
    })
    this.stretch(250)
    this.shrink(200)
  },
  // 收缩
  stretch(h) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(h).step()
    this.setData({
      animationData: animation.export(),
    })
  },
  // 展开
  shrink(h) {
    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation2 = animation2
    animation2.height(h).step()
    this.setData({
      animationData2: animation2.export()
    })
  },
})