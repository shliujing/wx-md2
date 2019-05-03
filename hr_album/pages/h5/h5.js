var app = getApp();

Page({
    data: {
      url:""
    },
    onLoad: function(a) {
        var e = this;
        console.log(e);
        e.setData({
          url: a.url
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        var e = this;
        return {
            title: e.data.share.sharetitle,
            imageUrl: e.data.share.shareimg,
            path: "/hr_album/pages/show/show?id=" + e.data.id + "&type=show",
            success: function(a) {
                app.shareAction(e.data.id);
            }
        };
    },
    share: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/sharecon",
            method: "post",
            dataType: "json",
            data: {
                id: e.data.id
            },
            showLoading: !1,
            success: function(a) {
                app.Data.paydesc = a.data.paydesc, e.setData({
                    share: a.data
                });
            }
        });
    },
    album_click: function() {
        app.userclick(this.data.id);
    }
});