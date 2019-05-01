var app = getApp();

Page({
    data: {
        shared: 0
    },
    onLoad: function(a) {
        console.log(app.Data.config.llads), this.setData({
            id: a.id,
            shareimg: a.shareimg,
            sharetitle: a.sharetitle,
            avatar: a.avatar,
            llads: app.Data.config.llads
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.sharetitle,
            imageUrl: t.data.shareimg,
            path: "/hr_album/pages/show/show?id=" + t.data.id + "&type=show",
            success: function(a) {
                app.shareAction(t.data.id), wx.navigateBack({
                    delta: 1
                });
            }
        };
    },
    haibao: function() {
        wx.showLoading({
            mask: !0,
            title: "正在生成海报"
        }), this.getqrcode();
    },
    getqrcode: function() {
        var t = this;
        wx.downloadFile({
            url: app.util.url("entry/wxapp/qrcode", {
                m: "hr_album",
                id: t.data.id
            }),
            success: function(a) {
                200 === a.statusCode && t.setData({
                    getqrcode: a.tempFilePath
                }), t.getcardbg();
            }
        });
    },
    getcardbg: function() {
        var t = this, a = app.util.url("entry/wxapp/saveimg", {
            m: "hr_album",
            url: t.data.shareimg
        });
        wx.downloadFile({
            url: a,
            success: function(a) {
                t.setData({
                    thumb: a.tempFilePath
                }), console.log("ok"), t.gotobg();
            }
        });
    },
    gotobg: function() {
        var t = this, a = app.util.url("entry/wxapp/hbgimg", {
            m: "hr_album"
        });
        wx.downloadFile({
            url: a,
            success: function(a) {
                t.setData({
                    hbg: a.tempFilePath
                }), console.log("ok"), t.gotoshare();
            }
        });
    },
    gotoshare: function() {
        var t = this, a = t.data.thumb, e = t.data.getqrcode, i = t.data.hbg, o = wx.createCanvasContext("myCanvas");
        o.setFillStyle("white"), o.fillRect(0, 0, 400, 600), o.drawImage(a, 0, 50, 400, 600), 
        o.drawImage(i, 0, 0, 400, 600), o.setTextAlign("left"), o.setFontSize(18), o.setFillStyle("#111111"), 
        o.fillText(t.data.sharetitle, 10, 30), o.drawImage(e, 280, 450, 100, 100), o.clip(), 
        o.draw(!1, function(a) {
            t.saveimg();
        });
    },
    saveimg: function() {
        var t = this;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 400,
            height: 600,
            destWidth: 400,
            destHeight: 600,
            canvasId: "myCanvas",
            success: function(a) {
                t.setData({
                    shareImgSrc: a.tempFilePath,
                    shared: 1
                }), t.savelocal();
            },
            fail: function(a) {}
        });
    },
    savelocal: function() {
        wx.hideLoading(), wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImgSrc,
            success: function(a) {}
        });
    },
    closered: function() {
        this.setData({
            shared: 0
        });
    }
});