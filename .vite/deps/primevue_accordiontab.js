import {
  script
} from "./chunk-PUKB7IHH.js";
import "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  renderSlot
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/accordiontab/style/accordiontabstyle.esm.js
var AccordionTabStyle = {};

// node_modules/primevue/accordiontab/accordiontab.esm.js
var script$1 = {
  name: "BaseAccordionTab",
  "extends": script,
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: AccordionTabStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "AccordionTab",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_accordiontab.js.map
