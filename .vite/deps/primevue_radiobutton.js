import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import {
  ObjectUtils
} from "./chunk-G2WTDY73.js";
import {
  createBaseVNode,
  createElementBlock,
  mergeProps,
  openBlock
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/radiobutton/style/radiobuttonstyle.esm.js
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-radiobutton p-component", {
      "p-radiobutton-checked": instance.checked,
      "p-radiobutton-disabled": props.disabled,
      "p-radiobutton-focused": instance.focused
    }];
  },
  input: function input(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-radiobutton-box", {
      "p-highlight": instance.checked,
      "p-disabled": props.disabled,
      "p-focus": instance.focused
    }];
  },
  icon: "p-radiobutton-icon"
};
var RadioButtonStyle = BaseStyle.extend({
  name: "radiobutton",
  classes
});

// node_modules/primevue/radiobutton/radiobutton.esm.js
var script$1 = {
  name: "BaseRadioButton",
  "extends": script,
  props: {
    value: null,
    modelValue: null,
    name: {
      type: String,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    "aria-labelledby": {
      type: String,
      "default": null
    },
    "aria-label": {
      type: String,
      "default": null
    }
  },
  style: RadioButtonStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "RadioButton",
  "extends": script$1,
  emits: ["click", "update:modelValue", "change", "focus", "blur"],
  data: function data() {
    return {
      focused: false
    };
  },
  methods: {
    onClick: function onClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
        this.$emit("update:modelValue", this.value);
        this.$refs.input.focus();
        if (!this.checked) {
          this.$emit("change", event);
        }
      }
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.modelValue != null && ObjectUtils.equals(this.modelValue, this.value);
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
function _toPrimitive(input2, hint) {
  if (_typeof(input2) !== "object" || input2 === null)
    return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var _hoisted_1 = ["id", "name", "checked", "disabled", "value", "aria-labelledby", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-p-focused"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    onClick: _cache[2] || (_cache[2] = function($event) {
      return $options.onClick($event);
    })
  }, _ctx.ptm("root"), {
    "data-pc-name": "radiobutton"
  }), [createBaseVNode("div", mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm("hiddenInputWrapper"), {
    "data-p-hidden-accessible": true
  }), [createBaseVNode("input", mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: "radio",
    name: _ctx.name,
    checked: $options.checked,
    disabled: _ctx.disabled,
    value: _ctx.value,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    })
  }, _ctx.ptm("hiddenInput")), null, 16, _hoisted_1)], 16), createBaseVNode("div", mergeProps({
    ref: "box",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm("input")), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled,
    "data-p-focused": $data.focused
  }), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("icon")
  }, _ctx.ptm("icon")), null, 16)], 16, _hoisted_2)], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_radiobutton.js.map
