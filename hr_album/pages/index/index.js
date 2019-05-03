var app = getApp();

Page({
  data: {
    navname: "index",
    page: 1,
    searchIndex: 0,
    scrollTop: 0,
    hotlist: [],
    indicatorDots: !0,
    autoplay: !0,
    interval: 5e3,
    duration: 1e3
  },
  onLoad: function(a) {
    this.getads(), this.setData({
      screenHeight: app.Data.getSystemInfo.screenHeight
    });
  },
  onReady: function() {
    //wx.hideTabBar({});
  },
  onShow: function() {
    var t = this;
    app.getConfig(function(a) {
      t.setData({
        review: app.Data.config.review,
        imgurl: app.Data.config.imgurl,
        kfbg: app.Data.config.kfbg,
        llads: app.Data.config.llads,
        iskf: app.Data.config.iskf,
        list_style: app.Data.config.list_style
      }), 1 == app.Data.config.review ? (wx.hideTabBar(), t.getrlist()) : 2 == app.Data.config.review ? (t.aclist(),
        wx.hideTabBar()) : t.getpics(), wx.setNavigationBarTitle({
        title: app.Data.config.spacename
      });
    });
  },
  onHide: function() {},
  onUnload: function() {},
  onShareAppMessage: function() {
    return {
      imageUrl: this.data.userInfo.imgurl + this.data.userInfo.sharepic,
      path: "/hr_album/pages/index/index"
    };
  },
  aclist: function() {
    var t = this;
    app.util.request({
      url: "entry/wxapp/aclist",
      method: "post",
      dataType: "json",
      success: function(a) {
        t.setData({
          aclist: a.data
        });
      }
    });
  },
  tap_item: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/hr_album/pages/zhufu/zhufu?id=" + t
    });
  },
  getads: function() {
    var t = this;
    app.util.request({
      url: "entry/wxapp/adslist",
      method: "post",
      dataType: "json",
      showLoading: !1,
      success: function(a) {
        t.setData({
          ads: a.data
        });
      }
    });
  },
  getpics: function() {
    var e = this;
    var openid = wx.getStorageSync('openid');
    var baby = wx.getStorageSync('baby');
    var schoolid = 0;
    if (baby) {
      schoolid = baby.schoolid;
    }
    var searchIndex = e.data.searchIndex;

    app.util.request({
      url: "entry/wxapp/homelist",
      method: "post",
      dataType: "json",
      showLoading: !1,
      data: {
        page: e.data.page,
        schoolid: schoolid,
        searchIndex: searchIndex,
        openid: openid
      },
      success: function(a) {
        if (!a) return !1;
        if (0 < a.data.length)
          if (1 == this.data.page) e.setData({
            hotlist: a.data
          });
          else {
            var t = e.data.hotlist = e.data.hotlist.concat(a.data);
            e.setData({
              hotlist: t
            });
          }
      }
    });
  },
  tapSelectResource: function e(a) {
    var e = this;
    // var openid = wx.getStorageSync('openid');
    var x = a.currentTarget.dataset.index;
    // var baby = wx.getStorageSync('baby');
    this.setData({
      searchIndex: x,
      page : 1
    });
    app.globalData.searchIndex = x;
    e.getpics();
    // var schoolid = 0;
    // if (baby) {
    //   schoolid = baby.schoolid;
    // }

    // app.util.request({
    //   url: "entry/wxapp/homelist",
    //   method: "post",
    //   dataType: "json",
    //   showLoading: !1,
    //   data: {
    //     page: 1,
    //     searchIndex: x,
    //     schoolid: schoolid,
    //     openid: openid
    //   },
    //   success: function(a) {
    //     if (!a) return !1;
    //     if (0 < a.data.length)
    //       if (1 == this.data.page) e.setData({
    //         hotlist: a.data
    //       });
    //       else {
    //         var t = e.data.hotlist = e.data.hotlist.concat(a.data);
    //         e.setData({
    //           hotlist: t
    //         });
    //       }
    //   }
    // });
  },
  getrlist: function() {
    var t = this;
    app.util.request({
      url: "entry/wxapp/getrlist",
      method: "post",
      dataType: "json",
      showLoading: !1,
      success: function(a) {
        0 < a.data.length && t.setData({
          relist: a.data
        });
      }
    });
  },
  scrolltolower: function() {
    ++this.data.page, this.getpics();
  },
  showAlbum: function(a) {
    var t = a.currentTarget.dataset.id;
    // console.log(t), app.redirect("show/show", "id=" + t + "&type=show");
    // todo 跳转到相册，参考美女列表 console.log(t), app.redirect("show/show", "id=" + t + "&type=show");
  },
  formSubmit: function(a) {
    console.log(a.detail.formId), app.upForm(a.detail.formId);
  },
  hdGoto: function(a) {
    var t = a.currentTarget.dataset.id,
      e = this.data.ads[t];
    1 == e.type ? wx.navigateTo({
      url: "/hr_album/pages/web/index?url=" + escape(e.path)
    }) : wx.navigateToMiniProgram({
      appId: e.appid,
      extraData: {
        foo: "bar"
      },
      envVersion: "develop",
      success: function(a) {}
    });
  },
  imgview: function(a) {
    var t = a.currentTarget.dataset.img;
    wx.previewImage({
      current: t,
      urls: [t]
    });
  }
});