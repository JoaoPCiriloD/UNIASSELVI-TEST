/*!
 * Lazysizes - v5.3.2
 * A fast & lightweight lazyload library
 * https://github.com/aFarkas/lazysizes
 */
!(function (a, b) {
  var c = b(a, a.document);
  a.lazySizes = c;
  "object" == typeof module && module.exports && (module.exports = c);
})("undefined" != typeof window ? window : {}, function (a, b) {
  "use strict";
  var c, d;

  // Configuration defaults
  if (
    ((function () {
      var b,
        c = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: !0,
          expFactor: 1.5,
          hFac: 0.8,
          loadMode: 2,
          loadHidden: !0,
          ricTimeout: 0,
          throttleDelay: 125,
        };

      d = a.lazySizesConfig || a.lazysizesConfig || {};
      for (b in c) {
        b in d || (d[b] = c[b]);
      }
    })(),
    !b || !b.getElementsByClassName)
  ) {
    return {
      init: function () {},
      cfg: d,
      noSupport: !0,
    };
  }

  // Core variables and functions
  var e = b.documentElement,
    f = a.Date,
    g = a.HTMLPictureElement,
    h = "addEventListener",
    i = "getAttribute",
    j = a[h],
    k = a.setTimeout,
    l = a.requestAnimationFrame || k,
    m = a.requestIdleCallback,
    n = /^picture$/i,
    o = ["load", "error", "lazyincluded", "_lazyloaded"],
    p = {},
    q = Array.prototype.forEach;

  // Utility functions
  var r = function (a, b) {
    return (
      p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")),
      p[b].test(a[i]("class") || "") && p[b]
    );
  };

  var s = function (a, b) {
    r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
  };

  var t = function (a, b) {
    var c;
    (c = r(a, b)) &&
      a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
  };

  // More functions...
  // [Rest of the lazysizes implementation would continue here]

  return c;
});
