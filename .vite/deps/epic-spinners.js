import {
  Fragment,
  createBaseVNode,
  createElementBlock,
  normalizeClass,
  normalizeStyle,
  openBlock,
  renderList
} from "./chunk-L4JPHKU3.js";
import "./chunk-HM4MQYWN.js";

// node_modules/epic-spinners/dist/es/components/HollowDotsSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/HollowDotsSpinner.css";

// node_modules/epic-spinners/dist/es/plugin-vue_export-helper.js
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

// node_modules/epic-spinners/dist/es/components/HollowDotsSpinner.js
var _sfc_main = {
  name: "HollowDotsSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1e3
    },
    dotSize: {
      type: Number,
      default: 15
    },
    dotsNum: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    horizontalMargin() {
      return this.dotSize / 2;
    },
    spinnerStyle() {
      return {
        height: `${this.dotSize}px`,
        width: `${(this.dotSize + this.horizontalMargin * 2) * this.dotsNum}px`
      };
    },
    dotStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        width: `${this.dotSize}px`,
        height: `${this.dotSize}px`,
        margin: `0 ${this.horizontalMargin}px`,
        borderWidth: `${this.dotSize / 5}px`,
        borderColor: this.color
      };
    },
    dotsStyles() {
      const dotsStyles = [];
      const delayModifier = 0.3;
      const basicDelay = this.animationDuration;
      for (let i = 1; i <= this.dotsNum; i++) {
        dotsStyles.push({
          animationDelay: `${basicDelay * i * delayModifier}ms`,
          ...this.dotStyle
        });
      }
      return dotsStyles;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "hollow-dots-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.dotsStyles, (ds, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "dot",
        style: normalizeStyle(ds)
      }, null, 4);
    }), 128))
  ], 4);
}
var HollowDotsSpinner = _export_sfc(_sfc_main, [["render", _sfc_render]]);

// node_modules/epic-spinners/dist/es/components/PixelSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/PixelSpinner.css";

// node_modules/epic-spinners/dist/es/services/utils.js
var utils = {
  appendKeyframes: (name, frames) => {
    if (!(window == null ? void 0 : window.document)) {
      return;
    }
    const sheet = document.createElement("style");
    sheet.setAttribute("id", name);
    sheet.innerHTML = `@keyframes ${name} {${frames}}`;
    document.body.appendChild(sheet);
  },
  removeKeyframes: (name) => {
    var _a;
    if (!(window == null ? void 0 : window.document)) {
      return;
    }
    const sheet = document.getElementById(name);
    if (!sheet) {
      return;
    }
    (_a = sheet.parentNode) == null ? void 0 : _a.removeChild(sheet);
  }
};

// node_modules/epic-spinners/dist/es/components/PixelSpinner.js
var _sfc_main2 = {
  name: "PixelSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      animationName: `pixel-spinner-animation-${Date.now()}`
    };
  },
  computed: {
    pixelSize() {
      return this.size / 7;
    },
    spinnerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    spinnerInnerStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        animationName: this.animationName,
        width: `${this.pixelSize}px`,
        height: `${this.pixelSize}px`,
        backgroundColor: this.color,
        color: this.color,
        boxShadow: `
          ${this.pixelSize * 1.5}px ${this.pixelSize * 1.5}px 0 0,
          ${this.pixelSize * -1.5}px ${this.pixelSize * -1.5}px 0 0,
          ${this.pixelSize * 1.5}px ${this.pixelSize * -1.5}px 0 0,
          ${this.pixelSize * -1.5}px ${this.pixelSize * 1.5}px 0 0,
          0 ${this.pixelSize * 1.5}px 0 0,
          ${this.pixelSize * 1.5}px 0 0 0,
          ${this.pixelSize * -1.5}px 0 0 0,
          0 ${this.pixelSize * -1.5}px 0 0
        `
      };
    }
  },
  watch: {
    size: {
      handler: "updateAnimation",
      immediate: true
    }
  },
  mounted() {
    this.updateAnimation();
  },
  beforeUnmount() {
    utils.removeKeyframes(this.animationName);
  },
  methods: {
    updateAnimation() {
      utils.removeKeyframes(this.animationName);
      utils.appendKeyframes(this.animationName, this.generateKeyframes());
    },
    generateKeyframes() {
      return `
        50% {
          box-shadow:  ${this.pixelSize * 2}px ${this.pixelSize * 2}px 0 0,
                       ${this.pixelSize * -2}px ${this.pixelSize * -2}px 0 0,
                       ${this.pixelSize * 2}px ${this.pixelSize * -2}px 0 0,
                       ${this.pixelSize * -2}px ${this.pixelSize * 2}px 0 0,
                       0 ${this.pixelSize}px 0 0,
                       ${this.pixelSize}px 0 0 0,
                       ${this.pixelSize * -1}px 0 0 0,
                       0 ${this.pixelSize * -1}px 0 0;
        }
        75% {
          box-shadow:  ${this.pixelSize * 2}px ${this.pixelSize * 2}px 0 0,
                       ${this.pixelSize * -2}px ${this.pixelSize * -2}px 0 0,
                       ${this.pixelSize * 2}px ${this.pixelSize * -2}px 0 0,
                       ${this.pixelSize * -2}px ${this.pixelSize * 2}px 0 0,
                       0 ${this.pixelSize}px 0 0,
                       ${this.pixelSize}px 0 0 0,
                       ${this.pixelSize * -1}px 0 0 0,
                       0 ${this.pixelSize * -1}px 0 0;
        }
        100% {
          transform: rotate(360deg);
        }`;
    }
  }
};
function _sfc_render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "pixel-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "pixel-spinner-inner",
      style: normalizeStyle($options.spinnerInnerStyle)
    }, null, 4)
  ], 4);
}
var PixelSpinner = _export_sfc(_sfc_main2, [["render", _sfc_render2]]);

// node_modules/epic-spinners/dist/es/components/FlowerSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/FlowerSpinner.css";
var _sfc_main3 = {
  name: "FlowerSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 2500
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      smallDotName: `flower-spinner-small-dot-${Date.now()}`,
      bigDotName: `flower-spinner-big-dot-${Date.now()}`
    };
  },
  computed: {
    dotSize() {
      return this.size / 7;
    },
    spinnerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    dotsContainerStyle() {
      return {
        width: `${this.dotSize}px`,
        height: `${this.dotSize}px`
      };
    },
    smallerDotStyle() {
      return {
        background: this.color,
        animationDuration: `${this.animationDuration}ms`,
        animationName: this.smallDotName
      };
    },
    biggerDotStyle() {
      return {
        background: this.color,
        animationDuration: `${this.animationDuration}ms`,
        animationName: this.bigDotName
      };
    }
  },
  watch: {
    size: {
      handler: "updateAnimation",
      immediate: true
    },
    color: {
      handler: "updateAnimation",
      immediate: true
    }
  },
  beforeUnmount() {
    utils.removeKeyframes(this.smallDotName);
    utils.removeKeyframes(this.bigDotName);
  },
  methods: {
    updateAnimation() {
      utils.removeKeyframes(this.smallDotName);
      utils.appendKeyframes(this.smallDotName, this.generateSmallDotKeyframes());
      utils.removeKeyframes(this.bigDotName);
      utils.appendKeyframes(this.bigDotName, this.generateBigDotKeyframes());
    },
    generateSmallDotKeyframes() {
      return `
        0%, 100% {
          box-shadow: 0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color};
        }
        25%, 75% {
          box-shadow: ${this.dotSize * 1.4}px 0 0 ${this.color},
                      -${this.dotSize * 1.4}px 0 0 ${this.color},
                      0 ${this.dotSize * 1.4}px 0 ${this.color},
                      0 -${this.dotSize * 1.4}px 0 ${this.color},
                      ${this.dotSize}px -${this.dotSize}px 0 ${this.color},
                      ${this.dotSize}px ${this.dotSize}px 0 ${this.color},
                      -${this.dotSize}px -${this.dotSize}px 0 ${this.color},
                      -${this.dotSize}px ${this.dotSize}px 0 ${this.color};
        }
        100% {
          box-shadow: 0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color};
        }`;
    },
    generateBigDotKeyframes() {
      return `
        0%, 100% {
          box-shadow: 0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color};
        }
        50% {
          transform: rotate(180deg);
        }
        25%, 75% {
          box-shadow: ${this.dotSize * 2.6}px 0 0 ${this.color},
                      -${this.dotSize * 2.6}px 0 0 ${this.color},
                      0 ${this.dotSize * 2.6}px 0 ${this.color},
                      0 -${this.dotSize * 2.6}px 0 ${this.color},
                      ${this.dotSize * 1.9}px -${this.dotSize * 1.9}px 0 ${this.color},
                      ${this.dotSize * 1.9}px ${this.dotSize * 1.9}px 0 ${this.color},
                      -${this.dotSize * 1.9}px -${this.dotSize * 1.9}px 0 ${this.color},
                      -${this.dotSize * 1.9}px ${this.dotSize * 1.9}px 0 ${this.color};
        }
        100% {
          transform: rotate(360deg);
          box-shadow: 0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color},
                      0 0 0 ${this.color};
        }`;
    }
  }
};
function _sfc_render3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "flower-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "dots-container",
      style: normalizeStyle($options.dotsContainerStyle)
    }, [
      createBaseVNode("div", {
        class: "big-dot",
        style: normalizeStyle($options.biggerDotStyle)
      }, [
        createBaseVNode("div", {
          class: "small-dot",
          style: normalizeStyle($options.smallerDotStyle)
        }, null, 4)
      ], 4)
    ], 4)
  ], 4);
}
var FlowerSpinner = _export_sfc(_sfc_main3, [["render", _sfc_render3]]);

// node_modules/epic-spinners/dist/es/components/IntersectingCirclesSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/IntersectingCirclesSpinner.css";
var _sfc_main4 = {
  name: "IntersectingCirclesSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1200
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    circleSize() {
      return this.size / 2;
    },
    spinnerStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`
      };
    },
    spinnerBlockStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        width: `${this.circleSize}px`,
        height: `${this.circleSize}px`
      };
    },
    circleStyle() {
      return {
        borderColor: this.color
      };
    },
    circleStyles() {
      const circlesPositions = [
        { top: 0, left: 0 },
        { left: `${this.circleSize * -0.36}px`, top: `${this.circleSize * 0.2}px` },
        { left: `${this.circleSize * -0.36}px`, top: `${this.circleSize * -0.2}px` },
        { left: 0, top: `${this.circleSize * -0.36}px` },
        { left: `${this.circleSize * 0.36}px`, top: `${this.circleSize * -0.2}px` },
        { left: `${this.circleSize * 0.36}px`, top: `${this.circleSize * 0.2}px` },
        { left: 0, top: `${this.circleSize * 0.36}px` }
      ];
      return circlesPositions.map((cp) => Object.assign(cp, this.circleStyle));
    }
  }
};
function _sfc_render4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "intersecting-circles-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "spinnerBlock",
      style: normalizeStyle($options.spinnerBlockStyle)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($options.circleStyles, (cs, index) => {
        return openBlock(), createElementBlock("span", {
          key: index,
          class: "circle",
          style: normalizeStyle(cs)
        }, null, 4);
      }), 128))
    ], 4)
  ], 4);
}
var IntersectingCirclesSpinner = _export_sfc(_sfc_main4, [["render", _sfc_render4]]);

// node_modules/epic-spinners/dist/es/components/OrbitSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/OrbitSpinner.css";
var _sfc_main5 = {
  name: "OrbitSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1e3
    },
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    orbitStyle() {
      return {
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    }
  }
};
function _sfc_render5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "orbit-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "orbit one",
      style: normalizeStyle($options.orbitStyle)
    }, null, 4),
    createBaseVNode("div", {
      class: "orbit two",
      style: normalizeStyle($options.orbitStyle)
    }, null, 4),
    createBaseVNode("div", {
      class: "orbit three",
      style: normalizeStyle($options.orbitStyle)
    }, null, 4)
  ], 4);
}
var OrbitSpinner = _export_sfc(_sfc_main5, [["render", _sfc_render5]]);

// node_modules/epic-spinners/dist/es/components/FingerprintSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/FingerprintSpinner.css";
var _sfc_main6 = {
  name: "FingerprintSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      ringsNum: 9,
      containerPadding: 2
    };
  },
  computed: {
    outerRingSize() {
      return this.size - this.containerPadding * 2;
    },
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        padding: `${this.containerPadding}px`
      };
    },
    ringStyle() {
      return {
        borderTopColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    ringsStyles() {
      const ringsStyles = [];
      const ringBase = this.outerRingSize / this.ringsNum;
      const ringInc = ringBase;
      for (let i = 1; i <= this.ringsNum; i++) {
        const style = Object.assign(
          {
            animationDelay: `${i * 50}ms`,
            height: `${ringBase + (i - 1) * ringInc}px`,
            width: `${ringBase + (i - 1) * ringInc}px`
          },
          this.ringStyle
        );
        ringsStyles.push(style);
      }
      return ringsStyles;
    }
  }
};
function _sfc_render6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "fingerprint-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.ringsStyles, (rs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "spinner-ring",
        style: normalizeStyle(rs)
      }, null, 4);
    }), 128))
  ], 4);
}
var FingerprintSpinner = _export_sfc(_sfc_main6, [["render", _sfc_render6]]);

// node_modules/epic-spinners/dist/es/components/TrinityRingsSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/TrinityRingsSpinner.css";
var _sfc_main7 = {
  name: "TrinityRingsSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1500
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      containerPadding: 3
    };
  },
  computed: {
    outerRingSize() {
      return this.size - this.containerPadding * 2;
    },
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        padding: `${this.containerPadding}px`
      };
    },
    ring1Style() {
      return {
        height: `${this.outerRingSize}px`,
        width: `${this.outerRingSize}px`,
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    ring2Style() {
      return {
        height: `${this.outerRingSize * 0.65}px`,
        width: `${this.outerRingSize * 0.65}px`,
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    ring3Style() {
      return {
        height: `${this.outerRingSize * 0.1}px`,
        width: `${this.outerRingSize * 0.1}px`,
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    }
  }
};
function _sfc_render7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "trinity-rings-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "circle circle1",
      style: normalizeStyle($options.ring1Style)
    }, null, 4),
    createBaseVNode("div", {
      class: "circle circle2",
      style: normalizeStyle($options.ring2Style)
    }, null, 4),
    createBaseVNode("div", {
      class: "circle circle3",
      style: normalizeStyle($options.ring3Style)
    }, null, 4)
  ], 4);
}
var TrinityRingsSpinner = _export_sfc(_sfc_main7, [["render", _sfc_render7]]);

// node_modules/epic-spinners/dist/es/components/FulfillingSquareSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/FulfillingSquareSpinner.css";
var _sfc_main8 = {
  name: "FulfillingSquareSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 4e3
    },
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    spinnerInnerStyle() {
      return {
        backgroundColor: this.color,
        animationDuration: `${this.animationDuration}ms`
      };
    }
  }
};
function _sfc_render8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "fulfilling-square-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "spinner-inner",
      style: normalizeStyle($options.spinnerInnerStyle)
    }, null, 4)
  ], 4);
}
var FulfillingSquareSpinner = _export_sfc(_sfc_main8, [["render", _sfc_render8]]);

// node_modules/epic-spinners/dist/es/components/CirclesToRhombusesSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/CirclesToRhombusesSpinner.css";
var _sfc_main9 = {
  name: "CirclesToRhombusesSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1200
    },
    circleSize: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: "#fff"
    },
    circlesNum: {
      type: Number,
      default: 3
    }
  },
  computed: {
    circleMarginLeft() {
      return this.circleSize * 1.125;
    },
    spinnerStyle() {
      return {
        height: `${this.circleSize}px`,
        width: `${(this.circleSize + this.circleMarginLeft) * this.circlesNum}px`
      };
    },
    circleStyle() {
      return {
        borderColor: this.color,
        animationDuration: `${this.animationDuration}ms`,
        height: `${this.circleSize}px`,
        width: `${this.circleSize}px`,
        marginLeft: `${this.circleMarginLeft}px`
      };
    },
    circlesStyles() {
      const circlesStyles = [];
      const delay = 150;
      for (let i = 1; i <= this.circlesNum; i++) {
        const style = Object.assign(
          {
            animationDelay: `${i * delay}ms`
          },
          this.circleStyle
        );
        if (i === 1) {
          style.marginLeft = 0;
        }
        circlesStyles.push(style);
      }
      return circlesStyles;
    }
  }
};
function _sfc_render9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "circles-to-rhombuses-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.circlesStyles, (cs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "circle",
        style: normalizeStyle(cs)
      }, null, 4);
    }), 128))
  ], 4);
}
var CirclesToRhombusesSpinner = _export_sfc(_sfc_main9, [["render", _sfc_render9]]);

// node_modules/epic-spinners/dist/es/components/SemipolarSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/SemipolarSpinner.css";
var _sfc_main10 = {
  name: "SemipolarSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 2e3
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      ringsNum: 5
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    ringStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        borderTopColor: this.color,
        borderLeftColor: this.color
      };
    },
    ringsStyles() {
      const ringsStyles = [];
      const delayModifier = 0.1;
      const ringWidth = this.size * 0.05;
      const positionIncrement = ringWidth * 2;
      const sizeDecrement = this.size * 0.2;
      for (let i = 0; i < this.ringsNum; i++) {
        const computedSize = `${this.size - sizeDecrement * i}px`;
        const computedPosition = `${positionIncrement * i}px`;
        const style = Object.assign(
          {
            animationDelay: `${this.animationDuration * delayModifier * (this.ringsNum - i - 1)}ms`,
            height: computedSize,
            width: computedSize,
            left: computedPosition,
            top: computedPosition,
            borderWidth: `${ringWidth}px`
          },
          this.ringStyle
        );
        ringsStyles.push(style);
      }
      return ringsStyles;
    }
  }
};
function _sfc_render10(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "semipolar-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.ringsStyles, (rs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "ring",
        style: normalizeStyle(rs)
      }, null, 4);
    }), 128))
  ], 4);
}
var SemipolarSpinner = _export_sfc(_sfc_main10, [["render", _sfc_render10]]);

// node_modules/epic-spinners/dist/es/components/BreedingRhombusSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/BreedingRhombusSpinner.css";
var _sfc_main11 = {
  name: "BreedingRhombusSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 2e3
    },
    size: {
      type: Number,
      default: 150
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      animationBaseName: "breeding-rhombus-spinner-animation-child",
      rhombusesNum: 8
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    rhombusStyle() {
      return {
        height: `${this.size / 7.5}px`,
        width: `${this.size / 7.5}px`,
        animationDuration: `${this.animationDuration}ms`,
        top: `${this.size / 2.3077}px`,
        left: `${this.size / 2.3077}px`,
        backgroundColor: this.color
      };
    },
    rhombusesStyles() {
      const rhombusesStyles = [];
      const delayModifier = this.animationDuration * 0.05;
      for (let i = 1; i <= this.rhombusesNum; i++) {
        rhombusesStyles.push(
          Object.assign(
            {
              animationDelay: `${delayModifier * (i + 1)}ms`
            },
            this.rhombusStyle
          )
        );
      }
      return rhombusesStyles;
    },
    bigRhombusStyle() {
      return {
        height: `${this.size / 3}px`,
        width: `${this.size / 3}px`,
        animationDuration: `${this.animationDuration}`,
        top: `${this.size / 3}px`,
        left: `${this.size / 3}px`,
        backgroundColor: this.color
      };
    }
  }
};
function _sfc_render11(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "breeding-rhombus-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.rhombusesStyles, (rs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: normalizeClass(["rhombus", `child-${index + 1}`]),
        style: normalizeStyle(rs)
      }, null, 6);
    }), 128)),
    createBaseVNode("div", {
      class: "rhombus big",
      style: normalizeStyle($options.bigRhombusStyle)
    }, null, 4)
  ], 4);
}
var BreedingRhombusSpinner = _export_sfc(_sfc_main11, [["render", _sfc_render11]]);

// node_modules/epic-spinners/dist/es/components/SwappingSquaresSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/SwappingSquaresSpinner.css";
var _sfc_main12 = {
  name: "SwappingSquaresSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1e3
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      animationBaseName: "swapping-squares-animation-child",
      squaresNum: 4
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    squareStyle() {
      return {
        height: `${this.size * 0.25 / 1.3}px`,
        width: `${this.size * 0.25 / 1.3}px`,
        animationDuration: `${this.animationDuration}ms`,
        borderWidth: `${this.size * 0.04 / 1.3}px`,
        borderColor: this.color
      };
    },
    squaresStyles() {
      const squaresStyles = [];
      const delay = this.animationDuration * 0.5;
      for (let i = 1; i <= this.squaresNum; i++) {
        squaresStyles.push(
          Object.assign(
            {
              animationDelay: `${i % 2 === 0 ? delay : 0}ms`
            },
            this.squareStyle
          )
        );
      }
      return squaresStyles;
    }
  }
};
function _sfc_render12(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "swapping-squares-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.squaresStyles, (ss, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: normalizeClass(["square", `square-${index + 1}`]),
        style: normalizeStyle(ss)
      }, null, 6);
    }), 128))
  ], 4);
}
var SwappingSquaresSpinner = _export_sfc(_sfc_main12, [["render", _sfc_render12]]);

// node_modules/epic-spinners/dist/es/components/ScalingSquaresSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/ScalingSquaresSpinner.css";
var _sfc_main13 = {
  name: "ScalingSquaresSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1250
    },
    size: {
      type: Number,
      default: 65
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      squaresNum: 4
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    squareStyle() {
      return {
        height: `${this.size * 0.25 / 1.3}px`,
        width: `${this.size * 0.25 / 1.3}px`,
        animationDuration: `${this.animationDuration}ms`,
        borderWidth: `${this.size * 0.04 / 1.3}px`,
        borderColor: this.color
      };
    },
    squaresStyles() {
      const squaresStyles = [];
      for (let i = 1; i <= this.squaresNum; i++) {
        squaresStyles.push(Object.assign({}, this.squareStyle));
      }
      return squaresStyles;
    }
  }
};
function _sfc_render13(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "scaling-squares-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.squaresStyles, (ss, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: normalizeClass(["square", `square-${index + 1}`]),
        style: normalizeStyle(ss)
      }, null, 6);
    }), 128))
  ], 4);
}
var ScalingSquaresSpinner = _export_sfc(_sfc_main13, [["render", _sfc_render13]]);

// node_modules/epic-spinners/dist/es/components/FulfillingBouncingCircleSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/FulfillingBouncingCircleSpinner.css";
var _sfc_main14 = {
  name: "FulfillingBouncingCircleSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 4e3
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    orbitStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        borderColor: this.color,
        borderWidth: `${this.size * 0.03}px`,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    circleStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        borderColor: this.color,
        color: this.color,
        borderWidth: `${this.size * 0.1}px`,
        animationDuration: `${this.animationDuration}ms`
      };
    }
  }
};
function _sfc_render14(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "fulfilling-bouncing-circle-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "circle",
      style: normalizeStyle($options.circleStyle)
    }, null, 4),
    createBaseVNode("div", {
      class: "orbit",
      style: normalizeStyle($options.orbitStyle)
    }, null, 4)
  ], 4);
}
var FulfillingBouncingCircleSpinner = _export_sfc(_sfc_main14, [["render", _sfc_render14]]);

// node_modules/epic-spinners/dist/es/components/RadarSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/RadarSpinner.css";
var _sfc_main15 = {
  name: "RadarSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 2e3
    },
    size: {
      type: Number,
      default: 110
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      circlesNum: 4
    };
  },
  computed: {
    borderWidth() {
      return this.size * 5 / 110;
    },
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    circleStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`
      };
    },
    circleInnerContainerStyle() {
      return {
        borderWidth: `${this.borderWidth}px`
      };
    },
    circleInnerStyle() {
      return {
        borderLeftColor: this.color,
        borderRightColor: this.color,
        borderWidth: `${this.borderWidth}px`
      };
    },
    circlesStyles() {
      const circlesStyles = [];
      const delay = this.animationDuration * 0.15;
      for (let i = 0; i < this.circlesNum; i++) {
        circlesStyles.push(
          Object.assign(
            {
              padding: `${this.borderWidth * 2 * i}px`,
              animationDelay: `${i === this.circlesNum - 1 ? 0 : delay}ms`
            },
            this.circleStyle
          )
        );
      }
      return circlesStyles;
    }
  }
};
function _sfc_render15(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "radar-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.circlesStyles, (cs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "circle",
        style: normalizeStyle(cs)
      }, [
        createBaseVNode("div", {
          class: "circle-inner-container",
          style: normalizeStyle($options.circleInnerContainerStyle)
        }, [
          createBaseVNode("div", {
            class: "circle-inner",
            style: normalizeStyle($options.circleInnerStyle)
          }, null, 4)
        ], 4)
      ], 4);
    }), 128))
  ], 4);
}
var RadarSpinner = _export_sfc(_sfc_main15, [["render", _sfc_render15]]);

// node_modules/epic-spinners/dist/es/components/SelfBuildingSquareSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/SelfBuildingSquareSpinner.css";
var _sfc_main16 = {
  name: "SelfBuildingSquareSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 6e3
    },
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      squaresNum: 9
    };
  },
  computed: {
    squareSize() {
      return this.size / 4;
    },
    initialTopPosition() {
      return -this.squareSize * 2 / 3;
    },
    spinnerStyle() {
      return {
        top: `${-this.initialTopPosition}px`,
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    squareStyle() {
      return {
        height: `${this.squareSize}px`,
        width: `${this.squareSize}px`,
        top: `${this.initialTopPosition}px`,
        marginRight: `${this.squareSize / 3}px`,
        marginTop: `${this.squareSize / 3}px`,
        animationDuration: `${this.animationDuration}ms`,
        background: this.color
      };
    },
    squaresStyles() {
      const squaresStyles = [];
      const delaysMultipliers = [6, 7, 8, 3, 4, 5, 0, 1, 2];
      const delayModifier = this.animationDuration * 0.05;
      for (let i = 0; i < this.squaresNum; i++) {
        squaresStyles.push(
          Object.assign(
            {
              animationDelay: `${delayModifier * delaysMultipliers[i]}ms`
            },
            this.squareStyle
          )
        );
      }
      return squaresStyles;
    }
  }
};
function _sfc_render16(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "self-building-square-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.squaresStyles, (ss, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: normalizeClass(["square", { clear: index && index % 3 === 0 }]),
        style: normalizeStyle(ss)
      }, null, 6);
    }), 128))
  ], 4);
}
var SelfBuildingSquareSpinner = _export_sfc(_sfc_main16, [["render", _sfc_render16]]);

// node_modules/epic-spinners/dist/es/components/SpringSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/SpringSpinner.css";
var _sfc_main17 = {
  name: "SpringSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 3e3
    },
    size: {
      type: Number,
      default: 70
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      animationName: `spring-spinner-animation-${Date.now()}`
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    spinnerPartStyle() {
      return {
        height: `${this.size / 2}px`,
        width: `${this.size}px`
      };
    },
    rotatorStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
        borderRightColor: this.color,
        borderTopColor: this.color,
        borderWidth: `${this.size / 7}px`,
        animationDuration: `${this.animationDuration}ms`,
        animationName: this.animationName
      };
    }
  },
  watch: {
    size: {
      handler: "updateAnimation",
      immediate: true
    },
    color: {
      handler: "updateAnimation",
      immediate: true
    }
  },
  mounted() {
    this.updateAnimation();
  },
  beforeUnmount() {
    utils.removeKeyframes(this.animationName);
  },
  methods: {
    updateAnimation() {
      utils.removeKeyframes(this.animationName);
      utils.appendKeyframes(this.animationName, this.generateKeyframes());
    },
    generateKeyframes() {
      return `
        0% {
          border-width: ${this.size / 7}px;
        }
        25% {
          border-width: ${this.size / 23.33}px;
        }
        50% {
          transform: rotate(115deg);
          border-width: ${this.size / 7}px;
        }
        75% {
          border-width: ${this.size / 23.33}px;
          }
        100% {
          border-width: ${this.size / 7}px;
        }`;
    }
  }
};
function _sfc_render17(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "spring-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "spring-spinner-part top",
      style: normalizeStyle($options.spinnerPartStyle)
    }, [
      createBaseVNode("div", {
        class: "spring-spinner-rotator",
        style: normalizeStyle($options.rotatorStyle)
      }, null, 4)
    ], 4),
    createBaseVNode("div", {
      class: "spring-spinner-part bottom",
      style: normalizeStyle($options.spinnerPartStyle)
    }, [
      createBaseVNode("div", {
        class: "spring-spinner-rotator",
        style: normalizeStyle($options.rotatorStyle)
      }, null, 4)
    ], 4)
  ], 4);
}
var SpringSpinner = _export_sfc(_sfc_main17, [["render", _sfc_render17]]);

// node_modules/epic-spinners/dist/es/components/LoopingRhombusesSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/LoopingRhombusesSpinner.css";
var _sfc_main18 = {
  name: "LoopingRhombusesSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 2500
    },
    rhombusSize: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      rhombusesNum: 3
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.rhombusSize}px`,
        width: `${this.rhombusSize * 4}px`
      };
    },
    rhombusStyle() {
      return {
        height: `${this.rhombusSize}px`,
        width: `${this.rhombusSize}px`,
        backgroundColor: this.color,
        animationDuration: `${this.animationDuration}ms`,
        left: `${this.rhombusSize * 4}px`
      };
    },
    rhombusesStyles() {
      const rhombusesStyles = [];
      const delay = -this.animationDuration / 1.5;
      for (let i = 1; i <= this.rhombusesNum; i++) {
        const style = Object.assign(
          {
            animationDelay: `${i * delay}ms`
          },
          this.rhombusStyle
        );
        rhombusesStyles.push(style);
      }
      return rhombusesStyles;
    }
  }
};
function _sfc_render18(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "looping-rhombuses-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.rhombusesStyles, (rs, index) => {
      return openBlock(), createElementBlock("div", {
        key: index,
        class: "rhombus",
        style: normalizeStyle(rs)
      }, null, 4);
    }), 128))
  ], 4);
}
var LoopingRhombusesSpinner = _export_sfc(_sfc_main18, [["render", _sfc_render18]]);

// node_modules/epic-spinners/dist/es/components/HalfCircleSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/HalfCircleSpinner.css";
var _sfc_main19 = {
  name: "HalfCircleSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1e3
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    circleStyle() {
      return {
        borderWidth: `${this.size / 10}px`,
        animationDuration: `${this.animationDuration}ms`
      };
    },
    circle1Style() {
      return Object.assign(
        {
          borderTopColor: this.color
        },
        this.circleStyle
      );
    },
    circle2Style() {
      return Object.assign(
        {
          borderBottomColor: this.color
        },
        this.circleStyle
      );
    }
  }
};
function _sfc_render19(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "half-circle-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", {
      class: "circle circle-1",
      style: normalizeStyle($options.circle1Style)
    }, null, 4),
    createBaseVNode("div", {
      class: "circle circle-2",
      style: normalizeStyle($options.circle2Style)
    }, null, 4)
  ], 4);
}
var HalfCircleSpinner = _export_sfc(_sfc_main19, [["render", _sfc_render19]]);

// node_modules/epic-spinners/dist/es/components/AtomSpinner.js
import "/home/mike/Documents/dev/boulevard/projects/DataCollector/web-prime/node_modules/epic-spinners/dist/style/AtomSpinner.css";
var _sfc_main20 = {
  name: "AtomSpinner",
  props: {
    animationDuration: {
      type: Number,
      default: 1e3
    },
    size: {
      type: Number,
      default: 60
    },
    color: {
      type: String,
      default: "#fff"
    }
  },
  computed: {
    spinnerStyle() {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`
      };
    },
    circleStyle() {
      return {
        color: this.color,
        fontSize: `${this.size * 0.24}px`
      };
    },
    lineStyle() {
      return {
        animationDuration: `${this.animationDuration}ms`,
        borderLeftWidth: `${this.size / 25}px`,
        borderTopWidth: `${this.size / 25}px`,
        borderLeftColor: this.color
      };
    }
  }
};
var _hoisted_1 = { class: "spinner-inner" };
function _sfc_render20(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "atom-spinner",
    style: normalizeStyle($options.spinnerStyle)
  }, [
    createBaseVNode("div", _hoisted_1, [
      createBaseVNode("div", {
        class: "spinner-line",
        style: normalizeStyle($options.lineStyle)
      }, null, 4),
      createBaseVNode("div", {
        class: "spinner-line",
        style: normalizeStyle($options.lineStyle)
      }, null, 4),
      createBaseVNode("div", {
        class: "spinner-line",
        style: normalizeStyle($options.lineStyle)
      }, null, 4),
      createBaseVNode("div", {
        class: "spinner-circle",
        style: normalizeStyle($options.circleStyle)
      }, "●", 4)
    ])
  ], 4);
}
var AtomSpinner = _export_sfc(_sfc_main20, [["render", _sfc_render20]]);
export {
  AtomSpinner,
  BreedingRhombusSpinner,
  CirclesToRhombusesSpinner,
  FingerprintSpinner,
  FlowerSpinner,
  FulfillingBouncingCircleSpinner,
  FulfillingSquareSpinner,
  HalfCircleSpinner,
  HollowDotsSpinner,
  IntersectingCirclesSpinner,
  LoopingRhombusesSpinner,
  OrbitSpinner,
  PixelSpinner,
  RadarSpinner,
  ScalingSquaresSpinner,
  SelfBuildingSquareSpinner,
  SemipolarSpinner,
  SpringSpinner,
  SwappingSquaresSpinner,
  TrinityRingsSpinner
};
//# sourceMappingURL=epic-spinners.js.map
