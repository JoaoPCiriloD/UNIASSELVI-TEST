/*!
 * SlimSelect - v1.27.14
 * Slim advanced select dropdown
 * https://slimselectjs.com
 */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.SlimSelect = t())
    : (e.SlimSelect = t());
})(window, function () {
  "use strict";

  // Utility functions
  var Utils = {
    hasClassInTree: function (element, className) {
      function hasClass(el, cls) {
        return cls && el && el.classList && el.classList.contains(cls)
          ? el
          : null;
      }
      return (
        hasClass(element, className) ||
        (function findInTree(el, cls) {
          return el && el !== document
            ? hasClass(el, cls)
              ? el
              : findInTree(el.parentNode, cls)
            : null;
        })(element, className)
      );
    },

    ensureElementInView: function (container, element) {
      var containerTop = container.scrollTop + container.offsetTop,
        containerBottom = containerTop + container.clientHeight,
        elementTop = element.offsetTop,
        elementBottom = elementTop + element.clientHeight;

      if (elementTop < containerTop) {
        container.scrollTop -= containerTop - elementTop;
      } else if (containerBottom < elementBottom) {
        container.scrollTop += elementBottom - containerBottom;
      }
    },

    putContent: function (element, position, isOpen) {
      var height = element.offsetHeight,
        rect = element.getBoundingClientRect(),
        above = isOpen ? rect.top : rect.top - height,
        below = isOpen ? rect.bottom : rect.bottom + height;

      return above <= 0
        ? "below"
        : below >= window.innerHeight
        ? "above"
        : isOpen
        ? position
        : "below";
    },

    debounce: function (func, wait, immediate) {
      var timeout;
      wait = wait || 100;
      immediate = immediate || false;

      return function () {
        var args = Array.prototype.slice.call(arguments);
        var context = this;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },

    highlight: function (text, search, className) {
      var highlighted = text;
      var regex = new RegExp("(" + search.trim() + ")(?![^<]*>[^<>]*</)", "i");

      if (!text.match(regex)) return text;

      var match = text.match(regex);
      var index = match.index;
      var length = index + match[0].toString().length;
      var term = text.substring(index, length);

      return highlighted.replace(
        regex,
        '<mark class="' + className + '">' + term + "</mark>"
      );
    },
  };

  // Data management
  var Data = function (options) {
    this.contentOpen = false;
    this.contentPosition = "below";
    this.isOnChangeEnabled = true;
    this.main = options.main;
    this.searchValue = "";
    this.data = [];
    this.filtered = null;

    this.parseSelectData();
    this.setSelectedFromSelect();
  };

  Data.prototype.newOption = function (option) {
    return {
      id: option.id ? option.id : String(Math.floor(Math.random() * 100000000)),
      value: option.value ? option.value : "",
      text: option.text ? option.text : "",
      innerHTML: option.innerHTML ? option.innerHTML : "",
      selected: !!option.selected && option.selected,
      display: option.display === undefined || option.display,
      disabled: !!option.disabled && option.disabled,
      placeholder: !!option.placeholder && option.placeholder,
      class: option.class ? option.class : undefined,
      data: option.data ? option.data : {},
    };
  };

  // Configuration
  var Config = function (options) {
    // Default configuration
    this.id = "";
    this.isMultiple = false;
    this.isAjax = false;
    this.isSearching = false;
    this.showSearch = true;
    this.searchFocus = true;
    this.searchHighlight = false;
    this.closeOnSelect = true;
    this.showContent = "auto";
    this.searchPlaceholder = "Buscar";
    this.searchText = "No Results";
    this.searchingText = "Buscando...";
    this.placeholderText = "Select Value";
    this.allowDeselect = false;
    this.allowDeselectOption = false;
    this.hideSelectedOption = false;
    this.deselectLabel = "x";
    this.isEnabled = true;
    this.valuesUseText = false;
    this.showOptionTooltips = false;
    this.selectByGroup = false;
    this.limit = 0;
    this.timeoutDelay = 200;
    this.addToBody = false;

    // CSS classes
    this.main = "ss-main";
    this.singleSelected = "ss-single-selected";
    this.arrow = "ss-arrow";
    this.multiSelected = "ss-multi-selected";
    this.content = "ss-content";
    this.open = "ss-open";
    this.search = "ss-search";
    this.list = "ss-list";
    this.option = "ss-option";
    this.disabled = "ss-disabled";
    this.hide = "ss-hide";

    // Apply user options
    if (options) {
      this.id = "ss-" + Math.floor(Math.random() * 100000);
      this.isMultiple = options.select.multiple;
      this.isAjax = options.isAjax;
      this.showSearch = options.showSearch !== false;
      // ... more option assignments
    }
  };

  // Main SlimSelect class
  var SlimSelect = function (options) {
    var self = this;

    // Callbacks
    this.ajax = null;
    this.addable = null;
    this.beforeOnChange = null;
    this.onChange = null;
    this.beforeOpen = null;
    this.afterOpen = null;
    this.beforeClose = null;
    this.afterClose = null;

    // Validate and get select element
    var selectElement = this.validate(options);
    if (selectElement.dataset.ssid) {
      this.destroy(selectElement.dataset.ssid);
    }

    // Set up callbacks
    if (options.ajax) this.ajax = options.ajax;
    if (options.addable) this.addable = options.addable;

    // Initialize components
    this.config = new Config({
      select: selectElement,
      isAjax: !!options.ajax,
      showSearch: options.showSearch,
      searchPlaceholder: options.searchPlaceholder,
      // ... more config options
    });

    this.select = {
      element: selectElement,
      setValue: function () {
        // Set select element values
      },
    };

    this.data = new Data({ main: this });

    // Render the component
    this.render();

    // Event listeners
    document.addEventListener("click", function (e) {
      if (e.target && !Utils.hasClassInTree(e.target, self.config.id)) {
        self.close();
      }
    });
  };

  SlimSelect.prototype.validate = function (options) {
    var select =
      typeof options.select === "string"
        ? document.querySelector(options.select)
        : options.select;

    if (!select) {
      throw new Error("Could not find select element");
    }
    if (select.tagName !== "SELECT") {
      throw new Error("Element isnt of type select");
    }
    return select;
  };

  SlimSelect.prototype.render = function () {
    // Render the select component
  };

  SlimSelect.prototype.open = function () {
    // Open dropdown
  };

  SlimSelect.prototype.close = function () {
    // Close dropdown
  };

  SlimSelect.prototype.set = function (value) {
    // Set selected value
  };

  SlimSelect.prototype.destroy = function () {
    // Clean up component
  };

  return SlimSelect;
});
