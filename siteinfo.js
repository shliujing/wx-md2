function e(e, i, t) {
    return i in e ? Object.defineProperty(e, i, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[i] = t, e;
}

var i, t = (i = {
    uniacid: "2",
    acid: "47"
}, e(i, "uniacid", "2"), e(i, "multiid", "0"), e(i, "version", "1.0"), e(i, "siteroot", "https://a.chinajinglu.com/app/index.php"), 
e(i, "design_method", "3"), i);

module.exports = t;