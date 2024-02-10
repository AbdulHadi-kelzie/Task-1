import {
  Teleport,
  Transition,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  toRefs,
  vShow,
  watch,
  withDirectives
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/@coreui/vue/dist/index.es.js
var CAccordion = defineComponent({
  name: "CAccordion",
  props: {
    /**
     * The active item key.
     */
    activeItemKey: [Number, String],
    /**
     * Make accordion items stay open when another item is opened
     */
    alwaysOpen: Boolean,
    /**
     * Removes the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.
     */
    flush: Boolean
  },
  setup(props, { slots }) {
    const activeItemKey = ref(props.activeItemKey);
    const setActiveItemKey = (key) => {
      activeItemKey.value = key;
    };
    provide("activeItemKey", activeItemKey);
    provide("alwaysOpen", props.alwaysOpen);
    provide("setActiveItemKey", setActiveItemKey);
    return () => h("div", { class: ["accordion", { ["accordion-flush"]: props.flush }] }, slots.default && slots.default());
  }
});
var vVisible = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
        });
      }
    }
  }
};
var execute = (callback) => {
  if (typeof callback === "function") {
    callback();
  }
};
var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({ target }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener("transitionend", handler);
    execute(callback);
  };
  transitionElement.addEventListener("transitionend", handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
var getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }
  let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * 1e3;
};
var triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event("transitionend"));
};
var CCollapse = defineComponent({
  name: "CCollapse",
  props: {
    /**
     * Set horizontal collapsing to transition the width instead of height.
     */
    horizontal: Boolean,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { slots, emit }) {
    const collapsing = ref(false);
    const show = ref(props.visible);
    const handleBeforeEnter = () => {
      collapsing.value = true;
    };
    const handleEnter = (el, done) => {
      emit("show");
      setTimeout(() => {
        executeAfterTransition(() => done(), el);
        if (props.horizontal) {
          el.style.width = `${el.scrollWidth}px`;
          return;
        }
        el.style.height = `${el.scrollHeight}px`;
      }, 1);
    };
    const handleAfterEnter = (el) => {
      show.value = true;
      collapsing.value = false;
      props.horizontal ? el.style.removeProperty("width") : el.style.removeProperty("height");
    };
    const handleBeforeLeave = (el) => {
      collapsing.value = true;
      show.value = false;
      if (props.horizontal) {
        el.style.width = `${el.scrollWidth}px`;
        return;
      }
      el.style.height = `${el.scrollHeight}px`;
    };
    const handleLeave = (el, done) => {
      emit("hide");
      setTimeout(() => {
        executeAfterTransition(() => done(), el);
        if (props.horizontal) {
          el.style.width = "0px";
          return;
        }
        el.style.height = "0px";
      }, 1);
    };
    const handleAfterLeave = (el) => {
      collapsing.value = false;
      props.horizontal ? el.style.removeProperty("width") : el.style.removeProperty("height");
    };
    return () => h(Transition, {
      css: false,
      onBeforeEnter: () => handleBeforeEnter(),
      onEnter: (el, done) => handleEnter(el, done),
      onAfterEnter: (el) => handleAfterEnter(el),
      onBeforeLeave: (el) => handleBeforeLeave(el),
      onLeave: (el, done) => handleLeave(el, done),
      onAfterLeave: (el) => handleAfterLeave(el)
    }, () => withDirectives(h("div", {
      class: [
        collapsing.value ? "collapsing" : "collapse",
        { "collapse-horizontal": props.horizontal, show: show.value }
      ]
    }, slots.default && slots.default()), [[vVisible, props.visible]]));
  }
});
var CAccordionBody = defineComponent({
  name: "CAccordionBody",
  setup(_2, { slots }) {
    const visible = inject("visible");
    return () => h(CCollapse, { class: "accordion-collapse", visible: visible.value }, {
      default: () => h("div", { class: ["accordion-body"] }, slots.default && slots.default())
    });
  }
});
var CAccordionButton = defineComponent({
  name: "CAccordionButton",
  setup(_2, { slots }) {
    const toggleVisibility = inject("toggleVisibility");
    const visible = inject("visible");
    return () => h("button", {
      type: "button",
      "aria-expanded": !visible.value,
      class: ["accordion-button", { ["collapsed"]: !visible.value }],
      onClick: () => toggleVisibility()
    }, slots.default && slots.default());
  }
});
var CAccordionHeader = defineComponent({
  name: "CAccordionHeader",
  setup(_2, { slots }) {
    return () => h("div", { class: ["accordion-header"] }, h(CAccordionButton, {}, {
      default: () => slots.default && slots.default()
    }));
  }
});
var CAccordionItem = defineComponent({
  name: "CAccordionItem",
  props: {
    /**
     * The item key.
     */
    itemKey: [Number, String]
  },
  setup(props, { slots }) {
    const activeItemKey = inject("activeItemKey");
    const alwaysOpen = inject("alwaysOpen");
    const setActiveItemKey = inject("setActiveItemKey");
    const itemKey = ref(props.itemKey ?? Math.random().toString(36).slice(2, 11));
    const visible = ref(Boolean(activeItemKey.value === itemKey.value));
    watch(activeItemKey, () => visible.value = Boolean(activeItemKey.value === itemKey.value));
    const toggleVisibility = () => {
      visible.value = !visible.value;
      !alwaysOpen && visible && setActiveItemKey(itemKey.value);
    };
    provide("visible", visible);
    provide("toggleVisibility", toggleVisibility);
    return () => h("div", { class: ["accordion-item"] }, slots.default && slots.default());
  }
});
var CAccordionPlugin = {
  install: (app) => {
    app.component(CAccordion.name, CAccordion);
    app.component(CAccordionBody.name, CAccordionBody);
    app.component(CAccordionButton.name, CAccordionButton);
    app.component(CAccordionHeader.name, CAccordionHeader);
    app.component(CAccordionItem.name, CAccordionItem);
  }
};
var CCloseButton = defineComponent({
  name: "CCloseButton",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.disabled) {
        return;
      }
      emit("click");
    };
    return () => h("button", {
      type: "button",
      class: [
        "btn",
        "btn-close",
        {
          ["btn-close-white"]: props.white
        },
        props.disabled
      ],
      "aria-label": "Close",
      disabled: props.disabled,
      onClick: handleClick
    });
  }
});
var CCloseButtonPlugin = {
  install: (app) => {
    app.component(CCloseButton.name, CCloseButton);
  }
};
var Shape = {
  type: String,
  validator: (value) => {
    return [
      "rounded",
      "rounded-top",
      "rounded-end",
      "rounded-bottom",
      "rounded-start",
      "rounded-circle",
      "rounded-pill",
      "rounded-0",
      "rounded-1",
      "rounded-2",
      "rounded-3"
    ].includes(value);
  }
};
var Color = {
  type: String,
  validator: (value) => {
    return [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
      "light",
      "link",
      "transparent"
    ].includes(value);
  }
};
var TextColor = {
  type: String,
  validator: (value) => {
    return [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "dark",
      "light",
      "white",
      "muted",
      "high-emphasis",
      "medium-emphasis",
      "disabled",
      "high-emphasis-inverse",
      "medium-emphasis-inverse",
      "disabled-inverse"
    ].includes(value);
  }
};
var CAlert = defineComponent({
  name: "CAlert",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Optionally add a close button to alert and allow it to self dismisss.
     */
    dismissible: Boolean,
    /**
     * Set the alert variant to a solid.
     *
     * @values 'solid'
     */
    variant: {
      type: String,
      validator: (value) => {
        return value === "solid";
      }
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close"
  ],
  setup(props, { slots, emit }) {
    const visible = ref(props.visible);
    watch(() => props.visible, () => {
      visible.value = props.visible;
    });
    const handleDismiss = () => {
      visible.value = false;
      emit("close");
    };
    return () => h(Transition, {
      enterFromClass: "",
      enterActiveClass: "fade",
      enterToClass: "fade show",
      leaveActiveClass: "fade"
    }, {
      default: () => visible.value && h("div", {
        class: [
          "alert",
          props.variant === "solid" ? `bg-${props.color} text-white border-0` : `alert-${props.color}`,
          {
            [`alert-${props.color}`]: props.color,
            "alert-dismissible": props.dismissible
          }
        ]
      }, [
        slots.default && slots.default(),
        props.dismissible && h(CCloseButton, {
          onClick: () => {
            handleDismiss();
          }
        })
      ])
    });
  }
});
var CAlertHeading = defineComponent({
  name: "CAlertHeading",
  props: {
    /**
     * 	Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h4"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: "alert-heading"
    }, slots);
  }
});
var CAlertLink = defineComponent({
  name: "CAlertLink",
  setup(_2, { slots }) {
    return () => h("a", {
      class: "alert-link"
    }, slots);
  }
});
var CAlertPlugin = {
  install: (app) => {
    app.component(CAlert.name, CAlert);
    app.component(CAlertHeading.name, CAlertHeading);
    app.component(CAlertLink.name, CAlertLink);
  }
};
var CAvatar = defineComponent({
  name: "CAvatar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: Shape,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'md', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "md", "lg", "xl"].includes(value);
      }
    },
    /**
     * The src attribute for the img element.
     */
    src: String,
    /**
     * Sets the color context of the status indicator to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    status: {
      type: String,
      validator: (value) => {
        return [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "dark",
          "light"
        ].includes(value);
      }
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: TextColor
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "avatar",
        {
          [`bg-${props.color}`]: props.color,
          [`avatar-${props.size}`]: props.size,
          [`text-${props.textColor}`]: props.textColor
        },
        `${props.shape}`
      ]
    }, [
      props.src ? h("img", { src: props.src, class: "avatar-img" }) : slots.default && slots.default(),
      props.status && h("span", { class: ["avatar-status", `bg-${props.status}`] })
    ]);
  }
});
var CAvatarPlugin = {
  install: (app) => {
    app.component(CAvatar.name, CAvatar);
  }
};
var CBackdrop = defineComponent({
  name: "CBackdrop",
  props: {
    /**
     * Toggle the visibility of modal component.
     */
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return () => h(Transition, {
      onEnter: (el) => {
        el.classList.add("show");
      },
      onLeave: (el) => {
        el.classList.remove("show");
      }
    }, () => props.visible && h("div", {
      class: "fade"
    }));
  }
});
var CBackdropPlugin = {
  install: (app) => {
    app.component(CBackdrop.name, CBackdrop);
  }
};
var CBadge = defineComponent({
  name: "CBadge",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Position badge in one of the corners of a link or button.
     *
     * @values 'top-start', 'top-end', 'bottom-end', 'bottom-start'
     */
    position: {
      type: String,
      validator: (value) => {
        return ["top-start", "top-end", "bottom-end", "bottom-start"].includes(value);
      }
    },
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: Shape,
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (value) => {
        return value === "sm";
      }
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: TextColor
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        "badge",
        {
          [`bg-${props.color}`]: props.color,
          "position-absolute translate-middle": props.position,
          "top-0": props.position && props.position.includes("top"),
          "top-100": props.position && props.position.includes("bottom"),
          "start-100": props.position && props.position.includes("end"),
          "start-0": props.position && props.position.includes("start"),
          [`badge-${props.size}`]: props.size,
          [`text-${props.textColor}`]: props.textColor
        },
        props.shape
      ]
    }, slots.default && slots.default());
  }
});
var CBadgePlugin = {
  install: (app) => {
    app.component(CBadge.name, CBadge);
  }
};
var CBreadcrumbItem = defineComponent({
  name: "CBreadcrumbItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * The `href` attribute for the inner link component.
     */
    href: String
  },
  setup(props, { slots }) {
    return () => h("li", {
      class: [
        "breadcrumb-item",
        {
          active: props.active
        }
      ],
      ...props.active && { "aria-current": "page" }
    }, props.href ? h("a", { href: props.href }, slots.default && slots.default()) : slots.default && slots.default());
  }
});
var CBreadcrumb = defineComponent({
  name: "CBreadcrumb",
  setup(_2, { slots, attrs }) {
    return () => h("nav", {
      "aria-label": "breadcrumb"
    }, h("ol", { class: ["breadcrumb", attrs.class] }, slots.default && slots.default()));
  }
});
var CBreadcrumbPlugin = {
  install: (app) => {
    app.component(CBreadcrumb.name, CBreadcrumb);
    app.component(CBreadcrumbItem.name, CBreadcrumbItem);
  }
};
var CButton = defineComponent({
  name: "CButton",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: Shape,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    },
    /**
     * Specifies the type of button. Always specify the type attribute for the `<button>` element.
     * Different browsers may use different default types for the `<button>` element.
     *
     * @values 'button', 'submit', 'reset'
     */
    type: {
      type: String,
      default: "button",
      validator: (value) => {
        return ["button", "submit", "reset"].includes(value);
      }
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (value) => {
        return ["ghost", "outline"].includes(value);
      }
    }
  },
  emits: [
    /**
     * Event called when the user clicks on the button.
     */
    "click"
  ],
  setup(props, { emit, slots }) {
    const handleClick = (event) => {
      if (props.disabled) {
        return;
      }
      emit("click", event);
    };
    return () => h(props.component, {
      class: [
        "btn",
        props.variant ? `btn-${props.variant}-${props.color}` : `btn-${props.color}`,
        {
          [`btn-${props.size}`]: props.size,
          active: props.active,
          disabled: props.disabled
        },
        props.shape
      ],
      disabled: props.disabled && props.component !== "a",
      ...props.component === "a" && props.disabled && { "aria-disabled": true, tabIndex: -1 },
      ...props.component === "a" && props.href && { href: props.href },
      ...props.component === "button" && { type: props.type },
      onClick: handleClick
    }, slots.default && slots.default());
  }
});
var CButtonPlugin = {
  install: (app) => {
    app.component(CButton.name, CButton);
  }
};
var CButtonToolbar = defineComponent({
  name: "CButtonToolbar",
  setup(_2, { slots }) {
    return () => h("div", { class: "btn-toolbar" }, slots.default && slots.default());
  }
});
var CButtonGroup = defineComponent({
  name: "CButtonGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    },
    /**
     * Create a set of buttons that appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
     */
    vertical: Boolean
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        props.vertical ? "btn-group-vertical" : "btn-group",
        { [`btn-group-${props.size}`]: props.size }
      ]
    }, slots.default && slots.default());
  }
});
var CButtonGroupPlugin = {
  install: (app) => {
    app.component(CButtonToolbar.name, CButtonToolbar);
    app.component(CButtonGroup.name, CButtonGroup);
  }
};
var CCallout = defineComponent({
  name: "CCallout",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "callout",
        {
          [`callout-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var CCalloutPlugin = {
  install: (app) => {
    app.component(CCallout.name, CCallout);
  }
};
var CCard = defineComponent({
  name: "CCard",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Sets the text color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: TextColor
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "card",
        {
          [`bg-${props.color}`]: props.color,
          [`text-${props.textColor}`]: props.textColor
        }
      ]
    }, slots.default && slots.default());
  }
});
var CCardBody = defineComponent({
  name: "CCardBody",
  setup(_2, { slots }) {
    return () => h("div", { class: "card-body" }, slots.default && slots.default());
  }
});
var CCardFooter = defineComponent({
  name: "CCardFooter",
  setup(_2, { slots }) {
    return () => h("div", { class: "card-footer" }, slots.default && slots.default());
  }
});
var CCardGroup = defineComponent({
  name: "CCardGroup",
  setup(_2, { slots }) {
    return () => h("div", { class: "card-group" }, slots.default && slots.default());
  }
});
var CCardHeader = defineComponent({
  name: "CCardHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "card-header" }, slots.default && slots.default());
  }
});
var CCardImage = defineComponent({
  name: "CCardImage",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "img"
    },
    /**
     * Optionally orientate the image to the top, bottom.
     *
     * @values 'top', 'bottom'
     */
    orientation: {
      type: String,
      validator: (value) => {
        return ["top", "bottom"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: `card-img${props.orientation ? `-${props.orientation}` : ""}`
    }, slots.default && slots.default());
  }
});
var CCardImageOverlay = defineComponent({
  name: "CCardImageOverlay",
  setup(_2, { slots }) {
    return () => h("div", { class: "card-img-overlay" }, slots.default && slots.default());
  }
});
var CLink = defineComponent({
  name: "CLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(props, { slots, emit }) {
    const handleClick = () => {
      emit("click", props.href);
    };
    return () => h(props.component, {
      class: [{ active: props.active, disabled: props.disabled }],
      ...props.active && { "aria-current": "page" },
      ...props.component === "a" && props.disabled && { "aria-disabled": true, tabIndex: -1 },
      ...(props.component === "a" || props.component === "button") && {
        onClick: handleClick
      },
      href: props.href
    }, slots.default && slots.default());
  }
});
var CCLinkPlugin = {
  install: (app) => {
    app.component(CLink.name, CLink);
  }
};
var CCardLink = defineComponent({
  name: "CCardLink",
  props: {
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: {
      type: String,
      default: "#"
    }
  },
  setup(props, { slots }) {
    return () => h(CLink, { class: "card-link", href: props.href }, { default: () => slots.default && slots.default() });
  }
});
var CCardSubtitle = defineComponent({
  name: "CCardSubtitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "card-subtitle" }, slots.default && slots.default());
  }
});
var CCardText = defineComponent({
  name: "CCardText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "p"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "card-text" }, slots.default && slots.default());
  }
});
var CCardTitle = defineComponent({
  name: "CCardTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "card-title" }, slots.default && slots.default());
  }
});
var CCardPlugin = {
  install: (app) => {
    app.component(CCard.name, CCard);
    app.component(CCardBody.name, CCardBody);
    app.component(CCardFooter.name, CCardFooter);
    app.component(CCardGroup.name, CCardGroup);
    app.component(CCardHeader.name, CCardHeader);
    app.component(CCardImage.name, CCardImage);
    app.component(CCardImageOverlay.name, CCardImageOverlay);
    app.component(CCardLink.name, CCardLink);
    app.component(CCardSubtitle.name, CCardSubtitle);
    app.component(CCardText.name, CCardText);
    app.component(CCardTitle.name, CCardTitle);
  }
};
var isRTL = (element) => {
  if (typeof document !== "undefined" && document.documentElement.dir === "rtl") {
    return true;
  }
  if (element) {
    return element.closest('[dir="rtl"]') !== null;
  }
  return false;
};
var getRTLPlacement = (placement, element) => {
  switch (placement) {
    case "right": {
      return isRTL(element) ? "left" : "right";
    }
    case "left": {
      return isRTL(element) ? "right" : "left";
    }
    default: {
      return placement;
    }
  }
};
var getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * 1e6);
  } while (document.getElementById(prefix));
  return prefix;
};
var isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return Math.floor(rect.top) >= 0 && Math.floor(rect.left) >= 0 && Math.floor(rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) && Math.floor(rect.right) <= (window.innerWidth || document.documentElement.clientWidth);
};
var CCarousel = defineComponent({
  name: "CCarousel",
  props: {
    /**
     * Adding in the previous and next controls.
     */
    controls: Boolean,
    /**
     * Add darker controls, indicators, and captions.
     */
    dark: Boolean,
    /**
     * index of the active item.
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * Adding indicators at the bottom of the carousel for each item.
     */
    indicators: Boolean,
    /**
     * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
     */
    interval: {
      type: [Boolean, Number],
      default: 5e3
    },
    /**
     * If set to 'hover', pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won't pause it.
     */
    pause: {
      type: [Boolean, String],
      default: "hover",
      validator: (value) => {
        return typeof value === "boolean" || value === "hover";
      }
    },
    /**
     * Set type of the transition.
     *
     * @values 'crossfade', 'slide'
     */
    transition: {
      type: String,
      default: "slide",
      validator: (value) => {
        return ["crossfade", "slide"].includes(value);
      }
    },
    /**
     * Set whether the carousel should cycle continuously or have hard stops.
     */
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const carouselRef = ref();
    const active = ref(props.index);
    const animating = ref(false);
    const customInterval = ref(props.interval);
    const direction = ref("next");
    const items = ref([]);
    const timeout = ref();
    const visible = ref();
    const setAnimating = (value) => {
      animating.value = value;
    };
    const setCustomInterval = (value) => {
      customInterval.value = value;
    };
    provide("setAnimating", setAnimating);
    provide("setCustomInterval", setCustomInterval);
    const pause = () => timeout.value && clearInterval(timeout.value);
    const cycle = () => {
      pause();
      if (typeof props.interval === "number") {
        timeout.value = setTimeout(() => nextItemWhenVisible(), typeof customInterval.value === "number" ? customInterval.value : props.interval);
      }
    };
    const handleControlClick = (_direction) => {
      if (animating.value) {
        return;
      }
      direction.value = _direction;
      if (_direction === "next") {
        active.value === items.value.length - 1 ? active.value = 0 : active.value++;
      } else {
        active.value === 0 ? active.value = items.value.length - 1 : active.value--;
      }
    };
    const nextItemWhenVisible = () => {
      if (!document.hidden && carouselRef.value && isInViewport(carouselRef.value)) {
        handleControlClick("next");
      }
    };
    const handleIndicatorClick = (index) => {
      if (active.value === index) {
        return;
      }
      if (active.value < index) {
        direction.value = "next";
        active.value = index;
        return;
      }
      if (active.value > index) {
        direction.value = "prev";
        active.value = index;
      }
    };
    const handleScroll = () => {
      visible.value = !document.hidden && carouselRef.value && isInViewport(carouselRef.value) ? true : false;
    };
    onBeforeMount(() => {
      if (slots.default) {
        const children = typeof slots.default()[0].type === "symbol" ? slots.default()[0].children : slots.default();
        if (children && Array.isArray(children)) {
          items.value = children.filter((child) => child.type.name === "CCarouselItem");
        }
      }
    });
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUpdated(() => {
      watch(animating, () => {
        if (props.wrap) {
          !animating.value && cycle();
          return;
        }
        if (!props.wrap && active.value < items.value.length - 1) {
          !animating.value && cycle();
        }
      });
    });
    watch(visible, () => {
      visible.value && cycle();
    });
    return () => h("div", {
      class: [
        "carousel slide",
        props.transition === "crossfade" && "carousel-fade",
        props.dark && "carousel-dark"
      ],
      onmouseover: () => props.pause && pause(),
      onmouseleave: () => cycle(),
      ref: carouselRef
    }, [
      props.indicators && h("div", {
        class: "carousel-indicators"
      }, items.value.map((_2, index) => {
        return h("button", {
          type: "button",
          id: index,
          "data-coreui-target": "",
          ...active.value === index && { class: "active" },
          onClick: () => handleIndicatorClick(index)
        });
      })),
      h("div", { class: "carousel-inner" }, items.value.map((item, index) => {
        return h(item, {
          active: active.value === index ? true : false,
          direction: direction.value
        });
      })),
      props.controls && [
        h("button", {
          type: "button",
          class: "carousel-control-prev",
          "data-coreui-target": "",
          onClick: () => handleControlClick("prev")
        }, [
          h("span", { class: "carousel-control-prev-icon", ariaHidden: "true" }),
          h("span", { class: "visually-hidden" }, "Previous")
        ]),
        h("button", {
          type: "button",
          class: "carousel-control-next",
          "data-coreui-target": "",
          onClick: () => handleControlClick("next")
        }, [
          h("span", { class: "carousel-control-next-icon", ariaHidden: "true" }),
          h("span", { class: "visually-hidden" }, "Next")
        ])
      ]
    ]);
  }
});
var CCarouselCaption = defineComponent({
  name: "CCarouselCaption",
  setup(_2, { slots }) {
    return () => h("div", {
      class: "carousel-caption"
    }, slots.default && slots.default());
  }
});
var CCarouselItem = defineComponent({
  name: "CCarouselItem",
  props: {
    /**
     * @ignore
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * @ignore
     */
    direction: {
      type: String,
      default: "next"
    },
    /**
     * The amount of time to delay between automatically cycling an item.
     */
    interval: {
      type: [Boolean, Number],
      default: false
    }
  },
  setup(props, { slots }) {
    const carouselItemRef = ref();
    const { active } = toRefs(props);
    const directionClassName = ref();
    const orderClassName = ref();
    const activeClassName = ref(active.value && "active");
    const setAnimating = inject("setAnimating");
    const setCustomInterval = inject("setCustomInterval");
    watch(active, (active2, prevActive) => {
      active2 && setCustomInterval(props.interval);
      if (!prevActive && active2) {
        orderClassName.value = `carousel-item-${props.direction}`;
        setCustomInterval(props.interval);
      }
      setTimeout(() => {
        if (prevActive && !active2) {
          activeClassName.value = "active";
        }
        directionClassName.value = `carousel-item-${props.direction === "next" ? "start" : "end"}`;
      }, 0);
      carouselItemRef.value.addEventListener("transitionstart", () => {
        setAnimating(true);
      });
      carouselItemRef.value.addEventListener("transitionend", () => {
        setAnimating(false);
        if (active2) {
          directionClassName.value = "";
          orderClassName.value = "";
          activeClassName.value = "active";
        }
        if (!active2) {
          directionClassName.value = "";
          orderClassName.value = "";
          activeClassName.value = "";
        }
      });
    });
    return () => h("div", {
      class: [
        "carousel-item",
        activeClassName.value,
        directionClassName.value,
        orderClassName.value
      ],
      ref: carouselItemRef
    }, slots.default && slots.default());
  }
});
var CCarouselPlugin = {
  install: (app) => {
    app.component(CCarousel.name, CCarousel);
    app.component(CCarouselCaption.name, CCarouselCaption);
    app.component(CCarouselItem.name, CCarouselItem);
  }
};
var CCollapsePlugin = {
  install: (app) => {
    app.component(CCollapse.name, CCollapse);
  }
};
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x2 = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y2 = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: y2 + height,
    left: x2,
    x: x2,
    y: y2
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x2 = _ref.x, y2 = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x2 * dpr) / dpr || 0,
    y: round(y2 * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x2 = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y2 = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x: x2,
    y: y2
  }) : {
    x: x2,
    y: y2
  };
  x2 = _ref3.x;
  y2 = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle$1(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y2 -= offsetY - popperRect.height;
      y2 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x2 -= offsetX - popperRect.width;
      x2 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x2,
    y: y2
  }, getWindow(popper2)) : {
    x: x2,
    y: y2
  };
  x2 = _ref4.x;
  y2 = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x2 + "px, " + y2 + "px)" : "translate3d(" + x2 + "px, " + y2 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y2 + "px" : "", _Object$assign2[sideX] = hasX ? x2 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x2 = 0;
  var y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2 + getWindowScrollBarX(element),
    y: y2
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x2 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y2 = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x2 += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle$1(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a2, b2) {
    return overflows[a2] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i2 = 0; i2 < placements2.length; i2++) {
    var placement = placements2[i2];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x2 = _data$state$placement.x, y2 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x2;
    state.modifiersData.popperOffsets.y += y2;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = popperGenerator({
  defaultModifiers
});
var usePopper = () => {
  const _popper = ref();
  const initPopper = (reference2, popper2, options) => {
    _popper.value = createPopper(reference2, popper2, options);
  };
  const destroyPopper = () => {
    if (_popper.value) {
      _popper.value.destroy();
    }
    _popper.value = void 0;
  };
  return {
    popper: _popper.value,
    initPopper,
    destroyPopper
  };
};
var getPlacement = (placement, direction, alignment, isRTL2) => {
  let _placement = placement;
  if (direction === "dropup") {
    _placement = isRTL2 ? "top-end" : "top-start";
  }
  if (direction === "dropup-center") {
    _placement = "top";
  }
  if (direction === "dropend") {
    _placement = isRTL2 ? "left-start" : "right-start";
  }
  if (direction === "dropstart") {
    _placement = isRTL2 ? "right-start" : "left-start";
  }
  if (alignment === "end") {
    _placement = isRTL2 ? "bottom-start" : "bottom-end";
  }
  return _placement;
};
var CDropdown = defineComponent({
  name: "CDropdown",
  props: {
    /**
     * Set aligment of dropdown menu.
     *
     * @values { 'start' | 'end' | { xs: 'start' | 'end' } | { sm: 'start' | 'end' } | { md: 'start' | 'end' } | { lg: 'start' | 'end' } | { xl: 'start' | 'end'} | { xxl: 'start' | 'end'} }
     */
    alignment: {
      type: [String, Object],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (value) => {
        if (value === "start" || value === "end") {
          return true;
        } else {
          if (value.xs !== void 0 && (value.xs === "start" || value.xs === "end")) {
            return true;
          }
          if (value.sm !== void 0 && (value.sm === "start" || value.sm === "end")) {
            return true;
          }
          if (value.md !== void 0 && (value.md === "start" || value.md === "end")) {
            return true;
          }
          if (value.lg !== void 0 && (value.lg === "start" || value.lg === "end")) {
            return true;
          }
          if (value.xl !== void 0 && (value.xl === "start" || value.xl === "end")) {
            return true;
          }
          if (value.xxl !== void 0 && (value.xxl === "start" || value.xxl === "end")) {
            return true;
          }
          return false;
        }
      }
    },
    /**
     * Configure the auto close behavior of the dropdown:
     * - `true` - the dropdown will be closed by clicking outside or inside the dropdown menu.
     * - `false` - the dropdown will be closed by clicking the toggle button and manually calling hide or toggle method. (Also will not be closed by pressing esc key)
     * - `'inside'` - the dropdown will be closed (only) by clicking inside the dropdown menu.
     * - `'outside'` - the dropdown will be closed (only) by clicking outside the dropdown menu.
     */
    autoClose: {
      type: [Boolean, String],
      default: true,
      validator: (value) => {
        return typeof value === "boolean" || ["inside", "outside"].includes(value);
      }
    },
    /**
     * Sets a darker color scheme to match a dark navbar.
     */
    dark: Boolean,
    /**
     * Sets a specified  direction and location of the dropdown menu.
     *
     * @values 'center', 'dropup', 'dropup-center', 'dropend', 'dropstart'
     */
    direction: {
      type: String,
      validator: (value) => {
        return ["center", "dropup", "dropup-center", "dropend", "dropstart"].includes(value);
      }
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Offset of the dropdown menu relative to its target.
     *
     * @since 4.9.0
     */
    offset: {
      type: Array,
      default: () => [0, 2]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     *
     * @values 'auto', 'top-end', 'top', 'top-start', 'bottom-end', 'bottom', 'bottom-start', 'right-start', 'right', 'right-end', 'left-start', 'left', 'left-end'
     */
    placement: {
      type: String,
      default: "bottom-start"
    },
    /**
     * If you want to disable dynamic positioning set this property to `true`.
     */
    popper: {
      type: Boolean,
      default: true
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the dropdown variant to an btn-group, dropdown, input-group, and nav-item.
     *
     * @values 'btn-group', 'dropdown', 'input-group', 'nav-item'
     */
    variant: {
      type: String,
      default: "btn-group",
      validator: (value) => {
        return ["btn-group", "dropdown", "input-group", "nav-item"].includes(value);
      }
    },
    /**
     * Toggle the visibility of dropdown menu component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { slots, emit }) {
    const dropdownToggleRef = ref();
    const dropdownMenuRef = ref();
    const popper2 = ref(typeof props.alignment === "object" ? false : props.popper);
    const visible = ref(props.visible);
    const { initPopper, destroyPopper } = usePopper();
    const popperConfig = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: props.offset
          }
        }
      ],
      placement: getPlacement(props.placement, props.direction, props.alignment, isRTL(dropdownMenuRef.value))
    };
    watch(() => props.visible, () => {
      visible.value = props.visible;
    });
    watch(visible, () => {
      if (visible.value && dropdownToggleRef.value && dropdownMenuRef.value) {
        popper2.value && initPopper(dropdownToggleRef.value, dropdownMenuRef.value, popperConfig);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("keyup", handleKeyup);
        emit("show");
        return;
      }
      popper2.value && destroyPopper();
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keyup", handleKeyup);
      emit("hide");
    });
    provide("config", {
      alignment: props.alignment,
      dark: props.dark,
      popper: props.popper
    });
    provide("variant", props.variant);
    provide("visible", visible);
    provide("dropdownToggleRef", dropdownToggleRef);
    provide("dropdownMenuRef", dropdownMenuRef);
    const handleKeyup = (event) => {
      if (props.autoClose === false) {
        return;
      }
      if (event.key === "Escape") {
        setVisible(false);
      }
    };
    const handleMouseUp = (event) => {
      if (!dropdownToggleRef.value || !dropdownMenuRef.value) {
        return;
      }
      if (dropdownToggleRef.value.contains(event.target)) {
        return;
      }
      if (props.autoClose === true || props.autoClose === "inside" && dropdownMenuRef.value.contains(event.target) || props.autoClose === "outside" && !dropdownMenuRef.value.contains(event.target)) {
        setVisible(false);
        return;
      }
    };
    const setVisible = (_visible) => {
      if (props.disabled) {
        return;
      }
      if (typeof _visible == "boolean") {
        visible.value = _visible;
        return;
      }
      if (visible.value === true) {
        visible.value = false;
        return;
      }
      visible.value = true;
    };
    provide("setVisible", setVisible);
    return () => props.variant === "input-group" ? [slots.default && slots.default()] : h("div", {
      class: [
        props.variant === "nav-item" ? "nav-item dropdown" : props.variant,
        props.direction === "center" ? "dropdown-center" : props.direction === "dropup-center" ? "dropup dropup-center" : props.direction
      ]
    }, slots.default && slots.default());
  }
});
var CDropdownItem = defineComponent({
  name: "CDropdownItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(props, { slots }) {
    return () => h(CLink, {
      class: "dropdown-item",
      active: props.active,
      component: props.component,
      disabled: props.disabled,
      href: props.href
    }, {
      default: () => slots.default && slots.default()
    });
  }
});
var CDropdownHeader = defineComponent({
  name: "CDropdownHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: "dropdown-header"
    }, slots.default && slots.default());
  }
});
var CDropdownDivider = defineComponent({
  name: "CDropdownDivider",
  setup() {
    return () => h("hr", {
      class: "dropdown-divider"
    });
  }
});
var CDropdownMenu = defineComponent({
  name: "CDropdownMenu",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     * @values 'div', 'ul'
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    const dropdownMenuRef = inject("dropdownMenuRef");
    const config = inject("config");
    const visible = inject("visible");
    const { alignment, dark, popper: popper2 } = config;
    const alignmentClassNames = (alignment2) => {
      const classNames = [];
      if (typeof alignment2 === "object") {
        Object.keys(alignment2).map((key) => {
          classNames.push(`dropdown-menu${key === "xs" ? "" : `-${key}`}-${alignment2[key]}`);
        });
      }
      if (typeof alignment2 === "string") {
        classNames.push(`dropdown-menu-${alignment2}`);
      }
      return classNames;
    };
    return () => h(props.component, {
      class: [
        "dropdown-menu",
        { "dropdown-menu-dark": dark, show: visible.value },
        alignmentClassNames(alignment)
      ],
      ...(typeof alignment === "object" || !popper2) && {
        "data-coreui-popper": "static"
      },
      ref: dropdownMenuRef
    }, props.component === "ul" ? slots.default && slots.default().map((vnode) => h("li", {}, vnode)) : slots.default && slots.default());
  }
});
var CDropdownToggle = defineComponent({
  name: "CDropdownToggle",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Enables pseudo element caret on toggler.
     */
    caret: {
      type: Boolean,
      default: true
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Create a custom toggler which accepts any content.
     */
    custom: Boolean,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: Shape,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    },
    /**
     * Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` className for proper spacing around the dropdown caret.
     */
    split: Boolean,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @type 'hover' | 'focus' | 'click'
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (value) => {
        return ["ghost", "outline"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    const togglerRef = ref();
    const dropdownToggleRef = inject("dropdownToggleRef");
    const dropdownVariant = inject("variant");
    const visible = inject("visible");
    const setVisible = inject("setVisible");
    const className = [
      {
        "dropdown-toggle": props.caret,
        "dropdown-toggle-split": props.split,
        active: props.active,
        disabled: props.disabled
      }
    ];
    const triggers = {
      ...(props.trigger === "click" || props.trigger.includes("click")) && {
        onClick: () => {
          if (props.disabled) {
            return;
          }
          setVisible();
        }
      },
      ...(props.trigger === "focus" || props.trigger.includes("focus")) && {
        onfocus: () => {
          if (props.disabled) {
            return;
          }
          setVisible(true);
        },
        onblur: () => {
          if (props.disabled) {
            return;
          }
          setVisible(false);
        }
      }
    };
    onMounted(() => {
      if (togglerRef.value) {
        dropdownToggleRef.value = togglerRef.value.$el;
      }
    });
    return () => props.custom ? slots.default && slots.default().map((slot) => cloneVNode(slot, {
      ref: (el) => {
        togglerRef.value = el;
      },
      ...triggers
    })) : dropdownVariant === "nav-item" ? h("a", {
      active: props.active,
      class: [
        "nav-link",
        className,
        {
          show: visible.value
        }
      ],
      disabled: props.disabled,
      href: "#",
      ref: dropdownToggleRef,
      ...triggers
    }, { default: () => slots.default && slots.default() }) : h(CButton, {
      class: [
        className,
        {
          show: visible.value
        }
      ],
      active: props.active,
      color: props.color,
      disabled: props.disabled,
      ref: (el) => {
        togglerRef.value = el;
      },
      shape: props.shape,
      size: props.size,
      ...triggers,
      ...props.component === "button" && { type: "button" },
      variant: props.variant
    }, () => props.split ? h("span", { class: "visually-hidden" }, "Toggle Dropdown") : slots.default && slots.default());
  }
});
var CDropdownPlugin = {
  install: (app) => {
    app.component(CDropdown.name, CDropdown);
    app.component(CDropdownItem.name, CDropdownItem);
    app.component(CDropdownHeader.name, CDropdownHeader);
    app.component(CDropdownDivider.name, CDropdownDivider);
    app.component(CDropdownMenu.name, CDropdownMenu);
    app.component(CDropdownToggle.name, CDropdownToggle);
  }
};
var CFooter = defineComponent({
  name: "CFooter",
  props: {
    /**
     * Place footer in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (value) => {
        return ["fixed", "sticky"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h("div", { class: ["footer", { [`footer-${props.position}`]: props.position }] }, slots.default && slots.default());
  }
});
var CFooterPlugin = {
  install: (app) => {
    app.component(CFooter.name, CFooter);
  }
};
var CForm = defineComponent({
  name: "CForm",
  props: {
    /**
     * Mark a form as validated. If you set it `true`, all validation styles will be applied to the forms component.
     */
    validated: Boolean
  },
  setup(props, { slots }) {
    return () => h("form", { class: [{ ["was-validated"]: props.validated }] }, slots.default && slots.default());
  }
});
var CFormFeedback = defineComponent({
  name: "CFormFeedback",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Method called immediately after the `value` prop changes.
     */
    invalid: Boolean,
    /**
     * If your form layout allows it, you can display validation feedback in a styled tooltip.
     */
    tooltip: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        {
          [`invalid-${props.tooltip ? "tooltip" : "feedback"}`]: props.invalid,
          [`valid-${props.tooltip ? "tooltip" : "feedback"}`]: props.valid
        }
      ]
    }, slots.default && slots.default());
  }
});
var CFormControlValidation = defineComponent({
  name: "CFormControlValidation",
  inheritAttrs: false,
  props: {
    /**
     * @ignore
     */
    describedby: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(props, { slots }) {
    return () => [
      props.feedback && (props.valid || props.invalid) && h(CFormFeedback, {
        ...props.invalid && { id: props.describedby },
        invalid: props.invalid,
        tooltip: props.tooltipFeedback,
        valid: props.valid
      }, {
        default: () => slots.feedback && slots.feedback() || props.feedback
      }),
      (props.feedbackInvalid || slots.feedbackInvalid) && h(CFormFeedback, {
        id: props.describedby,
        invalid: true,
        tooltip: props.tooltipFeedback
      }, {
        default: () => slots.feedbackInvalid && slots.feedbackInvalid() || props.feedbackInvalid
      }),
      (props.feedbackValid || slots.feedbackValid) && h(CFormFeedback, {
        tooltip: props.tooltipFeedback,
        valid: true
      }, {
        default: () => slots.feedbackValid && slots.feedbackValid() || props.feedbackValid
      })
    ];
  }
});
var CFormLabel = defineComponent({
  name: "CFormLabel",
  props: {
    /**
     * A string of all className you want to be applied to the component, and override standard className value.
     */
    customClassName: [Array, String]
  },
  setup(props, { slots }) {
    return () => h("label", {
      class: props.customClassName ?? "form-label"
    }, slots.default && slots.default());
  }
});
var CFormCheck = defineComponent({
  name: "CFormCheck",
  inheritAttrs: false,
  props: {
    /**
     * Create button-like checkboxes and radio buttons.
     *
     * @see http://coreui.io/vue/docs/components/button.html
     */
    button: Object,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `false` state.
     *
     * @since 4.10.0
     */
    falseValue: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Sets hit area to the full area of the component.
     */
    hitArea: {
      type: String,
      validator: (value) => {
        return ["full"].includes(value);
      }
    },
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Input Checkbox indeterminate Property
     */
    indeterminate: Boolean,
    /**
     * Group checkboxes or radios on the same horizontal row by adding.
     */
    inline: Boolean,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [Array, Boolean, String],
      value: void 0
    },
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `true` state.
     *
     * @since 4.10.0
     */
    trueValue: String,
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean,
    /**
     * The value attribute of component.
     */
    value: String
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit, slots }) {
    const handleChange = (event) => {
      const target = event.target;
      emit("change", event);
      if (props.falseValue && props.trueValue) {
        emit("update:modelValue", target.checked ? props.trueValue : props.falseValue);
        return;
      }
      if (props.value && Array.isArray(props.modelValue)) {
        if (props.modelValue.includes(props.value)) {
          emit("update:modelValue", props.modelValue.filter((value) => value !== props.value));
        } else {
          emit("update:modelValue", [...props.modelValue, props.value]);
        }
        return;
      }
      if (props.value === void 0) {
        emit("update:modelValue", target.checked);
        return;
      }
      if (props.value && (props.modelValue === void 0 || typeof props.modelValue === "string")) {
        emit("update:modelValue", target.checked ? props.value : void 0);
      }
    };
    const className = [
      "form-check",
      {
        "form-check-inline": props.inline,
        "form-check-reverse": props.reverse,
        "is-invalid": props.invalid,
        "is-valid": props.valid
      },
      attrs.class
    ];
    const inputClassName = [
      props.button ? "btn-check" : "form-check-input",
      {
        "is-invalid": props.invalid,
        "is-valid": props.valid,
        "me-2": props.hitArea
      }
    ];
    const isChecked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value);
      }
      if (typeof props.modelValue === "string") {
        return props.modelValue === props.value;
      }
      return props.modelValue;
    });
    const formControl = () => {
      return h("input", {
        ...attrs,
        ...(props.modelValue || props.value) && { checked: isChecked.value },
        class: inputClassName,
        id: props.id,
        indeterminate: props.indeterminate,
        onChange: (event) => handleChange(event),
        type: props.type,
        value: props.value
      });
    };
    const formLabel = () => props.button ? h(CButton, {
      component: "label",
      ...props.button,
      ...props.id && { for: props.id }
    }, {
      default: () => slots.label && slots.label() || props.label
    }) : h(CFormLabel, { class: "form-check-label", ...props.id && { for: props.id } }, {
      default: () => slots.label && slots.label() || props.label
    });
    const formValidation = () => {
      return h(CFormControlValidation, {
        describedby: attrs["aria-describedby"],
        feedback: props.feedback,
        feedbackInvalid: props.feedbackInvalid,
        feedbackValid: props.feedbackValid,
        invalid: props.invalid,
        tooltipFeedback: props.tooltipFeedback,
        valid: props.valid
      });
    };
    return () => props.button ? [formControl(), (slots.label || props.label) && formLabel(), formValidation()] : props.label ? props.hitArea ? [
      h(CFormLabel, {
        customClassName: className,
        ...props.id && { for: props.id }
      }, [formControl(), props.label]),
      formValidation()
    ] : h("div", {
      class: className
    }, [formControl(), props.label && formLabel(), formValidation()]) : formControl();
  }
});
var CFormFloating = defineComponent({
  name: "CFormFloating",
  setup(_2, { slots }) {
    return () => h("div", {
      class: "form-floating"
    }, slots.default && slots.default());
  }
});
var CFormText = defineComponent({
  name: "CFormText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "form-text" }, slots.default && slots.default());
  }
});
var CFormControlWrapper = defineComponent({
  name: "CFormControlWrapper",
  inheritAttrs: false,
  props: {
    ...CFormControlValidation.props,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * @ignore
     */
    id: String,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String
  },
  setup(props, { slots }) {
    const formControlValidation = () => h(CFormControlValidation, {
      describedby: props.describedby,
      feedback: props.feedback,
      feedbackInvalid: props.feedbackInvalid,
      feedbackValid: props.feedbackValid,
      floatingLabel: props.floatingLabel,
      invalid: props.invalid,
      tooltipFeedback: props.tooltipFeedback,
      valid: props.valid
    }, {
      ...slots.feedback && { feedback: () => slots.feedback && slots.feedback() },
      ...slots.feedbackInvalid && {
        feedbackInvalid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.feedbackValid && {
        feedbackValid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      }
    });
    return () => props.floatingLabel ? h(CFormFloating, () => [
      slots.default && slots.default(),
      h(CFormLabel, {
        for: props.id
      }, {
        default: () => slots.label && slots.label() || props.label || props.floatingLabel
      }),
      (props.text || slots.text) && h(CFormText, {
        id: props.describedby
      }, {
        default: () => slots.text && slots.text() || props.text
      }),
      formControlValidation()
    ]) : [
      (props.label || slots.label) && h(CFormLabel, {
        for: props.id
      }, {
        default: () => slots.label && slots.label() || props.label
      }),
      slots.default && slots.default(),
      (props.text || slots.text) && h(CFormText, {
        id: props.describedby
      }, {
        default: () => slots.text && slots.text() || props.text
      }),
      formControlValidation()
    ];
  }
});
var File = typeof window === "undefined" ? class File2 extends Object {
} : window.File;
var CFormInput = defineComponent({
  name: "CFormInput",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    // Inherited Props from CFormControlWrapper
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [File, Number, String],
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Specifies the type of component.
     *
     * @values 'color' | 'file' | 'text' | string
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit, slots }) {
    const handleChange = (event) => {
      const target = event.target;
      emit("change", event);
      emit("update:modelValue", target.value);
    };
    const handleInput = (event) => {
      const target = event.target;
      emit("input", event);
      emit("update:modelValue", target.value);
    };
    return () => h(CFormControlWrapper, {
      describedby: attrs["aria-describedby"],
      feedback: props.feedback,
      feedbackInvalid: props.feedbackInvalid,
      feedbackValid: props.feedbackValid,
      floatingLabel: props.floatingLabel,
      id: props.id,
      invalid: props.invalid,
      label: props.label,
      text: props.text,
      tooltipFeedback: props.tooltipFeedback,
      valid: props.valid
    }, {
      default: () => h("input", {
        id: props.id,
        ...attrs,
        class: [
          props.plainText ? "form-control-plaintext" : "form-control",
          {
            "form-control-color": props.type === "color",
            [`form-control-${props.size}`]: props.size,
            "is-invalid": props.invalid,
            "is-valid": props.valid
          },
          attrs.class
        ],
        disabled: props.disabled,
        onChange: (event) => handleChange(event),
        onInput: (event) => handleInput(event),
        readonly: props.readonly,
        type: props.type,
        ...(props.modelValue || props.modelValue === 0) && { value: props.modelValue }
      }, slots.default && slots.default()),
      ...slots.feedback && { feedback: () => slots.feedback && slots.feedback() },
      ...slots.feedbackInvalid && {
        feedbackInvalid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.feedbackValid && {
        feedbackValid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.label && { label: () => slots.label && slots.label() },
      ...slots.text && { text: () => slots.text && slots.text() }
    });
  }
});
var CFormRange = defineComponent({
  name: "CFormRange",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Specifies the maximum value for the component.
     */
    max: Number,
    /**
     * Specifies the minimum value for the component.
     */
    min: Number,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Specifies the interval between legal numbers in the component.
     */
    steps: Number,
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value: Number
  },
  emits: [
    /**
     * Event occurs when the value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit, slots }) {
    const handleChange = (event) => {
      const target = event.target;
      emit("change", event);
      emit("update:modelValue", target.value);
    };
    return () => [
      props.label && h(CFormLabel, {
        for: attrs.id
      }, {
        default: () => slots.label && slots.label() || props.label
      }),
      h("input", {
        ...attrs,
        class: "form-range",
        disabled: props.disabled,
        max: props.max,
        min: props.min,
        onChange: (event) => handleChange(event),
        readonly: props.readonly,
        steps: props.steps,
        type: "range",
        value: props.modelValue
      }, slots.default && slots.default())
    ];
  }
});
var CFormSelect = defineComponent({
  name: "CFormSelect",
  props: {
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * Specifies the number of visible options in a drop-down list.
     */
    htmlSize: Number,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [String, Array]
    },
    multiple: Boolean,
    /**
     * Options list of the select component. Available keys: `label`, `value`, `disabled`.
     * Examples:
     * - `:options="[{ value: 'js', label: 'JavaScript' }, { value: 'html', label: 'HTML', disabled: true }]"`
     * - `:options="['js', 'html']"`
     */
    options: Array,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when when a user changes the selected option of a `<select>` element.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit, slots }) {
    const handleChange = (event) => {
      const target = event.target;
      const selected = Array.from(target.options).filter((option) => option.selected).map((option) => option.value);
      emit("change", event);
      emit("update:modelValue", target.multiple ? selected : selected[0]);
    };
    return () => h(CFormControlWrapper, {
      describedby: attrs["aria-describedby"],
      feedback: props.feedback,
      feedbackInvalid: props.feedbackInvalid,
      feedbackValid: props.feedbackValid,
      floatingLabel: props.floatingLabel,
      id: props.id,
      invalid: props.invalid,
      label: props.label,
      text: props.text,
      tooltipFeedback: props.tooltipFeedback,
      valid: props.valid
    }, {
      default: () => h("select", {
        id: props.id,
        ...attrs,
        class: [
          "form-select",
          {
            [`form-select-${props.size}`]: props.size,
            "is-invalid": props.invalid,
            "is-valid": props.valid
          },
          attrs.class
        ],
        multiple: props.multiple,
        onChange: (event) => handleChange(event),
        size: props.htmlSize,
        ...props.modelValue && !props.multiple && { value: props.modelValue }
      }, props.options ? props.options.map((option) => {
        return h("option", {
          ...typeof option === "object" && {
            ...option.disabled && { disabled: option.disabled },
            ...option.selected && { selected: option.selected },
            ...option.value !== void 0 && {
              value: option.value,
              ...props.modelValue && props.multiple && props.modelValue.includes(option.value) && { selected: true }
            }
          }
        }, typeof option === "string" ? option : option.label);
      }) : slots.default && slots.default()),
      ...slots.feedback && { feedback: () => slots.feedback && slots.feedback() },
      ...slots.feedbackInvalid && {
        feedbackInvalid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.feedbackValid && {
        feedbackValid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.label && { label: () => slots.label && slots.label() },
      ...slots.text && { text: () => slots.text && slots.text() }
    });
  }
});
var CFormSwitch = defineComponent({
  name: "CFormSwitch",
  inheritAttrs: false,
  props: {
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [Boolean, String],
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Size the component large or extra large. Works only with `switch`.
     *
     * @values 'lg' | 'xl'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["lg", "xl"].includes(value);
      }
    },
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit }) {
    const handleChange = (event) => {
      const target = event.target;
      emit("change", event);
      emit("update:modelValue", target.checked);
    };
    return () => h("div", {
      class: [
        "form-check form-switch",
        {
          "form-check-reverse": props.reverse,
          [`form-switch-${props.size}`]: props.size,
          "is-invalid": props.invalid,
          "is-valid": props.valid
        }
      ]
    }, [
      h("input", {
        ...attrs,
        ...props.modelValue && { checked: props.modelValue },
        class: [
          "form-check-input",
          {
            "is-invalid": props.invalid,
            "is-valid": props.valid
          }
        ],
        id: props.id,
        onChange: (event) => handleChange(event),
        type: props.type
      }),
      props.label && h(CFormLabel, {
        ...props.id && { for: props.id },
        class: "form-check-label"
      }, {
        default: () => props.label
      })
    ]);
  }
});
var CFormTextarea = defineComponent({
  name: "CFormTextarea",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(props, { attrs, emit, slots }) {
    const handleChange = (event) => {
      const target = event.target;
      emit("change", event);
      emit("update:modelValue", target.value);
    };
    const handleInput = (event) => {
      const target = event.target;
      emit("input", event);
      emit("update:modelValue", target.value);
    };
    return () => h(CFormControlWrapper, {
      describedby: attrs["aria-describedby"],
      feedback: props.feedback,
      feedbackInvalid: props.feedbackInvalid,
      feedbackValid: props.feedbackValid,
      floatingLabel: props.floatingLabel,
      id: props.id,
      invalid: props.invalid,
      label: props.label,
      text: props.text,
      tooltipFeedback: props.tooltipFeedback,
      valid: props.valid
    }, {
      default: () => h("textarea", {
        id: props.id,
        ...attrs,
        disabled: props.disabled,
        readonly: props.readonly,
        class: [
          props.plainText ? "form-control-plaintext" : "form-control",
          {
            "is-invalid": props.invalid,
            "is-valid": props.valid
          }
        ],
        onChange: (event) => handleChange(event),
        onInput: (event) => handleInput(event),
        ...props.modelValue && { value: props.modelValue }
      }, slots.default && slots.default()),
      ...slots.feedback && { feedback: () => slots.feedback && slots.feedback() },
      ...slots.feedbackInvalid && {
        feedbackInvalid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.feedbackValid && {
        feedbackValid: () => slots.feedbackInvalid && slots.feedbackInvalid()
      },
      ...slots.label && { label: () => slots.label && slots.label() },
      ...slots.text && { text: () => slots.text && slots.text() }
    });
  }
});
var CInputGroup = defineComponent({
  name: "CInputGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "input-group",
        {
          [`input-group-${props.size}`]: props.size
        }
      ]
    }, slots.default && slots.default());
  }
});
var CInputGroupText = defineComponent({
  name: "CInputGroupText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "input-group-text" }, slots.default && slots.default());
  }
});
var CFormPlugin = {
  install: (app) => {
    app.component(CForm.name, CForm);
    app.component(CFormCheck.name, CFormCheck);
    app.component(CFormFeedback.name, CFormFeedback);
    app.component(CFormFloating.name, CFormFloating);
    app.component(CFormInput.name, CFormInput);
    app.component(CFormLabel.name, CFormLabel);
    app.component(CFormRange.name, CFormRange);
    app.component(CFormSelect.name, CFormSelect);
    app.component(CFormSwitch.name, CFormSwitch);
    app.component(CFormText.name, CFormText);
    app.component(CFormTextarea.name, CFormTextarea);
    app.component(CInputGroup.name, CInputGroup);
    app.component(CInputGroupText.name, CInputGroupText);
  }
};
var BREAKPOINTS$4 = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
var CCol = defineComponent({
  name: "CCol",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xs: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    sm: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    md: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    lg: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xl: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xxl: {
      type: [Boolean, Number, String, Object]
    }
  },
  setup(props, { slots }) {
    const repsonsiveClassNames = [];
    BREAKPOINTS$4.forEach((bp) => {
      const breakpoint = props[bp];
      const infix = bp === "xs" ? "" : `-${bp}`;
      if (breakpoint) {
        if (typeof breakpoint === "number" || typeof breakpoint === "string") {
          repsonsiveClassNames.push(`col${infix}-${breakpoint}`);
        }
        if (typeof breakpoint === "boolean") {
          repsonsiveClassNames.push(`col${infix}`);
        }
      }
      if (breakpoint && typeof breakpoint === "object") {
        if (typeof breakpoint.span === "number" || typeof breakpoint.span === "string") {
          repsonsiveClassNames.push(`col${infix}-${breakpoint.span}`);
        }
        if (typeof breakpoint.span === "boolean") {
          repsonsiveClassNames.push(`col${infix}`);
        }
        if (typeof breakpoint.order === "number" || typeof breakpoint.order === "string") {
          repsonsiveClassNames.push(`order${infix}-${breakpoint.order}`);
        }
        if (typeof breakpoint.offset === "number") {
          repsonsiveClassNames.push(`offset${infix}-${breakpoint.offset}`);
        }
      }
    });
    return () => h("div", {
      class: [repsonsiveClassNames.length > 0 ? repsonsiveClassNames : "col"]
    }, slots.default && slots.default());
  }
});
var BREAKPOINTS$3 = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "fluid"
];
var CContainer = defineComponent({
  name: "CContainer",
  props: {
    /**
     * Set container 100% wide until small breakpoint.
     */
    sm: Boolean,
    /**
     * Set container 100% wide until medium breakpoint.
     */
    md: Boolean,
    /**
     * Set container 100% wide until large breakpoint.
     */
    lg: Boolean,
    /**
     * Set container 100% wide until X-large breakpoint.
     */
    xl: Boolean,
    /**
     * Set container 100% wide until XX-large breakpoint.
     */
    xxl: Boolean,
    /**
     * Set container 100% wide, spanning the entire width of the viewport.
     */
    fluid: Boolean
  },
  setup(props, { slots }) {
    const repsonsiveClassNames = [];
    BREAKPOINTS$3.forEach((bp) => {
      const breakpoint = props[bp];
      breakpoint && repsonsiveClassNames.push(`container-${bp}`);
    });
    return () => h("div", {
      class: [repsonsiveClassNames.length > 0 ? repsonsiveClassNames : "container"]
    }, slots.default && slots.default());
  }
});
var BREAKPOINTS$2 = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
var CRow = defineComponent({
  name: "CRow",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xs: Object,
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    sm: Object,
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    md: Object,
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    lg: Object,
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xl: Object,
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xxl: Object
  },
  setup(props, { slots }) {
    const repsonsiveClassNames = [];
    BREAKPOINTS$2.forEach((bp) => {
      const breakpoint = props[bp];
      const infix = bp === "xs" ? "" : `-${bp}`;
      if (typeof breakpoint === "object") {
        if (breakpoint.cols) {
          repsonsiveClassNames.push(`row-cols${infix}-${breakpoint.cols}`);
        }
        if (typeof breakpoint.gutter === "number") {
          repsonsiveClassNames.push(`g${infix}-${breakpoint.gutter}`);
        }
        if (typeof breakpoint.gutterX === "number") {
          repsonsiveClassNames.push(`gx${infix}-${breakpoint.gutterX}`);
        }
        if (typeof breakpoint.gutterY === "number") {
          repsonsiveClassNames.push(`gy${infix}-${breakpoint.gutterY}`);
        }
      }
    });
    return () => h("div", {
      class: ["row", repsonsiveClassNames]
    }, slots.default && slots.default());
  }
});
var CGridPlugin = {
  install: (app) => {
    app.component(CCol.name, CCol);
    app.component(CContainer.name, CContainer);
    app.component(CRow.name, CRow);
  }
};
var CHeader = defineComponent({
  name: "CHeader",
  props: {
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (value) => {
        return typeof value === "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(value);
      }
    },
    /**
     * Place header in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (value) => {
        return ["fixed", "sticky"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h("div", { class: ["header", { [`header-${props.position}`]: props.position }] }, props.container ? h("div", { class: `container${props.container === true ? "" : "-" + props.container}` }, slots.default && slots.default()) : slots.default && slots.default());
  }
});
var CHeaderBrand = defineComponent({
  name: "CHeaderBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "header-brand" }, slots.default && slots.default());
  }
});
var CHeaderDivider = defineComponent({
  name: "CHeaderDivider",
  setup(_2, { slots }) {
    return () => h("div", { class: "header-divider" }, slots.default && slots.default());
  }
});
var CHeaderNav = defineComponent({
  name: "CHeaderNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: "header-nav",
      role: "navigation"
    }, slots.default && slots.default());
  }
});
var CHeaderText = defineComponent({
  name: "CHeaderText",
  setup(_2, { slots }) {
    return () => h("span", { class: "header-text" }, slots.default && slots.default());
  }
});
var CHeaderToggler = defineComponent({
  name: "CHeaderToggler",
  setup(_2, { slots }) {
    return () => h("button", {
      class: "header-toggler",
      type: "button",
      "aria-label": "Toggle navigation"
    }, slots.default ? slots.default() : h("span", { class: ["header-toggler-icon"] }));
  }
});
var CHeaderPlugin = {
  install: (app) => {
    app.component(CHeader.name, CHeader);
    app.component(CHeaderBrand.name, CHeaderBrand);
    app.component(CHeaderDivider.name, CHeaderDivider);
    app.component(CHeaderNav.name, CHeaderNav);
    app.component(CHeaderText.name, CHeaderText);
    app.component(CHeaderToggler.name, CHeaderToggler);
  }
};
var CImage = defineComponent({
  name: "CImage",
  props: {
    /**
     * Set the horizontal aligment.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (value) => {
        return ["start", "center", "end"].includes(value);
      }
    },
    /**
     * Make image responsive.
     */
    fluid: Boolean,
    /**
     * Make image rounded.
     */
    rounded: Boolean,
    /**
     * Give an image a rounded 1px border appearance.
     */
    thumbnail: Boolean
  },
  setup(props) {
    return () => h("img", {
      class: [
        {
          [`float-${props.align}`]: props.align && (props.align === "start" || props.align === "end"),
          "d-block mx-auto": props.align && props.align === "center",
          "img-fluid": props.fluid,
          rounded: props.rounded,
          "img-thumbnail": props.thumbnail
        }
      ]
    });
  }
});
var CImagePlugin = {
  install: (app) => {
    app.component(CImage.name, CImage);
  }
};
var CListGroup = defineComponent({
  name: "CListGroup",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<CCard>`)
     */
    flush: Boolean,
    /**
     * Specify a layout type.
     *
     * @values 'horizontal', 'horizontal-sm', 'horizontal-md', 'horizontal-lg', 'horizontal-xl', 'horizontal-xxl',
     */
    layout: {
      type: String,
      validator: (value) => {
        return [
          "horizontal",
          "horizontal-sm",
          "horizontal-md",
          "horizontal-lg",
          "horizontal-xl",
          "horizontal-xxl"
        ].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        "list-group",
        {
          "list-group-flush": props.flush,
          [`list-group-${props.layout}`]: props.layout
        }
      ]
    }, slots.default && slots.default());
  }
});
var CListGroupItem = defineComponent({
  name: "CListGroupItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "li"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        "list-group-item",
        {
          [`list-group-item-${props.color}`]: props.color,
          "list-group-item-action": props.component === "a" || props.component === "button",
          [`active`]: props.active,
          [`disabled`]: props.disabled
        }
      ],
      ...(props.component === "a" || props.component === "button") && {
        active: props.active,
        disabled: props.disabled
      },
      ...props.active && { "aria-current": true },
      ...props.disabled && { "aria-disabled": true }
    }, slots.default && slots.default());
  }
});
var CListGroupPlugin = {
  install: (app) => {
    app.component(CListGroup.name, CListGroup);
    app.component(CListGroupItem.name, CListGroupItem);
  }
};
var CModal = defineComponent({
  name: "CModal",
  inheritAttrs: false,
  props: {
    /**
     * Align the modal in the center or top of the screen.
     *
     * @values 'top', 'center'
     */
    alignment: {
      default: "top",
      validator: (value) => {
        return ["top", "center"].includes(value);
      }
    },
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: true,
      validator: (value) => {
        if (typeof value == "string") {
          return ["static"].includes(value);
        }
        if (typeof value == "boolean") {
          return true;
        }
        return false;
      }
    },
    /**
     * A string of all className you want applied to the modal content component.
     */
    contentClassName: String,
    /**
     * Set modal to covers the entire user viewport
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    fullscreen: {
      type: [Boolean, String],
      validator: (value) => {
        if (typeof value == "string") {
          return ["sm", "md", "lg", "xl", "xxl"].includes(value);
        }
        if (typeof value == "boolean") {
          return true;
        }
        return false;
      }
    },
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: true
    },
    /**
     * Create a scrollable modal that allows scrolling the modal body.
     */
    scrollable: Boolean,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg", "xl"].includes(value);
      }
    },
    /**
     * Remove animation to create modal that simply appear rather than fade in to view.
     */
    transition: {
      type: Boolean,
      default: true
    },
    /**
     * By default the component is unmounted after close animation, if you want to keep the component mounted set this property to false.
     */
    unmountOnClose: {
      type: Boolean,
      default: true
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be closed.
     */
    "close-prevented",
    /**
     * Callback fired when the modal is shown, its backdrop is static and a click outside the modal or an escape key press is performed with the keyboard option set to false.
     */
    "show"
  ],
  setup(props, { slots, attrs, emit }) {
    const modalRef = ref();
    const modalContentRef = ref();
    const visible = ref(props.visible);
    watch(() => props.visible, () => {
      visible.value = props.visible;
    });
    const handleEnter = (el, done) => {
      executeAfterTransition(() => done(), el);
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
      el.style.display = "block";
      setTimeout(() => {
        el.classList.add("show");
      }, 1);
      emit("show");
    };
    const handleAfterEnter = () => {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("keyup", handleKeyUp);
    };
    const handleLeave = (el, done) => {
      executeAfterTransition(() => done(), el);
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
      if (document.body.className === "") {
        document.body.removeAttribute("class");
      }
      el.classList.remove("show");
    };
    const handleAfterLeave = (el) => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keyup", handleKeyUp);
      el.style.display = "none";
    };
    const handleDismiss = () => {
      emit("close");
      visible.value = false;
    };
    const handleKeyUp = (event) => {
      if (modalContentRef.value && !modalContentRef.value.contains(event.target)) {
        if (props.backdrop !== "static" && event.key === "Escape" && props.keyboard) {
          handleDismiss();
        }
        if (props.backdrop === "static") {
          modalRef.value.classList.add("modal-static");
          emit("close-prevented");
          setTimeout(() => {
            modalRef.value.classList.remove("modal-static");
          }, 300);
        }
      }
    };
    const handleMouseDown = (event) => {
      window.addEventListener("mouseup", () => handleMouseUp(event), { once: true });
    };
    const handleMouseUp = (event) => {
      if (modalContentRef.value && !modalContentRef.value.contains(event.target)) {
        if (props.backdrop !== "static") {
          handleDismiss();
        }
        if (props.backdrop === "static") {
          modalRef.value.classList.add("modal-static");
          setTimeout(() => {
            modalRef.value.classList.remove("modal-static");
          }, 300);
        }
      }
    };
    provide("handleDismiss", handleDismiss);
    const modal = () => h("div", {
      class: [
        "modal",
        {
          ["fade"]: props.transition
        },
        attrs.class
      ],
      ref: modalRef
    }, h("div", {
      class: [
        "modal-dialog",
        {
          "modal-dialog-centered": props.alignment === "center",
          [`modal-fullscreen-${props.fullscreen}-down`]: props.fullscreen && typeof props.fullscreen === "string",
          "modal-fullscreen": props.fullscreen && typeof props.fullscreen === "boolean",
          ["modal-dialog-scrollable"]: props.scrollable,
          [`modal-${props.size}`]: props.size
        }
      ],
      role: "dialog"
    }, h("div", { class: ["modal-content", props.contentClassName], ref: modalContentRef }, slots.default && slots.default())));
    return () => [
      h(Transition, {
        css: false,
        onEnter: (el, done) => handleEnter(el, done),
        onAfterEnter: () => handleAfterEnter(),
        onLeave: (el, done) => handleLeave(el, done),
        onAfterLeave: (el) => handleAfterLeave(el)
      }, () => props.unmountOnClose ? visible.value && modal() : withDirectives(modal(), [[vShow, visible.value]])),
      props.backdrop && h(CBackdrop, {
        class: "modal-backdrop",
        visible: visible.value
      })
    ];
  }
});
var CModalBody = defineComponent({
  name: "CModalBody",
  setup(_2, { slots }) {
    return () => h("div", { class: "modal-body" }, slots.default && slots.default());
  }
});
var CModalFooter = defineComponent({
  name: "CModalFooter",
  setup(_2, { slots }) {
    return () => h("div", { class: "modal-footer" }, slots.default && slots.default());
  }
});
var CModalHeader = defineComponent({
  name: "CModalHeader",
  props: {
    /**
     * Add a close button component to the header.
     */
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const handleDismiss = inject("handleDismiss");
    return () => h("span", { class: "modal-header" }, [
      slots.default && slots.default(),
      props.closeButton && h(CCloseButton, { onClick: () => handleDismiss() }, "")
    ]);
  }
});
var CModalTitle = defineComponent({
  name: "CModalTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "modal-title" }, slots.default && slots.default());
  }
});
var CModalPlugin = {
  install: (app) => {
    app.component(CModal.name, CModal);
    app.component(CModalBody.name, CModalBody);
    app.component(CModalFooter.name, CModalFooter);
    app.component(CModalHeader.name, CModalHeader);
    app.component(CModalTitle.name, CModalTitle);
  }
};
var CNav = defineComponent({
  name: "CNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Specify a layout type for component.
     *
     * @values 'fill', 'justified'
     */
    layout: {
      type: String,
      validator: (value) => {
        return ["fill", "justified"].includes(value);
      }
    },
    /**
     * Set the nav variant to tabs or pills.
     *
     * @values 'tabs', 'pills'
     */
    variant: {
      type: String,
      validator: (value) => {
        return ["tabs", "pills"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        "nav",
        {
          [`nav-${props.layout}`]: props.layout,
          [`nav-${props.variant}`]: props.variant
        }
      ],
      role: "navigation"
    }, slots.default && slots.default());
  }
});
var CNavGroup = defineComponent({
  name: "CNavGroup",
  props: {
    /**
     * Make nav group more compact by cutting all `padding` in half.
     */
    compact: Boolean,
    /**
     * Show nav group items.
     */
    visible: Boolean
  },
  emits: ["visible-change"],
  setup(props, { slots, emit }) {
    const visible = ref();
    const navGroupRef = ref();
    const visibleGroup = ref();
    const handleVisibleChange = (visible2, index) => {
      if (visible2) {
        visibleGroup.value = index;
      } else {
        if (visibleGroup.value === index) {
          visibleGroup.value = 0;
        }
      }
    };
    const isVisible = (index) => Boolean(visibleGroup.value === index);
    onMounted(() => {
      visible.value = props.visible;
      props.visible && navGroupRef.value.classList.add("show");
      emit("visible-change", visible.value);
    });
    watch(() => props.visible, () => {
      visible.value = props.visible;
      if (visible.value === false) {
        visibleGroup.value = void 0;
      }
    });
    watch(visible, () => {
      emit("visible-change", visible.value);
    });
    const handleTogglerClick = () => {
      visible.value = !visible.value;
      emit("visible-change", visible.value);
    };
    const handleBeforeEnter = (el) => {
      el.style.height = "0px";
      navGroupRef.value.classList.add("show");
    };
    const handleEnter = (el, done) => {
      executeAfterTransition(() => done(), el);
      el.style.height = `${el.scrollHeight}px`;
    };
    const handleAfterEnter = (el) => {
      el.style.height = "auto";
    };
    const handleBeforeLeave = (el) => {
      el.style.height = `${el.scrollHeight}px`;
    };
    const handleLeave = (el, done) => {
      executeAfterTransition(() => done(), el);
      setTimeout(() => {
        el.style.height = "0px";
      }, 1);
    };
    const handleAfterLeave = () => {
      navGroupRef.value.classList.remove("show");
    };
    return () => h("li", {
      class: "nav-group",
      ref: navGroupRef
    }, [
      slots.togglerContent && h("a", {
        class: ["nav-link", "nav-group-toggle"],
        onClick: handleTogglerClick
      }, slots.togglerContent && slots.togglerContent()),
      h(Transition, {
        css: false,
        onBeforeEnter: (el) => handleBeforeEnter(el),
        onEnter: (el, done) => handleEnter(el, done),
        onAfterEnter: (el) => handleAfterEnter(el),
        onBeforeLeave: (el) => handleBeforeLeave(el),
        onLeave: (el, done) => handleLeave(el, done),
        onAfterLeave: () => handleAfterLeave()
      }, {
        default: () => visible.value && h("ul", {
          class: [
            "nav-group-items",
            {
              compact: props.compact
            }
          ]
        }, slots.default && slots.default().map((vnode, index) => {
          if (vnode.type.name === "CNavGroup") {
            return h(vnode, {
              onVisibleChange: (visible2) => handleVisibleChange(visible2, index + 1),
              ...visibleGroup.value && { visible: isVisible(index + 1) }
            });
          }
          return vnode;
        }))
      })
    ]);
  }
});
var CNavGroupItems = defineComponent({
  name: "CNavGroupItems",
  setup(_2, { slots }) {
    return () => h("ul", { class: "nav-group-items" }, slots.default && slots.default());
  }
});
var CNavLink = defineComponent({
  name: "CNavLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @ignore
     */
    href: String
  },
  setup(props, { slots }) {
    return () => h(CLink, {
      class: "nav-link",
      active: props.active,
      component: props.component,
      disabled: props.disabled,
      href: props.href
    }, {
      default: () => slots.default && slots.default()
    });
  }
});
var CNavItem = defineComponent({
  name: "CNavItem",
  props: {
    ...CNavLink.props
  },
  setup(props, { slots }) {
    return () => h("li", {
      class: "nav-item"
    }, props.href ? h(CNavLink, {
      active: props.active,
      component: props.component,
      disabled: props.disabled,
      href: props.href
    }, {
      default: () => slots.default && slots.default()
    }) : slots.default && slots.default());
  }
});
var CNavTitle = defineComponent({
  name: "CNavTitle",
  setup(_2, { slots }) {
    return () => h("li", { class: "nav-title" }, slots.default && slots.default());
  }
});
var CNavPlugin = {
  install: (app) => {
    app.component(CNav.name, CNav);
    app.component(CNavGroup.name, CNavGroup);
    app.component(CNavGroupItems.name, CNavGroupItems);
    app.component(CNavItem.name, CNavItem);
    app.component(CNavLink.name, CNavLink);
    app.component(CNavTitle.name, CNavTitle);
  }
};
var CNavbar = defineComponent({
  name: "CNavbar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color,
    /**
     * Sets if the color of text should be colored for a light or dark dark background.
     *
     * @values 'dark', 'light'
     */
    colorScheme: {
      type: String,
      validator: (value) => {
        return ["dark", "light"].includes(value);
      }
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "nav"
    },
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (value) => {
        return typeof value === "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(value);
      }
    },
    /**
     * Defines the responsive breakpoint to determine when content collapses.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    expand: {
      type: [Boolean, String],
      validator: (value) => {
        return typeof value === "boolean" || ["sm", "md", "lg", "xl", "xxl"].includes(value);
      }
    },
    /**
     * Place component in non-static positions.
     *
     * @values 'fixed-top', 'fixed-bottom', 'sticky-top'
     */
    placement: {
      type: String,
      validator: (value) => {
        return ["fixed-top", "fixed-bottom", "sticky-top"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: [
        "navbar",
        {
          [`bg-${props.color}`]: props.color,
          [`navbar-${props.colorScheme}`]: props.colorScheme,
          [typeof props.expand === "boolean" ? "navbar-expand" : `navbar-expand-${props.expand}`]: props.expand
        },
        props.placement
      ]
    }, props.container ? h("div", { class: [`container${props.container === true ? "" : "-" + props.container}`] }, slots.default && slots.default()) : slots.default && slots.default());
  }
});
var CNavbarBrand = defineComponent({
  name: "CNavbarBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(props, { slots }) {
    return () => h(props.component ?? (props.href ? "a" : "span"), {
      class: "navbar-brand",
      href: props.href
    }, slots.default && slots.default());
  }
});
var CNavbarNav = defineComponent({
  name: "CNavbarNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, {
      class: "navbar-nav",
      role: "navigation"
    }, slots.default && slots.default());
  }
});
var CNavbarText = defineComponent({
  name: "CNavbarText",
  setup(_2, { slots }) {
    return () => h("span", { class: "navbar-text" }, slots.default && slots.default());
  }
});
var CNavbarToggler = defineComponent({
  name: "CNavbarToggler",
  setup(_2, { slots }) {
    return () => h("button", {
      class: "navbar-toggler"
    }, slots.default ? slots.default() : h("span", { class: ["navbar-toggler-icon"] }));
  }
});
var CNavbarPlugin = {
  install: (app) => {
    app.component(CNavbar.name, CNavbar);
    app.component(CNavbarBrand.name, CNavbarBrand);
    app.component(CNavbarNav.name, CNavbarNav);
    app.component(CNavbarText.name, CNavbarText);
    app.component(CNavbarToggler.name, CNavbarToggler);
  }
};
var COffcanvas = defineComponent({
  name: "COffcanvas",
  inheritAttrs: false,
  props: {
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: true,
      validator: (value) => {
        if (typeof value === "string") {
          return ["static"].includes(value);
        }
        if (typeof value === "boolean") {
          return true;
        }
        return false;
      }
    },
    /**
     * Closes the offcanvas when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: true
    },
    /**
     * Components placement, there’s no default placement.
     *
     * @values 'start', 'end', 'top', 'bottom'
     */
    placement: {
      type: String,
      require: true,
      validator: (value) => {
        return ["start", "end", "top", "bottom"].includes(value);
      }
    },
    /**
     * Responsive offcanvas property hide content outside the viewport from a specified breakpoint and down.
     *
     * @values boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
     * @since 4.7.0
     */
    responsive: {
      type: [Boolean, String],
      default: true,
      validator: (value) => {
        if (typeof value === "string") {
          return ["sm", "md", "lg", "xl", "xxl"].includes(value);
        }
        if (typeof value === "boolean") {
          return true;
        }
        return false;
      }
    },
    /**
     * Allow body scrolling while offcanvas is open
     */
    scroll: {
      type: Boolean,
      default: false
    },
    /**
     * Toggle the visibility of offcanvas component.
     */
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { attrs, emit, slots }) {
    const offcanvasRef = ref();
    const visible = ref(props.visible);
    watch(() => props.visible, () => {
      visible.value = props.visible;
    });
    watch(visible, () => {
      if (visible.value && !props.scroll) {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "0px";
        return;
      }
      if (!props.scroll) {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
      }
    });
    const handleEnter = (el, done) => {
      emit("show");
      executeAfterTransition(() => done(), el);
      setTimeout(() => {
        el.classList.add("show");
      }, 1);
    };
    const handleAfterEnter = () => {
      offcanvasRef.value.focus();
    };
    const handleLeave = (el, done) => {
      executeAfterTransition(() => done(), el);
      el.classList.add("hiding");
    };
    const handleAfterLeave = (el) => {
      el.classList.remove("show", "hiding");
    };
    const handleDismiss = () => {
      visible.value = false;
      emit("hide");
    };
    const handleBackdropDismiss = () => {
      if (props.backdrop !== "static") {
        handleDismiss();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && props.keyboard) {
        handleDismiss();
      }
    };
    return () => [
      h(Transition, {
        css: false,
        onEnter: (el, done) => handleEnter(el, done),
        onAfterEnter: () => handleAfterEnter(),
        onLeave: (el, done) => handleLeave(el, done),
        onAfterLeave: (el) => handleAfterLeave(el)
      }, () => withDirectives(h("div", {
        ...attrs,
        class: [
          {
            [`offcanvas${typeof props.responsive === "boolean" ? "" : "-" + props.responsive}`]: props.responsive,
            [`offcanvas-${props.placement}`]: props.placement
          },
          attrs.class
        ],
        onKeydown: (event) => handleKeyDown(event),
        ref: offcanvasRef,
        role: "dialog",
        tabindex: -1
      }, slots.default && slots.default()), [[vVisible, props.visible]])),
      props.backdrop && h(CBackdrop, {
        class: "offcanvas-backdrop",
        onClick: handleBackdropDismiss,
        visible: visible.value
      })
    ];
  }
});
var COffcanvasBody = defineComponent({
  name: "COffcanvasBody",
  setup(_2, { slots }) {
    return () => h("div", { class: "offcanvas-body" }, slots.default && slots.default());
  }
});
var COffcanvasHeader = defineComponent({
  name: "COffcanvasHeader",
  setup(_2, { slots }) {
    return () => h("div", { class: "offcanvas-header" }, slots.default && slots.default());
  }
});
var COffcanvasTitle = defineComponent({
  name: "COffcanvasTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(props, { slots }) {
    return () => h(props.component, { class: "offcanvas-title" }, slots.default && slots.default());
  }
});
var COffcanvasPlugin = {
  install: (app) => {
    app.component(COffcanvas.name, COffcanvas);
    app.component(COffcanvasBody.name, COffcanvasBody);
    app.component(COffcanvasHeader.name, COffcanvasHeader);
    app.component(COffcanvasTitle.name, COffcanvasTitle);
  }
};
var CPagination = defineComponent({
  name: "CPagination",
  props: {
    /**
     * Set the alignment of pagination components.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (value) => {
        return ["start", "center", "end"].includes(value);
      }
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg"].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h("nav", {}, h("ul", {
      class: [
        "pagination",
        {
          [`justify-content-${props.align}`]: props.align,
          [`pagination-${props.size}`]: props.size
        }
      ]
    }, slots.default && slots.default()));
  }
});
var CPaginationItem = defineComponent({
  name: "CPaginationItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(props, { slots }) {
    return () => {
      const component = props.component ?? (props.active ? "span" : "a");
      return h("li", {
        class: [
          "page-item",
          {
            ["active"]: props.active,
            ["disabled"]: props.disabled
          }
        ],
        ...props.active && { active: props.active, "aria-current": "page" }
      }, component === "a" ? h(CLink, {
        class: ["page-link"],
        component,
        href: props.href
      }, {
        default: () => slots.default && slots.default()
      }) : h(component, { class: ["page-link"] }, slots.default && slots.default()));
    };
  }
});
var CPaginationPlugin = {
  install: (app) => {
    app.component(CPagination.name, CPagination);
    app.component(CPaginationItem.name, CPaginationItem);
  }
};
var BREAKPOINTS$1 = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
var CPlaceholder = defineComponent({
  name: "CPlaceholder",
  props: {
    /**
     * Set animation type to better convey the perception of something being actively loaded.
     *
     * @values 'glow', 'wave'
     */
    animation: {
      type: String,
      validator: (value) => {
        return ["glow", "wave"].includes(value);
      }
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Size the component extra small, small, or large.
     *
     * @values 'xs', 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (value) => {
        return ["xs", "sm", "lg"].includes(value);
      }
    },
    /**
     * The number of columns on extra small devices (<576px).
     */
    xs: Number,
    /**
     * The number of columns on small devices (<768px).
     */
    sm: Number,
    /**
     * The number of columns on medium devices (<992px).
     */
    md: Number,
    /**
     * The number of columns on large devices (<1200px).
     */
    lg: Number,
    /**
     * The number of columns on X-Large devices (<1400px).
     */
    xl: Number,
    /**
     * The number of columns on XX-Large devices (≥1400px).
     */
    xxl: Number
  },
  setup(props, { slots }) {
    const repsonsiveClassNames = [];
    BREAKPOINTS$1.forEach((bp) => {
      const breakpoint = props[bp];
      const infix = bp === "xs" ? "" : `-${bp}`;
      if (typeof breakpoint === "number") {
        repsonsiveClassNames.push(`col${infix}-${breakpoint}`);
      }
      if (typeof breakpoint === "boolean") {
        repsonsiveClassNames.push(`col${infix}`);
      }
    });
    return () => h(props.component, {
      class: [
        props.animation ? `placeholder-${props.animation}` : "placeholder",
        {
          [`bg-${props.color}`]: props.color,
          [`placeholder-${props.size}`]: props.size
        },
        repsonsiveClassNames
      ]
    }, slots.default && slots.default());
  }
});
var CPlaceholderPlugin = {
  install: (app) => {
    app.component(CPlaceholder.name, CPlaceholder);
  }
};
var CProgressBar = defineComponent({
  name: "CProgressBar",
  props: {
    /**
     * Use to animate the stripes right to left via CSS3 animations.
     */
    animated: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * The percent to progress the ProgressBar.
     */
    value: {
      type: Number,
      default: 0
    },
    /**
     * Set the progress bar variant to optional striped.
     *
     * @values 'striped'
     */
    variant: {
      type: String,
      validator: (value) => {
        return value === "striped";
      }
    }
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "progress-bar",
        `bg-${props.color}`,
        {
          [`progress-bar-${props.variant}`]: props.variant,
          ["progress-bar-animated"]: props.animated
        }
      ],
      role: "progressbar",
      style: `width: ${props.value}%`,
      "aria-valuenow": props.value,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, slots.default && slots.default());
  }
});
var CProgress = defineComponent({
  name: "CProgress",
  props: {
    /**
     * Sets the height of the component. If you set that value the inner `<CProgressBar>` will automatically resize accordingly.
     */
    height: Number,
    /**
     * Makes progress bar thinner.
     */
    thin: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean,
    ...CProgressBar.props
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "progress",
        {
          "progress-thin": props.thin,
          "progress-white": props.white
        }
      ],
      ...(props.height, { style: `height: ${props.height}px` })
    }, props.value ? h(CProgressBar, {
      value: props.value,
      animated: props.animated,
      color: props.color,
      variant: props.variant
    }, slots.default && slots.default()) : slots.default && slots.default());
  }
});
var CProgressPlugin = {
  install: (app) => {
    app.component(CProgress.name, CProgress);
    app.component(CProgressBar.name, CProgressBar);
  }
};
var CPopover = defineComponent({
  name: "CPopover",
  props: {
    /**
     * Apply a CSS fade transition to the popover.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: true
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (value) => {
        if (typeof value === "string") {
          return ["top", "right", "bottom", "left"].includes(value);
        }
        if (Array.isArray(value)) {
          return value.every((e) => ["top", "right", "bottom", "left"].includes(e));
        }
        return false;
      }
    },
    /**
     * Offset of the popover relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 8]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (value) => {
        return ["top", "right", "bottom", "left"].includes(value);
      }
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: "click",
      validator: (value) => {
        if (typeof value === "string") {
          return ["click", "focus", "hover"].includes(value);
        }
        if (Array.isArray(value)) {
          return value.every((e) => ["click", "focus", "hover"].includes(e));
        }
        return false;
      }
    },
    /**
     * Toggle the visibility of popover component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { attrs, slots, emit }) {
    const togglerRef = ref();
    const popoverRef = ref();
    const visible = ref(props.visible);
    const { initPopper, destroyPopper } = usePopper();
    const delay = typeof props.delay === "number" ? { show: props.delay, hide: props.delay } : props.delay;
    const popperConfig = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".popover-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: props.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: props.offset
          }
        }
      ],
      placement: getRTLPlacement(props.placement, togglerRef.value)
    };
    const handleEnter = (el, done) => {
      emit("show");
      initPopper(togglerRef.value, popoverRef.value, popperConfig);
      el.classList.add("show");
      executeAfterTransition(() => done(), el);
    };
    const handleLeave = (el, done) => {
      emit("hide");
      el.classList.remove("show");
      executeAfterTransition(() => {
        done();
        destroyPopper();
      }, el);
    };
    const toggleVisible = (event, _visible) => {
      togglerRef.value = event.target;
      if (_visible) {
        setTimeout(() => {
          visible.value = true;
        }, delay.show);
        return;
      }
      setTimeout(() => {
        visible.value = false;
      }, delay.hide);
    };
    return () => [
      h(Teleport, {
        to: "body"
      }, h(Transition, {
        onEnter: (el, done) => handleEnter(el, done),
        onLeave: (el, done) => handleLeave(el, done)
      }, () => visible.value && h("div", {
        class: [
          "popover",
          "bs-popover-auto",
          {
            fade: props.animation
          }
        ],
        ref: popoverRef,
        role: "tooltip",
        ...attrs
      }, [
        h("div", { class: "popover-arrow" }),
        (props.title || slots.title) && h("div", { class: "popover-header" }, {
          default: () => slots.title && slots.title() || props.title
        }),
        (props.content || slots.content) && h("div", { class: "popover-body" }, {
          default: () => slots.content && slots.content() || props.content
        })
      ]))),
      slots.toggler && slots.toggler({
        on: {
          click: (event) => props.trigger.includes("click") && toggleVisible(event, !visible.value),
          blur: (event) => props.trigger.includes("focus") && toggleVisible(event, false),
          focus: (event) => props.trigger.includes("focus") && toggleVisible(event, true),
          mouseenter: (event) => props.trigger.includes("hover") && toggleVisible(event, true),
          mouseleave: (event) => props.trigger.includes("hover") && toggleVisible(event, false)
        }
      })
    ];
  }
});
var CPopoverPlugin = {
  install: (app) => {
    app.component(CPopover.name, CPopover);
  }
};
var isOnMobile = (element) => {
  if (!element) {
    return;
  }
  return Boolean(getComputedStyle(element).getPropertyValue("--cui-is-mobile"));
};
var CSidebar = defineComponent({
  name: "CSidebar",
  props: {
    /**
     * Make sidebar narrow.
     */
    narrow: Boolean,
    /**
     * Set sidebar to overlaid variant.
     */
    overlaid: Boolean,
    /**
     * Place sidebar in non-static positions.
     */
    position: {
      type: String,
      validator: (value) => {
        return ["fixed"].includes(value);
      }
    },
    /**
     * Size the component small, large, or extra large.
     */
    size: {
      type: String,
      validator: (value) => {
        return ["sm", "lg", "xl"].includes(value);
      }
    },
    /**
     * Expand narrowed sidebar on hover.
     */
    unfoldable: Boolean,
    /**
     * Toggle the visibility of sidebar component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show",
    /**
     * Event emitted after visibility of component changed.
     */
    "visible-change"
  ],
  setup(props, { attrs, slots, emit }) {
    const mobile = ref();
    const inViewport = ref();
    const sidebarRef = ref();
    const visible = ref(props.visible);
    watch(inViewport, () => {
      emit("visible-change", inViewport.value);
      inViewport.value ? emit("show") : emit("hide");
    });
    watch(() => props.visible, () => visible.value = props.visible);
    watch(mobile, () => {
      if (mobile.value && visible.value)
        visible.value = false;
    });
    onMounted(() => {
      mobile.value = isOnMobile(sidebarRef.value);
      inViewport.value = isInViewport(sidebarRef.value);
      window.addEventListener("resize", handleResize);
      window.addEventListener("mouseup", handleClickOutside);
      window.addEventListener("keyup", handleKeyup);
      sidebarRef.value.addEventListener("mouseup", handleOnClick);
      sidebarRef.value.addEventListener("transitionend", () => {
        inViewport.value = isInViewport(sidebarRef.value);
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseup", handleClickOutside);
      window.removeEventListener("keyup", handleKeyup);
      sidebarRef.value.removeEventListener("mouseup", handleOnClick);
      sidebarRef.value.removeEventListener("transitionend", () => {
        inViewport.value = isInViewport(sidebarRef.value);
      });
    });
    const handleHide = () => {
      visible.value = false;
      emit("visible-change", false);
    };
    const handleResize = () => {
      mobile.value = isOnMobile(sidebarRef.value);
      inViewport.value = isInViewport(sidebarRef.value);
    };
    const handleKeyup = (event) => {
      if (mobile.value && !sidebarRef.value.contains(event.target)) {
        handleHide();
      }
    };
    const handleClickOutside = (event) => {
      if (mobile.value && !sidebarRef.value.contains(event.target)) {
        handleHide();
      }
    };
    const handleOnClick = (event) => {
      const target = event.target;
      target && target.classList.contains("nav-link") && !target.classList.contains("nav-group-toggle") && mobile.value && handleHide();
    };
    return () => [
      h("div", {
        class: [
          "sidebar",
          {
            "sidebar-narrow": props.narrow,
            "sidebar-overlaid": props.overlaid,
            [`sidebar-${props.position}`]: props.position,
            [`sidebar-${props.size}`]: props.size,
            "sidebar-narrow-unfoldable": props.unfoldable,
            show: visible.value === true && mobile.value,
            hide: visible.value === false && !mobile.value
          },
          attrs.class
        ],
        ref: sidebarRef
      }, slots.default && slots.default()),
      mobile.value && h(CBackdrop, {
        class: "sidebar-backdrop d-none",
        visible: props.visible,
        onClick: () => handleHide()
      })
    ];
  }
});
var CSidebarBrand = defineComponent({
  name: "CSidebarBrand",
  setup(_2, { slots }) {
    return () => h("div", { class: "sidebar-brand" }, slots.default && slots.default());
  }
});
var CSidebarFooter = defineComponent({
  name: "CSidebarFooter",
  setup(_2, { slots }) {
    return () => h("div", { class: "sidebar-footer" }, slots.default && slots.default());
  }
});
var CSidebarHeader = defineComponent({
  name: "CSidebarHeader",
  setup(_2, { slots }) {
    return () => h("div", { class: "sidebar-header" }, slots.default && slots.default());
  }
});
var CSidebarNav = defineComponent({
  name: "CSidebarNav",
  setup(_2, { slots }) {
    const visibleGroup = ref();
    const handleVisibleChange = (visible, index) => {
      if (visible) {
        visibleGroup.value = index;
      } else {
        if (visibleGroup.value === index) {
          visibleGroup.value = 0;
        }
      }
    };
    const isVisible = (index) => Boolean(visibleGroup.value === index);
    return () => h("ul", {
      class: "sidebar-nav"
    }, slots.default && slots.default().map((vnode, index) => {
      if (vnode.type.name === "CNavGroup") {
        return h(vnode, {
          onVisibleChange: (visible) => handleVisibleChange(visible, index + 1),
          ...visibleGroup.value && { visible: isVisible(index + 1) }
        });
      }
      return vnode;
    }));
  }
});
var CSidebarToggler = defineComponent({
  name: "CSidebarToggler",
  setup(_2, { slots }) {
    return () => h("button", { class: "sidebar-toggler" }, slots.default && slots.default());
  }
});
var CSidebarPlugin = {
  install: (app) => {
    app.component(CSidebar.name, CSidebar);
    app.component(CSidebarBrand.name, CSidebarBrand);
    app.component(CSidebarFooter.name, CSidebarFooter);
    app.component(CSidebarHeader.name, CSidebarHeader);
    app.component(CSidebarNav.name, CSidebarNav);
    app.component(CSidebarToggler.name, CSidebarToggler);
  }
};
var CSpinner = defineComponent({
  name: "CSpinner",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: {
      type: String,
      validator: (value) => {
        return [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "dark",
          "light"
        ].includes(value);
      }
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (value) => {
        return value === "sm";
      }
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'border', 'grow'
     */
    variant: {
      type: String,
      default: "border",
      validator: (value) => {
        return ["border", "grow"].includes(value);
      }
    },
    /**
     * Set visually hidden label for accessibility purposes.
     */
    visuallyHiddenLabel: {
      type: String,
      default: "Loading..."
    }
  },
  setup(props) {
    return () => h(props.component, {
      class: [
        `spinner-${props.variant}`,
        {
          [`spinner-${props.variant}-${props.size}`]: props.size,
          [`text-${props.color}`]: props.color
        }
      ],
      role: "status"
    }, h("span", { class: ["visually-hidden"] }, props.visuallyHiddenLabel));
  }
});
var CSpinnerPlugin = {
  install: (app) => {
    app.component(CSpinner.name, CSpinner);
  }
};
var CTableBody = defineComponent({
  name: "CTableBody",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("tbody", {
      class: [
        {
          [`table-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var CTableCaption = defineComponent({
  name: "CTableCaption",
  setup(_2, { slots }) {
    return () => h("caption", {}, slots.default && slots.default());
  }
});
var CTableDataCell = defineComponent({
  name: "CTableDataCell",
  props: {
    /**
     * Highlight a table row or cell.
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (value) => {
        return ["bottom", "middle", "top"].includes(value);
      }
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color,
    /**
     * @ignore
     */
    scope: String
  },
  setup(props, { slots }) {
    return () => h(props.scope ? "th" : "td", {
      class: [
        {
          [`align-${props.align}`]: props.align,
          "table-active": props.active,
          [`table-${props.color}`]: props.color
        }
      ],
      ...props.scope && { scope: props.scope }
    }, slots.default && slots.default());
  }
});
var CTableFoot = defineComponent({
  name: "CTableFoot",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("tfoot", {
      class: [
        {
          [`table-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var CTableHead = defineComponent({
  name: "CTableHead",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("thead", {
      class: [
        {
          [`table-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var CTableHeaderCell = defineComponent({
  name: "CTableHeaderCell",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("th", {
      class: [
        {
          [`table-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var CTableRow = defineComponent({
  name: "CTableRow",
  props: {
    /**
     * Highlight a table row or cell..
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (value) => {
        return ["bottom", "middle", "top"].includes(value);
      }
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color
  },
  setup(props, { slots }) {
    return () => h("tr", {
      class: [
        {
          [`align-${props.align}`]: props.align,
          "table-active": props.active,
          [`table-${props.color}`]: props.color
        }
      ]
    }, slots.default && slots.default());
  }
});
var pretifyName = (name) => {
  return name.replace(/[-_.]/g, " ").replace(/ +/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
var getColumnLabel = (column) => typeof column === "object" ? column.label ?? pretifyName(column.key) : pretifyName(column);
var getColumnNames = (columns, items) => columns ? columns.map((column) => {
  return typeof column === "object" ? column.key : column;
}) : items && getColumnNamesFromItems(items);
var getColumnNamesFromItems = (items) => Object.keys(items[0] || {}).filter((el) => el.charAt(0) !== "_");
var CTable = defineComponent({
  name: "CTable",
  props: {
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (value) => {
        return ["bottom", "middle", "top"].includes(value);
      }
    },
    /**
     * Sets the border color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    borderColor: Color,
    /**
     * Add borders on all sides of the table and cells.
     */
    bordered: Boolean,
    /**
     * Remove borders on all sides of the table and cells.
     */
    borderless: Boolean,
    /**
     * Put the `<caption>` on the top of the table.
     *
     * @values 'top' | string
     */
    caption: String,
    /**
     * Set the text of the table caption and the caption on the top of the table.
     *
     * @since 4.5.0
     */
    captionTop: String,
    /**
     * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_props')
     *
     * In columns prop each array item represents one column. Item might be specified in two ways:
     * String: each item define column name equal to item value.
     * Object: item is object with following keys available as column configuration:
     * - key (required)(String) - define column name equal to item key.
     * - label (String) - define visible label of column. If not defined, label will be generated automatically based on column name, by converting kebab-case and snake_case to individual words and capitalization of each word.
     * - _props (Object) - adds classes to all cels in column, ex. _props: { scope: 'col', className: 'custom-class' },
     * - _style (Object) - adds styles to the column header (useful for defining widths)
     *
     * @since 4.5.0
     */
    columns: {
      type: Array
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color,
    /**
     * Array of objects or strings, where each element represents one cell in the table footer.
     *
     * Example items:
     * ['FooterCell', 'FooterCell', 'FooterCell']
     * or
     * [{ label: 'FooterCell', _props: { color: 'success' }, ...]
     *
     * @since 4.5.0
     */
    footer: {
      type: Array
    },
    /**
     * Enable a hover state on table rows within a `<CTableBody>`.
     */
    hover: Boolean,
    /**
     * Array of objects, where each object represents one item - row in table. Additionally, you can add style classes to each row by passing them by '_props' key and to single cell by '_cellProps'.
     *
     * Example item:
     * { name: 'John' , age: 12, _props: { color: 'success' }, _cellProps: { age: { className: 'fw-bold'}}}
     *
     * @since 4.5.0
     */
    items: {
      type: Array
    },
    responsive: {
      type: [Boolean, String],
      validator: (value) => {
        if (typeof value == "string") {
          return ["sm", "md", "lg", "xl", "xxl"].includes(value);
        }
        if (typeof value == "boolean") {
          return true;
        }
        return false;
      }
    },
    /**
     * Make table more compact by cutting all cell `padding` in half.
     */
    small: Boolean,
    /**
     * Add zebra-striping to any table row within the `<CTableBody>`.
     */
    striped: Boolean,
    /**
     * Add zebra-striping to any table column.
     *
     * @since 4.4.0
     */
    stripedColumns: Boolean,
    /**
     * Properties that will be passed to the table footer component.
     *
     * Properties to [CTableFoot](#ctablefoot) component.
     * @since 4.5.0
     */
    tableFootProps: {
      type: Object
    },
    /**
     * Properties that will be passed to the table head component.
     *
     *  Properties to [CTableHead](#ctablehead) component.
     * @since 4.5.0
     */
    tableHeadProps: {
      type: Object
    }
  },
  setup(props, { slots, attrs }) {
    const columnNames = computed(() => getColumnNames(props.columns, props.items));
    const table = () => h("table", {
      class: [
        "table",
        {
          [`align-${props.align}`]: props.align,
          [`caption-top`]: props.captionTop || props.caption === "top",
          [`border-${props.borderColor}`]: props.borderColor,
          "table-bordered": props.bordered,
          "table-borderless": props.borderless,
          [`table-${props.color}`]: props.color,
          "table-hover": props.hover,
          "table-sm": props.small,
          "table-striped": props.striped,
          "table-striped-columns": props.stripedColumns
        },
        attrs.class
      ]
    }, {
      default: () => [
        (props.caption && props.caption !== "top" || props.captionTop) && h(CTableCaption, {}, {
          default: () => props.caption || props.captionTop
        }),
        props.columns && h(CTableHead, {
          ...props.tableHeadProps
        }, {
          default: () => h(CTableRow, {}, {
            default: () => [
              props.columns && props.columns.map((column) => h(CTableHeaderCell, {
                ...typeof column === "object" && column._props && { ...column._props },
                ...typeof column === "object" && column._style && { style: { ...column._style } }
              }, {
                default: () => getColumnLabel(column)
              }))
            ]
          })
        }),
        props.items && h(CTableBody, {}, {
          default: () => [
            props.items && props.items.map((item) => h(CTableRow, {
              ...item._props && { ...item._props }
            }, {
              default: () => [
                columnNames.value && columnNames.value.map((colName) => item[colName] !== void 0 && h(CTableDataCell, {
                  ...item._cellProps && item._cellProps["all"] && { ...item._cellProps["all"] },
                  ...item._cellProps && item._cellProps[colName] && {
                    ...item._cellProps[colName]
                  }
                }, {
                  default: () => item[colName]
                }))
              ]
            }))
          ]
        }),
        slots.default && slots.default(),
        props.footer && h(CTableFoot, {
          ...props.tableFootProps
        }, {
          default: () => h(CTableRow, {}, {
            default: () => [
              props.footer && props.footer.map((item) => h(CTableDataCell, {
                ...typeof item === "object" && item._props && { ...item._props }
              }, {
                default: () => typeof item === "object" ? item.label : item
              }))
            ]
          })
        })
      ]
    });
    return () => [
      props.responsive ? h("div", {
        class: typeof props.responsive === "boolean" ? "table-responsive" : `table-responsive-${props.responsive}`
      }, table()) : table()
    ];
  }
});
var CTablePlugin = {
  install: (app) => {
    app.component(CTable.name, CTable);
    app.component(CTableBody.name, CTableBody);
    app.component(CTableCaption.name, CTableCaption);
    app.component(CTableDataCell.name, CTableDataCell);
    app.component(CTableFoot.name, CTableFoot);
    app.component(CTableHead.name, CTableHead);
    app.component(CTableHeaderCell.name, CTableHeaderCell);
    app.component(CTableRow.name, CTableRow);
  }
};
var CTabContent = defineComponent({
  name: "CTabContent",
  setup(_2, { slots }) {
    return () => h("div", { class: "tab-content" }, slots.default && slots.default());
  }
});
var CTabPane = defineComponent({
  name: "CTabPane",
  props: {
    /**
     * Toggle the visibility of component.
     */
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { slots, emit }) {
    const tabPaneRef = ref();
    const firstRender = ref(true);
    const handleEnter = (el, done) => {
      firstRender.value = false;
      emit("show");
      setTimeout(() => {
        executeAfterTransition(() => done(), el);
        el.classList.add("show");
      }, 1);
    };
    const handleLeave = (el, done) => {
      firstRender.value = false;
      emit("hide");
      el.classList.remove("show");
      executeAfterTransition(() => done(), el);
    };
    return () => h(Transition, {
      onEnter: (el, done) => handleEnter(el, done),
      onLeave: (el, done) => handleLeave(el, done)
    }, () => withDirectives(h("div", {
      class: [
        "tab-pane",
        "fade",
        {
          active: props.visible,
          show: firstRender.value && props.visible
        }
      ],
      ref: tabPaneRef
    }, slots.default && slots.default()), [[vShow, props.visible]]));
  }
});
var CTabsPlugin = {
  install: (app) => {
    app.component(CTabContent.name, CTabContent);
    app.component(CTabPane.name, CTabPane);
  }
};
var CToast = defineComponent({
  name: "CToast",
  props: {
    /**
     * Auto hide the toast.
     */
    autohide: {
      type: Boolean,
      default: true
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: Color,
    /**
     * Delay hiding the toast (ms).
     */
    delay: {
      type: Number,
      default: 5e3
    },
    /**
     * Optionally add a close button to component and allow it to self dismiss.
     */
    dismissible: {
      type: Boolean,
      default: true
    },
    /**
     * index of the component.
     */
    index: Number,
    /**
     * Title node for your component.
     */
    title: String,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { slots, emit }) {
    const timeout = ref(0);
    const visible = ref();
    const updateVisible = (_visible) => {
      visible.value = _visible;
    };
    provide("updateVisible", updateVisible);
    onMounted(() => {
      if (props.visible) {
        visible.value = props.visible;
      }
      if (props.autohide) {
        clearTimeout(timeout.value);
        timeout.value = window.setTimeout(() => {
          visible.value = false;
          emit("close");
        }, props.delay);
      }
    });
    return () => h(Transition, {
      appear: true,
      enterFromClass: "",
      enterActiveClass: "show showing",
      enterToClass: "show",
      leaveFromClass: "show",
      leaveActiveClass: "show showing",
      leaveToClass: "show",
      onAfterEnter: (el) => {
        el.classList.add("show");
        props.index ? emit("show", props.index) : emit("show");
      },
      onAfterLeave: () => {
        props.index ? emit("close", props.index) : emit("close");
      }
    }, {
      default: () => visible.value && h("div", {
        class: [
          "toast fade",
          {
            [`bg-${props.color}`]: props.color
          }
        ],
        "aria-live": "assertive",
        "aria-atomic": true,
        role: "alert"
      }, slots.default && slots.default())
    });
  }
});
var CToastBody = defineComponent({
  name: "CToastBody",
  setup(_2, { slots }) {
    return () => h("div", { class: "toast-body" }, slots.default && slots.default());
  }
});
var CToastClose = defineComponent({
  name: "CToastClose",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    ...CCloseButton.props
  },
  emits: [
    /**
     * Event called before the dissmiss animation has started.
     */
    "close"
  ],
  setup(props, { slots, emit }) {
    const updateVisible = inject("updateVisible");
    const handleClose = () => {
      emit("close");
      updateVisible(false);
    };
    return () => props.component ? h(props.component, {
      onClick: () => {
        handleClose();
      }
    }, () => slots.default && slots.default()) : h(CCloseButton, {
      ...props,
      onClick: () => {
        handleClose();
      }
    });
  }
});
var CToaster = defineComponent({
  name: "CToaster",
  props: {
    /**
     * Describes the placement of component.
     *
     * @values 'top-start', 'top', 'top-end', 'middle-start', 'middle', 'middle-end', 'bottom-start', 'bottom', 'bottom-end'
     */
    placement: {
      type: String,
      validator: (value) => {
        return [
          "top-start",
          "top-center",
          "top-end",
          "middle-start",
          "middle-center",
          "middle-end",
          "bottom-start",
          "bottom-center",
          "bottom-end"
        ].includes(value);
      }
    }
  },
  setup(props, { slots }) {
    return () => h("div", {
      class: [
        "toaster toast-container p-3",
        {
          "position-fixed": props.placement,
          "top-0": props.placement && props.placement.includes("top"),
          "top-50 translate-middle-y": props.placement && props.placement.includes("middle"),
          "bottom-0": props.placement && props.placement.includes("bottom"),
          "start-0": props.placement && props.placement.includes("start"),
          "start-50 translate-middle-x": props.placement && props.placement.includes("center"),
          "end-0": props.placement && props.placement.includes("end")
        }
      ]
    }, slots.default && slots.default());
  }
});
var CToastHeader = defineComponent({
  name: "CToastHeader",
  props: {
    /**
     * Automatically add a close button to the header.
     */
    closeButton: Boolean
  },
  emits: [
    /**
     * Event called after clicking the close button.
     */
    "close"
  ],
  setup(props, { slots, emit }) {
    return () => h("div", { class: "toast-header" }, [
      slots.default && slots.default(),
      props.closeButton && h(CToastClose, {
        onClose: () => emit("close")
      })
    ]);
  }
});
var CToastPlugin = {
  install: (app) => {
    app.component(CToast.name, CToast);
    app.component(CToastBody.name, CToastBody);
    app.component(CToastClose.name, CToastClose);
    app.component(CToaster.name, CToaster);
    app.component(CToastHeader.name, CToastHeader);
  }
};
var CTooltip = defineComponent({
  name: "CTooltip",
  props: {
    /**
     * Apply a CSS fade transition to the tooltip.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: true
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (value) => {
        if (typeof value === "string") {
          return ["top", "right", "bottom", "left"].includes(value);
        }
        if (Array.isArray(value)) {
          return value.every((e) => ["top", "right", "bottom", "left"].includes(e));
        }
        return false;
      }
    },
    /**
     * Offset of the tooltip relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 6]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (value) => {
        return ["top", "right", "bottom", "left"].includes(value);
      }
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: () => ["hover", "focus"],
      validator: (value) => {
        if (typeof value === "string") {
          return ["click", "focus", "hover"].includes(value);
        }
        if (Array.isArray(value)) {
          return value.every((e) => ["click", "focus", "hover"].includes(e));
        }
        return false;
      }
    },
    /**
     * Toggle the visibility of tooltip component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(props, { attrs, slots, emit }) {
    const togglerRef = ref();
    const tooltipRef = ref();
    const visible = ref(props.visible);
    const { initPopper, destroyPopper } = usePopper();
    const delay = typeof props.delay === "number" ? { show: props.delay, hide: props.delay } : props.delay;
    const popperConfig = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".tooltip-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: props.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: props.offset
          }
        }
      ],
      placement: getRTLPlacement(props.placement, togglerRef.value)
    };
    const handleEnter = (el, done) => {
      emit("show");
      initPopper(togglerRef.value, tooltipRef.value, popperConfig);
      el.classList.add("show");
      executeAfterTransition(() => done(), el);
    };
    const handleLeave = (el, done) => {
      emit("hide");
      el.classList.remove("show");
      executeAfterTransition(() => {
        done();
        destroyPopper();
      }, el);
    };
    const toggleVisible = (event, _visible) => {
      togglerRef.value = event.target;
      if (_visible) {
        setTimeout(() => {
          visible.value = true;
        }, delay.show);
        return;
      }
      setTimeout(() => {
        visible.value = false;
      }, delay.hide);
    };
    return () => [
      h(Teleport, {
        to: "body"
      }, h(Transition, {
        onEnter: (el, done) => handleEnter(el, done),
        onLeave: (el, done) => handleLeave(el, done)
      }, () => visible.value && h("div", {
        class: [
          "tooltip",
          "bs-tooltip-auto",
          {
            fade: props.animation
          }
        ],
        ref: tooltipRef,
        role: "tooltip",
        ...attrs
      }, [
        h("div", { class: "tooltip-arrow" }),
        (props.content || slots.content) && h("div", { class: "tooltip-inner" }, {
          default: () => slots.content && slots.content() || props.content
        })
      ]))),
      slots.toggler && slots.toggler({
        on: {
          click: (event) => props.trigger.includes("click") && toggleVisible(event, !visible.value),
          blur: (event) => props.trigger.includes("focus") && toggleVisible(event, false),
          focus: (event) => props.trigger.includes("focus") && toggleVisible(event, true),
          mouseenter: (event) => props.trigger.includes("hover") && toggleVisible(event, true),
          mouseleave: (event) => props.trigger.includes("hover") && toggleVisible(event, false)
        }
      })
    ];
  }
});
var CTooltipPlugin = {
  install: (app) => {
    app.component(CTooltip.name, CTooltip);
  }
};
var CWidgetStatsA = defineComponent({
  name: "CWidgetStatsA",
  props: {
    color: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for action component, ex. `<CDropdown>`.
   *
   * @slot action
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(props, { slots }) {
    return () => h(CCard, {
      class: [
        { [`bg-${props.color}`]: props.color, "text-high-emphasis-inverse": props.color }
      ]
    }, () => [
      h(CCardBody, {
        class: "pb-0 d-flex justify-content-between align-items-start"
      }, () => [
        h("div", {}, [
          (props.value || slots.value) && h("div", { class: "fs-4 fw-semibold" }, {
            default: () => slots.value && slots.value() || props.value
          }),
          (props.title || slots.title) && h("div", {}, {
            default: () => slots.title && slots.title() || props.title
          })
        ]),
        /**
         * @slot Location for action component, ex. `<CDropdown>`.
         */
        slots.action && slots.action()
      ]),
      /**
       * @slot Location for chart component.
       */
      slots.chart && slots.chart(),
      slots.default && slots.default()
    ]);
  }
});
function isObject(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isPlainObject(o2) {
  var ctor, prot;
  if (isObject(o2) === false)
    return false;
  ctor = o2.constructor;
  if (ctor === void 0)
    return true;
  prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(e) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e[r2] = n2[r2]);
    }
    return e;
  }, t.apply(this, arguments);
}
function n(e, t2) {
  if (null == e)
    return {};
  var n2, r2, i2 = {}, o2 = Object.keys(e);
  for (r2 = 0; r2 < o2.length; r2++)
    t2.indexOf(n2 = o2[r2]) >= 0 || (i2[n2] = e[n2]);
  return i2;
}
var r = { silent: false, logLevel: "warn" };
var i = ["validator"];
var o = Object.prototype;
var a = o.toString;
var s = o.hasOwnProperty;
var u = /^\s*function (\w+)/;
function l(e) {
  var t2;
  const n2 = null !== (t2 = null == e ? void 0 : e.type) && void 0 !== t2 ? t2 : e;
  if (n2) {
    const e2 = n2.toString().match(u);
    return e2 ? e2[1] : "";
  }
  return "";
}
var c = isPlainObject;
var f = (e) => e;
var d = f;
if (true) {
  const e = "undefined" != typeof console;
  d = e ? function(e2, t2 = r.logLevel) {
    false === r.silent && console[t2](`[VueTypes warn]: ${e2}`);
  } : f;
}
var p = (e, t2) => s.call(e, t2);
var y = Number.isInteger || function(e) {
  return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
};
var v = Array.isArray || function(e) {
  return "[object Array]" === a.call(e);
};
var h2 = (e) => "[object Function]" === a.call(e);
var b = (e, t2) => c(e) && p(e, "_vueTypes_name") && (!t2 || e._vueTypes_name === t2);
var g = (e) => c(e) && (p(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t2) => p(e, t2)));
function O(e, t2) {
  return Object.defineProperty(e.bind(t2), "__original", { value: e });
}
function m(e, t2, n2 = false) {
  let r2, i2 = true, o2 = "";
  r2 = c(e) ? e : { type: e };
  const a2 = b(r2) ? r2._vueTypes_name + " - " : "";
  if (g(r2) && null !== r2.type) {
    if (void 0 === r2.type || true === r2.type)
      return i2;
    if (!r2.required && null == t2)
      return i2;
    v(r2.type) ? (i2 = r2.type.some((e2) => true === m(e2, t2, true)), o2 = r2.type.map((e2) => l(e2)).join(" or ")) : (o2 = l(r2), i2 = "Array" === o2 ? v(t2) : "Object" === o2 ? c(t2) : "String" === o2 || "Number" === o2 || "Boolean" === o2 || "Function" === o2 ? function(e2) {
      if (null == e2)
        return "";
      const t3 = e2.constructor.toString().match(u);
      return t3 ? t3[1].replace(/^Async/, "") : "";
    }(t2) === o2 : t2 instanceof r2.type);
  }
  if (!i2) {
    const e2 = `${a2}value "${t2}" should be of type "${o2}"`;
    return false === n2 ? (d(e2), false) : e2;
  }
  if (p(r2, "validator") && h2(r2.validator)) {
    const e2 = d, o3 = [];
    if (d = (e3) => {
      o3.push(e3);
    }, i2 = r2.validator(t2), d = e2, !i2) {
      const e3 = (o3.length > 1 ? "* " : "") + o3.join("\n* ");
      return o3.length = 0, false === n2 ? (d(e3), i2) : e3;
    }
  }
  return i2;
}
function j(e, t2) {
  const n2 = Object.defineProperties(t2, { _vueTypes_name: { value: e, writable: true }, isRequired: { get() {
    return this.required = true, this;
  } }, def: { value(e2) {
    return void 0 === e2 ? this.type === Boolean || Array.isArray(this.type) && this.type.includes(Boolean) ? void (this.default = void 0) : (p(this, "default") && delete this.default, this) : h2(e2) || true === m(this, e2, true) ? (this.default = v(e2) ? () => [...e2] : c(e2) ? () => Object.assign({}, e2) : e2, this) : (d(`${this._vueTypes_name} - invalid default value: "${e2}"`), this);
  } } }), { validator: r2 } = n2;
  return h2(r2) && (n2.validator = O(r2, n2)), n2;
}
function _(e, t2) {
  const n2 = j(e, t2);
  return Object.defineProperty(n2, "validate", { value(e2) {
    return h2(this.validator) && d(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = O(e2, this), this;
  } });
}
function T(e, t2, r2) {
  const o2 = function(e2) {
    const t3 = {};
    return Object.getOwnPropertyNames(e2).forEach((n2) => {
      t3[n2] = Object.getOwnPropertyDescriptor(e2, n2);
    }), Object.defineProperties({}, t3);
  }(t2);
  if (o2._vueTypes_name = e, !c(r2))
    return o2;
  const { validator: a2 } = r2, s2 = n(r2, i);
  if (h2(a2)) {
    let { validator: e2 } = o2;
    e2 && (e2 = null !== (l2 = (u2 = e2).__original) && void 0 !== l2 ? l2 : u2), o2.validator = O(e2 ? function(t3) {
      return e2.call(this, t3) && a2.call(this, t3);
    } : a2, o2);
  }
  var u2, l2;
  return Object.assign(o2, s2);
}
function $(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
var w = () => _("any", {});
var x = () => _("function", { type: Function });
var P = () => _("boolean", { type: Boolean });
var A = () => _("string", { type: String });
var E = () => _("number", { type: Number });
var S = () => _("array", { type: Array });
var N = () => _("object", { type: Object });
var V = () => j("integer", { type: Number, validator(e) {
  const t2 = y(e);
  return false === t2 && d(`integer - "${e}" is not an integer`), t2;
} });
var q = () => j("symbol", { validator(e) {
  const t2 = "symbol" == typeof e;
  return false === t2 && d(`symbol - invalid value "${e}"`), t2;
} });
var k = () => Object.defineProperty({ type: null, validator(e) {
  const t2 = null === e;
  return false === t2 && d("nullable - value should be null"), t2;
} }, "_vueTypes_name", { value: "nullable" });
function D(e, t2 = "custom validation failed") {
  if ("function" != typeof e)
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return j(e.name || "<<anonymous function>>", { type: null, validator(n2) {
    const r2 = e(n2);
    return r2 || d(`${this._vueTypes_name} - ${t2}`), r2;
  } });
}
function L(e) {
  if (!v(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t2 = `oneOf - value should be one of "${e.map((e2) => "symbol" == typeof e2 ? e2.toString() : e2).join('", "')}".`, n2 = { validator(n3) {
    const r2 = -1 !== e.indexOf(n3);
    return r2 || d(t2), r2;
  } };
  if (-1 === e.indexOf(null)) {
    const t3 = e.reduce((e2, t4) => {
      if (null != t4) {
        const n3 = t4.constructor;
        -1 === e2.indexOf(n3) && e2.push(n3);
      }
      return e2;
    }, []);
    t3.length > 0 && (n2.type = t3);
  }
  return j("oneOf", n2);
}
function B(e) {
  if (!v(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t2 = false, n2 = false, r2 = [];
  for (let i3 = 0; i3 < e.length; i3 += 1) {
    const o2 = e[i3];
    if (g(o2)) {
      if (h2(o2.validator) && (t2 = true), b(o2, "oneOf") && o2.type) {
        r2 = r2.concat(o2.type);
        continue;
      }
      if (b(o2, "nullable")) {
        n2 = true;
        continue;
      }
      if (true === o2.type || !o2.type) {
        d('oneOfType - invalid usage of "true" and "null" as types.');
        continue;
      }
      r2 = r2.concat(o2.type);
    } else
      r2.push(o2);
  }
  r2 = r2.filter((e2, t3) => r2.indexOf(e2) === t3);
  const i2 = false === n2 && r2.length > 0 ? r2 : null;
  return j("oneOfType", t2 ? { type: i2, validator(t3) {
    const n3 = [], r3 = e.some((e2) => {
      const r4 = m(e2, t3, true);
      return "string" == typeof r4 && n3.push(r4), true === r4;
    });
    return r3 || d(`oneOfType - provided value does not match any of the ${n3.length} passed-in validators:
${$(n3.join("\n"))}`), r3;
  } } : { type: i2 });
}
function F(e) {
  return j("arrayOf", { type: Array, validator(t2) {
    let n2 = "";
    const r2 = t2.every((t3) => (n2 = m(e, t3, true), true === n2));
    return r2 || d(`arrayOf - value validation error:
${$(n2)}`), r2;
  } });
}
function Y(e) {
  return j("instanceOf", { type: e });
}
function I(e) {
  return j("objectOf", { type: Object, validator(t2) {
    let n2 = "";
    const r2 = Object.keys(t2).every((r3) => (n2 = m(e, t2[r3], true), true === n2));
    return r2 || d(`objectOf - value validation error:
${$(n2)}`), r2;
  } });
}
function J(e) {
  const t2 = Object.keys(e), n2 = t2.filter((t3) => {
    var n3;
    return !(null === (n3 = e[t3]) || void 0 === n3 || !n3.required);
  }), r2 = j("shape", { type: Object, validator(r3) {
    if (!c(r3))
      return false;
    const i2 = Object.keys(r3);
    if (n2.length > 0 && n2.some((e2) => -1 === i2.indexOf(e2))) {
      const e2 = n2.filter((e3) => -1 === i2.indexOf(e3));
      return d(1 === e2.length ? `shape - required property "${e2[0]}" is not defined.` : `shape - required properties "${e2.join('", "')}" are not defined.`), false;
    }
    return i2.every((n3) => {
      if (-1 === t2.indexOf(n3))
        return true === this._vueTypes_isLoose || (d(`shape - shape definition does not include a "${n3}" property. Allowed keys: "${t2.join('", "')}".`), false);
      const i3 = m(e[n3], r3[n3], true);
      return "string" == typeof i3 && d(`shape - "${n3}" property validation error:
 ${$(i3)}`), true === i3;
    });
  } });
  return Object.defineProperty(r2, "_vueTypes_isLoose", { writable: true, value: false }), Object.defineProperty(r2, "loose", { get() {
    return this._vueTypes_isLoose = true, this;
  } }), r2;
}
var M = ["name", "validate", "getter"];
var R = (() => {
  var e;
  return (e = class {
    static get any() {
      return w();
    }
    static get func() {
      return x().def(this.defaults.func);
    }
    static get bool() {
      return void 0 === this.defaults.bool ? P() : P().def(this.defaults.bool);
    }
    static get string() {
      return A().def(this.defaults.string);
    }
    static get number() {
      return E().def(this.defaults.number);
    }
    static get array() {
      return S().def(this.defaults.array);
    }
    static get object() {
      return N().def(this.defaults.object);
    }
    static get integer() {
      return V().def(this.defaults.integer);
    }
    static get symbol() {
      return q();
    }
    static get nullable() {
      return k();
    }
    static extend(e2) {
      if (d("VueTypes.extend is deprecated. Use the ES6+ method instead. See https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#extending-namespaced-validators-in-es6 for details."), v(e2))
        return e2.forEach((e3) => this.extend(e3)), this;
      const { name: t2, validate: r2 = false, getter: i2 = false } = e2, o2 = n(e2, M);
      if (p(this, t2))
        throw new TypeError(`[VueTypes error]: Type "${t2}" already defined`);
      const { type: a2 } = o2;
      if (b(a2))
        return delete o2.type, Object.defineProperty(this, t2, i2 ? { get: () => T(t2, a2, o2) } : { value(...e3) {
          const n2 = T(t2, a2, o2);
          return n2.validator && (n2.validator = n2.validator.bind(n2, ...e3)), n2;
        } });
      let s2;
      return s2 = i2 ? { get() {
        const e3 = Object.assign({}, o2);
        return r2 ? _(t2, e3) : j(t2, e3);
      }, enumerable: true } : { value(...e3) {
        const n2 = Object.assign({}, o2);
        let i3;
        return i3 = r2 ? _(t2, n2) : j(t2, n2), n2.validator && (i3.validator = n2.validator.bind(i3, ...e3)), i3;
      }, enumerable: true }, Object.defineProperty(this, t2, s2);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = r, e.custom = D, e.oneOf = L, e.instanceOf = Y, e.oneOfType = B, e.arrayOf = F, e.objectOf = I, e.shape = J, e.utils = { validate: (e2, t2) => true === m(t2, e2, true), toType: (e2, t2, n2 = false) => n2 ? _(e2, t2) : j(e2, t2) }, e;
})();
function U(e = { func: () => {
}, bool: true, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var n2;
  return (n2 = class extends R {
    static get sensibleDefaults() {
      return t({}, this.defaults);
    }
    static set sensibleDefaults(n3) {
      this.defaults = false !== n3 ? t({}, true !== n3 ? n3 : e) : {};
    }
  }).defaults = t({}, e), n2;
}
var z = class extends U() {
};
var CWidgetStatsB = defineComponent({
  name: "CWidgetStatsB",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: J({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: Color,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, { slots }) {
    return () => h(CCard, {
      class: [
        {
          "text-high-emphasis-inverse": props.inverse
        }
      ],
      color: props.color
    }, () => h(CCardBody, {
      class: "card-body"
    }, () => [
      (props.value || slots.value) && h("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => slots.value && slots.value() || props.value
      }),
      (props.title || slots.title) && h("div", {}, {
        default: () => slots.title && slots.title() || props.title
      }),
      h(CProgress, {
        class: "my-2",
        ...props.progress && props.progress.color && { color: props.progress.color },
        height: 4,
        ...props.progress && props.progress.value && { value: props.progress.value },
        white: props.inverse
      }),
      (props.text || slots.text) && h("small", {
        class: [
          props.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => slots.text && slots.text() || props.text
      })
    ]));
  }
});
var CWidgetStatsC = defineComponent({
  name: "CWidgetStatsC",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: J({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: Color,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(props, { slots }) {
    return () => h(CCard, {
      class: [
        {
          ["text-white"]: props.inverse
        }
      ],
      color: props.color
    }, () => h(CCardBody, {
      class: "card-body"
    }, () => [
      slots.icon && h("div", {
        class: [
          "text-end mb-4",
          props.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, slots.icon && slots.icon()),
      (props.value || slots.value) && h("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => slots.value && slots.value() || props.value
      }),
      (props.title || slots.title) && h("div", {
        class: [
          "text-uppercase fw-semibold small",
          props.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => slots.title && slots.title() || props.title
      }),
      h(CProgress, {
        class: "my-2",
        ...props.progress && props.progress.color && { color: props.progress.color },
        height: 4,
        ...props.progress && props.progress.value && { value: props.progress.value },
        white: props.inverse
      })
    ]));
  }
});
var CWidgetStatsD = defineComponent({
  name: "CWidgetStatsD",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Values and titles for your component.
     */
    values: {
      type: Array,
      default: () => []
    }
  },
  /**
   * Location for icon component, ex. `<CDropdown>`.
   *
   * @slot icon
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(props, { slots }) {
    return () => h(CCard, {}, {
      default: () => [
        h(CCardHeader, {
          class: [
            "position-relative d-flex justify-content-center align-items-center",
            {
              [`bg-${props.color}`]: props.color
            }
          ]
        }, () => [slots.icon && slots.icon(), slots.chart && slots.chart()]),
        h(CCardBody, {
          class: "row text-center"
        }, {
          default: () => props.values && props.values.map((value, index) => [
            index % 2 !== 0 && h("div", { class: "vr" }),
            h(CCol, {}, {
              default: () => [
                h(CCol, { class: "fs-5 fw-semibold" }, () => value.value),
                h(CCol, { class: "text-uppercase text-medium-emphasis small" }, () => value.title)
              ]
            })
          ])
        })
      ]
    });
  }
});
var CWidgetStatsE = defineComponent({
  name: "CWidgetStatsE",
  props: {
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(props, { slots }) {
    return () => h(CCard, {}, () => h(CCardBody, {
      class: "text-center"
    }, () => [
      (props.title || slots.title) && h("div", {
        class: "text-muted small text-uppercase font-weight-bold"
      }, {
        default: () => slots.title && slots.title() || props.title
      }),
      (props.value || slots.value) && h("div", {
        class: "h2 py-3"
      }, {
        default: () => slots.value && slots.value() || props.value
      }),
      slots.chart && slots.chart(),
      slots.default && slots.default()
    ]));
  }
});
var CWidgetStatsF = defineComponent({
  name: "CWidgetStatsF",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: Color,
    /**
     * Set padding of your component.
     */
    padding: {
      type: Boolean,
      default: true
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(props, { slots }) {
    return () => h(CCard, {}, {
      default: () => [
        h(CCardBody, {
          class: ["d-flex align-items-center", props.padding === false && "p-0"]
        }, () => [
          h("div", {
            class: [
              "me-3",
              "text-white",
              `bg-${props.color}`,
              props.padding ? "p-3" : "p-4"
            ]
          }, slots.default && slots.default() || slots.icon && slots.icon()),
          h("div", {}, [
            (props.value || slots.value) && h("div", {
              class: [`fs-6 fw-semibold text-${props.color}`]
            }, {
              default: () => slots.value && slots.value() || props.value
            }),
            (props.title || slots.title) && h("div", {
              class: "text-medium-emphasis text-uppercase fw-semibold small"
            }, {
              default: () => slots.title && slots.title() || props.title
            })
          ])
        ]),
        slots.footer && h(CCardFooter, {}, () => slots.footer && slots.footer())
      ]
    });
  }
});
var CWidgetsStatsPlugin = {
  install: (app) => {
    app.component(CWidgetStatsA.name, CWidgetStatsA);
    app.component(CWidgetStatsB.name, CWidgetStatsB);
    app.component(CWidgetStatsC.name, CWidgetStatsC);
    app.component(CWidgetStatsD.name, CWidgetStatsD);
    app.component(CWidgetStatsE.name, CWidgetStatsE);
    app.component(CWidgetStatsF.name, CWidgetStatsF);
  }
};
var Components = Object.freeze({
  __proto__: null,
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionHeader,
  CAccordionItem,
  CAccordionPlugin,
  CAlert,
  CAlertHeading,
  CAlertLink,
  CAlertPlugin,
  CAvatar,
  CAvatarPlugin,
  CBackdrop,
  CBackdropPlugin,
  CBadge,
  CBadgePlugin,
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbPlugin,
  CButton,
  CButtonGroup,
  CButtonGroupPlugin,
  CButtonPlugin,
  CButtonToolbar,
  CCLinkPlugin,
  CCallout,
  CCalloutPlugin,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardImageOverlay,
  CCardLink,
  CCardPlugin,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCarouselPlugin,
  CCloseButton,
  CCloseButtonPlugin,
  CCol,
  CCollapse,
  CCollapsePlugin,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownPlugin,
  CDropdownToggle,
  CFooter,
  CFooterPlugin,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormPlugin,
  CFormRange,
  CFormSelect,
  CFormSwitch,
  CFormText,
  CFormTextarea,
  CGridPlugin,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderPlugin,
  CHeaderText,
  CHeaderToggler,
  CImage,
  CImagePlugin,
  CInputGroup,
  CInputGroupText,
  CLink,
  CListGroup,
  CListGroupItem,
  CListGroupPlugin,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalPlugin,
  CModalTitle,
  CNav,
  CNavGroup,
  CNavGroupItems,
  CNavItem,
  CNavLink,
  CNavPlugin,
  CNavTitle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarPlugin,
  CNavbarText,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasPlugin,
  COffcanvasTitle,
  CPagination,
  CPaginationItem,
  CPaginationPlugin,
  CPlaceholder,
  CPlaceholderPlugin,
  CPopover,
  CPopoverPlugin,
  CProgress,
  CProgressBar,
  CProgressPlugin,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarPlugin,
  CSidebarToggler,
  CSpinner,
  CSpinnerPlugin,
  CTabContent,
  CTabPane,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTablePlugin,
  CTableRow,
  CTabsPlugin,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToastPlugin,
  CToaster,
  CTooltip,
  CTooltipPlugin,
  CWidgetStatsA,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsD,
  CWidgetStatsE,
  CWidgetStatsF,
  CWidgetsStatsPlugin
});
var BREAKPOINTS = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
var vCPlaceholder = {
  name: "c-placeholder",
  mounted(el, binding) {
    const value = binding.value;
    el.classList.add(value.animation ? `placeholder-${value.animation}` : "placeholder");
    BREAKPOINTS.forEach((bp) => {
      const breakpoint = value[bp];
      const infix = bp === "xs" ? "" : `-${bp}`;
      if (typeof breakpoint === "number") {
        el.classList.add(`col${infix}-${breakpoint}`);
      }
      if (typeof breakpoint === "boolean") {
        el.classList.add(`col${infix}`);
      }
    });
  }
};
var createPopoverElement = (id, header, content) => {
  const popover = document.createElement("div");
  popover.id = id;
  popover.classList.add("popover", "bs-popover-auto", "fade");
  popover.setAttribute("role", "popover");
  popover.innerHTML = `<div class="popover-arrow" data-popper-arrow></div>
     <div class="popover-header">${header}</div>
     <div class="popover-body" id="">${content}</div>`;
  return popover;
};
var addPopoverElement = (popover, el, popperOptions) => {
  document.body.appendChild(popover);
  createPopper(el, popover, popperOptions);
  setTimeout(() => {
    popover.classList.add("show");
  }, 1);
};
var removePopoverElement = (popover) => {
  popover.classList.remove("show");
  setTimeout(() => {
    popover.remove();
  }, 300);
};
var togglePopoverElement = (popover, el, popperOptions) => {
  const popperElement = document.getElementById(popover.id);
  if (popperElement && popperElement.classList.contains("show")) {
    removePopoverElement(popover);
    return;
  }
  addPopoverElement(popover, el, popperOptions);
};
var vCPopover = {
  name: "c-popover",
  uid: "",
  mounted(el, binding) {
    const value = binding.value;
    const content = typeof value === "string" ? value : value.content ?? "";
    const header = value.header ?? "";
    const trigger = value.trigger ?? "click";
    const offset2 = value.offset ?? [0, 8];
    const placement = value.placement ?? "top";
    const popperOptions = {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset2
          }
        }
      ]
    };
    const popoverUID = getUID("popover");
    binding.arg = popoverUID;
    const popover = createPopoverElement(popoverUID, header, content);
    trigger.includes("click") && el.addEventListener("click", () => {
      togglePopoverElement(popover, el, popperOptions);
    });
    if (trigger.includes("focus")) {
      el.addEventListener("focus", () => {
        addPopoverElement(popover, el, popperOptions);
      });
      el.addEventListener("blur", () => {
        removePopoverElement(popover);
      });
    }
    if (trigger.includes("hover")) {
      el.addEventListener("mouseenter", () => {
        addPopoverElement(popover, el, popperOptions);
      });
      el.addEventListener("mouseleave", () => {
        removePopoverElement(popover);
      });
    }
  },
  unmounted(_el, binding) {
    const popover = binding.arg && document.getElementById(binding.arg);
    popover && popover.remove();
  }
};
var createTooltipElement = (id, content) => {
  const tooltip = document.createElement("div");
  tooltip.id = id;
  tooltip.classList.add("tooltip", "bs-tooltip-auto", "fade");
  tooltip.setAttribute("role", "tooltip");
  tooltip.innerHTML = `<div class="tooltip-arrow" data-popper-arrow></div>
     <div class="tooltip-inner" id="">${content}</div>`;
  return tooltip;
};
var addTooltipElement = (tooltip, el, popperOptions) => {
  document.body.appendChild(tooltip);
  createPopper(el, tooltip, popperOptions);
  setTimeout(() => {
    tooltip.classList.add("show");
  }, 1);
};
var removeTooltipElement = (tooltip) => {
  tooltip.classList.remove("show");
  setTimeout(() => {
    tooltip.remove();
  }, 300);
};
var toggleTooltipElement = (tooltip, el, popperOptions) => {
  const popperElement = document.getElementById(tooltip.id);
  if (popperElement && popperElement.classList.contains("show")) {
    removeTooltipElement(tooltip);
    return;
  }
  addTooltipElement(tooltip, el, popperOptions);
};
var vCTooltip = {
  name: "c-tooltip",
  mounted(el, binding) {
    const value = binding.value;
    const content = typeof value === "string" ? value : value.content ?? "";
    const trigger = value.trigger ?? "hover";
    const offset2 = value.offset ?? [0, 6];
    const placement = value.placement ?? "top";
    const popperOptions = {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: offset2
          }
        }
      ]
    };
    const tooltipUID = getUID("tooltip");
    binding.arg = tooltipUID;
    const tooltip = createTooltipElement(tooltipUID, content);
    trigger.includes("click") && el.addEventListener("click", () => {
      toggleTooltipElement(tooltip, el, popperOptions);
    });
    if (trigger.includes("focus")) {
      el.addEventListener("focus", () => {
        addTooltipElement(tooltip, el, popperOptions);
      });
      el.addEventListener("blur", () => {
        removeTooltipElement(tooltip);
      });
    }
    if (trigger.includes("hover")) {
      el.addEventListener("mouseenter", () => {
        addTooltipElement(tooltip, el, popperOptions);
      });
      el.addEventListener("mouseleave", () => {
        removeTooltipElement(tooltip);
      });
    }
  },
  beforeUnmount(_el, binding) {
    const tooltip = binding.arg && document.getElementById(binding.arg);
    tooltip && tooltip.remove();
  }
};
var Directives = Object.freeze({
  __proto__: null,
  vcplaceholder: vCPlaceholder,
  vcpopover: vCPopover,
  vctooltip: vCTooltip
});
var CoreuiVue = {
  install: (app) => {
    for (const key in Components) {
      app.component(key, Components[key]);
    }
    for (const key in Directives) {
      app.directive(Directives[key]["name"], Directives[key]);
    }
  }
};
export {
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionHeader,
  CAccordionItem,
  CAccordionPlugin,
  CAlert,
  CAlertHeading,
  CAlertLink,
  CAlertPlugin,
  CAvatar,
  CAvatarPlugin,
  CBackdrop,
  CBackdropPlugin,
  CBadge,
  CBadgePlugin,
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbPlugin,
  CButton,
  CButtonGroup,
  CButtonGroupPlugin,
  CButtonPlugin,
  CButtonToolbar,
  CCLinkPlugin,
  CCallout,
  CCalloutPlugin,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardImageOverlay,
  CCardLink,
  CCardPlugin,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCarouselPlugin,
  CCloseButton,
  CCloseButtonPlugin,
  CCol,
  CCollapse,
  CCollapsePlugin,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownPlugin,
  CDropdownToggle,
  CFooter,
  CFooterPlugin,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormPlugin,
  CFormRange,
  CFormSelect,
  CFormSwitch,
  CFormText,
  CFormTextarea,
  CGridPlugin,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderPlugin,
  CHeaderText,
  CHeaderToggler,
  CImage,
  CImagePlugin,
  CInputGroup,
  CInputGroupText,
  CLink,
  CListGroup,
  CListGroupItem,
  CListGroupPlugin,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalPlugin,
  CModalTitle,
  CNav,
  CNavGroup,
  CNavGroupItems,
  CNavItem,
  CNavLink,
  CNavPlugin,
  CNavTitle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarPlugin,
  CNavbarText,
  CNavbarToggler,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasPlugin,
  COffcanvasTitle,
  CPagination,
  CPaginationItem,
  CPaginationPlugin,
  CPlaceholder,
  CPlaceholderPlugin,
  CPopover,
  CPopoverPlugin,
  CProgress,
  CProgressBar,
  CProgressPlugin,
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarPlugin,
  CSidebarToggler,
  CSpinner,
  CSpinnerPlugin,
  CTabContent,
  CTabPane,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTablePlugin,
  CTableRow,
  CTabsPlugin,
  CToast,
  CToastBody,
  CToastClose,
  CToastHeader,
  CToastPlugin,
  CToaster,
  CTooltip,
  CTooltipPlugin,
  CWidgetStatsA,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsD,
  CWidgetStatsE,
  CWidgetStatsF,
  CWidgetsStatsPlugin,
  CoreuiVue as default,
  usePopper,
  vCPlaceholder as vcplaceholder,
  vCPopover as vcpopover,
  vCTooltip as vctooltip
};
/*! Bundled license information:

@coreui/vue/dist/index.es.js:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=@coreui_vue.js.map
