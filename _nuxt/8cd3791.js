(window.webpackJsonp = window.webpackJsonp || []).push([
    [25], {
        440: function(e, t, o) {
            var content = o(450);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, o(30).default)("ff348268", content, !0, {
                sourceMap: !1
            })
        },
        447: function(e, t, o) {
            "use strict";
            o.r(t);
            const n = e => window.getComputedStyle(e).transform;
            var l = {
                    props: {
                        time: {
                            type: [String, Number],
                            default: "0.3"
                        }
                    },
                    methods: {
                        transitionEnd() {
                            this.doneCallback && (this.doneCallback(), this.doneCallback = null);
                            const {
                                content: content
                            } = this.$refs;
                            content && (content.style.height = "", content.style.overflow = "")
                        },
                        enter(e, t) {
                            const {
                                content: content
                            } = this.$refs;
                            this.direction = "OPEN", content.style.height = "0", content.style.overflow = "hidden", n(content), this.doneCallback = t, content.scrollHeight > 0 ? content.style.height = `${content.scrollHeight}px` : this.transitionEnd()
                        },
                        leave(e, t) {
                            const {
                                content: content
                            } = this.$refs;
                            this.direction = "CLOSE", content.style.height = `${content.scrollHeight}px`, n(content), content.style.height = "0", content.style.overflow = "hidden", this.doneCallback = t
                        }
                    }
                },
                r = o(449),
                c = o(5);
            var component = Object(c.a)(l, (function() {
                var e = this,
                    t = e.$createElement,
                    o = e._self._c || t;
                return o("div", {
                    ref: "content",
                    class: e.$style.content,
                    style: {
                        transitionDuration: e.time + "s"
                    },
                    on: {
                        transitionend: e.transitionEnd
                    }
                }, [o("transition", {
                    attrs: {
                        css: !1
                    },
                    on: {
                        enter: e.enter,
                        leave: e.leave
                    }
                }, [e._t("default")], 2)], 1)
            }), [], !1, (function(e) {
                this.$style = r.default.locals || r.default
            }), null, null);
            t.default = component.exports
        },
        449: function(e, t, o) {
            "use strict";
            var n = o(440),
                l = o.n(n);
            o.d(t, "default", (function() {
                return l.a
            }))
        },
        450: function(e, t, o) {
            var n = o(29)(!1);
            n.push([e.i, ".content_oEy4a{height:auto;transition:height 1s}", ""]), n.locals = {
                content: "content_oEy4a"
            }, e.exports = n
        },
        505: function(e, t, o) {
            var content = o(685);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, o(30).default)("a1c695bc", content, !0, {
                sourceMap: !1
            })
        },
        506: function(e, t, o) {
            var content = o(687);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, o(30).default)("e18666fc", content, !0, {
                sourceMap: !1
            })
        },
        684: function(e, t, o) {
            "use strict";
            var n = o(505),
                l = o.n(n);
            o.d(t, "default", (function() {
                return l.a
            }))
        },
        685: function(e, t, o) {
            var n = o(29)(!1);
            n.push([e.i, ".footer_fe8Cm{background-color:#002f30}.footerMenus_4ciXa{padding:4.3rem 0 0}@media(min-width:48em){.footerMenus_4ciXa{padding:8rem 0 4rem;border-bottom:1px solid #fff}}.topWrapper_pJnK3{display:flex;flex-direction:column-reverse}@media(min-width:48em){.topWrapper_pJnK3{flex-direction:row}}@media(min-width:48em){.menuSets_krRz8{flex:1 1 auto}}@media(min-width:64em){.menuSets_krRz8{display:flex}}.footerMenuSet_xG9RU{width:100%}@media(min-width:48em){.footerMenuSet_xG9RU{margin-right:6rem}}@media(min-width:48em){.signupAndSocial_A1Uvk{padding-left:15rem}}@media(min-width:64em){.signupAndSocial_A1Uvk{padding-left:0;margin:0 auto;border-bottom:none}}.socialIconsDesktop_Rh3cC{display:none;justify-content:flex-start;margin:1.5rem -1.3rem 1.3rem;list-style:none}@media(min-width:64em){.socialIconsDesktop_Rh3cC{display:flex}}.socialIcon_WZmr8{font-size:2rem;color:#fff}.socialLink_KIaN0{display:block;padding:1rem 1.3rem}.horizontalBar_T6iMe{height:.1rem;margin:0 .5rem;background:#fff}@media(min-width:48em){.horizontalBar_T6iMe{display:none}}@media(min-width:64em){.socialLogoOptionsMobile_Y6Q47{display:none}}.socialLogoMobile_f87oW{padding-bottom:3.3rem;text-align:center;border-bottom:.1rem solid #fff}.socialIcons_f6Aeg{display:flex;justify-content:center;margin:3rem auto 3.2rem;list-style:none}@media(min-width:64em){.socialIcons_f6Aeg{display:none}}.footerLogoContainer_2VWhl{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem}@media(min-width:64em){.footerLogoContainer_2VWhl{margin-bottom:0}}.footerLogoMobile_2yrLJ{margin:0 auto;font-size:12rem;color:#fff}.copyRightText_T5c2r{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:300;line-height:1.9rem;letter-spacing:-.008rem;margin-top:1.5rem;color:#fff}@media(max-width:63.99em){.copyRightText_T5c2r.__hideMobile_hYKyP{display:none}}.selectorsWrapperMobile_txnso{padding-top:4rem;padding-bottom:3.7rem;text-align:center;border-bottom:.1rem solid #fff}.selectorsContainer_OKmwJ{display:flex;flex-wrap:wrap;justify-content:center;margin:0 -1rem -2rem}.selectorsContainer_OKmwJ.__desktop_RE-BX{flex-wrap:nowrap}@media(max-width:63.99em){.selectorsContainer_OKmwJ.__desktop_RE-BX{display:none}}.selectorContainer_P5\\+25{padding:0 1rem 2rem}.bottom_t5cNo{font-family:Lausanne,Arial,sans-serif;font-size:1.2rem;font-weight:300;line-height:1.6rem;letter-spacing:-.007rem;padding:2.5rem 0;color:#fff;border-bottom:none}@media(min-width:48em){.bottom_t5cNo{padding:3.5rem 0 0;border-bottom:1px solid #fff}}.footerLogo_pqf1b{display:none;padding-top:.5rem;margin-right:4rem;margin-left:0;font-size:12rem}@media(min-width:64em){.footerLogo_pqf1b{display:block}}.bottomRight_bnGeh{display:flex;flex:1 1 auto;justify-content:space-between}.bottomRightCenter_ztFux{width:100%}@media(min-width:64em){.bottomRightCenter_ztFux{max-width:67rem;padding-right:5rem}}@media(min-width:64em){.legalStatementWrapper_3pw8Z{min-height:11rem}}.legalStatementWrapper_3pw8Z:not(:empty){margin-bottom:3.2rem}@media(min-width:48em){.legalStatementWrapper_3pw8Z:not(:empty){margin-bottom:2.3rem}}.legalStatement_bSYG3{font-family:Lausanne,Arial,sans-serif;font-size:1.2rem;font-weight:300;line-height:1.6rem;letter-spacing:-.007rem;max-width:103.3rem;text-align:center}@media(min-width:64em){.legalStatement_bSYG3{text-align:left}}.legalStatement_bSYG3.__box_l68KR{padding:.5rem 1rem 1rem;margin:0 -1rem;border:.1rem solid #fff}@media(min-width:48em){.legalStatement_bSYG3.__box_l68KR{padding:.5rem 1rem;margin:0}}.legalStatement_bSYG3:not(:last-child){margin-bottom:.6rem}@media(min-width:48em){.legalStatement_bSYG3:not(:last-child){margin-bottom:1.2rem}}.dropDownAndCopy_1MdJ8{display:flex;flex-flow:column;align-items:flex-end;justify-content:space-between;padding-bottom:2.5rem}", ""]), n.locals = {
                footer: "footer_fe8Cm",
                footerMenus: "footerMenus_4ciXa",
                topWrapper: "topWrapper_pJnK3",
                menuSets: "menuSets_krRz8",
                footerMenuSet: "footerMenuSet_xG9RU",
                signupAndSocial: "signupAndSocial_A1Uvk",
                socialIconsDesktop: "socialIconsDesktop_Rh3cC",
                socialIcon: "socialIcon_WZmr8",
                socialLink: "socialLink_KIaN0",
                horizontalBar: "horizontalBar_T6iMe",
                socialLogoOptionsMobile: "socialLogoOptionsMobile_Y6Q47",
                socialLogoMobile: "socialLogoMobile_f87oW",
                socialIcons: "socialIcons_f6Aeg",
                footerLogoContainer: "footerLogoContainer_2VWhl",
                footerLogoMobile: "footerLogoMobile_2yrLJ",
                copyRightText: "copyRightText_T5c2r",
                __hideMobile: "__hideMobile_hYKyP",
                selectorsWrapperMobile: "selectorsWrapperMobile_txnso",
                selectorsContainer: "selectorsContainer_OKmwJ",
                __desktop: "__desktop_RE-BX",
                selectorContainer: "selectorContainer_P5+25",
                bottom: "bottom_t5cNo",
                footerLogo: "footerLogo_pqf1b",
                bottomRight: "bottomRight_bnGeh",
                bottomRightCenter: "bottomRightCenter_ztFux",
                legalStatementWrapper: "legalStatementWrapper_3pw8Z",
                legalStatement: "legalStatement_bSYG3",
                __box: "__box_l68KR",
                dropDownAndCopy: "dropDownAndCopy_1MdJ8"
            }, e.exports = n
        },
        686: function(e, t, o) {
            "use strict";
            var n = o(506),
                l = o.n(n);
            o.d(t, "default", (function() {
                return l.a
            }))
        },
        687: function(e, t, o) {
            var n = o(29)(!1);
            n.push([e.i, ".footerMenuSet_9augR{display:none;flex-direction:column}@media(min-width:64em){.footerMenuSet_9augR{display:flex}}.footerMenuParent_CY3R-{list-style:none}.footerMenuTitle_OX5NI{color:#fff;font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem}.footerMenuItems_YsmHp{margin-top:1.4rem}.footerMenuItemTitle_ZMqar{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:300;line-height:1.9rem;letter-spacing:-.008rem;color:#fff;text-decoration:none}.footerMenuItemTitle_ZMqar:hover{color:#2f7d39}.mobileFooterMenuSet_vJn3s{display:flex;flex-direction:column;padding:2rem 0;color:#fff;border-top:.1rem solid #fff}@media(min-width:64em){.mobileFooterMenuSet_vJn3s{display:none}}.label_pXCjl{font-family:Lausanne,Arial,sans-serif;font-size:1.8rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem;display:flex;align-items:center;justify-content:space-between;text-decoration:none}.infoContentIcons_2ZAsj{font-size:.4em}.marginTop_P4OMU{margin-top:1.2rem}.expandContainer_A3FfZ{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:300;line-height:1.9rem;letter-spacing:-.008rem;margin:.7rem 0}", ""]), n.locals = {
                footerMenuSet: "footerMenuSet_9augR",
                footerMenuParent: "footerMenuParent_CY3R-",
                footerMenuTitle: "footerMenuTitle_OX5NI",
                footerMenuItems: "footerMenuItems_YsmHp",
                footerMenuItemTitle: "footerMenuItemTitle_ZMqar",
                mobileFooterMenuSet: "mobileFooterMenuSet_vJn3s",
                label: "label_pXCjl",
                infoContentIcons: "infoContentIcons_2ZAsj",
                marginTop: "marginTop_P4OMU",
                expandContainer: "expandContainer_A3FfZ"
            }, e.exports = n
        },
        845: function(e, t, o) {
            "use strict";
            o.r(t);
            var n = {
                    props: {
                        title: {
                            type: String,
                            default: ""
                        },
                        index: {
                            type: Number,
                            default: null
                        },
                        items: {
                            type: Array,
                            default: () => []
                        }
                    },
                    data: () => ({
                        hide: !0
                    })
                },
                l = o(686),
                r = o(5);
            var component = Object(r.a)(n, (function() {
                var e = this,
                    t = e.$createElement,
                    o = e._self._c || t;
                return o("div", [o("div", {
                    class: e.$style.footerMenuSet
                }, [o("div", {
                    class: e.$style.footerMenuParent
                }, [o("h3", {
                    class: e.$style.footerMenuTitle
                }, [e._v(e._s(e.title))]), o("ul", {
                    class: e.$style.footerMenuItems
                }, e._l(e.items, (function(t, n) {
                    return o("li", {
                        key: t.label
                    }, [t.link ? o("BaseLink", {
                        class: e.$style.footerMenuItemTitle,
                        attrs: {
                            smart: t.link.url,
                            targer: t.link.target,
                            "data-tracking-id": "footer-main-" + e.index + "-link-" + n
                        }
                    }, [e._v(e._s(t.label))]) : e._e()], 1)
                })), 0)])]), o("div", {
                    class: e.$style.mobileFooterMenuSet
                }, [o("BaseLink", {
                    class: e.$style.label,
                    attrs: {
                        "aria-expanded": String(!e.hide)
                    },
                    on: {
                        click: function(t) {
                            e.hide = !e.hide
                        }
                    }
                }, [o("span", [e._v(e._s(e.title))]), o("span", {
                    class: e.$style.infoContentIcons
                }, [e.hide ? o("BaseIcon", {
                    attrs: {
                        name: "plus-mini"
                    }
                }) : o("BaseIcon", {
                    attrs: {
                        name: "minus-mini"
                    }
                })], 1)]), o("client-only", [o("SharedAnimateAppearance", [e.hide ? e._e() : o("div", {
                    class: e.$style.marginTop
                }, e._l(e.items, (function(t, n) {
                    return o("p", {
                        key: t.label,
                        class: e.$style.expandContainer
                    }, [t.link ? o("BaseLink", {
                        class: e.$style.footerMenuItemTitle,
                        attrs: {
                            smart: t.link.url,
                            targer: t.link.target,
                            "data-tracking-id": "footer-main-" + e.index + "-link-" + n
                        }
                    }, [e._v(e._s(t.label))]) : e._e()], 1)
                })), 0)])], 1)], 1)])
            }), [], !1, (function(e) {
                this.$style = l.default.locals || l.default
            }), null, null);
            t.default = component.exports;
            installComponents(component, {
                SharedAnimateAppearance: o(447).default
            })
        },
        858: function(e, t, o) {
            "use strict";
            o.r(t);
            var n = o(33),
                l = o(13),
                r = o(7),
                c = {
                    props: {
                        pageDisclaimer: {
                            type: [String, Array],
                            default: ""
                        }
                    },
                    computed: { ...Object(n.c)({
                            other: e => e.globalData.other
                        }),
                        ...Object(n.c)(["language"]),
                        footer() {
                            return this.$store.getters.globalData.footer
                        },
                        ...Object(l.e)((e => e.footer), ["bottomMenus", "copyrightText", "disclaimer", "menus", "subscribeForm", "boxDisclaimer"]),
                        footerMenus() {
                            return this.menus.map((e => e.fields))
                        },
                        homeLink() {
                            return `/${r.b[this.language]}`
                        },
                        disclaimerNormalized() {
                            return this.$prismic.hasRichText(this.pageDisclaimer) ? this.pageDisclaimer : this.disclaimer
                        }
                    }
                },
                m = o(684),
                d = o(5);
            var component = Object(d.a)(c, (function() {
                var e = this,
                    t = e.$createElement,
                    o = e._self._c || t;
                return o("footer", {
                    class: e.$style.footer
                }, [o("GlobalAccessibilityStatementLink"), o("div", {
                    class: e.$style.footerMenus
                }, [o("BaseContainer", [o("div", {
                    class: e.$style.topWrapper
                }, [o("div", {
                    class: e.$style.menuSets
                }, e._l(e.footerMenus, (function(menu, t) {
                    return o("div", {
                        key: menu.title,
                        class: e.$style.footerMenuSet
                    }, [o("GlobalFooterMenuSet", {
                        attrs: {
                            title: menu.title,
                            items: menu.items,
                            index: t
                        }
                    })], 1)
                })), 0), o("div", {
                    class: e.$style.signupAndSocial
                }, [o("GlobalFooterSignupForm", {
                    attrs: {
                        variation: "1",
                        label: e.subscribeForm.label,
                        "button-text": e.subscribeForm.button_text,
                        placeholder: e.subscribeForm.placeholder,
                        "success-message": e.subscribeForm.success_message,
                        "fail-message": e.subscribeForm.fail_message,
                        "signup-header": e.subscribeForm.signup_header
                    }
                }), o("ul", {
                    class: e.$style.socialIconsDesktop
                }, [e._l(e.other.social, (function(t) {
                    return [t.link ? o("li", {
                        key: t.icon,
                        class: e.$style.socialIcon
                    }, [o("BaseLink", {
                        class: e.$style.socialLink,
                        attrs: {
                            smart: t.link.url,
                            target: t.link.target,
                            title: t.label,
                            "data-tracking-id": "footer-social-icon-" + t.icon
                        }
                    }, [o("BaseIcon", {
                        attrs: {
                            name: t.icon,
                            rectangle: !1
                        }
                    })], 1)], 1) : e._e()]
                }))], 2)], 1)])])], 1), o("BaseContainer", [o("div", {
                    class: e.$style.horizontalBar
                })]), o("div", {
                    class: e.$style.socialLogoOptionsMobile
                }, [o("div", {
                    class: e.$style.socialLogoMobile
                }, [o("BaseContainer", [o("ul", {
                    class: e.$style.socialIcons
                }, [e._l(e.other.social, (function(t) {
                    return [t.link ? o("li", {
                        key: t.icon,
                        class: e.$style.socialIcon
                    }, [o("BaseLink", {
                        class: e.$style.socialLink,
                        attrs: {
                            smart: t.link.url,
                            target: t.link.target,
                            title: t.label,
                            "data-tracking-id": "footer-social-icon-" + t.icon
                        }
                    }, [o("BaseIcon", {
                        attrs: {
                            name: t.icon,
                            rectangle: !1
                        }
                    })], 1)], 1) : e._e()]
                }))], 2), o("div", {
                    class: e.$style.footerLogoContainer
                }, [o("BaseLink", {
                    class: e.$style.footerLogoMobile,
                    attrs: {
                        smart: e.homeLink,
                        "aria-label": e.other.logoLinkAccessibilityLabel,
                        "data-tracking-id": "footer-ag-logo-mobile"
                    }
                }, [o("BaseIcon", {
                    attrs: {
                        name: "logo-ag",
                        rectangle: !1
                    }
                })], 1)], 1), o("span", {
                    class: [e.$style.copyRightText]
                }, [e._v(e._s(e.copyrightText))])])], 1), o("div", {
                    class: e.$style.selectorsWrapperMobile
                }, [o("BaseContainer", [o("div", {
                    class: e.$style.selectorsContainer
                }, [o("div", {
                    class: e.$style.selectorContainer
                }, [o("GlobalLanguageSelector")], 1), o("div", {
                    class: e.$style.selectorContainer
                }, [o("GlobalStoreSelector")], 1)])])], 1)]), o("div", {
                    class: e.$style.bottom
                }, [o("BaseContainer", [o("div", {
                    class: e.$style.footerLogoContainer
                }, [o("BaseLink", {
                    class: e.$style.footerLogo,
                    attrs: {
                        smart: e.homeLink,
                        "aria-label": e.other.logoLinkAccessibilityLabel,
                        "data-tracking-id": "footer-ag-logo"
                    }
                }, [o("BaseIcon", {
                    attrs: {
                        name: "logo-ag",
                        rectangle: !1
                    }
                })], 1), o("div", {
                    class: e.$style.bottomRight
                }, [o("div", {
                    class: e.$style.bottomRightCenter
                }, [o("div", {
                    class: e.$style.legalStatementWrapper
                }, [e.$prismic.hasRichText(e.boxDisclaimer) ? o("div", {
                    directives: [{
                        name: "rich-text",
                        rawName: "v-rich-text"
                    }],
                    class: [e.$style.legalStatement, e.$style.__box],
                    domProps: {
                        innerHTML: e._s(e.boxDisclaimer)
                    }
                }) : e._e(), e.$prismic.hasRichText(e.disclaimerNormalized) ? o("div", {
                    directives: [{
                        name: "rich-text",
                        rawName: "v-rich-text"
                    }],
                    class: e.$style.legalStatement,
                    domProps: {
                        innerHTML: e._s(e.disclaimerNormalized)
                    }
                }) : e._e()]), o("GlobalFooterBottom", {
                    attrs: {
                        menus: e.bottomMenus,
                        mode: "main"
                    }
                })], 1), o("div", {
                    class: e.$style.dropDownAndCopy
                }, [o("div", {
                    class: [e.$style.selectorsContainer, e.$style.__desktop]
                }, [o("div", {
                    class: e.$style.selectorContainer
                }, [o("GlobalLanguageSelector")], 1), o("div", {
                    class: e.$style.selectorContainer
                }, [o("GlobalStoreSelector")], 1)]), o("span", {
                    class: [e.$style.copyRightText, e.$style.__hideMobile]
                }, [e._v(e._s(e.copyrightText))])])])], 1)])], 1)], 1)
            }), [], !1, (function(e) {
                this.$style = m.default.locals || m.default
            }), null, null);
            t.default = component.exports;
            installComponents(component, {
                GlobalAccessibilityStatementLink: o(455).default,
                GlobalFooterMenuSet: o(845).default,
                GlobalFooterSignupForm: o(600).default,
                GlobalLanguageSelector: o(601).default,
                GlobalStoreSelector: o(602).default,
                GlobalFooterBottom: o(603).default
            })
        }
    }
]);