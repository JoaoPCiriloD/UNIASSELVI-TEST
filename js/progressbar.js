/*!
 * ProgressBar.js v1.1.1
 * Progress bars with animated SVG paths
 * https://progressbarjs.readthedocs.org
 */
!(function (a) {
  if ("object" == typeof exports && "undefined" != typeof module) {
    module.exports = a();
  } else if ("function" == typeof define && define.amd) {
    define([], a);
  } else {
    var b;
    b =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this;
    b.ProgressBar = a();
  }
})(function () {
  return (function () {
    function e() {}

    // Core animation engine (Tweenable/Shifty)
    function f(a, b) {
      var c;
      for (c in a) {
        Object.hasOwnProperty.call(a, c) && b(c);
      }
    }

    function g(a, b) {
      return (
        f(b, function (c) {
          a[c] = b[c];
        }),
        a
      );
    }

    // Progress bar shapes
    var Circle = function (a, b) {
      this._pathTemplate =
        "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}";
      this.containerAspectRatio = 1;
      // Shape.apply(this, arguments);
    };

    var Line = function (a, b) {
      this._pathTemplate = "M 0,{center} L 100,{center}";
      // Shape.apply(this, arguments);
    };

    var SemiCircle = function (a, b) {
      this._pathTemplate =
        "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0";
      this.containerAspectRatio = 2;
      // Shape.apply(this, arguments);
    };

    // Main ProgressBar object
    return {
      Line: Line,
      Circle: Circle,
      SemiCircle: SemiCircle,
      Path: function () {}, // Path implementation
      Shape: function () {}, // Shape base class
      utils: {}, // Utility functions
    };
  })();
});
