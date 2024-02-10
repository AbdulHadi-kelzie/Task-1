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
  openBlock,
  renderSlot
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/toolbar/style/toolbarstyle.esm.js
var css = "\n@layer primevue {\n    .p-toolbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n    }\n\n    .p-toolbar-group-start,\n    .p-toolbar-group-center,\n    .p-toolbar-group-end {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-toolbar-group-left,\n    .p-toolbar-group-right {\n        display: flex;\n        align-items: center;\n    }\n}\n";
var classes = {
  root: "p-toolbar p-component",
  start: "p-toolbar-group-start p-toolbar-group-left",
  center: "p-toolbar-group-center",
  end: "p-toolbar-group-end p-toolbar-group-right"
};
var ToolbarStyle = BaseStyle.extend({
  name: "toolbar",
  css,
  classes
});

// node_modules/primevue/toolbar/toolbar.esm.js
var script$1 = {
  name: "BaseToolbar",
  "extends": script,
  props: {
    "aria-labelledby": {
      type: String,
      "default": null
    }
  },
  style: ToolbarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "Toolbar",
  "extends": script$1
};
var _hoisted_1 = ["aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "toolbar",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptm("root"), {
    "data-pc-name": "toolbar"
  }), [createBaseVNode("div", mergeProps({
    "class": _ctx.cx("start")
  }, _ctx.ptm("start")), [renderSlot(_ctx.$slots, "start")], 16), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("center")
  }, _ctx.ptm("center")), [renderSlot(_ctx.$slots, "center")], 16), createBaseVNode("div", mergeProps({
    "class": _ctx.cx("end")
  }, _ctx.ptm("end")), [renderSlot(_ctx.$slots, "end")], 16)], 16, _hoisted_1);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_toolbar.js.map
