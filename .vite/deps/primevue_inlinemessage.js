import {
  script as script4,
  script2 as script5
} from "./chunk-WXPACWKO.js";
import {
  script as script3
} from "./chunk-52PO67YQ.js";
import {
  script as script2
} from "./chunk-3JB7PPJ4.js";
import "./chunk-GV7ULW5Z.js";
import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  createBaseVNode,
  createBlock,
  createElementBlock,
  createTextVNode,
  mergeProps,
  openBlock,
  renderSlot,
  resolveDynamicComponent
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/inlinemessage/style/inlinemessagestyle.esm.js
var css = "\n@layer primevue {\n    .p-inline-message {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        vertical-align: top;\n    }\n    \n    .p-inline-message-icon {\n        flex-shrink: 0;\n    }\n\n    .p-inline-message-icon-only .p-inline-message-text {\n        visibility: hidden;\n        width: 0;\n    }\n\n    .p-fluid .p-inline-message {\n        display: flex;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props, instance = _ref.instance;
    return ["p-inline-message p-component p-inline-message-" + props.severity, {
      "p-inline-message-icon-only": !instance.$slots["default"]
    }];
  },
  icon: function icon(_ref2) {
    var props = _ref2.props;
    return ["p-inline-message-icon", props.icon];
  },
  text: "p-inline-message-text"
};
var InlineMessageStyle = BaseStyle.extend({
  name: "inlinemessage",
  css,
  classes
});

// node_modules/primevue/inlinemessage/inlinemessage.esm.js
var script$1 = {
  name: "BaseInlineMessage",
  "extends": script,
  props: {
    severity: {
      type: String,
      "default": "error"
    },
    icon: {
      type: String,
      "default": void 0
    }
  },
  style: InlineMessageStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script6 = {
  name: "InlineMessage",
  "extends": script$1,
  timeout: null,
  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    var _this = this;
    if (!this.sticky) {
      setTimeout(function() {
        _this.visible = false;
      }, this.life);
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: script5,
        success: script3,
        warn: script4,
        error: script2
      }[this.severity];
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "aria-live": "polite",
    "class": _ctx.cx("root")
  }, _ctx.ptm("root")), [renderSlot(_ctx.$slots, "icon", {}, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? "span" : $options.iconComponent), mergeProps({
      "class": _ctx.cx("icon")
    }, _ctx.ptm("icon")), null, 16, ["class"]))];
  }), createBaseVNode("span", mergeProps({
    "class": _ctx.cx("text")
  }, _ctx.ptm("text")), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [createTextVNode(" ")];
  })], 16)], 16);
}
script6.render = render;
export {
  script6 as default
};
//# sourceMappingURL=primevue_inlinemessage.js.map
