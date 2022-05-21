(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _slider = _interopRequireDefault(require("./components/slider"));

var _sliderFeedback = _interopRequireDefault(require("./components/sliderFeedback"));

var _sliderStock = _interopRequireDefault(require("./components/sliderStock"));

var _burgerMenu = _interopRequireDefault(require("./components/burger-menu"));

var _tabs = _interopRequireDefault(require("./components/tabs"));

var _scrollSmooth = _interopRequireDefault(require("./components/scroll-smooth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.
(function ($) {
  // When DOM is ready
  $(function () {
    //const accordions = new Accordion();
    _burgerMenu["default"].init();

    _slider["default"].init();

    _sliderFeedback["default"].init();

    _sliderStock["default"].init();

    var accordions = new _accordion["default"]();

    _tabs["default"].init();

    _scrollSmooth["default"].init();

    var galleryThumbs = new Swiper('.gallery-thumbs', {
      loop: false,
      freeMode: true,
      loopedSlides: 4,
      //looped slides should be the same
      watchSlidesProgress: true,
      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop: false,
      loopedSlides: false,
      //looped slides should be the same
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
  });
})(jQuery);

},{"./components/accordion":2,"./components/burger-menu":3,"./components/scroll-smooth":4,"./components/slider":5,"./components/sliderFeedback":6,"./components/sliderStock":7,"./components/tabs":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_WRAP = 'js-accordion-wrap';
var CLASS_ACCORDION = 'js-accordion';
var CLASS_HEAD = 'js-accordion-head';
var CLASS_OPENER = 'js-accordion-open';
var CLASS_CONTENT = 'js-accordion-content';
var CLASS_DESCRIPTION = 'js-accordion-descr';
var CLASS_OPEN = 'js-open';
var CLASS_ACTIVE = 'active';

function initAccordion() {
  var accordionList = document.querySelectorAll(".".concat(CLASS_ACCORDION));
  var openList = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_OPEN));

  if (accordionList.length) {
    accordionList.forEach(function (accordion) {
      var wrap = accordion.closest(".".concat(CLASS_WRAP));
      var open = accordion.querySelector(".".concat(CLASS_OPENER));
      open.addEventListener('click', function (e) {
        var target = e.target;
        var btn = target.closest(".".concat(CLASS_OPENER));
        var head = target.closest(".".concat(CLASS_HEAD));
        var trigger = head ? head : btn;

        if (wrap && wrap.getAttribute('data-only') != undefined) {
          var group = wrap.querySelector(".".concat(CLASS_ACCORDION)).getAttribute('data-group');
          var contentList = [];

          if (group) {
            var currentAccordionList = wrap.querySelectorAll("[data-group=\"".concat(group, "\"]"));
            currentAccordionList.forEach(function (accordion) {
              contentList.push(accordion.querySelector(".".concat(CLASS_CONTENT)));
            });
          } else {
            contentList = wrap.querySelectorAll(".".concat(CLASS_CONTENT));
          }

          showAccordion(trigger, contentList, false);
        } else {
          showAccordion(trigger);
        }
      });
    });
    resize();
  }

  if (openList.length) {
    clickAccordion(openList);
  }

  function getDesctiptionHeight(currentAccordion) {
    var description = currentAccordion.querySelector(".".concat(CLASS_DESCRIPTION));
    var height = description.offsetHeight;
    var computedStyle = window.getComputedStyle(description);
    var marginTop = +computedStyle.marginTop.replace('px', '');
    var marginBottom = +computedStyle.marginBottom.replace('px', '');
    return height + marginTop + marginBottom;
  }

  function showAccordion(head) {
    var contentAccordion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var currentContent = head.nextElementSibling;
    var parent = currentContent.closest(".".concat(CLASS_ACCORDION));

    if (head.classList.contains(CLASS_ACTIVE)) {
      head.classList.remove(CLASS_ACTIVE);
      parent.classList.remove(CLASS_ACTIVE);
      currentContent.style.maxHeight = '0';
    } else {
      var changeParent = function changeParent(el) {
        parentDescription = el.closest(".".concat(CLASS_DESCRIPTION));

        if (parentDescription) {
          paretnContent = parentDescription.closest(".".concat(CLASS_CONTENT));
        } else {
          paretnContent = null;
        }
      };

      if (!all && contentAccordion.length) {
        contentAccordion.forEach(function (content) {
          content.previousElementSibling.classList.remove(CLASS_ACTIVE);
          content.style.maxHeight = '0';
        });
      }

      var heightDescription = getDesctiptionHeight(currentContent);
      var parentDescription;
      var paretnContent;
      changeParent(currentContent);

      if (paretnContent) {
        do {
          var oldHeight = paretnContent.scrollHeight;
          paretnContent.style.maxHeight = "".concat(oldHeight + heightDescription, "px");
          changeParent(paretnContent);
        } while (paretnContent);
      }

      head.classList.add(CLASS_ACTIVE);
      parent.classList.add(CLASS_ACTIVE);
      currentContent.style.maxHeight = heightDescription + 'px';
    }
  }

  function updateResize() {
    var activeAccordions = document.querySelectorAll(".".concat(CLASS_ACCORDION, ".").concat(CLASS_ACTIVE));
    var activeOpeners = document.querySelectorAll(".".concat(CLASS_OPENER, ".").concat(CLASS_ACTIVE));
    var activeHeads = document.querySelectorAll(".".concat(CLASS_HEAD, ".").concat(CLASS_ACTIVE));
    var activeContents = document.querySelectorAll(".".concat(CLASS_CONTENT, ".").concat(CLASS_ACTIVE));

    if (activeOpeners.length) {
      activeOpeners.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }

    if (activeHeads.length) {
      activeHeads.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
    }

    if (activeContents.length) {
      activeContents.forEach(function (el) {
        el.classList.remove(".".concat(CLASS_ACTIVE));
        el.style.maxHeight = '0';
      });
    }

    if (activeAccordions.length) {
      activeAccordions.forEach(function (el) {
        return el.classList.remove(".".concat(CLASS_ACTIVE));
      });
      clickAccordion(activeAccordions);
      clickAccordion(activeAccordions);
    }
  }

  function clickAccordion(list) {
    list.forEach(function (open) {
      var btn = open.querySelector(".".concat(CLASS_OPENER));

      if (btn) {
        btn.click();
      }
    });
  }

  function resize() {
    var changed = false;
    window.addEventListener('resize', function () {
      if (changed !== false) {
        clearTimeout(changed);
      }

      changed = setTimeout(updateResize, 200);
    });
  }
}

var _default = initAccordion;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var BURGER = document.querySelector('.js-burger-open');
var NAV = document.querySelector('.js-burger');
var BODY = document.querySelector('body');
var CLASS_OVERFLOW = 'overflow';
var CLASS_ACTIVE = 'active';

var burgerMenu = function () {
  var burgeInit = function burgeInit() {
    if (!BURGER) return;
    BURGER.addEventListener('click', function (e) {
      if (!e.currentTarget.classList.contains('active')) {
        openBurger();
      } else {
        closeBurger();
      }
    });
  };

  var openBurger = function openBurger() {
    BURGER.classList.add(CLASS_ACTIVE);
    NAV.classList.add(CLASS_ACTIVE);
    BODY.classList.add(CLASS_OVERFLOW);
  };

  var closeBurger = function closeBurger() {
    BURGER.classList.remove(CLASS_ACTIVE);
    NAV.classList.remove(CLASS_ACTIVE);
    BODY.classList.remove(CLASS_OVERFLOW);
  };

  var init = function init() {
    burgeInit();
  };

  return {
    init: init,
    closeBurger: closeBurger
  };
}();

var _default = burgerMenu;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var HEADER_EL_HEIGHT = document.querySelector('.menu').clientHeight;

var scrollSmooth = function () {
  var smoothScroll = function smoothScroll() {
    var scroll = function scroll(targetEl, duration) {
      var targets = document.querySelector(targetEl);
      var targetsPosition = targets.getBoundingClientRect().top - HEADER_EL_HEIGHT;
      var startsPosition = window.pageYOffset;
      var startTime = null;

      var ease = function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t -= 1;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      var animation = function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startsPosition, targetsPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    };

    var scrollTo = function scrollTo() {
      var links = document.querySelectorAll('.js-smooth-scroll');
      links.forEach(function (each) {
        each.addEventListener('click', function () {
          var currentTarget = this.getAttribute('href');
          scroll(currentTarget, 1000);
        });
      });
    };

    scrollTo();
  };

  var init = function init() {
    smoothScroll();
  };

  return {
    init: init
  };
}();

var _default = scrollSmooth;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var swiperSlider = function () {
  var accountantInit = new Swiper('.swiper-main', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    preloadImages: false,
    lazy: true,
    centerInsufficientSlides: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  var init = function init() {};

  return {
    init: init
  };
}();

var _default = swiperSlider;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var swiperSliderFeedback = function () {
  var accountantInit = new Swiper('.swiper-feedback', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 300000,
      disableOnInteraction: false
    },
    centerInsufficientSlides: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  var init = function init() {};

  return {
    init: init
  };
}();

var _default = swiperSliderFeedback;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var swiperSliderStock = function () {
  var accountantInit = new Swiper('.swiper-stock', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false
    },
    preloadImages: false,
    lazy: true,
    centerInsufficientSlides: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  var init = function init() {};

  return {
    init: init
  };
}();

var _default = swiperSliderStock;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var CLASS_ACTIVE = 'active';
var wrapList = document.querySelectorAll('.js-tabs');

var tabs = function () {
  var tabsInit = function tabsInit() {
    if (!wrapList.length) return;
    wrapList.forEach(function (wrap) {
      return attachEvents(wrap);
    });

    function attachEvents(parent) {
      var tabList = parent.querySelectorAll('[data-tab]'),
          contentList = parent.querySelectorAll('[data-content]');
      if (!tabList.length) return;
      tabList.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          tabList.forEach(function (btn) {
            return btn.classList.remove(CLASS_ACTIVE);
          });
          e.currentTarget.classList.add(CLASS_ACTIVE);
          var idContent = e.currentTarget.dataset.tab;

          if (idContent === 'all') {
            contentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          } else {
            var currentContentList = document.querySelectorAll("[data-content=\"".concat(idContent, "\"]"));
            contentList.forEach(function (content) {
              return content.classList.remove(CLASS_ACTIVE);
            });
            currentContentList.forEach(function (content) {
              return content.classList.add(CLASS_ACTIVE);
            });
          }
        });
      });
    }
  };

  var init = function init() {
    tabsInit();
  };

  return {
    init: init
  };
}();

var _default = tabs;
exports["default"] = _default;

},{}]},{},[1]);
