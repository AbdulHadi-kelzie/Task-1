import {
  script as script2
} from "./chunk-HGAI55N7.js";
import "./chunk-GV7ULW5Z.js";
import {
  script
} from "./chunk-PUKB7IHH.js";
import {
  BaseStyle
} from "./chunk-X4DKXIJZ.js";
import "./chunk-G2WTDY73.js";
import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  mergeProps,
  normalizeClass,
  openBlock,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  toDisplayString,
  withCtx
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/primevue/breadcrumb/style/breadcrumbstyle.esm.js
var css = "\n@layer primevue {\n    .p-breadcrumb {\n        overflow-x: auto;\n    }\n\n    .p-breadcrumb .p-breadcrumb-list {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        display: flex;\n        align-items: center;\n        flex-wrap: nowrap;\n    }\n\n    .p-breadcrumb .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-breadcrumb .p-menuitem-link {\n        text-decoration: none;\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb .p-menuitem-separator {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
var classes = {
  root: "p-breadcrumb p-component",
  menu: "p-breadcrumb-list",
  home: "p-breadcrumb-home",
  separator: "p-menuitem-separator",
  menuitem: function menuitem(_ref) {
    var instance = _ref.instance;
    return ["p-menuitem", {
      "p-disabled": instance.disabled()
    }];
  },
  action: function action(_ref2) {
    var props = _ref2.props, isActive = _ref2.isActive, isExactActive = _ref2.isExactActive;
    return ["p-menuitem-link", {
      "router-link-active": isActive,
      "router-link-active-exact": props.exact && isExactActive
    }];
  },
  icon: "p-menuitem-icon",
  label: "p-menuitem-text"
};
var BreadcrumbStyle = BaseStyle.extend({
  name: "breadcrumb",
  css,
  classes
});

// node_modules/primevue/breadcrumb/breadcrumb.esm.js
var script$2 = {
  name: "BaseBreadcrumb",
  "extends": script,
  props: {
    model: {
      type: Array,
      "default": null
    },
    home: {
      type: null,
      "default": null
    },
    exact: {
      type: Boolean,
      "default": true
    }
  },
  style: BreadcrumbStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script$1 = {
  name: "BreadcrumbItem",
  hostName: "Breadcrumb",
  "extends": script,
  props: {
    item: null,
    templates: null,
    exact: null,
    index: null
  },
  methods: {
    onClick: function onClick(event, navigate) {
      if (this.item.command) {
        this.item.command({
          originalEvent: event,
          item: this.item
        });
      }
      if (this.item.to && navigate) {
        navigate(event);
      }
    },
    visible: function visible() {
      return typeof this.item.visible === "function" ? this.item.visible() : this.item.visible !== false;
    },
    disabled: function disabled() {
      return typeof this.item.disabled === "function" ? this.item.disabled() : this.item.disabled;
    },
    label: function label() {
      return typeof this.item.label === "function" ? this.item.label() : this.item.label;
    },
    isCurrentUrl: function isCurrentUrl() {
      var _this$item = this.item, to = _this$item.to, url = _this$item.url;
      var lastPath = typeof window !== "undefined" ? window.location.pathname : "";
      return to === lastPath || url === lastPath ? "page" : void 0;
    }
  },
  computed: {
    ptmOptions: function ptmOptions() {
      return {
        context: {
          item: this.item,
          index: this.index
        }
      };
    },
    getMenuItemProps: function getMenuItemProps() {
      var _this = this;
      return {
        action: mergeProps({
          "class": this.cx("action"),
          "aria-current": this.isCurrentUrl(),
          onClick: function onClick2($event) {
            return _this.onClick($event);
          }
        }, this.ptm("action", this.ptmOptions)),
        icon: mergeProps({
          "class": [this.cx("icon"), this.item.icon]
        }, this.ptm("icon", this.ptmOptions)),
        label: mergeProps({
          "class": this.cx("label")
        }, this.ptm("label", this.ptmOptions))
      };
    }
  }
};
var _hoisted_1 = ["href", "aria-current", "onClick"];
var _hoisted_2 = ["href", "target", "aria-current"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  return $options.visible() ? (openBlock(), createElementBlock("li", mergeProps({
    key: 0,
    "class": [_ctx.cx("menuitem"), $props.item["class"]]
  }, _ctx.ptm("menuitem", $options.ptmOptions)), [!$props.templates.item ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [$props.item.to ? (openBlock(), createBlock(_component_router_link, {
    key: 0,
    to: $props.item.to,
    custom: ""
  }, {
    "default": withCtx(function(_ref) {
      var navigate = _ref.navigate, href = _ref.href, isActive = _ref.isActive, isExactActive = _ref.isExactActive;
      return [createBaseVNode("a", mergeProps({
        href,
        "class": _ctx.cx("action", {
          isActive,
          isExactActive
        }),
        "aria-current": $options.isCurrentUrl(),
        onClick: function onClick2($event) {
          return $options.onClick($event, navigate);
        }
      }, _ctx.ptm("action", $options.ptmOptions)), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
        key: 0,
        item: $props.item,
        "class": normalizeClass(_ctx.cx("icon"))
      }, null, 8, ["item", "class"])) : $props.item.icon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 1,
        "class": [_ctx.cx("icon"), $props.item.icon]
      }, _ctx.ptm("icon", $options.ptmOptions)), null, 16)) : createCommentVNode("", true), $props.item.label ? (openBlock(), createElementBlock("span", mergeProps({
        key: 2,
        "class": _ctx.cx("label")
      }, _ctx.ptm("label", $options.ptmOptions)), toDisplayString($options.label()), 17)) : createCommentVNode("", true)], 16, _hoisted_1)];
    }),
    _: 1
  }, 8, ["to"])) : (openBlock(), createElementBlock("a", mergeProps({
    key: 1,
    href: $props.item.url || "#",
    "class": _ctx.cx("action"),
    target: $props.item.target,
    "aria-current": $options.isCurrentUrl(),
    onClick: _cache[0] || (_cache[0] = function() {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, _ctx.ptm("action", $options.ptmOptions)), [$props.templates && $props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
    key: 0,
    item: $props.item,
    "class": normalizeClass(_ctx.cx("icon", $options.ptmOptions))
  }, null, 8, ["item", "class"])) : $props.item.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx("icon"), $props.item.icon]
  }, _ctx.ptm("icon", $options.ptmOptions)), null, 16)) : createCommentVNode("", true), $props.item.label ? (openBlock(), createElementBlock("span", mergeProps({
    key: 2,
    "class": _ctx.cx("label")
  }, _ctx.ptm("label", $options.ptmOptions)), toDisplayString($options.label()), 17)) : createCommentVNode("", true)], 16, _hoisted_2))], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
    key: 1,
    item: $props.item,
    label: $options.label(),
    props: $options.getMenuItemProps
  }, null, 8, ["item", "label", "props"]))], 16)) : createCommentVNode("", true);
}
script$1.render = render$1;
var script3 = {
  name: "Breadcrumb",
  "extends": script$2,
  beforeMount: function beforeMount() {
    if (!this.$slots.item) {
      console.warn("In future versions, vue-router support will be removed. Item templating should be used.");
    }
  },
  components: {
    BreadcrumbItem: script$1,
    ChevronRightIcon: script2
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");
  var _component_ChevronRightIcon = resolveComponent("ChevronRightIcon");
  return openBlock(), createElementBlock("nav", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptm("root"), {
    "data-pc-name": "breadcrumb"
  }), [createBaseVNode("ol", mergeProps({
    "class": _ctx.cx("menu")
  }, _ctx.ptm("menu")), [_ctx.home ? (openBlock(), createBlock(_component_BreadcrumbItem, mergeProps({
    key: 0,
    item: _ctx.home,
    "class": _ctx.cx("home"),
    templates: _ctx.$slots,
    exact: _ctx.exact,
    pt: _ctx.pt,
    unstyled: _ctx.unstyled
  }, _ctx.ptm("home")), null, 16, ["item", "class", "templates", "exact", "pt", "unstyled"])) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: item.label + "_" + i
    }, [_ctx.home || i !== 0 ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      "class": _ctx.cx("separator")
    }, _ctx.ptm("separator")), [renderSlot(_ctx.$slots, "separator", {}, function() {
      return [createVNode(_component_ChevronRightIcon, mergeProps({
        "aria-hidden": "true"
      }, _ctx.ptm("separatorIcon")), null, 16)];
    })], 16)) : createCommentVNode("", true), createVNode(_component_BreadcrumbItem, {
      item,
      index: i,
      templates: _ctx.$slots,
      exact: _ctx.exact,
      pt: _ctx.pt,
      unstyled: _ctx.unstyled
    }, null, 8, ["item", "index", "templates", "exact", "pt", "unstyled"])], 64);
  }), 128))], 16)], 16);
}
script3.render = render;
export {
  script3 as default
};
//# sourceMappingURL=primevue_breadcrumb.js.map