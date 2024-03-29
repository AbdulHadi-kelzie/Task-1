import {
  computed,
  defineComponent,
  h,
  inject
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/@coreui/icons-vue/dist/index.es.js
var CIcon = defineComponent({
  name: "CIcon",
  props: {
    /**
     * Use `:icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    content: {
      type: [String, Array],
      default: void 0,
      required: false
    },
    /**
     * Use for replacing default CIcon component classes. Prop is overriding the 'size' prop.
     */
    customClassName: {
      type: [String, Array, Object],
      default: void 0,
      required: false
    },
    /**
     * Name of the icon placed in React object or SVG content.
     */
    icon: {
      type: [String, Array],
      default: void 0,
      required: false
    },
    /**
     * Use `icon="..."` instead of
     *
     * @deprecated since version 3.0
     */
    name: {
      type: String,
      default: void 0,
      required: false
    },
    /**
     * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
     */
    size: {
      type: String,
      default: void 0,
      required: false,
      validator: (value) => {
        return [
          "custom",
          "custom-size",
          "sm",
          "lg",
          "xl",
          "xxl",
          "3xl",
          "4xl",
          "5xl",
          "6xl",
          "7xl",
          "8xl",
          "9xl"
        ].includes(value);
      }
    },
    /**
     * Title tag content.
     */
    title: {
      type: String,
      default: void 0,
      required: false
    },
    /**
     * If defined component will be rendered using 'use' tag.
     */
    use: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props, { attrs }) {
    const icons = inject("icons");
    const _icon = props.icon || props.content || props.name;
    const toCamelCase = (str) => {
      return str.replace(/([-_][a-z0-9])/gi, ($1) => {
        return $1.toUpperCase();
      }).replace(/-/gi, "");
    };
    const iconName = computed(() => _icon && typeof _icon === "string" ? _icon.includes("-") ? toCamelCase(_icon) : _icon : "");
    const titleCode = props.title ? `<title>${props.title}</title>` : "undefined";
    const code = computed(() => Array.isArray(_icon) ? _icon : typeof _icon === "string" && iconName.value && icons[iconName.value] ? icons[iconName.value] : "undefined");
    const iconCode = Array.isArray(code.value) ? code.value[1] || code.value[0] : code.value;
    const scale = Array.isArray(code.value) && code.value.length > 1 ? code.value[0] : "64 64";
    const viewBox = attrs.viewBox || `0 0 ${scale}`;
    const size = () => {
      const addCustom = !props.size && (attrs.width || attrs.height);
      return props.size === "custom" || addCustom ? "custom-size" : props.size;
    };
    const classNames = (() => {
      return [props.customClassName || ["icon", { [`icon-${size()}`]: size() }], attrs.class];
    })();
    return () => props.use ? h("svg", {
      ...attrs,
      xmlns: "http://www.w3.org/2000/svg",
      class: classNames,
      role: "img"
    }, h("use", { href: props.use })) : h("svg", {
      ...attrs,
      xmlns: "http://www.w3.org/2000/svg",
      class: classNames,
      viewBox,
      innerHTML: `${titleCode}${iconCode}`,
      role: "img"
    });
  }
});
export {
  CIcon,
  CIcon as default
};
//# sourceMappingURL=@coreui_icons-vue.js.map
