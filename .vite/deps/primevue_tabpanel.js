import {
  script
} from "./chunk-PUKB7IHH.js";
import "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  renderSlot
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/tabpanel/style/tabpanelstyle.esm.js
var TabPanelStyle = {};

// node_modules/primevue/tabpanel/tabpanel.esm.js
var script$1 = {
  name: "BaseTabPanel",
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
  style: TabPanelStyle
};
var script2 = {
  name: "TabPanel",
  "extends": script$1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_tabpanel.js.map
