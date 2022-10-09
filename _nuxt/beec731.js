(window.webpackJsonp = window.webpackJsonp || []).push([
    [53], {
        523: function(e, t, r) {
            var content = r(721);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, r(30).default)("01eb9d78", content, !0, {
                sourceMap: !1
            })
        },
        720: function(e, t, r) {
            "use strict";
            var o = r(523),
                n = r.n(o);
            r.d(t, "default", (function() {
                return n.a
            }))
        },
        721: function(e, t, r) {
            var o = r(29)(!1);
            o.push([e.i, '.wrapper_ot\\+f9{padding-top:.1px;padding-bottom:.1px;color:#fff}.containerShape_\\+VlUK{position:relative;padding:6.7rem 0;background-color:var(--shape-color)}.containerShape_\\+VlUK.__rectangle_8Swn2{padding:6.5rem 3rem}@media(min-width:64em){.containerShape_\\+VlUK.__rectangle_8Swn2{padding:8.5rem 6.5rem 8rem}}.containerShape_\\+VlUK.__slant_oG4Mn{padding:6.5rem 3rem 0;margin-bottom:8rem;background-color:transparent;border-top-left-radius:3.9rem;border-top-right-radius:3.9rem}@media(min-width:64em){.containerShape_\\+VlUK.__slant_oG4Mn{padding:8.5rem 6.5rem 0;margin-bottom:7.9rem}}.containerShape_\\+VlUK.__slant_oG4Mn:before{position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1;display:block;content:"";background-color:var(--shape-color);border-radius:inherit}@media(min-width:64em){.containerShape_\\+VlUK.__slant_oG4Mn:before{bottom:3rem}}.containerShape_\\+VlUK.__slant_oG4Mn:after{position:absolute;top:100%;right:0;left:8rem;z-index:-1;display:block;height:8rem;content:"";background-color:var(--shape-color);border-bottom-right-radius:3.9rem}@media(min-width:64em){.containerShape_\\+VlUK.__slant_oG4Mn:after{top:calc(100% - 3rem);right:10.9rem;left:0;height:10.9rem;border-bottom-right-radius:0;border-bottom-left-radius:3.9rem}}.slantShape_m9ECU{position:absolute;bottom:0;left:8rem;z-index:-1;width:0;height:0;background-color:var(--shape-color);transform:rotate(45deg)}@media(min-width:64em){.slantShape_m9ECU{right:10.9rem;bottom:3rem;left:auto}}.slantShape_m9ECU:after{position:absolute;display:block;width:13.5982756057rem;height:13.5982756057rem;content:"";background-color:inherit;border-radius:3.9rem;transform:translateX(-50%) translateY(-50%)}@media(min-width:64em){.slantShape_m9ECU:after{width:17.6994949366rem;height:17.6994949366rem}}.header_mPWY7>*,.preheader_LNYya>*,.subcopy_tUkCH>*{margin-right:auto;margin-left:auto}.preheader_LNYya{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem;margin-bottom:1.9rem;text-align:center}@media(min-width:48em){.preheader_LNYya{font-family:Lausanne,Arial,sans-serif;font-size:1.8rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem}}.header_mPWY7,.subcopy_tUkCH{text-align:center}.subcopy_tUkCH{margin-top:2.8rem}.link_M1u0f{margin-top:2.7rem;text-align:center}@media(min-width:48em){.link_M1u0f{margin-top:3.5rem}}', ""]), o.locals = {
                wrapper: "wrapper_ot+f9",
                containerShape: "containerShape_+VlUK",
                __rectangle: "__rectangle_8Swn2",
                __slant: "__slant_oG4Mn",
                slantShape: "slantShape_m9ECU",
                header: "header_mPWY7",
                preheader: "preheader_LNYya",
                subcopy: "subcopy_tUkCH",
                link: "link_M1u0f"
            }, e.exports = o
        },
        870: function(e, t, r) {
            "use strict";
            r.r(t);
            var o = r(13),
                n = {
                    inheritAttrs: !1,
                    props: {
                        n: {
                            type: Number,
                            required: !0
                        },
                        nType: {
                            type: Number,
                            default: 0
                        },
                        backgroundColor: {
                            type: String,
                            default: ""
                        },
                        backgroundShape: {
                            type: String,
                            default: ""
                        },
                        preheader: {
                            type: [String, Array],
                            default: ""
                        },
                        header: {
                            type: [String, Array],
                            default: ""
                        },
                        subcopy: {
                            type: [String, Array],
                            default: ""
                        },
                        buttonText: {
                            type: String,
                            default: ""
                        },
                        buttonLink: {
                            type: Object,
                            default: () => ({})
                        },
                        sectionId: {
                            type: String,
                            default: ""
                        }
                    },
                    computed: {
                        fullColor() {
                            return "Full" === this.backgroundShape ? this.$colors[Object(o.d)(this.backgroundColor)] : "transparent"
                        },
                        shapeColor() {
                            return "Full" !== this.backgroundShape ? this.$colors[Object(o.d)(this.backgroundColor)] : "transparent"
                        },
                        textColor() {
                            return "Primary Light" === this.backgroundColor ? this.$colors.primaryDark : this.$colors.white
                        },
                        linkHoverColor() {
                            return "Primary" === this.backgroundColor ? this.$colors.primaryDark : this.$colors.primary
                        }
                    }
                },
                l = r(720),
                d = r(5);
            var component = Object(d.a)(n, (function() {
                var e, t = this,
                    r = t.$createElement,
                    o = t._self._c || r;
                return o("BaseSpacing", {
                    attrs: {
                        "inner-space": "Full" === t.backgroundShape,
                        "no-padding": "",
                        bg: t.fullColor
                    }
                }, [o("BaseContainer", [o("div", {
                    class: t.$style.wrapper,
                    attrs: {
                        id: t.sectionId
                    }
                }, [o("div", {
                    class: [t.$style.containerShape, (e = {}, e[t.$style.__rectangle] = "Rectangle" === t.backgroundShape, e[t.$style.__slant] = "Slant" === t.backgroundShape, e)],
                    style: {
                        color: t.textColor,
                        "--shape-color": t.shapeColor,
                        "--button-link-simple-hover-color": t.linkHoverColor
                    }
                }, [t.$prismic.hasRichText(t.preheader) ? o("div", {
                    directives: [{
                        name: "rich-text",
                        rawName: "v-rich-text"
                    }],
                    class: t.$style.preheader,
                    domProps: {
                        innerHTML: t._s(t.preheader)
                    }
                }) : t._e(), t.$prismic.hasTitle(t.header) ? o("div", {
                    directives: [{
                        name: "rich-text",
                        rawName: "v-rich-text"
                    }],
                    class: t.$style.header,
                    domProps: {
                        innerHTML: t._s(t.header)
                    }
                }) : t._e(), t.$prismic.hasRichText(t.subcopy) ? o("div", {
                    directives: [{
                        name: "rich-text",
                        rawName: "v-rich-text"
                    }],
                    class: t.$style.subcopy,
                    domProps: {
                        innerHTML: t._s(t.subcopy)
                    }
                }) : t._e(), t.$prismic.hasUrl(t.buttonLink) && t.buttonText ? o("div", {
                    class: t.$style.link
                }, [o("BaseButtonLinkSimple", {
                    attrs: {
                        smart: t.buttonLink.url,
                        target: t.buttonLink.target,
                        size: "medium"
                    }
                }, [t._v(" " + t._s(t.buttonText) + " ")])], 1) : t._e(), "Slant" === t.backgroundShape ? o("div", {
                    class: t.$style.slantShape
                }) : t._e()])])])], 1)
            }), [], !1, (function(e) {
                this.$style = l.default.locals || l.default
            }), null, null);
            t.default = component.exports
        }
    }
]);