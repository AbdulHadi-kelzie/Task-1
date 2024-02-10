import {
  script
} from "./chunk-PUKB7IHH.js";
import "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/columngroup/style/columngroupstyle.esm.js
var ColumnGroupStyle = {};

// node_modules/primevue/columngroup/columngroup.esm.js
var script$1 = {
  name: "BaseColumnGroup",
  "extends": script,
  props: {
    type: {
      type: String,
      "default": null
    }
  },
  style: ColumnGroupStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "ColumnGroup",
  "extends": script$1,
  render: function render() {
    return null;
  }
};
export {
  script2 as default
};
//# sourceMappingURL=primevue_columngroup.js.map
