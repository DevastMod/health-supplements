(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{565:function(e,t,r){var content=r(811);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(30).default)("7da00394",content,!0,{sourceMap:!1})},810:function(e,t,r){"use strict";var n=r(565),o=r.n(n);r.d(t,"default",(function(){return o.a}))},811:function(e,t,r){var n=r(29)(!1);n.push([e.i,".sliderContainer_LtGNI{margin-top:3.8rem;overflow:hidden}@media(min-width:48em){.sliderContainer_LtGNI{margin-top:7.1rem}}.carousel_CRZZz{margin:0 9.8rem}@media(min-width:30em){.carousel_CRZZz{margin:0 -4rem}}@media(min-width:48em){.carousel_CRZZz{margin:0 -8.5rem}}.slide_O9KgD{flex:0 0 auto;width:100%;transition:opacity .3s}.iconText_ZVZBB{display:none;margin-top:0;font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:300;line-height:1.9rem;letter-spacing:-.008rem}@media(min-width:48em){.iconText_ZVZBB{display:block;margin-top:.3rem}}.button_cXko8{display:flex;flex:0 0 auto;flex-flow:column;align-items:center;justify-content:center;width:5.5rem;height:4.5rem;text-decoration:none;border:.2rem solid #fff;border-radius:.9rem}@media(min-width:48em){.button_cXko8{width:14rem;height:11.2rem;border-radius:1.9rem}}.iconContainer_V1ivF{margin-bottom:0;font-size:2rem}@media(min-width:48em){.iconContainer_V1ivF{margin-bottom:.3rem;font-size:3rem}}.headerPartition_C7sM-{display:flex;align-items:flex-start;justify-content:space-between;margin-top:2.6rem}@media(min-width:48em){.headerPartition_C7sM-{margin-top:4rem}}.headerPartitionLeft_8nPW9{min-width:0}.socialSlider_-8go\\+{overflow:hidden;color:#fff;background:#002f30}.preHeader_mvfuq{font-family:Lausanne,Arial,sans-serif;font-size:1.4rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem;margin-top:1.5rem}@media(min-width:48em){.preHeader_mvfuq{font-family:Lausanne,Arial,sans-serif;font-size:1.8rem;font-weight:600;line-height:2.5rem;letter-spacing:.1rem;margin-bottom:.5rem}}.header_PQU6n{overflow-wrap:break-word}@media(min-width:48em){.header_PQU6n{padding-right:2rem}}",""]),n.locals={sliderContainer:"sliderContainer_LtGNI",carousel:"carousel_CRZZz",slide:"slide_O9KgD",iconText:"iconText_ZVZBB",button:"button_cXko8",iconContainer:"iconContainer_V1ivF",headerPartition:"headerPartition_C7sM-",headerPartitionLeft:"headerPartitionLeft_8nPW9",socialSlider:"socialSlider_-8go+",preHeader:"preHeader_mvfuq",header:"header_PQU6n"},e.exports=n},905:function(e,t,r){"use strict";r.r(t);var n={props:{n:{type:Number,required:!0},nType:{type:Number,required:!0},items:{type:Array,default:()=>[]},header:{type:String,default:""},preHeader:{type:String,default:""},iconText:{type:String,default:""},instaLink:{type:Object,default:()=>{}}}},o=r(810),l=r(5);var component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("BaseSpacing",{attrs:{"inner-space":"","no-padding":""}},[r("div",{class:e.$style.socialSlider},[r("BaseContainer",[r("div",{class:e.$style.headerPartition},[r("div",{class:e.$style.headerPartitionLeft},[e.preHeader?r("p",{class:e.$style.preHeader},[e._v(e._s(e.preHeader))]):e._e(),e.header?r("h2",{class:e.$style.header},[e._v(e._s(e.header))]):e._e()]),e.$prismic.hasUrl(e.instaLink)?r("BaseLink",{class:e.$style.button,attrs:{"aria-label":e.iconText||"instagram",smart:e.instaLink.url,target:e.instaLink.target,"data-tracking-id":"social-component-"+e.nType+"-instagram-link"}},[r("div",{class:e.$style.iconContainer},[r("BaseIcon",{attrs:{name:"instagram"}})],1),e.iconText?r("p",{class:e.$style.iconText},[e._v(e._s(e.iconText))]):e._e()]):e._e()],1)]),e.items&&e.items.length>0?r("BaseContainer",{attrs:{"no-padding":""}},[r("div",{class:e.$style.sliderContainer},[r("div",{class:e.$style.carousel},[r("SharedCarousel",{attrs:{slides:e.items,loop:"","per-page":{small:3,large:5}},scopedSlots:e._u([{key:"slide",fn:function(t){var n=t.slide;return[r("div",{class:e.$style.slide},[r("BaseImage",{attrs:{aspect:1,image:n.image,sizes:{all:"calc(100vw - 19.6rem)",small:"calc((100vw + 8rem) / 3)",medium:"calc((100vw + 17rem) / 3)",large:"calc((100vw + 17rem) / 5)",xlarge:"32.2rem"},critical:e.n<2}})],1)]}}],null,!1,2032699102)})],1)])]):e._e()],1)])}),[],!1,(function(e){this.$style=o.default.locals||o.default}),null,null);t.default=component.exports;installComponents(component,{SharedCarousel:r(448).default})}}]);