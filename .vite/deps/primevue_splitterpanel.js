import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/splitterpanel/style/splitterpanelstyle.esm.js
var css = "\n@layer primevue {\n    .p-splitter-panel {\n        flex-grow: 1;\n    }\n\n    .p-splitter-panel-nested {\n        display: flex;\n    }\n\n    .p-splitter-panel .p-splitter {\n        flex-grow: 1;\n        border: 0 none;\n    }\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance;
    return ["p-splitter-panel", {
      "p-splitter-panel-nested": instance.isNested
    }];
  }
};
var SplitterPanelStyle = BaseStyle.extend({
  name: "splitterpanel",
  css,
  classes
});

// node_modules/primevue/splitterpanel/splitterpanel.esm.js
var script$1 = {
  name: "BaseSplitterPanel",
  "extends": script,
  props: {
    size: {
      type: Number,
      "default": null
    },
    minSize: {
      type: Number,
      "default": null
    }
  },
  style: SplitterPanelStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "SplitterPanel",
  "extends": script$1,
  computed: {
    isNested: function isNested() {
      return this.$slots["default"]().some(function(child) {
        return child.type.name === "Splitter";
      });
    },
    getPTOptions: function getPTOptions() {
      return {
        context: {
          nested: this.isNested
        }
      };
    }
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx("root")
  }, _ctx.ptm("root", $options.getPTOptions), {
    "data-pc-name": "splitterpanel"
  }), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_splitterpanel.js.map
