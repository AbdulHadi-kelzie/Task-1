import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  createCommentVNode,
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/divider/style/dividerstyle.esm.js
var css = "\n@layer primevue {\n    .p-divider-horizontal {\n        display: flex;\n        width: 100%;\n        position: relative;\n        align-items: center;\n    }\n\n    .p-divider-horizontal:before {\n        position: absolute;\n        display: block;\n        top: 50%;\n        left: 0;\n        width: 100%;\n        content: '';\n    }\n\n    .p-divider-content {\n        z-index: 1;\n    }\n\n    .p-divider-vertical {\n        min-height: 100%;\n        margin: 0 1rem;\n        display: flex;\n        position: relative;\n        justify-content: center;\n    }\n\n    .p-divider-vertical:before {\n        position: absolute;\n        display: block;\n        top: 0;\n        left: 50%;\n        height: 100%;\n        content: '';\n    }\n\n    .p-divider-solid.p-divider-horizontal:before {\n        border-top-style: solid;\n    }\n\n    .p-divider-solid.p-divider-vertical:before {\n        border-left-style: solid;\n    }\n\n    .p-divider-dashed.p-divider-horizontal:before {\n        border-top-style: dashed;\n    }\n\n    .p-divider-dashed.p-divider-vertical:before {\n        border-left-style: dashed;\n    }\n\n    .p-divider-dotted.p-divider-horizontal:before {\n        border-top-style: dotted;\n    }\n\n    .p-divider-dotted.p-divider-vertical:before {\n        border-left-style: dotted;\n    }\n}\n";
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      justifyContent: props.layout === "horizontal" ? props.align === "center" || props.align === null ? "center" : props.align === "left" ? "flex-start" : props.align === "right" ? "flex-end" : null : null,
      alignItems: props.layout === "vertical" ? props.align === "center" || props.align === null ? "center" : props.align === "top" ? "flex-start" : props.align === "bottom" ? "flex-end" : null : null
    };
  }
};
var classes = {
  root: function root2(_ref2) {
    var props = _ref2.props;
    return ["p-divider p-component", "p-divider-" + props.layout, "p-divider-" + props.type, {
      "p-divider-left": props.layout === "horizontal" && (!props.align || props.align === "left")
    }, {
      "p-divider-center": props.layout === "horizontal" && props.align === "center"
    }, {
      "p-divider-right": props.layout === "horizontal" && props.align === "right"
    }, {
      "p-divider-top": props.layout === "vertical" && props.align === "top"
    }, {
      "p-divider-center": props.layout === "vertical" && (!props.align || props.align === "center")
    }, {
      "p-divider-bottom": props.layout === "vertical" && props.align === "bottom"
    }];
  },
  content: "p-divider-content"
};
var DividerStyle = BaseStyle.extend({
  name: "divider",
  css,
  classes,
  inlineStyles
});

// node_modules/primevue/divider/divider.esm.js
var script$1 = {
  name: "BaseDivider",
  "extends": script,
  props: {
    align: {
      type: String,
      "default": null
    },
    layout: {
      type: String,
      "default": "horizontal"
    },
    type: {
      type: String,
      "default": "solid"
    }
  },
  style: DividerStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Divider",
  "extends": script$1
};
var _hoisted_1 = ["aria-orientation"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: _ctx.sx("root"),
    role: "separator",
    "aria-orientation": _ctx.layout
  }, _ctx.ptm("root"), {
    "data-pc-name": "divider"
  }), [_ctx.$slots["default"] ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx("content")
  }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16)) : createCommentVNode("", true)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_divider.js.map
