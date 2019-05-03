var app = getApp();

Page({
  data: {
    navname: "user",
    comid: 0,
    userInfo: '',
    baby: ''
  },
  onLoad: function() {
    var a = this;
    wx.getSystemInfo({
      success: function(t) {
        a.data.config || app.getConfig(function(t) {
          a.setData({
            config: t
          }), wx.setNavigationBarTitle({
            title: app.Data.config.spacename
          });
        }), a.setData({
          wWith: t.windowWidth,
          wHeight: t.windowHeight
        });
      }
    });
  },
  onReady: function() {
  },
  onShow: function() {
    var t = this;
    if (app.Data.userInfo) t.setData({
      userInfo: app.Data.userInfo
    }), t.piclist(),  t.showfee();
    else {
      var a = wx.getStorageSync("userInfo");
      a.openid ? (app.Data.userInfo = a, t.setData({
        userInfo: app.Data.userInfo
      }), t.piclist(), t.showfee()) : (t.setData({
        login: 1
      }), wx.hideTabBar({}));
    };
    t.getbaby();
  },
  piclist: function() {
    var a = this;
    app.util.request({
      url: "entry/wxapp/piclist",
      method: "post",
      dataType: "json",
      showLoading: !1,
      data: {
        openid: a.data.userInfo.openid,
        uniacid: app.siteInfo.uniacid
      },
      success: function(t) {
        t.data[0].id && a.setData({
          plist: t.data
        });
      }
    });
  },
  updateUserInfo: function(t) {
    var a = this;
    app.getUserInfo(function(t) {
      t && (a.setData({
        userInfo: t,
        login: 0
      }), a.piclist(), a.showfee(), wx.showTabBar({}));
    }, t.detail);
    wx.switchTab({
      url: '/hr_album/pages/index/index'
    })
  },
  gotoshare: function(t) {
    var a = t.currentTarget.dataset.id,
      e = t.currentTarget.dataset.title,
      s = t.currentTarget.dataset.thumb;
    wx.navigateTo({
      url: "/hr_album/pages/user/save?pid=" + a + "&thumb=" + s + "&title=" + e
    });
  },
  goshare: function(t) {
    var e = this,
      s = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.isshow,
      o = this.data.plist,
      i = [];
    app.util.request({
      url: "entry/wxapp/shareset",
      method: "post",
      dataType: "json",
      data: {
        openid: app.Data.userInfo.openid,
        id: s,
        isshow: a
      },
      success: function(t) {
        if (t.data.success) {
          for (var a = 0; a < o.length; a++) o[a].id == s && (o[a].isshow = t.data.isshow),
            i.push(o[a]);
          e.setData({
            plist: i
          }), 0 < t.data.isshow ? wx.showToast({
            title: "发表成功",
            icon: "success",
            mask: !0,
            duration: 2e3
          }) : wx.showToast({
            title: "操作成功",
            icon: "success",
            mask: !0,
            duration: 2e3
          });
        } else wx.showToast({
          title: "发表失败",
          icon: "success",
          duration: 2e3
        });
      }
    });
  },
  delClick: function(t) {
    var e = this,
      s = t.currentTarget.dataset.id,
      o = this.data.plist,
      i = [];
    wx.showModal({
      title: "确定要删除相册么",
      content: "删除后相册将无法打开且无法恢复",
      confirmText: "删除",
      cancelText: "保留",
      success: function(t) {
        t.confirm ? app.util.request({
          url: "entry/wxapp/delphoto",
          method: "post",
          dataType: "json",
          data: {
            openid: app.Data.userInfo.openid,
            id: s
          },
          success: function(t) {
            for (var a = 0; a < o.length; a++) o[a].id != s && i.push(o[a]);
            e.setData({
              plist: i
            });
          }
        }) : t.cancel;
      }
    });
  },
  showcard: function(t) {
    var a = t.currentTarget.dataset.id;
    app.redirect("show/show", "id=" + a + "&type=show");
  },
  subClick: function(t) {
    var a = t.currentTarget.dataset.id;
    app.redirect("show/show", "id=" + a + "&type=edit");
  },
  onShareAppMessage: function(t) {
    return {
      imageUrl: this.data.userInfo.imgurl + this.data.userInfo.sharepic,
      path: "/hr_album/pages/user/user"
    };
  },
  goto_fromid: function(t) {
    console.log(t.detail.formId), app.upForm(t.detail.formId), app.redirect("user/cash", "&fee=" + this.data.fee);
  },
  upform: function(t) {
    console.log(t.detail.formId), app.upForm(t.detail.formId);
  },
  showfee: function() {
    var e = this,
      t = e.data.userInfo.openid;
    app.util.request({
      url: "entry/wxapp/getfee",
      method: "post",
      dataType: "json",
      showLoading: !1,
      data: {
        openid: t
      },
      success: function(t) {
        var a = t.data.fee;
        e.setData({
          fee: a
        });
      }
    });
  },

  goto_app: function(t) {
    console.log(t.detail.formId), app.upForm(t.detail.formId), wx.navigateTo({
      url: "/hr_album/pages/user/app"
    });
  },

  getbaby: function() {
    var t = this;
    if (app.Data.userInfo == null || app.Data.userInfo.openid == null) return;
    app.util.request({
      url: "entry/wxapp/getbaby",
      showLoading: !1,
      method: "post",
      dataType: "json",
      data: {
        openid: app.Data.userInfo.openid,
        avatar: app.Data.userInfo.avatarUrl,
        nickname: app.Data.userInfo.nickName,
        uniacid: app.siteInfo.uniacid
      },
      success: function(a) {
        if (a.data != false) {
          t.setData({
            baby: a.data
          });
          app.globalData.baby = a.data;
        }else{
          t.systems();
        }
      }
    })
  },
  systems: function(e) {
    var t = this;
    wx.navigateTo({
      url: "/hr_album/pages/info/info?page=user", //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
      success: function() {}, //成功后的回调；
      fail: function() {}, //失败后的回调；
      complete: function() {} //结束后的回调(成功，失败都会执行)
    });
  }
});