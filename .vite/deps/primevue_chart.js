import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/chart/style/chartstyle.esm.js
var css = "\n@layer primevue {\n    .p-chart {\n        position: relative;\n    }\n}\n";
var classes = {
  root: "p-chart"
};
var ChartStyle = BaseStyle.extend({
  name: "chart",
  css,
  classes
});

// node_modules/primevue/chart/chart.esm.js
var script$1 = {
  name: "BaseChart",
  "extends": script,
  props: {
    type: String,
    data: null,
    options: null,
    plugins: null,
    width: {
      type: Number,
      "default": 300
    },
    height: {
      type: Number,
      "default": 150
    },
    canvasProps: {
      type: null,
      "default": null
    }
  },
  style: ChartStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Chart",
  "extends": script$1,
  emits: ["select", "loaded"],
  chart: null,
  watch: {
    /*
     * Use deep watch to enable triggering watch for changes within structure
     * otherwise the entire data object needs to be replaced to trigger watch
     */
    data: {
      handler: function handler() {
        this.reinit();
      },
      deep: true
    },
    type: function type() {
      this.reinit();
    },
    options: function options() {
      this.reinit();
    }
  },
  mounted: function mounted() {
    this.initChart();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  },
  methods: {
    initChart: function initChart() {
      var _this = this;
      import("./auto.esm-P6CQP3EM.js").then(function(module) {
        if (_this.chart) {
          _this.chart.destroy();
          _this.chart = null;
        }
        if (module && module["default"]) {
          _this.chart = new module["default"](_this.$refs.canvas, {
            type: _this.type,
            data: _this.data,
            options: _this.options,
            plugins: _this.plugins
          });
        }
        _this.$emit("loaded", _this.chart);
      });
    },
    getCanvas: function getCanvas() {
      return this.$canvas;
    },
    getChart: function getChart() {
      return this.chart;
    },
    getBase64Image: function getBase64Image() {
      return this.chart.toBase64Image();
    },
    refresh: function refresh() {
      if (this.chart) {
        this.chart.update();
      }
    },
    reinit: function reinit() {
      this.initChart();
    },
    onCanvasClick: function onCanvasClick(event) {
      if (this.chart) {
        var element = this.chart.getElementsAtEventForMode(event, "nearest", {
          intersect: true
        }, false);
        var dataset = this.chart.getElementsAtEventForMode(event, "dataset", {
          intersect: true
        }, false);
        if (element && element[0] && dataset) {
          this.$emit("select", {
            originalEvent: event,
            element: element[0],
            dataset
          });
        }
      }
    },
    generateLegend: function generateLegend() {
      if (this.chart) {
        return this.chart.generateLegend();
      }
    }
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var _hoisted_1 = ["width", "height"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "chart"
  }), [createBaseVNode("canvas", mergeProps({
    ref: "canvas",
    width: _ctx.width,
    height: _ctx.height,
    onClick: _cache[0] || (_cache[0] = function($event) {
      return $options.onCanvasClick($event);
    })
  }, _objectSpread(_objectSpread({}, _ctx.canvasProps), _ctx.ptm("canvas"))), null, 16, _hoisted_1)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_chart.js.map
