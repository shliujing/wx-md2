import Toast from '../../../dist/toast/toast';

var app = getApp();

Page({
  data: {
    navname: "user",
    comid: 0,
    num:""
  },
  onLoad: function(option) {
    console.log(option) //可以打印一下option看查看参数
    var t = this;
    if (option.page == 'user') {
      app.util.request({
        url: "entry/wxapp/getbaby",
        method: "post",
        showLoading: !1,
        dataType: "json",
        data: {
          openid: app.Data.userInfo.openid,
          avatar: app.Data.userInfo.avatarUrl,
          nickname: app.Data.userInfo.nickName,
          uniacid: app.siteInfo.uniacid
        },
        success: function(a) {
          if (a.data != false) {
            app.globalData.baby = a.data;
          }
        }
      });
    }
    if (wx.getSystemInfo({
        success: function(a) {
          t.setData({
            config: app.Data.config
          });
        }
      }), app.Data.userInfo) t.setData({
      userInfo: app.Data.userInfo,
      baby: app.globalData.baby,
    });
    else {
      var o = wx.getStorageSync("userInfo");
      o.openid ? (app.Data.userInfo = o, t.setData({
        userInfo: app.Data.userInfo
      })) : (t.setData({
        login: 1
      }), wx.hideTabBar({}));
    }
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  updateUserInfo: function(a) {
    var t = this;
    app.getUserInfo(function(a) {
      a && (t.setData({
        login: 0
      }), wx.showTabBar({}));
    }, a.detail);
  },
  chooseimg: function() {
    var o = this;
    wx.chooseImage({
      count: 9,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(a) {
        var t = a.tempFilePaths;
        o.setData({
          pics: t
        }), o.setData({
          loading: !0,
          text: "正在压缩图片"
        }), o.uploadimg({
          path: o.data.pics
        });
      }
    });
  },
  uploadimg: function(o) {
    var e = this,
      n = o.i ? o.i : 0,
      s = o.success ? o.success : 0,
      i = o.fail ? o.fail : 0,
      l = o.path[n];
    wx.getImageInfo({
      src: l,
      success: function(a) {
        if (800 < a.width || 1e3 < a.height) {
          var t = wx.createCanvasContext("myCanvas");
          1 < a.width / a.height ? (t.drawImage(l, 0, 0, 650, 500), t.draw(!1, function(a) {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 650,
              height: 500,
              destWidth: 650,
              destHeight: 500,
              canvasId: "myCanvas",
              fileType: "jpg",
              success: function(a) {
                console.log(a.tempFilePath + "横图"), wx.uploadFile({
                  url: app.util.url("entry/wxapp/upimg", {
                    m: "hr_album"
                  }),
                  filePath: a.tempFilePath,
                  name: "file",
                  formData: null,
                  success: function(a) {
                    s++, console.log(a.data), console.log(n), e.data.pics[n] = a.data;
                  },
                  fail: function(a) {
                    i++, console.log("fail:" + n + "fail:" + i);
                  },
                  complete: function() {
                    console.log(n), n++, e.setData({
                      text: "上传中 " + n + " / " + o.path.length
                    }), n == o.path.length ? (console.log("执行完毕"), console.log("成功：" + s + " 失败：" + i),
                      e.savephoto(), e.setData({
                        loading: !1
                      })) : (console.log(n), o.i = n, o.success = s, o.fail = i, e.uploadimg(o));
                  }
                });
              },
              fail: function(a) {}
            });
          })) : (t.drawImage(l, 0, 0, 640, 900), t.draw(!1, function(a) {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 640,
              height: 900,
              destWidth: 640,
              destHeight: 900,
              canvasId: "myCanvas",
              success: function(a) {
                console.log(a.tempFilePath + "竖图"), wx.uploadFile({
                  url: app.util.url("entry/wxapp/upimg", {
                    m: "hr_album"
                  }),
                  filePath: a.tempFilePath,
                  name: "file",
                  formData: null,
                  success: function(a) {
                    s++, console.log(a.data), console.log(n), e.data.pics[n] = a.data;
                  },
                  fail: function(a) {
                    i++, console.log("fail:" + n + "fail:" + i);
                  },
                  complete: function() {
                    console.log(n), n++, e.setData({
                      text: "上传中 " + n + " / " + o.path.length
                    }), n == o.path.length ? (console.log("执行完毕"), console.log("成功：" + s + " 失败：" + i),
                      e.savephoto(), e.setData({
                        loading: !1
                      })) : (console.log(n), o.i = n, o.success = s, o.fail = i, e.uploadimg(o));
                  }
                });
              },
              fail: function(a) {}
            });
          }));
        } else wx.uploadFile({
          url: app.util.url("entry/wxapp/upimg", {
            m: "hr_album"
          }),
          filePath: l,
          name: "file",
          formData: null,
          success: function(a) {
            s++, console.log(a.data), console.log(n), e.data.pics[n] = a.data;
          },
          fail: function(a) {
            i++, console.log("fail:" + n + "fail:" + i);
          },
          complete: function() {
            console.log(n), n++, e.setData({
              text: "上传中 " + n + " / " + o.path.length
            }), n == o.path.length ? (console.log("执行完毕"), console.log("成功：" + s + " 失败：" + i),
              e.savephoto(), e.setData({
                loading: !1
              })) : (console.log(n), o.i = n, o.success = s, o.fail = i, e.uploadimg(o));
          }
        });
      }
    });
  },
  savephoto: function() {
    app.util.request({
      url: "entry/wxapp/savedata",
      method: "post",
      dataType: "json",
      data: {
        pics: this.data.pics,
        openid: app.Data.userInfo.openid,
        avatar: app.Data.userInfo.avatarUrl,
        nickname: app.Data.userInfo.nickName,
        uniacid: app.siteInfo.uniacid
      },
      success: function(a) {
        app.redirect("show/show", "id=" + a.data.id + "&type=edit");
      }
    });
  },
  upform: function(a) {
    console.log(a.detail.formId), app.upForm(a.detail.formId);
  },
  pipei: function() {
    var b = this;

    if (b.data.num == null || b.data.num == "") {
      Toast.fail('请填写身份证编号');
      return
    }

    // ajax ，toast
    app.util.request({
      url: "entry/wxapp/pipei",
      showLoading: !1,
      method: "post",
      dataType: "json",
      data: {
        num: b.data.num,
        openid: app.Data.userInfo.openid,
        avatar: app.Data.userInfo.avatarUrl,
        nickname: app.Data.userInfo.nickName,
        uniacid: app.siteInfo.uniacid
      },
      success: function(a) {
        if (a.data != false) {
          app.globalData.baby = a.data;
          b.setData({
            baby : a.data
          });
          Toast.success('成功匹配');
        } else {
          Toast.fail('匹配失败，无该宝贝信息，请与学校老师联系！');
        }
      }
    });
  },
  fanhui: function(e) {
    // if (app.globalData.baby != null && app.globalData.baby.name != null) {
    //   wx.switchTab({
    //     url: '/hr_album/pages/user/user'
    //   })
    // } else {
    //   wx.switchTab({
    //     url: '/hr_album/pages/index/index'
    //   })
    // }
    wx.switchTab({
      url: '/hr_album/pages/index/index'
    })
  },
  onInput: function(e) {
    this.setData({
      num: e.detail
    })
  }
});