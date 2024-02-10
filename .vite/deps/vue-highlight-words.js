import {
  h
} from "./chunk-L4JPHKU3.js";
import {
  __commonJS,
  __toESM
} from "./chunk-HM4MQYWN.js";

// node_modules/highlight-words-core/dist/index.js
var require_dist = __commonJS({
  "node_modules/highlight-words-core/dist/index.js"(exports, module) {
    module.exports = /******/
    function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module2 = installedModules[moduleId] = {
          /******/
          exports: {},
          /******/
          id: moduleId,
          /******/
          loaded: false
          /******/
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.loaded = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    }([
      /* 0 */
      /***/
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(1);
      },
      /* 1 */
      /***/
      function(module2, exports2, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        var _utils = __webpack_require__(2);
        Object.defineProperty(exports2, "combineChunks", {
          enumerable: true,
          get: function get() {
            return _utils.combineChunks;
          }
        });
        Object.defineProperty(exports2, "fillInChunks", {
          enumerable: true,
          get: function get() {
            return _utils.fillInChunks;
          }
        });
        Object.defineProperty(exports2, "findAll", {
          enumerable: true,
          get: function get() {
            return _utils.findAll;
          }
        });
        Object.defineProperty(exports2, "findChunks", {
          enumerable: true,
          get: function get() {
            return _utils.findChunks;
          }
        });
      },
      /* 2 */
      /***/
      function(module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        var findAll2 = exports2.findAll = function findAll3(_ref) {
          var autoEscape = _ref.autoEscape, _ref$caseSensitive = _ref.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref.sanitize, searchWords = _ref.searchWords, textToHighlight = _ref.textToHighlight;
          return fillInChunks({
            chunksToHighlight: combineChunks({
              chunks: findChunks({
                autoEscape,
                caseSensitive,
                sanitize,
                searchWords,
                textToHighlight
              })
            }),
            totalLength: textToHighlight ? textToHighlight.length : 0
          });
        };
        var combineChunks = exports2.combineChunks = function combineChunks2(_ref2) {
          var chunks = _ref2.chunks;
          chunks = chunks.sort(function(first, second) {
            return first.start - second.start;
          }).reduce(function(processedChunks, nextChunk) {
            if (processedChunks.length === 0) {
              return [nextChunk];
            } else {
              var prevChunk = processedChunks.pop();
              if (nextChunk.start <= prevChunk.end) {
                var endIndex = Math.max(prevChunk.end, nextChunk.end);
                processedChunks.push({ highlight: false, start: prevChunk.start, end: endIndex });
              } else {
                processedChunks.push(prevChunk, nextChunk);
              }
              return processedChunks;
            }
          }, []);
          return chunks;
        };
        var defaultFindChunks = function defaultFindChunks2(_ref3) {
          var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? defaultSanitize : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
          textToHighlight = sanitize(textToHighlight);
          return searchWords.filter(function(searchWord) {
            return searchWord;
          }).reduce(function(chunks, searchWord) {
            searchWord = sanitize(searchWord);
            if (autoEscape) {
              searchWord = escapeRegExpFn(searchWord);
            }
            var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
            var match = void 0;
            while (match = regex.exec(textToHighlight)) {
              var _start = match.index;
              var _end = regex.lastIndex;
              if (_end > _start) {
                chunks.push({ highlight: false, start: _start, end: _end });
              }
              if (match.index === regex.lastIndex) {
                regex.lastIndex++;
              }
            }
            return chunks;
          }, []);
        };
        exports2.findChunks = defaultFindChunks;
        var fillInChunks = exports2.fillInChunks = function fillInChunks2(_ref4) {
          var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
          var allChunks = [];
          var append = function append2(start, end, highlight) {
            if (end - start > 0) {
              allChunks.push({
                start,
                end,
                highlight
              });
            }
          };
          if (chunksToHighlight.length === 0) {
            append(0, totalLength, false);
          } else {
            var lastIndex = 0;
            chunksToHighlight.forEach(function(chunk) {
              append(lastIndex, chunk.start, false);
              append(chunk.start, chunk.end, true);
              lastIndex = chunk.end;
            });
            append(lastIndex, totalLength, false);
          }
          return allChunks;
        };
        function defaultSanitize(string) {
          return string;
        }
        function escapeRegExpFn(string) {
          return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
      }
      /******/
    ]);
  }
});

// node_modules/vue-highlight-words/dist/vue-highlight-words.esm.js
var import_highlight_words_core = __toESM(require_dist());
var VueHighlightWordsImpl = (props, context) => {
  const chunks = (0, import_highlight_words_core.findAll)({
    autoEscape: props.autoEscape,
    caseSensitive: props.caseSensitive,
    findChunks: props.findChunks,
    sanitize: props.sanitize,
    searchWords: props.searchWords,
    textToHighlight: props.textToHighlight
  });
  const children = getTextChildren(props, chunks);
  const slots = context.slots;
  if (slots.default) {
    return slots.default && slots.default(children);
  }
  return h("span", { ...context.attrs }, children.map(({ chunk, text, attrs }) => {
    if (!chunk.highlight) {
      return text;
    }
    return h("mark", attrs, [text]);
  }));
};
var EMPTY_STYLE = {};
function getTextChildren(props, chunks) {
  let highlightCount = -1;
  let highlightClassNames = "";
  let highlightStyles = {};
  const { textToHighlight, highlightClassName, highlightStyle = EMPTY_STYLE, activeIndex, activeClassName, activeStyle = EMPTY_STYLE } = props;
  return chunks.map((chunk, index) => {
    const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
    if (!chunk.highlight) {
      return { chunk, text };
    } else {
      highlightCount++;
      const isActive = highlightCount === +(activeIndex || -1);
      highlightClassNames = `${highlightClassName} ${isActive ? activeClassName : ""}`;
      highlightStyles = isActive === true && activeStyle != null ? { ...highlightStyle, ...activeStyle } : highlightStyle;
      const attrs = {
        class: highlightClassNames,
        key: index,
        style: highlightStyles,
        highlightIndex: highlightCount
      };
      return { chunk, text, attrs };
    }
  });
}
VueHighlightWordsImpl.props = {
  activeClassName: String,
  activeIndex: Number,
  activeStyle: Object,
  autoEscape: Boolean,
  caseSensitive: {
    type: Boolean,
    defualt: false
  },
  findChunks: Function,
  custom: {
    type: Boolean,
    default: false
  },
  highlightClassName: String,
  highlightStyle: Object,
  sanitize: Function,
  searchWords: {
    type: Array,
    validator(value) {
      return value.every((word) => typeof word === "string");
    },
    required: true
  },
  textToHighlight: {
    type: String,
    required: true
  }
};
var VueHighlightWords = VueHighlightWordsImpl;
function install(app, options = { name: "" }) {
  app.component(options.name || "VueHighlightWords", VueHighlightWords);
}
export {
  VueHighlightWords,
  VueHighlightWords as default,
  install
};
/*! Bundled license information:

vue-highlight-words/dist/vue-highlight-words.esm.js:
  (*!
   * vue-highlight-words  v3.0.1
   * © 2022 Yichang Liu
   * LICENCE: MIT
  *)
*/
//# sourceMappingURL=vue-highlight-words.js.map
