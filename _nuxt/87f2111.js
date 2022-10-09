(window.webpackJsonp = window.webpackJsonp || []).push([
    [3], {
        822: function(e, t, n) {
            (function(t) {
                var n;
                e.exports = function() {
                    function e(t, n, r) {
                        function o(i, c) {
                            if (!n[i]) {
                                if (!t[i]) {
                                    if (u) return u(i, !0);
                                    var a = new Error("Cannot find module '" + i + "'");
                                    throw a.code = "MODULE_NOT_FOUND", a
                                }
                                var p = n[i] = {
                                    exports: {}
                                };
                                t[i][0].call(p.exports, (function(e) {
                                    return o(t[i][1][e] || e)
                                }), p, p.exports, e, t, n, r)
                            }
                            return n[i].exports
                        }
                        for (var u = !1, i = 0; i < r.length; i++) o(r[i]);
                        return o
                    }
                    return e
                }()({
                    1: [function(e, t, n) {
                        "use strict";
                        var r = this && this.__importDefault || function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        };
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.PromiseGlobal = void 0;
                        var o = r(e("promise-polyfill")),
                            c = "undefined" != typeof Promise ? Promise : o.default;
                        n.PromiseGlobal = c
                    }, {
                        "promise-polyfill": 71
                    }],
                    2: [function(e, t, n) {
                        "use strict";
                        var r = e("./lib/promise"),
                            o = {};

                        function c(e) {
                            var t, n = JSON.stringify(e);
                            if (!e.forceScriptReload && (t = o[n])) return t;
                            var script = document.createElement("script"),
                                c = e.dataAttributes || {},
                                d = e.container || document.head;
                            return script.src = e.src, script.id = e.id || "", script.async = !0, e.crossorigin && script.setAttribute("crossorigin", "" + e.crossorigin), Object.keys(c).forEach((function(e) {
                                script.setAttribute("data-" + e, "" + c[e])
                            })), t = new r.PromiseGlobal((function(t, n) {
                                script.addEventListener("load", (function() {
                                    t(script)
                                })), script.addEventListener("error", (function() {
                                    n(new Error(e.src + " failed to load."))
                                })), script.addEventListener("abort", (function() {
                                    n(new Error(e.src + " has aborted."))
                                })), d.appendChild(script)
                            })), o[n] = t, t
                        }
                        c.clearCache = function() {
                            o = {}
                        }, t.exports = c
                    }, {
                        "./lib/promise": 1
                    }],
                    3: [function(e, t, n) {
                        t.exports = e("./dist/load-script")
                    }, {
                        "./dist/load-script": 2
                    }],
                    4: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /Android/.test(e)
                        }
                    }, {}],
                    5: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /CrOS/i.test(e)
                        }
                    }, {}],
                    6: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-edge"),
                            o = e("./is-samsung"),
                            c = e("./is-duckduckgo"),
                            d = e("./is-opera"),
                            l = e("./is-silk");
                        t.exports = function(e) {
                            return !(-1 === (e = e || window.navigator.userAgent).indexOf("Chrome") && -1 === e.indexOf("CriOS") || r(e) || o(e) || c(e) || d(e) || l(e))
                        }
                    }, {
                        "./is-duckduckgo": 7,
                        "./is-edge": 8,
                        "./is-opera": 20,
                        "./is-samsung": 21,
                        "./is-silk": 22
                    }],
                    7: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("DuckDuckGo/")
                        }
                    }, {}],
                    8: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("Edge/")
                        }
                    }, {}],
                    9: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /Firefox/i.test(e)
                        }
                    }, {}],
                    10: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-ie11");
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("MSIE") || r(e)
                        }
                    }, {
                        "./is-ie11": 12
                    }],
                    11: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("MSIE 10")
                        }
                    }, {}],
                    12: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("Trident/7")
                        }
                    }, {}],
                    13: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("MSIE 9")
                        }
                    }, {}],
                    14: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /FxiOS/i.test(e)
                        }
                    }, {}],
                    15: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-ios");

                        function o(e) {
                            return /\bGSA\b/.test(e)
                        }
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, r(e) && o(e)
                        }
                    }, {
                        "./is-ios": 19
                    }],
                    16: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-ios"),
                            o = e("./is-ios-firefox"),
                            c = /webkit/i;

                        function d(e) {
                            return c.test(e)
                        }

                        function l(e) {
                            return e.indexOf("CriOS") > -1
                        }

                        function _(e) {
                            return e.indexOf("FBAN") > -1
                        }
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, r(e) && d(e) && !l(e) && !o(e) && !_(e)
                        }
                    }, {
                        "./is-ios": 19,
                        "./is-ios-firefox": 14
                    }],
                    17: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-ios"),
                            o = e("./is-ios-google-search-app");
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, !!r(e) && (!!o(e) || /.+AppleWebKit(?!.*Safari)/.test(e))
                        }
                    }, {
                        "./is-ios": 19,
                        "./is-ios-google-search-app": 15
                    }],
                    18: [function(e, t, n) {
                        "use strict";
                        var r = e("./is-ios-webview");
                        t.exports = function(e, t) {
                            return t = void 0 !== t ? t : window.statusbar.visible, r(e) && t
                        }
                    }, {
                        "./is-ios-webview": 17
                    }],
                    19: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /iPhone|iPod|iPad/i.test(e)
                        }
                    }, {}],
                    20: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("OPR/") || -1 !== e.indexOf("Opera/") || -1 !== e.indexOf("OPT/")
                        }
                    }, {}],
                    21: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, /SamsungBrowser/i.test(e)
                        }
                    }, {}],
                    22: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return -1 !== (e = e || window.navigator.userAgent).indexOf("Silk/")
                        }
                    }, {}],
                    23: [function(e, t, n) {
                        "use strict";
                        var r = 48,
                            o = e("./is-android"),
                            c = e("./is-ios-firefox"),
                            d = e("./is-ios-webview"),
                            l = e("./is-chrome"),
                            _ = e("./is-samsung"),
                            E = e("./is-duckduckgo");

                        function h(e) {
                            var t = (e = e || window.navigator.userAgent).match(/CriOS\/(\d+)\./);
                            return !!t && parseInt(t[1], 10) < r
                        }

                        function m(e) {
                            return (e = e || window.navigator.userAgent).indexOf("Opera Mini") > -1
                        }

                        function f(e) {
                            var t = /Version\/[\d.]+/;
                            return e = e || window.navigator.userAgent, !!o(e) && t.test(e) && !m(e) && !E(e)
                        }

                        function y(e) {
                            return !l(e) && !_(e) && /samsung/i.test(e)
                        }
                        t.exports = function(e) {
                            return e = e || window.navigator.userAgent, !(d(e) || c(e) || f(e) || m(e) || h(e) || y(e))
                        }
                    }, {
                        "./is-android": 4,
                        "./is-chrome": 6,
                        "./is-duckduckgo": 7,
                        "./is-ios-firefox": 14,
                        "./is-ios-webview": 17,
                        "./is-samsung": 21
                    }],
                    24: [function(e, t, n) {
                        t.exports = e("./dist/is-android")
                    }, {
                        "./dist/is-android": 4
                    }],
                    25: [function(e, t, n) {
                        t.exports = e("./dist/is-chrome-os")
                    }, {
                        "./dist/is-chrome-os": 5
                    }],
                    26: [function(e, t, n) {
                        t.exports = e("./dist/is-chrome")
                    }, {
                        "./dist/is-chrome": 6
                    }],
                    27: [function(e, t, n) {
                        t.exports = e("./dist/is-edge")
                    }, {
                        "./dist/is-edge": 8
                    }],
                    28: [function(e, t, n) {
                        t.exports = e("./dist/is-firefox")
                    }, {
                        "./dist/is-firefox": 9
                    }],
                    29: [function(e, t, n) {
                        t.exports = e("./dist/is-ie")
                    }, {
                        "./dist/is-ie": 10
                    }],
                    30: [function(e, t, n) {
                        t.exports = e("./dist/is-ie10")
                    }, {
                        "./dist/is-ie10": 11
                    }],
                    31: [function(e, t, n) {
                        t.exports = e("./dist/is-ie9")
                    }, {
                        "./dist/is-ie9": 13
                    }],
                    32: [function(e, t, n) {
                        t.exports = e("./dist/is-ios-safari")
                    }, {
                        "./dist/is-ios-safari": 16
                    }],
                    33: [function(e, t, n) {
                        t.exports = e("./dist/is-ios-webview")
                    }, {
                        "./dist/is-ios-webview": 17
                    }],
                    34: [function(e, t, n) {
                        t.exports = e("./dist/is-ios-wkwebview")
                    }, {
                        "./dist/is-ios-wkwebview": 18
                    }],
                    35: [function(e, t, n) {
                        t.exports = e("./dist/is-ios")
                    }, {
                        "./dist/is-ios": 19
                    }],
                    36: [function(e, t, n) {
                        t.exports = e("./dist/is-samsung")
                    }, {
                        "./dist/is-samsung": 21
                    }],
                    37: [function(e, t, n) {
                        t.exports = e("./dist/supports-popups")
                    }, {
                        "./dist/supports-popups": 23
                    }],
                    38: [function(e, t, n) {
                        "use strict";

                        function r(element) {
                            return element.className.trim().split(/\s+/)
                        }

                        function o(element) {
                            for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
                            element.className = r(element).filter((function(t) {
                                return -1 === e.indexOf(t)
                            })).concat(e).join(" ")
                        }

                        function c(element) {
                            for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
                            element.className = r(element).filter((function(t) {
                                return -1 === e.indexOf(t)
                            })).join(" ")
                        }

                        function d(element, e, t) {
                            t ? o(element, e) : c(element, e)
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.toggle = n.remove = n.add = void 0, n.add = o, n.remove = c, n.toggle = d
                    }, {}],
                    39: [function(e, t, n) {
                        "use strict";
                        var r = function() {
                            function e() {
                                this._events = {}
                            }
                            return e.prototype.on = function(e, t) {
                                this._events[e] ? this._events[e].push(t) : this._events[e] = [t]
                            }, e.prototype.off = function(e, t) {
                                var n = this._events[e];
                                if (n) {
                                    var r = n.indexOf(t);
                                    n.splice(r, 1)
                                }
                            }, e.prototype._emit = function(e) {
                                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                                var r = this._events[e];
                                r && r.forEach((function(e) {
                                    e.apply(void 0, t)
                                }))
                            }, e.prototype.hasListener = function(e) {
                                var t = this._events[e];
                                return !!t && t.length > 0
                            }, e.createChild = function(t) {
                                t.prototype = Object.create(e.prototype, {
                                    constructor: t
                                })
                            }, e
                        }();
                        t.exports = r
                    }, {}],
                    40: [function(e, t, n) {
                        "use strict";
                        var r = "undefined" != typeof Promise ? Promise : null,
                            o = function() {
                                function e(t) {
                                    var n = this;
                                    "function" != typeof t ? (this._promise = new e.Promise((function(e, t) {
                                        n._resolveFunction = e, n._rejectFunction = t
                                    })), t = t || {}, this._onResolve = t.onResolve || e.defaultOnResolve, this._onReject = t.onReject || e.defaultOnReject, e.shouldCatchExceptions(t) && this._promise.catch((function() {})), this._resetState()) : this._promise = new e.Promise(t)
                                }
                                return e.defaultOnResolve = function(t) {
                                    return e.Promise.resolve(t)
                                }, e.defaultOnReject = function(t) {
                                    return e.Promise.reject(t)
                                }, e.setPromise = function(t) {
                                    e.Promise = t
                                }, e.shouldCatchExceptions = function(t) {
                                    return t.hasOwnProperty("suppressUnhandledPromiseMessage") ? Boolean(t.suppressUnhandledPromiseMessage) : Boolean(e.suppressUnhandledPromiseMessage)
                                }, e.all = function(t) {
                                    return e.Promise.all(t)
                                }, e.allSettled = function(t) {
                                    return e.Promise.allSettled(t)
                                }, e.race = function(t) {
                                    return e.Promise.race(t)
                                }, e.reject = function(t) {
                                    return e.Promise.reject(t)
                                }, e.resolve = function(t) {
                                    return e.Promise.resolve(t)
                                }, e.prototype.then = function() {
                                    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                    return (e = this._promise).then.apply(e, t)
                                }, e.prototype.catch = function() {
                                    for (var e, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                    return (e = this._promise).catch.apply(e, t)
                                }, e.prototype.resolve = function(t) {
                                    var n = this;
                                    return this.isFulfilled || (this._setResolved(), e.Promise.resolve().then((function() {
                                        return n._onResolve(t)
                                    })).then((function(e) {
                                        n._resolveFunction(e)
                                    })).catch((function(e) {
                                        n._resetState(), n.reject(e)
                                    }))), this
                                }, e.prototype.reject = function(t) {
                                    var n = this;
                                    return this.isFulfilled || (this._setRejected(), e.Promise.resolve().then((function() {
                                        return n._onReject(t)
                                    })).then((function(e) {
                                        n._setResolved(), n._resolveFunction(e)
                                    })).catch((function(e) {
                                        return n._rejectFunction(e)
                                    }))), this
                                }, e.prototype._resetState = function() {
                                    this.isFulfilled = !1, this.isResolved = !1, this.isRejected = !1
                                }, e.prototype._setResolved = function() {
                                    this.isFulfilled = !0, this.isResolved = !0, this.isRejected = !1
                                }, e.prototype._setRejected = function() {
                                    this.isFulfilled = !0, this.isResolved = !1, this.isRejected = !0
                                }, e.Promise = r, e
                            }();
                        t.exports = o
                    }, {}],
                    41: [function(e, t, n) {
                        "use strict";
                        var r = e("./lib/set-attributes"),
                            o = e("./lib/default-attributes"),
                            c = e("./lib/assign");
                        t.exports = function(e) {
                            void 0 === e && (e = {});
                            var iframe = document.createElement("iframe"),
                                t = c.assign({}, o.defaultAttributes, e);
                            return t.style && "string" != typeof t.style && (c.assign(iframe.style, t.style), delete t.style), r.setAttributes(iframe, t), iframe.getAttribute("id") || (iframe.id = iframe.name), iframe
                        }
                    }, {
                        "./lib/assign": 42,
                        "./lib/default-attributes": 43,
                        "./lib/set-attributes": 44
                    }],
                    42: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                            return t.forEach((function(t) {
                                "object" == typeof t && Object.keys(t).forEach((function(n) {
                                    e[n] = t[n]
                                }))
                            })), e
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.assign = void 0, n.assign = r
                    }, {}],
                    43: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.defaultAttributes = void 0, n.defaultAttributes = {
                            src: "about:blank",
                            frameBorder: 0,
                            allowtransparency: !0,
                            scrolling: "no"
                        }
                    }, {}],
                    44: [function(e, t, n) {
                        "use strict";

                        function r(element, e) {
                            for (var t in e)
                                if (e.hasOwnProperty(t)) {
                                    var n = e[t];
                                    null == n ? element.removeAttribute(t) : element.setAttribute(t, n)
                                }
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.setAttributes = void 0, n.setAttributes = r
                    }, {}],
                    45: [function(e, t, n) {
                        "use strict";

                        function r() {
                            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                                var t = 16 * Math.random() | 0;
                                return ("x" === e ? t : 3 & t | 8).toString(16)
                            }))
                        }
                        t.exports = r
                    }, {}],
                    46: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return function() {
                                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                                setTimeout((function() {
                                    try {
                                        e.apply(void 0, t)
                                    } catch (e) {
                                        console.log("Error in callback function"), console.log(e)
                                    }
                                }), 1)
                            }
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.deferred = r
                    }, {}],
                    47: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t = !1;
                            return function() {
                                for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                                t || (t = !0, e.apply(void 0, n))
                            }
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.once = r
                    }, {}],
                    48: [function(e, t, n) {
                        "use strict";

                        function r(e, t) {
                            if (!t) return e;
                            e.then((function(data) {
                                return t(null, data)
                            })).catch((function(e) {
                                return t(e)
                            }))
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.promiseOrCallback = r
                    }, {}],
                    49: [function(e, t, n) {
                        "use strict";
                        var r = e("./lib/deferred"),
                            o = e("./lib/once"),
                            c = e("./lib/promise-or-callback");

                        function d(e) {
                            return function() {
                                for (var t, n = [], d = 0; d < arguments.length; d++) n[d] = arguments[d];
                                return "function" == typeof n[n.length - 1] && (t = n.pop(), t = o.once(r.deferred(t))), c.promiseOrCallback(e.apply(this, n), t)
                            }
                        }
                        d.wrapPrototype = function(e, t) {
                            void 0 === t && (t = {});
                            var n = t.ignoreMethods || [],
                                r = !0 === t.transformPrivateMethods;
                            return Object.getOwnPropertyNames(e.prototype).filter((function(t) {
                                var o, c = "constructor" !== t && "function" == typeof e.prototype[t],
                                    d = -1 === n.indexOf(t);
                                return o = !!r || "_" !== t.charAt(0), c && o && d
                            })).forEach((function(t) {
                                var n = e.prototype[t];
                                e.prototype[t] = d(n)
                            })), e
                        }, t.exports = d
                    }, {
                        "./lib/deferred": 46,
                        "./lib/once": 47,
                        "./lib/promise-or-callback": 48
                    }],
                    50: [function(e, t, n) {
                        "use strict";
                        var r = this && this.__assign || function() {
                                return r = Object.assign || function(e) {
                                    for (var s, i = 1, t = arguments.length; i < t; i++)
                                        for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (e[p] = s[p]);
                                    return e
                                }, r.apply(this, arguments)
                            },
                            o = e("./lib/card-types"),
                            c = e("./lib/add-matching-cards-to-results"),
                            d = e("./lib/is-valid-input-type"),
                            l = e("./lib/find-best-match"),
                            _ = e("./lib/clone"),
                            E = {},
                            h = {
                                VISA: "visa",
                                MASTERCARD: "mastercard",
                                AMERICAN_EXPRESS: "american-express",
                                DINERS_CLUB: "diners-club",
                                DISCOVER: "discover",
                                JCB: "jcb",
                                UNIONPAY: "unionpay",
                                MAESTRO: "maestro",
                                ELO: "elo",
                                MIR: "mir",
                                HIPER: "hiper",
                                HIPERCARD: "hipercard"
                            },
                            m = [h.VISA, h.MASTERCARD, h.AMERICAN_EXPRESS, h.DINERS_CLUB, h.DISCOVER, h.JCB, h.UNIONPAY, h.MAESTRO, h.ELO, h.MIR, h.HIPER, h.HIPERCARD],
                            f = _.clone(m);

                        function y(e) {
                            return E[e] || o[e]
                        }

                        function A() {
                            return f.map((function(e) {
                                return _.clone(y(e))
                            }))
                        }

                        function T(e, t) {
                            void 0 === t && (t = !1);
                            var n = f.indexOf(e);
                            if (!t && -1 === n) throw new Error('"' + e + '" is not a supported card type.');
                            return n
                        }

                        function I(e) {
                            var t = [];
                            if (!d.isValidInputType(e)) return t;
                            if (0 === e.length) return A();
                            f.forEach((function(n) {
                                var r = y(n);
                                c.addMatchingCardsToResults(e, r, t)
                            }));
                            var n = l.findBestMatch(t);
                            return n ? [n] : t
                        }
                        I.getTypeInfo = function(e) {
                            return _.clone(y(e))
                        }, I.removeCard = function(e) {
                            var t = T(e);
                            f.splice(t, 1)
                        }, I.addCard = function(e) {
                            var t = T(e.type, !0);
                            E[e.type] = e, -1 === t && f.push(e.type)
                        }, I.updateCard = function(e, t) {
                            var n = E[e] || o[e];
                            if (!n) throw new Error('"' + e + "\" is not a recognized type. Use `addCard` instead.'");
                            if (t.type && n.type !== t.type) throw new Error("Cannot overwrite type parameter.");
                            var c = _.clone(n);
                            c = r(r({}, c), t), E[c.type] = c
                        }, I.changeOrder = function(e, t) {
                            var n = T(e);
                            f.splice(n, 1), f.splice(t, 0, e)
                        }, I.resetModifications = function() {
                            f = _.clone(m), E = {}
                        }, I.types = h, t.exports = I
                    }, {
                        "./lib/add-matching-cards-to-results": 51,
                        "./lib/card-types": 52,
                        "./lib/clone": 53,
                        "./lib/find-best-match": 54,
                        "./lib/is-valid-input-type": 55
                    }],
                    51: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.addMatchingCardsToResults = void 0;
                        var r = e("./clone"),
                            o = e("./matches");

                        function c(e, t, n) {
                            var i, c;
                            for (i = 0; i < t.patterns.length; i++) {
                                var pattern = t.patterns[i];
                                if (o.matches(e, pattern)) {
                                    var d = r.clone(t);
                                    c = Array.isArray(pattern) ? String(pattern[0]).length : String(pattern).length, e.length >= c && (d.matchStrength = c), n.push(d);
                                    break
                                }
                            }
                        }
                        n.addMatchingCardsToResults = c
                    }, {
                        "./clone": 53,
                        "./matches": 56
                    }],
                    52: [function(e, t, n) {
                        "use strict";
                        var r = {
                            visa: {
                                niceType: "Visa",
                                type: "visa",
                                patterns: [4],
                                gaps: [4, 8, 12],
                                lengths: [16, 18, 19],
                                code: {
                                    name: "CVV",
                                    size: 3
                                }
                            },
                            mastercard: {
                                niceType: "Mastercard",
                                type: "mastercard",
                                patterns: [
                                    [51, 55],
                                    [2221, 2229],
                                    [223, 229],
                                    [23, 26],
                                    [270, 271], 2720
                                ],
                                gaps: [4, 8, 12],
                                lengths: [16],
                                code: {
                                    name: "CVC",
                                    size: 3
                                }
                            },
                            "american-express": {
                                niceType: "American Express",
                                type: "american-express",
                                patterns: [34, 37],
                                gaps: [4, 10],
                                lengths: [15],
                                code: {
                                    name: "CID",
                                    size: 4
                                }
                            },
                            "diners-club": {
                                niceType: "Diners Club",
                                type: "diners-club",
                                patterns: [
                                    [300, 305], 36, 38, 39
                                ],
                                gaps: [4, 10],
                                lengths: [14, 16, 19],
                                code: {
                                    name: "CVV",
                                    size: 3
                                }
                            },
                            discover: {
                                niceType: "Discover",
                                type: "discover",
                                patterns: [6011, [644, 649], 65],
                                gaps: [4, 8, 12],
                                lengths: [16, 19],
                                code: {
                                    name: "CID",
                                    size: 3
                                }
                            },
                            jcb: {
                                niceType: "JCB",
                                type: "jcb",
                                patterns: [2131, 1800, [3528, 3589]],
                                gaps: [4, 8, 12],
                                lengths: [16, 17, 18, 19],
                                code: {
                                    name: "CVV",
                                    size: 3
                                }
                            },
                            unionpay: {
                                niceType: "UnionPay",
                                type: "unionpay",
                                patterns: [620, [624, 626],
                                    [62100, 62182],
                                    [62184, 62187],
                                    [62185, 62197],
                                    [62200, 62205],
                                    [622010, 622999], 622018, [622019, 622999],
                                    [62207, 62209],
                                    [622126, 622925],
                                    [623, 626], 6270, 6272, 6276, [627700, 627779],
                                    [627781, 627799],
                                    [6282, 6289], 6291, 6292, 810, [8110, 8131],
                                    [8132, 8151],
                                    [8152, 8163],
                                    [8164, 8171]
                                ],
                                gaps: [4, 8, 12],
                                lengths: [14, 15, 16, 17, 18, 19],
                                code: {
                                    name: "CVN",
                                    size: 3
                                }
                            },
                            maestro: {
                                niceType: "Maestro",
                                type: "maestro",
                                patterns: [493698, [5e5, 504174],
                                    [504176, 506698],
                                    [506779, 508999],
                                    [56, 59], 63, 67, 6
                                ],
                                gaps: [4, 8, 12],
                                lengths: [12, 13, 14, 15, 16, 17, 18, 19],
                                code: {
                                    name: "CVC",
                                    size: 3
                                }
                            },
                            elo: {
                                niceType: "Elo",
                                type: "elo",
                                patterns: [401178, 401179, 438935, 457631, 457632, 431274, 451416, 457393, 504175, [506699, 506778],
                                    [509e3, 509999], 627780, 636297, 636368, [650031, 650033],
                                    [650035, 650051],
                                    [650405, 650439],
                                    [650485, 650538],
                                    [650541, 650598],
                                    [650700, 650718],
                                    [650720, 650727],
                                    [650901, 650978],
                                    [651652, 651679],
                                    [655e3, 655019],
                                    [655021, 655058]
                                ],
                                gaps: [4, 8, 12],
                                lengths: [16],
                                code: {
                                    name: "CVE",
                                    size: 3
                                }
                            },
                            mir: {
                                niceType: "Mir",
                                type: "mir",
                                patterns: [
                                    [2200, 2204]
                                ],
                                gaps: [4, 8, 12],
                                lengths: [16, 17, 18, 19],
                                code: {
                                    name: "CVP2",
                                    size: 3
                                }
                            },
                            hiper: {
                                niceType: "Hiper",
                                type: "hiper",
                                patterns: [637095, 63737423, 63743358, 637568, 637599, 637609, 637612],
                                gaps: [4, 8, 12],
                                lengths: [16],
                                code: {
                                    name: "CVC",
                                    size: 3
                                }
                            },
                            hipercard: {
                                niceType: "Hipercard",
                                type: "hipercard",
                                patterns: [606282],
                                gaps: [4, 8, 12],
                                lengths: [16],
                                code: {
                                    name: "CVC",
                                    size: 3
                                }
                            }
                        };
                        t.exports = r
                    }, {}],
                    53: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return e ? JSON.parse(JSON.stringify(e)) : null
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.clone = void 0, n.clone = r
                    }, {}],
                    54: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t = e.filter((function(e) {
                                return e.matchStrength
                            })).length;
                            return t > 0 && t === e.length
                        }

                        function o(e) {
                            return r(e) ? e.reduce((function(e, t) {
                                return e ? Number(e.matchStrength) < Number(t.matchStrength) ? t : e : t
                            })) : null
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.findBestMatch = void 0, n.findBestMatch = o
                    }, {}],
                    55: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return "string" == typeof e || e instanceof String
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.isValidInputType = void 0, n.isValidInputType = r
                    }, {}],
                    56: [function(e, t, n) {
                        "use strict";

                        function r(e, t, n) {
                            var r = String(t).length,
                                o = e.substr(0, r),
                                c = parseInt(o, 10);
                            return t = parseInt(String(t).substr(0, o.length), 10), n = parseInt(String(n).substr(0, o.length), 10), c >= t && c <= n
                        }

                        function o(e, pattern) {
                            return (pattern = String(pattern)).substring(0, e.length) === e.substring(0, pattern.length)
                        }

                        function c(e, pattern) {
                            return Array.isArray(pattern) ? r(e, pattern[0], pattern[1]) : o(e, pattern)
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.matches = void 0, n.matches = c
                    }, {}],
                    57: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.Framebus = void 0;
                        var r = e("./lib/is-not-string"),
                            o = e("./lib/subscription-args-invalid"),
                            c = e("./lib/broadcast"),
                            d = e("./lib/package-payload"),
                            l = e("./lib/constants"),
                            _ = "undefined" != typeof window && window.Promise,
                            E = function() {
                                function e(e) {
                                    void 0 === e && (e = {}), this.origin = e.origin || "*", this.channel = e.channel || "", this.verifyDomain = e.verifyDomain, this.isDestroyed = !1, this.listeners = []
                                }
                                return e.setPromise = function(t) {
                                    e.Promise = t
                                }, e.target = function(t) {
                                    return new e(t)
                                }, e.prototype.include = function(e) {
                                    return null != e && null != e.Window && e.constructor === e.Window && (l.childWindows.push(e), !0)
                                }, e.prototype.target = function(t) {
                                    return e.target(t)
                                }, e.prototype.emit = function(e, data, t) {
                                    if (this.isDestroyed) return !1;
                                    var n = this.origin;
                                    if (e = this.namespaceEvent(e), r.isntString(e)) return !1;
                                    if (r.isntString(n)) return !1;
                                    "function" == typeof data && (t = data, data = void 0);
                                    var o = d.packagePayload(e, n, data, t);
                                    return !!o && (c.broadcast(window.top || window.self, o, n), !0)
                                }, e.prototype.emitAsPromise = function(t, data) {
                                    var n = this;
                                    return new e.Promise((function(e, r) {
                                        n.emit(t, data, (function(t) {
                                            e(t)
                                        })) || r(new Error('Listener not added for "' + t + '"'))
                                    }))
                                }, e.prototype.on = function(e, t) {
                                    if (this.isDestroyed) return !1;
                                    var n = this,
                                        r = this.origin,
                                        c = t;
                                    return e = this.namespaceEvent(e), !o.subscriptionArgsInvalid(e, c, r) && (this.verifyDomain && (c = function() {
                                        for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                                        n.checkOrigin(this && this.origin) && t.apply(void 0, e)
                                    }), this.listeners.push({
                                        eventName: e,
                                        handler: c,
                                        originalHandler: t
                                    }), l.subscribers[r] = l.subscribers[r] || {}, l.subscribers[r][e] = l.subscribers[r][e] || [], l.subscribers[r][e].push(c), !0)
                                }, e.prototype.off = function(e, t) {
                                    var n = t;
                                    if (this.isDestroyed) return !1;
                                    if (this.verifyDomain)
                                        for (var i = 0; i < this.listeners.length; i++) {
                                            var r = this.listeners[i];
                                            r.originalHandler === t && (n = r.handler)
                                        }
                                    e = this.namespaceEvent(e);
                                    var c = this.origin;
                                    if (o.subscriptionArgsInvalid(e, n, c)) return !1;
                                    var d = l.subscribers[c] && l.subscribers[c][e];
                                    if (!d) return !1;
                                    for (i = 0; i < d.length; i++)
                                        if (d[i] === n) return d.splice(i, 1), !0;
                                    return !1
                                }, e.prototype.teardown = function() {
                                    if (!this.isDestroyed) {
                                        this.isDestroyed = !0;
                                        for (var i = 0; i < this.listeners.length; i++) {
                                            var e = this.listeners[i];
                                            this.off(e.eventName, e.handler)
                                        }
                                        this.listeners.length = 0
                                    }
                                }, e.prototype.checkOrigin = function(e) {
                                    var t, a = document.createElement("a");
                                    return a.href = location.href, t = "https:" === a.protocol ? a.host.replace(/:443$/, "") : "http:" === a.protocol ? a.host.replace(/:80$/, "") : a.host, a.protocol + "//" + t === e || !this.verifyDomain || this.verifyDomain(e)
                                }, e.prototype.namespaceEvent = function(e) {
                                    return this.channel ? this.channel + ":" + e : e
                                }, e.Promise = _, e
                            }();
                        n.Framebus = E
                    }, {
                        "./lib/broadcast": 61,
                        "./lib/constants": 62,
                        "./lib/is-not-string": 65,
                        "./lib/package-payload": 67,
                        "./lib/subscription-args-invalid": 69
                    }],
                    58: [function(e, t, n) {
                        "use strict";
                        var r = e("./lib/attach"),
                            o = e("./framebus");
                        r.attach(), t.exports = o.Framebus
                    }, {
                        "./framebus": 57,
                        "./lib/attach": 59
                    }],
                    59: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.detach = n.attach = void 0;
                        var r = e("./message"),
                            o = !1;

                        function c() {
                            o || "undefined" == typeof window || (o = !0, window.addEventListener("message", r.onmessage, !1))
                        }

                        function d() {
                            o = !1, window.removeEventListener("message", r.onmessage, !1)
                        }
                        n.attach = c, n.detach = d
                    }, {
                        "./message": 66
                    }],
                    60: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.broadcastToChildWindows = void 0;
                        var r = e("./broadcast"),
                            o = e("./constants");

                        function c(e, t, source) {
                            for (var i = o.childWindows.length - 1; i >= 0; i--) {
                                var n = o.childWindows[i];
                                n.closed ? o.childWindows.splice(i, 1) : source !== n && r.broadcast(n.top, e, t)
                            }
                        }
                        n.broadcastToChildWindows = c
                    }, {
                        "./broadcast": 61,
                        "./constants": 62
                    }],
                    61: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.broadcast = void 0;
                        var r = e("./has-opener");

                        function o(e, t, n) {
                            var c, i = 0;
                            try {
                                for (e.postMessage(t, n), r.hasOpener(e) && e.opener.top !== window.top && o(e.opener.top, t, n); c = e.frames[i];) o(c, t, n), i++
                            } catch (e) {}
                        }
                        n.broadcast = o
                    }, {
                        "./has-opener": 64
                    }],
                    62: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.subscribers = n.childWindows = n.prefix = void 0, n.prefix = "/*framebus*/", n.childWindows = [], n.subscribers = {}
                    }, {}],
                    63: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.dispatch = void 0;
                        var r = e("./constants");

                        function o(e, t, data, n, o) {
                            if (r.subscribers[e] && r.subscribers[e][t]) {
                                var c = [];
                                data && c.push(data), n && c.push(n);
                                for (var i = 0; i < r.subscribers[e][t].length; i++) r.subscribers[e][t][i].apply(o, c)
                            }
                        }
                        n.dispatch = o
                    }, {
                        "./constants": 62
                    }],
                    64: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return e.top === e && null != e.opener && e.opener !== e && !0 !== e.opener.closed
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.hasOpener = void 0, n.hasOpener = r
                    }, {}],
                    65: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return "string" != typeof e
                        }
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.isntString = void 0, n.isntString = r
                    }, {}],
                    66: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.onmessage = void 0;
                        var r = e("./is-not-string"),
                            o = e("./unpack-payload"),
                            c = e("./dispatch"),
                            d = e("./broadcast-to-child-windows");

                        function l(e) {
                            if (!r.isntString(e.data)) {
                                var t = o.unpackPayload(e);
                                if (t) {
                                    var data = t.eventData,
                                        n = t.reply;
                                    c.dispatch("*", t.event, data, n, e), c.dispatch(e.origin, t.event, data, n, e), d.broadcastToChildWindows(e.data, t.origin, e.source)
                                }
                            }
                        }
                        n.onmessage = l
                    }, {
                        "./broadcast-to-child-windows": 60,
                        "./dispatch": 63,
                        "./is-not-string": 65,
                        "./unpack-payload": 70
                    }],
                    67: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.packagePayload = void 0;
                        var r = e("./subscribe-replier"),
                            o = e("./constants");

                        function c(e, t, data, n) {
                            var c, d = {
                                event: e,
                                origin: t
                            };
                            "function" == typeof n && (d.reply = r.subscribeReplier(n, t)), d.eventData = data;
                            try {
                                c = o.prefix + JSON.stringify(d)
                            } catch (e) {
                                throw new Error("Could not stringify event: " + e.message)
                            }
                            return c
                        }
                        n.packagePayload = c
                    }, {
                        "./constants": 62,
                        "./subscribe-replier": 68
                    }],
                    68: [function(e, t, n) {
                        "use strict";
                        var r = this && this.__importDefault || function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        };
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.subscribeReplier = void 0;
                        var o = e("../framebus"),
                            c = r(e("@braintree/uuid"));

                        function d(e, t) {
                            var n = c.default();

                            function r(data, c) {
                                e(data, c), o.Framebus.target({
                                    origin: t
                                }).off(n, r)
                            }
                            return o.Framebus.target({
                                origin: t
                            }).on(n, r), n
                        }
                        n.subscribeReplier = d
                    }, {
                        "../framebus": 57,
                        "@braintree/uuid": 45
                    }],
                    69: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.subscriptionArgsInvalid = void 0;
                        var r = e("./is-not-string");

                        function o(e, t, n) {
                            return !!r.isntString(e) || "function" != typeof t || r.isntString(n)
                        }
                        n.subscriptionArgsInvalid = o
                    }, {
                        "./is-not-string": 65
                    }],
                    70: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.unpackPayload = void 0;
                        var r = e("./constants"),
                            o = e("./package-payload");

                        function c(e) {
                            var t;
                            if (e.data.slice(0, r.prefix.length) !== r.prefix) return !1;
                            try {
                                t = JSON.parse(e.data.slice(r.prefix.length))
                            } catch (e) {
                                return !1
                            }
                            if (t.reply) {
                                var n = e.origin,
                                    c = e.source,
                                    d = t.reply;
                                t.reply = function(e) {
                                    if (c) {
                                        var t = o.packagePayload(d, n, e);
                                        t && c.postMessage(t, n)
                                    }
                                }
                            }
                            return t
                        }
                        n.unpackPayload = c
                    }, {
                        "./constants": 62,
                        "./package-payload": 67
                    }],
                    71: [function(e, n, r) {
                        "use strict";

                        function o(e) {
                            var t = this.constructor;
                            return this.then((function(n) {
                                return t.resolve(e()).then((function() {
                                    return n
                                }))
                            }), (function(n) {
                                return t.resolve(e()).then((function() {
                                    return t.reject(n)
                                }))
                            }))
                        }

                        function c(e) {
                            return new this((function(t, n) {
                                if (!e || void 0 === e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
                                var r = Array.prototype.slice.call(e);
                                if (0 === r.length) return t([]);
                                var o = r.length;

                                function c(i, e) {
                                    if (e && ("object" == typeof e || "function" == typeof e)) {
                                        var n = e.then;
                                        if ("function" == typeof n) return void n.call(e, (function(e) {
                                            c(i, e)
                                        }), (function(e) {
                                            r[i] = {
                                                status: "rejected",
                                                reason: e
                                            }, 0 == --o && t(r)
                                        }))
                                    }
                                    r[i] = {
                                        status: "fulfilled",
                                        value: e
                                    }, 0 == --o && t(r)
                                }
                                for (var i = 0; i < r.length; i++) c(i, r[i])
                            }))
                        }
                        var d = setTimeout;

                        function l(e) {
                            return Boolean(e && void 0 !== e.length)
                        }

                        function _() {}

                        function E(e, t) {
                            return function() {
                                e.apply(t, arguments)
                            }
                        }

                        function h(e) {
                            if (!(this instanceof h)) throw new TypeError("Promises must be constructed via new");
                            if ("function" != typeof e) throw new TypeError("not a function");
                            this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], I(e, this)
                        }

                        function m(e, t) {
                            for (; 3 === e._state;) e = e._value;
                            0 !== e._state ? (e._handled = !0, h._immediateFn((function() {
                                var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                                if (null !== n) {
                                    var r;
                                    try {
                                        r = n(e._value)
                                    } catch (e) {
                                        return void y(t.promise, e)
                                    }
                                    f(t.promise, r)
                                } else(1 === e._state ? f : y)(t.promise, e._value)
                            }))) : e._deferreds.push(t)
                        }

                        function f(e, t) {
                            try {
                                if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                                if (t && ("object" == typeof t || "function" == typeof t)) {
                                    var n = t.then;
                                    if (t instanceof h) return e._state = 3, e._value = t, void A(e);
                                    if ("function" == typeof n) return void I(E(n, t), e)
                                }
                                e._state = 1, e._value = t, A(e)
                            } catch (t) {
                                y(e, t)
                            }
                        }

                        function y(e, t) {
                            e._state = 2, e._value = t, A(e)
                        }

                        function A(e) {
                            2 === e._state && 0 === e._deferreds.length && h._immediateFn((function() {
                                e._handled || h._unhandledRejectionFn(e._value)
                            }));
                            for (var i = 0, t = e._deferreds.length; i < t; i++) m(e, e._deferreds[i]);
                            e._deferreds = null
                        }

                        function T(e, t, n) {
                            this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
                        }

                        function I(e, t) {
                            var n = !1;
                            try {
                                e((function(e) {
                                    n || (n = !0, f(t, e))
                                }), (function(e) {
                                    n || (n = !0, y(t, e))
                                }))
                            } catch (e) {
                                if (n) return;
                                n = !0, y(t, e)
                            }
                        }
                        h.prototype.catch = function(e) {
                            return this.then(null, e)
                        }, h.prototype.then = function(e, t) {
                            var n = new this.constructor(_);
                            return m(this, new T(e, t, n)), n
                        }, h.prototype.finally = o, h.all = function(e) {
                            return new h((function(t, n) {
                                if (!l(e)) return n(new TypeError("Promise.all accepts an array"));
                                var r = Array.prototype.slice.call(e);
                                if (0 === r.length) return t([]);
                                var o = r.length;

                                function c(i, e) {
                                    try {
                                        if (e && ("object" == typeof e || "function" == typeof e)) {
                                            var d = e.then;
                                            if ("function" == typeof d) return void d.call(e, (function(e) {
                                                c(i, e)
                                            }), n)
                                        }
                                        r[i] = e, 0 == --o && t(r)
                                    } catch (e) {
                                        n(e)
                                    }
                                }
                                for (var i = 0; i < r.length; i++) c(i, r[i])
                            }))
                        }, h.allSettled = c, h.resolve = function(e) {
                            return e && "object" == typeof e && e.constructor === h ? e : new h((function(t) {
                                t(e)
                            }))
                        }, h.reject = function(e) {
                            return new h((function(t, n) {
                                n(e)
                            }))
                        }, h.race = function(e) {
                            return new h((function(t, n) {
                                if (!l(e)) return n(new TypeError("Promise.race accepts an array"));
                                for (var i = 0, r = e.length; i < r; i++) h.resolve(e[i]).then(t, n)
                            }))
                        }, h._immediateFn = "function" == typeof t && function(e) {
                            t(e)
                        } || function(e) {
                            d(e, 0)
                        }, h._unhandledRejectionFn = function(e) {
                            "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
                        }, n.exports = h
                    }, {}],
                    72: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.isIos = n.isIE9 = n.isSamsungBrowser = n.isAndroidChrome = n.isKitKatWebview = void 0;
                        var r = "undefined" != typeof window && window.navigator && window.navigator.userAgent,
                            o = e("@braintree/browser-detection/is-android"),
                            c = e("@braintree/browser-detection/is-chrome-os"),
                            d = e("@braintree/browser-detection/is-chrome"),
                            l = e("@braintree/browser-detection/is-ios");
                        n.isIos = l;
                        var _ = e("@braintree/browser-detection/is-ie9");
                        n.isIE9 = _;
                        var E = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;

                        function h(e) {
                            return !d(e) && e.indexOf("Samsung") > -1
                        }

                        function m(e) {
                            return void 0 === e && (e = r), o(e) && E.test(e)
                        }

                        function f(e) {
                            return void 0 === e && (e = r), (o(e) || c(e)) && d(e)
                        }

                        function y(e) {
                            return void 0 === e && (e = r), /SamsungBrowser/.test(e) || h(e)
                        }
                        n.isKitKatWebview = m, n.isAndroidChrome = f, n.isSamsungBrowser = y
                    }, {
                        "@braintree/browser-detection/is-android": 24,
                        "@braintree/browser-detection/is-chrome": 26,
                        "@braintree/browser-detection/is-chrome-os": 25,
                        "@braintree/browser-detection/is-ie9": 31,
                        "@braintree/browser-detection/is-ios": 35
                    }],
                    73: [function(e, t, n) {
                        "use strict";
                        var r = e("./lib/device");
                        t.exports = function() {
                            return !(0, r.isSamsungBrowser)()
                        }
                    }, {
                        "./lib/device": 72
                    }],
                    74: [function(e, t, n) {
                        t.exports = e("./dist/supports-input-formatting")
                    }, {
                        "./dist/supports-input-formatting": 73
                    }],
                    75: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("./errors"),
                            c = e("../lib/assign").assign,
                            d = e("../lib/promise"),
                            l = e("../lib/methods"),
                            _ = e("../lib/convert-methods-to-error"),
                            E = e("@braintree/wrap-promise");

                        function h(e) {
                            this._client = e.client
                        }
                        h.prototype.getRewardsBalance = function(e) {
                            var data, t = e.nonce;
                            return t ? (delete(data = c({
                                _meta: {
                                    source: "american-express"
                                },
                                paymentMethodNonce: t
                            }, e)).nonce, this._client.request({
                                method: "get",
                                endpoint: "payment_methods/amex_rewards_balance",
                                data: data
                            }).catch((function(e) {
                                return d.reject(new r({
                                    type: o.AMEX_NETWORK_ERROR.type,
                                    code: o.AMEX_NETWORK_ERROR.code,
                                    message: "A network error occurred when getting the American Express rewards balance.",
                                    details: {
                                        originalError: e
                                    }
                                }))
                            }))) : d.reject(new r({
                                type: o.AMEX_NONCE_REQUIRED.type,
                                code: o.AMEX_NONCE_REQUIRED.code,
                                message: "getRewardsBalance must be called with a nonce."
                            }))
                        }, h.prototype.getExpressCheckoutProfile = function(e) {
                            return e.nonce ? this._client.request({
                                method: "get",
                                endpoint: "payment_methods/amex_express_checkout_cards/" + e.nonce,
                                data: {
                                    _meta: {
                                        source: "american-express"
                                    },
                                    paymentMethodNonce: e.nonce
                                }
                            }).catch((function(e) {
                                return d.reject(new r({
                                    type: o.AMEX_NETWORK_ERROR.type,
                                    code: o.AMEX_NETWORK_ERROR.code,
                                    message: "A network error occurred when getting the American Express Checkout nonce profile.",
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })) : d.reject(new r({
                                type: o.AMEX_NONCE_REQUIRED.type,
                                code: o.AMEX_NONCE_REQUIRED.code,
                                message: "getExpressCheckoutProfile must be called with a nonce."
                            }))
                        }, h.prototype.teardown = function() {
                            return _(this, l(h.prototype)), d.resolve()
                        }, t.exports = E.wrapPrototype(h)
                    }, {
                        "../lib/assign": 128,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 76,
                        "@braintree/wrap-promise": 49
                    }],
                    76: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            AMEX_NONCE_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "AMEX_NONCE_REQUIRED"
                            },
                            AMEX_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "AMEX_NETWORK_ERROR"
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    77: [function(e, t, n) {
                        "use strict";
                        var r = e("./american-express"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = "3.85.3",
                            _ = e("@braintree/wrap-promise");

                        function E(e) {
                            var t = "American Express";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                return e.client = t, new r(e)
                            }))
                        }
                        t.exports = {
                            create: _(E),
                            VERSION: l
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "./american-express": 75,
                        "@braintree/wrap-promise": 49
                    }],
                    78: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("../lib/analytics"),
                            c = e("./errors"),
                            d = e("../lib/promise"),
                            l = e("../lib/methods"),
                            _ = e("../lib/convert-methods-to-error"),
                            E = e("@braintree/wrap-promise");

                        function h(e) {
                            this._instantiatedWithClient = Boolean(!e.useDeferredClient), this._client = e.client, this._createPromise = e.createPromise, this._client && this._setMerchantIdentifier()
                        }
                        h.prototype._waitForClient = function() {
                            return this._client ? d.resolve() : this._createPromise.then(function(e) {
                                this._client = e, this._setMerchantIdentifier()
                            }.bind(this))
                        }, h.prototype._setMerchantIdentifier = function() {
                            var e = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
                            e && Object.defineProperty(this, "merchantIdentifier", {
                                value: e.merchantIdentifier,
                                configurable: !1,
                                writable: !1
                            })
                        }, h.prototype.createPaymentRequest = function(e) {
                            return this._instantiatedWithClient ? this._createPaymentRequestSynchronously(e) : this._waitForClient().then(function() {
                                return this._createPaymentRequestSynchronously(e)
                            }.bind(this))
                        }, h.prototype._createPaymentRequestSynchronously = function(e) {
                            var t = this._client.getConfiguration().gatewayConfiguration.applePayWeb,
                                n = {
                                    countryCode: t.countryCode,
                                    currencyCode: t.currencyCode,
                                    merchantCapabilities: t.merchantCapabilities || ["supports3DS"],
                                    supportedNetworks: t.supportedNetworks.map((function(e) {
                                        return "mastercard" === e ? "masterCard" : e
                                    }))
                                };
                            return Object.assign({}, n, e)
                        }, h.prototype.performValidation = function(e) {
                            var t = this;
                            return e && e.validationURL ? this._waitForClient().then((function() {
                                var n = {
                                    validationUrl: e.validationURL,
                                    domainName: e.domainName || window.location.hostname,
                                    merchantIdentifier: e.merchantIdentifier || t.merchantIdentifier
                                };
                                return null != e.displayName && (n.displayName = e.displayName), t._client.request({
                                    method: "post",
                                    endpoint: "apple_pay_web/sessions",
                                    data: {
                                        _meta: {
                                            source: "apple-pay"
                                        },
                                        applePayWebSession: n
                                    }
                                })
                            })).then((function(e) {
                                return o.sendEvent(t._client, "applepay.performValidation.succeeded"), d.resolve(e)
                            })).catch((function(e) {
                                return o.sendEvent(t._client, "applepay.performValidation.failed"), "CLIENT_REQUEST_ERROR" === e.code ? d.reject(new r({
                                    type: c.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
                                    code: c.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
                                    message: c.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
                                    details: {
                                        originalError: e.details.originalError
                                    }
                                })) : d.reject(new r({
                                    type: c.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
                                    code: c.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
                                    message: c.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })) : d.reject(new r(c.APPLE_PAY_VALIDATION_URL_REQUIRED))
                        }, h.prototype.tokenize = function(e) {
                            var t = this;
                            return e.token ? this._waitForClient().then((function() {
                                return t._client.request({
                                    method: "post",
                                    endpoint: "payment_methods/apple_payment_tokens",
                                    data: {
                                        _meta: {
                                            source: "apple-pay"
                                        },
                                        applePaymentToken: Object.assign({}, e.token, {
                                            paymentData: btoa(JSON.stringify(e.token.paymentData))
                                        })
                                    }
                                })
                            })).then((function(e) {
                                return o.sendEvent(t._client, "applepay.tokenize.succeeded"), d.resolve(e.applePayCards[0])
                            })).catch((function(e) {
                                return o.sendEvent(t._client, "applepay.tokenize.failed"), d.reject(new r({
                                    type: c.APPLE_PAY_TOKENIZATION.type,
                                    code: c.APPLE_PAY_TOKENIZATION.code,
                                    message: c.APPLE_PAY_TOKENIZATION.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })) : d.reject(new r(c.APPLE_PAY_PAYMENT_TOKEN_REQUIRED))
                        }, h.prototype.teardown = function() {
                            return _(this, l(h.prototype)), d.resolve()
                        }, t.exports = E.wrapPrototype(h)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 79,
                        "@braintree/wrap-promise": 49
                    }],
                    79: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            APPLE_PAY_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "APPLE_PAY_NOT_ENABLED",
                                message: "Apple Pay is not enabled for this merchant."
                            },
                            APPLE_PAY_VALIDATION_URL_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "APPLE_PAY_VALIDATION_URL_REQUIRED",
                                message: "performValidation must be called with a validationURL."
                            },
                            APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
                                type: r.types.NETWORK,
                                code: "APPLE_PAY_MERCHANT_VALIDATION_NETWORK",
                                message: "A network error occurred when validating the Apple Pay merchant."
                            },
                            APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
                                type: r.types.MERCHANT,
                                code: "APPLE_PAY_MERCHANT_VALIDATION_FAILED",
                                message: "Make sure you have registered your domain name in the Braintree Control Panel."
                            },
                            APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "APPLE_PAY_PAYMENT_TOKEN_REQUIRED",
                                message: "tokenize must be called with a payment token."
                            },
                            APPLE_PAY_TOKENIZATION: {
                                type: r.types.NETWORK,
                                code: "APPLE_PAY_TOKENIZATION",
                                message: "A network error occurred when processing the Apple Pay payment."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    80: [function(e, t, n) {
                        "use strict";
                        var r = e("./apple-pay"),
                            o = e("../lib/analytics"),
                            c = e("../lib/braintree-error"),
                            d = e("../lib/basic-component-verification"),
                            l = e("../lib/create-assets-url"),
                            _ = e("../lib/create-deferred-client"),
                            E = e("../lib/promise"),
                            h = e("./errors"),
                            m = "3.85.3",
                            f = e("@braintree/wrap-promise");

                        function y(e) {
                            var t = "Apple Pay";
                            return d.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                var n, d = _.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: l.create(e.authorization),
                                    name: t
                                }).then((function(e) {
                                    return e.getConfiguration().gatewayConfiguration.applePayWeb ? (o.sendEvent(e, "applepay.initialized"), e) : E.reject(new c(h.APPLE_PAY_NOT_ENABLED))
                                }));
                                return e.createPromise = d, n = new r(e), e.useDeferredClient ? n : d.then((function(e) {
                                    return n._client = e, n
                                }))
                            }))
                        }
                        t.exports = {
                            create: f(y),
                            VERSION: m
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./apple-pay": 78,
                        "./errors": 79,
                        "@braintree/wrap-promise": 49
                    }],
                    81: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/browser-detection/is-ie"),
                            o = e("@braintree/browser-detection/is-ie9");
                        t.exports = {
                            isIe: r,
                            isIe9: o
                        }
                    }, {
                        "@braintree/browser-detection/is-ie": 29,
                        "@braintree/browser-detection/is-ie9": 31
                    }],
                    82: [function(e, t, n) {
                        "use strict";
                        var r = e("./constants").BRAINTREE_VERSION,
                            o = e("./request/graphql"),
                            c = e("./request"),
                            d = e("../lib/is-verified-domain"),
                            l = e("../lib/braintree-error"),
                            _ = e("../lib/convert-to-braintree-error"),
                            E = e("./get-configuration").getConfiguration,
                            h = e("../lib/create-authorization-data"),
                            m = e("../lib/add-metadata"),
                            f = e("../lib/promise"),
                            y = e("@braintree/wrap-promise"),
                            A = e("../lib/once"),
                            T = e("../lib/deferred"),
                            I = e("../lib/assign").assign,
                            N = e("../lib/analytics"),
                            O = e("./errors"),
                            v = e("../lib/constants").VERSION,
                            P = e("../lib/constants").GRAPHQL_URLS,
                            C = e("../lib/methods"),
                            R = e("../lib/convert-methods-to-error"),
                            S = e("../lib/assets"),
                            D = e("../lib/constants").FRAUDNET_FNCLS,
                            w = e("../lib/constants").FRAUDNET_SOURCE,
                            L = e("../lib/constants").FRAUDNET_URL,
                            M = {};

                        function U(e) {
                            var t, n;
                            if (e = e || {}, t = JSON.stringify(e), !(n = e.gatewayConfiguration)) throw new l(O.CLIENT_MISSING_GATEWAY_CONFIGURATION);
                            ["assetsUrl", "clientApiUrl", "configUrl"].forEach((function(e) {
                                if (e in n && !d(n[e])) throw new l({
                                    type: O.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
                                    code: O.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
                                    message: e + " property is on an invalid domain."
                                })
                            })), this.getConfiguration = function() {
                                return JSON.parse(t)
                            }, this._request = c, this._configuration = this.getConfiguration(), this._clientApiBaseUrl = n.clientApiUrl + "/v1/", n.graphQL && (this._graphQL = new o({
                                graphQL: n.graphQL
                            }))
                        }

                        function k(e, t) {
                            var n;
                            if (-1 === e ? n = new l(O.CLIENT_REQUEST_TIMEOUT) : 401 === e ? n = new l(O.CLIENT_AUTHORIZATION_INVALID) : 403 === e ? n = new l(O.CLIENT_AUTHORIZATION_INSUFFICIENT) : 429 === e ? n = new l(O.CLIENT_RATE_LIMITED) : e >= 500 ? n = new l(O.CLIENT_GATEWAY_NETWORK) : (e < 200 || e >= 400) && (n = _(t, {
                                    type: O.CLIENT_REQUEST_ERROR.type,
                                    code: O.CLIENT_REQUEST_ERROR.code,
                                    message: O.CLIENT_REQUEST_ERROR.message
                                })), n) return n.details = n.details || {}, n.details.httpStatus = e, n
                        }

                        function F(e) {
                            return {
                                Authorization: "Bearer " + (e.authorizationFingerprint || e.authorization),
                                "Braintree-Version": r
                            }
                        }
                        U.initialize = function(e) {
                            var t, n, r = M[e.authorization];
                            if (r) return N.sendEvent(r, "custom.client.load.cached"), r;
                            try {
                                n = h(e.authorization)
                            } catch (e) {
                                return f.reject(new l(O.CLIENT_INVALID_AUTHORIZATION))
                            }
                            return r = E(n).then((function(n) {
                                return e.debug && (n.isDebug = !0), n.authorization = e.authorization, t = new U(n)
                            })), M[e.authorization] = r, N.sendEvent(r, "custom.client.load.initialized"), r.then((function(e) {
                                return N.sendEvent(t, "custom.client.load.succeeded"), e
                            })).catch((function(t) {
                                return delete M[e.authorization], f.reject(t)
                            }))
                        }, U.clearCache = function() {
                            M = {}
                        }, U.prototype._findOrCreateFraudnetJSON = function(e) {
                            var t, n, r, o, c = document.querySelector('script[fncls="' + D + '"]');
                            c || ((c = document.body.appendChild(document.createElement("script"))).type = "application/json", c.setAttribute("fncls", D)), t = this.getConfiguration(), n = {
                                rda_tenant: "bt_card",
                                mid: t.gatewayConfiguration.merchantId
                            }, (r = t.authorizationFingerprint) && r.split("&").forEach((function(e) {
                                var component = e.split("=");
                                "customer_id" === component[0] && component.length > 1 && (n.cid = component[1])
                            })), o = {
                                f: e.substr(0, 32),
                                fp: n,
                                bu: !1,
                                s: w
                            }, c.text = JSON.stringify(o)
                        }, U.prototype.request = function(e, t) {
                            var n = this,
                                r = new f((function(t, r) {
                                    var o, c, d, E, h = Boolean("payment_methods/credit_cards" === e.endpoint && n.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData);
                                    if ("graphQLApi" !== e.api && (e.method ? e.endpoint || (o = "options.endpoint") : o = "options.method"), o) throw new l({
                                        type: O.CLIENT_OPTION_REQUIRED.type,
                                        code: O.CLIENT_OPTION_REQUIRED.code,
                                        message: o + " is required when making a request."
                                    });
                                    if (c = "api" in e ? e.api : "clientApi", E = {
                                            method: e.method,
                                            graphQL: n._graphQL,
                                            timeout: e.timeout,
                                            metadata: n._configuration.analyticsMetadata
                                        }, "clientApi" === c) d = n._clientApiBaseUrl, E.data = m(n._configuration, e.data);
                                    else {
                                        if ("graphQLApi" !== c) throw new l({
                                            type: O.CLIENT_OPTION_INVALID.type,
                                            code: O.CLIENT_OPTION_INVALID.code,
                                            message: "options.api is invalid."
                                        });
                                        d = P[n._configuration.gatewayConfiguration.environment], e.endpoint = "", E.method = "post", E.data = I({
                                            clientSdkMetadata: {
                                                platform: n._configuration.analyticsMetadata.platform,
                                                source: n._configuration.analyticsMetadata.source,
                                                integration: n._configuration.analyticsMetadata.integration,
                                                sessionId: n._configuration.analyticsMetadata.sessionId,
                                                version: v
                                            }
                                        }, e.data), E.headers = F(n._configuration)
                                    }
                                    E.url = d + e.endpoint, E.sendAnalyticsEvent = function(e) {
                                        N.sendEvent(n, e)
                                    }, n._request(E, (function(e, data, o) {
                                        var d, l;
                                        (l = k(o, e)) ? r(l): "graphQLApi" === c && data.errors ? r(_(data.errors, {
                                            type: O.CLIENT_GRAPHQL_REQUEST_ERROR.type,
                                            code: O.CLIENT_GRAPHQL_REQUEST_ERROR.code,
                                            message: O.CLIENT_GRAPHQL_REQUEST_ERROR.message
                                        })) : (d = I({
                                            _httpStatus: o
                                        }, data), h && d.creditCards && d.creditCards.length > 0 && (n._findOrCreateFraudnetJSON(d.creditCards[0].nonce), S.loadScript({
                                            src: L,
                                            forceScriptReload: !0
                                        })), t(d))
                                    }))
                                }));
                            return "function" == typeof t ? (t = A(T(t)), void r.then((function(e) {
                                t(null, e, e._httpStatus)
                            })).catch((function(e) {
                                var n = e && e.details && e.details.httpStatus;
                                t(e, null, n)
                            }))) : r
                        }, U.prototype.toJSON = function() {
                            return this.getConfiguration()
                        }, U.prototype.getVersion = function() {
                            return v
                        }, U.prototype.teardown = y((function() {
                            var e = this;
                            return delete M[e.getConfiguration().authorization], R(e, C(U.prototype)), f.resolve()
                        })), t.exports = U
                    }, {
                        "../lib/add-metadata": 125,
                        "../lib/analytics": 126,
                        "../lib/assets": 127,
                        "../lib/assign": 128,
                        "../lib/braintree-error": 131,
                        "../lib/constants": 133,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/convert-to-braintree-error": 135,
                        "../lib/create-authorization-data": 137,
                        "../lib/deferred": 139,
                        "../lib/is-verified-domain": 160,
                        "../lib/methods": 162,
                        "../lib/once": 163,
                        "../lib/promise": 164,
                        "./constants": 83,
                        "./errors": 84,
                        "./get-configuration": 85,
                        "./request": 97,
                        "./request/graphql": 95,
                        "@braintree/wrap-promise": 49
                    }],
                    83: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            BRAINTREE_VERSION: "2018-05-10"
                        }
                    }, {}],
                    84: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"
                            },
                            CLIENT_OPTION_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_OPTION_REQUIRED"
                            },
                            CLIENT_OPTION_INVALID: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_OPTION_INVALID"
                            },
                            CLIENT_MISSING_GATEWAY_CONFIGURATION: {
                                type: r.types.INTERNAL,
                                code: "CLIENT_MISSING_GATEWAY_CONFIGURATION",
                                message: "Missing gatewayConfiguration."
                            },
                            CLIENT_INVALID_AUTHORIZATION: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_INVALID_AUTHORIZATION",
                                message: "Authorization is invalid. Make sure your client token or tokenization key is valid."
                            },
                            CLIENT_GATEWAY_NETWORK: {
                                type: r.types.NETWORK,
                                code: "CLIENT_GATEWAY_NETWORK",
                                message: "Cannot contact the gateway at this time."
                            },
                            CLIENT_REQUEST_TIMEOUT: {
                                type: r.types.NETWORK,
                                code: "CLIENT_REQUEST_TIMEOUT",
                                message: "Request timed out waiting for a reply."
                            },
                            CLIENT_REQUEST_ERROR: {
                                type: r.types.NETWORK,
                                code: "CLIENT_REQUEST_ERROR",
                                message: "There was a problem with your request."
                            },
                            CLIENT_GRAPHQL_REQUEST_ERROR: {
                                type: r.types.NETWORK,
                                code: "CLIENT_GRAPHQL_REQUEST_ERROR",
                                message: "There was a problem with your request."
                            },
                            CLIENT_RATE_LIMITED: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_RATE_LIMITED",
                                message: "You are being rate-limited; please try again in a few minutes."
                            },
                            CLIENT_AUTHORIZATION_INSUFFICIENT: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_AUTHORIZATION_INSUFFICIENT",
                                message: "The authorization used has insufficient privileges."
                            },
                            CLIENT_AUTHORIZATION_INVALID: {
                                type: r.types.MERCHANT,
                                code: "CLIENT_AUTHORIZATION_INVALID",
                                message: "Either the client token has expired and a new one should be generated or the tokenization key has been deactivated or deleted."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    85: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("../lib/promise"),
                            c = e("@braintree/wrap-promise"),
                            d = e("./request"),
                            l = e("@braintree/uuid"),
                            _ = e("../lib/constants"),
                            E = e("./errors"),
                            h = e("./request/graphql"),
                            m = e("../lib/constants").GRAPHQL_URLS,
                            f = e("../lib/is-date-string-before-or-on"),
                            y = e("./constants").BRAINTREE_VERSION;

                        function A(e) {
                            return new o((function(t, n) {
                                var o, c, A, T, I = l(),
                                    N = {
                                        merchantAppId: window.location.host,
                                        platform: _.PLATFORM,
                                        sdkVersion: _.VERSION,
                                        source: _.SOURCE,
                                        integration: _.INTEGRATION,
                                        integrationType: _.INTEGRATION,
                                        sessionId: I
                                    };
                                c = e.attrs, A = e.configUrl, c._meta = N, c.braintreeLibraryVersion = _.BRAINTREE_LIBRARY_VERSION, c.configVersion = "3", T = {
                                    url: A,
                                    method: "GET",
                                    data: c
                                }, c.authorizationFingerprint && e.graphQL ? (f(e.graphQL.date, y) && (T.graphQL = new h({
                                    graphQL: {
                                        url: e.graphQL.url,
                                        features: ["configuration"]
                                    }
                                })), T.metadata = N) : c.tokenizationKey && (T.graphQL = new h({
                                    graphQL: {
                                        url: m[e.environment],
                                        features: ["configuration"]
                                    }
                                }), T.metadata = N), d(T, (function(e, d, l) {
                                    var _;
                                    if (e) return _ = 403 === l ? E.CLIENT_AUTHORIZATION_INSUFFICIENT : 401 === l ? E.CLIENT_AUTHORIZATION_INVALID : E.CLIENT_GATEWAY_NETWORK, void n(new r({
                                        type: _.type,
                                        code: _.code,
                                        message: _.message,
                                        details: {
                                            originalError: e
                                        }
                                    }));
                                    o = {
                                        authorizationType: c.tokenizationKey ? "TOKENIZATION_KEY" : "CLIENT_TOKEN",
                                        authorizationFingerprint: c.authorizationFingerprint,
                                        analyticsMetadata: N,
                                        gatewayConfiguration: d
                                    }, t(o)
                                }))
                            }))
                        }
                        t.exports = {
                            getConfiguration: c(A)
                        }
                    }, {
                        "../lib/braintree-error": 131,
                        "../lib/constants": 133,
                        "../lib/is-date-string-before-or-on": 158,
                        "../lib/promise": 164,
                        "./constants": 83,
                        "./errors": 84,
                        "./request": 97,
                        "./request/graphql": 95,
                        "@braintree/uuid": 45,
                        "@braintree/wrap-promise": 49
                    }],
                    86: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("./client"),
                            c = "3.85.3",
                            d = e("../lib/promise"),
                            l = e("@braintree/wrap-promise"),
                            _ = e("../lib/errors");

                        function E(e) {
                            return e.authorization ? o.initialize(e) : d.reject(new r({
                                type: _.INSTANTIATION_OPTION_REQUIRED.type,
                                code: _.INSTANTIATION_OPTION_REQUIRED.code,
                                message: "options.authorization is required when instantiating a client."
                            }))
                        }
                        t.exports = {
                            create: l(E),
                            VERSION: c
                        }
                    }, {
                        "../lib/braintree-error": 131,
                        "../lib/errors": 142,
                        "../lib/promise": 164,
                        "./client": 82,
                        "@braintree/wrap-promise": 49
                    }],
                    87: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/querystring"),
                            o = e("../../lib/assign").assign,
                            c = e("./prep-body"),
                            d = e("./parse-body"),
                            l = e("./xhr"),
                            _ = l.isAvailable,
                            E = e("./graphql/request"),
                            h = e("./default-request"),
                            m = 1,
                            f = 408;

                        function y(e) {
                            return !e || e === f
                        }

                        function A(body) {
                            var e = !body.data && body.errors && body.errors[0] && body.errors[0].extensions && body.errors[0].extensions.errorClass;
                            return "UNKNOWN" === e || "INTERNAL" === e
                        }

                        function T(e, t, n) {
                            var f, I, N, body, O, v, P, C = e.url,
                                R = e.graphQL,
                                S = e.timeout,
                                D = l.getRequestObject(),
                                w = n,
                                L = Boolean(R && R.isGraphQLRequest(C, e.data));
                            e.headers = o({
                                "Content-Type": "application/json"
                            }, e.headers), C = (N = L ? new E(e) : new h(e)).getUrl(), body = N.getBody(), O = N.getMethod(), v = N.getHeaders(), "GET" === O && (C = r.queryify(C, body), body = null), _ ? D.onreadystatechange = function() {
                                if (4 === D.readyState) {
                                    if (0 === D.status && L) return delete e.graphQL, void T(e, t, n);
                                    if (P = d(D.responseText), I = N.adaptResponseBody(P), (f = N.determineStatus(D.status, P)) >= 400 || f < 200) {
                                        if (L && A(P)) return delete e.graphQL, void T(e, t, n);
                                        if (t < m && y(f)) return t++, void T(e, t, n);
                                        w(I || "error", null, f || 500)
                                    } else w(null, I, f)
                                }
                            } : (e.headers && (C = r.queryify(C, v)), D.onload = function() {
                                w(null, d(D.responseText), D.status)
                            }, D.onerror = function() {
                                w("error", null, 500)
                            }, D.onprogress = function() {}, D.ontimeout = function() {
                                w("timeout", null, -1)
                            });
                            try {
                                D.open(O, C, !0)
                            } catch (r) {
                                if (!L) throw r;
                                return delete e.graphQL, void T(e, t, n)
                            }
                            D.timeout = S, _ && Object.keys(v).forEach((function(e) {
                                D.setRequestHeader(e, v[e])
                            }));
                            try {
                                D.send(c(O, body))
                            } catch (e) {}
                        }

                        function I(e, t) {
                            T(e, 0, t)
                        }
                        t.exports = {
                            request: I
                        }
                    }, {
                        "../../lib/assign": 128,
                        "../../lib/querystring": 165,
                        "./default-request": 88,
                        "./graphql/request": 96,
                        "./parse-body": 100,
                        "./prep-body": 101,
                        "./xhr": 102
                    }],
                    88: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            this._url = e.url, this._data = e.data, this._method = e.method, this._headers = e.headers
                        }
                        r.prototype.getUrl = function() {
                            return this._url
                        }, r.prototype.getBody = function() {
                            return this._data
                        }, r.prototype.getMethod = function() {
                            return this._method
                        }, r.prototype.getHeaders = function() {
                            return this._headers
                        }, r.prototype.adaptResponseBody = function(e) {
                            return e
                        }, r.prototype.determineStatus = function(e) {
                            return e
                        }, t.exports = r
                    }, {}],
                    89: [function(e, t, n) {
                        "use strict";
                        t.exports = function() {
                            return window.navigator.userAgent
                        }
                    }, {}],
                    90: [function(e, t, n) {
                        "use strict";
                        var r = e("./error"),
                            o = e("../../../../lib/assign").assign,
                            c = {
                                creditCard: {
                                    AMERICAN_EXPRESS: "American Express",
                                    DISCOVER: "Discover",
                                    INTERNATIONAL_MAESTRO: "Maestro",
                                    JCB: "JCB",
                                    MASTERCARD: "MasterCard",
                                    SOLO: "Solo",
                                    UK_MAESTRO: "UK Maestro",
                                    UNION_PAY: "UnionPay",
                                    VISA: "Visa",
                                    ELO: "Elo",
                                    HIPER: "Hiper",
                                    HIPERCARD: "Hipercard"
                                },
                                applePayWeb: {
                                    VISA: "visa",
                                    MASTERCARD: "mastercard",
                                    DISCOVER: "discover",
                                    AMERICAN_EXPRESS: "amex",
                                    INTERNATIONAL_MAESTRO: "maestro",
                                    ELO: "elo"
                                },
                                visaCheckout: {
                                    VISA: "Visa",
                                    MASTERCARD: "MasterCard",
                                    DISCOVER: "Discover",
                                    AMERICAN_EXPRESS: "American Express"
                                },
                                googlePay: {
                                    VISA: "visa",
                                    MASTERCARD: "mastercard",
                                    DISCOVER: "discover",
                                    AMERICAN_EXPRESS: "amex",
                                    INTERNATIONAL_MAESTRO: "maestro",
                                    ELO: "elo"
                                },
                                masterpass: {
                                    VISA: "visa",
                                    MASTERCARD: "master",
                                    DISCOVER: "discover",
                                    AMERICAN_EXPRESS: "amex",
                                    DINERS: "diners",
                                    INTERNATIONAL_MAESTRO: "maestro",
                                    JCB: "jcb"
                                }
                            };

                        function d(e, t) {
                            return e.data && !e.errors ? l(e, t) : r(e)
                        }

                        function l(body, e) {
                            var t, n = body.data.clientConfiguration;
                            return t = {
                                environment: n.environment.toLowerCase(),
                                clientApiUrl: n.clientApiUrl,
                                assetsUrl: n.assetsUrl,
                                analytics: {
                                    url: n.analyticsUrl
                                },
                                merchantId: n.merchantId,
                                venmo: "off"
                            }, n.supportedFeatures && (t.graphQL = {
                                url: e._graphQL._config.url,
                                features: n.supportedFeatures.map((function(e) {
                                    return e.toLowerCase()
                                }))
                            }), n.braintreeApi && (t.braintreeApi = n.braintreeApi), n.applePayWeb && (t.applePayWeb = n.applePayWeb, t.applePayWeb.supportedNetworks = _(n.applePayWeb.supportedCardBrands, c.applePayWeb), delete t.applePayWeb.supportedCardBrands), n.ideal && (t.ideal = n.ideal), n.kount && (t.kount = {
                                kountMerchantId: n.kount.merchantId
                            }), n.creditCard ? (t.challenges = n.creditCard.challenges.map((function(e) {
                                return e.toLowerCase()
                            })), t.creditCards = {
                                supportedCardTypes: _(n.creditCard.supportedCardBrands, c.creditCard)
                            }, t.threeDSecureEnabled = n.creditCard.threeDSecureEnabled, t.threeDSecure = n.creditCard.threeDSecure) : (t.challenges = [], t.creditCards = {
                                supportedCardTypes: []
                            }, t.threeDSecureEnabled = !1), n.googlePay && (t.androidPay = {
                                displayName: n.googlePay.displayName,
                                enabled: !0,
                                environment: n.googlePay.environment.toLowerCase(),
                                googleAuthorizationFingerprint: n.googlePay.googleAuthorization,
                                paypalClientId: n.googlePay.paypalClientId,
                                supportedNetworks: _(n.googlePay.supportedCardBrands, c.googlePay)
                            }), n.venmo && (t.payWithVenmo = {
                                merchantId: n.venmo.merchantId,
                                accessToken: n.venmo.accessToken,
                                environment: n.venmo.environment.toLowerCase()
                            }), n.paypal ? (t.paypalEnabled = !0, t.paypal = o({}, n.paypal), t.paypal.currencyIsoCode = t.paypal.currencyCode, t.paypal.environment = t.paypal.environment.toLowerCase(), delete t.paypal.currencyCode) : t.paypalEnabled = !1, n.unionPay && (t.unionPay = {
                                enabled: !0,
                                merchantAccountId: n.unionPay.merchantAccountId
                            }), n.visaCheckout && (t.visaCheckout = {
                                apikey: n.visaCheckout.apiKey,
                                encryptionKey: n.visaCheckout.encryptionKey,
                                externalClientId: n.visaCheckout.externalClientId,
                                supportedCardTypes: _(n.visaCheckout.supportedCardBrands, c.visaCheckout)
                            }), n.masterpass && (t.masterpass = {
                                merchantCheckoutId: n.masterpass.merchantCheckoutId,
                                supportedNetworks: _(n.masterpass.supportedCardBrands, c.masterpass)
                            }), n.usBankAccount && (t.usBankAccount = {
                                routeId: n.usBankAccount.routeId,
                                plaid: {
                                    publicKey: n.usBankAccount.plaidPublicKey
                                }
                            }), t
                        }

                        function _(e, t) {
                            return e.reduce((function(e, n) {
                                return t.hasOwnProperty(n) ? e.concat(t[n]) : e
                            }), [])
                        }
                        t.exports = d
                    }, {
                        "../../../../lib/assign": 128,
                        "./error": 92
                    }],
                    91: [function(e, t, n) {
                        "use strict";
                        var r = e("./error"),
                            o = {
                                AMERICAN_EXPRESS: "American Express",
                                DINERS: "Discover",
                                DISCOVER: "Discover",
                                ELO: "Elo",
                                HIPER: "Hiper",
                                HIPERCARD: "Hipercard",
                                INTERNATIONAL_MAESTRO: "Maestro",
                                JCB: "JCB",
                                MASTERCARD: "MasterCard",
                                UK_MAESTRO: "Maestro",
                                UNION_PAY: "UnionPay",
                                VISA: "Visa"
                            },
                            c = {
                                YES: "Yes",
                                NO: "No",
                                UNKNOWN: "Unknown"
                            },
                            d = {
                                PSDTWO: "psd2"
                            };

                        function l(e) {
                            return e.data && !e.errors ? _(e) : r(e)
                        }

                        function _(body) {
                            var e, t, data = body.data.tokenizeCreditCard,
                                n = data.creditCard,
                                r = n.last4 ? n.last4.substr(2, 4) : "",
                                l = n.binData;
                            return l && (["commercial", "debit", "durbinRegulated", "healthcare", "payroll", "prepaid"].forEach((function(e) {
                                l[e] ? l[e] = c[l[e]] : l[e] = "Unknown"
                            })), ["issuingBank", "countryOfIssuance", "productId"].forEach((function(e) {
                                l[e] || (l[e] = "Unknown")
                            }))), e = {
                                creditCards: [{
                                    binData: l,
                                    consumed: !1,
                                    description: r ? "ending in " + r : "",
                                    nonce: data.token,
                                    details: {
                                        cardholderName: n.cardholderName,
                                        expirationMonth: n.expirationMonth,
                                        expirationYear: n.expirationYear,
                                        bin: n.bin || "",
                                        cardType: o[n.brandCode] || "Unknown",
                                        lastFour: n.last4 || "",
                                        lastTwo: r
                                    },
                                    type: "CreditCard",
                                    threeDSecureInfo: null
                                }]
                            }, data.authenticationInsight && (t = data.authenticationInsight.customerAuthenticationRegulationEnvironment, e.creditCards[0].authenticationInsight = {
                                regulationEnvironment: d[t] || t.toLowerCase()
                            }), e
                        }
                        t.exports = l
                    }, {
                        "./error": 92
                    }],
                    92: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t = e.errors && e.errors[0] && e.errors[0].extensions && e.errors[0].extensions.errorClass;
                            return "VALIDATION" === t ? c(e) : t ? o(e) : {
                                error: {
                                    message: "There was a problem serving your request"
                                },
                                fieldErrors: []
                            }
                        }

                        function o(e) {
                            return {
                                error: {
                                    message: e.errors[0].message
                                },
                                fieldErrors: []
                            }
                        }

                        function c(e) {
                            var t = d(e.errors);
                            return 0 === t.length ? {
                                error: {
                                    message: e.errors[0].message
                                }
                            } : {
                                error: {
                                    message: _(t)
                                },
                                fieldErrors: t
                            }
                        }

                        function d(e) {
                            var t = [];
                            return e.forEach((function(e) {
                                e.extensions && e.extensions.inputPath && l(e.extensions.inputPath.slice(1), e, t)
                            })), t
                        }

                        function l(e, t, n) {
                            var r, o = t.extensions.legacyCode,
                                c = e[0];
                            1 !== e.length ? (n.forEach((function(e) {
                                e.field === c && (r = e)
                            })), r || (r = {
                                field: c,
                                fieldErrors: []
                            }, n.push(r)), l(e.slice(1), t, r.fieldErrors)) : n.push({
                                code: o,
                                field: c,
                                message: t.message
                            })
                        }

                        function _(e) {
                            return {
                                creditCard: "Credit card is invalid"
                            }[e[0].field]
                        }
                        t.exports = r
                    }, {}],
                    93: [function(e, t, n) {
                        "use strict";
                        var r = "query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled       threeDSecure {         cardinalAuthenticationJWT       }     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization       paypalClientId     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       privacyUrl       userAgreementUrl       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment     }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }";

                        function o() {
                            return {
                                query: r,
                                operationName: "ClientConfiguration"
                            }
                        }
                        t.exports = o
                    }, {}],
                    94: [function(e, t, n) {
                        "use strict";
                        var r = e("../../../../lib/assign").assign;

                        function o(e) {
                            var t = e.hasAuthenticationInsight,
                                n = "mutation TokenizeCreditCard($input: TokenizeCreditCardInput!";
                            return t && (n += ", $authenticationInsightInput: AuthenticationInsightInput!"), n += ") {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       cardholderName       expirationMonth      expirationYear      binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     } ", t && (n += "    authenticationInsight(input: $authenticationInsightInput) {      customerAuthenticationRegulationEnvironment    }"), n += "  } }"
                        }

                        function c(body, e) {
                            var t = body.creditCard,
                                n = t && t.billingAddress,
                                r = t && t.expirationDate,
                                o = t && (t.expirationMonth || r && r.split("/")[0].trim()),
                                c = t && (t.expirationYear || r && r.split("/")[1].trim()),
                                l = {
                                    input: {
                                        creditCard: {
                                            number: t && t.number,
                                            expirationMonth: o,
                                            expirationYear: c,
                                            cvv: t && t.cvv,
                                            cardholderName: t && t.cardholderName
                                        },
                                        options: {}
                                    }
                                };
                            return e.hasAuthenticationInsight && (l.authenticationInsightInput = {
                                merchantAccountId: body.merchantAccountId
                            }), n && (l.input.creditCard.billingAddress = n), l.input = d(body, l.input), l
                        }

                        function d(body, input) {
                            var e;
                            return body.creditCard && body.creditCard.options && "boolean" == typeof body.creditCard.options.validate ? e = body.creditCard.options.validate : body.authorizationFingerprint && body.tokenizationKey || body.authorizationFingerprint ? e = !0 : body.tokenizationKey && (e = !1), "boolean" == typeof e && (input.options = r({
                                validate: e
                            }, input.options)), input
                        }

                        function l(body) {
                            var e = {
                                hasAuthenticationInsight: Boolean(body.authenticationInsight && body.merchantAccountId)
                            };
                            return {
                                query: o(e),
                                variables: c(body, e),
                                operationName: "TokenizeCreditCard"
                            }
                        }
                        t.exports = l
                    }, {
                        "../../../../lib/assign": 128
                    }],
                    95: [function(e, t, n) {
                        "use strict";
                        var r = e("../../browser-detection"),
                            o = {
                                tokenize_credit_cards: "payment_methods/credit_cards",
                                configuration: "configuration"
                            },
                            c = ["creditCard.options.unionPayEnrollment"];

                        function d(e) {
                            this._config = e.graphQL
                        }

                        function l(body) {
                            return c.some((function(e) {
                                return void 0 !== e.split(".").reduce((function(e, t) {
                                    return e && e[t]
                                }), body)
                            }))
                        }
                        d.prototype.getGraphQLEndpoint = function() {
                            return this._config.url
                        }, d.prototype.isGraphQLRequest = function(e, body) {
                            var t, path = this.getClientApiPath(e);
                            return !(!this._isGraphQLEnabled() || !path || r.isIe9()) && (t = this._config.features.some((function(e) {
                                return o[e] === path
                            })), !l(body) && t)
                        }, d.prototype.getClientApiPath = function(e) {
                            var path, t = "/client_api/v1/",
                                n = e.split(t);
                            return n.length > 1 && (path = n[1].split("?")[0]), path
                        }, d.prototype._isGraphQLEnabled = function() {
                            return Boolean(this._config)
                        }, t.exports = d
                    }, {
                        "../../browser-detection": 81
                    }],
                    96: [function(e, t, n) {
                        "use strict";
                        var r = e("../../constants").BRAINTREE_VERSION,
                            o = e("../../../lib/assign").assign,
                            c = e("./generators/credit-card-tokenization"),
                            d = e("./adapters/credit-card-tokenization"),
                            l = e("./generators/configuration"),
                            _ = e("./adapters/configuration"),
                            E = {
                                "payment_methods/credit_cards": c,
                                configuration: l
                            },
                            h = {
                                "payment_methods/credit_cards": d,
                                configuration: _
                            };

                        function m(e) {
                            var t = e.graphQL.getClientApiPath(e.url);
                            this._graphQL = e.graphQL, this._data = e.data, this._method = e.method, this._headers = e.headers, this._clientSdkMetadata = {
                                source: e.metadata.source,
                                integration: e.metadata.integration,
                                sessionId: e.metadata.sessionId
                            }, this._sendAnalyticsEvent = e.sendAnalyticsEvent || Function.prototype, this._generator = E[t], this._adapter = h[t], this._sendAnalyticsEvent("graphql.init")
                        }

                        function f(e, t) {
                            return !e && t.errors[0].message
                        }

                        function y(e) {
                            return -1 === e.indexOf("_") ? e : e.toLowerCase().replace(/(\_\w)/g, (function(e) {
                                return e[1].toUpperCase()
                            }))
                        }

                        function A(e) {
                            var body = {};
                            return Object.keys(e).forEach((function(t) {
                                var n = y(t);
                                "object" == typeof e[t] ? body[n] = A(e[t]) : "number" == typeof e[t] ? body[n] = String(e[t]) : body[n] = e[t]
                            })), body
                        }
                        m.prototype.getUrl = function() {
                            return this._graphQL.getGraphQLEndpoint()
                        }, m.prototype.getBody = function() {
                            var e = A(this._data),
                                t = this._generator(e),
                                body = o({
                                    clientSdkMetadata: this._clientSdkMetadata
                                }, t);
                            return JSON.stringify(body)
                        }, m.prototype.getMethod = function() {
                            return "POST"
                        }, m.prototype.getHeaders = function() {
                            var e, t;
                            return this._data.authorizationFingerprint ? (this._sendAnalyticsEvent("graphql.authorization-fingerprint"), e = this._data.authorizationFingerprint) : (this._sendAnalyticsEvent("graphql.tokenization-key"), e = this._data.tokenizationKey), t = {
                                Authorization: "Bearer " + e,
                                "Braintree-Version": r
                            }, o({}, this._headers, t)
                        }, m.prototype.adaptResponseBody = function(e) {
                            return this._adapter(e, this)
                        }, m.prototype.determineStatus = function(e, t) {
                            var n, r;
                            return 200 === e ? (r = t.errors && t.errors[0] && t.errors[0].extensions && t.errors[0].extensions.errorClass, n = t.data && !t.errors ? 200 : "VALIDATION" === r ? 422 : "AUTHORIZATION" === r ? 403 : "AUTHENTICATION" === r ? 401 : f(r, t) ? 403 : 500) : n = e || 500, this._sendAnalyticsEvent("graphql.status." + e), this._sendAnalyticsEvent("graphql.determinedStatus." + n), n
                        }, t.exports = m
                    }, {
                        "../../../lib/assign": 128,
                        "../../constants": 83,
                        "./adapters/configuration": 90,
                        "./adapters/credit-card-tokenization": 91,
                        "./generators/configuration": 93,
                        "./generators/credit-card-tokenization": 94
                    }],
                    97: [function(e, t, n) {
                        "use strict";
                        var r, o = e("../../lib/once"),
                            c = e("./jsonp-driver"),
                            d = e("./ajax-driver"),
                            l = e("./get-user-agent"),
                            _ = e("./is-http");

                        function E() {
                            return null == r && (r = !(_() && /MSIE\s(8|9)/.test(l()))), r
                        }
                        t.exports = function(e, t) {
                            t = o(t || Function.prototype), e.method = (e.method || "GET").toUpperCase(), e.timeout = null == e.timeout ? 6e4 : e.timeout, e.data = e.data || {}, E() ? d.request(e, t) : c.request(e, t)
                        }
                    }, {
                        "../../lib/once": 163,
                        "./ajax-driver": 87,
                        "./get-user-agent": 89,
                        "./is-http": 98,
                        "./jsonp-driver": 99
                    }],
                    98: [function(e, t, n) {
                        "use strict";
                        t.exports = function() {
                            return "http:" === window.location.protocol
                        }
                    }, {}],
                    99: [function(e, t, n) {
                        "use strict";
                        var head, r = e("@braintree/uuid"),
                            o = e("../../lib/querystring"),
                            c = {};

                        function d(script) {
                            script && script.parentNode && script.parentNode.removeChild(script)
                        }

                        function l(e, t) {
                            var script = document.createElement("script"),
                                n = !1;
                            return script.src = e, script.async = !0, script.onerror = function() {
                                window[t]({
                                    message: "error",
                                    status: 500
                                })
                            }, script.onload = script.onreadystatechange = function() {
                                n || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (n = !0, script.onload = script.onreadystatechange = null)
                            }, script
                        }

                        function _(e) {
                            try {
                                delete window[e]
                            } catch (t) {
                                window[e] = null
                            }
                        }

                        function E(e, t) {
                            c[t] = setTimeout((function() {
                                c[t] = null, window[t]({
                                    error: "timeout",
                                    status: -1
                                }), window[t] = function() {
                                    _(t)
                                }
                            }), e)
                        }

                        function h(script, e, t) {
                            window[t] = function(n) {
                                var r = n.status || 500,
                                    o = null,
                                    data = null;
                                delete n.status, r >= 400 || r < 200 ? o = n : data = n, _(t), d(script), clearTimeout(c[t]), e(o, data, r)
                            }
                        }

                        function m(e, t) {
                            var script, n = "callback_json_" + r().replace(/-/g, ""),
                                c = e.url,
                                d = e.data,
                                _ = e.method,
                                m = e.timeout;
                            c = o.queryify(c, d), h(script = l(c = o.queryify(c, {
                                _method: _,
                                callback: n
                            }), n), t, n), E(m, n), head || (head = document.getElementsByTagName("head")[0]), head.appendChild(script)
                        }
                        t.exports = {
                            request: m
                        }
                    }, {
                        "../../lib/querystring": 165,
                        "@braintree/uuid": 45
                    }],
                    100: [function(e, t, n) {
                        "use strict";
                        t.exports = function(body) {
                            try {
                                body = JSON.parse(body)
                            } catch (e) {}
                            return body
                        }
                    }, {}],
                    101: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, body) {
                            if ("string" != typeof e) throw new Error("Method must be a string");
                            return "get" !== e.toLowerCase() && null != body && (body = "string" == typeof body ? body : JSON.stringify(body)), body
                        }
                    }, {}],
                    102: [function(e, t, n) {
                        "use strict";
                        var r = "undefined" != typeof window && window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest;

                        function o() {
                            return r ? new window.XMLHttpRequest : new window.XDomainRequest
                        }
                        t.exports = {
                            isAvailable: r,
                            getRequestObject: o
                        }
                    }, {}],
                    103: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            DATA_COLLECTOR_KOUNT_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "DATA_COLLECTOR_KOUNT_NOT_ENABLED",
                                message: "Kount is not enabled for this merchant."
                            },
                            DATA_COLLECTOR_KOUNT_ERROR: {
                                type: r.types.MERCHANT,
                                code: "DATA_COLLECTOR_KOUNT_ERROR"
                            },
                            DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS: {
                                type: r.types.MERCHANT,
                                code: "DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",
                                message: "Data Collector must be created with Kount and/or PayPal."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    104: [function(e, t, n) {
                        "use strict";
                        var r, o = e("../lib/constants").FRAUDNET_FNCLS,
                            c = e("../lib/constants").FRAUDNET_SOURCE,
                            d = e("../lib/constants").FRAUDNET_URL,
                            l = e("../lib/assets").loadScript,
                            _ = e("../lib/promise");

                        function E(e) {
                            var t = new m;
                            return !(e = e || {}).sessionId && r ? (t.sessionId = r, _.resolve(t)) : t.initialize(e)
                        }

                        function h() {
                            r = null
                        }

                        function m() {}

                        function f(element) {
                            element && element.parentNode && element.parentNode.removeChild(element)
                        }

                        function y() {
                            var i, e = "";
                            for (i = 0; i < 32; i++) e += Math.floor(16 * Math.random()).toString(16);
                            return e
                        }

                        function A(e) {
                            return "https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p=" + e + "&t=" + (new Date).getTime() / 1e3 + "&a=14"
                        }

                        function T(e, t, n) {
                            var r = document.body.appendChild(document.createElement("script")),
                                d = {
                                    f: e,
                                    s: c,
                                    b: t
                                };
                            return "production" !== n && (d.sandbox = !0), r.type = "application/json", r.setAttribute("fncls", o), r.text = JSON.stringify(d), r
                        }
                        m.prototype.initialize = function(e) {
                            var t = e.environment,
                                n = this;
                            return this.sessionId = e.sessionId || y(), e.sessionId || (r = this.sessionId), this._beaconId = A(this.sessionId), this._parameterBlock = T(this.sessionId, this._beaconId, t), l({
                                src: d
                            }).then((function(e) {
                                return n._thirdPartyBlock = e, n
                            })).catch((function() {
                                return null
                            }))
                        }, m.prototype.teardown = function() {
                            f(document.querySelector('iframe[title="ppfniframe"]')), f(document.querySelector('iframe[title="pbf"]')), f(this._parameterBlock), f(this._thirdPartyBlock)
                        }, t.exports = {
                            setup: E,
                            clearSessionIdCache: h
                        }
                    }, {
                        "../lib/assets": 127,
                        "../lib/constants": 133,
                        "../lib/promise": 164
                    }],
                    105: [function(e, t, n) {
                        "use strict";
                        var r = e("./kount"),
                            o = e("./fraudnet"),
                            c = e("../lib/braintree-error"),
                            d = e("../lib/basic-component-verification"),
                            l = e("../lib/create-deferred-client"),
                            _ = e("../lib/create-assets-url"),
                            E = e("../lib/methods"),
                            h = e("../lib/convert-methods-to-error"),
                            m = "3.85.3",
                            f = e("../lib/promise"),
                            y = e("@braintree/wrap-promise"),
                            A = e("./errors");

                        function T(e) {
                            var data, t = "Data Collector",
                                n = {
                                    _instances: []
                                };
                            return d.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return n._instantiatedWithAClient = !e.useDeferredClient, n._createPromise = l.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: _.create(e.authorization),
                                    name: t
                                }).then((function(t) {
                                    var o, d = t.getConfiguration();
                                    if (!0 === e.kount && d.gatewayConfiguration.kount) {
                                        try {
                                            o = r.setup({
                                                environment: d.gatewayConfiguration.environment,
                                                merchantId: d.gatewayConfiguration.kount.kountMerchantId
                                            })
                                        } catch (e) {
                                            return f.reject(new c({
                                                type: A.DATA_COLLECTOR_KOUNT_ERROR.type,
                                                code: A.DATA_COLLECTOR_KOUNT_ERROR.code,
                                                message: e.message
                                            }))
                                        }
                                        data = o.deviceData, n._instances.push(o)
                                    } else data = {};
                                    return f.resolve(t)
                                })).then((function(t) {
                                    return o.setup({
                                        sessionId: e.riskCorrelationId || e.clientMetadataId || e.correlationId,
                                        environment: t.getConfiguration().gatewayConfiguration.environment
                                    }).then((function(e) {
                                        e && (data.correlation_id = e.sessionId, n._instances.push(e))
                                    }))
                                })).then((function() {
                                    return 0 === n._instances.length ? f.reject(new c(A.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)) : (n.deviceData = JSON.stringify(data), n.rawDeviceData = data, n)
                                })), n.teardown = I(n), n.getDeviceData = N(n), n._instantiatedWithAClient ? n._createPromise : n
                            }))
                        }

                        function I(e) {
                            return y((function() {
                                return e._createPromise.then((function() {
                                    e._instances.forEach((function(e) {
                                        e && e.teardown()
                                    })), h(e, E(e))
                                }))
                            }))
                        }

                        function N(e) {
                            return y((function(t) {
                                return t = t || {}, e._createPromise.then((function() {
                                    return t.raw ? f.resolve(e.rawDeviceData) : f.resolve(e.deviceData)
                                }))
                            }))
                        }
                        t.exports = {
                            create: y(T),
                            VERSION: m
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 103,
                        "./fraudnet": 104,
                        "./kount": 106,
                        "@braintree/wrap-promise": 49
                    }],
                    106: [function(e, t, n) {
                        "use strict";
                        var r = e("./vendor/sjcl"),
                            o = e("../lib/camel-case-to-snake-case"),
                            c = "https://assets.qa.braintreepayments.com/data",
                            d = "braintreeDataFrame-",
                            l = {
                                development: c,
                                qa: c,
                                sandbox: "https://assets.braintreegateway.com/sandbox/data",
                                production: "https://assets.braintreegateway.com/data"
                            },
                            _ = {};

                        function E(e) {
                            return new h(null != e ? e : {})
                        }

                        function h(e) {
                            var t = h.getCachedDeviceData(e.merchantId);
                            if (t) return this.deviceData = t, void(this._isCached = !0);
                            this._currentEnvironment = this._initializeEnvironment(e), r.random.startCollectors(), this._deviceSessionId = this._generateDeviceSessionId(), this.deviceData = this._getDeviceData(), h.setCachedDeviceData(e.merchantId, this.deviceData), this._iframe = this._setupIFrame()
                        }
                        h.getCachedDeviceData = function(e) {
                            return _[e]
                        }, h.setCachedDeviceData = function(e, data) {
                            _[e] = data
                        }, h.prototype.teardown = function() {
                            this._isCached || (r.random.stopCollectors(), this._removeIframe())
                        }, h.prototype._removeIframe = function() {
                            this._iframe.parentNode.removeChild(this._iframe)
                        }, h.prototype._getDeviceData = function() {
                            return o({
                                deviceSessionId: this._deviceSessionId,
                                fraudMerchantId: this._currentEnvironment.id
                            })
                        }, h.prototype._generateDeviceSessionId = function() {
                            var e;
                            return e = r.random.randomWords(4, 0), r.codec.hex.fromBits(e)
                        }, h.prototype._setupIFrame = function() {
                            var e, iframe, t = this;
                            return e = "?m=" + this._currentEnvironment.id + "&s=" + this._deviceSessionId, (iframe = document.createElement("iframe")).width = 1, iframe.id = d + this._deviceSessionId, iframe.height = 1, iframe.frameBorder = 0, iframe.scrolling = "no", iframe.style.position = "fixed", iframe.style.left = "-999999px", iframe.style.top = "-999999px", iframe.title = "Braintree-Kount-iframe", iframe.setAttribute("aria-hidden", "true"), document.body.appendChild(iframe), setTimeout((function() {
                                iframe.src = t._currentEnvironment.url + "/logo.htm" + e, iframe.innerHTML = '<img src="' + t._currentEnvironment.url + "/logo.gif" + e + '" alt="" />'
                            }), 10), iframe
                        }, h.prototype._initializeEnvironment = function(e) {
                            var t = l[e.environment];
                            if (null == t) throw new Error(e.environment + " is not a valid environment for kount.environment");
                            return {
                                url: t,
                                name: e.environment,
                                id: e.merchantId
                            }
                        }, t.exports = {
                            setup: E,
                            Kount: h,
                            environmentUrls: l
                        }
                    }, {
                        "../lib/camel-case-to-snake-case": 132,
                        "./vendor/sjcl": 107
                    }],
                    107: [function(e, t, r) {
                        "use strict";
                        var o = {
                            cipher: {},
                            hash: {},
                            keyexchange: {},
                            mode: {},
                            misc: {},
                            codec: {},
                            exception: {
                                corrupt: function(a) {
                                    this.toString = function() {
                                        return "CORRUPT: " + this.message
                                    }, this.message = a
                                },
                                invalid: function(a) {
                                    this.toString = function() {
                                        return "INVALID: " + this.message
                                    }, this.message = a
                                },
                                bug: function(a) {
                                    this.toString = function() {
                                        return "BUG: " + this.message
                                    }, this.message = a
                                },
                                notReady: function(a) {
                                    this.toString = function() {
                                        return "NOT READY: " + this.message
                                    }, this.message = a
                                }
                            }
                        };

                        function c(a, b, e) {
                            if (4 !== b.length) throw new o.exception.invalid("invalid aes block size");
                            var t = a.b[e],
                                n = b[0] ^ t[0],
                                r = b[e ? 3 : 1] ^ t[1],
                                g = b[2] ^ t[2];
                            b = b[e ? 1 : 3] ^ t[3];
                            var c, d, p, l, _ = t.length / 4 - 2,
                                E = 4,
                                q = [0, 0, 0, 0];
                            a = (c = a.l[e])[0];
                            var h = c[1],
                                m = c[2],
                                f = c[3],
                                y = c[4];
                            for (l = 0; l < _; l++) c = a[n >>> 24] ^ h[r >> 16 & 255] ^ m[g >> 8 & 255] ^ f[255 & b] ^ t[E], d = a[r >>> 24] ^ h[g >> 16 & 255] ^ m[b >> 8 & 255] ^ f[255 & n] ^ t[E + 1], p = a[g >>> 24] ^ h[b >> 16 & 255] ^ m[n >> 8 & 255] ^ f[255 & r] ^ t[E + 2], b = a[b >>> 24] ^ h[n >> 16 & 255] ^ m[r >> 8 & 255] ^ f[255 & g] ^ t[E + 3], E += 4, n = c, r = d, g = p;
                            for (l = 0; 4 > l; l++) q[e ? 3 & -l : l] = y[n >>> 24] << 24 ^ y[r >> 16 & 255] << 16 ^ y[g >> 8 & 255] << 8 ^ y[255 & b] ^ t[E++], c = n, n = r, r = g, g = b, b = c;
                            return q
                        }

                        function u(a, b) {
                            var e, t, n, r = a.u,
                                g = a.b,
                                o = r[0],
                                c = r[1],
                                p = r[2],
                                d = r[3],
                                l = r[4],
                                _ = r[5],
                                q = r[6],
                                E = r[7];
                            for (e = 0; 64 > e; e++) 16 > e ? t = b[e] : (t = b[e + 1 & 15], n = b[e + 14 & 15], t = b[15 & e] = (t >>> 7 ^ t >>> 18 ^ t >>> 3 ^ t << 25 ^ t << 14) + (n >>> 17 ^ n >>> 19 ^ n >>> 10 ^ n << 15 ^ n << 13) + b[15 & e] + b[e + 9 & 15] | 0), t = t + E + (l >>> 6 ^ l >>> 11 ^ l >>> 25 ^ l << 26 ^ l << 21 ^ l << 7) + (q ^ l & (_ ^ q)) + g[e], E = q, q = _, _ = l, l = d + t | 0, d = p, p = c, o = t + ((c = o) & p ^ d & (c ^ p)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
                            r[0] = r[0] + o | 0, r[1] = r[1] + c | 0, r[2] = r[2] + p | 0, r[3] = r[3] + d | 0, r[4] = r[4] + l | 0, r[5] = r[5] + _ | 0, r[6] = r[6] + q | 0, r[7] = r[7] + E | 0
                        }

                        function d(a, b) {
                            var e, t = o.random.B[a],
                                n = [];
                            for (e in t) t.hasOwnProperty(e) && n.push(t[e]);
                            for (e = 0; e < n.length; e++) n[e](b)
                        }

                        function l(a, b) {
                            "undefined" != typeof window && window.performance && "function" == typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((new Date).valueOf(), b, "loadtime")
                        }

                        function _(a) {
                            a.b = E(a).concat(E(a)), a.C = new o.cipher.aes(a.b)
                        }

                        function E(a) {
                            for (var b = 0; 4 > b && (a.g[b] = a.g[b] + 1 | 0, !a.g[b]); b++);
                            return a.C.encrypt(a.g)
                        }

                        function h(a, b) {
                            return function() {
                                b.apply(a, arguments)
                            }
                        }
                        o.cipher.aes = function(a) {
                            this.l[0][0][0] || this.G();
                            var b, e, t, n, r = this.l[0][4],
                                g = this.l[1],
                                c = 1;
                            if (4 !== (b = a.length) && 6 !== b && 8 !== b) throw new o.exception.invalid("invalid aes key size");
                            for (this.b = [t = a.slice(0), n = []], a = b; a < 4 * b + 28; a++) e = t[a - 1], (0 == a % b || 8 === b && 4 == a % b) && (e = r[e >>> 24] << 24 ^ r[e >> 16 & 255] << 16 ^ r[e >> 8 & 255] << 8 ^ r[255 & e], 0 == a % b && (e = e << 8 ^ e >>> 24 ^ c << 24, c = c << 1 ^ 283 * (c >> 7))), t[a] = t[a - b] ^ e;
                            for (b = 0; a; b++, a--) e = t[3 & b ? a : a - 4], n[b] = 4 >= a || 4 > b ? e : g[0][r[e >>> 24]] ^ g[1][r[e >> 16 & 255]] ^ g[2][r[e >> 8 & 255]] ^ g[3][r[255 & e]]
                        }, o.cipher.aes.prototype = {
                            encrypt: function(a) {
                                return c(this, a, 0)
                            },
                            decrypt: function(a) {
                                return c(this, a, 1)
                            },
                            l: [
                                [
                                    [],
                                    [],
                                    [],
                                    [],
                                    []
                                ],
                                [
                                    [],
                                    [],
                                    [],
                                    [],
                                    []
                                ]
                            ],
                            G: function() {
                                var e, t, g, p, n, r, o, a = this.l[0],
                                    b = this.l[1],
                                    c = a[4],
                                    d = b[4],
                                    l = [],
                                    _ = [];
                                for (e = 0; 256 > e; e++) _[(l[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
                                for (t = g = 0; !c[t]; t ^= p || 1, g = _[g] || 1)
                                    for (r = (r = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4) >> 8 ^ 255 & r ^ 99, c[t] = r, d[r] = t, o = 16843009 * (n = l[e = l[p = l[t]]]) ^ 65537 * e ^ 257 * p ^ 16843008 * t, n = 257 * l[r] ^ 16843008 * r, e = 0; 4 > e; e++) a[e][t] = n = n << 24 ^ n >>> 8, b[e][r] = o = o << 24 ^ o >>> 8;
                                for (e = 0; 5 > e; e++) a[e] = a[e].slice(0), b[e] = b[e].slice(0)
                            }
                        }, o.bitArray = {
                            bitSlice: function(a, b, e) {
                                return a = o.bitArray.M(a.slice(b / 32), 32 - (31 & b)).slice(1), void 0 === e ? a : o.bitArray.clamp(a, e - b)
                            },
                            extract: function(a, b, e) {
                                var t = Math.floor(-b - e & 31);
                                return (-32 & (b + e - 1 ^ b) ? a[b / 32 | 0] << 32 - t ^ a[b / 32 + 1 | 0] >>> t : a[b / 32 | 0] >>> t) & (1 << e) - 1
                            },
                            concat: function(a, b) {
                                if (0 === a.length || 0 === b.length) return a.concat(b);
                                var e = a[a.length - 1],
                                    t = o.bitArray.getPartial(e);
                                return 32 === t ? a.concat(b) : o.bitArray.M(b, t, 0 | e, a.slice(0, a.length - 1))
                            },
                            bitLength: function(a) {
                                var b = a.length;
                                return 0 === b ? 0 : 32 * (b - 1) + o.bitArray.getPartial(a[b - 1])
                            },
                            clamp: function(a, b) {
                                if (32 * a.length < b) return a;
                                var e = (a = a.slice(0, Math.ceil(b / 32))).length;
                                return b &= 31, 0 < e && b && (a[e - 1] = o.bitArray.partial(b, a[e - 1] & 2147483648 >> b - 1, 1)), a
                            },
                            partial: function(a, b, e) {
                                return 32 === a ? b : (e ? 0 | b : b << 32 - a) + 1099511627776 * a
                            },
                            getPartial: function(a) {
                                return Math.round(a / 1099511627776) || 32
                            },
                            equal: function(a, b) {
                                if (o.bitArray.bitLength(a) !== o.bitArray.bitLength(b)) return !1;
                                var e, t = 0;
                                for (e = 0; e < a.length; e++) t |= a[e] ^ b[e];
                                return 0 === t
                            },
                            M: function(a, b, e, t) {
                                var n;
                                for (n = 0, void 0 === t && (t = []); 32 <= b; b -= 32) t.push(e), e = 0;
                                if (0 === b) return t.concat(a);
                                for (n = 0; n < a.length; n++) t.push(e | a[n] >>> b), e = a[n] << 32 - b;
                                return n = a.length ? a[a.length - 1] : 0, a = o.bitArray.getPartial(n), t.push(o.bitArray.partial(b + a & 31, 32 < b + a ? e : t.pop(), 1)), t
                            },
                            Y: function(a, b) {
                                return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]]
                            },
                            byteswapM: function(a) {
                                var b, e;
                                for (b = 0; b < a.length; ++b) e = a[b], a[b] = e >>> 24 | e >>> 8 & 65280 | (65280 & e) << 8 | e << 24;
                                return a
                            }
                        }, o.codec.utf8String = {
                            fromBits: function(a) {
                                var e, t, b = "",
                                    n = o.bitArray.bitLength(a);
                                for (e = 0; e < n / 8; e++) 0 == (3 & e) && (t = a[e / 4]), b += String.fromCharCode(t >>> 8 >>> 8 >>> 8), t <<= 8;
                                return decodeURIComponent(escape(b))
                            },
                            toBits: function(a) {
                                a = unescape(encodeURIComponent(a));
                                var e, b = [],
                                    t = 0;
                                for (e = 0; e < a.length; e++) t = t << 8 | a.charCodeAt(e), 3 == (3 & e) && (b.push(t), t = 0);
                                return 3 & e && b.push(o.bitArray.partial(8 * (3 & e), t)), b
                            }
                        }, o.codec.hex = {
                            fromBits: function(a) {
                                var e, b = "";
                                for (e = 0; e < a.length; e++) b += (0xf00000000000 + (0 | a[e])).toString(16).substr(4);
                                return b.substr(0, o.bitArray.bitLength(a) / 4)
                            },
                            toBits: function(a) {
                                var b, e, t = [];
                                for (e = (a = a.replace(/\s|0x/g, "")).length, a += "00000000", b = 0; b < a.length; b += 8) t.push(0 ^ parseInt(a.substr(b, 8), 16));
                                return o.bitArray.clamp(t, 4 * e)
                            }
                        }, o.hash.sha256 = function(a) {
                            this.b[0] || this.G(), a ? (this.u = a.u.slice(0), this.o = a.o.slice(0), this.h = a.h) : this.reset()
                        }, o.hash.sha256.hash = function(a) {
                            return (new o.hash.sha256).update(a).finalize()
                        }, o.hash.sha256.prototype = {
                            blockSize: 512,
                            reset: function() {
                                return this.u = this.K.slice(0), this.o = [], this.h = 0, this
                            },
                            update: function(a) {
                                "string" == typeof a && (a = o.codec.utf8String.toBits(a));
                                var b, e = this.o = o.bitArray.concat(this.o, a);
                                if (b = this.h, 9007199254740991 < (a = this.h = b + o.bitArray.bitLength(a))) throw new o.exception.invalid("Cannot hash more than 2^53 - 1 bits");
                                if ("undefined" != typeof Uint32Array) {
                                    var t = new Uint32Array(e),
                                        n = 0;
                                    for (b = 512 + b - (512 + b & 511); b <= a; b += 512) u(this, t.subarray(16 * n, 16 * (n + 1))), n += 1;
                                    e.splice(0, 16 * n)
                                } else
                                    for (b = 512 + b - (512 + b & 511); b <= a; b += 512) u(this, e.splice(0, 16));
                                return this
                            },
                            finalize: function() {
                                var a, b = this.o,
                                    e = this.u;
                                for (a = (b = o.bitArray.concat(b, [o.bitArray.partial(1, 1)])).length + 2; 15 & a; a++) b.push(0);
                                for (b.push(Math.floor(this.h / 4294967296)), b.push(0 | this.h); b.length;) u(this, b.splice(0, 16));
                                return this.reset(), e
                            },
                            K: [],
                            b: [],
                            G: function() {
                                function a(a) {
                                    return 4294967296 * (a - Math.floor(a)) | 0
                                }
                                for (var e, t, b = 0, n = 2; 64 > b; n++) {
                                    for (t = !0, e = 2; e * e <= n; e++)
                                        if (0 == n % e) {
                                            t = !1;
                                            break
                                        }
                                    t && (8 > b && (this.K[b] = a(Math.pow(n, .5))), this.b[b] = a(Math.pow(n, 1 / 3)), b++)
                                }
                            }
                        }, o.prng = function(a) {
                            this.c = [new o.hash.sha256], this.i = [0], this.H = 0, this.v = {}, this.F = 0, this.J = {}, this.L = this.f = this.j = this.T = 0, this.b = [0, 0, 0, 0, 0, 0, 0, 0], this.g = [0, 0, 0, 0], this.C = void 0, this.D = a, this.s = !1, this.B = {
                                progress: {},
                                seeded: {}
                            }, this.m = this.S = 0, this.w = 1, this.A = 2, this.O = 65536, this.I = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024], this.P = 3e4, this.N = 80
                        }, o.prng.prototype = {
                            randomWords: function(a, b) {
                                var e, t, n = [];
                                if ((e = this.isReady(b)) === this.m) throw new o.exception.notReady("generator isn't seeded");
                                if (e & this.A) {
                                    e = !(e & this.w), t = [];
                                    var g, r = 0;
                                    for (this.L = t[0] = (new Date).valueOf() + this.P, g = 0; 16 > g; g++) t.push(4294967296 * Math.random() | 0);
                                    for (g = 0; g < this.c.length && (t = t.concat(this.c[g].finalize()), r += this.i[g], this.i[g] = 0, e || !(this.H & 1 << g)); g++);
                                    for (this.H >= 1 << this.c.length && (this.c.push(new o.hash.sha256), this.i.push(0)), this.f -= r, r > this.j && (this.j = r), this.H++, this.b = o.hash.sha256.hash(this.b.concat(t)), this.C = new o.cipher.aes(this.b), e = 0; 4 > e && (this.g[e] = this.g[e] + 1 | 0, !this.g[e]); e++);
                                }
                                for (e = 0; e < a; e += 4) 0 == (e + 1) % this.O && _(this), t = E(this), n.push(t[0], t[1], t[2], t[3]);
                                return _(this), n.slice(0, a)
                            },
                            setDefaultParanoia: function(a, b) {
                                if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b) throw new o.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");
                                this.D = a
                            },
                            addEntropy: function(a, b, e) {
                                e = e || "user";
                                var t, n, r = (new Date).valueOf(),
                                    g = this.v[e],
                                    c = this.isReady(),
                                    l = 0;
                                switch (void 0 === (t = this.J[e]) && (t = this.J[e] = this.T++), void 0 === g && (g = this.v[e] = 0), this.v[e] = (this.v[e] + 1) % this.c.length, typeof a) {
                                    case "number":
                                        void 0 === b && (b = 1), this.c[g].update([t, this.F++, 1, b, r, 1, 0 | a]);
                                        break;
                                    case "object":
                                        if ("[object Uint32Array]" === (e = Object.prototype.toString.call(a))) {
                                            for (n = [], e = 0; e < a.length; e++) n.push(a[e]);
                                            a = n
                                        } else
                                            for ("[object Array]" !== e && (l = 1), e = 0; e < a.length && !l; e++) "number" != typeof a[e] && (l = 1);
                                        if (!l) {
                                            if (void 0 === b)
                                                for (e = b = 0; e < a.length; e++)
                                                    for (n = a[e]; 0 < n;) b++, n >>>= 1;
                                            this.c[g].update([t, this.F++, 2, b, r, a.length].concat(a))
                                        }
                                        break;
                                    case "string":
                                        void 0 === b && (b = a.length), this.c[g].update([t, this.F++, 3, b, r, a.length]), this.c[g].update(a);
                                        break;
                                    default:
                                        l = 1
                                }
                                if (l) throw new o.exception.bug("random: addEntropy only supports number, array of numbers or string");
                                this.i[g] += b, this.f += b, c === this.m && (this.isReady() !== this.m && d("seeded", Math.max(this.j, this.f)), d("progress", this.getProgress()))
                            },
                            isReady: function(a) {
                                return a = this.I[void 0 !== a ? a : this.D], this.j && this.j >= a ? this.i[0] > this.N && (new Date).valueOf() > this.L ? this.A | this.w : this.w : this.f >= a ? this.A | this.m : this.m
                            },
                            getProgress: function(a) {
                                return a = this.I[a || this.D], this.j >= a || this.f > a ? 1 : this.f / a
                            },
                            startCollectors: function() {
                                if (!this.s) {
                                    if (this.a = {
                                            loadTimeCollector: h(this, this.V),
                                            mouseCollector: h(this, this.W),
                                            keyboardCollector: h(this, this.U),
                                            accelerometerCollector: h(this, this.R),
                                            touchCollector: h(this, this.X)
                                        }, window.addEventListener) window.addEventListener("load", this.a.loadTimeCollector, !1), window.addEventListener("mousemove", this.a.mouseCollector, !1), window.addEventListener("keypress", this.a.keyboardCollector, !1), window.addEventListener("devicemotion", this.a.accelerometerCollector, !1), window.addEventListener("touchmove", this.a.touchCollector, !1);
                                    else {
                                        if (!document.attachEvent) throw new o.exception.bug("can't attach event");
                                        document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector)
                                    }
                                    this.s = !0
                                }
                            },
                            stopCollectors: function() {
                                this.s && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, !1), window.removeEventListener("mousemove", this.a.mouseCollector, !1), window.removeEventListener("keypress", this.a.keyboardCollector, !1), window.removeEventListener("devicemotion", this.a.accelerometerCollector, !1), window.removeEventListener("touchmove", this.a.touchCollector, !1)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.s = !1)
                            },
                            addEventListener: function(a, b) {
                                this.B[a][this.S++] = b
                            },
                            removeEventListener: function(a, b) {
                                var e, t, n = this.B[a],
                                    r = [];
                                for (t in n) n.hasOwnProperty(t) && n[t] === b && r.push(t);
                                for (e = 0; e < r.length; e++) delete n[t = r[e]]
                            },
                            U: function() {
                                l(this, 1)
                            },
                            W: function(a) {
                                var b, e;
                                try {
                                    b = a.x || a.clientX || a.offsetX || 0, e = a.y || a.clientY || a.offsetY || 0
                                } catch (t) {
                                    e = b = 0
                                }
                                0 != b && 0 != e && this.addEntropy([b, e], 2, "mouse"), l(this, 0)
                            },
                            X: function(a) {
                                a = a.touches[0] || a.changedTouches[0], this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch"), l(this, 0)
                            },
                            V: function() {
                                l(this, 2)
                            },
                            R: function(a) {
                                if (a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z, window.orientation) {
                                    var b = window.orientation;
                                    "number" == typeof b && this.addEntropy(b, 1, "accelerometer")
                                }
                                a && this.addEntropy(a, 2, "accelerometer"), l(this, 0)
                            }
                        }, o.random = new o.prng(6);
                        e: try {
                            var m, f, y, A;
                            if (A = void 0 !== t && t.exports) {
                                var T;
                                try {
                                    T = e("crypto")
                                } catch (e) {
                                    T = null
                                }
                                A = f = T
                            }
                            if (A && f.randomBytes) m = f.randomBytes(128), m = new Uint32Array(new Uint8Array(m).buffer), o.random.addEntropy(m, 1024, "crypto['randomBytes']");
                            else if ("undefined" != typeof window && "undefined" != typeof Uint32Array) {
                                if (y = new Uint32Array(32), window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(y);
                                else {
                                    if (!window.msCrypto || !window.msCrypto.getRandomValues) break e;
                                    window.msCrypto.getRandomValues(y)
                                }
                                o.random.addEntropy(y, 1024, "crypto['getRandomValues']")
                            }
                        } catch (e) {
                            "undefined" != typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(e))
                        }
                        void 0 !== t && t.exports && (t.exports = o), "function" == typeof n && n([], (function() {
                            return o
                        }))
                    }, {
                        crypto: void 0
                    }],
                    108: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            GOOGLE_PAYMENT_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "GOOGLE_PAYMENT_NOT_ENABLED",
                                message: "Google Pay is not enabled for this merchant."
                            },
                            GOOGLE_PAYMENT_GATEWAY_ERROR: {
                                code: "GOOGLE_PAYMENT_GATEWAY_ERROR",
                                message: "There was an error when tokenizing the Google Pay payment method.",
                                type: r.types.UNKNOWN
                            },
                            GOOGLE_PAYMENT_UNSUPPORTED_VERSION: {
                                code: "GOOGLE_PAYMENT_UNSUPPORTED_VERSION",
                                type: r.types.MERCHANT
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    109: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/assign").assign,
                            c = e("../lib/convert-methods-to-error"),
                            d = e("../lib/find"),
                            l = e("../lib/generate-google-pay-configuration"),
                            _ = e("../lib/braintree-error"),
                            E = e("./errors"),
                            h = e("../lib/methods"),
                            m = e("../lib/promise"),
                            f = e("@braintree/wrap-promise"),
                            y = {
                                1: "_createV1PaymentDataRequest",
                                2: "_createV2PaymentDataRequest"
                            };

                        function A(e) {
                            if (this._createPromise = e.createPromise, this._client = e.client, this._useDeferredClient = e.useDeferredClient, this._googlePayVersion = e.googlePayVersion || 1, this._googleMerchantId = e.googleMerchantId, this._isUnsupportedGooglePayAPIVersion()) throw new _({
                                code: E.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.code,
                                message: "The Braintree SDK does not support Google Pay version " + this._googlePayVersion + ". Please upgrade the version of your Braintree SDK and contact support if this error persists.",
                                type: E.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.type
                            })
                        }

                        function T(e, t) {
                            Object.keys(t).forEach((function(n) {
                                "object" == typeof t[n] ? e[n] = o({}, t[n], e[n]) : e[n] = e[n] || t[n]
                            }))
                        }
                        A.prototype._waitForClient = function() {
                            return this._client ? m.resolve() : this._createPromise.then(function(e) {
                                this._client = e
                            }.bind(this))
                        }, A.prototype._isUnsupportedGooglePayAPIVersion = function() {
                            return !(this._googlePayVersion in y)
                        }, A.prototype._getDefaultConfig = function() {
                            return this._defaultConfig || (this._defaultConfig = l(this._client.getConfiguration(), this._googlePayVersion, this._googleMerchantId)), this._defaultConfig
                        }, A.prototype._createV1PaymentDataRequest = function(e) {
                            var t = this._getDefaultConfig(),
                                n = e.cardRequirements && e.cardRequirements.allowedCardNetworks,
                                r = t.cardRequirements.allowedCardNetworks,
                                c = n || r;
                            return (e = o({}, t, e)).cardRequirements.allowedCardNetworks = c, e
                        }, A.prototype._createV2PaymentDataRequest = function(e) {
                            var t = this._getDefaultConfig();
                            return e.allowedPaymentMethods && e.allowedPaymentMethods.forEach((function(e) {
                                var n = d(t.allowedPaymentMethods, "type", e.type);
                                n && T(e, n)
                            })), e = o({}, t, e)
                        }, A.prototype.createPaymentDataRequest = function(e) {
                            return this._useDeferredClient ? this._waitForClient().then(function() {
                                return this._createPaymentDataRequestSyncronously(e)
                            }.bind(this)) : this._createPaymentDataRequestSyncronously(e)
                        }, A.prototype._createPaymentDataRequestSyncronously = function(e) {
                            var t = o({}, e),
                                n = this._googlePayVersion,
                                c = y[n];
                            return r.sendEvent(this._createPromise, "google-payment.v" + n + ".createPaymentDataRequest"), this[c](t)
                        }, A.prototype.parseResponse = function(e) {
                            var t = this;
                            return m.resolve().then((function() {
                                var n, o = 2 === e.apiVersion ? e.paymentMethodData.tokenizationData.token : e.paymentMethodToken.token,
                                    c = JSON.parse(o),
                                    d = c.error;
                                return d ? m.reject(d) : (r.sendEvent(t._createPromise, "google-payment.parseResponse.succeeded"), c.paypalAccounts ? (n = c.paypalAccounts[0], r.sendEvent(t._createPromise, "google-payment.parseResponse.succeeded.paypal"), m.resolve({
                                    nonce: n.nonce,
                                    type: n.type,
                                    description: n.description
                                })) : (n = c.androidPayCards[0], r.sendEvent(t._createPromise, "google-payment.parseResponse.succeeded.google-payment"), m.resolve({
                                    nonce: n.nonce,
                                    type: n.type,
                                    description: n.description,
                                    details: {
                                        cardType: n.details.cardType,
                                        lastFour: n.details.lastFour,
                                        lastTwo: n.details.lastTwo,
                                        isNetworkTokenized: n.details.isNetworkTokenized,
                                        bin: n.details.bin
                                    },
                                    binData: n.binData
                                })))
                            })).catch((function(e) {
                                return r.sendEvent(t._createPromise, "google-payment.parseResponse.failed"), m.reject(new _({
                                    code: E.GOOGLE_PAYMENT_GATEWAY_ERROR.code,
                                    message: E.GOOGLE_PAYMENT_GATEWAY_ERROR.message,
                                    type: E.GOOGLE_PAYMENT_GATEWAY_ERROR.type,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            }))
                        }, A.prototype.teardown = function() {
                            return c(this, h(A.prototype)), m.resolve()
                        }, t.exports = f.wrapPrototype(A)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/assign": 128,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/find": 144,
                        "../lib/generate-google-pay-configuration": 156,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 108,
                        "@braintree/wrap-promise": 49
                    }],
                    110: [function(e, t, n) {
                        "use strict";
                        var r = e("./google-payment"),
                            o = e("../lib/braintree-error"),
                            c = e("../lib/promise"),
                            d = e("../lib/create-assets-url"),
                            l = e("../lib/create-deferred-client"),
                            _ = e("../lib/basic-component-verification"),
                            E = e("@braintree/wrap-promise"),
                            h = "3.85.3",
                            m = e("./errors");

                        function f(e) {
                            var t = "Google Pay";
                            return _.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                var n, _;
                                return n = l.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                }).then((function(t) {
                                    var n = t.getConfiguration();
                                    return e.client = t, n.gatewayConfiguration.androidPay ? t : c.reject(new o(m.GOOGLE_PAYMENT_NOT_ENABLED))
                                })), e.createPromise = n, _ = new r(e), e.useDeferredClient ? _ : n.then((function(e) {
                                    return _._client = e, _
                                }))
                            }))
                        }
                        t.exports = {
                            create: E(f),
                            VERSION: h
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./errors": 108,
                        "./google-payment": 109,
                        "@braintree/wrap-promise": 49
                    }],
                    111: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error"),
                            o = e("../shared/errors"),
                            c = e("../shared/constants").allowedAttributes;

                        function d(e, t) {
                            var n;
                            return c.hasOwnProperty(e) ? null == t || l(e, t) || (n = new r({
                                type: o.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
                                code: o.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
                                message: 'Value "' + t + '" is not allowed for "' + e + '" attribute.'
                            })) : n = new r({
                                type: o.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
                                code: o.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
                                message: 'The "' + e + '" attribute is not supported in Hosted Fields.'
                            }), n
                        }

                        function l(e, t) {
                            return "string" === c[e] ? "string" == typeof t || "number" == typeof t : "boolean" === c[e] && ("true" === String(t) || "false" === String(t))
                        }
                        t.exports = d
                    }, {
                        "../../lib/braintree-error": 131,
                        "../shared/constants": 119,
                        "../shared/errors": 120
                    }],
                    112: [function(e, t, n) {
                        "use strict";
                        var r = e("../shared/constants"),
                            o = e("../../lib/use-min");
                        t.exports = function(e, t, n) {
                            return e + "/web/" + r.VERSION + "/html/hosted-fields-frame" + o(n) + ".html#" + t
                        }
                    }, {
                        "../../lib/use-min": 167,
                        "../shared/constants": 119
                    }],
                    113: [function(e, t, n) {
                        "use strict";
                        var r = e("../shared/constants").navigationDirections,
                            o = e("../shared/browser-detection"),
                            c = e("../shared/focus-intercept"),
                            d = e("../shared/find-parent-tags"),
                            l = ["INPUT", "SELECT", "TEXTAREA"],
                            _ = ["hidden", "button", "reset", "submit", "checkbox", "radio", "file"];

                        function E(element) {
                            return o.hasSoftwareKeyboard() ? l.indexOf(element.tagName) > -1 && _.indexOf(element.type) < 0 : "hidden" !== element.type
                        }

                        function h(e, t) {
                            switch (e) {
                                case r.BACK:
                                    return {
                                        checkIndexBounds: function(e) {
                                            return e < 0
                                        },
                                        indexChange: -1
                                    };
                                case r.FORWARD:
                                    return {
                                        checkIndexBounds: function(e) {
                                            return e > t - 1
                                        },
                                        indexChange: 1
                                    }
                            }
                            return {}
                        }

                        function m(e) {
                            var t, element;
                            for (t = 0; t < e.length; t++)
                                if (E(element = e[t])) return element;
                            return null
                        }
                        t.exports = {
                            removeExtraFocusElements: function(e, t) {
                                var n = Array.prototype.slice.call(e.elements);
                                [m(n), m(n.reverse())].forEach((function(input) {
                                    input && c.matchFocusElement(input.getAttribute("id")) && t(input.getAttribute("id"))
                                }))
                            },
                            createFocusChangeHandler: function(e, t) {
                                return function(data) {
                                    var n, r, o, l, _ = document.getElementById("bt-" + data.field + "-" + data.direction + "-" + e);
                                    if (_)
                                        if (o = d(_, "form")[0], document.forms.length < 1 || !o) t.onRemoveFocusIntercepts();
                                        else {
                                            n = (o = [].slice.call(o.elements)).indexOf(_), l = h(data.direction, o.length);
                                            do {
                                                if (n += l.indexChange, l.checkIndexBounds(n)) return;
                                                r = o[n]
                                            } while (!E(r));
                                            c.matchFocusElement(r.getAttribute("id")) ? t.onTriggerInputFocus(r.getAttribute("data-braintree-type")) : r.focus()
                                        }
                                }
                            }
                        }
                    }, {
                        "../shared/browser-detection": 118,
                        "../shared/constants": 119,
                        "../shared/find-parent-tags": 121,
                        "../shared/focus-intercept": 122
                    }],
                    114: [function(e, t, n) {
                        "use strict";
                        var r = e("../shared/constants").allowedStyles;
                        t.exports = function(e) {
                            var t, element = document.createElement("input"),
                                n = {};
                            return "." === e[0] && (e = e.substring(1)), element.className = e, element.style.display = "none !important", element.style.position = "fixed !important", element.style.left = "-99999px !important", element.style.top = "-99999px !important", document.body.appendChild(element), t = window.getComputedStyle(element), r.forEach((function(style) {
                                var e = t[style];
                                e && (n[style] = e)
                            })), document.body.removeChild(element), n
                        }
                    }, {
                        "../shared/constants": 119
                    }],
                    115: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/assign").assign,
                            o = e("../../lib/create-assets-url"),
                            c = e("../../lib/is-verified-domain"),
                            d = e("../../lib/destructor"),
                            l = e("@braintree/class-list"),
                            _ = e("@braintree/iframer"),
                            E = e("framebus"),
                            h = e("../../lib/create-deferred-client"),
                            m = e("../../lib/braintree-error"),
                            f = e("./compose-url"),
                            y = e("./get-styles-from-class"),
                            A = e("../shared/constants"),
                            T = e("../shared/errors"),
                            I = e("../../lib/constants").INTEGRATION_TIMEOUT_MS,
                            N = e("@braintree/uuid"),
                            O = e("../shared/find-parent-tags"),
                            v = e("../shared/browser-detection"),
                            P = A.events,
                            C = e("@braintree/event-emitter"),
                            R = e("./inject-frame"),
                            S = e("../../lib/analytics"),
                            D = A.allowedFields,
                            w = e("../../lib/methods"),
                            shadow = e("../../lib/shadow"),
                            L = e("../../lib/find-root-node"),
                            M = e("../../lib/convert-methods-to-error"),
                            U = e("../../lib/errors"),
                            k = e("../shared/get-card-types"),
                            F = e("./attribute-validation-error"),
                            x = e("../../lib/promise"),
                            V = e("@braintree/wrap-promise"),
                            H = e("./focus-change"),
                            Y = e("../shared/focus-intercept").destroy,
                            K = 5;

                        function z(e) {
                            return function(t) {
                                var n, r = t.merchantPayload,
                                    o = r.emittedBy,
                                    c = e[o].containerElement;
                                Object.keys(r.fields).forEach((function(t) {
                                    r.fields[t].container = e[t].containerElement
                                })), n = r.fields[o], l.toggle(c, A.externalClasses.FOCUSED, n.isFocused), l.toggle(c, A.externalClasses.VALID, n.isValid), l.toggle(c, A.externalClasses.INVALID, !n.isPotentiallyValid), this._state = {
                                    cards: r.cards,
                                    fields: r.fields
                                }, this._emit(t.type, r)
                            }
                        }

                        function B(e) {
                            var t = e.getBoundingClientRect(),
                                n = Math.floor(t.height / 2),
                                r = Math.floor(t.width / 2);
                            return t.top < (window.innerHeight - n || document.documentElement.clientHeight - n) && t.right > r && t.bottom > n && t.left < (window.innerWidth - r || document.documentElement.clientWidth - r)
                        }

                        function W(e) {
                            var t, n, O, D, L, F = this,
                                V = {},
                                K = {},
                                B = [],
                                G = N();
                            if (this._merchantConfigurationOptions = r({}, e), e.client ? (O = (n = e.client.getConfiguration()).gatewayConfiguration.assetsUrl, D = n.isDebug) : (O = o.create(e.authorization), D = Boolean(e.isDebug)), this._clientPromise = h.create({
                                    client: e.client,
                                    authorization: e.authorization,
                                    debug: D,
                                    assetsUrl: O,
                                    name: "Hosted Fields"
                                }), L = f(O, G, D), !e.fields || 0 === Object.keys(e.fields).length) throw new m({
                                type: U.INSTANTIATION_OPTION_REQUIRED.type,
                                code: U.INSTANTIATION_OPTION_REQUIRED.code,
                                message: "options.fields is required when instantiating Hosted Fields."
                            });
                            C.call(this), this._injectedNodes = [], this._destructor = new d, this._fields = V, this._state = {
                                fields: {},
                                cards: k("")
                            }, this._bus = new E({
                                channel: G,
                                verifyDomain: c
                            }), this._destructor.registerFunctionForTeardown((function() {
                                F._bus.teardown()
                            })), e.client ? S.sendEvent(this._clientPromise, "custom.hosted-fields.initialized") : S.sendEvent(this._clientPromise, "custom.hosted-fields.initialized.deferred-client"), Object.keys(e.fields).forEach(function(t) {
                                var n, r, o, c, d;
                                if (!A.allowedFields.hasOwnProperty(t)) throw new m({
                                    type: T.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
                                    code: T.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
                                    message: '"' + t + '" is not a valid field.'
                                });
                                if ("string" == typeof(r = (n = e.fields[t]).container || n.selector) && (r = document.querySelector(r)), !r || 1 !== r.nodeType) throw new m({
                                    type: T.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
                                    code: T.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
                                    message: T.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
                                    details: {
                                        fieldSelector: n.selector,
                                        fieldContainer: n.container,
                                        fieldKey: t
                                    }
                                });
                                if (r.querySelector('iframe[name^="braintree-"]')) throw new m({
                                    type: T.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
                                    code: T.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
                                    message: T.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
                                    details: {
                                        fieldSelector: n.selector,
                                        fieldContainer: n.container,
                                        fieldKey: t
                                    }
                                });
                                if (o = r, shadow.isShadowElement(o) && (o = shadow.transformToSlot(o, "height: 100%")), n.maxlength && "number" != typeof n.maxlength) throw new m({
                                    type: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                                    code: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                                    message: "The value for maxlength must be a number.",
                                    details: {
                                        fieldKey: t
                                    }
                                });
                                if (n.minlength && "number" != typeof n.minlength) throw new m({
                                    type: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                                    code: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                                    message: "The value for minlength must be a number.",
                                    details: {
                                        fieldKey: t
                                    }
                                });
                                c = _({
                                    type: t,
                                    name: "braintree-hosted-field-" + t,
                                    style: A.defaultIFrameStyle,
                                    title: n.iframeTitle || "Secure Credit Card Frame - " + A.allowedFields[t].label
                                }), this._injectedNodes.push.apply(this._injectedNodes, R(G, c, o, (function() {
                                    F.focus(t)
                                }))), this._setupLabelFocus(t, r), V[t] = {
                                    frameElement: c,
                                    containerElement: r
                                }, d = new x((function(e) {
                                    K[t] = e
                                })), B.push(d), this._state.fields[t] = {
                                    isEmpty: !0,
                                    isValid: !1,
                                    isPotentiallyValid: !0,
                                    isFocused: !1,
                                    container: r
                                }, setTimeout((function() {
                                    v.isIE() || v.isEdge() ? (c.src = "about:blank", setTimeout((function() {
                                        c.src = L
                                    }), 0)) : c.src = L
                                }), 0)
                            }.bind(this)), this._merchantConfigurationOptions.styles && Object.keys(this._merchantConfigurationOptions.styles).forEach((function(e) {
                                var t = F._merchantConfigurationOptions.styles[e];
                                "string" == typeof t && (F._merchantConfigurationOptions.styles[e] = y(t))
                            })), this._bus.on(P.REMOVE_FOCUS_INTERCEPTS, (function(data) {
                                Y(data && data.id)
                            })), this._bus.on(P.TRIGGER_FOCUS_CHANGE, H.createFocusChangeHandler(G, {
                                onRemoveFocusIntercepts: function(element) {
                                    F._bus.emit(P.REMOVE_FOCUS_INTERCEPTS, {
                                        id: element
                                    })
                                },
                                onTriggerInputFocus: function(e) {
                                    F.focus(e)
                                }
                            })), this._bus.on(P.READY_FOR_CLIENT, (function(e) {
                                F._clientPromise.then((function(t) {
                                    e(t)
                                }))
                            })), this._bus.on(P.CARD_FORM_ENTRY_HAS_BEGUN, (function() {
                                S.sendEvent(F._clientPromise, "hosted-fields.input.started")
                            })), this._bus.on(P.BIN_AVAILABLE, (function(e) {
                                F._emit("binAvailable", {
                                    bin: e
                                })
                            })), t = setTimeout((function() {
                                S.sendEvent(F._clientPromise, "custom.hosted-fields.load.timed-out"), F._emit("timeout")
                            }), I), x.all(B).then((function(e) {
                                var n = e[0];
                                clearTimeout(t), n(j(F._merchantConfigurationOptions)), F._cleanUpFocusIntercepts(), F._emit("ready")
                            })), this._bus.on(P.FRAME_READY, (function(data, e) {
                                K[data.field](e)
                            })), this._bus.on(P.INPUT_EVENT, z(V).bind(this)), this._destructor.registerFunctionForTeardown((function() {
                                var e, t, n;
                                for (e = 0; e < F._injectedNodes.length; e++)(n = (t = F._injectedNodes[e]).parentNode).removeChild(t), l.remove(n, A.externalClasses.FOCUSED, A.externalClasses.INVALID, A.externalClasses.VALID)
                            })), this._destructor.registerFunctionForTeardown((function() {
                                Y()
                            })), this._destructor.registerFunctionForTeardown((function() {
                                var e = w(W.prototype).concat(w(C.prototype));
                                M(F, e)
                            }))
                        }

                        function j(e) {
                            var t = r({}, e);
                            return t.fields = r({}, t.fields), Object.keys(t.fields).forEach((function(e) {
                                t.fields[e] = r({}, t.fields[e]), delete t.fields[e].container
                            })), t
                        }
                        C.createChild(W), W.prototype._setupLabelFocus = function(e, t) {
                            var n, i, r = this,
                                o = L(t);
                            if (null != t.id) {
                                for (n = Array.prototype.slice.call(document.querySelectorAll('label[for="' + t.id + '"]')), o !== document && (n = n.concat(Array.prototype.slice.call(o.querySelectorAll('label[for="' + t.id + '"]')))), n = (n = n.concat(O(t, "label"))).filter((function(label, e, t) {
                                        return t.indexOf(label) === e
                                    })), i = 0; i < n.length; i++) n[i].addEventListener("click", c, !1);
                                this._destructor.registerFunctionForTeardown((function() {
                                    for (i = 0; i < n.length; i++) n[i].removeEventListener("click", c, !1)
                                }))
                            }

                            function c() {
                                r.focus(e)
                            }
                        }, W.prototype._getAnyFieldContainer = function() {
                            var e = this;
                            return Object.keys(this._fields).reduce((function(t, n) {
                                return t || e._fields[n].containerElement
                            }), null)
                        }, W.prototype._cleanUpFocusIntercepts = function() {
                            var e, t;
                            document.forms.length < 1 ? this._bus.emit(P.REMOVE_FOCUS_INTERCEPTS) : (e = this._getAnyFieldContainer(), (t = O(e, "form")[0]) ? H.removeExtraFocusElements(t, function(e) {
                                this._bus.emit(P.REMOVE_FOCUS_INTERCEPTS, {
                                    id: e
                                })
                            }.bind(this)) : this._bus.emit(P.REMOVE_FOCUS_INTERCEPTS))
                        }, W.prototype._attachInvalidFieldContainersToError = function(e) {
                            e.details && e.details.invalidFieldKeys && e.details.invalidFieldKeys.length > 0 && (e.details.invalidFields = {}, e.details.invalidFieldKeys.forEach(function(t) {
                                e.details.invalidFields[t] = this._fields[t].containerElement
                            }.bind(this)))
                        }, W.prototype.getChallenges = function() {
                            return this._clientPromise.then((function(e) {
                                return e.getConfiguration().gatewayConfiguration.challenges
                            }))
                        }, W.prototype.getSupportedCardTypes = function() {
                            return this._clientPromise.then((function(e) {
                                return e.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes.map((function(e) {
                                    return "MasterCard" === e ? "Mastercard" : e
                                }))
                            }))
                        }, W.prototype.teardown = function() {
                            var e = this;
                            return new x((function(t, n) {
                                e._destructor.teardown((function(r) {
                                    S.sendEvent(e._clientPromise, "custom.hosted-fields.teardown-completed"), r ? n(r) : t()
                                }))
                            }))
                        }, W.prototype.tokenize = function(e) {
                            var t = this;
                            return e || (e = {}), new x((function(n, r) {
                                t._bus.emit(P.TOKENIZATION_REQUEST, e, (function(e) {
                                    var o = e[0],
                                        c = e[1];
                                    o ? (t._attachInvalidFieldContainersToError(o), r(new m(o))) : n(c)
                                }))
                            }))
                        }, W.prototype.addClass = function(e, t) {
                            var n;
                            return D.hasOwnProperty(e) ? this._fields.hasOwnProperty(e) ? this._bus.emit(P.ADD_CLASS, {
                                field: e,
                                classname: t
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot add class to "' + e + '" field because it is not part of the current Hosted Fields options.'
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e + '" is not a valid field. You must use a valid field option when adding a class.'
                            }), n ? x.reject(n) : x.resolve()
                        }, W.prototype.removeClass = function(e, t) {
                            var n;
                            return D.hasOwnProperty(e) ? this._fields.hasOwnProperty(e) ? this._bus.emit(P.REMOVE_CLASS, {
                                field: e,
                                classname: t
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot remove class from "' + e + '" field because it is not part of the current Hosted Fields options.'
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e + '" is not a valid field. You must use a valid field option when removing a class.'
                            }), n ? x.reject(n) : x.resolve()
                        }, W.prototype.setAttribute = function(e) {
                            var t, n;
                            return D.hasOwnProperty(e.field) ? this._fields.hasOwnProperty(e.field) ? (t = F(e.attribute, e.value)) ? n = t : this._bus.emit(P.SET_ATTRIBUTE, {
                                field: e.field,
                                attribute: e.attribute,
                                value: e.value
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot set attribute for "' + e.field + '" field because it is not part of the current Hosted Fields options.'
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
                            }), n ? x.reject(n) : x.resolve()
                        }, W.prototype.setMonthOptions = function(e) {
                            var t, n = this,
                                r = this._merchantConfigurationOptions.fields;
                            return r.expirationMonth ? r.expirationMonth.select || (t = "Expiration month field must be a select element.") : t = "Expiration month field must exist to use setMonthOptions.", t ? x.reject(new m({
                                type: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                                message: t
                            })) : new x((function(t) {
                                n._bus.emit(P.SET_MONTH_OPTIONS, e, t)
                            }))
                        }, W.prototype.setMessage = function(e) {
                            this._bus.emit(P.SET_MESSAGE, {
                                field: e.field,
                                message: e.message
                            })
                        }, W.prototype.removeAttribute = function(e) {
                            var t, n;
                            return D.hasOwnProperty(e.field) ? this._fields.hasOwnProperty(e.field) ? (t = F(e.attribute)) ? n = t : this._bus.emit(P.REMOVE_ATTRIBUTE, {
                                field: e.field,
                                attribute: e.attribute
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot remove attribute for "' + e.field + '" field because it is not part of the current Hosted Fields options.'
                            }) : n = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
                            }), n ? x.reject(n) : x.resolve()
                        }, W.prototype.setPlaceholder = function(e, t) {
                            return this.setAttribute({
                                field: e,
                                attribute: "placeholder",
                                value: t
                            })
                        }, W.prototype.clear = function(e) {
                            var t;
                            return D.hasOwnProperty(e) ? this._fields.hasOwnProperty(e) ? this._bus.emit(P.CLEAR_FIELD, {
                                field: e
                            }) : t = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot clear "' + e + '" field because it is not part of the current Hosted Fields options.'
                            }) : t = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e + '" is not a valid field. You must use a valid field option when clearing a field.'
                            }), t ? x.reject(t) : x.resolve()
                        }, W.prototype.focus = function(e) {
                            var t, n = this._fields[e];
                            return D.hasOwnProperty(e) ? this._fields.hasOwnProperty(e) ? (n.frameElement.focus(), this._bus.emit(P.TRIGGER_INPUT_FOCUS, {
                                field: e
                            }), v.isIos() && setTimeout((function() {
                                B(n.containerElement) || n.containerElement.scrollIntoView()
                            }), K)) : t = new m({
                                type: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                                code: T.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                                message: 'Cannot focus "' + e + '" field because it is not part of the current Hosted Fields options.'
                            }) : t = new m({
                                type: T.HOSTED_FIELDS_FIELD_INVALID.type,
                                code: T.HOSTED_FIELDS_FIELD_INVALID.code,
                                message: '"' + e + '" is not a valid field. You must use a valid field option when focusing a field.'
                            }), t ? x.reject(t) : x.resolve()
                        }, W.prototype.getState = function() {
                            return this._state
                        }, t.exports = V.wrapPrototype(W)
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/assign": 128,
                        "../../lib/braintree-error": 131,
                        "../../lib/constants": 133,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/create-assets-url": 136,
                        "../../lib/create-deferred-client": 138,
                        "../../lib/destructor": 140,
                        "../../lib/errors": 142,
                        "../../lib/find-root-node": 143,
                        "../../lib/is-verified-domain": 160,
                        "../../lib/methods": 162,
                        "../../lib/promise": 164,
                        "../../lib/shadow": 166,
                        "../shared/browser-detection": 118,
                        "../shared/constants": 119,
                        "../shared/errors": 120,
                        "../shared/find-parent-tags": 121,
                        "../shared/focus-intercept": 122,
                        "../shared/get-card-types": 123,
                        "./attribute-validation-error": 111,
                        "./compose-url": 112,
                        "./focus-change": 113,
                        "./get-styles-from-class": 114,
                        "./inject-frame": 116,
                        "@braintree/class-list": 38,
                        "@braintree/event-emitter": 39,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        "@braintree/wrap-promise": 49,
                        framebus: 58
                    }],
                    116: [function(e, t, n) {
                        "use strict";
                        var r = e("../shared/focus-intercept"),
                            o = e("../shared/constants").navigationDirections;
                        t.exports = function(e, t, n, c) {
                            var d = t.getAttribute("type"),
                                l = document.createElement("div"),
                                _ = document.createDocumentFragment(),
                                E = r.generate(e, d, o.BACK, c),
                                h = r.generate(e, d, o.FORWARD, c);
                            return l.style.clear = "both", _.appendChild(E), _.appendChild(t), _.appendChild(h), _.appendChild(l), n.appendChild(_), [t, l]
                        }
                    }, {
                        "../shared/constants": 119,
                        "../shared/focus-intercept": 122
                    }],
                    117: [function(e, t, n) {
                        "use strict";
                        var r = e("./external/hosted-fields"),
                            o = e("../lib/basic-component-verification"),
                            c = e("./shared/errors"),
                            d = e("restricted-input/supports-input-formatting"),
                            l = e("@braintree/wrap-promise"),
                            _ = e("../lib/braintree-error"),
                            E = e("../lib/promise"),
                            h = "3.85.3";

                        function m(e) {
                            return o.verify({
                                name: "Hosted Fields",
                                authorization: e.authorization,
                                client: e.client
                            }).then((function() {
                                var t = new r(e);
                                return new E((function(e, n) {
                                    t.on("ready", (function() {
                                        e(t)
                                    })), t.on("timeout", (function() {
                                        n(new _(c.HOSTED_FIELDS_TIMEOUT))
                                    }))
                                }))
                            }))
                        }
                        t.exports = {
                            supportsInputFormatting: d,
                            create: l(m),
                            VERSION: h
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/promise": 164,
                        "./external/hosted-fields": 115,
                        "./shared/errors": 120,
                        "@braintree/wrap-promise": 49,
                        "restricted-input/supports-input-formatting": 74
                    }],
                    118: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/browser-detection/is-android"),
                            o = e("@braintree/browser-detection/is-chrome-os"),
                            c = e("@braintree/browser-detection/is-ios"),
                            d = e("@braintree/browser-detection/is-chrome");

                        function l() {
                            return r() || o() || c()
                        }

                        function _() {
                            return d() && c()
                        }
                        t.exports = {
                            isIE: e("@braintree/browser-detection/is-ie"),
                            isEdge: e("@braintree/browser-detection/is-edge"),
                            isIe9: e("@braintree/browser-detection/is-ie9"),
                            isIe10: e("@braintree/browser-detection/is-ie10"),
                            isAndroid: r,
                            isChromeOS: o,
                            isChromeIos: _,
                            isFirefox: e("@braintree/browser-detection/is-firefox"),
                            isIos: c,
                            isIosWebview: e("@braintree/browser-detection/is-ios-webview"),
                            hasSoftwareKeyboard: l
                        }
                    }, {
                        "@braintree/browser-detection/is-android": 24,
                        "@braintree/browser-detection/is-chrome": 26,
                        "@braintree/browser-detection/is-chrome-os": 25,
                        "@braintree/browser-detection/is-edge": 27,
                        "@braintree/browser-detection/is-firefox": 28,
                        "@braintree/browser-detection/is-ie": 29,
                        "@braintree/browser-detection/is-ie10": 30,
                        "@braintree/browser-detection/is-ie9": 31,
                        "@braintree/browser-detection/is-ios": 35,
                        "@braintree/browser-detection/is-ios-webview": 33
                    }],
                    119: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/enumerate"),
                            o = e("./errors"),
                            c = {
                                VERSION: "3.85.3",
                                maxExpirationYearAge: 19,
                                externalEvents: {
                                    FOCUS: "focus",
                                    BLUR: "blur",
                                    EMPTY: "empty",
                                    NOT_EMPTY: "notEmpty",
                                    VALIDITY_CHANGE: "validityChange",
                                    CARD_TYPE_CHANGE: "cardTypeChange"
                                },
                                defaultMaxLengths: {
                                    number: 19,
                                    postalCode: 8,
                                    expirationDate: 7,
                                    expirationMonth: 2,
                                    expirationYear: 4,
                                    cvv: 3
                                },
                                externalClasses: {
                                    FOCUSED: "braintree-hosted-fields-focused",
                                    INVALID: "braintree-hosted-fields-invalid",
                                    VALID: "braintree-hosted-fields-valid"
                                },
                                navigationDirections: {
                                    BACK: "before",
                                    FORWARD: "after"
                                },
                                defaultIFrameStyle: {
                                    border: "none",
                                    width: "100%",
                                    height: "100%",
                                    float: "left"
                                },
                                tokenizationErrorCodes: {
                                    81724: o.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
                                    81736: o.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
                                },
                                allowedStyles: ["-moz-appearance", "-moz-box-shadow", "-moz-osx-font-smoothing", "-moz-tap-highlight-color", "-moz-transition", "-webkit-appearance", "-webkit-box-shadow", "-webkit-font-smoothing", "-webkit-tap-highlight-color", "-webkit-transition", "appearance", "box-shadow", "color", "direction", "font", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-weight", "letter-spacing", "line-height", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "opacity", "outline", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "text-align", "text-shadow", "transition"],
                                allowedFields: {
                                    cardholderName: {
                                        name: "cardholder-name",
                                        label: "Cardholder Name"
                                    },
                                    number: {
                                        name: "credit-card-number",
                                        label: "Credit Card Number"
                                    },
                                    cvv: {
                                        name: "cvv",
                                        label: "CVV"
                                    },
                                    expirationDate: {
                                        name: "expiration",
                                        label: "Expiration Date"
                                    },
                                    expirationMonth: {
                                        name: "expiration-month",
                                        label: "Expiration Month"
                                    },
                                    expirationYear: {
                                        name: "expiration-year",
                                        label: "Expiration Year"
                                    },
                                    postalCode: {
                                        name: "postal-code",
                                        label: "Postal Code"
                                    }
                                },
                                allowedAttributes: {
                                    "aria-invalid": "boolean",
                                    "aria-required": "boolean",
                                    disabled: "boolean",
                                    placeholder: "string"
                                },
                                autocompleteMappings: {
                                    "cardholder-name": "cc-name",
                                    "credit-card-number": "cc-number",
                                    expiration: "cc-exp",
                                    "expiration-month": "cc-exp-month",
                                    "expiration-year": "cc-exp-year",
                                    cvv: "cc-csc",
                                    "postal-code": "billing postal-code"
                                }
                            };
                        c.events = r(["ADD_CLASS", "AUTOFILL_DATA_AVAILABLE", "BIN_AVAILABLE", "CARD_FORM_ENTRY_HAS_BEGUN", "CLEAR_FIELD", "CONFIGURATION", "FRAME_READY", "INPUT_EVENT", "READY_FOR_CLIENT", "REMOVE_ATTRIBUTE", "REMOVE_CLASS", "REMOVE_FOCUS_INTERCEPTS", "SET_ATTRIBUTE", "SET_MESSAGE", "SET_MONTH_OPTIONS", "TOKENIZATION_REQUEST", "TRIGGER_FOCUS_CHANGE", "TRIGGER_INPUT_FOCUS", "VALIDATE_STRICT"], "hosted-fields:"), t.exports = c
                    }, {
                        "../../lib/enumerate": 141,
                        "./errors": 120
                    }],
                    120: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            HOSTED_FIELDS_TIMEOUT: {
                                type: r.types.UNKNOWN,
                                code: "HOSTED_FIELDS_TIMEOUT",
                                message: "Hosted Fields timed out when attempting to set up."
                            },
                            HOSTED_FIELDS_INVALID_FIELD_KEY: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_INVALID_FIELD_KEY"
                            },
                            HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_INVALID_FIELD_SELECTOR",
                                message: "Selector does not reference a valid DOM node."
                            },
                            HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME",
                                message: "Element already contains a Braintree iframe."
                            },
                            HOSTED_FIELDS_FIELD_INVALID: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_FIELD_INVALID"
                            },
                            HOSTED_FIELDS_FIELD_NOT_PRESENT: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_FIELD_NOT_PRESENT"
                            },
                            HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR",
                                message: "A tokenization network error occurred."
                            },
                            HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
                                type: r.types.CUSTOMER,
                                code: "HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE",
                                message: "This credit card already exists in the merchant's vault."
                            },
                            HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
                                type: r.types.CUSTOMER,
                                code: "HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED",
                                message: "CVV verification failed during tokenization."
                            },
                            HOSTED_FIELDS_FAILED_TOKENIZATION: {
                                type: r.types.CUSTOMER,
                                code: "HOSTED_FIELDS_FAILED_TOKENIZATION",
                                message: "The supplied card data failed tokenization."
                            },
                            HOSTED_FIELDS_FIELDS_EMPTY: {
                                type: r.types.CUSTOMER,
                                code: "HOSTED_FIELDS_FIELDS_EMPTY",
                                message: "All fields are empty. Cannot tokenize empty card fields."
                            },
                            HOSTED_FIELDS_FIELDS_INVALID: {
                                type: r.types.CUSTOMER,
                                code: "HOSTED_FIELDS_FIELDS_INVALID",
                                message: "Some payment input fields are invalid. Cannot tokenize invalid card fields."
                            },
                            HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED"
                            },
                            HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED"
                            },
                            HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
                                type: r.types.MERCHANT,
                                code: "HOSTED_FIELDS_FIELD_PROPERTY_INVALID"
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    121: [function(e, t, n) {
                        "use strict";

                        function r(element, e) {
                            for (var t = element.parentNode, n = []; null != t;) null != t.tagName && t.tagName.toLowerCase() === e && n.push(t), t = t.parentNode;
                            return n
                        }
                        t.exports = r
                    }, {}],
                    122: [function(e, t, n) {
                        "use strict";
                        var r = e("./browser-detection"),
                            o = e("@braintree/class-list"),
                            c = e("./constants"),
                            d = Object.keys(c.allowedFields),
                            l = c.navigationDirections,
                            _ = {
                                generate: function(e, t, n, c) {
                                    var input = document.createElement("input"),
                                        d = {
                                            border: "none !important",
                                            display: "block !important",
                                            height: "1px !important",
                                            left: "-1px !important",
                                            opacity: "0 !important",
                                            position: "absolute !important",
                                            top: "-1px !important",
                                            width: "1px !important"
                                        };
                                    return r.hasSoftwareKeyboard() || r.isFirefox() || r.isIE() ? (input.setAttribute("aria-hidden", "true"), input.setAttribute("autocomplete", "off"), input.setAttribute("data-braintree-direction", n), input.setAttribute("data-braintree-type", t), input.setAttribute("id", "bt-" + t + "-" + n + "-" + e), input.setAttribute("style", JSON.stringify(d).replace(/[{}"]/g, "").replace(/,/g, ";")), o.add(input, "focus-intercept"), input.addEventListener("focus", (function(e) {
                                        c(e), r.hasSoftwareKeyboard() || input.blur()
                                    })), input) : document.createDocumentFragment()
                                },
                                destroy: function(e) {
                                    var t;
                                    e ? t = [document.getElementById(e)] : (t = document.querySelectorAll("[data-braintree-direction]"), t = [].slice.call(t)), t.forEach((function(e) {
                                        e && 1 === e.nodeType && _.matchFocusElement(e.getAttribute("id")) && e.parentNode.removeChild(e)
                                    }))
                                },
                                matchFocusElement: function(e) {
                                    var t, n, r, o;
                                    return !!e && !((t = e.split("-")).length < 4) && (n = "bt" === t[0], r = d.indexOf(t[1]) > -1, o = t[2] === l.BACK || t[2] === l.FORWARD, Boolean(n && r && o))
                                }
                            };
                        t.exports = _
                    }, {
                        "./browser-detection": 118,
                        "./constants": 119,
                        "@braintree/class-list": 38
                    }],
                    123: [function(e, t, n) {
                        "use strict";
                        var r = e("credit-card-type");
                        t.exports = function(e) {
                            var t = r(e);
                            return t.forEach((function(e) {
                                "mastercard" === e.type && (e.type = "master-card")
                            })), t
                        }
                    }, {
                        "credit-card-type": 50
                    }],
                    124: [function(e, t, n) {
                        "use strict";
                        var r = e("./american-express"),
                            o = e("./apple-pay"),
                            c = e("./client"),
                            d = e("./data-collector"),
                            l = e("./hosted-fields"),
                            _ = e("./local-payment"),
                            E = e("./masterpass"),
                            h = e("./payment-request"),
                            m = e("./paypal"),
                            f = e("./paypal-checkout"),
                            y = e("./google-payment"),
                            A = e("./three-d-secure"),
                            T = e("./unionpay"),
                            I = e("./us-bank-account"),
                            N = e("./vault-manager"),
                            O = e("./venmo"),
                            v = e("./visa-checkout"),
                            P = e("./preferred-payment-methods"),
                            C = "3.85.3";
                        t.exports = {
                            americanExpress: r,
                            applePay: o,
                            client: c,
                            dataCollector: d,
                            hostedFields: l,
                            localPayment: _,
                            masterpass: E,
                            googlePayment: y,
                            paymentRequest: h,
                            paypal: m,
                            paypalCheckout: f,
                            threeDSecure: A,
                            unionpay: T,
                            usBankAccount: I,
                            vaultManager: N,
                            venmo: O,
                            visaCheckout: v,
                            preferredPaymentMethods: P,
                            VERSION: C
                        }
                    }, {
                        "./american-express": 77,
                        "./apple-pay": 80,
                        "./client": 86,
                        "./data-collector": 105,
                        "./google-payment": 110,
                        "./hosted-fields": 117,
                        "./local-payment": 171,
                        "./masterpass": 174,
                        "./payment-request": 179,
                        "./paypal": 186,
                        "./paypal-checkout": 183,
                        "./preferred-payment-methods": 189,
                        "./three-d-secure": 199,
                        "./unionpay": 203,
                        "./us-bank-account": 209,
                        "./vault-manager": 212,
                        "./venmo": 217,
                        "./visa-checkout": 225
                    }],
                    125: [function(e, t, n) {
                        "use strict";
                        var r = e("./create-authorization-data"),
                            o = e("./json-clone"),
                            c = e("./constants");

                        function d(e, data) {
                            var t, n = data ? o(data) : {},
                                d = r(e.authorization).attrs,
                                l = o(e.analyticsMetadata);
                            for (t in n.braintreeLibraryVersion = c.BRAINTREE_LIBRARY_VERSION, n._meta) n._meta.hasOwnProperty(t) && (l[t] = n._meta[t]);
                            return n._meta = l, d.tokenizationKey ? n.tokenizationKey = d.tokenizationKey : n.authorizationFingerprint = d.authorizationFingerprint, n
                        }
                        t.exports = d
                    }, {
                        "./constants": 133,
                        "./create-authorization-data": 137,
                        "./json-clone": 161
                    }],
                    126: [function(e, t, n) {
                        "use strict";
                        var r = e("./promise"),
                            o = e("./constants"),
                            c = e("./add-metadata");

                        function d(e, t, n) {
                            var d = Date.now();
                            return r.resolve(e).then((function(e) {
                                var r = Date.now(),
                                    l = e.getConfiguration(),
                                    _ = e._request,
                                    E = l.gatewayConfiguration.analytics.url,
                                    data = {
                                        analytics: [{
                                            kind: o.ANALYTICS_PREFIX + t,
                                            isAsync: Math.floor(r / 1e3) !== Math.floor(d / 1e3),
                                            timestamp: d
                                        }]
                                    };
                                _({
                                    url: E,
                                    method: "post",
                                    data: c(l, data),
                                    timeout: o.ANALYTICS_REQUEST_TIMEOUT_MS
                                }, n)
                            })).catch((function(e) {
                                n && n(e)
                            }))
                        }
                        t.exports = {
                            sendEvent: d
                        }
                    }, {
                        "./add-metadata": 125,
                        "./constants": 133,
                        "./promise": 164
                    }],
                    127: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/asset-loader/load-script");
                        t.exports = {
                            loadScript: r
                        }
                    }, {
                        "@braintree/asset-loader/load-script": 3
                    }],
                    128: [function(e, t, n) {
                        "use strict";
                        var r = "function" == typeof Object.assign ? Object.assign : o;

                        function o(e) {
                            var i, source, t;
                            for (i = 1; i < arguments.length; i++)
                                for (t in source = arguments[i]) source.hasOwnProperty(t) && (e[t] = source[t]);
                            return e
                        }
                        t.exports = {
                            assign: r,
                            _assign: o
                        }
                    }, {}],
                    129: [function(e, t, n) {
                        "use strict";
                        var r = e("./braintree-error"),
                            o = e("./promise"),
                            c = e("./errors"),
                            d = "3.85.3";

                        function l(e) {
                            var t, n, l;
                            return e ? (l = e.name, t = e.client, n = e.authorization, t || n ? n || t.getVersion() === d ? o.resolve() : o.reject(new r({
                                type: c.INCOMPATIBLE_VERSIONS.type,
                                code: c.INCOMPATIBLE_VERSIONS.code,
                                message: "Client (version " + t.getVersion() + ") and " + l + " (version " + d + ") components must be from the same SDK version."
                            })) : o.reject(new r({
                                type: c.INSTANTIATION_OPTION_REQUIRED.type,
                                code: c.INSTANTIATION_OPTION_REQUIRED.code,
                                message: "options.client is required when instantiating " + l + "."
                            }))) : o.reject(new r({
                                type: c.INVALID_USE_OF_INTERNAL_FUNCTION.type,
                                code: c.INVALID_USE_OF_INTERNAL_FUNCTION.code,
                                message: "Options must be passed to basicComponentVerification function."
                            }))
                        }
                        t.exports = {
                            verify: l
                        }
                    }, {
                        "./braintree-error": 131,
                        "./errors": 142,
                        "./promise": 164
                    }],
                    130: [function(e, t, n) {
                        "use strict";
                        var r = e("./once");

                        function o(e, t) {
                            0 === e.length ? (e(), t(null)) : e(t)
                        }
                        t.exports = function(e, t) {
                            var i, n = e.length,
                                c = n,
                                d = r(t);
                            if (0 !== n)
                                for (i = 0; i < n; i++) o(e[i], l);
                            else d(null);

                            function l(e) {
                                e ? d(e) : 0 == (c -= 1) && d(null)
                            }
                        }
                    }, {
                        "./once": 163
                    }],
                    131: [function(e, t, n) {
                        "use strict";
                        var r = e("./enumerate");

                        function o(e) {
                            if (!o.types.hasOwnProperty(e.type)) throw new Error(e.type + " is not a valid type.");
                            if (!e.code) throw new Error("Error code required.");
                            if (!e.message) throw new Error("Error message required.");
                            this.name = "BraintreeError", this.code = e.code, this.message = e.message, this.type = e.type, this.details = e.details
                        }
                        o.prototype = Object.create(Error.prototype), o.prototype.constructor = o, o.types = r(["CUSTOMER", "MERCHANT", "NETWORK", "INTERNAL", "UNKNOWN"]), o.findRootError = function(e) {
                            return e instanceof o && e.details && e.details.originalError ? o.findRootError(e.details.originalError) : e
                        }, t.exports = o
                    }, {
                        "./enumerate": 141
                    }],
                    132: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return e.replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1_$2").toLowerCase()
                        }
                        t.exports = function(e) {
                            return Object.keys(e).reduce((function(t, n) {
                                return t[r(n)] = e[n], t
                            }), {})
                        }
                    }, {}],
                    133: [function(e, t, n) {
                        "use strict";
                        var r = "3.85.3",
                            o = "web",
                            c = {
                                production: "https://api.braintreegateway.com:443",
                                sandbox: "https://api.sandbox.braintreegateway.com:443"
                            },
                            d = {
                                production: "https://assets.braintreegateway.com",
                                sandbox: "https://assets.braintreegateway.com"
                            },
                            l = {
                                production: "https://payments.braintree-api.com/graphql",
                                sandbox: "https://payments.sandbox.braintree-api.com/graphql"
                            };
                        t.exports = {
                            ANALYTICS_PREFIX: o + ".",
                            ANALYTICS_REQUEST_TIMEOUT_MS: 2e3,
                            ASSETS_URLS: d,
                            CLIENT_API_URLS: c,
                            FRAUDNET_SOURCE: "BRAINTREE_SIGNIN",
                            FRAUDNET_FNCLS: "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",
                            FRAUDNET_URL: "https://c.paypal.com/da/r/fb.js",
                            BUS_CONFIGURATION_REQUEST_EVENT: "BUS_CONFIGURATION_REQUEST",
                            GRAPHQL_URLS: l,
                            INTEGRATION_TIMEOUT_MS: 6e4,
                            VERSION: r,
                            INTEGRATION: "custom",
                            SOURCE: "client",
                            PLATFORM: o,
                            BRAINTREE_LIBRARY_VERSION: "braintree/" + o + "/" + r
                        }
                    }, {}],
                    134: [function(e, t, n) {
                        "use strict";
                        var r = e("./braintree-error"),
                            o = e("./errors");
                        t.exports = function(e, t) {
                            t.forEach((function(t) {
                                e[t] = function() {
                                    throw new r({
                                        type: o.METHOD_CALLED_AFTER_TEARDOWN.type,
                                        code: o.METHOD_CALLED_AFTER_TEARDOWN.code,
                                        message: t + " cannot be called after teardown."
                                    })
                                }
                            }))
                        }
                    }, {
                        "./braintree-error": 131,
                        "./errors": 142
                    }],
                    135: [function(e, t, n) {
                        "use strict";
                        var r = e("./braintree-error");

                        function o(e, t) {
                            return e instanceof r ? e : new r({
                                type: t.type,
                                code: t.code,
                                message: t.message,
                                details: {
                                    originalError: e
                                }
                            })
                        }
                        t.exports = o
                    }, {
                        "./braintree-error": 131
                    }],
                    136: [function(e, t, n) {
                        "use strict";
                        var r = e("./constants").ASSETS_URLS;

                        function o(e) {
                            return r.production
                        }
                        t.exports = {
                            create: o
                        }
                    }, {
                        "./constants": 133
                    }],
                    137: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/vendor/polyfill").atob,
                            o = e("../lib/constants").CLIENT_API_URLS;

                        function c(e) {
                            return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(e)
                        }

                        function d(e) {
                            var t = e.split("_"),
                                n = t[0];
                            return {
                                merchantId: t.slice(2).join("_"),
                                environment: n
                            }
                        }

                        function l(e) {
                            var t, n, data = {
                                attrs: {},
                                configUrl: ""
                            };
                            return c(e) ? (n = d(e), data.environment = n.environment, data.attrs.tokenizationKey = e, data.configUrl = o[n.environment] + "/merchants/" + n.merchantId + "/client_api/v1/configuration") : (t = JSON.parse(r(e)), data.environment = t.environment, data.attrs.authorizationFingerprint = t.authorizationFingerprint, data.configUrl = t.configUrl, data.graphQL = t.graphQL), data
                        }
                        t.exports = l
                    }, {
                        "../lib/constants": 133,
                        "../lib/vendor/polyfill": 168
                    }],
                    138: [function(e, t, n) {
                        "use strict";
                        var r = e("./braintree-error"),
                            o = e("./promise"),
                            c = e("./assets"),
                            d = e("./errors"),
                            l = "3.85.3";

                        function _(e) {
                            var t = o.resolve();
                            return e.client ? o.resolve(e.client) : (window.braintree && window.braintree.client || (t = c.loadScript({
                                src: e.assetsUrl + "/web/" + l + "/js/client.min.js"
                            }).catch((function(e) {
                                return o.reject(new r({
                                    type: d.CLIENT_SCRIPT_FAILED_TO_LOAD.type,
                                    code: d.CLIENT_SCRIPT_FAILED_TO_LOAD.code,
                                    message: d.CLIENT_SCRIPT_FAILED_TO_LOAD.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            }))), t.then((function() {
                                return window.braintree.client.VERSION !== l ? o.reject(new r({
                                    type: d.INCOMPATIBLE_VERSIONS.type,
                                    code: d.INCOMPATIBLE_VERSIONS.code,
                                    message: "Client (version " + window.braintree.client.VERSION + ") and " + e.name + " (version " + l + ") components must be from the same SDK version."
                                })) : window.braintree.client.create({
                                    authorization: e.authorization,
                                    debug: e.debug
                                })
                            })))
                        }
                        t.exports = {
                            create: _
                        }
                    }, {
                        "./assets": 127,
                        "./braintree-error": 131,
                        "./errors": 142,
                        "./promise": 164
                    }],
                    139: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return function() {
                                var t = arguments;
                                setTimeout((function() {
                                    e.apply(null, t)
                                }), 1)
                            }
                        }
                    }, {}],
                    140: [function(e, t, n) {
                        "use strict";
                        var r = e("./batch-execute-functions");

                        function o() {
                            this._teardownRegistry = [], this._isTearingDown = !1
                        }
                        o.prototype.registerFunctionForTeardown = function(e) {
                            "function" == typeof e && this._teardownRegistry.push(e)
                        }, o.prototype.teardown = function(e) {
                            this._isTearingDown ? e(new Error("Destructor is already tearing down")) : (this._isTearingDown = !0, r(this._teardownRegistry, function(t) {
                                this._teardownRegistry = [], this._isTearingDown = !1, "function" == typeof e && e(t)
                            }.bind(this)))
                        }, t.exports = o
                    }, {
                        "./batch-execute-functions": 130
                    }],
                    141: [function(e, t, n) {
                        "use strict";

                        function r(e, t) {
                            return t = null == t ? "" : t, e.reduce((function(e, n) {
                                return e[n] = t + n, e
                            }), {})
                        }
                        t.exports = r
                    }, {}],
                    142: [function(e, t, n) {
                        "use strict";
                        var r = e("./braintree-error");
                        t.exports = {
                            INVALID_USE_OF_INTERNAL_FUNCTION: {
                                type: r.types.INTERNAL,
                                code: "INVALID_USE_OF_INTERNAL_FUNCTION"
                            },
                            INSTANTIATION_OPTION_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "INSTANTIATION_OPTION_REQUIRED"
                            },
                            INCOMPATIBLE_VERSIONS: {
                                type: r.types.MERCHANT,
                                code: "INCOMPATIBLE_VERSIONS"
                            },
                            CLIENT_SCRIPT_FAILED_TO_LOAD: {
                                type: r.types.NETWORK,
                                code: "CLIENT_SCRIPT_FAILED_TO_LOAD",
                                message: "Braintree client script could not be loaded."
                            },
                            METHOD_CALLED_AFTER_TEARDOWN: {
                                type: r.types.MERCHANT,
                                code: "METHOD_CALLED_AFTER_TEARDOWN"
                            }
                        }
                    }, {
                        "./braintree-error": 131
                    }],
                    143: [function(e, t, n) {
                        "use strict";
                        t.exports = function(element) {
                            for (; element.parentNode;) element = element.parentNode;
                            return element
                        }
                    }, {}],
                    144: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t, n) {
                            var i;
                            for (i = 0; i < e.length; i++)
                                if (e[i].hasOwnProperty(t) && e[i][t] === n) return e[i];
                            return null
                        }
                    }, {}],
                    145: [function(e, t, n) {
                        "use strict";
                        var r = e("./strategies/popup"),
                            o = e("./strategies/popup-bridge"),
                            c = e("./strategies/modal"),
                            d = e("framebus"),
                            l = e("../shared/events"),
                            _ = e("../shared/errors"),
                            E = e("../shared/constants"),
                            h = e("@braintree/uuid"),
                            m = e("@braintree/iframer"),
                            f = e("../../braintree-error"),
                            y = e("../shared/browser-detection"),
                            A = e("../../is-https"),
                            T = e("./../../assign").assign,
                            I = e("../../constants").BUS_CONFIGURATION_REQUEST_EVENT,
                            N = ["name", "dispatchFrameUrl", "openFrameUrl"];

                        function O() {}

                        function v(e) {
                            if (!e) throw new Error("Valid configuration is required");
                            if (N.forEach((function(t) {
                                    if (!e.hasOwnProperty(t)) throw new Error("A valid frame " + t + " must be provided")
                                })), !/^[\w_]+$/.test(e.name)) throw new Error("A valid frame name must be provided")
                        }

                        function P(e) {
                            v(e), this._serviceId = h().replace(/-/g, ""), this._options = {
                                name: e.name + "_" + this._serviceId,
                                dispatchFrameUrl: e.dispatchFrameUrl,
                                openFrameUrl: e.openFrameUrl,
                                height: e.height,
                                width: e.width,
                                top: e.top,
                                left: e.left
                            }, this.state = e.state || {}, this._bus = new d({
                                channel: this._serviceId
                            }), this._setBusEvents()
                        }
                        P.prototype.initialize = function(e) {
                            var t = function() {
                                e(), this._bus.off(l.DISPATCH_FRAME_READY, t)
                            }.bind(this);
                            this._bus.on(l.DISPATCH_FRAME_READY, t), this._writeDispatchFrame()
                        }, P.prototype._writeDispatchFrame = function() {
                            var e = E.DISPATCH_FRAME_NAME + "_" + this._serviceId,
                                t = this._options.dispatchFrameUrl;
                            this._dispatchFrame = m({
                                "aria-hidden": !0,
                                name: e,
                                title: e,
                                src: t,
                                class: E.DISPATCH_FRAME_CLASS,
                                height: 0,
                                width: 0,
                                style: {
                                    position: "absolute",
                                    left: "-9999px"
                                }
                            }), document.body.appendChild(this._dispatchFrame)
                        }, P.prototype._setBusEvents = function() {
                            this._bus.on(l.DISPATCH_FRAME_REPORT, function(e, t) {
                                this._onCompleteCallback && this._onCompleteCallback.call(null, e.err, e.payload), this._frame.close(), this._onCompleteCallback = null, t && t()
                            }.bind(this)), this._bus.on(I, function(e) {
                                e(this.state)
                            }.bind(this))
                        }, P.prototype.open = function(e, t) {
                            if (e = e || {}, this._frame = this._getFrameForEnvironment(e), this._frame.initialize(t), !(this._frame instanceof o)) {
                                if (T(this.state, e.state), this._onCompleteCallback = t, this._frame.open(), this.isFrameClosed()) return this._cleanupFrame(), void(t && t(y.isIE() && !A.isHTTPS() ? new f(_.FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG) : new f(_.FRAME_SERVICE_FRAME_OPEN_FAILED)));
                                this._pollForPopupClose()
                            }
                        }, P.prototype.redirect = function(e) {
                            this._frame && !this.isFrameClosed() && this._frame.redirect(e)
                        }, P.prototype.close = function() {
                            this.isFrameClosed() || this._frame.close()
                        }, P.prototype.focus = function() {
                            this.isFrameClosed() || this._frame.focus()
                        }, P.prototype.createHandler = function(e) {
                            return e = e || {}, {
                                close: function() {
                                    e.beforeClose && e.beforeClose(), this.close()
                                }.bind(this),
                                focus: function() {
                                    e.beforeFocus && e.beforeFocus(), this.focus()
                                }.bind(this)
                            }
                        }, P.prototype.createNoopHandler = function() {
                            return {
                                close: O,
                                focus: O
                            }
                        }, P.prototype.teardown = function() {
                            this.close(), this._dispatchFrame.parentNode.removeChild(this._dispatchFrame), this._dispatchFrame = null, this._cleanupFrame()
                        }, P.prototype.isFrameClosed = function() {
                            return null == this._frame || this._frame.isClosed()
                        }, P.prototype._cleanupFrame = function() {
                            this._frame = null, clearInterval(this._popupInterval), this._popupInterval = null
                        }, P.prototype._pollForPopupClose = function() {
                            return this._popupInterval = setInterval(function() {
                                this.isFrameClosed() && (this._cleanupFrame(), this._onCompleteCallback && this._onCompleteCallback(new f(_.FRAME_SERVICE_FRAME_CLOSED)))
                            }.bind(this), E.POPUP_POLL_INTERVAL), this._popupInterval
                        }, P.prototype._getFrameForEnvironment = function(e) {
                            var t = y.supportsPopups(),
                                n = Boolean(window.popupBridge),
                                d = T({}, this._options, e);
                            return n ? new o(d) : t ? new r(d) : new c(d)
                        }, t.exports = P
                    }, {
                        "../../braintree-error": 131,
                        "../../constants": 133,
                        "../../is-https": 159,
                        "../shared/browser-detection": 152,
                        "../shared/constants": 153,
                        "../shared/errors": 154,
                        "../shared/events": 155,
                        "./../../assign": 128,
                        "./strategies/modal": 147,
                        "./strategies/popup": 150,
                        "./strategies/popup-bridge": 148,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        framebus: 58
                    }],
                    146: [function(e, t, n) {
                        "use strict";
                        var r = e("./frame-service");
                        t.exports = {
                            create: function(e, t) {
                                var n = new r(e);
                                n.initialize((function() {
                                    t(n)
                                }))
                            }
                        }
                    }, {
                        "./frame-service": 145
                    }],
                    147: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/iframer"),
                            o = e("../../../assign").assign,
                            c = e("../../shared/browser-detection"),
                            d = {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                padding: 0,
                                margin: 0,
                                border: 0,
                                outline: "none",
                                zIndex: 20001,
                                background: "#FFFFFF"
                            };

                        function l() {}

                        function _(e) {
                            this._closed = null, this._frame = null, this._options = e || {}, this._container = this._options.container || document.body
                        }
                        _.prototype.initialize = l, _.prototype.open = function() {
                            var e = {
                                src: this._options.openFrameUrl,
                                name: this._options.name,
                                scrolling: "yes",
                                height: "100%",
                                width: "100%",
                                style: o({}, d),
                                title: "Lightbox Frame"
                            };
                            c.isIos() ? (c.isIosWKWebview() && (this._lockScrolling(), e.style = {}), this._el = document.createElement("div"), o(this._el.style, d, {
                                height: "100%",
                                width: "100%",
                                overflow: "auto",
                                "-webkit-overflow-scrolling": "touch"
                            }), this._frame = r(e), this._el.appendChild(this._frame)) : this._el = this._frame = r(e), this._closed = !1, this._container.appendChild(this._el)
                        }, _.prototype.focus = l, _.prototype.close = function() {
                            this._container.removeChild(this._el), this._frame = null, this._closed = !0, c.isIosWKWebview() && this._unlockScrolling()
                        }, _.prototype.isClosed = function() {
                            return Boolean(this._closed)
                        }, _.prototype.redirect = function(e) {
                            this._frame.src = e
                        }, _.prototype._unlockScrolling = function() {
                            document.body.style.overflow = this._savedBodyProperties.overflowStyle, document.body.style.position = this._savedBodyProperties.positionStyle, window.scrollTo(this._savedBodyProperties.left, this._savedBodyProperties.top), delete this._savedBodyProperties
                        }, _.prototype._lockScrolling = function() {
                            var e = document.documentElement;
                            this._savedBodyProperties = {
                                left: (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0),
                                top: (window.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                                overflowStyle: document.body.style.overflow,
                                positionStyle: document.body.style.position
                            }, document.body.style.overflow = "hidden", document.body.style.position = "fixed", window.scrollTo(0, 0)
                        }, t.exports = _
                    }, {
                        "../../../assign": 128,
                        "../../shared/browser-detection": 152,
                        "@braintree/iframer": 41
                    }],
                    148: [function(e, t, n) {
                        "use strict";
                        var r = e("../../../braintree-error"),
                            o = e("../../shared/errors");

                        function c() {}

                        function d(e) {
                            this._closed = null, this._options = e
                        }
                        d.prototype.initialize = function(e) {
                            var t = this;
                            window.popupBridge.onComplete = function(n, c) {
                                var d = !c && !n;
                                t._closed = !0, n || d ? e(new r(o.FRAME_SERVICE_FRAME_CLOSED)) : e(null, c)
                            }
                        }, d.prototype.open = function(e) {
                            var t;
                            t = (e = e || {}).openFrameUrl || this._options.openFrameUrl, this._closed = !1, window.popupBridge.open(t)
                        }, d.prototype.focus = c, d.prototype.close = c, d.prototype.isClosed = function() {
                            return Boolean(this._closed)
                        }, d.prototype.redirect = function(e) {
                            this.open({
                                openFrameUrl: e
                            })
                        }, t.exports = d
                    }, {
                        "../../../braintree-error": 131,
                        "../../shared/errors": 154
                    }],
                    149: [function(e, t, n) {
                        "use strict";
                        var r = e("../../../shared/constants"),
                            o = e("./position");

                        function c(e, t, n) {
                            return void 0 !== t ? t : o[e](n)
                        }
                        t.exports = function(e) {
                            var t = e.height || r.DEFAULT_POPUP_HEIGHT,
                                n = e.width || r.DEFAULT_POPUP_WIDTH,
                                o = c("top", e.top, t),
                                d = c("left", e.left, n);
                            return [r.POPUP_BASE_OPTIONS, "height=" + t, "width=" + n, "top=" + o, "left=" + d].join(",")
                        }
                    }, {
                        "../../../shared/constants": 153,
                        "./position": 151
                    }],
                    150: [function(e, t, n) {
                        "use strict";
                        var r = e("./compose-options");

                        function o() {}

                        function c(e) {
                            this._frame = null, this._options = e || {}, this.open()
                        }
                        c.prototype.initialize = o, c.prototype.open = function() {
                            this._frame = window.open(this._options.openFrameUrl, this._options.name, r(this._options))
                        }, c.prototype.focus = function() {
                            this._frame.focus()
                        }, c.prototype.close = function() {
                            this._frame.closed || this._frame.close()
                        }, c.prototype.isClosed = function() {
                            return !this._frame || Boolean(this._frame.closed)
                        }, c.prototype.redirect = function(e) {
                            this._frame.location.href = e
                        }, t.exports = c
                    }, {
                        "./compose-options": 149
                    }],
                    151: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return c(window.outerHeight || document.documentElement.clientHeight, e, null == window.screenY ? window.screenTop : window.screenY)
                        }

                        function o(e) {
                            return c(window.outerWidth || document.documentElement.clientWidth, e, null == window.screenX ? window.screenLeft : window.screenX)
                        }

                        function c(e, t, n) {
                            return (e - t) / 2 + n
                        }
                        t.exports = {
                            top: r,
                            left: o,
                            center: c
                        }
                    }, {}],
                    152: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            isIos: e("@braintree/browser-detection/is-ios"),
                            isIosWKWebview: e("@braintree/browser-detection/is-ios-wkwebview"),
                            isIE: e("@braintree/browser-detection/is-ie"),
                            supportsPopups: e("@braintree/browser-detection/supports-popups")
                        }
                    }, {
                        "@braintree/browser-detection/is-ie": 29,
                        "@braintree/browser-detection/is-ios": 35,
                        "@braintree/browser-detection/is-ios-wkwebview": 34,
                        "@braintree/browser-detection/supports-popups": 37
                    }],
                    153: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            DISPATCH_FRAME_NAME: "dispatch",
                            DISPATCH_FRAME_CLASS: "braintree-dispatch-frame",
                            POPUP_BASE_OPTIONS: "resizable,scrollbars",
                            DEFAULT_POPUP_WIDTH: 450,
                            DEFAULT_POPUP_HEIGHT: 535,
                            POPUP_POLL_INTERVAL: 100,
                            POPUP_CLOSE_TIMEOUT: 100
                        }
                    }, {}],
                    154: [function(e, t, n) {
                        "use strict";
                        var r = e("../../braintree-error");
                        t.exports = {
                            FRAME_SERVICE_FRAME_CLOSED: {
                                type: r.types.INTERNAL,
                                code: "FRAME_SERVICE_FRAME_CLOSED",
                                message: "Frame closed before tokenization could occur."
                            },
                            FRAME_SERVICE_FRAME_OPEN_FAILED: {
                                type: r.types.INTERNAL,
                                code: "FRAME_SERVICE_FRAME_OPEN_FAILED",
                                message: "Frame failed to open."
                            },
                            FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG: {
                                type: r.types.INTERNAL,
                                code: "FRAME_SERVICE_FRAME_OPEN_FAILED_IE_BUG",
                                message: "Could not open frame. This may be due to a bug in IE browsers when attempting to open an HTTPS page from a HTTP page. https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11324352/"
                            }
                        }
                    }, {
                        "../../braintree-error": 131
                    }],
                    155: [function(e, t, n) {
                        "use strict";
                        var r = e("../../enumerate");
                        t.exports = r(["DISPATCH_FRAME_READY", "DISPATCH_FRAME_REPORT"], "frameService:")
                    }, {
                        "../../enumerate": 141
                    }],
                    156: [function(e, t, n) {
                        "use strict";
                        var r = "3.85.3",
                            o = e("./assign").assign;

                        function c(e, t) {
                            var n = e.analyticsMetadata,
                                c = {
                                    gateway: "braintree",
                                    "braintree:merchantId": e.gatewayConfiguration.merchantId,
                                    "braintree:apiVersion": "v1",
                                    "braintree:sdkVersion": r,
                                    "braintree:metadata": JSON.stringify({
                                        source: n.source,
                                        integration: n.integration,
                                        sessionId: n.sessionId,
                                        version: r,
                                        platform: n.platform
                                    })
                                };
                            return o({}, c, t)
                        }
                        t.exports = function(e, t, n) {
                            var data, r, o = e.gatewayConfiguration.androidPay,
                                d = "production" === e.gatewayConfiguration.environment ? "PRODUCTION" : "TEST";
                            return 2 === t ? (data = {
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                environment: d,
                                allowedPaymentMethods: [{
                                    type: "CARD",
                                    parameters: {
                                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                        allowedCardNetworks: o.supportedNetworks.map((function(e) {
                                            return e.toUpperCase()
                                        }))
                                    },
                                    tokenizationSpecification: {
                                        type: "PAYMENT_GATEWAY",
                                        parameters: c(e, {
                                            "braintree:authorizationFingerprint": o.googleAuthorizationFingerprint
                                        })
                                    }
                                }]
                            }, n && (data.merchantInfo = {
                                merchantId: n
                            }), o.paypalClientId && (r = {
                                type: "PAYPAL",
                                parameters: {
                                    purchase_context: {
                                        purchase_units: [{
                                            payee: {
                                                client_id: o.paypalClientId
                                            },
                                            recurring_payment: !0
                                        }]
                                    }
                                },
                                tokenizationSpecification: {
                                    type: "PAYMENT_GATEWAY",
                                    parameters: c(e, {
                                        "braintree:paypalClientId": o.paypalClientId
                                    })
                                }
                            }, data.allowedPaymentMethods.push(r))) : (data = {
                                environment: d,
                                allowedPaymentMethods: ["CARD", "TOKENIZED_CARD"],
                                paymentMethodTokenizationParameters: {
                                    tokenizationType: "PAYMENT_GATEWAY",
                                    parameters: c(e, {
                                        "braintree:authorizationFingerprint": o.googleAuthorizationFingerprint
                                    })
                                },
                                cardRequirements: {
                                    allowedCardNetworks: o.supportedNetworks.map((function(e) {
                                        return e.toUpperCase()
                                    }))
                                }
                            }, "TOKENIZATION_KEY" === e.authorizationType && (data.paymentMethodTokenizationParameters.parameters["braintree:clientKey"] = e.authorization), n && (data.merchantId = n), t && (data.apiVersion = t)), data
                        }
                    }, {
                        "./assign": 128
                    }],
                    157: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            e = e || window;
                            try {
                                return e.self !== e.top
                            } catch (e) {
                                return !0
                            }
                        }
                    }, {}],
                    158: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t = e.split("-");
                            return new Date(t[0], t[1], t[2])
                        }

                        function o(e, t) {
                            return r(e) <= r(t)
                        }
                        t.exports = o
                    }, {}],
                    159: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return "https:" === (e = e || window.location.protocol)
                        }
                        t.exports = {
                            isHTTPS: r
                        }
                    }, {}],
                    160: [function(e, t, n) {
                        "use strict";
                        var r, o = {
                            "paypal.com": 1,
                            "braintreepayments.com": 1,
                            "braintreegateway.com": 1,
                            "braintree-api.com": 1
                        };

                        function c(e) {
                            return e.split(".").slice(-2).join(".")
                        }

                        function d(e) {
                            var t;
                            return e = e.toLowerCase(), !!/^https:/.test(e) && ((r = r || document.createElement("a")).href = e, t = c(r.hostname), o.hasOwnProperty(t))
                        }
                        t.exports = d
                    }, {}],
                    161: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return JSON.parse(JSON.stringify(e))
                        }
                    }, {}],
                    162: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            return Object.keys(e).filter((function(t) {
                                return "function" == typeof e[t]
                            }))
                        }
                    }, {}],
                    163: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t = !1;
                            return function() {
                                t || (t = !0, e.apply(null, arguments))
                            }
                        }
                        t.exports = r
                    }, {}],
                    164: [function(e, t, n) {
                        "use strict";
                        var r = e("promise-polyfill"),
                            o = e("@braintree/extended-promise"),
                            c = "undefined" != typeof Promise ? Promise : r;
                        o.suppressUnhandledPromiseMessage = !0, o.setPromise(c), t.exports = c
                    }, {
                        "@braintree/extended-promise": 40,
                        "promise-polyfill": 71
                    }],
                    165: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            var t;
                            for (t in e)
                                if (e.hasOwnProperty(t)) return !0;
                            return !1
                        }

                        function o(e) {
                            return e && "object" == typeof e && "number" == typeof e.length && "[object Array]" === Object.prototype.toString.call(e) || !1
                        }

                        function c(e) {
                            return e = e || window.location.href, /\?/.test(e)
                        }

                        function d(e) {
                            return c(e = e || window.location.href) ? (e.split("?")[1] || "").replace(/#.*$/, "").split("&").reduce((function(e, t) {
                                var n = t.split("="),
                                    r = decodeURIComponent(n[0]),
                                    o = decodeURIComponent(n[1]);
                                return e[r] = o, e
                            }), {}) : {}
                        }

                        function l(e, t) {
                            var n, r, p, c = [];
                            for (p in e) e.hasOwnProperty(p) && (r = e[p], n = t ? o(e) ? t + "[]" : t + "[" + p + "]" : p, "object" == typeof r ? c.push(l(r, n)) : c.push(encodeURIComponent(n) + "=" + encodeURIComponent(r)));
                            return c.join("&")
                        }

                        function _(e, t) {
                            return e = e || "", null != t && "object" == typeof t && r(t) && (e += -1 === e.indexOf("?") ? "?" : "", e += -1 !== e.indexOf("=") ? "&" : "", e += l(t)), e
                        }
                        t.exports = {
                            parse: d,
                            stringify: l,
                            queryify: _,
                            hasQueryParams: c
                        }
                    }, {}],
                    166: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/uuid"),
                            o = e("./find-root-node");

                        function c(element) {
                            return "[object ShadowRoot]" === (element = o(element)).toString()
                        }

                        function d(element) {
                            return c(element = o(element)) ? element.host : null
                        }

                        function l(element, e) {
                            var t = o(element).querySelector("style"),
                                n = d(element),
                                _ = "shadow-slot-" + r(),
                                slot = document.createElement("slot"),
                                E = document.createElement("div");
                            return slot.setAttribute("name", _), element.appendChild(slot), E.setAttribute("slot", _), n.appendChild(E), e && (t || (t = document.createElement("style"), element.appendChild(t)), t.sheet.insertRule('::slotted([slot="' + _ + '"]) { ' + e + " }")), c(n) ? l(E, e) : E
                        }
                        t.exports = {
                            isShadowElement: c,
                            getShadowHost: d,
                            transformToSlot: l
                        }
                    }, {
                        "./find-root-node": 143,
                        "@braintree/uuid": 45
                    }],
                    167: [function(e, t, n) {
                        "use strict";

                        function r(e) {
                            return e ? "" : ".min"
                        }
                        t.exports = r
                    }, {}],
                    168: [function(e, t, n) {
                        "use strict";
                        var r = "function" == typeof atob ? atob : o;

                        function o(e) {
                            var a, b, t, n, r, i, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                c = "";
                            if (!new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$").test(e)) throw new Error("Non base64 encoded input passed to window.atob polyfill");
                            i = 0;
                            do {
                                a = (63 & o.indexOf(e.charAt(i++))) << 2 | (n = o.indexOf(e.charAt(i++))) >> 4 & 3, b = (15 & n) << 4 | (r = o.indexOf(e.charAt(i++))) >> 2 & 15, t = (3 & r) << 6 | 63 & o.indexOf(e.charAt(i++)), c += String.fromCharCode(a) + (b ? String.fromCharCode(b) : "") + (t ? String.fromCharCode(t) : "")
                            } while (i < e.length);
                            return c
                        }
                        t.exports = {
                            atob: function(e) {
                                return r.call(window, e)
                            },
                            _atob: o
                        }
                    }, {}],
                    169: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            REQUIRED_OPTIONS_FOR_START_PAYMENT: ["onPaymentStart", "paymentType", "amount", "fallback"]
                        }
                    }, {}],
                    170: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/frame-service/external"),
                            o = e("../../lib/braintree-error"),
                            c = e("../../lib/use-min"),
                            d = "3.85.3",
                            l = e("../../lib/constants").INTEGRATION_TIMEOUT_MS,
                            _ = e("../../lib/analytics"),
                            E = e("../../lib/methods"),
                            h = e("../../lib/convert-methods-to-error"),
                            m = e("../../lib/convert-to-braintree-error"),
                            f = e("../../lib/promise"),
                            y = e("@braintree/extended-promise"),
                            A = e("../../lib/querystring"),
                            T = e("@braintree/wrap-promise"),
                            I = e("./constants"),
                            N = e("../shared/errors"),
                            O = 1282,
                            v = 720;

                        function P(e) {
                            this._client = e.client, this._assetsUrl = e.client.getConfiguration().gatewayConfiguration.assetsUrl + "/web/" + d, this._isDebug = e.client.getConfiguration().isDebug, this._loadingFrameUrl = this._assetsUrl + "/html/local-payment-landing-frame" + c(this._isDebug) + ".html", this._authorizationInProgress = !1, this._paymentType = "unknown", this._merchantAccountId = e.merchantAccountId
                        }

                        function C(e) {
                            var i, option;
                            if (!e) return !0;
                            for (i = 0; i < I.REQUIRED_OPTIONS_FOR_START_PAYMENT.length; i++)
                                if (option = I.REQUIRED_OPTIONS_FOR_START_PAYMENT[i], !e.hasOwnProperty(option)) return !0;
                            return !e.fallback.url || !e.fallback.buttonText
                        }
                        P.prototype._initialize = function() {
                            var e = this,
                                t = this._client,
                                n = setTimeout((function() {
                                    _.sendEvent(t, "local-payment.load.timed-out")
                                }), l);
                            return new f((function(o) {
                                r.create({
                                    name: "localpaymentlandingpage",
                                    dispatchFrameUrl: e._assetsUrl + "/html/dispatch-frame" + c(e._isDebug) + ".html",
                                    openFrameUrl: e._loadingFrameUrl
                                }, (function(r) {
                                    e._frameService = r, clearTimeout(n), _.sendEvent(t, "local-payment.load.succeeded"), o(e)
                                }))
                            }))
                        }, P.prototype.startPayment = function(e) {
                            var address, t, n, r = this,
                                d = this._frameService._serviceId,
                                l = e.windowOptions || {};
                            return C(e) ? f.reject(new o(N.LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION)) : (address = e.address || {}, t = {
                                intent: "sale",
                                returnUrl: A.queryify(r._assetsUrl + "/html/local-payment-redirect-frame" + c(r._isDebug) + ".html", {
                                    channel: d,
                                    r: e.fallback.url,
                                    t: e.fallback.buttonText
                                }),
                                cancelUrl: A.queryify(r._assetsUrl + "/html/local-payment-redirect-frame" + c(r._isDebug) + ".html", {
                                    channel: d,
                                    r: e.fallback.cancelUrl || e.fallback.url,
                                    t: e.fallback.cancelButtonText || e.fallback.buttonText,
                                    c: 1
                                }),
                                experienceProfile: {
                                    brandName: e.displayName,
                                    noShipping: !e.shippingAddressRequired
                                },
                                fundingSource: e.paymentType,
                                paymentTypeCountryCode: e.paymentTypeCountryCode,
                                amount: e.amount,
                                currencyIsoCode: e.currencyCode,
                                firstName: e.givenName,
                                lastName: e.surname,
                                payerEmail: e.email,
                                phone: e.phone,
                                line1: address.streetAddress,
                                line2: address.extendedAddress,
                                city: address.locality,
                                state: address.region,
                                postalCode: address.postalCode,
                                countryCode: address.countryCode,
                                merchantAccountId: r._merchantAccountId,
                                bic: e.bic
                            }, r._paymentType = e.paymentType.toLowerCase(), r._authorizationInProgress ? (_.sendEvent(r._client, r._paymentType + ".local-payment.start-payment.error.already-opened"), f.reject(new o(N.LOCAL_PAYMENT_ALREADY_IN_PROGRESS))) : (r._authorizationInProgress = !0, n = new y, r._startPaymentCallback = r._createStartPaymentCallback((function(e) {
                                n.resolve(e)
                            }), (function(e) {
                                n.reject(e)
                            })), r._frameService.open({
                                width: l.width || O,
                                height: l.height || v
                            }, r._startPaymentCallback), r._client.request({
                                method: "post",
                                endpoint: "local_payments/create",
                                data: t
                            }).then((function(t) {
                                _.sendEvent(r._client, r._paymentType + ".local-payment.start-payment.opened"), r._startPaymentOptions = e, e.onPaymentStart({
                                    paymentId: t.paymentResource.paymentToken
                                }, (function() {
                                    r._frameService.redirect(t.paymentResource.redirectUrl)
                                }))
                            })).catch((function(e) {
                                var t = e.details && e.details.httpStatus;
                                r._frameService.close(), r._authorizationInProgress = !1, 422 !== t ? n.reject(m(e, {
                                    type: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
                                    code: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
                                    message: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.message
                                })) : n.reject(new o({
                                    type: N.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.type,
                                    code: N.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.code,
                                    message: N.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })), n))
                        }, P.prototype.tokenize = function(e) {
                            var t = this,
                                n = this._client;
                            return (e = e || A.parse()).c || e.wasCanceled ? f.reject(new o({
                                type: N.LOCAL_PAYMENT_CANCELED.type,
                                code: N.LOCAL_PAYMENT_CANCELED.code,
                                message: N.LOCAL_PAYMENT_CANCELED.message,
                                details: {
                                    originalError: {
                                        errorcode: e.errorcode,
                                        token: e.btLpToken
                                    }
                                }
                            })) : e.errorcode ? f.reject(new o({
                                type: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
                                code: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
                                message: N.LOCAL_PAYMENT_START_PAYMENT_FAILED.message,
                                details: {
                                    originalError: {
                                        errorcode: e.errorcode,
                                        token: e.btLpToken
                                    }
                                }
                            })) : n.request({
                                endpoint: "payment_methods/paypal_accounts",
                                method: "post",
                                data: this._formatTokenizeData(e)
                            }).then((function(e) {
                                var r = t._formatTokenizePayload(e);
                                return window.popupBridge ? _.sendEvent(n, t._paymentType + ".local-payment.tokenization.success-popupbridge") : _.sendEvent(n, t._paymentType + ".local-payment.tokenization.success"), r
                            })).catch((function(e) {
                                return _.sendEvent(n, t._paymentType + ".local-payment.tokenization.failed"), f.reject(m(e, {
                                    type: N.LOCAL_PAYMENT_TOKENIZATION_FAILED.type,
                                    code: N.LOCAL_PAYMENT_TOKENIZATION_FAILED.code,
                                    message: N.LOCAL_PAYMENT_TOKENIZATION_FAILED.message
                                }))
                            }))
                        }, P.prototype.closeWindow = function() {
                            this._authoriztionInProgress && _.sendEvent(this._client, this._paymentType + ".local-payment.start-payment.closed.by-merchant"), this._frameService.close()
                        }, P.prototype.focusWindow = function() {
                            this._frameService.focus()
                        }, P.prototype._createStartPaymentCallback = function(e, t) {
                            var n = this,
                                r = this._client;
                            return function(c, d) {
                                if (n._authorizationInProgress = !1, c)
                                    if ("FRAME_SERVICE_FRAME_CLOSED" === c.code) {
                                        if (d && "processing_error" === d.errorcode) return _.sendEvent(r, n._paymentType + ".local-payment.failed-in-window"), void t(new o(N.LOCAL_PAYMENT_START_PAYMENT_FAILED));
                                        _.sendEvent(r, n._paymentType + ".local-payment.tokenization.closed.by-user"), t(new o(N.LOCAL_PAYMENT_WINDOW_CLOSED))
                                    } else c.code && c.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1 && t(new o({
                                        code: N.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.code,
                                        type: N.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.type,
                                        message: N.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.message,
                                        details: {
                                            originalError: c
                                        }
                                    }));
                                else d && (window.popupBridge || n._frameService.redirect(n._loadingFrameUrl), n.tokenize(d).then(e).catch(t).then((function() {
                                    n._frameService.close()
                                })))
                            }
                        }, P.prototype._formatTokenizePayload = function(e) {
                            var t, n = {};
                            return e.paypalAccounts && (n = e.paypalAccounts[0]), t = {
                                nonce: n.nonce,
                                details: {},
                                type: n.type
                            }, n.details && (n.details.payerInfo && (t.details = n.details.payerInfo), n.details.correlationId && (t.correlationId = n.details.correlationId)), t
                        }, P.prototype.hasTokenizationParams = function() {
                            var e = A.parse();
                            return !!e.errorcode || Boolean(e.btLpToken && e.btLpPaymentId && e.btLpPayerId)
                        }, P.prototype._formatTokenizeData = function(e) {
                            var t = this._client.getConfiguration().gatewayConfiguration;
                            return {
                                merchantAccountId: this._merchantAccountId,
                                paypalAccount: {
                                    correlationId: e.btLpToken || e.token,
                                    paymentToken: e.btLpPaymentId || e.paymentId,
                                    payerId: e.btLpPayerId || e.PayerID,
                                    unilateral: t.paypal.unvettedMerchant,
                                    intent: "sale"
                                }
                            }
                        }, P.prototype.teardown = function() {
                            var e = this;
                            return e._frameService.teardown(), h(e, E(P.prototype)), _.sendEvent(e._client, "local-payment.teardown-completed"), f.resolve()
                        }, t.exports = T.wrapPrototype(P)
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/braintree-error": 131,
                        "../../lib/constants": 133,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/convert-to-braintree-error": 135,
                        "../../lib/frame-service/external": 146,
                        "../../lib/methods": 162,
                        "../../lib/promise": 164,
                        "../../lib/querystring": 165,
                        "../../lib/use-min": 167,
                        "../shared/errors": 172,
                        "./constants": 169,
                        "@braintree/extended-promise": 40,
                        "@braintree/wrap-promise": 49
                    }],
                    171: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("./external/local-payment"),
                            _ = "3.85.3",
                            E = e("../lib/promise"),
                            h = e("@braintree/wrap-promise"),
                            m = e("../lib/braintree-error"),
                            f = e("./shared/errors");

                        function y(e) {
                            var t = "Local Payment";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                var n = t.getConfiguration();
                                return e.client = t, !0 !== n.gatewayConfiguration.paypalEnabled ? E.reject(new m(f.LOCAL_PAYMENT_NOT_ENABLED)) : (r.sendEvent(t, "local-payment.initialized"), new l(e)._initialize())
                            }))
                        }
                        t.exports = {
                            create: h(y),
                            VERSION: _
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./external/local-payment": 170,
                        "./shared/errors": 172,
                        "@braintree/wrap-promise": 49
                    }],
                    172: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            LOCAL_PAYMENT_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "LOCAL_PAYMENT_NOT_ENABLED",
                                message: "LocalPayment is not enabled for this merchant."
                            },
                            LOCAL_PAYMENT_ALREADY_IN_PROGRESS: {
                                type: r.types.MERCHANT,
                                code: "LOCAL_PAYMENT_ALREADY_IN_PROGRESS",
                                message: "LocalPayment payment is already in progress."
                            },
                            LOCAL_PAYMENT_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "LOCAL_PAYMENT_CANCELED",
                                message: "Customer canceled the LocalPayment before authorizing."
                            },
                            LOCAL_PAYMENT_WINDOW_CLOSED: {
                                type: r.types.CUSTOMER,
                                code: "LOCAL_PAYMENT_WINDOW_CLOSED",
                                message: "Customer closed LocalPayment window before authorizing."
                            },
                            LOCAL_PAYMENT_WINDOW_OPEN_FAILED: {
                                type: r.types.MERCHANT,
                                code: "LOCAL_PAYMENT_WINDOW_OPEN_FAILED",
                                message: "LocalPayment window failed to open; make sure startPayment was called in response to a user action."
                            },
                            LOCAL_PAYMENT_START_PAYMENT_FAILED: {
                                type: r.types.NETWORK,
                                code: "LOCAL_PAYMENT_START_PAYMENT_FAILED",
                                message: "LocalPayment startPayment failed."
                            },
                            LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION: {
                                type: r.types.MERCHANT,
                                code: "LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION",
                                message: "Missing required option for startPayment."
                            },
                            LOCAL_PAYMENT_TOKENIZATION_FAILED: {
                                type: r.types.NETWORK,
                                code: "LOCAL_PAYMENT_TOKENIZATION_FAILED",
                                message: "Could not tokenize user's local payment method."
                            },
                            LOCAL_PAYMENT_INVALID_PAYMENT_OPTION: {
                                type: r.types.MERCHANT,
                                code: "LOCAL_PAYMENT_INVALID_PAYMENT_OPTION",
                                message: "Local payment options are invalid."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    173: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/promise"),
                            o = e("../../lib/frame-service/external"),
                            c = e("../../lib/braintree-error"),
                            d = e("../shared/errors"),
                            l = "3.85.3",
                            _ = e("../../lib/methods"),
                            E = e("@braintree/wrap-promise"),
                            h = e("../../lib/analytics"),
                            m = e("../../lib/convert-methods-to-error"),
                            f = e("../../lib/convert-to-braintree-error"),
                            y = e("../shared/constants"),
                            A = e("../../lib/constants").INTEGRATION_TIMEOUT_MS;

                        function T(e) {
                            var t = e.client.getConfiguration();
                            this._client = e.client, this._assetsUrl = t.gatewayConfiguration.assetsUrl + "/web/" + l, this._isDebug = t.isDebug, this._authInProgress = !1, window.popupBridge && "function" == typeof window.popupBridge.getReturnUrlPrefix ? this._callbackUrl = window.popupBridge.getReturnUrlPrefix() + "return" : this._callbackUrl = this._assetsUrl + "/html/redirect-frame" + (this._isDebug ? "" : ".min") + ".html"
                        }

                        function I(e) {
                            return [e.oauth_verifier, e.oauth_token, e.checkout_resource_url].some((function(element) {
                                return null == element || "null" === element
                            }))
                        }

                        function N(e) {
                            var i, option;
                            for (i = 0; i < y.REQUIRED_OPTIONS_FOR_TOKENIZE.length; i++)
                                if (option = y.REQUIRED_OPTIONS_FOR_TOKENIZE[i], !e.hasOwnProperty(option)) return !0;
                            return !1
                        }
                        T.prototype._initialize = function() {
                            var e = this;
                            return new r((function(t) {
                                var n = setTimeout((function() {
                                    h.sendEvent(e._client, "masterpass.load.timed-out")
                                }), A);
                                o.create({
                                    name: y.LANDING_FRAME_NAME,
                                    height: y.POPUP_HEIGHT,
                                    width: y.POPUP_WIDTH,
                                    dispatchFrameUrl: e._assetsUrl + "/html/dispatch-frame" + (e._isDebug ? "" : ".min") + ".html",
                                    openFrameUrl: e._assetsUrl + "/html/masterpass-landing-frame" + (e._isDebug ? "" : ".min") + ".html"
                                }, (function(r) {
                                    e._frameService = r, clearTimeout(n), h.sendEvent(e._client, "masterpass.load.succeeded"), t(e)
                                }))
                            }))
                        }, T.prototype.tokenize = function(e) {
                            var t = this;
                            return !e || N(e) ? r.reject(new c(d.MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION)) : t._authInProgress ? r.reject(new c(d.MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS)) : new r((function(n, r) {
                                t._navigateFrameToLoadingPage(e).catch(r), t._frameService.open(e.frameOptions, t._createFrameOpenHandler(n, r))
                            }))
                        }, T.prototype._navigateFrameToLoadingPage = function(e) {
                            var t = this;
                            return this._authInProgress = !0, this._client.request({
                                method: "post",
                                endpoint: "masterpass/request_token",
                                data: {
                                    requestToken: {
                                        originUrl: window.location.protocol + "//" + window.location.hostname,
                                        subtotal: e.subtotal,
                                        currencyCode: e.currencyCode,
                                        callbackUrl: this._callbackUrl
                                    }
                                }
                            }).then((function(n) {
                                var r, o = t._assetsUrl + "/html/masterpass-loading-frame" + (t._isDebug ? "" : ".min") + ".html?",
                                    c = t._client.getConfiguration().gatewayConfiguration,
                                    d = e.config || {};
                                r = {
                                    environment: c.environment,
                                    requestToken: n.requestToken,
                                    callbackUrl: t._callbackUrl,
                                    merchantCheckoutId: c.masterpass.merchantCheckoutId,
                                    allowedCardTypes: c.masterpass.supportedNetworks,
                                    version: y.MASTERPASS_VERSION
                                }, Object.keys(d).forEach((function(e) {
                                    "function" != typeof d[e] && (r[e] = d[e])
                                })), o += Object.keys(r).map((function(e) {
                                    return e + "=" + r[e]
                                })).join("&"), t._frameService.redirect(o)
                            })).catch((function(e) {
                                var n = e.details && e.details.httpStatus;
                                return t._closeWindow(), 422 === n ? r.reject(f(e, d.MASTERPASS_INVALID_PAYMENT_OPTION)) : r.reject(f(e, d.MASTERPASS_FLOW_FAILED))
                            }))
                        }, T.prototype._createFrameOpenHandler = function(e, t) {
                            var n = this;
                            return window.popupBridge ? function(r, o) {
                                return n._authInProgress = !1, r ? (h.sendEvent(n._client, "masterpass.tokenization.closed-popupbridge.by-user"), void t(f(r, d.MASTERPASS_POPUP_CLOSED))) : o.queryItems ? void n._tokenizeMasterpass(o.queryItems).then(e).catch(t) : (h.sendEvent(n._client, "masterpass.tokenization.failed-popupbridge"), void t(new c(d.MASTERPASS_FLOW_FAILED)))
                            } : function(r, o) {
                                if (r) return n._authInProgress = !1, "FRAME_SERVICE_FRAME_CLOSED" === r.code ? (h.sendEvent(n._client, "masterpass.tokenization.closed.by-user"), void t(new c(d.MASTERPASS_POPUP_CLOSED))) : r.code && r.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1 ? (h.sendEvent(n._client, "masterpass.tokenization.failed.to-open"), void t(new c({
                                    code: d.MASTERPASS_POPUP_OPEN_FAILED.code,
                                    type: d.MASTERPASS_POPUP_OPEN_FAILED.type,
                                    message: d.MASTERPASS_POPUP_OPEN_FAILED.message,
                                    details: {
                                        originalError: r
                                    }
                                }))) : (h.sendEvent(n._client, "masterpass.tokenization.failed"), n._closeWindow(), void t(f(r, d.MASTERPASS_FLOW_FAILED)));
                                n._tokenizeMasterpass(o).then(e).catch(t)
                            }
                        }, T.prototype._tokenizeMasterpass = function(e) {
                            var t = this;
                            return "success" !== e.mpstatus ? (h.sendEvent(t._client, "masterpass.tokenization.closed.by-user"), t._closeWindow(), r.reject(new c(d.MASTERPASS_POPUP_CLOSED))) : I(e) ? (h.sendEvent(t._client, "masterpass.tokenization.closed.missing-payload"), t._closeWindow(), r.reject(new c(d.MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS))) : t._client.request({
                                endpoint: "payment_methods/masterpass_cards",
                                method: "post",
                                data: {
                                    masterpassCard: {
                                        checkoutResourceUrl: e.checkout_resource_url,
                                        requestToken: e.oauth_token,
                                        verifierToken: e.oauth_verifier
                                    }
                                }
                            }).then((function(e) {
                                return t._closeWindow(), window.popupBridge ? h.sendEvent(t._client, "masterpass.tokenization.success-popupbridge") : h.sendEvent(t._client, "masterpass.tokenization.success"), e.masterpassCards[0]
                            })).catch((function(e) {
                                return t._closeWindow(), window.popupBridge ? h.sendEvent(t._client, "masterpass.tokenization.failed-popupbridge") : h.sendEvent(t._client, "masterpass.tokenization.failed"), r.reject(f(e, d.MASTERPASS_ACCOUNT_TOKENIZATION_FAILED))
                            }))
                        }, T.prototype._closeWindow = function() {
                            this._authInProgress = !1, this._frameService.close()
                        }, T.prototype.teardown = function() {
                            var e = this;
                            return new r((function(t) {
                                e._frameService.teardown(), m(e, _(T.prototype)), h.sendEvent(e._client, "masterpass.teardown-completed"), t()
                            }))
                        }, t.exports = E.wrapPrototype(T)
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/braintree-error": 131,
                        "../../lib/constants": 133,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/convert-to-braintree-error": 135,
                        "../../lib/frame-service/external": 146,
                        "../../lib/methods": 162,
                        "../../lib/promise": 164,
                        "../shared/constants": 176,
                        "../shared/errors": 177,
                        "@braintree/wrap-promise": 49
                    }],
                    174: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("../lib/basic-component-verification"),
                            c = e("./shared/browser-detection"),
                            d = e("./external/masterpass"),
                            l = e("../lib/create-deferred-client"),
                            _ = e("../lib/create-assets-url"),
                            E = "3.85.3",
                            h = e("./shared/errors"),
                            m = e("../lib/promise"),
                            f = e("@braintree/wrap-promise");

                        function y(e) {
                            var t = "Masterpass";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return A() ? m.resolve() : m.reject(new r(h.MASTERPASS_BROWSER_NOT_SUPPORTED))
                            })).then((function() {
                                return l.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: _.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                return e.client = t, e.client.getConfiguration().gatewayConfiguration.masterpass ? new d(e)._initialize() : m.reject(new r(h.MASTERPASS_NOT_ENABLED))
                            }))
                        }

                        function A() {
                            return Boolean(window.popupBridge || c.supportsPopups())
                        }
                        t.exports = {
                            create: f(y),
                            isSupported: A,
                            VERSION: E
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./external/masterpass": 173,
                        "./shared/browser-detection": 175,
                        "./shared/errors": 177,
                        "@braintree/wrap-promise": 49
                    }],
                    175: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            supportsPopups: e("@braintree/browser-detection/supports-popups")
                        }
                    }, {
                        "@braintree/browser-detection/supports-popups": 37
                    }],
                    176: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            LANDING_FRAME_NAME: "braintreemasterpasslanding",
                            POPUP_WIDTH: 450,
                            POPUP_HEIGHT: 660,
                            MASTERPASS_VERSION: "v6",
                            REQUIRED_OPTIONS_FOR_TOKENIZE: ["subtotal", "currencyCode"]
                        }
                    }, {}],
                    177: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            MASTERPASS_BROWSER_NOT_SUPPORTED: {
                                type: r.types.CUSTOMER,
                                code: "MASTERPASS_BROWSER_NOT_SUPPORTED",
                                message: "Browser is not supported."
                            },
                            MASTERPASS_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_NOT_ENABLED",
                                message: "Masterpass is not enabled for this merchant."
                            },
                            MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION",
                                message: "Missing required option for tokenize."
                            },
                            MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS",
                                message: "Masterpass tokenization is already in progress."
                            },
                            MASTERPASS_ACCOUNT_TOKENIZATION_FAILED: {
                                type: r.types.NETWORK,
                                code: "MASTERPASS_ACCOUNT_TOKENIZATION_FAILED",
                                message: "Could not tokenize user's Masterpass account."
                            },
                            MASTERPASS_POPUP_OPEN_FAILED: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_POPUP_OPEN_FAILED",
                                message: "Masterpass popup failed to open. Make sure to tokenize in response to a user action, such as a click."
                            },
                            MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS",
                                message: "Masterpass popup failed to return all required parameters needed to continue tokenization."
                            },
                            MASTERPASS_POPUP_CLOSED: {
                                type: r.types.CUSTOMER,
                                code: "MASTERPASS_POPUP_CLOSED",
                                message: "Customer closed Masterpass popup before authorizing."
                            },
                            MASTERPASS_INVALID_PAYMENT_OPTION: {
                                type: r.types.MERCHANT,
                                code: "MASTERPASS_INVALID_PAYMENT_OPTION",
                                message: "Masterpass payment options are invalid."
                            },
                            MASTERPASS_FLOW_FAILED: {
                                type: r.types.NETWORK,
                                code: "MASTERPASS_FLOW_FAILED",
                                message: "Could not initialize Masterpass flow."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    178: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/analytics"),
                            o = e("../../lib/assign").assign,
                            c = e("framebus"),
                            d = e("../../lib/convert-methods-to-error"),
                            l = e("../../lib/generate-google-pay-configuration"),
                            _ = e("@braintree/iframer"),
                            E = e("@braintree/uuid"),
                            h = e("../../lib/use-min"),
                            m = e("../../lib/methods"),
                            f = e("../../lib/promise"),
                            y = e("@braintree/event-emitter"),
                            A = e("../../lib/braintree-error"),
                            T = "3.85.3",
                            I = e("../shared/constants"),
                            N = I.events,
                            O = I.errors,
                            v = e("@braintree/wrap-promise"),
                            P = {
                                Visa: "visa",
                                MasterCard: "mastercard",
                                "American Express": "amex",
                                "Diners Club": "diners",
                                Discover: "discover",
                                JCB: "jcb",
                                UnionPay: "unionpay",
                                Maestro: "maestro"
                            },
                            C = "18278000977346790994";

                        function R(e, t, n) {
                            return e + "/web/" + T + "/html/payment-request-frame" + h(n) + ".html#" + t
                        }

                        function S(e) {
                            var t = e.enabledPaymentMethods || {};
                            y.call(this), this._componentId = E(), this._client = e.client, this._enabledPaymentMethods = {
                                basicCard: !1 !== t.basicCard,
                                googlePay: !1 !== t.googlePay
                            }, this._googlePayVersion = 2 === e.googlePayVersion ? 2 : 1, this._googleMerchantId = C, this._supportedPaymentMethods = this._constructDefaultSupportedPaymentMethods(), this._defaultSupportedPaymentMethods = Object.keys(this._supportedPaymentMethods).map(function(e) {
                                return this._supportedPaymentMethods[e]
                            }.bind(this)), this._bus = new c({
                                channel: this._componentId
                            })
                        }
                        y.createChild(S), S.prototype._constructDefaultSupportedPaymentMethods = function() {
                            var e = this._client.getConfiguration(),
                                t = e.gatewayConfiguration.androidPay,
                                n = e.gatewayConfiguration.creditCards,
                                r = {};
                            return this._enabledPaymentMethods.basicCard && n && n.supportedCardTypes.length > 0 && (r.basicCard = {
                                supportedMethods: "basic-card",
                                data: {
                                    supportedNetworks: n.supportedCardTypes.reduce((function(e, t) {
                                        return t in P && e.push(P[t]), e
                                    }), [])
                                }
                            }), this._enabledPaymentMethods.googlePay && t && t.enabled && (r.googlePay = {
                                supportedMethods: "https://google.com/pay",
                                data: l(e, this._googlePayVersion, this._googleMerchantId)
                            }), r
                        }, S.prototype.initialize = function() {
                            var e = this._client.getConfiguration(),
                                t = this;
                            return this._frame = _({
                                allowPaymentRequest: !0,
                                name: "braintree-payment-request-frame",
                                class: "braintree-payment-request-frame",
                                height: 0,
                                width: 0,
                                style: {
                                    position: "absolute",
                                    left: "-9999px"
                                },
                                title: "Secure Payment Frame"
                            }), 0 === this._defaultSupportedPaymentMethods.length ? f.reject(new A(O.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS)) : new f((function(n) {
                                t._bus.on(N.FRAME_READY, (function(e) {
                                    e(t._client)
                                })), t._bus.on(N.FRAME_CAN_MAKE_REQUESTS, (function() {
                                    r.sendEvent(t._client, "payment-request.initialized"), t._bus.on(N.SHIPPING_ADDRESS_CHANGE, (function(e) {
                                        var n = {
                                            target: {
                                                shippingAddress: e
                                            },
                                            updateWith: function(e) {
                                                t._bus.emit(N.UPDATE_SHIPPING_ADDRESS, e)
                                            }
                                        };
                                        t._emit("shippingAddressChange", n), t._emit("shippingaddresschange", n)
                                    })), t._bus.on(N.SHIPPING_OPTION_CHANGE, (function(e) {
                                        var n = {
                                            target: {
                                                shippingOption: e
                                            },
                                            updateWith: function(e) {
                                                t._bus.emit(N.UPDATE_SHIPPING_OPTION, e)
                                            }
                                        };
                                        t._emit("shippingOptionChange", n), t._emit("shippingoptionchange", n)
                                    })), n(t)
                                })), t._frame.src = R(e.gatewayConfiguration.assetsUrl, t._componentId, e.isDebug), document.body.appendChild(t._frame)
                            }))
                        }, S.prototype.createSupportedPaymentMethodsConfiguration = function(e, t) {
                            var n;
                            if (!e) throw new A(O.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE);
                            if (!this._enabledPaymentMethods[e]) throw new A(O.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED);
                            return (n = o({}, this._supportedPaymentMethods[e])).data = o({}, n.data, t), n
                        }, S.prototype.tokenize = function(e) {
                            var t = this;
                            return new f((function(n, o) {
                                t._bus.emit(N.PAYMENT_REQUEST_INITIALIZED, {
                                    supportedPaymentMethods: e.supportedPaymentMethods || t._defaultSupportedPaymentMethods,
                                    details: e.details,
                                    options: e.options
                                }, (function(e) {
                                    var c = e[0],
                                        d = e[1];
                                    c ? o(t._formatTokenizationError(c)) : (r.sendEvent(t._client, "payment-request.tokenize.succeeded"), n({
                                        nonce: d.nonce,
                                        type: d.type,
                                        description: d.description,
                                        details: {
                                            rawPaymentResponse: d.details.rawPaymentResponse,
                                            cardType: d.details.cardType,
                                            lastFour: d.details.lastFour,
                                            lastTwo: d.details.lastTwo
                                        },
                                        binData: d.binData
                                    }))
                                }))
                            }))
                        }, S.prototype.canMakePayment = function(e) {
                            var t, n = this;
                            return window.PaymentRequest ? e.supportedPaymentMethods && (e.supportedPaymentMethods.forEach((function(e) {
                                var n = e.supportedMethods;
                                n in I.SUPPORTED_METHODS || (t = n)
                            })), t) ? f.reject(new A({
                                type: O.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,
                                code: O.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,
                                message: t + " is not a supported payment method."
                            })) : new f((function(t, o) {
                                n._bus.emit(N.CAN_MAKE_PAYMENT, {
                                    supportedPaymentMethods: e.supportedPaymentMethods || n._defaultSupportedPaymentMethods,
                                    details: e.details,
                                    options: e.options
                                }, (function(e) {
                                    var c = e[0],
                                        d = e[1];
                                    c ? o(n._formatCanMakePaymentError(c)) : (r.sendEvent(n._client, "payment-request.can-make-payment." + d), t(d))
                                }))
                            })) : (r.sendEvent(n._client, "payment-request.can-make-payment.not-available"), f.resolve(!1))
                        }, S.prototype.teardown = function() {
                            return this._bus.teardown(), this._frame.parentNode.removeChild(this._frame), d(this, m(S.prototype)), r.sendEvent(this._client, "payment-request.teardown-completed"), f.resolve()
                        }, S.prototype._formatTokenizationError = function(e) {
                            var t;
                            switch (e.name) {
                                case "AbortError":
                                    return t = new A({
                                        type: O.PAYMENT_REQUEST_CANCELED.type,
                                        code: O.PAYMENT_REQUEST_CANCELED.code,
                                        message: O.PAYMENT_REQUEST_CANCELED.message,
                                        details: {
                                            originalError: e
                                        }
                                    }), r.sendEvent(this._client, "payment-request.tokenize.canceled"), t;
                                case "PAYMENT_REQUEST_INITIALIZATION_FAILED":
                                    t = new A({
                                        type: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
                                        code: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
                                        message: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
                                        details: {
                                            originalError: e
                                        }
                                    });
                                    break;
                                case "BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR":
                                    t = new A({
                                        type: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,
                                        code: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,
                                        message: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,
                                        details: {
                                            originalError: e
                                        }
                                    });
                                    break;
                                case "BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR":
                                    t = new A({
                                        type: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,
                                        code: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,
                                        message: O.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,
                                        details: {
                                            originalError: e
                                        }
                                    });
                                    break;
                                default:
                                    t = new A({
                                        code: O.PAYMENT_REQUEST_NOT_COMPLETED.code,
                                        type: e.type || A.types.CUSTOMER,
                                        message: O.PAYMENT_REQUEST_NOT_COMPLETED.message,
                                        details: {
                                            originalError: e
                                        }
                                    })
                            }
                            return r.sendEvent(this._client, "payment-request.tokenize.failed"), t
                        }, S.prototype._formatCanMakePaymentError = function(e) {
                            var t;
                            switch (e.name) {
                                case "PAYMENT_REQUEST_INITIALIZATION_FAILED":
                                    t = new A({
                                        type: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
                                        code: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
                                        message: O.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
                                        details: {
                                            originalError: e
                                        }
                                    });
                                    break;
                                case "NotAllowedError":
                                    t = new A({
                                        type: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,
                                        code: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,
                                        message: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,
                                        details: {
                                            originalError: e
                                        }
                                    });
                                    break;
                                default:
                                    t = new A({
                                        code: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,
                                        type: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,
                                        message: O.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,
                                        details: {
                                            originalError: e
                                        }
                                    })
                            }
                            return r.sendEvent(this._client, "payment-request.can-make-payment.failed"), t
                        }, t.exports = v.wrapPrototype(S)
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/assign": 128,
                        "../../lib/braintree-error": 131,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/generate-google-pay-configuration": 156,
                        "../../lib/methods": 162,
                        "../../lib/promise": 164,
                        "../../lib/use-min": 167,
                        "../shared/constants": 180,
                        "@braintree/event-emitter": 39,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        "@braintree/wrap-promise": 49,
                        framebus: 58
                    }],
                    179: [function(e, t, n) {
                        "use strict";
                        var r = e("./external/payment-request"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("@braintree/wrap-promise"),
                            _ = "3.85.3";

                        function E(e) {
                            var t = "Payment Request";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                return e.client = t, new r(e).initialize()
                            }))
                        }
                        t.exports = {
                            create: l(E),
                            VERSION: _
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "./external/payment-request": 178,
                        "@braintree/wrap-promise": 49
                    }],
                    180: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/enumerate"),
                            o = e("./errors"),
                            c = {};
                        c.events = r(["CAN_MAKE_PAYMENT", "FRAME_READY", "FRAME_CAN_MAKE_REQUESTS", "PAYMENT_REQUEST_INITIALIZED", "SHIPPING_ADDRESS_CHANGE", "UPDATE_SHIPPING_ADDRESS", "SHIPPING_OPTION_CHANGE", "UPDATE_SHIPPING_OPTION"], "payment-request:"), c.errors = o, c.SUPPORTED_METHODS = {
                            "basic-card": !0,
                            "https://google.com/pay": !0
                        }, t.exports = c
                    }, {
                        "../../lib/enumerate": 141,
                        "./errors": 181
                    }],
                    181: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",
                                message: "There are no supported payment methods associated with this account."
                            },
                            PAYMENT_REQUEST_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "PAYMENT_REQUEST_CANCELED",
                                message: "Payment request was canceled."
                            },
                            PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",
                                message: "Something went wrong when configuring the payment request."
                            },
                            PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED: {
                                type: r.types.UNKNOWN,
                                code: "PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED",
                                message: "Something went wrong when calling `canMakePayment`"
                            },
                            PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED",
                                message: "Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations."
                            },
                            PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD"
                            },
                            PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE",
                                message: "Something went wrong when tokenizing the Google Pay card."
                            },
                            PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR",
                                message: "Something went wrong when tokenizing the Google Pay card."
                            },
                            PAYMENT_REQUEST_NOT_COMPLETED: {
                                code: "PAYMENT_REQUEST_NOT_COMPLETED",
                                message: "Payment request could not be completed."
                            },
                            PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",
                                message: "createSupportedPaymentMethodsConfiguration must include a type parameter."
                            },
                            PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",
                                message: "createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    182: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            PAYPAL_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_NOT_ENABLED",
                                message: "PayPal is not enabled for this merchant."
                            },
                            PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED",
                                message: "A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live#linked-paypal-testing for details on linking your PayPal sandbox with Braintree."
                            },
                            PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
                                type: r.types.NETWORK,
                                code: "PAYPAL_ACCOUNT_TOKENIZATION_FAILED",
                                message: "Could not tokenize user's PayPal account."
                            },
                            PAYPAL_FLOW_FAILED: {
                                type: r.types.NETWORK,
                                code: "PAYPAL_FLOW_FAILED",
                                message: "Could not initialize PayPal flow."
                            },
                            PAYPAL_FLOW_OPTION_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_FLOW_OPTION_REQUIRED",
                                message: "PayPal flow property is invalid or missing."
                            },
                            PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED"
                            },
                            PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED: {
                                type: r.types.NETWORK,
                                code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED",
                                message: "Something went wrong when setting up the checkout workflow."
                            },
                            PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED",
                                message: "PayPal popup failed to open, make sure to initiate the vault checkout in response to a user action."
                            },
                            PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED",
                                message: "Customer closed PayPal popup before authorizing."
                            },
                            PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS",
                                message: "Vault initiated checkout already in progress."
                            },
                            PAYPAL_INVALID_PAYMENT_OPTION: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_INVALID_PAYMENT_OPTION",
                                message: "PayPal payment options are invalid."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    183: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/basic-component-verification"),
                            o = e("@braintree/wrap-promise"),
                            c = e("./paypal-checkout"),
                            d = "3.85.3";

                        function l(e) {
                            var t = "PayPal Checkout";
                            return r.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return new c(e)._initialize(e)
                            }))
                        }

                        function _() {
                            return !0
                        }
                        t.exports = {
                            create: o(l),
                            isSupported: _,
                            VERSION: d
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "./paypal-checkout": 184,
                        "@braintree/wrap-promise": 49
                    }],
                    184: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/assign").assign,
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("../lib/promise"),
                            _ = e("@braintree/extended-promise"),
                            E = e("@braintree/wrap-promise"),
                            h = e("../lib/braintree-error"),
                            m = e("../lib/convert-to-braintree-error"),
                            f = e("./errors"),
                            y = e("../paypal/shared/constants"),
                            A = e("../lib/frame-service/external"),
                            T = e("../lib/create-authorization-data"),
                            I = e("../lib/methods"),
                            N = e("../lib/use-min"),
                            O = e("../lib/convert-methods-to-error"),
                            v = e("../lib/querystring"),
                            P = "3.85.3",
                            C = e("../lib/constants").INTEGRATION_TIMEOUT_MS,
                            R = ["amount", "currency", "vaultInitiatedCheckoutPaymentMethodToken"],
                            S = "https://www.{ENV}paypal.com/smart/buttons/preload";

                        function D(e) {
                            this._merchantAccountId = e.merchantAccountId, this._autoSetDataUserIdToken = Boolean(e.autoSetDataUserIdToken)
                        }
                        D.prototype._initialize = function(e) {
                            var t;
                            return e.client ? (t = e.client.getConfiguration(), this._authorizationInformation = {
                                fingerprint: t.authorizationFingerprint,
                                environment: t.gatewayConfiguration.environment
                            }) : (t = T(e.authorization), this._authorizationInformation = {
                                fingerprint: t.attrs.authorizationFingerprint,
                                environment: t.environment
                            }), this._clientPromise = c.create({
                                authorization: e.authorization,
                                client: e.client,
                                debug: e.debug,
                                assetsUrl: d.create(e.authorization),
                                name: "PayPal Checkout"
                            }).then(function(e) {
                                return this._configuration = e.getConfiguration(), this._merchantAccountId || (this._configuration.gatewayConfiguration.paypalEnabled ? !0 === this._configuration.gatewayConfiguration.paypal.environmentNoNetwork && (this._setupError = new h(f.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED)) : this._setupError = new h(f.PAYPAL_NOT_ENABLED)), this._setupError ? l.reject(this._setupError) : (r.sendEvent(e, "paypal-checkout.initialized"), this._frameServicePromise = this._setupFrameService(e), e)
                            }.bind(this)), e.client ? this._clientPromise.then(function() {
                                return this
                            }.bind(this)) : l.resolve(this)
                        }, D.prototype._setupFrameService = function(e) {
                            var t = new _,
                                n = e.getConfiguration(),
                                o = setTimeout((function() {
                                    r.sendEvent(e, "paypal-checkout.frame-service.timed-out"), t.reject(new h(f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED))
                                }), C);
                            return this._assetsUrl = n.gatewayConfiguration.paypal.assetsUrl + "/web/" + P, this._isDebug = n.isDebug, this._loadingFrameUrl = this._assetsUrl + "/html/paypal-landing-frame" + N(this._isDebug) + ".html", A.create({
                                name: "braintreepaypallanding",
                                dispatchFrameUrl: this._assetsUrl + "/html/dispatch-frame" + N(this._isDebug) + ".html",
                                openFrameUrl: this._loadingFrameUrl
                            }, function(e) {
                                this._frameService = e, clearTimeout(o), t.resolve()
                            }.bind(this)), t
                        }, D.prototype.createPayment = function(e) {
                            return e && y.FLOW_ENDPOINTS.hasOwnProperty(e.flow) ? (r.sendEvent(this._clientPromise, "paypal-checkout.createPayment"), this._createPaymentResource(e).then((function(t) {
                                return "checkout" === e.flow ? t.paymentResource.redirectUrl.match(/EC-\w+/)[0] : t.agreementSetup.tokenId
                            }))) : l.reject(new h(f.PAYPAL_FLOW_OPTION_REQUIRED))
                        }, D.prototype._createPaymentResource = function(e, t) {
                            var n = this,
                                o = "paypal_hermes/" + y.FLOW_ENDPOINTS[e.flow];
                            return delete this.intentFromCreatePayment, t = t || {}, !0 === e.offerCredit && r.sendEvent(this._clientPromise, "paypal-checkout.credit.offered"), this._clientPromise.then((function(r) {
                                return r.request({
                                    endpoint: o,
                                    method: "post",
                                    data: n._formatPaymentResourceData(e, t)
                                }).then((function(data) {
                                    return n.intentFromCreatePayment = e.intent, data
                                }))
                            })).catch((function(e) {
                                return n._setupError ? l.reject(n._setupError) : 422 === (e.details && e.details.httpStatus) ? l.reject(new h({
                                    type: f.PAYPAL_INVALID_PAYMENT_OPTION.type,
                                    code: f.PAYPAL_INVALID_PAYMENT_OPTION.code,
                                    message: f.PAYPAL_INVALID_PAYMENT_OPTION.message,
                                    details: {
                                        originalError: e
                                    }
                                })) : l.reject(m(e, {
                                    type: f.PAYPAL_FLOW_FAILED.type,
                                    code: f.PAYPAL_FLOW_FAILED.code,
                                    message: f.PAYPAL_FLOW_FAILED.message
                                }))
                            }))
                        }, D.prototype.startVaultInitiatedCheckout = function(e) {
                            var t, n = this;
                            return this._vaultInitiatedCheckoutInProgress ? (r.sendEvent(this._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.error.already-in-progress"), l.reject(new h(f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS))) : (R.forEach((function(param) {
                                e.hasOwnProperty(param) || (t = param)
                            })), t ? l.reject(new h({
                                type: f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.type,
                                code: f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.code,
                                message: "Required param " + t + " is missing."
                            })) : (this._vaultInitiatedCheckoutInProgress = !0, this._addModalBackdrop(e), e = o({}, e, {
                                flow: "checkout"
                            }), r.sendEvent(this._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.started"), this._waitForVaultInitiatedCheckoutDependencies().then((function() {
                                var t = new _,
                                    r = n._createPaymentResource(e, {
                                        returnUrl: n._constructVaultCheckutUrl("redirect-frame"),
                                        cancelUrl: n._constructVaultCheckutUrl("cancel-frame")
                                    }).then((function(e) {
                                        var r = e.paymentResource.redirectUrl;
                                        return n._frameService.redirect(r), t
                                    }));
                                return n._frameService.open({}, n._createFrameServiceCallback(t)), r
                            })).catch((function(e) {
                                return n._vaultInitiatedCheckoutInProgress = !1, n._removeModalBackdrop(), "FRAME_SERVICE_FRAME_CLOSED" === e.code ? (r.sendEvent(n._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.canceled.by-customer"), l.reject(new h(f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED))) : (n._frameService && n._frameService.close(), e.code && e.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1 ? (r.sendEvent(n._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.failed.popup-not-opened"), l.reject(new h({
                                    code: f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.code,
                                    type: f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.type,
                                    message: f.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.message,
                                    details: {
                                        originalError: e
                                    }
                                }))) : l.reject(e))
                            })).then((function(e) {
                                return n._frameService.close(), n._vaultInitiatedCheckoutInProgress = !1, n._removeModalBackdrop(), r.sendEvent(n._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.succeeded"), l.resolve(e)
                            }))))
                        }, D.prototype._addModalBackdrop = function(e) {
                            e.optOutOfModalBackdrop || (this._modalBackdrop || (this._modalBackdrop = document.createElement("div"), this._modalBackdrop.setAttribute("data-braintree-paypal-vault-initiated-checkout-modal", !0), this._modalBackdrop.style.position = "fixed", this._modalBackdrop.style.top = 0, this._modalBackdrop.style.bottom = 0, this._modalBackdrop.style.left = 0, this._modalBackdrop.style.right = 0, this._modalBackdrop.style.zIndex = 9999, this._modalBackdrop.style.background = "black", this._modalBackdrop.style.opacity = "0.7", this._modalBackdrop.addEventListener("click", function() {
                                this.focusVaultInitiatedCheckoutWindow()
                            }.bind(this))), document.body.appendChild(this._modalBackdrop))
                        }, D.prototype._removeModalBackdrop = function() {
                            this._modalBackdrop && this._modalBackdrop.parentNode && this._modalBackdrop.parentNode.removeChild(this._modalBackdrop)
                        }, D.prototype.closeVaultInitiatedCheckoutWindow = function() {
                            return this._vaultInitiatedCheckoutInProgress && r.sendEvent(this._clientPromise, "paypal-checkout.startVaultInitiatedCheckout.canceled.by-merchant"), this._waitForVaultInitiatedCheckoutDependencies().then(function() {
                                this._frameService.close()
                            }.bind(this))
                        }, D.prototype.focusVaultInitiatedCheckoutWindow = function() {
                            return this._waitForVaultInitiatedCheckoutDependencies().then(function() {
                                this._frameService.focus()
                            }.bind(this))
                        }, D.prototype._createFrameServiceCallback = function(e) {
                            var t = this;
                            return function(n, r) {
                                n ? e.reject(n) : r && (t._frameService.redirect(t._loadingFrameUrl), t.tokenizePayment({
                                    paymentToken: r.token,
                                    payerID: r.PayerID,
                                    paymentID: r.paymentId
                                }).then((function(t) {
                                    e.resolve(t)
                                })).catch((function(t) {
                                    e.reject(t)
                                })))
                            }
                        }, D.prototype._waitForVaultInitiatedCheckoutDependencies = function() {
                            var e = this;
                            return this._clientPromise.then((function() {
                                return e._frameServicePromise
                            }))
                        }, D.prototype._constructVaultCheckutUrl = function(e) {
                            var t = this._frameService._serviceId;
                            return this._assetsUrl + "/html/" + e + N(this._isDebug) + ".html?channel=" + t
                        }, D.prototype.tokenizePayment = function(e) {
                            var t, n = this,
                                o = !0,
                                c = {
                                    flow: e.billingToken && !e.paymentID ? "vault" : "checkout",
                                    intent: e.intent || this.intentFromCreatePayment
                                },
                                d = {
                                    ecToken: e.paymentToken,
                                    billingToken: e.billingToken,
                                    payerId: e.payerID,
                                    paymentId: e.paymentID,
                                    shippingOptionsId: e.shippingOptionsId
                                };
                            return e.hasOwnProperty("vault") && (o = e.vault), c.vault = o, r.sendEvent(this._clientPromise, "paypal-checkout.tokenization.started"), this._clientPromise.then((function(e) {
                                return e.request({
                                    endpoint: "payment_methods/paypal_accounts",
                                    method: "post",
                                    data: n._formatTokenizeData(c, d)
                                })
                            })).then((function(e) {
                                return t = n._formatTokenizePayload(e), r.sendEvent(n._clientPromise, "paypal-checkout.tokenization.success"), t.creditFinancingOffered && r.sendEvent(n._clientPromise, "paypal-checkout.credit.accepted"), t
                            })).catch((function(e) {
                                return n._setupError ? l.reject(n._setupError) : (r.sendEvent(n._clientPromise, "paypal-checkout.tokenization.failed"), l.reject(m(e, {
                                    type: f.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
                                    code: f.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
                                    message: f.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
                                })))
                            }))
                        }, D.prototype.getClientId = function() {
                            return this._clientPromise.then((function(e) {
                                return e.getConfiguration().gatewayConfiguration.paypal.clientId
                            }))
                        }, D.prototype.loadPayPalSDK = function(e) {
                            var t, n = new _,
                                r = e && e.dataAttributes || {},
                                c = r["user-id-token"] || r["data-user-id-token"];
                            return c || (c = this._authorizationInformation.fingerprint && this._authorizationInformation.fingerprint.split("?")[0]), this._paypalScript = document.createElement("script"), delete(e = o({}, {
                                components: "buttons"
                            }, e)).dataAttributes, e.vault ? e.intent = e.intent || "tokenize" : (e.intent = e.intent || "authorize", e.currency = e.currency || "USD"), t = "https://www.paypal.com/sdk/js?", this._paypalScript.onload = function() {
                                n.resolve()
                            }, Object.keys(r).forEach(function(e) {
                                this._paypalScript.setAttribute("data-" + e.replace(/^data\-/, ""), r[e])
                            }.bind(this)), (e["client-id"] ? l.resolve(e["client-id"]) : this.getClientId()).then(function(n) {
                                e["client-id"] = n, this._autoSetDataUserIdToken && c && (this._paypalScript.setAttribute("data-user-id-token", c), this._attachPreloadPixel({
                                    id: n,
                                    userIdToken: c,
                                    amount: r.amount,
                                    currency: e.currency,
                                    merchantId: e["merchant-id"]
                                })), this._paypalScript.src = v.queryify(t, e), document.head.insertBefore(this._paypalScript, document.head.firstElementChild)
                            }.bind(this)), n.then(function() {
                                return this
                            }.bind(this))
                        }, D.prototype._attachPreloadPixel = function(e) {
                            var t, n = e.id,
                                r = e.userIdToken,
                                o = "production" === this._authorizationInformation.environment ? "" : "sandbox.",
                                c = S.replace("{ENV}", o),
                                d = {
                                    "client-id": n,
                                    "user-id-token": r
                                };
                            e.amount && (d.amount = e.amount), e.currency && (d.currency = e.currency), e.merchantId && (d["merchant-id"] = e.merchantId), (t = new XMLHttpRequest).open("GET", v.queryify(c, d)), t.send()
                        }, D.prototype._formatPaymentResourceData = function(e, t) {
                            var n, r = this._configuration.gatewayConfiguration,
                                o = e.intent,
                                c = {
                                    returnUrl: t.returnUrl || "https://www.paypal.com/checkoutnow/error",
                                    cancelUrl: t.cancelUrl || "https://www.paypal.com/checkoutnow/error",
                                    offerPaypalCredit: !0 === e.offerCredit,
                                    merchantAccountId: this._merchantAccountId,
                                    experienceProfile: {
                                        brandName: e.displayName || r.paypal.displayName,
                                        localeCode: e.locale,
                                        noShipping: (!e.enableShippingAddress).toString(),
                                        addressOverride: !1 === e.shippingAddressEditable,
                                        landingPageType: e.landingPageType
                                    },
                                    shippingOptions: e.shippingOptions
                                };
                            if ("checkout" === e.flow) {
                                for (n in c.amount = e.amount, c.currencyIsoCode = e.currency, c.requestBillingAgreement = e.requestBillingAgreement, o && ("capture" === o && (o = "sale"), c.intent = o), e.hasOwnProperty("lineItems") && (c.lineItems = e.lineItems), e.hasOwnProperty("vaultInitiatedCheckoutPaymentMethodToken") && (c.vaultInitiatedCheckoutPaymentMethodToken = e.vaultInitiatedCheckoutPaymentMethodToken), e.hasOwnProperty("shippingOptions") && (c.shippingOptions = e.shippingOptions), e.shippingAddressOverride) e.shippingAddressOverride.hasOwnProperty(n) && (c[n] = e.shippingAddressOverride[n]);
                                e.hasOwnProperty("billingAgreementDetails") && (c.billingAgreementDetails = e.billingAgreementDetails)
                            } else c.shippingAddress = e.shippingAddressOverride, e.billingAgreementDescription && (c.description = e.billingAgreementDescription);
                            return this._riskCorrelationId = e.riskCorrelationId, e.riskCorrelationId && (c.correlationId = this._riskCorrelationId), c
                        }, D.prototype._formatTokenizeData = function(e, t) {
                            var n = this._configuration,
                                r = n.gatewayConfiguration,
                                o = "TOKENIZATION_KEY" === n.authorizationType,
                                c = "vault" === e.flow,
                                data = {
                                    paypalAccount: {
                                        correlationId: this._riskCorrelationId || t.billingToken || t.ecToken,
                                        options: {
                                            validate: c && !o && e.vault
                                        }
                                    }
                                };
                            return c ? data.paypalAccount.billingAgreementToken = t.billingToken : (data.paypalAccount.paymentToken = t.paymentId, data.paypalAccount.payerId = t.payerId, data.paypalAccount.unilateral = r.paypal.unvettedMerchant, e.intent && (data.paypalAccount.intent = e.intent)), this._merchantAccountId && (data.merchantAccountId = this._merchantAccountId), data
                        }, D.prototype._formatTokenizePayload = function(e) {
                            var t, n = {};
                            return e.paypalAccounts && (n = e.paypalAccounts[0]), t = {
                                nonce: n.nonce,
                                details: {},
                                type: n.type
                            }, n.details && n.details.payerInfo && (t.details = n.details.payerInfo), n.details && n.details.creditFinancingOffered && (t.creditFinancingOffered = n.details.creditFinancingOffered), n.details && n.details.shippingOptionId && (t.shippingOptionId = n.details.shippingOptionId), n.details && n.details.cobrandedCardLabel && (t.cobrandedCardLabel = n.details.cobrandedCardLabel), t
                        }, D.prototype.teardown = function() {
                            var e = this;
                            return O(this, I(D.prototype)), this._paypalScript && this._paypalScript.parentNode && this._paypalScript.parentNode.removeChild(this._paypalScript), this._frameServicePromise.catch((function() {})).then((function() {
                                return e._frameService ? e._frameService.teardown() : l.resolve()
                            }))
                        }, t.exports = E.wrapPrototype(D)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/assign": 128,
                        "../lib/braintree-error": 131,
                        "../lib/constants": 133,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/convert-to-braintree-error": 135,
                        "../lib/create-assets-url": 136,
                        "../lib/create-authorization-data": 137,
                        "../lib/create-deferred-client": 138,
                        "../lib/frame-service/external": 146,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "../lib/querystring": 165,
                        "../lib/use-min": 167,
                        "../paypal/shared/constants": 187,
                        "./errors": 182,
                        "@braintree/extended-promise": 40,
                        "@braintree/wrap-promise": 49
                    }],
                    185: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/frame-service/external"),
                            o = e("../../lib/braintree-error"),
                            c = e("../../lib/convert-to-braintree-error"),
                            d = e("../../lib/use-min"),
                            l = e("../../lib/once"),
                            _ = "3.85.3",
                            E = e("../shared/constants"),
                            h = e("../../lib/constants").INTEGRATION_TIMEOUT_MS,
                            m = e("../../lib/analytics"),
                            f = e("../../lib/methods"),
                            y = e("../../lib/deferred"),
                            A = e("../shared/errors"),
                            T = e("../../lib/convert-methods-to-error"),
                            I = e("../../lib/querystring"),
                            N = e("../../lib/promise"),
                            O = e("@braintree/wrap-promise");

                        function v(e) {
                            this._client = e.client, this._assetsUrl = e.client.getConfiguration().gatewayConfiguration.paypal.assetsUrl + "/web/" + _, this._isDebug = e.client.getConfiguration().isDebug, this._loadingFrameUrl = this._assetsUrl + "/html/paypal-landing-frame" + d(this._isDebug) + ".html", this._authorizationInProgress = !1
                        }
                        v.prototype._initialize = function() {
                            var e = this,
                                t = this._client,
                                n = setTimeout((function() {
                                    m.sendEvent(t, "paypal.load.timed-out")
                                }), h);
                            return new N((function(o) {
                                r.create({
                                    name: E.LANDING_FRAME_NAME,
                                    dispatchFrameUrl: e._assetsUrl + "/html/dispatch-frame" + d(e._isDebug) + ".html",
                                    openFrameUrl: e._loadingFrameUrl
                                }, (function(r) {
                                    e._frameService = r, clearTimeout(n), m.sendEvent(t, "paypal.load.succeeded"), o(e)
                                }))
                            }))
                        }, v.prototype.tokenize = function(e, t) {
                            var n, r, c = this,
                                d = this._client;
                            return t && (t = l(y(t))), e && E.FLOW_ENDPOINTS.hasOwnProperty(e.flow) ? (n = new N((function(t, n) {
                                c._authorizationInProgress ? (m.sendEvent(d, "paypal.tokenization.error.already-opened"), n(new o(A.PAYPAL_TOKENIZATION_REQUEST_ACTIVE))) : (c._authorizationInProgress = !0, window.popupBridge || m.sendEvent(d, "paypal.tokenization.opened"), !0 === e.offerCredit && m.sendEvent(d, "paypal.credit.offered"), !0 === e.offerPayLater && m.sendEvent(d, "paypal.paylater.offered"), c._navigateFrameToAuth(e).catch(n), c._frameService.open({}, c._createFrameServiceCallback(e, t, n)))
                            })), t ? (n.then((function(e) {
                                t(null, e)
                            })).catch(t), this._frameService.createHandler({
                                beforeClose: function() {
                                    m.sendEvent(d, "paypal.tokenization.closed.by-merchant")
                                }
                            })) : n) : (r = new o(A.PAYPAL_FLOW_OPTION_REQUIRED), t ? (t(r), this._frameService.createNoopHandler()) : N.reject(r))
                        }, v.prototype._createFrameServiceCallback = function(e, t, n) {
                            var r = this,
                                c = this._client;
                            return window.popupBridge ? function(d, l) {
                                var _ = l && l.path && "/cancel" === l.path.substring(0, 7);
                                r._authorizationInProgress = !1, d || _ ? (m.sendEvent(c, "paypal.tokenization.closed-popupbridge.by-user"), n(new o(A.PAYPAL_POPUP_CLOSED))) : l && r._tokenizePayPal(e, l.queryItems).then(t).catch(n)
                            } : function(d, l) {
                                r._authorizationInProgress = !1, d ? "FRAME_SERVICE_FRAME_CLOSED" === d.code ? (m.sendEvent(c, "paypal.tokenization.closed.by-user"), n(new o(A.PAYPAL_POPUP_CLOSED))) : d.code && d.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1 && n(new o({
                                    code: A.PAYPAL_POPUP_OPEN_FAILED.code,
                                    type: A.PAYPAL_POPUP_OPEN_FAILED.type,
                                    message: A.PAYPAL_POPUP_OPEN_FAILED.message,
                                    details: {
                                        originalError: d
                                    }
                                })) : l && r._tokenizePayPal(e, l).then(t).catch(n)
                            }
                        }, v.prototype._tokenizePayPal = function(e, t) {
                            var n = this,
                                r = this._client;
                            return window.popupBridge || this._frameService.redirect(this._loadingFrameUrl), r.request({
                                endpoint: "payment_methods/paypal_accounts",
                                method: "post",
                                data: this._formatTokenizeData(e, t)
                            }).then((function(e) {
                                var t = n._formatTokenizePayload(e);
                                return window.popupBridge ? m.sendEvent(r, "paypal.tokenization.success-popupbridge") : m.sendEvent(r, "paypal.tokenization.success"), t.creditFinancingOffered && m.sendEvent(r, "paypal.credit.accepted"), n._frameService.close(), t
                            })).catch((function(e) {
                                return window.popupBridge ? m.sendEvent(r, "paypal.tokenization.failed-popupbridge") : m.sendEvent(r, "paypal.tokenization.failed"), n._frameService.close(), N.reject(c(e, {
                                    type: A.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
                                    code: A.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
                                    message: A.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
                                }))
                            }))
                        }, v.prototype._formatTokenizePayload = function(e) {
                            var t, n = {};
                            return e.paypalAccounts && (n = e.paypalAccounts[0]), t = {
                                nonce: n.nonce,
                                details: {},
                                type: n.type
                            }, n.details && n.details.payerInfo && (t.details = n.details.payerInfo), n.details && n.details.creditFinancingOffered && (t.creditFinancingOffered = n.details.creditFinancingOffered), t
                        }, v.prototype._formatTokenizeData = function(e, t) {
                            var n = this._client.getConfiguration(),
                                r = n.gatewayConfiguration,
                                o = "TOKENIZATION_KEY" === n.authorizationType,
                                data = {
                                    paypalAccount: {
                                        correlationId: t.ba_token || t.token,
                                        options: {
                                            validate: "vault" === e.flow && !o
                                        }
                                    }
                                };
                            return t.ba_token ? data.paypalAccount.billingAgreementToken = t.ba_token : (data.paypalAccount.paymentToken = t.paymentId, data.paypalAccount.payerId = t.PayerID, data.paypalAccount.unilateral = r.paypal.unvettedMerchant, e.hasOwnProperty("intent") && (data.paypalAccount.intent = e.intent)), data
                        }, v.prototype._navigateFrameToAuth = function(e) {
                            var t = this,
                                n = this._client,
                                r = "paypal_hermes/" + E.FLOW_ENDPOINTS[e.flow];
                            return n.request({
                                endpoint: r,
                                method: "post",
                                data: this._formatPaymentResourceData(e)
                            }).then((function(r) {
                                var o;
                                o = "checkout" === e.flow ? r.paymentResource.redirectUrl : r.agreementSetup.approvalUrl, "commit" === e.useraction && (o = I.queryify(o, {
                                    useraction: "commit"
                                })), window.popupBridge && m.sendEvent(n, "paypal.tokenization.opened-popupbridge"), t._frameService.redirect(o)
                            })).catch((function(e) {
                                var n = e.details && e.details.httpStatus;
                                return t._frameService.close(), t._authorizationInProgress = !1, 422 === n ? N.reject(new o({
                                    type: A.PAYPAL_INVALID_PAYMENT_OPTION.type,
                                    code: A.PAYPAL_INVALID_PAYMENT_OPTION.code,
                                    message: A.PAYPAL_INVALID_PAYMENT_OPTION.message,
                                    details: {
                                        originalError: e
                                    }
                                })) : N.reject(c(e, {
                                    type: A.PAYPAL_FLOW_FAILED.type,
                                    code: A.PAYPAL_FLOW_FAILED.code,
                                    message: A.PAYPAL_FLOW_FAILED.message
                                }))
                            }))
                        }, v.prototype._formatPaymentResourceData = function(e) {
                            var t, n = this._client.getConfiguration().gatewayConfiguration,
                                r = this._frameService._serviceId,
                                o = {
                                    returnUrl: n.paypal.assetsUrl + "/web/" + _ + "/html/redirect-frame" + d(this._isDebug) + ".html?channel=" + r,
                                    cancelUrl: n.paypal.assetsUrl + "/web/" + _ + "/html/cancel-frame" + d(this._isDebug) + ".html?channel=" + r,
                                    offerPaypalCredit: !0 === e.offerCredit,
                                    offerPayLater: !0 === e.offerPayLater,
                                    experienceProfile: {
                                        brandName: e.displayName || n.paypal.displayName,
                                        localeCode: e.locale,
                                        noShipping: (!e.enableShippingAddress).toString(),
                                        addressOverride: !1 === e.shippingAddressEditable,
                                        landingPageType: e.landingPageType
                                    }
                                };
                            if (window.popupBridge && "function" == typeof window.popupBridge.getReturnUrlPrefix && (o.returnUrl = window.popupBridge.getReturnUrlPrefix() + "return", o.cancelUrl = window.popupBridge.getReturnUrlPrefix() + "cancel"), "checkout" === e.flow)
                                for (t in o.amount = e.amount, o.currencyIsoCode = e.currency, e.hasOwnProperty("intent") && (o.intent = e.intent), e.shippingAddressOverride) e.shippingAddressOverride.hasOwnProperty(t) && (o[t] = e.shippingAddressOverride[t]);
                            else o.shippingAddress = e.shippingAddressOverride, e.billingAgreementDescription && (o.description = e.billingAgreementDescription);
                            return o
                        }, v.prototype.closeWindow = function() {
                            this._authorizationInProgress && m.sendEvent(this._client, "paypal.tokenize.closed.by-merchant"), this._frameService.close()
                        }, v.prototype.focusWindow = function() {
                            this._frameService.focus()
                        }, v.prototype.teardown = O((function() {
                            var e = this;
                            return e._frameService.teardown(), T(e, f(v.prototype)), m.sendEvent(e._client, "paypal.teardown-completed"), N.resolve()
                        })), t.exports = v
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/braintree-error": 131,
                        "../../lib/constants": 133,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/convert-to-braintree-error": 135,
                        "../../lib/deferred": 139,
                        "../../lib/frame-service/external": 146,
                        "../../lib/methods": 162,
                        "../../lib/once": 163,
                        "../../lib/promise": 164,
                        "../../lib/querystring": 165,
                        "../../lib/use-min": 167,
                        "../shared/constants": 187,
                        "../shared/errors": 188,
                        "@braintree/wrap-promise": 49
                    }],
                    186: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("../lib/braintree-error"),
                            _ = e("./shared/errors"),
                            E = e("./external/paypal"),
                            h = "3.85.3",
                            m = e("@braintree/wrap-promise"),
                            f = e("../lib/promise");

                        function y(e) {
                            var t = "PayPal";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                var n = t.getConfiguration();
                                return e.client = t, !0 !== n.gatewayConfiguration.paypalEnabled ? f.reject(new l(_.PAYPAL_NOT_ENABLED)) : (r.sendEvent(e.client, "paypal.initialized"), new E(e)._initialize())
                            }))
                        }

                        function A() {
                            return !0
                        }
                        t.exports = {
                            create: m(y),
                            isSupported: A,
                            VERSION: h
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./external/paypal": 185,
                        "./shared/errors": 188,
                        "@braintree/wrap-promise": 49
                    }],
                    187: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            LANDING_FRAME_NAME: "braintreepaypallanding",
                            FLOW_ENDPOINTS: {
                                checkout: "create_payment_resource",
                                vault: "setup_billing_agreement"
                            }
                        }
                    }, {}],
                    188: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            PAYPAL_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_NOT_ENABLED",
                                message: "PayPal is not enabled for this merchant."
                            },
                            PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_TOKENIZATION_REQUEST_ACTIVE",
                                message: "Another tokenization request is active."
                            },
                            PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
                                type: r.types.NETWORK,
                                code: "PAYPAL_ACCOUNT_TOKENIZATION_FAILED",
                                message: "Could not tokenize user's PayPal account."
                            },
                            PAYPAL_FLOW_FAILED: {
                                type: r.types.NETWORK,
                                code: "PAYPAL_FLOW_FAILED",
                                message: "Could not initialize PayPal flow."
                            },
                            PAYPAL_FLOW_OPTION_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_FLOW_OPTION_REQUIRED",
                                message: "PayPal flow property is invalid or missing."
                            },
                            PAYPAL_POPUP_OPEN_FAILED: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_POPUP_OPEN_FAILED",
                                message: "PayPal popup failed to open, make sure to tokenize in response to a user action."
                            },
                            PAYPAL_POPUP_CLOSED: {
                                type: r.types.CUSTOMER,
                                code: "PAYPAL_POPUP_CLOSED",
                                message: "Customer closed PayPal popup before authorizing."
                            },
                            PAYPAL_INVALID_PAYMENT_OPTION: {
                                type: r.types.MERCHANT,
                                code: "PAYPAL_INVALID_PAYMENT_OPTION",
                                message: "PayPal payment options are invalid."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    189: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/wrap-promise"),
                            o = e("../lib/basic-component-verification"),
                            c = e("./preferred-payment-methods"),
                            d = "3.85.3";

                        function l(e) {
                            var t = "PreferredPaymentMethods";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return (new c).initialize(e)
                            }))
                        }
                        t.exports = {
                            create: r(l),
                            VERSION: d
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "./preferred-payment-methods": 190,
                        "@braintree/wrap-promise": 49
                    }],
                    190: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/wrap-promise"),
                            o = e("../lib/analytics"),
                            c = e("../lib/create-assets-url"),
                            d = e("../lib/create-deferred-client"),
                            l = e("../lib/promise");

                        function _() {}
                        _.prototype.initialize = function(e) {
                            var t = this;
                            return this._clientPromise = d.create({
                                authorization: e.authorization,
                                client: e.client,
                                debug: e.debug,
                                assetsUrl: c.create(e.authorization),
                                name: "PreferredPaymentMethods"
                            }).catch((function(e) {
                                return t._setupError = e, l.reject(e)
                            })), o.sendEvent(this._clientPromise, "preferred-payment-methods.initialized"), l.resolve(this)
                        }, _.prototype.fetchPreferredPaymentMethods = function() {
                            var e, t = this;
                            return this._clientPromise.then((function(t) {
                                return (e = t).request({
                                    api: "graphQLApi",
                                    data: {
                                        query: "query PreferredPaymentMethods { preferredPaymentMethods { paypalPreferred venmoPreferred } }"
                                    }
                                })
                            })).then((function(t) {
                                var n = t.data.preferredPaymentMethods.paypalPreferred,
                                    r = t.data.preferredPaymentMethods.venmoPreferred;
                                return o.sendEvent(e, "preferred-payment-methods.paypal.api-detected." + n), o.sendEvent(e, "preferred-payment-methods.venmo.api-detected." + r), {
                                    paypalPreferred: n,
                                    venmoPreferred: r
                                }
                            })).catch((function() {
                                return t._setupError ? l.reject(t._setupError) : (o.sendEvent(e, "preferred-payment-methods.api-error"), {
                                    paypalPreferred: !1,
                                    venmoPreferred: !1
                                })
                            }))
                        }, t.exports = r.wrapPrototype(_)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "@braintree/wrap-promise": 49
                    }],
                    191: [function(e, t, n) {
                        "use strict";
                        var r = e("../../../lib/assign").assign,
                            o = e("../../../lib/analytics"),
                            c = e("../../../lib/braintree-error"),
                            d = e("../../../lib/promise"),
                            l = e("../../../lib/is-verified-domain"),
                            _ = e("@braintree/extended-promise"),
                            E = e("@braintree/event-emitter"),
                            h = e("../../shared/errors"),
                            m = e("@braintree/iframer"),
                            f = e("framebus"),
                            y = e("../../shared/constants"),
                            A = e("@braintree/uuid"),
                            T = e("../../shared/events"),
                            I = e("../../../lib/use-min"),
                            N = e("../../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT,
                            O = "3.85.3",
                            v = 400,
                            P = 400;

                        function C(e) {
                            E.call(this), this._client = e.client, this._createPromise = e.createPromise, this._createOptions = e, this._client ? (this._isDebug = this._client.getConfiguration().isDebug, this._assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl) : (this._isDebug = Boolean(e.isDebug), this._assetsUrl = e.assetsUrl), this._assetsUrl = this._assetsUrl + "/web/" + O
                        }
                        E.createChild(C), C.prototype._waitForClient = function() {
                            return this._client ? d.resolve() : this._createPromise.then(function(e) {
                                this._client = e
                            }.bind(this))
                        }, C.prototype.setUpEventListeners = function() {
                            throw new c(h.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED)
                        }, C.prototype.verifyCard = function(e, t) {
                            var n, r, c = this;
                            return t = t || {}, (r = this._checkForVerifyCardError(e, t)) ? d.reject(r) : (this._verifyCardInProgress = !0, n = this._formatVerifyCardOptions(e), this._formatLookupData(n).then((function(data) {
                                return o.sendEvent(c._createPromise, "three-d-secure.verification-flow.started"), c._performLookup(n.nonce, data)
                            })).then((function(e) {
                                return o.sendEvent(c._createPromise, "three-d-secure.verification-flow.3ds-version." + e.lookup.threeDSecureVersion), c._onLookupComplete(e, n)
                            })).then((function(e) {
                                return c.initializeChallengeWithLookupResponse(e, n)
                            })).then((function(e) {
                                return c._resetVerificationState(), o.sendEvent(c._createPromise, "three-d-secure.verification-flow.completed"), e
                            })).catch((function(e) {
                                return c._resetVerificationState(), o.sendEvent(c._createPromise, "three-d-secure.verification-flow.failed"), d.reject(e)
                            })))
                        }, C.prototype._checkForFrameworkSpecificVerifyCardErrors = function() {
                            throw new c(h.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED)
                        }, C.prototype._presentChallenge = function() {
                            throw new c(h.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED)
                        }, C.prototype.prepareLookup = function() {
                            throw new c(h.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED)
                        }, C.prototype._resetVerificationState = function() {
                            this._verifyCardInProgress = !1, this._verifyCardPromisePlus = null
                        }, C.prototype._performLookup = function(e, data) {
                            var t = this,
                                n = "payment_methods/" + e + "/three_d_secure/lookup";
                            return this._waitForClient().then((function() {
                                return t._client.request({
                                    endpoint: n,
                                    method: "post",
                                    data: data
                                }).catch((function(e) {
                                    var n, r = e && e.details && e.details.httpStatus,
                                        l = "three-d-secure.verification-flow.lookup-failed";
                                    return 404 === r ? (n = h.THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR, l += ".404") : 422 === r ? (n = h.THREEDS_LOOKUP_VALIDATION_ERROR, l += ".422") : n = h.THREEDS_LOOKUP_ERROR, o.sendEvent(t._createPromise, l), d.reject(new c({
                                        type: n.type,
                                        code: n.code,
                                        message: n.message,
                                        details: {
                                            originalError: e
                                        }
                                    }))
                                }))
                            }))
                        }, C.prototype._checkForVerifyCardError = function(e, t) {
                            var n;
                            return !0 === this._verifyCardInProgress ? new c(h.THREEDS_AUTHENTICATION_IN_PROGRESS) : (e.nonce ? e.amount || (n = "an amount") : n = "a nonce", n || (n = this._checkForFrameworkSpecificVerifyCardErrors(e, t)), n ? new c({
                                type: h.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
                                code: h.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
                                message: "verifyCard options must include " + n + "."
                            }) : null)
                        }, C.prototype.initializeChallengeWithLookupResponse = function(e, t) {
                            var n = this;
                            return t = t || {}, this._lookupPaymentMethod = e.paymentMethod, n._verifyCardPromisePlus = n._verifyCardPromisePlus || new _, n._handleLookupResponse(e, t), n._verifyCardPromisePlus.then((function(e) {
                                return o.sendEvent(n._createPromise, "three-d-secure.verification-flow.liability-shifted." + String(e.liabilityShifted)), o.sendEvent(n._createPromise, "three-d-secure.verification-flow.liability-shift-possible." + String(e.liabilityShiftPossible)), e
                            }))
                        }, C.prototype._handleLookupResponse = function(e, t) {
                            var details, n = Boolean(e.lookup && e.lookup.acsUrl);
                            o.sendEvent(this._createPromise, "three-d-secure.verification-flow.challenge-presented." + String(n)), n ? this._presentChallenge(e, t) : ((details = this._formatAuthResponse(e.paymentMethod, e.threeDSecureInfo)).verificationDetails = e.threeDSecureInfo, this._verifyCardPromisePlus.resolve(details))
                        }, C.prototype._onLookupComplete = function(e) {
                            return this._lookupPaymentMethod = e.paymentMethod, this._verifyCardPromisePlus = new _, d.resolve(e)
                        }, C.prototype._formatAuthResponse = function(e, t) {
                            return {
                                nonce: e.nonce,
                                type: e.type,
                                binData: e.binData,
                                details: e.details,
                                description: e.description && e.description.replace(/\+/g, " "),
                                liabilityShifted: t && t.liabilityShifted,
                                liabilityShiftPossible: t && t.liabilityShiftPossible,
                                threeDSecureInfo: e.threeDSecureInfo
                            }
                        }, C.prototype._formatVerifyCardOptions = function(e) {
                            return r({}, e)
                        }, C.prototype._formatLookupData = function(e) {
                            var data = {
                                amount: e.amount
                            };
                            return d.resolve(data)
                        }, C.prototype._handleV1AuthResponse = function(data) {
                            var e = JSON.parse(data.auth_response);
                            e.success ? this._verifyCardPromisePlus.resolve(this._formatAuthResponse(e.paymentMethod, e.threeDSecureInfo)) : e.threeDSecureInfo && e.threeDSecureInfo.liabilityShiftPossible ? this._verifyCardPromisePlus.resolve(this._formatAuthResponse(this._lookupPaymentMethod, e.threeDSecureInfo)) : this._verifyCardPromisePlus.reject(new c({
                                type: c.types.UNKNOWN,
                                code: "UNKNOWN_AUTH_RESPONSE",
                                message: e.error.message
                            }))
                        }, C.prototype.cancelVerifyCard = function() {
                            var e, t;
                            return this._verifyCardInProgress = !1, this._lookupPaymentMethod ? (t = this._lookupPaymentMethod.threeDSecureInfo, e = r({}, this._lookupPaymentMethod, {
                                liabilityShiftPossible: t && t.liabilityShiftPossible,
                                liabilityShifted: t && t.liabilityShifted,
                                verificationDetails: t && t.verificationDetails
                            }), d.resolve(e)) : d.reject(new c(h.THREEDS_NO_VERIFICATION_PAYLOAD))
                        }, C.prototype._setupV1Bus = function(e) {
                            var t = window.location.href.split("#")[0],
                                n = e.lookupResponse,
                                r = A(),
                                o = new f({
                                    channel: r,
                                    verifyDomain: l
                                }),
                                c = this._assetsUrl + "/html/three-d-secure-authentication-complete-frame.html?channel=" + encodeURIComponent(r) + "&";
                            return o.on(N, (function(e) {
                                e({
                                    acsUrl: n.acsUrl,
                                    pareq: n.pareq,
                                    termUrl: n.termUrl + "&three_d_secure_version=" + O + "&authentication_complete_base_url=" + encodeURIComponent(c),
                                    md: n.md,
                                    parentUrl: t
                                })
                            })), o.on(T.AUTHENTICATION_COMPLETE, e.handleAuthResponse), o
                        }, C.prototype._setupV1Iframe = function(e) {
                            var t = this._assetsUrl + "/html/three-d-secure-bank-frame" + I(this._isDebug) + ".html?showLoader=" + e.showLoader;
                            return m({
                                src: t,
                                height: v,
                                width: P,
                                name: y.LANDING_FRAME_NAME + "_" + this._v1Bus.channel,
                                title: "3D Secure Authorization Frame"
                            })
                        }, C.prototype._setupV1Elements = function(e) {
                            this._v1Bus = this._setupV1Bus(e), this._v1Iframe = this._setupV1Iframe(e)
                        }, C.prototype._teardownV1Elements = function() {
                            this._v1Bus && (this._v1Bus.teardown(), this._v1Bus = null), this._v1Iframe && this._v1Iframe.parentNode && (this._v1Iframe.parentNode.removeChild(this._v1Iframe), this._v1Iframe = null), this._onV1Keyup && (document.removeEventListener("keyup", this._onV1Keyup), this._onV1Keyup = null)
                        }, C.prototype.teardown = function() {
                            return o.sendEvent(this._createPromise, "three-d-secure.teardown-completed"), this._teardownV1Elements(), d.resolve()
                        }, t.exports = C
                    }, {
                        "../../../lib/analytics": 126,
                        "../../../lib/assign": 128,
                        "../../../lib/braintree-error": 131,
                        "../../../lib/constants": 133,
                        "../../../lib/is-verified-domain": 160,
                        "../../../lib/promise": 164,
                        "../../../lib/use-min": 167,
                        "../../shared/constants": 200,
                        "../../shared/errors": 201,
                        "../../shared/events": 202,
                        "@braintree/event-emitter": 39,
                        "@braintree/extended-promise": 40,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        framebus: 58
                    }],
                    192: [function(e, t, n) {
                        "use strict";
                        var r = e("./songbird");

                        function o(e) {
                            r.call(this, e)
                        }
                        o.prototype = Object.create(r.prototype, {
                            constructor: r
                        }), o.prototype._createV1IframeModalElement = function(iframe) {
                            var e = document.createElement("div");
                            return e.innerHTML = '<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="CCAFrameModal-label" aria-hidden="true" style="display: block;"><div class="modal-dialog" style="width:440px;z-index:999999;"><div class="modal-content"><div class="modal-body" data-braintree-v1-fallback-iframe-container><button type="button" data-braintree-v1-fallback-close-button class="close" data-dismiss="modal" aria-hidden="true">×</button></div></div></div><div data-braintree-v1-fallback-backdrop style="position: fixed;cursor: pointer;z-index: 999998;top: 0;left: 0;width: 100%;height: 100%;"></div></div>', e.querySelector("[data-braintree-v1-fallback-iframe-container]").appendChild(iframe), e
                        }, o.prototype._createCardinalConfigurationOptions = function(e) {
                            var t = r.prototype._createCardinalConfigurationOptions.call(this, e);
                            return t.payment.framework = "bootstrap3", t
                        }, t.exports = o
                    }, {
                        "./songbird": 197
                    }],
                    193: [function(e, t, n) {
                        "use strict";
                        var r = e("./songbird");

                        function o(e) {
                            r.call(this, e)
                        }
                        o.prototype = Object.create(r.prototype, {
                            constructor: r
                        }), o.prototype._createV1IframeModalElement = function(iframe) {
                            var e = document.createElement("div"),
                                t = Boolean(this._createOptions && this._createOptions.cardinalSDKConfig && this._createOptions.cardinalSDKConfig.payment && this._createOptions.cardinalSDKConfig.payment.displayExitButton);
                            return e.innerHTML = '<div style="position: fixed;z-index: 999999;top: 50%;left: 50%;padding: 24px 20px;transform: translate(-50%,-50%);border-radius: 2px;background: #fff;max-width: 100%;overflow: auto;"><div><button data-braintree-v1-fallback-close-button style="font-family: Helvetica,Arial,sans-serif;font-size: 25px;line-height: 12px;position: absolute;top: 2px;right: 0px;cursor: pointer;color: #999;border: 0;outline: none;background: none;" onMouseOver="this.style.color=\'#000\'" onMouseOut="this.style.color=\'#999\'">×</button></div><div data-braintree-v1-fallback-iframe-container style="height: 400px;"></div></div><div data-braintree-v1-fallback-backdrop style="position: fixed;z-index: 999998;cursor: pointer;top: 0;left: 0;width: 100%;height: 100%;transition: opacity 1ms ease;background: rgba(0,0,0,.6);"></div>', t || (e.querySelector("[data-braintree-v1-fallback-close-button]").style.display = "none"), e.querySelector("[data-braintree-v1-fallback-iframe-container]").appendChild(iframe), e
                        }, t.exports = o
                    }, {
                        "./songbird": 197
                    }],
                    194: [function(e, t, n) {
                        "use strict";
                        var r = e("./legacy"),
                            o = e("./cardinal-modal"),
                            c = e("./bootstrap3-modal"),
                            d = e("./inline-iframe");
                        t.exports = {
                            legacy: r,
                            "cardinal-modal": o,
                            "bootstrap3-modal": c,
                            "inline-iframe": d
                        }
                    }, {
                        "./bootstrap3-modal": 192,
                        "./cardinal-modal": 193,
                        "./inline-iframe": 195,
                        "./legacy": 196
                    }],
                    195: [function(e, t, n) {
                        "use strict";
                        var r = e("./songbird"),
                            o = e("../../../lib/braintree-error"),
                            c = e("../../shared/errors"),
                            d = e("../../../lib/enumerate");

                        function l(e) {
                            r.call(this, e)
                        }
                        l.prototype = Object.create(r.prototype, {
                            constructor: r
                        }), l.events = d(["AUTHENTICATION_IFRAME_AVAILABLE"], "inline-iframe-framework:"), l.prototype.setUpEventListeners = function(e) {
                            r.prototype.setUpEventListeners.call(this, e), this.on(l.events.AUTHENTICATION_IFRAME_AVAILABLE, (function(t, n) {
                                e("authentication-iframe-available", t, n)
                            }))
                        }, l.prototype._createCardinalConfigurationOptions = function(e) {
                            var t = r.prototype._createCardinalConfigurationOptions.call(this, e);
                            return t.payment.framework = "inline", t
                        }, l.prototype._addV1IframeToPage = function() {
                            this._emit(l.events.AUTHENTICATION_IFRAME_AVAILABLE, {
                                element: this._v1Modal
                            }, (function() {}))
                        }, l.prototype._setupFrameworkSpecificListeners = function() {
                            this.setCardinalListener("ui.inline.setup", this._onInlineSetup.bind(this))
                        }, l.prototype._onInlineSetup = function(e, details, t, n) {
                            var r, d;
                            e && details ? ("CCA" !== details.paymentType || "suppress" !== details.data.mode && "static" !== details.data.mode) && (d = !0) : d = !0, d ? n(new o(c.THREEDS_INLINE_IFRAME_DETAILS_INCORRECT)) : ((r = document.createElement("div")).innerHTML = e, "suppress" === details.data.mode ? (r.style.display = "none", document.body.appendChild(r), t()) : "static" === details.data.mode && this._emit(l.events.AUTHENTICATION_IFRAME_AVAILABLE, {
                                element: r
                            }, (function() {
                                t()
                            })))
                        }, t.exports = l
                    }, {
                        "../../../lib/braintree-error": 131,
                        "../../../lib/enumerate": 141,
                        "../../shared/errors": 201,
                        "./songbird": 197
                    }],
                    196: [function(e, t, n) {
                        "use strict";
                        var r = e("./base"),
                            o = e("../../../lib/deferred");

                        function c(e) {
                            r.call(this, e)
                        }
                        c.prototype = Object.create(r.prototype, {
                            constructor: c
                        }), c.prototype.setUpEventListeners = function() {}, c.prototype.transformV1CustomerBillingAddress = function(e) {
                            return e.billingAddress.line1 = e.billingAddress.streetAddress, e.billingAddress.line2 = e.billingAddress.extendedAddress, e.billingAddress.city = e.billingAddress.locality, e.billingAddress.state = e.billingAddress.region, e.billingAddress.countryCode = e.billingAddress.countryCodeAlpha2, delete e.billingAddress.streetAddress, delete e.billingAddress.extendedAddress, delete e.billingAddress.locality, delete e.billingAddress.region, delete e.billingAddress.countryCodeAlpha2, e
                        }, c.prototype._createIframe = function(e) {
                            var t = this;
                            return this._setupV1Elements({
                                lookupResponse: e.lookupResponse,
                                showLoader: e.showLoader,
                                handleAuthResponse: function(data) {
                                    t._handleAuthResponse(data, e)
                                }
                            }), this._v1Iframe
                        }, c.prototype._handleAuthResponse = function(data, e) {
                            this._v1Bus.teardown(), e.removeFrame(), o(function() {
                                this._handleV1AuthResponse(data)
                            }.bind(this))()
                        }, c.prototype._checkForFrameworkSpecificVerifyCardErrors = function(e) {
                            var t;
                            return "function" != typeof e.addFrame ? t = "an addFrame function" : "function" != typeof e.removeFrame && (t = "a removeFrame function"), t
                        }, c.prototype._formatVerifyCardOptions = function(e) {
                            var t = r.prototype._formatVerifyCardOptions.call(this, e);
                            return t.addFrame = o(e.addFrame), t.removeFrame = o(e.removeFrame), t.showLoader = !1 !== e.showLoader, t
                        }, c.prototype._formatLookupData = function(e) {
                            var t = this;
                            return r.prototype._formatLookupData.call(this, e).then((function(data) {
                                return e.customer && e.customer.billingAddress && (data.customer = t.transformV1CustomerBillingAddress(e.customer)), data
                            }))
                        }, c.prototype._presentChallenge = function(e, t) {
                            t.addFrame(null, this._createIframe({
                                showLoader: t.showLoader,
                                lookupResponse: e.lookup,
                                removeFrame: t.removeFrame
                            }))
                        }, t.exports = c
                    }, {
                        "../../../lib/deferred": 139,
                        "./base": 191
                    }],
                    197: [function(e, t, n) {
                        "use strict";
                        var r = e("./base"),
                            o = e("../../../lib/assign").assign,
                            c = e("../../../lib/deferred"),
                            d = e("../../../lib/braintree-error"),
                            l = e("../../../lib/convert-to-braintree-error"),
                            _ = e("../../../lib/analytics"),
                            E = e("../../../lib/assets"),
                            h = e("../../shared/errors"),
                            m = e("../../../lib/enumerate"),
                            f = e("../../shared/constants"),
                            y = e("../../../lib/promise"),
                            A = e("@braintree/extended-promise"),
                            T = e("../../../lib/constants").INTEGRATION_TIMEOUT_MS,
                            I = e("../../../lib/constants").PLATFORM,
                            N = "3.85.3",
                            O = "01",
                            v = ["ui.close", "ui.render", "ui.renderHidden", "ui.loading.close", "ui.loading.render"];

                        function P(e) {
                            r.call(this, e), this._useV1Fallback = !1, this._clientMetadata = {
                                requestedThreeDSecureVersion: "2",
                                sdkVersion: I + "/" + N
                            }, this._getDfReferenceIdPromisePlus = new A, this.setupSongbird(e), this._cardinalEvents = []
                        }

                        function C(source, e, t) {
                            e[t + "Line1"] = source.streetAddress, e[t + "Line2"] = source.extendedAddress, e[t + "Line3"] = source.line3, e[t + "City"] = source.locality, e[t + "State"] = source.region, e[t + "PostalCode"] = source.postalCode, e[t + "CountryCode"] = source.countryCodeAlpha2
                        }
                        P.prototype = Object.create(r.prototype, {
                            constructor: P
                        }), P.events = m(["LOOKUP_COMPLETE", "CUSTOMER_CANCELED", "UI.CLOSE", "UI.RENDER", "UI.RENDERHIDDEN", "UI.LOADING.CLOSE", "UI.LOADING.RENDER"], "songbird-framework:"), P.prototype.setUpEventListeners = function(e) {
                            this.on(P.events.LOOKUP_COMPLETE, (function(data, t) {
                                e("lookup-complete", data, t)
                            })), this.on(P.events.CUSTOMER_CANCELED, (function() {
                                e("customer-canceled")
                            })), this.on(P.events["UI.CLOSE"], (function() {
                                e("authentication-modal-close")
                            })), this.on(P.events["UI.RENDER"], (function() {
                                e("authentication-modal-render")
                            })), this.on(P.events["UI.RENDERHIDDEN"], (function() {
                                e("authentication-modal-render-hidden")
                            })), this.on(P.events["UI.LOADING.CLOSE"], (function() {
                                e("authentication-modal-loader-close")
                            })), this.on(P.events["UI.LOADING.RENDER"], (function() {
                                e("authentication-modal-loader-render")
                            }))
                        }, P.prototype.prepareLookup = function(e) {
                            var data = o({}, e),
                                t = this;
                            return this.getDfReferenceId().then((function(e) {
                                data.dfReferenceId = e
                            })).then((function() {
                                return t._triggerCardinalBinProcess(e.bin)
                            })).catch((function() {})).then((function() {
                                return t._waitForClient()
                            })).then((function() {
                                return data.clientMetadata = t._clientMetadata, data.authorizationFingerprint = t._client.getConfiguration().authorizationFingerprint, data.braintreeLibraryVersion = "braintree/web/" + N, data
                            }))
                        }, P.prototype.initializeChallengeWithLookupResponse = function(e, t) {
                            return this.setupSongbird().then(function() {
                                return r.prototype.initializeChallengeWithLookupResponse.call(this, e, t)
                            }.bind(this))
                        }, P.prototype.initiateV1Fallback = function(e) {
                            this._useV1Fallback = !0, this._removeSongbirdListeners(), _.sendEvent(this._createPromise, "three-d-secure.v1-fallback." + e), this._songbirdPromise && this._songbirdPromise.resolve()
                        }, P.prototype._triggerCardinalBinProcess = function(e) {
                            var t = this,
                                n = Date.now();
                            return e ? window.Cardinal.trigger("bin.process", e).then((function(e) {
                                t._clientMetadata.issuerDeviceDataCollectionTimeElapsed = Date.now() - n, t._clientMetadata.issuerDeviceDataCollectionResult = e && e.Status
                            })) : y.resolve()
                        }, P.prototype.transformBillingAddress = function(e, t) {
                            return t && (C(t, e, "billing"), e.billingPhoneNumber = t.phoneNumber, e.billingGivenName = t.givenName, e.billingSurname = t.surname), e
                        }, P.prototype.transformShippingAddress = function(e) {
                            var t = e.shippingAddress;
                            return t && (C(t, e, "shipping"), delete e.shippingAddress), e
                        }, P.prototype._createV1IframeModalElement = function(iframe) {
                            var e = document.createElement("div");
                            return e.innerHTML = '<div data-braintree-v1-fallback-iframe-container="true" style="height: 400px;"></div>', e.querySelector('[data-braintree-v1-fallback-iframe-container="true"]').appendChild(iframe), e
                        }, P.prototype._createV1IframeModal = function(iframe) {
                            var e = this._createV1IframeModalElement(iframe),
                                t = e.querySelector("[data-braintree-v1-fallback-close-button]"),
                                n = e.querySelector("[data-braintree-v1-fallback-backdrop]"),
                                r = this;

                            function o() {
                                e.parentNode.removeChild(e), r.cancelVerifyCard(h.THREEDS_CARDINAL_SDK_CANCELED), document.removeEventListener("keyup", r._onV1Keyup), r._onV1Keyup = null
                            }
                            return this._onV1Keyup = function(t) {
                                "Escape" === t.key && e.parentNode && o()
                            }, t && t.addEventListener("click", o), n && n.addEventListener("click", o), document.addEventListener("keyup", this._onV1Keyup), e
                        }, P.prototype._addV1IframeToPage = function() {
                            document.body.appendChild(this._v1Modal)
                        }, P.prototype._handleAuthResponseFromV1Fallback = function(data) {
                            this._teardownV1Elements(), this._v1Modal.parentNode.removeChild(this._v1Modal), this._handleV1AuthResponse(data)
                        }, P.prototype._presentChallengeWithV1Fallback = function(e) {
                            var t = this;
                            this._setupV1Elements({
                                lookupResponse: e,
                                showLoader: !0,
                                handleAuthResponse: function(data) {
                                    t._handleAuthResponseFromV1Fallback(data)
                                }
                            }), this._v1Modal = this._createV1IframeModal(this._v1Iframe), this._addV1IframeToPage()
                        }, P.prototype.setupSongbird = function(e) {
                            var t = this,
                                n = Date.now();
                            return this._songbirdPromise || (e = e || {}, this._songbirdPromise = new A, this._v2SetupFailureReason = "reason-unknown", t._loadCardinalScript(e).then((function() {
                                return window.Cardinal ? t._configureCardinalSdk({
                                    setupOptions: e,
                                    setupStartTime: n
                                }) : (t._v2SetupFailureReason = "cardinal-global-unavailable", y.reject(new d(h.THREEDS_CARDINAL_SDK_SETUP_FAILED)))
                            })).catch((function(e) {
                                var n = l(e, {
                                    type: h.THREEDS_CARDINAL_SDK_SETUP_FAILED.type,
                                    code: h.THREEDS_CARDINAL_SDK_SETUP_FAILED.code,
                                    message: h.THREEDS_CARDINAL_SDK_SETUP_FAILED.message
                                });
                                t._getDfReferenceIdPromisePlus.reject(n), window.clearTimeout(t._songbirdSetupTimeoutReference), _.sendEvent(t._client, "three-d-secure.cardinal-sdk.init.setup-failed"), t.initiateV1Fallback("cardinal-sdk-setup-failed." + t._v2SetupFailureReason)
                            }))), this._songbirdPromise
                        }, P.prototype._configureCardinalSdk = function(e) {
                            var t = this;
                            return this._waitForClient().then((function() {
                                return t._client.getConfiguration().gatewayConfiguration.threeDSecure
                            })).then((function(n) {
                                var r = n.cardinalAuthenticationJWT,
                                    o = e.setupOptions,
                                    c = e.setupStartTime,
                                    d = t._createCardinalConfigurationOptions(o);
                                v.forEach((function(e) {
                                    t.setCardinalListener(e, (function() {
                                        t._emit(P.events[e.toUpperCase()])
                                    }))
                                })), t.setCardinalListener("payments.setupComplete", t._createPaymentsSetupCompleteCallback()), t._setupFrameworkSpecificListeners(), window.Cardinal.configure(d), window.Cardinal.setup("init", {
                                    jwt: r
                                }), t._clientMetadata.cardinalDeviceDataCollectionTimeElapsed = Date.now() - c, t.setCardinalListener("payments.validated", t._createPaymentsValidatedCallback())
                            })).catch((function(e) {
                                return t._v2SetupFailureReason = "cardinal-configuration-threw-error", y.reject(e)
                            }))
                        }, P.prototype.setCardinalListener = function(e, t) {
                            this._cardinalEvents.push(e), window.Cardinal.on(e, t)
                        }, P.prototype._setupFrameworkSpecificListeners = function() {}, P.prototype._createCardinalConfigurationOptions = function(e) {
                            var t = e.cardinalSDKConfig || {},
                                n = t.payment || {};
                            return !t.logging && e.loggingEnabled && (t.logging = {
                                level: "verbose"
                            }), t.payment = {}, n.hasOwnProperty("displayLoading") && (t.payment.displayLoading = n.displayLoading), n.hasOwnProperty("displayExitButton") && (t.payment.displayExitButton = n.displayExitButton), t
                        }, P.prototype._loadCardinalScript = function(e) {
                            var t = this,
                                n = f.CARDINAL_SCRIPT_SOURCE.sandbox;
                            return this._waitForClient().then((function() {
                                var r = "production" === t._client.getConfiguration().gatewayConfiguration.environment;
                                return t._songbirdSetupTimeoutReference = window.setTimeout((function() {
                                    _.sendEvent(t._client, "three-d-secure.cardinal-sdk.init.setup-timeout"), t.initiateV1Fallback("cardinal-sdk-setup-timeout")
                                }), e.timeout || T), r && (n = f.CARDINAL_SCRIPT_SOURCE.production), E.loadScript({
                                    src: n
                                })
                            })).catch((function(e) {
                                return t._v2SetupFailureReason = "songbird-js-failed-to-load", y.reject(l(e, h.THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED))
                            }))
                        }, P.prototype._createPaymentsSetupCompleteCallback = function() {
                            var e = this;
                            return function(data) {
                                e._getDfReferenceIdPromisePlus.resolve(data.sessionId), window.clearTimeout(e._songbirdSetupTimeoutReference), _.sendEvent(e._createPromise, "three-d-secure.cardinal-sdk.init.setup-completed"), e._songbirdPromise.resolve()
                            }
                        }, P.prototype.getDfReferenceId = function() {
                            return this._getDfReferenceIdPromisePlus
                        }, P.prototype._performJWTValidation = function(e, t) {
                            var n = this,
                                r = this._lookupPaymentMethod.nonce,
                                o = "payment_methods/" + r + "/three_d_secure/authenticate_from_jwt",
                                c = e && e.Payment && e.Payment.ExtendedData && e.Payment.ExtendedData.ChallengeCancel;
                            return c && (_.sendEvent(this._createPromise, "three-d-secure.verification-flow.cardinal-sdk.cancel-code." + c), c === O && this._emit(P.events.CUSTOMER_CANCELED)), _.sendEvent(this._createPromise, "three-d-secure.verification-flow.upgrade-payment-method.started"), this._waitForClient().then((function() {
                                return n._client.request({
                                    method: "post",
                                    endpoint: o,
                                    data: {
                                        jwt: t,
                                        paymentMethodNonce: r
                                    }
                                })
                            })).then((function(t) {
                                var r = t.paymentMethod || n._lookupPaymentMethod,
                                    o = n._formatAuthResponse(r, t.threeDSecureInfo);
                                return o.rawCardinalSDKVerificationData = e, _.sendEvent(n._client, "three-d-secure.verification-flow.upgrade-payment-method.succeeded"), y.resolve(o)
                            })).catch((function(e) {
                                var t = new d({
                                    type: h.THREEDS_JWT_AUTHENTICATION_FAILED.type,
                                    code: h.THREEDS_JWT_AUTHENTICATION_FAILED.code,
                                    message: h.THREEDS_JWT_AUTHENTICATION_FAILED.message,
                                    details: {
                                        originalError: e
                                    }
                                });
                                return _.sendEvent(n._client, "three-d-secure.verification-flow.upgrade-payment-method.errored"), y.reject(t)
                            }))
                        }, P.prototype._createPaymentsValidatedCallback = function() {
                            var e = this;
                            return function(data, t) {
                                var n;
                                if (e._useV1Fallback) _.sendEvent(e._createPromise, "three-d-secure.verification-flow.cardinal-sdk.payments-validated-callback-called-in-v1-fallback-flow");
                                else if (_.sendEvent(e._createPromise, "three-d-secure.verification-flow.cardinal-sdk.action-code." + data.ActionCode.toLowerCase()), e._verifyCardPromisePlus) switch (data.ActionCode) {
                                    case "SUCCESS":
                                    case "NOACTION":
                                    case "FAILURE":
                                        e._performJWTValidation(data, t).then((function(t) {
                                            e._verifyCardPromisePlus.resolve(t)
                                        })).catch((function(t) {
                                            e._verifyCardPromisePlus.reject(t)
                                        }));
                                        break;
                                    case "ERROR":
                                        switch (_.sendEvent(e._createPromise, "three-d-secure.verification-flow.cardinal-sdk-error." + data.ErrorNumber), data.ErrorNumber) {
                                            case 10001:
                                            case 10002:
                                                n = new d(h.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT);
                                                break;
                                            case 10003:
                                            case 10007:
                                            case 10009:
                                                n = new d(h.THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT);
                                                break;
                                            case 10005:
                                            case 10006:
                                                n = new d(h.THREEDS_CARDINAL_SDK_BAD_CONFIG);
                                                break;
                                            case 10008:
                                            case 10010:
                                                n = new d(h.THREEDS_CARDINAL_SDK_BAD_JWT);
                                                break;
                                            case 10011:
                                                _.sendEvent(e._createPromise, "three-d-secure.verification-flow.canceled"), n = new d(h.THREEDS_CARDINAL_SDK_CANCELED);
                                                break;
                                            default:
                                                n = new d(h.THREEDS_CARDINAL_SDK_ERROR)
                                        }
                                        n.details = {
                                            originalError: {
                                                code: data.ErrorNumber,
                                                description: data.ErrorDescription
                                            }
                                        }, e._verifyCardPromisePlus.reject(n)
                                } else e.initiateV1Fallback("cardinal-sdk-setup-error.number-" + data.ErrorNumber)
                            }
                        }, P.prototype._checkForVerifyCardError = function(e, t) {
                            return r.prototype._checkForVerifyCardError.call(this, e, t)
                        }, P.prototype._checkForFrameworkSpecificVerifyCardErrors = function(e, t) {
                            var n;
                            return "function" == typeof e.onLookupComplete || t.ignoreOnLookupCompleteRequirement || (n = "an onLookupComplete function"), n
                        }, P.prototype._formatVerifyCardOptions = function(e) {
                            var t = r.prototype._formatVerifyCardOptions.call(this, e),
                                n = t.additionalInformation || {};
                            return n = this.transformBillingAddress(n, e.billingAddress), n = this.transformShippingAddress(n), e.onLookupComplete && (t.onLookupComplete = c(e.onLookupComplete)), e.email && (n.email = e.email), e.mobilePhoneNumber && (n.mobilePhoneNumber = e.mobilePhoneNumber), t.additionalInformation = n, t
                        }, P.prototype._onLookupComplete = function(e, t) {
                            var n = this;
                            return r.prototype._onLookupComplete.call(this, e).then((function(e) {
                                return new y((function(r, o) {
                                    function c() {
                                        r(e)
                                    }
                                    e.requiresUserAuthentication = Boolean(e.lookup && e.lookup.acsUrl), n._verifyCardPromisePlus.catch(o), t.onLookupComplete ? t.onLookupComplete(e, c) : n._emit(P.events.LOOKUP_COMPLETE, e, c)
                                }))
                            }))
                        }, P.prototype._presentChallenge = function(e) {
                            !this._useV1Fallback && e.lookup.transactionId ? window.Cardinal.continue("cca", {
                                AcsUrl: e.lookup.acsUrl,
                                Payload: e.lookup.pareq
                            }, {
                                OrderDetails: {
                                    TransactionId: e.lookup.transactionId
                                }
                            }) : this._presentChallengeWithV1Fallback(e.lookup)
                        }, P.prototype._formatLookupData = function(e) {
                            var t = this;
                            return r.prototype._formatLookupData.call(this, e).then((function(data) {
                                return data.additionalInfo = e.additionalInformation, e.accountType && (data.accountType = e.accountType), e.challengeRequested && (data.challengeRequested = e.challengeRequested), e.dataOnlyRequested && (data.dataOnlyRequested = e.dataOnlyRequested), e.exemptionRequested && (data.exemptionRequested = e.exemptionRequested), e.bin && (data.bin = e.bin), null != e.cardAdd && (data.cardAdd = e.cardAdd), null != e.cardAddChallengeRequested && (data.cardAdd = e.cardAddChallengeRequested), t.prepareLookup(data)
                            }))
                        }, P.prototype.cancelVerifyCard = function(e) {
                            var t = this;
                            return r.prototype.cancelVerifyCard.call(this).then((function(n) {
                                return t._verifyCardPromisePlus && (e = e || new d(h.THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT), t._verifyCardPromisePlus.reject(e)), n
                            }))
                        }, P.prototype._removeSongbirdListeners = function() {
                            this._cardinalEvents.forEach((function(e) {
                                window.Cardinal.off(e)
                            })), this._cardinalEvents = []
                        }, P.prototype.teardown = function() {
                            return window.Cardinal && this._removeSongbirdListeners(), r.prototype.teardown.call(this)
                        }, t.exports = P
                    }, {
                        "../../../lib/analytics": 126,
                        "../../../lib/assets": 127,
                        "../../../lib/assign": 128,
                        "../../../lib/braintree-error": 131,
                        "../../../lib/constants": 133,
                        "../../../lib/convert-to-braintree-error": 135,
                        "../../../lib/deferred": 139,
                        "../../../lib/enumerate": 141,
                        "../../../lib/promise": 164,
                        "../../shared/constants": 200,
                        "../../shared/errors": 201,
                        "./base": 191,
                        "@braintree/extended-promise": 40
                    }],
                    198: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/wrap-promise"),
                            o = e("../../lib/methods"),
                            c = e("../../lib/convert-methods-to-error"),
                            d = e("@braintree/event-emitter"),
                            l = e("./frameworks");

                        function _(e) {
                            var t = this,
                                n = l[e.framework];
                            d.call(this), this._framework = new n(e), this._framework.setUpEventListeners((function() {
                                t._emit.apply(t, arguments)
                            }))
                        }
                        d.createChild(_), _.prototype.verifyCard = function(e) {
                            var t;
                            return this.hasListener("lookup-complete") && (t = {
                                ignoreOnLookupCompleteRequirement: !0
                            }), this._framework.verifyCard(e, t)
                        }, _.prototype.initializeChallengeWithLookupResponse = function(e) {
                            return "string" == typeof e && (e = JSON.parse(e)), this._framework.initializeChallengeWithLookupResponse(e)
                        }, _.prototype.prepareLookup = function(e) {
                            return this._framework.prepareLookup(e).then((function(data) {
                                return JSON.stringify(data)
                            }))
                        }, _.prototype.cancelVerifyCard = function() {
                            return this._framework.cancelVerifyCard()
                        }, _.prototype.teardown = function() {
                            var e = o(_.prototype).concat(o(d.prototype));
                            return c(this, e), this._framework.teardown()
                        }, t.exports = r.wrapPrototype(_)
                    }, {
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/methods": 162,
                        "./frameworks": 194,
                        "@braintree/event-emitter": 39,
                        "@braintree/wrap-promise": 49
                    }],
                    199: [function(e, t, n) {
                        "use strict";
                        var r = e("./external/three-d-secure"),
                            o = e("../lib/is-https").isHTTPS,
                            c = e("../lib/basic-component-verification"),
                            d = e("../lib/create-deferred-client"),
                            l = e("../lib/create-assets-url"),
                            _ = e("../lib/braintree-error"),
                            E = e("../lib/analytics"),
                            h = e("./shared/errors"),
                            m = "3.85.3",
                            f = e("../lib/promise"),
                            y = e("@braintree/wrap-promise");

                        function A(e) {
                            var t = "3D Secure";
                            return c.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                var n = l.create(e.authorization),
                                    c = T(e),
                                    m = d.create({
                                        authorization: e.authorization,
                                        client: e.client,
                                        debug: e.debug,
                                        assetsUrl: n,
                                        name: t
                                    }).then((function(t) {
                                        var n, r = t.getConfiguration(),
                                            d = r.gatewayConfiguration;
                                        return e.client = t, d.threeDSecureEnabled || (n = h.THREEDS_NOT_ENABLED), "TOKENIZATION_KEY" === r.authorizationType && (n = h.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY), "production" === d.environment && !o() && (n = h.THREEDS_HTTPS_REQUIRED), "legacy" === c || d.threeDSecure && d.threeDSecure.cardinalAuthenticationJWT || (E.sendEvent(e.client, "three-d-secure.initialization.failed.missing-cardinalAuthenticationJWT"), n = h.THREEDS_NOT_ENABLED_FOR_V2), n ? f.reject(new _(n)) : (E.sendEvent(e.client, "three-d-secure.initialized"), t)
                                    })),
                                    y = new r({
                                        client: e.client,
                                        assetsUrl: n,
                                        createPromise: m,
                                        loggingEnabled: e.loggingEnabled,
                                        cardinalSDKConfig: e.cardinalSDKConfig,
                                        framework: c
                                    });
                                return e.client ? m.then((function() {
                                    return y
                                })) : y
                            }))
                        }

                        function T(e) {
                            var t = String(e.version || "");
                            if (!t || "1" === t) return "legacy";
                            switch (t) {
                                case "2":
                                case "2-cardinal-modal":
                                    return "cardinal-modal";
                                case "2-bootstrap3-modal":
                                    return "bootstrap3-modal";
                                case "2-inline-iframe":
                                    return "inline-iframe";
                                default:
                                    throw new _({
                                        code: h.THREEDS_UNRECOGNIZED_VERSION.code,
                                        type: h.THREEDS_UNRECOGNIZED_VERSION.type,
                                        message: "Version `" + e.version + "` is not a recognized version. You may need to update the version of your Braintree SDK to support this version."
                                    })
                            }
                        }
                        t.exports = {
                            create: y(A),
                            VERSION: m
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/is-https": 159,
                        "../lib/promise": 164,
                        "./external/three-d-secure": 198,
                        "./shared/errors": 201,
                        "@braintree/wrap-promise": 49
                    }],
                    200: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            LANDING_FRAME_NAME: "braintreethreedsecurelanding",
                            CARDINAL_SCRIPT_SOURCE: {
                                production: "https://songbird.cardinalcommerce.com/edge/v1/songbird.js",
                                sandbox: "https://songbirdstag.cardinalcommerce.com/edge/v1/songbird.js"
                            }
                        }
                    }, {}],
                    201: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            THREEDS_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_NOT_ENABLED",
                                message: "3D Secure is not enabled for this merchant."
                            },
                            THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_CAN_NOT_USE_TOKENIZATION_KEY",
                                message: "3D Secure can not use a tokenization key for authorization."
                            },
                            THREEDS_HTTPS_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_HTTPS_REQUIRED",
                                message: "3D Secure requires HTTPS."
                            },
                            THREEDS_NOT_ENABLED_FOR_V2: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_NOT_ENABLED_FOR_V2",
                                message: "3D Secure version 2 is not enabled for this merchant. Contact Braintree Support for assistance at https://help.braintreepayments.com/"
                            },
                            THREEDS_UNRECOGNIZED_VERSION: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_UNRECOGNIZED_VERSION"
                            },
                            THREEDS_CARDINAL_SDK_SETUP_FAILED: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_CARDINAL_SDK_SETUP_FAILED",
                                message: "Something went wrong setting up Cardinal's Songbird.js library."
                            },
                            THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED: {
                                type: r.types.NETWORK,
                                code: "THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED",
                                message: "Cardinal's Songbird.js library could not be loaded."
                            },
                            THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT",
                                message: "Cardinal's Songbird.js took too long to setup."
                            },
                            THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT",
                                message: "Cardinal's API took too long to respond."
                            },
                            THREEDS_CARDINAL_SDK_BAD_CONFIG: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_CARDINAL_SDK_BAD_CONFIG",
                                message: "JWT or other required field missing. Please check your setup configuration."
                            },
                            THREEDS_CARDINAL_SDK_BAD_JWT: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_CARDINAL_SDK_BAD_JWT",
                                message: "Cardinal JWT missing or malformed. Please check your setup configuration."
                            },
                            THREEDS_CARDINAL_SDK_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_CARDINAL_SDK_ERROR",
                                message: "A general error has occurred with Cardinal. See description for more information."
                            },
                            THREEDS_CARDINAL_SDK_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "THREEDS_CARDINAL_SDK_CANCELED",
                                message: "Canceled by user."
                            },
                            THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT",
                                message: "3D Secure verfication canceled by merchant."
                            },
                            THREEDS_AUTHENTICATION_IN_PROGRESS: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_AUTHENTICATION_IN_PROGRESS",
                                message: "Cannot call verifyCard while existing authentication is in progress."
                            },
                            THREEDS_MISSING_VERIFY_CARD_OPTION: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_MISSING_VERIFY_CARD_OPTION"
                            },
                            THREEDS_JWT_AUTHENTICATION_FAILED: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_JWT_AUTHENTICATION_FAILED",
                                message: "Something went wrong authenticating the JWT from Cardinal"
                            },
                            THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR",
                                message: "Either the payment method nonce passed to `verifyCard` does not exist, or it was already consumed"
                            },
                            THREEDS_LOOKUP_VALIDATION_ERROR: {
                                type: r.types.CUSTOMER,
                                code: "THREEDS_LOOKUP_VALIDATION_ERROR",
                                message: "The data passed in `verifyCard` did not pass validation checks. See details for more info"
                            },
                            THREEDS_LOOKUP_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_LOOKUP_ERROR",
                                message: "Something went wrong during the 3D Secure lookup"
                            },
                            THREEDS_INLINE_IFRAME_DETAILS_INCORRECT: {
                                type: r.types.UNKNOWN,
                                code: "THREEDS_INLINE_IFRAME_DETAILS_INCORRECT",
                                message: "Something went wrong when attempting to add the authentication iframe to the page."
                            },
                            THREEDS_NO_VERIFICATION_PAYLOAD: {
                                type: r.types.MERCHANT,
                                code: "THREEDS_NO_VERIFICATION_PAYLOAD",
                                message: "No verification payload available."
                            },
                            THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
                                type: r.types.INTERNAL,
                                code: "THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN",
                                message: "Term Url must be on a Braintree domain."
                            },
                            THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED: {
                                type: r.types.INTERNAL,
                                code: "THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED",
                                message: "Method not implemented for this framework."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    202: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/enumerate");
                        t.exports = r(["AUTHENTICATION_COMPLETE"], "threedsecure:")
                    }, {
                        "../../lib/enumerate": 141
                    }],
                    203: [function(e, t, n) {
                        "use strict";
                        var r = e("./shared/unionpay"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/braintree-error"),
                            d = e("../lib/create-deferred-client"),
                            l = e("../lib/create-assets-url"),
                            _ = e("../lib/analytics"),
                            E = e("./shared/errors"),
                            h = "3.85.3",
                            m = e("../lib/promise"),
                            f = e("@braintree/wrap-promise");

                        function y(e) {
                            var t = "UnionPay";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return d.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: l.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                var n = t.getConfiguration();
                                return e.client = t, n.gatewayConfiguration.unionPay && !0 === n.gatewayConfiguration.unionPay.enabled ? (_.sendEvent(e.client, "unionpay.initialized"), new r(e)) : m.reject(new c(E.UNIONPAY_NOT_ENABLED))
                            }))
                        }
                        t.exports = {
                            create: f(y),
                            VERSION: h
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./shared/errors": 205,
                        "./shared/unionpay": 206,
                        "@braintree/wrap-promise": 49
                    }],
                    204: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/enumerate");
                        t.exports = {
                            events: r(["HOSTED_FIELDS_FETCH_CAPABILITIES", "HOSTED_FIELDS_ENROLL", "HOSTED_FIELDS_TOKENIZE"], "union-pay:"),
                            HOSTED_FIELDS_FRAME_NAME: "braintreeunionpayhostedfields"
                        }
                    }, {
                        "../../lib/enumerate": 141
                    }],
                    205: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            UNIONPAY_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_NOT_ENABLED",
                                message: "UnionPay is not enabled for this merchant."
                            },
                            UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID",
                                message: "Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance."
                            },
                            UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED",
                                message: "Could not find the Hosted Fields instance."
                            },
                            UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED",
                                message: "A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance."
                            },
                            UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES",
                                message: "Please supply either a card or a Hosted Fields instance, not both."
                            },
                            UNIONPAY_EXPIRATION_DATE_INCOMPLETE: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_EXPIRATION_DATE_INCOMPLETE",
                                message: "You must supply expiration month and year or neither."
                            },
                            UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID: {
                                type: r.types.CUSTOMER,
                                code: "UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID",
                                message: "Enrollment failed due to user input error."
                            },
                            UNIONPAY_ENROLLMENT_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "UNIONPAY_ENROLLMENT_NETWORK_ERROR",
                                message: "Could not enroll UnionPay card."
                            },
                            UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR",
                                message: "Could not fetch card capabilities."
                            },
                            UNIONPAY_TOKENIZATION_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "UNIONPAY_TOKENIZATION_NETWORK_ERROR",
                                message: "A tokenization network error occurred."
                            },
                            UNIONPAY_MISSING_MOBILE_PHONE_DATA: {
                                type: r.types.MERCHANT,
                                code: "UNIONPAY_MISSING_MOBILE_PHONE_DATA",
                                message: "A `mobile` with `countryCode` and `number` is required."
                            },
                            UNIONPAY_FAILED_TOKENIZATION: {
                                type: r.types.CUSTOMER,
                                code: "UNIONPAY_FAILED_TOKENIZATION",
                                message: "The supplied card data failed tokenization."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    206: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/analytics"),
                            o = e("../../lib/braintree-error"),
                            c = e("framebus"),
                            d = e("./constants"),
                            l = e("../../lib/is-verified-domain"),
                            _ = e("../../lib/use-min"),
                            E = e("../../lib/convert-methods-to-error"),
                            h = e("./errors"),
                            m = d.events,
                            f = e("@braintree/iframer"),
                            y = e("../../lib/methods"),
                            A = "3.85.3",
                            T = e("@braintree/uuid"),
                            I = e("../../lib/promise"),
                            N = e("@braintree/wrap-promise"),
                            O = e("../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT;

                        function v(e) {
                            this._options = e
                        }
                        v.prototype.fetchCapabilities = function(e) {
                            var t = this,
                                n = this._options.client,
                                c = e.card ? e.card.number : null,
                                d = e.hostedFields;
                            return c && d ? I.reject(new o(h.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)) : c ? n.request({
                                method: "get",
                                endpoint: "payment_methods/credit_cards/capabilities",
                                data: {
                                    _meta: {
                                        source: "unionpay"
                                    },
                                    creditCard: {
                                        number: c
                                    }
                                }
                            }).then((function(e) {
                                return r.sendEvent(n, "unionpay.capabilities-received"), e
                            })).catch((function(e) {
                                var t = e.details && e.details.httpStatus;
                                return r.sendEvent(n, "unionpay.capabilities-failed"), 403 === t ? I.reject(e) : I.reject(new o({
                                    type: h.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,
                                    code: h.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,
                                    message: h.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })) : d ? d._bus ? t._initializeHostedFields().then((function() {
                                return new I((function(e, n) {
                                    t._bus.emit(m.HOSTED_FIELDS_FETCH_CAPABILITIES, {
                                        hostedFields: d
                                    }, (function(t) {
                                        t.err ? n(new o(t.err)) : e(t.payload)
                                    }))
                                }))
                            })) : I.reject(new o(h.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)) : I.reject(new o(h.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))
                        }, v.prototype.enroll = function(e) {
                            var data, t = this,
                                n = this._options.client,
                                c = e.card,
                                d = e.mobile,
                                l = e.hostedFields;
                            if (!d) return I.reject(new o(h.UNIONPAY_MISSING_MOBILE_PHONE_DATA));
                            if (l) return l._bus ? c ? I.reject(new o(h.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)) : new I((function(e, n) {
                                t._initializeHostedFields().then((function() {
                                    t._bus.emit(m.HOSTED_FIELDS_ENROLL, {
                                        hostedFields: l,
                                        mobile: d
                                    }, (function(t) {
                                        t.err ? n(new o(t.err)) : e(t.payload)
                                    }))
                                }))
                            })) : I.reject(new o(h.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID));
                            if (c && c.number) {
                                if (data = {
                                        _meta: {
                                            source: "unionpay"
                                        },
                                        unionPayEnrollment: {
                                            number: c.number,
                                            mobileCountryCode: d.countryCode,
                                            mobileNumber: d.number
                                        }
                                    }, c.expirationDate) data.unionPayEnrollment.expirationDate = c.expirationDate;
                                else if (c.expirationMonth || c.expirationYear) {
                                    if (!c.expirationMonth || !c.expirationYear) return I.reject(new o(h.UNIONPAY_EXPIRATION_DATE_INCOMPLETE));
                                    data.unionPayEnrollment.expirationYear = c.expirationYear, data.unionPayEnrollment.expirationMonth = c.expirationMonth
                                }
                                return n.request({
                                    method: "post",
                                    endpoint: "union_pay_enrollments",
                                    data: data
                                }).then((function(e) {
                                    return r.sendEvent(n, "unionpay.enrollment-succeeded"), {
                                        enrollmentId: e.unionPayEnrollmentId,
                                        smsCodeRequired: e.smsCodeRequired
                                    }
                                })).catch((function(e) {
                                    var t, c = e.details && e.details.httpStatus;
                                    return 403 === c ? t = e : c < 500 ? (t = new o(h.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID)).details = {
                                        originalError: e
                                    } : (t = new o(h.UNIONPAY_ENROLLMENT_NETWORK_ERROR)).details = {
                                        originalError: e
                                    }, r.sendEvent(n, "unionpay.enrollment-failed"), I.reject(t)
                                }))
                            }
                            return I.reject(new o(h.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))
                        }, v.prototype.tokenize = function(e) {
                            var data, t = this,
                                n = this._options.client,
                                c = e.card,
                                d = e.hostedFields;
                            return c && d ? I.reject(new o(h.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)) : c ? (data = {
                                _meta: {
                                    source: "unionpay"
                                },
                                creditCard: {
                                    number: e.card.number,
                                    options: {
                                        unionPayEnrollment: {
                                            id: e.enrollmentId
                                        }
                                    }
                                }
                            }, e.smsCode && (data.creditCard.options.unionPayEnrollment.smsCode = e.smsCode), c.expirationDate ? data.creditCard.expirationDate = c.expirationDate : c.expirationMonth && c.expirationYear && (data.creditCard.expirationYear = c.expirationYear, data.creditCard.expirationMonth = c.expirationMonth), e.card.cvv && (data.creditCard.cvv = e.card.cvv), n.request({
                                method: "post",
                                endpoint: "payment_methods/credit_cards",
                                data: data
                            }).then((function(e) {
                                var t = e.creditCards[0];
                                return delete t.consumed, delete t.threeDSecureInfo, r.sendEvent(n, "unionpay.nonce-received"), t
                            })).catch((function(e) {
                                var t, c = e.details && e.details.httpStatus;
                                return r.sendEvent(n, "unionpay.nonce-failed"), 403 === c ? t = e : c < 500 ? (t = new o(h.UNIONPAY_FAILED_TOKENIZATION)).details = {
                                    originalError: e
                                } : (t = new o(h.UNIONPAY_TOKENIZATION_NETWORK_ERROR)).details = {
                                    originalError: e
                                }, I.reject(t)
                            }))) : d ? d._bus ? new I((function(n, r) {
                                t._initializeHostedFields().then((function() {
                                    t._bus.emit(m.HOSTED_FIELDS_TOKENIZE, e, (function(e) {
                                        e.err ? r(new o(e.err)) : n(e.payload)
                                    }))
                                }))
                            })) : I.reject(new o(h.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)) : I.reject(new o(h.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED))
                        }, v.prototype.teardown = function() {
                            return this._bus && (this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame), this._bus.teardown()), E(this, y(v.prototype)), I.resolve()
                        }, v.prototype._initializeHostedFields = function() {
                            var e, t, n = T(),
                                r = this;
                            return this._hostedFieldsInitializePromise || (this._hostedFieldsInitializePromise = new I((function(o) {
                                e = r._options.client.getConfiguration().gatewayConfiguration.assetsUrl, t = r._options.client.getConfiguration().isDebug, r._bus = new c({
                                    channel: n,
                                    verifyDomain: l
                                }), r._hostedFieldsFrame = f({
                                    name: d.HOSTED_FIELDS_FRAME_NAME + "_" + n,
                                    src: e + "/web/" + A + "/html/unionpay-hosted-fields-frame" + _(t) + ".html",
                                    height: 0,
                                    width: 0
                                }), r._bus.on(O, (function(e) {
                                    e(r._options.client), o()
                                })), document.body.appendChild(r._hostedFieldsFrame)
                            }))), this._hostedFieldsInitializePromise
                        }, t.exports = N.wrapPrototype(v)
                    }, {
                        "../../lib/analytics": 126,
                        "../../lib/braintree-error": 131,
                        "../../lib/constants": 133,
                        "../../lib/convert-methods-to-error": 134,
                        "../../lib/is-verified-domain": 160,
                        "../../lib/methods": 162,
                        "../../lib/promise": 164,
                        "../../lib/use-min": 167,
                        "./constants": 204,
                        "./errors": 205,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        "@braintree/wrap-promise": 49,
                        framebus: 58
                    }],
                    207: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            PLAID_LINK_JS: "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
                        }
                    }, {}],
                    208: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            US_BANK_ACCOUNT_OPTION_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "US_BANK_ACCOUNT_OPTION_REQUIRED"
                            },
                            US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS: {
                                type: r.types.MERCHANT,
                                code: "US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS"
                            },
                            US_BANK_ACCOUNT_LOGIN_LOAD_FAILED: {
                                type: r.types.NETWORK,
                                code: "US_BANK_ACCOUNT_LOGIN_LOAD_FAILED",
                                message: "Bank login flow failed to load."
                            },
                            US_BANK_ACCOUNT_LOGIN_CLOSED: {
                                type: r.types.CUSTOMER,
                                code: "US_BANK_ACCOUNT_LOGIN_CLOSED",
                                message: "Customer closed bank login flow before authorizing."
                            },
                            US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE: {
                                type: r.types.MERCHANT,
                                code: "US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE",
                                message: "Another bank login tokenization request is active."
                            },
                            US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR: {
                                type: r.types.NETWORK,
                                code: "US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR",
                                message: "A tokenization network error occurred."
                            },
                            US_BANK_ACCOUNT_FAILED_TOKENIZATION: {
                                type: r.types.CUSTOMER,
                                code: "US_BANK_ACCOUNT_FAILED_TOKENIZATION",
                                message: "The supplied data failed tokenization."
                            },
                            US_BANK_ACCOUNT_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "US_BANK_ACCOUNT_NOT_ENABLED",
                                message: "US bank account is not enabled."
                            },
                            US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED",
                                message: "Bank login is not enabled."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    209: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/basic-component-verification"),
                            o = e("../lib/braintree-error"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("./errors"),
                            _ = e("./us-bank-account"),
                            E = "3.85.3",
                            h = e("../lib/promise"),
                            m = e("@braintree/wrap-promise");

                        function f(e) {
                            var t = "US Bank Account";
                            return r.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                return e.client = t, e.client.getConfiguration().gatewayConfiguration.usBankAccount ? new _(e) : h.reject(new o(l.US_BANK_ACCOUNT_NOT_ENABLED))
                            }))
                        }
                        t.exports = {
                            create: m(f),
                            VERSION: E
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./errors": 208,
                        "./us-bank-account": 210,
                        "@braintree/wrap-promise": 49
                    }],
                    210: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("./constants"),
                            c = e("./errors"),
                            d = e("../lib/errors"),
                            l = e("../lib/analytics"),
                            _ = e("../lib/once"),
                            E = e("../lib/convert-methods-to-error"),
                            h = e("../lib/methods"),
                            m = e("../lib/promise"),
                            f = e("@braintree/wrap-promise"),
                            y = C("UsBankAccount"),
                            A = C("UsBankLogin");

                        function T(e) {
                            this._client = e.client, this._isTokenizingBankLogin = !1, l.sendEvent(this._client, "usbankaccount.initialized")
                        }

                        function I(e) {
                            var t, n = e.details && e.details.httpStatus;
                            return (t = new r(401 === n ? d.BRAINTREE_API_ACCESS_RESTRICTED : n < 500 ? c.US_BANK_ACCOUNT_FAILED_TOKENIZATION : c.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR)).details = {
                                originalError: e
                            }, t
                        }

                        function N(e, t) {
                            var data = e.data[t].paymentMethod,
                                n = "US bank account ending in - " + data.details.last4;
                            return {
                                nonce: data.id,
                                details: {},
                                description: n,
                                type: "us_bank_account"
                            }
                        }

                        function O(script, e) {
                            function t() {
                                var t = this.readyState;
                                t && "loaded" !== t && "complete" !== t || (o(), e(null, window.Plaid))
                            }

                            function n() {
                                script.parentNode.removeChild(script), e(new r(c.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED))
                            }

                            function o() {
                                script.removeEventListener("error", n), script.removeEventListener("load", t), script.removeEventListener("readystatechange", t)
                            }
                            script.addEventListener("error", n), script.addEventListener("load", t), script.addEventListener("readystatechange", t)
                        }

                        function v(address) {
                            return {
                                streetAddress: address.streetAddress,
                                extendedAddress: address.extendedAddress,
                                city: address.locality,
                                state: address.region,
                                zipCode: address.postalCode
                            }
                        }

                        function P(data, details) {
                            "personal" === details.ownershipType ? data.individualOwner = {
                                firstName: details.firstName,
                                lastName: details.lastName
                            } : "business" === details.ownershipType && (data.businessOwner = {
                                businessName: details.businessName
                            })
                        }

                        function C(e) {
                            return "mutation Tokenize" + e + "($input: Tokenize" + e + "Input!) {  tokenize" + e + "(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}"
                        }
                        T.prototype.tokenize = function(e) {
                            return (e = e || {}).mandateText ? e.bankDetails && e.bankLogin ? m.reject(new r({
                                type: c.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,
                                code: c.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,
                                message: "tokenize must be called with bankDetails or bankLogin, not both."
                            })) : e.bankDetails ? this._tokenizeBankDetails(e) : e.bankLogin ? this._tokenizeBankLogin(e) : m.reject(new r({
                                type: c.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                                code: c.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                                message: "tokenize must be called with bankDetails or bankLogin."
                            })) : m.reject(new r({
                                type: c.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                                code: c.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                                message: "mandateText property is required."
                            }))
                        }, T.prototype._tokenizeBankDetails = function(e) {
                            var t = this._client,
                                n = e.bankDetails,
                                data = {
                                    achMandate: e.mandateText,
                                    routingNumber: n.routingNumber,
                                    accountNumber: n.accountNumber,
                                    accountType: n.accountType.toUpperCase(),
                                    billingAddress: v(n.billingAddress || {})
                                };
                            return P(data, n), t.request({
                                api: "graphQLApi",
                                data: {
                                    query: y,
                                    variables: {
                                        input: {
                                            usBankAccount: data
                                        }
                                    }
                                }
                            }).then((function(e) {
                                return l.sendEvent(t, "usbankaccount.bankdetails.tokenization.succeeded"), m.resolve(N(e, "tokenizeUsBankAccount"))
                            })).catch((function(e) {
                                var n = I(e);
                                return l.sendEvent(t, "usbankaccount.bankdetails.tokenization.failed"), m.reject(n)
                            }))
                        }, T.prototype._tokenizeBankLogin = function(e) {
                            var t = this,
                                n = this._client,
                                o = n.getConfiguration().gatewayConfiguration,
                                d = "production" === o.environment,
                                _ = o.usBankAccount.plaid;
                            return e.bankLogin.displayName ? _ ? this._isTokenizingBankLogin ? m.reject(new r(c.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE)) : (this._isTokenizingBankLogin = !0, new m((function(o, E) {
                                t._loadPlaid((function(h, m) {
                                    h ? E(h) : (m.create({
                                        clientName: e.bankLogin.displayName,
                                        apiVersion: "v2",
                                        env: d ? "production" : "sandbox",
                                        key: _.publicKey,
                                        product: "auth",
                                        selectAccount: !0,
                                        onExit: function() {
                                            t._isTokenizingBankLogin = !1, l.sendEvent(n, "usbankaccount.banklogin.tokenization.closed.by-user"), E(new r(c.US_BANK_ACCOUNT_LOGIN_CLOSED))
                                        },
                                        onSuccess: function(r, c) {
                                            var _ = e.bankLogin,
                                                data = {
                                                    publicToken: r,
                                                    accountId: d ? c.account_id : "plaid_account_id",
                                                    accountType: c.account.subtype.toUpperCase(),
                                                    achMandate: e.mandateText,
                                                    billingAddress: v(_.billingAddress || {})
                                                };
                                            P(data, _), n.request({
                                                api: "graphQLApi",
                                                data: {
                                                    query: A,
                                                    variables: {
                                                        input: {
                                                            usBankLogin: data
                                                        }
                                                    }
                                                }
                                            }).then((function(e) {
                                                t._isTokenizingBankLogin = !1, l.sendEvent(n, "usbankaccount.banklogin.tokenization.succeeded"), o(N(e, "tokenizeUsBankLogin"))
                                            })).catch((function(e) {
                                                var r;
                                                t._isTokenizingBankLogin = !1, r = I(e), l.sendEvent(n, "usbankaccount.banklogin.tokenization.failed"), E(r)
                                            }))
                                        }
                                    }).open(), l.sendEvent(n, "usbankaccount.banklogin.tokenization.started"))
                                }))
                            }))) : m.reject(new r(c.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED)) : m.reject(new r({
                                type: c.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                                code: c.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                                message: "displayName property is required when using bankLogin."
                            }))
                        }, T.prototype._loadPlaid = function(e) {
                            var t, script;
                            e = _(e), window.Plaid ? e(null, window.Plaid) : (t = document.querySelector('script[src="' + o.PLAID_LINK_JS + '"]')) ? O(t, e) : ((script = document.createElement("script")).src = o.PLAID_LINK_JS, script.async = !0, O(script, e), document.body.appendChild(script), this._plaidScript = script)
                        }, T.prototype.teardown = function() {
                            return this._plaidScript && document.body.removeChild(this._plaidScript), E(this, h(T.prototype)), m.resolve()
                        }, t.exports = f.wrapPrototype(T)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/errors": 142,
                        "../lib/methods": 162,
                        "../lib/once": 163,
                        "../lib/promise": 164,
                        "./constants": 207,
                        "./errors": 208,
                        "@braintree/wrap-promise": 49
                    }],
                    211: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN: {
                                type: r.types.MERCHANT,
                                code: "VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN",
                                message: "A client token with a customer id must be used to delete a payment method nonce."
                            },
                            VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND: {
                                type: r.types.MERCHANT,
                                code: "VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND"
                            },
                            VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR"
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    212: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/basic-component-verification"),
                            o = e("../lib/create-deferred-client"),
                            c = e("../lib/create-assets-url"),
                            d = e("./vault-manager"),
                            l = "3.85.3",
                            _ = e("@braintree/wrap-promise");

                        function E(e) {
                            var t = "Vault Manager";
                            return r.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return new d({
                                    createPromise: o.create({
                                        authorization: e.authorization,
                                        client: e.client,
                                        debug: e.debug,
                                        assetsUrl: c.create(e.authorization),
                                        name: t
                                    })
                                })
                            }))
                        }
                        t.exports = {
                            create: _(E),
                            VERSION: l
                        }
                    }, {
                        "../lib/basic-component-verification": 129,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "./vault-manager": 213,
                        "@braintree/wrap-promise": 49
                    }],
                    213: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/braintree-error"),
                            c = e("./errors"),
                            d = e("../lib/convert-methods-to-error"),
                            l = e("../lib/methods"),
                            _ = e("../lib/promise"),
                            E = e("@braintree/wrap-promise"),
                            h = "mutation DeletePaymentMethodFromSingleUseToken($input: DeletePaymentMethodFromSingleUseTokenInput!) {  deletePaymentMethodFromSingleUseToken(input: $input) {    clientMutationId  }}";

                        function m(e) {
                            this._createPromise = e.createPromise
                        }

                        function f(e) {
                            var t = {
                                nonce: e.nonce,
                                default: e.default,
                                details: e.details,
                                hasSubscription: e.hasSubscription,
                                type: e.type
                            };
                            return e.description && (t.description = e.description), e.binData && (t.binData = e.binData), t
                        }
                        m.prototype.fetchPaymentMethods = function(e) {
                            var t;
                            return t = !0 === (e = e || {}).defaultFirst ? 1 : 0, this._createPromise.then((function(e) {
                                return e.request({
                                    endpoint: "payment_methods",
                                    method: "get",
                                    data: {
                                        defaultFirst: t
                                    }
                                })
                            })).then(function(e) {
                                return r.sendEvent(this._createPromise, "vault-manager.fetch-payment-methods.succeeded"), e.paymentMethods.map(f)
                            }.bind(this))
                        }, m.prototype.deletePaymentMethod = function(e) {
                            return this._createPromise.then((function(t) {
                                return "CLIENT_TOKEN" === t.getConfiguration().authorizationType ? t.request({
                                    api: "graphQLApi",
                                    data: {
                                        query: h,
                                        variables: {
                                            input: {
                                                singleUseTokenId: e
                                            }
                                        },
                                        operationName: "DeletePaymentMethodFromSingleUseToken"
                                    }
                                }).then((function() {
                                    r.sendEvent(t, "vault-manager.delete-payment-method.succeeded")
                                })).catch((function(n) {
                                    var d, l = n.details.originalError;
                                    return r.sendEvent(t, "vault-manager.delete-payment-method.failed"), l[0] && "NOT_FOUND" === l[0].extensions.errorClass && (d = new o({
                                        type: c.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.type,
                                        code: c.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.code,
                                        message: "A payment method for payment method nonce `" + e + "` could not be found.",
                                        details: {
                                            originalError: l
                                        }
                                    })), d || (d = new o({
                                        type: c.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.type,
                                        code: c.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.code,
                                        message: "An unknown error occured when attempting to delete the payment method assocaited with the payment method nonce `" + e + "`.",
                                        details: {
                                            originalError: l
                                        }
                                    })), _.reject(d)
                                })) : _.reject(new o(c.VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN))
                            }))
                        }, m.prototype.teardown = function() {
                            return d(this, l(m.prototype)), _.resolve()
                        }, t.exports = E.wrapPrototype(m)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 211,
                        "@braintree/wrap-promise": 49
                    }],
                    214: [function(e, t, n) {
                        "use strict";
                        var r = (this && this.__importDefault || function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        })(e("./venmo-desktop"));
                        t.exports = function(e) {
                            return new r.default(e).initialize()
                        }
                    }, {
                        "./venmo-desktop": 216
                    }],
                    215: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = n.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = n.UPDATE_PAYMENT_CONTEXT_QUERY = n.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = n.CREATE_PAYMENT_CONTEXT_QUERY = n.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = void 0, n.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoQRCodePaymentContext($input: CreateVenmoQRCodePaymentContextInput!) {\n  createVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n    venmoQRCodePaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}", n.CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoPaymentContext($input: CreateVenmoPaymentContextInput!) {\n  createVenmoPaymentContext(input: $input) {\n    clientMutationId\n    venmoPaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}", n.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoQRCodePaymentContext($input: UpdateVenmoQRCodePaymentContextInput!) {\n  updateVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n  }\n}", n.UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoPaymentContextStatus($input: UpdateVenmoPaymentContextStatusInput!) {\n  updateVenmoPaymentContextStatus(input: $input) {\n    clientMutationId\n  }\n}", n.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoQRCodePaymentContext {\n      status\n      paymentMethodId\n      userName\n    }\n  }\n}", n.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoPaymentContext {\n      status\n      paymentMethodId\n      userName\n      payerInfo {\n        firstName\n        lastName\n        phoneNumber\n        email\n        externalId\n        userName\n      }\n    }\n  }\n}"
                    }, {}],
                    216: [function(e, t, n) {
                        "use strict";
                        var r = this && this.__assign || function() {
                                return r = Object.assign || function(e) {
                                    for (var s, i = 1, t = arguments.length; i < t; i++)
                                        for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (e[p] = s[p]);
                                    return e
                                }, r.apply(this, arguments)
                            },
                            o = this && this.__importDefault || function(e) {
                                return e && e.__esModule ? e : {
                                    default: e
                                }
                            };
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        });
                        var c = o(e("framebus")),
                            d = o(e("@braintree/iframer")),
                            l = o(e("@braintree/uuid")),
                            _ = e("../shared/events"),
                            E = e("./queries"),
                            h = 1e3,
                            m = 2e3,
                            f = function() {
                                function e(e) {
                                    this.isHidden = !0, this.env = e.environment, this.id = l.default(), this.profileId = e.profileId, this.displayName = e.displayName, this.paymentMethodUsage = e.paymentMethodUsage, this.shouldUseLegacyQRCodeMutation = !this.paymentMethodUsage;
                                    var t = e.url + "#" + this.env + "_" + this.id;
                                    this.bus = new c.default({
                                        channel: this.id,
                                        verifyDomain: e.verifyDomain
                                    }), this.apiRequest = e.apiRequest, this.sendEvent = e.sendEvent, this.Promise = e.Promise, this.alertBox = document.createElement("div"), this.alertBox.setAttribute("data-venmo-desktop-id", this.id), this.alertBox.setAttribute("role", "alert"), this.alertBox.style.position = "fixed", this.alertBox.style.display = "none", this.alertBox.style.height = "1px", this.alertBox.style.width = "1px", this.alertBox.style.overflow = "hidden", this.alertBox.style.zIndex = "0", this.iframe = d.default({
                                        src: t,
                                        name: "venmo-desktop-iframe",
                                        style: {
                                            display: "none",
                                            position: "fixed",
                                            top: "0",
                                            bottom: "0",
                                            right: "0",
                                            left: "0",
                                            height: "100%",
                                            width: "100%",
                                            zIndex: "9999999"
                                        },
                                        title: "Venmo Desktop"
                                    })
                                }
                                return e.prototype.initialize = function() {
                                    var e = this;
                                    return new this.Promise((function(t) {
                                        e.bus.on(_.VENMO_DESKTOP_IFRAME_READY, (function() {
                                            t(e)
                                        })), e.bus.on(_.VENMO_DESKTOP_REQUEST_NEW_QR_CODE, (function() {
                                            e.sendEvent("venmo.tokenize.desktop.restarted-from-error-view"), e.startPolling()
                                        })), document.body.appendChild(e.iframe), document.body.appendChild(e.alertBox)
                                    }))
                                }, e.prototype.launchDesktopFlow = function() {
                                    var e = this;
                                    this.isHidden = !1;
                                    var t = new this.Promise((function(t, n) {
                                        e.launchDesktopPromiseRejectFunction = n;
                                        var r = function() {
                                                e.bus.off(_.VENMO_DESKTOP_CUSTOMER_CANCELED, c), e.bus.off(_.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, d), e.bus.off(_.VENMO_DESKTOP_UNKNOWN_ERROR, o)
                                            },
                                            o = function(t) {
                                                r(), e.sendEvent("venmo.tokenize.desktop.unknown-error"), n({
                                                    allowUIToHandleError: !1,
                                                    reason: "UNKNOWN_ERROR",
                                                    err: t
                                                })
                                            },
                                            c = function() {
                                                r(), e.updateVenmoDesktopPaymentContext("CANCELED"), e.sendEvent("venmo.tokenize.desktop.status-change.canceled-from-modal"), n({
                                                    allowUIToHandleError: !1,
                                                    reason: "CUSTOMER_CANCELED"
                                                })
                                            },
                                            d = function(e) {
                                                r(), t(e)
                                            };
                                        e.bus.on(_.VENMO_DESKTOP_CUSTOMER_CANCELED, c), e.bus.on(_.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, d), e.bus.on(_.VENMO_DESKTOP_UNKNOWN_ERROR, o)
                                    }));
                                    return this.iframe.style.display = "block", this.setAlert("Generating a QR code, get your Venmo app ready"), this.iframe.focus(), this.startPolling(), t.then((function(t) {
                                        return delete e.venmoContextId, delete e.launchDesktopPromiseRejectFunction, t
                                    })).catch((function(t) {
                                        return delete e.venmoContextId, delete e.launchDesktopPromiseRejectFunction, e.Promise.reject(t)
                                    }))
                                }, e.prototype.triggerCompleted = function(e) {
                                    var t = this;
                                    this.isHidden || setTimeout((function() {
                                        t.bus.emit(_.VENMO_DESKTOP_AUTHORIZATION_COMPLETED, e)
                                    }), m)
                                }, e.prototype.triggerRejected = function(e) {
                                    this.launchDesktopPromiseRejectFunction && this.launchDesktopPromiseRejectFunction(e)
                                }, e.prototype.hideDesktopFlow = function() {
                                    this.setAlert(""), this.iframe.style.display = "none", this.bus.emit(_.VENMO_DESKTOP_CLOSED_FROM_PARENT), this.isHidden = !0
                                }, e.prototype.displayError = function(e) {
                                    this.isHidden || (this.bus.emit(_.VENMO_DESKTOP_DISPLAY_ERROR, {
                                        message: e
                                    }), this.setAlert(e))
                                }, e.prototype.displayQRCode = function(e, t) {
                                    this.isHidden || (this.bus.emit(_.VENMO_DESKTOP_DISPLAY_QR_CODE, {
                                        id: e,
                                        merchantId: t
                                    }), this.setAlert("To scan the QR code, open your Venmo app"))
                                }, e.prototype.authorize = function() {
                                    this.isHidden || (this.bus.emit(_.VENMO_DESKTOP_AUTHORIZE), this.setAlert("Venmo account authorized"))
                                }, e.prototype.authorizing = function() {
                                    this.isHidden || (this.bus.emit(_.VENMO_DESKTOP_AUTHORIZING), this.setAlert("Authorize on your Venmo app"))
                                }, e.prototype.startPolling = function() {
                                    var e = this;
                                    return this.createVenmoDesktopPaymentContext().then((function(t) {
                                        var n = new Date(t.expiresAt).getTime() - new Date(t.createdAt).getTime(),
                                            r = Date.now() + n;
                                        return e.displayQRCode(t.id, t.merchantId), e.pollForStatusChange(t.status, r)
                                    })).then((function(t) {
                                        if (t) {
                                            var n = t.userName || "";
                                            n = "@" + n.replace("@", ""), e.triggerCompleted({
                                                paymentMethodNonce: t.paymentMethodId,
                                                username: n,
                                                payerInfo: t.payerInfo,
                                                id: e.venmoContextId || ""
                                            })
                                        }
                                    })).catch((function(t) {
                                        t.allowUIToHandleError || (e.sendEvent("venmo.tokenize.desktop.unhandled-error"), e.triggerRejected(t))
                                    }))
                                }, e.prototype.pollForStatusChange = function(e, t) {
                                    var n = this;
                                    return this.venmoContextId ? Date.now() > t ? this.updateVenmoDesktopPaymentContext("EXPIRED").then((function() {
                                        return n.displayError("Something went wrong"), n.sendEvent("venmo.tokenize.desktop.status-change.sdk-timeout"), n.Promise.reject({
                                            allowUIToHandleError: !0,
                                            reason: "TIMEOUT"
                                        })
                                    })) : this.lookupVenmoDesktopPaymentContext().then((function(r) {
                                        if (!n.venmoContextId || !r) return n.Promise.resolve();
                                        var o = r.status;
                                        if (o !== e) switch (e = o, n.sendEvent("venmo.tokenize.desktop.status-change." + e.toLowerCase()), e) {
                                            case "CREATED":
                                                break;
                                            case "EXPIRED":
                                            case "FAILED":
                                            case "CANCELED":
                                                var c = "CANCELED" === e ? "The authorization was canceled" : "Something went wrong";
                                                return n.displayError(c), n.Promise.reject({
                                                    allowUIToHandleError: !0,
                                                    reason: e
                                                });
                                            case "SCANNED":
                                                n.authorizing();
                                                break;
                                            case "APPROVED":
                                                return n.authorize(), n.Promise.resolve(r)
                                        }
                                        return new n.Promise((function(r, o) {
                                            setTimeout((function() {
                                                n.pollForStatusChange(e, t).then(r).catch(o)
                                            }), h)
                                        }))
                                    })) : this.Promise.resolve()
                                }, e.prototype.teardown = function() {
                                    this.bus.teardown(), this.iframe.parentNode && this.iframe.parentNode.removeChild(this.iframe), this.alertBox.parentNode && this.alertBox.parentNode.removeChild(this.alertBox)
                                }, e.prototype.setAlert = function(e) {
                                    this.alertBox.style.display = e ? "block" : "none", this.alertBox.textContent = e
                                }, e.prototype.createPaymentContextFromGraphqlLegacyQRCodeMutation = function(e) {
                                    return this.apiRequest(E.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY, {
                                        input: {
                                            environment: this.env,
                                            intent: e
                                        }
                                    }).then((function(e) {
                                        return e.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext
                                    }))
                                }, e.prototype.createPaymentContextFromGraphQL = function(e) {
                                    var input = {
                                        intent: e,
                                        paymentMethodUsage: this.paymentMethodUsage,
                                        customerClient: "DESKTOP"
                                    };
                                    return this.profileId && (input.merchantProfileId = this.profileId), this.displayName && (input.displayName = this.displayName), this.apiRequest(E.CREATE_PAYMENT_CONTEXT_QUERY, {
                                        input: input
                                    }).then((function(e) {
                                        return e.createVenmoPaymentContext.venmoPaymentContext
                                    }))
                                }, e.prototype.createVenmoDesktopPaymentContext = function() {
                                    var e = this;
                                    return (this.shouldUseLegacyQRCodeMutation ? this.createPaymentContextFromGraphqlLegacyQRCodeMutation("PAY_FROM_APP") : this.createPaymentContextFromGraphQL("PAY_FROM_APP")).then((function(t) {
                                        e.venmoContextId = t.id;
                                        var n = e.profileId || t.merchantId;
                                        return {
                                            id: t.id,
                                            status: t.status,
                                            merchantId: n,
                                            createdAt: t.createdAt,
                                            expiresAt: t.expiresAt
                                        }
                                    }))
                                }, e.prototype.updateVenmoDesktopPaymentContext = function(e, t) {
                                    if (void 0 === t && (t = {}), !this.venmoContextId) return this.Promise.resolve();
                                    var data = {
                                            input: r({
                                                id: this.venmoContextId,
                                                status: e
                                            }, t)
                                        },
                                        n = this.shouldUseLegacyQRCodeMutation ? E.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY : E.UPDATE_PAYMENT_CONTEXT_QUERY;
                                    return this.apiRequest(n, data).then((function() {}))
                                }, e.prototype.lookupVenmoDesktopPaymentContext = function() {
                                    if (!this.venmoContextId) return this.Promise.resolve();
                                    var e = this.shouldUseLegacyQRCodeMutation ? E.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY : E.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
                                    return this.apiRequest(e, {
                                        id: this.venmoContextId
                                    }).then((function(e) {
                                        return e.node
                                    }))
                                }, e
                            }();
                        n.default = f
                    }, {
                        "../shared/events": 221,
                        "./queries": 215,
                        "@braintree/iframer": 41,
                        "@braintree/uuid": 45,
                        framebus: 58
                    }],
                    217: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("../lib/basic-component-verification"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("./shared/errors"),
                            _ = e("@braintree/wrap-promise"),
                            E = e("../lib/braintree-error"),
                            h = e("./venmo"),
                            m = e("../lib/promise"),
                            f = e("./shared/supports-venmo"),
                            y = "3.85.3";

                        function A(e) {
                            var t = "Venmo";
                            return o.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                var n, o;
                                return e.profileId && "string" != typeof e.profileId ? m.reject(new E(l.VENMO_INVALID_PROFILE_ID)) : e.deepLinkReturnUrl && "string" != typeof e.deepLinkReturnUrl ? m.reject(new E(l.VENMO_INVALID_DEEP_LINK_RETURN_URL)) : (n = c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                }).then((function(t) {
                                    var n = t.getConfiguration();
                                    return e.client = t, n.gatewayConfiguration.payWithVenmo ? t : m.reject(new E(l.VENMO_NOT_ENABLED))
                                })), e.createPromise = n, o = new h(e), r.sendEvent(n, "venmo.initialized"), n.then((function() {
                                    return o
                                })))
                            }))
                        }

                        function T(e) {
                            return f.isBrowserSupported(e)
                        }
                        t.exports = {
                            create: _(A),
                            isBrowserSupported: T,
                            VERSION: y
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./shared/errors": 220,
                        "./shared/supports-venmo": 222,
                        "./venmo": 223,
                        "@braintree/wrap-promise": 49
                    }],
                    218: [function(e, t, n) {
                        "use strict";
                        var r = e("@braintree/browser-detection/is-android"),
                            o = e("@braintree/browser-detection/is-chrome"),
                            c = e("@braintree/browser-detection/is-ios"),
                            d = e("@braintree/browser-detection/is-ios-safari"),
                            l = e("@braintree/browser-detection/is-ios-webview"),
                            _ = e("@braintree/browser-detection/is-samsung");

                        function E() {
                            return r() && window.navigator.userAgent.toLowerCase().indexOf("wv") > -1
                        }

                        function h() {
                            return !!c() && (l() || !d())
                        }

                        function m() {
                            var e = window.navigator.userAgent.toLowerCase();
                            return e.indexOf("huawei") > -1 && e.indexOf("fban") > -1 || !!r() && (e.indexOf("fb_iab") > -1 || e.indexOf("instagram") > -1)
                        }

                        function f() {
                            return c() && o()
                        }
                        t.exports = {
                            isAndroid: r,
                            isAndroidWebview: E,
                            isChrome: o,
                            isIos: c,
                            isIosChrome: f,
                            isSamsung: _,
                            isIosSafari: d,
                            isIosWebview: l,
                            isFacebookOwnedBrowserOnAndroid: m,
                            doesNotSupportWindowOpenInIos: h
                        }
                    }, {
                        "@braintree/browser-detection/is-android": 24,
                        "@braintree/browser-detection/is-chrome": 26,
                        "@braintree/browser-detection/is-ios": 35,
                        "@braintree/browser-detection/is-ios-safari": 32,
                        "@braintree/browser-detection/is-ios-webview": 33,
                        "@braintree/browser-detection/is-samsung": 36
                    }],
                    219: [function(e, t, n) {
                        "use strict";
                        t.exports = {
                            DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
                            DEFAULT_PROCESS_RESULTS_DELAY: 1e3,
                            VENMO_OPEN_URL: "https://venmo.com/braintree/checkout"
                        }
                    }, {}],
                    220: [function(e, t, n) {
                        "use strict";
                        var r = e("../../lib/braintree-error");
                        t.exports = {
                            VENMO_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "VENMO_NOT_ENABLED",
                                message: "Venmo is not enabled for this merchant."
                            },
                            VENMO_TOKENIZATION_REQUEST_ACTIVE: {
                                type: r.types.MERCHANT,
                                code: "VENMO_TOKENIZATION_REQUEST_ACTIVE",
                                message: "Another tokenization request is active."
                            },
                            VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE: {
                                type: r.types.MERCHANT,
                                code: "VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE",
                                message: "No tokenization in progress."
                            },
                            VENMO_APP_FAILED: {
                                type: r.types.UNKNOWN,
                                code: "VENMO_APP_FAILED",
                                message: "Venmo app encountered a problem."
                            },
                            VENMO_APP_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_APP_CANCELED",
                                message: "Venmo app authorization was canceled."
                            },
                            VENMO_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_CANCELED",
                                message: "User canceled Venmo authorization, or Venmo app is not available."
                            },
                            VENMO_DESKTOP_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_DESKTOP_CANCELED",
                                message: "User canceled Venmo authorization by closing the Venmo Desktop modal."
                            },
                            VENMO_TOKENIZATION_CANCELED_BY_MERCHANT: {
                                type: r.types.MERCHANT,
                                code: "VENMO_TOKENIZATION_CANCELED_BY_MERCHANT",
                                message: "The Venmo tokenization was canceled by the merchant."
                            },
                            VENMO_DESKTOP_UNKNOWN_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "VENMO_DESKTOP_UNKNOWN_ERROR",
                                message: "Something went wrong with the Venmo Desktop flow."
                            },
                            VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED: {
                                type: r.types.NETWORK,
                                code: "VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED",
                                message: "Something went wrong creating the Venmo Payment Context."
                            },
                            VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR: {
                                type: r.types.UNKNOWN,
                                code: "VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR",
                                message: "Something went wrong during mobile polling."
                            },
                            VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED",
                                message: "The Venmo authorization request is expired."
                            },
                            VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED",
                                message: "The Venmo authorization was canceled"
                            },
                            VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT: {
                                type: r.types.CUSTOMER,
                                code: "VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT",
                                message: "Customer took too long to authorize Venmo payment."
                            },
                            VENMO_MOBILE_POLLING_TOKENIZATION_FAILED: {
                                type: r.types.UNKNOWN,
                                code: "VENMO_MOBILE_POLLING_TOKENIZATION_FAILED",
                                message: "The Venmo authorization failed."
                            },
                            VENMO_INVALID_PROFILE_ID: {
                                type: r.types.MERCHANT,
                                code: "VENMO_INVALID_PROFILE_ID",
                                message: "Venmo profile ID is invalid."
                            },
                            VENMO_INVALID_DEEP_LINK_RETURN_URL: {
                                type: r.types.MERCHANT,
                                code: "VENMO_INVALID_DEEP_LINK_RETURN_URL",
                                message: "Venmo deep link return URL is invalid."
                            }
                        }
                    }, {
                        "../../lib/braintree-error": 131
                    }],
                    221: [function(e, t, n) {
                        "use strict";
                        Object.defineProperty(n, "__esModule", {
                            value: !0
                        }), n.VENMO_DESKTOP_UNKNOWN_ERROR = n.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = n.VENMO_DESKTOP_CLOSED_FROM_PARENT = n.VENMO_DESKTOP_IFRAME_READY = n.VENMO_DESKTOP_DISPLAY_QR_CODE = n.VENMO_DESKTOP_DISPLAY_ERROR = n.VENMO_DESKTOP_CUSTOMER_CANCELED = n.VENMO_DESKTOP_AUTHORIZATION_COMPLETED = n.VENMO_DESKTOP_AUTHORIZING = n.VENMO_DESKTOP_AUTHORIZE = n.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = void 0, n.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = "VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT", n.VENMO_DESKTOP_AUTHORIZE = "VENMO_DESKTOP_AUTHORIZE", n.VENMO_DESKTOP_AUTHORIZING = "VENMO_DESKTOP_AUTHORIZING", n.VENMO_DESKTOP_AUTHORIZATION_COMPLETED = "VENMO_DESKTOP_AUTHORIZATION_COMPLETED", n.VENMO_DESKTOP_CUSTOMER_CANCELED = "VENMO_DESKTOP_CUSTOMER_CANCELED", n.VENMO_DESKTOP_DISPLAY_ERROR = "VENMO_DESKTOP_DISPLAY_ERROR", n.VENMO_DESKTOP_DISPLAY_QR_CODE = "VENMO_DESKTOP_DISPLAY_QR_CODE", n.VENMO_DESKTOP_IFRAME_READY = "VENMO_DESKTOP_IFRAME_READY", n.VENMO_DESKTOP_CLOSED_FROM_PARENT = "VENMO_DESKTOP_CLOSED_FROM_PARENT", n.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = "VENMO_DESKTOP_REQUEST_NEW_QR_CODE", n.VENMO_DESKTOP_UNKNOWN_ERROR = "VENMO_DESKTOP_UNKNOWN_ERROR"
                    }, {}],
                    222: [function(e, t, n) {
                        "use strict";
                        var r = e("./browser-detection");

                        function o(e) {
                            var t, n, o, c = r.isAndroid(),
                                d = c || r.isIos(),
                                l = c && r.isChrome(),
                                _ = r.isIosSafari() || l,
                                E = r.isIosChrome() || r.isFacebookOwnedBrowserOnAndroid() || r.isSamsung();
                            return o = !0 === (e = e || {}).allowDesktop, t = !e.hasOwnProperty("allowNewBrowserTab") || e.allowNewBrowserTab, n = !e.hasOwnProperty("allowWebviews") || e.allowWebviews, !E && !(!n && (r.isAndroidWebview() || r.isIosWebview())) && (d ? t ? d : _ : o)
                        }
                        t.exports = {
                            isBrowserSupported: o
                        }
                    }, {
                        "./browser-detection": 218
                    }],
                    223: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/analytics"),
                            o = e("./shared/supports-venmo"),
                            c = e("./shared/browser-detection"),
                            d = e("./shared/constants"),
                            l = e("./shared/errors"),
                            _ = e("../lib/querystring"),
                            E = e("../lib/is-verified-domain"),
                            h = e("../lib/methods"),
                            m = e("../lib/convert-methods-to-error"),
                            f = e("@braintree/wrap-promise"),
                            y = e("../lib/braintree-error"),
                            A = e("../lib/in-iframe"),
                            T = e("../lib/promise"),
                            I = e("@braintree/extended-promise"),
                            N = e("./external/"),
                            O = e("./external/queries"),
                            v = "3.85.3",
                            P = 250,
                            C = 3e5;

                        function R(e) {
                            var t = this;
                            this._createPromise = e.createPromise, this._allowNewBrowserTab = !1 !== e.allowNewBrowserTab, this._allowWebviews = !1 !== e.allowWebviews, this._allowDesktop = !0 === e.allowDesktop, this._requireManualReturn = !0 === e.requireManualReturn, this._useRedirectForIOS = !0 === e.useRedirectForIOS, this._profileId = e.profileId, this._displayName = e.displayName, this._deepLinkReturnUrl = e.deepLinkReturnUrl, this._ignoreHistoryChanges = e.ignoreHistoryChanges, this._paymentMethodUsage = (e.paymentMethodUsage || "").toUpperCase(), this._shouldUseLegacyFlow = !this._paymentMethodUsage, this._useDesktopFlow = this._allowDesktop && this._isDesktop(), this._cannotHaveReturnUrls = A() || this._requireManualReturn, this._shouldCreateVenmoPaymentContext = this._cannotHaveReturnUrls || !this._shouldUseLegacyFlow, r.sendEvent(this._createPromise, "venmo.desktop-flow.configured." + String(Boolean(this._allowDesktop))), this.hasTokenizationResult() ? r.sendEvent(this._createPromise, "venmo.appswitch.return-in-new-tab") : this._useDesktopFlow ? this._createPromise = this._createPromise.then((function(e) {
                                var n = e.getConfiguration().gatewayConfiguration;
                                return N({
                                    url: n.assetsUrl + "/web/" + v + "/html/venmo-desktop-frame.html",
                                    environment: "production" === n.environment ? "PRODUCTION" : "SANDBOX",
                                    profileId: t._profileId || n.payWithVenmo.merchantId,
                                    paymentMethodUsage: t._paymentMethodUsage,
                                    displayName: t._displayName,
                                    Promise: T,
                                    apiRequest: function(t, data) {
                                        return e.request({
                                            api: "graphQLApi",
                                            data: {
                                                query: t,
                                                variables: data
                                            }
                                        }).then((function(e) {
                                            return e.data
                                        }))
                                    },
                                    sendEvent: function(e) {
                                        r.sendEvent(t._createPromise, e)
                                    },
                                    verifyDomain: E
                                }).then((function(n) {
                                    return t._venmoDesktopInstance = n, r.sendEvent(t._createPromise, "venmo.desktop-flow.presented"), e
                                })).catch((function() {
                                    return r.sendEvent(t._createPromise, "venmo.desktop-flow.setup-failed"), t._useDesktopFlow = !1, e
                                }))
                            })) : this._shouldCreateVenmoPaymentContext && (this._mobilePollingInterval = P, this._mobilePollingExpiresThreshold = C, this._createPromise = this._createPromise.then((function(e) {
                                var n = t._cannotHaveReturnUrls ? "manual-return" : "mobile-payment-context",
                                    o = e.getConfiguration().gatewayConfiguration;
                                return t._mobilePollingContextEnvironment = o.environment.toUpperCase(), t._createVenmoPaymentContext(e).then((function() {
                                    return r.sendEvent(t._createPromise, "venmo." + n + ".presented"), e
                                })).catch((function(e) {
                                    return r.sendEvent(t._createPromise, "venmo." + n + ".setup-failed"), T.reject(new y({
                                        type: l.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.type,
                                        code: l.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.code,
                                        message: l.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.message,
                                        details: {
                                            originalError: e
                                        }
                                    }))
                                }))
                            })))
                        }

                        function S(e) {
                            return (e || window.location.hash.substring(1)).split("&").reduce((function(e, t) {
                                var n = t.split("="),
                                    r = decodeURIComponent(n[0]).replace(/\W/g, ""),
                                    o = decodeURIComponent(n[1]);
                                return e[r] = o, e
                            }), {})
                        }

                        function D(e) {
                            return "@" + (e = e || "").replace("@", "")
                        }

                        function w(e) {
                            var t = {
                                nonce: e.paymentMethodNonce,
                                type: "VenmoAccount",
                                details: {
                                    username: D(e.username),
                                    paymentContextId: e.id
                                }
                            };
                            return e.payerInfo && (t.details.payerInfo = e.payerInfo, t.details.payerInfo.userName = D(e.payerInfo.userName)), t
                        }

                        function L() {
                            var e;
                            return void 0 !== window.document.hidden ? e = "visibilitychange" : void 0 !== window.document.msHidden ? e = "msvisibilitychange" : void 0 !== window.document.webkitHidden && (e = "webkitvisibilitychange"), e
                        }

                        function M() {
                            return window.navigator.platform && /iPhone|iPad|iPod/.test(window.navigator.platform)
                        }
                        R.prototype._createVenmoPaymentContext = function(e, t) {
                            var n = this;
                            return this._shouldCreateVenmoPaymentContext ? (this._shouldUseLegacyFlow ? e.request({
                                api: "graphQLApi",
                                data: {
                                    query: O.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY,
                                    variables: {
                                        input: {
                                            environment: this._mobilePollingContextEnvironment,
                                            intent: "PAY_FROM_APP"
                                        }
                                    }
                                }
                            }).then((function(e) {
                                return e.data.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext
                            })) : e.request({
                                api: "graphQLApi",
                                data: {
                                    query: O.CREATE_PAYMENT_CONTEXT_QUERY,
                                    variables: {
                                        input: {
                                            paymentMethodUsage: this._paymentMethodUsage,
                                            intent: "CONTINUE",
                                            customerClient: "MOBILE_WEB",
                                            displayName: this._displayName
                                        }
                                    }
                                }
                            }).then((function(e) {
                                return e.data.createVenmoPaymentContext.venmoPaymentContext
                            }))).then((function(r) {
                                var o = .6666 * (new Date(r.expiresAt) - new Date(r.createdAt));
                                clearTimeout(n._refreshPaymentContextTimeout), n._refreshPaymentContextTimeout = setTimeout((function() {
                                    n._tokenizationInProgress || n._createVenmoPaymentContext(e, !0)
                                }), o), t && n._tokenizationInProgress || (n._venmoPaymentContextStatus = r.status, n._venmoPaymentContextId = r.id)
                            })) : T.resolve()
                        }, R.prototype.appSwitch = function(e) {
                            this._deepLinkReturnUrl ? M() ? (r.sendEvent(this._createPromise, "venmo.appswitch.start.ios-webview"), window.location.href = e) : window.popupBridge && "function" == typeof window.popupBridge.open ? (r.sendEvent(this._createPromise, "venmo.appswitch.start.popup-bridge"), window.popupBridge.open(e)) : (r.sendEvent(this._createPromise, "venmo.appswitch.start.webview"), window.open(e)) : (r.sendEvent(this._createPromise, "venmo.appswitch.start.browser"), c.doesNotSupportWindowOpenInIos() || this._shouldUseRedirectStrategy() ? window.location.href = e : window.open(e))
                        }, R.prototype.getUrl = function() {
                            return this._createPromise.then(function(e) {
                                var t = e.getConfiguration(),
                                    n = {},
                                    r = this._deepLinkReturnUrl || window.location.href.replace(window.location.hash, ""),
                                    o = t.gatewayConfiguration.payWithVenmo,
                                    c = t.analyticsMetadata,
                                    l = o.accessToken,
                                    E = {
                                        _meta: {
                                            version: c.sdkVersion,
                                            integration: c.integration,
                                            platform: c.platform,
                                            sessionId: c.sessionId
                                        }
                                    };
                                return r = r.replace(/#*$/, ""), this._venmoPaymentContextId && (this._shouldUseLegacyFlow ? l += "|pcid:" + this._venmoPaymentContextId : n.resource_id = this._venmoPaymentContextId), this._shouldIncludeReturnUrls() ? (n["x-success"] = r + "#venmoSuccess=1", n["x-cancel"] = r + "#venmoCancel=1", n["x-error"] = r + "#venmoError=1") : (n["x-success"] = "NOOP", n["x-cancel"] = "NOOP", n["x-error"] = "NOOP"), n.ua = window.navigator.userAgent, n.braintree_merchant_id = this._profileId || o.merchantId, n.braintree_access_token = l, n.braintree_environment = o.environment, n.braintree_sdk_data = btoa(JSON.stringify(E)), d.VENMO_OPEN_URL + "?" + _.stringify(n)
                            }.bind(this))
                        }, R.prototype.isBrowserSupported = function() {
                            return o.isBrowserSupported({
                                allowNewBrowserTab: this._allowNewBrowserTab,
                                allowWebviews: this._allowWebviews,
                                allowDesktop: this._allowDesktop
                            })
                        }, R.prototype.hasTokenizationResult = function() {
                            return this._hasTokenizationResult()
                        }, R.prototype._hasTokenizationResult = function(e) {
                            var t = S(e);
                            return void 0 !== (t.venmoSuccess || t.venmoError || t.venmoCancel)
                        }, R.prototype._shouldIncludeReturnUrls = function() {
                            return !!this._deepLinkReturnUrl || !this._cannotHaveReturnUrls
                        }, R.prototype._isDesktop = function() {
                            return !(c.isIos() || c.isAndroid())
                        }, R.prototype.tokenize = function(e) {
                            var t = this;
                            return e = e || {}, !0 === this._tokenizationInProgress ? T.reject(new y(l.VENMO_TOKENIZATION_REQUEST_ACTIVE)) : (this._tokenizationInProgress = !0, (this._useDesktopFlow ? this._tokenizeForDesktop(e) : this._cannotHaveReturnUrls ? this._tokenizeForMobileWithManualReturn() : this._tokenizeForMobileWithHashChangeListeners(e)).then((function(e) {
                                return t._createPromise.then((function(e) {
                                    return t._createVenmoPaymentContext(e)
                                })).then((function() {
                                    return t._tokenizationInProgress = !1, w(e)
                                }))
                            })).catch((function(e) {
                                return t._createPromise.then((function(e) {
                                    return t._createVenmoPaymentContext(e)
                                })).then((function() {
                                    return t._tokenizationInProgress = !1, T.reject(e)
                                }))
                            })))
                        }, R.prototype.cancelTokenization = function() {
                            return this._tokenizationInProgress ? (this._removeVisibilityEventListener(), this._tokenizePromise && this._tokenizePromise.reject(new y(l.VENMO_TOKENIZATION_CANCELED_BY_MERCHANT)), T.all([this._cancelMobilePaymentContext(), this._cancelVenmoDesktopContext()])) : T.reject(new y(l.VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE))
                        }, R.prototype._queryPaymentContextStatus = function(e) {
                            var t = this;
                            return this._createPromise.then((function(n) {
                                var r = t._shouldUseLegacyFlow ? O.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY : O.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
                                return n.request({
                                    api: "graphQLApi",
                                    data: {
                                        query: r,
                                        variables: {
                                            id: e
                                        }
                                    }
                                })
                            })).then((function(e) {
                                return e.data.node
                            }))
                        }, R.prototype._pollForStatusChange = function() {
                            var e = this;
                            return Date.now() > e._mobilePollingContextExpiresIn ? T.reject(new y(l.VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT)) : this._queryPaymentContextStatus(this._venmoPaymentContextId).catch((function(e) {
                                return T.reject(new y({
                                    type: l.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.type,
                                    code: l.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.code,
                                    message: l.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })).then((function(t) {
                                var n = t.status;
                                if (n !== e._venmoPaymentContextStatus) switch (e._venmoPaymentContextStatus = n, r.sendEvent(e._createPromise, "venmo.tokenize.manual-return.status-change." + n.toLowerCase()), n) {
                                    case "EXPIRED":
                                    case "FAILED":
                                    case "CANCELED":
                                        return T.reject(new y(l["VENMO_MOBILE_POLLING_TOKENIZATION_" + n]));
                                    case "APPROVED":
                                        return T.resolve(t)
                                }
                                return new T((function(t, n) {
                                    setTimeout((function() {
                                        e._pollForStatusChange().then(t).catch(n)
                                    }), e._mobilePollingInterval)
                                }))
                            }))
                        }, R.prototype._tokenizeForMobileWithManualReturn = function() {
                            var e = this;
                            return r.sendEvent(this._createPromise, "venmo.tokenize.manual-return.start"), this._mobilePollingContextExpiresIn = Date.now() + this._mobilePollingExpiresThreshold, this._tokenizePromise = new I, this._pollForStatusChange().then((function(t) {
                                r.sendEvent(e._createPromise, "venmo.tokenize.manual-return.success"), e._tokenizePromise.resolve({
                                    paymentMethodNonce: t.paymentMethodId,
                                    username: t.userName,
                                    payerInfo: t.payerInfo,
                                    id: e._venmoPaymentContextId
                                })
                            })).catch((function(t) {
                                r.sendEvent(e._createPromise, "venmo.tokenize.manual-return.failure"), e._tokenizePromise.reject(t)
                            })), this.getUrl().then((function(t) {
                                return e.appSwitch(t), e._tokenizePromise
                            }))
                        }, R.prototype._shouldUseRedirectStrategy = function() {
                            return !!c.isIos() && this._useRedirectForIOS
                        }, R.prototype._tokenizeForMobileWithHashChangeListeners = function(e) {
                            var t, n, o = this;
                            if (this.hasTokenizationResult()) return this.processResultsFromHash();

                            function c(e) {
                                var t;
                                o.processResultsFromHash(e).catch((function(e) {
                                    t = e
                                })).then((function(e) {
                                    o._ignoreHistoryChanges || window.location.hash === o._previousHash || (window.location.hash = o._previousHash), o._removeVisibilityEventListener(), t ? o._tokenizePromise.reject(t) : o._tokenizePromise.resolve(e), delete o._tokenizePromise
                                }))
                            }
                            return r.sendEvent(this._createPromise, "venmo.tokenize.mobile.start"), this._tokenizePromise = new I, this._previousHash = window.location.hash, this._onHashChangeListener = function(e) {
                                var r = e.newURL.split("#")[1];
                                o._hasTokenizationResult(r) && (t = !0, clearTimeout(n), c(r))
                            }, window.addEventListener("hashchange", this._onHashChangeListener, !1), this._visibilityChangeListener = function() {
                                var r = e.processResultsDelay || d.DEFAULT_PROCESS_RESULTS_DELAY;
                                window.document.hidden || t || (n = setTimeout(c, r))
                            }, this.getUrl().then((function(e) {
                                return o.appSwitch(e), setTimeout((function() {
                                    window.document.addEventListener(L(), o._visibilityChangeListener)
                                }), d.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY), o._tokenizePromise
                            }))
                        }, R.prototype._tokenizeForDesktop = function() {
                            var e = this;
                            return r.sendEvent(this._createPromise, "venmo.tokenize.desktop.start"), this._tokenizePromise = new I, this._createPromise.then((function() {
                                return e._venmoDesktopInstance.launchDesktopFlow()
                            })).then((function(t) {
                                e._venmoDesktopInstance.hideDesktopFlow(), r.sendEvent(e._createPromise, "venmo.tokenize.desktop.success"), e._tokenizePromise.resolve(t)
                            })).catch((function(t) {
                                r.sendEvent(e._createPromise, "venmo.tokenize.desktop.failure"), e._venmoDesktopInstance && e._venmoDesktopInstance.hideDesktopFlow(), t && "CUSTOMER_CANCELED" === t.reason ? e._tokenizePromise.reject(new y(l.VENMO_DESKTOP_CANCELED)) : e._tokenizePromise.reject(new y({
                                    type: l.VENMO_DESKTOP_UNKNOWN_ERROR.type,
                                    code: l.VENMO_DESKTOP_UNKNOWN_ERROR.code,
                                    message: l.VENMO_DESKTOP_UNKNOWN_ERROR.message,
                                    details: {
                                        originalError: t
                                    }
                                }))
                            })), this._tokenizePromise
                        }, R.prototype._updateVenmoDesktopPaymentContext = function(e, t) {
                            return this._venmoDesktopInstance.updateVenmoDesktopPaymentContext(e, t)
                        }, R.prototype._cancelMobilePaymentContext = function() {
                            var e = this;
                            return this._createPromise.then((function(t) {
                                var n;
                                return e._venmoPaymentContextId ? (n = e._shouldUseLegacyFlow ? O.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY : O.UPDATE_PAYMENT_CONTEXT_QUERY, t.request({
                                    api: "graphQLApi",
                                    data: {
                                        query: n,
                                        variables: {
                                            input: {
                                                id: e._venmoPaymentContextId,
                                                status: "CANCELED"
                                            }
                                        }
                                    }
                                })) : T.resolve()
                            }))
                        }, R.prototype._cancelVenmoDesktopContext = function() {
                            var e = this;
                            return this._createPromise.then((function() {
                                return e._venmoDesktopInstance && e._venmoDesktopInstance.updateVenmoDesktopPaymentContext("CANCELED"), T.resolve()
                            }))
                        }, R.prototype.teardown = function() {
                            var e = this;
                            return this._removeVisibilityEventListener(), this._createPromise.then(function() {
                                e._venmoDesktopInstance && e._venmoDesktopInstance.teardown(), clearTimeout(e._refreshPaymentContextTimeout), e._cancelMobilePaymentContext(), m(this, h(R.prototype))
                            }.bind(this))
                        }, R.prototype._removeVisibilityEventListener = function() {
                            window.removeEventListener("hashchange", this._onHashChangeListener), window.document.removeEventListener(L(), this._visibilityChangeListener), delete this._visibilityChangeListener, delete this._onHashChangeListener
                        }, R.prototype.processResultsFromHash = function(e) {
                            var t = this,
                                n = S(e);
                            return new T((function(e, o) {
                                n.venmoSuccess ? (r.sendEvent(t._createPromise, "venmo.appswitch.handle.success"), n.resource_id && !t._shouldUseLegacyFlow ? t._queryPaymentContextStatus(n.resource_id).then((function(o) {
                                    if ("APPROVED" !== o.status) return r.sendEvent(t._createPromise, "venmo.process-results.unexpected-payment-context-status." + o.status.toLowerCase()), void e(n);
                                    e({
                                        paymentMethodNonce: o.paymentMethodId,
                                        username: o.userName,
                                        payerInfo: o.payerInfo,
                                        id: n.resource_id
                                    })
                                })).catch((function() {
                                    r.sendEvent(t._createPromise, "venmo.process-results.payment-context-status-query-failed"), e(n)
                                })) : e(n)) : n.venmoError ? (r.sendEvent(t._createPromise, "venmo.appswitch.handle.error"), o(new y({
                                    type: l.VENMO_APP_FAILED.type,
                                    code: l.VENMO_APP_FAILED.code,
                                    message: l.VENMO_APP_FAILED.message,
                                    details: {
                                        originalError: {
                                            message: decodeURIComponent(n.errorMessage),
                                            code: n.errorCode
                                        }
                                    }
                                }))) : n.venmoCancel ? (r.sendEvent(t._createPromise, "venmo.appswitch.handle.cancel"), o(new y(l.VENMO_APP_CANCELED))) : (r.sendEvent(t._createPromise, "venmo.appswitch.cancel-or-unavailable"), o(new y(l.VENMO_CANCELED))), t._clearFragmentParameters()
                            }))
                        }, R.prototype._clearFragmentParameters = function() {
                            this._ignoreHistoryChanges || "function" == typeof window.history.replaceState && window.location.hash && history.pushState({}, "", window.location.href.slice(0, window.location.href.indexOf("#")))
                        }, t.exports = f.wrapPrototype(R)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/in-iframe": 157,
                        "../lib/is-verified-domain": 160,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "../lib/querystring": 165,
                        "./external/": 214,
                        "./external/queries": 215,
                        "./shared/browser-detection": 218,
                        "./shared/constants": 219,
                        "./shared/errors": 220,
                        "./shared/supports-venmo": 222,
                        "@braintree/extended-promise": 40,
                        "@braintree/wrap-promise": 49
                    }],
                    224: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error");
                        t.exports = {
                            VISA_CHECKOUT_NOT_ENABLED: {
                                type: r.types.MERCHANT,
                                code: "VISA_CHECKOUT_NOT_ENABLED",
                                message: "Visa Checkout is not enabled for this merchant."
                            },
                            VISA_CHECKOUT_INIT_OPTIONS_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "VISA_CHECKOUT_INIT_OPTIONS_REQUIRED",
                                message: "initOptions requires an object."
                            },
                            VISA_CHECKOUT_PAYMENT_REQUIRED: {
                                type: r.types.MERCHANT,
                                code: "VISA_CHECKOUT_PAYMENT_REQUIRED",
                                message: "tokenize requires callid, encKey, and encPaymentData."
                            },
                            VISA_CHECKOUT_TOKENIZATION: {
                                type: r.types.NETWORK,
                                code: "VISA_CHECKOUT_TOKENIZATION",
                                message: "A network error occurred when processing the Visa Checkout payment."
                            }
                        }
                    }, {
                        "../lib/braintree-error": 131
                    }],
                    225: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/basic-component-verification"),
                            o = e("../lib/braintree-error"),
                            c = e("../lib/create-deferred-client"),
                            d = e("../lib/create-assets-url"),
                            l = e("./visa-checkout"),
                            _ = e("../lib/analytics"),
                            E = e("./errors"),
                            h = "3.85.3",
                            m = e("../lib/promise"),
                            f = e("@braintree/wrap-promise");

                        function y(e) {
                            var t = "Visa Checkout";
                            return r.verify({
                                name: t,
                                client: e.client,
                                authorization: e.authorization
                            }).then((function() {
                                return c.create({
                                    authorization: e.authorization,
                                    client: e.client,
                                    debug: e.debug,
                                    assetsUrl: d.create(e.authorization),
                                    name: t
                                })
                            })).then((function(t) {
                                return e.client = t, e.client.getConfiguration().gatewayConfiguration.visaCheckout ? (_.sendEvent(e.client, "visacheckout.initialized"), new l(e)) : m.reject(new o(E.VISA_CHECKOUT_NOT_ENABLED))
                            }))
                        }
                        t.exports = {
                            create: f(y),
                            VERSION: h
                        }
                    }, {
                        "../lib/analytics": 126,
                        "../lib/basic-component-verification": 129,
                        "../lib/braintree-error": 131,
                        "../lib/create-assets-url": 136,
                        "../lib/create-deferred-client": 138,
                        "../lib/promise": 164,
                        "./errors": 224,
                        "./visa-checkout": 226,
                        "@braintree/wrap-promise": 49
                    }],
                    226: [function(e, t, n) {
                        "use strict";
                        var r = e("../lib/braintree-error"),
                            o = e("../lib/analytics"),
                            c = e("./errors"),
                            d = e("../lib/json-clone"),
                            l = e("../lib/methods"),
                            _ = e("../lib/convert-methods-to-error"),
                            E = e("../lib/promise"),
                            h = e("@braintree/wrap-promise"),
                            m = {
                                Visa: "VISA",
                                MasterCard: "MASTERCARD",
                                Discover: "DISCOVER",
                                "American Express": "AMEX"
                            };

                        function f(e) {
                            this._client = e.client
                        }

                        function y(e) {
                            return e.reduce((function(e, t) {
                                return m.hasOwnProperty(t) ? e.concat(m[t]) : e
                            }), [])
                        }
                        f.prototype.createInitOptions = function(e) {
                            var t, n = this._client.getConfiguration().gatewayConfiguration,
                                o = n.visaCheckout;
                            if (!e) throw new r(c.VISA_CHECKOUT_INIT_OPTIONS_REQUIRED);
                            return (t = d(e)).apikey = t.apikey || o.apikey, t.encryptionKey = o.encryptionKey, t.externalClientId = t.externalClientId || o.externalClientId, t.settings = t.settings || {}, t.settings.dataLevel = "FULL", t.settings.payment = t.settings.payment || {}, t.settings.payment.cardBrands || (t.settings.payment.cardBrands = y(n.visaCheckout.supportedCardTypes)), t
                        }, f.prototype.tokenize = function(e) {
                            var t = this;
                            return e.callid && e.encKey && e.encPaymentData ? this._client.request({
                                method: "post",
                                endpoint: "payment_methods/visa_checkout_cards",
                                data: {
                                    _meta: {
                                        source: "visa-checkout"
                                    },
                                    visaCheckoutCard: {
                                        callId: e.callid,
                                        encryptedPaymentData: e.encPaymentData,
                                        encryptedKey: e.encKey
                                    }
                                }
                            }).then((function(e) {
                                return o.sendEvent(t._client, "visacheckout.tokenize.succeeded"), e.visaCheckoutCards[0]
                            })).catch((function(e) {
                                return o.sendEvent(t._client, "visacheckout.tokenize.failed"), E.reject(new r({
                                    type: c.VISA_CHECKOUT_TOKENIZATION.type,
                                    code: c.VISA_CHECKOUT_TOKENIZATION.code,
                                    message: c.VISA_CHECKOUT_TOKENIZATION.message,
                                    details: {
                                        originalError: e
                                    }
                                }))
                            })) : E.reject(new r(c.VISA_CHECKOUT_PAYMENT_REQUIRED))
                        }, f.prototype.teardown = function() {
                            return _(this, l(f.prototype)), E.resolve()
                        }, t.exports = h.wrapPrototype(f)
                    }, {
                        "../lib/analytics": 126,
                        "../lib/braintree-error": 131,
                        "../lib/convert-methods-to-error": 134,
                        "../lib/json-clone": 161,
                        "../lib/methods": 162,
                        "../lib/promise": 164,
                        "./errors": 224,
                        "@braintree/wrap-promise": 49
                    }]
                }, {}, [124])(124)
            }).call(this, n(136).setImmediate)
        }
    }
]);