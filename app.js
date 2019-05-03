var _App;

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

App((_defineProperty(_App = {

    onLaunch: function() {},
    util: require("we7/util.js"),
    md5: require("we7/md5.js"),
    Data: {
        userInfo: null,
        config: null,
        getSystemInfo: null,
        paydesc: null,
        ver: 4.3
    },
  globalData: {
    baby: null,
    searchIndex: 0
  },
    onShow: function() {
        var t = this;
        wx.getStorageSync("deluser") && wx.navigateBack({
            delta: 10
        }), wx.onUserCaptureScreen(function(e) {
            t.Data.userInfo && t.updeluser(), wx.setStorageSync("deluser", "1"), wx.navigateBack({
                delta: 10
            });
        }), wx.getSystemInfo({
            success: function(e) {
                t.Data.getSystemInfo = e;
            }
        });
    },
    updeluser: function() {
        this.util.request({
            url: "entry/wxapp/updeluser",
            method: "post",
            dataType: "json",
            data: {
                openid: this.Data.userInfo.openid,
                status: 1
            },
            showLoading: !1,
            success: function(e) {}
        });
    },
    getUserInfo: function(a, s) {
        var o = this;
        wx.getStorageSync("deluser") && wx.navigateBack({
            delta: 10
        }), o.Data.userInfo ? (o.Data.userInfo.status && (wx.setStorageSync("deluser", "1"), 
        wx.navigateBack({
            delta: 10
        })), "function" == typeof a && a(o.Data.userInfo)) : wx.login({
            success: function(e) {
                var t = e.code, n = s.userInfo;
                n.code = t, o.util.request({
                    url: "entry/wxapp/member",
                    method: "post",
                    dataType: "json",
                    data: n,
                    showLoading: !1,
                    success: function(e) {
                        0 < e.data.status && (wx.setStorageSync("deluser", "1"), wx.navigateBack({
                            delta: 10
                        })), o.Data.userInfo = e.data, wx.setStorageSync("userInfo", e.data), "function" == typeof a && a(o.Data.userInfo);
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function(e) {
                        e.confirm && util.getUserInfo();
                    }
                });
            }
        });
    },
    upForm: function(e) {
        console.log(e), this.util.request({
            url: "entry/wxapp/upform",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                openid: this.Data.userInfo.openid,
                formid: e
            },
            success: function(e) {}
        });
    },
    getConfig: function(t) {
        var n = this;
        this.util.request({
            url: "entry/wxapp/setdata",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                ver: n.Data.ver
            },
            success: function(e) {
                n.Data.config = e.data, "function" == typeof t && t(n.Data.config);
            }
        });
    },
    shareAction: function(e) {
        this.util.request({
            url: "entry/wxapp/shareclick",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                uniacid: this.siteInfo.uniacid,
                id: e
            },
            success: function(e) {}
        });
    },
    redirect: function(e, t) {
        wx.navigateTo({
            url: "/hr_album/pages/" + e + "?" + t
        });
    },
    redirectTo: function(e, t) {
        wx.redirectTo({
            url: "/hr_album/pages/" + e + "?" + t
        });
    }
}, "shareAction", function(e) {
    this.util.request({
        url: "entry/wxapp/shareclick",
        method: "post",
        dataType: "json",
        showLoading: !1,
        data: {
            uniacid: this.siteInfo.uniacid,
            id: e
        },
        success: function(e) {}
    });
}), _defineProperty(_App, "userclick", function(e) {
    this.util.request({
        url: "entry/wxapp/userclick",
        method: "post",
        dataType: "json",
        showLoading: !1,
        data: {
            uniacid: this.siteInfo.uniacid,
            id: e
        },
        success: function(e) {}
    });
}), _defineProperty(_App, "siteInfo", require("siteinfo.js")), _App));