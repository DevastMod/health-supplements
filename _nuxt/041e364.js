(window.webpackJsonp = window.webpackJsonp || []).push([
    [49], {
        517: function(e, t, n) {
            var content = n(709);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [e.i, content, ""]
            ]), content.locals && (e.exports = content.locals);
            (0, n(30).default)("88940a58", content, !0, {
                sourceMap: !1
            })
        },
        708: function(e, t, n) {
            "use strict";
            var r = n(517),
                o = n.n(r);
            n.d(t, "default", (function() {
                return o.a
            }))
        },
        709: function(e, t, n) {
            var r = n(29)(!1);
            r.push([e.i, '.benefitsV2_ccvEN{padding:3.5rem 0;overflow:hidden;color:#fff;background-color:#002f30}@media(min-width:48em){.benefitsV2_ccvEN{padding:6rem 0}}.heading_bru-1{font-family:TimesNow,"Times New Roman",serif;font-size:3.2rem;font-weight:400;line-height:3.4rem;letter-spacing:-.018rem;width:80%;max-width:66rem;margin:0 auto 3rem;text-align:center;white-space:pre-line}@media(min-width:48em){.heading_bru-1{font-family:TimesNow,"Times New Roman",serif;font-size:5.4rem;font-weight:400;line-height:5.5rem;letter-spacing:-.1rem;margin-bottom:6rem}}.mobileSeparator_EqLtU{margin-bottom:3rem;border-bottom:.1rem solid}@media(min-width:48em){.mobileSeparator_EqLtU{display:none}}.mainWrapper_JCm1f{display:flex;justify-content:center}.main_dswnw{position:relative;flex:0 0 auto;width:calc(100% + 6rem)}@media(min-width:48em){.main_dswnw{width:100%}}@media(min-width:48em){.carouselWrapper_r8SFt{padding:0 5rem;overflow:hidden}}.carouselWrapper_r8SFt .shared-carousel-pagination-wrapper{margin-top:1.5rem}@media(min-width:48em){.carouselWrapper_r8SFt .shared-carousel-pagination-wrapper{display:none}}.carouselWrapperInner_Pg4QA{overflow:hidden}.item_XihoC{flex:0 0 auto;width:100%}.itemInner_4rcgF{max-width:26rem;padding:0 1rem;margin:0 auto;text-align:center}.imageWrapper_-dCXx{width:5.5rem;height:5.5rem;margin:0 auto 2rem}.itemHeading_IKuxG{font-weight:300;font-weight:600;white-space:pre-line}.content_m2f2f,.itemHeading_IKuxG{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;line-height:1.9rem;letter-spacing:-.008rem}.content_m2f2f{font-weight:300}.content_m2f2f p:not(:last-child){margin-bottom:1em}.item_XihoC.__hasCta_E8cDh .content_m2f2f p:last-child a{font-family:Lausanne,Arial,sans-serif;font-size:1.2rem;font-weight:300;line-height:1.6rem;letter-spacing:-.007rem}.mainButtons_jMLCk{position:absolute;top:0;left:-1rem;display:none;align-items:center;justify-content:space-between;width:calc(100% + 2rem);height:100%;pointer-events:none}@media(min-width:48em)and (max-width:63.99em){.mainButtons_jMLCk.__moreThan2Items_nbm9H{display:flex}}@media(min-width:64em){.mainButtons_jMLCk.__moreThan4Items_UKgDI{display:flex}}.button_KfN8x{padding:1rem;font-size:3.1rem;pointer-events:auto}', ""]), r.locals = {
                benefitsV2: "benefitsV2_ccvEN",
                heading: "heading_bru-1",
                mobileSeparator: "mobileSeparator_EqLtU",
                mainWrapper: "mainWrapper_JCm1f",
                main: "main_dswnw",
                carouselWrapper: "carouselWrapper_r8SFt",
                carouselWrapperInner: "carouselWrapperInner_Pg4QA",
                item: "item_XihoC",
                itemInner: "itemInner_4rcgF",
                imageWrapper: "imageWrapper_-dCXx",
                itemHeading: "itemHeading_IKuxG",
                content: "content_m2f2f",
                __hasCta: "__hasCta_E8cDh",
                mainButtons: "mainButtons_jMLCk",
                __moreThan2Items: "__moreThan2Items_nbm9H",
                __moreThan4Items: "__moreThan4Items_UKgDI",
                button: "button_KfN8x"
            }, e.exports = r
        },
        866: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(33),
                o = {
                    inheritAttrs: !1,
                    props: {
                        n: {
                            type: Number,
                            required: !0
                        },
                        items: {
                            type: Array,
                            default: () => []
                        },
                        heading: {
                            type: String,
                            default: null
                        },
                        backgroundColor: {
                            type: String,
                            default: null
                        },
                        copyColor: {
                            type: String,
                            default: null
                        },
                        carouselDotColor: {
                            type: String,
                            default: null
                        }
                    },
                    computed: { ...Object(r.c)({
                            carousels: e => e.globalData.carousels
                        }),
                        hasImage() {
                            return this.items.some((e => e.image.url))
                        },
                        itemsIsLastParagtaphCta() {
                            const e = /<p><a (?=.*<\/a><\/p>)(?!.*<[a-z])/;
                            return this.items.map((t => e.test(t.content)))
                        }
                    }
                },
                l = n(708),
                m = n(5);
            var component = Object(m.a)(o, (function() {
                var e, t = this,
                    n = t.$createElement,
                    r = t._self._c || n;
                return t.items && t.items.length > 0 ? r("BaseSpacing", {
                    attrs: {
                        "inner-space": "",
                        "no-padding": ""
                    }
                }, [r("div", {
                    class: t.$style.benefitsV2,
                    style: {
                        backgroundColor: t.backgroundColor,
                        color: t.copyColor
                    }
                }, [t.heading ? [r("BaseContainer", [r("h2", {
                    class: t.$style.heading
                }, [t._v(" " + t._s(t.heading) + " ")])]), r("div", {
                    class: t.$style.mobileSeparator
                })] : t._e(), r("BaseContainer", [r("div", {
                    class: t.$style.mainWrapper
                }, [r("div", {
                    class: t.$style.main
                }, [r("div", {
                    class: t.$style.carouselWrapper
                }, [r("div", {
                    class: t.$style.carouselWrapperInner
                }, [r("SharedCarousel", {
                    ref: "slider",
                    attrs: {
                        slides: t.items,
                        "per-page": {
                            all: 1,
                            medium: 2,
                            large: 4
                        },
                        "visible-pagination": "",
                        loop: "",
                        "lead-color": t.carouselDotColor
                    },
                    scopedSlots: t._u([{
                        key: "slide",
                        fn: function(e) {
                            var n, o = e.slide,
                                l = e.slideIndex;
                            return [r("div", {
                                class: [t.$style.item, (n = {}, n[t.$style.__hasCta] = t.itemsIsLastParagtaphCta[l], n)]
                            }, [r("div", {
                                class: t.$style.itemInner
                            }, [t.hasImage ? r("div", {
                                class: t.$style.imageWrapper
                            }, [r("BaseImage", {
                                attrs: {
                                    image: o.image,
                                    aspect: 1,
                                    contain: "",
                                    sizes: "5.5rem",
                                    crtical: t.n < 2
                                }
                            })], 1) : t._e(), o.heading ? r("strong", {
                                class: t.$style.itemHeading
                            }, [t._v(t._s(o.heading))]) : t._e(), t.$prismic.hasRichText(o.content) ? r("div", {
                                directives: [{
                                    name: "rich-text",
                                    rawName: "v-rich-text"
                                }],
                                class: t.$style.content,
                                domProps: {
                                    innerHTML: t._s(o.content)
                                }
                            }) : t._e()])])]
                        }
                    }], null, !1, 1391066781)
                })], 1)]), r("div", {
                    class: [t.$style.mainButtons, (e = {}, e[t.$style.__moreThan2Items] = t.items.length > 2, e[t.$style.__moreThan4Items] = t.items.length > 4, e)]
                }, [r("BaseLink", {
                    class: t.$style.button,
                    attrs: {
                        "aria-label": t.carousels.accessibilityLabelNavigationItemPrevious,
                        "data-shared-carousel-focus": "true"
                    },
                    on: {
                        click: function(e) {
                            return t.$refs.slider.prev()
                        }
                    }
                }, [r("BaseIcon", {
                    attrs: {
                        name: "arrow-slim-left"
                    }
                })], 1), r("BaseLink", {
                    class: t.$style.button,
                    attrs: {
                        "aria-label": t.carousels.accessibilityLabelNavigationItemNext,
                        "data-shared-carousel-focus": "true"
                    },
                    on: {
                        click: function(e) {
                            return t.$refs.slider.next()
                        }
                    }
                }, [r("BaseIcon", {
                    attrs: {
                        name: "arrow-slim-right"
                    }
                })], 1)], 1)])])])], 2)]) : t._e()
            }), [], !1, (function(e) {
                this.$style = l.default.locals || l.default
            }), null, null);
            t.default = component.exports;
            installComponents(component, {
                SharedCarousel: n(448).default
            })
        }
    }
]);