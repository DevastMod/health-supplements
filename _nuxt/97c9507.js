(window.webpackJsonp = window.webpackJsonp || []).push([
    [11], {
        500: function(t, e, r) {
            var content = r(675);
            content.__esModule && (content = content.default), "string" == typeof content && (content = [
                [t.i, content, ""]
            ]), content.locals && (t.exports = content.locals);
            (0, r(30).default)("55b82f80", content, !0, {
                sourceMap: !1
            })
        },
        674: function(t, e, r) {
            "use strict";
            var o = r(500),
                n = r.n(o);
            r.d(e, "default", (function() {
                return n.a
            }))
        },
        675: function(t, e, r) {
            var o = r(29)(!1);
            o.push([t.i, ".pageSlices_Fw6tX{min-height:100%;padding-bottom:.1px}", ""]), o.locals = {
                pageSlices: "pageSlices_Fw6tX"
            }, t.exports = o
        },
        856: function(t, e, r) {
            "use strict";
            r.r(e);
            r(26), r(14), r(595), r(137);
            var o = r(80),
                n = r(7),
                c = {
                    components: {
                        SlicesRender: o.a
                    },
                    async asyncData(t) {
                        let {
                            route: e,
                            error: r,
                            store: c,
                            redirect: l,
                            app: m
                        } = t;
                        const d = e.path.replace(/(?:^\/|\/$)/g, "").split("/");
                        n.c[d[d.length - 1]] && d.pop();
                        const h = d.join("/").replace(/\//g, "----") || "----";
                        let f;
                        try {
                            f = await c.dispatch("pages/FETCH_PAGE_DATA", {
                                uid: h
                            })
                        } catch (t) {
                            if (t.response && 404 === t.response.status) return void r({
                                statusCode: 404,
                                message: "This page could not be found"
                            });
                            throw t
                        }
                        return await Object(o.c)(f.componentsToLoad), {
                            page: f
                        }
                    },
                    head() {
                        var t;
                        const {
                            page: e,
                            structuredData: r
                        } = this;
                        return { ...e.metaTitle && {
                                title: e.metaTitle
                            },
                            meta: [{
                                hid: "og:url",
                                property: "og:url",
                                content: this.canonicalHref
                            }, e.metaTitle && {
                                hid: "og:title",
                                property: "og:title",
                                content: e.metaTitle
                            }, e.metaDescription && {
                                hid: "description",
                                name: "description",
                                content: e.metaDescription
                            }, e.metaDescription && {
                                hid: "og:description",
                                property: "og:description",
                                content: e.metaDescription
                            }, (null === (t = e.metaRobots) || void 0 === t ? void 0 : t.startsWith("Yes: ")) && {
                                hid: "robots",
                                name: "robots",
                                content: e.metaRobots.replace(/^Yes: /, "")
                            }, e.metaImage && e.metaImage.url && {
                                hid: "og:image",
                                property: "og:image",
                                content: e.metaImage.url
                            }, e.metaImage && e.metaImage.alt && {
                                hid: "og:image:alt",
                                property: "og:image:alt",
                                content: e.metaImage.alt
                            }, e.metaImageTwitter && e.metaImageTwitter.url && {
                                hid: "twitter:card",
                                name: "twitter:card",
                                content: "summary_large_image"
                            }, e.metaImageTwitter && e.metaImageTwitter.url && {
                                hid: "twitter:image",
                                name: "twitter:image",
                                content: e.metaImageTwitter.url
                            }, e.metaImageTwitter && e.metaImageTwitter.alt && {
                                hid: "twitter:image:alt",
                                name: "twitter:image:alt",
                                content: e.metaImageTwitter.alt
                            }].filter(Boolean),
                            link: [{
                                hid: "canonical",
                                rel: "canonical",
                                href: this.canonicalHref
                            }],
                            script: [r && {
                                hid: "ldjson-schema",
                                type: "application/ld+json",
                                json: r
                            }].filter(Boolean)
                        }
                    },
                    computed: {
                        slicesComponents: Object(o.d)((t => t.page.slices), (t => ({
                            page: t.page
                        })), (t => t.page.hasConditionalWrapper)),
                        structuredData() {
                            const {
                                structuredData: t,
                                structuredDataType: e
                            } = this.page;
                            if ("product" === e) {
                                var r;
                                if (!Array.isArray(t)) return null;
                                const {
                                    product: e
                                } = this.$route.query, o = t.find((t => t.viewId === e));
                                return o ? o.structuredData : null === (r = t.find((t => !t.viewId))) || void 0 === r ? void 0 : r.structuredData
                            }
                            return null
                        },
                        canonicalHref() {
                            const {
                                slug: t,
                                lang: e
                            } = this.page, path = [t.replace(/----/g, "/"), n.b[e]].filter(Boolean).join("/").replace(/\/+/g, "/"), r = new URL(path, n.o);
                            return this.queryParams.forEach((t => {
                                let [e, o] = t;
                                r.searchParams.set(e, o)
                            })), r.href
                        },
                        queryParams() {
                            const t = {},
                                e = this.slicesComponents.find((t => "CommonSliceOffersV2Legacy" === t.name && t.props.view2Id));
                            if (e) {
                                const {
                                    view2Id: r
                                } = e.props;
                                r === this.$route.query.product && (t.product = r)
                            }
                            return Object.values(n.j).includes(this.$route.query.store) && (t.store = this.$route.query.store), Object.entries(t)
                        }
                    },
                    beforeMount() {
                        this.$store.commit("pages/SET_CURRENT_PAGE", this.page.slug);
                        const t = this.$route.path.replace(/(?:^\/|\/$)/g, "").split("/");
                        Boolean(n.c[t[t.length - 1]]) || this.$sentry && this.$sentry.captureMessage("Language not found in url", "warning")
                    },
                    mounted() {
                        Object(o.c)(this.page.componentsToLoad).then((() => {
                            this.$nextTick((() => {
                                this.$store.dispatch("vwo/initializeTests")
                            }))
                        }))
                    }
                },
                l = r(674),
                m = r(5);
            var component = Object(m.a)(c, (function() {
                var t = this,
                    e = t.$createElement;
                return (t._self._c || e)("SlicesRender", {
                    class: t.$style.pageSlices,
                    attrs: {
                        slices: t.slicesComponents
                    }
                })
            }), [], !1, (function(t) {
                this.$style = l.default.locals || l.default
            }), null, null);
            e.default = component.exports
        }
    }
]);