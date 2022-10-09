(window.webpackJsonp = window.webpackJsonp || []).push([
    [38], {
        441: function(e, t, n) {
            var content = n(459);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(30).default)("823af1a4", content, !0, {
                sourceMap: !1
            })
        },
        455: function(e, t, n) {
            "use strict";
            n.r(t);
            var l = n(33),
                c = {
                    computed: { ...Object(l.c)({
                            other: e => e.globalData.other
                        }),
                        show() {
                            return this.$prismic.hasUrl(this.other.accessibilityStatementLink) && Boolean(this.other.accessibilityStatementLinkLabel)
                        }
                    }
                },
                o = n(458),
                r = n(5);
            var component = Object(r.a)(c, (function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return e.show ? n("div", [n("div", {
                    class: e.$style.accessibilityStatementLink
                }, [n("div", {
                    class: e.$style.accessibilityStatementLinkInner
                }, [n("BaseButton", {
                    attrs: {
                        smart: e.other.accessibilityStatementLink.url,
                        target: e.other.accessibilityStatementLink.target
                    }
                }, [e._v(" " + e._s(e.other.accessibilityStatementLinkLabel) + " ")])], 1)])]) : e._e()
            }), [], !1, (function(e) {
                this.$style = o.default.locals || o.default
            }), null, null);
            t.default = component.exports
        },
        458: function(e, t, n) {
            "use strict";
            var l = n(441),
                c = n.n(l);
            n.d(t, "default", (function() {
                return c.a
            }))
        },
        459: function(e, t, n) {
            var l = n(29)(!1);
            l.push([e.i, ".accessibilityStatementLink_\\+6URc{position:relative;flex:0 0 0;width:0}.accessibilityStatementLinkInner_7PbI6{position:absolute;top:4rem;left:2rem;z-index:1;display:flex;width:auto;min-width:20rem}.accessibilityStatementLinkInner_7PbI6:not(:focus-within){clip:rect(1px,1px,1px,1px);-webkit-clip-path:inset(1px 1px 1px 1px);clip-path:inset(1px 1px 1px 1px);height:1px;overflow:hidden;pointer-events:none;position:absolute;width:1px}", ""]), l.locals = {
                accessibilityStatementLink: "accessibilityStatementLink_+6URc",
                accessibilityStatementLinkInner: "accessibilityStatementLinkInner_7PbI6"
            }, e.exports = l
        },
        512: function(e, t, n) {
            var content = n(699);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(30).default)("77c0c074", content, !0, {
                sourceMap: !1
            })
        },
        698: function(e, t, n) {
            "use strict";
            var l = n(512),
                c = n.n(l);
            n.d(t, "default", (function() {
                return c.a
            }))
        },
        699: function(e, t, n) {
            var l = n(29)(!1);
            l.push([e.i, ".header_ZYDTo{justify-content:space-between;padding:1rem 1.5rem;border-bottom:.1rem solid #e0e2e2}.checkoutText_eq4zc,.header_ZYDTo{display:flex;align-items:center}.checkoutText_eq4zc{font-family:Lausanne,Arial,sans-serif;font-size:1.7rem;font-weight:300;line-height:2.5rem;letter-spacing:-.01rem}.logoLinkAg_T0YTs{font-size:3.5rem}.iconWrapper_5Kggg{margin-left:.8rem;font-size:1.56rem}", ""]), l.locals = {
                header: "header_ZYDTo",
                checkoutText: "checkoutText_eq4zc",
                logoLinkAg: "logoLinkAg_T0YTs",
                iconWrapper: "iconWrapper_5Kggg"
            }, e.exports = l
        },
        861: function(e, t, n) {
            "use strict";
            n.r(t);
            var l = n(33),
                c = n(7),
                o = {
                    inheritAttrs: !1,
                    computed: { ...Object(l.c)(["language"]),
                        ...Object(l.c)({
                            otherData: e => e.globalData.other
                        }),
                        homeLink() {
                            return `/${c.b[this.language]}`
                        },
                        globalCheckout() {
                            return this.$store.getters.globalData.checkout
                        }
                    }
                },
                r = n(698),
                h = n(5);
            var component = Object(h.a)(o, (function() {
                var e = this,
                    t = e.$createElement,
                    n = e._self._c || t;
                return n("header", {
                    class: e.$style.header
                }, [n("div", [n("GlobalAccessibilityStatementLink"), n("BaseLink", {
                    class: e.$style.logoLinkAg,
                    attrs: {
                        smart: e.homeLink,
                        "aria-label": e.otherData.logoLinkAccessibilityLabel,
                        "data-tracking-id": "header-checkout-logo"
                    }
                }, [n("BaseIcon", {
                    attrs: {
                        name: "logo-ag",
                        rectangle: !1
                    }
                })], 1)], 1), n("div", {
                    class: e.$style.checkoutText
                }, [e.globalCheckout.headerText ? n("p", [e._v(e._s(e.globalCheckout.headerText))]) : e._e(), n("div", {
                    class: e.$style.iconWrapper
                }, [n("BaseIcon", {
                    attrs: {
                        name: "lock",
                        rectangle: !1
                    }
                })], 1)])])
            }), [], !1, (function(e) {
                this.$style = r.default.locals || r.default
            }), null, null);
            t.default = component.exports;
            installComponents(component, {
                GlobalAccessibilityStatementLink: n(455).default
            })
        }
    }
]);