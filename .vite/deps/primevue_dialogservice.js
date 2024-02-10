import {
  DynamicDialogEventBus
} from "./chunk-Y4JIVML2.js";
import "./chunk-G2WTDY73.js";
import {
  markRaw
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/usedialog/usedialog.esm.js
var PrimeVueDialogSymbol = Symbol();

// node_modules/primevue/dialogservice/dialogservice.esm.js
var DialogService = {
  install: function install(app) {
    var DialogService2 = {
      open: function open(content, options) {
        var instance = {
          content: content && markRaw(content),
          options: options || {},
          data: options && options.data,
          close: function close(params) {
            DynamicDialogEventBus.emit("close", {
              instance,
              params
            });
          }
        };
        DynamicDialogEventBus.emit("open", {
          instance
        });
        return instance;
      }
    };
    app.config.globalProperties.$dialog = DialogService2;
    app.provide(PrimeVueDialogSymbol, DialogService2);
  }
};
export {
  DialogService as default
};
//# sourceMappingURL=primevue_dialogservice.js.map
