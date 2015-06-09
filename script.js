var defs = {

  teamColor: ["#ff4444", "#00aaff"],

  frozenSprite: [193, 86, 11, 19],

  buttons: {
    "fighter": [4, 345, 64, 64],
    "speed": [132, 345, 64, 64],
    "life": [68, 345, 64, 64],
    "damage": [196, 345, 64, 64]
  },

  ships: {

    "fighter": {

      preference: ["small"],
      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [407, 18, 32, 32],
      price: 1,
      speed: 80

    },

    "freelancer": {

      cooldown: 0.5,
      damage: 1,
      hp: 10,
      sprite: [367, 59, 31, 32],
      speed: 80

    },


    "creep1": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 4,
      sprite: [444, 23, 22, 21],
      price: 5,
      speed: 60

    },

    "creep2": {

      preference: ["big"],
      damage: 2,
      cooldown: 2,
      hp: 10,
      sprite: [471, 23, 32, 23],
      price: 5,
      speed: 80

    },

    "creep3": {

      preference: ["big"],
      damage: 4,
      cooldown: 2,
      hp: 30,
      sprite: [503, 19, 32, 29],
      price: 5,
      speed: 50

    },

    "creep4": {

      preference: ["big"],
      damage: 6,
      cooldown: 2,
      hp: 50,
      sprite: [535, 18, 32, 32],
      price: 5,
      speed: 50

    },

    "boss": {

      damage: 10,
      cooldown: 2,
      hp: 500,
      sprite: [456, 53, 64, 64],
      speed: 32,
      boss: true

    }

  },

  tooltips: {

    "fighter": "build a fighter",
    "speed": "upgrade fighters speed",
    "life": "upgrade fighters life",
    "damage": "upgrade fighters damage"

  },

  bonuses: {
    shield: "asteroids shield",
    laser: "cursor laser",
    magnet: "coin magnet"
  },


  downloadLinks: {

    "ffdev": ["Learn more about Performance Tools in Developer Edition", "https://hacks.mozilla.org/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=learn-perf-tools"],
    "default": ["Get Firefox Developer Edition to try out the new performance tools", "https://www.mozilla.org/firefox/developer/?utm_source=codepen&utm_medium=referral&utm_campaign=firefox-developer-game&utm_content=game-promo"]

  }

};
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new
Date();a=s.createElement(o),

m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-49796218-26', 'auto');
ga('send', 'pageview');
var Utils = {

  extend: function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  circWrap: function(val) {

    return this.wrap(val, 0, Math.PI * 2);

  },

  wrap: function(value, min, max) {

    if (value < min) return max + (value % max);
    if (value >= max) return value % max;
    return value;

  },

  wrapTo: function(value, target, max, step) {

    if (value === target) return target;

    var result = value;

    var d = this.wrappedDistance(value, target, max);

    if (Math.abs(d) < step) return target;

    result += (d < 0 ? -1 : 1) * step;

    if (result > max) {
      result = result - max;
    } else if (result < 0) {
      result = max + result;
    }

    return result;

  },

  circWrapTo: function(value, target, step) {

    return this.wrapTo(value, target, Math.PI * 2, step);

  },

  circDistance: function(a, b) {

    return this.wrappedDistance(a, b, Math.PI * 2);

  },

  wrappedDistance: function(a, b, max) {

    if (a === b) return 0;
    else if (a < b) {
      var l = -a - max + b;
      var r = b - a;
    } else {
      var l = b - a;
      var r = max - a + b;
    }

    if (Math.abs(l) > Math.abs(r)) return r;
    else return l;

  },

  random: function(a, b) {

    if (a === undefined) {

      return Math.random();

    } else if (b !== undefined) {

      return Math.floor(a + Math.random() * Math.abs(b - a + 1));

    } else {

      if (a instanceof Array) return a[(a.length + 1) * Math.random() - 1 | 0];
      else {
        return a[this.random(Object.keys(a))];
      }

    }

  },

  sincos: function(angle, radius) {

    if (arguments.length === 1) {
      radius = angle;
      angle = Math.random() * 6.28;
    }

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  },

  ground: function(num, threshold) {

    return (num / threshold | 0) * threshold;

  },

  shuffle: function(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },

  sign: function(value) {

    return value / Math.abs(value);

  },

  moveTo: function(value, target, step) {

    if (value < target) {
      value += step;
      if (value > target) value = target;
    }

    if (value > target) {
      value -= step;
      if (value < target) value = target;
    }

    return value;

  },

  interval: function(key, interval, object) {

    if (!object.throttles) object.throttles = {};
    if (!object.throttles[key]) object.throttles[key] = object.lifetime - interval;

    if (object.lifetime - object.throttles[key] >= interval) {
      object.throttles[key] = object.lifetime;
      return true;
    } else return false;

  },

  moveInDirection: function(direction, value) {

    this.x += Math.cos(direction) * value;
    this.y += Math.sin(direction) * value;

  },

  osc: function(time, period) {

    return Math.sin(Math.PI * (time % period / period));

  },

  filter: function(array, test) {

    var result = [];

    for (var i = 0; i < array.length; i++) {
      if (test(array[i])) result.push(array[i]);
    }

    return result;

  },

  rectInRect: function(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return !(r2x > r1x + r1w ||
      r2x + r2w < r1x ||
      r2y > r1y + r1h ||
      r2y + r2h < r1y);
  }



};
/* file: license.txt */

/*

  PlaygroundJS r4

  http://playgroundjs.com

  (c) 2012-2015 http://rezoner.net

  Playground may be freely distributed under the MIT license.

  latest major changes:

  r4

  + tweens with events
  + context argument for events

  r3

  + pointer = mouse + touch

*/


/* file: src/lib/Ease.js */

/*

  Ease 1.0

  http://canvasquery.com

  (c) 2015 by Rezoner - http://rezoner.net

  `ease` may be freely distributed under the MIT license.

*/

(function() {

  var ease = function(progress, easing) {

    if (typeof ease.cache[easing] === "function") {

      return ease.cache[easing](progress);

    } else {

      return ease.spline(progress, easing || ease.defaultEasing);

    }

  };

  var extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  extend(ease, {

    defaultEasing: "016",

    cache: {

      linear: function(t) {
        return t
      },

      inQuad: function(t) {
        return t * t
      },
      outQuad: function(t) {
        return t * (2 - t)
      },
      inOutQuad: function(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
      inCubic: function(t) {
        return t * t * t
      },
      outCubic: function(t) {
        return (--t) * t * t + 1
      },
      inOutCubic: function(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      inQuart: function(t) {
        return t * t * t * t
      },
      outQuart: function(t) {
        return 1 - (--t) * t * t * t
      },
      inOutQuart: function(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
      },
      inQuint: function(t) {
        return t * t * t * t * t
      },
      outQuint: function(t) {
        return 1 + (--t) * t * t * t * t
      },
      inOutQuint: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
      },
      inSine: function(t) {
        return -1 * Math.cos(t / 1 * (Math.PI * 0.5)) + 1;
      },
      outSine: function(t) {
        return Math.sin(t / 1 * (Math.PI * 0.5));
      },
      inOutSine: function(t) {
        return -1 / 2 * (Math.cos(Math.PI * t) - 1);
      },
      inExpo: function(t) {
        return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
      },
      outExpo: function(t) {
        return (t == 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
      },
      inOutExpo: function(t) {
        if (t == 0) return 0;
        if (t == 1) return 1;
        if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
        return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
      },
      inCirc: function(t) {
        return -1 * (Math.sqrt(1 - t * t) - 1);
      },
      outCirc: function(t) {
        return Math.sqrt(1 - (t = t - 1) * t);
      },
      inOutCirc: function(t) {
        if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
        return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      inElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      },
      outElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if (t == 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
      },
      inOutElastic: function(t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t == 0) return 0;
        if ((t /= 1 / 2) == 2) return 1;
        if (!p) p = (0.3 * 1.5);
        if (a < 1) {
          a = 1;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
      },
      inBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * t * t * ((s + 1) * t - s);
      },
      outBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
      },
      inOutBack: function(t, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
        return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
      },
      inBounce: function(t) {
        return 1 - this.outBounce(1 - t);
      },
      outBounce: function(t) {
        if ((t /= 1) < (1 / 2.75)) {
          return (7.5625 * t * t);
        } else if (t < (2 / 2.75)) {
          return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
        } else if (t < (2.5 / 2.75)) {
          return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
        } else {
          return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
        }
      },
      inOutBounce: function(t) {
        if (t < 1 / 2) return this.inBounce(t * 2) * 0.5;
        return this.outBounce(t * 2 - 1) * 0.5 + 0.5;
      }
    },

    translateEasing: function(key) {

      if (!this.cache[key]) {
        var array = key.split('');

        var sign = 1;
        var signed = false;

        for (var i = 0; i < array.length; i++) {

          var char = array[i];

          if (char === "-") {
            sign = -1;
            signed = true;
            array.splice(i--, 1);
          } else if (char === "+") {
            sign = 1;
            array.splice(i--, 1);
          } else array[i] = parseInt(array[i], 16) * sign;

        }

        var min = Math.min.apply(null, array);
        var max = Math.max.apply(null, array);
        var diff = max - min;
        var cache = [];
        var normalized = [];

        for (var i = 0; i < array.length; i++) {
          if (signed) {
            var diff = Math.max(Math.abs(min), Math.abs(max))
            normalized.push((array[i]) / diff);
          } else {
            var diff = max - min;
            normalized.push((array[i] - min) / diff);
          }
        }

        this.cache[key] = normalized;

      }

      return this.cache[key]

    },

    /*

      Cubic-spline interpolation by Ivan Kuckir

      http://blog.ivank.net/interpolation-with-cubic-splines.html

      With slight modifications by Morgan Herlocker

      https://github.com/morganherlocker/cubic-spline

    */

    splineK: {},
    splineX: {},
    splineY: {},

    insertIntermediateValues: function(a) {
      var result = [];
      for (var i = 0; i < a.length; i++) {
        result.push(a[i]);

        if (i < a.length - 1) result.push(a[i + 1] + (a[i] - a[i + 1]) * 0.6);
      }

      return result;
    },

    spline: function(x, key) {

      if (!this.splineK[key]) {

        var xs = [];
        var ys = this.translateEasing(key);

        // ys = this.insertIntermediateValues(ys);

        if (!ys.length) return 0;

        for (var i = 0; i < ys.length; i++) xs.push(i * (1 / (ys.length - 1)));

        var ks = xs.map(function() {
          return 0
        });

        ks = this.getNaturalKs(xs, ys, ks);

        this.splineX[key] = xs;
        this.splineY[key] = ys;
        this.splineK[key] = ks;

      }

      if (x > 1) return this.splineY[key][this.splineY[key].length - 1];

      var ks = this.splineK[key];
      var xs = this.splineX[key];
      var ys = this.splineY[key];

      var i = 1;

      while (xs[i] < x) i++;

      var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
      var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
      var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
      var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);

      /*
      var py = ys[i - 2];
      var cy = ys[i - 1];
      var ny = (i < ys.length - 1) ? ys[i] : ys[i - 1];

      if (q > ny) {
        var diff = (q - py);
        //q = py + diff;

      }

    if (cy === ny && cy === py) q = py;
    */


      return q;
    },

    getNaturalKs: function(xs, ys, ks) {
      var n = xs.length - 1;
      var A = this.zerosMat(n + 1, n + 2);

      for (var i = 1; i < n; i++) // rows
      {
        A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
        A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
        A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
        A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
      }

      A[0][0] = 2 / (xs[1] - xs[0]);
      A[0][1] = 1 / (xs[1] - xs[0]);
      A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

      A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
      A[n][n] = 2 / (xs[n] - xs[n - 1]);
      A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

      return this.solve(A, ks);
    },

    solve: function(A, ks) {
      var m = A.length;
      for (var k = 0; k < m; k++) // column
      {
        // pivot for column
        var i_max = 0;
        var vali = Number.NEGATIVE_INFINITY;
        for (var i = k; i < m; i++)
          if (A[i][k] > vali) {
            i_max = i;
            vali = A[i][k];
          }
        this.splineSwapRows(A, k, i_max);

        // for all rows below pivot
        for (var i = k + 1; i < m; i++) {
          for (var j = k + 1; j < m + 1; j++)
            A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
          A[i][k] = 0;
        }
      }
      for (var i = m - 1; i >= 0; i--) // rows = columns
      {
        var v = A[i][m] / A[i][i];
        ks[i] = v;
        for (var j = i - 1; j >= 0; j--) // rows
        {
          A[j][m] -= A[j][i] * v;
          A[j][i] = 0;
        }
      }
      return ks;
    },

    zerosMat: function(r, c) {
      var A = [];
      for (var i = 0; i < r; i++) {
        A.push([]);
        for (var j = 0; j < c; j++) A[i].push(0);
      }
      return A;
    },

    splineSwapRows: function(m, k, l) {
      var p = m[k];
      m[k] = m[l];
      m[l] = p;
    }
  });

  window.ease = ease;

})();


/* file: src/Playground.js */

PLAYGROUND = {};

function playground(args) {

  return new PLAYGROUND.Application(args);

};

/* file: src/Utils.js */

PLAYGROUND.Utils = {

  extend: function() {

    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];

  },

  merge: function(a) {

    for (var i = 1; i < arguments.length; i++) {

      var b = arguments[i];

      for (var key in b) {

        var value = b[key];

        if (typeof a[key] !== "undefined") {
          if (typeof a[key] === "object") this.merge(a[key], value);
          else a[key] = value;
        } else {
          a[key] = value;
        }
      }
    }
    return a;

  },

  invoke: function(object, methodName) {

    var args = Array.prototype.slice.call(arguments, 2);

    for (var i = 0; i < object.length; i++) {
      var current = object[i];

      if (current[methodName]) current[methodName].apply(current, args);

    }

  },

  throttle: function(fn, threshold) {
    threshold || (threshold = 250);
    var last,
      deferTimer;
    return function() {
      var context = this;

      var now = +new Date,
        args = arguments;
      if (last && now < last + threshold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  }

};

PLAYGROUND.Utils.ease = ease;


/* file: src/Events.js */

PLAYGROUND.Events = function() {

  this.listeners = {};

};

PLAYGROUND.Events.prototype = {

  on: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: false,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  once: function(event, callback, context) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.once(key, event[key], context)
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    var listener = {
      once: true,
      callback: callback,
      context: context
    };

    this.listeners[event].push(listener);

    return listener;
  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {

      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {

        var listener = this.listeners["event"][i];

        listener.callback.call(listener.context || this, event, data);

      }

    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {

        var listener = this.listeners[event][i];

        listener.callback.call(listener.context || this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};

/* file: src/States.js */

PLAYGROUND.States = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  app.on("step", this.step.bind(this));

};

PLAYGROUND.States.prototype = {

  step: function(delta) {

    if (!this.next) return;

    if (this.current && this.current.locked) return;

    var state = this.next;

    if (typeof state === "function") state = new state;

    /* create state if object has never been used as a state before */

    if (!state.__created) {

      state.__created = true;

      state.app = this.app;

      this.trigger("createstate", {
        state: state
      });

      if (state.create) state.create();

    }

    /* enter new state */

    if (this.current) {
      this.trigger("leavestate", {
        prev: this.current,
        next: state,
        state: this.current
      });
    }

    this.trigger("enterstate", {
      prev: this.current,
      next: state,
      state: state
    });

    this.current = state;

    if (this.current && this.current.enter) {
      this.current.enter();
    }

    this.app.state = this.current;

    this.next = false;


  },

  set: function(state) {

    if (this.current && this.current.leave) this.current.leave();

    this.next = state;

    this.step(0);

  }


};

PLAYGROUND.Utils.extend(PLAYGROUND.States.prototype, PLAYGROUND.Events.prototype);

/* file: src/Application.js */

PLAYGROUND.Application = function(args) {

  var app = this;

  /* events */

  PLAYGROUND.Events.call(this);

  /* defaults */

  PLAYGROUND.Utils.merge(this, this.defaults, args);

  /* guess scaling mode */

  this.autoWidth = this.width ? false : true;
  this.autoHeight = this.height ? false : true;
  this.autoScale = this.scale ? false : true;

  /* get container */

  if (!this.container) this.container = document.body;

  if (this.container !== document.body) this.customContainer = true;

  if (typeof this.container === "string") this.container = document.querySelector(this.container);

  this.updateSize();

  /* events */

  // this.emitLocalEvent = this.emitLocalEvent.bind(this);
  // this.emitGlobalEvent = this.emitGlobalEvent.bind(this);

  /* states manager */

  this.states = new PLAYGROUND.States(this);
  this.states.on("event", this.emitLocalEvent, this);

  /* mouse */

  this.mouse = new PLAYGROUND.Mouse(this, this.container);
  this.mouse.on("event", this.emitGlobalEvent, this);

  /* touch */

  this.touch = new PLAYGROUND.Touch(this, this.container);
  this.touch.on("event", this.emitGlobalEvent, this);

  /* keyboard */

  this.keyboard = new PLAYGROUND.Keyboard();
  this.keyboard.on("event", this.emitGlobalEvent, this);

  /* gamepads */

  this.gamepads = new PLAYGROUND.Gamepads(this);
  this.gamepads.on("event", this.emitGlobalEvent, this);

  /* tweens */

  this.tweens = new PLAYGROUND.TweenManager(this);

  /* ease */

  this.ease = PLAYGROUND.Utils.ease;

  /* sound */

  PLAYGROUND.Sound(this);

  /* window resize */

  window.addEventListener("resize", this.handleResize.bind(this));

  /* visilibitychange */

  document.addEventListener("visibilitychange", function() {
    var hidden = document.visibilityState == 'hidden';
    app.emitGlobalEvent("visibilitychange", hidden);
  });

  /* assets containers */

  this.images = {};
  this.atlases = {};
  this.data = {};

  this.loader = new PLAYGROUND.Loader(this);

  this.loadFoo(0.25);

  /* create plugins in the same way */

  this.plugins = [];

  for (var key in PLAYGROUND) {

    var property = PLAYGROUND[key];

    if (property.plugin) this.plugins.push(new property(this));

  }

  /* flow */

  this.emitGlobalEvent("preload");

  this.firstBatch = true;

  function onPreloadEnd() {

    app.loadFoo(0.25);

    /* run everything in the next frame */

    setTimeout(function() {

      app.emitLocalEvent("create");

      app.setState(PLAYGROUND.DefaultState);
      app.handleResize();
      app.setState(PLAYGROUND.LoadingScreen);

      /* game loop */

      PLAYGROUND.GameLoop(app);

    });

    /* stage proper loading step */

    app.loader.once("ready", function() {

      app.firstBatch = false;

      app.setState(PLAYGROUND.DefaultState);

      app.emitLocalEvent("ready");
      app.handleResize();


    });


  };


  this.loader.once("ready", onPreloadEnd);

};

PLAYGROUND.Application.prototype = {

  defaults: {
    smoothing: 1,
    paths: {
      base: "",
      images: "images/"
    },
    offsetX: 0,
    offsetY: 0
  },

  setState: function(state) {

    this.states.set(state);

  },

  getPath: function(to) {

    return this.paths.base + (this.paths[to] || (to + "/"));

  },

  getAssetEntry: function(path, folder, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var folder = this.paths[folder] || (folder + "/");

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.paths.base + folder + basename,
      path: this.paths.base + folder + path,
      ext: ext
    };

  },

  /* events that shouldn't flow down to the state */

  emitLocalEvent: function(event, data) {

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

  },

  /* events that should be passed to the state */

  emitGlobalEvent: function(event, data) {

    if (!this.state) return this.emitLocalEvent(event, data);

    this.trigger(event, data);

    if ((!this.firstBatch || this.loader.ready) && this.event) this.event(event, data);

    if ((!this.firstBatch || this.loader.ready) && this[event]) this[event](data);

    if (this.state.event) this.state.event(event, data);

    if (this.state[event]) this.state[event](data);

    this.trigger("post" + event, data);

    // if (this.state.proxy) this.state.proxy(event, data);

  },

  updateSize: function() {

    if (this.customContainer) {

      var containerWidth = this.container.offsetWidth;
      var containerHeight = this.container.offsetHeight;

    } else {

      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight;

    }

    if (!this.autoScale && !this.autoWidth && !this.autoHeight) {

    } else if (!this.autoHeight && this.autoWidth) {

      if (this.autoScale) this.scale = containerHeight / this.height;

      this.width = Math.ceil(containerWidth / this.scale);

    } else if (!this.autoWidth && this.autoHeight) {

      if (this.autoScale) this.scale = containerWidth / this.width;

      this.height = Math.ceil(containerHeight / this.scale);


    } else if (this.autoWidth && this.autoHeight && this.autoScale) {

      this.scale = 1;
      this.width = containerWidth;
      this.height = containerHeight;

    } else if (this.autoWidth && this.autoHeight) {

      this.width = Math.ceil(containerWidth / this.scale);
      this.height = Math.ceil(containerHeight / this.scale);

    } else {

      this.scale = Math.min(containerWidth / this.width, containerHeight / this.height);

    }

    this.offsetX = (containerWidth - this.width * this.scale) / 2 | 0;
    this.offsetY = (containerHeight - this.height * this.scale) / 2 | 0;

    this.center = {
      x: this.width / 2 | 0,
      y: this.height / 2 | 0
    };

  },

  handleResize: PLAYGROUND.Utils.throttle(function() {

    this.updateSize();

    this.mouse.handleResize();
    this.touch.handleResize();

    this.emitGlobalEvent("resize", {});

  }, 16),

  /*
    request a file over http
    it shall be later an abstraction using 'fs' in node-webkit

    returns a promise
  */

  request: function(url) {

    function promise(success, fail) {

      var request = new XMLHttpRequest();

      var app = this;

      request.open("GET", url, true);

      request.onload = function(event) {

        var xhr = event.target;

        if (xhr.status !== 200 && xhr.status !== 0) {

          return fail(new Error("Failed to get " + url));

        }

        success(xhr);

      }

      request.send();

    }

    return new Promise(promise);

  },

  /* imaginary timeout to delay loading */

  loadFoo: function(timeout) {

    var loader = this.loader;

    this.loader.add("foo " + timeout);

    setTimeout(function() {
      loader.success("foo " + timeout);
    }, timeout * 1000);

  },

  /* data/json */

  loadData: function() {

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      if (typeof arg === "object") {

        for (var key in arg) this.loadData(arg[key]);

      } else {

        this.loadDataItem(arg);

      }

    }

  },

  loadDataItem: function(name) {

    var entry = this.getAssetEntry(name, "data", "json");

    var app = this;

    this.loader.add();

    this.request(entry.url).then(processData);

    function processData(request) {

      if (entry.ext === "json") {
        app.data[entry.key] = JSON.parse(request.responseText);
      } else {
        app.data[entry.key] = request.responseText;
      }

      app.loader.success(entry.url);

    }

  },

  /* images */

  loadImage: function() {

    return this.loadImages.apply(this, arguments);

  },

  loadImages: function() {

    var promises = [];

    for (var i = 0; i < arguments.length; i++) {

      var arg = arguments[i];

      /* polymorphism at its finest */

      if (typeof arg === "object") {

        for (var key in arg) promises = promises.concat(this.loadImages(arg[key]));

      } else {

        promises.push(this.loadOneImage(arg));

      }

    }

    return Promise.all(promises);

  },

  loadOneImage: function(name) {

    var app = this;

    if (!this._imageLoaders) this._imageLoaders = {};

    if (!this._imageLoaders[name]) {

      var promise = function(resolve, reject) {

        /* if argument is not an object/array let's try to load it */

        var loader = app.loader;

        var entry = app.getAssetEntry(name, "images", "png");

        app.loader.add(entry.path);

        var image = app.images[entry.key] = new Image;

        image.addEventListener("load", function() {

          resolve(image);
          loader.success(entry.url);

        });

        image.addEventListener("error", function() {

          reject("can't load " + entry.url);
          loader.error(entry.url);

        });

        image.src = entry.url;

      };

      app._imageLoaders[name] = new Promise(promise);

    }

    return this._imageLoaders[name];

  },

  render: function() {

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Application.prototype, PLAYGROUND.Events.prototype);



/* file: src/GameLoop.js */

PLAYGROUND.GameLoop = function(app) {

  app.lifetime = 0;
  app.ops = 0;
  app.opcost = 0;

  var lastTick = Date.now();
  var frame = 0;
  var unbounded = false;

  function render(dt) {

    app.emitGlobalEvent("render", dt)
    app.emitGlobalEvent("postrender", dt)

  };

  function step(dt) {

    app.emitGlobalEvent("step", dt)

  };

  function gameLoop() {
    if (requestId == 0) { // Window is blurred
      return;
    }

    if (!app.unbound) {
      if (app.immidiate) {
        setZeroTimeout(gameLoop);
      } else {
        requestId = requestAnimationFrame(gameLoop);
      }
    }

    var delta = Date.now() - lastTick;

    lastTick = Date.now();

    if (app.unbound) {
      delta = 20;
    }

    if (delta > 1000) return;

    var dt = delta / 1000;

    app.lifetime += dt;
    app.elapsed = dt;

    step(dt);

    render(dt);

    if (app.unbound && !unbounded) {
      unbounded = true;
      while (app.unbound) {
        gameLoop();
      }
      unbounded = false;
    }

  };

  window.addEventListener('blur', function() {
    if (requestId != 0) {
      cancelAnimationFrame(requestId);
      app.emitGlobalEvent("visibilitychange", true);
      requestId = 0;
    }
  });

  window.addEventListener('focus', function() {
    if (!requestId) {
      requestId = requestAnimationFrame(gameLoop);
      app.emitGlobalEvent("visibilitychange", false);
    }
  });

  var requestId = requestAnimationFrame(gameLoop);

};

// Copyright dbaron, via http://dbaron.org/log/20100309-faster-timeouts
// Only add setZeroTimeout to the window object, and hide everything
// else in a closure.
(function() {
  var timeouts = [];
  var messageName = "zero-timeout-message";

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, "*");
  }

  function handleMessage(event) {

    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }

  }

  window.addEventListener("message", handleMessage, true);

  // Add the one thing we want added to the window object.
  window.setZeroTimeout = setZeroTimeout;
})();

/* file: src/Gamepads.js */

PLAYGROUND.Gamepads = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.getGamepads = navigator.getGamepads || navigator.webkitGetGamepads;

  this.gamepadmoveEvent = {};
  this.gamepaddownEvent = {};
  this.gamepadupEvent = {};

  this.gamepads = {};

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.Gamepads.prototype = {

  buttons: {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "l1",
    5: "r1",
    6: "l2",
    7: "r2",
    8: "select",
    9: "start",
    12: "up",
    13: "down",
    14: "left",
    15: "right"
  },

  zeroState: function() {

    var buttons = [];

    for (var i = 0; i <= 15; i++) {
      buttons.push({
        pressed: false,
        value: 0
      });
    }

    return {
      axes: [],
      buttons: buttons
    };

  },

  createGamepad: function() {

    var result = {
      buttons: {},
      sticks: [{
        x: 0,
        y: 0
      }, {
        x: 0,
        y: 0
      }]
    };


    for (var i = 0; i < 16; i++) {
      var key = this.buttons[i];
      result.buttons[key] = false;
    }

    return result;

  },

  step: function() {

    if (!navigator.getGamepads) return;

    var gamepads = navigator.getGamepads();

    for (var i = 0; i < gamepads.length; i++) {

      var current = gamepads[i];

      if (!current) continue;

      if (!this[i]) this[i] = this.createGamepad();

      /* have to concat the current.buttons because the are read-only */

      var buttons = [].concat(current.buttons);

      /* hack for missing  dpads */

      for (var h = 12; h <= 15; h++) {
        if (!buttons[h]) buttons[h] = {
          pressed: false,
          value: 0
        };
      }

      var previous = this[i];

      /* axes (sticks) to buttons */

      if (current.axes) {

        if (current.axes[0] < 0) buttons[14].pressed = true;
        if (current.axes[0] > 0) buttons[15].pressed = true;
        if (current.axes[1] < 0) buttons[12].pressed = true;
        if (current.axes[1] > 0) buttons[13].pressed = true;

        previous.sticks[0].x = current.axes[0].value;
        previous.sticks[0].y = current.axes[1].value;
        previous.sticks[1].x = current.axes[2].value;
        previous.sticks[1].y = current.axes[3].value;

      }

      /* check buttons changes */

      for (var j = 0; j < buttons.length; j++) {

        var key = this.buttons[j];

        /* gamepad down */

        if (buttons[j].pressed && !previous.buttons[key]) {

          previous.buttons[key] = true;
          this.gamepaddownEvent.button = this.buttons[j];
          this.gamepaddownEvent.gamepad = i;
          this.trigger("gamepaddown", this.gamepaddownEvent);

        }

        /* gamepad up */
        else if (!buttons[j].pressed && previous.buttons[key]) {

          previous.buttons[key] = false;
          this.gamepadupEvent.button = this.buttons[j];
          this.gamepadupEvent.gamepad = i;
          this.trigger("gamepadup", this.gamepadupEvent);

        }

      }

    }

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Gamepads.prototype, PLAYGROUND.Events.prototype);


/* file: src/Keyboard.js */

PLAYGROUND.Keyboard = function() {

  PLAYGROUND.Events.call(this);

  this.keys = {};

  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
  document.addEventListener("keypress", this.keypress.bind(this));

  this.keydownEvent = {};
  this.keyupEvent = {};

  this.preventDefault = true;

};

PLAYGROUND.Keyboard.prototype = {

  keycodes: {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "slash",
    192: "graveaccent",
    219: "openbracket",
    220: "backslash",
    221: "closebraket",
    222: "singlequote"
  },

  keypress: function(e) {

  },

  keydown: function(e) {
    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    if (this.keys[keyName]) return;

    this.keydownEvent.key = keyName;
    this.keydownEvent.original = e;

    this.keys[keyName] = true;

    this.trigger("keydown", this.keydownEvent);

    if (this.preventDefault && document.activeElement === document.body) {
      e.returnValue = false;
      e.keyCode = 0;
      e.preventDefault();
      e.stopPropagation();
    }
  },

  keyup: function(e) {

    if (e.which >= 48 && e.which <= 90) var keyName = String.fromCharCode(e.which).toLowerCase();
    else var keyName = this.keycodes[e.which];

    this.keyupEvent.key = keyName;
    this.keyupEvent.original = e;

    this.keys[keyName] = false;

    this.trigger("keyup", this.keyupEvent);
  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Keyboard.prototype, PLAYGROUND.Events.prototype);



/* file: src/Pointer.js */

PLAYGROUND.Pointer = function(app) {

  this.app = app;

  app.on("touchstart", this.touchstart, this);
  app.on("touchend", this.touchend, this);
  app.on("touchmove", this.touchmove, this);

  app.on("mousemove", this.mousemove, this);
  app.on("mousedown", this.mousedown, this);
  app.on("mouseup", this.mouseup, this);

  this.pointers = app.pointers = {};

};

PLAYGROUND.Pointer.plugin = true;

PLAYGROUND.Pointer.prototype = {

  updatePointer: function(pointer) {

    this.pointers[pointer.id] = pointer;

  },

  removePointer: function(pointer) {

    delete this.pointers[pointer.id];

  },

  touchstart: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointerdown", e);

  },

  touchend: function(e) {

    e.touch = true;

    this.removePointer(e);

    this.app.emitGlobalEvent("pointerup", e);

  },

  touchmove: function(e) {

    e.touch = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousemove: function(e) {

    e.mouse = true;

    this.updatePointer(e);

    this.app.emitGlobalEvent("pointermove", e);

  },

  mousedown: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerdown", e);

  },

  mouseup: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerup", e);

  },

  mousewheel: function(e) {

    e.mouse = true;

    this.app.emitGlobalEvent("pointerwheel", e);

  }

};

/* file: src/Loader.js */

/* Loader */

PLAYGROUND.Loader = function(app) {

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.reset();

};

PLAYGROUND.Loader.prototype = {

  /* loader */

  add: function(id) {

    this.queue++;
    this.count++;
    this.ready = false;
    this.trigger("add", id);

    return id;

  },

  error: function(id) {

    this.trigger("error", id);

  },

  success: function(id) {

    this.queue--;

    this.progress = 1 - this.queue / this.count;

    this.trigger("load", id);

    if (this.queue <= 0) {
      this.trigger("ready");
      this.reset();
    }

  },

  reset: function() {

    this.progress = 0;
    this.queue = 0;
    this.count = 0;
    this.ready = true;

  }
};

PLAYGROUND.Utils.extend(PLAYGROUND.Loader.prototype, PLAYGROUND.Events.prototype);

/* file: src/Mouse.js */

PLAYGROUND.Mouse = function(app, element) {

  var self = this;

  this.app = app;

  PLAYGROUND.Events.call(this);

  this.element = element;

  this.buttons = {};

  this.preventContextMenu = true;

  this.mousemoveEvent = {};
  this.mousedownEvent = {};
  this.mouseupEvent = {};
  this.mousewheelEvent = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("mousemove", this.mousemove.bind(this));
  element.addEventListener("mousedown", this.mousedown.bind(this));
  element.addEventListener("mouseup", this.mouseup.bind(this));

  this.enableMousewheel();

  this.element.addEventListener("contextmenu", function(e) {
    if (self.preventContextMenu) e.preventDefault();
  });

  element.requestPointerLock = element.requestPointerLock ||
    element.mozRequestPointerLock ||
    element.webkitRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;


  this.handleResize();
};

PLAYGROUND.Mouse.prototype = {

  lock: function() {

    this.locked = true;
    this.element.requestPointerLock();

  },

  unlock: function() {

    this.locked = false;
    document.exitPointerLock();

  },

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  mousemove: PLAYGROUND.Utils.throttle(function(e) {

    this.x = this.mousemoveEvent.x = (e.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
    this.y = this.mousemoveEvent.y = (e.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

    this.mousemoveEvent.original = e;

    if (this.locked) {
      this.mousemoveEvent.movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;

      this.mousemoveEvent.movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
    }

    if (this.app.mouseToTouch) {
      //      if (this.left) {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("touchmove", this.mousemoveEvent);
      //      }
    } else {
      this.mousemoveEvent.id = this.mousemoveEvent.identifier = 255;
      this.trigger("mousemove", this.mousemoveEvent);
    }

  }, 16),

  mousedown: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mousedownEvent.x = this.mousemoveEvent.x;
    this.mousedownEvent.y = this.mousemoveEvent.y;
    this.mousedownEvent.button = buttonName;
    this.mousedownEvent.original = e;

    this[buttonName] = true;

    this.mousedownEvent.id = this.mousedownEvent.identifier = 255;

    if (this.app.mouseToTouch) {
      this.trigger("touchmove", this.mousedownEvent);
      this.trigger("touchstart", this.mousedownEvent);
    } else {
      this.trigger("mousedown", this.mousedownEvent);
    }

  },

  mouseup: function(e) {

    var buttonName = ["left", "middle", "right"][e.button];

    this.mouseupEvent.x = this.mousemoveEvent.x;
    this.mouseupEvent.y = this.mousemoveEvent.y;
    this.mouseupEvent.button = buttonName;
    this.mouseupEvent.original = e;

    this.mouseupEvent.id = this.mouseupEvent.identifier = 255;

    if (this.app.mouseToTouch) {

      this.trigger("touchend", this.mouseupEvent);

    } else {

      this.trigger("mouseup", this.mouseupEvent);

    }

    this[buttonName] = false;

  },

  mousewheel: function(e) {

    this.mousewheelEvent.x = this.mousemoveEvent.x;
    this.mousewheelEvent.y = this.mousemoveEvent.y;
    this.mousewheelEvent.button = ["none", "left", "middle", "right"][e.button];
    this.mousewheelEvent.original = e;
    this.mousewheelEvent.id = this.mousewheelEvent.identifier = 255;

    this[e.button] = false;

    this.trigger("mousewheel", this.mousewheelEvent);

  },


  enableMousewheel: function() {

    var eventNames = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var callback = this.mousewheel.bind(this);
    var self = this;

    for (var i = eventNames.length; i;) {

      self.element.addEventListener(eventNames[--i], PLAYGROUND.Utils.throttle(function(event) {

        var orgEvent = event || window.event,
          args = [].slice.call(arguments, 1),
          delta = 0,
          deltaX = 0,
          deltaY = 0,
          absDelta = 0,
          absDeltaXY = 0,
          fn;

        orgEvent.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
          delta = orgEvent.wheelDelta;
        }

        if (orgEvent.detail) {
          delta = orgEvent.detail * -1;
        }

        // New school wheel delta (wheel event)
        if (orgEvent.deltaY) {
          deltaY = orgEvent.deltaY * -1;
          delta = deltaY;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
          deltaY = orgEvent.wheelDeltaY;
        }

        var result = delta ? delta : deltaY;

        self.mousewheelEvent.x = self.mousemoveEvent.x;
        self.mousewheelEvent.y = self.mousemoveEvent.y;
        self.mousewheelEvent.delta = result / Math.abs(result);
        self.mousewheelEvent.original = orgEvent;

        callback(self.mousewheelEvent);

        orgEvent.preventDefault();

      }, 40), false);
    }

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Mouse.prototype, PLAYGROUND.Events.prototype);

/* file: src/Sound.js */

PLAYGROUND.Sound = function(app) {

  var audioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

  if (audioContext) {

    if (!PLAYGROUND.audioContext) PLAYGROUND.audioContext = new audioContext;

    app.audioContext = PLAYGROUND.audioContext;
    app.sound = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);
    app.music = new PLAYGROUND.SoundWebAudioAPI(app, app.audioContext);

  } else {

    app.sound = new PLAYGROUND.SoundAudio(app);
    app.music = new PLAYGROUND.SoundAudio(app);

  }

};

PLAYGROUND.Application.prototype.playSound = function(key, loop) {

  return this.sound.play(key, loop);

};

PLAYGROUND.Application.prototype.stopSound = function(sound) {

  this.sound.stop(sound);

};

PLAYGROUND.Application.prototype.loadSound = function() {

  return this.loadSounds.apply(this, arguments);

};

PLAYGROUND.Application.prototype.loadSounds = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadSounds(arg[key]);

    } else {
      this.sound.load(arg);
    }
  }

};

/* file: src/SoundWebAudioAPI.js */

PLAYGROUND.SoundWebAudioAPI = function(app, audioContext) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  this.context = audioContext;

  this.gainNode = this.context.createGain()
  this.gainNode.connect(this.context.destination);

  this.compressor = this.context.createDynamicsCompressor();
  this.compressor.connect(this.gainNode);

  this.output = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.pool = [];
  this.volume = 1.0;

  this.setMasterPosition(0, 0, 0);

  this.loops = [];

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.SoundWebAudioAPI.prototype = {

  buffers: {},
  aliases: {},

  alias: function(alias, source, volume, rate) {

    this.aliases[alias] = {
      source: source,
      volume: volume,
      rate: rate
    };

  },

  setMaster: function(volume) {

    this.volume = volume;

    this.gainNode.gain.value = volume;

  },

  load: function(file) {

    var entry = this.app.getAssetEntry(file, "sounds", this.audioFormat);

    var sampler = this;

    var request = new XMLHttpRequest();

    request.open("GET", entry.url, true);
    request.responseType = "arraybuffer";

    var id = this.app.loader.add(entry.url);

    request.onload = function() {

      sampler.context.decodeAudioData(this.response, function(decodedBuffer) {
        sampler.buffers[entry.key] = decodedBuffer;
        sampler.app.loader.success(entry.url);
      });

    }

    request.send();

  },

  cleanArray: function(array, property) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === null || (property && array[i][property])) {
        array.splice(i--, 1);
        len--;
      }
    }
  },

  setMasterPosition: function(x, y, z) {

    this.masterPosition = {
      x: x,
      y: y,
      z: z
    };

    this.context.listener.setPosition(x, y, z)
      // this.context.listener.setOrientation(0, 0, -1, 0, 1, 0);
      // this.context.listener.dopplerFactor = 1;
      // this.context.listener.speedOfSound = 343.3;
  },

  getSoundBuffer: function() {
    if (!this.pool.length) {
      for (var i = 0; i < 100; i++) {

        var buffer, gain, panner;

        var nodes = [
          buffer = this.context.createBufferSource(),
          gain = this.context.createGain(),
          panner = this.context.createPanner()
        ];

        panner.distanceModel = "linear";

        // 1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)
        // refDistance / (refDistance + rolloffFactor * (distance - refDistance))
        panner.refDistance = 1;
        panner.maxDistance = 600;
        panner.rolloffFactor = 1.0;


        // panner.setOrientation(-1, -1, 0);

        this.pool.push(nodes);

        nodes[0].connect(nodes[1]);
        // nodes[1].connect(nodes[2]);
        nodes[1].connect(this.output);
      }
    }

    return this.pool.pop();
  },

  play: function(name, loop) {

    var alias = this.aliases[name];

    var nodes = this.getSoundBuffer();

    if (alias) name = alias.source;

    bufferSource = nodes[0];
    bufferSource.gainNode = nodes[1];
    bufferSource.pannerNode = nodes[2];
    bufferSource.buffer = this.buffers[name];
    bufferSource.loop = loop || false;
    bufferSource.key = name;

    bufferSource.alias = alias;

    this.setVolume(bufferSource, 1.0);
    this.setPlaybackRate(bufferSource, 1.0);

    if (this.loop) {
      //  bufferSource.loopStart = this.loopStart;
      // bufferSource.loopEnd = this.loopEnd;
    }


    bufferSource.start(0);

    bufferSource.volumeLimit = 1;

    this.setPosition(bufferSource, this.masterPosition.x, this.masterPosition.y, this.masterPosition.z);

    return bufferSource;
  },

  stop: function(what) {

    if (!what) return;

    what.stop(0);

  },

  setPlaybackRate: function(sound, rate) {

    if (!sound) return;

    if (sound.alias) rate *= sound.alias.rate;

    return sound.playbackRate.value = rate;
  },

  setPosition: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);
  },

  setVelocity: function(sound, x, y, z) {

    if (!sound) return;

    sound.pannerNode.setPosition(x, y || 0, z || 0);

  },

  getVolume: function(sound) {

    if (!sound) return;

    return sound.gainNode.gain.value;

  },

  setVolume: function(sound, volume) {

    if (!sound) return;

    if (sound.alias) volume *= sound.alias.volume;

    return sound.gainNode.gain.value = Math.max(0, volume);
  },

  fadeOut: function(sound) {

    if (!sound) return;

    sound.fadeOut = true;

    this.loops.push(sound);

    return sound;

  },

  fadeIn: function(sound) {

    if (!sound) return;

    sound.fadeIn = true;

    this.loops.push(sound);
    this.setVolume(sound, 0);


    return sound;

  },

  step: function(delta) {

    for (var i = 0; i < this.loops.length; i++) {

      var loop = this.loops[i];

      if (loop.fadeIn) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume + delta * 0.5));

        if (volume >= 1.0) {
          this.loops.splice(i--, 1);
        }
      }

      if (loop.fadeOut) {
        var volume = this.getVolume(loop);
        volume = this.setVolume(loop, Math.min(1.0, volume - delta * 0.5));

        if (volume <= 0) {
          this.loops.splice(i--, 1);
          this.stop(loop);
        }
      }

    }

  }

};

/* file: src/SoundAudio.js */

PLAYGROUND.SoundAudio = function(app) {

  this.app = app;

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.app.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

};

PLAYGROUND.SoundAudio.prototype = {

  samples: {},

  setMaster: function(volume) {

    this.volume = volume;

  },

  setMasterPosition: function() {

  },

  setPosition: function(x, y, z) {
    return;
  },

  load: function(file) {

    var url = "sounds/" + file + "." + this.audioFormat;

    var loader = this.app.loader;

    this.app.loader.add(url);

    var audio = this.samples[file] = new Audio;

    audio.addEventListener("canplay", function() {
      loader.success(url);
    });

    audio.addEventListener("error", function() {
      loader.error(url);
    });

    audio.src = url;

  },

  play: function(key, loop) {

    var sound = this.samples[key];

    sound.currentTime = 0;
    sound.loop = loop;
    sound.play();

    return sound;

  },

  stop: function(what) {

    if (!what) return;

    what.pause();

  },

  step: function(delta) {

  },

  setPlaybackRate: function(sound, rate) {

    return;
  },

  setVolume: function(sound, volume) {

    sound.volume = volume * this.volume;

  },

  setPosition: function() {

  }

};

/* file: src/Touch.js */

PLAYGROUND.Touch = function(app, element) {

  PLAYGROUND.Events.call(this);

  this.app = app;

  this.element = element;

  this.buttons = {};

  this.touches = {};

  this.x = 0;
  this.y = 0;

  element.addEventListener("touchmove", this.touchmove.bind(this));
  element.addEventListener("touchstart", this.touchstart.bind(this));
  element.addEventListener("touchend", this.touchend.bind(this));

};

PLAYGROUND.Touch.prototype = {

  getElementOffset: function(element) {

    var offsetX = 0;
    var offsetY = 0;

    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    }

    while ((element = element.offsetParent));

    return {
      x: offsetX,
      y: offsetY
    };

  },

  handleResize: function() {

    this.elementOffset = this.getElementOffset(this.element);

  },

  touchmove: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      touchmoveEvent = {}

      this.x = touchmoveEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchmoveEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchmoveEvent.original = touch;
      touchmoveEvent.id = touchmoveEvent.identifier = touch.identifier;

      this.touches[touch.identifier].x = touchmoveEvent.x;
      this.touches[touch.identifier].y = touchmoveEvent.y;

      this.trigger("touchmove", touchmoveEvent);

    }

    e.preventDefault();

  },

  touchstart: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];

      var touchstartEvent = {}

      this.x = touchstartEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      this.y = touchstartEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchstartEvent.original = e.touch;
      touchstartEvent.id = touchstartEvent.identifier = touch.identifier;

      this.touches[touch.identifier] = {
        x: touchstartEvent.x,
        y: touchstartEvent.y
      };

      this.trigger("touchstart", touchstartEvent);

    }

    e.preventDefault();

  },

  touchend: function(e) {

    for (var i = 0; i < e.changedTouches.length; i++) {

      var touch = e.changedTouches[i];
      var touchendEvent = {};

      touchendEvent.x = (touch.pageX - this.elementOffset.x - this.app.offsetX) / this.app.scale | 0;
      touchendEvent.y = (touch.pageY - this.elementOffset.y - this.app.offsetY) / this.app.scale | 0;

      touchendEvent.original = touch;
      touchendEvent.id = touchendEvent.identifier = touch.identifier;

      delete this.touches[touch.identifier];

      this.trigger("touchend", touchendEvent);

    }

    e.preventDefault();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Touch.prototype, PLAYGROUND.Events.prototype);

/* file: src/Tween.js */

PLAYGROUND.Tween = function(manager, context) {

  PLAYGROUND.Events.call(this);

  this.manager = manager;
  this.context = context;

  PLAYGROUND.Utils.extend(this, {

    actions: [],
    index: -1,

    prevEasing: "045",
    prevDuration: 0.5

  });

  this.current = false;

};

PLAYGROUND.Tween.prototype = {

  add: function(properties, duration, easing) {

    if (duration) this.prevDuration = duration;
    else duration = 0.5;
    if (easing) this.prevEasing = easing;
    else easing = "045";

    this.actions.push([properties, duration, easing]);

    return this;

  },

  discard: function() {

    this.manager.discard(this.context, this);

    return this;

  },

  to: function(properties, duration, easing) {
    return this.add(properties, duration, easing);
  },

  loop: function() {

    this.looped = true;

    return this;

  },

  repeat: function(times) {

    this.actions.push(["repeat", times]);

  },

  wait: function(time) {

    this.actions.push(["wait", time]);

    return this;

  },

  delay: function(time) {

    this.actions.push(["wait", time]);

  },

  stop: function() {

    this.manager.remove(this);

    return this;

  },

  play: function() {

    this.manager.add(this);

    this.finished = false;

    return this;

  },


  end: function() {

    var lastAnimationIndex = 0;

    for (var i = this.index + 1; i < this.actions.length; i++) {
      if (typeof this.actions[i][0] === "object") lastAnimationIndex = i;
    }

    this.index = lastAnimationIndex - 1;
    this.next();
    this.delta = this.duration;
    this.step(0);

    return this;

  },

  forward: function() {

    this.delta = this.duration;
    this.step(0);

  },

  rewind: function() {

    this.delta = 0;
    this.step(0);

  },

  next: function() {

    this.delta = 0;

    this.index++;

    if (this.index >= this.actions.length) {

      if (this.looped) {

        this.trigger("loop", {
          tween: this
        });

        this.index = 0;
      } else {

        this.trigger("finished", {
          tween: this
        });

        this.finished = true;
        this.manager.remove(this);
        return;
      }
    }

    this.current = this.actions[this.index];

    if (this.current[0] === "wait") {

      this.duration = this.current[1];
      this.currentAction = "wait";

    } else {

      /* calculate changes */

      var properties = this.current[0];

      /* keep keys as array for 0.0001% performance boost */

      this.keys = Object.keys(properties);

      this.change = [];
      this.before = [];
      this.types = [];

      for (i = 0; i < this.keys.length; i++) {
        var key = this.keys[i];

        if (typeof this.context[key] === "number") {
          this.before.push(this.context[key]);
          this.change.push(properties[key] - this.context[key]);
          this.types.push(0);
        } else {
          var before = cq.color(this.context[key]);

          this.before.push(before);

          var after = cq.color(properties[key]);

          var temp = [];

          for (var j = 0; j < 3; j++) {
            temp.push(after[j] - before[j]);
          }

          this.change.push(temp);

          this.types.push(1);
        }

      }

      this.currentAction = "animate";

      this.duration = this.current[1];
      this.easing = this.current[2];

    }


  },

  prev: function() {

  },

  step: function(delta) {

    this.delta += delta;

    if (!this.current) this.next();

    switch (this.currentAction) {

      case "animate":
        this.doAnimate(delta);
        break;

      case "wait":
        this.doWait(delta);
        break;

    }

    if (this.onstep) this.onstep(this.context);

  },

  doAnimate: function(delta) {

    this.progress = Math.min(1, this.delta / this.duration);

    var mod = PLAYGROUND.Utils.ease(this.progress, this.easing);

    for (var i = 0; i < this.keys.length; i++) {

      var key = this.keys[i];

      switch (this.types[i]) {

        /* number */

        case 0:

          this.context[key] = this.before[i] + this.change[i] * mod;

          break;

          /* color */

        case 1:

          var change = this.change[i];
          var before = this.before[i];
          var color = [];

          for (var j = 0; j < 3; j++) {
            color.push(before[j] + change[j] * mod | 0);
          }

          this.context[key] = "rgb(" + color.join(",") + ")";

          break;
      }
    }

    if (this.progress >= 1) {
      this.next();
    }

  },

  doWait: function(delta) {

    if (this.delta >= this.duration) this.next();

  }

};

PLAYGROUND.Utils.extend(PLAYGROUND.Tween.prototype, PLAYGROUND.Events.prototype);

PLAYGROUND.TweenManager = function(app) {

  this.tweens = [];

  if (app) {
    this.app = app;
    this.app.tween = this.tween.bind(this);
  }

  this.delta = 0;

  this.app.on("step", this.step.bind(this));

};

PLAYGROUND.TweenManager.prototype = {

  defaultEasing: "128",

  discard: function(object, safe) {

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (tween.context === object && tween !== safe) this.remove(tween);

    }

  },

  tween: function(context) {

    var tween = new PLAYGROUND.Tween(this, context);

    this.add(tween);

    return tween;

  },

  step: function(delta) {

    this.delta += delta;

    for (var i = 0; i < this.tweens.length; i++) {

      var tween = this.tweens[i];

      if (!tween._remove) tween.step(delta);

      if (tween._remove) this.tweens.splice(i--, 1);

    }

  },

  add: function(tween) {

    tween._remove = false;

    var index = this.tweens.indexOf(tween);

    if (index === -1) this.tweens.push(tween);

  },

  remove: function(tween) {

    tween._remove = true;

  }

};

/* file: src/Atlases.js */

PLAYGROUND.Application.prototype.loadAtlases = function() {

  for (var i = 0; i < arguments.length; i++) {

    var arg = arguments[i];

    /* polymorphism at its finest */

    if (typeof arg === "object") {

      for (var key in arg) this.loadAtlases(arg[key]);

    } else {

      /* if argument is not an object/array let's try to load it */

      this._loadAtlas(arg)

    }
  }

};

PLAYGROUND.Application.prototype.loadAtlas = function() {

  return this.loadAtlases.apply(this, arguments);

};

PLAYGROUND.Application.prototype._loadAtlas = function(filename) {

  var entry = this.getAssetEntry(filename, "atlases", "png");

  this.loader.add(entry.url);

  var atlas = this.atlases[entry.key] = {};

  var image = atlas.image = new Image;

  image.addEventListener("load", function() {
    loader.success(entry.url);
  });

  image.addEventListener("error", function() {
    loader.error(entry.url);
  });

  image.src = entry.url;

  /* data */

  var request = new XMLHttpRequest();

  request.open("GET", entry.path + ".json", true);

  this.loader.add(entry.path + ".json");

  var loader = this.loader;

  request.onload = function() {

    var data = JSON.parse(this.response);

    atlas.frames = [];

    for (var i = 0; i < data.frames.length; i++) {
      var frame = data.frames[i];

      atlas.frames.push({
        region: [frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h],
        offset: [frame.spriteSourceSize.x || 0, frame.spriteSourceSize.y || 0],
        width: frame.sourceSize.w,
        height: frame.sourceSize.h
      });
    }

    loader.success(entry.path + ".json");

  }

  request.send();
};

/* file: src/Fonts.js */

PLAYGROUND.Application.prototype.loadFont = function(name) {

  var styleNode = document.createElement("style");
  styleNode.type = "text/css";

  var formats = {
    "woff": "woff",
    "ttf": "truetype"
  };

  var sources = "";

  for (var ext in formats) {
    var type = formats[ext];
    sources += " url(\"fonts/" + name + "." + ext + "\") format('" + type + "');"
  }

  styleNode.textContent = "@font-face { font-family: '" + name + "'; src: " + sources + " }";

  document.head.appendChild(styleNode);

  var layer = cq(32, 32);

  layer.font("10px Testing");
  layer.fillText(16, 16, 16).trim();

  var width = layer.width;
  var height = layer.height;

  this.loader.add("font " + name);

  var self = this;

  function check() {

    var layer = cq(32, 32);

    layer.font("10px " + name).fillText(16, 16, 16);
    layer.trim();

    if (layer.width !== width || layer.height !== height) {

      self.loader.ready("font " + name);

    } else {

      setTimeout(check, 250);

    }

  };

  check();

};

/* file: src/DefaultState.js */

PLAYGROUND.DefaultState = {

};

/* file: src/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  /* basic loading screen using DOM */

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
      self.createElements();
    });

    this.logo.src = this.logoRaw;

    this.background = "#000";

    if (window.getComputedStyle) {
      this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {

      if (this.animation.finished) {
        this.locked = false;
        this.wrapper.parentNode.removeChild(this.wrapper);
      }

    } else {

      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  createElements: function() {

    this.width = window.innerWidth * 0.6 | 0;
    this.height = window.innerHeight * 0.1 | 0;

    this.wrapper = document.createElement("div");
    this.wrapper.style.width = this.width + "px";
    this.wrapper.style.height = this.height + "px";
    this.wrapper.style.background = "#000";
    this.wrapper.style.border = "4px solid #fff";
    this.wrapper.style.position = "absolute";
    this.wrapper.style.left = (window.innerWidth / 2 - this.width / 2 | 0) + "px";
    this.wrapper.style.top = (window.innerHeight / 2 - this.height / 2 | 0) + "px";
    this.wrapper.style.zIndex = 100;

    this.app.container.appendChild(this.wrapper);

    this.progressBar = document.createElement("div");
    this.progressBar.style.width = "0%";
    this.progressBar.style.height = this.height + "px";
    this.progressBar.style.background = "#fff";

    this.wrapper.appendChild(this.progressBar);

  },


  render: function() {

    if (!this.ready) return;

    this.progressBar.style.width = (this.current * 100 | 0) + "%";


  }

};

/* file: src/lib/CanvasQuery.js */

/*

  Canvas Query r2

  http://canvasquery.com

  (c) 2012-2015 http://rezoner.net

  Canvas Query may be freely distributed under the MIT license.

  ! fixed color parsers

*/


(function() {

  var COCOONJS = false;

  var Canvas = window.HTMLCanvasElement;
  var Image = window.HTMLImageElement;
  var COCOONJS = navigator.isCocoonJS;

  var cq = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
      });
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  };

  cq.lineSpacing = 1.0;
  cq.defaultFont = "Arial";

  cq.cocoon = function(selector) {
    if (arguments.length === 0) {
      var canvas = cq.createCocoonCanvas(window.innerWidth, window.innerHeight);
      window.addEventListener("resize", function() {});
    } else if (typeof selector === "string") {
      var canvas = document.querySelector(selector);
    } else if (typeof selector === "number") {
      var canvas = cq.createCocoonCanvas(arguments[0], arguments[1]);
    } else if (selector instanceof Image) {
      var canvas = cq.createCocoonCanvas(selector);
    } else if (selector instanceof cq.Layer) {
      return selector;
    } else {
      var canvas = selector;
    }

    return new cq.Layer(canvas);
  }

  /* fast.js */

  cq.fastApply = function(subject, thisContext, args) {

    switch (args.length) {
      case 0:
        return subject.call(thisContext);
      case 1:
        return subject.call(thisContext, args[0]);
      case 2:
        return subject.call(thisContext, args[0], args[1]);
      case 3:
        return subject.call(thisContext, args[0], args[1], args[2]);
      case 4:
        return subject.call(thisContext, args[0], args[1], args[2], args[3]);
      case 5:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
      case 8:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
      case 9:
        return subject.call(thisContext, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
      default:
        return subject.apply(thisContext, args);
    }

  };

  cq.extend = function() {
    for (var i = 1; i < arguments.length; i++) {
      for (var j in arguments[i]) {
        arguments[0][j] = arguments[i][j];
      }
    }

    return arguments[0];
  };

  cq.augment = function() {
    for (var i = 1; i < arguments.length; i++) {
      _.extend(arguments[0], arguments[i]);
      arguments[i](arguments[0]);
    }
  };

  cq.distance = function(x1, y1, x2, y2) {
    if (arguments.length > 2) {
      var dx = x1 - x2;
      var dy = y1 - y2;

      return Math.sqrt(dx * dx + dy * dy);
    } else {
      return Math.abs(x1 - y1);
    }
  };

  cq.extend(cq, {

    smoothing: true,

    blend: function(below, above, mode, mix) {

      if (typeof mix === "undefined") mix = 1;

      var below = cq(below);
      var mask = below.clone();
      var above = cq(above);

      below.save();
      below.globalAlpha(mix);
      below.globalCompositeOperation(mode);
      below.drawImage(above.canvas, 0, 0);
      below.restore();

      mask.save();
      mask.globalCompositeOperation("source-in");
      mask.drawImage(below.canvas, 0, 0);
      mask.restore();

      return mask;
    },

    matchColor: function(color, palette) {
      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }

      var imgData = cq.color(color);

      var difList = [];
      for (var j = 0; j < rgbPalette.length; j++) {
        var rgbVal = rgbPalette[j];
        var rDif = Math.abs(imgData[0] - rgbVal[0]),
          gDif = Math.abs(imgData[1] - rgbVal[1]),
          bDif = Math.abs(imgData[2] - rgbVal[2]);
        difList.push(rDif + gDif + bDif);
      }

      var closestMatch = 0;
      for (var j = 0; j < palette.length; j++) {
        if (difList[j] < difList[closestMatch]) {
          closestMatch = j;
        }
      }

      return palette[closestMatch];
    },

    temp: function(width, height) {
      if (!this.tempLayer) {
        this.tempLayer = cq(1, 1);
      }

      if (width instanceof Image) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof Canvas) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width, 0, 0);
      } else if (width instanceof CanvasQuery.Layer) {
        this.tempLayer.width = width.width;
        this.tempLayer.height = width.height;
        this.tempLayer.context.drawImage(width.canvas, 0, 0);
      } else {
        this.tempLayer.width = width;
        this.tempLayer.height = height;
      }

      return this.tempLayer;
    },

    wrapValue: function(value, min, max) {
      if (value < min) return max + (value % max);
      if (value >= max) return value % max;
      return value;
    },

    limitValue: function(value, min, max) {
      return value < min ? min : value > max ? max : value;
    },

    mix: function(a, b, amount) {
      return a + (b - a) * amount;
    },

    hexToRgb: function(hex) {
      if (hex.length === 7) return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
      else return ['0x' + hex[1] + hex[1] | 0, '0x' + hex[2] + hex[2] | 0, '0x' + hex[3] + hex[3] | 0];
    },

    rgbToHex: function(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
    },

    /* author: http://mjijackson.com/ */

    rgbToHsl: function(r, g, b) {

      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, l];
    },

    /* author: http://mjijackson.com/ */

    hue2rgb: function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    },

    hslToRgb: function(h, s, l) {
      var r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = this.hue2rgb(p, q, h + 1 / 3);
        g = this.hue2rgb(p, q, h);
        b = this.hue2rgb(p, q, h - 1 / 3);
      }

      return [r * 255 | 0, g * 255 | 0, b * 255 | 0];
    },

    rgbToHsv: function(r, g, b) {
      if (r instanceof Array) {
        b = r[2];
        g = r[1];
        r = r[0];
      }

      r = r / 255, g = g / 255, b = b / 255;
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h, s, v = max;

      var d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [h, s, v];
    },

    hsvToRgb: function(h, s, v) {
      var r, g, b;

      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v, g = t, b = p;
          break;
        case 1:
          r = q, g = v, b = p;
          break;
        case 2:
          r = p, g = v, b = t;
          break;
        case 3:
          r = p, g = q, b = v;
          break;
        case 4:
          r = t, g = p, b = v;
          break;
        case 5:
          r = v, g = p, b = q;
          break;
      }

      return [r * 255, g * 255, b * 255];
    },

    color: function() {
      var result = new cq.Color();
      result.parse(arguments[0], arguments[1]);
      return result;
    },

    poolArray: [],

    pool: function() {

      if (!this.poolArray.length) {
        for (var i = 0; i < 100; i++) {
          this.poolArray.push(this.createCanvas(1, 1));
        }
      }

      return this.poolArray.pop();

    },

    createCanvas: function(width, height) {
      var result = document.createElement("canvas");

      if (arguments[0] instanceof Image || arguments[0] instanceof Canvas) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }


      return result;
    },

    createCocoonCanvas: function(width, height) {
      var result = document.createElement("screencanvas");

      if (arguments[0] instanceof Image) {
        var image = arguments[0];
        result.width = image.width;
        result.height = image.height;
        result.getContext("2d").drawImage(image, 0, 0);
      } else {
        result.width = width;
        result.height = height;
      }

      return result;
    },

    createImageData: function(width, height) {
      return cq.createCanvas(width, height).getContext("2d").createImageData(width, height);
    }

  });

  cq.Layer = function(canvas) {
    this.context = canvas.getContext("2d");
    this.canvas = canvas;
    this.alignX = 0;
    this.alignY = 0;
    this.aligned = false;
    this.update();
  };

  cq.Layer.prototype = {

    update: function() {

      var smoothing = cq.smoothing;

      if (typeof this.smoothing !== "undefined") smoothing = this.smoothing;

      this.context.mozImageSmoothingEnabled = smoothing;
      this.context.msImageSmoothingEnabled = smoothing;
      this.context.imageSmoothingEnabled = smoothing;

      if (COCOONJS) Cocoon.Utils.setAntialias(smoothing);
    },

    appendTo: function(selector) {
      if (typeof selector === "object") {
        var element = selector;
      } else {
        var element = document.querySelector(selector);
      }

      element.appendChild(this.canvas);

      return this;
    },

    a: function(a) {
      if (arguments.length) {
        this.previousAlpha = this.globalAlpha();
        return this.globalAlpha(a);
      } else
        return this.globalAlpha();
    },

    ra: function() {
      return this.a(this.previousAlpha);
    },
    /*
        drawImage: function() {

          if (!this.alignX && !this.alignY) {
            this.context.call
          }

            return this;


        },

        restore: function() {
          this.context.restore();
          this.alignX = 0;
          this.alignY = 0;
        },
        */

    realign: function() {

      this.alignX = this.prevAlignX;
      this.alignY = this.prevAlignY;

      return this;

    },

    align: function(x, y) {

      if (typeof y === "undefined") y = x;

      this.alignX = x;
      this.alignY = y;

      return this;
    },


    /* save translate align rotate scale */

    stars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.save();
      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;
    },

    tars: function(x, y, alignX, alignY, rotation, scaleX, scaleY) {

      if (typeof alignX === "undefined") alignX = 0.5;
      if (typeof alignY === "undefined") alignY = 0.5;
      if (typeof rotation === "undefined") rotation = 0;
      if (typeof scaleX === "undefined") scaleX = 1.0;
      if (typeof scaleY === "undefined") scaleY = scaleX;

      this.translate(x, y);
      this.align(alignX, alignY);
      this.rotate(rotation);
      this.scale(scaleX, scaleY);

      return this;

    },

    fillRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.fillRect(x, y, w, h);

      return this;

    },

    strokeRect: function(x, y, w, h) {

      if (this.alignX || this.alignY) {
        x -= w * this.alignX | 0;
        y -= h * this.alignY | 0;
      }

      this.context.strokeRect(x, y, w, h);

      return this;

    },

    drawImage: function(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {

      if (this.alignX || this.alignY) {
        if (sWidth == null) {
          sx -= image.width * this.alignX | 0;
          sy -= image.height * this.alignY | 0;
        } else {
          dx -= dWidth * this.alignX | 0;
          dy -= dHeight * this.alignY | 0;
        }
      }

      if (sWidth == null) {
        this.context.drawImage(image, sx, sy);
      } else if (dx == null) {
        this.context.drawImage(image, sx, sy, sWidth, sHeight);
      } else {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      }

      // cq.fastApply(this.context.drawImage, this.context, arguments);

      return this;

    },

    save: function() {
      this.prevAlignX = this.alignX;
      this.prevAlignY = this.alignY;

      this.context.save();

      return this;
    },

    restore: function() {

      this.realign();
      this.context.restore();
      return this;
    },

    drawTile: function(image, x, y, frameX, frameY, frameWidth, frameHeight, frames, frame) {

    },

    drawAtlasFrame: function(atlas, frame, x, y) {

      var frame = atlas.frames[frame];

      this.drawRegion(
        atlas.image,
        frame.region,
        x - frame.width * this.alignX + frame.offset[0] + frame.region[2] * this.alignX, y - frame.height * this.alignY + frame.offset[1] + frame.region[3] * this.alignY
      );

      return this;

    },


    imageFill: function(image, width, height) {

      var scale = Math.max(width / image.width, height / image.height);

      this.save();
      this.scale(scale, scale);
      this.drawImage(image, 0, 0);
      this.restore();

    },

    drawRegion: function(image, region, x, y, scale) {

      scale = scale || 1;

      var dWidth = region[2] * scale | 0;
      var dHeight = region[3] * scale | 0;

      this.context.drawImage(
        image, region[0], region[1], region[2], region[3],
        x - dWidth * this.alignX | 0, y - dHeight * this.alignY | 0, dWidth, dHeight
      );

      return this;
    },

    cache: function() {

      return this.clone().canvas;

    },

    blendOn: function(what, mode, mix) {

      cq.blend(what, this, mode, mix);

      return this;
      
    },

    posterize: function(pc, inc) {
      pc = pc || 32;
      inc = inc || 4;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;

      for (var i = 0; i < data.length; i += inc) {
        data[i] -= data[i] % pc; // set value to nearest of 8 possibilities
        data[i + 1] -= data[i + 1] % pc; // set value to nearest of 8 possibilities
        data[i + 2] -= data[i + 2] % pc; // set value to nearest of 8 possibilities
      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas

      return this;
    },


    bw: function(pc) {
      pc = 128;
      var imgdata = this.getImageData(0, 0, this.width, this.height);
      var data = imgdata.data;
      // 8-bit: rrr ggg bb
      for (var i = 0; i < data.length; i += 4) {
        var v = ((data[i] + data[i + 1] + data[i + 2]) / 3);

        v = (v / 128 | 0) * 128;
        //data[i] = v; // set value to nearest of 8 possibilities
        //data[i + 1] = v; // set value to nearest of 8 possibilities
        data[i + 2] = (v / 255) * data[i]; // set value to nearest of 8 possibilities

      }

      this.putImageData(imgdata, 0, 0); // put image data to canvas
    },

    blend: function(what, mode, mix) {
      if (typeof what === "string") {
        var color = what;
        what = cq(this.canvas.width, this.canvas.height);
        what.fillStyle(color).fillRect(0, 0, this.canvas.width, this.canvas.height);
      }

      var result = cq.blend(this, what, mode, mix);

      this.canvas = result.canvas;
      this.context = result.context;

      return this;
    },

    textWithBackground: function(text, x, y, background, padding) {
      var w = this.measureText(text).width;
      var h = this.fontHeight() * 0.8;
      var f = this.fillStyle();
      var padding = padding || 2;

      this.fillStyle(background).fillRect(x - w / 2 - padding * 2, y - padding, w + padding * 4, h + padding * 2)
      this.fillStyle(f).textAlign("center").textBaseline("top").fillText(text, x, y);

      return this;
    },

    fillCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.fill();
      return this;
    },

    strokeCircle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      this.context.stroke();
      return this;
    },

    circle: function(x, y, r) {
      this.context.beginPath();
      this.context.arc(x, y, r, 0, Math.PI * 2);
      return this;
    },

    crop: function(x, y, w, h) {

      if (arguments.length === 1) {

        var y = arguments[0][1];
        var w = arguments[0][2];
        var h = arguments[0][3];
        var x = arguments[0][0];
      }

      var canvas = cq.createCanvas(w, h);
      var context = canvas.getContext("2d");

      context.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);
      this.canvas.width = w;
      this.canvas.height = h;
      this.clear();
      this.context.drawImage(canvas, 0, 0);

      return this;
    },

    set: function(properties) {
      cq.extend(this.context, properties);
    },

    resize: function(width, height) {
      var w = width,
        h = height;

      if (arguments.length === 1) {
        w = arguments[0] * this.canvas.width | 0;
        h = arguments[0] * this.canvas.height | 0;
      } else {

        if (height === false) {
          if (this.canvas.width > width) {
            h = this.canvas.height * (width / this.canvas.width) | 0;
            w = width;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        } else if (width === false) {
          if (this.canvas.width > width) {
            w = this.canvas.width * (height / this.canvas.height) | 0;
            h = height;
          } else {
            w = this.canvas.width;
            h = this.canvas.height;
          }
        }
      }

      var cqresized = cq(w, h).drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, 0, 0, w, h);
      this.canvas = cqresized.canvas;
      this.context = cqresized.context;

      return this;
    },

    imageLine: function(image, region, x, y, ex, ey, scale) {
      if (!region) region = [0, 0, image.width, image.height];

      var distance = cq.distance(x, y, ex, ey);
      var count = distance / region[3] + 0.5 | 0;
      var angle = Math.atan2(ey - y, ex - x) + Math.PI / 2;

      this.save();

      this.translate(x, y);
      this.rotate(angle);

      if (scale) this.scale(scale, 1.0);

      for (var i = 0; i <= count; i++) {
        this.drawRegion(image, region, -region[2] / 2 | 0, -region[3] * (i + 1));
      }

      this.restore();

      return this;
    },

    trim: function(color, changes) {
      var transparent;

      if (color) {
        color = cq.color(color).toArray();
        transparent = !color[3];
      } else transparent = true;

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var bound = [this.canvas.width, this.canvas.height, 0, 0];

      var width = this.canvas.width;
      var height = this.canvas.height;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (transparent) {
          if (!sourcePixels[i + 3]) continue;
        } else if (sourcePixels[i + 0] === color[0] && sourcePixels[i + 1] === color[1] && sourcePixels[i + 2] === color[2]) continue;

        var x = (i / 4 | 0) % this.canvas.width | 0;
        var y = (i / 4 | 0) / this.canvas.width | 0;

        if (x < bound[0]) bound[0] = x;
        if (x > bound[2]) bound[2] = x;

        if (y < bound[1]) bound[1] = y;
        if (y > bound[3]) bound[3] = y;
      }


      if (bound[2] === 0 && bound[3] === 0) {} else {
        if (changes) {
          changes.left = bound[0];
          changes.top = bound[1];

          changes.bottom = height - bound[3];
          changes.right = width - bound[2] - bound[0];

          changes.width = bound[2] - bound[0];
          changes.height = bound[3] - bound[1];
        }

        this.crop(bound[0], bound[1], bound[2] - bound[0] + 1, bound[3] - bound[1] + 1);
      }

      return this;
    },

    matchPalette: function(palette) {
      var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);

      var rgbPalette = [];

      for (var i = 0; i < palette.length; i++) {
        rgbPalette.push(cq.color(palette[i]));
      }


      for (var i = 0; i < imgData.data.length; i += 4) {
        var difList = [];
        if (!imgData.data[i + 3]) continue;

        for (var j = 0; j < rgbPalette.length; j++) {
          var rgbVal = rgbPalette[j];
          var rDif = Math.abs(imgData.data[i] - rgbVal[0]),
            gDif = Math.abs(imgData.data[i + 1] - rgbVal[1]),
            bDif = Math.abs(imgData.data[i + 2] - rgbVal[2]);
          difList.push(rDif + gDif + bDif);
        }

        var closestMatch = 0;

        for (var j = 0; j < palette.length; j++) {
          if (difList[j] < difList[closestMatch]) {
            closestMatch = j;
          }
        }

        var paletteRgb = cq.hexToRgb(palette[closestMatch]);
        imgData.data[i] = paletteRgb[0];
        imgData.data[i + 1] = paletteRgb[1];
        imgData.data[i + 2] = paletteRgb[2];

        /* dithering */
        //imgData.data[i + 3] = (255 * Math.random() < imgData.data[i + 3]) ? 255 : 0;

        //imgData.data[i + 3] = imgData.data[i + 3] > 128 ? 255 : 0;
        /*
        if (i % 3 === 0) {
          imgData.data[i] -= cq.limitValue(imgData.data[i] - 50, 0, 255);
          imgData.data[i + 1] -= cq.limitValue(imgData.data[i + 1] - 50, 0, 255);
          imgData.data[i + 2] -= cq.limitValue(imgData.data[i + 2] - 50, 0, 255);
        }
        */

      }

      this.context.putImageData(imgData, 0, 0);

      return this;
    },

    getPalette: function() {
      var palette = [];
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3]) {
          var hex = cq.rgbToHex(sourcePixels[i + 0], sourcePixels[i + 1], sourcePixels[i + 2]);
          if (palette.indexOf(hex) === -1) palette.push(hex);
        }
      }

      return palette;
    },

    mapPalette: function() {

    },

    beginPath: function() {

      this.context.beginPath();

      return this;

    },

    moveTo: function(x, y) {

      this.context.moveTo(x, y);

      return this;

    },

    fillText: function(text, x, y) {

      this.context.fillText(text, x, y);

      return this;

    },

    stroke: function() {

      this.context.stroke();

      return this;

    },

    polygon: function(array) {

      this.beginPath();

      this.moveTo(array[0][0], array[0][1]);

      for (var i = 1; i < array.length; i++) {
        this.lineTo(array[i][0], array[i][1]);
      }

      this.closePath();

      return this;
    },

    fillPolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.fill();
    },

    strokePolygon: function(polygon) {
      this.beginPath();
      this.polygon(polygon);
      this.stroke();
    },

    colorToMask: function(color, inverted) {
      color = cq.color(color).toArray();
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        if (sourcePixels[i + 3] > 0) mask.push(inverted ? false : true);
        else mask.push(inverted ? true : false);
      }

      return mask;
    },

    grayscaleToMask: function() {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mask = [];

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        mask.push(((sourcePixels[i + 0] + sourcePixels[i + 1] + sourcePixels[i + 2]) / 3) / 255);
      }

      return mask;
    },

    applyMask: function(mask) {
      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var mode = typeof mask[0] === "boolean" ? "bool" : "byte";

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];
        sourcePixels[i + 3] = value * 255 | 0;
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    fillMask: function(mask) {

      var sourceData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var sourcePixels = sourceData.data;

      var maskType = typeof mask[0] === "boolean" ? "bool" : "byte";
      var colorMode = arguments.length === 2 ? "normal" : "gradient";

      var color = cq.color(arguments[1]);
      if (colorMode === "gradient") colorB = cq.color(arguments[2]);

      for (var i = 0, len = sourcePixels.length; i < len; i += 4) {
        var value = mask[i / 4];

        if (maskType === "byte") value /= 255;

        if (colorMode === "normal") {
          if (value) {
            sourcePixels[i + 0] = color[0] | 0;
            sourcePixels[i + 1] = color[1] | 0;
            sourcePixels[i + 2] = color[2] | 0;
            sourcePixels[i + 3] = value * 255 | 0;
          }
        } else {
          sourcePixels[i + 0] = color[0] + (colorB[0] - color[0]) * value | 0;
          sourcePixels[i + 1] = color[1] + (colorB[1] - color[1]) * value | 0;
          sourcePixels[i + 2] = color[2] + (colorB[2] - color[2]) * value | 0;
          sourcePixels[i + 3] = 255;
        }
      }

      this.context.putImageData(sourceData, 0, 0);
      return this;
    },

    clear: function(color) {
      if (color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

      return this;
    },

    clone: function() {

      // var result = cq.createCanvas(this.canvas);

      var result = cq.pool();
      result.width = this.width;
      result.height = this.height;
      result.getContext("2d").drawImage(this.canvas, 0, 0);

      return cq(result);
    },

    gradientText: function(text, x, y, maxWidth, gradient) {

      var words = text.split(" ");

      var h = this.fontHeight() * 2;

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth) {
            lines[++line] = "";
            ox = 0;
          }

          lines[line] += word;

          ox += wordWidth;
        }
      } else var lines = [text];

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * h * 0.6 | 0;
        var lingrad = this.context.createLinearGradient(0, oy, 0, oy + h * 0.6 | 0);

        for (var j = 0; j < gradient.length; j += 2) {
          lingrad.addColorStop(gradient[j], gradient[j + 1]);
        }

        var text = lines[i];

        this.fillStyle(lingrad).fillText(text, x, oy);
      }

      return this;
    },

    removeColor: function(color) {

      color = cq.color(color);

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {
          var i = (y * this.canvas.width + x) * 4;

          if (pixels[i + 0] === color[0] && pixels[i + 1] === color[1] && pixels[i + 2] === color[2]) {
            pixels[i + 3] = 0;
          }


        }
      }

      this.clear();
      this.context.putImageData(data, 0, 0);

      return this;
    },

    outline: function() {
      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;

      var newData = this.createImageData(this.canvas.width, this.canvas.height);
      var newPixels = newData.data;

      var canvas = this.canvas;

      function check(x, y) {

        if (x < 0) return 0;
        if (x >= canvas.width) return 0;
        if (y < 0) return 0;
        if (y >= canvas.height) return 0;

        var i = (x + y * canvas.width) * 4;

        return pixels[i + 3] > 0;

      }

      for (var x = 0; x < this.canvas.width; x++) {
        for (var y = 0; y < this.canvas.height; y++) {

          var full = 0;
          var i = (y * canvas.width + x) * 4;

          if (!pixels[i + 3]) continue;

          full += check(x - 1, y);
          full += check(x + 1, y);
          full += check(x, y - 1);
          full += check(x, y + 1);

          if (full !== 4) {

            newPixels[i] = 255;
            newPixels[i + 1] = 255;
            newPixels[i + 2] = 255;
            newPixels[i + 3] = 255;
          }

        }
      }

      this.context.putImageData(newData, 0, 0);

      return this;
    },

    setHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        h = args[0] === false ? hsl[0] : cq.limitValue(args[0], 0, 1);
        s = args[1] === false ? hsl[1] : cq.limitValue(args[1], 0, 1);
        l = args[2] === false ? hsl[2] : cq.limitValue(args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    shiftHsl: function() {

      if (arguments.length === 1) {
        var args = arguments[0];
      } else {
        var args = arguments;
      }

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        hsl = cq.rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);

        if (pixels[i + 0] !== pixels[i + 1] || pixels[i + 1] !== pixels[i + 2]) {
          h = args[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + args[0], 0, 1);
          s = args[1] === false ? hsl[1] : cq.limitValue(hsl[1] + args[1], 0, 1);
        } else {
          h = hsl[0];
          s = hsl[1];
        }

        l = args[2] === false ? hsl[2] : cq.limitValue(hsl[2] + args[2], 0, 1);

        newPixel = cq.hslToRgb(h, s, l);

        pixels[i + 0] = newPixel[0];
        pixels[i + 1] = newPixel[1];
        pixels[i + 2] = newPixel[2];
      }


      this.context.putImageData(data, 0, 0);

      return this;
    },

    applyColor: function(color) {

      if (COCOONJS) return this;
      this.save();

      this.globalCompositeOperation("source-in");
      this.clear(color);

      this.restore();

      return this;
    },

    negative: function(src, dst) {

      var data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      var pixels = data.data;
      var r, g, b, a, h, s, l, hsl = [],
        newPixel = [];

      for (var i = 0, len = pixels.length; i < len; i += 4) {
        pixels[i + 0] = 255 - pixels[i + 0];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
      }

      this.context.putImageData(data, 0, 0);

      return this;
    },

    roundRect: function(x, y, width, height, radius) {

      this.beginPath();
      this.moveTo(x + radius, y);
      this.lineTo(x + width - radius, y);
      this.quadraticCurveTo(x + width, y, x + width, y + radius);
      this.lineTo(x + width, y + height - radius);
      this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      this.lineTo(x + radius, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - radius);
      this.lineTo(x, y + radius);
      this.quadraticCurveTo(x, y, x + radius, y);
      this.closePath();

      return this;
    },

    markupText: function(text) {


    },

    wrappedText: function(text, x, y, maxWidth, lineHeight) {

      var words = text.split(" ");

      var lineHeight = lineHeight || this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }
          if (words[i] !== "\n") {
            lines[line] += word;

            ox += wordWidth;
          }


        }
      } else {
        var lines = [text];
      }

      for (var i = 0; i < lines.length; i++) {
        var oy = y + i * lineHeight | 0;

        var text = lines[i];

        this.fillText(text, x, oy);
      }

      return this;
    },

    fontHeights: {},

    fontHeight: function() {
      var font = this.font();

      if (!this.fontHeights[font]) {
        var temp = cq(100, 100);
        var height = 0;
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("bottom").fillText("gM", 25, 100);
        temp.trim(false, changes);
        height += changes.bottom;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("top").fillText("gM", 25, 0);
        temp.trim(false, changes);
        height += changes.top;

        var temp = cq(100, 100);
        var changes = {};
        temp.font(font).fillStyle("#fff");
        temp.textBaseline("alphabetic").fillText("gM", 50, 50);
        temp.trim(false, changes);
        height += temp.height;

        this.fontHeights[font] = height;
      }

      return this.fontHeights[font];
    },

    textBoundaries: function(text, maxWidth) {
      var words = text.split(" ");

      var h = this.fontHeight();

      var ox = 0;
      var oy = 0;

      if (maxWidth) {
        var line = 0;
        var lines = [""];

        for (var i = 0; i < words.length; i++) {
          var word = words[i] + " ";
          var wordWidth = this.context.measureText(word).width;

          if (ox + wordWidth > maxWidth || words[i] === "\n") {
            lines[++line] = "";
            ox = 0;
          }

          if (words[i] !== "\n") {
            lines[line] += word;
            ox += wordWidth;
          }
        }
      } else {
        var lines = [text];
        maxWidth = this.measureText(text).width;
      }

      return {
        height: lines.length * h,
        width: maxWidth,
        lines: lines.length,
        lineHeight: h
      }
    },

    repeatImageRegion: function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
      this.save();
      this.rect(dx, dy, dw, dh);
      this.clip();

      for (var x = 0, len = Math.ceil(dw / sw); x < len; x++) {
        for (var y = 0, leny = Math.ceil(dh / sh); y < leny; y++) {
          this.drawImage(image, sx, sy, sw, sh, dx + x * sw, dy + y * sh, sw, sh);
        }
      }

      this.restore();

      return this;
    },

    repeatImage: function(image, x, y, w, h) {
      // if (!env.details) return this;

      if (arguments.length < 9) {
        this.repeatImageRegion(image, 0, 0, image.width, image.height, x, y, w, h);
      } else {
        this.repeatImageRegion.apply(this, arguments);
      }

      return this;
    },

    borderImage: function(image, x, y, w, h, t, r, b, l, fill) {

      // if (!env.details) return this;

      if (typeof t === "object") {

        var bottomLeft = t.bottomLeft || [0, 0, 0, 0];
        var bottomRight = t.bottomRight || [0, 0, 0, 0];
        var topLeft = t.topLeft || [0, 0, 0, 0];
        var topRight = t.topRight || [0, 0, 0, 0];

        var clh = bottomLeft[3] + topLeft[3];
        var crh = bottomRight[3] + topRight[3];
        var ctw = topLeft[2] + topRight[2];
        var cbw = bottomLeft[2] + bottomRight[2];

        t.fillPadding = [0, 0, 0, 0];

        if (t.left) t.fillPadding[0] = t.left[2];
        if (t.top) t.fillPadding[1] = t.top[3];
        if (t.right) t.fillPadding[2] = t.right[2];
        if (t.bottom) t.fillPadding[3] = t.bottom[3];

        // if (!t.fillPadding) t.fillPadding = [0, 0, 0, 0];

        if (t.fill) {
          this.drawImage(image, t.fill[0], t.fill[1], t.fill[2], t.fill[3], x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        } else {
          // this.fillRect(x + t.fillPadding[0], y + t.fillPadding[1], w - t.fillPadding[2] - t.fillPadding[0], h - t.fillPadding[3] - t.fillPadding[1]);
        }

        if (t.left) this[t.left[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.left[0], t.left[1], t.left[2], t.left[3], x, y + topLeft[3], t.left[2], h - clh);
        if (t.right) this[t.right[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.right[0], t.right[1], t.right[2], t.right[3], x + w - t.right[2], y + topRight[3], t.right[2], h - crh);
        if (t.top) this[t.top[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.top[0], t.top[1], t.top[2], t.top[3], x + topLeft[2], y, w - ctw, t.top[3]);
        if (t.bottom) this[t.bottom[4] === "stretch" ? "drawImage" : "repeatImage"](image, t.bottom[0], t.bottom[1], t.bottom[2], t.bottom[3], x + bottomLeft[2], y + h - t.bottom[3], w - cbw, t.bottom[3]);

        if (t.bottomLeft) this.drawImage(image, t.bottomLeft[0], t.bottomLeft[1], t.bottomLeft[2], t.bottomLeft[3], x, y + h - t.bottomLeft[3], t.bottomLeft[2], t.bottomLeft[3]);
        if (t.topLeft) this.drawImage(image, t.topLeft[0], t.topLeft[1], t.topLeft[2], t.topLeft[3], x, y, t.topLeft[2], t.topLeft[3]);
        if (t.topRight) this.drawImage(image, t.topRight[0], t.topRight[1], t.topRight[2], t.topRight[3], x + w - t.topRight[2], y, t.topRight[2], t.topRight[3]);
        if (t.bottomRight) this.drawImage(image, t.bottomRight[0], t.bottomRight[1], t.bottomRight[2], t.bottomRight[3], x + w - t.bottomRight[2], y + h - t.bottomRight[3], t.bottomRight[2], t.bottomRight[3]);


      } else {


        /* top */
        if (t > 0 && w - l - r > 0) this.drawImage(image, l, 0, image.width - l - r, t, x + l, y, w - l - r, t);

        /* bottom */
        if (b > 0 && w - l - r > 0) this.drawImage(image, l, image.height - b, image.width - l - r, b, x + l, y + h - b, w - l - r, b);
        //      console.log(x, y, w, h, t, r, b, l);
        //      console.log(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);
        /* left */
        if (l > 0 && h - b - t > 0) this.drawImage(image, 0, t, l, image.height - b - t, x, y + t, l, h - b - t);


        /* right */
        if (r > 0 && h - b - t > 0) this.drawImage(image, image.width - r, t, r, image.height - b - t, x + w - r, y + t, r, h - b - t);

        /* top-left */
        if (l > 0 && t > 0) this.drawImage(image, 0, 0, l, t, x, y, l, t);

        /* top-right */
        if (r > 0 && t > 0) this.drawImage(image, image.width - r, 0, r, t, x + w - r, y, r, t);

        /* bottom-right */
        if (r > 0 && b > 0) this.drawImage(image, image.width - r, image.height - b, r, b, x + w - r, y + h - b, r, b);

        /* bottom-left */
        if (l > 0 && b > 0) this.drawImage(image, 0, image.height - b, l, b, x, y + h - b, l, b);

        if (fill) {
          if (typeof fill === "string") {
            this.fillStyle(fill).fillRect(x + l, y + t, w - l - r, h - t - b);
          } else {
            if (w - l - r > 0 && h - t - b > 0)
              this.drawImage(image, l, t, image.width - r - l, image.height - b - t, x + l, y + t, w - l - r, h - t - b);
          }
        }
      }
    },

    setPixel: function(color, x, y) {

      return this.fillStyle(color).fillRect(x, y, 1, 1);

    },

    getPixel: function(x, y) {
      var pixel = this.context.getImageData(x, y, 1, 1).data;
      return cq.color([pixel[0], pixel[1], pixel[2], pixel[3]]);
    },

    createImageData: function(width, height) {
      if (false && this.context.createImageData) {
        return this.context.createImageData.apply(this.context, arguments);
      } else {
        if (!this.emptyCanvas) {
          this.emptyCanvas = cq.createCanvas(width, height);
          this.emptyCanvasContext = this.emptyCanvas.getContext("2d");
        }

        this.emptyCanvas.width = width;
        this.emptyCanvas.height = height;
        return this.emptyCanvasContext.getImageData(0, 0, width, height);
      }
    },

    strokeLine: function(x1, y1, x2, y2) {

      this.beginPath();

      if (typeof x2 === "undefined") {
        this.moveTo(x1.x, x1.y);
        this.lineTo(y1.x, y1.y);
      } else {
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
      }

      this.stroke();

      return this;

    },

    setLineDash: function(dash) {
      if (this.context.setLineDash) {
        this.context.setLineDash(dash);
        return this;
      } else return this;
    },

    measureText: function() {
      return this.context.measureText.apply(this.context, arguments);
    },

    getLineDash: function() {
      return this.context.getLineDash();
    },

    createRadialGradient: function() {
      return this.context.createRadialGradient.apply(this.context, arguments);
    },

    createLinearGradient: function() {
      return this.context.createLinearGradient.apply(this.context, arguments);
    },

    createPattern: function() {
      return this.context.createPattern.apply(this.context, arguments);
    },

    getImageData: function() {
      return this.context.getImageData.apply(this.context, arguments);
    },

    /* If you think that I am retarded because I use fillRect to set
       pixels - read about premultipled alpha in canvas */

    writeMeta: function(data) {

      var json = JSON.stringify(data);

      json = encodeURIComponent(json);

      var bytes = [];

      for (var i = 0; i < json.length; i++) {
        bytes.push(json.charCodeAt(i));
        //      console.log(json[i])
      }

      bytes.push(127);

      var x = this.width - 1;
      var y = this.height - 1;

      var pixel = [];

      while (bytes.length) {

        var byte = bytes.shift();

        pixel.unshift(byte * 2);
        //        console.log(x + String.fromCharCode(byte), byte);

        if (!bytes.length)
          for (var i = 0; i < 3 - pixel.length; i++) pixel.unshift(254);

        if (pixel.length === 3) {
          this.fillStyle(cq.color(pixel).toRgb()).fillRect(x, y, 1, 1);
          pixel = [];
          x--;

          if (x < 0) {
            y--;
            x = this.width - 1;
          }
        }
      }

      return this;

    },

    readMeta: function() {

      var bytes = [];

      var x = this.width - 1;
      var y = this.height - 1;

      while (true) {
        var pixel = this.getPixel(x, y);

        var stop = false;

        for (var i = 0; i < 3; i++) {

          if (pixel[2 - i] === 254) stop = true;

          else bytes.push(pixel[2 - i] / 2 | 0);

        }

        if (stop) break;

        x--;

        if (x < 0) {
          y--;
          x = this.width - 1;
          break;
        }
      }


      var json = "";

      while (bytes.length) {
        json += String.fromCharCode(bytes.shift());
      }

      var data = false;

      console.log(json);

      try {
        data = JSON.parse(decodeURIComponent(json));
      } catch (e) {

      }

      return data;

    },

    get width() {
      return this.canvas.width;
    },

    get height() {
      return this.canvas.height;
    },

    set width(w) {
      this.canvas.width = w;
      this.update();
      return this.canvas.width;
    },

    set height(h) {
      this.canvas.height = h;
      this.update();
      return this.canvas.height;
    }


  };

  /* extend Layer with drawing context methods */

  var methods = ["arc", "arcTo", "beginPath", "bezierCurveTo", "clearRect", "clip", "closePath", "createLinearGradient", "createRadialGradient", "createPattern", "drawFocusRing", "drawImage", "fill", "fillRect", "fillText", "getImageData", "isPointInPath", "lineTo", "measureText", "moveTo", "putImageData", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "setTransform", "stroke", "strokeRect", "strokeText", "transform", "translate", "setLineDash"];

  for (var i = 0; i < methods.length; i++) {
    var name = methods[i];

    if (cq.Layer.prototype[name]) continue;

    cq.Layer.prototype[name] = (function(method) {

      return function() {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; ++i) {

          args[i] = arguments[i];

        }

        cq.fastApply(method, this.context, args);

        return this;
      }

    })(CanvasRenderingContext2D.prototype[name]);


    continue;


    if (!this.debug) {
      // if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("this.context." + name + ".apply(this.context, arguments); return this;");

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          // this.context[name].apply(this.context, arguments);

          cq.fastApply(this.context[name], this.context, arguments);

          return this;
        }

      })(name);

    } else {

      var self = this;

      (function(name) {

        cq.Layer.prototype[name] = function() {
          try {
            this.context[name].apply(this.context, arguments);
            return this;
          } catch (e) {
            var err = new Error();
            console.log(err.stack);
            throw (e + err.stack);

            console.log(e, name, arguments);
          }
        }

      })(name);

    }

  };

  /* create setters and getters */

  var properties = ["canvas", "fillStyle", "font", "globalAlpha", "globalCompositeOperation", "lineCap", "lineJoin", "lineWidth", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "strokeStyle", "textAlign", "textBaseline", "lineDashOffset"];

  for (var i = 0; i < properties.length; i++) {
    var name = properties[i];
    if (!cq.Layer.prototype[name]) cq.Layer.prototype[name] = Function("if(arguments.length) { this.context." + name + " = arguments[0]; return this; } else { return this.context." + name + "; }");
  };

  /* color */

  cq.Color = function(data, type) {

    if (arguments.length) this.parse(data, type);
  }

  cq.Color.prototype = {

    toString: function() {
      return this.toRgb();
    },

    parse: function(args, type) {
      if (args[0] instanceof cq.Color) {
        this[0] = args[0][0];
        this[1] = args[0][1];
        this[2] = args[0][2];
        this[3] = args[0][3];
        return;
      }

      if (typeof args === "string") {
        var match = null;

        if (args[0] === "#") {
          var rgb = cq.hexToRgb(args);
          this[0] = rgb[0];
          this[1] = rgb[1];
          this[2] = rgb[2];
          this[3] = 1.0;
        } else if (match = args.match(/rgb\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = 1.0;
        } else if (match = args.match(/rgba\((.*),(.*),(.*)\)/)) {
          this[0] = match[1] | 0;
          this[1] = match[2] | 0;
          this[2] = match[3] | 0;
          this[3] = match[4] | 0;
        } else if (match = args.match(/hsl\((.*),(.*),(.*)\)/)) {
          this.fromHsl(match[1], match[2], match[3]);
        } else if (match = args.match(/hsv\((.*),(.*),(.*)\)/)) {
          this.fromHsv(match[1], match[2], match[3]);
        }
      } else {
        switch (type) {
          case "hsl":
          case "hsla":

            this.fromHsl(args[0], args[1], args[2], args[3]);
            break;

          case "hsv":
          case "hsva":

            this.fromHsv(args[0], args[1], args[2], args[3]);
            break;

          default:
            this[0] = args[0];
            this[1] = args[1];
            this[2] = args[2];
            this[3] = typeof args[3] === "undefined" ? 1.0 : args[3];
            break;
        }
      }
    },

    a: function(a) {
      return this.alpha(a);
    },

    alpha: function(a) {
      this[3] = a;
      return this;
    },

    fromHsl: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;

      var color = cq.hslToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    fromHsv: function() {
      var components = arguments[0] instanceof Array ? arguments[0] : arguments;
      var color = cq.hsvToRgb(parseFloat(components[0]), parseFloat(components[1]), parseFloat(components[2]));

      this[0] = color[0];
      this[1] = color[1];
      this[2] = color[2];
      this[3] = typeof arguments[3] === "undefined" ? 1.0 : arguments[3];
    },

    toArray: function() {
      return [this[0], this[1], this[2], this[3]];
    },

    toRgb: function() {
      return "rgb(" + this[0] + ", " + this[1] + ", " + this[2] + ")";
    },

    toRgba: function() {
      return "rgba(" + this[0] + ", " + this[1] + ", " + this[2] + ", " + this[3] + ")";
    },

    toHex: function() {
      return cq.rgbToHex(this[0], this[1], this[2]);
    },

    toHsl: function() {
      var c = cq.rgbToHsl(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    toHsv: function() {
      var c = cq.rgbToHsv(this[0], this[1], this[2]);
      c[3] = this[3];
      return c;
    },

    gradient: function(target, steps) {
      var targetColor = cq.color(target);
    },

    shiftHsl: function() {
      var hsl = this.toHsl();

      if (this[0] !== this[1] || this[1] !== this[2]) {
        var h = arguments[0] === false ? hsl[0] : cq.wrapValue(hsl[0] + arguments[0], 0, 1);
        var s = arguments[1] === false ? hsl[1] : cq.limitValue(hsl[1] + arguments[1], 0, 1);
      } else {
        var h = hsl[0];
        var s = hsl[1];
      }

      var l = arguments[2] === false ? hsl[2] : cq.limitValue(hsl[2] + arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    setHsl: function() {
      var hsl = this.toHsl();

      var h = arguments[0] === false ? hsl[0] : cq.limitValue(arguments[0], 0, 1);
      var s = arguments[1] === false ? hsl[1] : cq.limitValue(arguments[1], 0, 1);
      var l = arguments[2] === false ? hsl[2] : cq.limitValue(arguments[2], 0, 1);

      this.fromHsl(h, s, l);

      return this;
    },

    mix: function(color, amount) {
      color = cq.color(color);

      for (var i = 0; i < 4; i++)
        this[i] = cq.mix(this[i], color[i], amount);

      return this;
    }

  };

  window["cq"] = window["CanvasQuery"] = cq;


  return cq;

})();

/* file: src/layer/Layer.js */

PLAYGROUND.Renderer = function(app) {

  this.app = app;

  app.on("create", this.create.bind(this));
  app.on("resize", this.resize.bind(this));

  app.renderer = this;

};

PLAYGROUND.Renderer.plugin = true;

PLAYGROUND.Renderer.prototype = {

  create: function(data) {

    this.app.layer = cq().appendTo(this.app.container);

    if (!this.app.customContainer) {
      this.app.container.style.margin = "0px";
      this.app.container.style.overflow = "hidden";
    }

  },

  resize: function(data) {

    var app = this.app;

    var layer = app.layer;

    layer.width = app.width;
    layer.height = app.height;

    layer.canvas.style.transformOrigin = "0 0";
    layer.canvas.style.transform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.transformStyle = "preserve-3d";

    layer.canvas.style.webkitTransformOrigin = "0 0";
    layer.canvas.style.webkitTransform = "translate(" + app.offsetX + "px," + app.offsetY + "px) scale(" + app.scale + ", " + app.scale + ")";
    layer.canvas.style.webkitTransformStyle = "preserve-3d";

    layer.smoothing = this.app.smoothing;
    layer.update();

    this.setSmoothing(this.app.smoothing);

  },

  setSmoothing: function(smoothing) {

    var layer = this.app.layer;

    this.app.smoothing = smoothing;


    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "-moz-crisp-edges";

    } else {

      layer.canvas.style.imageRendering = smoothing ? "auto" : "pixelated";

    }

    layer.smoothing = smoothing;
    layer.update();

  }

};

/* file: src/layer/Transitions.js */

PLAYGROUND.Transitions = function(app) {

  this.app = app;

  app.on("enterstate", this.enterstate.bind(this));
  app.on("postrender", this.postrender.bind(this));
  app.on("step", this.step.bind(this));

  this.progress = 1;
  this.lifetime = 0;
};

PLAYGROUND.Transitions.plugin = true;

PLAYGROUND.Transitions.prototype = {

  enterstate: function(data) {

    this.screenshot = this.app.layer.cache();

    if (data.prev) {
      this.lifetime = 0;
      this.progress = 0;
    }

  },

  postrender: function() {

    if (this.progress >= 1) return;

    PLAYGROUND.Transitions.Split(this, this.progress);

  },

  step: function(delta) {

    if (this.progress >= 1) return;

    this.lifetime += delta;

    this.progress = Math.min(this.lifetime / 0.5, 1);

  }

};

PLAYGROUND.Transitions.Implode = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "outCubic");

  var negative = 1 - progress;

  layer.save();
  layer.tars(app.center.x, app.center.y, 0.5, 0.5, 0, 0.5 + 0.5 * negative, negative);
  layer.drawImage(manager.screenshot, 0, 0);

  layer.restore();

};

PLAYGROUND.Transitions.Split = function(manager, progress) {

  var app = manager.app;
  var layer = app.layer;

  progress = app.ease(progress, "inOutCubic");

  var negative = 1 - progress;

  layer.save();

  layer.a(negative).clear("#fff").ra();

  layer.drawImage(manager.screenshot, 0, 0, app.width, app.height / 2 | 0, 0, 0, app.width, negative * app.height / 2 | 0);
  layer.drawImage(manager.screenshot, 0, app.height / 2 | 0, app.width, app.height / 2 | 0, 0, app.height / 2 + progress * app.height / 2 + 1 | 0, app.width, Math.max(1, negative * app.height * 0.5 | 0));

  layer.restore();

};

/* file: src/layer/LoadingScreen.js */

PLAYGROUND.LoadingScreen = {

  logoRaw: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAASBAMAAADPiN0xAAAAGFBMVEUAAQAtLixHSUdnaGaJioimqKXMzsv7/fr5shgVAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB98EAwkeA4oQWJ4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQ4y72UvW+rMBDAz+FrpVKrrFmesmapWNOlrKjSe1kZ+uoVAvj+/frujG1SaJcqJwU7voOf7xMQzQmsIDi5NPTMsLRntH3U+F6SAZo3NlCvcgBFJz8o+vkDiE63lI95Y/UmpinsZWkgJWJiDbAVQ16htptxSTNloIlugwaw001Ey3ASF3so6L1qLNXzQS5S0UGKL/CI5wWNriE0UH9Yty37LqIVg+wsqu7Ix0MwVBSF/dU+jv2SNnma021LEdPqVnMeU3xAu0kXcSGjmq7Ox4E2Wn88LZ2+EFj3avjixzai6VPVyuYveZLHF2XfdDnvAq27DIHGuq+0DJFsE30OtB1KqOwd8Dr7PcM4b+jfj2g5lp4WyntBK66qua3JzEA+uXJpwH/NlVuzRVPY/kTLB2mjuN+KwdZ8FOy8j2gDbEUSqumnSCY4lf4ibq3IhVM4ycZQRnv+zFqVdJQVn6BxvUqebGpuaNo3sZxwBzjajiMZOoBiwyVF+kCr+nUaJOaGpnAeRPPJZTr4FqmHRXcneEo4DqQ/ftfdnLeDrUAME8xWKPeKCwW6YkEpXfs3p1EWJhdcUAYP0TI/uYaV8cgjwBovaeyWwji2T9rTFIdS/cP/MnkTLRUWxgNNZVin7bT5fqT9miDcUVJzR1gRpfIONMmulU+5Qqr6zXAUqAAAAABJRU5ErkJggg==",

  create: function() {

    var self = this;

    this.logo = new Image;

    this.logo.addEventListener("load", function() {
      self.ready = true;
    });

    this.logo.src = this.logoRaw;

    this.background = "#282245";

    if (window.getComputedStyle) {
      // this.background = window.getComputedStyle(document.body).backgroundColor || "#000";
    }


  },

  enter: function() {

    this.current = 0;

  },

  leave: function() {

    this.locked = true;

    this.animation = this.app.tween(this)
      .to({
        current: 1
      }, 0.5);

  },

  step: function(delta) {

    if (this.locked) {
      if (this.animation.finished) this.locked = false;
    } else {
      this.current = this.current + Math.abs(this.app.loader.progress - this.current) * delta;
    }

  },

  ready: function() {


  },

  render: function() {

    if (!this.ready) return;

    this.app.layer.clear(this.background);

    this.app.layer.fillStyle("#fff");

    this.app.layer.save();
    this.app.layer.align(0.5, 0.5);
    this.app.layer.globalCompositeOperation("lighter");
    this.app.layer.drawImage(this.logo, this.app.center.x, this.app.center.y);

    var w = this.current * this.logo.width;

    this.app.layer.fillStyle("#fff");

    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, w, 12);
    this.app.layer.fillRect(this.app.center.x, this.app.center.y + 32, this.logo.width, 4);

    this.app.layer.restore();

  }

};
/* scanlines plugin for playground's default renderer */

PLAYGROUND.Scanlines = function(app) {

  this.app = app;

  app.on("resize", this.resize.bind(this));
  app.on("postrender", this.postrender.bind(this));

};

PLAYGROUND.Scanlines.plugin = true;

PLAYGROUND.Scanlines.prototype = {

  resize: function() {

    this.image = cq(this.app.width, this.app.height);

    this.image.globalAlpha(0.1);
    this.image.fillStyle("#008");

    for (var i = 1; i < this.image.canvas.height; i += 8){
      
      this.image.fillRect(0, i, this.image.canvas.width, 4);

    }

    this.image = this.image.cache();

  },

  postrender: function() {

    if (this.image) {

      // this.app.layer.drawImage(this.image, 0, 0);

    }

  }

};
/*

  SoundOnDemand r1

  (c) 2012-2015 http://rezoner.net

  This library may be freely distributed under the MIT license.

*/

/* options */

/* output: output node, default */
/* audioContext: audioContext */

SoundOnDemand = function(options) {

  options = options || {};

  var canPlayMp3 = (new Audio).canPlayType("audio/mp3");
  var canPlayOgg = (new Audio).canPlayType('audio/ogg; codecs="vorbis"');

  if (this.preferedAudioFormat === "mp3") {

    if (canPlayMp3) this.audioFormat = "mp3";
    else this.audioFormat = "ogg";

  } else {

    if (canPlayOgg) this.audioFormat = "ogg";
    else this.audioFormat = "mp3";

  }

  if (!options.audioContext) {
    console.warn('Possible duplicated AudioContext, use options.audioContext');
  }
  this.audioContext = options.audioContext || new AudioContext;

  this.compressor = this.audioContext.createDynamicsCompressor();
  this.compressor.connect(this.audioContext.destination);

  this.gainNode = this.audioContext.createGain()
  this.gainNode.connect(this.compressor);

  this.input = this.gainNode;

  this.gainNode.gain.value = 1.0;

  this.buffers = {};

  this.channels = {};
  this.aliases = {};

  var lastTick = Date.now();
  var engine = this;

  setInterval(function() {

    var delta = (Date.now() - lastTick) / 1000;

    lastTick = Date.now();

    engine.step(delta);

  }, 1000 / 60);

};

SoundOnDemand.moveTo = function(value, target, step) {

  if (value < target) {
    value += step;
    if (value > target) value = target;
  }

  if (value > target) {
    value -= step;
    if (value < target) value = target;
  }

  return value;

};

SoundOnDemand.prototype = {

  constructor: SoundOnDemand,

  path: "sounds/",

  channel: function(name) {

    if (!this.channels[name]) this.channels[name] = new SoundOnDemand.Channel(this);

    return this.channels[name];

  },

  getAssetEntry: function(path, defaultExtension) {

    /* translate folder according to user provided paths
       or leave as is */

    var fileinfo = path.match(/(.*)\..*/);
    var key = fileinfo ? fileinfo[1] : path;

    var temp = path.split(".");
    var basename = path;

    if (temp.length > 1) {
      var ext = temp.pop();
      path = temp.join(".");
    } else {
      var ext = defaultExtension;
      basename += "." + defaultExtension;
    }

    return {
      key: key,
      url: this.path + basename,
      path: this.path + path,
      ext: ext
    };

  },

  loaders: {},

  load: function(key) {

    var engine = this;
    var entry = engine.getAssetEntry(key, engine.audioFormat);

    if (!this.loaders[key]) {

      this.loaders[key] = new Promise(function(resolve, reject) {

        if (engine.buffers[entry.key]) return resolve(engine.buffers[entry.key]);

        var request = new XMLHttpRequest();

        request.open("GET", entry.url, true);
        request.responseType = "arraybuffer";

        request.onload = function() {
          engine.audioContext.decodeAudioData(this.response, function(decodedBuffer) {

            engine.buffers[entry.key] = decodedBuffer;
            resolve(decodedBuffer);

          });

        }

        request.send();

      });

    }

    return this.loaders[key];

  },

  step: function(delta) {

    for (var key in this.channels) {

      this.channels[key].step(delta);

    }

  },

  duplicate: function(source, as, volume, rate) {

    var engine = this;

    this.load(source).then(function() {

      engine.buffers[source];

      engine.buffers[as] = engine.buffers[source];

    });

  },

  alias: function(name, source, rate, volume) {

    this.aliases[name] = {
      source: source,
      rate: rate,
      volume: volume
    };

  }

};
SoundOnDemand.Events = function() {

  this.listeners = {};

};

SoundOnDemand.Events.prototype = {

  on: function(event, callback) {

    if (typeof event === "object") {
      var result = {};
      for (var key in event) {
        result[key] = this.on(key, event[key])
      }
      return result;
    }

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;
  },

  once: function(event, callback) {

    callback.once = true;

    if (!this.listeners[event]) this.listeners[event] = [];

    this.listeners[event].push(callback);

    return callback;

  },

  off: function(event, callback) {

    for (var i = 0, len = this.listeners[event].length; i < len; i++) {
      if (this.listeners[event][i]._remove) {
        this.listeners[event].splice(i--, 1);
        len--;
      }
    }

  },

  trigger: function(event, data) {

    /* if you prefer events pipe */

    if (this.listeners["event"]) {
      for (var i = 0, len = this.listeners["event"].length; i < len; i++) {
        this.listeners["event"][i](event, data);
      }
    }

    /* or subscribed to single event */

    if (this.listeners[event]) {
      for (var i = 0, len = this.listeners[event].length; i < len; i++) {
        var listener = this.listeners[event][i];
        listener.call(this, data);

        if (listener.once) {
          this.listeners[event].splice(i--, 1);
          len--;
        }
      }
    }

  }

};
SoundOnDemand.Channel = function(engine) {

  this.engine = engine;
  this.audioContext = engine.audioContext;

  /* connection order goes from bottom to top */

  /* gain node */

  this.gainNode = this.audioContext.createGain();

  /* convolver */

  this.convolverWetNode = this.audioContext.createGain();
  this.convolverDryNode = this.audioContext.createGain();
  this.convolverNode = this.audioContext.createConvolver();
  this.convolverEnabled = false;

  this.route();

  this.queue = [];
  this.loops = [];

};

SoundOnDemand.Channel.prototype = {

  constructor: SoundOnDemand.Channel,

  /* get a sound for further usage */

  xroute: function() {

    if (this.currentRoute) {

      for (var i = 0; i < this.currentRoute.length - 1; i++) {

        this.currentRoute[i].disconnect();

      }

    }

    this.currentRoute = [];

    for (var i = 0; i < arguments.length; i++) {

      if (i < arguments.length - 1) {

        var node = arguments[i];

        node.connect(arguments[i + 1]);

      }

      this.currentRoute.push(node);

    }

    this.input = arguments[0];

  },

  get: function(key) {

    return new SoundOnDemand.Sound(key, this);

  },

  play: function(key) {

    var sound = this.get(key);

    this.add(sound);

    return sound;

  },

  remove: function(sound) {

    sound._remove = true;

  },

  add: function(sound) {

    sound._remove = false;

    this.queue.push(sound);

  },

  step: function(delta) {

    /* process queue */

    for (var i = 0; i < this.queue.length; i++) {

      var sound = this.queue[i];

      sound.step(delta);

      if (sound._remove) this.queue.splice(i--, 1);

    }

    /* process sounds being played */

  },

  volume: function(value) {

    if (arguments.length) {

      this.gainNode.gain.value = value;

      return this;

    } else {

      return this.gainNode.gain.value;

    }

  },

  swapConvolver: function(key) {

    var engine = this.engine;
    var channel = this;

    return new Promise(function(resolve, fail) {

      if (channel.currentConvolverImpulse === key) {

        resolve();

      } else {

        engine.load(key).then(function(buffer) {
          channel.currentConvolverImpulse = key;
          channel.convolverNode.buffer = buffer;
          resolve();
        });

      }

    });

  },

  updateConvovlerState: function(enabled) {

    this.convolverEnabled = enabled;
    this.route();

  },

  subroute: function(nodes) {

    for (var i = 0; i < nodes.length; i++) {

      if (i < nodes.length - 1) {

        var node = nodes[i];
        node.disconnect();
        node.connect(nodes[i + 1]);

      }

    }

    this.input = nodes[0];

  },

  route: function() {

    this.gainNode.disconnect();

    if (this.convolverEnabled) {

      this.gainNode.connect(this.convolverDryNode);

      this.gainNode.connect(this.convolverNode);
      this.convolverNode.connect(this.convolverWetNode);

      this.convolverWetNode.connect(this.engine.input);
      this.convolverDryNode.connect(this.engine.input);

    } else {

      this.gainNode.connect(this.engine.input);

    }

    this.input = this.gainNode;

  },

  convolver: function(value, key) {

    var enabled = value > 0;
    var channel = this;

    this.swapConvolver(key).then(function() {

      if (enabled !== channel.convolverEnabled) channel.updateConvovlerState(enabled);

    });

    this.convolverWetNode.gain.value = value;
    this.convolverDryNode.gain.value = 1 - value;

    return this;

  }

};
SoundOnDemand.Sound = function(key, channel) {

  this.key = key;
  this.bufferKey = key;

  if (channel.engine.aliases[key]) {

    this.alias = channel.engine.aliases[key];

    this.bufferKey = this.alias.source;

  }

  if (!channel.engine.buffers[this.bufferKey]) channel.engine.load(this.bufferKey);

  this.channel = channel;
  this.audioContext = this.channel.engine.audioContext;

  this.current = {
    volume: 1.0,
    rate: 1.0
  };

  this.fadeMod = 1.0;

  this.createNodes();

};

SoundOnDemand.Sound.prototype = {

  constructor: SoundOnDemand.Sound,

  alias: {
    volume: 1.0,
    rate: 1.0
  },

  createNodes: function() {

    var bufferSource = this.audioContext.createBufferSource();
    var gainNode = this.audioContext.createGain();
    var panNode = this.audioContext.createStereoPanner();

    bufferSource.connect(panNode);
    panNode.connect(gainNode);
    gainNode.connect(this.channel.input);

    this.bufferSource = bufferSource;
    this.gainNode = gainNode;
    this.panNode = panNode;

  },

  volume: function(volume) {

    volume *= this.alias.volume;

    this.current.volume = volume;

    this.updateVolume();

    return this;

  },

  updateVolume: function() {

    this.gainNode.gain.value = this.current.volume * this.fadeMod;

  },

  pan: function(pan) {

    this.current.pan = pan;

    this.updatePanning();

    return this;

  },

  updatePanning: function() {

    this.panNode.pan.value = this.current.pan;

  },

  loop: function() {

    this.bufferSource.loop = true;
    this.current.loop = true;

    return this;

  },

  rrate: function(range) {

    return this.rate(this.current.rate + (-1 + Math.random() * 2) * range);

  },

  rate: function(rate) {

    rate *= this.alias.rate;

    this.bufferSource.playbackRate.value = rate;

    this.current.rate = rate;

    return this;

  },

  onended: function() {

    if (!this.current.loop) this.stop();

  },

  step: function(delta) {

    if (!this.ready) {

      if (!this.channel.engine.buffers[this.bufferKey]) return;

      this.ready = true;
      this.playing = true;

      this.buffer = this.channel.engine.buffers[this.bufferKey];

      this.bufferSource.buffer = this.buffer;

      this.bufferSource.start(0);
      this.bufferSource.onended = this.onended.bind(this);

      this.currentTime = 0;

      this.currentTime += this.bufferSource.playbackRate.value * delta;
    }

    if (this.fadeTarget !== this.fadeMod) {

      this.fadeMod = SoundOnDemand.moveTo(this.fadeMod, this.fadeTarget, delta * this.fadeSpeed);

      this.updateVolume();

    } else if (this.fadeTarget === 0) {

      this.pause();

    }



  },

  pause: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  stop: function() {

    this.channel.remove(this);

    this.bufferSource.stop(0);

    this.playing = false;

  },

  resume: function() {

    this.createNodes();

    this.bufferSource.buffer = this.buffer;

    this.currentTime = this.currentTime % this.buffer.duration;
    this.bufferSource.start(0, this.currentTime);

    this.rate(this.current.rate);
    this.volume(this.current.volume);
    this.loop(this.current.loop);

    this.channel.add(this);

    this.playing = true;

  },

  fadeTo: function(target, duration) {

    if (!this.playing && this.ready) this.resume();

    duration = duration || 1.0;

    this.fadeTime = 0;
    this.fadeTarget = target;
    this.fadeDuration = duration;

    this.fadeSpeed = Math.abs(target - this.fadeMod) / duration;

    return this;

  },

  fadeIn: function(duration) {

    if (!this.playing && this.ready) this.resume();

    this.fadeMod = 0;
    this.fadeTo(1.0, duration);

    return this;

  },

  fadeOut: function(duration) {

    this.fadeTo(0, duration || 1.0);

    return this;

  },



};

PLAYGROUND.SoundOnDemand = function(app) {
  app.audio = new SoundOnDemand({
    audioContext: app.audioContext
  });

  app.audio.path = app.getPath("sounds");

  app.loadSounds = function() {

    for (var i = 0; i < arguments.length; i++) {

      var key = arguments[i];

      this.loader.add();

      this.audio.load(key).then(
        this.loader.success.bind(this.loader),
        this.loader.error.bind(this.loader)
      );

    }

  };

};

PLAYGROUND.SoundOnDemand.plugin = true;
ENGINE = { };
ENGINE.Benchmark = {

  create: function() {

    this.music = app.music.play("gameover").fadeIn(4).loop();

    this.ready = false;

    // this.gradient = app.layer.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);
    // this.gradient.addColorStop(0.0, "transparent");
    // this.gradient.addColorStop(1.0, "#000");

    // JIT warmup
    this.didWarmup = false;
    this.steps = 0;
    this.iotaList = [];
    this.frameTimes = [];
    this.scores = [];
    this.runCount = 0;
    this.skipCount = 0;
    this.skipResetCount = 0;
    this.resetCount = 0;
    this.scoreStack = [];
    this.frameTime = 0.0;
    this.startTime = Date.now();
  },


  pointerdown: function() {

    if (this.ready) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'start'
        });
      }

      this.music.fadeOut();

      app.setState(ENGINE.Game);
    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Splashpage'
      });
    }

    this.startMod = 0;

    this.iotaCount = this.app.baseline ? Math.floor(this.app.baseline * 0.7) : 1;

    this.app.baseline = 0;

    this.reset();

  },

  // Called between benchmark loops
  reset: function() {
    this.steps = 0;
    this.frameTimes.length = 0;
    this.skipCount = 0;
    // JIT warmup settings (run unbound loops)
    if (!this.didWarmup) {
      // console.time('Warmup');
      this.app.unbound = true;
      this.app.immidiate = false;
    } else {
      this.app.unbound = false;
      this.app.immidiate = true;
    }
    if (this.iotaList.length == 0) {
      this.addIotas(this.didWarmup ? this.iotaCount : 1);
    }
  },

  step: function(dt) {
    if (this.ready) {
      return;
    }

    var before = performance.now();

    this.iotaList.forEach(function(iota) {
      iota.step(dt);
    });

    this.frameTime = performance.now() - before;

    if (!this.didWarmup) {
      // State: JIT Warmup
      this.stepWarmUp();
    } else if (this.frameTime) {
      // Stresstesting
      this.stepStressTest()
    }

  },

  stepWarmUp: function() {

    this.steps++;

    if (this.steps > 1100) {
      this.didWarmup = true;
      // console.timeEnd('Warmup');
      // console.log('Warmup with %d iotas', this.iotaList.length);
      this.reset();
    }
  },

  stepStressTest: function() {
    var add = 1;
    var frameTimes = this.frameTimes;
    var MAX_FRAMES = 45;
    var MIN_FRAMES = 15;
    var COST = 8;
    var ERROR = 0.25;
    var frameTime = this.frameTime;
    if (frameTimes.unshift(frameTime) > MAX_FRAMES) {
      frameTimes.length = MAX_FRAMES;
    }
    if (frameTimes.length >= MIN_FRAMES) {
      var sample = this.analyze(frameTimes);
      var score = this.iotaList.length;
      if (sample.rse <= ERROR && sample.mean > COST) {
        this.pushScore(score);
        return;
      }
      if (sample.rse > ERROR || sample.mean > COST) {
        // console.log('Skip #' + this.skipCount);
        this.skipCount++;
        if (this.skipCount > 60) {
          console.log(
            '[RESET STEP] High sampling error %f%% or mean %fms for %d entities.',
            sample.rse * 100, sample.mean, score
          );
          this.iotaCount = Math.floor(this.lastScore * 0.7);
          this.skipResetCount++;
          if (this.skipResetCount > 10) {
            this.finalize(false);
            return;
          }
          this.finalize(true);
        }
        return;
      }
      this.skipCount = 0;
      add = Math.round(COST / sample.mean);
    }

    this.addIotas(add);
  },

  pushScore: function(score) {
    var SAVE_SCORES = 3;
    var MIN_SCORES = 5;
    var MAX_SCORES = 10;
    var ERROR = 0.15;

    this.skipResetCount = 0;
    var scores = this.scores;
    this.runCount++;
    if (scores.unshift(score) > MAX_SCORES) {
      scores.length = MAX_SCORES;
    }
    this.iotaCount = Math.ceil(score * 0.7);
    var l = scores.length;
    if (l >= MIN_SCORES) {
      var sample = this.analyze(scores);
      if (sample.rse < ERROR) {
        this.resetCount = 0;
        this.app.baseline = Math.round(sample.mean);
        if (window.ga) {
          ga('send', {
            'hitType': 'event',
            'eventCategory': 'game',
            'eventAction': 'baselined',
            'eventValue': this.app.baseline,
            'nonInteraction': true
          });
        }
        this.app.baselineErr = sample.rse;
        this.scores.splice(SAVE_SCORES);
        this.finalize(false);
        return;
      } else {
        console.log(
          '[SCORE RESET] Standard error %f%% too high in score samples.',
          sample.rse * 100
        );
        this.resetCount++;
        if (this.resetCount > 10) {
          this.scores.splice(0);
          console.log('[BAIL] Too many [RESET SCORE].');
          if (window.ga) {
            ga('send', 'exception', {
              'exDescription': 'BenchmarkResetOverflow',
              'exFatal': false
            });
          }
          this.finalize(false);
          return;
        }
      }
    }
    this.finalize(true);
  },

  finalize: function(restart) {

    if (!restart) {
      // Remove iotas
      this.iotaCount = 0;
      this.runCount = 0;
      // Reset benchmark engine settings
      this.app.unbound = false;
      this.app.immidiate = false;
    }
    // Reduce iotaList to iotaCount
    this.iotaList.splice(this.iotaCount).forEach(function(iota) {
      iota.destroy();
    });
    if (restart) {
      this.reset();
    } else {
      if (window.ga) {
        ga('send', {
          'hitType': 'timing',
          'timingCategory': 'Benchmark',
          'timingVar': 'Loading',
          'timingValue': Date.now() - this.startTime
        });
      }
      this.ready = true;
      app.tween(this).to({
        startMod: 1.0
      }, 1.0, "outElastic");
    }

  },

  addIotas: function(count) {

    for (var j = 0; j < count; j++) {

      this.iotaList.push(new Iota(this.app, this));

    }

  },

  render: function() {

    /* get reference to the application */

    var app = this.app;

    /* get reference to drawing surface */

    var layer = this.app.layer;

    /* clear screen */

    layer.clear("#282245");


    layer.drawImage(app.images.splash, app.center.x - app.images.splash.width / 2 | 0, app.center.y - app.images.splash.height / 2 | 0)

    layer.save();
    layer.translate(600, 290);

    layer.align(0.5, 0.5);
    layer.scale(4, 4);
    layer.globalAlpha(0.4);
    layer.globalCompositeOperation("lighter");
    layer.drawImage(app.images.flare, 128 * (32 * (app.lifetime % 1.5 / 1.5) | 0), 0, 128, 128, 0, 0, 128, 128);
    layer.restore();


    app.fontSize(48);



    if (!this.ready) {
      var textX = app.center.x;
      var textY = app.center.y - 16;

      layer.fillStyle("rgba(0,0,0,0.5").fillRect(0, textY - 54, app.width, 74);

      layer.fillStyle("#000").textAlign("center").fillText("LOADING... please wait", textX, textY - 4);
      layer.fillStyle("#fff").textAlign("center").fillText("LOADING... please wait", textX, textY);

    } else {

      var textX = app.center.x + 100 + (1 - this.startMod) * 1000;
      var textY = app.center.y - 10;

      layer.a(0.5 + Utils.osc(app.lifetime, 1) * 0.5);
      layer.fillStyle("#000").textAlign("center").fillText("CLICK TO START!", textX, textY - 4);
      layer.fillStyle("#fa0").textAlign("center").fillText("CLICK TO START!", textX, textY);
      layer.a(1.0);

    }


    // app.ctx.fillStyle = this.gradient;
    // app.ctx.fillRect(0, 0, app.width, app.height);

    // this.iotaList.forEach(function(iota) {
    //   iota.render(layer);
    // });

    // layer
    //   .fillStyle('#fff')
    //   .font("14px 'arial'")
    //   .fillText('Stress test #' + this.runCount, 5, 15)
    //   .fillText('Entities: ' + this.iotaList.length, 5, 30)
    //   .fillText('Frametime:' + this.frameTime.toFixed(1), 5, 45);
  },

  analyze: function(population) {

    var l = population.length;
    var sum = 0.0;
    var sumsq = 0.0;
    for (var i = 0; i < l; i++) {
      sum += population[i];
      sumsq += population[i] * population[i];
    }
    var mean = sum / l;
    var sd = Math.sqrt(sumsq / l - sum * sum / (l * l));
    var se = sd / Math.sqrt(l);
    // standard error at 95% confidence
    var se95 = 1.96 * se;
    var rse = se / mean;
    return {
      mean: mean,
      sd: sd,
      se: se,
      se95: se95,
      rse: rse
    }

  },

  nearest: function(from, entities) {

    var min = -1;
    var result = null;

    for (var i = 0; i < entities.length; i++) {

      var to = entities[i];

      if (from === to) continue;

      var distance = this.distance(from, to);

      if (distance < min || min < 0) {
        min = distance;
        result = to;
      }

    }

    return result;
  },

  distance: function(a, b) {

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx * dx + dy * dy);

  }
};

var images = ['firefox', 'firefox_beta', 'firefox_developer_edition', 'firefox_nightly'];

function Iota(app, parent) {
  this.x = 0.0;
  this.y = 0.0;
  this.vx = 0.0;
  this.vy = 0.0;
  this.vr = 0.0;
  this.alpha = 0.0;
  this.angle = 0.0;
  this.app = app;
  this.parent = parent;
  this.x = Math.random() * app.width;
  this.y = Math.random() * app.height;
  this.maxVel = 100.0;
  this.maxTorq = Math.PI * 10;
  this.vx = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vy = Math.random() * this.maxVel * 2 - this.maxVel;
  this.vr = Math.random() * this.maxTorq * 2 - this.maxTorq;
  this.image = app.images[images[Math.round(Math.random() * 3)]];
  this.region = Utils.random([
    [548, 88, 46, 47],
    [544, 142, 46, 48],
    [544, 200, 46, 47],
    [545, 253, 44, 48]
  ]);
  this.maxForce = 100.0;
  this.alpha = 0.2 + Math.random() * 0.8;
  this.angle = Math.random() * Math.PI;
}

Iota.prototype = {

  step: function(dt) {

    app.state.nearest(this, this.parent.iotaList);

    var iotaList = this.parent.iotaList;
    var forcex = 0.0;
    var forcey = 0.0;
    var forces = 0;
    var maxDist = 60.0;
    for (var i = 0, l = iotaList.length; i < l; i++) {
      var distx = (this.x - iotaList[i].x) / maxDist;
      var disty = (this.y - iotaList[i].y) / maxDist;
      var signx = Math.sign(distx);
      var signy = Math.sign(disty);
      var absx = Math.abs(distx);
      var absy = Math.abs(disty);
      if (absx < 1 && absy < 1) {
        forcex += signx + absx * signx;
        forcey += signy + absy * signy;
        forces++;
      }
    }

    if (forces == 0) {
      forces = 1;
    }
    forcex = Math.max(-this.maxForce, Math.min(this.maxForce, forcex / forces)) * 500;
    forcey = Math.max(-this.maxForce, Math.min(this.maxForce, forcey / forces)) * 500;
    this.vx = this.vx * 0.99 + forcex * 0.01;
    this.vy = this.vy * 0.99 + forcey * 0.01;

    var x = this.x + this.vx * dt;
    if (x < 0 || x > this.app.width) {
      x = Math.random() * this.app.width;
    }
    this.x = x;

    var y = this.y + this.vy * dt;
    if (y < 0 || y > this.app.height) {
      y = Math.random() * this.app.height;
    }
    this.y = y;
    this.angle += this.vr * dt;
  },

  // render: function(layer) {

  //   return;

  //   layer.context.save();
  //   layer.context.translate(this.x | 0, this.y | 0);
  //   // layer.a(this.alpha);
  //   layer.context.fillStyle = "#f00";
  //   layer.context.fillRect(this.x, this.y, 64, 64);
  //   layer.context.fillStyle = "#fff";
  //   layer.context.beginPath();
  //   layer.context.moveTo(this.x, this.y);
  //   layer.context.arc(this.x, this.y, 64, 0, Math.PI * 2);
  //   layer.context.rotate(this.angle);
  //   layer.drawRegion(app.images.spritesheet, this.region, 0, 0);
  //   layer.context.restore();
  // },

  destroy: function() {
    this.app = null;
    this.parent = null;
  }

}
ENGINE.BackgroundStars = function() {

  this.color = "#0af";

  this.count = Math.max(app.height, app.width) / 16 | 0;

  this.x = 0;
  this.y = 0;

  this.populated = false;
  this.image = app.getColoredImage(app.images.particles, this.color);

};

ENGINE.BackgroundStars.prototype = {

  images: {},

  colors: ["#afc", "#fa0"],

  sprites: [
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  quota: 0.5,

  populate: function(fill) {

    this.stars = [];

    for (var i = 0; i < this.count; i++) {
      this.spawnStar(fill);
    }

  },

  spawnStar: function(fill) {

    var star = {
      x: Math.random() * app.width,
      y: Math.random() * app.height,
      z: 0.1 + 0.9 * Math.random(),
      s: Utils.random([1, 2, 3]),
      spriteIndex: Math.random() * this.sprites.length | 0
    };

    star.lx = star.x;
    star.ly = star.y;

    this.stars.push(star);

  },

  wrap: function(star) {

    if (star.x > app.width) star.x = 0;
    if (star.y > app.height) star.y = 0;

    if (star.x < 0) star.x = app.width;
    if (star.y < 0) star.y = app.height;

  },

  step: function(dt) {

    if (!this.populated) {
      this.populated = true;
      this.populate(true);
    }

    var diffX = (10 + app.game.score) * dt;
    var diffY = (10 + app.game.score) * dt;


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      this.wrap(star);

      star.x += diffX * star.z;
      star.y += diffY * star.z;

    }

  },

  render: function(dt) {


    for (var i = 0; i < this.stars.length; i++) {

      var star = this.stars[i];

      var sprite = this.sprites[star.spriteIndex];

      app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
        star.x, star.y, sprite[2], sprite[3]);


    }

  }

};
ENGINE.CircleExplosion = function(args) {

  Utils.extend(this, {

    attachedTo: false,
    radius: 0,
    alpha: 1.0,
    duration: 0.5

  }, args);

  this.radius = 0;

  this.tween = app.tween(this).discard().to({
    radius: args.radius
  }, this.duration, "outElastic").to({
    radius: 0
  }, this.duration, "outElastic");

};

ENGINE.CircleExplosion.prototype = {

  constructor: ENGINE.CircleExplosion,

  type: "circleExplosion",

  action: function() {

    app.sound.play("laser");

  },

  step: function() {

    if(this.attachedTo) {
      this.x = this.attachedTo.x;
      this.y = this.attachedTo.y;
    }

    if (this.tween.finished) this.dead = true;

  },

  render: function() {

    if (this.radius > 0) {
      
      app.ctx.beginPath();
      app.ctx.fillStyle = this.color;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      app.ctx.fill();
      app.ctx.globalCompositeOperation = "source-over";


    }

  }

};
ENGINE.Ship = function(args) {

  Utils.extend(this, {

    damage: 1,
    firerate: 0.5,
    speed: 160,
    radius: 16,
    rotationSpeed: 5,
    hp: 10,
    range: 200,
    force: 0,
    forceDirection: 0,
    targetTimeout: 0,
    hitLifespan: 0,
    scale: 1.0,
    rank: 0,
    kills: 0

  }, defs.ships[args.type], args);

  this.random = this.game.random();

  this.maxHp = this.hp;

  this.lifetime = this.game.random() * 10;
  this.cooldown = this.firerate;
  this.desiredDirection = this.direction = this.game.random() * 6;

  this.color = defs.teamColor[this.team];

  this.image = app.images.spritesheet;

  if (this.team) this.applyUpgrades(this.game.upgrades);
  else this.applyDifficulty();

};

ENGINE.Ship.prototype = {

  constructor: ENGINE.Ship,

  hoverable: true,

  frozenSprite: [193, 86, 11, 19],

  quota: 2,

  pointerenter: function() {

    this.repair();

  },

  ranks: [
    [318, 131, 10, 5],
    [333, 131, 10, 10],
    [348, 131, 10, 15],
    [360, 131, 10, 8],
    [372, 131, 10, 13],
    [384, 131, 10, 18],
    [396, 131, 15, 16]
  ],

  applyDifficulty: function() {

    var difficulty = this.game.wave / 30;

    this.speed *= 1 + difficulty;
    this.damage *= 1 + difficulty;

  },

  applyUpgrades: function(upgrades) {

    var hpmod = this.hp / this.maxHp;

    this.damage = 1 + upgrades.damage * 0.25;
    this.maxHp = upgrades.life * 10;
    this.hp = hpmod * this.maxHp;
    this.speed = 80 + 10 * upgrades.speed;


    if (this.free) {
      this.damage *= 2;
      this.maxHp *= 2;
      this.hp *= 2;
    }

  },

  die: function() {

    if (!this.team) this.game.score++;

    if (this.game.benchmark) {

      this.hp = this.maxHp;

    } else {

      this.dead = true;

    }

    if (this.boss) {

      this.game.shake();

      for (var i = 0; i < 16; i++) {

        this.game.add(ENGINE.Resource, {
          x: this.x,
          y: this.y
        });

      }

    }

    this.game.explosion(this.x, this.y, 16, this.color);

    this.game.add(ENGINE.Resource, {
      x: this.x,
      y: this.y,
      parent: this
    });

    if (this.planet) this.planet.ships--;

    if (!this.team) this.game.onenemydeath(this);

    app.sound.play("explosion").rrate(0.2);

  },

  applyDamage: function(damage, attacker) {

    if (this.dead) return;

    this.hitLifespan = 0.1;

    this.hp -= damage;

    if (this.hp <= 0) {
      this.die();
      if (attacker) attacker.onscore();
    }

    this.game.explosion(this.x, this.y, 3, this.color);


  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    // if (!this.team) dt *= Math.sin((app.lifetime % 2 / 2) * Math.PI);

    this.lifetime += dt;

    if ((this.targetTimeout -= dt) <= 0) {

      this.target = false;
      this.targetTimeout = 0.25;

    }

    if (!this.target) {

      this.target = this.getTarget(this.game.entities);

    } else if (this.target.dead) {

      this.target = null;

    }


    this.foresightCollision();

    var destination = false;
    var speed = this.speed;

    var ox = 0;
    var oy = 0;

    if (this.team && this.target) {

      ox = Math.cos(this.random * 6.28) * 100;
      oy = Math.sin(this.random * 6.28) * 100;

      destination = this.target;

    } else destination = this.game.player.planet;

    if (this.team && Utils.distance(this, app.center) > app.center.y) {

      destination = app.center;

    }

    if (this.collisionDanger) {

      /*

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI / 2;

        destination = {
          x: this.collisionDanger.x + Math.cos(angle) * 150,
          y: this.collisionDanger.y + Math.cos(angle) * 150
        }

        speed *= 1 - 0.5 * Math.abs(Utils.circDistance(this.direction, angle) / (Math.PI));

      */

      if (this.collisionDistance < 50) {

        var angle = Math.atan2(this.collisionDanger.y - this.y, this.collisionDanger.x - this.x) - Math.PI;

        this.x = this.collisionDanger.x + Math.cos(angle) * 50;
        this.y = this.collisionDanger.y + Math.sin(angle) * 50;

      }

      // speed *= this.collisionDistance / 200;

    }


    if (destination) {

      this.desiredDirection = Math.atan2(destination.y - this.y + ox, destination.x - this.x + oy);

    }

    if (!this.frozen) {

      this.direction = Utils.circWrapTo(this.direction, this.desiredDirection, dt * this.rotationSpeed);

    }

    this.move(dt);

    /* firing mechanics */

    this.cooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    if (!this.team && Utils.distance(this, this.game.playerPlanet) < this.game.playerPlanet.radius) {

      if (!this.game.benchmark) {

        this.game.player.planet.applyDamage(1, this);
        this.die();

      }

    }

    this.hitLifespan -= dt;

  },


  move: function(dt) {

    if (!this.frozen) {

      Utils.moveInDirection.call(this, this.direction, this.speed * dt);

    }

    if (this.force > 0) {

      this.force -= 200 * dt;

      Utils.moveInDirection.call(this, this.forceDirection, this.force * dt);

    }

  },

  canFire: function() {

    if (this.frozen) return false;

    if (this.cooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.cooldown = this.firerate;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: this.damage,
      parent: this
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  render: function() {

    /* sprite */

    app.ctx.save();
    app.ctx.translate(this.x, this.y);

    this.renderHUD();

    if (this.hitLifespan > 0) {

      var image = app.getColoredImage(this.image, "#fff", "source-in");

    } else {

      var image = this.image;

    }

    app.ctx.rotate(this.direction - Math.PI / 2);
    app.ctx.scale(this.scale, this.scale);
    app.ctx.drawImage(image, this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]);
    app.ctx.restore();

    if (this.frozen) {

      app.ctx.drawImage(app.images.spritesheet,
        this.frozenSprite[0], this.frozenSprite[1], this.frozenSprite[2], this.frozenSprite[3],
        this.x - this.frozenSprite[2] / 2, this.y - this.frozenSprite[3] / 2, this.frozenSprite[2], this.frozenSprite[3]);

    }

    if (this.team) {

      var rankSprite = this.ranks[this.rank];

      app.ctx.drawImage(app.images.spritesheet,
        rankSprite[0], rankSprite[1], rankSprite[2], rankSprite[3],
        this.x + 24, this.y - 24, rankSprite[2], rankSprite[3]);


    }

  },

  renderHUD: function() {

    if (this.frozen) return;

    var w = Math.min(100, (this.maxHp / 160) * 100 | 0);

    var mod = this.hp / this.maxHp;

    app.ctx.fillStyle = this.color;
    app.ctx.strokeStyle = this.color;
    app.ctx.lineWidth = 2;
    app.ctx.fillRect(-w * mod / 2 | 0, 32, w * mod, 5);
    app.ctx.strokeRect(-w * 0.5 | 0, 32, w, 5);

  },

  collisionRange: 100,

  foresightCollision: function() {

    this.collisionDanger = false;

    var self = this;

    var pool = Utils.filter(this.game.entities, function(e) {

      if (e.type !== "asteroid") return false;

      if (Utils.distance(self, e) > self.collisionRange) return false;

      return true;

    });

    this.collisionDanger = Utils.nearest(this, pool);

    if (this.collisionDanger) this.collisionDistance = Utils.distance(this, this.collisionDanger);

  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  repair: function() {

    if (this.hp >= this.maxHp) return;

    this.game.add(ENGINE.CircleExplosion, {
      color: "#a04",
      radius: 32,
      attachedTo: this
    });

    this.hp = this.maxHp;

  },

  onscore: function() {

    this.kills++;

    this.rank = Math.min(this.ranks.length - 1, this.kills / 3 | 0);

  }

};
ENGINE.Bullet = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.sprite = this.sprites[this.team];

};

ENGINE.Bullet.prototype = {

  sprites: [
    [126, 25, 4, 37],
    [133, 25, 4, 37]
  ],

  quota: 0.5,

  constructor: ENGINE.Bullet,

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

  },

  hit: function(target) {

    target.applyDamage(this.damage, this.parent);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    app.ctx.save();

    app.ctx.translate(this.x, this.y);
    app.ctx.rotate(this.direction + Math.PI / 2);
    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Asteroid = function(args) {

  this.max = this.resources = 5;

  Utils.extend(this, {

    hitLifespan: 0

  }, args);

  this.radius = 32;

  this.direction = Math.atan2(app.center.y - this.y, app.center.x - this.x);
  this.speed = 8 + this.game.random() * 32;

  this.lifetime = 0;

  this.kind = this.game.random() > 0.8 ? "gold" : "normal";

  this.spriteIndex = Utils.random(0, 2);

  this.collectibles = 0;


};

ENGINE.Asteroid.prototype = {

  constructor: ENGINE.Asteroid,

  quota: 0.5,

  hoverable: "mining",
  silent: true,
  instant: true,

  type: "asteroid",


  sprites: {

    normal: [
      [341, 239, 52, 39],
      [337, 288, 61, 61],
      [338, 354, 57, 58]
    ],

    gold: [
      [408, 238, 52, 39],
      [404, 287, 59, 61],
      [403, 353, 59, 58]
    ],

    hit: [
      [476, 127, 52, 39],
      [472, 176, 61, 61],
      [473, 242, 57, 58]
    ]

  },

  pointerenter: function() {

    this.slowdown = true;

  },

  pointerleave: function() {

    this.slowdown = false;

  },

  die: function() {

    app.sound.play("explosion").rate(0.6);

    if (Math.random() > 0.7) {

      this.game.add(ENGINE.Powerup, {
        x: this.x,
        y: this.y
      });

    }

    this.game.remove(this);
    this.game.explosion(this.x, this.y, 16, "#aaa");
    this.game.spawnAsteroid();

  },

  dig: function() {

    this.hitLifespan = 0.1;

    this.resources--;

    if (this.resources <= 0) {
      this.die();
    }

    var count = this.kind === "gold" ? 2 : 1;

    this.spawnResources(count);

    this.game.explosion(this.x, this.y, 4, "#fa0");

    if (!this.game.benchmark) app.sound.play("dig");

  },

  spawnResources: function(count) {

    for (var i = 0; i < count; i++) {

      this.game.add(ENGINE.Resource, {
        x: this.x,
        y: this.y,
        parent: this
      });

    }

  },

  step: function(dt) {

    dt *= this.game.timeFactor;

    this.lifetime += dt;

    this.hitLifespan -= dt;

    var speed = this.speed * (this.slowdown ? 0.25 : 1.0);

    this.x += Math.cos(this.direction) * speed * dt;
    this.y += Math.sin(this.direction) * speed * dt;

    this.game.wrap(this);

    if (Utils.distance(this, app.center) < this.game.player.planet.radius + this.radius) {

      if (this.game.player.planet.asteroidsShield) {

        this.spawnResources(5);

      } else {

        this.game.player.planet.applyDamage(1, this);

      }

      this.die();

    }

  },

  render: function() {

    if (this.hitLifespan > 0) {
    
      var sprite = this.sprites.hit[this.spriteIndex];
    
    } else {
      
      var sprite = this.sprites[this.kind][this.spriteIndex];

    }

    var scale = 0.5 + 0.5 * this.resources / this.max;

    app.ctx.save();

    app.ctx.translate(this.x, this.y)
    app.ctx.rotate(this.lifetime)
    app.ctx.scale(scale, scale)
    app.ctx.drawImage(app.images.spritesheet,
      sprite[0], sprite[1], sprite[2], sprite[3], -sprite[2] / 2, -sprite[3] / 2, sprite[2], sprite[3]
    );
    app.ctx.restore();

  }

};
ENGINE.Cursor = function(game, team, planet) {

  this.game = game;

  this.actionTimeout = 0;

  this.dotRadius = 8;
  this.capacity = 10;
  this.resources = 4;
  this.x = 0;
  this.y = 0;
  this.hoverTime = 0;
  this.team = team;
  this.color = defs.teamColor[team];
  this.planet = planet;

  this.targetTimeout = this.targetInterval = 0.25;
  this.fireCooldown = this.fireInterval = 0.25;

  /* timers */

  this.times = {
    mining: 0.5,
    collect: 0.05,
    build: 0.5,
    repair: 2
  };


  this.tween = app.tween(this);

  if (!this.team) {

    this.ai = new ENGINE.Ai(this);
    this.ai.set("idle");

  }

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: this.color
  });


};

ENGINE.Cursor.prototype = {

  constructor: ENGINE.Cursor,

  poke: function() {

    this.tween = app.tween(this).discard()

    .to({
      dotRadius: 16
    }, 0.1, "outSine")

    .to({
      dotRadius: 8
    }, 0.05, "inSine");

  },

  step: function(dt) {

    var prevEntity = this.entity;

    this.entity = this.getHoveredEntity();

    if (this.entity !== prevEntity) {

      if (prevEntity && prevEntity.pointerleave) prevEntity.pointerleave(this);
      if (this.entity && this.entity.pointerenter) this.entity.pointerenter(this);

      this.onentitychange();

    }

    if (this.action) {

      this.hoverTime += dt;

      this.progressAction(dt);

    }

    /* firing mechanics */

    if (this.target && this.target.dead) this.target = false;

    if ((this.targetTimeout -= dt) <= 0) {

      this.targetTimeout = 0.5;

      this.target = this.getTarget();

    }


    this.fireCooldown -= dt;

    if (this.canFire()) {

      this.fire();

    }

    this.trail.step(dt);


  },

  getTarget: function() {

    var pool = [];

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;

      if (Utils.distance(entity, this) > 200) continue;
      if (entity.team !== this.team) pool.push(entity);

    }

    return Utils.nearest(this, pool);

  },

  onentitychange: function() {

    this.actionComplete = false;

    this.hoverTime = 0;

    if (this.entity) {

      this.action = this.entity.hoverable;
      this.resetAction();

      if (this.entity.instant) this.actionTimeout = 0;


    } else this.action = false;

    /*
        if (!this.actionSound) this.actionSound = app.sound.play("action").loop().rate(0.5);

        if (!this.action) {
          this.actionSound.stop();
        } else {
          this.actionSound.fadeIn();
        }
        */
    this.updateTooltip();


  },

  resetAction: function() {


    this.actionTimeout = this.times[this.action];

    this.actionDuration = this.actionTimeout;

  },

  upgrade: function(key) {

    this.game.upgrades[key] ++;

    this.game.buttons[key].count = this.getPrice(key);

    var ships = Utils.filter(this.game.entities, function(e) {

      return (e instanceof ENGINE.Ship) && e.team;

    });

    for (var i = 0; i < ships.length; i++) {

      var ship = ships[i];

      this.game.add(ENGINE.CircleExplosion, {
        color: "#0af",
        radius: 32,
        attachedTo: ship
      });

      ship.applyUpgrades(this.game.upgrades)

    }

  },

  getPrice: function(key) {

    return Math.pow(2, this.game.upgrades[key]);

  },

  canProgress: function() {

    switch (this.action) {

      case "repair":

        return this.planet.hp < this.planet.maxHP;

        break;

      case "build":

        if (this.entity.key === "fighter") {

          if (this.game.playerPlanet.max - this.game.playerPlanet.ships <= 0) return false;

          return this.resources > 0;
        } else {

          return this.resources >= this.getPrice(this.entity.key);

        }

        break;

      default:

        return true;

        break;

    }
  },

  progressAction: function(dt) {

    if (this.canProgress() && (this.actionTimeout -= dt) < 0) {

      this.finalizeAction();
      this.resetAction();

    };

    this.progress = 1 - this.actionTimeout / this.actionDuration;


  },

  finalizeAction: function() {

    this.actionComplete = true;

    switch (this.action) {

      case "repair":

        this.planet.repair();

        break;

      case "mining":

        this.entity.dig();

        break;


      case "build":

        switch (this.entity.key) {

          case "fighter":

            this.planet.spawnShip("fighter");
            this.resources -= 1;
            if (!this.game.benchmark) app.sound.play("build");

            break;

          case "life":
          case "damage":
          case "speed":

            this.resources -= this.getPrice(this.entity.key);

            this.upgrade(this.entity.key);

            if (!this.game.benchmark) app.sound.play("upgrade");


            break;

        }

        break;
    }

  },

  hit: function() {

    this.game.shake();

    this.planet.applyDamage(1, this.planet);

    this.game.add(ENGINE.CircleExplosion, {
      x: this.x,
      y: this.y,
      color: "#c02",
      radius: 32
    })

  },

  getHoveredEntity: function() {

    for (var i = 0; i < this.game.entities.length; i++) {

      var entity = this.game.entities[i];

      if (entity.hoverable && Utils.distance(entity, this) < entity.radius) return entity;

    }

    return null;

  },

  render: function() {

    this.trail.render();

    app.layer.fillStyle(this.color).fillCircle(this.x, this.y, this.dotRadius);

    if (this.action && !this.entity.silent) {

      var mod = Math.min(1, app.ease(2 * this.hoverTime, "outBounce"));

      app.ctx.save();
      app.ctx.translate(this.entity.x, this.entity.y);

      app.ctx.strokeStyle = this.color;
      app.ctx.lineWidth = 2;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, (this.entity.radius + 2) * mod, 0, Math.PI * 2);
      app.ctx.stroke();

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.globalAlpha = 0.25;
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, Math.PI * 2)
      app.ctx.stroke()
      app.ctx.globalAlpha = 1.0;

      app.ctx.lineWidth = 8;
      app.ctx.beginPath();
      app.ctx.arc(0, 0, this.entity.radius + 8, 0, this.progress * Math.PI * 2)
      app.ctx.stroke();

      app.ctx.restore();

    }



  },

  canFire: function() {

    if (!this.game.checkBonus("laser")) return;

    if (this.fireCooldown > 0) return;
    if (!this.target) return;
    if (Utils.distance(this, this.target) > this.range) return;

    this.fireCooldown = this.fireInterval;

    this.fire();

  },

  fire: function() {

    this.game.add(ENGINE.Bullet, {
      x: this.x,
      y: this.y,
      team: this.team,
      target: this.target,
      damage: 2,
      speed: 1000
    });

    if (!this.game.benchmark) app.sound.play("laser");

  },

  moveTo: function(destination) {

    this.destination = destination;

  },

  updateTooltip: function() {

    if (this.entity) {
      if (this.entity.tooltip) this.game.tooltip = this.entity.tooltip;
    } else {
      this.game.tooltip = false;
    }

  }

}
ENGINE.Resource = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  this.value = Math.random() * 3 | 0;

  this.sprite = this.sprites[this.value];
};

ENGINE.Resource.prototype = {

  constructor: ENGINE.Resource,

  quota: 0.7,

  sprites: [
    [333, 105, 10, 10],
    [320, 104, 12, 12],
    [303, 102, 16, 16]
  ],

  type: "resource",


  collect: function() {

    this.game.remove(this);

    if (!this.game.benchmark) app.sound.play("coin");

    this.game.player.poke();

    this.game.add(ENGINE.CircleExplosion, {
      color: "#fc0",
      radius: 8,
      attachedTo: this,
      duration: 0.25
    });

    this.game.player.resources += this.value;

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.poked && this.game.checkBonus("magnet")) {

      this.direction = Math.atan2(this.game.player.y - this.y, this.game.player.x - this.x);

      this.x += Math.cos(this.direction) * this.speed * dt;
      this.y += Math.sin(this.direction) * this.speed * dt;


      if (!this.force) {
        this.speed += 256 * dt;
      }

    } else {

      if (playerDistance < 100) {
        this.poked = true;
        this.speed = 128;
      }

    }


    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var scale = 0.2 + 0.8 * Math.sin(Math.PI * (app.lifetime % 0.2 / 0.2));

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, 1.0);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.Button = function(args) {

  Utils.extend(this, {

    radius: 32

  }, args);


  this.image = app.images.spritesheet;

};

ENGINE.Button.prototype = {

  constructor: ENGINE.Button,

  type: "button",

  pointerenter: function() {

    app.tween(this).discard().to({
      radius: 24
    }, 0.1).to({
      radius: 32
    }, 0.2, "outSine");

  },

  action: function() {


    app.sound.play("laser");

  },

  step: function() {

  },

  render: function() {


    if (this.sprite) {
      var scale = this.radius / 32;

      app.ctx.save();

      app.ctx.translate(this.x, this.y);
      app.ctx.drawImage(this.image,
        this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
      );

      app.ctx.restore();

    }

    if (this.count) {
      app.layer.textAlign("center").font("bold 32px Arial").fillStyle(this.color).fillText(this.count, this.x, this.y - this.radius - 48);
    }

  }

};
ENGINE.Particle = function(args) {

  Utils.extend(this, {
    color: "#0fa",
    radius: 4
  }, args)

  this.spriteIndex = 0;

  this.reset();

};

ENGINE.Particle.prototype = {

  constructor: ENGINE.Particle,

  quota: 0.5,

  sprites: [
    [0, 0, 6, 6],
    [0, 7, 5, 5],
    [0, 13, 5, 5],
    [1, 19, 3, 3]
  ],

  reset: function() {

    this.lifetime = 0;
    this.duration = 0.5;

    this.direction = this.game.random() * 6.28;
    this.speed = 32 + this.game.random() * 128;

    this.speed *= 3;

    this.damping = this.speed * 2;

  },

  step: function(dt) {

    this.lifetime += dt;

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.speed = Math.max(0, this.speed - this.damping * dt);

    this.progress = Math.min(this.lifetime / this.duration, 1.0);

    if (this.progress >= 1.0) {
      this.x = 0;
      this.y = 0;
      this.progress = 0;
    }

    this.spriteIndex = this.progress * this.sprites.length | 0;

  },

  render: function() {


    // var s = this.size * (1 - this.progress);

    // if (s > 0) {
    if (this.progress >= 1.0) return;

    this.image = app.getColoredImage(app.images.particles, this.color || "#0fa");

    // app.ctx.fillStyle = this.color;
    // app.ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s)

    var sprite = this.sprites[this.spriteIndex];

    app.ctx.drawImage(this.image, sprite[0], sprite[1], sprite[2], sprite[3],
      this.x, this.y, sprite[2], sprite[3])

    // }

  }

};
ENGINE.Planet = function(args) {

  Utils.extend(this, {

    radius: 48,
    hp: 20,
    max: 100,
    ships: 0,
    repairProgress: 0,
    repairTime: 4,
    asteroidsShield: true,
    shieldScale: 0.0

  }, args);

  this.maxHP = this.hp;

  this.lifetime = 0;

};

ENGINE.Planet.prototype = {

  constructor: ENGINE.Planet,

  type: "planet",

  hoverable: "repair",

  sprite: [201, 215, 104, 104],

  shieldSprite: [492, 320, 124, 124],

  repair: function() {

    this.hp++;

  },

  applyDamage: function(damage, attacker) {

    this.game.shake();

    this.hp--;

    if (this.hp <= 0 && !this.game.benchmark) this.game.gameover();

    if (!this.game.benchmark) app.sound.play("planetHit");

    this.game.add(ENGINE.CircleExplosion, {
      x: attacker.x,
      y: attacker.y,
      color: "#a04",
      radius: 32
    })

  },

  step: function(dt) {

    this.lifetime += dt;

    var prevShield = this.asteroidsShield;
    this.asteroidsShield = false;this.game.checkBonus("shield");

    if (prevShield !== this.asteroidsShield) {

      app.tween(this).discard().to({
        shieldScale: this.asteroidsShield ? 1.0 : 0.0
      }, 0.5, "outElastic");

    }

  },

  spawnShip: function(type) {

    var ship = this.game.add(ENGINE.Ship, {
      x: this.x,
      y: this.y,
      type: type,
      team: 1,
      planet: this
    });

    ship.forceDirection = Math.random() * 6;
    ship.force = 200;

    this.ships++;

  },

  render: function() {

    app.layer.align(0.5, 0.5);
    app.layer.drawRegion(app.images.spritesheet, this.sprite, this.x, this.y);
    app.layer.textAlign("center").font("bold 48px Arial").fillStyle("#fff").fillText(this.hp, this.x, this.y - 24);
    app.layer.realign();

    if (this.asteroidsShield && this.shieldScale > 0) {
      var scale = this.shieldScale;
      app.ctx.save();
      app.ctx.globalAlpha = 0.5;
      app.ctx.globalCompositeOperation = "lighter";
      app.ctx.translate(this.x, this.y);
      app.ctx.scale(scale, scale);
      app.ctx.drawImage(app.images.spritesheet, this.shieldSprite[0], this.shieldSprite[1], this.shieldSprite[2], this.shieldSprite[3], -this.shieldSprite[2] / 2, -this.shieldSprite[3] / 2, this.shieldSprite[2], this.shieldSprite[3]);
      app.ctx.restore();
    }

  }

};
/* The counter in the top-left corner is:

AVERAGE FRAME TIME |  DEVICE  POWER   | ENTITIES COUNT
                     (baselineFactor)
*/


/* Reference baseline to calculate device power */

REFERENCE_BASELINE = 378;

/* Reference frame time to tell how well the game has been optimized */
/* Make it higher to give user more CPU power */

REFERENCE_FRAME_TIME = 0.8;

/* How much optimization value one ship drains */

SHIP_CPU_COST = 0.1;

ENGINE.Game = {

  bonuses: {

    magnet: 0.1,
    laser: 0.2,
    shield: 0.4

  },

  explosion: function(x, y, count, color) {

    if (!this.particlesPool) {

      this.particlesPool = [];

      for (var i = 0; i < 100; i++) {

        var particle = this.add(ENGINE.Particle, {
          x: x,
          y: y
        });

        this.particlesPool.push(particle);

      }

      this.particleIndex = 0;

    }

    for (var i = 0; i <= count; i++) {

      if (++this.particleIndex >= this.particlesPool.length) this.particleIndex = 0;;

      var particle = this.particlesPool[this.particleIndex];

      particle.x = x;
      particle.y = y;
      particle.color = color;

      particle.reset();

    }

  },

  random: function() {

    return this.benchmark ? 0.5 : Math.random();

  },

  add: function(constructor, args) {

    args = args || {};

    args.game = this;

    var entity = new constructor(args);

    this.entities.push(entity);

    return entity;

  },

  remove: function(entity) {

    entity.dead = true;

  },

  scaleComicBubble: function() {

    this.comicScale = 1.0;

    $comicbubble = document.body.querySelector("#comicbubble");

    var tween = app.tween(this).to({
      comicScale: 0.5
    });

    tween.onstep = function(app) {

      $comicbubble.style.transform = "scale(" + app.comicScale + "," + app.comicScale + ")";

    }

  },

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Game'
      });
    }

    app.renderer.setSmoothing(false);

    this.scaleComicBubble();

    localStorage.setItem("baseline", app.baseline);

    this.music = app.music.play("dust").volume(0.5).fadeIn(4).loop();

    this.gradient = app.ctx.createRadialGradient(app.center.x, app.center.y, 0, app.center.x, app.center.y, app.center.x);

    this.gradient.addColorStop(0.0, "transparent");
    this.gradient.addColorStop(1.0, "#000");

    this.reset();

  },

  leave: function() {

    this.music.fadeOut(2);

  },

  getScale: function(entity) {

    return 1 - Math.min(1.0, Utils.distance(entity, app.center) / (app.width * 0.5)) * 0.75;

  },

  spawnAsteroid: function() {

    var angle = Math.random() * Math.PI * 2;
    var radius = app.width / 2;
    var ox = Math.cos(angle) * radius;
    var oy = Math.sin(angle) * radius;

    this.add(ENGINE.Asteroid, {
      x: app.center.x + ox,
      y: app.center.y + oy
    });

  },

  reset: function() {

    this.spawnTimeout = 0;
    this.cpuUsage = 0;
    this.cpuBarProgress = 0;

    this.upgrades = {

      speed: 1,
      damage: 1,
      life: 1

    };

    delete this.particlesPool;

    this.score = 0;

    this.wave = 0;

    this.tooltip = false;

    this.entities = [];

    this.stars = this.add(ENGINE.BackgroundStars);

    this.playerPlanet = this.add(ENGINE.Planet, {
      x: app.center.x,
      y: app.center.y,
      team: 1
    });

    this.player = new ENGINE.Cursor(this, 1, this.playerPlanet);

    this.player.x = app.center.x;
    this.player.y = app.center.y;

    for (var i = 0; i < 8; i++) {

      this.spawnAsteroid();

    }

    var buttons = ["speed", "life", "damage"];

    this.buttons = {};

    for (var i = 0; i < buttons.length; i++) {

      var key = buttons[i];

      this.buttons[key] = this.add(ENGINE.Button, {
        color: defs.teamColor[1],
        x: app.center.x - 80 + i * 100,
        y: app.height - 70,
        sprite: defs.buttons[key],
        key: key,
        count: 1,
        hoverable: "build",
        tooltip: defs.tooltips[key]
      })
    }

    this.nextWave();

    this.explosion(app.center.x, app.center.y, 1);

  },

  cpuHistory: [],

  step: function(dt) {

    var before = performance.now();

    /* slow motion - when you collect freeze powerup */

    this.timeFactor = 1.0;

    if (this.freezeLifespan > 0) {

      this.freezeLifespan -= dt;
      this.timeFactor = 0.1;

    }

    /* update the game 10 times to magnitude results in profiler */

    var MAGNIFY = 5;

    var quota = 0.0;

    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      quota += entity.quota || 0.7;

      for (var j = 0; j < MAGNIFY; j++) {
        entity.step(dt / MAGNIFY);

        if (entity.dead) {
          this.entities.splice(i--, 1);
          break;
        }
      }
    }

    this.quota = quota;

    var frameTime = (performance.now() - before) / MAGNIFY;

    /* measure optimization */

    /* It's the average of 100 frame times */

    /*

      baselineFactor      - baseline vs reference sample to get device power
                            if the device is over-powered we artificialy
                            make frameTime higher to make it more fair among the players

      optimizationRating  - reference frame time divided by (current) average frame time
                            handicaped by baselineFactor - this gives a factor of
                            how well user optimized the game

                            Make REFERENCE_FRAME_TIME higher to give player MORE cpu output

    */


    this.cpuHistory.push(frameTime / quota);

    if (this.cpuHistory.length > 60) this.cpuHistory.shift();

    this.averageFrameTime = this.average(this.cpuHistory);

    this.optimizationRating = ((0.8 / app.baseline) / (this.averageFrameTime));

    this.player.step(dt);

    /* use optimization results to affect the game */

    this.applyOptimization(dt);


  },

  average: function(array) {

    if (!array.length) return 0;

    var sum = 0;

    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }

    return sum / array.length;

  },

  applyOptimization: function(dt) {

    var cpuUsage = 0;

    /* calculate (artificial) cpuUsage of ships
       if cpuUsage is greater than optimizationRating
       freeze a ship
    */

    for (var i = 0; i < this.entities.length; i++) {

      var entity = this.entities[i];

      if (!(entity instanceof ENGINE.Ship)) continue;
      if (!entity.team) continue;
      if (entity.free) continue;

      cpuUsage += SHIP_CPU_COST;

      if (cpuUsage < this.optimizationRating) {

        entity.frozen = false;

      } else {

        entity.frozen = true;

      }

    }

    /* tween cpuUsage instead of setting it instantly (less jittering) */

    this.cpuUsage = Utils.moveTo(this.cpuUsage, cpuUsage, Math.abs(this.cpuUsage - cpuUsage) * 0.25 * dt);
    this.realCpuUsage = cpuUsage;

    /* that's the value 0.0 - 1.0 that coresponds with the yellow power bar */

    this.cpuRatio = 1 - Math.min(1.0, this.cpuUsage / this.optimizationRating);
    this.cpuBarProgress = Utils.moveTo(this.cpuBarProgress, this.cpuRatio, 0.2 * dt);

    /* spawn ships if there is enough power */

    if ((this.spawnTimeout -= dt) <= 0) {

      this.spawnTimeout = 0.5;

      //if (this.cpuRatio > 0.5) this.playerPlanet.spawnShip("fighter");
      if (this.optimizationRating > this.realCpuUsage + 0.1) this.playerPlanet.spawnShip("fighter");

    }

  },

  shake: function() {

    this.shakeLifespan = 0.4;

  },

  render: function(dt) {

    if (!this.averageFrameTime) return;

    app.ctx.textBaseline = "top";
    app.ctx.save();

    app.ctx.fillStyle = "#282245";
    app.ctx.fillRect(0, 0, app.width, app.height);

    // app.ctx.fillStyle = this.gradient;
    //app.ctx.fillRect(0, 0, app.width, app.height);

    if (this.shakeLifespan > 0) {
      this.shakeLifespan -= dt;
      var chaos = Utils.random(-6, 6);
      app.ctx.translate(chaos, chaos)
    }

    for (var i = 0; i < this.entities.length; i++) {

      this.entities[i].render();

    }

    this.player.render();

    this.renderTooltip();

    app.ctx.textAlign = "right";
    app.ctx.font = "bold 16px Arial";
    app.ctx.fillStyle = "#fff";
    app.ctx.fillText("SCORE: " + this.score, app.width - 20, 20);

    this.renderCPUBar();
    // this.renderBonuses();

    app.ctx.textAlign = "center";
    app.ctx.font = "bold 64px Arial";
    app.ctx.fillStyle = "#fa0";
    app.ctx.fillText(this.player.resources, app.center.x - 180, app.height - 104);

    // app.ctx.textAlign = "left";
    // app.ctx.font = "bold 16px Arial";
    // app.ctx.fillStyle = "#fff";
    // app.ctx.fillText(
    //   this.optimizationRating.toFixed(2) + " | " +
    //   // this.baselineFactor.toFixed(2) + " | " +
    //   this.entities.length + ' + ' +
    //   this.quota.toFixed(1), 16, 16);

    app.ctx.restore();

  },

  barWidth: 200,

  renderCPUBar: function() {


    var width = 200;
    var currentWidth = this.barWidth * this.cpuBarProgress;

    app.ctx.drawImage(app.images.spritesheet,
      defs.frozenSprite[0], defs.frozenSprite[1], defs.frozenSprite[2], defs.frozenSprite[3],
      app.center.x - this.barWidth / 2 - 32, 24, defs.frozenSprite[2], defs.frozenSprite[3]);


    app.ctx.strokeStyle = "#fa0";
    app.ctx.fillStyle = "#fa0";
    app.ctx.lineWidth = 2;

    app.ctx.strokeRect(app.center.x - this.barWidth / 2, 16, this.barWidth, 32)
    app.ctx.fillRect(app.center.x - this.barWidth / 2, 16, currentWidth, 32)

    app.ctx.fillStyle = "#fff";
    app.ctx.textAlign = "center";
    app.fontSize(16);
    app.ctx.fillText("AVAILABLE CPU", app.center.x, 24);

    app.ctx.textAlign = "left";
    app.ctx.fillStyle = "#fa0";

    app.ctx.fillText("+ " + this.optimizationRating.toFixed(2), app.center.x + width / 2 + 16, 16);

    app.ctx.fillStyle = "#c40";
    app.ctx.fillText("- " + this.realCpuUsage.toFixed(2), app.center.x + width / 2 + 16, 32);

  },


  renderBonuses: function() {

    app.ctx.save();
    app.ctx.translate(app.center.x - this.barWidth / 2, 54);
    app.ctx.textAlign = "left";
    app.ctx.textBaseline = "top";

    var i = Object.keys(this.bonuses).length;

    for (var key in this.bonuses) {

      var threshold = this.bonuses[key];

      var x = this.barWidth * threshold;
      var y = i * 16;

      app.ctx.globalAlpha = this.checkBonus(key) ? 1.0 : 0.4;

      app.ctx.fillStyle = "#fff";
      app.ctx.fillRect(x, 0, 2, y);
      app.ctx.fillRect(x, y, 16, 2);

      app.ctx.fillStyle = "#fff";
      app.fontSize(12);
      app.ctx.fillText(defs.bonuses[key].toUpperCase(), x + 20, y - 6);

      i--;

    }

    app.ctx.restore();

  },


  renderTooltip: function() {

    if (!this.tooltip) return;

    app.layer.textAlign("center").fillStyle("#fff").font("16px Arial").textWithBackground(this.tooltip, app.center.x, app.height - 64, "rgba(0,0,0,0.6)", 16);

  },

  pointermove: function(e) {

    this.player.x = e.x;
    this.player.y = e.y;

  },

  wrap: function(entity) {

    if (entity.x + entity.radius < 0) entity.x = app.width + entity.radius;
    if (entity.x - entity.radius > app.width) entity.x = -entity.radius;
    if (entity.y + entity.radius < 0) entity.y = app.height + entity.radius;
    if (entity.y - entity.radius > app.height) entity.y = -entity.radius;

  },

  keydown: function(e) {

  },

  nextWave: function() {

    if (this.benchmark) return;

    this.wave++;

    this.shipsLeft = 0;

    var streamsPositions = [
      [0.0, 1.0],
      [0.0, 0.5],
      [0.0, 0.0],
      [1.0, 0.0],
      [1.0, 0.5],
      [1.0, 1.0]
    ];

    var difficulty = this.wave / 20;

    Utils.shuffle(streamsPositions);

    var streamsCount = Math.min(3, 1 + difficulty) + 0.3 | 0;
    var shipsPerStream = Math.min(16, 4 + difficulty * 4) | 0;

    var possibleShips = [];

    if (this.wave > 0) possibleShips.push("creep1");
    if (this.wave > 3) possibleShips.push("creep2");
    if (this.wave > 6) possibleShips.push("creep3");
    if (this.wave > 10) possibleShips.push("creep4");

    if (this.wave % 5 === 0) possibleShips = ["boss"];

    for (var i = 0; i < streamsCount; i++) {

      var stream = streamsPositions.pop();

      var x = stream[0] * app.width;
      var y = stream[1] * app.height;

      var ship = Utils.random(possibleShips);
      var shipData = defs.ships[ship];
      var angle = Math.atan2(y - app.center.y, x - app.center.x);

      for (var j = 0; j < shipsPerStream; j++) {

        var entity = this.add(ENGINE.Ship, {
          type: ship,
          x: x + Math.cos(angle) * j * 100,
          y: y + Math.sin(angle) * j * 100,
          team: 0
        });

        this.shipsLeft++;

        if (shipData.boss) {

          entity.hp = entity.maxHp = this.score;
          entity.damage = this.score / 50 | 0;
          entity.scale = 0.5 + this.score / 200;

          break;

        }

      }

    }

  },

  repairShips: function() {

    var ships = Utils.filter(this.entities, function(e) {
      return (e instanceof ENGINE.Ship) && e.team;
    });

    for (var i = 0; i < ships.length; i++) {

      ships[i].repair();

    }

  },

  onenemydeath: function(ship) {

    this.shipsLeft--;

    if (this.shipsLeft <= 0) this.nextWave();

  },

  pointerdown: function(e) {

  },

  gameover: function() {

    ENGINE.Gameover.score = this.score;

    if (window.ga) {
      ga('send', {
        'hitType': 'event',
        'eventCategory': 'game',
        'eventAction': 'over',
        'eventValue': this.score,
        'nonInteraction': true
      });
    }

    app.setState(ENGINE.Gameover);

  },

  checkBonus: function(key) {

    return true;

  }

};
ENGINE.Powerup = function(args) {

  Utils.extend(this, args);

  this.radius = 32;

  this.direction = Math.random() * 6.28;
  this.speed = 32;

  this.forceDirection = Math.random() * 6.28;
  this.force = 64 + Math.random() * 128;

  this.force *= 3;
  this.forceDamping = this.force;

  this.lifetime = 0;
  this.duration = 10;

  var keys = ["repair", "missiles", "freeze"];

  var freelanersCount = Utils.filter(this.game.entities, function(e) {
    return e.free && e instanceof ENGINE.Ship;
  }).length;

  if (freelanersCount < 2) keys.push("freelancer");

  this.key = Utils.random(keys);
  this.sprite = this.sprites[this.key];

};

ENGINE.Powerup.prototype = {

  constructor: ENGINE.Powerup,

  sprite: [216, 159, 14, 14],

  type: "powerup",

  sprites: {

    "repair": [245, 89, 23, 25],
    "freelancer": [276, 51, 32, 32],
    "freeze": [242, 119, 19, 21],
    "missiles": [311, 13, 28, 32]

  },

  collect: function() {

    this.game.explosion(this.x, this.y, 16, "#fff");

    this.game.remove(this);

    app.sound.play("powerup");

    this.game.player.poke();

    this.game.add(ENGINE.TextOut, {
      x: this.x,
      y: this.y,
      text: this.key
    });

    switch (this.key) {

      case "freeze":

        this.game.freezeLifespan = 4.0;

        break;

      case "missiles":

        for (var i = 0; i < 4; i++) this.game.add(ENGINE.Missile, {
          x: this.x,
          y: this.y,
          team: 1
        });

        break;

      case "repair":

        this.game.repairShips();

        break;


      case "freelancer":

        var ship = this.game.add(ENGINE.Ship, {
          x: this.x,
          y: this.y,
          type: "freelancer",
          team: 1,
          free: true,
          planet: this.game.playerPlanet
        });

        ship.forceDirection = Math.random() * 6;
        ship.force = 200;

        break;
    }

  },

  step: function(dt) {

    this.lifetime += dt;

    var playerDistance = Utils.distance(this, this.game.player);

    if (this.force) {

      this.x += Math.cos(this.forceDirection) * this.force * dt;
      this.y += Math.sin(this.forceDirection) * this.force * dt;

      this.force = Math.max(0, this.force - this.forceDamping * dt);

    }

    if (this.lifetime > 0.5) {
      if (playerDistance < 32) {
        this.collect();
        this.game.player.resources++;
      }
    }

    if (this.lifetime > this.duration) this.game.remove(this);

  },

  render: function() {

    var linear = app.lifetime % 0.5 / 0.5;
    var scale = 0.8 + Math.sin(Math.PI * linear) * 0.4;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.ctx.scale(scale, scale);

    app.ctx.drawImage(app.images.spritesheet,
      this.sprite[0], this.sprite[1], this.sprite[2], this.sprite[3], -this.sprite[2] / 2, -this.sprite[3] / 2, this.sprite[2], this.sprite[3]
    );

    app.ctx.restore();

  }

};
ENGINE.TextOut = function(args) {

  Utils.extend(this, {
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: 24,
    scaleX: 0,
    scaleY: 1.0,
    text: "void",
    duration: 2.0
  }, args);

  var textout = this;

  app.tween(this)
    .to({
      scaleX: 1.0
    }, this.duration * 0.25, "outElastic")
    .wait(this.duration * 0.5)
    .to({
      scaleY: 0.0
    }, this.duration * 0.25, "outCirc")
    .on("finish", function() {
      textout.game.remove(textout);
    });

    ttt = this;

};

ENGINE.TextOut.prototype = {

  constructor: ENGINE.TextOut,

  sprite: [216, 159, 14, 14],

  type: "textout",

  step: function(dt) {

  },

  render: function() {

    if (!this.scaleX || !this.scaleY) return;

    app.ctx.save();

    app.ctx.translate(this.x, this.y);

    app.fontSize(this.fontSize);

    app.ctx.fillStyle = this.color;
    app.ctx.textAlign = "center";

    app.ctx.scale(this.scaleX, this.scaleY);
    app.ctx.fillText(this.text, 0, 0)

    app.ctx.restore();

  }

};
ENGINE.Trail = function(parent, args) {

  this.parent = parent;

  Utils.extend(this, {
    color: "#0fc",
    points: [],
    maxPoints: 5,
    width: 10,
    lifetime: 0,
    lifespan: 0,
    paused: false,
    interval: 0.15,
    stroke: true
  }, args);

};

ENGINE.Trail.prototype = {

  zIndex: 200,

  quota: 0.3,

  reaction: 8,

  clear: function() {

    this.points = [];

  },

  step: function(delta) {

    this.lifetime += delta;

    if (Utils.interval("point", this.interval, this)) {

      if (!this.paused) this.points.push(this.parent.x, this.parent.y);

      if (
        (this.points.length > this.maxPoints * 2) ||
        (this.paused && this.points.length > 0)
      ) {
        this.points.shift();
        this.points.shift();
      }
    }

    this.points[this.points.length - 2] = this.parent.x;
    this.points[this.points.length - 1] = this.parent.y;

    if(this.lifespan && this.lifetime > this.lifespan) {
      this.paused = true;
    }

  },

  render: function() {

    if(this.points.length <= 0) return;

    app.layer.save();
    app.layer.strokeStyle(this.color);
    app.layer.lineCap("square");

    // if (!this.stroke) app.layer.strokeStyle("rgba(0,0,0,0.1)");

    for (var i = 2; i < this.points.length; i += 2) {

      var ratio = i / (2 * this.maxPoints);
      var px = this.points[i - 2];
      var py = this.points[i - 1];
      var nx = this.points[i];
      var ny = this.points[i + 1];
      app.layer.beginPath();
      app.layer.moveTo(px | 0, py | 0);
      app.layer.lineTo(nx | 0, ny | 0);
      app.layer.a(ratio).lineWidth(ratio * this.width);
      app.layer.stroke();
    }

    app.layer.restore();


  }

};
ENGINE.Missile = function(args) {

  Utils.extend(this, {
    speed: 400
  }, args);

  this.color = defs.teamColor[this.team];
  this.radius = 4;
  this.direction = 0;

  this.force = 400;
  this.forceDirection = Math.random() * 6;

  this.trail = new ENGINE.Trail(this, {
    interval: 0.05,
    maxPoints: 10,
    color: "#fa0"
  });

  for (var i = 0; i < this.game.entities.length; i++) {

    var e = this.game.entities[i];

    if (!(e instanceof ENGINE.Ship)) continue;

    if (e.missileTarget) continue;
    if (e.team === this.team) continue;

    e.missileTarget = this;
    this.target = e;

    break;

  }

};

ENGINE.Missile.prototype = {

  sprite: [145, 25, 6, 39],

  quota: 0.5,

  constructor: ENGINE.Missile,

  step: function(dt) {

    if(!this.target) return this.die();

    this.direction = Math.atan2(this.target.y - this.y, this.target.x - this.x);

    this.x += Math.cos(this.direction) * this.speed * dt;
    this.y += Math.sin(this.direction) * this.speed * dt;

    this.force = Math.max(this.force - dt * 400, 0);

    this.x += Math.cos(this.forceDirection) * this.force * dt;
    this.y += Math.sin(this.forceDirection) * this.force * dt;


    if (Utils.distance(this, this.target) < this.radius + this.target.radius) {

      this.hit(this.target);

    }

    this.trail.step(dt);


  },

  hit: function(target) {

    target.applyDamage(10 + this.game.score / 10);

    this.die();

  },

  die: function() {

    this.dead = true;

  },

  render: function() {

    this.trail.render();

  }

};
ENGINE.Gameover = {

  score: 737,
  hiscore: 0,

  starOff: [382, 177, 15, 16],
  starOn: [339, 169, 37, 37],

  enter: function() {
    if (window.ga) {
      ga('send', 'screenview', {
        'appName': 'PowerSurge',
        'screenName': 'Gameover'
      });
    }

    this.done = false;

    app.renderer.setSmoothing(true);

    var hiscore = localStorage.getItem("hiscore") | 0;

    if (hiscore < this.score) {

      this.hiscore = this.score;
      localStorage.setItem("hiscore", hiscore);

    }

    this.music = app.music.play("gameover").fadeIn(3).loop();

    this.currentScore = 0;
    this.stars = [];
    this.scoreOffset = -app.width;
    this.achievedStars = Math.min(10, (this.score / 500) * 10 | 0);

    for (var i = 0; i < 10; i++) {

      this.stars.push({
        x: i * 64,
        y: 64,
        scale: 0
      });

    }

    for (var i = 0; i < this.achievedStars; i++) {

      var star = this.stars[i];

      app.tween(star).wait(i * 0.1).to({
        scale: 1.0,
        y: 64
      }, 2.5, "outElastic");

    }

    app.tween(this).to({

      currentScore: this.score,
      scoreOffset: 0

    }, 2.5, "outElastic").on("finished", function() {

      app.state.done = true;

    });


  },

  step: function() {

  },

  renderStars: function(x, y) {


    for (var i = 0; i < 10; i++) {

      var star = this.stars[i];

      app.layer.save();

      app.layer.translate(star.x + x, star.y + y);

      app.layer.align(0.5, 0.5);

      app.layer.drawRegion(app.images.spritesheet, this.starOff, 0, 0);

      if (star.scale > 0) {

        app.layer.rotate(app.lifetime);
        app.layer.scale(star.scale, star.scale);
        app.layer.drawRegion(app.images.spritesheet, this.starOn, 0, 0);
      }

      app.layer.restore();

    }

  },

  render: function() {

    app.ctx.fillStyle = "#282245";

    app.ctx.fillRect(0, 0, app.width, app.height);

    app.ctx.drawImage(app.images.help, app.center.x - app.images.help.width * 0.5 | 0, -50)

    this.renderStars(app.center.x - 320, 0);

    app.fontSize(48);

    app.ctx.fillStyle = "#fa0";
    app.ctx.textAlign = "center";

    app.ctx.fillText("SCORE: " + (this.currentScore | 0), app.center.x + this.scoreOffset, 180)

    app.fontSize(32);

    app.ctx.fillStyle = "#f40";
    app.ctx.textAlign = "center";

    app.ctx.fillText("HI-SCORE: " + (this.hiscore | 0), app.center.x - this.scoreOffset, 220);

    if (this.done) {

      app.ctx.fillStyle = "#cef";
      app.ctx.textAlign = "center";

      if (app.lifetime % 1 < 0.5) {

        app.ctx.fillText("CLICK TO TRY AGAIN ", app.center.x - this.scoreOffset, 260)

      }

    }

  },

  pointerdown: function() {

    if (this.done) {
      if (window.ga) {
        ga('send', {
          'hitType': 'event',
          'eventCategory': 'game',
          'eventAction': 'restart'
        });
      }

      app.setState(ENGINE.Game);

      ENGINE.Game.reset();

    }

  }

};
document.addEventListener("DOMContentLoaded", function(event) {

  app = playground({

    width: 1024,
    height: 640,

    smoothing: true,

    paths: {

      base: "//mozilla.github.io/devtools-perf-game/"

    },

    updateDownloadText: function() {

      if (navigator.userAgent.indexOf("Firefox/40") > -1) {

        var text = defs.downloadLinks["ffdev"][0];
        var link = defs.downloadLinks["ffdev"][1];

      } else {

        var text = defs.downloadLinks["default"][0];
        var link = defs.downloadLinks["default"][1];

      }

      document.body.querySelector("#comicbubble").innerHTML = text;
      document.body.querySelector("#comicbubble").setAttribute("href", link);

    },

    /* set context font size with default font */

    fontSize: function(size) {

      return this.ctx.font = size + "px 'Squada One'";

    },

    create: function() {

      this.loadImages("spritesheet", "help", "splash", "flare", "particles");

      this.keyboard.preventDefault = false;

      this.sound = this.audio.channel("sound").volume(0.5);
      this.music = this.audio.channel("music").volume(0.5);

      this.ctx = app.layer.context;

      this.game = ENGINE.Game;

    },

    /* all images loaded */

    ready: function() {

      this.updateDownloadText();

      /* cache some known colors for spritesheet */

      this.getColoredImage(this.images.spritesheet, "#fff");

      /* start the benchmark */

      this.setState(ENGINE.Benchmark);

    },

    resize: function() {

      this.state.render(0);

    },

    getColoredImage: function(key, color, mode) {

      if (typeof mode === "undefined") mode = "hard-light";

      if (typeof key === "string") {
        var image = this.images[key];
      } else {
        var image = key;
      }

      var storekey = "color-" + color;

      if (!image[storekey]) {

        if (typeof mix === "undefined") mix = 1;

        var below = document.createElement("canvas");
        belowCtx = below.getContext("2d");

        below.width = image.width;
        below.height = image.height;

        belowCtx.drawImage(image, 0, 0);
        belowCtx.globalCompositeOperation = "source-atop";
        belowCtx.fillStyle = color;
        belowCtx.fillRect(0, 0, image.width, image.height);

        image[storekey] = below;

      }

      return image[storekey];

    },

    roundAngle: function(angle) {

      return Utils.ground(angle - Math.PI / 16, Math.PI / 8);

    },

    visibilitychange: function(hidden) {

      if (hidden) {
        if (!this.storedSoundVolume) {
          this.storedSoundVolume = this.sound.volume();
          this.storedMusicVolume = this.music.volume();
          this.sound.volume(0);
          this.music.volume(0);
        }
      } else {
        if (this.storedSoundVolume) {
          this.sound.volume(this.storedSoundVolume);
          this.music.volume(this.storedMusicVolume);
          this.storedSoundVolume = 0;
          this.storedMusicVolume = 0;
        }
      }

    }

  });

});

var performance = window.performance || window.webkitPerformance || Date;

Math.sign = Math.sign || function(x) {

  x = +x; // convert to a number

  if (x === 0 || isNaN(x)) {

    return x;

  }

  return x > 0 ? 1 : -1;

};
/**
 * This is bad and unoptimized code just for you to fix :)
 *
 * Get Firefox Developer Edition to try the new Performance Tools:
 *   https://www.mozilla.org/firefox/developer/
 *
 * 1. Open the `Performance` tool in Firefox Developer Edition
 * 2. Start recording a performance profile
 * 3. Play the game
 * 4. Stop profiling and check the Call Tree or Flame Chart for the maleficent
 *
 * Got ideas for better bottlenecks or even faster code, file
 * an issue or send us a pull request:
 *   https://github.com/mozilla/devtools-perf-game/issues
 */

/**
 * Creates a new array with all elements that pass the `test` function
 * @param {Array} array The array to filter
 * @param {Function} test Function to test each element, invoked with (element)
 * @return {Array} A new array with only passed elements
 */
Utils.filter = function(array, test) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

/**
 * Find nearest entity from a list of entities
 * @param {Entity} from Entity
 * @param {Entity[]} entities List of entities to compare
 * @return {Entity} Nearest Entity
 */
Utils.nearest = function(from, entities) {
  var closest = {
    target: undefined,
    distance: null
  };
  for (var i = 0; i < entities.length; i++) {
    var to = entities[i];
    if (from === to) continue;
    var distance = this.distance(from, to);
    if (i === 0 || closest.distance > distance) {
      closest.target = to;
      closest.distance = distance;
    }
  }
  if (typeof closest.target === 'undefined') {
    return null;
  }
  return closest.target;
};

/**
 * Returns nearest ship of opposite team
 * @return {Ship} Nearest enemy ship
 */
ENGINE.Ship.prototype.getTarget = function() {
  var pool = [];
  for (var i = 0; i < this.game.entities.length; i++) {
    var entity = this.game.entities[i];
    if (!(entity instanceof ENGINE.Ship)) continue;
    if (entity.team !== this.team) pool.push(entity);
  }
  // Is Utils.nearest fast enough?
  return Utils.nearest(this, pool);
};

/**
 * Update position for an entity that has speed and direction.
 * @param {Number} direction Angle given in radians
 * @param {Number} value Distance to move
 */
Utils.moveInDirection = function(direction, value) {
  value /= 100;
  for (var i = 0; i < 100; i++) {
    this.x += Math.cos(this.direction) * value;
    this.y += Math.sin(this.direction) * value;
  }
};

/**
 * Update ship position with current direction and speed
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Ship.prototype.move = function(dt) {
  if (!this.frozen) {
    Utils.moveInDirection.apply(this, [this.direction, this.speed * dt]);
  }

  if (this.force > 0) {
    this.force -= 200 * dt;
    Utils.moveInDirection.apply(this, [this.forceDirection, this.force * dt]);
  }
};

/**
 * Frame step for a particle
 * @param {Number} dt Time delta for current frame in seconds
 */
ENGINE.Particle.prototype.step = function(dt) {
  this.lifetime += dt;
  // Update position
  this.x += Math.cos(this.direction) * this.speed * dt;
  this.y += Math.sin(this.direction) * this.speed * dt;
  this.speed = Math.max(0, this.speed - this.damping * dt);

  this.progress = Math.min(this.lifetime / this.duration, 1.0);
  // Put particle offscreen for pooling and to keep render time constant
  if (this.progress >= 1.0) {
    this.x = 0;
    this.y = 0;
    this.progress = 0;
  }
  // Update index for current sprite to render
  this.spriteIndex = Math.floor(this.progress * this.sprites.length);
}

/**
 * Check if star is in screen boundaries.
 * Otherwise wrap it to the opposite side of screen.
 * @param {Star} star Probed star
 */
ENGINE.BackgroundStars.prototype.wrap = function(star) {
  var pos = [star.x, star.y, 1, 1];
  var bounds = [0, 0, app.width, app.height];

  if (pos[0] < bounds[0]) star.x = app.width;
  if (pos[1] < bounds[1]) star.y = app.height;

  if (pos[0] > bounds[2]) star.x = 0;
  if (pos[1] > bounds[3]) star.y = 0;
};


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEuanMiLCJzdGF0cy5qcyIsIlV0aWxzLmpzIiwiUGxheWdyb3VuZC5qcyIsIlBsYXlncm91bmQuU2NhbmxpbmVzLmpzIiwiUGxheWdyb3VuZC5Tb3VuZE9uRGVtYW5kLmpzIiwiRW5naW5lLmpzIiwiQmVuY2htYXJrLmpzIiwiQmFja2dyb3VuZFN0YXJzLmpzIiwiQ2lyY2xlRXhwbG9zaW9uLmpzIiwiU2hpcC5qcyIsIkJ1bGxldC5qcyIsIkFzdGVyb2lkLmpzIiwiQ3Vyc29yLmpzIiwiUmVzb3VyY2UuanMiLCJCdXR0b24uanMiLCJQYXJ0aWNsZS5qcyIsIlBsYW5ldC5qcyIsIkdhbWUuanMiLCJQb3dlcnVwLmpzIiwiVGV4dE91dC5qcyIsIlRyYWlsLmpzIiwiTWlzc2lsZS5qcyIsIkdhbWVvdmVyLmpzIiwiTWFpbi5qcyIsImJvdHRsZW5lY2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4M0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNydkJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzViQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkZWZzID0ge1xyXG5cclxuICB0ZWFtQ29sb3I6IFtcIiNmZjQ0NDRcIiwgXCIjMDBhYWZmXCJdLFxyXG5cclxuICBmcm96ZW5TcHJpdGU6IFsxOTMsIDg2LCAxMSwgMTldLFxyXG5cclxuICBidXR0b25zOiB7XHJcbiAgICBcImZpZ2h0ZXJcIjogWzQsIDM0NSwgNjQsIDY0XSxcclxuICAgIFwic3BlZWRcIjogWzEzMiwgMzQ1LCA2NCwgNjRdLFxyXG4gICAgXCJsaWZlXCI6IFs2OCwgMzQ1LCA2NCwgNjRdLFxyXG4gICAgXCJkYW1hZ2VcIjogWzE5NiwgMzQ1LCA2NCwgNjRdXHJcbiAgfSxcclxuXHJcbiAgc2hpcHM6IHtcclxuXHJcbiAgICBcImZpZ2h0ZXJcIjoge1xyXG5cclxuICAgICAgcHJlZmVyZW5jZTogW1wic21hbGxcIl0sXHJcbiAgICAgIGNvb2xkb3duOiAwLjUsXHJcbiAgICAgIGRhbWFnZTogMSxcclxuICAgICAgaHA6IDEwLFxyXG4gICAgICBzcHJpdGU6IFs0MDcsIDE4LCAzMiwgMzJdLFxyXG4gICAgICBwcmljZTogMSxcclxuICAgICAgc3BlZWQ6IDgwXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBcImZyZWVsYW5jZXJcIjoge1xyXG5cclxuICAgICAgY29vbGRvd246IDAuNSxcclxuICAgICAgZGFtYWdlOiAxLFxyXG4gICAgICBocDogMTAsXHJcbiAgICAgIHNwcml0ZTogWzM2NywgNTksIDMxLCAzMl0sXHJcbiAgICAgIHNwZWVkOiA4MFxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIFwiY3JlZXAxXCI6IHtcclxuXHJcbiAgICAgIHByZWZlcmVuY2U6IFtcImJpZ1wiXSxcclxuICAgICAgZGFtYWdlOiAyLFxyXG4gICAgICBjb29sZG93bjogMixcclxuICAgICAgaHA6IDQsXHJcbiAgICAgIHNwcml0ZTogWzQ0NCwgMjMsIDIyLCAyMV0sXHJcbiAgICAgIHByaWNlOiA1LFxyXG4gICAgICBzcGVlZDogNjBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFwiY3JlZXAyXCI6IHtcclxuXHJcbiAgICAgIHByZWZlcmVuY2U6IFtcImJpZ1wiXSxcclxuICAgICAgZGFtYWdlOiAyLFxyXG4gICAgICBjb29sZG93bjogMixcclxuICAgICAgaHA6IDEwLFxyXG4gICAgICBzcHJpdGU6IFs0NzEsIDIzLCAzMiwgMjNdLFxyXG4gICAgICBwcmljZTogNSxcclxuICAgICAgc3BlZWQ6IDgwXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBcImNyZWVwM1wiOiB7XHJcblxyXG4gICAgICBwcmVmZXJlbmNlOiBbXCJiaWdcIl0sXHJcbiAgICAgIGRhbWFnZTogNCxcclxuICAgICAgY29vbGRvd246IDIsXHJcbiAgICAgIGhwOiAzMCxcclxuICAgICAgc3ByaXRlOiBbNTAzLCAxOSwgMzIsIDI5XSxcclxuICAgICAgcHJpY2U6IDUsXHJcbiAgICAgIHNwZWVkOiA1MFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgXCJjcmVlcDRcIjoge1xyXG5cclxuICAgICAgcHJlZmVyZW5jZTogW1wiYmlnXCJdLFxyXG4gICAgICBkYW1hZ2U6IDYsXHJcbiAgICAgIGNvb2xkb3duOiAyLFxyXG4gICAgICBocDogNTAsXHJcbiAgICAgIHNwcml0ZTogWzUzNSwgMTgsIDMyLCAzMl0sXHJcbiAgICAgIHByaWNlOiA1LFxyXG4gICAgICBzcGVlZDogNTBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIFwiYm9zc1wiOiB7XHJcblxyXG4gICAgICBkYW1hZ2U6IDEwLFxyXG4gICAgICBjb29sZG93bjogMixcclxuICAgICAgaHA6IDUwMCxcclxuICAgICAgc3ByaXRlOiBbNDU2LCA1MywgNjQsIDY0XSxcclxuICAgICAgc3BlZWQ6IDMyLFxyXG4gICAgICBib3NzOiB0cnVlXHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICB0b29sdGlwczoge1xyXG5cclxuICAgIFwiZmlnaHRlclwiOiBcImJ1aWxkIGEgZmlnaHRlclwiLFxyXG4gICAgXCJzcGVlZFwiOiBcInVwZ3JhZGUgZmlnaHRlcnMgc3BlZWRcIixcclxuICAgIFwibGlmZVwiOiBcInVwZ3JhZGUgZmlnaHRlcnMgbGlmZVwiLFxyXG4gICAgXCJkYW1hZ2VcIjogXCJ1cGdyYWRlIGZpZ2h0ZXJzIGRhbWFnZVwiXHJcblxyXG4gIH0sXHJcblxyXG4gIGJvbnVzZXM6IHtcclxuICAgIHNoaWVsZDogXCJhc3Rlcm9pZHMgc2hpZWxkXCIsXHJcbiAgICBsYXNlcjogXCJjdXJzb3IgbGFzZXJcIixcclxuICAgIG1hZ25ldDogXCJjb2luIG1hZ25ldFwiXHJcbiAgfSxcclxuXHJcblxyXG4gIGRvd25sb2FkTGlua3M6IHtcclxuXHJcbiAgICBcImZmZGV2XCI6IFtcIkxlYXJuIG1vcmUgYWJvdXQgUGVyZm9ybWFuY2UgVG9vbHMgaW4gRGV2ZWxvcGVyIEVkaXRpb25cIiwgXCJodHRwczovL2hhY2tzLm1vemlsbGEub3JnLz91dG1fc291cmNlPWNvZGVwZW4mdXRtX21lZGl1bT1yZWZlcnJhbCZ1dG1fY2FtcGFpZ249ZmlyZWZveC1kZXZlbG9wZXItZ2FtZSZ1dG1fY29udGVudD1sZWFybi1wZXJmLXRvb2xzXCJdLFxyXG4gICAgXCJkZWZhdWx0XCI6IFtcIkdldCBGaXJlZm94IERldmVsb3BlciBFZGl0aW9uIHRvIHRyeSBvdXQgdGhlIG5ldyBwZXJmb3JtYW5jZSB0b29sc1wiLCBcImh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL2ZpcmVmb3gvZGV2ZWxvcGVyLz91dG1fc291cmNlPWNvZGVwZW4mdXRtX21lZGl1bT1yZWZlcnJhbCZ1dG1fY2FtcGFpZ249ZmlyZWZveC1kZXZlbG9wZXItZ2FtZSZ1dG1fY29udGVudD1nYW1lLXByb21vXCJdXHJcblxyXG4gIH1cclxuXHJcbn07IiwiKGZ1bmN0aW9uKGkscyxvLGcscixhLG0pe2lbJ0dvb2dsZUFuYWx5dGljc09iamVjdCddPXI7aVtyXT1pW3JdfHxmdW5jdGlvbigpe1xyXG4oaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKX0saVtyXS5sPTEqbmV3XHJcbkRhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcclxuXHJcbm09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTthLmFzeW5jPTE7YS5zcmM9ZzttLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsbSlcclxufSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xyXG5cclxuZ2EoJ2NyZWF0ZScsICdVQS00OTc5NjIxOC0yNicsICdhdXRvJyk7XHJcbmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7IiwidmFyIFV0aWxzID0ge1xyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICBhcmd1bWVudHNbMF1bal0gPSBhcmd1bWVudHNbaV1bal07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xyXG4gIH0sXHJcblxyXG4gIGRpc3RhbmNlOiBmdW5jdGlvbihhLCBiKSB7XHJcblxyXG4gICAgdmFyIGR4ID0gYS54IC0gYi54O1xyXG4gICAgdmFyIGR5ID0gYS55IC0gYi55O1xyXG5cclxuICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG5cclxuICB9LFxyXG5cclxuICBuZWFyZXN0OiBmdW5jdGlvbihmcm9tLCBlbnRpdGllcykge1xyXG5cclxuICAgIHZhciBtaW4gPSAtMTtcclxuICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciB0byA9IGVudGl0aWVzW2ldO1xyXG5cclxuICAgICAgaWYgKGZyb20gPT09IHRvKSBjb250aW51ZTtcclxuXHJcbiAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2UoZnJvbSwgdG8pO1xyXG5cclxuICAgICAgaWYgKGRpc3RhbmNlIDwgbWluIHx8IG1pbiA8IDApIHtcclxuICAgICAgICBtaW4gPSBkaXN0YW5jZTtcclxuICAgICAgICByZXN1bHQgPSB0bztcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0sXHJcblxyXG4gIGNpcmNXcmFwOiBmdW5jdGlvbih2YWwpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53cmFwKHZhbCwgMCwgTWF0aC5QSSAqIDIpO1xyXG5cclxuICB9LFxyXG5cclxuICB3cmFwOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcclxuXHJcbiAgICBpZiAodmFsdWUgPCBtaW4pIHJldHVybiBtYXggKyAodmFsdWUgJSBtYXgpO1xyXG4gICAgaWYgKHZhbHVlID49IG1heCkgcmV0dXJuIHZhbHVlICUgbWF4O1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICB9LFxyXG5cclxuICB3cmFwVG86IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIG1heCwgc3RlcCkge1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gdGFyZ2V0KSByZXR1cm4gdGFyZ2V0O1xyXG5cclxuICAgIHZhciByZXN1bHQgPSB2YWx1ZTtcclxuXHJcbiAgICB2YXIgZCA9IHRoaXMud3JhcHBlZERpc3RhbmNlKHZhbHVlLCB0YXJnZXQsIG1heCk7XHJcblxyXG4gICAgaWYgKE1hdGguYWJzKGQpIDwgc3RlcCkgcmV0dXJuIHRhcmdldDtcclxuXHJcbiAgICByZXN1bHQgKz0gKGQgPCAwID8gLTEgOiAxKSAqIHN0ZXA7XHJcblxyXG4gICAgaWYgKHJlc3VsdCA+IG1heCkge1xyXG4gICAgICByZXN1bHQgPSByZXN1bHQgLSBtYXg7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCA8IDApIHtcclxuICAgICAgcmVzdWx0ID0gbWF4ICsgcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0sXHJcblxyXG4gIGNpcmNXcmFwVG86IGZ1bmN0aW9uKHZhbHVlLCB0YXJnZXQsIHN0ZXApIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53cmFwVG8odmFsdWUsIHRhcmdldCwgTWF0aC5QSSAqIDIsIHN0ZXApO1xyXG5cclxuICB9LFxyXG5cclxuICBjaXJjRGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy53cmFwcGVkRGlzdGFuY2UoYSwgYiwgTWF0aC5QSSAqIDIpO1xyXG5cclxuICB9LFxyXG5cclxuICB3cmFwcGVkRGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIsIG1heCkge1xyXG5cclxuICAgIGlmIChhID09PSBiKSByZXR1cm4gMDtcclxuICAgIGVsc2UgaWYgKGEgPCBiKSB7XHJcbiAgICAgIHZhciBsID0gLWEgLSBtYXggKyBiO1xyXG4gICAgICB2YXIgciA9IGIgLSBhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIGwgPSBiIC0gYTtcclxuICAgICAgdmFyIHIgPSBtYXggLSBhICsgYjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWF0aC5hYnMobCkgPiBNYXRoLmFicyhyKSkgcmV0dXJuIHI7XHJcbiAgICBlbHNlIHJldHVybiBsO1xyXG5cclxuICB9LFxyXG5cclxuICByYW5kb206IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGIgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYSArIE1hdGgucmFuZG9tKCkgKiBNYXRoLmFicyhiIC0gYSArIDEpKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgaWYgKGEgaW5zdGFuY2VvZiBBcnJheSkgcmV0dXJuIGFbKGEubGVuZ3RoICsgMSkgKiBNYXRoLnJhbmRvbSgpIC0gMSB8IDBdO1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYVt0aGlzLnJhbmRvbShPYmplY3Qua2V5cyhhKSldO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzaW5jb3M6IGZ1bmN0aW9uKGFuZ2xlLCByYWRpdXMpIHtcclxuXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByYWRpdXMgPSBhbmdsZTtcclxuICAgICAgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogNi4yODtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMsXHJcbiAgICAgIHk6IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1c1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBncm91bmQ6IGZ1bmN0aW9uKG51bSwgdGhyZXNob2xkKSB7XHJcblxyXG4gICAgcmV0dXJuIChudW0gLyB0aHJlc2hvbGQgfCAwKSAqIHRocmVzaG9sZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2h1ZmZsZTogZnVuY3Rpb24obykge1xyXG4gICAgZm9yICh2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XHJcbiAgICByZXR1cm4gbztcclxuICB9LFxyXG5cclxuICBzaWduOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cclxuICAgIHJldHVybiB2YWx1ZSAvIE1hdGguYWJzKHZhbHVlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbW92ZVRvOiBmdW5jdGlvbih2YWx1ZSwgdGFyZ2V0LCBzdGVwKSB7XHJcblxyXG4gICAgaWYgKHZhbHVlIDwgdGFyZ2V0KSB7XHJcbiAgICAgIHZhbHVlICs9IHN0ZXA7XHJcbiAgICAgIGlmICh2YWx1ZSA+IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlID4gdGFyZ2V0KSB7XHJcbiAgICAgIHZhbHVlIC09IHN0ZXA7XHJcbiAgICAgIGlmICh2YWx1ZSA8IHRhcmdldCkgdmFsdWUgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICB9LFxyXG5cclxuICBpbnRlcnZhbDogZnVuY3Rpb24oa2V5LCBpbnRlcnZhbCwgb2JqZWN0KSB7XHJcblxyXG4gICAgaWYgKCFvYmplY3QudGhyb3R0bGVzKSBvYmplY3QudGhyb3R0bGVzID0ge307XHJcbiAgICBpZiAoIW9iamVjdC50aHJvdHRsZXNba2V5XSkgb2JqZWN0LnRocm90dGxlc1trZXldID0gb2JqZWN0LmxpZmV0aW1lIC0gaW50ZXJ2YWw7XHJcblxyXG4gICAgaWYgKG9iamVjdC5saWZldGltZSAtIG9iamVjdC50aHJvdHRsZXNba2V5XSA+PSBpbnRlcnZhbCkge1xyXG4gICAgICBvYmplY3QudGhyb3R0bGVzW2tleV0gPSBvYmplY3QubGlmZXRpbWU7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbW92ZUluRGlyZWN0aW9uOiBmdW5jdGlvbihkaXJlY3Rpb24sIHZhbHVlKSB7XHJcblxyXG4gICAgdGhpcy54ICs9IE1hdGguY29zKGRpcmVjdGlvbikgKiB2YWx1ZTtcclxuICAgIHRoaXMueSArPSBNYXRoLnNpbihkaXJlY3Rpb24pICogdmFsdWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIG9zYzogZnVuY3Rpb24odGltZSwgcGVyaW9kKSB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguc2luKE1hdGguUEkgKiAodGltZSAlIHBlcmlvZCAvIHBlcmlvZCkpO1xyXG5cclxuICB9LFxyXG5cclxuICBmaWx0ZXI6IGZ1bmN0aW9uKGFycmF5LCB0ZXN0KSB7XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRlc3QoYXJyYXlbaV0pKSByZXN1bHQucHVzaChhcnJheVtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVjdEluUmVjdDogZnVuY3Rpb24ocjF4LCByMXksIHIxdywgcjFoLCByMngsIHIyeSwgcjJ3LCByMmgpIHtcclxuICAgIHJldHVybiAhKHIyeCA+IHIxeCArIHIxdyB8fFxyXG4gICAgICByMnggKyByMncgPCByMXggfHxcclxuICAgICAgcjJ5ID4gcjF5ICsgcjFoIHx8XHJcbiAgICAgIHIyeSArIHIyaCA8IHIxeSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG59OyIsIi8qIGZpbGU6IGxpY2Vuc2UudHh0ICovXHJcblxyXG4vKlxyXG5cclxuICBQbGF5Z3JvdW5kSlMgcjRcclxuXHJcbiAgaHR0cDovL3BsYXlncm91bmRqcy5jb21cclxuXHJcbiAgKGMpIDIwMTItMjAxNSBodHRwOi8vcmV6b25lci5uZXRcclxuXHJcbiAgUGxheWdyb3VuZCBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuXHJcbiAgbGF0ZXN0IG1ham9yIGNoYW5nZXM6XHJcblxyXG4gIHI0XHJcblxyXG4gICsgdHdlZW5zIHdpdGggZXZlbnRzXHJcbiAgKyBjb250ZXh0IGFyZ3VtZW50IGZvciBldmVudHNcclxuXHJcbiAgcjNcclxuXHJcbiAgKyBwb2ludGVyID0gbW91c2UgKyB0b3VjaFxyXG5cclxuKi9cclxuXHJcblxyXG4vKiBmaWxlOiBzcmMvbGliL0Vhc2UuanMgKi9cclxuXHJcbi8qXHJcblxyXG4gIEVhc2UgMS4wXHJcblxyXG4gIGh0dHA6Ly9jYW52YXNxdWVyeS5jb21cclxuXHJcbiAgKGMpIDIwMTUgYnkgUmV6b25lciAtIGh0dHA6Ly9yZXpvbmVyLm5ldFxyXG5cclxuICBgZWFzZWAgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcblxyXG4qL1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICB2YXIgZWFzZSA9IGZ1bmN0aW9uKHByb2dyZXNzLCBlYXNpbmcpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGVhc2UuY2FjaGVbZWFzaW5nXSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblxyXG4gICAgICByZXR1cm4gZWFzZS5jYWNoZVtlYXNpbmddKHByb2dyZXNzKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgcmV0dXJuIGVhc2Uuc3BsaW5lKHByb2dyZXNzLCBlYXNpbmcgfHwgZWFzZS5kZWZhdWx0RWFzaW5nKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHZhciBleHRlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgYXJndW1lbnRzWzBdW2pdID0gYXJndW1lbnRzW2ldW2pdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcclxuICB9O1xyXG5cclxuICBleHRlbmQoZWFzZSwge1xyXG5cclxuICAgIGRlZmF1bHRFYXNpbmc6IFwiMDE2XCIsXHJcblxyXG4gICAgY2FjaGU6IHtcclxuXHJcbiAgICAgIGxpbmVhcjogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBpblF1YWQ6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHRcclxuICAgICAgfSxcclxuICAgICAgb3V0UXVhZDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KVxyXG4gICAgICB9LFxyXG4gICAgICBpbk91dFF1YWQ6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdCA8IC41ID8gMiAqIHQgKiB0IDogLTEgKyAoNCAtIDIgKiB0KSAqIHRcclxuICAgICAgfSxcclxuICAgICAgaW5DdWJpYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHRcclxuICAgICAgfSxcclxuICAgICAgb3V0Q3ViaWM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKC0tdCkgKiB0ICogdCArIDFcclxuICAgICAgfSxcclxuICAgICAgaW5PdXRDdWJpYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0IDwgLjUgPyA0ICogdCAqIHQgKiB0IDogKHQgLSAxKSAqICgyICogdCAtIDIpICogKDIgKiB0IC0gMikgKyAxXHJcbiAgICAgIH0sXHJcbiAgICAgIGluUXVhcnQ6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdCAqIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRRdWFydDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAxIC0gKC0tdCkgKiB0ICogdCAqIHRcclxuICAgICAgfSxcclxuICAgICAgaW5PdXRRdWFydDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0IDwgLjUgPyA4ICogdCAqIHQgKiB0ICogdCA6IDEgLSA4ICogKC0tdCkgKiB0ICogdCAqIHRcclxuICAgICAgfSxcclxuICAgICAgaW5RdWludDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBvdXRRdWludDogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAxICsgKC0tdCkgKiB0ICogdCAqIHQgKiB0XHJcbiAgICAgIH0sXHJcbiAgICAgIGluT3V0UXVpbnQ6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICgtLXQpICogdCAqIHQgKiB0ICogdFxyXG4gICAgICB9LFxyXG4gICAgICBpblNpbmU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0IC8gMSAqIChNYXRoLlBJICogMC41KSkgKyAxO1xyXG4gICAgICB9LFxyXG4gICAgICBvdXRTaW5lOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgLyAxICogKE1hdGguUEkgKiAwLjUpKTtcclxuICAgICAgfSxcclxuICAgICAgaW5PdXRTaW5lOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIC0xIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdCkgLSAxKTtcclxuICAgICAgfSxcclxuICAgICAgaW5FeHBvOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuICh0ID09IDApID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dEV4cG86IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKHQgPT0gMSkgPyAxIDogKC1NYXRoLnBvdygyLCAtMTAgKiB0KSArIDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk91dEV4cG86IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBpZiAodCA9PSAwKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAodCA9PSAxKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoKHQgLz0gMSAvIDIpIDwgMSkgcmV0dXJuIDEgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKTtcclxuICAgICAgICByZXR1cm4gMSAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKTtcclxuICAgICAgfSxcclxuICAgICAgaW5DaXJjOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIC0xICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dENpcmM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAodCA9IHQgLSAxKSAqIHQpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk91dENpcmM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBpZiAoKHQgLz0gMSAvIDIpIDwgMSkgcmV0dXJuIC0xIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xyXG4gICAgICAgIHJldHVybiAxIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKTtcclxuICAgICAgfSxcclxuICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHZhciBwID0gMDtcclxuICAgICAgICB2YXIgYSA9IDE7XHJcbiAgICAgICAgaWYgKHQgPT0gMCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHQgPT0gMSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKCFwKSBwID0gMC4zO1xyXG4gICAgICAgIGlmIChhIDwgMSkge1xyXG4gICAgICAgICAgYSA9IDE7XHJcbiAgICAgICAgICB2YXIgcyA9IHAgLyA0O1xyXG4gICAgICAgIH0gZWxzZSB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcclxuICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcclxuICAgICAgfSxcclxuICAgICAgb3V0RWxhc3RpYzogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgICB2YXIgcCA9IDA7XHJcbiAgICAgICAgdmFyIGEgPSAxO1xyXG4gICAgICAgIGlmICh0ID09IDApIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh0ID09IDEpIHJldHVybiAxO1xyXG4gICAgICAgIGlmICghcCkgcCA9IDAuMztcclxuICAgICAgICBpZiAoYSA8IDEpIHtcclxuICAgICAgICAgIGEgPSAxO1xyXG4gICAgICAgICAgdmFyIHMgPSBwIC8gNDtcclxuICAgICAgICB9IGVsc2UgdmFyIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbigxIC8gYSk7XHJcbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyAxO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk91dEVsYXN0aWM6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XHJcbiAgICAgICAgdmFyIHAgPSAwO1xyXG4gICAgICAgIHZhciBhID0gMTtcclxuICAgICAgICBpZiAodCA9PSAwKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAoKHQgLz0gMSAvIDIpID09IDIpIHJldHVybiAxO1xyXG4gICAgICAgIGlmICghcCkgcCA9ICgwLjMgKiAxLjUpO1xyXG4gICAgICAgIGlmIChhIDwgMSkge1xyXG4gICAgICAgICAgYSA9IDE7XHJcbiAgICAgICAgICB2YXIgcyA9IHAgLyA0O1xyXG4gICAgICAgIH0gZWxzZSB2YXIgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcclxuICAgICAgICBpZiAodCA8IDEpIHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSk7XHJcbiAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogMC41ICsgMTtcclxuICAgICAgfSxcclxuICAgICAgaW5CYWNrOiBmdW5jdGlvbih0LCBzKSB7XHJcbiAgICAgICAgaWYgKHMgPT0gdW5kZWZpbmVkKSBzID0gMS43MDE1ODtcclxuICAgICAgICByZXR1cm4gMSAqIHQgKiB0ICogKChzICsgMSkgKiB0IC0gcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG91dEJhY2s6IGZ1bmN0aW9uKHQsIHMpIHtcclxuICAgICAgICBpZiAocyA9PSB1bmRlZmluZWQpIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHJldHVybiAxICogKCh0ID0gdCAvIDEgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpO1xyXG4gICAgICB9LFxyXG4gICAgICBpbk91dEJhY2s6IGZ1bmN0aW9uKHQsIHMpIHtcclxuICAgICAgICBpZiAocyA9PSB1bmRlZmluZWQpIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIGlmICgodCAvPSAxIC8gMikgPCAxKSByZXR1cm4gMSAvIDIgKiAodCAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0IC0gcykpO1xyXG4gICAgICAgIHJldHVybiAxIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0ICsgcykgKyAyKTtcclxuICAgICAgfSxcclxuICAgICAgaW5Cb3VuY2U6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gMSAtIHRoaXMub3V0Qm91bmNlKDEgLSB0KTtcclxuICAgICAgfSxcclxuICAgICAgb3V0Qm91bmNlOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgaWYgKCh0IC89IDEpIDwgKDEgLyAyLjc1KSkge1xyXG4gICAgICAgICAgcmV0dXJuICg3LjU2MjUgKiB0ICogdCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0IDwgKDIgLyAyLjc1KSkge1xyXG4gICAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAodCAtPSAoMS41IC8gMi43NSkpICogdCArIC43NSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0IDwgKDIuNSAvIDIuNzUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gKDcuNTYyNSAqICh0IC09ICgyLjI1IC8gMi43NSkpICogdCArIC45Mzc1KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAodCAtPSAoMi42MjUgLyAyLjc1KSkgKiB0ICsgLjk4NDM3NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBpbk91dEJvdW5jZTogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiB0aGlzLmluQm91bmNlKHQgKiAyKSAqIDAuNTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vdXRCb3VuY2UodCAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB0cmFuc2xhdGVFYXNpbmc6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmNhY2hlW2tleV0pIHtcclxuICAgICAgICB2YXIgYXJyYXkgPSBrZXkuc3BsaXQoJycpO1xyXG5cclxuICAgICAgICB2YXIgc2lnbiA9IDE7XHJcbiAgICAgICAgdmFyIHNpZ25lZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgdmFyIGNoYXIgPSBhcnJheVtpXTtcclxuXHJcbiAgICAgICAgICBpZiAoY2hhciA9PT0gXCItXCIpIHtcclxuICAgICAgICAgICAgc2lnbiA9IC0xO1xyXG4gICAgICAgICAgICBzaWduZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gXCIrXCIpIHtcclxuICAgICAgICAgICAgc2lnbiA9IDE7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgfSBlbHNlIGFycmF5W2ldID0gcGFyc2VJbnQoYXJyYXlbaV0sIDE2KSAqIHNpZ247XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluLmFwcGx5KG51bGwsIGFycmF5KTtcclxuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgYXJyYXkpO1xyXG4gICAgICAgIHZhciBkaWZmID0gbWF4IC0gbWluO1xyXG4gICAgICAgIHZhciBjYWNoZSA9IFtdO1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmIChzaWduZWQpIHtcclxuICAgICAgICAgICAgdmFyIGRpZmYgPSBNYXRoLm1heChNYXRoLmFicyhtaW4pLCBNYXRoLmFicyhtYXgpKVxyXG4gICAgICAgICAgICBub3JtYWxpemVkLnB1c2goKGFycmF5W2ldKSAvIGRpZmYpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRpZmYgPSBtYXggLSBtaW47XHJcbiAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaCgoYXJyYXlbaV0gLSBtaW4pIC8gZGlmZik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhY2hlW2tleV0gPSBub3JtYWxpemVkO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuXHJcbiAgICAgIEN1YmljLXNwbGluZSBpbnRlcnBvbGF0aW9uIGJ5IEl2YW4gS3Vja2lyXHJcblxyXG4gICAgICBodHRwOi8vYmxvZy5pdmFuay5uZXQvaW50ZXJwb2xhdGlvbi13aXRoLWN1YmljLXNwbGluZXMuaHRtbFxyXG5cclxuICAgICAgV2l0aCBzbGlnaHQgbW9kaWZpY2F0aW9ucyBieSBNb3JnYW4gSGVybG9ja2VyXHJcblxyXG4gICAgICBodHRwczovL2dpdGh1Yi5jb20vbW9yZ2FuaGVybG9ja2VyL2N1YmljLXNwbGluZVxyXG5cclxuICAgICovXHJcblxyXG4gICAgc3BsaW5lSzoge30sXHJcbiAgICBzcGxpbmVYOiB7fSxcclxuICAgIHNwbGluZVk6IHt9LFxyXG5cclxuICAgIGluc2VydEludGVybWVkaWF0ZVZhbHVlczogZnVuY3Rpb24oYSkge1xyXG4gICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGFbaV0pO1xyXG5cclxuICAgICAgICBpZiAoaSA8IGEubGVuZ3RoIC0gMSkgcmVzdWx0LnB1c2goYVtpICsgMV0gKyAoYVtpXSAtIGFbaSArIDFdKSAqIDAuNik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNwbGluZTogZnVuY3Rpb24oeCwga2V5KSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuc3BsaW5lS1trZXldKSB7XHJcblxyXG4gICAgICAgIHZhciB4cyA9IFtdO1xyXG4gICAgICAgIHZhciB5cyA9IHRoaXMudHJhbnNsYXRlRWFzaW5nKGtleSk7XHJcblxyXG4gICAgICAgIC8vIHlzID0gdGhpcy5pbnNlcnRJbnRlcm1lZGlhdGVWYWx1ZXMoeXMpO1xyXG5cclxuICAgICAgICBpZiAoIXlzLmxlbmd0aCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeXMubGVuZ3RoOyBpKyspIHhzLnB1c2goaSAqICgxIC8gKHlzLmxlbmd0aCAtIDEpKSk7XHJcblxyXG4gICAgICAgIHZhciBrcyA9IHhzLm1hcChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGtzID0gdGhpcy5nZXROYXR1cmFsS3MoeHMsIHlzLCBrcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3BsaW5lWFtrZXldID0geHM7XHJcbiAgICAgICAgdGhpcy5zcGxpbmVZW2tleV0gPSB5cztcclxuICAgICAgICB0aGlzLnNwbGluZUtba2V5XSA9IGtzO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHggPiAxKSByZXR1cm4gdGhpcy5zcGxpbmVZW2tleV1bdGhpcy5zcGxpbmVZW2tleV0ubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICB2YXIga3MgPSB0aGlzLnNwbGluZUtba2V5XTtcclxuICAgICAgdmFyIHhzID0gdGhpcy5zcGxpbmVYW2tleV07XHJcbiAgICAgIHZhciB5cyA9IHRoaXMuc3BsaW5lWVtrZXldO1xyXG5cclxuICAgICAgdmFyIGkgPSAxO1xyXG5cclxuICAgICAgd2hpbGUgKHhzW2ldIDwgeCkgaSsrO1xyXG5cclxuICAgICAgdmFyIHQgPSAoeCAtIHhzW2kgLSAxXSkgLyAoeHNbaV0gLSB4c1tpIC0gMV0pO1xyXG4gICAgICB2YXIgYSA9IGtzW2kgLSAxXSAqICh4c1tpXSAtIHhzW2kgLSAxXSkgLSAoeXNbaV0gLSB5c1tpIC0gMV0pO1xyXG4gICAgICB2YXIgYiA9IC1rc1tpXSAqICh4c1tpXSAtIHhzW2kgLSAxXSkgKyAoeXNbaV0gLSB5c1tpIC0gMV0pO1xyXG4gICAgICB2YXIgcSA9ICgxIC0gdCkgKiB5c1tpIC0gMV0gKyB0ICogeXNbaV0gKyB0ICogKDEgLSB0KSAqIChhICogKDEgLSB0KSArIGIgKiB0KTtcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgIHZhciBweSA9IHlzW2kgLSAyXTtcclxuICAgICAgdmFyIGN5ID0geXNbaSAtIDFdO1xyXG4gICAgICB2YXIgbnkgPSAoaSA8IHlzLmxlbmd0aCAtIDEpID8geXNbaV0gOiB5c1tpIC0gMV07XHJcblxyXG4gICAgICBpZiAocSA+IG55KSB7XHJcbiAgICAgICAgdmFyIGRpZmYgPSAocSAtIHB5KTtcclxuICAgICAgICAvL3EgPSBweSArIGRpZmY7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgaWYgKGN5ID09PSBueSAmJiBjeSA9PT0gcHkpIHEgPSBweTtcclxuICAgICovXHJcblxyXG5cclxuICAgICAgcmV0dXJuIHE7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldE5hdHVyYWxLczogZnVuY3Rpb24oeHMsIHlzLCBrcykge1xyXG4gICAgICB2YXIgbiA9IHhzLmxlbmd0aCAtIDE7XHJcbiAgICAgIHZhciBBID0gdGhpcy56ZXJvc01hdChuICsgMSwgbiArIDIpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIC8vIHJvd3NcclxuICAgICAge1xyXG4gICAgICAgIEFbaV1baSAtIDFdID0gMSAvICh4c1tpXSAtIHhzW2kgLSAxXSk7XHJcbiAgICAgICAgQVtpXVtpXSA9IDIgKiAoMSAvICh4c1tpXSAtIHhzW2kgLSAxXSkgKyAxIC8gKHhzW2kgKyAxXSAtIHhzW2ldKSk7XHJcbiAgICAgICAgQVtpXVtpICsgMV0gPSAxIC8gKHhzW2kgKyAxXSAtIHhzW2ldKTtcclxuICAgICAgICBBW2ldW24gKyAxXSA9IDMgKiAoKHlzW2ldIC0geXNbaSAtIDFdKSAvICgoeHNbaV0gLSB4c1tpIC0gMV0pICogKHhzW2ldIC0geHNbaSAtIDFdKSkgKyAoeXNbaSArIDFdIC0geXNbaV0pIC8gKCh4c1tpICsgMV0gLSB4c1tpXSkgKiAoeHNbaSArIDFdIC0geHNbaV0pKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEFbMF1bMF0gPSAyIC8gKHhzWzFdIC0geHNbMF0pO1xyXG4gICAgICBBWzBdWzFdID0gMSAvICh4c1sxXSAtIHhzWzBdKTtcclxuICAgICAgQVswXVtuICsgMV0gPSAzICogKHlzWzFdIC0geXNbMF0pIC8gKCh4c1sxXSAtIHhzWzBdKSAqICh4c1sxXSAtIHhzWzBdKSk7XHJcblxyXG4gICAgICBBW25dW24gLSAxXSA9IDEgLyAoeHNbbl0gLSB4c1tuIC0gMV0pO1xyXG4gICAgICBBW25dW25dID0gMiAvICh4c1tuXSAtIHhzW24gLSAxXSk7XHJcbiAgICAgIEFbbl1bbiArIDFdID0gMyAqICh5c1tuXSAtIHlzW24gLSAxXSkgLyAoKHhzW25dIC0geHNbbiAtIDFdKSAqICh4c1tuXSAtIHhzW24gLSAxXSkpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuc29sdmUoQSwga3MpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzb2x2ZTogZnVuY3Rpb24oQSwga3MpIHtcclxuICAgICAgdmFyIG0gPSBBLmxlbmd0aDtcclxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBtOyBrKyspIC8vIGNvbHVtblxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gcGl2b3QgZm9yIGNvbHVtblxyXG4gICAgICAgIHZhciBpX21heCA9IDA7XHJcbiAgICAgICAgdmFyIHZhbGkgPSBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGs7IGkgPCBtOyBpKyspXHJcbiAgICAgICAgICBpZiAoQVtpXVtrXSA+IHZhbGkpIHtcclxuICAgICAgICAgICAgaV9tYXggPSBpO1xyXG4gICAgICAgICAgICB2YWxpID0gQVtpXVtrXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLnNwbGluZVN3YXBSb3dzKEEsIGssIGlfbWF4KTtcclxuXHJcbiAgICAgICAgLy8gZm9yIGFsbCByb3dzIGJlbG93IHBpdm90XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGsgKyAxOyBpIDwgbTsgaSsrKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gayArIDE7IGogPCBtICsgMTsgaisrKVxyXG4gICAgICAgICAgICBBW2ldW2pdID0gQVtpXVtqXSAtIEFba11bal0gKiAoQVtpXVtrXSAvIEFba11ba10pO1xyXG4gICAgICAgICAgQVtpXVtrXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAodmFyIGkgPSBtIC0gMTsgaSA+PSAwOyBpLS0pIC8vIHJvd3MgPSBjb2x1bW5zXHJcbiAgICAgIHtcclxuICAgICAgICB2YXIgdiA9IEFbaV1bbV0gLyBBW2ldW2ldO1xyXG4gICAgICAgIGtzW2ldID0gdjtcclxuICAgICAgICBmb3IgKHZhciBqID0gaSAtIDE7IGogPj0gMDsgai0tKSAvLyByb3dzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgQVtqXVttXSAtPSBBW2pdW2ldICogdjtcclxuICAgICAgICAgIEFbal1baV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4ga3M7XHJcbiAgICB9LFxyXG5cclxuICAgIHplcm9zTWF0OiBmdW5jdGlvbihyLCBjKSB7XHJcbiAgICAgIHZhciBBID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcjsgaSsrKSB7XHJcbiAgICAgICAgQS5wdXNoKFtdKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGM7IGorKykgQVtpXS5wdXNoKDApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBBO1xyXG4gICAgfSxcclxuXHJcbiAgICBzcGxpbmVTd2FwUm93czogZnVuY3Rpb24obSwgaywgbCkge1xyXG4gICAgICB2YXIgcCA9IG1ba107XHJcbiAgICAgIG1ba10gPSBtW2xdO1xyXG4gICAgICBtW2xdID0gcDtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgd2luZG93LmVhc2UgPSBlYXNlO1xyXG5cclxufSkoKTtcclxuXHJcblxyXG4vKiBmaWxlOiBzcmMvUGxheWdyb3VuZC5qcyAqL1xyXG5cclxuUExBWUdST1VORCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gcGxheWdyb3VuZChhcmdzKSB7XHJcblxyXG4gIHJldHVybiBuZXcgUExBWUdST1VORC5BcHBsaWNhdGlvbihhcmdzKTtcclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvVXRpbHMuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuVXRpbHMgPSB7XHJcblxyXG4gIGV4dGVuZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICBhcmd1bWVudHNbMF1bal0gPSBhcmd1bWVudHNbaV1bal07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xyXG5cclxuICB9LFxyXG5cclxuICBtZXJnZTogZnVuY3Rpb24oYSkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgYiA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XHJcblxyXG4gICAgICAgIHZhciB2YWx1ZSA9IGJba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhW2tleV0gIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYVtrZXldID09PSBcIm9iamVjdFwiKSB0aGlzLm1lcmdlKGFba2V5XSwgdmFsdWUpO1xyXG4gICAgICAgICAgZWxzZSBhW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaW52b2tlOiBmdW5jdGlvbihvYmplY3QsIG1ldGhvZE5hbWUpIHtcclxuXHJcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGN1cnJlbnQgPSBvYmplY3RbaV07XHJcblxyXG4gICAgICBpZiAoY3VycmVudFttZXRob2ROYW1lXSkgY3VycmVudFttZXRob2ROYW1lXS5hcHBseShjdXJyZW50LCBhcmdzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHRocm90dGxlOiBmdW5jdGlvbihmbiwgdGhyZXNob2xkKSB7XHJcbiAgICB0aHJlc2hvbGQgfHwgKHRocmVzaG9sZCA9IDI1MCk7XHJcbiAgICB2YXIgbGFzdCxcclxuICAgICAgZGVmZXJUaW1lcjtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xyXG5cclxuICAgICAgdmFyIG5vdyA9ICtuZXcgRGF0ZSxcclxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNob2xkKSB7XHJcbiAgICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcclxuICAgICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICB9LCB0aHJlc2hvbGQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZWFzZSA9IGVhc2U7XHJcblxyXG5cclxuLyogZmlsZTogc3JjL0V2ZW50cy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5FdmVudHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIG9uOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9uKGtleSwgZXZlbnRba2V5XSwgY29udGV4dClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcclxuXHJcbiAgICB2YXIgbGlzdGVuZXIgPSB7XHJcbiAgICAgIG9uY2U6IGZhbHNlLFxyXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2ssXHJcbiAgICAgIGNvbnRleHQ6IGNvbnRleHRcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICB9LFxyXG5cclxuICBvbmNlOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9uY2Uoa2V5LCBldmVudFtrZXldLCBjb250ZXh0KVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudF0pIHRoaXMubGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHZhciBsaXN0ZW5lciA9IHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICBjb250ZXh0OiBjb250ZXh0XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgfSxcclxuXHJcbiAgb2ZmOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF1baV0uX3JlbW92ZSkge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICBsZW4tLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICB0cmlnZ2VyOiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG5cclxuICAgIC8qIGlmIHlvdSBwcmVmZXIgZXZlbnRzIHBpcGUgKi9cclxuXHJcbiAgICBpZiAodGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXSkge1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW1wiZXZlbnRcIl0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHJcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXVtpXTtcclxuXHJcbiAgICAgICAgbGlzdGVuZXIuY2FsbGJhY2suY2FsbChsaXN0ZW5lci5jb250ZXh0IHx8IHRoaXMsIGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyogb3Igc3Vic2NyaWJlZCB0byBzaW5nbGUgZXZlbnQgKi9cclxuXHJcbiAgICBpZiAodGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tldmVudF0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHJcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbZXZlbnRdW2ldO1xyXG5cclxuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLmNvbnRleHQgfHwgdGhpcywgZGF0YSk7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB7XHJcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0uc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICBsZW4tLTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9TdGF0ZXMuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuU3RhdGVzID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBQTEFZR1JPVU5ELkV2ZW50cy5jYWxsKHRoaXMpO1xyXG5cclxuICBhcHAub24oXCJzdGVwXCIsIHRoaXMuc3RlcC5iaW5kKHRoaXMpKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlN0YXRlcy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm5leHQpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50ICYmIHRoaXMuY3VycmVudC5sb2NrZWQpIHJldHVybjtcclxuXHJcbiAgICB2YXIgc3RhdGUgPSB0aGlzLm5leHQ7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiKSBzdGF0ZSA9IG5ldyBzdGF0ZTtcclxuXHJcbiAgICAvKiBjcmVhdGUgc3RhdGUgaWYgb2JqZWN0IGhhcyBuZXZlciBiZWVuIHVzZWQgYXMgYSBzdGF0ZSBiZWZvcmUgKi9cclxuXHJcbiAgICBpZiAoIXN0YXRlLl9fY3JlYXRlZCkge1xyXG5cclxuICAgICAgc3RhdGUuX19jcmVhdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHN0YXRlLmFwcCA9IHRoaXMuYXBwO1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKFwiY3JlYXRlc3RhdGVcIiwge1xyXG4gICAgICAgIHN0YXRlOiBzdGF0ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChzdGF0ZS5jcmVhdGUpIHN0YXRlLmNyZWF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiBlbnRlciBuZXcgc3RhdGUgKi9cclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50KSB7XHJcbiAgICAgIHRoaXMudHJpZ2dlcihcImxlYXZlc3RhdGVcIiwge1xyXG4gICAgICAgIHByZXY6IHRoaXMuY3VycmVudCxcclxuICAgICAgICBuZXh0OiBzdGF0ZSxcclxuICAgICAgICBzdGF0ZTogdGhpcy5jdXJyZW50XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJpZ2dlcihcImVudGVyc3RhdGVcIiwge1xyXG4gICAgICBwcmV2OiB0aGlzLmN1cnJlbnQsXHJcbiAgICAgIG5leHQ6IHN0YXRlLFxyXG4gICAgICBzdGF0ZTogc3RhdGVcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY3VycmVudCA9IHN0YXRlO1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmVudGVyKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudC5lbnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwLnN0YXRlID0gdGhpcy5jdXJyZW50O1xyXG5cclxuICAgIHRoaXMubmV4dCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0OiBmdW5jdGlvbihzdGF0ZSkge1xyXG5cclxuICAgIGlmICh0aGlzLmN1cnJlbnQgJiYgdGhpcy5jdXJyZW50LmxlYXZlKSB0aGlzLmN1cnJlbnQubGVhdmUoKTtcclxuXHJcbiAgICB0aGlzLm5leHQgPSBzdGF0ZTtcclxuXHJcbiAgICB0aGlzLnN0ZXAoMCk7XHJcblxyXG4gIH1cclxuXHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5TdGF0ZXMucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xyXG5cclxuLyogZmlsZTogc3JjL0FwcGxpY2F0aW9uLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICB2YXIgYXBwID0gdGhpcztcclxuXHJcbiAgLyogZXZlbnRzICovXHJcblxyXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XHJcblxyXG4gIC8qIGRlZmF1bHRzICovXHJcblxyXG4gIFBMQVlHUk9VTkQuVXRpbHMubWVyZ2UodGhpcywgdGhpcy5kZWZhdWx0cywgYXJncyk7XHJcblxyXG4gIC8qIGd1ZXNzIHNjYWxpbmcgbW9kZSAqL1xyXG5cclxuICB0aGlzLmF1dG9XaWR0aCA9IHRoaXMud2lkdGggPyBmYWxzZSA6IHRydWU7XHJcbiAgdGhpcy5hdXRvSGVpZ2h0ID0gdGhpcy5oZWlnaHQgPyBmYWxzZSA6IHRydWU7XHJcbiAgdGhpcy5hdXRvU2NhbGUgPSB0aGlzLnNjYWxlID8gZmFsc2UgOiB0cnVlO1xyXG5cclxuICAvKiBnZXQgY29udGFpbmVyICovXHJcblxyXG4gIGlmICghdGhpcy5jb250YWluZXIpIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgaWYgKHRoaXMuY29udGFpbmVyICE9PSBkb2N1bWVudC5ib2R5KSB0aGlzLmN1c3RvbUNvbnRhaW5lciA9IHRydWU7XHJcblxyXG4gIGlmICh0eXBlb2YgdGhpcy5jb250YWluZXIgPT09IFwic3RyaW5nXCIpIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gIHRoaXMudXBkYXRlU2l6ZSgpO1xyXG5cclxuICAvKiBldmVudHMgKi9cclxuXHJcbiAgLy8gdGhpcy5lbWl0TG9jYWxFdmVudCA9IHRoaXMuZW1pdExvY2FsRXZlbnQuYmluZCh0aGlzKTtcclxuICAvLyB0aGlzLmVtaXRHbG9iYWxFdmVudCA9IHRoaXMuZW1pdEdsb2JhbEV2ZW50LmJpbmQodGhpcyk7XHJcblxyXG4gIC8qIHN0YXRlcyBtYW5hZ2VyICovXHJcblxyXG4gIHRoaXMuc3RhdGVzID0gbmV3IFBMQVlHUk9VTkQuU3RhdGVzKHRoaXMpO1xyXG4gIHRoaXMuc3RhdGVzLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0TG9jYWxFdmVudCwgdGhpcyk7XHJcblxyXG4gIC8qIG1vdXNlICovXHJcblxyXG4gIHRoaXMubW91c2UgPSBuZXcgUExBWUdST1VORC5Nb3VzZSh0aGlzLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgdGhpcy5tb3VzZS5vbihcImV2ZW50XCIsIHRoaXMuZW1pdEdsb2JhbEV2ZW50LCB0aGlzKTtcclxuXHJcbiAgLyogdG91Y2ggKi9cclxuXHJcbiAgdGhpcy50b3VjaCA9IG5ldyBQTEFZR1JPVU5ELlRvdWNoKHRoaXMsIHRoaXMuY29udGFpbmVyKTtcclxuICB0aGlzLnRvdWNoLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xyXG5cclxuICAvKiBrZXlib2FyZCAqL1xyXG5cclxuICB0aGlzLmtleWJvYXJkID0gbmV3IFBMQVlHUk9VTkQuS2V5Ym9hcmQoKTtcclxuICB0aGlzLmtleWJvYXJkLm9uKFwiZXZlbnRcIiwgdGhpcy5lbWl0R2xvYmFsRXZlbnQsIHRoaXMpO1xyXG5cclxuICAvKiBnYW1lcGFkcyAqL1xyXG5cclxuICB0aGlzLmdhbWVwYWRzID0gbmV3IFBMQVlHUk9VTkQuR2FtZXBhZHModGhpcyk7XHJcbiAgdGhpcy5nYW1lcGFkcy5vbihcImV2ZW50XCIsIHRoaXMuZW1pdEdsb2JhbEV2ZW50LCB0aGlzKTtcclxuXHJcbiAgLyogdHdlZW5zICovXHJcblxyXG4gIHRoaXMudHdlZW5zID0gbmV3IFBMQVlHUk9VTkQuVHdlZW5NYW5hZ2VyKHRoaXMpO1xyXG5cclxuICAvKiBlYXNlICovXHJcblxyXG4gIHRoaXMuZWFzZSA9IFBMQVlHUk9VTkQuVXRpbHMuZWFzZTtcclxuXHJcbiAgLyogc291bmQgKi9cclxuXHJcbiAgUExBWUdST1VORC5Tb3VuZCh0aGlzKTtcclxuXHJcbiAgLyogd2luZG93IHJlc2l6ZSAqL1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLmhhbmRsZVJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgLyogdmlzaWxpYml0eWNoYW5nZSAqL1xyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBoaWRkZW4gPSBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT0gJ2hpZGRlbic7XHJcbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwidmlzaWJpbGl0eWNoYW5nZVwiLCBoaWRkZW4pO1xyXG4gIH0pO1xyXG5cclxuICAvKiBhc3NldHMgY29udGFpbmVycyAqL1xyXG5cclxuICB0aGlzLmltYWdlcyA9IHt9O1xyXG4gIHRoaXMuYXRsYXNlcyA9IHt9O1xyXG4gIHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuICB0aGlzLmxvYWRlciA9IG5ldyBQTEFZR1JPVU5ELkxvYWRlcih0aGlzKTtcclxuXHJcbiAgdGhpcy5sb2FkRm9vKDAuMjUpO1xyXG5cclxuICAvKiBjcmVhdGUgcGx1Z2lucyBpbiB0aGUgc2FtZSB3YXkgKi9cclxuXHJcbiAgdGhpcy5wbHVnaW5zID0gW107XHJcblxyXG4gIGZvciAodmFyIGtleSBpbiBQTEFZR1JPVU5EKSB7XHJcblxyXG4gICAgdmFyIHByb3BlcnR5ID0gUExBWUdST1VORFtrZXldO1xyXG5cclxuICAgIGlmIChwcm9wZXJ0eS5wbHVnaW4pIHRoaXMucGx1Z2lucy5wdXNoKG5ldyBwcm9wZXJ0eSh0aGlzKSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyogZmxvdyAqL1xyXG5cclxuICB0aGlzLmVtaXRHbG9iYWxFdmVudChcInByZWxvYWRcIik7XHJcblxyXG4gIHRoaXMuZmlyc3RCYXRjaCA9IHRydWU7XHJcblxyXG4gIGZ1bmN0aW9uIG9uUHJlbG9hZEVuZCgpIHtcclxuXHJcbiAgICBhcHAubG9hZEZvbygwLjI1KTtcclxuXHJcbiAgICAvKiBydW4gZXZlcnl0aGluZyBpbiB0aGUgbmV4dCBmcmFtZSAqL1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBhcHAuZW1pdExvY2FsRXZlbnQoXCJjcmVhdGVcIik7XHJcblxyXG4gICAgICBhcHAuc2V0U3RhdGUoUExBWUdST1VORC5EZWZhdWx0U3RhdGUpO1xyXG4gICAgICBhcHAuaGFuZGxlUmVzaXplKCk7XHJcbiAgICAgIGFwcC5zZXRTdGF0ZShQTEFZR1JPVU5ELkxvYWRpbmdTY3JlZW4pO1xyXG5cclxuICAgICAgLyogZ2FtZSBsb29wICovXHJcblxyXG4gICAgICBQTEFZR1JPVU5ELkdhbWVMb29wKGFwcCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyogc3RhZ2UgcHJvcGVyIGxvYWRpbmcgc3RlcCAqL1xyXG5cclxuICAgIGFwcC5sb2FkZXIub25jZShcInJlYWR5XCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgYXBwLmZpcnN0QmF0Y2ggPSBmYWxzZTtcclxuXHJcbiAgICAgIGFwcC5zZXRTdGF0ZShQTEFZR1JPVU5ELkRlZmF1bHRTdGF0ZSk7XHJcblxyXG4gICAgICBhcHAuZW1pdExvY2FsRXZlbnQoXCJyZWFkeVwiKTtcclxuICAgICAgYXBwLmhhbmRsZVJlc2l6ZSgpO1xyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gIH07XHJcblxyXG5cclxuICB0aGlzLmxvYWRlci5vbmNlKFwicmVhZHlcIiwgb25QcmVsb2FkRW5kKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgZGVmYXVsdHM6IHtcclxuICAgIHNtb290aGluZzogMSxcclxuICAgIHBhdGhzOiB7XHJcbiAgICAgIGJhc2U6IFwiXCIsXHJcbiAgICAgIGltYWdlczogXCJpbWFnZXMvXCJcclxuICAgIH0sXHJcbiAgICBvZmZzZXRYOiAwLFxyXG4gICAgb2Zmc2V0WTogMFxyXG4gIH0sXHJcblxyXG4gIHNldFN0YXRlOiBmdW5jdGlvbihzdGF0ZSkge1xyXG5cclxuICAgIHRoaXMuc3RhdGVzLnNldChzdGF0ZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdldFBhdGg6IGZ1bmN0aW9uKHRvKSB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucGF0aHMuYmFzZSArICh0aGlzLnBhdGhzW3RvXSB8fCAodG8gKyBcIi9cIikpO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRBc3NldEVudHJ5OiBmdW5jdGlvbihwYXRoLCBmb2xkZXIsIGRlZmF1bHRFeHRlbnNpb24pIHtcclxuXHJcbiAgICAvKiB0cmFuc2xhdGUgZm9sZGVyIGFjY29yZGluZyB0byB1c2VyIHByb3ZpZGVkIHBhdGhzXHJcbiAgICAgICBvciBsZWF2ZSBhcyBpcyAqL1xyXG5cclxuICAgIHZhciBmb2xkZXIgPSB0aGlzLnBhdGhzW2ZvbGRlcl0gfHwgKGZvbGRlciArIFwiL1wiKTtcclxuXHJcbiAgICB2YXIgZmlsZWluZm8gPSBwYXRoLm1hdGNoKC8oLiopXFwuLiovKTtcclxuICAgIHZhciBrZXkgPSBmaWxlaW5mbyA/IGZpbGVpbmZvWzFdIDogcGF0aDtcclxuXHJcbiAgICB2YXIgdGVtcCA9IHBhdGguc3BsaXQoXCIuXCIpO1xyXG4gICAgdmFyIGJhc2VuYW1lID0gcGF0aDtcclxuXHJcbiAgICBpZiAodGVtcC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHZhciBleHQgPSB0ZW1wLnBvcCgpO1xyXG4gICAgICBwYXRoID0gdGVtcC5qb2luKFwiLlwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBleHQgPSBkZWZhdWx0RXh0ZW5zaW9uO1xyXG4gICAgICBiYXNlbmFtZSArPSBcIi5cIiArIGRlZmF1bHRFeHRlbnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAga2V5OiBrZXksXHJcbiAgICAgIHVybDogdGhpcy5wYXRocy5iYXNlICsgZm9sZGVyICsgYmFzZW5hbWUsXHJcbiAgICAgIHBhdGg6IHRoaXMucGF0aHMuYmFzZSArIGZvbGRlciArIHBhdGgsXHJcbiAgICAgIGV4dDogZXh0XHJcbiAgICB9O1xyXG5cclxuICB9LFxyXG5cclxuICAvKiBldmVudHMgdGhhdCBzaG91bGRuJ3QgZmxvdyBkb3duIHRvIHRoZSBzdGF0ZSAqL1xyXG5cclxuICBlbWl0TG9jYWxFdmVudDogZnVuY3Rpb24oZXZlbnQsIGRhdGEpIHtcclxuXHJcbiAgICB0aGlzLnRyaWdnZXIoZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgIGlmICgoIXRoaXMuZmlyc3RCYXRjaCB8fCB0aGlzLmxvYWRlci5yZWFkeSkgJiYgdGhpc1tldmVudF0pIHRoaXNbZXZlbnRdKGRhdGEpO1xyXG5cclxuICB9LFxyXG5cclxuICAvKiBldmVudHMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBzdGF0ZSAqL1xyXG5cclxuICBlbWl0R2xvYmFsRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnN0YXRlKSByZXR1cm4gdGhpcy5lbWl0TG9jYWxFdmVudChldmVudCwgZGF0YSk7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgICBpZiAoKCF0aGlzLmZpcnN0QmF0Y2ggfHwgdGhpcy5sb2FkZXIucmVhZHkpICYmIHRoaXMuZXZlbnQpIHRoaXMuZXZlbnQoZXZlbnQsIGRhdGEpO1xyXG5cclxuICAgIGlmICgoIXRoaXMuZmlyc3RCYXRjaCB8fCB0aGlzLmxvYWRlci5yZWFkeSkgJiYgdGhpc1tldmVudF0pIHRoaXNbZXZlbnRdKGRhdGEpO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLmV2ZW50KSB0aGlzLnN0YXRlLmV2ZW50KGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZVtldmVudF0pIHRoaXMuc3RhdGVbZXZlbnRdKGRhdGEpO1xyXG5cclxuICAgIHRoaXMudHJpZ2dlcihcInBvc3RcIiArIGV2ZW50LCBkYXRhKTtcclxuXHJcbiAgICAvLyBpZiAodGhpcy5zdGF0ZS5wcm94eSkgdGhpcy5zdGF0ZS5wcm94eShldmVudCwgZGF0YSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVNpemU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmN1c3RvbUNvbnRhaW5lcikge1xyXG5cclxuICAgICAgdmFyIGNvbnRhaW5lcldpZHRoID0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgIHZhciBjb250YWluZXJIZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHZhciBjb250YWluZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICB2YXIgY29udGFpbmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuYXV0b1NjYWxlICYmICF0aGlzLmF1dG9XaWR0aCAmJiAhdGhpcy5hdXRvSGVpZ2h0KSB7XHJcblxyXG4gICAgfSBlbHNlIGlmICghdGhpcy5hdXRvSGVpZ2h0ICYmIHRoaXMuYXV0b1dpZHRoKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5hdXRvU2NhbGUpIHRoaXMuc2NhbGUgPSBjb250YWluZXJIZWlnaHQgLyB0aGlzLmhlaWdodDtcclxuXHJcbiAgICAgIHRoaXMud2lkdGggPSBNYXRoLmNlaWwoY29udGFpbmVyV2lkdGggLyB0aGlzLnNjYWxlKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmF1dG9XaWR0aCAmJiB0aGlzLmF1dG9IZWlnaHQpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9TY2FsZSkgdGhpcy5zY2FsZSA9IGNvbnRhaW5lcldpZHRoIC8gdGhpcy53aWR0aDtcclxuXHJcbiAgICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5jZWlsKGNvbnRhaW5lckhlaWdodCAvIHRoaXMuc2NhbGUpO1xyXG5cclxuXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYXV0b1dpZHRoICYmIHRoaXMuYXV0b0hlaWdodCAmJiB0aGlzLmF1dG9TY2FsZSkge1xyXG5cclxuICAgICAgdGhpcy5zY2FsZSA9IDE7XHJcbiAgICAgIHRoaXMud2lkdGggPSBjb250YWluZXJXaWR0aDtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBjb250YWluZXJIZWlnaHQ7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmF1dG9XaWR0aCAmJiB0aGlzLmF1dG9IZWlnaHQpIHtcclxuXHJcbiAgICAgIHRoaXMud2lkdGggPSBNYXRoLmNlaWwoY29udGFpbmVyV2lkdGggLyB0aGlzLnNjYWxlKTtcclxuICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmNlaWwoY29udGFpbmVySGVpZ2h0IC8gdGhpcy5zY2FsZSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHRoaXMuc2NhbGUgPSBNYXRoLm1pbihjb250YWluZXJXaWR0aCAvIHRoaXMud2lkdGgsIGNvbnRhaW5lckhlaWdodCAvIHRoaXMuaGVpZ2h0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vZmZzZXRYID0gKGNvbnRhaW5lcldpZHRoIC0gdGhpcy53aWR0aCAqIHRoaXMuc2NhbGUpIC8gMiB8IDA7XHJcbiAgICB0aGlzLm9mZnNldFkgPSAoY29udGFpbmVySGVpZ2h0IC0gdGhpcy5oZWlnaHQgKiB0aGlzLnNjYWxlKSAvIDIgfCAwO1xyXG5cclxuICAgIHRoaXMuY2VudGVyID0ge1xyXG4gICAgICB4OiB0aGlzLndpZHRoIC8gMiB8IDAsXHJcbiAgICAgIHk6IHRoaXMuaGVpZ2h0IC8gMiB8IDBcclxuICAgIH07XHJcblxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZVJlc2l6ZTogUExBWUdST1VORC5VdGlscy50aHJvdHRsZShmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVNpemUoKTtcclxuXHJcbiAgICB0aGlzLm1vdXNlLmhhbmRsZVJlc2l6ZSgpO1xyXG4gICAgdGhpcy50b3VjaC5oYW5kbGVSZXNpemUoKTtcclxuXHJcbiAgICB0aGlzLmVtaXRHbG9iYWxFdmVudChcInJlc2l6ZVwiLCB7fSk7XHJcblxyXG4gIH0sIDE2KSxcclxuXHJcbiAgLypcclxuICAgIHJlcXVlc3QgYSBmaWxlIG92ZXIgaHR0cFxyXG4gICAgaXQgc2hhbGwgYmUgbGF0ZXIgYW4gYWJzdHJhY3Rpb24gdXNpbmcgJ2ZzJyBpbiBub2RlLXdlYmtpdFxyXG5cclxuICAgIHJldHVybnMgYSBwcm9taXNlXHJcbiAgKi9cclxuXHJcbiAgcmVxdWVzdDogZnVuY3Rpb24odXJsKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvbWlzZShzdWNjZXNzLCBmYWlsKSB7XHJcblxyXG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgdmFyIGFwcCA9IHRoaXM7XHJcblxyXG4gICAgICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcclxuXHJcbiAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIHhociA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCAmJiB4aHIuc3RhdHVzICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhaWwobmV3IEVycm9yKFwiRmFpbGVkIHRvIGdldCBcIiArIHVybCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1Y2Nlc3MoeGhyKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocHJvbWlzZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qIGltYWdpbmFyeSB0aW1lb3V0IHRvIGRlbGF5IGxvYWRpbmcgKi9cclxuXHJcbiAgbG9hZEZvbzogZnVuY3Rpb24odGltZW91dCkge1xyXG5cclxuICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcjtcclxuXHJcbiAgICB0aGlzLmxvYWRlci5hZGQoXCJmb28gXCIgKyB0aW1lb3V0KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2FkZXIuc3VjY2VzcyhcImZvbyBcIiArIHRpbWVvdXQpO1xyXG4gICAgfSwgdGltZW91dCAqIDEwMDApO1xyXG5cclxuICB9LFxyXG5cclxuICAvKiBkYXRhL2pzb24gKi9cclxuXHJcbiAgbG9hZERhdGE6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZykgdGhpcy5sb2FkRGF0YShhcmdba2V5XSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB0aGlzLmxvYWREYXRhSXRlbShhcmcpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgbG9hZERhdGFJdGVtOiBmdW5jdGlvbihuYW1lKSB7XHJcblxyXG4gICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRBc3NldEVudHJ5KG5hbWUsIFwiZGF0YVwiLCBcImpzb25cIik7XHJcblxyXG4gICAgdmFyIGFwcCA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5sb2FkZXIuYWRkKCk7XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0KGVudHJ5LnVybCkudGhlbihwcm9jZXNzRGF0YSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0RhdGEocmVxdWVzdCkge1xyXG5cclxuICAgICAgaWYgKGVudHJ5LmV4dCA9PT0gXCJqc29uXCIpIHtcclxuICAgICAgICBhcHAuZGF0YVtlbnRyeS5rZXldID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXBwLmRhdGFbZW50cnkua2V5XSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhcHAubG9hZGVyLnN1Y2Nlc3MoZW50cnkudXJsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIC8qIGltYWdlcyAqL1xyXG5cclxuICBsb2FkSW1hZ2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmxvYWRJbWFnZXMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbG9hZEltYWdlczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHByb21pc2VzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaV07XHJcblxyXG4gICAgICAvKiBwb2x5bW9ycGhpc20gYXQgaXRzIGZpbmVzdCAqL1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZykgcHJvbWlzZXMgPSBwcm9taXNlcy5jb25jYXQodGhpcy5sb2FkSW1hZ2VzKGFyZ1trZXldKSk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZE9uZUltYWdlKGFyZykpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG5cclxuICB9LFxyXG5cclxuICBsb2FkT25lSW1hZ2U6IGZ1bmN0aW9uKG5hbWUpIHtcclxuXHJcbiAgICB2YXIgYXBwID0gdGhpcztcclxuXHJcbiAgICBpZiAoIXRoaXMuX2ltYWdlTG9hZGVycykgdGhpcy5faW1hZ2VMb2FkZXJzID0ge307XHJcblxyXG4gICAgaWYgKCF0aGlzLl9pbWFnZUxvYWRlcnNbbmFtZV0pIHtcclxuXHJcbiAgICAgIHZhciBwcm9taXNlID0gZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIC8qIGlmIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QvYXJyYXkgbGV0J3MgdHJ5IHRvIGxvYWQgaXQgKi9cclxuXHJcbiAgICAgICAgdmFyIGxvYWRlciA9IGFwcC5sb2FkZXI7XHJcblxyXG4gICAgICAgIHZhciBlbnRyeSA9IGFwcC5nZXRBc3NldEVudHJ5KG5hbWUsIFwiaW1hZ2VzXCIsIFwicG5nXCIpO1xyXG5cclxuICAgICAgICBhcHAubG9hZGVyLmFkZChlbnRyeS5wYXRoKTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlID0gYXBwLmltYWdlc1tlbnRyeS5rZXldID0gbmV3IEltYWdlO1xyXG5cclxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKGltYWdlKTtcclxuICAgICAgICAgIGxvYWRlci5zdWNjZXNzKGVudHJ5LnVybCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgcmVqZWN0KFwiY2FuJ3QgbG9hZCBcIiArIGVudHJ5LnVybCk7XHJcbiAgICAgICAgICBsb2FkZXIuZXJyb3IoZW50cnkudXJsKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLnNyYyA9IGVudHJ5LnVybDtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBhcHAuX2ltYWdlTG9hZGVyc1tuYW1lXSA9IG5ldyBQcm9taXNlKHByb21pc2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5faW1hZ2VMb2FkZXJzW25hbWVdO1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG5cclxuXHJcbi8qIGZpbGU6IHNyYy9HYW1lTG9vcC5qcyAqL1xyXG5cclxuUExBWUdST1VORC5HYW1lTG9vcCA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICBhcHAubGlmZXRpbWUgPSAwO1xyXG4gIGFwcC5vcHMgPSAwO1xyXG4gIGFwcC5vcGNvc3QgPSAwO1xyXG5cclxuICB2YXIgbGFzdFRpY2sgPSBEYXRlLm5vdygpO1xyXG4gIHZhciBmcmFtZSA9IDA7XHJcbiAgdmFyIHVuYm91bmRlZCA9IGZhbHNlO1xyXG5cclxuICBmdW5jdGlvbiByZW5kZXIoZHQpIHtcclxuXHJcbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwicmVuZGVyXCIsIGR0KVxyXG4gICAgYXBwLmVtaXRHbG9iYWxFdmVudChcInBvc3RyZW5kZXJcIiwgZHQpXHJcblxyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIHN0ZXAoZHQpIHtcclxuXHJcbiAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwic3RlcFwiLCBkdClcclxuXHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XHJcbiAgICBpZiAocmVxdWVzdElkID09IDApIHsgLy8gV2luZG93IGlzIGJsdXJyZWRcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYXBwLnVuYm91bmQpIHtcclxuICAgICAgaWYgKGFwcC5pbW1pZGlhdGUpIHtcclxuICAgICAgICBzZXRaZXJvVGltZW91dChnYW1lTG9vcCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVxdWVzdElkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWx0YSA9IERhdGUubm93KCkgLSBsYXN0VGljaztcclxuXHJcbiAgICBsYXN0VGljayA9IERhdGUubm93KCk7XHJcblxyXG4gICAgaWYgKGFwcC51bmJvdW5kKSB7XHJcbiAgICAgIGRlbHRhID0gMjA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRlbHRhID4gMTAwMCkgcmV0dXJuO1xyXG5cclxuICAgIHZhciBkdCA9IGRlbHRhIC8gMTAwMDtcclxuXHJcbiAgICBhcHAubGlmZXRpbWUgKz0gZHQ7XHJcbiAgICBhcHAuZWxhcHNlZCA9IGR0O1xyXG5cclxuICAgIHN0ZXAoZHQpO1xyXG5cclxuICAgIHJlbmRlcihkdCk7XHJcblxyXG4gICAgaWYgKGFwcC51bmJvdW5kICYmICF1bmJvdW5kZWQpIHtcclxuICAgICAgdW5ib3VuZGVkID0gdHJ1ZTtcclxuICAgICAgd2hpbGUgKGFwcC51bmJvdW5kKSB7XHJcbiAgICAgICAgZ2FtZUxvb3AoKTtcclxuICAgICAgfVxyXG4gICAgICB1bmJvdW5kZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgIGlmIChyZXF1ZXN0SWQgIT0gMCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SWQpO1xyXG4gICAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0cnVlKTtcclxuICAgICAgcmVxdWVzdElkID0gMDtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXJlcXVlc3RJZCkge1xyXG4gICAgICByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xyXG4gICAgICBhcHAuZW1pdEdsb2JhbEV2ZW50KFwidmlzaWJpbGl0eWNoYW5nZVwiLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHZhciByZXF1ZXN0SWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xyXG5cclxufTtcclxuXHJcbi8vIENvcHlyaWdodCBkYmFyb24sIHZpYSBodHRwOi8vZGJhcm9uLm9yZy9sb2cvMjAxMDAzMDktZmFzdGVyLXRpbWVvdXRzXHJcbi8vIE9ubHkgYWRkIHNldFplcm9UaW1lb3V0IHRvIHRoZSB3aW5kb3cgb2JqZWN0LCBhbmQgaGlkZSBldmVyeXRoaW5nXHJcbi8vIGVsc2UgaW4gYSBjbG9zdXJlLlxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHRpbWVvdXRzID0gW107XHJcbiAgdmFyIG1lc3NhZ2VOYW1lID0gXCJ6ZXJvLXRpbWVvdXQtbWVzc2FnZVwiO1xyXG5cclxuICAvLyBMaWtlIHNldFRpbWVvdXQsIGJ1dCBvbmx5IHRha2VzIGEgZnVuY3Rpb24gYXJndW1lbnQuICBUaGVyZSdzXHJcbiAgLy8gbm8gdGltZSBhcmd1bWVudCAoYWx3YXlzIHplcm8pIGFuZCBubyBhcmd1bWVudHMgKHlvdSBoYXZlIHRvXHJcbiAgLy8gdXNlIGEgY2xvc3VyZSkuXHJcbiAgZnVuY3Rpb24gc2V0WmVyb1RpbWVvdXQoZm4pIHtcclxuICAgIHRpbWVvdXRzLnB1c2goZm4pO1xyXG4gICAgd2luZG93LnBvc3RNZXNzYWdlKG1lc3NhZ2VOYW1lLCBcIipcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVNZXNzYWdlKGV2ZW50KSB7XHJcblxyXG4gICAgaWYgKGV2ZW50LnNvdXJjZSA9PSB3aW5kb3cgJiYgZXZlbnQuZGF0YSA9PSBtZXNzYWdlTmFtZSkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgaWYgKHRpbWVvdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgZm4gPSB0aW1lb3V0cy5zaGlmdCgpO1xyXG4gICAgICAgIGZuKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlTWVzc2FnZSwgdHJ1ZSk7XHJcblxyXG4gIC8vIEFkZCB0aGUgb25lIHRoaW5nIHdlIHdhbnQgYWRkZWQgdG8gdGhlIHdpbmRvdyBvYmplY3QuXHJcbiAgd2luZG93LnNldFplcm9UaW1lb3V0ID0gc2V0WmVyb1RpbWVvdXQ7XHJcbn0pKCk7XHJcblxyXG4vKiBmaWxlOiBzcmMvR2FtZXBhZHMuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuR2FtZXBhZHMgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XHJcblxyXG4gIHRoaXMuZ2V0R2FtZXBhZHMgPSBuYXZpZ2F0b3IuZ2V0R2FtZXBhZHMgfHwgbmF2aWdhdG9yLndlYmtpdEdldEdhbWVwYWRzO1xyXG5cclxuICB0aGlzLmdhbWVwYWRtb3ZlRXZlbnQgPSB7fTtcclxuICB0aGlzLmdhbWVwYWRkb3duRXZlbnQgPSB7fTtcclxuICB0aGlzLmdhbWVwYWR1cEV2ZW50ID0ge307XHJcblxyXG4gIHRoaXMuZ2FtZXBhZHMgPSB7fTtcclxuXHJcbiAgdGhpcy5hcHAub24oXCJzdGVwXCIsIHRoaXMuc3RlcC5iaW5kKHRoaXMpKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkdhbWVwYWRzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgYnV0dG9uczoge1xyXG4gICAgMDogXCIxXCIsXHJcbiAgICAxOiBcIjJcIixcclxuICAgIDI6IFwiM1wiLFxyXG4gICAgMzogXCI0XCIsXHJcbiAgICA0OiBcImwxXCIsXHJcbiAgICA1OiBcInIxXCIsXHJcbiAgICA2OiBcImwyXCIsXHJcbiAgICA3OiBcInIyXCIsXHJcbiAgICA4OiBcInNlbGVjdFwiLFxyXG4gICAgOTogXCJzdGFydFwiLFxyXG4gICAgMTI6IFwidXBcIixcclxuICAgIDEzOiBcImRvd25cIixcclxuICAgIDE0OiBcImxlZnRcIixcclxuICAgIDE1OiBcInJpZ2h0XCJcclxuICB9LFxyXG5cclxuICB6ZXJvU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBidXR0b25zID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gMTU7IGkrKykge1xyXG4gICAgICBidXR0b25zLnB1c2goe1xyXG4gICAgICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiAwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF4ZXM6IFtdLFxyXG4gICAgICBidXR0b25zOiBidXR0b25zXHJcbiAgICB9O1xyXG5cclxuICB9LFxyXG5cclxuICBjcmVhdGVHYW1lcGFkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICBidXR0b25zOiB7fSxcclxuICAgICAgc3RpY2tzOiBbe1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH1dXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgdmFyIGtleSA9IHRoaXMuYnV0dG9uc1tpXTtcclxuICAgICAgcmVzdWx0LmJ1dHRvbnNba2V5XSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghbmF2aWdhdG9yLmdldEdhbWVwYWRzKSByZXR1cm47XHJcblxyXG4gICAgdmFyIGdhbWVwYWRzID0gbmF2aWdhdG9yLmdldEdhbWVwYWRzKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnYW1lcGFkcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGN1cnJlbnQgPSBnYW1lcGFkc1tpXTtcclxuXHJcbiAgICAgIGlmICghY3VycmVudCkgY29udGludWU7XHJcblxyXG4gICAgICBpZiAoIXRoaXNbaV0pIHRoaXNbaV0gPSB0aGlzLmNyZWF0ZUdhbWVwYWQoKTtcclxuXHJcbiAgICAgIC8qIGhhdmUgdG8gY29uY2F0IHRoZSBjdXJyZW50LmJ1dHRvbnMgYmVjYXVzZSB0aGUgYXJlIHJlYWQtb25seSAqL1xyXG5cclxuICAgICAgdmFyIGJ1dHRvbnMgPSBbXS5jb25jYXQoY3VycmVudC5idXR0b25zKTtcclxuXHJcbiAgICAgIC8qIGhhY2sgZm9yIG1pc3NpbmcgIGRwYWRzICovXHJcblxyXG4gICAgICBmb3IgKHZhciBoID0gMTI7IGggPD0gMTU7IGgrKykge1xyXG4gICAgICAgIGlmICghYnV0dG9uc1toXSkgYnV0dG9uc1toXSA9IHtcclxuICAgICAgICAgIHByZXNzZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgdmFsdWU6IDBcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgcHJldmlvdXMgPSB0aGlzW2ldO1xyXG5cclxuICAgICAgLyogYXhlcyAoc3RpY2tzKSB0byBidXR0b25zICovXHJcblxyXG4gICAgICBpZiAoY3VycmVudC5heGVzKSB7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50LmF4ZXNbMF0gPCAwKSBidXR0b25zWzE0XS5wcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoY3VycmVudC5heGVzWzBdID4gMCkgYnV0dG9uc1sxNV0ucHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQuYXhlc1sxXSA8IDApIGJ1dHRvbnNbMTJdLnByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChjdXJyZW50LmF4ZXNbMV0gPiAwKSBidXR0b25zWzEzXS5wcmVzc2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHJldmlvdXMuc3RpY2tzWzBdLnggPSBjdXJyZW50LmF4ZXNbMF0udmFsdWU7XHJcbiAgICAgICAgcHJldmlvdXMuc3RpY2tzWzBdLnkgPSBjdXJyZW50LmF4ZXNbMV0udmFsdWU7XHJcbiAgICAgICAgcHJldmlvdXMuc3RpY2tzWzFdLnggPSBjdXJyZW50LmF4ZXNbMl0udmFsdWU7XHJcbiAgICAgICAgcHJldmlvdXMuc3RpY2tzWzFdLnkgPSBjdXJyZW50LmF4ZXNbM10udmFsdWU7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBjaGVjayBidXR0b25zIGNoYW5nZXMgKi9cclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYnV0dG9ucy5sZW5ndGg7IGorKykge1xyXG5cclxuICAgICAgICB2YXIga2V5ID0gdGhpcy5idXR0b25zW2pdO1xyXG5cclxuICAgICAgICAvKiBnYW1lcGFkIGRvd24gKi9cclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbnNbal0ucHJlc3NlZCAmJiAhcHJldmlvdXMuYnV0dG9uc1trZXldKSB7XHJcblxyXG4gICAgICAgICAgcHJldmlvdXMuYnV0dG9uc1trZXldID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuZ2FtZXBhZGRvd25FdmVudC5idXR0b24gPSB0aGlzLmJ1dHRvbnNbal07XHJcbiAgICAgICAgICB0aGlzLmdhbWVwYWRkb3duRXZlbnQuZ2FtZXBhZCA9IGk7XHJcbiAgICAgICAgICB0aGlzLnRyaWdnZXIoXCJnYW1lcGFkZG93blwiLCB0aGlzLmdhbWVwYWRkb3duRXZlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIGdhbWVwYWQgdXAgKi9cclxuICAgICAgICBlbHNlIGlmICghYnV0dG9uc1tqXS5wcmVzc2VkICYmIHByZXZpb3VzLmJ1dHRvbnNba2V5XSkge1xyXG5cclxuICAgICAgICAgIHByZXZpb3VzLmJ1dHRvbnNba2V5XSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5nYW1lcGFkdXBFdmVudC5idXR0b24gPSB0aGlzLmJ1dHRvbnNbal07XHJcbiAgICAgICAgICB0aGlzLmdhbWVwYWR1cEV2ZW50LmdhbWVwYWQgPSBpO1xyXG4gICAgICAgICAgdGhpcy50cmlnZ2VyKFwiZ2FtZXBhZHVwXCIsIHRoaXMuZ2FtZXBhZHVwRXZlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELkdhbWVwYWRzLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcclxuXHJcblxyXG4vKiBmaWxlOiBzcmMvS2V5Ym9hcmQuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuS2V5Ym9hcmQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5rZXlzID0ge307XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMua2V5ZG93bi5iaW5kKHRoaXMpKTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy5rZXl1cC5iaW5kKHRoaXMpKTtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgdGhpcy5rZXlwcmVzcy5iaW5kKHRoaXMpKTtcclxuXHJcbiAgdGhpcy5rZXlkb3duRXZlbnQgPSB7fTtcclxuICB0aGlzLmtleXVwRXZlbnQgPSB7fTtcclxuXHJcbiAgdGhpcy5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5LZXlib2FyZC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGtleWNvZGVzOiB7XHJcbiAgICAzNzogXCJsZWZ0XCIsXHJcbiAgICAzODogXCJ1cFwiLFxyXG4gICAgMzk6IFwicmlnaHRcIixcclxuICAgIDQwOiBcImRvd25cIixcclxuICAgIDQ1OiBcImluc2VydFwiLFxyXG4gICAgNDY6IFwiZGVsZXRlXCIsXHJcbiAgICA4OiBcImJhY2tzcGFjZVwiLFxyXG4gICAgOTogXCJ0YWJcIixcclxuICAgIDEzOiBcImVudGVyXCIsXHJcbiAgICAxNjogXCJzaGlmdFwiLFxyXG4gICAgMTc6IFwiY3RybFwiLFxyXG4gICAgMTg6IFwiYWx0XCIsXHJcbiAgICAxOTogXCJwYXVzZVwiLFxyXG4gICAgMjA6IFwiY2Fwc2xvY2tcIixcclxuICAgIDI3OiBcImVzY2FwZVwiLFxyXG4gICAgMzI6IFwic3BhY2VcIixcclxuICAgIDMzOiBcInBhZ2V1cFwiLFxyXG4gICAgMzQ6IFwicGFnZWRvd25cIixcclxuICAgIDM1OiBcImVuZFwiLFxyXG4gICAgMzY6IFwiaG9tZVwiLFxyXG4gICAgMTEyOiBcImYxXCIsXHJcbiAgICAxMTM6IFwiZjJcIixcclxuICAgIDExNDogXCJmM1wiLFxyXG4gICAgMTE1OiBcImY0XCIsXHJcbiAgICAxMTY6IFwiZjVcIixcclxuICAgIDExNzogXCJmNlwiLFxyXG4gICAgMTE4OiBcImY3XCIsXHJcbiAgICAxMTk6IFwiZjhcIixcclxuICAgIDEyMDogXCJmOVwiLFxyXG4gICAgMTIxOiBcImYxMFwiLFxyXG4gICAgMTIyOiBcImYxMVwiLFxyXG4gICAgMTIzOiBcImYxMlwiLFxyXG4gICAgMTQ0OiBcIm51bWxvY2tcIixcclxuICAgIDE0NTogXCJzY3JvbGxsb2NrXCIsXHJcbiAgICAxODY6IFwic2VtaWNvbG9uXCIsXHJcbiAgICAxODc6IFwiZXF1YWxcIixcclxuICAgIDE4ODogXCJjb21tYVwiLFxyXG4gICAgMTg5OiBcImRhc2hcIixcclxuICAgIDE5MDogXCJwZXJpb2RcIixcclxuICAgIDE5MTogXCJzbGFzaFwiLFxyXG4gICAgMTkyOiBcImdyYXZlYWNjZW50XCIsXHJcbiAgICAyMTk6IFwib3BlbmJyYWNrZXRcIixcclxuICAgIDIyMDogXCJiYWNrc2xhc2hcIixcclxuICAgIDIyMTogXCJjbG9zZWJyYWtldFwiLFxyXG4gICAgMjIyOiBcInNpbmdsZXF1b3RlXCJcclxuICB9LFxyXG5cclxuICBrZXlwcmVzczogZnVuY3Rpb24oZSkge1xyXG5cclxuICB9LFxyXG5cclxuICBrZXlkb3duOiBmdW5jdGlvbihlKSB7XHJcbiAgICBpZiAoZS53aGljaCA+PSA0OCAmJiBlLndoaWNoIDw9IDkwKSB2YXIga2V5TmFtZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCkudG9Mb3dlckNhc2UoKTtcclxuICAgIGVsc2UgdmFyIGtleU5hbWUgPSB0aGlzLmtleWNvZGVzW2Uud2hpY2hdO1xyXG5cclxuICAgIGlmICh0aGlzLmtleXNba2V5TmFtZV0pIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmtleWRvd25FdmVudC5rZXkgPSBrZXlOYW1lO1xyXG4gICAgdGhpcy5rZXlkb3duRXZlbnQub3JpZ2luYWwgPSBlO1xyXG5cclxuICAgIHRoaXMua2V5c1trZXlOYW1lXSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25FdmVudCk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJldmVudERlZmF1bHQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgIGUua2V5Q29kZSA9IDA7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBrZXl1cDogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGlmIChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gOTApIHZhciBrZXlOYW1lID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgZWxzZSB2YXIga2V5TmFtZSA9IHRoaXMua2V5Y29kZXNbZS53aGljaF07XHJcblxyXG4gICAgdGhpcy5rZXl1cEV2ZW50LmtleSA9IGtleU5hbWU7XHJcbiAgICB0aGlzLmtleXVwRXZlbnQub3JpZ2luYWwgPSBlO1xyXG5cclxuICAgIHRoaXMua2V5c1trZXlOYW1lXSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudHJpZ2dlcihcImtleXVwXCIsIHRoaXMua2V5dXBFdmVudCk7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuS2V5Ym9hcmQucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xyXG5cclxuXHJcblxyXG4vKiBmaWxlOiBzcmMvUG9pbnRlci5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Qb2ludGVyID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBhcHAub24oXCJ0b3VjaHN0YXJ0XCIsIHRoaXMudG91Y2hzdGFydCwgdGhpcyk7XHJcbiAgYXBwLm9uKFwidG91Y2hlbmRcIiwgdGhpcy50b3VjaGVuZCwgdGhpcyk7XHJcbiAgYXBwLm9uKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2htb3ZlLCB0aGlzKTtcclxuXHJcbiAgYXBwLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlLCB0aGlzKTtcclxuICBhcHAub24oXCJtb3VzZWRvd25cIiwgdGhpcy5tb3VzZWRvd24sIHRoaXMpO1xyXG4gIGFwcC5vbihcIm1vdXNldXBcIiwgdGhpcy5tb3VzZXVwLCB0aGlzKTtcclxuXHJcbiAgdGhpcy5wb2ludGVycyA9IGFwcC5wb2ludGVycyA9IHt9O1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuUG9pbnRlci5wbHVnaW4gPSB0cnVlO1xyXG5cclxuUExBWUdST1VORC5Qb2ludGVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgdXBkYXRlUG9pbnRlcjogZnVuY3Rpb24ocG9pbnRlcikge1xyXG5cclxuICAgIHRoaXMucG9pbnRlcnNbcG9pbnRlci5pZF0gPSBwb2ludGVyO1xyXG5cclxuICB9LFxyXG5cclxuICByZW1vdmVQb2ludGVyOiBmdW5jdGlvbihwb2ludGVyKSB7XHJcblxyXG4gICAgZGVsZXRlIHRoaXMucG9pbnRlcnNbcG9pbnRlci5pZF07XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvdWNoc3RhcnQ6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLnRvdWNoID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvaW50ZXIoZSk7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcmRvd25cIiwgZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvdWNoZW5kOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZS50b3VjaCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVQb2ludGVyKGUpO1xyXG5cclxuICAgIHRoaXMuYXBwLmVtaXRHbG9iYWxFdmVudChcInBvaW50ZXJ1cFwiLCBlKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdG91Y2htb3ZlOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZS50b3VjaCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy51cGRhdGVQb2ludGVyKGUpO1xyXG5cclxuICAgIHRoaXMuYXBwLmVtaXRHbG9iYWxFdmVudChcInBvaW50ZXJtb3ZlXCIsIGUpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZW1vdmU6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBlLm1vdXNlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBvaW50ZXIoZSk7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcm1vdmVcIiwgZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG1vdXNlZG93bjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGUubW91c2UgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYXBwLmVtaXRHbG9iYWxFdmVudChcInBvaW50ZXJkb3duXCIsIGUpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZXVwOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZS5tb3VzZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcnVwXCIsIGUpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZXdoZWVsOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgZS5tb3VzZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hcHAuZW1pdEdsb2JhbEV2ZW50KFwicG9pbnRlcndoZWVsXCIsIGUpO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL0xvYWRlci5qcyAqL1xyXG5cclxuLyogTG9hZGVyICovXHJcblxyXG5QTEFZR1JPVU5ELkxvYWRlciA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5yZXNldCgpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuTG9hZGVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgLyogbG9hZGVyICovXHJcblxyXG4gIGFkZDogZnVuY3Rpb24oaWQpIHtcclxuXHJcbiAgICB0aGlzLnF1ZXVlKys7XHJcbiAgICB0aGlzLmNvdW50Kys7XHJcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLnRyaWdnZXIoXCJhZGRcIiwgaWQpO1xyXG5cclxuICAgIHJldHVybiBpZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgZXJyb3I6IGZ1bmN0aW9uKGlkKSB7XHJcblxyXG4gICAgdGhpcy50cmlnZ2VyKFwiZXJyb3JcIiwgaWQpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdWNjZXNzOiBmdW5jdGlvbihpZCkge1xyXG5cclxuICAgIHRoaXMucXVldWUtLTtcclxuXHJcbiAgICB0aGlzLnByb2dyZXNzID0gMSAtIHRoaXMucXVldWUgLyB0aGlzLmNvdW50O1xyXG5cclxuICAgIHRoaXMudHJpZ2dlcihcImxvYWRcIiwgaWQpO1xyXG5cclxuICAgIGlmICh0aGlzLnF1ZXVlIDw9IDApIHtcclxuICAgICAgdGhpcy50cmlnZ2VyKFwicmVhZHlcIik7XHJcbiAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xyXG4gICAgdGhpcy5xdWV1ZSA9IDA7XHJcbiAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG5cclxuICB9XHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELkxvYWRlci5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG4vKiBmaWxlOiBzcmMvTW91c2UuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuTW91c2UgPSBmdW5jdGlvbihhcHAsIGVsZW1lbnQpIHtcclxuXHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHJcbiAgdGhpcy5idXR0b25zID0ge307XHJcblxyXG4gIHRoaXMucHJldmVudENvbnRleHRNZW51ID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy5tb3VzZW1vdmVFdmVudCA9IHt9O1xyXG4gIHRoaXMubW91c2Vkb3duRXZlbnQgPSB7fTtcclxuICB0aGlzLm1vdXNldXBFdmVudCA9IHt9O1xyXG4gIHRoaXMubW91c2V3aGVlbEV2ZW50ID0ge307XHJcblxyXG4gIHRoaXMueCA9IDA7XHJcbiAgdGhpcy55ID0gMDtcclxuXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlLmJpbmQodGhpcykpO1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm1vdXNlZG93bi5iaW5kKHRoaXMpKTtcclxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2V1cC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgdGhpcy5lbmFibGVNb3VzZXdoZWVsKCk7XHJcblxyXG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgaWYgKHNlbGYucHJldmVudENvbnRleHRNZW51KSBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSk7XHJcblxyXG4gIGVsZW1lbnQucmVxdWVzdFBvaW50ZXJMb2NrID0gZWxlbWVudC5yZXF1ZXN0UG9pbnRlckxvY2sgfHxcclxuICAgIGVsZW1lbnQubW96UmVxdWVzdFBvaW50ZXJMb2NrIHx8XHJcbiAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RQb2ludGVyTG9jaztcclxuXHJcbiAgZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrID0gZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrIHx8XHJcbiAgICBkb2N1bWVudC5tb3pFeGl0UG9pbnRlckxvY2sgfHxcclxuICAgIGRvY3VtZW50LndlYmtpdEV4aXRQb2ludGVyTG9jaztcclxuXHJcblxyXG4gIHRoaXMuaGFuZGxlUmVzaXplKCk7XHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELk1vdXNlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgbG9jazogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5lbGVtZW50LnJlcXVlc3RQb2ludGVyTG9jaygpO1xyXG5cclxuICB9LFxyXG5cclxuICB1bmxvY2s6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICBkb2N1bWVudC5leGl0UG9pbnRlckxvY2soKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0RWxlbWVudE9mZnNldDogZnVuY3Rpb24oZWxlbWVudCkge1xyXG5cclxuICAgIHZhciBvZmZzZXRYID0gMDtcclxuICAgIHZhciBvZmZzZXRZID0gMDtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgIG9mZnNldFggKz0gZWxlbWVudC5vZmZzZXRMZWZ0O1xyXG4gICAgICBvZmZzZXRZICs9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICgoZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50KSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogb2Zmc2V0WCxcclxuICAgICAgeTogb2Zmc2V0WVxyXG4gICAgfTtcclxuXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlUmVzaXplOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnRPZmZzZXQgPSB0aGlzLmdldEVsZW1lbnRPZmZzZXQodGhpcy5lbGVtZW50KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbW91c2Vtb3ZlOiBQTEFZR1JPVU5ELlV0aWxzLnRocm90dGxlKGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB0aGlzLnggPSB0aGlzLm1vdXNlbW92ZUV2ZW50LnggPSAoZS5wYWdlWCAtIHRoaXMuZWxlbWVudE9mZnNldC54IC0gdGhpcy5hcHAub2Zmc2V0WCkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcbiAgICB0aGlzLnkgPSB0aGlzLm1vdXNlbW92ZUV2ZW50LnkgPSAoZS5wYWdlWSAtIHRoaXMuZWxlbWVudE9mZnNldC55IC0gdGhpcy5hcHAub2Zmc2V0WSkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcblxyXG4gICAgdGhpcy5tb3VzZW1vdmVFdmVudC5vcmlnaW5hbCA9IGU7XHJcblxyXG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XHJcbiAgICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQubW92ZW1lbnRYID0gZS5tb3ZlbWVudFggfHxcclxuICAgICAgICBlLm1vek1vdmVtZW50WCB8fFxyXG4gICAgICAgIGUud2Via2l0TW92ZW1lbnRYIHx8XHJcbiAgICAgICAgMDtcclxuXHJcbiAgICAgIHRoaXMubW91c2Vtb3ZlRXZlbnQubW92ZW1lbnRZID0gZS5tb3ZlbWVudFkgfHxcclxuICAgICAgICBlLm1vek1vdmVtZW50WSB8fFxyXG4gICAgICAgIGUud2Via2l0TW92ZW1lbnRZIHx8XHJcbiAgICAgICAgMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5hcHAubW91c2VUb1RvdWNoKSB7XHJcbiAgICAgIC8vICAgICAgaWYgKHRoaXMubGVmdCkge1xyXG4gICAgICB0aGlzLm1vdXNlbW92ZUV2ZW50LmlkID0gdGhpcy5tb3VzZW1vdmVFdmVudC5pZGVudGlmaWVyID0gMjU1O1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5tb3VzZW1vdmVFdmVudCk7XHJcbiAgICAgIC8vICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb3VzZW1vdmVFdmVudC5pZCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQuaWRlbnRpZmllciA9IDI1NTtcclxuICAgICAgdGhpcy50cmlnZ2VyKFwibW91c2Vtb3ZlXCIsIHRoaXMubW91c2Vtb3ZlRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICB9LCAxNiksXHJcblxyXG4gIG1vdXNlZG93bjogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIHZhciBidXR0b25OYW1lID0gW1wibGVmdFwiLCBcIm1pZGRsZVwiLCBcInJpZ2h0XCJdW2UuYnV0dG9uXTtcclxuXHJcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LnggPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lng7XHJcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LnkgPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lnk7XHJcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LmJ1dHRvbiA9IGJ1dHRvbk5hbWU7XHJcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50Lm9yaWdpbmFsID0gZTtcclxuXHJcbiAgICB0aGlzW2J1dHRvbk5hbWVdID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm1vdXNlZG93bkV2ZW50LmlkID0gdGhpcy5tb3VzZWRvd25FdmVudC5pZGVudGlmaWVyID0gMjU1O1xyXG5cclxuICAgIGlmICh0aGlzLmFwcC5tb3VzZVRvVG91Y2gpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2htb3ZlXCIsIHRoaXMubW91c2Vkb3duRXZlbnQpO1xyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMubW91c2Vkb3duRXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50cmlnZ2VyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2Vkb3duRXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZXVwOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgdmFyIGJ1dHRvbk5hbWUgPSBbXCJsZWZ0XCIsIFwibWlkZGxlXCIsIFwicmlnaHRcIl1bZS5idXR0b25dO1xyXG5cclxuICAgIHRoaXMubW91c2V1cEV2ZW50LnggPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lng7XHJcbiAgICB0aGlzLm1vdXNldXBFdmVudC55ID0gdGhpcy5tb3VzZW1vdmVFdmVudC55O1xyXG4gICAgdGhpcy5tb3VzZXVwRXZlbnQuYnV0dG9uID0gYnV0dG9uTmFtZTtcclxuICAgIHRoaXMubW91c2V1cEV2ZW50Lm9yaWdpbmFsID0gZTtcclxuXHJcbiAgICB0aGlzLm1vdXNldXBFdmVudC5pZCA9IHRoaXMubW91c2V1cEV2ZW50LmlkZW50aWZpZXIgPSAyNTU7XHJcblxyXG4gICAgaWYgKHRoaXMuYXBwLm1vdXNlVG9Ub3VjaCkge1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKFwidG91Y2hlbmRcIiwgdGhpcy5tb3VzZXVwRXZlbnQpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLnRyaWdnZXIoXCJtb3VzZXVwXCIsIHRoaXMubW91c2V1cEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpc1tidXR0b25OYW1lXSA9IGZhbHNlO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3VzZXdoZWVsOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgdGhpcy5tb3VzZXdoZWVsRXZlbnQueCA9IHRoaXMubW91c2Vtb3ZlRXZlbnQueDtcclxuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50LnkgPSB0aGlzLm1vdXNlbW92ZUV2ZW50Lnk7XHJcbiAgICB0aGlzLm1vdXNld2hlZWxFdmVudC5idXR0b24gPSBbXCJub25lXCIsIFwibGVmdFwiLCBcIm1pZGRsZVwiLCBcInJpZ2h0XCJdW2UuYnV0dG9uXTtcclxuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50Lm9yaWdpbmFsID0gZTtcclxuICAgIHRoaXMubW91c2V3aGVlbEV2ZW50LmlkID0gdGhpcy5tb3VzZXdoZWVsRXZlbnQuaWRlbnRpZmllciA9IDI1NTtcclxuXHJcbiAgICB0aGlzW2UuYnV0dG9uXSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudHJpZ2dlcihcIm1vdXNld2hlZWxcIiwgdGhpcy5tb3VzZXdoZWVsRXZlbnQpO1xyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgZW5hYmxlTW91c2V3aGVlbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGV2ZW50TmFtZXMgPSAnb253aGVlbCcgaW4gZG9jdW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRNb2RlID49IDkgPyBbJ3doZWVsJ10gOiBbJ21vdXNld2hlZWwnLCAnRG9tTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddO1xyXG4gICAgdmFyIGNhbGxiYWNrID0gdGhpcy5tb3VzZXdoZWVsLmJpbmQodGhpcyk7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IGV2ZW50TmFtZXMubGVuZ3RoOyBpOykge1xyXG5cclxuICAgICAgc2VsZi5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lc1stLWldLCBQTEFZR1JPVU5ELlV0aWxzLnRocm90dGxlKGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBvcmdFdmVudCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCxcclxuICAgICAgICAgIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXHJcbiAgICAgICAgICBkZWx0YSA9IDAsXHJcbiAgICAgICAgICBkZWx0YVggPSAwLFxyXG4gICAgICAgICAgZGVsdGFZID0gMCxcclxuICAgICAgICAgIGFic0RlbHRhID0gMCxcclxuICAgICAgICAgIGFic0RlbHRhWFkgPSAwLFxyXG4gICAgICAgICAgZm47XHJcblxyXG4gICAgICAgIG9yZ0V2ZW50LnR5cGUgPSBcIm1vdXNld2hlZWxcIjtcclxuXHJcbiAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxyXG4gICAgICAgIGlmIChvcmdFdmVudC53aGVlbERlbHRhKSB7XHJcbiAgICAgICAgICBkZWx0YSA9IG9yZ0V2ZW50LndoZWVsRGVsdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3JnRXZlbnQuZGV0YWlsKSB7XHJcbiAgICAgICAgICBkZWx0YSA9IG9yZ0V2ZW50LmRldGFpbCAqIC0xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTmV3IHNjaG9vbCB3aGVlbCBkZWx0YSAod2hlZWwgZXZlbnQpXHJcbiAgICAgICAgaWYgKG9yZ0V2ZW50LmRlbHRhWSkge1xyXG4gICAgICAgICAgZGVsdGFZID0gb3JnRXZlbnQuZGVsdGFZICogLTE7XHJcbiAgICAgICAgICBkZWx0YSA9IGRlbHRhWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlYmtpdFxyXG4gICAgICAgIGlmIChvcmdFdmVudC53aGVlbERlbHRhWSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBkZWx0YVkgPSBvcmdFdmVudC53aGVlbERlbHRhWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBkZWx0YSA/IGRlbHRhIDogZGVsdGFZO1xyXG5cclxuICAgICAgICBzZWxmLm1vdXNld2hlZWxFdmVudC54ID0gc2VsZi5tb3VzZW1vdmVFdmVudC54O1xyXG4gICAgICAgIHNlbGYubW91c2V3aGVlbEV2ZW50LnkgPSBzZWxmLm1vdXNlbW92ZUV2ZW50Lnk7XHJcbiAgICAgICAgc2VsZi5tb3VzZXdoZWVsRXZlbnQuZGVsdGEgPSByZXN1bHQgLyBNYXRoLmFicyhyZXN1bHQpO1xyXG4gICAgICAgIHNlbGYubW91c2V3aGVlbEV2ZW50Lm9yaWdpbmFsID0gb3JnRXZlbnQ7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrKHNlbGYubW91c2V3aGVlbEV2ZW50KTtcclxuXHJcbiAgICAgICAgb3JnRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIH0sIDQwKSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5VdGlscy5leHRlbmQoUExBWUdST1VORC5Nb3VzZS5wcm90b3R5cGUsIFBMQVlHUk9VTkQuRXZlbnRzLnByb3RvdHlwZSk7XHJcblxyXG4vKiBmaWxlOiBzcmMvU291bmQuanMgKi9cclxuXHJcblBMQVlHUk9VTkQuU291bmQgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdmFyIGF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCB8fCB3aW5kb3cubW96QXVkaW9Db250ZXh0O1xyXG5cclxuICBpZiAoYXVkaW9Db250ZXh0KSB7XHJcblxyXG4gICAgaWYgKCFQTEFZR1JPVU5ELmF1ZGlvQ29udGV4dCkgUExBWUdST1VORC5hdWRpb0NvbnRleHQgPSBuZXcgYXVkaW9Db250ZXh0O1xyXG5cclxuICAgIGFwcC5hdWRpb0NvbnRleHQgPSBQTEFZR1JPVU5ELmF1ZGlvQ29udGV4dDtcclxuICAgIGFwcC5zb3VuZCA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkoYXBwLCBhcHAuYXVkaW9Db250ZXh0KTtcclxuICAgIGFwcC5tdXNpYyA9IG5ldyBQTEFZR1JPVU5ELlNvdW5kV2ViQXVkaW9BUEkoYXBwLCBhcHAuYXVkaW9Db250ZXh0KTtcclxuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICBhcHAuc291bmQgPSBuZXcgUExBWUdST1VORC5Tb3VuZEF1ZGlvKGFwcCk7XHJcbiAgICBhcHAubXVzaWMgPSBuZXcgUExBWUdST1VORC5Tb3VuZEF1ZGlvKGFwcCk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5wbGF5U291bmQgPSBmdW5jdGlvbihrZXksIGxvb3ApIHtcclxuXHJcbiAgcmV0dXJuIHRoaXMuc291bmQucGxheShrZXksIGxvb3ApO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuQXBwbGljYXRpb24ucHJvdG90eXBlLnN0b3BTb3VuZCA9IGZ1bmN0aW9uKHNvdW5kKSB7XHJcblxyXG4gIHRoaXMuc291bmQuc3RvcChzb3VuZCk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZFNvdW5kID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIHJldHVybiB0aGlzLmxvYWRTb3VuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELkFwcGxpY2F0aW9uLnByb3RvdHlwZS5sb2FkU291bmRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAvKiBwb2x5bW9ycGhpc20gYXQgaXRzIGZpbmVzdCAqL1xyXG5cclxuICAgIGlmICh0eXBlb2YgYXJnID09PSBcIm9iamVjdFwiKSB7XHJcblxyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJnKSB0aGlzLmxvYWRTb3VuZHMoYXJnW2tleV0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc291bmQubG9hZChhcmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvU291bmRXZWJBdWRpb0FQSS5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Tb3VuZFdlYkF1ZGlvQVBJID0gZnVuY3Rpb24oYXBwLCBhdWRpb0NvbnRleHQpIHtcclxuXHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcblxyXG4gIHZhciBjYW5QbGF5TXAzID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoXCJhdWRpby9tcDNcIik7XHJcbiAgdmFyIGNhblBsYXlPZ2cgPSAobmV3IEF1ZGlvKS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpO1xyXG5cclxuICBpZiAodGhpcy5hcHAucHJlZmVyZWRBdWRpb0Zvcm1hdCA9PT0gXCJtcDNcIikge1xyXG5cclxuICAgIGlmIChjYW5QbGF5TXAzKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwib2dnXCI7XHJcblxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgaWYgKGNhblBsYXlPZ2cpIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xyXG4gICAgZWxzZSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJtcDNcIjtcclxuXHJcbiAgfVxyXG5cclxuICB0aGlzLmNvbnRleHQgPSBhdWRpb0NvbnRleHQ7XHJcblxyXG4gIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpXHJcbiAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XHJcblxyXG4gIHRoaXMuY29tcHJlc3NvciA9IHRoaXMuY29udGV4dC5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcclxuICB0aGlzLmNvbXByZXNzb3IuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcclxuXHJcbiAgdGhpcy5vdXRwdXQgPSB0aGlzLmdhaW5Ob2RlO1xyXG5cclxuICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxLjA7XHJcblxyXG4gIHRoaXMucG9vbCA9IFtdO1xyXG4gIHRoaXMudm9sdW1lID0gMS4wO1xyXG5cclxuICB0aGlzLnNldE1hc3RlclBvc2l0aW9uKDAsIDAsIDApO1xyXG5cclxuICB0aGlzLmxvb3BzID0gW107XHJcblxyXG4gIHRoaXMuYXBwLm9uKFwic3RlcFwiLCB0aGlzLnN0ZXAuYmluZCh0aGlzKSk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Tb3VuZFdlYkF1ZGlvQVBJLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgYnVmZmVyczoge30sXHJcbiAgYWxpYXNlczoge30sXHJcblxyXG4gIGFsaWFzOiBmdW5jdGlvbihhbGlhcywgc291cmNlLCB2b2x1bWUsIHJhdGUpIHtcclxuXHJcbiAgICB0aGlzLmFsaWFzZXNbYWxpYXNdID0ge1xyXG4gICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgdm9sdW1lOiB2b2x1bWUsXHJcbiAgICAgIHJhdGU6IHJhdGVcclxuICAgIH07XHJcblxyXG4gIH0sXHJcblxyXG4gIHNldE1hc3RlcjogZnVuY3Rpb24odm9sdW1lKSB7XHJcblxyXG4gICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcblxyXG4gICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdm9sdW1lO1xyXG5cclxuICB9LFxyXG5cclxuICBsb2FkOiBmdW5jdGlvbihmaWxlKSB7XHJcblxyXG4gICAgdmFyIGVudHJ5ID0gdGhpcy5hcHAuZ2V0QXNzZXRFbnRyeShmaWxlLCBcInNvdW5kc1wiLCB0aGlzLmF1ZGlvRm9ybWF0KTtcclxuXHJcbiAgICB2YXIgc2FtcGxlciA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgZW50cnkudXJsLCB0cnVlKTtcclxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG5cclxuICAgIHZhciBpZCA9IHRoaXMuYXBwLmxvYWRlci5hZGQoZW50cnkudXJsKTtcclxuXHJcbiAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgc2FtcGxlci5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YSh0aGlzLnJlc3BvbnNlLCBmdW5jdGlvbihkZWNvZGVkQnVmZmVyKSB7XHJcbiAgICAgICAgc2FtcGxlci5idWZmZXJzW2VudHJ5LmtleV0gPSBkZWNvZGVkQnVmZmVyO1xyXG4gICAgICAgIHNhbXBsZXIuYXBwLmxvYWRlci5zdWNjZXNzKGVudHJ5LnVybCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0LnNlbmQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY2xlYW5BcnJheTogZnVuY3Rpb24oYXJyYXksIHByb3BlcnR5KSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKGFycmF5W2ldID09PSBudWxsIHx8IChwcm9wZXJ0eSAmJiBhcnJheVtpXVtwcm9wZXJ0eV0pKSB7XHJcbiAgICAgICAgYXJyYXkuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgbGVuLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzZXRNYXN0ZXJQb3NpdGlvbjogZnVuY3Rpb24oeCwgeSwgeikge1xyXG5cclxuICAgIHRoaXMubWFzdGVyUG9zaXRpb24gPSB7XHJcbiAgICAgIHg6IHgsXHJcbiAgICAgIHk6IHksXHJcbiAgICAgIHo6IHpcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb250ZXh0Lmxpc3RlbmVyLnNldFBvc2l0aW9uKHgsIHksIHopXHJcbiAgICAgIC8vIHRoaXMuY29udGV4dC5saXN0ZW5lci5zZXRPcmllbnRhdGlvbigwLCAwLCAtMSwgMCwgMSwgMCk7XHJcbiAgICAgIC8vIHRoaXMuY29udGV4dC5saXN0ZW5lci5kb3BwbGVyRmFjdG9yID0gMTtcclxuICAgICAgLy8gdGhpcy5jb250ZXh0Lmxpc3RlbmVyLnNwZWVkT2ZTb3VuZCA9IDM0My4zO1xyXG4gIH0sXHJcblxyXG4gIGdldFNvdW5kQnVmZmVyOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5wb29sLmxlbmd0aCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcblxyXG4gICAgICAgIHZhciBidWZmZXIsIGdhaW4sIHBhbm5lcjtcclxuXHJcbiAgICAgICAgdmFyIG5vZGVzID0gW1xyXG4gICAgICAgICAgYnVmZmVyID0gdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLFxyXG4gICAgICAgICAgZ2FpbiA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCksXHJcbiAgICAgICAgICBwYW5uZXIgPSB0aGlzLmNvbnRleHQuY3JlYXRlUGFubmVyKClcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwYW5uZXIuZGlzdGFuY2VNb2RlbCA9IFwibGluZWFyXCI7XHJcblxyXG4gICAgICAgIC8vIDEgLSByb2xsb2ZmRmFjdG9yICogKGRpc3RhbmNlIC0gcmVmRGlzdGFuY2UpIC8gKG1heERpc3RhbmNlIC0gcmVmRGlzdGFuY2UpXHJcbiAgICAgICAgLy8gcmVmRGlzdGFuY2UgLyAocmVmRGlzdGFuY2UgKyByb2xsb2ZmRmFjdG9yICogKGRpc3RhbmNlIC0gcmVmRGlzdGFuY2UpKVxyXG4gICAgICAgIHBhbm5lci5yZWZEaXN0YW5jZSA9IDE7XHJcbiAgICAgICAgcGFubmVyLm1heERpc3RhbmNlID0gNjAwO1xyXG4gICAgICAgIHBhbm5lci5yb2xsb2ZmRmFjdG9yID0gMS4wO1xyXG5cclxuXHJcbiAgICAgICAgLy8gcGFubmVyLnNldE9yaWVudGF0aW9uKC0xLCAtMSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKG5vZGVzKTtcclxuXHJcbiAgICAgICAgbm9kZXNbMF0uY29ubmVjdChub2Rlc1sxXSk7XHJcbiAgICAgICAgLy8gbm9kZXNbMV0uY29ubmVjdChub2Rlc1syXSk7XHJcbiAgICAgICAgbm9kZXNbMV0uY29ubmVjdCh0aGlzLm91dHB1dCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5wb29sLnBvcCgpO1xyXG4gIH0sXHJcblxyXG4gIHBsYXk6IGZ1bmN0aW9uKG5hbWUsIGxvb3ApIHtcclxuXHJcbiAgICB2YXIgYWxpYXMgPSB0aGlzLmFsaWFzZXNbbmFtZV07XHJcblxyXG4gICAgdmFyIG5vZGVzID0gdGhpcy5nZXRTb3VuZEJ1ZmZlcigpO1xyXG5cclxuICAgIGlmIChhbGlhcykgbmFtZSA9IGFsaWFzLnNvdXJjZTtcclxuXHJcbiAgICBidWZmZXJTb3VyY2UgPSBub2Rlc1swXTtcclxuICAgIGJ1ZmZlclNvdXJjZS5nYWluTm9kZSA9IG5vZGVzWzFdO1xyXG4gICAgYnVmZmVyU291cmNlLnBhbm5lck5vZGUgPSBub2Rlc1syXTtcclxuICAgIGJ1ZmZlclNvdXJjZS5idWZmZXIgPSB0aGlzLmJ1ZmZlcnNbbmFtZV07XHJcbiAgICBidWZmZXJTb3VyY2UubG9vcCA9IGxvb3AgfHwgZmFsc2U7XHJcbiAgICBidWZmZXJTb3VyY2Uua2V5ID0gbmFtZTtcclxuXHJcbiAgICBidWZmZXJTb3VyY2UuYWxpYXMgPSBhbGlhcztcclxuXHJcbiAgICB0aGlzLnNldFZvbHVtZShidWZmZXJTb3VyY2UsIDEuMCk7XHJcbiAgICB0aGlzLnNldFBsYXliYWNrUmF0ZShidWZmZXJTb3VyY2UsIDEuMCk7XHJcblxyXG4gICAgaWYgKHRoaXMubG9vcCkge1xyXG4gICAgICAvLyAgYnVmZmVyU291cmNlLmxvb3BTdGFydCA9IHRoaXMubG9vcFN0YXJ0O1xyXG4gICAgICAvLyBidWZmZXJTb3VyY2UubG9vcEVuZCA9IHRoaXMubG9vcEVuZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYnVmZmVyU291cmNlLnN0YXJ0KDApO1xyXG5cclxuICAgIGJ1ZmZlclNvdXJjZS52b2x1bWVMaW1pdCA9IDE7XHJcblxyXG4gICAgdGhpcy5zZXRQb3NpdGlvbihidWZmZXJTb3VyY2UsIHRoaXMubWFzdGVyUG9zaXRpb24ueCwgdGhpcy5tYXN0ZXJQb3NpdGlvbi55LCB0aGlzLm1hc3RlclBvc2l0aW9uLnopO1xyXG5cclxuICAgIHJldHVybiBidWZmZXJTb3VyY2U7XHJcbiAgfSxcclxuXHJcbiAgc3RvcDogZnVuY3Rpb24od2hhdCkge1xyXG5cclxuICAgIGlmICghd2hhdCkgcmV0dXJuO1xyXG5cclxuICAgIHdoYXQuc3RvcCgwKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0UGxheWJhY2tSYXRlOiBmdW5jdGlvbihzb3VuZCwgcmF0ZSkge1xyXG5cclxuICAgIGlmICghc291bmQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoc291bmQuYWxpYXMpIHJhdGUgKj0gc291bmQuYWxpYXMucmF0ZTtcclxuXHJcbiAgICByZXR1cm4gc291bmQucGxheWJhY2tSYXRlLnZhbHVlID0gcmF0ZTtcclxuICB9LFxyXG5cclxuICBzZXRQb3NpdGlvbjogZnVuY3Rpb24oc291bmQsIHgsIHksIHopIHtcclxuXHJcbiAgICBpZiAoIXNvdW5kKSByZXR1cm47XHJcblxyXG4gICAgc291bmQucGFubmVyTm9kZS5zZXRQb3NpdGlvbih4LCB5IHx8IDAsIHogfHwgMCk7XHJcbiAgfSxcclxuXHJcbiAgc2V0VmVsb2NpdHk6IGZ1bmN0aW9uKHNvdW5kLCB4LCB5LCB6KSB7XHJcblxyXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIHNvdW5kLnBhbm5lck5vZGUuc2V0UG9zaXRpb24oeCwgeSB8fCAwLCB6IHx8IDApO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRWb2x1bWU6IGZ1bmN0aW9uKHNvdW5kKSB7XHJcblxyXG4gICAgaWYgKCFzb3VuZCkgcmV0dXJuO1xyXG5cclxuICAgIHJldHVybiBzb3VuZC5nYWluTm9kZS5nYWluLnZhbHVlO1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRWb2x1bWU6IGZ1bmN0aW9uKHNvdW5kLCB2b2x1bWUpIHtcclxuXHJcbiAgICBpZiAoIXNvdW5kKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHNvdW5kLmFsaWFzKSB2b2x1bWUgKj0gc291bmQuYWxpYXMudm9sdW1lO1xyXG5cclxuICAgIHJldHVybiBzb3VuZC5nYWluTm9kZS5nYWluLnZhbHVlID0gTWF0aC5tYXgoMCwgdm9sdW1lKTtcclxuICB9LFxyXG5cclxuICBmYWRlT3V0OiBmdW5jdGlvbihzb3VuZCkge1xyXG5cclxuICAgIGlmICghc291bmQpIHJldHVybjtcclxuXHJcbiAgICBzb3VuZC5mYWRlT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmxvb3BzLnB1c2goc291bmQpO1xyXG5cclxuICAgIHJldHVybiBzb3VuZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgZmFkZUluOiBmdW5jdGlvbihzb3VuZCkge1xyXG5cclxuICAgIGlmICghc291bmQpIHJldHVybjtcclxuXHJcbiAgICBzb3VuZC5mYWRlSW4gPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubG9vcHMucHVzaChzb3VuZCk7XHJcbiAgICB0aGlzLnNldFZvbHVtZShzb3VuZCwgMCk7XHJcblxyXG5cclxuICAgIHJldHVybiBzb3VuZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9vcHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBsb29wID0gdGhpcy5sb29wc1tpXTtcclxuXHJcbiAgICAgIGlmIChsb29wLmZhZGVJbikge1xyXG4gICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLmdldFZvbHVtZShsb29wKTtcclxuICAgICAgICB2b2x1bWUgPSB0aGlzLnNldFZvbHVtZShsb29wLCBNYXRoLm1pbigxLjAsIHZvbHVtZSArIGRlbHRhICogMC41KSk7XHJcblxyXG4gICAgICAgIGlmICh2b2x1bWUgPj0gMS4wKSB7XHJcbiAgICAgICAgICB0aGlzLmxvb3BzLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGxvb3AuZmFkZU91dCkge1xyXG4gICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLmdldFZvbHVtZShsb29wKTtcclxuICAgICAgICB2b2x1bWUgPSB0aGlzLnNldFZvbHVtZShsb29wLCBNYXRoLm1pbigxLjAsIHZvbHVtZSAtIGRlbHRhICogMC41KSk7XHJcblxyXG4gICAgICAgIGlmICh2b2x1bWUgPD0gMCkge1xyXG4gICAgICAgICAgdGhpcy5sb29wcy5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgIHRoaXMuc3RvcChsb29wKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvU291bmRBdWRpby5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Tb3VuZEF1ZGlvID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICB2YXIgY2FuUGxheU1wMyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKFwiYXVkaW8vbXAzXCIpO1xyXG4gIHZhciBjYW5QbGF5T2dnID0gKG5ldyBBdWRpbykuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKTtcclxuXHJcbiAgaWYgKHRoaXMuYXBwLnByZWZlcmVkQXVkaW9Gb3JtYXQgPT09IFwibXAzXCIpIHtcclxuXHJcbiAgICBpZiAoY2FuUGxheU1wMykgdGhpcy5hdWRpb0Zvcm1hdCA9IFwibXAzXCI7XHJcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGlmIChjYW5QbGF5T2dnKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJvZ2dcIjtcclxuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwibXAzXCI7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kQXVkaW8ucHJvdG90eXBlID0ge1xyXG5cclxuICBzYW1wbGVzOiB7fSxcclxuXHJcbiAgc2V0TWFzdGVyOiBmdW5jdGlvbih2b2x1bWUpIHtcclxuXHJcbiAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0TWFzdGVyUG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9LFxyXG5cclxuICBzZXRQb3NpdGlvbjogZnVuY3Rpb24oeCwgeSwgeikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0sXHJcblxyXG4gIGxvYWQ6IGZ1bmN0aW9uKGZpbGUpIHtcclxuXHJcbiAgICB2YXIgdXJsID0gXCJzb3VuZHMvXCIgKyBmaWxlICsgXCIuXCIgKyB0aGlzLmF1ZGlvRm9ybWF0O1xyXG5cclxuICAgIHZhciBsb2FkZXIgPSB0aGlzLmFwcC5sb2FkZXI7XHJcblxyXG4gICAgdGhpcy5hcHAubG9hZGVyLmFkZCh1cmwpO1xyXG5cclxuICAgIHZhciBhdWRpbyA9IHRoaXMuc2FtcGxlc1tmaWxlXSA9IG5ldyBBdWRpbztcclxuXHJcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgbG9hZGVyLnN1Y2Nlc3ModXJsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgbG9hZGVyLmVycm9yKHVybCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhdWRpby5zcmMgPSB1cmw7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBsYXk6IGZ1bmN0aW9uKGtleSwgbG9vcCkge1xyXG5cclxuICAgIHZhciBzb3VuZCA9IHRoaXMuc2FtcGxlc1trZXldO1xyXG5cclxuICAgIHNvdW5kLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIHNvdW5kLmxvb3AgPSBsb29wO1xyXG4gICAgc291bmQucGxheSgpO1xyXG5cclxuICAgIHJldHVybiBzb3VuZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RvcDogZnVuY3Rpb24od2hhdCkge1xyXG5cclxuICAgIGlmICghd2hhdCkgcmV0dXJuO1xyXG5cclxuICAgIHdoYXQucGF1c2UoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0UGxheWJhY2tSYXRlOiBmdW5jdGlvbihzb3VuZCwgcmF0ZSkge1xyXG5cclxuICAgIHJldHVybjtcclxuICB9LFxyXG5cclxuICBzZXRWb2x1bWU6IGZ1bmN0aW9uKHNvdW5kLCB2b2x1bWUpIHtcclxuXHJcbiAgICBzb3VuZC52b2x1bWUgPSB2b2x1bWUgKiB0aGlzLnZvbHVtZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc2V0UG9zaXRpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL1RvdWNoLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlRvdWNoID0gZnVuY3Rpb24oYXBwLCBlbGVtZW50KSB7XHJcblxyXG4gIFBMQVlHUk9VTkQuRXZlbnRzLmNhbGwodGhpcyk7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG5cclxuICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuXHJcbiAgdGhpcy50b3VjaGVzID0ge307XHJcblxyXG4gIHRoaXMueCA9IDA7XHJcbiAgdGhpcy55ID0gMDtcclxuXHJcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMudG91Y2htb3ZlLmJpbmQodGhpcykpO1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy50b3VjaHN0YXJ0LmJpbmQodGhpcykpO1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMudG91Y2hlbmQuYmluZCh0aGlzKSk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Ub3VjaC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGdldEVsZW1lbnRPZmZzZXQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuXHJcbiAgICB2YXIgb2Zmc2V0WCA9IDA7XHJcbiAgICB2YXIgb2Zmc2V0WSA9IDA7XHJcblxyXG4gICAgZG8ge1xyXG4gICAgICBvZmZzZXRYICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcclxuICAgICAgb2Zmc2V0WSArPSBlbGVtZW50Lm9mZnNldFRvcDtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoKGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IG9mZnNldFgsXHJcbiAgICAgIHk6IG9mZnNldFlcclxuICAgIH07XHJcblxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50T2Zmc2V0ID0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHRoaXMuZWxlbWVudCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHRvdWNobW92ZTogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1tpXTtcclxuXHJcbiAgICAgIHRvdWNobW92ZUV2ZW50ID0ge31cclxuXHJcbiAgICAgIHRoaXMueCA9IHRvdWNobW92ZUV2ZW50LnggPSAodG91Y2gucGFnZVggLSB0aGlzLmVsZW1lbnRPZmZzZXQueCAtIHRoaXMuYXBwLm9mZnNldFgpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xyXG4gICAgICB0aGlzLnkgPSB0b3VjaG1vdmVFdmVudC55ID0gKHRvdWNoLnBhZ2VZIC0gdGhpcy5lbGVtZW50T2Zmc2V0LnkgLSB0aGlzLmFwcC5vZmZzZXRZKSAvIHRoaXMuYXBwLnNjYWxlIHwgMDtcclxuXHJcbiAgICAgIHRvdWNobW92ZUV2ZW50Lm9yaWdpbmFsID0gdG91Y2g7XHJcbiAgICAgIHRvdWNobW92ZUV2ZW50LmlkID0gdG91Y2htb3ZlRXZlbnQuaWRlbnRpZmllciA9IHRvdWNoLmlkZW50aWZpZXI7XHJcblxyXG4gICAgICB0aGlzLnRvdWNoZXNbdG91Y2guaWRlbnRpZmllcl0ueCA9IHRvdWNobW92ZUV2ZW50Lng7XHJcbiAgICAgIHRoaXMudG91Y2hlc1t0b3VjaC5pZGVudGlmaWVyXS55ID0gdG91Y2htb3ZlRXZlbnQueTtcclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNobW92ZVwiLCB0b3VjaG1vdmVFdmVudCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdG91Y2hzdGFydDogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1tpXTtcclxuXHJcbiAgICAgIHZhciB0b3VjaHN0YXJ0RXZlbnQgPSB7fVxyXG5cclxuICAgICAgdGhpcy54ID0gdG91Y2hzdGFydEV2ZW50LnggPSAodG91Y2gucGFnZVggLSB0aGlzLmVsZW1lbnRPZmZzZXQueCAtIHRoaXMuYXBwLm9mZnNldFgpIC8gdGhpcy5hcHAuc2NhbGUgfCAwO1xyXG4gICAgICB0aGlzLnkgPSB0b3VjaHN0YXJ0RXZlbnQueSA9ICh0b3VjaC5wYWdlWSAtIHRoaXMuZWxlbWVudE9mZnNldC55IC0gdGhpcy5hcHAub2Zmc2V0WSkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcblxyXG4gICAgICB0b3VjaHN0YXJ0RXZlbnQub3JpZ2luYWwgPSBlLnRvdWNoO1xyXG4gICAgICB0b3VjaHN0YXJ0RXZlbnQuaWQgPSB0b3VjaHN0YXJ0RXZlbnQuaWRlbnRpZmllciA9IHRvdWNoLmlkZW50aWZpZXI7XHJcblxyXG4gICAgICB0aGlzLnRvdWNoZXNbdG91Y2guaWRlbnRpZmllcl0gPSB7XHJcbiAgICAgICAgeDogdG91Y2hzdGFydEV2ZW50LngsXHJcbiAgICAgICAgeTogdG91Y2hzdGFydEV2ZW50LnlcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNoc3RhcnRcIiwgdG91Y2hzdGFydEV2ZW50KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICB9LFxyXG5cclxuICB0b3VjaGVuZDogZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1tpXTtcclxuICAgICAgdmFyIHRvdWNoZW5kRXZlbnQgPSB7fTtcclxuXHJcbiAgICAgIHRvdWNoZW5kRXZlbnQueCA9ICh0b3VjaC5wYWdlWCAtIHRoaXMuZWxlbWVudE9mZnNldC54IC0gdGhpcy5hcHAub2Zmc2V0WCkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcbiAgICAgIHRvdWNoZW5kRXZlbnQueSA9ICh0b3VjaC5wYWdlWSAtIHRoaXMuZWxlbWVudE9mZnNldC55IC0gdGhpcy5hcHAub2Zmc2V0WSkgLyB0aGlzLmFwcC5zY2FsZSB8IDA7XHJcblxyXG4gICAgICB0b3VjaGVuZEV2ZW50Lm9yaWdpbmFsID0gdG91Y2g7XHJcbiAgICAgIHRvdWNoZW5kRXZlbnQuaWQgPSB0b3VjaGVuZEV2ZW50LmlkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xyXG5cclxuICAgICAgZGVsZXRlIHRoaXMudG91Y2hlc1t0b3VjaC5pZGVudGlmaWVyXTtcclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcihcInRvdWNoZW5kXCIsIHRvdWNoZW5kRXZlbnQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlV0aWxzLmV4dGVuZChQTEFZR1JPVU5ELlRvdWNoLnByb3RvdHlwZSwgUExBWUdST1VORC5FdmVudHMucHJvdG90eXBlKTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Ud2Vlbi5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Ud2VlbiA9IGZ1bmN0aW9uKG1hbmFnZXIsIGNvbnRleHQpIHtcclxuXHJcbiAgUExBWUdST1VORC5FdmVudHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgdGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG5cclxuICBQTEFZR1JPVU5ELlV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgYWN0aW9uczogW10sXHJcbiAgICBpbmRleDogLTEsXHJcblxyXG4gICAgcHJldkVhc2luZzogXCIwNDVcIixcclxuICAgIHByZXZEdXJhdGlvbjogMC41XHJcblxyXG4gIH0pO1xyXG5cclxuICB0aGlzLmN1cnJlbnQgPSBmYWxzZTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlR3ZWVuLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgYWRkOiBmdW5jdGlvbihwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nKSB7XHJcblxyXG4gICAgaWYgKGR1cmF0aW9uKSB0aGlzLnByZXZEdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgZWxzZSBkdXJhdGlvbiA9IDAuNTtcclxuICAgIGlmIChlYXNpbmcpIHRoaXMucHJldkVhc2luZyA9IGVhc2luZztcclxuICAgIGVsc2UgZWFzaW5nID0gXCIwNDVcIjtcclxuXHJcbiAgICB0aGlzLmFjdGlvbnMucHVzaChbcHJvcGVydGllcywgZHVyYXRpb24sIGVhc2luZ10pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICBkaXNjYXJkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLm1hbmFnZXIuZGlzY2FyZCh0aGlzLmNvbnRleHQsIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICB0bzogZnVuY3Rpb24ocHJvcGVydGllcywgZHVyYXRpb24sIGVhc2luZykge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkKHByb3BlcnRpZXMsIGR1cmF0aW9uLCBlYXNpbmcpO1xyXG4gIH0sXHJcblxyXG4gIGxvb3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubG9vcGVkID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVwZWF0OiBmdW5jdGlvbih0aW1lcykge1xyXG5cclxuICAgIHRoaXMuYWN0aW9ucy5wdXNoKFtcInJlcGVhdFwiLCB0aW1lc10pO1xyXG5cclxuICB9LFxyXG5cclxuICB3YWl0OiBmdW5jdGlvbih0aW1lKSB7XHJcblxyXG4gICAgdGhpcy5hY3Rpb25zLnB1c2goW1wid2FpdFwiLCB0aW1lXSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRlbGF5OiBmdW5jdGlvbih0aW1lKSB7XHJcblxyXG4gICAgdGhpcy5hY3Rpb25zLnB1c2goW1wid2FpdFwiLCB0aW1lXSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0b3A6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubWFuYWdlci5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBsYXk6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMubWFuYWdlci5hZGQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgZW5kOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgbGFzdEFuaW1hdGlvbkluZGV4ID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gdGhpcy5pbmRleCArIDE7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmFjdGlvbnNbaV1bMF0gPT09IFwib2JqZWN0XCIpIGxhc3RBbmltYXRpb25JbmRleCA9IGk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmRleCA9IGxhc3RBbmltYXRpb25JbmRleCAtIDE7XHJcbiAgICB0aGlzLm5leHQoKTtcclxuICAgIHRoaXMuZGVsdGEgPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgdGhpcy5zdGVwKDApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICBmb3J3YXJkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmRlbHRhID0gdGhpcy5kdXJhdGlvbjtcclxuICAgIHRoaXMuc3RlcCgwKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmV3aW5kOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmRlbHRhID0gMDtcclxuICAgIHRoaXMuc3RlcCgwKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbmV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5kZWx0YSA9IDA7XHJcblxyXG4gICAgdGhpcy5pbmRleCsrO1xyXG5cclxuICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMuYWN0aW9ucy5sZW5ndGgpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmxvb3BlZCkge1xyXG5cclxuICAgICAgICB0aGlzLnRyaWdnZXIoXCJsb29wXCIsIHtcclxuICAgICAgICAgIHR3ZWVuOiB0aGlzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB0aGlzLnRyaWdnZXIoXCJmaW5pc2hlZFwiLCB7XHJcbiAgICAgICAgICB0d2VlbjogdGhpc1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1hbmFnZXIucmVtb3ZlKHRoaXMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuYWN0aW9uc1t0aGlzLmluZGV4XTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50WzBdID09PSBcIndhaXRcIikge1xyXG5cclxuICAgICAgdGhpcy5kdXJhdGlvbiA9IHRoaXMuY3VycmVudFsxXTtcclxuICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gXCJ3YWl0XCI7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8qIGNhbGN1bGF0ZSBjaGFuZ2VzICovXHJcblxyXG4gICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuY3VycmVudFswXTtcclxuXHJcbiAgICAgIC8qIGtlZXAga2V5cyBhcyBhcnJheSBmb3IgMC4wMDAxJSBwZXJmb3JtYW5jZSBib29zdCAqL1xyXG5cclxuICAgICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XHJcblxyXG4gICAgICB0aGlzLmNoYW5nZSA9IFtdO1xyXG4gICAgICB0aGlzLmJlZm9yZSA9IFtdO1xyXG4gICAgICB0aGlzLnR5cGVzID0gW107XHJcblxyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5rZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHRoaXMua2V5c1tpXTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRleHRba2V5XSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgdGhpcy5iZWZvcmUucHVzaCh0aGlzLmNvbnRleHRba2V5XSk7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZS5wdXNoKHByb3BlcnRpZXNba2V5XSAtIHRoaXMuY29udGV4dFtrZXldKTtcclxuICAgICAgICAgIHRoaXMudHlwZXMucHVzaCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGJlZm9yZSA9IGNxLmNvbG9yKHRoaXMuY29udGV4dFtrZXldKTtcclxuXHJcbiAgICAgICAgICB0aGlzLmJlZm9yZS5wdXNoKGJlZm9yZSk7XHJcblxyXG4gICAgICAgICAgdmFyIGFmdGVyID0gY3EuY29sb3IocHJvcGVydGllc1trZXldKTtcclxuXHJcbiAgICAgICAgICB2YXIgdGVtcCA9IFtdO1xyXG5cclxuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgICAgIHRlbXAucHVzaChhZnRlcltqXSAtIGJlZm9yZVtqXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5jaGFuZ2UucHVzaCh0ZW1wKTtcclxuXHJcbiAgICAgICAgICB0aGlzLnR5cGVzLnB1c2goMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gXCJhbmltYXRlXCI7XHJcblxyXG4gICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5jdXJyZW50WzFdO1xyXG4gICAgICB0aGlzLmVhc2luZyA9IHRoaXMuY3VycmVudFsyXTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBwcmV2OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICB0aGlzLmRlbHRhICs9IGRlbHRhO1xyXG5cclxuICAgIGlmICghdGhpcy5jdXJyZW50KSB0aGlzLm5leHQoKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuY3VycmVudEFjdGlvbikge1xyXG5cclxuICAgICAgY2FzZSBcImFuaW1hdGVcIjpcclxuICAgICAgICB0aGlzLmRvQW5pbWF0ZShkZWx0YSk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIFwid2FpdFwiOlxyXG4gICAgICAgIHRoaXMuZG9XYWl0KGRlbHRhKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub25zdGVwKSB0aGlzLm9uc3RlcCh0aGlzLmNvbnRleHQpO1xyXG5cclxuICB9LFxyXG5cclxuICBkb0FuaW1hdGU6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEsIHRoaXMuZGVsdGEgLyB0aGlzLmR1cmF0aW9uKTtcclxuXHJcbiAgICB2YXIgbW9kID0gUExBWUdST1VORC5VdGlscy5lYXNlKHRoaXMucHJvZ3Jlc3MsIHRoaXMuZWFzaW5nKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMua2V5cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGtleSA9IHRoaXMua2V5c1tpXTtcclxuXHJcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlc1tpXSkge1xyXG5cclxuICAgICAgICAvKiBudW1iZXIgKi9cclxuXHJcbiAgICAgICAgY2FzZSAwOlxyXG5cclxuICAgICAgICAgIHRoaXMuY29udGV4dFtrZXldID0gdGhpcy5iZWZvcmVbaV0gKyB0aGlzLmNoYW5nZVtpXSAqIG1vZDtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAvKiBjb2xvciAqL1xyXG5cclxuICAgICAgICBjYXNlIDE6XHJcblxyXG4gICAgICAgICAgdmFyIGNoYW5nZSA9IHRoaXMuY2hhbmdlW2ldO1xyXG4gICAgICAgICAgdmFyIGJlZm9yZSA9IHRoaXMuYmVmb3JlW2ldO1xyXG4gICAgICAgICAgdmFyIGNvbG9yID0gW107XHJcblxyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgY29sb3IucHVzaChiZWZvcmVbal0gKyBjaGFuZ2Vbal0gKiBtb2QgfCAwKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNvbnRleHRba2V5XSA9IFwicmdiKFwiICsgY29sb3Iuam9pbihcIixcIikgKyBcIilcIjtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEpIHtcclxuICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGRvV2FpdDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBpZiAodGhpcy5kZWx0YSA+PSB0aGlzLmR1cmF0aW9uKSB0aGlzLm5leHQoKTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVXRpbHMuZXh0ZW5kKFBMQVlHUk9VTkQuVHdlZW4ucHJvdG90eXBlLCBQTEFZR1JPVU5ELkV2ZW50cy5wcm90b3R5cGUpO1xyXG5cclxuUExBWUdST1VORC5Ud2Vlbk1hbmFnZXIgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgdGhpcy50d2VlbnMgPSBbXTtcclxuXHJcbiAgaWYgKGFwcCkge1xyXG4gICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICB0aGlzLmFwcC50d2VlbiA9IHRoaXMudHdlZW4uYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHRoaXMuZGVsdGEgPSAwO1xyXG5cclxuICB0aGlzLmFwcC5vbihcInN0ZXBcIiwgdGhpcy5zdGVwLmJpbmQodGhpcykpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVHdlZW5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgZGVmYXVsdEVhc2luZzogXCIxMjhcIixcclxuXHJcbiAgZGlzY2FyZDogZnVuY3Rpb24ob2JqZWN0LCBzYWZlKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnR3ZWVucy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHR3ZWVuID0gdGhpcy50d2VlbnNbaV07XHJcblxyXG4gICAgICBpZiAodHdlZW4uY29udGV4dCA9PT0gb2JqZWN0ICYmIHR3ZWVuICE9PSBzYWZlKSB0aGlzLnJlbW92ZSh0d2Vlbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICB0d2VlbjogZnVuY3Rpb24oY29udGV4dCkge1xyXG5cclxuICAgIHZhciB0d2VlbiA9IG5ldyBQTEFZR1JPVU5ELlR3ZWVuKHRoaXMsIGNvbnRleHQpO1xyXG5cclxuICAgIHRoaXMuYWRkKHR3ZWVuKTtcclxuXHJcbiAgICByZXR1cm4gdHdlZW47XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgdGhpcy5kZWx0YSArPSBkZWx0YTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHdlZW5zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgdHdlZW4gPSB0aGlzLnR3ZWVuc1tpXTtcclxuXHJcbiAgICAgIGlmICghdHdlZW4uX3JlbW92ZSkgdHdlZW4uc3RlcChkZWx0YSk7XHJcblxyXG4gICAgICBpZiAodHdlZW4uX3JlbW92ZSkgdGhpcy50d2VlbnMuc3BsaWNlKGktLSwgMSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBhZGQ6IGZ1bmN0aW9uKHR3ZWVuKSB7XHJcblxyXG4gICAgdHdlZW4uX3JlbW92ZSA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBpbmRleCA9IHRoaXMudHdlZW5zLmluZGV4T2YodHdlZW4pO1xyXG5cclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHRoaXMudHdlZW5zLnB1c2godHdlZW4pO1xyXG5cclxuICB9LFxyXG5cclxuICByZW1vdmU6IGZ1bmN0aW9uKHR3ZWVuKSB7XHJcblxyXG4gICAgdHdlZW4uX3JlbW92ZSA9IHRydWU7XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvQXRsYXNlcy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZEF0bGFzZXMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICB2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xyXG5cclxuICAgIC8qIHBvbHltb3JwaGlzbSBhdCBpdHMgZmluZXN0ICovXHJcblxyXG4gICAgaWYgKHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIpIHtcclxuXHJcbiAgICAgIGZvciAodmFyIGtleSBpbiBhcmcpIHRoaXMubG9hZEF0bGFzZXMoYXJnW2tleV0pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvKiBpZiBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0L2FycmF5IGxldCdzIHRyeSB0byBsb2FkIGl0ICovXHJcblxyXG4gICAgICB0aGlzLl9sb2FkQXRsYXMoYXJnKVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZEF0bGFzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gIHJldHVybiB0aGlzLmxvYWRBdGxhc2VzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUuX2xvYWRBdGxhcyA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XHJcblxyXG4gIHZhciBlbnRyeSA9IHRoaXMuZ2V0QXNzZXRFbnRyeShmaWxlbmFtZSwgXCJhdGxhc2VzXCIsIFwicG5nXCIpO1xyXG5cclxuICB0aGlzLmxvYWRlci5hZGQoZW50cnkudXJsKTtcclxuXHJcbiAgdmFyIGF0bGFzID0gdGhpcy5hdGxhc2VzW2VudHJ5LmtleV0gPSB7fTtcclxuXHJcbiAgdmFyIGltYWdlID0gYXRsYXMuaW1hZ2UgPSBuZXcgSW1hZ2U7XHJcblxyXG4gIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgbG9hZGVyLnN1Y2Nlc3MoZW50cnkudXJsKTtcclxuICB9KTtcclxuXHJcbiAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgbG9hZGVyLmVycm9yKGVudHJ5LnVybCk7XHJcbiAgfSk7XHJcblxyXG4gIGltYWdlLnNyYyA9IGVudHJ5LnVybDtcclxuXHJcbiAgLyogZGF0YSAqL1xyXG5cclxuICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgZW50cnkucGF0aCArIFwiLmpzb25cIiwgdHJ1ZSk7XHJcblxyXG4gIHRoaXMubG9hZGVyLmFkZChlbnRyeS5wYXRoICsgXCIuanNvblwiKTtcclxuXHJcbiAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xyXG5cclxuICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuXHJcbiAgICBhdGxhcy5mcmFtZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuZnJhbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBmcmFtZSA9IGRhdGEuZnJhbWVzW2ldO1xyXG5cclxuICAgICAgYXRsYXMuZnJhbWVzLnB1c2goe1xyXG4gICAgICAgIHJlZ2lvbjogW2ZyYW1lLmZyYW1lLngsIGZyYW1lLmZyYW1lLnksIGZyYW1lLmZyYW1lLncsIGZyYW1lLmZyYW1lLmhdLFxyXG4gICAgICAgIG9mZnNldDogW2ZyYW1lLnNwcml0ZVNvdXJjZVNpemUueCB8fCAwLCBmcmFtZS5zcHJpdGVTb3VyY2VTaXplLnkgfHwgMF0sXHJcbiAgICAgICAgd2lkdGg6IGZyYW1lLnNvdXJjZVNpemUudyxcclxuICAgICAgICBoZWlnaHQ6IGZyYW1lLnNvdXJjZVNpemUuaFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkZXIuc3VjY2VzcyhlbnRyeS5wYXRoICsgXCIuanNvblwiKTtcclxuXHJcbiAgfVxyXG5cclxuICByZXF1ZXN0LnNlbmQoKTtcclxufTtcclxuXHJcbi8qIGZpbGU6IHNyYy9Gb250cy5qcyAqL1xyXG5cclxuUExBWUdST1VORC5BcHBsaWNhdGlvbi5wcm90b3R5cGUubG9hZEZvbnQgPSBmdW5jdGlvbihuYW1lKSB7XHJcblxyXG4gIHZhciBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgc3R5bGVOb2RlLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblxyXG4gIHZhciBmb3JtYXRzID0ge1xyXG4gICAgXCJ3b2ZmXCI6IFwid29mZlwiLFxyXG4gICAgXCJ0dGZcIjogXCJ0cnVldHlwZVwiXHJcbiAgfTtcclxuXHJcbiAgdmFyIHNvdXJjZXMgPSBcIlwiO1xyXG5cclxuICBmb3IgKHZhciBleHQgaW4gZm9ybWF0cykge1xyXG4gICAgdmFyIHR5cGUgPSBmb3JtYXRzW2V4dF07XHJcbiAgICBzb3VyY2VzICs9IFwiIHVybChcXFwiZm9udHMvXCIgKyBuYW1lICsgXCIuXCIgKyBleHQgKyBcIlxcXCIpIGZvcm1hdCgnXCIgKyB0eXBlICsgXCInKTtcIlxyXG4gIH1cclxuXHJcbiAgc3R5bGVOb2RlLnRleHRDb250ZW50ID0gXCJAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6ICdcIiArIG5hbWUgKyBcIic7IHNyYzogXCIgKyBzb3VyY2VzICsgXCIgfVwiO1xyXG5cclxuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlTm9kZSk7XHJcblxyXG4gIHZhciBsYXllciA9IGNxKDMyLCAzMik7XHJcblxyXG4gIGxheWVyLmZvbnQoXCIxMHB4IFRlc3RpbmdcIik7XHJcbiAgbGF5ZXIuZmlsbFRleHQoMTYsIDE2LCAxNikudHJpbSgpO1xyXG5cclxuICB2YXIgd2lkdGggPSBsYXllci53aWR0aDtcclxuICB2YXIgaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0O1xyXG5cclxuICB0aGlzLmxvYWRlci5hZGQoXCJmb250IFwiICsgbmFtZSk7XHJcblxyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgZnVuY3Rpb24gY2hlY2soKSB7XHJcblxyXG4gICAgdmFyIGxheWVyID0gY3EoMzIsIDMyKTtcclxuXHJcbiAgICBsYXllci5mb250KFwiMTBweCBcIiArIG5hbWUpLmZpbGxUZXh0KDE2LCAxNiwgMTYpO1xyXG4gICAgbGF5ZXIudHJpbSgpO1xyXG5cclxuICAgIGlmIChsYXllci53aWR0aCAhPT0gd2lkdGggfHwgbGF5ZXIuaGVpZ2h0ICE9PSBoZWlnaHQpIHtcclxuXHJcbiAgICAgIHNlbGYubG9hZGVyLnJlYWR5KFwiZm9udCBcIiArIG5hbWUpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGNoZWNrLCAyNTApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgY2hlY2soKTtcclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvRGVmYXVsdFN0YXRlLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELkRlZmF1bHRTdGF0ZSA9IHtcclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvTG9hZGluZ1NjcmVlbi5qcyAqL1xyXG5cclxuUExBWUdST1VORC5Mb2FkaW5nU2NyZWVuID0ge1xyXG5cclxuICAvKiBiYXNpYyBsb2FkaW5nIHNjcmVlbiB1c2luZyBET00gKi9cclxuXHJcbiAgbG9nb1JhdzogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU5vQUFBQVNCQU1BQUFEUGlOMHhBQUFBR0ZCTVZFVUFBUUF0TGl4SFNVZG5hR2FKaW9pbXFLWE16c3Y3L2ZyNXNoZ1ZBQUFBQVdKTFIwUUFpQVVkU0FBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFBQWQwU1UxRkI5OEVBd2tlQTRvUVdKNEFBQUFaZEVWWWRFTnZiVzFsYm5RQVEzSmxZWFJsWkNCM2FYUm9JRWRKVFZCWGdRNFhBQUFCOWtsRVFWUTR5NzJVdlcrck1CREF6K0ZycFZLcnJGbWVzbWFwV05PbHJLalNlMWtaK3VvVkF2aisvZnJ1akcxU2FKY3FKd1U3dm9PZjd4TVF6UW1zSURpNU5QVE1zTFJudEgzVStGNlNBWm8zTmxDdmNnQkZKejhvK3ZrRGlFNjNsSTk1WS9VbXBpbnNaV2tnSldKaURiQVZRMTZodHB0eFNUTmxvSWx1Z3dhdzAwMUV5M0FTRjNzbzZMMXFMTlh6UVM1UzBVR0tML0NJNXdXTnJpRTBVSDlZdHkzN0xxSVZnK3dzcXU3SXgwTXdWQlNGL2RVK2p2MlNObm1hMDIxTEVkUHFWbk1lVTN4QXUwa1hjU0dqbXE3T3g0RTJXbjg4TFoyK0VGajNhdmppeHphaTZWUFZ5dVl2ZVpMSEYyWGZkRG52QXEyN0RJSEd1cSswREpGc0UzME90QjFLcU93ZDhEcjdQY000YitqZmoyZzVscDRXeW50Qks2NnF1YTNKekVBK3VYSnB3SC9ObFZ1elJWUFkva1RMQjJtanVOK0t3ZFo4Rk95OGoyZ0RiRVVTcXVtblNDWTRsZjRpYnEzSWhWTTR5Y1pRUm52K3pGcVZkSlFWbjZCeHZVcWViR3B1YU5vM3NaeHdCemphamlNWk9vQml3eVZGK2tDcituVWFKT2FHcG5BZVJQUEpaVHI0RnFtSFJYY25lRW80RHFRL2Z0ZmRuTGVEclVBTUU4eFdLUGVLQ3dXNllrRXBYZnMzcDFFV0poZGNVQVlQMFRJL3VZYVY4Y2dqd0JvdmFleVd3amkyVDlyVEZJZFMvY1AvTW5rVExSVVd4Z05OWlZpbjdiVDVmcVQ5bWlEY1VWSnpSMWdScGZJT05NbXVsVSs1UXFyNnpYQVVxQUFBQUFCSlJVNUVya0pnZ2c9PVwiLFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmxvZ28gPSBuZXcgSW1hZ2U7XHJcblxyXG4gICAgdGhpcy5sb2dvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcclxuICAgICAgc2VsZi5jcmVhdGVFbGVtZW50cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sb2dvLnNyYyA9IHRoaXMubG9nb1JhdztcclxuXHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSBcIiMwMDBcIjtcclxuXHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuYmFja2dyb3VuZENvbG9yIHx8IFwiIzAwMFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcblxyXG4gIH0sXHJcblxyXG4gIGxlYXZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmFwcC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGN1cnJlbnQ6IDFcclxuICAgICAgfSwgMC41KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NrZWQpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5maW5pc2hlZCkge1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy53cmFwcGVyKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmN1cnJlbnQgKyBNYXRoLmFicyh0aGlzLmFwcC5sb2FkZXIucHJvZ3Jlc3MgLSB0aGlzLmN1cnJlbnQpICogZGVsdGE7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAwLjYgfCAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjEgfCAwO1xyXG5cclxuICAgIHRoaXMud3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoICsgXCJweFwiO1xyXG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLmhlaWdodCA9IHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLmJhY2tncm91bmQgPSBcIiMwMDBcIjtcclxuICAgIHRoaXMud3JhcHBlci5zdHlsZS5ib3JkZXIgPSBcIjRweCBzb2xpZCAjZmZmXCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSB0aGlzLndpZHRoIC8gMiB8IDApICsgXCJweFwiO1xyXG4gICAgdGhpcy53cmFwcGVyLnN0eWxlLnRvcCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gdGhpcy5oZWlnaHQgLyAyIHwgMCkgKyBcInB4XCI7XHJcbiAgICB0aGlzLndyYXBwZXIuc3R5bGUuekluZGV4ID0gMTAwO1xyXG5cclxuICAgIHRoaXMuYXBwLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IFwiMCVcIjtcclxuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyBcInB4XCI7XHJcbiAgICB0aGlzLnByb2dyZXNzQmFyLnN0eWxlLmJhY2tncm91bmQgPSBcIiNmZmZcIjtcclxuXHJcbiAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5wcm9ncmVzc0Jhcik7XHJcblxyXG4gIH0sXHJcblxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghdGhpcy5yZWFkeSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSAodGhpcy5jdXJyZW50ICogMTAwIHwgMCkgKyBcIiVcIjtcclxuXHJcblxyXG4gIH1cclxuXHJcbn07XHJcblxyXG4vKiBmaWxlOiBzcmMvbGliL0NhbnZhc1F1ZXJ5LmpzICovXHJcblxyXG4vKlxyXG5cclxuICBDYW52YXMgUXVlcnkgcjJcclxuXHJcbiAgaHR0cDovL2NhbnZhc3F1ZXJ5LmNvbVxyXG5cclxuICAoYykgMjAxMi0yMDE1IGh0dHA6Ly9yZXpvbmVyLm5ldFxyXG5cclxuICBDYW52YXMgUXVlcnkgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcblxyXG4gICEgZml4ZWQgY29sb3IgcGFyc2Vyc1xyXG5cclxuKi9cclxuXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gIHZhciBDT0NPT05KUyA9IGZhbHNlO1xyXG5cclxuICB2YXIgQ2FudmFzID0gd2luZG93LkhUTUxDYW52YXNFbGVtZW50O1xyXG4gIHZhciBJbWFnZSA9IHdpbmRvdy5IVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHZhciBDT0NPT05KUyA9IG5hdmlnYXRvci5pc0NvY29vbkpTO1xyXG5cclxuICB2YXIgY3EgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNhbnZhcyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgLy8gY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBJbWFnZSkge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBjcS5MYXllcikge1xyXG4gICAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY2FudmFzID0gc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBjcS5MYXllcihjYW52YXMpO1xyXG4gIH07XHJcblxyXG4gIGNxLmxpbmVTcGFjaW5nID0gMS4wO1xyXG4gIGNxLmRlZmF1bHRGb250ID0gXCJBcmlhbFwiO1xyXG5cclxuICBjcS5jb2Nvb24gPSBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNvY29vbkNhbnZhcyh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZnVuY3Rpb24oKSB7fSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ29jb29uQ2FudmFzKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBJbWFnZSkge1xyXG4gICAgICB2YXIgY2FudmFzID0gY3EuY3JlYXRlQ29jb29uQ2FudmFzKHNlbGVjdG9yKTtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBjcS5MYXllcikge1xyXG4gICAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgY2FudmFzID0gc2VsZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBjcS5MYXllcihjYW52YXMpO1xyXG4gIH1cclxuXHJcbiAgLyogZmFzdC5qcyAqL1xyXG5cclxuICBjcS5mYXN0QXBwbHkgPSBmdW5jdGlvbihzdWJqZWN0LCB0aGlzQ29udGV4dCwgYXJncykge1xyXG5cclxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcclxuICAgICAgY2FzZSAwOlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQpO1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSk7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdKTtcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XHJcbiAgICAgIGNhc2UgNTpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdKTtcclxuICAgICAgY2FzZSA2OlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0pO1xyXG4gICAgICBjYXNlIDc6XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3QuY2FsbCh0aGlzQ29udGV4dCwgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSwgYXJnc1s0XSwgYXJnc1s1XSwgYXJnc1s2XSk7XHJcbiAgICAgIGNhc2UgODpcclxuICAgICAgICByZXR1cm4gc3ViamVjdC5jYWxsKHRoaXNDb250ZXh0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdLCBhcmdzWzNdLCBhcmdzWzRdLCBhcmdzWzVdLCBhcmdzWzZdLCBhcmdzWzddKTtcclxuICAgICAgY2FzZSA5OlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmNhbGwodGhpc0NvbnRleHQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0sIGFyZ3NbN10sIGFyZ3NbOF0pO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0LmFwcGx5KHRoaXNDb250ZXh0LCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgY3EuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqIGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgIGFyZ3VtZW50c1swXVtqXSA9IGFyZ3VtZW50c1tpXVtqXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcmd1bWVudHNbMF07XHJcbiAgfTtcclxuXHJcbiAgY3EuYXVnbWVudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgXy5leHRlbmQoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbaV0pO1xyXG4gICAgICBhcmd1bWVudHNbaV0oYXJndW1lbnRzWzBdKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjcS5kaXN0YW5jZSA9IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcclxuICAgICAgdmFyIGR4ID0geDEgLSB4MjtcclxuICAgICAgdmFyIGR5ID0geTEgLSB5MjtcclxuXHJcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIE1hdGguYWJzKHgxIC0geTEpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNxLmV4dGVuZChjcSwge1xyXG5cclxuICAgIHNtb290aGluZzogdHJ1ZSxcclxuXHJcbiAgICBibGVuZDogZnVuY3Rpb24oYmVsb3csIGFib3ZlLCBtb2RlLCBtaXgpIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgbWl4ID09PSBcInVuZGVmaW5lZFwiKSBtaXggPSAxO1xyXG5cclxuICAgICAgdmFyIGJlbG93ID0gY3EoYmVsb3cpO1xyXG4gICAgICB2YXIgbWFzayA9IGJlbG93LmNsb25lKCk7XHJcbiAgICAgIHZhciBhYm92ZSA9IGNxKGFib3ZlKTtcclxuXHJcbiAgICAgIGJlbG93LnNhdmUoKTtcclxuICAgICAgYmVsb3cuZ2xvYmFsQWxwaGEobWl4KTtcclxuICAgICAgYmVsb3cuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKG1vZGUpO1xyXG4gICAgICBiZWxvdy5kcmF3SW1hZ2UoYWJvdmUuY2FudmFzLCAwLCAwKTtcclxuICAgICAgYmVsb3cucmVzdG9yZSgpO1xyXG5cclxuICAgICAgbWFzay5zYXZlKCk7XHJcbiAgICAgIG1hc2suZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKFwic291cmNlLWluXCIpO1xyXG4gICAgICBtYXNrLmRyYXdJbWFnZShiZWxvdy5jYW52YXMsIDAsIDApO1xyXG4gICAgICBtYXNrLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgIHJldHVybiBtYXNrO1xyXG4gICAgfSxcclxuXHJcbiAgICBtYXRjaENvbG9yOiBmdW5jdGlvbihjb2xvciwgcGFsZXR0ZSkge1xyXG4gICAgICB2YXIgcmdiUGFsZXR0ZSA9IFtdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWxldHRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcmdiUGFsZXR0ZS5wdXNoKGNxLmNvbG9yKHBhbGV0dGVbaV0pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGltZ0RhdGEgPSBjcS5jb2xvcihjb2xvcik7XHJcblxyXG4gICAgICB2YXIgZGlmTGlzdCA9IFtdO1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJnYlBhbGV0dGUubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICB2YXIgcmdiVmFsID0gcmdiUGFsZXR0ZVtqXTtcclxuICAgICAgICB2YXIgckRpZiA9IE1hdGguYWJzKGltZ0RhdGFbMF0gLSByZ2JWYWxbMF0pLFxyXG4gICAgICAgICAgZ0RpZiA9IE1hdGguYWJzKGltZ0RhdGFbMV0gLSByZ2JWYWxbMV0pLFxyXG4gICAgICAgICAgYkRpZiA9IE1hdGguYWJzKGltZ0RhdGFbMl0gLSByZ2JWYWxbMl0pO1xyXG4gICAgICAgIGRpZkxpc3QucHVzaChyRGlmICsgZ0RpZiArIGJEaWYpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgY2xvc2VzdE1hdGNoID0gMDtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYWxldHRlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKGRpZkxpc3Rbal0gPCBkaWZMaXN0W2Nsb3Nlc3RNYXRjaF0pIHtcclxuICAgICAgICAgIGNsb3Nlc3RNYXRjaCA9IGo7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGFsZXR0ZVtjbG9zZXN0TWF0Y2hdO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZW1wOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIGlmICghdGhpcy50ZW1wTGF5ZXIpIHtcclxuICAgICAgICB0aGlzLnRlbXBMYXllciA9IGNxKDEsIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAod2lkdGggaW5zdGFuY2VvZiBJbWFnZSkge1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLndpZHRoID0gd2lkdGgud2lkdGg7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLmNvbnRleHQuZHJhd0ltYWdlKHdpZHRoLCAwLCAwKTtcclxuICAgICAgfSBlbHNlIGlmICh3aWR0aCBpbnN0YW5jZW9mIENhbnZhcykge1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLndpZHRoID0gd2lkdGgud2lkdGg7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLmNvbnRleHQuZHJhd0ltYWdlKHdpZHRoLCAwLCAwKTtcclxuICAgICAgfSBlbHNlIGlmICh3aWR0aCBpbnN0YW5jZW9mIENhbnZhc1F1ZXJ5LkxheWVyKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIud2lkdGggPSB3aWR0aC53aWR0aDtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci5oZWlnaHQgPSB3aWR0aC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy50ZW1wTGF5ZXIuY29udGV4dC5kcmF3SW1hZ2Uod2lkdGguY2FudmFzLCAwLCAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnRlbXBMYXllci53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMudGVtcExheWVyLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudGVtcExheWVyO1xyXG4gICAgfSxcclxuXHJcbiAgICB3cmFwVmFsdWU6IGZ1bmN0aW9uKHZhbHVlLCBtaW4sIG1heCkge1xyXG4gICAgICBpZiAodmFsdWUgPCBtaW4pIHJldHVybiBtYXggKyAodmFsdWUgJSBtYXgpO1xyXG4gICAgICBpZiAodmFsdWUgPj0gbWF4KSByZXR1cm4gdmFsdWUgJSBtYXg7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbGltaXRWYWx1ZTogZnVuY3Rpb24odmFsdWUsIG1pbiwgbWF4KSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG1peDogZnVuY3Rpb24oYSwgYiwgYW1vdW50KSB7XHJcbiAgICAgIHJldHVybiBhICsgKGIgLSBhKSAqIGFtb3VudDtcclxuICAgIH0sXHJcblxyXG4gICAgaGV4VG9SZ2I6IGZ1bmN0aW9uKGhleCkge1xyXG4gICAgICBpZiAoaGV4Lmxlbmd0aCA9PT0gNykgcmV0dXJuIFsnMHgnICsgaGV4WzFdICsgaGV4WzJdIHwgMCwgJzB4JyArIGhleFszXSArIGhleFs0XSB8IDAsICcweCcgKyBoZXhbNV0gKyBoZXhbNl0gfCAwXTtcclxuICAgICAgZWxzZSByZXR1cm4gWycweCcgKyBoZXhbMV0gKyBoZXhbMV0gfCAwLCAnMHgnICsgaGV4WzJdICsgaGV4WzJdIHwgMCwgJzB4JyArIGhleFszXSArIGhleFszXSB8IDBdO1xyXG4gICAgfSxcclxuXHJcbiAgICByZ2JUb0hleDogZnVuY3Rpb24ociwgZywgYikge1xyXG4gICAgICByZXR1cm4gXCIjXCIgKyAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSwgNyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qIGF1dGhvcjogaHR0cDovL21qaWphY2tzb24uY29tLyAqL1xyXG5cclxuICAgIHJnYlRvSHNsOiBmdW5jdGlvbihyLCBnLCBiKSB7XHJcblxyXG4gICAgICBpZiAociBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgYiA9IHJbMl07XHJcbiAgICAgICAgZyA9IHJbMV07XHJcbiAgICAgICAgciA9IHJbMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHIgLz0gMjU1LCBnIC89IDI1NSwgYiAvPSAyNTU7XHJcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcclxuICAgICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgICAgdmFyIGgsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XHJcblxyXG4gICAgICBpZiAobWF4ID09IG1pbikge1xyXG4gICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xyXG4gICAgICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKTtcclxuICAgICAgICBzd2l0Y2ggKG1heCkge1xyXG4gICAgICAgICAgY2FzZSByOlxyXG4gICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSBnOlxyXG4gICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgYjpcclxuICAgICAgICAgICAgaCA9IChyIC0gZykgLyBkICsgNDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGggLz0gNjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtoLCBzLCBsXTtcclxuICAgIH0sXHJcblxyXG4gICAgLyogYXV0aG9yOiBodHRwOi8vbWppamFja3Nvbi5jb20vICovXHJcblxyXG4gICAgaHVlMnJnYjogZnVuY3Rpb24ocCwgcSwgdCkge1xyXG4gICAgICBpZiAodCA8IDApIHQgKz0gMTtcclxuICAgICAgaWYgKHQgPiAxKSB0IC09IDE7XHJcbiAgICAgIGlmICh0IDwgMSAvIDYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xyXG4gICAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcclxuICAgICAgaWYgKHQgPCAyIC8gMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xyXG4gICAgICByZXR1cm4gcDtcclxuICAgIH0sXHJcblxyXG4gICAgaHNsVG9SZ2I6IGZ1bmN0aW9uKGgsIHMsIGwpIHtcclxuICAgICAgdmFyIHIsIGcsIGI7XHJcblxyXG4gICAgICBpZiAocyA9PSAwKSB7XHJcbiAgICAgICAgciA9IGcgPSBiID0gbDsgLy8gYWNocm9tYXRpY1xyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XHJcbiAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XHJcbiAgICAgICAgciA9IHRoaXMuaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xyXG4gICAgICAgIGcgPSB0aGlzLmh1ZTJyZ2IocCwgcSwgaCk7XHJcbiAgICAgICAgYiA9IHRoaXMuaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gW3IgKiAyNTUgfCAwLCBnICogMjU1IHwgMCwgYiAqIDI1NSB8IDBdO1xyXG4gICAgfSxcclxuXHJcbiAgICByZ2JUb0hzdjogZnVuY3Rpb24ociwgZywgYikge1xyXG4gICAgICBpZiAociBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgYiA9IHJbMl07XHJcbiAgICAgICAgZyA9IHJbMV07XHJcbiAgICAgICAgciA9IHJbMF07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHIgPSByIC8gMjU1LCBnID0gZyAvIDI1NSwgYiA9IGIgLyAyNTU7XHJcbiAgICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcclxuICAgICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcclxuICAgICAgdmFyIGgsIHMsIHYgPSBtYXg7XHJcblxyXG4gICAgICB2YXIgZCA9IG1heCAtIG1pbjtcclxuICAgICAgcyA9IG1heCA9PSAwID8gMCA6IGQgLyBtYXg7XHJcblxyXG4gICAgICBpZiAobWF4ID09IG1pbikge1xyXG4gICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcclxuICAgICAgICAgIGNhc2UgcjpcclxuICAgICAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgZzpcclxuICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIGI6XHJcbiAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoIC89IDY7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBbaCwgcywgdl07XHJcbiAgICB9LFxyXG5cclxuICAgIGhzdlRvUmdiOiBmdW5jdGlvbihoLCBzLCB2KSB7XHJcbiAgICAgIHZhciByLCBnLCBiO1xyXG5cclxuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGggKiA2KTtcclxuICAgICAgdmFyIGYgPSBoICogNiAtIGk7XHJcbiAgICAgIHZhciBwID0gdiAqICgxIC0gcyk7XHJcbiAgICAgIHZhciBxID0gdiAqICgxIC0gZiAqIHMpO1xyXG4gICAgICB2YXIgdCA9IHYgKiAoMSAtICgxIC0gZikgKiBzKTtcclxuXHJcbiAgICAgIHN3aXRjaCAoaSAlIDYpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICByID0gdiwgZyA9IHQsIGIgPSBwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgciA9IHEsIGcgPSB2LCBiID0gcDtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgIHIgPSBwLCBnID0gdiwgYiA9IHQ7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICByID0gcCwgZyA9IHEsIGIgPSB2O1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgciA9IHQsIGcgPSBwLCBiID0gdjtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgIHIgPSB2LCBnID0gcCwgYiA9IHE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFtyICogMjU1LCBnICogMjU1LCBiICogMjU1XTtcclxuICAgIH0sXHJcblxyXG4gICAgY29sb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IGNxLkNvbG9yKCk7XHJcbiAgICAgIHJlc3VsdC5wYXJzZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHBvb2xBcnJheTogW10sXHJcblxyXG4gICAgcG9vbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMucG9vbEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMucG9vbEFycmF5LnB1c2godGhpcy5jcmVhdGVDYW52YXMoMSwgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMucG9vbEFycmF5LnBvcCgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlQ2FudmFzOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEltYWdlIHx8IGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIENhbnZhcykge1xyXG4gICAgICAgIHZhciBpbWFnZSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICByZXN1bHQud2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgICAgICByZXN1bHQuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHJlc3VsdC5nZXRDb250ZXh0KFwiMmRcIikuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQud2lkdGggPSB3aWR0aDtcclxuICAgICAgICByZXN1bHQuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlQ29jb29uQ2FudmFzOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyZWVuY2FudmFzXCIpO1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEltYWdlKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHJlc3VsdC53aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgcmVzdWx0LmdldENvbnRleHQoXCIyZFwiKS5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHJlc3VsdC5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUltYWdlRGF0YTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICByZXR1cm4gY3EuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpLmdldENvbnRleHQoXCIyZFwiKS5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxuICBjcS5MYXllciA9IGZ1bmN0aW9uKGNhbnZhcykge1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5hbGlnblggPSAwO1xyXG4gICAgdGhpcy5hbGlnblkgPSAwO1xyXG4gICAgdGhpcy5hbGlnbmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gIGNxLkxheWVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIHNtb290aGluZyA9IGNxLnNtb290aGluZztcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5zbW9vdGhpbmcgIT09IFwidW5kZWZpbmVkXCIpIHNtb290aGluZyA9IHRoaXMuc21vb3RoaW5nO1xyXG5cclxuICAgICAgdGhpcy5jb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHNtb290aGluZztcclxuICAgICAgdGhpcy5jb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gc21vb3RoaW5nO1xyXG4gICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gc21vb3RoaW5nO1xyXG5cclxuICAgICAgaWYgKENPQ09PTkpTKSBDb2Nvb24uVXRpbHMuc2V0QW50aWFsaWFzKHNtb290aGluZyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFwcGVuZFRvOiBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBzZWxlY3RvcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBhOiBmdW5jdGlvbihhKSB7XHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0FscGhhID0gdGhpcy5nbG9iYWxBbHBoYSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdsb2JhbEFscGhhKGEpO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAgICByZXR1cm4gdGhpcy5nbG9iYWxBbHBoYSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByYTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmEodGhpcy5wcmV2aW91c0FscGhhKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICAgIGRyYXdJbWFnZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgaWYgKCF0aGlzLmFsaWduWCAmJiAhdGhpcy5hbGlnblkpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbGxcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xyXG4gICAgICAgICAgdGhpcy5hbGlnblggPSAwO1xyXG4gICAgICAgICAgdGhpcy5hbGlnblkgPSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKi9cclxuXHJcbiAgICByZWFsaWduOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHRoaXMuYWxpZ25YID0gdGhpcy5wcmV2QWxpZ25YO1xyXG4gICAgICB0aGlzLmFsaWduWSA9IHRoaXMucHJldkFsaWduWTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgYWxpZ246IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgeSA9PT0gXCJ1bmRlZmluZWRcIikgeSA9IHg7XHJcblxyXG4gICAgICB0aGlzLmFsaWduWCA9IHg7XHJcbiAgICAgIHRoaXMuYWxpZ25ZID0geTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyogc2F2ZSB0cmFuc2xhdGUgYWxpZ24gcm90YXRlIHNjYWxlICovXHJcblxyXG4gICAgc3RhcnM6IGZ1bmN0aW9uKHgsIHksIGFsaWduWCwgYWxpZ25ZLCByb3RhdGlvbiwgc2NhbGVYLCBzY2FsZVkpIHtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgYWxpZ25YID09PSBcInVuZGVmaW5lZFwiKSBhbGlnblggPSAwLjU7XHJcbiAgICAgIGlmICh0eXBlb2YgYWxpZ25ZID09PSBcInVuZGVmaW5lZFwiKSBhbGlnblkgPSAwLjU7XHJcbiAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09IFwidW5kZWZpbmVkXCIpIHJvdGF0aW9uID0gMDtcclxuICAgICAgaWYgKHR5cGVvZiBzY2FsZVggPT09IFwidW5kZWZpbmVkXCIpIHNjYWxlWCA9IDEuMDtcclxuICAgICAgaWYgKHR5cGVvZiBzY2FsZVkgPT09IFwidW5kZWZpbmVkXCIpIHNjYWxlWSA9IHNjYWxlWDtcclxuXHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcclxuICAgICAgdGhpcy5hbGlnbihhbGlnblgsIGFsaWduWSk7XHJcbiAgICAgIHRoaXMucm90YXRlKHJvdGF0aW9uKTtcclxuICAgICAgdGhpcy5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgdGFyczogZnVuY3Rpb24oeCwgeSwgYWxpZ25YLCBhbGlnblksIHJvdGF0aW9uLCBzY2FsZVgsIHNjYWxlWSkge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBhbGlnblggPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWCA9IDAuNTtcclxuICAgICAgaWYgKHR5cGVvZiBhbGlnblkgPT09IFwidW5kZWZpbmVkXCIpIGFsaWduWSA9IDAuNTtcclxuICAgICAgaWYgKHR5cGVvZiByb3RhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikgcm90YXRpb24gPSAwO1xyXG4gICAgICBpZiAodHlwZW9mIHNjYWxlWCA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVYID0gMS4wO1xyXG4gICAgICBpZiAodHlwZW9mIHNjYWxlWSA9PT0gXCJ1bmRlZmluZWRcIikgc2NhbGVZID0gc2NhbGVYO1xyXG5cclxuICAgICAgdGhpcy50cmFuc2xhdGUoeCwgeSk7XHJcbiAgICAgIHRoaXMuYWxpZ24oYWxpZ25YLCBhbGlnblkpO1xyXG4gICAgICB0aGlzLnJvdGF0ZShyb3RhdGlvbik7XHJcbiAgICAgIHRoaXMuc2NhbGUoc2NhbGVYLCBzY2FsZVkpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBmaWxsUmVjdDogZnVuY3Rpb24oeCwgeSwgdywgaCkge1xyXG5cclxuICAgICAgaWYgKHRoaXMuYWxpZ25YIHx8IHRoaXMuYWxpZ25ZKSB7XHJcbiAgICAgICAgeCAtPSB3ICogdGhpcy5hbGlnblggfCAwO1xyXG4gICAgICAgIHkgLT0gaCAqIHRoaXMuYWxpZ25ZIHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHgsIHksIHcsIGgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdHJva2VSZWN0OiBmdW5jdGlvbih4LCB5LCB3LCBoKSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5hbGlnblggfHwgdGhpcy5hbGlnblkpIHtcclxuICAgICAgICB4IC09IHcgKiB0aGlzLmFsaWduWCB8IDA7XHJcbiAgICAgICAgeSAtPSBoICogdGhpcy5hbGlnblkgfCAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdCh4LCB5LCB3LCBoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZHJhd0ltYWdlOiBmdW5jdGlvbihpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KSB7XHJcblxyXG4gICAgICBpZiAodGhpcy5hbGlnblggfHwgdGhpcy5hbGlnblkpIHtcclxuICAgICAgICBpZiAoc1dpZHRoID09IG51bGwpIHtcclxuICAgICAgICAgIHN4IC09IGltYWdlLndpZHRoICogdGhpcy5hbGlnblggfCAwO1xyXG4gICAgICAgICAgc3kgLT0gaW1hZ2UuaGVpZ2h0ICogdGhpcy5hbGlnblkgfCAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkeCAtPSBkV2lkdGggKiB0aGlzLmFsaWduWCB8IDA7XHJcbiAgICAgICAgICBkeSAtPSBkSGVpZ2h0ICogdGhpcy5hbGlnblkgfCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNXaWR0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5KTtcclxuICAgICAgfSBlbHNlIGlmIChkeCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIHN4LCBzeSwgc1dpZHRoLCBzSGVpZ2h0LCBkeCwgZHksIGRXaWR0aCwgZEhlaWdodCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNxLmZhc3RBcHBseSh0aGlzLmNvbnRleHQuZHJhd0ltYWdlLCB0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLnByZXZBbGlnblggPSB0aGlzLmFsaWduWDtcclxuICAgICAgdGhpcy5wcmV2QWxpZ25ZID0gdGhpcy5hbGlnblk7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc3RvcmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy5yZWFsaWduKCk7XHJcbiAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3VGlsZTogZnVuY3Rpb24oaW1hZ2UsIHgsIHksIGZyYW1lWCwgZnJhbWVZLCBmcmFtZVdpZHRoLCBmcmFtZUhlaWdodCwgZnJhbWVzLCBmcmFtZSkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZHJhd0F0bGFzRnJhbWU6IGZ1bmN0aW9uKGF0bGFzLCBmcmFtZSwgeCwgeSkge1xyXG5cclxuICAgICAgdmFyIGZyYW1lID0gYXRsYXMuZnJhbWVzW2ZyYW1lXTtcclxuXHJcbiAgICAgIHRoaXMuZHJhd1JlZ2lvbihcclxuICAgICAgICBhdGxhcy5pbWFnZSxcclxuICAgICAgICBmcmFtZS5yZWdpb24sXHJcbiAgICAgICAgeCAtIGZyYW1lLndpZHRoICogdGhpcy5hbGlnblggKyBmcmFtZS5vZmZzZXRbMF0gKyBmcmFtZS5yZWdpb25bMl0gKiB0aGlzLmFsaWduWCwgeSAtIGZyYW1lLmhlaWdodCAqIHRoaXMuYWxpZ25ZICsgZnJhbWUub2Zmc2V0WzFdICsgZnJhbWUucmVnaW9uWzNdICogdGhpcy5hbGlnbllcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGltYWdlRmlsbDogZnVuY3Rpb24oaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcclxuXHJcbiAgICAgIHZhciBzY2FsZSA9IE1hdGgubWF4KHdpZHRoIC8gaW1hZ2Uud2lkdGgsIGhlaWdodCAvIGltYWdlLmhlaWdodCk7XHJcblxyXG4gICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgdGhpcy5zY2FsZShzY2FsZSwgc2NhbGUpO1xyXG4gICAgICB0aGlzLmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XHJcbiAgICAgIHRoaXMucmVzdG9yZSgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZHJhd1JlZ2lvbjogZnVuY3Rpb24oaW1hZ2UsIHJlZ2lvbiwgeCwgeSwgc2NhbGUpIHtcclxuXHJcbiAgICAgIHNjYWxlID0gc2NhbGUgfHwgMTtcclxuXHJcbiAgICAgIHZhciBkV2lkdGggPSByZWdpb25bMl0gKiBzY2FsZSB8IDA7XHJcbiAgICAgIHZhciBkSGVpZ2h0ID0gcmVnaW9uWzNdICogc2NhbGUgfCAwO1xyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICBpbWFnZSwgcmVnaW9uWzBdLCByZWdpb25bMV0sIHJlZ2lvblsyXSwgcmVnaW9uWzNdLFxyXG4gICAgICAgIHggLSBkV2lkdGggKiB0aGlzLmFsaWduWCB8IDAsIHkgLSBkSGVpZ2h0ICogdGhpcy5hbGlnblkgfCAwLCBkV2lkdGgsIGRIZWlnaHRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjYWNoZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLmNhbnZhcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGJsZW5kT246IGZ1bmN0aW9uKHdoYXQsIG1vZGUsIG1peCkge1xyXG5cclxuICAgICAgY3EuYmxlbmQod2hhdCwgdGhpcywgbW9kZSwgbWl4KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgcG9zdGVyaXplOiBmdW5jdGlvbihwYywgaW5jKSB7XHJcbiAgICAgIHBjID0gcGMgfHwgMzI7XHJcbiAgICAgIGluYyA9IGluYyB8fCA0O1xyXG4gICAgICB2YXIgaW1nZGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIGRhdGEgPSBpbWdkYXRhLmRhdGE7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IGluYykge1xyXG4gICAgICAgIGRhdGFbaV0gLT0gZGF0YVtpXSAlIHBjOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuICAgICAgICBkYXRhW2kgKyAxXSAtPSBkYXRhW2kgKyAxXSAlIHBjOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuICAgICAgICBkYXRhW2kgKyAyXSAtPSBkYXRhW2kgKyAyXSAlIHBjOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5wdXRJbWFnZURhdGEoaW1nZGF0YSwgMCwgMCk7IC8vIHB1dCBpbWFnZSBkYXRhIHRvIGNhbnZhc1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBidzogZnVuY3Rpb24ocGMpIHtcclxuICAgICAgcGMgPSAxMjg7XHJcbiAgICAgIHZhciBpbWdkYXRhID0gdGhpcy5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgZGF0YSA9IGltZ2RhdGEuZGF0YTtcclxuICAgICAgLy8gOC1iaXQ6IHJyciBnZ2cgYmJcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XHJcbiAgICAgICAgdmFyIHYgPSAoKGRhdGFbaV0gKyBkYXRhW2kgKyAxXSArIGRhdGFbaSArIDJdKSAvIDMpO1xyXG5cclxuICAgICAgICB2ID0gKHYgLyAxMjggfCAwKSAqIDEyODtcclxuICAgICAgICAvL2RhdGFbaV0gPSB2OyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuICAgICAgICAvL2RhdGFbaSArIDFdID0gdjsgLy8gc2V0IHZhbHVlIHRvIG5lYXJlc3Qgb2YgOCBwb3NzaWJpbGl0aWVzXHJcbiAgICAgICAgZGF0YVtpICsgMl0gPSAodiAvIDI1NSkgKiBkYXRhW2ldOyAvLyBzZXQgdmFsdWUgdG8gbmVhcmVzdCBvZiA4IHBvc3NpYmlsaXRpZXNcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucHV0SW1hZ2VEYXRhKGltZ2RhdGEsIDAsIDApOyAvLyBwdXQgaW1hZ2UgZGF0YSB0byBjYW52YXNcclxuICAgIH0sXHJcblxyXG4gICAgYmxlbmQ6IGZ1bmN0aW9uKHdoYXQsIG1vZGUsIG1peCkge1xyXG4gICAgICBpZiAodHlwZW9mIHdoYXQgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB2YXIgY29sb3IgPSB3aGF0O1xyXG4gICAgICAgIHdoYXQgPSBjcSh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB3aGF0LmZpbGxTdHlsZShjb2xvcikuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciByZXN1bHQgPSBjcS5ibGVuZCh0aGlzLCB3aGF0LCBtb2RlLCBtaXgpO1xyXG5cclxuICAgICAgdGhpcy5jYW52YXMgPSByZXN1bHQuY2FudmFzO1xyXG4gICAgICB0aGlzLmNvbnRleHQgPSByZXN1bHQuY29udGV4dDtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZXh0V2l0aEJhY2tncm91bmQ6IGZ1bmN0aW9uKHRleHQsIHgsIHksIGJhY2tncm91bmQsIHBhZGRpbmcpIHtcclxuICAgICAgdmFyIHcgPSB0aGlzLm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xyXG4gICAgICB2YXIgaCA9IHRoaXMuZm9udEhlaWdodCgpICogMC44O1xyXG4gICAgICB2YXIgZiA9IHRoaXMuZmlsbFN0eWxlKCk7XHJcbiAgICAgIHZhciBwYWRkaW5nID0gcGFkZGluZyB8fCAyO1xyXG5cclxuICAgICAgdGhpcy5maWxsU3R5bGUoYmFja2dyb3VuZCkuZmlsbFJlY3QoeCAtIHcgLyAyIC0gcGFkZGluZyAqIDIsIHkgLSBwYWRkaW5nLCB3ICsgcGFkZGluZyAqIDQsIGggKyBwYWRkaW5nICogMilcclxuICAgICAgdGhpcy5maWxsU3R5bGUoZikudGV4dEFsaWduKFwiY2VudGVyXCIpLnRleHRCYXNlbGluZShcInRvcFwiKS5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaWxsQ2lyY2xlOiBmdW5jdGlvbih4LCB5LCByKSB7XHJcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByLCAwLCBNYXRoLlBJICogMik7XHJcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdHJva2VDaXJjbGU6IGZ1bmN0aW9uKHgsIHksIHIpIHtcclxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG4gICAgICB0aGlzLmNvbnRleHQuYXJjKHgsIHksIHIsIDAsIE1hdGguUEkgKiAyKTtcclxuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2lyY2xlOiBmdW5jdGlvbih4LCB5LCByKSB7XHJcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByLCAwLCBNYXRoLlBJICogMik7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcm9wOiBmdW5jdGlvbih4LCB5LCB3LCBoKSB7XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cclxuICAgICAgICB2YXIgeSA9IGFyZ3VtZW50c1swXVsxXTtcclxuICAgICAgICB2YXIgdyA9IGFyZ3VtZW50c1swXVsyXTtcclxuICAgICAgICB2YXIgaCA9IGFyZ3VtZW50c1swXVszXTtcclxuICAgICAgICB2YXIgeCA9IGFyZ3VtZW50c1swXVswXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGNhbnZhcyA9IGNxLmNyZWF0ZUNhbnZhcyh3LCBoKTtcclxuICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIHgsIHksIHcsIGgsIDAsIDAsIHcsIGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHc7XHJcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGg7XHJcbiAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShjYW52YXMsIDAsIDApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24ocHJvcGVydGllcykge1xyXG4gICAgICBjcS5leHRlbmQodGhpcy5jb250ZXh0LCBwcm9wZXJ0aWVzKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVzaXplOiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgIHZhciB3ID0gd2lkdGgsXHJcbiAgICAgICAgaCA9IGhlaWdodDtcclxuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdyA9IGFyZ3VtZW50c1swXSAqIHRoaXMuY2FudmFzLndpZHRoIHwgMDtcclxuICAgICAgICBoID0gYXJndW1lbnRzWzBdICogdGhpcy5jYW52YXMuaGVpZ2h0IHwgMDtcclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgaWYgKGhlaWdodCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNhbnZhcy53aWR0aCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgIGggPSB0aGlzLmNhbnZhcy5oZWlnaHQgKiAod2lkdGggLyB0aGlzLmNhbnZhcy53aWR0aCkgfCAwO1xyXG4gICAgICAgICAgICB3ID0gd2lkdGg7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3ID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICAgICAgICAgIGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNhbnZhcy53aWR0aCA+IHdpZHRoKSB7XHJcbiAgICAgICAgICAgIHcgPSB0aGlzLmNhbnZhcy53aWR0aCAqIChoZWlnaHQgLyB0aGlzLmNhbnZhcy5oZWlnaHQpIHwgMDtcclxuICAgICAgICAgICAgaCA9IGhlaWdodDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHcgPSB0aGlzLmNhbnZhcy53aWR0aDtcclxuICAgICAgICAgICAgaCA9IHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBjcXJlc2l6ZWQgPSBjcSh3LCBoKS5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIDAsIHcsIGgpO1xyXG4gICAgICB0aGlzLmNhbnZhcyA9IGNxcmVzaXplZC5jYW52YXM7XHJcbiAgICAgIHRoaXMuY29udGV4dCA9IGNxcmVzaXplZC5jb250ZXh0O1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGltYWdlTGluZTogZnVuY3Rpb24oaW1hZ2UsIHJlZ2lvbiwgeCwgeSwgZXgsIGV5LCBzY2FsZSkge1xyXG4gICAgICBpZiAoIXJlZ2lvbikgcmVnaW9uID0gWzAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHRdO1xyXG5cclxuICAgICAgdmFyIGRpc3RhbmNlID0gY3EuZGlzdGFuY2UoeCwgeSwgZXgsIGV5KTtcclxuICAgICAgdmFyIGNvdW50ID0gZGlzdGFuY2UgLyByZWdpb25bM10gKyAwLjUgfCAwO1xyXG4gICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKGV5IC0geSwgZXggLSB4KSArIE1hdGguUEkgLyAyO1xyXG5cclxuICAgICAgdGhpcy5zYXZlKCk7XHJcblxyXG4gICAgICB0aGlzLnRyYW5zbGF0ZSh4LCB5KTtcclxuICAgICAgdGhpcy5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgICAgaWYgKHNjYWxlKSB0aGlzLnNjYWxlKHNjYWxlLCAxLjApO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gY291bnQ7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZHJhd1JlZ2lvbihpbWFnZSwgcmVnaW9uLCAtcmVnaW9uWzJdIC8gMiB8IDAsIC1yZWdpb25bM10gKiAoaSArIDEpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5yZXN0b3JlKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgdHJpbTogZnVuY3Rpb24oY29sb3IsIGNoYW5nZXMpIHtcclxuICAgICAgdmFyIHRyYW5zcGFyZW50O1xyXG5cclxuICAgICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgICAgY29sb3IgPSBjcS5jb2xvcihjb2xvcikudG9BcnJheSgpO1xyXG4gICAgICAgIHRyYW5zcGFyZW50ID0gIWNvbG9yWzNdO1xyXG4gICAgICB9IGVsc2UgdHJhbnNwYXJlbnQgPSB0cnVlO1xyXG5cclxuICAgICAgdmFyIHNvdXJjZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xyXG5cclxuICAgICAgdmFyIGJvdW5kID0gW3RoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQsIDAsIDBdO1xyXG5cclxuICAgICAgdmFyIHdpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgaWYgKHRyYW5zcGFyZW50KSB7XHJcbiAgICAgICAgICBpZiAoIXNvdXJjZVBpeGVsc1tpICsgM10pIGNvbnRpbnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc291cmNlUGl4ZWxzW2kgKyAwXSA9PT0gY29sb3JbMF0gJiYgc291cmNlUGl4ZWxzW2kgKyAxXSA9PT0gY29sb3JbMV0gJiYgc291cmNlUGl4ZWxzW2kgKyAyXSA9PT0gY29sb3JbMl0pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICB2YXIgeCA9IChpIC8gNCB8IDApICUgdGhpcy5jYW52YXMud2lkdGggfCAwO1xyXG4gICAgICAgIHZhciB5ID0gKGkgLyA0IHwgMCkgLyB0aGlzLmNhbnZhcy53aWR0aCB8IDA7XHJcblxyXG4gICAgICAgIGlmICh4IDwgYm91bmRbMF0pIGJvdW5kWzBdID0geDtcclxuICAgICAgICBpZiAoeCA+IGJvdW5kWzJdKSBib3VuZFsyXSA9IHg7XHJcblxyXG4gICAgICAgIGlmICh5IDwgYm91bmRbMV0pIGJvdW5kWzFdID0geTtcclxuICAgICAgICBpZiAoeSA+IGJvdW5kWzNdKSBib3VuZFszXSA9IHk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBpZiAoYm91bmRbMl0gPT09IDAgJiYgYm91bmRbM10gPT09IDApIHt9IGVsc2Uge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgICAgICBjaGFuZ2VzLmxlZnQgPSBib3VuZFswXTtcclxuICAgICAgICAgIGNoYW5nZXMudG9wID0gYm91bmRbMV07XHJcblxyXG4gICAgICAgICAgY2hhbmdlcy5ib3R0b20gPSBoZWlnaHQgLSBib3VuZFszXTtcclxuICAgICAgICAgIGNoYW5nZXMucmlnaHQgPSB3aWR0aCAtIGJvdW5kWzJdIC0gYm91bmRbMF07XHJcblxyXG4gICAgICAgICAgY2hhbmdlcy53aWR0aCA9IGJvdW5kWzJdIC0gYm91bmRbMF07XHJcbiAgICAgICAgICBjaGFuZ2VzLmhlaWdodCA9IGJvdW5kWzNdIC0gYm91bmRbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNyb3AoYm91bmRbMF0sIGJvdW5kWzFdLCBib3VuZFsyXSAtIGJvdW5kWzBdICsgMSwgYm91bmRbM10gLSBib3VuZFsxXSArIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgbWF0Y2hQYWxldHRlOiBmdW5jdGlvbihwYWxldHRlKSB7XHJcbiAgICAgIHZhciBpbWdEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICAgIHZhciByZ2JQYWxldHRlID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhbGV0dGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICByZ2JQYWxldHRlLnB1c2goY3EuY29sb3IocGFsZXR0ZVtpXSkpO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICB2YXIgZGlmTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmICghaW1nRGF0YS5kYXRhW2kgKyAzXSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmdiUGFsZXR0ZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgdmFyIHJnYlZhbCA9IHJnYlBhbGV0dGVbal07XHJcbiAgICAgICAgICB2YXIgckRpZiA9IE1hdGguYWJzKGltZ0RhdGEuZGF0YVtpXSAtIHJnYlZhbFswXSksXHJcbiAgICAgICAgICAgIGdEaWYgPSBNYXRoLmFicyhpbWdEYXRhLmRhdGFbaSArIDFdIC0gcmdiVmFsWzFdKSxcclxuICAgICAgICAgICAgYkRpZiA9IE1hdGguYWJzKGltZ0RhdGEuZGF0YVtpICsgMl0gLSByZ2JWYWxbMl0pO1xyXG4gICAgICAgICAgZGlmTGlzdC5wdXNoKHJEaWYgKyBnRGlmICsgYkRpZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2xvc2VzdE1hdGNoID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYWxldHRlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAoZGlmTGlzdFtqXSA8IGRpZkxpc3RbY2xvc2VzdE1hdGNoXSkge1xyXG4gICAgICAgICAgICBjbG9zZXN0TWF0Y2ggPSBqO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBhbGV0dGVSZ2IgPSBjcS5oZXhUb1JnYihwYWxldHRlW2Nsb3Nlc3RNYXRjaF0pO1xyXG4gICAgICAgIGltZ0RhdGEuZGF0YVtpXSA9IHBhbGV0dGVSZ2JbMF07XHJcbiAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAxXSA9IHBhbGV0dGVSZ2JbMV07XHJcbiAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAyXSA9IHBhbGV0dGVSZ2JbMl07XHJcblxyXG4gICAgICAgIC8qIGRpdGhlcmluZyAqL1xyXG4gICAgICAgIC8vaW1nRGF0YS5kYXRhW2kgKyAzXSA9ICgyNTUgKiBNYXRoLnJhbmRvbSgpIDwgaW1nRGF0YS5kYXRhW2kgKyAzXSkgPyAyNTUgOiAwO1xyXG5cclxuICAgICAgICAvL2ltZ0RhdGEuZGF0YVtpICsgM10gPSBpbWdEYXRhLmRhdGFbaSArIDNdID4gMTI4ID8gMjU1IDogMDtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgaW1nRGF0YS5kYXRhW2ldIC09IGNxLmxpbWl0VmFsdWUoaW1nRGF0YS5kYXRhW2ldIC0gNTAsIDAsIDI1NSk7XHJcbiAgICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDFdIC09IGNxLmxpbWl0VmFsdWUoaW1nRGF0YS5kYXRhW2kgKyAxXSAtIDUwLCAwLCAyNTUpO1xyXG4gICAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAyXSAtPSBjcS5saW1pdFZhbHVlKGltZ0RhdGEuZGF0YVtpICsgMl0gLSA1MCwgMCwgMjU1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoaW1nRGF0YSwgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGFsZXR0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYWxldHRlID0gW107XHJcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHNvdXJjZVBpeGVscyA9IHNvdXJjZURhdGEuZGF0YTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBpZiAoc291cmNlUGl4ZWxzW2kgKyAzXSkge1xyXG4gICAgICAgICAgdmFyIGhleCA9IGNxLnJnYlRvSGV4KHNvdXJjZVBpeGVsc1tpICsgMF0sIHNvdXJjZVBpeGVsc1tpICsgMV0sIHNvdXJjZVBpeGVsc1tpICsgMl0pO1xyXG4gICAgICAgICAgaWYgKHBhbGV0dGUuaW5kZXhPZihoZXgpID09PSAtMSkgcGFsZXR0ZS5wdXNoKGhleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGFsZXR0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgbWFwUGFsZXR0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBiZWdpblBhdGg6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlVG86IGZ1bmN0aW9uKHgsIHkpIHtcclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oeCwgeSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGZpbGxUZXh0OiBmdW5jdGlvbih0ZXh0LCB4LCB5KSB7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0cm9rZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHBvbHlnb246IGZ1bmN0aW9uKGFycmF5KSB7XHJcblxyXG4gICAgICB0aGlzLmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgdGhpcy5tb3ZlVG8oYXJyYXlbMF1bMF0sIGFycmF5WzBdWzFdKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmxpbmVUbyhhcnJheVtpXVswXSwgYXJyYXlbaV1bMV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbGxQb2x5Z29uOiBmdW5jdGlvbihwb2x5Z29uKSB7XHJcbiAgICAgIHRoaXMuYmVnaW5QYXRoKCk7XHJcbiAgICAgIHRoaXMucG9seWdvbihwb2x5Z29uKTtcclxuICAgICAgdGhpcy5maWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0cm9rZVBvbHlnb246IGZ1bmN0aW9uKHBvbHlnb24pIHtcclxuICAgICAgdGhpcy5iZWdpblBhdGgoKTtcclxuICAgICAgdGhpcy5wb2x5Z29uKHBvbHlnb24pO1xyXG4gICAgICB0aGlzLnN0cm9rZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb2xvclRvTWFzazogZnVuY3Rpb24oY29sb3IsIGludmVydGVkKSB7XHJcbiAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpLnRvQXJyYXkoKTtcclxuICAgICAgdmFyIHNvdXJjZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgc291cmNlUGl4ZWxzID0gc291cmNlRGF0YS5kYXRhO1xyXG5cclxuICAgICAgdmFyIG1hc2sgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2VQaXhlbHMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDQpIHtcclxuICAgICAgICBpZiAoc291cmNlUGl4ZWxzW2kgKyAzXSA+IDApIG1hc2sucHVzaChpbnZlcnRlZCA/IGZhbHNlIDogdHJ1ZSk7XHJcbiAgICAgICAgZWxzZSBtYXNrLnB1c2goaW52ZXJ0ZWQgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbWFzaztcclxuICAgIH0sXHJcblxyXG4gICAgZ3JheXNjYWxlVG9NYXNrOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBzb3VyY2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHNvdXJjZVBpeGVscyA9IHNvdXJjZURhdGEuZGF0YTtcclxuXHJcbiAgICAgIHZhciBtYXNrID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgbWFzay5wdXNoKCgoc291cmNlUGl4ZWxzW2kgKyAwXSArIHNvdXJjZVBpeGVsc1tpICsgMV0gKyBzb3VyY2VQaXhlbHNbaSArIDJdKSAvIDMpIC8gMjU1KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG1hc2s7XHJcbiAgICB9LFxyXG5cclxuICAgIGFwcGx5TWFzazogZnVuY3Rpb24obWFzaykge1xyXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgbW9kZSA9IHR5cGVvZiBtYXNrWzBdID09PSBcImJvb2xlYW5cIiA/IFwiYm9vbFwiIDogXCJieXRlXCI7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbWFza1tpIC8gNF07XHJcbiAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAzXSA9IHZhbHVlICogMjU1IHwgMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShzb3VyY2VEYXRhLCAwLCAwKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGZpbGxNYXNrOiBmdW5jdGlvbihtYXNrKSB7XHJcblxyXG4gICAgICB2YXIgc291cmNlRGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBzb3VyY2VQaXhlbHMgPSBzb3VyY2VEYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgbWFza1R5cGUgPSB0eXBlb2YgbWFza1swXSA9PT0gXCJib29sZWFuXCIgPyBcImJvb2xcIiA6IFwiYnl0ZVwiO1xyXG4gICAgICB2YXIgY29sb3JNb2RlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMiA/IFwibm9ybWFsXCIgOiBcImdyYWRpZW50XCI7XHJcblxyXG4gICAgICB2YXIgY29sb3IgPSBjcS5jb2xvcihhcmd1bWVudHNbMV0pO1xyXG4gICAgICBpZiAoY29sb3JNb2RlID09PSBcImdyYWRpZW50XCIpIGNvbG9yQiA9IGNxLmNvbG9yKGFyZ3VtZW50c1syXSk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlUGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbWFza1tpIC8gNF07XHJcblxyXG4gICAgICAgIGlmIChtYXNrVHlwZSA9PT0gXCJieXRlXCIpIHZhbHVlIC89IDI1NTtcclxuXHJcbiAgICAgICAgaWYgKGNvbG9yTW9kZSA9PT0gXCJub3JtYWxcIikge1xyXG4gICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMF0gPSBjb2xvclswXSB8IDA7XHJcbiAgICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMV0gPSBjb2xvclsxXSB8IDA7XHJcbiAgICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMl0gPSBjb2xvclsyXSB8IDA7XHJcbiAgICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgM10gPSB2YWx1ZSAqIDI1NSB8IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgMF0gPSBjb2xvclswXSArIChjb2xvckJbMF0gLSBjb2xvclswXSkgKiB2YWx1ZSB8IDA7XHJcbiAgICAgICAgICBzb3VyY2VQaXhlbHNbaSArIDFdID0gY29sb3JbMV0gKyAoY29sb3JCWzFdIC0gY29sb3JbMV0pICogdmFsdWUgfCAwO1xyXG4gICAgICAgICAgc291cmNlUGl4ZWxzW2kgKyAyXSA9IGNvbG9yWzJdICsgKGNvbG9yQlsyXSAtIGNvbG9yWzJdKSAqIHZhbHVlIHwgMDtcclxuICAgICAgICAgIHNvdXJjZVBpeGVsc1tpICsgM10gPSAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKHNvdXJjZURhdGEsIDAsIDApO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXI6IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgIGlmIChjb2xvcikge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIC8vIHZhciByZXN1bHQgPSBjcS5jcmVhdGVDYW52YXModGhpcy5jYW52YXMpO1xyXG5cclxuICAgICAgdmFyIHJlc3VsdCA9IGNxLnBvb2woKTtcclxuICAgICAgcmVzdWx0LndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgcmVzdWx0LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICByZXN1bHQuZ2V0Q29udGV4dChcIjJkXCIpLmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gY3EocmVzdWx0KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ3JhZGllbnRUZXh0OiBmdW5jdGlvbih0ZXh0LCB4LCB5LCBtYXhXaWR0aCwgZ3JhZGllbnQpIHtcclxuXHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgICAgdmFyIGggPSB0aGlzLmZvbnRIZWlnaHQoKSAqIDI7XHJcblxyXG4gICAgICB2YXIgb3ggPSAwO1xyXG4gICAgICB2YXIgb3kgPSAwO1xyXG5cclxuICAgICAgaWYgKG1heFdpZHRoKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSAwO1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFtcIlwiXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHdvcmQgPSB3b3Jkc1tpXSArIFwiIFwiO1xyXG4gICAgICAgICAgdmFyIHdvcmRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh3b3JkKS53aWR0aDtcclxuXHJcbiAgICAgICAgICBpZiAob3ggKyB3b3JkV2lkdGggPiBtYXhXaWR0aCkge1xyXG4gICAgICAgICAgICBsaW5lc1srK2xpbmVdID0gXCJcIjtcclxuICAgICAgICAgICAgb3ggPSAwO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxpbmVzW2xpbmVdICs9IHdvcmQ7XHJcblxyXG4gICAgICAgICAgb3ggKz0gd29yZFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHZhciBsaW5lcyA9IFt0ZXh0XTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgb3kgPSB5ICsgaSAqIGggKiAwLjYgfCAwO1xyXG4gICAgICAgIHZhciBsaW5ncmFkID0gdGhpcy5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIG95LCAwLCBveSArIGggKiAwLjYgfCAwKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBncmFkaWVudC5sZW5ndGg7IGogKz0gMikge1xyXG4gICAgICAgICAgbGluZ3JhZC5hZGRDb2xvclN0b3AoZ3JhZGllbnRbal0sIGdyYWRpZW50W2ogKyAxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdGV4dCA9IGxpbmVzW2ldO1xyXG5cclxuICAgICAgICB0aGlzLmZpbGxTdHlsZShsaW5ncmFkKS5maWxsVGV4dCh0ZXh0LCB4LCBveSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVDb2xvcjogZnVuY3Rpb24oY29sb3IpIHtcclxuXHJcbiAgICAgIGNvbG9yID0gY3EuY29sb3IoY29sb3IpO1xyXG5cclxuICAgICAgdmFyIGRhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgcGl4ZWxzID0gZGF0YS5kYXRhO1xyXG5cclxuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmNhbnZhcy53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5oZWlnaHQ7IHkrKykge1xyXG4gICAgICAgICAgdmFyIGkgPSAoeSAqIHRoaXMuY2FudmFzLndpZHRoICsgeCkgKiA0O1xyXG5cclxuICAgICAgICAgIGlmIChwaXhlbHNbaSArIDBdID09PSBjb2xvclswXSAmJiBwaXhlbHNbaSArIDFdID09PSBjb2xvclsxXSAmJiBwaXhlbHNbaSArIDJdID09PSBjb2xvclsyXSkge1xyXG4gICAgICAgICAgICBwaXhlbHNbaSArIDNdID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG91dGxpbmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBwaXhlbHMgPSBkYXRhLmRhdGE7XHJcblxyXG4gICAgICB2YXIgbmV3RGF0YSA9IHRoaXMuY3JlYXRlSW1hZ2VEYXRhKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICB2YXIgbmV3UGl4ZWxzID0gbmV3RGF0YS5kYXRhO1xyXG5cclxuICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xyXG5cclxuICAgICAgZnVuY3Rpb24gY2hlY2soeCwgeSkge1xyXG5cclxuICAgICAgICBpZiAoeCA8IDApIHJldHVybiAwO1xyXG4gICAgICAgIGlmICh4ID49IGNhbnZhcy53aWR0aCkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKHkgPCAwKSByZXR1cm4gMDtcclxuICAgICAgICBpZiAoeSA+PSBjYW52YXMuaGVpZ2h0KSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgdmFyIGkgPSAoeCArIHkgKiBjYW52YXMud2lkdGgpICogNDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBpeGVsc1tpICsgM10gPiAwO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmNhbnZhcy53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB0aGlzLmNhbnZhcy5oZWlnaHQ7IHkrKykge1xyXG5cclxuICAgICAgICAgIHZhciBmdWxsID0gMDtcclxuICAgICAgICAgIHZhciBpID0gKHkgKiBjYW52YXMud2lkdGggKyB4KSAqIDQ7XHJcblxyXG4gICAgICAgICAgaWYgKCFwaXhlbHNbaSArIDNdKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICBmdWxsICs9IGNoZWNrKHggLSAxLCB5KTtcclxuICAgICAgICAgIGZ1bGwgKz0gY2hlY2soeCArIDEsIHkpO1xyXG4gICAgICAgICAgZnVsbCArPSBjaGVjayh4LCB5IC0gMSk7XHJcbiAgICAgICAgICBmdWxsICs9IGNoZWNrKHgsIHkgKyAxKTtcclxuXHJcbiAgICAgICAgICBpZiAoZnVsbCAhPT0gNCkge1xyXG5cclxuICAgICAgICAgICAgbmV3UGl4ZWxzW2ldID0gMjU1O1xyXG4gICAgICAgICAgICBuZXdQaXhlbHNbaSArIDFdID0gMjU1O1xyXG4gICAgICAgICAgICBuZXdQaXhlbHNbaSArIDJdID0gMjU1O1xyXG4gICAgICAgICAgICBuZXdQaXhlbHNbaSArIDNdID0gMjU1O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEobmV3RGF0YSwgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0SHNsOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHBpeGVscyA9IGRhdGEuZGF0YTtcclxuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxyXG4gICAgICAgIG5ld1BpeGVsID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgaHNsID0gY3EucmdiVG9Ic2wocGl4ZWxzW2kgKyAwXSwgcGl4ZWxzW2kgKyAxXSwgcGl4ZWxzW2kgKyAyXSk7XHJcblxyXG4gICAgICAgIGggPSBhcmdzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLmxpbWl0VmFsdWUoYXJnc1swXSwgMCwgMSk7XHJcbiAgICAgICAgcyA9IGFyZ3NbMV0gPT09IGZhbHNlID8gaHNsWzFdIDogY3EubGltaXRWYWx1ZShhcmdzWzFdLCAwLCAxKTtcclxuICAgICAgICBsID0gYXJnc1syXSA9PT0gZmFsc2UgPyBoc2xbMl0gOiBjcS5saW1pdFZhbHVlKGFyZ3NbMl0sIDAsIDEpO1xyXG5cclxuICAgICAgICBuZXdQaXhlbCA9IGNxLmhzbFRvUmdiKGgsIHMsIGwpO1xyXG5cclxuICAgICAgICBwaXhlbHNbaSArIDBdID0gbmV3UGl4ZWxbMF07XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAxXSA9IG5ld1BpeGVsWzFdO1xyXG4gICAgICAgIHBpeGVsc1tpICsgMl0gPSBuZXdQaXhlbFsyXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaGlmdEhzbDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgIHZhciBwaXhlbHMgPSBkYXRhLmRhdGE7XHJcbiAgICAgIHZhciByLCBnLCBiLCBhLCBoLCBzLCBsLCBoc2wgPSBbXSxcclxuICAgICAgICBuZXdQaXhlbCA9IFtdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBpeGVscy5sZW5ndGg7IGkgPCBsZW47IGkgKz0gNCkge1xyXG4gICAgICAgIGhzbCA9IGNxLnJnYlRvSHNsKHBpeGVsc1tpICsgMF0sIHBpeGVsc1tpICsgMV0sIHBpeGVsc1tpICsgMl0pO1xyXG5cclxuICAgICAgICBpZiAocGl4ZWxzW2kgKyAwXSAhPT0gcGl4ZWxzW2kgKyAxXSB8fCBwaXhlbHNbaSArIDFdICE9PSBwaXhlbHNbaSArIDJdKSB7XHJcbiAgICAgICAgICBoID0gYXJnc1swXSA9PT0gZmFsc2UgPyBoc2xbMF0gOiBjcS53cmFwVmFsdWUoaHNsWzBdICsgYXJnc1swXSwgMCwgMSk7XHJcbiAgICAgICAgICBzID0gYXJnc1sxXSA9PT0gZmFsc2UgPyBoc2xbMV0gOiBjcS5saW1pdFZhbHVlKGhzbFsxXSArIGFyZ3NbMV0sIDAsIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBoID0gaHNsWzBdO1xyXG4gICAgICAgICAgcyA9IGhzbFsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGwgPSBhcmdzWzJdID09PSBmYWxzZSA/IGhzbFsyXSA6IGNxLmxpbWl0VmFsdWUoaHNsWzJdICsgYXJnc1syXSwgMCwgMSk7XHJcblxyXG4gICAgICAgIG5ld1BpeGVsID0gY3EuaHNsVG9SZ2IoaCwgcywgbCk7XHJcblxyXG4gICAgICAgIHBpeGVsc1tpICsgMF0gPSBuZXdQaXhlbFswXTtcclxuICAgICAgICBwaXhlbHNbaSArIDFdID0gbmV3UGl4ZWxbMV07XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAyXSA9IG5ld1BpeGVsWzJdO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBhcHBseUNvbG9yOiBmdW5jdGlvbihjb2xvcikge1xyXG5cclxuICAgICAgaWYgKENPQ09PTkpTKSByZXR1cm4gdGhpcztcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcblxyXG4gICAgICB0aGlzLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbihcInNvdXJjZS1pblwiKTtcclxuICAgICAgdGhpcy5jbGVhcihjb2xvcik7XHJcblxyXG4gICAgICB0aGlzLnJlc3RvcmUoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBuZWdhdGl2ZTogZnVuY3Rpb24oc3JjLCBkc3QpIHtcclxuXHJcbiAgICAgIHZhciBkYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgdmFyIHBpeGVscyA9IGRhdGEuZGF0YTtcclxuICAgICAgdmFyIHIsIGcsIGIsIGEsIGgsIHMsIGwsIGhzbCA9IFtdLFxyXG4gICAgICAgIG5ld1BpeGVsID0gW107XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGl4ZWxzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSA0KSB7XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAwXSA9IDI1NSAtIHBpeGVsc1tpICsgMF07XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAxXSA9IDI1NSAtIHBpeGVsc1tpICsgMV07XHJcbiAgICAgICAgcGl4ZWxzW2kgKyAyXSA9IDI1NSAtIHBpeGVsc1tpICsgMl07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY29udGV4dC5wdXRJbWFnZURhdGEoZGF0YSwgMCwgMCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcm91bmRSZWN0OiBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCByYWRpdXMpIHtcclxuXHJcbiAgICAgIHRoaXMuYmVnaW5QYXRoKCk7XHJcbiAgICAgIHRoaXMubW92ZVRvKHggKyByYWRpdXMsIHkpO1xyXG4gICAgICB0aGlzLmxpbmVUbyh4ICsgd2lkdGggLSByYWRpdXMsIHkpO1xyXG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5LCB4ICsgd2lkdGgsIHkgKyByYWRpdXMpO1xyXG4gICAgICB0aGlzLmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICB0aGlzLnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGggLSByYWRpdXMsIHkgKyBoZWlnaHQpO1xyXG4gICAgICB0aGlzLmxpbmVUbyh4ICsgcmFkaXVzLCB5ICsgaGVpZ2h0KTtcclxuICAgICAgdGhpcy5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xyXG4gICAgICB0aGlzLmxpbmVUbyh4LCB5ICsgcmFkaXVzKTtcclxuICAgICAgdGhpcy5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMsIHkpO1xyXG4gICAgICB0aGlzLmNsb3NlUGF0aCgpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG1hcmt1cFRleHQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB3cmFwcGVkVGV4dDogZnVuY3Rpb24odGV4dCwgeCwgeSwgbWF4V2lkdGgsIGxpbmVIZWlnaHQpIHtcclxuXHJcbiAgICAgIHZhciB3b3JkcyA9IHRleHQuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgICAgdmFyIGxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0IHx8IHRoaXMuZm9udEhlaWdodCgpO1xyXG5cclxuICAgICAgdmFyIG94ID0gMDtcclxuICAgICAgdmFyIG95ID0gMDtcclxuXHJcbiAgICAgIGlmIChtYXhXaWR0aCkge1xyXG4gICAgICAgIHZhciBsaW5lID0gMDtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXCJcIl07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV0gKyBcIiBcIjtcclxuICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZCkud2lkdGg7XHJcblxyXG4gICAgICAgICAgaWYgKG94ICsgd29yZFdpZHRoID4gbWF4V2lkdGggfHwgd29yZHNbaV0gPT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgbGluZXNbKytsaW5lXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG94ID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh3b3Jkc1tpXSAhPT0gXCJcXG5cIikge1xyXG4gICAgICAgICAgICBsaW5lc1tsaW5lXSArPSB3b3JkO1xyXG5cclxuICAgICAgICAgICAgb3ggKz0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBsaW5lcyA9IFt0ZXh0XTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBveSA9IHkgKyBpICogbGluZUhlaWdodCB8IDA7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gbGluZXNbaV07XHJcblxyXG4gICAgICAgIHRoaXMuZmlsbFRleHQodGV4dCwgeCwgb3kpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgZm9udEhlaWdodHM6IHt9LFxyXG5cclxuICAgIGZvbnRIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZm9udCA9IHRoaXMuZm9udCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmZvbnRIZWlnaHRzW2ZvbnRdKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBjcSgxMDAsIDEwMCk7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IDA7XHJcbiAgICAgICAgdmFyIGNoYW5nZXMgPSB7fTtcclxuICAgICAgICB0ZW1wLmZvbnQoZm9udCkuZmlsbFN0eWxlKFwiI2ZmZlwiKTtcclxuICAgICAgICB0ZW1wLnRleHRCYXNlbGluZShcImJvdHRvbVwiKS5maWxsVGV4dChcImdNXCIsIDI1LCAxMDApO1xyXG4gICAgICAgIHRlbXAudHJpbShmYWxzZSwgY2hhbmdlcyk7XHJcbiAgICAgICAgaGVpZ2h0ICs9IGNoYW5nZXMuYm90dG9tO1xyXG5cclxuICAgICAgICB2YXIgdGVtcCA9IGNxKDEwMCwgMTAwKTtcclxuICAgICAgICB2YXIgY2hhbmdlcyA9IHt9O1xyXG4gICAgICAgIHRlbXAuZm9udChmb250KS5maWxsU3R5bGUoXCIjZmZmXCIpO1xyXG4gICAgICAgIHRlbXAudGV4dEJhc2VsaW5lKFwidG9wXCIpLmZpbGxUZXh0KFwiZ01cIiwgMjUsIDApO1xyXG4gICAgICAgIHRlbXAudHJpbShmYWxzZSwgY2hhbmdlcyk7XHJcbiAgICAgICAgaGVpZ2h0ICs9IGNoYW5nZXMudG9wO1xyXG5cclxuICAgICAgICB2YXIgdGVtcCA9IGNxKDEwMCwgMTAwKTtcclxuICAgICAgICB2YXIgY2hhbmdlcyA9IHt9O1xyXG4gICAgICAgIHRlbXAuZm9udChmb250KS5maWxsU3R5bGUoXCIjZmZmXCIpO1xyXG4gICAgICAgIHRlbXAudGV4dEJhc2VsaW5lKFwiYWxwaGFiZXRpY1wiKS5maWxsVGV4dChcImdNXCIsIDUwLCA1MCk7XHJcbiAgICAgICAgdGVtcC50cmltKGZhbHNlLCBjaGFuZ2VzKTtcclxuICAgICAgICBoZWlnaHQgKz0gdGVtcC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuZm9udEhlaWdodHNbZm9udF0gPSBoZWlnaHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmZvbnRIZWlnaHRzW2ZvbnRdO1xyXG4gICAgfSxcclxuXHJcbiAgICB0ZXh0Qm91bmRhcmllczogZnVuY3Rpb24odGV4dCwgbWF4V2lkdGgpIHtcclxuICAgICAgdmFyIHdvcmRzID0gdGV4dC5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgICB2YXIgaCA9IHRoaXMuZm9udEhlaWdodCgpO1xyXG5cclxuICAgICAgdmFyIG94ID0gMDtcclxuICAgICAgdmFyIG95ID0gMDtcclxuXHJcbiAgICAgIGlmIChtYXhXaWR0aCkge1xyXG4gICAgICAgIHZhciBsaW5lID0gMDtcclxuICAgICAgICB2YXIgbGluZXMgPSBbXCJcIl07XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciB3b3JkID0gd29yZHNbaV0gKyBcIiBcIjtcclxuICAgICAgICAgIHZhciB3b3JkV2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQod29yZCkud2lkdGg7XHJcblxyXG4gICAgICAgICAgaWYgKG94ICsgd29yZFdpZHRoID4gbWF4V2lkdGggfHwgd29yZHNbaV0gPT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgbGluZXNbKytsaW5lXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIG94ID0gMDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAod29yZHNbaV0gIT09IFwiXFxuXCIpIHtcclxuICAgICAgICAgICAgbGluZXNbbGluZV0gKz0gd29yZDtcclxuICAgICAgICAgICAgb3ggKz0gd29yZFdpZHRoO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbGluZXMgPSBbdGV4dF07XHJcbiAgICAgICAgbWF4V2lkdGggPSB0aGlzLm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGhlaWdodDogbGluZXMubGVuZ3RoICogaCxcclxuICAgICAgICB3aWR0aDogbWF4V2lkdGgsXHJcbiAgICAgICAgbGluZXM6IGxpbmVzLmxlbmd0aCxcclxuICAgICAgICBsaW5lSGVpZ2h0OiBoXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVwZWF0SW1hZ2VSZWdpb246IGZ1bmN0aW9uKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICAgIHRoaXMucmVjdChkeCwgZHksIGR3LCBkaCk7XHJcbiAgICAgIHRoaXMuY2xpcCgpO1xyXG5cclxuICAgICAgZm9yICh2YXIgeCA9IDAsIGxlbiA9IE1hdGguY2VpbChkdyAvIHN3KTsgeCA8IGxlbjsgeCsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSA9IDAsIGxlbnkgPSBNYXRoLmNlaWwoZGggLyBzaCk7IHkgPCBsZW55OyB5KyspIHtcclxuICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHN3LCBzaCwgZHggKyB4ICogc3csIGR5ICsgeSAqIHNoLCBzdywgc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5yZXN0b3JlKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgcmVwZWF0SW1hZ2U6IGZ1bmN0aW9uKGltYWdlLCB4LCB5LCB3LCBoKSB7XHJcbiAgICAgIC8vIGlmICghZW52LmRldGFpbHMpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCA5KSB7XHJcbiAgICAgICAgdGhpcy5yZXBlYXRJbWFnZVJlZ2lvbihpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgeCwgeSwgdywgaCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZXBlYXRJbWFnZVJlZ2lvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgYm9yZGVySW1hZ2U6IGZ1bmN0aW9uKGltYWdlLCB4LCB5LCB3LCBoLCB0LCByLCBiLCBsLCBmaWxsKSB7XHJcblxyXG4gICAgICAvLyBpZiAoIWVudi5kZXRhaWxzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgdCA9PT0gXCJvYmplY3RcIikge1xyXG5cclxuICAgICAgICB2YXIgYm90dG9tTGVmdCA9IHQuYm90dG9tTGVmdCB8fCBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdmFyIGJvdHRvbVJpZ2h0ID0gdC5ib3R0b21SaWdodCB8fCBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgdmFyIHRvcExlZnQgPSB0LnRvcExlZnQgfHwgWzAsIDAsIDAsIDBdO1xyXG4gICAgICAgIHZhciB0b3BSaWdodCA9IHQudG9wUmlnaHQgfHwgWzAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICB2YXIgY2xoID0gYm90dG9tTGVmdFszXSArIHRvcExlZnRbM107XHJcbiAgICAgICAgdmFyIGNyaCA9IGJvdHRvbVJpZ2h0WzNdICsgdG9wUmlnaHRbM107XHJcbiAgICAgICAgdmFyIGN0dyA9IHRvcExlZnRbMl0gKyB0b3BSaWdodFsyXTtcclxuICAgICAgICB2YXIgY2J3ID0gYm90dG9tTGVmdFsyXSArIGJvdHRvbVJpZ2h0WzJdO1xyXG5cclxuICAgICAgICB0LmZpbGxQYWRkaW5nID0gWzAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICBpZiAodC5sZWZ0KSB0LmZpbGxQYWRkaW5nWzBdID0gdC5sZWZ0WzJdO1xyXG4gICAgICAgIGlmICh0LnRvcCkgdC5maWxsUGFkZGluZ1sxXSA9IHQudG9wWzNdO1xyXG4gICAgICAgIGlmICh0LnJpZ2h0KSB0LmZpbGxQYWRkaW5nWzJdID0gdC5yaWdodFsyXTtcclxuICAgICAgICBpZiAodC5ib3R0b20pIHQuZmlsbFBhZGRpbmdbM10gPSB0LmJvdHRvbVszXTtcclxuXHJcbiAgICAgICAgLy8gaWYgKCF0LmZpbGxQYWRkaW5nKSB0LmZpbGxQYWRkaW5nID0gWzAsIDAsIDAsIDBdO1xyXG5cclxuICAgICAgICBpZiAodC5maWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC5maWxsWzBdLCB0LmZpbGxbMV0sIHQuZmlsbFsyXSwgdC5maWxsWzNdLCB4ICsgdC5maWxsUGFkZGluZ1swXSwgeSArIHQuZmlsbFBhZGRpbmdbMV0sIHcgLSB0LmZpbGxQYWRkaW5nWzJdIC0gdC5maWxsUGFkZGluZ1swXSwgaCAtIHQuZmlsbFBhZGRpbmdbM10gLSB0LmZpbGxQYWRkaW5nWzFdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gdGhpcy5maWxsUmVjdCh4ICsgdC5maWxsUGFkZGluZ1swXSwgeSArIHQuZmlsbFBhZGRpbmdbMV0sIHcgLSB0LmZpbGxQYWRkaW5nWzJdIC0gdC5maWxsUGFkZGluZ1swXSwgaCAtIHQuZmlsbFBhZGRpbmdbM10gLSB0LmZpbGxQYWRkaW5nWzFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0LmxlZnQpIHRoaXNbdC5sZWZ0WzRdID09PSBcInN0cmV0Y2hcIiA/IFwiZHJhd0ltYWdlXCIgOiBcInJlcGVhdEltYWdlXCJdKGltYWdlLCB0LmxlZnRbMF0sIHQubGVmdFsxXSwgdC5sZWZ0WzJdLCB0LmxlZnRbM10sIHgsIHkgKyB0b3BMZWZ0WzNdLCB0LmxlZnRbMl0sIGggLSBjbGgpO1xyXG4gICAgICAgIGlmICh0LnJpZ2h0KSB0aGlzW3QucmlnaHRbNF0gPT09IFwic3RyZXRjaFwiID8gXCJkcmF3SW1hZ2VcIiA6IFwicmVwZWF0SW1hZ2VcIl0oaW1hZ2UsIHQucmlnaHRbMF0sIHQucmlnaHRbMV0sIHQucmlnaHRbMl0sIHQucmlnaHRbM10sIHggKyB3IC0gdC5yaWdodFsyXSwgeSArIHRvcFJpZ2h0WzNdLCB0LnJpZ2h0WzJdLCBoIC0gY3JoKTtcclxuICAgICAgICBpZiAodC50b3ApIHRoaXNbdC50b3BbNF0gPT09IFwic3RyZXRjaFwiID8gXCJkcmF3SW1hZ2VcIiA6IFwicmVwZWF0SW1hZ2VcIl0oaW1hZ2UsIHQudG9wWzBdLCB0LnRvcFsxXSwgdC50b3BbMl0sIHQudG9wWzNdLCB4ICsgdG9wTGVmdFsyXSwgeSwgdyAtIGN0dywgdC50b3BbM10pO1xyXG4gICAgICAgIGlmICh0LmJvdHRvbSkgdGhpc1t0LmJvdHRvbVs0XSA9PT0gXCJzdHJldGNoXCIgPyBcImRyYXdJbWFnZVwiIDogXCJyZXBlYXRJbWFnZVwiXShpbWFnZSwgdC5ib3R0b21bMF0sIHQuYm90dG9tWzFdLCB0LmJvdHRvbVsyXSwgdC5ib3R0b21bM10sIHggKyBib3R0b21MZWZ0WzJdLCB5ICsgaCAtIHQuYm90dG9tWzNdLCB3IC0gY2J3LCB0LmJvdHRvbVszXSk7XHJcblxyXG4gICAgICAgIGlmICh0LmJvdHRvbUxlZnQpIHRoaXMuZHJhd0ltYWdlKGltYWdlLCB0LmJvdHRvbUxlZnRbMF0sIHQuYm90dG9tTGVmdFsxXSwgdC5ib3R0b21MZWZ0WzJdLCB0LmJvdHRvbUxlZnRbM10sIHgsIHkgKyBoIC0gdC5ib3R0b21MZWZ0WzNdLCB0LmJvdHRvbUxlZnRbMl0sIHQuYm90dG9tTGVmdFszXSk7XHJcbiAgICAgICAgaWYgKHQudG9wTGVmdCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIHQudG9wTGVmdFswXSwgdC50b3BMZWZ0WzFdLCB0LnRvcExlZnRbMl0sIHQudG9wTGVmdFszXSwgeCwgeSwgdC50b3BMZWZ0WzJdLCB0LnRvcExlZnRbM10pO1xyXG4gICAgICAgIGlmICh0LnRvcFJpZ2h0KSB0aGlzLmRyYXdJbWFnZShpbWFnZSwgdC50b3BSaWdodFswXSwgdC50b3BSaWdodFsxXSwgdC50b3BSaWdodFsyXSwgdC50b3BSaWdodFszXSwgeCArIHcgLSB0LnRvcFJpZ2h0WzJdLCB5LCB0LnRvcFJpZ2h0WzJdLCB0LnRvcFJpZ2h0WzNdKTtcclxuICAgICAgICBpZiAodC5ib3R0b21SaWdodCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIHQuYm90dG9tUmlnaHRbMF0sIHQuYm90dG9tUmlnaHRbMV0sIHQuYm90dG9tUmlnaHRbMl0sIHQuYm90dG9tUmlnaHRbM10sIHggKyB3IC0gdC5ib3R0b21SaWdodFsyXSwgeSArIGggLSB0LmJvdHRvbVJpZ2h0WzNdLCB0LmJvdHRvbVJpZ2h0WzJdLCB0LmJvdHRvbVJpZ2h0WzNdKTtcclxuXHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuXHJcbiAgICAgICAgLyogdG9wICovXHJcbiAgICAgICAgaWYgKHQgPiAwICYmIHcgLSBsIC0gciA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBsLCAwLCBpbWFnZS53aWR0aCAtIGwgLSByLCB0LCB4ICsgbCwgeSwgdyAtIGwgLSByLCB0KTtcclxuXHJcbiAgICAgICAgLyogYm90dG9tICovXHJcbiAgICAgICAgaWYgKGIgPiAwICYmIHcgLSBsIC0gciA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBsLCBpbWFnZS5oZWlnaHQgLSBiLCBpbWFnZS53aWR0aCAtIGwgLSByLCBiLCB4ICsgbCwgeSArIGggLSBiLCB3IC0gbCAtIHIsIGIpO1xyXG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coeCwgeSwgdywgaCwgdCwgciwgYiwgbCk7XHJcbiAgICAgICAgLy8gICAgICBjb25zb2xlLmxvZyhpbWFnZSwgMCwgdCwgbCwgaW1hZ2UuaGVpZ2h0IC0gYiAtIHQsIHgsIHkgKyB0LCBsLCBoIC0gYiAtIHQpO1xyXG4gICAgICAgIC8qIGxlZnQgKi9cclxuICAgICAgICBpZiAobCA+IDAgJiYgaCAtIGIgLSB0ID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIDAsIHQsIGwsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4LCB5ICsgdCwgbCwgaCAtIGIgLSB0KTtcclxuXHJcblxyXG4gICAgICAgIC8qIHJpZ2h0ICovXHJcbiAgICAgICAgaWYgKHIgPiAwICYmIGggLSBiIC0gdCA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBpbWFnZS53aWR0aCAtIHIsIHQsIHIsIGltYWdlLmhlaWdodCAtIGIgLSB0LCB4ICsgdyAtIHIsIHkgKyB0LCByLCBoIC0gYiAtIHQpO1xyXG5cclxuICAgICAgICAvKiB0b3AtbGVmdCAqL1xyXG4gICAgICAgIGlmIChsID4gMCAmJiB0ID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIGwsIHQsIHgsIHksIGwsIHQpO1xyXG5cclxuICAgICAgICAvKiB0b3AtcmlnaHQgKi9cclxuICAgICAgICBpZiAociA+IDAgJiYgdCA+IDApIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBpbWFnZS53aWR0aCAtIHIsIDAsIHIsIHQsIHggKyB3IC0gciwgeSwgciwgdCk7XHJcblxyXG4gICAgICAgIC8qIGJvdHRvbS1yaWdodCAqL1xyXG4gICAgICAgIGlmIChyID4gMCAmJiBiID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIGltYWdlLndpZHRoIC0gciwgaW1hZ2UuaGVpZ2h0IC0gYiwgciwgYiwgeCArIHcgLSByLCB5ICsgaCAtIGIsIHIsIGIpO1xyXG5cclxuICAgICAgICAvKiBib3R0b20tbGVmdCAqL1xyXG4gICAgICAgIGlmIChsID4gMCAmJiBiID4gMCkgdGhpcy5kcmF3SW1hZ2UoaW1hZ2UsIDAsIGltYWdlLmhlaWdodCAtIGIsIGwsIGIsIHgsIHkgKyBoIC0gYiwgbCwgYik7XHJcblxyXG4gICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGZpbGwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5maWxsU3R5bGUoZmlsbCkuZmlsbFJlY3QoeCArIGwsIHkgKyB0LCB3IC0gbCAtIHIsIGggLSB0IC0gYik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodyAtIGwgLSByID4gMCAmJiBoIC0gdCAtIGIgPiAwKVxyXG4gICAgICAgICAgICAgIHRoaXMuZHJhd0ltYWdlKGltYWdlLCBsLCB0LCBpbWFnZS53aWR0aCAtIHIgLSBsLCBpbWFnZS5oZWlnaHQgLSBiIC0gdCwgeCArIGwsIHkgKyB0LCB3IC0gbCAtIHIsIGggLSB0IC0gYik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBpeGVsOiBmdW5jdGlvbihjb2xvciwgeCwgeSkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZmlsbFN0eWxlKGNvbG9yKS5maWxsUmVjdCh4LCB5LCAxLCAxKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldFBpeGVsOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgIHZhciBwaXhlbCA9IHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSkuZGF0YTtcclxuICAgICAgcmV0dXJuIGNxLmNvbG9yKFtwaXhlbFswXSwgcGl4ZWxbMV0sIHBpeGVsWzJdLCBwaXhlbFszXV0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVJbWFnZURhdGE6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgaWYgKGZhbHNlICYmIHRoaXMuY29udGV4dC5jcmVhdGVJbWFnZURhdGEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZUltYWdlRGF0YS5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVtcHR5Q2FudmFzKSB7XHJcbiAgICAgICAgICB0aGlzLmVtcHR5Q2FudmFzID0gY3EuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgdGhpcy5lbXB0eUNhbnZhc0NvbnRleHQgPSB0aGlzLmVtcHR5Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW1wdHlDYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmVtcHR5Q2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbXB0eUNhbnZhc0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0cm9rZUxpbmU6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcblxyXG4gICAgICB0aGlzLmJlZ2luUGF0aCgpO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB4MiA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKHgxLngsIHgxLnkpO1xyXG4gICAgICAgIHRoaXMubGluZVRvKHkxLngsIHkxLnkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKHgxLCB5MSk7XHJcbiAgICAgICAgdGhpcy5saW5lVG8oeDIsIHkyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zdHJva2UoKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0TGluZURhc2g6IGZ1bmN0aW9uKGRhc2gpIHtcclxuICAgICAgaWYgKHRoaXMuY29udGV4dC5zZXRMaW5lRGFzaCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5zZXRMaW5lRGFzaChkYXNoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfSBlbHNlIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBtZWFzdXJlVGV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQuYXBwbHkodGhpcy5jb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRMaW5lRGFzaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0TGluZURhc2goKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlUmFkaWFsR3JhZGllbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50LmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTGluZWFyR3JhZGllbnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50LmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlUGF0dGVybjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuY3JlYXRlUGF0dGVybi5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEltYWdlRGF0YTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyogSWYgeW91IHRoaW5rIHRoYXQgSSBhbSByZXRhcmRlZCBiZWNhdXNlIEkgdXNlIGZpbGxSZWN0IHRvIHNldFxyXG4gICAgICAgcGl4ZWxzIC0gcmVhZCBhYm91dCBwcmVtdWx0aXBsZWQgYWxwaGEgaW4gY2FudmFzICovXHJcblxyXG4gICAgd3JpdGVNZXRhOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG5cclxuICAgICAganNvbiA9IGVuY29kZVVSSUNvbXBvbmVudChqc29uKTtcclxuXHJcbiAgICAgIHZhciBieXRlcyA9IFtdO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnl0ZXMucHVzaChqc29uLmNoYXJDb2RlQXQoaSkpO1xyXG4gICAgICAgIC8vICAgICAgY29uc29sZS5sb2coanNvbltpXSlcclxuICAgICAgfVxyXG5cclxuICAgICAgYnl0ZXMucHVzaCgxMjcpO1xyXG5cclxuICAgICAgdmFyIHggPSB0aGlzLndpZHRoIC0gMTtcclxuICAgICAgdmFyIHkgPSB0aGlzLmhlaWdodCAtIDE7XHJcblxyXG4gICAgICB2YXIgcGl4ZWwgPSBbXTtcclxuXHJcbiAgICAgIHdoaWxlIChieXRlcy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgdmFyIGJ5dGUgPSBieXRlcy5zaGlmdCgpO1xyXG5cclxuICAgICAgICBwaXhlbC51bnNoaWZ0KGJ5dGUgKiAyKTtcclxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coeCArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZSksIGJ5dGUpO1xyXG5cclxuICAgICAgICBpZiAoIWJ5dGVzLmxlbmd0aClcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMyAtIHBpeGVsLmxlbmd0aDsgaSsrKSBwaXhlbC51bnNoaWZ0KDI1NCk7XHJcblxyXG4gICAgICAgIGlmIChwaXhlbC5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgIHRoaXMuZmlsbFN0eWxlKGNxLmNvbG9yKHBpeGVsKS50b1JnYigpKS5maWxsUmVjdCh4LCB5LCAxLCAxKTtcclxuICAgICAgICAgIHBpeGVsID0gW107XHJcbiAgICAgICAgICB4LS07XHJcblxyXG4gICAgICAgICAgaWYgKHggPCAwKSB7XHJcbiAgICAgICAgICAgIHktLTtcclxuICAgICAgICAgICAgeCA9IHRoaXMud2lkdGggLSAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZWFkTWV0YTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB2YXIgYnl0ZXMgPSBbXTtcclxuXHJcbiAgICAgIHZhciB4ID0gdGhpcy53aWR0aCAtIDE7XHJcbiAgICAgIHZhciB5ID0gdGhpcy5oZWlnaHQgLSAxO1xyXG5cclxuICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICB2YXIgcGl4ZWwgPSB0aGlzLmdldFBpeGVsKHgsIHkpO1xyXG5cclxuICAgICAgICB2YXIgc3RvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG5cclxuICAgICAgICAgIGlmIChwaXhlbFsyIC0gaV0gPT09IDI1NCkgc3RvcCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgZWxzZSBieXRlcy5wdXNoKHBpeGVsWzIgLSBpXSAvIDIgfCAwKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RvcCkgYnJlYWs7XHJcblxyXG4gICAgICAgIHgtLTtcclxuXHJcbiAgICAgICAgaWYgKHggPCAwKSB7XHJcbiAgICAgICAgICB5LS07XHJcbiAgICAgICAgICB4ID0gdGhpcy53aWR0aCAtIDE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB2YXIganNvbiA9IFwiXCI7XHJcblxyXG4gICAgICB3aGlsZSAoYnl0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAganNvbiArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzLnNoaWZ0KCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgY29uc29sZS5sb2coanNvbik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChqc29uKSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0IHdpZHRoKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldCBoZWlnaHQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldCB3aWR0aCh3KSB7XHJcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdztcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLndpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQgaGVpZ2h0KGgpIHtcclxuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaDtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcclxuICAgIH1cclxuXHJcblxyXG4gIH07XHJcblxyXG4gIC8qIGV4dGVuZCBMYXllciB3aXRoIGRyYXdpbmcgY29udGV4dCBtZXRob2RzICovXHJcblxyXG4gIHZhciBtZXRob2RzID0gW1wiYXJjXCIsIFwiYXJjVG9cIiwgXCJiZWdpblBhdGhcIiwgXCJiZXppZXJDdXJ2ZVRvXCIsIFwiY2xlYXJSZWN0XCIsIFwiY2xpcFwiLCBcImNsb3NlUGF0aFwiLCBcImNyZWF0ZUxpbmVhckdyYWRpZW50XCIsIFwiY3JlYXRlUmFkaWFsR3JhZGllbnRcIiwgXCJjcmVhdGVQYXR0ZXJuXCIsIFwiZHJhd0ZvY3VzUmluZ1wiLCBcImRyYXdJbWFnZVwiLCBcImZpbGxcIiwgXCJmaWxsUmVjdFwiLCBcImZpbGxUZXh0XCIsIFwiZ2V0SW1hZ2VEYXRhXCIsIFwiaXNQb2ludEluUGF0aFwiLCBcImxpbmVUb1wiLCBcIm1lYXN1cmVUZXh0XCIsIFwibW92ZVRvXCIsIFwicHV0SW1hZ2VEYXRhXCIsIFwicXVhZHJhdGljQ3VydmVUb1wiLCBcInJlY3RcIiwgXCJyZXN0b3JlXCIsIFwicm90YXRlXCIsIFwic2F2ZVwiLCBcInNjYWxlXCIsIFwic2V0VHJhbnNmb3JtXCIsIFwic3Ryb2tlXCIsIFwic3Ryb2tlUmVjdFwiLCBcInN0cm9rZVRleHRcIiwgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVcIiwgXCJzZXRMaW5lRGFzaFwiXTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRob2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgbmFtZSA9IG1ldGhvZHNbaV07XHJcblxyXG4gICAgaWYgKGNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSkgY29udGludWU7XHJcblxyXG4gICAgY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdID0gKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XHJcblxyXG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcS5mYXN0QXBwbHkobWV0aG9kLCB0aGlzLmNvbnRleHQsIGFyZ3MpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgfVxyXG5cclxuICAgIH0pKENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC5wcm90b3R5cGVbbmFtZV0pO1xyXG5cclxuXHJcbiAgICBjb250aW51ZTtcclxuXHJcblxyXG4gICAgaWYgKCF0aGlzLmRlYnVnKSB7XHJcbiAgICAgIC8vIGlmICghY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdKSBjcS5MYXllci5wcm90b3R5cGVbbmFtZV0gPSBGdW5jdGlvbihcInRoaXMuY29udGV4dC5cIiArIG5hbWUgKyBcIi5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7IHJldHVybiB0aGlzO1wiKTtcclxuXHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIChmdW5jdGlvbihuYW1lKSB7XHJcblxyXG4gICAgICAgIGNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgLy8gdGhpcy5jb250ZXh0W25hbWVdLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICBjcS5mYXN0QXBwbHkodGhpcy5jb250ZXh0W25hbWVdLCB0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSkobmFtZSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgIChmdW5jdGlvbihuYW1lKSB7XHJcblxyXG4gICAgICAgIGNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0W25hbWVdLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgdGhyb3cgKGUgKyBlcnIuc3RhY2spO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSwgbmFtZSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KShuYW1lKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIC8qIGNyZWF0ZSBzZXR0ZXJzIGFuZCBnZXR0ZXJzICovXHJcblxyXG4gIHZhciBwcm9wZXJ0aWVzID0gW1wiY2FudmFzXCIsIFwiZmlsbFN0eWxlXCIsIFwiZm9udFwiLCBcImdsb2JhbEFscGhhXCIsIFwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uXCIsIFwibGluZUNhcFwiLCBcImxpbmVKb2luXCIsIFwibGluZVdpZHRoXCIsIFwibWl0ZXJMaW1pdFwiLCBcInNoYWRvd09mZnNldFhcIiwgXCJzaGFkb3dPZmZzZXRZXCIsIFwic2hhZG93Qmx1clwiLCBcInNoYWRvd0NvbG9yXCIsIFwic3Ryb2tlU3R5bGVcIiwgXCJ0ZXh0QWxpZ25cIiwgXCJ0ZXh0QmFzZWxpbmVcIiwgXCJsaW5lRGFzaE9mZnNldFwiXTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgbmFtZSA9IHByb3BlcnRpZXNbaV07XHJcbiAgICBpZiAoIWNxLkxheWVyLnByb3RvdHlwZVtuYW1lXSkgY3EuTGF5ZXIucHJvdG90eXBlW25hbWVdID0gRnVuY3Rpb24oXCJpZihhcmd1bWVudHMubGVuZ3RoKSB7IHRoaXMuY29udGV4dC5cIiArIG5hbWUgKyBcIiA9IGFyZ3VtZW50c1swXTsgcmV0dXJuIHRoaXM7IH0gZWxzZSB7IHJldHVybiB0aGlzLmNvbnRleHQuXCIgKyBuYW1lICsgXCI7IH1cIik7XHJcbiAgfTtcclxuXHJcbiAgLyogY29sb3IgKi9cclxuXHJcbiAgY3EuQ29sb3IgPSBmdW5jdGlvbihkYXRhLCB0eXBlKSB7XHJcblxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHRoaXMucGFyc2UoZGF0YSwgdHlwZSk7XHJcbiAgfVxyXG5cclxuICBjcS5Db2xvci5wcm90b3R5cGUgPSB7XHJcblxyXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50b1JnYigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwYXJzZTogZnVuY3Rpb24oYXJncywgdHlwZSkge1xyXG4gICAgICBpZiAoYXJnc1swXSBpbnN0YW5jZW9mIGNxLkNvbG9yKSB7XHJcbiAgICAgICAgdGhpc1swXSA9IGFyZ3NbMF1bMF07XHJcbiAgICAgICAgdGhpc1sxXSA9IGFyZ3NbMF1bMV07XHJcbiAgICAgICAgdGhpc1syXSA9IGFyZ3NbMF1bMl07XHJcbiAgICAgICAgdGhpc1szXSA9IGFyZ3NbMF1bM107XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB2YXIgbWF0Y2ggPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoYXJnc1swXSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgIHZhciByZ2IgPSBjcS5oZXhUb1JnYihhcmdzKTtcclxuICAgICAgICAgIHRoaXNbMF0gPSByZ2JbMF07XHJcbiAgICAgICAgICB0aGlzWzFdID0gcmdiWzFdO1xyXG4gICAgICAgICAgdGhpc1syXSA9IHJnYlsyXTtcclxuICAgICAgICAgIHRoaXNbM10gPSAxLjA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL3JnYlxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcclxuICAgICAgICAgIHRoaXNbMF0gPSBtYXRjaFsxXSB8IDA7XHJcbiAgICAgICAgICB0aGlzWzFdID0gbWF0Y2hbMl0gfCAwO1xyXG4gICAgICAgICAgdGhpc1syXSA9IG1hdGNoWzNdIHwgMDtcclxuICAgICAgICAgIHRoaXNbM10gPSAxLjA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL3JnYmFcXCgoLiopLCguKiksKC4qKVxcKS8pKSB7XHJcbiAgICAgICAgICB0aGlzWzBdID0gbWF0Y2hbMV0gfCAwO1xyXG4gICAgICAgICAgdGhpc1sxXSA9IG1hdGNoWzJdIHwgMDtcclxuICAgICAgICAgIHRoaXNbMl0gPSBtYXRjaFszXSB8IDA7XHJcbiAgICAgICAgICB0aGlzWzNdID0gbWF0Y2hbNF0gfCAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2ggPSBhcmdzLm1hdGNoKC9oc2xcXCgoLiopLCguKiksKC4qKVxcKS8pKSB7XHJcbiAgICAgICAgICB0aGlzLmZyb21Ic2wobWF0Y2hbMV0sIG1hdGNoWzJdLCBtYXRjaFszXSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaCA9IGFyZ3MubWF0Y2goL2hzdlxcKCguKiksKC4qKSwoLiopXFwpLykpIHtcclxuICAgICAgICAgIHRoaXMuZnJvbUhzdihtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICBjYXNlIFwiaHNsXCI6XHJcbiAgICAgICAgICBjYXNlIFwiaHNsYVwiOlxyXG5cclxuICAgICAgICAgICAgdGhpcy5mcm9tSHNsKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIFwiaHN2XCI6XHJcbiAgICAgICAgICBjYXNlIFwiaHN2YVwiOlxyXG5cclxuICAgICAgICAgICAgdGhpcy5mcm9tSHN2KGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzWzBdID0gYXJnc1swXTtcclxuICAgICAgICAgICAgdGhpc1sxXSA9IGFyZ3NbMV07XHJcbiAgICAgICAgICAgIHRoaXNbMl0gPSBhcmdzWzJdO1xyXG4gICAgICAgICAgICB0aGlzWzNdID0gdHlwZW9mIGFyZ3NbM10gPT09IFwidW5kZWZpbmVkXCIgPyAxLjAgOiBhcmdzWzNdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYTogZnVuY3Rpb24oYSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5hbHBoYShhKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWxwaGE6IGZ1bmN0aW9uKGEpIHtcclxuICAgICAgdGhpc1szXSA9IGE7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBmcm9tSHNsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGNvbXBvbmVudHMgPSBhcmd1bWVudHNbMF0gaW5zdGFuY2VvZiBBcnJheSA/IGFyZ3VtZW50c1swXSA6IGFyZ3VtZW50cztcclxuXHJcbiAgICAgIHZhciBjb2xvciA9IGNxLmhzbFRvUmdiKHBhcnNlRmxvYXQoY29tcG9uZW50c1swXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1sxXSksIHBhcnNlRmxvYXQoY29tcG9uZW50c1syXSkpO1xyXG5cclxuICAgICAgdGhpc1swXSA9IGNvbG9yWzBdO1xyXG4gICAgICB0aGlzWzFdID0gY29sb3JbMV07XHJcbiAgICAgIHRoaXNbMl0gPSBjb2xvclsyXTtcclxuICAgICAgdGhpc1szXSA9IHR5cGVvZiBhcmd1bWVudHNbM10gPT09IFwidW5kZWZpbmVkXCIgPyAxLjAgOiBhcmd1bWVudHNbM107XHJcbiAgICB9LFxyXG5cclxuICAgIGZyb21Ic3Y6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgY29tcG9uZW50cyA9IGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEFycmF5ID8gYXJndW1lbnRzWzBdIDogYXJndW1lbnRzO1xyXG4gICAgICB2YXIgY29sb3IgPSBjcS5oc3ZUb1JnYihwYXJzZUZsb2F0KGNvbXBvbmVudHNbMF0pLCBwYXJzZUZsb2F0KGNvbXBvbmVudHNbMV0pLCBwYXJzZUZsb2F0KGNvbXBvbmVudHNbMl0pKTtcclxuXHJcbiAgICAgIHRoaXNbMF0gPSBjb2xvclswXTtcclxuICAgICAgdGhpc1sxXSA9IGNvbG9yWzFdO1xyXG4gICAgICB0aGlzWzJdID0gY29sb3JbMl07XHJcbiAgICAgIHRoaXNbM10gPSB0eXBlb2YgYXJndW1lbnRzWzNdID09PSBcInVuZGVmaW5lZFwiID8gMS4wIDogYXJndW1lbnRzWzNdO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0FycmF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIFt0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdLCB0aGlzWzNdXTtcclxuICAgIH0sXHJcblxyXG4gICAgdG9SZ2I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gXCJyZ2IoXCIgKyB0aGlzWzBdICsgXCIsIFwiICsgdGhpc1sxXSArIFwiLCBcIiArIHRoaXNbMl0gKyBcIilcIjtcclxuICAgIH0sXHJcblxyXG4gICAgdG9SZ2JhOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIFwicmdiYShcIiArIHRoaXNbMF0gKyBcIiwgXCIgKyB0aGlzWzFdICsgXCIsIFwiICsgdGhpc1syXSArIFwiLCBcIiArIHRoaXNbM10gKyBcIilcIjtcclxuICAgIH0sXHJcblxyXG4gICAgdG9IZXg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gY3EucmdiVG9IZXgodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvSHNsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGMgPSBjcS5yZ2JUb0hzbCh0aGlzWzBdLCB0aGlzWzFdLCB0aGlzWzJdKTtcclxuICAgICAgY1szXSA9IHRoaXNbM107XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b0hzdjogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBjID0gY3EucmdiVG9Ic3YodGhpc1swXSwgdGhpc1sxXSwgdGhpc1syXSk7XHJcbiAgICAgIGNbM10gPSB0aGlzWzNdO1xyXG4gICAgICByZXR1cm4gYztcclxuICAgIH0sXHJcblxyXG4gICAgZ3JhZGllbnQ6IGZ1bmN0aW9uKHRhcmdldCwgc3RlcHMpIHtcclxuICAgICAgdmFyIHRhcmdldENvbG9yID0gY3EuY29sb3IodGFyZ2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hpZnRIc2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgaHNsID0gdGhpcy50b0hzbCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXNbMF0gIT09IHRoaXNbMV0gfHwgdGhpc1sxXSAhPT0gdGhpc1syXSkge1xyXG4gICAgICAgIHZhciBoID0gYXJndW1lbnRzWzBdID09PSBmYWxzZSA/IGhzbFswXSA6IGNxLndyYXBWYWx1ZShoc2xbMF0gKyBhcmd1bWVudHNbMF0sIDAsIDEpO1xyXG4gICAgICAgIHZhciBzID0gYXJndW1lbnRzWzFdID09PSBmYWxzZSA/IGhzbFsxXSA6IGNxLmxpbWl0VmFsdWUoaHNsWzFdICsgYXJndW1lbnRzWzFdLCAwLCAxKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgaCA9IGhzbFswXTtcclxuICAgICAgICB2YXIgcyA9IGhzbFsxXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGwgPSBhcmd1bWVudHNbMl0gPT09IGZhbHNlID8gaHNsWzJdIDogY3EubGltaXRWYWx1ZShoc2xbMl0gKyBhcmd1bWVudHNbMl0sIDAsIDEpO1xyXG5cclxuICAgICAgdGhpcy5mcm9tSHNsKGgsIHMsIGwpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEhzbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBoc2wgPSB0aGlzLnRvSHNsKCk7XHJcblxyXG4gICAgICB2YXIgaCA9IGFyZ3VtZW50c1swXSA9PT0gZmFsc2UgPyBoc2xbMF0gOiBjcS5saW1pdFZhbHVlKGFyZ3VtZW50c1swXSwgMCwgMSk7XHJcbiAgICAgIHZhciBzID0gYXJndW1lbnRzWzFdID09PSBmYWxzZSA/IGhzbFsxXSA6IGNxLmxpbWl0VmFsdWUoYXJndW1lbnRzWzFdLCAwLCAxKTtcclxuICAgICAgdmFyIGwgPSBhcmd1bWVudHNbMl0gPT09IGZhbHNlID8gaHNsWzJdIDogY3EubGltaXRWYWx1ZShhcmd1bWVudHNbMl0sIDAsIDEpO1xyXG5cclxuICAgICAgdGhpcy5mcm9tSHNsKGgsIHMsIGwpO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG1peDogZnVuY3Rpb24oY29sb3IsIGFtb3VudCkge1xyXG4gICAgICBjb2xvciA9IGNxLmNvbG9yKGNvbG9yKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIHRoaXNbaV0gPSBjcS5taXgodGhpc1tpXSwgY29sb3JbaV0sIGFtb3VudCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgd2luZG93W1wiY3FcIl0gPSB3aW5kb3dbXCJDYW52YXNRdWVyeVwiXSA9IGNxO1xyXG5cclxuXHJcbiAgcmV0dXJuIGNxO1xyXG5cclxufSkoKTtcclxuXHJcbi8qIGZpbGU6IHNyYy9sYXllci9MYXllci5qcyAqL1xyXG5cclxuUExBWUdST1VORC5SZW5kZXJlciA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgYXBwLm9uKFwiY3JlYXRlXCIsIHRoaXMuY3JlYXRlLmJpbmQodGhpcykpO1xyXG4gIGFwcC5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgYXBwLnJlbmRlcmVyID0gdGhpcztcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlJlbmRlcmVyLnBsdWdpbiA9IHRydWU7XHJcblxyXG5QTEFZR1JPVU5ELlJlbmRlcmVyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY3JlYXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgdGhpcy5hcHAubGF5ZXIgPSBjcSgpLmFwcGVuZFRvKHRoaXMuYXBwLmNvbnRhaW5lcik7XHJcblxyXG4gICAgaWYgKCF0aGlzLmFwcC5jdXN0b21Db250YWluZXIpIHtcclxuICAgICAgdGhpcy5hcHAuY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XHJcbiAgICAgIHRoaXMuYXBwLmNvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlc2l6ZTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgIHZhciBhcHAgPSB0aGlzLmFwcDtcclxuXHJcbiAgICB2YXIgbGF5ZXIgPSBhcHAubGF5ZXI7XHJcblxyXG4gICAgbGF5ZXIud2lkdGggPSBhcHAud2lkdGg7XHJcbiAgICBsYXllci5oZWlnaHQgPSBhcHAuaGVpZ2h0O1xyXG5cclxuICAgIGxheWVyLmNhbnZhcy5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcIjAgMFwiO1xyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgYXBwLm9mZnNldFggKyBcInB4LFwiICsgYXBwLm9mZnNldFkgKyBcInB4KSBzY2FsZShcIiArIGFwcC5zY2FsZSArIFwiLCBcIiArIGFwcC5zY2FsZSArIFwiKVwiO1xyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLnRyYW5zZm9ybVN0eWxlID0gXCJwcmVzZXJ2ZS0zZFwiO1xyXG5cclxuICAgIGxheWVyLmNhbnZhcy5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBcIjAgMFwiO1xyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgYXBwLm9mZnNldFggKyBcInB4LFwiICsgYXBwLm9mZnNldFkgKyBcInB4KSBzY2FsZShcIiArIGFwcC5zY2FsZSArIFwiLCBcIiArIGFwcC5zY2FsZSArIFwiKVwiO1xyXG4gICAgbGF5ZXIuY2FudmFzLnN0eWxlLndlYmtpdFRyYW5zZm9ybVN0eWxlID0gXCJwcmVzZXJ2ZS0zZFwiO1xyXG5cclxuICAgIGxheWVyLnNtb290aGluZyA9IHRoaXMuYXBwLnNtb290aGluZztcclxuICAgIGxheWVyLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuc2V0U21vb3RoaW5nKHRoaXMuYXBwLnNtb290aGluZyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHNldFNtb290aGluZzogZnVuY3Rpb24oc21vb3RoaW5nKSB7XHJcblxyXG4gICAgdmFyIGxheWVyID0gdGhpcy5hcHAubGF5ZXI7XHJcblxyXG4gICAgdGhpcy5hcHAuc21vb3RoaW5nID0gc21vb3RoaW5nO1xyXG5cclxuXHJcbiAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xKSB7XHJcblxyXG4gICAgICBsYXllci5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBzbW9vdGhpbmcgPyBcImF1dG9cIiA6IFwiLW1vei1jcmlzcC1lZGdlc1wiO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICBsYXllci5jYW52YXMuc3R5bGUuaW1hZ2VSZW5kZXJpbmcgPSBzbW9vdGhpbmcgPyBcImF1dG9cIiA6IFwicGl4ZWxhdGVkXCI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxheWVyLnNtb290aGluZyA9IHNtb290aGluZztcclxuICAgIGxheWVyLnVwZGF0ZSgpO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL2xheWVyL1RyYW5zaXRpb25zLmpzICovXHJcblxyXG5QTEFZR1JPVU5ELlRyYW5zaXRpb25zID0gZnVuY3Rpb24oYXBwKSB7XHJcblxyXG4gIHRoaXMuYXBwID0gYXBwO1xyXG5cclxuICBhcHAub24oXCJlbnRlcnN0YXRlXCIsIHRoaXMuZW50ZXJzdGF0ZS5iaW5kKHRoaXMpKTtcclxuICBhcHAub24oXCJwb3N0cmVuZGVyXCIsIHRoaXMucG9zdHJlbmRlci5iaW5kKHRoaXMpKTtcclxuICBhcHAub24oXCJzdGVwXCIsIHRoaXMuc3RlcC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgdGhpcy5wcm9ncmVzcyA9IDE7XHJcbiAgdGhpcy5saWZldGltZSA9IDA7XHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlRyYW5zaXRpb25zLnBsdWdpbiA9IHRydWU7XHJcblxyXG5QTEFZR1JPVU5ELlRyYW5zaXRpb25zLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgZW50ZXJzdGF0ZTogZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgIHRoaXMuc2NyZWVuc2hvdCA9IHRoaXMuYXBwLmxheWVyLmNhY2hlKCk7XHJcblxyXG4gICAgaWYgKGRhdGEucHJldikge1xyXG4gICAgICB0aGlzLmxpZmV0aW1lID0gMDtcclxuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHBvc3RyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEpIHJldHVybjtcclxuXHJcbiAgICBQTEFZR1JPVU5ELlRyYW5zaXRpb25zLlNwbGl0KHRoaXMsIHRoaXMucHJvZ3Jlc3MpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lICs9IGRlbHRhO1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbih0aGlzLmxpZmV0aW1lIC8gMC41LCAxKTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuVHJhbnNpdGlvbnMuSW1wbG9kZSA9IGZ1bmN0aW9uKG1hbmFnZXIsIHByb2dyZXNzKSB7XHJcblxyXG4gIHZhciBhcHAgPSBtYW5hZ2VyLmFwcDtcclxuICB2YXIgbGF5ZXIgPSBhcHAubGF5ZXI7XHJcblxyXG4gIHByb2dyZXNzID0gYXBwLmVhc2UocHJvZ3Jlc3MsIFwib3V0Q3ViaWNcIik7XHJcblxyXG4gIHZhciBuZWdhdGl2ZSA9IDEgLSBwcm9ncmVzcztcclxuXHJcbiAgbGF5ZXIuc2F2ZSgpO1xyXG4gIGxheWVyLnRhcnMoYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIDAuNSwgMC41LCAwLCAwLjUgKyAwLjUgKiBuZWdhdGl2ZSwgbmVnYXRpdmUpO1xyXG4gIGxheWVyLmRyYXdJbWFnZShtYW5hZ2VyLnNjcmVlbnNob3QsIDAsIDApO1xyXG5cclxuICBsYXllci5yZXN0b3JlKCk7XHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5UcmFuc2l0aW9ucy5TcGxpdCA9IGZ1bmN0aW9uKG1hbmFnZXIsIHByb2dyZXNzKSB7XHJcblxyXG4gIHZhciBhcHAgPSBtYW5hZ2VyLmFwcDtcclxuICB2YXIgbGF5ZXIgPSBhcHAubGF5ZXI7XHJcblxyXG4gIHByb2dyZXNzID0gYXBwLmVhc2UocHJvZ3Jlc3MsIFwiaW5PdXRDdWJpY1wiKTtcclxuXHJcbiAgdmFyIG5lZ2F0aXZlID0gMSAtIHByb2dyZXNzO1xyXG5cclxuICBsYXllci5zYXZlKCk7XHJcblxyXG4gIGxheWVyLmEobmVnYXRpdmUpLmNsZWFyKFwiI2ZmZlwiKS5yYSgpO1xyXG5cclxuICBsYXllci5kcmF3SW1hZ2UobWFuYWdlci5zY3JlZW5zaG90LCAwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQgLyAyIHwgMCwgMCwgMCwgYXBwLndpZHRoLCBuZWdhdGl2ZSAqIGFwcC5oZWlnaHQgLyAyIHwgMCk7XHJcbiAgbGF5ZXIuZHJhd0ltYWdlKG1hbmFnZXIuc2NyZWVuc2hvdCwgMCwgYXBwLmhlaWdodCAvIDIgfCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQgLyAyIHwgMCwgMCwgYXBwLmhlaWdodCAvIDIgKyBwcm9ncmVzcyAqIGFwcC5oZWlnaHQgLyAyICsgMSB8IDAsIGFwcC53aWR0aCwgTWF0aC5tYXgoMSwgbmVnYXRpdmUgKiBhcHAuaGVpZ2h0ICogMC41IHwgMCkpO1xyXG5cclxuICBsYXllci5yZXN0b3JlKCk7XHJcblxyXG59O1xyXG5cclxuLyogZmlsZTogc3JjL2xheWVyL0xvYWRpbmdTY3JlZW4uanMgKi9cclxuXHJcblBMQVlHUk9VTkQuTG9hZGluZ1NjcmVlbiA9IHtcclxuXHJcbiAgbG9nb1JhdzogXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU5vQUFBQVNCQU1BQUFEUGlOMHhBQUFBR0ZCTVZFVUFBUUF0TGl4SFNVZG5hR2FKaW9pbXFLWE16c3Y3L2ZyNXNoZ1ZBQUFBQVdKTFIwUUFpQVVkU0FBQUFBbHdTRmx6QUFBTEV3QUFDeE1CQUpxY0dBQUFBQWQwU1UxRkI5OEVBd2tlQTRvUVdKNEFBQUFaZEVWWWRFTnZiVzFsYm5RQVEzSmxZWFJsWkNCM2FYUm9JRWRKVFZCWGdRNFhBQUFCOWtsRVFWUTR5NzJVdlcrck1CREF6K0ZycFZLcnJGbWVzbWFwV05PbHJLalNlMWtaK3VvVkF2aisvZnJ1akcxU2FKY3FKd1U3dm9PZjd4TVF6UW1zSURpNU5QVE1zTFJudEgzVStGNlNBWm8zTmxDdmNnQkZKejhvK3ZrRGlFNjNsSTk1WS9VbXBpbnNaV2tnSldKaURiQVZRMTZodHB0eFNUTmxvSWx1Z3dhdzAwMUV5M0FTRjNzbzZMMXFMTlh6UVM1UzBVR0tML0NJNXdXTnJpRTBVSDlZdHkzN0xxSVZnK3dzcXU3SXgwTXdWQlNGL2RVK2p2MlNObm1hMDIxTEVkUHFWbk1lVTN4QXUwa1hjU0dqbXE3T3g0RTJXbjg4TFoyK0VGajNhdmppeHphaTZWUFZ5dVl2ZVpMSEYyWGZkRG52QXEyN0RJSEd1cSswREpGc0UzME90QjFLcU93ZDhEcjdQY000YitqZmoyZzVscDRXeW50Qks2NnF1YTNKekVBK3VYSnB3SC9ObFZ1elJWUFkva1RMQjJtanVOK0t3ZFo4Rk95OGoyZ0RiRVVTcXVtblNDWTRsZjRpYnEzSWhWTTR5Y1pRUm52K3pGcVZkSlFWbjZCeHZVcWViR3B1YU5vM3NaeHdCemphamlNWk9vQml3eVZGK2tDcituVWFKT2FHcG5BZVJQUEpaVHI0RnFtSFJYY25lRW80RHFRL2Z0ZmRuTGVEclVBTUU4eFdLUGVLQ3dXNllrRXBYZnMzcDFFV0poZGNVQVlQMFRJL3VZYVY4Y2dqd0JvdmFleVd3amkyVDlyVEZJZFMvY1AvTW5rVExSVVd4Z05OWlZpbjdiVDVmcVQ5bWlEY1VWSnpSMWdScGZJT05NbXVsVSs1UXFyNnpYQVVxQUFBQUFCSlJVNUVya0pnZ2c9PVwiLFxyXG5cclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmxvZ28gPSBuZXcgSW1hZ2U7XHJcblxyXG4gICAgdGhpcy5sb2dvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubG9nby5zcmMgPSB0aGlzLmxvZ29SYXc7XHJcblxyXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gXCIjMjgyMjQ1XCI7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgIC8vIHRoaXMuYmFja2dyb3VuZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmJhY2tncm91bmRDb2xvciB8fCBcIiMwMDBcIjtcclxuICAgIH1cclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIGVudGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG5cclxuICB9LFxyXG5cclxuICBsZWF2ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5hcHAudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBjdXJyZW50OiAxXHJcbiAgICAgIH0sIDAuNSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgaWYgKHRoaXMubG9ja2VkKSB7XHJcbiAgICAgIGlmICh0aGlzLmFuaW1hdGlvbi5maW5pc2hlZCkgdGhpcy5sb2NrZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudCArIE1hdGguYWJzKHRoaXMuYXBwLmxvYWRlci5wcm9ncmVzcyAtIHRoaXMuY3VycmVudCkgKiBkZWx0YTtcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVhZHk6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucmVhZHkpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllci5jbGVhcih0aGlzLmJhY2tncm91bmQpO1xyXG5cclxuICAgIHRoaXMuYXBwLmxheWVyLmZpbGxTdHlsZShcIiNmZmZcIik7XHJcblxyXG4gICAgdGhpcy5hcHAubGF5ZXIuc2F2ZSgpO1xyXG4gICAgdGhpcy5hcHAubGF5ZXIuYWxpZ24oMC41LCAwLjUpO1xyXG4gICAgdGhpcy5hcHAubGF5ZXIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKFwibGlnaHRlclwiKTtcclxuICAgIHRoaXMuYXBwLmxheWVyLmRyYXdJbWFnZSh0aGlzLmxvZ28sIHRoaXMuYXBwLmNlbnRlci54LCB0aGlzLmFwcC5jZW50ZXIueSk7XHJcblxyXG4gICAgdmFyIHcgPSB0aGlzLmN1cnJlbnQgKiB0aGlzLmxvZ28ud2lkdGg7XHJcblxyXG4gICAgdGhpcy5hcHAubGF5ZXIuZmlsbFN0eWxlKFwiI2ZmZlwiKTtcclxuXHJcbiAgICB0aGlzLmFwcC5sYXllci5maWxsUmVjdCh0aGlzLmFwcC5jZW50ZXIueCwgdGhpcy5hcHAuY2VudGVyLnkgKyAzMiwgdywgMTIpO1xyXG4gICAgdGhpcy5hcHAubGF5ZXIuZmlsbFJlY3QodGhpcy5hcHAuY2VudGVyLngsIHRoaXMuYXBwLmNlbnRlci55ICsgMzIsIHRoaXMubG9nby53aWR0aCwgNCk7XHJcblxyXG4gICAgdGhpcy5hcHAubGF5ZXIucmVzdG9yZSgpO1xyXG5cclxuICB9XHJcblxyXG59OyIsIi8qIHNjYW5saW5lcyBwbHVnaW4gZm9yIHBsYXlncm91bmQncyBkZWZhdWx0IHJlbmRlcmVyICovXHJcblxyXG5QTEFZR1JPVU5ELlNjYW5saW5lcyA9IGZ1bmN0aW9uKGFwcCkge1xyXG5cclxuICB0aGlzLmFwcCA9IGFwcDtcclxuXHJcbiAgYXBwLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xyXG4gIGFwcC5vbihcInBvc3RyZW5kZXJcIiwgdGhpcy5wb3N0cmVuZGVyLmJpbmQodGhpcykpO1xyXG5cclxufTtcclxuXHJcblBMQVlHUk9VTkQuU2NhbmxpbmVzLnBsdWdpbiA9IHRydWU7XHJcblxyXG5QTEFZR1JPVU5ELlNjYW5saW5lcy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHJlc2l6ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5pbWFnZSA9IGNxKHRoaXMuYXBwLndpZHRoLCB0aGlzLmFwcC5oZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuaW1hZ2UuZ2xvYmFsQWxwaGEoMC4xKTtcclxuICAgIHRoaXMuaW1hZ2UuZmlsbFN0eWxlKFwiIzAwOFwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRoaXMuaW1hZ2UuY2FudmFzLmhlaWdodDsgaSArPSA4KXtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuaW1hZ2UuZmlsbFJlY3QoMCwgaSwgdGhpcy5pbWFnZS5jYW52YXMud2lkdGgsIDQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmltYWdlID0gdGhpcy5pbWFnZS5jYWNoZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBwb3N0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5pbWFnZSkge1xyXG5cclxuICAgICAgLy8gdGhpcy5hcHAubGF5ZXIuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTsiLCIvKlxyXG5cclxuICBTb3VuZE9uRGVtYW5kIHIxXHJcblxyXG4gIChjKSAyMDEyLTIwMTUgaHR0cDovL3Jlem9uZXIubmV0XHJcblxyXG4gIFRoaXMgbGlicmFyeSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuXHJcbiovXHJcblxyXG4vKiBvcHRpb25zICovXHJcblxyXG4vKiBvdXRwdXQ6IG91dHB1dCBub2RlLCBkZWZhdWx0ICovXHJcbi8qIGF1ZGlvQ29udGV4dDogYXVkaW9Db250ZXh0ICovXHJcblxyXG5Tb3VuZE9uRGVtYW5kID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgdmFyIGNhblBsYXlNcDMgPSAobmV3IEF1ZGlvKS5jYW5QbGF5VHlwZShcImF1ZGlvL21wM1wiKTtcclxuICB2YXIgY2FuUGxheU9nZyA9IChuZXcgQXVkaW8pLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyk7XHJcblxyXG4gIGlmICh0aGlzLnByZWZlcmVkQXVkaW9Gb3JtYXQgPT09IFwibXAzXCIpIHtcclxuXHJcbiAgICBpZiAoY2FuUGxheU1wMykgdGhpcy5hdWRpb0Zvcm1hdCA9IFwibXAzXCI7XHJcbiAgICBlbHNlIHRoaXMuYXVkaW9Gb3JtYXQgPSBcIm9nZ1wiO1xyXG5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGlmIChjYW5QbGF5T2dnKSB0aGlzLmF1ZGlvRm9ybWF0ID0gXCJvZ2dcIjtcclxuICAgIGVsc2UgdGhpcy5hdWRpb0Zvcm1hdCA9IFwibXAzXCI7XHJcblxyXG4gIH1cclxuXHJcbiAgaWYgKCFvcHRpb25zLmF1ZGlvQ29udGV4dCkge1xyXG4gICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBkdXBsaWNhdGVkIEF1ZGlvQ29udGV4dCwgdXNlIG9wdGlvbnMuYXVkaW9Db250ZXh0Jyk7XHJcbiAgfVxyXG4gIHRoaXMuYXVkaW9Db250ZXh0ID0gb3B0aW9ucy5hdWRpb0NvbnRleHQgfHwgbmV3IEF1ZGlvQ29udGV4dDtcclxuXHJcbiAgdGhpcy5jb21wcmVzc29yID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKCk7XHJcbiAgdGhpcy5jb21wcmVzc29yLmNvbm5lY3QodGhpcy5hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xyXG5cclxuICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXHJcbiAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29tcHJlc3Nvcik7XHJcblxyXG4gIHRoaXMuaW5wdXQgPSB0aGlzLmdhaW5Ob2RlO1xyXG5cclxuICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxLjA7XHJcblxyXG4gIHRoaXMuYnVmZmVycyA9IHt9O1xyXG5cclxuICB0aGlzLmNoYW5uZWxzID0ge307XHJcbiAgdGhpcy5hbGlhc2VzID0ge307XHJcblxyXG4gIHZhciBsYXN0VGljayA9IERhdGUubm93KCk7XHJcbiAgdmFyIGVuZ2luZSA9IHRoaXM7XHJcblxyXG4gIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBkZWx0YSA9IChEYXRlLm5vdygpIC0gbGFzdFRpY2spIC8gMTAwMDtcclxuXHJcbiAgICBsYXN0VGljayA9IERhdGUubm93KCk7XHJcblxyXG4gICAgZW5naW5lLnN0ZXAoZGVsdGEpO1xyXG5cclxuICB9LCAxMDAwIC8gNjApO1xyXG5cclxufTtcclxuXHJcblNvdW5kT25EZW1hbmQubW92ZVRvID0gZnVuY3Rpb24odmFsdWUsIHRhcmdldCwgc3RlcCkge1xyXG5cclxuICBpZiAodmFsdWUgPCB0YXJnZXQpIHtcclxuICAgIHZhbHVlICs9IHN0ZXA7XHJcbiAgICBpZiAodmFsdWUgPiB0YXJnZXQpIHZhbHVlID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlID4gdGFyZ2V0KSB7XHJcbiAgICB2YWx1ZSAtPSBzdGVwO1xyXG4gICAgaWYgKHZhbHVlIDwgdGFyZ2V0KSB2YWx1ZSA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIHJldHVybiB2YWx1ZTtcclxuXHJcbn07XHJcblxyXG5Tb3VuZE9uRGVtYW5kLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IFNvdW5kT25EZW1hbmQsXHJcblxyXG4gIHBhdGg6IFwic291bmRzL1wiLFxyXG5cclxuICBjaGFubmVsOiBmdW5jdGlvbihuYW1lKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNoYW5uZWxzW25hbWVdKSB0aGlzLmNoYW5uZWxzW25hbWVdID0gbmV3IFNvdW5kT25EZW1hbmQuQ2hhbm5lbCh0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jaGFubmVsc1tuYW1lXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0QXNzZXRFbnRyeTogZnVuY3Rpb24ocGF0aCwgZGVmYXVsdEV4dGVuc2lvbikge1xyXG5cclxuICAgIC8qIHRyYW5zbGF0ZSBmb2xkZXIgYWNjb3JkaW5nIHRvIHVzZXIgcHJvdmlkZWQgcGF0aHNcclxuICAgICAgIG9yIGxlYXZlIGFzIGlzICovXHJcblxyXG4gICAgdmFyIGZpbGVpbmZvID0gcGF0aC5tYXRjaCgvKC4qKVxcLi4qLyk7XHJcbiAgICB2YXIga2V5ID0gZmlsZWluZm8gPyBmaWxlaW5mb1sxXSA6IHBhdGg7XHJcblxyXG4gICAgdmFyIHRlbXAgPSBwYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgIHZhciBiYXNlbmFtZSA9IHBhdGg7XHJcblxyXG4gICAgaWYgKHRlbXAubGVuZ3RoID4gMSkge1xyXG4gICAgICB2YXIgZXh0ID0gdGVtcC5wb3AoKTtcclxuICAgICAgcGF0aCA9IHRlbXAuam9pbihcIi5cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgZXh0ID0gZGVmYXVsdEV4dGVuc2lvbjtcclxuICAgICAgYmFzZW5hbWUgKz0gXCIuXCIgKyBkZWZhdWx0RXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGtleToga2V5LFxyXG4gICAgICB1cmw6IHRoaXMucGF0aCArIGJhc2VuYW1lLFxyXG4gICAgICBwYXRoOiB0aGlzLnBhdGggKyBwYXRoLFxyXG4gICAgICBleHQ6IGV4dFxyXG4gICAgfTtcclxuXHJcbiAgfSxcclxuXHJcbiAgbG9hZGVyczoge30sXHJcblxyXG4gIGxvYWQ6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgIHZhciBlbmdpbmUgPSB0aGlzO1xyXG4gICAgdmFyIGVudHJ5ID0gZW5naW5lLmdldEFzc2V0RW50cnkoa2V5LCBlbmdpbmUuYXVkaW9Gb3JtYXQpO1xyXG5cclxuICAgIGlmICghdGhpcy5sb2FkZXJzW2tleV0pIHtcclxuXHJcbiAgICAgIHRoaXMubG9hZGVyc1trZXldID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIGlmIChlbmdpbmUuYnVmZmVyc1tlbnRyeS5rZXldKSByZXR1cm4gcmVzb2x2ZShlbmdpbmUuYnVmZmVyc1tlbnRyeS5rZXldKTtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKFwiR0VUXCIsIGVudHJ5LnVybCwgdHJ1ZSk7XHJcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBlbmdpbmUuYXVkaW9Db250ZXh0LmRlY29kZUF1ZGlvRGF0YSh0aGlzLnJlc3BvbnNlLCBmdW5jdGlvbihkZWNvZGVkQnVmZmVyKSB7XHJcblxyXG4gICAgICAgICAgICBlbmdpbmUuYnVmZmVyc1tlbnRyeS5rZXldID0gZGVjb2RlZEJ1ZmZlcjtcclxuICAgICAgICAgICAgcmVzb2x2ZShkZWNvZGVkQnVmZmVyKTtcclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5sb2FkZXJzW2tleV07XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuY2hhbm5lbHMpIHtcclxuXHJcbiAgICAgIHRoaXMuY2hhbm5lbHNba2V5XS5zdGVwKGRlbHRhKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGR1cGxpY2F0ZTogZnVuY3Rpb24oc291cmNlLCBhcywgdm9sdW1lLCByYXRlKSB7XHJcblxyXG4gICAgdmFyIGVuZ2luZSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5sb2FkKHNvdXJjZSkudGhlbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGVuZ2luZS5idWZmZXJzW3NvdXJjZV07XHJcblxyXG4gICAgICBlbmdpbmUuYnVmZmVyc1thc10gPSBlbmdpbmUuYnVmZmVyc1tzb3VyY2VdO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICB9LFxyXG5cclxuICBhbGlhczogZnVuY3Rpb24obmFtZSwgc291cmNlLCByYXRlLCB2b2x1bWUpIHtcclxuXHJcbiAgICB0aGlzLmFsaWFzZXNbbmFtZV0gPSB7XHJcbiAgICAgIHNvdXJjZTogc291cmNlLFxyXG4gICAgICByYXRlOiByYXRlLFxyXG4gICAgICB2b2x1bWU6IHZvbHVtZVxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG5cclxufTtcclxuU291bmRPbkRlbWFuZC5FdmVudHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuXHJcbn07XHJcblxyXG5Tb3VuZE9uRGVtYW5kLkV2ZW50cy5wcm90b3R5cGUgPSB7XHJcblxyXG4gIG9uOiBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBpZiAodHlwZW9mIGV2ZW50ID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgZm9yICh2YXIga2V5IGluIGV2ZW50KSB7XHJcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9uKGtleSwgZXZlbnRba2V5XSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0ucHVzaChjYWxsYmFjayk7XHJcblxyXG4gICAgcmV0dXJuIGNhbGxiYWNrO1xyXG4gIH0sXHJcblxyXG4gIG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG5cclxuICAgIGNhbGxiYWNrLm9uY2UgPSB0cnVlO1xyXG5cclxuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnRdKSB0aGlzLmxpc3RlbmVyc1tldmVudF0gPSBbXTtcclxuXHJcbiAgICB0aGlzLmxpc3RlbmVyc1tldmVudF0ucHVzaChjYWxsYmFjayk7XHJcblxyXG4gICAgcmV0dXJuIGNhbGxiYWNrO1xyXG5cclxuICB9LFxyXG5cclxuICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tldmVudF0ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50XVtpXS5fcmVtb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgIGxlbi0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHRyaWdnZXI6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XHJcblxyXG4gICAgLyogaWYgeW91IHByZWZlciBldmVudHMgcGlwZSAqL1xyXG5cclxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLmxpc3RlbmVyc1tcImV2ZW50XCJdLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbXCJldmVudFwiXVtpXShldmVudCwgZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBvciBzdWJzY3JpYmVkIHRvIHNpbmdsZSBldmVudCAqL1xyXG5cclxuICAgIGlmICh0aGlzLmxpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IHRoaXMubGlzdGVuZXJzW2V2ZW50XVtpXTtcclxuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGRhdGEpO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXIub25jZSkge1xyXG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07XHJcblNvdW5kT25EZW1hbmQuQ2hhbm5lbCA9IGZ1bmN0aW9uKGVuZ2luZSkge1xyXG5cclxuICB0aGlzLmVuZ2luZSA9IGVuZ2luZTtcclxuICB0aGlzLmF1ZGlvQ29udGV4dCA9IGVuZ2luZS5hdWRpb0NvbnRleHQ7XHJcblxyXG4gIC8qIGNvbm5lY3Rpb24gb3JkZXIgZ29lcyBmcm9tIGJvdHRvbSB0byB0b3AgKi9cclxuXHJcbiAgLyogZ2FpbiBub2RlICovXHJcblxyXG4gIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcblxyXG4gIC8qIGNvbnZvbHZlciAqL1xyXG5cclxuICB0aGlzLmNvbnZvbHZlcldldE5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcbiAgdGhpcy5jb252b2x2ZXJEcnlOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xyXG4gIHRoaXMuY29udm9sdmVyTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xyXG4gIHRoaXMuY29udm9sdmVyRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICB0aGlzLnJvdXRlKCk7XHJcblxyXG4gIHRoaXMucXVldWUgPSBbXTtcclxuICB0aGlzLmxvb3BzID0gW107XHJcblxyXG59O1xyXG5cclxuU291bmRPbkRlbWFuZC5DaGFubmVsLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IFNvdW5kT25EZW1hbmQuQ2hhbm5lbCxcclxuXHJcbiAgLyogZ2V0IGEgc291bmQgZm9yIGZ1cnRoZXIgdXNhZ2UgKi9cclxuXHJcbiAgeHJvdXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50Um91dGUpIHtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jdXJyZW50Um91dGUubGVuZ3RoIC0gMTsgaSsrKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFJvdXRlW2ldLmRpc2Nvbm5lY3QoKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50Um91dGUgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgaWYgKGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMSkge1xyXG5cclxuICAgICAgICB2YXIgbm9kZSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcbiAgICAgICAgbm9kZS5jb25uZWN0KGFyZ3VtZW50c1tpICsgMV0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jdXJyZW50Um91dGUucHVzaChub2RlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnB1dCA9IGFyZ3VtZW50c1swXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFNvdW5kT25EZW1hbmQuU291bmQoa2V5LCB0aGlzKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcGxheTogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgdmFyIHNvdW5kID0gdGhpcy5nZXQoa2V5KTtcclxuXHJcbiAgICB0aGlzLmFkZChzb3VuZCk7XHJcblxyXG4gICAgcmV0dXJuIHNvdW5kO1xyXG5cclxuICB9LFxyXG5cclxuICByZW1vdmU6IGZ1bmN0aW9uKHNvdW5kKSB7XHJcblxyXG4gICAgc291bmQuX3JlbW92ZSA9IHRydWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFkZDogZnVuY3Rpb24oc291bmQpIHtcclxuXHJcbiAgICBzb3VuZC5fcmVtb3ZlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHNvdW5kKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZGVsdGEpIHtcclxuXHJcbiAgICAvKiBwcm9jZXNzIHF1ZXVlICovXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc291bmQgPSB0aGlzLnF1ZXVlW2ldO1xyXG5cclxuICAgICAgc291bmQuc3RlcChkZWx0YSk7XHJcblxyXG4gICAgICBpZiAoc291bmQuX3JlbW92ZSkgdGhpcy5xdWV1ZS5zcGxpY2UoaS0tLCAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyogcHJvY2VzcyBzb3VuZHMgYmVpbmcgcGxheWVkICovXHJcblxyXG4gIH0sXHJcblxyXG4gIHZvbHVtZTogZnVuY3Rpb24odmFsdWUpIHtcclxuXHJcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xyXG5cclxuICAgICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdmFsdWU7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHN3YXBDb252b2x2ZXI6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgIHZhciBlbmdpbmUgPSB0aGlzLmVuZ2luZTtcclxuICAgIHZhciBjaGFubmVsID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgZmFpbCkge1xyXG5cclxuICAgICAgaWYgKGNoYW5uZWwuY3VycmVudENvbnZvbHZlckltcHVsc2UgPT09IGtleSkge1xyXG5cclxuICAgICAgICByZXNvbHZlKCk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBlbmdpbmUubG9hZChrZXkpLnRoZW4oZnVuY3Rpb24oYnVmZmVyKSB7XHJcbiAgICAgICAgICBjaGFubmVsLmN1cnJlbnRDb252b2x2ZXJJbXB1bHNlID0ga2V5O1xyXG4gICAgICAgICAgY2hhbm5lbC5jb252b2x2ZXJOb2RlLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlQ29udm92bGVyU3RhdGU6IGZ1bmN0aW9uKGVuYWJsZWQpIHtcclxuXHJcbiAgICB0aGlzLmNvbnZvbHZlckVuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgdGhpcy5yb3V0ZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdWJyb3V0ZTogZnVuY3Rpb24obm9kZXMpIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICBpZiAoaSA8IG5vZGVzLmxlbmd0aCAtIDEpIHtcclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcclxuICAgICAgICBub2RlLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICBub2RlLmNvbm5lY3Qobm9kZXNbaSArIDFdKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnB1dCA9IG5vZGVzWzBdO1xyXG5cclxuICB9LFxyXG5cclxuICByb3V0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYWluTm9kZS5kaXNjb25uZWN0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udm9sdmVyRW5hYmxlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udm9sdmVyRHJ5Tm9kZSk7XHJcblxyXG4gICAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb252b2x2ZXJOb2RlKTtcclxuICAgICAgdGhpcy5jb252b2x2ZXJOb2RlLmNvbm5lY3QodGhpcy5jb252b2x2ZXJXZXROb2RlKTtcclxuXHJcbiAgICAgIHRoaXMuY29udm9sdmVyV2V0Tm9kZS5jb25uZWN0KHRoaXMuZW5naW5lLmlucHV0KTtcclxuICAgICAgdGhpcy5jb252b2x2ZXJEcnlOb2RlLmNvbm5lY3QodGhpcy5lbmdpbmUuaW5wdXQpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5lbmdpbmUuaW5wdXQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0ID0gdGhpcy5nYWluTm9kZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY29udm9sdmVyOiBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XHJcblxyXG4gICAgdmFyIGVuYWJsZWQgPSB2YWx1ZSA+IDA7XHJcbiAgICB2YXIgY2hhbm5lbCA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5zd2FwQ29udm9sdmVyKGtleSkudGhlbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGlmIChlbmFibGVkICE9PSBjaGFubmVsLmNvbnZvbHZlckVuYWJsZWQpIGNoYW5uZWwudXBkYXRlQ29udm92bGVyU3RhdGUoZW5hYmxlZCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb252b2x2ZXJXZXROb2RlLmdhaW4udmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY29udm9sdmVyRHJ5Tm9kZS5nYWluLnZhbHVlID0gMSAtIHZhbHVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG59O1xyXG5Tb3VuZE9uRGVtYW5kLlNvdW5kID0gZnVuY3Rpb24oa2V5LCBjaGFubmVsKSB7XHJcblxyXG4gIHRoaXMua2V5ID0ga2V5O1xyXG4gIHRoaXMuYnVmZmVyS2V5ID0ga2V5O1xyXG5cclxuICBpZiAoY2hhbm5lbC5lbmdpbmUuYWxpYXNlc1trZXldKSB7XHJcblxyXG4gICAgdGhpcy5hbGlhcyA9IGNoYW5uZWwuZW5naW5lLmFsaWFzZXNba2V5XTtcclxuXHJcbiAgICB0aGlzLmJ1ZmZlcktleSA9IHRoaXMuYWxpYXMuc291cmNlO1xyXG5cclxuICB9XHJcblxyXG4gIGlmICghY2hhbm5lbC5lbmdpbmUuYnVmZmVyc1t0aGlzLmJ1ZmZlcktleV0pIGNoYW5uZWwuZW5naW5lLmxvYWQodGhpcy5idWZmZXJLZXkpO1xyXG5cclxuICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xyXG4gIHRoaXMuYXVkaW9Db250ZXh0ID0gdGhpcy5jaGFubmVsLmVuZ2luZS5hdWRpb0NvbnRleHQ7XHJcblxyXG4gIHRoaXMuY3VycmVudCA9IHtcclxuICAgIHZvbHVtZTogMS4wLFxyXG4gICAgcmF0ZTogMS4wXHJcbiAgfTtcclxuXHJcbiAgdGhpcy5mYWRlTW9kID0gMS4wO1xyXG5cclxuICB0aGlzLmNyZWF0ZU5vZGVzKCk7XHJcblxyXG59O1xyXG5cclxuU291bmRPbkRlbWFuZC5Tb3VuZC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBTb3VuZE9uRGVtYW5kLlNvdW5kLFxyXG5cclxuICBhbGlhczoge1xyXG4gICAgdm9sdW1lOiAxLjAsXHJcbiAgICByYXRlOiAxLjBcclxuICB9LFxyXG5cclxuICBjcmVhdGVOb2RlczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJ1ZmZlclNvdXJjZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgdmFyIGdhaW5Ob2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xyXG4gICAgdmFyIHBhbk5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVTdGVyZW9QYW5uZXIoKTtcclxuXHJcbiAgICBidWZmZXJTb3VyY2UuY29ubmVjdChwYW5Ob2RlKTtcclxuICAgIHBhbk5vZGUuY29ubmVjdChnYWluTm9kZSk7XHJcbiAgICBnYWluTm9kZS5jb25uZWN0KHRoaXMuY2hhbm5lbC5pbnB1dCk7XHJcblxyXG4gICAgdGhpcy5idWZmZXJTb3VyY2UgPSBidWZmZXJTb3VyY2U7XHJcbiAgICB0aGlzLmdhaW5Ob2RlID0gZ2Fpbk5vZGU7XHJcbiAgICB0aGlzLnBhbk5vZGUgPSBwYW5Ob2RlO1xyXG5cclxuICB9LFxyXG5cclxuICB2b2x1bWU6IGZ1bmN0aW9uKHZvbHVtZSkge1xyXG5cclxuICAgIHZvbHVtZSAqPSB0aGlzLmFsaWFzLnZvbHVtZTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnQudm9sdW1lID0gdm9sdW1lO1xyXG5cclxuICAgIHRoaXMudXBkYXRlVm9sdW1lKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVZvbHVtZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdGhpcy5jdXJyZW50LnZvbHVtZSAqIHRoaXMuZmFkZU1vZDtcclxuXHJcbiAgfSxcclxuXHJcbiAgcGFuOiBmdW5jdGlvbihwYW4pIHtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnQucGFuID0gcGFuO1xyXG5cclxuICAgIHRoaXMudXBkYXRlUGFubmluZygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYW5uaW5nOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnBhbk5vZGUucGFuLnZhbHVlID0gdGhpcy5jdXJyZW50LnBhbjtcclxuXHJcbiAgfSxcclxuXHJcbiAgbG9vcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5idWZmZXJTb3VyY2UubG9vcCA9IHRydWU7XHJcbiAgICB0aGlzLmN1cnJlbnQubG9vcCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJyYXRlOiBmdW5jdGlvbihyYW5nZSkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJhdGUodGhpcy5jdXJyZW50LnJhdGUgKyAoLTEgKyBNYXRoLnJhbmRvbSgpICogMikgKiByYW5nZSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJhdGU6IGZ1bmN0aW9uKHJhdGUpIHtcclxuXHJcbiAgICByYXRlICo9IHRoaXMuYWxpYXMucmF0ZTtcclxuXHJcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSByYXRlO1xyXG5cclxuICAgIHRoaXMuY3VycmVudC5yYXRlID0gcmF0ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgb25lbmRlZDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1cnJlbnQubG9vcCkgdGhpcy5zdG9wKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRlbHRhKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnJlYWR5KSB7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuY2hhbm5lbC5lbmdpbmUuYnVmZmVyc1t0aGlzLmJ1ZmZlcktleV0pIHJldHVybjtcclxuXHJcbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5idWZmZXIgPSB0aGlzLmNoYW5uZWwuZW5naW5lLmJ1ZmZlcnNbdGhpcy5idWZmZXJLZXldO1xyXG5cclxuICAgICAgdGhpcy5idWZmZXJTb3VyY2UuYnVmZmVyID0gdGhpcy5idWZmZXI7XHJcblxyXG4gICAgICB0aGlzLmJ1ZmZlclNvdXJjZS5zdGFydCgwKTtcclxuICAgICAgdGhpcy5idWZmZXJTb3VyY2Uub25lbmRlZCA9IHRoaXMub25lbmRlZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgICB0aGlzLmN1cnJlbnRUaW1lICs9IHRoaXMuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSAqIGRlbHRhO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZhZGVUYXJnZXQgIT09IHRoaXMuZmFkZU1vZCkge1xyXG5cclxuICAgICAgdGhpcy5mYWRlTW9kID0gU291bmRPbkRlbWFuZC5tb3ZlVG8odGhpcy5mYWRlTW9kLCB0aGlzLmZhZGVUYXJnZXQsIGRlbHRhICogdGhpcy5mYWRlU3BlZWQpO1xyXG5cclxuICAgICAgdGhpcy51cGRhdGVWb2x1bWUoKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmFkZVRhcmdldCA9PT0gMCkge1xyXG5cclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICB9LFxyXG5cclxuICBwYXVzZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5jaGFubmVsLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xyXG5cclxuICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG5cclxuICB9LFxyXG5cclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmNoYW5uZWwucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyU291cmNlLnN0b3AoMCk7XHJcblxyXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlc3VtZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVOb2RlcygpO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyU291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lICUgdGhpcy5idWZmZXIuZHVyYXRpb247XHJcbiAgICB0aGlzLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCB0aGlzLmN1cnJlbnRUaW1lKTtcclxuXHJcbiAgICB0aGlzLnJhdGUodGhpcy5jdXJyZW50LnJhdGUpO1xyXG4gICAgdGhpcy52b2x1bWUodGhpcy5jdXJyZW50LnZvbHVtZSk7XHJcbiAgICB0aGlzLmxvb3AodGhpcy5jdXJyZW50Lmxvb3ApO1xyXG5cclxuICAgIHRoaXMuY2hhbm5lbC5hZGQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZmFkZVRvOiBmdW5jdGlvbih0YXJnZXQsIGR1cmF0aW9uKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnBsYXlpbmcgJiYgdGhpcy5yZWFkeSkgdGhpcy5yZXN1bWUoKTtcclxuXHJcbiAgICBkdXJhdGlvbiA9IGR1cmF0aW9uIHx8IDEuMDtcclxuXHJcbiAgICB0aGlzLmZhZGVUaW1lID0gMDtcclxuICAgIHRoaXMuZmFkZVRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuZmFkZUR1cmF0aW9uID0gZHVyYXRpb247XHJcblxyXG4gICAgdGhpcy5mYWRlU3BlZWQgPSBNYXRoLmFicyh0YXJnZXQgLSB0aGlzLmZhZGVNb2QpIC8gZHVyYXRpb247XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH0sXHJcblxyXG4gIGZhZGVJbjogZnVuY3Rpb24oZHVyYXRpb24pIHtcclxuXHJcbiAgICBpZiAoIXRoaXMucGxheWluZyAmJiB0aGlzLnJlYWR5KSB0aGlzLnJlc3VtZSgpO1xyXG5cclxuICAgIHRoaXMuZmFkZU1vZCA9IDA7XHJcbiAgICB0aGlzLmZhZGVUbygxLjAsIGR1cmF0aW9uKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfSxcclxuXHJcbiAgZmFkZU91dDogZnVuY3Rpb24oZHVyYXRpb24pIHtcclxuXHJcbiAgICB0aGlzLmZhZGVUbygwLCBkdXJhdGlvbiB8fCAxLjApO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9LFxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuUExBWUdST1VORC5Tb3VuZE9uRGVtYW5kID0gZnVuY3Rpb24oYXBwKSB7XHJcbiAgYXBwLmF1ZGlvID0gbmV3IFNvdW5kT25EZW1hbmQoe1xyXG4gICAgYXVkaW9Db250ZXh0OiBhcHAuYXVkaW9Db250ZXh0XHJcbiAgfSk7XHJcblxyXG4gIGFwcC5hdWRpby5wYXRoID0gYXBwLmdldFBhdGgoXCJzb3VuZHNcIik7XHJcblxyXG4gIGFwcC5sb2FkU291bmRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBrZXkgPSBhcmd1bWVudHNbaV07XHJcblxyXG4gICAgICB0aGlzLmxvYWRlci5hZGQoKTtcclxuXHJcbiAgICAgIHRoaXMuYXVkaW8ubG9hZChrZXkpLnRoZW4oXHJcbiAgICAgICAgdGhpcy5sb2FkZXIuc3VjY2Vzcy5iaW5kKHRoaXMubG9hZGVyKSxcclxuICAgICAgICB0aGlzLmxvYWRlci5lcnJvci5iaW5kKHRoaXMubG9hZGVyKVxyXG4gICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbn07XHJcblxyXG5QTEFZR1JPVU5ELlNvdW5kT25EZW1hbmQucGx1Z2luID0gdHJ1ZTsiLCJFTkdJTkUgPSB7IH07IiwiRU5HSU5FLkJlbmNobWFyayA9IHtcclxuXHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLm11c2ljID0gYXBwLm11c2ljLnBsYXkoXCJnYW1lb3ZlclwiKS5mYWRlSW4oNCkubG9vcCgpO1xyXG5cclxuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcclxuXHJcbiAgICAvLyB0aGlzLmdyYWRpZW50ID0gYXBwLmxheWVyLmNyZWF0ZVJhZGlhbEdyYWRpZW50KGFwcC5jZW50ZXIueCwgYXBwLmNlbnRlci55LCAwLCBhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgYXBwLmNlbnRlci54KTtcclxuICAgIC8vIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMCwgXCJ0cmFuc3BhcmVudFwiKTtcclxuICAgIC8vIHRoaXMuZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgXCIjMDAwXCIpO1xyXG5cclxuICAgIC8vIEpJVCB3YXJtdXBcclxuICAgIHRoaXMuZGlkV2FybXVwID0gZmFsc2U7XHJcbiAgICB0aGlzLnN0ZXBzID0gMDtcclxuICAgIHRoaXMuaW90YUxpc3QgPSBbXTtcclxuICAgIHRoaXMuZnJhbWVUaW1lcyA9IFtdO1xyXG4gICAgdGhpcy5zY29yZXMgPSBbXTtcclxuICAgIHRoaXMucnVuQ291bnQgPSAwO1xyXG4gICAgdGhpcy5za2lwQ291bnQgPSAwO1xyXG4gICAgdGhpcy5za2lwUmVzZXRDb3VudCA9IDA7XHJcbiAgICB0aGlzLnJlc2V0Q291bnQgPSAwO1xyXG4gICAgdGhpcy5zY29yZVN0YWNrID0gW107XHJcbiAgICB0aGlzLmZyYW1lVGltZSA9IDAuMDtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICB9LFxyXG5cclxuXHJcbiAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgIGlmICh3aW5kb3cuZ2EpIHtcclxuICAgICAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICAgICdoaXRUeXBlJzogJ2V2ZW50JyxcclxuICAgICAgICAgICdldmVudENhdGVnb3J5JzogJ2dhbWUnLFxyXG4gICAgICAgICAgJ2V2ZW50QWN0aW9uJzogJ3N0YXJ0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm11c2ljLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgIGFwcC5zZXRTdGF0ZShFTkdJTkUuR2FtZSk7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGVudGVyOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICh3aW5kb3cuZ2EpIHtcclxuICAgICAgZ2EoJ3NlbmQnLCAnc2NyZWVudmlldycsIHtcclxuICAgICAgICAnYXBwTmFtZSc6ICdQb3dlclN1cmdlJyxcclxuICAgICAgICAnc2NyZWVuTmFtZSc6ICdTcGxhc2hwYWdlJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXJ0TW9kID0gMDtcclxuXHJcbiAgICB0aGlzLmlvdGFDb3VudCA9IHRoaXMuYXBwLmJhc2VsaW5lID8gTWF0aC5mbG9vcih0aGlzLmFwcC5iYXNlbGluZSAqIDAuNykgOiAxO1xyXG5cclxuICAgIHRoaXMuYXBwLmJhc2VsaW5lID0gMDtcclxuXHJcbiAgICB0aGlzLnJlc2V0KCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIC8vIENhbGxlZCBiZXR3ZWVuIGJlbmNobWFyayBsb29wc1xyXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RlcHMgPSAwO1xyXG4gICAgdGhpcy5mcmFtZVRpbWVzLmxlbmd0aCA9IDA7XHJcbiAgICB0aGlzLnNraXBDb3VudCA9IDA7XHJcbiAgICAvLyBKSVQgd2FybXVwIHNldHRpbmdzIChydW4gdW5ib3VuZCBsb29wcylcclxuICAgIGlmICghdGhpcy5kaWRXYXJtdXApIHtcclxuICAgICAgLy8gY29uc29sZS50aW1lKCdXYXJtdXAnKTtcclxuICAgICAgdGhpcy5hcHAudW5ib3VuZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuYXBwLmltbWlkaWF0ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hcHAudW5ib3VuZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFwcC5pbW1pZGlhdGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaW90YUxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5hZGRJb3Rhcyh0aGlzLmRpZFdhcm11cCA/IHRoaXMuaW90YUNvdW50IDogMSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmVmb3JlID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgdGhpcy5pb3RhTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGlvdGEpIHtcclxuICAgICAgaW90YS5zdGVwKGR0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZnJhbWVUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLSBiZWZvcmU7XHJcblxyXG4gICAgaWYgKCF0aGlzLmRpZFdhcm11cCkge1xyXG4gICAgICAvLyBTdGF0ZTogSklUIFdhcm11cFxyXG4gICAgICB0aGlzLnN0ZXBXYXJtVXAoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5mcmFtZVRpbWUpIHtcclxuICAgICAgLy8gU3RyZXNzdGVzdGluZ1xyXG4gICAgICB0aGlzLnN0ZXBTdHJlc3NUZXN0KClcclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcFdhcm1VcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5zdGVwcysrO1xyXG5cclxuICAgIGlmICh0aGlzLnN0ZXBzID4gMTEwMCkge1xyXG4gICAgICB0aGlzLmRpZFdhcm11cCA9IHRydWU7XHJcbiAgICAgIC8vIGNvbnNvbGUudGltZUVuZCgnV2FybXVwJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdXYXJtdXAgd2l0aCAlZCBpb3RhcycsIHRoaXMuaW90YUxpc3QubGVuZ3RoKTtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHN0ZXBTdHJlc3NUZXN0OiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBhZGQgPSAxO1xyXG4gICAgdmFyIGZyYW1lVGltZXMgPSB0aGlzLmZyYW1lVGltZXM7XHJcbiAgICB2YXIgTUFYX0ZSQU1FUyA9IDQ1O1xyXG4gICAgdmFyIE1JTl9GUkFNRVMgPSAxNTtcclxuICAgIHZhciBDT1NUID0gODtcclxuICAgIHZhciBFUlJPUiA9IDAuMjU7XHJcbiAgICB2YXIgZnJhbWVUaW1lID0gdGhpcy5mcmFtZVRpbWU7XHJcbiAgICBpZiAoZnJhbWVUaW1lcy51bnNoaWZ0KGZyYW1lVGltZSkgPiBNQVhfRlJBTUVTKSB7XHJcbiAgICAgIGZyYW1lVGltZXMubGVuZ3RoID0gTUFYX0ZSQU1FUztcclxuICAgIH1cclxuICAgIGlmIChmcmFtZVRpbWVzLmxlbmd0aCA+PSBNSU5fRlJBTUVTKSB7XHJcbiAgICAgIHZhciBzYW1wbGUgPSB0aGlzLmFuYWx5emUoZnJhbWVUaW1lcyk7XHJcbiAgICAgIHZhciBzY29yZSA9IHRoaXMuaW90YUxpc3QubGVuZ3RoO1xyXG4gICAgICBpZiAoc2FtcGxlLnJzZSA8PSBFUlJPUiAmJiBzYW1wbGUubWVhbiA+IENPU1QpIHtcclxuICAgICAgICB0aGlzLnB1c2hTY29yZShzY29yZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzYW1wbGUucnNlID4gRVJST1IgfHwgc2FtcGxlLm1lYW4gPiBDT1NUKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1NraXAgIycgKyB0aGlzLnNraXBDb3VudCk7XHJcbiAgICAgICAgdGhpcy5za2lwQ291bnQrKztcclxuICAgICAgICBpZiAodGhpcy5za2lwQ291bnQgPiA2MCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICdbUkVTRVQgU1RFUF0gSGlnaCBzYW1wbGluZyBlcnJvciAlZiUlIG9yIG1lYW4gJWZtcyBmb3IgJWQgZW50aXRpZXMuJyxcclxuICAgICAgICAgICAgc2FtcGxlLnJzZSAqIDEwMCwgc2FtcGxlLm1lYW4sIHNjb3JlXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy5pb3RhQ291bnQgPSBNYXRoLmZsb29yKHRoaXMubGFzdFNjb3JlICogMC43KTtcclxuICAgICAgICAgIHRoaXMuc2tpcFJlc2V0Q291bnQrKztcclxuICAgICAgICAgIGlmICh0aGlzLnNraXBSZXNldENvdW50ID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5maW5hbGl6ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZmluYWxpemUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNraXBDb3VudCA9IDA7XHJcbiAgICAgIGFkZCA9IE1hdGgucm91bmQoQ09TVCAvIHNhbXBsZS5tZWFuKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZElvdGFzKGFkZCk7XHJcbiAgfSxcclxuXHJcbiAgcHVzaFNjb3JlOiBmdW5jdGlvbihzY29yZSkge1xyXG4gICAgdmFyIFNBVkVfU0NPUkVTID0gMztcclxuICAgIHZhciBNSU5fU0NPUkVTID0gNTtcclxuICAgIHZhciBNQVhfU0NPUkVTID0gMTA7XHJcbiAgICB2YXIgRVJST1IgPSAwLjE1O1xyXG5cclxuICAgIHRoaXMuc2tpcFJlc2V0Q291bnQgPSAwO1xyXG4gICAgdmFyIHNjb3JlcyA9IHRoaXMuc2NvcmVzO1xyXG4gICAgdGhpcy5ydW5Db3VudCsrO1xyXG4gICAgaWYgKHNjb3Jlcy51bnNoaWZ0KHNjb3JlKSA+IE1BWF9TQ09SRVMpIHtcclxuICAgICAgc2NvcmVzLmxlbmd0aCA9IE1BWF9TQ09SRVM7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlvdGFDb3VudCA9IE1hdGguY2VpbChzY29yZSAqIDAuNyk7XHJcbiAgICB2YXIgbCA9IHNjb3Jlcy5sZW5ndGg7XHJcbiAgICBpZiAobCA+PSBNSU5fU0NPUkVTKSB7XHJcbiAgICAgIHZhciBzYW1wbGUgPSB0aGlzLmFuYWx5emUoc2NvcmVzKTtcclxuICAgICAgaWYgKHNhbXBsZS5yc2UgPCBFUlJPUikge1xyXG4gICAgICAgIHRoaXMucmVzZXRDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5hcHAuYmFzZWxpbmUgPSBNYXRoLnJvdW5kKHNhbXBsZS5tZWFuKTtcclxuICAgICAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgICAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxyXG4gICAgICAgICAgICAnZXZlbnRDYXRlZ29yeSc6ICdnYW1lJyxcclxuICAgICAgICAgICAgJ2V2ZW50QWN0aW9uJzogJ2Jhc2VsaW5lZCcsXHJcbiAgICAgICAgICAgICdldmVudFZhbHVlJzogdGhpcy5hcHAuYmFzZWxpbmUsXHJcbiAgICAgICAgICAgICdub25JbnRlcmFjdGlvbic6IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFwcC5iYXNlbGluZUVyciA9IHNhbXBsZS5yc2U7XHJcbiAgICAgICAgdGhpcy5zY29yZXMuc3BsaWNlKFNBVkVfU0NPUkVTKTtcclxuICAgICAgICB0aGlzLmZpbmFsaXplKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAnW1NDT1JFIFJFU0VUXSBTdGFuZGFyZCBlcnJvciAlZiUlIHRvbyBoaWdoIGluIHNjb3JlIHNhbXBsZXMuJyxcclxuICAgICAgICAgIHNhbXBsZS5yc2UgKiAxMDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucmVzZXRDb3VudCsrO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2V0Q291bnQgPiAxMCkge1xyXG4gICAgICAgICAgdGhpcy5zY29yZXMuc3BsaWNlKDApO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1tCQUlMXSBUb28gbWFueSBbUkVTRVQgU0NPUkVdLicpO1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICAgICAgICBnYSgnc2VuZCcsICdleGNlcHRpb24nLCB7XHJcbiAgICAgICAgICAgICAgJ2V4RGVzY3JpcHRpb24nOiAnQmVuY2htYXJrUmVzZXRPdmVyZmxvdycsXHJcbiAgICAgICAgICAgICAgJ2V4RmF0YWwnOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZmluYWxpemUoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5maW5hbGl6ZSh0cnVlKTtcclxuICB9LFxyXG5cclxuICBmaW5hbGl6ZTogZnVuY3Rpb24ocmVzdGFydCkge1xyXG5cclxuICAgIGlmICghcmVzdGFydCkge1xyXG4gICAgICAvLyBSZW1vdmUgaW90YXNcclxuICAgICAgdGhpcy5pb3RhQ291bnQgPSAwO1xyXG4gICAgICB0aGlzLnJ1bkNvdW50ID0gMDtcclxuICAgICAgLy8gUmVzZXQgYmVuY2htYXJrIGVuZ2luZSBzZXR0aW5nc1xyXG4gICAgICB0aGlzLmFwcC51bmJvdW5kID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYXBwLmltbWlkaWF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gUmVkdWNlIGlvdGFMaXN0IHRvIGlvdGFDb3VudFxyXG4gICAgdGhpcy5pb3RhTGlzdC5zcGxpY2UodGhpcy5pb3RhQ291bnQpLmZvckVhY2goZnVuY3Rpb24oaW90YSkge1xyXG4gICAgICBpb3RhLmRlc3Ryb3koKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3RhcnQpIHtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgJ2hpdFR5cGUnOiAndGltaW5nJyxcclxuICAgICAgICAgICd0aW1pbmdDYXRlZ29yeSc6ICdCZW5jaG1hcmsnLFxyXG4gICAgICAgICAgJ3RpbWluZ1Zhcic6ICdMb2FkaW5nJyxcclxuICAgICAgICAgICd0aW1pbmdWYWx1ZSc6IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gICAgICBhcHAudHdlZW4odGhpcykudG8oe1xyXG4gICAgICAgIHN0YXJ0TW9kOiAxLjBcclxuICAgICAgfSwgMS4wLCBcIm91dEVsYXN0aWNcIik7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGFkZElvdGFzOiBmdW5jdGlvbihjb3VudCkge1xyXG5cclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG5cclxuICAgICAgdGhpcy5pb3RhTGlzdC5wdXNoKG5ldyBJb3RhKHRoaXMuYXBwLCB0aGlzKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8qIGdldCByZWZlcmVuY2UgdG8gdGhlIGFwcGxpY2F0aW9uICovXHJcblxyXG4gICAgdmFyIGFwcCA9IHRoaXMuYXBwO1xyXG5cclxuICAgIC8qIGdldCByZWZlcmVuY2UgdG8gZHJhd2luZyBzdXJmYWNlICovXHJcblxyXG4gICAgdmFyIGxheWVyID0gdGhpcy5hcHAubGF5ZXI7XHJcblxyXG4gICAgLyogY2xlYXIgc2NyZWVuICovXHJcblxyXG4gICAgbGF5ZXIuY2xlYXIoXCIjMjgyMjQ1XCIpO1xyXG5cclxuXHJcbiAgICBsYXllci5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcGxhc2gsIGFwcC5jZW50ZXIueCAtIGFwcC5pbWFnZXMuc3BsYXNoLndpZHRoIC8gMiB8IDAsIGFwcC5jZW50ZXIueSAtIGFwcC5pbWFnZXMuc3BsYXNoLmhlaWdodCAvIDIgfCAwKVxyXG5cclxuICAgIGxheWVyLnNhdmUoKTtcclxuICAgIGxheWVyLnRyYW5zbGF0ZSg2MDAsIDI5MCk7XHJcblxyXG4gICAgbGF5ZXIuYWxpZ24oMC41LCAwLjUpO1xyXG4gICAgbGF5ZXIuc2NhbGUoNCwgNCk7XHJcbiAgICBsYXllci5nbG9iYWxBbHBoYSgwLjQpO1xyXG4gICAgbGF5ZXIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKFwibGlnaHRlclwiKTtcclxuICAgIGxheWVyLmRyYXdJbWFnZShhcHAuaW1hZ2VzLmZsYXJlLCAxMjggKiAoMzIgKiAoYXBwLmxpZmV0aW1lICUgMS41IC8gMS41KSB8IDApLCAwLCAxMjgsIDEyOCwgMCwgMCwgMTI4LCAxMjgpO1xyXG4gICAgbGF5ZXIucmVzdG9yZSgpO1xyXG5cclxuXHJcbiAgICBhcHAuZm9udFNpemUoNDgpO1xyXG5cclxuXHJcblxyXG4gICAgaWYgKCF0aGlzLnJlYWR5KSB7XHJcbiAgICAgIHZhciB0ZXh0WCA9IGFwcC5jZW50ZXIueDtcclxuICAgICAgdmFyIHRleHRZID0gYXBwLmNlbnRlci55IC0gMTY7XHJcblxyXG4gICAgICBsYXllci5maWxsU3R5bGUoXCJyZ2JhKDAsMCwwLDAuNVwiKS5maWxsUmVjdCgwLCB0ZXh0WSAtIDU0LCBhcHAud2lkdGgsIDc0KTtcclxuXHJcbiAgICAgIGxheWVyLmZpbGxTdHlsZShcIiMwMDBcIikudGV4dEFsaWduKFwiY2VudGVyXCIpLmZpbGxUZXh0KFwiTE9BRElORy4uLiBwbGVhc2Ugd2FpdFwiLCB0ZXh0WCwgdGV4dFkgLSA0KTtcclxuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiI2ZmZlwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJMT0FESU5HLi4uIHBsZWFzZSB3YWl0XCIsIHRleHRYLCB0ZXh0WSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHZhciB0ZXh0WCA9IGFwcC5jZW50ZXIueCArIDEwMCArICgxIC0gdGhpcy5zdGFydE1vZCkgKiAxMDAwO1xyXG4gICAgICB2YXIgdGV4dFkgPSBhcHAuY2VudGVyLnkgLSAxMDtcclxuXHJcbiAgICAgIGxheWVyLmEoMC41ICsgVXRpbHMub3NjKGFwcC5saWZldGltZSwgMSkgKiAwLjUpO1xyXG4gICAgICBsYXllci5maWxsU3R5bGUoXCIjMDAwXCIpLnRleHRBbGlnbihcImNlbnRlclwiKS5maWxsVGV4dChcIkNMSUNLIFRPIFNUQVJUIVwiLCB0ZXh0WCwgdGV4dFkgLSA0KTtcclxuICAgICAgbGF5ZXIuZmlsbFN0eWxlKFwiI2ZhMFwiKS50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZmlsbFRleHQoXCJDTElDSyBUTyBTVEFSVCFcIiwgdGV4dFgsIHRleHRZKTtcclxuICAgICAgbGF5ZXIuYSgxLjApO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdyYWRpZW50O1xyXG4gICAgLy8gYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xyXG5cclxuICAgIC8vIHRoaXMuaW90YUxpc3QuZm9yRWFjaChmdW5jdGlvbihpb3RhKSB7XHJcbiAgICAvLyAgIGlvdGEucmVuZGVyKGxheWVyKTtcclxuICAgIC8vIH0pO1xyXG5cclxuICAgIC8vIGxheWVyXHJcbiAgICAvLyAgIC5maWxsU3R5bGUoJyNmZmYnKVxyXG4gICAgLy8gICAuZm9udChcIjE0cHggJ2FyaWFsJ1wiKVxyXG4gICAgLy8gICAuZmlsbFRleHQoJ1N0cmVzcyB0ZXN0ICMnICsgdGhpcy5ydW5Db3VudCwgNSwgMTUpXHJcbiAgICAvLyAgIC5maWxsVGV4dCgnRW50aXRpZXM6ICcgKyB0aGlzLmlvdGFMaXN0Lmxlbmd0aCwgNSwgMzApXHJcbiAgICAvLyAgIC5maWxsVGV4dCgnRnJhbWV0aW1lOicgKyB0aGlzLmZyYW1lVGltZS50b0ZpeGVkKDEpLCA1LCA0NSk7XHJcbiAgfSxcclxuXHJcbiAgYW5hbHl6ZTogZnVuY3Rpb24ocG9wdWxhdGlvbikge1xyXG5cclxuICAgIHZhciBsID0gcG9wdWxhdGlvbi5sZW5ndGg7XHJcbiAgICB2YXIgc3VtID0gMC4wO1xyXG4gICAgdmFyIHN1bXNxID0gMC4wO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcclxuICAgICAgc3VtICs9IHBvcHVsYXRpb25baV07XHJcbiAgICAgIHN1bXNxICs9IHBvcHVsYXRpb25baV0gKiBwb3B1bGF0aW9uW2ldO1xyXG4gICAgfVxyXG4gICAgdmFyIG1lYW4gPSBzdW0gLyBsO1xyXG4gICAgdmFyIHNkID0gTWF0aC5zcXJ0KHN1bXNxIC8gbCAtIHN1bSAqIHN1bSAvIChsICogbCkpO1xyXG4gICAgdmFyIHNlID0gc2QgLyBNYXRoLnNxcnQobCk7XHJcbiAgICAvLyBzdGFuZGFyZCBlcnJvciBhdCA5NSUgY29uZmlkZW5jZVxyXG4gICAgdmFyIHNlOTUgPSAxLjk2ICogc2U7XHJcbiAgICB2YXIgcnNlID0gc2UgLyBtZWFuO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVhbjogbWVhbixcclxuICAgICAgc2Q6IHNkLFxyXG4gICAgICBzZTogc2UsXHJcbiAgICAgIHNlOTU6IHNlOTUsXHJcbiAgICAgIHJzZTogcnNlXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIG5lYXJlc3Q6IGZ1bmN0aW9uKGZyb20sIGVudGl0aWVzKSB7XHJcblxyXG4gICAgdmFyIG1pbiA9IC0xO1xyXG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHRvID0gZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoZnJvbSA9PT0gdG8pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZShmcm9tLCB0byk7XHJcblxyXG4gICAgICBpZiAoZGlzdGFuY2UgPCBtaW4gfHwgbWluIDwgMCkge1xyXG4gICAgICAgIG1pbiA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHJlc3VsdCA9IHRvO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgZGlzdGFuY2U6IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHJcbiAgICB2YXIgZHggPSBhLnggLSBiLng7XHJcbiAgICB2YXIgZHkgPSBhLnkgLSBiLnk7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblxyXG4gIH1cclxufTtcclxuXHJcbnZhciBpbWFnZXMgPSBbJ2ZpcmVmb3gnLCAnZmlyZWZveF9iZXRhJywgJ2ZpcmVmb3hfZGV2ZWxvcGVyX2VkaXRpb24nLCAnZmlyZWZveF9uaWdodGx5J107XHJcblxyXG5mdW5jdGlvbiBJb3RhKGFwcCwgcGFyZW50KSB7XHJcbiAgdGhpcy54ID0gMC4wO1xyXG4gIHRoaXMueSA9IDAuMDtcclxuICB0aGlzLnZ4ID0gMC4wO1xyXG4gIHRoaXMudnkgPSAwLjA7XHJcbiAgdGhpcy52ciA9IDAuMDtcclxuICB0aGlzLmFscGhhID0gMC4wO1xyXG4gIHRoaXMuYW5nbGUgPSAwLjA7XHJcbiAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgdGhpcy54ID0gTWF0aC5yYW5kb20oKSAqIGFwcC53aWR0aDtcclxuICB0aGlzLnkgPSBNYXRoLnJhbmRvbSgpICogYXBwLmhlaWdodDtcclxuICB0aGlzLm1heFZlbCA9IDEwMC4wO1xyXG4gIHRoaXMubWF4VG9ycSA9IE1hdGguUEkgKiAxMDtcclxuICB0aGlzLnZ4ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMubWF4VmVsICogMiAtIHRoaXMubWF4VmVsO1xyXG4gIHRoaXMudnkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5tYXhWZWwgKiAyIC0gdGhpcy5tYXhWZWw7XHJcbiAgdGhpcy52ciA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLm1heFRvcnEgKiAyIC0gdGhpcy5tYXhUb3JxO1xyXG4gIHRoaXMuaW1hZ2UgPSBhcHAuaW1hZ2VzW2ltYWdlc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKV1dO1xyXG4gIHRoaXMucmVnaW9uID0gVXRpbHMucmFuZG9tKFtcclxuICAgIFs1NDgsIDg4LCA0NiwgNDddLFxyXG4gICAgWzU0NCwgMTQyLCA0NiwgNDhdLFxyXG4gICAgWzU0NCwgMjAwLCA0NiwgNDddLFxyXG4gICAgWzU0NSwgMjUzLCA0NCwgNDhdXHJcbiAgXSk7XHJcbiAgdGhpcy5tYXhGb3JjZSA9IDEwMC4wO1xyXG4gIHRoaXMuYWxwaGEgPSAwLjIgKyBNYXRoLnJhbmRvbSgpICogMC44O1xyXG4gIHRoaXMuYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSTtcclxufVxyXG5cclxuSW90YS5wcm90b3R5cGUgPSB7XHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgYXBwLnN0YXRlLm5lYXJlc3QodGhpcywgdGhpcy5wYXJlbnQuaW90YUxpc3QpO1xyXG5cclxuICAgIHZhciBpb3RhTGlzdCA9IHRoaXMucGFyZW50LmlvdGFMaXN0O1xyXG4gICAgdmFyIGZvcmNleCA9IDAuMDtcclxuICAgIHZhciBmb3JjZXkgPSAwLjA7XHJcbiAgICB2YXIgZm9yY2VzID0gMDtcclxuICAgIHZhciBtYXhEaXN0ID0gNjAuMDtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW90YUxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgIHZhciBkaXN0eCA9ICh0aGlzLnggLSBpb3RhTGlzdFtpXS54KSAvIG1heERpc3Q7XHJcbiAgICAgIHZhciBkaXN0eSA9ICh0aGlzLnkgLSBpb3RhTGlzdFtpXS55KSAvIG1heERpc3Q7XHJcbiAgICAgIHZhciBzaWdueCA9IE1hdGguc2lnbihkaXN0eCk7XHJcbiAgICAgIHZhciBzaWdueSA9IE1hdGguc2lnbihkaXN0eSk7XHJcbiAgICAgIHZhciBhYnN4ID0gTWF0aC5hYnMoZGlzdHgpO1xyXG4gICAgICB2YXIgYWJzeSA9IE1hdGguYWJzKGRpc3R5KTtcclxuICAgICAgaWYgKGFic3ggPCAxICYmIGFic3kgPCAxKSB7XHJcbiAgICAgICAgZm9yY2V4ICs9IHNpZ254ICsgYWJzeCAqIHNpZ254O1xyXG4gICAgICAgIGZvcmNleSArPSBzaWdueSArIGFic3kgKiBzaWdueTtcclxuICAgICAgICBmb3JjZXMrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChmb3JjZXMgPT0gMCkge1xyXG4gICAgICBmb3JjZXMgPSAxO1xyXG4gICAgfVxyXG4gICAgZm9yY2V4ID0gTWF0aC5tYXgoLXRoaXMubWF4Rm9yY2UsIE1hdGgubWluKHRoaXMubWF4Rm9yY2UsIGZvcmNleCAvIGZvcmNlcykpICogNTAwO1xyXG4gICAgZm9yY2V5ID0gTWF0aC5tYXgoLXRoaXMubWF4Rm9yY2UsIE1hdGgubWluKHRoaXMubWF4Rm9yY2UsIGZvcmNleSAvIGZvcmNlcykpICogNTAwO1xyXG4gICAgdGhpcy52eCA9IHRoaXMudnggKiAwLjk5ICsgZm9yY2V4ICogMC4wMTtcclxuICAgIHRoaXMudnkgPSB0aGlzLnZ5ICogMC45OSArIGZvcmNleSAqIDAuMDE7XHJcblxyXG4gICAgdmFyIHggPSB0aGlzLnggKyB0aGlzLnZ4ICogZHQ7XHJcbiAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuYXBwLndpZHRoKSB7XHJcbiAgICAgIHggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5hcHAud2lkdGg7XHJcbiAgICB9XHJcbiAgICB0aGlzLnggPSB4O1xyXG5cclxuICAgIHZhciB5ID0gdGhpcy55ICsgdGhpcy52eSAqIGR0O1xyXG4gICAgaWYgKHkgPCAwIHx8IHkgPiB0aGlzLmFwcC5oZWlnaHQpIHtcclxuICAgICAgeSA9IE1hdGgucmFuZG9tKCkgKiB0aGlzLmFwcC5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgdGhpcy5hbmdsZSArPSB0aGlzLnZyICogZHQ7XHJcbiAgfSxcclxuXHJcbiAgLy8gcmVuZGVyOiBmdW5jdGlvbihsYXllcikge1xyXG5cclxuICAvLyAgIHJldHVybjtcclxuXHJcbiAgLy8gICBsYXllci5jb250ZXh0LnNhdmUoKTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQudHJhbnNsYXRlKHRoaXMueCB8IDAsIHRoaXMueSB8IDApO1xyXG4gIC8vICAgLy8gbGF5ZXIuYSh0aGlzLmFscGhhKTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjZjAwXCI7XHJcbiAgLy8gICBsYXllci5jb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCA2NCwgNjQpO1xyXG4gIC8vICAgbGF5ZXIuY29udGV4dC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAvLyAgIGxheWVyLmNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgLy8gICBsYXllci5jb250ZXh0Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XHJcbiAgLy8gICBsYXllci5jb250ZXh0LmFyYyh0aGlzLngsIHRoaXMueSwgNjQsIDAsIE1hdGguUEkgKiAyKTtcclxuICAvLyAgIGxheWVyLmNvbnRleHQucm90YXRlKHRoaXMuYW5nbGUpO1xyXG4gIC8vICAgbGF5ZXIuZHJhd1JlZ2lvbihhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnJlZ2lvbiwgMCwgMCk7XHJcbiAgLy8gICBsYXllci5jb250ZXh0LnJlc3RvcmUoKTtcclxuICAvLyB9LFxyXG5cclxuICBkZXN0cm95OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYXBwID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB9XHJcblxyXG59IiwiRU5HSU5FLkJhY2tncm91bmRTdGFycyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICB0aGlzLmNvbG9yID0gXCIjMGFmXCI7XHJcblxyXG4gIHRoaXMuY291bnQgPSBNYXRoLm1heChhcHAuaGVpZ2h0LCBhcHAud2lkdGgpIC8gMTYgfCAwO1xyXG5cclxuICB0aGlzLnggPSAwO1xyXG4gIHRoaXMueSA9IDA7XHJcblxyXG4gIHRoaXMucG9wdWxhdGVkID0gZmFsc2U7XHJcbiAgdGhpcy5pbWFnZSA9IGFwcC5nZXRDb2xvcmVkSW1hZ2UoYXBwLmltYWdlcy5wYXJ0aWNsZXMsIHRoaXMuY29sb3IpO1xyXG5cclxufTtcclxuXHJcbkVOR0lORS5CYWNrZ3JvdW5kU3RhcnMucHJvdG90eXBlID0ge1xyXG5cclxuICBpbWFnZXM6IHt9LFxyXG5cclxuICBjb2xvcnM6IFtcIiNhZmNcIiwgXCIjZmEwXCJdLFxyXG5cclxuICBzcHJpdGVzOiBbXHJcbiAgICBbMCwgMTMsIDUsIDVdLFxyXG4gICAgWzEsIDE5LCAzLCAzXVxyXG4gIF0sXHJcblxyXG4gIHF1b3RhOiAwLjUsXHJcblxyXG4gIHBvcHVsYXRlOiBmdW5jdGlvbihmaWxsKSB7XHJcblxyXG4gICAgdGhpcy5zdGFycyA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc3Bhd25TdGFyKGZpbGwpO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzcGF3blN0YXI6IGZ1bmN0aW9uKGZpbGwpIHtcclxuXHJcbiAgICB2YXIgc3RhciA9IHtcclxuICAgICAgeDogTWF0aC5yYW5kb20oKSAqIGFwcC53aWR0aCxcclxuICAgICAgeTogTWF0aC5yYW5kb20oKSAqIGFwcC5oZWlnaHQsXHJcbiAgICAgIHo6IDAuMSArIDAuOSAqIE1hdGgucmFuZG9tKCksXHJcbiAgICAgIHM6IFV0aWxzLnJhbmRvbShbMSwgMiwgM10pLFxyXG4gICAgICBzcHJpdGVJbmRleDogTWF0aC5yYW5kb20oKSAqIHRoaXMuc3ByaXRlcy5sZW5ndGggfCAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXIubHggPSBzdGFyLng7XHJcbiAgICBzdGFyLmx5ID0gc3Rhci55O1xyXG5cclxuICAgIHRoaXMuc3RhcnMucHVzaChzdGFyKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgd3JhcDogZnVuY3Rpb24oc3Rhcikge1xyXG5cclxuICAgIGlmIChzdGFyLnggPiBhcHAud2lkdGgpIHN0YXIueCA9IDA7XHJcbiAgICBpZiAoc3Rhci55ID4gYXBwLmhlaWdodCkgc3Rhci55ID0gMDtcclxuXHJcbiAgICBpZiAoc3Rhci54IDwgMCkgc3Rhci54ID0gYXBwLndpZHRoO1xyXG4gICAgaWYgKHN0YXIueSA8IDApIHN0YXIueSA9IGFwcC5oZWlnaHQ7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnBvcHVsYXRlZCkge1xyXG4gICAgICB0aGlzLnBvcHVsYXRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMucG9wdWxhdGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRpZmZYID0gKDEwICsgYXBwLmdhbWUuc2NvcmUpICogZHQ7XHJcbiAgICB2YXIgZGlmZlkgPSAoMTAgKyBhcHAuZ2FtZS5zY29yZSkgKiBkdDtcclxuXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XHJcblxyXG4gICAgICB0aGlzLndyYXAoc3Rhcik7XHJcblxyXG4gICAgICBzdGFyLnggKz0gZGlmZlggKiBzdGFyLno7XHJcbiAgICAgIHN0YXIueSArPSBkaWZmWSAqIHN0YXIuejtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oZHQpIHtcclxuXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN0YXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XHJcblxyXG4gICAgICB2YXIgc3ByaXRlID0gdGhpcy5zcHJpdGVzW3N0YXIuc3ByaXRlSW5kZXhdO1xyXG5cclxuICAgICAgYXBwLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgc3ByaXRlWzBdLCBzcHJpdGVbMV0sIHNwcml0ZVsyXSwgc3ByaXRlWzNdLFxyXG4gICAgICAgIHN0YXIueCwgc3Rhci55LCBzcHJpdGVbMl0sIHNwcml0ZVszXSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG5cclxuICAgIGF0dGFjaGVkVG86IGZhbHNlLFxyXG4gICAgcmFkaXVzOiAwLFxyXG4gICAgYWxwaGE6IDEuMCxcclxuICAgIGR1cmF0aW9uOiAwLjVcclxuXHJcbiAgfSwgYXJncyk7XHJcblxyXG4gIHRoaXMucmFkaXVzID0gMDtcclxuXHJcbiAgdGhpcy50d2VlbiA9IGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKCkudG8oe1xyXG4gICAgcmFkaXVzOiBhcmdzLnJhZGl1c1xyXG4gIH0sIHRoaXMuZHVyYXRpb24sIFwib3V0RWxhc3RpY1wiKS50byh7XHJcbiAgICByYWRpdXM6IDBcclxuICB9LCB0aGlzLmR1cmF0aW9uLCBcIm91dEVsYXN0aWNcIik7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLkNpcmNsZUV4cGxvc2lvbi5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLFxyXG5cclxuICB0eXBlOiBcImNpcmNsZUV4cGxvc2lvblwiLFxyXG5cclxuICBhY3Rpb246IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC5zb3VuZC5wbGF5KFwibGFzZXJcIik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmKHRoaXMuYXR0YWNoZWRUbykge1xyXG4gICAgICB0aGlzLnggPSB0aGlzLmF0dGFjaGVkVG8ueDtcclxuICAgICAgdGhpcy55ID0gdGhpcy5hdHRhY2hlZFRvLnk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHdlZW4uZmluaXNoZWQpIHRoaXMuZGVhZCA9IHRydWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMucmFkaXVzID4gMCkge1xyXG4gICAgICBcclxuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgYXBwLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgICBhcHAuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwibGlnaHRlclwiO1xyXG4gICAgICBhcHAuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcclxuICAgICAgYXBwLmN0eC5maWxsKCk7XHJcbiAgICAgIGFwcC5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLlNoaXAgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgZGFtYWdlOiAxLFxyXG4gICAgZmlyZXJhdGU6IDAuNSxcclxuICAgIHNwZWVkOiAxNjAsXHJcbiAgICByYWRpdXM6IDE2LFxyXG4gICAgcm90YXRpb25TcGVlZDogNSxcclxuICAgIGhwOiAxMCxcclxuICAgIHJhbmdlOiAyMDAsXHJcbiAgICBmb3JjZTogMCxcclxuICAgIGZvcmNlRGlyZWN0aW9uOiAwLFxyXG4gICAgdGFyZ2V0VGltZW91dDogMCxcclxuICAgIGhpdExpZmVzcGFuOiAwLFxyXG4gICAgc2NhbGU6IDEuMCxcclxuICAgIHJhbms6IDAsXHJcbiAgICBraWxsczogMFxyXG5cclxuICB9LCBkZWZzLnNoaXBzW2FyZ3MudHlwZV0sIGFyZ3MpO1xyXG5cclxuICB0aGlzLnJhbmRvbSA9IHRoaXMuZ2FtZS5yYW5kb20oKTtcclxuXHJcbiAgdGhpcy5tYXhIcCA9IHRoaXMuaHA7XHJcblxyXG4gIHRoaXMubGlmZXRpbWUgPSB0aGlzLmdhbWUucmFuZG9tKCkgKiAxMDtcclxuICB0aGlzLmNvb2xkb3duID0gdGhpcy5maXJlcmF0ZTtcclxuICB0aGlzLmRlc2lyZWREaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuZ2FtZS5yYW5kb20oKSAqIDY7XHJcblxyXG4gIHRoaXMuY29sb3IgPSBkZWZzLnRlYW1Db2xvclt0aGlzLnRlYW1dO1xyXG5cclxuICB0aGlzLmltYWdlID0gYXBwLmltYWdlcy5zcHJpdGVzaGVldDtcclxuXHJcbiAgaWYgKHRoaXMudGVhbSkgdGhpcy5hcHBseVVwZ3JhZGVzKHRoaXMuZ2FtZS51cGdyYWRlcyk7XHJcbiAgZWxzZSB0aGlzLmFwcGx5RGlmZmljdWx0eSgpO1xyXG5cclxufTtcclxuXHJcbkVOR0lORS5TaGlwLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5TaGlwLFxyXG5cclxuICBob3ZlcmFibGU6IHRydWUsXHJcblxyXG4gIGZyb3plblNwcml0ZTogWzE5MywgODYsIDExLCAxOV0sXHJcblxyXG4gIHF1b3RhOiAyLFxyXG5cclxuICBwb2ludGVyZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMucmVwYWlyKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJhbmtzOiBbXHJcbiAgICBbMzE4LCAxMzEsIDEwLCA1XSxcclxuICAgIFszMzMsIDEzMSwgMTAsIDEwXSxcclxuICAgIFszNDgsIDEzMSwgMTAsIDE1XSxcclxuICAgIFszNjAsIDEzMSwgMTAsIDhdLFxyXG4gICAgWzM3MiwgMTMxLCAxMCwgMTNdLFxyXG4gICAgWzM4NCwgMTMxLCAxMCwgMThdLFxyXG4gICAgWzM5NiwgMTMxLCAxNSwgMTZdXHJcbiAgXSxcclxuXHJcbiAgYXBwbHlEaWZmaWN1bHR5OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgZGlmZmljdWx0eSA9IHRoaXMuZ2FtZS53YXZlIC8gMzA7XHJcblxyXG4gICAgdGhpcy5zcGVlZCAqPSAxICsgZGlmZmljdWx0eTtcclxuICAgIHRoaXMuZGFtYWdlICo9IDEgKyBkaWZmaWN1bHR5O1xyXG5cclxuICB9LFxyXG5cclxuICBhcHBseVVwZ3JhZGVzOiBmdW5jdGlvbih1cGdyYWRlcykge1xyXG5cclxuICAgIHZhciBocG1vZCA9IHRoaXMuaHAgLyB0aGlzLm1heEhwO1xyXG5cclxuICAgIHRoaXMuZGFtYWdlID0gMSArIHVwZ3JhZGVzLmRhbWFnZSAqIDAuMjU7XHJcbiAgICB0aGlzLm1heEhwID0gdXBncmFkZXMubGlmZSAqIDEwO1xyXG4gICAgdGhpcy5ocCA9IGhwbW9kICogdGhpcy5tYXhIcDtcclxuICAgIHRoaXMuc3BlZWQgPSA4MCArIDEwICogdXBncmFkZXMuc3BlZWQ7XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmZyZWUpIHtcclxuICAgICAgdGhpcy5kYW1hZ2UgKj0gMjtcclxuICAgICAgdGhpcy5tYXhIcCAqPSAyO1xyXG4gICAgICB0aGlzLmhwICo9IDI7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGRpZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRlYW0pIHRoaXMuZ2FtZS5zY29yZSsrO1xyXG5cclxuICAgIGlmICh0aGlzLmdhbWUuYmVuY2htYXJrKSB7XHJcblxyXG4gICAgICB0aGlzLmhwID0gdGhpcy5tYXhIcDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgdGhpcy5kZWFkID0gdHJ1ZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYm9zcykge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnNoYWtlKCk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUmVzb3VyY2UsIHtcclxuICAgICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICAgIHk6IHRoaXMueVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCAxNiwgdGhpcy5jb2xvcik7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUmVzb3VyY2UsIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHBhcmVudDogdGhpc1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHRoaXMucGxhbmV0KSB0aGlzLnBsYW5ldC5zaGlwcy0tO1xyXG5cclxuICAgIGlmICghdGhpcy50ZWFtKSB0aGlzLmdhbWUub25lbmVteWRlYXRoKHRoaXMpO1xyXG5cclxuICAgIGFwcC5zb3VuZC5wbGF5KFwiZXhwbG9zaW9uXCIpLnJyYXRlKDAuMik7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFwcGx5RGFtYWdlOiBmdW5jdGlvbihkYW1hZ2UsIGF0dGFja2VyKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZGVhZCkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuaGl0TGlmZXNwYW4gPSAwLjE7XHJcblxyXG4gICAgdGhpcy5ocCAtPSBkYW1hZ2U7XHJcblxyXG4gICAgaWYgKHRoaXMuaHAgPD0gMCkge1xyXG4gICAgICB0aGlzLmRpZSgpO1xyXG4gICAgICBpZiAoYXR0YWNrZXIpIGF0dGFja2VyLm9uc2NvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCAzLCB0aGlzLmNvbG9yKTtcclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgZHQgKj0gdGhpcy5nYW1lLnRpbWVGYWN0b3I7XHJcblxyXG4gICAgLy8gaWYgKCF0aGlzLnRlYW0pIGR0ICo9IE1hdGguc2luKChhcHAubGlmZXRpbWUgJSAyIC8gMikgKiBNYXRoLlBJKTtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xyXG5cclxuICAgIGlmICgodGhpcy50YXJnZXRUaW1lb3V0IC09IGR0KSA8PSAwKSB7XHJcblxyXG4gICAgICB0aGlzLnRhcmdldCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnRhcmdldFRpbWVvdXQgPSAwLjI1O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XHJcblxyXG4gICAgICB0aGlzLnRhcmdldCA9IHRoaXMuZ2V0VGFyZ2V0KHRoaXMuZ2FtZS5lbnRpdGllcyk7XHJcblxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnRhcmdldC5kZWFkKSB7XHJcblxyXG4gICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLmZvcmVzaWdodENvbGxpc2lvbigpO1xyXG5cclxuICAgIHZhciBkZXN0aW5hdGlvbiA9IGZhbHNlO1xyXG4gICAgdmFyIHNwZWVkID0gdGhpcy5zcGVlZDtcclxuXHJcbiAgICB2YXIgb3ggPSAwO1xyXG4gICAgdmFyIG95ID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy50ZWFtICYmIHRoaXMudGFyZ2V0KSB7XHJcblxyXG4gICAgICBveCA9IE1hdGguY29zKHRoaXMucmFuZG9tICogNi4yOCkgKiAxMDA7XHJcbiAgICAgIG95ID0gTWF0aC5zaW4odGhpcy5yYW5kb20gKiA2LjI4KSAqIDEwMDtcclxuXHJcbiAgICAgIGRlc3RpbmF0aW9uID0gdGhpcy50YXJnZXQ7XHJcblxyXG4gICAgfSBlbHNlIGRlc3RpbmF0aW9uID0gdGhpcy5nYW1lLnBsYXllci5wbGFuZXQ7XHJcblxyXG4gICAgaWYgKHRoaXMudGVhbSAmJiBVdGlscy5kaXN0YW5jZSh0aGlzLCBhcHAuY2VudGVyKSA+IGFwcC5jZW50ZXIueSkge1xyXG5cclxuICAgICAgZGVzdGluYXRpb24gPSBhcHAuY2VudGVyO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb25EYW5nZXIpIHtcclxuXHJcbiAgICAgIC8qXHJcblxyXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy5jb2xsaXNpb25EYW5nZXIueSAtIHRoaXMueSwgdGhpcy5jb2xsaXNpb25EYW5nZXIueCAtIHRoaXMueCkgLSBNYXRoLlBJIC8gMjtcclxuXHJcbiAgICAgICAgZGVzdGluYXRpb24gPSB7XHJcbiAgICAgICAgICB4OiB0aGlzLmNvbGxpc2lvbkRhbmdlci54ICsgTWF0aC5jb3MoYW5nbGUpICogMTUwLFxyXG4gICAgICAgICAgeTogdGhpcy5jb2xsaXNpb25EYW5nZXIueSArIE1hdGguY29zKGFuZ2xlKSAqIDE1MFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3BlZWQgKj0gMSAtIDAuNSAqIE1hdGguYWJzKFV0aWxzLmNpcmNEaXN0YW5jZSh0aGlzLmRpcmVjdGlvbiwgYW5nbGUpIC8gKE1hdGguUEkpKTtcclxuXHJcbiAgICAgICovXHJcblxyXG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25EaXN0YW5jZSA8IDUwKSB7XHJcblxyXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIodGhpcy5jb2xsaXNpb25EYW5nZXIueSAtIHRoaXMueSwgdGhpcy5jb2xsaXNpb25EYW5nZXIueCAtIHRoaXMueCkgLSBNYXRoLlBJO1xyXG5cclxuICAgICAgICB0aGlzLnggPSB0aGlzLmNvbGxpc2lvbkRhbmdlci54ICsgTWF0aC5jb3MoYW5nbGUpICogNTA7XHJcbiAgICAgICAgdGhpcy55ID0gdGhpcy5jb2xsaXNpb25EYW5nZXIueSArIE1hdGguc2luKGFuZ2xlKSAqIDUwO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc3BlZWQgKj0gdGhpcy5jb2xsaXNpb25EaXN0YW5jZSAvIDIwMDtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChkZXN0aW5hdGlvbikge1xyXG5cclxuICAgICAgdGhpcy5kZXNpcmVkRGlyZWN0aW9uID0gTWF0aC5hdGFuMihkZXN0aW5hdGlvbi55IC0gdGhpcy55ICsgb3gsIGRlc3RpbmF0aW9uLnggLSB0aGlzLnggKyBveSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5mcm96ZW4pIHtcclxuXHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gVXRpbHMuY2lyY1dyYXBUbyh0aGlzLmRpcmVjdGlvbiwgdGhpcy5kZXNpcmVkRGlyZWN0aW9uLCBkdCAqIHRoaXMucm90YXRpb25TcGVlZCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW92ZShkdCk7XHJcblxyXG4gICAgLyogZmlyaW5nIG1lY2hhbmljcyAqL1xyXG5cclxuICAgIHRoaXMuY29vbGRvd24gLT0gZHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuY2FuRmlyZSgpKSB7XHJcblxyXG4gICAgICB0aGlzLmZpcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnRlYW0gJiYgVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5nYW1lLnBsYXllclBsYW5ldCkgPCB0aGlzLmdhbWUucGxheWVyUGxhbmV0LnJhZGl1cykge1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucGxhbmV0LmFwcGx5RGFtYWdlKDEsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGllKCk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGl0TGlmZXNwYW4gLT0gZHQ7XHJcblxyXG4gIH0sXHJcblxyXG5cclxuICBtb3ZlOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGlmICghdGhpcy5mcm96ZW4pIHtcclxuXHJcbiAgICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuZGlyZWN0aW9uLCB0aGlzLnNwZWVkICogZHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5mb3JjZSA+IDApIHtcclxuXHJcbiAgICAgIHRoaXMuZm9yY2UgLT0gMjAwICogZHQ7XHJcblxyXG4gICAgICBVdGlscy5tb3ZlSW5EaXJlY3Rpb24uY2FsbCh0aGlzLCB0aGlzLmZvcmNlRGlyZWN0aW9uLCB0aGlzLmZvcmNlICogZHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgY2FuRmlyZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvemVuKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuY29vbGRvd24gPiAwKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMudGFyZ2V0KSByZXR1cm47XHJcbiAgICBpZiAoVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy50YXJnZXQpID4gdGhpcy5yYW5nZSkgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuY29vbGRvd24gPSB0aGlzLmZpcmVyYXRlO1xyXG5cclxuICAgIHRoaXMuZmlyZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBmaXJlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5CdWxsZXQsIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHRlYW06IHRoaXMudGVhbSxcclxuICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcclxuICAgICAgZGFtYWdlOiB0aGlzLmRhbWFnZSxcclxuICAgICAgcGFyZW50OiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwibGFzZXJcIik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLyogc3ByaXRlICovXHJcblxyXG4gICAgYXBwLmN0eC5zYXZlKCk7XHJcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJIVUQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5oaXRMaWZlc3BhbiA+IDApIHtcclxuXHJcbiAgICAgIHZhciBpbWFnZSA9IGFwcC5nZXRDb2xvcmVkSW1hZ2UodGhpcy5pbWFnZSwgXCIjZmZmXCIsIFwic291cmNlLWluXCIpO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICB2YXIgaW1hZ2UgPSB0aGlzLmltYWdlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhcHAuY3R4LnJvdGF0ZSh0aGlzLmRpcmVjdGlvbiAtIE1hdGguUEkgLyAyKTtcclxuICAgIGFwcC5jdHguc2NhbGUodGhpcy5zY2FsZSwgdGhpcy5zY2FsZSk7XHJcbiAgICBhcHAuY3R4LmRyYXdJbWFnZShpbWFnZSwgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXSk7XHJcbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5mcm96ZW4pIHtcclxuXHJcbiAgICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXHJcbiAgICAgICAgdGhpcy5mcm96ZW5TcHJpdGVbMF0sIHRoaXMuZnJvemVuU3ByaXRlWzFdLCB0aGlzLmZyb3plblNwcml0ZVsyXSwgdGhpcy5mcm96ZW5TcHJpdGVbM10sXHJcbiAgICAgICAgdGhpcy54IC0gdGhpcy5mcm96ZW5TcHJpdGVbMl0gLyAyLCB0aGlzLnkgLSB0aGlzLmZyb3plblNwcml0ZVszXSAvIDIsIHRoaXMuZnJvemVuU3ByaXRlWzJdLCB0aGlzLmZyb3plblNwcml0ZVszXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlYW0pIHtcclxuXHJcbiAgICAgIHZhciByYW5rU3ByaXRlID0gdGhpcy5yYW5rc1t0aGlzLnJhbmtdO1xyXG5cclxuICAgICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcclxuICAgICAgICByYW5rU3ByaXRlWzBdLCByYW5rU3ByaXRlWzFdLCByYW5rU3ByaXRlWzJdLCByYW5rU3ByaXRlWzNdLFxyXG4gICAgICAgIHRoaXMueCArIDI0LCB0aGlzLnkgLSAyNCwgcmFua1Nwcml0ZVsyXSwgcmFua1Nwcml0ZVszXSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVySFVEOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5mcm96ZW4pIHJldHVybjtcclxuXHJcbiAgICB2YXIgdyA9IE1hdGgubWluKDEwMCwgKHRoaXMubWF4SHAgLyAxNjApICogMTAwIHwgMCk7XHJcblxyXG4gICAgdmFyIG1vZCA9IHRoaXMuaHAgLyB0aGlzLm1heEhwO1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgYXBwLmN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgYXBwLmN0eC5maWxsUmVjdCgtdyAqIG1vZCAvIDIgfCAwLCAzMiwgdyAqIG1vZCwgNSk7XHJcbiAgICBhcHAuY3R4LnN0cm9rZVJlY3QoLXcgKiAwLjUgfCAwLCAzMiwgdywgNSk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGNvbGxpc2lvblJhbmdlOiAxMDAsXHJcblxyXG4gIGZvcmVzaWdodENvbGxpc2lvbjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5jb2xsaXNpb25EYW5nZXIgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyIHBvb2wgPSBVdGlscy5maWx0ZXIodGhpcy5nYW1lLmVudGl0aWVzLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICBpZiAoZS50eXBlICE9PSBcImFzdGVyb2lkXCIpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChVdGlscy5kaXN0YW5jZShzZWxmLCBlKSA+IHNlbGYuY29sbGlzaW9uUmFuZ2UpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29sbGlzaW9uRGFuZ2VyID0gVXRpbHMubmVhcmVzdCh0aGlzLCBwb29sKTtcclxuXHJcbiAgICBpZiAodGhpcy5jb2xsaXNpb25EYW5nZXIpIHRoaXMuY29sbGlzaW9uRGlzdGFuY2UgPSBVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLmNvbGxpc2lvbkRhbmdlcik7XHJcblxyXG4gIH0sXHJcblxyXG4gIGdldFRhcmdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHBvb2wgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZS5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZ2FtZS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgIGlmICghKGVudGl0eSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XHJcblxyXG4gICAgICBpZiAoZW50aXR5LnRlYW0gIT09IHRoaXMudGVhbSkgcG9vbC5wdXNoKGVudGl0eSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBVdGlscy5uZWFyZXN0KHRoaXMsIHBvb2wpO1xyXG5cclxuICB9LFxyXG5cclxuICByZXBhaXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh0aGlzLmhwID49IHRoaXMubWF4SHApIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcclxuICAgICAgY29sb3I6IFwiI2EwNFwiLFxyXG4gICAgICByYWRpdXM6IDMyLFxyXG4gICAgICBhdHRhY2hlZFRvOiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmhwID0gdGhpcy5tYXhIcDtcclxuXHJcbiAgfSxcclxuXHJcbiAgb25zY29yZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5raWxscysrO1xyXG5cclxuICAgIHRoaXMucmFuayA9IE1hdGgubWluKHRoaXMucmFua3MubGVuZ3RoIC0gMSwgdGhpcy5raWxscyAvIDMgfCAwKTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuQnVsbGV0ID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG4gICAgc3BlZWQ6IDQwMFxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuICB0aGlzLmNvbG9yID0gZGVmcy50ZWFtQ29sb3JbdGhpcy50ZWFtXTtcclxuICB0aGlzLnJhZGl1cyA9IDQ7XHJcbiAgdGhpcy5kaXJlY3Rpb24gPSAwO1xyXG5cclxuICB0aGlzLnNwcml0ZSA9IHRoaXMuc3ByaXRlc1t0aGlzLnRlYW1dO1xyXG5cclxufTtcclxuXHJcbkVOR0lORS5CdWxsZXQucHJvdG90eXBlID0ge1xyXG5cclxuICBzcHJpdGVzOiBbXHJcbiAgICBbMTI2LCAyNSwgNCwgMzddLFxyXG4gICAgWzEzMywgMjUsIDQsIDM3XVxyXG4gIF0sXHJcblxyXG4gIHF1b3RhOiAwLjUsXHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQnVsbGV0LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGR0ICo9IHRoaXMuZ2FtZS50aW1lRmFjdG9yO1xyXG5cclxuICAgIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5hdGFuMih0aGlzLnRhcmdldC55IC0gdGhpcy55LCB0aGlzLnRhcmdldC54IC0gdGhpcy54KTtcclxuXHJcbiAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuXHJcbiAgICBpZiAoVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy50YXJnZXQpIDwgdGhpcy5yYWRpdXMgKyB0aGlzLnRhcmdldC5yYWRpdXMpIHtcclxuXHJcbiAgICAgIHRoaXMuaGl0KHRoaXMudGFyZ2V0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIGhpdDogZnVuY3Rpb24odGFyZ2V0KSB7XHJcblxyXG4gICAgdGFyZ2V0LmFwcGx5RGFtYWdlKHRoaXMuZGFtYWdlLCB0aGlzLnBhcmVudCk7XHJcblxyXG4gICAgdGhpcy5kaWUoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZGllOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgIGFwcC5jdHgucm90YXRlKHRoaXMuZGlyZWN0aW9uICsgTWF0aC5QSSAvIDIpO1xyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcclxuICAgICAgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXVxyXG4gICAgKTtcclxuXHJcbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuQXN0ZXJvaWQgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIHRoaXMubWF4ID0gdGhpcy5yZXNvdXJjZXMgPSA1O1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG5cclxuICAgIGhpdExpZmVzcGFuOiAwXHJcblxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuICB0aGlzLnJhZGl1cyA9IDMyO1xyXG5cclxuICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguYXRhbjIoYXBwLmNlbnRlci55IC0gdGhpcy55LCBhcHAuY2VudGVyLnggLSB0aGlzLngpO1xyXG4gIHRoaXMuc3BlZWQgPSA4ICsgdGhpcy5nYW1lLnJhbmRvbSgpICogMzI7XHJcblxyXG4gIHRoaXMubGlmZXRpbWUgPSAwO1xyXG5cclxuICB0aGlzLmtpbmQgPSB0aGlzLmdhbWUucmFuZG9tKCkgPiAwLjggPyBcImdvbGRcIiA6IFwibm9ybWFsXCI7XHJcblxyXG4gIHRoaXMuc3ByaXRlSW5kZXggPSBVdGlscy5yYW5kb20oMCwgMik7XHJcblxyXG4gIHRoaXMuY29sbGVjdGlibGVzID0gMDtcclxuXHJcblxyXG59O1xyXG5cclxuRU5HSU5FLkFzdGVyb2lkLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5Bc3Rlcm9pZCxcclxuXHJcbiAgcXVvdGE6IDAuNSxcclxuXHJcbiAgaG92ZXJhYmxlOiBcIm1pbmluZ1wiLFxyXG4gIHNpbGVudDogdHJ1ZSxcclxuICBpbnN0YW50OiB0cnVlLFxyXG5cclxuICB0eXBlOiBcImFzdGVyb2lkXCIsXHJcblxyXG5cclxuICBzcHJpdGVzOiB7XHJcblxyXG4gICAgbm9ybWFsOiBbXHJcbiAgICAgIFszNDEsIDIzOSwgNTIsIDM5XSxcclxuICAgICAgWzMzNywgMjg4LCA2MSwgNjFdLFxyXG4gICAgICBbMzM4LCAzNTQsIDU3LCA1OF1cclxuICAgIF0sXHJcblxyXG4gICAgZ29sZDogW1xyXG4gICAgICBbNDA4LCAyMzgsIDUyLCAzOV0sXHJcbiAgICAgIFs0MDQsIDI4NywgNTksIDYxXSxcclxuICAgICAgWzQwMywgMzUzLCA1OSwgNThdXHJcbiAgICBdLFxyXG5cclxuICAgIGhpdDogW1xyXG4gICAgICBbNDc2LCAxMjcsIDUyLCAzOV0sXHJcbiAgICAgIFs0NzIsIDE3NiwgNjEsIDYxXSxcclxuICAgICAgWzQ3MywgMjQyLCA1NywgNThdXHJcbiAgICBdXHJcblxyXG4gIH0sXHJcblxyXG4gIHBvaW50ZXJlbnRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5zbG93ZG93biA9IHRydWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHBvaW50ZXJsZWF2ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5zbG93ZG93biA9IGZhbHNlO1xyXG5cclxuICB9LFxyXG5cclxuICBkaWU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC5zb3VuZC5wbGF5KFwiZXhwbG9zaW9uXCIpLnJhdGUoMC42KTtcclxuXHJcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNykge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUG93ZXJ1cCwge1xyXG4gICAgICAgIHg6IHRoaXMueCxcclxuICAgICAgICB5OiB0aGlzLnlcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XHJcbiAgICB0aGlzLmdhbWUuZXhwbG9zaW9uKHRoaXMueCwgdGhpcy55LCAxNiwgXCIjYWFhXCIpO1xyXG4gICAgdGhpcy5nYW1lLnNwYXduQXN0ZXJvaWQoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgZGlnOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmhpdExpZmVzcGFuID0gMC4xO1xyXG5cclxuICAgIHRoaXMucmVzb3VyY2VzLS07XHJcblxyXG4gICAgaWYgKHRoaXMucmVzb3VyY2VzIDw9IDApIHtcclxuICAgICAgdGhpcy5kaWUoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY291bnQgPSB0aGlzLmtpbmQgPT09IFwiZ29sZFwiID8gMiA6IDE7XHJcblxyXG4gICAgdGhpcy5zcGF3blJlc291cmNlcyhjb3VudCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmV4cGxvc2lvbih0aGlzLngsIHRoaXMueSwgNCwgXCIjZmEwXCIpO1xyXG5cclxuICAgIGlmICghdGhpcy5nYW1lLmJlbmNobWFyaykgYXBwLnNvdW5kLnBsYXkoXCJkaWdcIik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHNwYXduUmVzb3VyY2VzOiBmdW5jdGlvbihjb3VudCkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuUmVzb3VyY2UsIHtcclxuICAgICAgICB4OiB0aGlzLngsXHJcbiAgICAgICAgeTogdGhpcy55LFxyXG4gICAgICAgIHBhcmVudDogdGhpc1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgZHQgKj0gdGhpcy5nYW1lLnRpbWVGYWN0b3I7XHJcblxyXG4gICAgdGhpcy5saWZldGltZSArPSBkdDtcclxuXHJcbiAgICB0aGlzLmhpdExpZmVzcGFuIC09IGR0O1xyXG5cclxuICAgIHZhciBzcGVlZCA9IHRoaXMuc3BlZWQgKiAodGhpcy5zbG93ZG93biA/IDAuMjUgOiAxLjApO1xyXG5cclxuICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiBzcGVlZCAqIGR0O1xyXG4gICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHNwZWVkICogZHQ7XHJcblxyXG4gICAgdGhpcy5nYW1lLndyYXAodGhpcyk7XHJcblxyXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIGFwcC5jZW50ZXIpIDwgdGhpcy5nYW1lLnBsYXllci5wbGFuZXQucmFkaXVzICsgdGhpcy5yYWRpdXMpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnBsYW5ldC5hc3Rlcm9pZHNTaGllbGQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5zcGF3blJlc291cmNlcyg1KTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucGxhbmV0LmFwcGx5RGFtYWdlKDEsIHRoaXMpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kaWUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuaGl0TGlmZXNwYW4gPiAwKSB7XHJcbiAgICBcclxuICAgICAgdmFyIHNwcml0ZSA9IHRoaXMuc3ByaXRlcy5oaXRbdGhpcy5zcHJpdGVJbmRleF07XHJcbiAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFxyXG4gICAgICB2YXIgc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMua2luZF1bdGhpcy5zcHJpdGVJbmRleF07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzY2FsZSA9IDAuNSArIDAuNSAqIHRoaXMucmVzb3VyY2VzIC8gdGhpcy5tYXg7XHJcblxyXG4gICAgYXBwLmN0eC5zYXZlKCk7XHJcblxyXG4gICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpXHJcbiAgICBhcHAuY3R4LnJvdGF0ZSh0aGlzLmxpZmV0aW1lKVxyXG4gICAgYXBwLmN0eC5zY2FsZShzY2FsZSwgc2NhbGUpXHJcbiAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxyXG4gICAgICBzcHJpdGVbMF0sIHNwcml0ZVsxXSwgc3ByaXRlWzJdLCBzcHJpdGVbM10sIC1zcHJpdGVbMl0gLyAyLCAtc3ByaXRlWzNdIC8gMiwgc3ByaXRlWzJdLCBzcHJpdGVbM11cclxuICAgICk7XHJcbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuQ3Vyc29yID0gZnVuY3Rpb24oZ2FtZSwgdGVhbSwgcGxhbmV0KSB7XHJcblxyXG4gIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gIHRoaXMuYWN0aW9uVGltZW91dCA9IDA7XHJcblxyXG4gIHRoaXMuZG90UmFkaXVzID0gODtcclxuICB0aGlzLmNhcGFjaXR5ID0gMTA7XHJcbiAgdGhpcy5yZXNvdXJjZXMgPSA0O1xyXG4gIHRoaXMueCA9IDA7XHJcbiAgdGhpcy55ID0gMDtcclxuICB0aGlzLmhvdmVyVGltZSA9IDA7XHJcbiAgdGhpcy50ZWFtID0gdGVhbTtcclxuICB0aGlzLmNvbG9yID0gZGVmcy50ZWFtQ29sb3JbdGVhbV07XHJcbiAgdGhpcy5wbGFuZXQgPSBwbGFuZXQ7XHJcblxyXG4gIHRoaXMudGFyZ2V0VGltZW91dCA9IHRoaXMudGFyZ2V0SW50ZXJ2YWwgPSAwLjI1O1xyXG4gIHRoaXMuZmlyZUNvb2xkb3duID0gdGhpcy5maXJlSW50ZXJ2YWwgPSAwLjI1O1xyXG5cclxuICAvKiB0aW1lcnMgKi9cclxuXHJcbiAgdGhpcy50aW1lcyA9IHtcclxuICAgIG1pbmluZzogMC41LFxyXG4gICAgY29sbGVjdDogMC4wNSxcclxuICAgIGJ1aWxkOiAwLjUsXHJcbiAgICByZXBhaXI6IDJcclxuICB9O1xyXG5cclxuXHJcbiAgdGhpcy50d2VlbiA9IGFwcC50d2Vlbih0aGlzKTtcclxuXHJcbiAgaWYgKCF0aGlzLnRlYW0pIHtcclxuXHJcbiAgICB0aGlzLmFpID0gbmV3IEVOR0lORS5BaSh0aGlzKTtcclxuICAgIHRoaXMuYWkuc2V0KFwiaWRsZVwiKTtcclxuXHJcbiAgfVxyXG5cclxuICB0aGlzLnRyYWlsID0gbmV3IEVOR0lORS5UcmFpbCh0aGlzLCB7XHJcbiAgICBpbnRlcnZhbDogMC4wNSxcclxuICAgIG1heFBvaW50czogMTAsXHJcbiAgICBjb2xvcjogdGhpcy5jb2xvclxyXG4gIH0pO1xyXG5cclxuXHJcbn07XHJcblxyXG5FTkdJTkUuQ3Vyc29yLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5DdXJzb3IsXHJcblxyXG4gIHBva2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMudHdlZW4gPSBhcHAudHdlZW4odGhpcykuZGlzY2FyZCgpXHJcblxyXG4gICAgLnRvKHtcclxuICAgICAgZG90UmFkaXVzOiAxNlxyXG4gICAgfSwgMC4xLCBcIm91dFNpbmVcIilcclxuXHJcbiAgICAudG8oe1xyXG4gICAgICBkb3RSYWRpdXM6IDhcclxuICAgIH0sIDAuMDUsIFwiaW5TaW5lXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIHZhciBwcmV2RW50aXR5ID0gdGhpcy5lbnRpdHk7XHJcblxyXG4gICAgdGhpcy5lbnRpdHkgPSB0aGlzLmdldEhvdmVyZWRFbnRpdHkoKTtcclxuXHJcbiAgICBpZiAodGhpcy5lbnRpdHkgIT09IHByZXZFbnRpdHkpIHtcclxuXHJcbiAgICAgIGlmIChwcmV2RW50aXR5ICYmIHByZXZFbnRpdHkucG9pbnRlcmxlYXZlKSBwcmV2RW50aXR5LnBvaW50ZXJsZWF2ZSh0aGlzKTtcclxuICAgICAgaWYgKHRoaXMuZW50aXR5ICYmIHRoaXMuZW50aXR5LnBvaW50ZXJlbnRlcikgdGhpcy5lbnRpdHkucG9pbnRlcmVudGVyKHRoaXMpO1xyXG5cclxuICAgICAgdGhpcy5vbmVudGl0eWNoYW5nZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5hY3Rpb24pIHtcclxuXHJcbiAgICAgIHRoaXMuaG92ZXJUaW1lICs9IGR0O1xyXG5cclxuICAgICAgdGhpcy5wcm9ncmVzc0FjdGlvbihkdCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qIGZpcmluZyBtZWNoYW5pY3MgKi9cclxuXHJcbiAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuZGVhZCkgdGhpcy50YXJnZXQgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoKHRoaXMudGFyZ2V0VGltZW91dCAtPSBkdCkgPD0gMCkge1xyXG5cclxuICAgICAgdGhpcy50YXJnZXRUaW1lb3V0ID0gMC41O1xyXG5cclxuICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLmdldFRhcmdldCgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhpcy5maXJlQ29vbGRvd24gLT0gZHQ7XHJcblxyXG4gICAgaWYgKHRoaXMuY2FuRmlyZSgpKSB7XHJcblxyXG4gICAgICB0aGlzLmZpcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50cmFpbC5zdGVwKGR0KTtcclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIGdldFRhcmdldDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIHBvb2wgPSBbXTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2FtZS5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdmFyIGVudGl0eSA9IHRoaXMuZ2FtZS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgIGlmICghKGVudGl0eSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XHJcblxyXG4gICAgICBpZiAoVXRpbHMuZGlzdGFuY2UoZW50aXR5LCB0aGlzKSA+IDIwMCkgY29udGludWU7XHJcbiAgICAgIGlmIChlbnRpdHkudGVhbSAhPT0gdGhpcy50ZWFtKSBwb29sLnB1c2goZW50aXR5KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFV0aWxzLm5lYXJlc3QodGhpcywgcG9vbCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIG9uZW50aXR5Y2hhbmdlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmFjdGlvbkNvbXBsZXRlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5ob3ZlclRpbWUgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLmVudGl0eSkge1xyXG5cclxuICAgICAgdGhpcy5hY3Rpb24gPSB0aGlzLmVudGl0eS5ob3ZlcmFibGU7XHJcbiAgICAgIHRoaXMucmVzZXRBY3Rpb24oKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmVudGl0eS5pbnN0YW50KSB0aGlzLmFjdGlvblRpbWVvdXQgPSAwO1xyXG5cclxuXHJcbiAgICB9IGVsc2UgdGhpcy5hY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25Tb3VuZCkgdGhpcy5hY3Rpb25Tb3VuZCA9IGFwcC5zb3VuZC5wbGF5KFwiYWN0aW9uXCIpLmxvb3AoKS5yYXRlKDAuNSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hY3Rpb24pIHtcclxuICAgICAgICAgIHRoaXMuYWN0aW9uU291bmQuc3RvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFjdGlvblNvdW5kLmZhZGVJbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgdGhpcy51cGRhdGVUb29sdGlwKCk7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICByZXNldEFjdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHRoaXMuYWN0aW9uVGltZW91dCA9IHRoaXMudGltZXNbdGhpcy5hY3Rpb25dO1xyXG5cclxuICAgIHRoaXMuYWN0aW9uRHVyYXRpb24gPSB0aGlzLmFjdGlvblRpbWVvdXQ7XHJcblxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uKGtleSkge1xyXG5cclxuICAgIHRoaXMuZ2FtZS51cGdyYWRlc1trZXldICsrO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5idXR0b25zW2tleV0uY291bnQgPSB0aGlzLmdldFByaWNlKGtleSk7XHJcblxyXG4gICAgdmFyIHNoaXBzID0gVXRpbHMuZmlsdGVyKHRoaXMuZ2FtZS5lbnRpdGllcywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgcmV0dXJuIChlIGluc3RhbmNlb2YgRU5HSU5FLlNoaXApICYmIGUudGVhbTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc2hpcCA9IHNoaXBzW2ldO1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuQ2lyY2xlRXhwbG9zaW9uLCB7XHJcbiAgICAgICAgY29sb3I6IFwiIzBhZlwiLFxyXG4gICAgICAgIHJhZGl1czogMzIsXHJcbiAgICAgICAgYXR0YWNoZWRUbzogc2hpcFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNoaXAuYXBwbHlVcGdyYWRlcyh0aGlzLmdhbWUudXBncmFkZXMpXHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBnZXRQcmljZTogZnVuY3Rpb24oa2V5KSB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGgucG93KDIsIHRoaXMuZ2FtZS51cGdyYWRlc1trZXldKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgY2FuUHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5hY3Rpb24pIHtcclxuXHJcbiAgICAgIGNhc2UgXCJyZXBhaXJcIjpcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhbmV0LmhwIDwgdGhpcy5wbGFuZXQubWF4SFA7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBcImJ1aWxkXCI6XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVudGl0eS5rZXkgPT09IFwiZmlnaHRlclwiKSB7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuZ2FtZS5wbGF5ZXJQbGFuZXQubWF4IC0gdGhpcy5nYW1lLnBsYXllclBsYW5ldC5zaGlwcyA8PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VzID4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlcyA+PSB0aGlzLmdldFByaWNlKHRoaXMuZW50aXR5LmtleSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHByb2dyZXNzQWN0aW9uOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIGlmICh0aGlzLmNhblByb2dyZXNzKCkgJiYgKHRoaXMuYWN0aW9uVGltZW91dCAtPSBkdCkgPCAwKSB7XHJcblxyXG4gICAgICB0aGlzLmZpbmFsaXplQWN0aW9uKCk7XHJcbiAgICAgIHRoaXMucmVzZXRBY3Rpb24oKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSAxIC0gdGhpcy5hY3Rpb25UaW1lb3V0IC8gdGhpcy5hY3Rpb25EdXJhdGlvbjtcclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIGZpbmFsaXplQWN0aW9uOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmFjdGlvbkNvbXBsZXRlID0gdHJ1ZTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuYWN0aW9uKSB7XHJcblxyXG4gICAgICBjYXNlIFwicmVwYWlyXCI6XHJcblxyXG4gICAgICAgIHRoaXMucGxhbmV0LnJlcGFpcigpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJtaW5pbmdcIjpcclxuXHJcbiAgICAgICAgdGhpcy5lbnRpdHkuZGlnKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgIGNhc2UgXCJidWlsZFwiOlxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZW50aXR5LmtleSkge1xyXG5cclxuICAgICAgICAgIGNhc2UgXCJmaWdodGVyXCI6XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYW5ldC5zcGF3blNoaXAoXCJmaWdodGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyAtPSAxO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwiYnVpbGRcIik7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIFwibGlmZVwiOlxyXG4gICAgICAgICAgY2FzZSBcImRhbWFnZVwiOlxyXG4gICAgICAgICAgY2FzZSBcInNwZWVkXCI6XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyAtPSB0aGlzLmdldFByaWNlKHRoaXMuZW50aXR5LmtleSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUodGhpcy5lbnRpdHkua2V5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lLmJlbmNobWFyaykgYXBwLnNvdW5kLnBsYXkoXCJ1cGdyYWRlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBoaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZ2FtZS5zaGFrZSgpO1xyXG5cclxuICAgIHRoaXMucGxhbmV0LmFwcGx5RGFtYWdlKDEsIHRoaXMucGxhbmV0KTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIGNvbG9yOiBcIiNjMDJcIixcclxuICAgICAgcmFkaXVzOiAzMlxyXG4gICAgfSlcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2V0SG92ZXJlZEVudGl0eTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XHJcblxyXG4gICAgICBpZiAoZW50aXR5LmhvdmVyYWJsZSAmJiBVdGlscy5kaXN0YW5jZShlbnRpdHksIHRoaXMpIDwgZW50aXR5LnJhZGl1cykgcmV0dXJuIGVudGl0eTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy50cmFpbC5yZW5kZXIoKTtcclxuXHJcbiAgICBhcHAubGF5ZXIuZmlsbFN0eWxlKHRoaXMuY29sb3IpLmZpbGxDaXJjbGUodGhpcy54LCB0aGlzLnksIHRoaXMuZG90UmFkaXVzKTtcclxuXHJcbiAgICBpZiAodGhpcy5hY3Rpb24gJiYgIXRoaXMuZW50aXR5LnNpbGVudCkge1xyXG5cclxuICAgICAgdmFyIG1vZCA9IE1hdGgubWluKDEsIGFwcC5lYXNlKDIgKiB0aGlzLmhvdmVyVGltZSwgXCJvdXRCb3VuY2VcIikpO1xyXG5cclxuICAgICAgYXBwLmN0eC5zYXZlKCk7XHJcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMuZW50aXR5LngsIHRoaXMuZW50aXR5LnkpO1xyXG5cclxuICAgICAgYXBwLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICAgIGFwcC5jdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgYXBwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgYXBwLmN0eC5hcmMoMCwgMCwgKHRoaXMuZW50aXR5LnJhZGl1cyArIDIpICogbW9kLCAwLCBNYXRoLlBJICogMik7XHJcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDg7XHJcbiAgICAgIGFwcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgIGFwcC5jdHguZ2xvYmFsQWxwaGEgPSAwLjI1O1xyXG4gICAgICBhcHAuY3R4LmFyYygwLCAwLCB0aGlzLmVudGl0eS5yYWRpdXMgKyA4LCAwLCBNYXRoLlBJICogMilcclxuICAgICAgYXBwLmN0eC5zdHJva2UoKVxyXG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gMS4wO1xyXG5cclxuICAgICAgYXBwLmN0eC5saW5lV2lkdGggPSA4O1xyXG4gICAgICBhcHAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBhcHAuY3R4LmFyYygwLCAwLCB0aGlzLmVudGl0eS5yYWRpdXMgKyA4LCAwLCB0aGlzLnByb2dyZXNzICogTWF0aC5QSSAqIDIpXHJcbiAgICAgIGFwcC5jdHguc3Ryb2tlKCk7XHJcblxyXG4gICAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgY2FuRmlyZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdhbWUuY2hlY2tCb251cyhcImxhc2VyXCIpKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuZmlyZUNvb2xkb3duID4gMCkgcmV0dXJuO1xyXG4gICAgaWYgKCF0aGlzLnRhcmdldCkgcmV0dXJuO1xyXG4gICAgaWYgKFV0aWxzLmRpc3RhbmNlKHRoaXMsIHRoaXMudGFyZ2V0KSA+IHRoaXMucmFuZ2UpIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmZpcmVDb29sZG93biA9IHRoaXMuZmlyZUludGVydmFsO1xyXG5cclxuICAgIHRoaXMuZmlyZSgpO1xyXG5cclxuICB9LFxyXG5cclxuICBmaXJlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5CdWxsZXQsIHtcclxuICAgICAgeDogdGhpcy54LFxyXG4gICAgICB5OiB0aGlzLnksXHJcbiAgICAgIHRlYW06IHRoaXMudGVhbSxcclxuICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcclxuICAgICAgZGFtYWdlOiAyLFxyXG4gICAgICBzcGVlZDogMTAwMFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmdhbWUuYmVuY2htYXJrKSBhcHAuc291bmQucGxheShcImxhc2VyXCIpO1xyXG5cclxuICB9LFxyXG5cclxuICBtb3ZlVG86IGZ1bmN0aW9uKGRlc3RpbmF0aW9uKSB7XHJcblxyXG4gICAgdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uO1xyXG5cclxuICB9LFxyXG5cclxuICB1cGRhdGVUb29sdGlwOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5lbnRpdHkpIHtcclxuICAgICAgaWYgKHRoaXMuZW50aXR5LnRvb2x0aXApIHRoaXMuZ2FtZS50b29sdGlwID0gdGhpcy5lbnRpdHkudG9vbHRpcDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2FtZS50b29sdGlwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0iLCJFTkdJTkUuUmVzb3VyY2UgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBhcmdzKTtcclxuXHJcbiAgdGhpcy5yYWRpdXMgPSAzMjtcclxuXHJcbiAgdGhpcy5kaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNi4yODtcclxuICB0aGlzLnNwZWVkID0gMzI7XHJcblxyXG4gIHRoaXMuZm9yY2VEaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpICogNi4yODtcclxuICB0aGlzLmZvcmNlID0gNjQgKyBNYXRoLnJhbmRvbSgpICogMTI4O1xyXG5cclxuICB0aGlzLmZvcmNlICo9IDM7XHJcbiAgdGhpcy5mb3JjZURhbXBpbmcgPSB0aGlzLmZvcmNlO1xyXG5cclxuICB0aGlzLmxpZmV0aW1lID0gMDtcclxuICB0aGlzLmR1cmF0aW9uID0gMTA7XHJcblxyXG4gIHRoaXMudmFsdWUgPSBNYXRoLnJhbmRvbSgpICogMyB8IDA7XHJcblxyXG4gIHRoaXMuc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMudmFsdWVdO1xyXG59O1xyXG5cclxuRU5HSU5FLlJlc291cmNlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgY29uc3RydWN0b3I6IEVOR0lORS5SZXNvdXJjZSxcclxuXHJcbiAgcXVvdGE6IDAuNyxcclxuXHJcbiAgc3ByaXRlczogW1xyXG4gICAgWzMzMywgMTA1LCAxMCwgMTBdLFxyXG4gICAgWzMyMCwgMTA0LCAxMiwgMTJdLFxyXG4gICAgWzMwMywgMTAyLCAxNiwgMTZdXHJcbiAgXSxcclxuXHJcbiAgdHlwZTogXCJyZXNvdXJjZVwiLFxyXG5cclxuXHJcbiAgY29sbGVjdDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYW1lLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwiY29pblwiKTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGxheWVyLnBva2UoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkKEVOR0lORS5DaXJjbGVFeHBsb3Npb24sIHtcclxuICAgICAgY29sb3I6IFwiI2ZjMFwiLFxyXG4gICAgICByYWRpdXM6IDgsXHJcbiAgICAgIGF0dGFjaGVkVG86IHRoaXMsXHJcbiAgICAgIGR1cmF0aW9uOiAwLjI1XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmdhbWUucGxheWVyLnJlc291cmNlcyArPSB0aGlzLnZhbHVlO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZHQ7XHJcblxyXG4gICAgdmFyIHBsYXllckRpc3RhbmNlID0gVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy5nYW1lLnBsYXllcik7XHJcblxyXG4gICAgaWYgKHRoaXMuZm9yY2UpIHtcclxuXHJcbiAgICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmZvcmNlRGlyZWN0aW9uKSAqIHRoaXMuZm9yY2UgKiBkdDtcclxuICAgICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZm9yY2VEaXJlY3Rpb24pICogdGhpcy5mb3JjZSAqIGR0O1xyXG5cclxuICAgICAgdGhpcy5mb3JjZSA9IE1hdGgubWF4KDAsIHRoaXMuZm9yY2UgLSB0aGlzLmZvcmNlRGFtcGluZyAqIGR0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9rZWQgJiYgdGhpcy5nYW1lLmNoZWNrQm9udXMoXCJtYWduZXRcIikpIHtcclxuXHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gTWF0aC5hdGFuMih0aGlzLmdhbWUucGxheWVyLnkgLSB0aGlzLnksIHRoaXMuZ2FtZS5wbGF5ZXIueCAtIHRoaXMueCk7XHJcblxyXG4gICAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG4gICAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG5cclxuXHJcbiAgICAgIGlmICghdGhpcy5mb3JjZSkge1xyXG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMjU2ICogZHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMTAwKSB7XHJcbiAgICAgICAgdGhpcy5wb2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDEyODtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHRoaXMubGlmZXRpbWUgPiAwLjUpIHtcclxuICAgICAgaWYgKHBsYXllckRpc3RhbmNlIDwgMzIpIHtcclxuICAgICAgICB0aGlzLmNvbGxlY3QoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxpZmV0aW1lID4gdGhpcy5kdXJhdGlvbikgdGhpcy5nYW1lLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgc2NhbGUgPSAwLjIgKyAwLjggKiBNYXRoLnNpbihNYXRoLlBJICogKGFwcC5saWZldGltZSAlIDAuMiAvIDAuMikpO1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuXHJcbiAgICBhcHAuY3R4LnNjYWxlKHNjYWxlLCAxLjApO1xyXG5cclxuICAgIGFwcC5jdHguZHJhd0ltYWdlKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsXHJcbiAgICAgIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM11cclxuICAgICk7XHJcblxyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLkJ1dHRvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuXHJcbiAgICByYWRpdXM6IDMyXHJcblxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuXHJcbiAgdGhpcy5pbWFnZSA9IGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQ7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLkJ1dHRvbi5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuQnV0dG9uLFxyXG5cclxuICB0eXBlOiBcImJ1dHRvblwiLFxyXG5cclxuICBwb2ludGVyZW50ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKCkudG8oe1xyXG4gICAgICByYWRpdXM6IDI0XHJcbiAgICB9LCAwLjEpLnRvKHtcclxuICAgICAgcmFkaXVzOiAzMlxyXG4gICAgfSwgMC4yLCBcIm91dFNpbmVcIik7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFjdGlvbjogZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIGFwcC5zb3VuZC5wbGF5KFwibGFzZXJcIik7XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKCkge1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICBpZiAodGhpcy5zcHJpdGUpIHtcclxuICAgICAgdmFyIHNjYWxlID0gdGhpcy5yYWRpdXMgLyAzMjtcclxuXHJcbiAgICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICBhcHAuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLFxyXG4gICAgICAgIHRoaXMuc3ByaXRlWzBdLCB0aGlzLnNwcml0ZVsxXSwgdGhpcy5zcHJpdGVbMl0sIHRoaXMuc3ByaXRlWzNdLCAtdGhpcy5zcHJpdGVbMl0gLyAyLCAtdGhpcy5zcHJpdGVbM10gLyAyLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM11cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jb3VudCkge1xyXG4gICAgICBhcHAubGF5ZXIudGV4dEFsaWduKFwiY2VudGVyXCIpLmZvbnQoXCJib2xkIDMycHggQXJpYWxcIikuZmlsbFN0eWxlKHRoaXMuY29sb3IpLmZpbGxUZXh0KHRoaXMuY291bnQsIHRoaXMueCwgdGhpcy55IC0gdGhpcy5yYWRpdXMgLSA0OCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLlBhcnRpY2xlID0gZnVuY3Rpb24oYXJncykge1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG4gICAgY29sb3I6IFwiIzBmYVwiLFxyXG4gICAgcmFkaXVzOiA0XHJcbiAgfSwgYXJncylcclxuXHJcbiAgdGhpcy5zcHJpdGVJbmRleCA9IDA7XHJcblxyXG4gIHRoaXMucmVzZXQoKTtcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuUGFydGljbGUucHJvdG90eXBlID0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLlBhcnRpY2xlLFxyXG5cclxuICBxdW90YTogMC41LFxyXG5cclxuICBzcHJpdGVzOiBbXHJcbiAgICBbMCwgMCwgNiwgNl0sXHJcbiAgICBbMCwgNywgNSwgNV0sXHJcbiAgICBbMCwgMTMsIDUsIDVdLFxyXG4gICAgWzEsIDE5LCAzLCAzXVxyXG4gIF0sXHJcblxyXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lID0gMDtcclxuICAgIHRoaXMuZHVyYXRpb24gPSAwLjU7XHJcblxyXG4gICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmdhbWUucmFuZG9tKCkgKiA2LjI4O1xyXG4gICAgdGhpcy5zcGVlZCA9IDMyICsgdGhpcy5nYW1lLnJhbmRvbSgpICogMTI4O1xyXG5cclxuICAgIHRoaXMuc3BlZWQgKj0gMztcclxuXHJcbiAgICB0aGlzLmRhbXBpbmcgPSB0aGlzLnNwZWVkICogMjtcclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB0aGlzLmxpZmV0aW1lICs9IGR0O1xyXG5cclxuICAgIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdGhpcy5zcGVlZCAqIGR0O1xyXG5cclxuICAgIHRoaXMuc3BlZWQgPSBNYXRoLm1heCgwLCB0aGlzLnNwZWVkIC0gdGhpcy5kYW1waW5nICogZHQpO1xyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbih0aGlzLmxpZmV0aW1lIC8gdGhpcy5kdXJhdGlvbiwgMS4wKTtcclxuXHJcbiAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxLjApIHtcclxuICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zcHJpdGVJbmRleCA9IHRoaXMucHJvZ3Jlc3MgKiB0aGlzLnNwcml0ZXMubGVuZ3RoIHwgMDtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgLy8gdmFyIHMgPSB0aGlzLnNpemUgKiAoMSAtIHRoaXMucHJvZ3Jlc3MpO1xyXG5cclxuICAgIC8vIGlmIChzID4gMCkge1xyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMS4wKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy5pbWFnZSA9IGFwcC5nZXRDb2xvcmVkSW1hZ2UoYXBwLmltYWdlcy5wYXJ0aWNsZXMsIHRoaXMuY29sb3IgfHwgXCIjMGZhXCIpO1xyXG5cclxuICAgIC8vIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIC8vIGFwcC5jdHguZmlsbFJlY3QodGhpcy54IC0gcyAvIDIsIHRoaXMueSAtIHMgLyAyLCBzLCBzKVxyXG5cclxuICAgIHZhciBzcHJpdGUgPSB0aGlzLnNwcml0ZXNbdGhpcy5zcHJpdGVJbmRleF07XHJcblxyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgc3ByaXRlWzBdLCBzcHJpdGVbMV0sIHNwcml0ZVsyXSwgc3ByaXRlWzNdLFxyXG4gICAgICB0aGlzLngsIHRoaXMueSwgc3ByaXRlWzJdLCBzcHJpdGVbM10pXHJcblxyXG4gICAgLy8gfVxyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5QbGFuZXQgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgcmFkaXVzOiA0OCxcclxuICAgIGhwOiAyMCxcclxuICAgIG1heDogMTAwLFxyXG4gICAgc2hpcHM6IDAsXHJcbiAgICByZXBhaXJQcm9ncmVzczogMCxcclxuICAgIHJlcGFpclRpbWU6IDQsXHJcbiAgICBhc3Rlcm9pZHNTaGllbGQ6IHRydWUsXHJcbiAgICBzaGllbGRTY2FsZTogMC4wXHJcblxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuICB0aGlzLm1heEhQID0gdGhpcy5ocDtcclxuXHJcbiAgdGhpcy5saWZldGltZSA9IDA7XHJcblxyXG59O1xyXG5cclxuRU5HSU5FLlBsYW5ldC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuUGxhbmV0LFxyXG5cclxuICB0eXBlOiBcInBsYW5ldFwiLFxyXG5cclxuICBob3ZlcmFibGU6IFwicmVwYWlyXCIsXHJcblxyXG4gIHNwcml0ZTogWzIwMSwgMjE1LCAxMDQsIDEwNF0sXHJcblxyXG4gIHNoaWVsZFNwcml0ZTogWzQ5MiwgMzIwLCAxMjQsIDEyNF0sXHJcblxyXG4gIHJlcGFpcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5ocCsrO1xyXG5cclxuICB9LFxyXG5cclxuICBhcHBseURhbWFnZTogZnVuY3Rpb24oZGFtYWdlLCBhdHRhY2tlcikge1xyXG5cclxuICAgIHRoaXMuZ2FtZS5zaGFrZSgpO1xyXG5cclxuICAgIHRoaXMuaHAtLTtcclxuXHJcbiAgICBpZiAodGhpcy5ocCA8PSAwICYmICF0aGlzLmdhbWUuYmVuY2htYXJrKSB0aGlzLmdhbWUuZ2FtZW92ZXIoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5iZW5jaG1hcmspIGFwcC5zb3VuZC5wbGF5KFwicGxhbmV0SGl0XCIpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQoRU5HSU5FLkNpcmNsZUV4cGxvc2lvbiwge1xyXG4gICAgICB4OiBhdHRhY2tlci54LFxyXG4gICAgICB5OiBhdHRhY2tlci55LFxyXG4gICAgICBjb2xvcjogXCIjYTA0XCIsXHJcbiAgICAgIHJhZGl1czogMzJcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgdGhpcy5saWZldGltZSArPSBkdDtcclxuXHJcbiAgICB2YXIgcHJldlNoaWVsZCA9IHRoaXMuYXN0ZXJvaWRzU2hpZWxkO1xyXG4gICAgdGhpcy5hc3Rlcm9pZHNTaGllbGQgPSBmYWxzZTt0aGlzLmdhbWUuY2hlY2tCb251cyhcInNoaWVsZFwiKTtcclxuXHJcbiAgICBpZiAocHJldlNoaWVsZCAhPT0gdGhpcy5hc3Rlcm9pZHNTaGllbGQpIHtcclxuXHJcbiAgICAgIGFwcC50d2Vlbih0aGlzKS5kaXNjYXJkKCkudG8oe1xyXG4gICAgICAgIHNoaWVsZFNjYWxlOiB0aGlzLmFzdGVyb2lkc1NoaWVsZCA/IDEuMCA6IDAuMFxyXG4gICAgICB9LCAwLjUsIFwib3V0RWxhc3RpY1wiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHNwYXduU2hpcDogZnVuY3Rpb24odHlwZSkge1xyXG5cclxuICAgIHZhciBzaGlwID0gdGhpcy5nYW1lLmFkZChFTkdJTkUuU2hpcCwge1xyXG4gICAgICB4OiB0aGlzLngsXHJcbiAgICAgIHk6IHRoaXMueSxcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgdGVhbTogMSxcclxuICAgICAgcGxhbmV0OiB0aGlzXHJcbiAgICB9KTtcclxuXHJcbiAgICBzaGlwLmZvcmNlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDY7XHJcbiAgICBzaGlwLmZvcmNlID0gMjAwO1xyXG5cclxuICAgIHRoaXMuc2hpcHMrKztcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBhcHAubGF5ZXIuYWxpZ24oMC41LCAwLjUpO1xyXG4gICAgYXBwLmxheWVyLmRyYXdSZWdpb24oYXBwLmltYWdlcy5zcHJpdGVzaGVldCwgdGhpcy5zcHJpdGUsIHRoaXMueCwgdGhpcy55KTtcclxuICAgIGFwcC5sYXllci50ZXh0QWxpZ24oXCJjZW50ZXJcIikuZm9udChcImJvbGQgNDhweCBBcmlhbFwiKS5maWxsU3R5bGUoXCIjZmZmXCIpLmZpbGxUZXh0KHRoaXMuaHAsIHRoaXMueCwgdGhpcy55IC0gMjQpO1xyXG4gICAgYXBwLmxheWVyLnJlYWxpZ24oKTtcclxuXHJcbiAgICBpZiAodGhpcy5hc3Rlcm9pZHNTaGllbGQgJiYgdGhpcy5zaGllbGRTY2FsZSA+IDApIHtcclxuICAgICAgdmFyIHNjYWxlID0gdGhpcy5zaGllbGRTY2FsZTtcclxuICAgICAgYXBwLmN0eC5zYXZlKCk7XHJcbiAgICAgIGFwcC5jdHguZ2xvYmFsQWxwaGEgPSAwLjU7XHJcbiAgICAgIGFwcC5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJsaWdodGVyXCI7XHJcbiAgICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgYXBwLmN0eC5zY2FsZShzY2FsZSwgc2NhbGUpO1xyXG4gICAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LCB0aGlzLnNoaWVsZFNwcml0ZVswXSwgdGhpcy5zaGllbGRTcHJpdGVbMV0sIHRoaXMuc2hpZWxkU3ByaXRlWzJdLCB0aGlzLnNoaWVsZFNwcml0ZVszXSwgLXRoaXMuc2hpZWxkU3ByaXRlWzJdIC8gMiwgLXRoaXMuc2hpZWxkU3ByaXRlWzNdIC8gMiwgdGhpcy5zaGllbGRTcHJpdGVbMl0sIHRoaXMuc2hpZWxkU3ByaXRlWzNdKTtcclxuICAgICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07IiwiLyogVGhlIGNvdW50ZXIgaW4gdGhlIHRvcC1sZWZ0IGNvcm5lciBpczpcclxuXHJcbkFWRVJBR0UgRlJBTUUgVElNRSB8ICBERVZJQ0UgIFBPV0VSICAgfCBFTlRJVElFUyBDT1VOVFxyXG4gICAgICAgICAgICAgICAgICAgICAoYmFzZWxpbmVGYWN0b3IpXHJcbiovXHJcblxyXG5cclxuLyogUmVmZXJlbmNlIGJhc2VsaW5lIHRvIGNhbGN1bGF0ZSBkZXZpY2UgcG93ZXIgKi9cclxuXHJcblJFRkVSRU5DRV9CQVNFTElORSA9IDM3ODtcclxuXHJcbi8qIFJlZmVyZW5jZSBmcmFtZSB0aW1lIHRvIHRlbGwgaG93IHdlbGwgdGhlIGdhbWUgaGFzIGJlZW4gb3B0aW1pemVkICovXHJcbi8qIE1ha2UgaXQgaGlnaGVyIHRvIGdpdmUgdXNlciBtb3JlIENQVSBwb3dlciAqL1xyXG5cclxuUkVGRVJFTkNFX0ZSQU1FX1RJTUUgPSAwLjg7XHJcblxyXG4vKiBIb3cgbXVjaCBvcHRpbWl6YXRpb24gdmFsdWUgb25lIHNoaXAgZHJhaW5zICovXHJcblxyXG5TSElQX0NQVV9DT1NUID0gMC4xO1xyXG5cclxuRU5HSU5FLkdhbWUgPSB7XHJcblxyXG4gIGJvbnVzZXM6IHtcclxuXHJcbiAgICBtYWduZXQ6IDAuMSxcclxuICAgIGxhc2VyOiAwLjIsXHJcbiAgICBzaGllbGQ6IDAuNFxyXG5cclxuICB9LFxyXG5cclxuICBleHBsb3Npb246IGZ1bmN0aW9uKHgsIHksIGNvdW50LCBjb2xvcikge1xyXG5cclxuICAgIGlmICghdGhpcy5wYXJ0aWNsZXNQb29sKSB7XHJcblxyXG4gICAgICB0aGlzLnBhcnRpY2xlc1Bvb2wgPSBbXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuXHJcbiAgICAgICAgdmFyIHBhcnRpY2xlID0gdGhpcy5hZGQoRU5HSU5FLlBhcnRpY2xlLCB7XHJcbiAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgeTogeVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlc1Bvb2wucHVzaChwYXJ0aWNsZSk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnBhcnRpY2xlSW5kZXggPSAwO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjb3VudDsgaSsrKSB7XHJcblxyXG4gICAgICBpZiAoKyt0aGlzLnBhcnRpY2xlSW5kZXggPj0gdGhpcy5wYXJ0aWNsZXNQb29sLmxlbmd0aCkgdGhpcy5wYXJ0aWNsZUluZGV4ID0gMDs7XHJcblxyXG4gICAgICB2YXIgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1Bvb2xbdGhpcy5wYXJ0aWNsZUluZGV4XTtcclxuXHJcbiAgICAgIHBhcnRpY2xlLnggPSB4O1xyXG4gICAgICBwYXJ0aWNsZS55ID0geTtcclxuICAgICAgcGFydGljbGUuY29sb3IgPSBjb2xvcjtcclxuXHJcbiAgICAgIHBhcnRpY2xlLnJlc2V0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByYW5kb206IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmJlbmNobWFyayA/IDAuNSA6IE1hdGgucmFuZG9tKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGFkZDogZnVuY3Rpb24oY29uc3RydWN0b3IsIGFyZ3MpIHtcclxuXHJcbiAgICBhcmdzID0gYXJncyB8fCB7fTtcclxuXHJcbiAgICBhcmdzLmdhbWUgPSB0aGlzO1xyXG5cclxuICAgIHZhciBlbnRpdHkgPSBuZXcgY29uc3RydWN0b3IoYXJncyk7XHJcblxyXG4gICAgdGhpcy5lbnRpdGllcy5wdXNoKGVudGl0eSk7XHJcblxyXG4gICAgcmV0dXJuIGVudGl0eTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVtb3ZlOiBmdW5jdGlvbihlbnRpdHkpIHtcclxuXHJcbiAgICBlbnRpdHkuZGVhZCA9IHRydWU7XHJcblxyXG4gIH0sXHJcblxyXG4gIHNjYWxlQ29taWNCdWJibGU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuY29taWNTY2FsZSA9IDEuMDtcclxuXHJcbiAgICAkY29taWNidWJibGUgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjY29taWNidWJibGVcIik7XHJcblxyXG4gICAgdmFyIHR3ZWVuID0gYXBwLnR3ZWVuKHRoaXMpLnRvKHtcclxuICAgICAgY29taWNTY2FsZTogMC41XHJcbiAgICB9KTtcclxuXHJcbiAgICB0d2Vlbi5vbnN0ZXAgPSBmdW5jdGlvbihhcHApIHtcclxuXHJcbiAgICAgICRjb21pY2J1YmJsZS5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKFwiICsgYXBwLmNvbWljU2NhbGUgKyBcIixcIiArIGFwcC5jb21pY1NjYWxlICsgXCIpXCI7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBlbnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgIGdhKCdzZW5kJywgJ3NjcmVlbnZpZXcnLCB7XHJcbiAgICAgICAgJ2FwcE5hbWUnOiAnUG93ZXJTdXJnZScsXHJcbiAgICAgICAgJ3NjcmVlbk5hbWUnOiAnR2FtZSdcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLnJlbmRlcmVyLnNldFNtb290aGluZyhmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5zY2FsZUNvbWljQnViYmxlKCk7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJiYXNlbGluZVwiLCBhcHAuYmFzZWxpbmUpO1xyXG5cclxuICAgIHRoaXMubXVzaWMgPSBhcHAubXVzaWMucGxheShcImR1c3RcIikudm9sdW1lKDAuNSkuZmFkZUluKDQpLmxvb3AoKTtcclxuXHJcbiAgICB0aGlzLmdyYWRpZW50ID0gYXBwLmN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChhcHAuY2VudGVyLngsIGFwcC5jZW50ZXIueSwgMCwgYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIGFwcC5jZW50ZXIueCk7XHJcblxyXG4gICAgdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCBcInRyYW5zcGFyZW50XCIpO1xyXG4gICAgdGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMS4wLCBcIiMwMDBcIik7XHJcblxyXG4gICAgdGhpcy5yZXNldCgpO1xyXG5cclxuICB9LFxyXG5cclxuICBsZWF2ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5tdXNpYy5mYWRlT3V0KDIpO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRTY2FsZTogZnVuY3Rpb24oZW50aXR5KSB7XHJcblxyXG4gICAgcmV0dXJuIDEgLSBNYXRoLm1pbigxLjAsIFV0aWxzLmRpc3RhbmNlKGVudGl0eSwgYXBwLmNlbnRlcikgLyAoYXBwLndpZHRoICogMC41KSkgKiAwLjc1O1xyXG5cclxuICB9LFxyXG5cclxuICBzcGF3bkFzdGVyb2lkOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYW5nbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XHJcbiAgICB2YXIgcmFkaXVzID0gYXBwLndpZHRoIC8gMjtcclxuICAgIHZhciBveCA9IE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgIHZhciBveSA9IE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcclxuXHJcbiAgICB0aGlzLmFkZChFTkdJTkUuQXN0ZXJvaWQsIHtcclxuICAgICAgeDogYXBwLmNlbnRlci54ICsgb3gsXHJcbiAgICAgIHk6IGFwcC5jZW50ZXIueSArIG95XHJcbiAgICB9KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuc3Bhd25UaW1lb3V0ID0gMDtcclxuICAgIHRoaXMuY3B1VXNhZ2UgPSAwO1xyXG4gICAgdGhpcy5jcHVCYXJQcm9ncmVzcyA9IDA7XHJcblxyXG4gICAgdGhpcy51cGdyYWRlcyA9IHtcclxuXHJcbiAgICAgIHNwZWVkOiAxLFxyXG4gICAgICBkYW1hZ2U6IDEsXHJcbiAgICAgIGxpZmU6IDFcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZSB0aGlzLnBhcnRpY2xlc1Bvb2w7XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgdGhpcy53YXZlID0gMDtcclxuXHJcbiAgICB0aGlzLnRvb2x0aXAgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmVudGl0aWVzID0gW107XHJcblxyXG4gICAgdGhpcy5zdGFycyA9IHRoaXMuYWRkKEVOR0lORS5CYWNrZ3JvdW5kU3RhcnMpO1xyXG5cclxuICAgIHRoaXMucGxheWVyUGxhbmV0ID0gdGhpcy5hZGQoRU5HSU5FLlBsYW5ldCwge1xyXG4gICAgICB4OiBhcHAuY2VudGVyLngsXHJcbiAgICAgIHk6IGFwcC5jZW50ZXIueSxcclxuICAgICAgdGVhbTogMVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIgPSBuZXcgRU5HSU5FLkN1cnNvcih0aGlzLCAxLCB0aGlzLnBsYXllclBsYW5ldCk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIueCA9IGFwcC5jZW50ZXIueDtcclxuICAgIHRoaXMucGxheWVyLnkgPSBhcHAuY2VudGVyLnk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuXHJcbiAgICAgIHRoaXMuc3Bhd25Bc3Rlcm9pZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgYnV0dG9ucyA9IFtcInNwZWVkXCIsIFwibGlmZVwiLCBcImRhbWFnZVwiXTtcclxuXHJcbiAgICB0aGlzLmJ1dHRvbnMgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBrZXkgPSBidXR0b25zW2ldO1xyXG5cclxuICAgICAgdGhpcy5idXR0b25zW2tleV0gPSB0aGlzLmFkZChFTkdJTkUuQnV0dG9uLCB7XHJcbiAgICAgICAgY29sb3I6IGRlZnMudGVhbUNvbG9yWzFdLFxyXG4gICAgICAgIHg6IGFwcC5jZW50ZXIueCAtIDgwICsgaSAqIDEwMCxcclxuICAgICAgICB5OiBhcHAuaGVpZ2h0IC0gNzAsXHJcbiAgICAgICAgc3ByaXRlOiBkZWZzLmJ1dHRvbnNba2V5XSxcclxuICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICBjb3VudDogMSxcclxuICAgICAgICBob3ZlcmFibGU6IFwiYnVpbGRcIixcclxuICAgICAgICB0b29sdGlwOiBkZWZzLnRvb2x0aXBzW2tleV1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5leHRXYXZlKCk7XHJcblxyXG4gICAgdGhpcy5leHBsb3Npb24oYXBwLmNlbnRlci54LCBhcHAuY2VudGVyLnksIDEpO1xyXG5cclxuICB9LFxyXG5cclxuICBjcHVIaXN0b3J5OiBbXSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB2YXIgYmVmb3JlID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcblxyXG4gICAgLyogc2xvdyBtb3Rpb24gLSB3aGVuIHlvdSBjb2xsZWN0IGZyZWV6ZSBwb3dlcnVwICovXHJcblxyXG4gICAgdGhpcy50aW1lRmFjdG9yID0gMS4wO1xyXG5cclxuICAgIGlmICh0aGlzLmZyZWV6ZUxpZmVzcGFuID4gMCkge1xyXG5cclxuICAgICAgdGhpcy5mcmVlemVMaWZlc3BhbiAtPSBkdDtcclxuICAgICAgdGhpcy50aW1lRmFjdG9yID0gMC4xO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiB1cGRhdGUgdGhlIGdhbWUgMTAgdGltZXMgdG8gbWFnbml0dWRlIHJlc3VsdHMgaW4gcHJvZmlsZXIgKi9cclxuXHJcbiAgICB2YXIgTUFHTklGWSA9IDU7XHJcblxyXG4gICAgdmFyIHF1b3RhID0gMC4wO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcclxuICAgICAgcXVvdGEgKz0gZW50aXR5LnF1b3RhIHx8IDAuNztcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTUFHTklGWTsgaisrKSB7XHJcbiAgICAgICAgZW50aXR5LnN0ZXAoZHQgLyBNQUdOSUZZKTtcclxuXHJcbiAgICAgICAgaWYgKGVudGl0eS5kZWFkKSB7XHJcbiAgICAgICAgICB0aGlzLmVudGl0aWVzLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5xdW90YSA9IHF1b3RhO1xyXG5cclxuICAgIHZhciBmcmFtZVRpbWUgPSAocGVyZm9ybWFuY2Uubm93KCkgLSBiZWZvcmUpIC8gTUFHTklGWTtcclxuXHJcbiAgICAvKiBtZWFzdXJlIG9wdGltaXphdGlvbiAqL1xyXG5cclxuICAgIC8qIEl0J3MgdGhlIGF2ZXJhZ2Ugb2YgMTAwIGZyYW1lIHRpbWVzICovXHJcblxyXG4gICAgLypcclxuXHJcbiAgICAgIGJhc2VsaW5lRmFjdG9yICAgICAgLSBiYXNlbGluZSB2cyByZWZlcmVuY2Ugc2FtcGxlIHRvIGdldCBkZXZpY2UgcG93ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoZSBkZXZpY2UgaXMgb3Zlci1wb3dlcmVkIHdlIGFydGlmaWNpYWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWtlIGZyYW1lVGltZSBoaWdoZXIgdG8gbWFrZSBpdCBtb3JlIGZhaXIgYW1vbmcgdGhlIHBsYXllcnNcclxuXHJcbiAgICAgIG9wdGltaXphdGlvblJhdGluZyAgLSByZWZlcmVuY2UgZnJhbWUgdGltZSBkaXZpZGVkIGJ5IChjdXJyZW50KSBhdmVyYWdlIGZyYW1lIHRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRpY2FwZWQgYnkgYmFzZWxpbmVGYWN0b3IgLSB0aGlzIGdpdmVzIGEgZmFjdG9yIG9mXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3cgd2VsbCB1c2VyIG9wdGltaXplZCB0aGUgZ2FtZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1ha2UgUkVGRVJFTkNFX0ZSQU1FX1RJTUUgaGlnaGVyIHRvIGdpdmUgcGxheWVyIE1PUkUgY3B1IG91dHB1dFxyXG5cclxuICAgICovXHJcblxyXG5cclxuICAgIHRoaXMuY3B1SGlzdG9yeS5wdXNoKGZyYW1lVGltZSAvIHF1b3RhKTtcclxuXHJcbiAgICBpZiAodGhpcy5jcHVIaXN0b3J5Lmxlbmd0aCA+IDYwKSB0aGlzLmNwdUhpc3Rvcnkuc2hpZnQoKTtcclxuXHJcbiAgICB0aGlzLmF2ZXJhZ2VGcmFtZVRpbWUgPSB0aGlzLmF2ZXJhZ2UodGhpcy5jcHVIaXN0b3J5KTtcclxuXHJcbiAgICB0aGlzLm9wdGltaXphdGlvblJhdGluZyA9ICgoMC44IC8gYXBwLmJhc2VsaW5lKSAvICh0aGlzLmF2ZXJhZ2VGcmFtZVRpbWUpKTtcclxuXHJcbiAgICB0aGlzLnBsYXllci5zdGVwKGR0KTtcclxuXHJcbiAgICAvKiB1c2Ugb3B0aW1pemF0aW9uIHJlc3VsdHMgdG8gYWZmZWN0IHRoZSBnYW1lICovXHJcblxyXG4gICAgdGhpcy5hcHBseU9wdGltaXphdGlvbihkdCk7XHJcblxyXG5cclxuICB9LFxyXG5cclxuICBhdmVyYWdlOiBmdW5jdGlvbihhcnJheSkge1xyXG5cclxuICAgIGlmICghYXJyYXkubGVuZ3RoKSByZXR1cm4gMDtcclxuXHJcbiAgICB2YXIgc3VtID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHN1bSArPSBhcnJheVtpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VtIC8gYXJyYXkubGVuZ3RoO1xyXG5cclxuICB9LFxyXG5cclxuICBhcHBseU9wdGltaXphdGlvbjogZnVuY3Rpb24oZHQpIHtcclxuXHJcbiAgICB2YXIgY3B1VXNhZ2UgPSAwO1xyXG5cclxuICAgIC8qIGNhbGN1bGF0ZSAoYXJ0aWZpY2lhbCkgY3B1VXNhZ2Ugb2Ygc2hpcHNcclxuICAgICAgIGlmIGNwdVVzYWdlIGlzIGdyZWF0ZXIgdGhhbiBvcHRpbWl6YXRpb25SYXRpbmdcclxuICAgICAgIGZyZWV6ZSBhIHNoaXBcclxuICAgICovXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXTtcclxuXHJcbiAgICAgIGlmICghKGVudGl0eSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSkgY29udGludWU7XHJcbiAgICAgIGlmICghZW50aXR5LnRlYW0pIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoZW50aXR5LmZyZWUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgY3B1VXNhZ2UgKz0gU0hJUF9DUFVfQ09TVDtcclxuXHJcbiAgICAgIGlmIChjcHVVc2FnZSA8IHRoaXMub3B0aW1pemF0aW9uUmF0aW5nKSB7XHJcblxyXG4gICAgICAgIGVudGl0eS5mcm96ZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIGVudGl0eS5mcm96ZW4gPSB0cnVlO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiB0d2VlbiBjcHVVc2FnZSBpbnN0ZWFkIG9mIHNldHRpbmcgaXQgaW5zdGFudGx5IChsZXNzIGppdHRlcmluZykgKi9cclxuXHJcbiAgICB0aGlzLmNwdVVzYWdlID0gVXRpbHMubW92ZVRvKHRoaXMuY3B1VXNhZ2UsIGNwdVVzYWdlLCBNYXRoLmFicyh0aGlzLmNwdVVzYWdlIC0gY3B1VXNhZ2UpICogMC4yNSAqIGR0KTtcclxuICAgIHRoaXMucmVhbENwdVVzYWdlID0gY3B1VXNhZ2U7XHJcblxyXG4gICAgLyogdGhhdCdzIHRoZSB2YWx1ZSAwLjAgLSAxLjAgdGhhdCBjb3Jlc3BvbmRzIHdpdGggdGhlIHllbGxvdyBwb3dlciBiYXIgKi9cclxuXHJcbiAgICB0aGlzLmNwdVJhdGlvID0gMSAtIE1hdGgubWluKDEuMCwgdGhpcy5jcHVVc2FnZSAvIHRoaXMub3B0aW1pemF0aW9uUmF0aW5nKTtcclxuICAgIHRoaXMuY3B1QmFyUHJvZ3Jlc3MgPSBVdGlscy5tb3ZlVG8odGhpcy5jcHVCYXJQcm9ncmVzcywgdGhpcy5jcHVSYXRpbywgMC4yICogZHQpO1xyXG5cclxuICAgIC8qIHNwYXduIHNoaXBzIGlmIHRoZXJlIGlzIGVub3VnaCBwb3dlciAqL1xyXG5cclxuICAgIGlmICgodGhpcy5zcGF3blRpbWVvdXQgLT0gZHQpIDw9IDApIHtcclxuXHJcbiAgICAgIHRoaXMuc3Bhd25UaW1lb3V0ID0gMC41O1xyXG5cclxuICAgICAgLy9pZiAodGhpcy5jcHVSYXRpbyA+IDAuNSkgdGhpcy5wbGF5ZXJQbGFuZXQuc3Bhd25TaGlwKFwiZmlnaHRlclwiKTtcclxuICAgICAgaWYgKHRoaXMub3B0aW1pemF0aW9uUmF0aW5nID4gdGhpcy5yZWFsQ3B1VXNhZ2UgKyAwLjEpIHRoaXMucGxheWVyUGxhbmV0LnNwYXduU2hpcChcImZpZ2h0ZXJcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBzaGFrZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5zaGFrZUxpZmVzcGFuID0gMC40O1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmF2ZXJhZ2VGcmFtZVRpbWUpIHJldHVybjtcclxuXHJcbiAgICBhcHAuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICBhcHAuY3R4LnNhdmUoKTtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiIzI4MjI0NVwiO1xyXG4gICAgYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xyXG5cclxuICAgIC8vIGFwcC5jdHguZmlsbFN0eWxlID0gdGhpcy5ncmFkaWVudDtcclxuICAgIC8vYXBwLmN0eC5maWxsUmVjdCgwLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHQpO1xyXG5cclxuICAgIGlmICh0aGlzLnNoYWtlTGlmZXNwYW4gPiAwKSB7XHJcbiAgICAgIHRoaXMuc2hha2VMaWZlc3BhbiAtPSBkdDtcclxuICAgICAgdmFyIGNoYW9zID0gVXRpbHMucmFuZG9tKC02LCA2KTtcclxuICAgICAgYXBwLmN0eC50cmFuc2xhdGUoY2hhb3MsIGNoYW9zKVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgdGhpcy5lbnRpdGllc1tpXS5yZW5kZXIoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wbGF5ZXIucmVuZGVyKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJUb29sdGlwKCk7XHJcblxyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XHJcbiAgICBhcHAuY3R4LmZvbnQgPSBcImJvbGQgMTZweCBBcmlhbFwiO1xyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAgIGFwcC5jdHguZmlsbFRleHQoXCJTQ09SRTogXCIgKyB0aGlzLnNjb3JlLCBhcHAud2lkdGggLSAyMCwgMjApO1xyXG5cclxuICAgIHRoaXMucmVuZGVyQ1BVQmFyKCk7XHJcbiAgICAvLyB0aGlzLnJlbmRlckJvbnVzZXMoKTtcclxuXHJcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICBhcHAuY3R4LmZvbnQgPSBcImJvbGQgNjRweCBBcmlhbFwiO1xyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmYTBcIjtcclxuICAgIGFwcC5jdHguZmlsbFRleHQodGhpcy5wbGF5ZXIucmVzb3VyY2VzLCBhcHAuY2VudGVyLnggLSAxODAsIGFwcC5oZWlnaHQgLSAxMDQpO1xyXG5cclxuICAgIC8vIGFwcC5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICAvLyBhcHAuY3R4LmZvbnQgPSBcImJvbGQgMTZweCBBcmlhbFwiO1xyXG4gICAgLy8gYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmZmZcIjtcclxuICAgIC8vIGFwcC5jdHguZmlsbFRleHQoXHJcbiAgICAvLyAgIHRoaXMub3B0aW1pemF0aW9uUmF0aW5nLnRvRml4ZWQoMikgKyBcIiB8IFwiICtcclxuICAgIC8vICAgLy8gdGhpcy5iYXNlbGluZUZhY3Rvci50b0ZpeGVkKDIpICsgXCIgfCBcIiArXHJcbiAgICAvLyAgIHRoaXMuZW50aXRpZXMubGVuZ3RoICsgJyArICcgK1xyXG4gICAgLy8gICB0aGlzLnF1b3RhLnRvRml4ZWQoMSksIDE2LCAxNik7XHJcblxyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGJhcldpZHRoOiAyMDAsXHJcblxyXG4gIHJlbmRlckNQVUJhcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHZhciB3aWR0aCA9IDIwMDtcclxuICAgIHZhciBjdXJyZW50V2lkdGggPSB0aGlzLmJhcldpZHRoICogdGhpcy5jcHVCYXJQcm9ncmVzcztcclxuXHJcbiAgICBhcHAuY3R4LmRyYXdJbWFnZShhcHAuaW1hZ2VzLnNwcml0ZXNoZWV0LFxyXG4gICAgICBkZWZzLmZyb3plblNwcml0ZVswXSwgZGVmcy5mcm96ZW5TcHJpdGVbMV0sIGRlZnMuZnJvemVuU3ByaXRlWzJdLCBkZWZzLmZyb3plblNwcml0ZVszXSxcclxuICAgICAgYXBwLmNlbnRlci54IC0gdGhpcy5iYXJXaWR0aCAvIDIgLSAzMiwgMjQsIGRlZnMuZnJvemVuU3ByaXRlWzJdLCBkZWZzLmZyb3plblNwcml0ZVszXSk7XHJcblxyXG5cclxuICAgIGFwcC5jdHguc3Ryb2tlU3R5bGUgPSBcIiNmYTBcIjtcclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmEwXCI7XHJcbiAgICBhcHAuY3R4LmxpbmVXaWR0aCA9IDI7XHJcblxyXG4gICAgYXBwLmN0eC5zdHJva2VSZWN0KGFwcC5jZW50ZXIueCAtIHRoaXMuYmFyV2lkdGggLyAyLCAxNiwgdGhpcy5iYXJXaWR0aCwgMzIpXHJcbiAgICBhcHAuY3R4LmZpbGxSZWN0KGFwcC5jZW50ZXIueCAtIHRoaXMuYmFyV2lkdGggLyAyLCAxNiwgY3VycmVudFdpZHRoLCAzMilcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgYXBwLmZvbnRTaXplKDE2KTtcclxuICAgIGFwcC5jdHguZmlsbFRleHQoXCJBVkFJTEFCTEUgQ1BVXCIsIGFwcC5jZW50ZXIueCwgMjQpO1xyXG5cclxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZhMFwiO1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFRleHQoXCIrIFwiICsgdGhpcy5vcHRpbWl6YXRpb25SYXRpbmcudG9GaXhlZCgyKSwgYXBwLmNlbnRlci54ICsgd2lkdGggLyAyICsgMTYsIDE2KTtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2M0MFwiO1xyXG4gICAgYXBwLmN0eC5maWxsVGV4dChcIi0gXCIgKyB0aGlzLnJlYWxDcHVVc2FnZS50b0ZpeGVkKDIpLCBhcHAuY2VudGVyLnggKyB3aWR0aCAvIDIgKyAxNiwgMzIpO1xyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgcmVuZGVyQm9udXNlczogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgYXBwLmN0eC5zYXZlKCk7XHJcbiAgICBhcHAuY3R4LnRyYW5zbGF0ZShhcHAuY2VudGVyLnggLSB0aGlzLmJhcldpZHRoIC8gMiwgNTQpO1xyXG4gICAgYXBwLmN0eC50ZXh0QWxpZ24gPSBcImxlZnRcIjtcclxuICAgIGFwcC5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcclxuXHJcbiAgICB2YXIgaSA9IE9iamVjdC5rZXlzKHRoaXMuYm9udXNlcykubGVuZ3RoO1xyXG5cclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmJvbnVzZXMpIHtcclxuXHJcbiAgICAgIHZhciB0aHJlc2hvbGQgPSB0aGlzLmJvbnVzZXNba2V5XTtcclxuXHJcbiAgICAgIHZhciB4ID0gdGhpcy5iYXJXaWR0aCAqIHRocmVzaG9sZDtcclxuICAgICAgdmFyIHkgPSBpICogMTY7XHJcblxyXG4gICAgICBhcHAuY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5jaGVja0JvbnVzKGtleSkgPyAxLjAgOiAwLjQ7XHJcblxyXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZlwiO1xyXG4gICAgICBhcHAuY3R4LmZpbGxSZWN0KHgsIDAsIDIsIHkpO1xyXG4gICAgICBhcHAuY3R4LmZpbGxSZWN0KHgsIHksIDE2LCAyKTtcclxuXHJcbiAgICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZmZmXCI7XHJcbiAgICAgIGFwcC5mb250U2l6ZSgxMik7XHJcbiAgICAgIGFwcC5jdHguZmlsbFRleHQoZGVmcy5ib251c2VzW2tleV0udG9VcHBlckNhc2UoKSwgeCArIDIwLCB5IC0gNik7XHJcblxyXG4gICAgICBpLS07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFwcC5jdHgucmVzdG9yZSgpO1xyXG5cclxuICB9LFxyXG5cclxuXHJcbiAgcmVuZGVyVG9vbHRpcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnRvb2x0aXApIHJldHVybjtcclxuXHJcbiAgICBhcHAubGF5ZXIudGV4dEFsaWduKFwiY2VudGVyXCIpLmZpbGxTdHlsZShcIiNmZmZcIikuZm9udChcIjE2cHggQXJpYWxcIikudGV4dFdpdGhCYWNrZ3JvdW5kKHRoaXMudG9vbHRpcCwgYXBwLmNlbnRlci54LCBhcHAuaGVpZ2h0IC0gNjQsIFwicmdiYSgwLDAsMCwwLjYpXCIsIDE2KTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcG9pbnRlcm1vdmU6IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICB0aGlzLnBsYXllci54ID0gZS54O1xyXG4gICAgdGhpcy5wbGF5ZXIueSA9IGUueTtcclxuXHJcbiAgfSxcclxuXHJcbiAgd3JhcDogZnVuY3Rpb24oZW50aXR5KSB7XHJcblxyXG4gICAgaWYgKGVudGl0eS54ICsgZW50aXR5LnJhZGl1cyA8IDApIGVudGl0eS54ID0gYXBwLndpZHRoICsgZW50aXR5LnJhZGl1cztcclxuICAgIGlmIChlbnRpdHkueCAtIGVudGl0eS5yYWRpdXMgPiBhcHAud2lkdGgpIGVudGl0eS54ID0gLWVudGl0eS5yYWRpdXM7XHJcbiAgICBpZiAoZW50aXR5LnkgKyBlbnRpdHkucmFkaXVzIDwgMCkgZW50aXR5LnkgPSBhcHAuaGVpZ2h0ICsgZW50aXR5LnJhZGl1cztcclxuICAgIGlmIChlbnRpdHkueSAtIGVudGl0eS5yYWRpdXMgPiBhcHAuaGVpZ2h0KSBlbnRpdHkueSA9IC1lbnRpdHkucmFkaXVzO1xyXG5cclxuICB9LFxyXG5cclxuICBrZXlkb3duOiBmdW5jdGlvbihlKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIG5leHRXYXZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5iZW5jaG1hcmspIHJldHVybjtcclxuXHJcbiAgICB0aGlzLndhdmUrKztcclxuXHJcbiAgICB0aGlzLnNoaXBzTGVmdCA9IDA7XHJcblxyXG4gICAgdmFyIHN0cmVhbXNQb3NpdGlvbnMgPSBbXHJcbiAgICAgIFswLjAsIDEuMF0sXHJcbiAgICAgIFswLjAsIDAuNV0sXHJcbiAgICAgIFswLjAsIDAuMF0sXHJcbiAgICAgIFsxLjAsIDAuMF0sXHJcbiAgICAgIFsxLjAsIDAuNV0sXHJcbiAgICAgIFsxLjAsIDEuMF1cclxuICAgIF07XHJcblxyXG4gICAgdmFyIGRpZmZpY3VsdHkgPSB0aGlzLndhdmUgLyAyMDtcclxuXHJcbiAgICBVdGlscy5zaHVmZmxlKHN0cmVhbXNQb3NpdGlvbnMpO1xyXG5cclxuICAgIHZhciBzdHJlYW1zQ291bnQgPSBNYXRoLm1pbigzLCAxICsgZGlmZmljdWx0eSkgKyAwLjMgfCAwO1xyXG4gICAgdmFyIHNoaXBzUGVyU3RyZWFtID0gTWF0aC5taW4oMTYsIDQgKyBkaWZmaWN1bHR5ICogNCkgfCAwO1xyXG5cclxuICAgIHZhciBwb3NzaWJsZVNoaXBzID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMud2F2ZSA+IDApIHBvc3NpYmxlU2hpcHMucHVzaChcImNyZWVwMVwiKTtcclxuICAgIGlmICh0aGlzLndhdmUgPiAzKSBwb3NzaWJsZVNoaXBzLnB1c2goXCJjcmVlcDJcIik7XHJcbiAgICBpZiAodGhpcy53YXZlID4gNikgcG9zc2libGVTaGlwcy5wdXNoKFwiY3JlZXAzXCIpO1xyXG4gICAgaWYgKHRoaXMud2F2ZSA+IDEwKSBwb3NzaWJsZVNoaXBzLnB1c2goXCJjcmVlcDRcIik7XHJcblxyXG4gICAgaWYgKHRoaXMud2F2ZSAlIDUgPT09IDApIHBvc3NpYmxlU2hpcHMgPSBbXCJib3NzXCJdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyZWFtc0NvdW50OyBpKyspIHtcclxuXHJcbiAgICAgIHZhciBzdHJlYW0gPSBzdHJlYW1zUG9zaXRpb25zLnBvcCgpO1xyXG5cclxuICAgICAgdmFyIHggPSBzdHJlYW1bMF0gKiBhcHAud2lkdGg7XHJcbiAgICAgIHZhciB5ID0gc3RyZWFtWzFdICogYXBwLmhlaWdodDtcclxuXHJcbiAgICAgIHZhciBzaGlwID0gVXRpbHMucmFuZG9tKHBvc3NpYmxlU2hpcHMpO1xyXG4gICAgICB2YXIgc2hpcERhdGEgPSBkZWZzLnNoaXBzW3NoaXBdO1xyXG4gICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHkgLSBhcHAuY2VudGVyLnksIHggLSBhcHAuY2VudGVyLngpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzaGlwc1BlclN0cmVhbTsgaisrKSB7XHJcblxyXG4gICAgICAgIHZhciBlbnRpdHkgPSB0aGlzLmFkZChFTkdJTkUuU2hpcCwge1xyXG4gICAgICAgICAgdHlwZTogc2hpcCxcclxuICAgICAgICAgIHg6IHggKyBNYXRoLmNvcyhhbmdsZSkgKiBqICogMTAwLFxyXG4gICAgICAgICAgeTogeSArIE1hdGguc2luKGFuZ2xlKSAqIGogKiAxMDAsXHJcbiAgICAgICAgICB0ZWFtOiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hpcHNMZWZ0Kys7XHJcblxyXG4gICAgICAgIGlmIChzaGlwRGF0YS5ib3NzKSB7XHJcblxyXG4gICAgICAgICAgZW50aXR5LmhwID0gZW50aXR5Lm1heEhwID0gdGhpcy5zY29yZTtcclxuICAgICAgICAgIGVudGl0eS5kYW1hZ2UgPSB0aGlzLnNjb3JlIC8gNTAgfCAwO1xyXG4gICAgICAgICAgZW50aXR5LnNjYWxlID0gMC41ICsgdGhpcy5zY29yZSAvIDIwMDtcclxuXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcmVwYWlyU2hpcHM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBzaGlwcyA9IFV0aWxzLmZpbHRlcih0aGlzLmVudGl0aWVzLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHJldHVybiAoZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwKSAmJiBlLnRlYW07XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICBzaGlwc1tpXS5yZXBhaXIoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIG9uZW5lbXlkZWF0aDogZnVuY3Rpb24oc2hpcCkge1xyXG5cclxuICAgIHRoaXMuc2hpcHNMZWZ0LS07XHJcblxyXG4gICAgaWYgKHRoaXMuc2hpcHNMZWZ0IDw9IDApIHRoaXMubmV4dFdhdmUoKTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcG9pbnRlcmRvd246IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgfSxcclxuXHJcbiAgZ2FtZW92ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIEVOR0lORS5HYW1lb3Zlci5zY29yZSA9IHRoaXMuc2NvcmU7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5nYSkge1xyXG4gICAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXHJcbiAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiAnZ2FtZScsXHJcbiAgICAgICAgJ2V2ZW50QWN0aW9uJzogJ292ZXInLFxyXG4gICAgICAgICdldmVudFZhbHVlJzogdGhpcy5zY29yZSxcclxuICAgICAgICAnbm9uSW50ZXJhY3Rpb24nOiB0cnVlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcC5zZXRTdGF0ZShFTkdJTkUuR2FtZW92ZXIpO1xyXG5cclxuICB9LFxyXG5cclxuICBjaGVja0JvbnVzOiBmdW5jdGlvbihrZXkpIHtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuUG93ZXJ1cCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIGFyZ3MpO1xyXG5cclxuICB0aGlzLnJhZGl1cyA9IDMyO1xyXG5cclxuICB0aGlzLmRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2LjI4O1xyXG4gIHRoaXMuc3BlZWQgPSAzMjtcclxuXHJcbiAgdGhpcy5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2LjI4O1xyXG4gIHRoaXMuZm9yY2UgPSA2NCArIE1hdGgucmFuZG9tKCkgKiAxMjg7XHJcblxyXG4gIHRoaXMuZm9yY2UgKj0gMztcclxuICB0aGlzLmZvcmNlRGFtcGluZyA9IHRoaXMuZm9yY2U7XHJcblxyXG4gIHRoaXMubGlmZXRpbWUgPSAwO1xyXG4gIHRoaXMuZHVyYXRpb24gPSAxMDtcclxuXHJcbiAgdmFyIGtleXMgPSBbXCJyZXBhaXJcIiwgXCJtaXNzaWxlc1wiLCBcImZyZWV6ZVwiXTtcclxuXHJcbiAgdmFyIGZyZWVsYW5lcnNDb3VudCA9IFV0aWxzLmZpbHRlcih0aGlzLmdhbWUuZW50aXRpZXMsIGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiBlLmZyZWUgJiYgZSBpbnN0YW5jZW9mIEVOR0lORS5TaGlwO1xyXG4gIH0pLmxlbmd0aDtcclxuXHJcbiAgaWYgKGZyZWVsYW5lcnNDb3VudCA8IDIpIGtleXMucHVzaChcImZyZWVsYW5jZXJcIik7XHJcblxyXG4gIHRoaXMua2V5ID0gVXRpbHMucmFuZG9tKGtleXMpO1xyXG4gIHRoaXMuc3ByaXRlID0gdGhpcy5zcHJpdGVzW3RoaXMua2V5XTtcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuUG93ZXJ1cC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuUG93ZXJ1cCxcclxuXHJcbiAgc3ByaXRlOiBbMjE2LCAxNTksIDE0LCAxNF0sXHJcblxyXG4gIHR5cGU6IFwicG93ZXJ1cFwiLFxyXG5cclxuICBzcHJpdGVzOiB7XHJcblxyXG4gICAgXCJyZXBhaXJcIjogWzI0NSwgODksIDIzLCAyNV0sXHJcbiAgICBcImZyZWVsYW5jZXJcIjogWzI3NiwgNTEsIDMyLCAzMl0sXHJcbiAgICBcImZyZWV6ZVwiOiBbMjQyLCAxMTksIDE5LCAyMV0sXHJcbiAgICBcIm1pc3NpbGVzXCI6IFszMTEsIDEzLCAyOCwgMzJdXHJcblxyXG4gIH0sXHJcblxyXG4gIGNvbGxlY3Q6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZ2FtZS5leHBsb3Npb24odGhpcy54LCB0aGlzLnksIDE2LCBcIiNmZmZcIik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBhcHAuc291bmQucGxheShcInBvd2VydXBcIik7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBsYXllci5wb2tlKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZChFTkdJTkUuVGV4dE91dCwge1xyXG4gICAgICB4OiB0aGlzLngsXHJcbiAgICAgIHk6IHRoaXMueSxcclxuICAgICAgdGV4dDogdGhpcy5rZXlcclxuICAgIH0pO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5rZXkpIHtcclxuXHJcbiAgICAgIGNhc2UgXCJmcmVlemVcIjpcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmZyZWV6ZUxpZmVzcGFuID0gNC4wO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJtaXNzaWxlc1wiOlxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykgdGhpcy5nYW1lLmFkZChFTkdJTkUuTWlzc2lsZSwge1xyXG4gICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgeTogdGhpcy55LFxyXG4gICAgICAgICAgdGVhbTogMVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgXCJyZXBhaXJcIjpcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLnJlcGFpclNoaXBzKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuXHJcbiAgICAgIGNhc2UgXCJmcmVlbGFuY2VyXCI6XHJcblxyXG4gICAgICAgIHZhciBzaGlwID0gdGhpcy5nYW1lLmFkZChFTkdJTkUuU2hpcCwge1xyXG4gICAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgICAgeTogdGhpcy55LFxyXG4gICAgICAgICAgdHlwZTogXCJmcmVlbGFuY2VyXCIsXHJcbiAgICAgICAgICB0ZWFtOiAxLFxyXG4gICAgICAgICAgZnJlZTogdHJ1ZSxcclxuICAgICAgICAgIHBsYW5ldDogdGhpcy5nYW1lLnBsYXllclBsYW5ldFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzaGlwLmZvcmNlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIDY7XHJcbiAgICAgICAgc2hpcC5mb3JjZSA9IDIwMDtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgdGhpcy5saWZldGltZSArPSBkdDtcclxuXHJcbiAgICB2YXIgcGxheWVyRGlzdGFuY2UgPSBVdGlscy5kaXN0YW5jZSh0aGlzLCB0aGlzLmdhbWUucGxheWVyKTtcclxuXHJcbiAgICBpZiAodGhpcy5mb3JjZSkge1xyXG5cclxuICAgICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZm9yY2VEaXJlY3Rpb24pICogdGhpcy5mb3JjZSAqIGR0O1xyXG4gICAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5mb3JjZURpcmVjdGlvbikgKiB0aGlzLmZvcmNlICogZHQ7XHJcblxyXG4gICAgICB0aGlzLmZvcmNlID0gTWF0aC5tYXgoMCwgdGhpcy5mb3JjZSAtIHRoaXMuZm9yY2VEYW1waW5nICogZHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5saWZldGltZSA+IDAuNSkge1xyXG4gICAgICBpZiAocGxheWVyRGlzdGFuY2UgPCAzMikge1xyXG4gICAgICAgIHRoaXMuY29sbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIucmVzb3VyY2VzKys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5saWZldGltZSA+IHRoaXMuZHVyYXRpb24pIHRoaXMuZ2FtZS5yZW1vdmUodGhpcyk7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGxpbmVhciA9IGFwcC5saWZldGltZSAlIDAuNSAvIDAuNTtcclxuICAgIHZhciBzY2FsZSA9IDAuOCArIE1hdGguc2luKE1hdGguUEkgKiBsaW5lYXIpICogMC40O1xyXG5cclxuICAgIGFwcC5jdHguc2F2ZSgpO1xyXG5cclxuICAgIGFwcC5jdHgudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcclxuXHJcbiAgICBhcHAuY3R4LnNjYWxlKHNjYWxlLCBzY2FsZSk7XHJcblxyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5zcHJpdGVzaGVldCxcclxuICAgICAgdGhpcy5zcHJpdGVbMF0sIHRoaXMuc3ByaXRlWzFdLCB0aGlzLnNwcml0ZVsyXSwgdGhpcy5zcHJpdGVbM10sIC10aGlzLnNwcml0ZVsyXSAvIDIsIC10aGlzLnNwcml0ZVszXSAvIDIsIHRoaXMuc3ByaXRlWzJdLCB0aGlzLnNwcml0ZVszXVxyXG4gICAgKTtcclxuXHJcbiAgICBhcHAuY3R4LnJlc3RvcmUoKTtcclxuXHJcbiAgfVxyXG5cclxufTsiLCJFTkdJTkUuVGV4dE91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuXHJcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIHtcclxuICAgIGJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjUpXCIsXHJcbiAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICBmb250U2l6ZTogMjQsXHJcbiAgICBzY2FsZVg6IDAsXHJcbiAgICBzY2FsZVk6IDEuMCxcclxuICAgIHRleHQ6IFwidm9pZFwiLFxyXG4gICAgZHVyYXRpb246IDIuMFxyXG4gIH0sIGFyZ3MpO1xyXG5cclxuICB2YXIgdGV4dG91dCA9IHRoaXM7XHJcblxyXG4gIGFwcC50d2Vlbih0aGlzKVxyXG4gICAgLnRvKHtcclxuICAgICAgc2NhbGVYOiAxLjBcclxuICAgIH0sIHRoaXMuZHVyYXRpb24gKiAwLjI1LCBcIm91dEVsYXN0aWNcIilcclxuICAgIC53YWl0KHRoaXMuZHVyYXRpb24gKiAwLjUpXHJcbiAgICAudG8oe1xyXG4gICAgICBzY2FsZVk6IDAuMFxyXG4gICAgfSwgdGhpcy5kdXJhdGlvbiAqIDAuMjUsIFwib3V0Q2lyY1wiKVxyXG4gICAgLm9uKFwiZmluaXNoXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB0ZXh0b3V0LmdhbWUucmVtb3ZlKHRleHRvdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdHR0ID0gdGhpcztcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuVGV4dE91dC5wcm90b3R5cGUgPSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yOiBFTkdJTkUuVGV4dE91dCxcclxuXHJcbiAgc3ByaXRlOiBbMjE2LCAxNTksIDE0LCAxNF0sXHJcblxyXG4gIHR5cGU6IFwidGV4dG91dFwiLFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkdCkge1xyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICghdGhpcy5zY2FsZVggfHwgIXRoaXMuc2NhbGVZKSByZXR1cm47XHJcblxyXG4gICAgYXBwLmN0eC5zYXZlKCk7XHJcblxyXG4gICAgYXBwLmN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xyXG5cclxuICAgIGFwcC5mb250U2l6ZSh0aGlzLmZvbnRTaXplKTtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgYXBwLmN0eC5zY2FsZSh0aGlzLnNjYWxlWCwgdGhpcy5zY2FsZVkpO1xyXG4gICAgYXBwLmN0eC5maWxsVGV4dCh0aGlzLnRleHQsIDAsIDApXHJcblxyXG4gICAgYXBwLmN0eC5yZXN0b3JlKCk7XHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLlRyYWlsID0gZnVuY3Rpb24ocGFyZW50LCBhcmdzKSB7XHJcblxyXG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cclxuICBVdGlscy5leHRlbmQodGhpcywge1xyXG4gICAgY29sb3I6IFwiIzBmY1wiLFxyXG4gICAgcG9pbnRzOiBbXSxcclxuICAgIG1heFBvaW50czogNSxcclxuICAgIHdpZHRoOiAxMCxcclxuICAgIGxpZmV0aW1lOiAwLFxyXG4gICAgbGlmZXNwYW46IDAsXHJcbiAgICBwYXVzZWQ6IGZhbHNlLFxyXG4gICAgaW50ZXJ2YWw6IDAuMTUsXHJcbiAgICBzdHJva2U6IHRydWVcclxuICB9LCBhcmdzKTtcclxuXHJcbn07XHJcblxyXG5FTkdJTkUuVHJhaWwucHJvdG90eXBlID0ge1xyXG5cclxuICB6SW5kZXg6IDIwMCxcclxuXHJcbiAgcXVvdGE6IDAuMyxcclxuXHJcbiAgcmVhY3Rpb246IDgsXHJcblxyXG4gIGNsZWFyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG5cclxuICB9LFxyXG5cclxuICBzdGVwOiBmdW5jdGlvbihkZWx0YSkge1xyXG5cclxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGE7XHJcblxyXG4gICAgaWYgKFV0aWxzLmludGVydmFsKFwicG9pbnRcIiwgdGhpcy5pbnRlcnZhbCwgdGhpcykpIHtcclxuXHJcbiAgICAgIGlmICghdGhpcy5wYXVzZWQpIHRoaXMucG9pbnRzLnB1c2godGhpcy5wYXJlbnQueCwgdGhpcy5wYXJlbnQueSk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKHRoaXMucG9pbnRzLmxlbmd0aCA+IHRoaXMubWF4UG9pbnRzICogMikgfHxcclxuICAgICAgICAodGhpcy5wYXVzZWQgJiYgdGhpcy5wb2ludHMubGVuZ3RoID4gMClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5wb2ludHMuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLnBvaW50cy5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb2ludHNbdGhpcy5wb2ludHMubGVuZ3RoIC0gMl0gPSB0aGlzLnBhcmVudC54O1xyXG4gICAgdGhpcy5wb2ludHNbdGhpcy5wb2ludHMubGVuZ3RoIC0gMV0gPSB0aGlzLnBhcmVudC55O1xyXG5cclxuICAgIGlmKHRoaXMubGlmZXNwYW4gJiYgdGhpcy5saWZldGltZSA+IHRoaXMubGlmZXNwYW4pIHtcclxuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmKHRoaXMucG9pbnRzLmxlbmd0aCA8PSAwKSByZXR1cm47XHJcblxyXG4gICAgYXBwLmxheWVyLnNhdmUoKTtcclxuICAgIGFwcC5sYXllci5zdHJva2VTdHlsZSh0aGlzLmNvbG9yKTtcclxuICAgIGFwcC5sYXllci5saW5lQ2FwKFwic3F1YXJlXCIpO1xyXG5cclxuICAgIC8vIGlmICghdGhpcy5zdHJva2UpIGFwcC5sYXllci5zdHJva2VTdHlsZShcInJnYmEoMCwwLDAsMC4xKVwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IHRoaXMucG9pbnRzLmxlbmd0aDsgaSArPSAyKSB7XHJcblxyXG4gICAgICB2YXIgcmF0aW8gPSBpIC8gKDIgKiB0aGlzLm1heFBvaW50cyk7XHJcbiAgICAgIHZhciBweCA9IHRoaXMucG9pbnRzW2kgLSAyXTtcclxuICAgICAgdmFyIHB5ID0gdGhpcy5wb2ludHNbaSAtIDFdO1xyXG4gICAgICB2YXIgbnggPSB0aGlzLnBvaW50c1tpXTtcclxuICAgICAgdmFyIG55ID0gdGhpcy5wb2ludHNbaSArIDFdO1xyXG4gICAgICBhcHAubGF5ZXIuYmVnaW5QYXRoKCk7XHJcbiAgICAgIGFwcC5sYXllci5tb3ZlVG8ocHggfCAwLCBweSB8IDApO1xyXG4gICAgICBhcHAubGF5ZXIubGluZVRvKG54IHwgMCwgbnkgfCAwKTtcclxuICAgICAgYXBwLmxheWVyLmEocmF0aW8pLmxpbmVXaWR0aChyYXRpbyAqIHRoaXMud2lkdGgpO1xyXG4gICAgICBhcHAubGF5ZXIuc3Ryb2tlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwLmxheWVyLnJlc3RvcmUoKTtcclxuXHJcblxyXG4gIH1cclxuXHJcbn07IiwiRU5HSU5FLk1pc3NpbGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcblxyXG4gIFV0aWxzLmV4dGVuZCh0aGlzLCB7XHJcbiAgICBzcGVlZDogNDAwXHJcbiAgfSwgYXJncyk7XHJcblxyXG4gIHRoaXMuY29sb3IgPSBkZWZzLnRlYW1Db2xvclt0aGlzLnRlYW1dO1xyXG4gIHRoaXMucmFkaXVzID0gNDtcclxuICB0aGlzLmRpcmVjdGlvbiA9IDA7XHJcblxyXG4gIHRoaXMuZm9yY2UgPSA0MDA7XHJcbiAgdGhpcy5mb3JjZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgKiA2O1xyXG5cclxuICB0aGlzLnRyYWlsID0gbmV3IEVOR0lORS5UcmFpbCh0aGlzLCB7XHJcbiAgICBpbnRlcnZhbDogMC4wNSxcclxuICAgIG1heFBvaW50czogMTAsXHJcbiAgICBjb2xvcjogXCIjZmEwXCJcclxuICB9KTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICB2YXIgZSA9IHRoaXMuZ2FtZS5lbnRpdGllc1tpXTtcclxuXHJcbiAgICBpZiAoIShlIGluc3RhbmNlb2YgRU5HSU5FLlNoaXApKSBjb250aW51ZTtcclxuXHJcbiAgICBpZiAoZS5taXNzaWxlVGFyZ2V0KSBjb250aW51ZTtcclxuICAgIGlmIChlLnRlYW0gPT09IHRoaXMudGVhbSkgY29udGludWU7XHJcblxyXG4gICAgZS5taXNzaWxlVGFyZ2V0ID0gdGhpcztcclxuICAgIHRoaXMudGFyZ2V0ID0gZTtcclxuXHJcbiAgICBicmVhaztcclxuXHJcbiAgfVxyXG5cclxufTtcclxuXHJcbkVOR0lORS5NaXNzaWxlLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgc3ByaXRlOiBbMTQ1LCAyNSwgNiwgMzldLFxyXG5cclxuICBxdW90YTogMC41LFxyXG5cclxuICBjb25zdHJ1Y3RvcjogRU5HSU5FLk1pc3NpbGUsXHJcblxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGR0KSB7XHJcblxyXG4gICAgaWYoIXRoaXMudGFyZ2V0KSByZXR1cm4gdGhpcy5kaWUoKTtcclxuXHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IE1hdGguYXRhbjIodGhpcy50YXJnZXQueSAtIHRoaXMueSwgdGhpcy50YXJnZXQueCAtIHRoaXMueCk7XHJcblxyXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICAgIHRoaXMueSArPSBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcblxyXG4gICAgdGhpcy5mb3JjZSA9IE1hdGgubWF4KHRoaXMuZm9yY2UgLSBkdCAqIDQwMCwgMCk7XHJcblxyXG4gICAgdGhpcy54ICs9IE1hdGguY29zKHRoaXMuZm9yY2VEaXJlY3Rpb24pICogdGhpcy5mb3JjZSAqIGR0O1xyXG4gICAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZm9yY2VEaXJlY3Rpb24pICogdGhpcy5mb3JjZSAqIGR0O1xyXG5cclxuXHJcbiAgICBpZiAoVXRpbHMuZGlzdGFuY2UodGhpcywgdGhpcy50YXJnZXQpIDwgdGhpcy5yYWRpdXMgKyB0aGlzLnRhcmdldC5yYWRpdXMpIHtcclxuXHJcbiAgICAgIHRoaXMuaGl0KHRoaXMudGFyZ2V0KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50cmFpbC5zdGVwKGR0KTtcclxuXHJcblxyXG4gIH0sXHJcblxyXG4gIGhpdDogZnVuY3Rpb24odGFyZ2V0KSB7XHJcblxyXG4gICAgdGFyZ2V0LmFwcGx5RGFtYWdlKDEwICsgdGhpcy5nYW1lLnNjb3JlIC8gMTApO1xyXG5cclxuICAgIHRoaXMuZGllKCk7XHJcblxyXG4gIH0sXHJcblxyXG4gIGRpZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLnRyYWlsLnJlbmRlcigpO1xyXG5cclxuICB9XHJcblxyXG59OyIsIkVOR0lORS5HYW1lb3ZlciA9IHtcclxuXHJcbiAgc2NvcmU6IDczNyxcclxuICBoaXNjb3JlOiAwLFxyXG5cclxuICBzdGFyT2ZmOiBbMzgyLCAxNzcsIDE1LCAxNl0sXHJcbiAgc3Rhck9uOiBbMzM5LCAxNjksIDM3LCAzN10sXHJcblxyXG4gIGVudGVyOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICh3aW5kb3cuZ2EpIHtcclxuICAgICAgZ2EoJ3NlbmQnLCAnc2NyZWVudmlldycsIHtcclxuICAgICAgICAnYXBwTmFtZSc6ICdQb3dlclN1cmdlJyxcclxuICAgICAgICAnc2NyZWVuTmFtZSc6ICdHYW1lb3ZlcidcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kb25lID0gZmFsc2U7XHJcblxyXG4gICAgYXBwLnJlbmRlcmVyLnNldFNtb290aGluZyh0cnVlKTtcclxuXHJcbiAgICB2YXIgaGlzY29yZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaGlzY29yZVwiKSB8IDA7XHJcblxyXG4gICAgaWYgKGhpc2NvcmUgPCB0aGlzLnNjb3JlKSB7XHJcblxyXG4gICAgICB0aGlzLmhpc2NvcmUgPSB0aGlzLnNjb3JlO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImhpc2NvcmVcIiwgaGlzY29yZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVzaWMgPSBhcHAubXVzaWMucGxheShcImdhbWVvdmVyXCIpLmZhZGVJbigzKS5sb29wKCk7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xyXG4gICAgdGhpcy5zdGFycyA9IFtdO1xyXG4gICAgdGhpcy5zY29yZU9mZnNldCA9IC1hcHAud2lkdGg7XHJcbiAgICB0aGlzLmFjaGlldmVkU3RhcnMgPSBNYXRoLm1pbigxMCwgKHRoaXMuc2NvcmUgLyA1MDApICogMTAgfCAwKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuXHJcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh7XHJcbiAgICAgICAgeDogaSAqIDY0LFxyXG4gICAgICAgIHk6IDY0LFxyXG4gICAgICAgIHNjYWxlOiAwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNoaWV2ZWRTdGFyczsgaSsrKSB7XHJcblxyXG4gICAgICB2YXIgc3RhciA9IHRoaXMuc3RhcnNbaV07XHJcblxyXG4gICAgICBhcHAudHdlZW4oc3Rhcikud2FpdChpICogMC4xKS50byh7XHJcbiAgICAgICAgc2NhbGU6IDEuMCxcclxuICAgICAgICB5OiA2NFxyXG4gICAgICB9LCAyLjUsIFwib3V0RWxhc3RpY1wiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXBwLnR3ZWVuKHRoaXMpLnRvKHtcclxuXHJcbiAgICAgIGN1cnJlbnRTY29yZTogdGhpcy5zY29yZSxcclxuICAgICAgc2NvcmVPZmZzZXQ6IDBcclxuXHJcbiAgICB9LCAyLjUsIFwib3V0RWxhc3RpY1wiKS5vbihcImZpbmlzaGVkXCIsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgYXBwLnN0YXRlLmRvbmUgPSB0cnVlO1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfSxcclxuXHJcbiAgc3RlcDogZnVuY3Rpb24oKSB7XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlclN0YXJzOiBmdW5jdGlvbih4LCB5KSB7XHJcblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG5cclxuICAgICAgdmFyIHN0YXIgPSB0aGlzLnN0YXJzW2ldO1xyXG5cclxuICAgICAgYXBwLmxheWVyLnNhdmUoKTtcclxuXHJcbiAgICAgIGFwcC5sYXllci50cmFuc2xhdGUoc3Rhci54ICsgeCwgc3Rhci55ICsgeSk7XHJcblxyXG4gICAgICBhcHAubGF5ZXIuYWxpZ24oMC41LCAwLjUpO1xyXG5cclxuICAgICAgYXBwLmxheWVyLmRyYXdSZWdpb24oYXBwLmltYWdlcy5zcHJpdGVzaGVldCwgdGhpcy5zdGFyT2ZmLCAwLCAwKTtcclxuXHJcbiAgICAgIGlmIChzdGFyLnNjYWxlID4gMCkge1xyXG5cclxuICAgICAgICBhcHAubGF5ZXIucm90YXRlKGFwcC5saWZldGltZSk7XHJcbiAgICAgICAgYXBwLmxheWVyLnNjYWxlKHN0YXIuc2NhbGUsIHN0YXIuc2NhbGUpO1xyXG4gICAgICAgIGFwcC5sYXllci5kcmF3UmVnaW9uKGFwcC5pbWFnZXMuc3ByaXRlc2hlZXQsIHRoaXMuc3Rhck9uLCAwLCAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXBwLmxheWVyLnJlc3RvcmUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiMyODIyNDVcIjtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxSZWN0KDAsIDAsIGFwcC53aWR0aCwgYXBwLmhlaWdodCk7XHJcblxyXG4gICAgYXBwLmN0eC5kcmF3SW1hZ2UoYXBwLmltYWdlcy5oZWxwLCBhcHAuY2VudGVyLnggLSBhcHAuaW1hZ2VzLmhlbHAud2lkdGggKiAwLjUgfCAwLCAtNTApXHJcblxyXG4gICAgdGhpcy5yZW5kZXJTdGFycyhhcHAuY2VudGVyLnggLSAzMjAsIDApO1xyXG5cclxuICAgIGFwcC5mb250U2l6ZSg0OCk7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsU3R5bGUgPSBcIiNmYTBcIjtcclxuICAgIGFwcC5jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICBhcHAuY3R4LmZpbGxUZXh0KFwiU0NPUkU6IFwiICsgKHRoaXMuY3VycmVudFNjb3JlIHwgMCksIGFwcC5jZW50ZXIueCArIHRoaXMuc2NvcmVPZmZzZXQsIDE4MClcclxuXHJcbiAgICBhcHAuZm9udFNpemUoMzIpO1xyXG5cclxuICAgIGFwcC5jdHguZmlsbFN0eWxlID0gXCIjZjQwXCI7XHJcbiAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgYXBwLmN0eC5maWxsVGV4dChcIkhJLVNDT1JFOiBcIiArICh0aGlzLmhpc2NvcmUgfCAwKSwgYXBwLmNlbnRlci54IC0gdGhpcy5zY29yZU9mZnNldCwgMjIwKTtcclxuXHJcbiAgICBpZiAodGhpcy5kb25lKSB7XHJcblxyXG4gICAgICBhcHAuY3R4LmZpbGxTdHlsZSA9IFwiI2NlZlwiO1xyXG4gICAgICBhcHAuY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcblxyXG4gICAgICBpZiAoYXBwLmxpZmV0aW1lICUgMSA8IDAuNSkge1xyXG5cclxuICAgICAgICBhcHAuY3R4LmZpbGxUZXh0KFwiQ0xJQ0sgVE8gVFJZIEFHQUlOIFwiLCBhcHAuY2VudGVyLnggLSB0aGlzLnNjb3JlT2Zmc2V0LCAyNjApXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBwb2ludGVyZG93bjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZG9uZSkge1xyXG4gICAgICBpZiAod2luZG93LmdhKSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXHJcbiAgICAgICAgICAnZXZlbnRDYXRlZ29yeSc6ICdnYW1lJyxcclxuICAgICAgICAgICdldmVudEFjdGlvbic6ICdyZXN0YXJ0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhcHAuc2V0U3RhdGUoRU5HSU5FLkdhbWUpO1xyXG5cclxuICAgICAgRU5HSU5FLkdhbWUucmVzZXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn07IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgYXBwID0gcGxheWdyb3VuZCh7XHJcblxyXG4gICAgd2lkdGg6IDEwMjQsXHJcbiAgICBoZWlnaHQ6IDY0MCxcclxuXHJcbiAgICBzbW9vdGhpbmc6IHRydWUsXHJcblxyXG4gICAgcGF0aHM6IHtcclxuXHJcbiAgICAgIGJhc2U6IFwiLy9tb3ppbGxhLmdpdGh1Yi5pby9kZXZ0b29scy1wZXJmLWdhbWUvXCJcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZURvd25sb2FkVGV4dDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveC80MFwiKSA+IC0xKSB7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gZGVmcy5kb3dubG9hZExpbmtzW1wiZmZkZXZcIl1bMF07XHJcbiAgICAgICAgdmFyIGxpbmsgPSBkZWZzLmRvd25sb2FkTGlua3NbXCJmZmRldlwiXVsxXTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0ID0gZGVmcy5kb3dubG9hZExpbmtzW1wiZGVmYXVsdFwiXVswXTtcclxuICAgICAgICB2YXIgbGluayA9IGRlZnMuZG93bmxvYWRMaW5rc1tcImRlZmF1bHRcIl1bMV07XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjY29taWNidWJibGVcIikuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI2NvbWljYnViYmxlXCIpLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgbGluayk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKiBzZXQgY29udGV4dCBmb250IHNpemUgd2l0aCBkZWZhdWx0IGZvbnQgKi9cclxuXHJcbiAgICBmb250U2l6ZTogZnVuY3Rpb24oc2l6ZSkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuY3R4LmZvbnQgPSBzaXplICsgXCJweCAnU3F1YWRhIE9uZSdcIjtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLmxvYWRJbWFnZXMoXCJzcHJpdGVzaGVldFwiLCBcImhlbHBcIiwgXCJzcGxhc2hcIiwgXCJmbGFyZVwiLCBcInBhcnRpY2xlc1wiKTtcclxuXHJcbiAgICAgIHRoaXMua2V5Ym9hcmQucHJldmVudERlZmF1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuc291bmQgPSB0aGlzLmF1ZGlvLmNoYW5uZWwoXCJzb3VuZFwiKS52b2x1bWUoMC41KTtcclxuICAgICAgdGhpcy5tdXNpYyA9IHRoaXMuYXVkaW8uY2hhbm5lbChcIm11c2ljXCIpLnZvbHVtZSgwLjUpO1xyXG5cclxuICAgICAgdGhpcy5jdHggPSBhcHAubGF5ZXIuY29udGV4dDtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZSA9IEVOR0lORS5HYW1lO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyogYWxsIGltYWdlcyBsb2FkZWQgKi9cclxuXHJcbiAgICByZWFkeTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZURvd25sb2FkVGV4dCgpO1xyXG5cclxuICAgICAgLyogY2FjaGUgc29tZSBrbm93biBjb2xvcnMgZm9yIHNwcml0ZXNoZWV0ICovXHJcblxyXG4gICAgICB0aGlzLmdldENvbG9yZWRJbWFnZSh0aGlzLmltYWdlcy5zcHJpdGVzaGVldCwgXCIjZmZmXCIpO1xyXG5cclxuICAgICAgLyogc3RhcnQgdGhlIGJlbmNobWFyayAqL1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZShFTkdJTkUuQmVuY2htYXJrKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB0aGlzLnN0YXRlLnJlbmRlcigwKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldENvbG9yZWRJbWFnZTogZnVuY3Rpb24oa2V5LCBjb2xvciwgbW9kZSkge1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBtb2RlID09PSBcInVuZGVmaW5lZFwiKSBtb2RlID0gXCJoYXJkLWxpZ2h0XCI7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBpbWFnZSA9IHRoaXMuaW1hZ2VzW2tleV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0ga2V5O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc3RvcmVrZXkgPSBcImNvbG9yLVwiICsgY29sb3I7XHJcblxyXG4gICAgICBpZiAoIWltYWdlW3N0b3Jla2V5XSkge1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG1peCA9PT0gXCJ1bmRlZmluZWRcIikgbWl4ID0gMTtcclxuXHJcbiAgICAgICAgdmFyIGJlbG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBiZWxvd0N0eCA9IGJlbG93LmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICAgICAgYmVsb3cud2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgICAgICBiZWxvdy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGJlbG93Q3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgYmVsb3dDdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xyXG4gICAgICAgIGJlbG93Q3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIGJlbG93Q3R4LmZpbGxSZWN0KDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xyXG5cclxuICAgICAgICBpbWFnZVtzdG9yZWtleV0gPSBiZWxvdztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBpbWFnZVtzdG9yZWtleV07XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByb3VuZEFuZ2xlOiBmdW5jdGlvbihhbmdsZSkge1xyXG5cclxuICAgICAgcmV0dXJuIFV0aWxzLmdyb3VuZChhbmdsZSAtIE1hdGguUEkgLyAxNiwgTWF0aC5QSSAvIDgpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdmlzaWJpbGl0eWNoYW5nZTogZnVuY3Rpb24oaGlkZGVuKSB7XHJcblxyXG4gICAgICBpZiAoaGlkZGVuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0b3JlZFNvdW5kVm9sdW1lKSB7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlZFNvdW5kVm9sdW1lID0gdGhpcy5zb3VuZC52b2x1bWUoKTtcclxuICAgICAgICAgIHRoaXMuc3RvcmVkTXVzaWNWb2x1bWUgPSB0aGlzLm11c2ljLnZvbHVtZSgpO1xyXG4gICAgICAgICAgdGhpcy5zb3VuZC52b2x1bWUoMCk7XHJcbiAgICAgICAgICB0aGlzLm11c2ljLnZvbHVtZSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVkU291bmRWb2x1bWUpIHtcclxuICAgICAgICAgIHRoaXMuc291bmQudm9sdW1lKHRoaXMuc3RvcmVkU291bmRWb2x1bWUpO1xyXG4gICAgICAgICAgdGhpcy5tdXNpYy52b2x1bWUodGhpcy5zdG9yZWRNdXNpY1ZvbHVtZSk7XHJcbiAgICAgICAgICB0aGlzLnN0b3JlZFNvdW5kVm9sdW1lID0gMDtcclxuICAgICAgICAgIHRoaXMuc3RvcmVkTXVzaWNWb2x1bWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG59KTtcclxuXHJcbnZhciBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZSB8fCB3aW5kb3cud2Via2l0UGVyZm9ybWFuY2UgfHwgRGF0ZTtcclxuXHJcbk1hdGguc2lnbiA9IE1hdGguc2lnbiB8fCBmdW5jdGlvbih4KSB7XHJcblxyXG4gIHggPSAreDsgLy8gY29udmVydCB0byBhIG51bWJlclxyXG5cclxuICBpZiAoeCA9PT0gMCB8fCBpc05hTih4KSkge1xyXG5cclxuICAgIHJldHVybiB4O1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB4ID4gMCA/IDEgOiAtMTtcclxuXHJcbn07IiwiLyoqXHJcbiAqIFRoaXMgaXMgYmFkIGFuZCB1bm9wdGltaXplZCBjb2RlIGp1c3QgZm9yIHlvdSB0byBmaXggOilcclxuICpcclxuICogR2V0IEZpcmVmb3ggRGV2ZWxvcGVyIEVkaXRpb24gdG8gdHJ5IHRoZSBuZXcgUGVyZm9ybWFuY2UgVG9vbHM6XHJcbiAqICAgaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZmlyZWZveC9kZXZlbG9wZXIvXHJcbiAqXHJcbiAqIDEuIE9wZW4gdGhlIGBQZXJmb3JtYW5jZWAgdG9vbCBpbiBGaXJlZm94IERldmVsb3BlciBFZGl0aW9uXHJcbiAqIDIuIFN0YXJ0IHJlY29yZGluZyBhIHBlcmZvcm1hbmNlIHByb2ZpbGVcclxuICogMy4gUGxheSB0aGUgZ2FtZVxyXG4gKiA0LiBTdG9wIHByb2ZpbGluZyBhbmQgY2hlY2sgdGhlIENhbGwgVHJlZSBvciBGbGFtZSBDaGFydCBmb3IgdGhlIG1hbGVmaWNlbnRcclxuICpcclxuICogR290IGlkZWFzIGZvciBiZXR0ZXIgYm90dGxlbmVja3Mgb3IgZXZlbiBmYXN0ZXIgY29kZSwgZmlsZVxyXG4gKiBhbiBpc3N1ZSBvciBzZW5kIHVzIGEgcHVsbCByZXF1ZXN0OlxyXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL2RldnRvb2xzLXBlcmYtZ2FtZS9pc3N1ZXNcclxuICovXHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSB3aXRoIGFsbCBlbGVtZW50cyB0aGF0IHBhc3MgdGhlIGB0ZXN0YCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmlsdGVyXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRlc3QgRnVuY3Rpb24gdG8gdGVzdCBlYWNoIGVsZW1lbnQsIGludm9rZWQgd2l0aCAoZWxlbWVudClcclxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IHdpdGggb25seSBwYXNzZWQgZWxlbWVudHNcclxuICovXHJcblV0aWxzLmZpbHRlciA9IGZ1bmN0aW9uKGFycmF5LCB0ZXN0KSB7XHJcbiAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0ZXN0KGFycmF5W2ldKSkge1xyXG4gICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRmluZCBuZWFyZXN0IGVudGl0eSBmcm9tIGEgbGlzdCBvZiBlbnRpdGllc1xyXG4gKiBAcGFyYW0ge0VudGl0eX0gZnJvbSBFbnRpdHlcclxuICogQHBhcmFtIHtFbnRpdHlbXX0gZW50aXRpZXMgTGlzdCBvZiBlbnRpdGllcyB0byBjb21wYXJlXHJcbiAqIEByZXR1cm4ge0VudGl0eX0gTmVhcmVzdCBFbnRpdHlcclxuICovXHJcblV0aWxzLm5lYXJlc3QgPSBmdW5jdGlvbihmcm9tLCBlbnRpdGllcykge1xyXG4gIHZhciBjbG9zZXN0ID0ge1xyXG4gICAgdGFyZ2V0OiB1bmRlZmluZWQsXHJcbiAgICBkaXN0YW5jZTogbnVsbFxyXG4gIH07XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRpdGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIHRvID0gZW50aXRpZXNbaV07XHJcbiAgICBpZiAoZnJvbSA9PT0gdG8pIGNvbnRpbnVlO1xyXG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZShmcm9tLCB0byk7XHJcbiAgICBpZiAoaSA9PT0gMCB8fCBjbG9zZXN0LmRpc3RhbmNlID4gZGlzdGFuY2UpIHtcclxuICAgICAgY2xvc2VzdC50YXJnZXQgPSB0bztcclxuICAgICAgY2xvc2VzdC5kaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAodHlwZW9mIGNsb3Nlc3QudGFyZ2V0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiBjbG9zZXN0LnRhcmdldDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIG5lYXJlc3Qgc2hpcCBvZiBvcHBvc2l0ZSB0ZWFtXHJcbiAqIEByZXR1cm4ge1NoaXB9IE5lYXJlc3QgZW5lbXkgc2hpcFxyXG4gKi9cclxuRU5HSU5FLlNoaXAucHJvdG90eXBlLmdldFRhcmdldCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBwb29sID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdhbWUuZW50aXRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBlbnRpdHkgPSB0aGlzLmdhbWUuZW50aXRpZXNbaV07XHJcbiAgICBpZiAoIShlbnRpdHkgaW5zdGFuY2VvZiBFTkdJTkUuU2hpcCkpIGNvbnRpbnVlO1xyXG4gICAgaWYgKGVudGl0eS50ZWFtICE9PSB0aGlzLnRlYW0pIHBvb2wucHVzaChlbnRpdHkpO1xyXG4gIH1cclxuICAvLyBJcyBVdGlscy5uZWFyZXN0IGZhc3QgZW5vdWdoP1xyXG4gIHJldHVybiBVdGlscy5uZWFyZXN0KHRoaXMsIHBvb2wpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBwb3NpdGlvbiBmb3IgYW4gZW50aXR5IHRoYXQgaGFzIHNwZWVkIGFuZCBkaXJlY3Rpb24uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkaXJlY3Rpb24gQW5nbGUgZ2l2ZW4gaW4gcmFkaWFuc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgRGlzdGFuY2UgdG8gbW92ZVxyXG4gKi9cclxuVXRpbHMubW92ZUluRGlyZWN0aW9uID0gZnVuY3Rpb24oZGlyZWN0aW9uLCB2YWx1ZSkge1xyXG4gIHZhbHVlIC89IDEwMDtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICB0aGlzLnggKz0gTWF0aC5jb3ModGhpcy5kaXJlY3Rpb24pICogdmFsdWU7XHJcbiAgICB0aGlzLnkgKz0gTWF0aC5zaW4odGhpcy5kaXJlY3Rpb24pICogdmFsdWU7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBzaGlwIHBvc2l0aW9uIHdpdGggY3VycmVudCBkaXJlY3Rpb24gYW5kIHNwZWVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdCBUaW1lIGRlbHRhIGZvciBjdXJyZW50IGZyYW1lIGluIHNlY29uZHNcclxuICovXHJcbkVOR0lORS5TaGlwLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZHQpIHtcclxuICBpZiAoIXRoaXMuZnJvemVuKSB7XHJcbiAgICBVdGlscy5tb3ZlSW5EaXJlY3Rpb24uYXBwbHkodGhpcywgW3RoaXMuZGlyZWN0aW9uLCB0aGlzLnNwZWVkICogZHRdKTtcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLmZvcmNlID4gMCkge1xyXG4gICAgdGhpcy5mb3JjZSAtPSAyMDAgKiBkdDtcclxuICAgIFV0aWxzLm1vdmVJbkRpcmVjdGlvbi5hcHBseSh0aGlzLCBbdGhpcy5mb3JjZURpcmVjdGlvbiwgdGhpcy5mb3JjZSAqIGR0XSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZyYW1lIHN0ZXAgZm9yIGEgcGFydGljbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR0IFRpbWUgZGVsdGEgZm9yIGN1cnJlbnQgZnJhbWUgaW4gc2Vjb25kc1xyXG4gKi9cclxuRU5HSU5FLlBhcnRpY2xlLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24oZHQpIHtcclxuICB0aGlzLmxpZmV0aW1lICs9IGR0O1xyXG4gIC8vIFVwZGF0ZSBwb3NpdGlvblxyXG4gIHRoaXMueCArPSBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbikgKiB0aGlzLnNwZWVkICogZHQ7XHJcbiAgdGhpcy55ICs9IE1hdGguc2luKHRoaXMuZGlyZWN0aW9uKSAqIHRoaXMuc3BlZWQgKiBkdDtcclxuICB0aGlzLnNwZWVkID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAtIHRoaXMuZGFtcGluZyAqIGR0KTtcclxuXHJcbiAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHRoaXMubGlmZXRpbWUgLyB0aGlzLmR1cmF0aW9uLCAxLjApO1xyXG4gIC8vIFB1dCBwYXJ0aWNsZSBvZmZzY3JlZW4gZm9yIHBvb2xpbmcgYW5kIHRvIGtlZXAgcmVuZGVyIHRpbWUgY29uc3RhbnRcclxuICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxLjApIHtcclxuICAgIHRoaXMueCA9IDA7XHJcbiAgICB0aGlzLnkgPSAwO1xyXG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XHJcbiAgfVxyXG4gIC8vIFVwZGF0ZSBpbmRleCBmb3IgY3VycmVudCBzcHJpdGUgdG8gcmVuZGVyXHJcbiAgdGhpcy5zcHJpdGVJbmRleCA9IE1hdGguZmxvb3IodGhpcy5wcm9ncmVzcyAqIHRoaXMuc3ByaXRlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgc3RhciBpcyBpbiBzY3JlZW4gYm91bmRhcmllcy5cclxuICogT3RoZXJ3aXNlIHdyYXAgaXQgdG8gdGhlIG9wcG9zaXRlIHNpZGUgb2Ygc2NyZWVuLlxyXG4gKiBAcGFyYW0ge1N0YXJ9IHN0YXIgUHJvYmVkIHN0YXJcclxuICovXHJcbkVOR0lORS5CYWNrZ3JvdW5kU3RhcnMucHJvdG90eXBlLndyYXAgPSBmdW5jdGlvbihzdGFyKSB7XHJcbiAgdmFyIHBvcyA9IFtzdGFyLngsIHN0YXIueSwgMSwgMV07XHJcbiAgdmFyIGJvdW5kcyA9IFswLCAwLCBhcHAud2lkdGgsIGFwcC5oZWlnaHRdO1xyXG5cclxuICBpZiAocG9zWzBdIDwgYm91bmRzWzBdKSBzdGFyLnggPSBhcHAud2lkdGg7XHJcbiAgaWYgKHBvc1sxXSA8IGJvdW5kc1sxXSkgc3Rhci55ID0gYXBwLmhlaWdodDtcclxuXHJcbiAgaWYgKHBvc1swXSA+IGJvdW5kc1syXSkgc3Rhci54ID0gMDtcclxuICBpZiAocG9zWzFdID4gYm91bmRzWzNdKSBzdGFyLnkgPSAwO1xyXG59O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9