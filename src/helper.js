/*
 * Helper.js
 * Description : a relaxed javascript library,it relies on jQuery(zepto).
 * Coder : shusiwei
 * Date : 2016-08-22
 * Version : 2.8.22
 *
 * https://github.com/shusiwei/helper
 * Licensed under the MIT license.
 */
;(function(global, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], function($) {
      return factory(global, $);
    });
  } else if (typeof define === 'function' && define.cmd) {
    // CMD
    define(function(require, exports, module) {
      module.exports = factory(global, require('jquery'));
    });
  } else {
    return (global.Helper = factory(global, global.jQuery));
  };
})(window, function(global, $) {
  'use strict';

  const document = global.document,
    html = document.documentElement,
    $global = $(global),
    $document = $(document),
    $html = $(html),
    $body = $(document.body);

  /* 通用方法 */
  const stampArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    regex = {
      nickname: '^[\u4E00-\u9FA5][a-zA-Z]{2,15}$',
      cell: '^(13[0-9]{9}|15[012356789][0-9]{8}|18[0-9][0-9]{8}|14[57][0-9]{8}|17[01678][0-9]{8})$',
      tel: '^(0\\d{2,3})?(\\d{7,8})$',
      email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$',
      integer: '^\\d+$',
      chinese: '^[\\u4E00-\\u9FA5]+$'
    },
    isType = (function(regex) {
      return function(type, obj) {
        let proto = Object.prototype.toString.call(obj).toLowerCase().slice(8, -1);

        switch (type) {
          case 'undefined' :
            return obj === undefined;

          case 'null' :
            return obj === null;

          case 'object' :
            return obj && proto === type;

          case 'number' :
          case 'array' :
          case 'string' :
          case 'function' :
          case 'boolean' :
          case 'regexp' :
          case 'date' :
            return proto === type;

          case '$' :
            return isObject(obj) && !!obj.jquery && !!obj.length;

          case 'element' :
            return includes(proto, 'element') && !!obj.nodeName && !!obj.nodeType && obj.nodeType === 1;

          case 'nodelist' :
            return proto === 'nodelist' && obj.length > 0;

          case 'nickname' :
          case 'cell' :
          case 'tel' :
          case 'email' :
          case 'integer' :
          case 'chinese' :
            return isString(obj) && regex[type].test(obj);

          case 'phone' :
            return regex['tel'].test(obj) && regex['cell'].test(obj);

          default :
            return false;
        }
      };
    })({
      nickname: new RegExp(regex.nickname),
      cell: new RegExp(regex.cell),
      tel: new RegExp(regex.tel),
      email: new RegExp(regex.email),
      integer: new RegExp(regex.integer),
      chinese: new RegExp(regex.chinese)
    }),

    isUndefined = function(value) {
      return value === undefined;
    },
    isNull = function(value) {
      return value === null;
    },
    isObject = function(value) {
      return isType('object', value);
    },
    isNumber = function(value) {
      return isType('number', value);
    },
    isArray = function(value) {
      return isType('array', value);
    },
    isString = function(value) {
      return isType('string', value);
    },
    isFunction = function(value) {
      return isType('function', value);
    },
    isBoolean = function(value) {
      return isType('boolean', value);
    },
    isRegExp = function(value) {
      return isType('regexp', value);
    },
    isDate = function(value) {
      return isType('date', value);
    },
    isjQuery = function(value) {
      return isType('$', value);
    },
    isElement = function(value) {
      return isType('element', value);
    },
    isNodeList = function(value) {
      return isType('nodelist', value);
    },

    indexOf = function(obj, value) {
      let index = -1;

      if (isObject(obj)) {
        for (let key in obj) {
          if (obj[key] === value) {
            return key;
          };
        };
      } else if (isString(obj)) {
        return obj.indexOf(value);
      } if (isArray(obj) || 'length' in obj) {
        try {
          return obj.indexOf(value);
        } catch (err) {
          for (let i = 0, length = obj.length; i < length; i++) {
            if (obj[i] === value) return i;
          };
        };
      };

      return index;
    },
    includes = function(obj, value) {
      return indexOf(obj, value) !== -1;
    },

    callbackHanlder = function(...fns) {
      for (let fn of fns) {
        if (isFunction(fn)) fn();
      };
    },
    createElement = function(tagName) {
      return this.createElement(tagName);
    }.bind(document),
    getComputedStyle = function(target, pseudo) {
      return this.getComputedStyle(target, pseudo);
    }.bind(global),
    jquery = function(selector) {
      return isjQuery(selector) ? selector : $(selector);
    },

    getTimeStamp = function() {
      return new Date().getTime();
    },
    getRandom = function() {
      return Math.round(getTimeStamp() * Math.random());
    },
    getRandomStamp = function(length = 16, repeat) {
      let stampLength = stampArr.length,
        stamp = '';

      for (let i = 0; i < length; i++) {
        let rnd = stampArr[Math.floor(Math.random() * stampLength)];
        if (!repeat) {
          while (stamp.indexOf(rnd) === -1) stamp += rnd;
        } else {
          stamp += rnd;
        };
      };

      return stamp;
    },
    setCookie = function(name, value, exp, options) {
      let cookie = '';

      if (isNumber(exp)) {
        let date = new Date();
        date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

        cookie += name + '=' + value + ';expires=' + date.toGMTString();
      } else {
        cookie += name + '=' + value + ';';
      };

      if (isObject(options)) {
        if (options.path) cookie += ';path=' + options.path;
        if (options.domain) cookie += ';domain=' + options.domain;
        if (options.secure) cookie += ';domain=' + options.secure;
      };

      document.cookie = cookie;

      return cookie2json(name);
    },
    query2json = function() {
      let queryStr = global.location.search.split('?').pop(),
        queryKey;

      // 如果queryStr不符合query的格式但符合key的格式，那么queryStr就代表key
      switch (arguments.length) {
        case 1 :
          if (isString(arguments[0]) && includes(arguments[0], '=')) {
            queryStr = arguments[0];
          } else if (isArray(arguments[0]) || (isString(arguments[0]) && !includes(arguments[0], '='))) {
            queryKey = arguments[0];
          };

          break;

        case 2 :
          queryStr = arguments[0];
          queryKey = arguments[1];

          break;
      };

      if (!queryStr || !includes(queryStr, '=')) return null;

      let data = defineProp({}, {
        length: ['descriptor', 0, {
          writable: true
        }]
      });

      $.each(queryStr.split('&'), function(index, param) {
        let paramArr = param.split('=');
        if (paramArr.length === 2) {
          data[paramArr[0]] = paramArr[1];
          data.length ++;
        };
      });

      if (isString(queryKey)) {
        return data[queryKey];
      } else if (isArray(queryKey)) {
        return (function(keyArr, result) {
          $.each(keyArr, function(index, name) {
            result[name] = data[name];
            result.length ++;
          });

          return result;
        })(queryKey, defineProp({}, {
          length: ['descriptor', 0, {
            writable: true
          }]
        }));
      } else if (queryKey === undefined) {
        return data;
      };
    },
    cookie2json = function(key) {
      let cookie = document.cookie;

      if (!cookie || !includes(cookie, '=')) return null;

      return query2json(cookie.replace(/; /g, '&'), key);
    },
    formatStr = function(str, pattern = 4, maxLength, separator = ' ') {
      if (!isString(str)) return '';

      let text = '';

      if (isString(pattern)) {
        let patternArr = pattern.split(''),
          patternLen = pattern.length - pattern.match(/;/g).length;

        for (let i = 0, loop = 0; i < str.length; i++) {
          if (patternArr[i + loop] === ';') {
            loop++;
            text += separator;
          };

          text += str[i];

          if (i === patternLen - 1) break;
        };
      } else if (isNumber(pattern)) {
        if (!isNumber(maxLength) || maxLength < 1) return;

        for (let i = 0; i < str.length; i++) {
          if (i > 0 && i % pattern === 0) text += separator;

          text += str[i];

          if (i + 1 > maxLength - 1) break;
        };
      };

      return text;
    },
    clearStr = function(str, type) {
      switch (type) {
        case 'space' :
          return str.replace(/ /ig, '');

        case 'NaN' :
          return str.replace(/\D/ig, '');
      };
    },
    defineProp = (function() {
      let parseDescriptor = function(source) {
        let data = {};

        for (let key in source[1]) {
          Object.defineProperty(data, key, $.extend({
            value: source[1][key]
          }, source[2]));
        };

        return {
          value: data
        };
      };

      return function(target, ...props) {
        for (let prop of props) {
          for (let key in prop) {
            let descriptor;

            if (isObject(prop[key])) {
              descriptor = {
                value: defineProp({}, prop[key])
              };
            } else if (isArray(prop[key]) && prop[key].length === 3 && prop[key][0] === 'descriptor') {
              if (isObject(prop[key][1])) {
                descriptor = parseDescriptor(prop[key]);
              } else {
                descriptor = $.extend({
                  value: prop[key][1]
                }, prop[key][2]);
              };
            } else {
              descriptor = {
                value: prop[key]
              };
            };

            Object.defineProperty(target, key, descriptor);
          };
        };

        return target;
      };
    })(),
    getDate = (function() {
      // 周
      let weekArr = ['日', '一', '二', '三', '四', '五', '六'],
        dateFixed = function(number, fix) {
          return ('0' + (number + fix)).slice(-2);
        },
        getDateArr = function(year, month, date, days, array) {
          // 每个月多少天
          let nowDays = [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            // 明年
            nextYear = year + 1,
            // 下个月
            nextMonth = month === 11 ? 0 : month + 1;

          for (let i = date; i <= nowDays[month]; i++) {
            array.push([year, dateFixed(month, 1), dateFixed(i, 0)]);
            if (--days === 0) break;
          };

          if (days > 0) getDateArr(nextMonth === 0 ? nextYear : year, nextMonth, 1, days, array);

          return array;
        },
        pushDay = function(dateArr, weekStart) {
          for (let i = 0, length = dateArr.length; i < length; i++) {
            let index = (weekStart + i) % 7;
            dateArr[i].push(weekArr[index], index);
          };

          return dateArr;
        };

      return function() {
        let nowDate;

        if (arguments.length === 1) {
                    // 获取当前时间
          nowDate = new Date();
        } else if (arguments.length === 2) {
                    // 自定义开始时间
          nowDate = new Date(arguments[1].toString());
        };

        return pushDay(getDateArr(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), arguments[0], []), nowDate.getDay());
      };
    })(),
    UA = (function() {
      let ua = navigator.userAgent.toLowerCase(),
        android = ua.match(/(android);?[\s\/]+([\d.]+)?/i),
        ipad = ua.match(/(ipad).*os\s([\d_]+)/i),
        ipod = ua.match(/(ipod)(.*os\s([\d_]+))?/i),
        iphone = !ipad && ua.match(/(iphone\sos)\s([\d_]+)/i);
        // windowsphone = ua.match(/(windows)\s(phone)\s([\d.]+)?/i);

      return {
        isiOS: function(ver) {
          if (ipad || ipod || iphone) {
            if (!ver) {
              return true;
            } else {
              if (ua.match(/(os)\s([\d_]+)/)[2].replace(/_/g, '.').search(ver) === 0) {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        },
        isAndroid: function(ver) {
          if (android) {
            if (!ver) {
              return true;
            } else {
              if (android[2].search(ver) === 0) {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        },
        // isWindowsPhone : function(ver) {
        //     if (windowsphone) {
        //         if (!ver) {
        //             return true;
        //         } else {
        //             if (windowsphone[3].search(ver) === 0) {
        //                 return true;
        //             } else {
        //                 return false;
        //             };
        //         };
        //     } else {
        //         return false;
        //     };
        // },
        isMobile: function() {
          return this.isiOS() || this.isAndroid();
        },
        isBrowser: (function() {
          let index = {
            wechat: ua.indexOf('micromessenger'),
            qq: ua.indexOf('qq'),
            mqq: ua.indexOf('mqqbrowser'),
            uc: ua.indexOf('ucbrowser'),
            safari: ua.indexOf('safari'),
            chrome: ua.indexOf('chrome'),
            firefox: ua.indexOf('firefox')
          };

          return function(name) {
            if (!(name in index)) return false;

            if (name === 'safari') {
              return index.safari >= 0 && index.chrome === -1;
            } else if (name === 'qq') {
              return index.qq >= 0 && index.mqq === -1;
            } else {
              return index[name] >= 0;
            }
          };
        })(),
        isKernel: function(name) {
          return !!ua.match(name);
        },
        isWebkit: function() {
          return this.isKernel('applewebkit');
        }
      };
    })(),
    size = (function(data) {
      let updateSize = function() {
        data.docWidth = $document.width();
        data.docHeight = $document.height();
        data.winWidth = $global.width();
        data.winHeight = $global.height();
        data.scrollTop = $global.scrollTop();
        data.scrollLeft = $global.scrollLeft();

        return data;
      };

      $global.on('resize scroll load', updateSize);
      $document.on('DOMContentLoaded readystatechange', updateSize);

      return updateSize();
    })({}),
    animationend = UA.isKernel('webkit') ? 'webkitAnimationEnd' : 'animationend',
    getVisibles = function(selector, context) {
      let elems = [],
        $target = jquery(selector, context);

      $target.siblings().each(function(i, ele) {
        let tagName = ele.nodeName.toLowerCase();
        if (tagName !== 'style' && tagName !== 'script' && tagName !== 'br') elems.push(ele);
      });

      return elems;
    },
    getEasing = function(easing) {
      return isString(easing) && (easing in $.easing) ? easing : 'swing';
    },
    getZIndex = function(selector, context) {
      let $siblings = $(getVisibles(selector, context)),
        maxZIndex = 1;

      $siblings.each(function(i, ele) {
        let zIndex = parseInt(getComputedStyle(ele, null).zIndex) || maxZIndex;
        if (zIndex >= maxZIndex) maxZIndex = zIndex + 1;
      });

      return maxZIndex;
    },
    getSize = function(selector, options = {}) {
      let $target = jquery(selector),

        width = 0,
        height = 0,
        tempValue,
        heightArr = isArray(options.height) ? options.height : ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth', 'height'],
        widthArr = isArray(options.width) ? options.width : ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth', 'width'],
        preset = isObject(options.preset) ? options.preset : {};

      for (let value of heightArr) {
        if (value in preset) {
          tempValue = preset[value];
        } else {
          tempValue = $target.css(value);
        };

        height += parseInt(tempValue) || 0;
      };

      for (let value of widthArr) {
        if (value in preset) {
          tempValue = preset[value];
        } else {
          tempValue = $target.css(value);
        };

        width += parseInt(tempValue) || 0;
      };

      return {width, height};
    },
    // 判断一个DOM是否显示在视野范围内
    inViewport = function(target) {
      let container = arguments[1] && !isNumber(arguments[1]) ? arguments[1] : global,
        threshold = arguments[1] && isNumber(arguments[1]) ? arguments[1] : arguments[2] || 0,

        $target = jquery(target),
        targetOffset = $target.offset(),
        targetLeft = targetOffset.left,
        targetTop = targetOffset.top,
        targetWidth = $target.width(),
        targetHeight = $target.height(),

        wrapOffset,
        wrapLeft,
        wrapTop,
        wrapWidth,
        wrapHeight;

      if (container !== global) {
        let $container = jquery(container);

        wrapOffset = $container.offset();
        wrapLeft = wrapOffset.left;
        wrapTop = wrapOffset.top;
        wrapWidth = $container.width();
        wrapHeight = $container.height();
      };

      let belowTheFold = function() {
          let fold = container === global ? size.winHeight + size.scrollTop : wrapTop + wrapHeight;

          return fold < targetTop - threshold;
        },
        rightOfFold = function() {
          let fold = container === global ? size.winWidth + size.scrollLeft : wrapLeft + wrapWidth;

          return fold < targetLeft - threshold;
        },
        aboveTheTop = function() {
          let fold = container === global ? size.scrollTop : wrapTop;

          return fold > targetTop + threshold + targetHeight;
        },
        leftOfBegin = function() {
          let fold = container === global ? size.scrollLeft : wrapLeft;

          return fold > targetLeft + threshold + targetWidth;
        };

      return !leftOfBegin() && !aboveTheTop() && !rightOfFold() && !belowTheFold() && $target.is(':visible') && (container === global || inViewport(container));
    },
    isPageBottom = function(threshold) {
      return size.docHeight - size.scrollTop - size.winHeight <= (isNumber(threshold) ? threshold : 0);
    },
    isChildNode = function(childNode, parentNode) {
      if (childNode === parentNode) return true;
      let target = childNode;

      while (target && target.nodeType !== 11) {
        if (target === parentNode) {
          return true;
        } else {
          target = target.parentNode;
        };
      };

      return false;
    },
    px2rem = function(px) {
      return parseFloat(px) / parseInt(getComputedStyle(html, ':root').fontSize) + 'rem';
    },
    rem2px = function(rem) {
      return parseFloat(rem) * parseInt(getComputedStyle(html, ':root').fontSize);
    },
    htmlpx2rem = (function() {
      let styleRegex = /style="([^"]+)"/ig,
        classRegex = /class="([^"]+)"/ig;

      return function(html) {
        if (!isString(html)) return html;

        let beforeArr = html.match(styleRegex),
          afterArr = [],
          placeholder = '{{#}}',
          newHtml = html.replace(styleRegex, placeholder).replace(classRegex, '');

        if (beforeArr !== null) {
          for (let styleStr of beforeArr) {
            let temp = styleStr.replace('style="', '').replace(/([\d]+)px/ig, function() {
                return arguments[1] / 100 + 'rem';
              }).replace(/(font-family:[^;]*(;)?)/ig, ''),
              tempArry = temp.split(';'),
              tempStr = '';

            for (let styleRule of tempArry) {
              if (styleRule && includes(styleRule, ':')) tempStr += styleRule.trim().toLowerCase().replace(': ', ':') + ';';
            };

            afterArr.push('style="' + tempStr + '"');
          };
        };

        for (let styleStr of afterArr) {
          newHtml = newHtml.replace(placeholder, styleStr);
        };

        return newHtml;
      };
    }()),
    autoRootEM = function(scale) {
      if (!scale) return;

      let getRootSize = function() {
          return Math.floor(global.innerWidth / scale * 625) + '%';
        },
        remStyle = (function(rootem) {
          document.head.appendChild(rootem);
          rootem.type = 'text/css';
          rootem.id = 'html:root@rem';
          rootem.sheet.insertRule('html:root{font-size:' + getRootSize() + '}', 0);

          return rootem.sheet.cssRules[0].style;
        })(createElement('style')),
        update = function(evt) {
          if (evt && evt.type === 'orientationchange') setTimeout(update, 50);
          return (remStyle.fontSize = getRootSize());
        };

      $global.on('resize load orientationchange', update);
      $document.on('DOMContentLoaded readystatechange', update);

      return update();
    },
    pageScroll = (function($scroll) {
      return function(target, options = {}) {
        let value = !isNaN(options.adjust) ? options.adjust : 0,
          speed = isNumber(options.speed) ? options.speed : 1000,
          easing = isString(options.easing) ? getEasing(options.easing) : getEasing('easeInOutQuart'),
          callback = options.callback;

        if (isNumber(target)) {
          value += target;
        } else {
          value += $(target).offset().top;
        };

        $scroll.stop().animate({
          scrollTop: value
        }, speed, easing, function() {
          if (isFunction(callback)) callback(size.top);
        });
      };
    })(UA.isWebkit() ? $body : $html),
    disableScroll = (function() {
      let preventEvent = function(evt) {
        if ((evt.type === 'keydown' && evt.keyCode >= 33 && evt.keyCode <= 40) || evt.type === 'touchmove' || evt.type === 'mousewheel') evt.preventDefault();
      };

      return function() {
        if (arguments.length === 0 || arguments[0] === true) {
          // 禁用默认事件，防止页面滚动
          $body.on('touchmove', preventEvent);
          $document.on('mousewheel keydown', preventEvent);

          return true;
        } else if (arguments[0] === false) {
          $body.off('touchmove', preventEvent);
          $document.off('mousewheel keydown', preventEvent);

          return false;
        };
      };
    })(),
    blur = (function() {
      let className = 'ui-filter-blur',
        toggleBlur = function($target, callback, container) {
          if (!$target) return;
          if (UA.isAndroid()) {
            if (isFunction(callback)) callback();
            return;
          };

          let target = $target[0],
            blurArr = target.blurArr = target.blurArr || [];

          if (container && blurArr.length === 0) {
            if ($target.hasClass(className)) $target.removeClass(className);

            $.each(getVisibles(target, container), (index, elem) => {
              let $elem = $(elem);

              if (!$elem.hasClass(className)) blurArr.push($elem.addClass(className));
            });
          } else if (!container && blurArr.length > 0) {
            blurClear(blurArr);
          };

          if (isFunction(callback)) callback();
        },
        blurClear = function(blurArray) {
          blurArray.forEach(($elem) => {
            $elem.removeClass(className);
          });

          blurArray.splice(0, blurArray.length);
        };

      return {
        show: function($target, callback, container) {
          toggleBlur($target, () => {
            $target.addClass('fadeIn visible').css({
              zIndex: getZIndex($target)
            }).one(animationend, (evt) => {
              $target.removeClass('fadeIn');

              if (isFunction(callback)) callback();
            });
          }, container);
        },
        hide: function($target, callback) {
          toggleBlur($target, () => {
            $target.addClass('fadeOut').one(animationend, (evt) => {
              $target.removeClass('fadeOut visible');

              if (isFunction(callback)) callback();
            });
          });
        },
        clear: blurClear
      };
    })(),
    Notice = function(options = {}) {
      // 设定一个显示状态
      let visibility = false,
        // 计时器
        observerTimer,
        disableEvent = function() {
          visibility = true;
          disableScroll(true);

          // 隔时检查$notice是否被移除
          observerTimer = setInterval(observer, 100);
        },
        enableEvent = function(evt) {
          visibility = false;

          disableScroll(false);
          clearInterval(observerTimer);

          // 如果$notice被移除，那么同时移除$notice的模糊对象
          if (evt && this.blurArr) blur.clear(this.blurArr);
        },

        $notice = $(createElement('div')).addClass('ui-notice').on('remove', enableEvent),
        $animate = $(createElement('div')).addClass('ui-notice-animate'),
        $textDesc = $(createElement('p')).addClass('ui-notice-desc abscenter'),

        animateData = $animate[0].dataset,
        animateClass = $animate[0].classList,

        // 观察者
        observer = function() {
          if (visibility === true && isChildNode($notice[0], document.body) === false) $notice.trigger('remove');
        },

        // 主程序
        notice = function(content, opts = {}) {
          if (visibility === true) return;

          animateData.effect = opts.effect || 'zoom';

          let container = opts.container || options.container || document.body;

          if (isString(content)) {
            $animate.append($textDesc.text(content));
          } else {
            $animate.append(content);
          };

          // 配置个性样式
          if (isString(opts.skin)) $notice.addClass(opts.skin).attr('data-skin', opts.skin);

          // 在弹出前做一些操作
          callbackHanlder(disableEvent, opts.onShowBefore, options.onShowBefore);

          // 将notice带入body
          $notice.appendTo(container).append($animate.showIn());

          // 如果timeout为0，则不自动消失
          if (opts.timeout === 0) {
            blur.show($notice, () => {
              callbackHanlder(options.onShow, opts.onShow);
            }, container);
          } else {
            blur.show($notice, () => {
              callbackHanlder(options.onShow, opts.onShow, () => {
                setTimeout(() => {
                  callbackHanlder(options.onHideBefore, opts.onHideBefore, () => {
                    notice.hide(() => {
                      callbackHanlder(options.onHide, opts.onHide);
                    });
                  });
                }, opts.timeout || 2000);
              });
            }, container);
          };
        };

      notice.hide = function() {
        if (visibility === false) return;

        let onHideBefore,
          onHideAfter;

        if (arguments.length === 1) {
          if (isFunction(arguments[0])) {
            onHideAfter = arguments[0];
          } else if (isObject(arguments[0])) {
            onHideBefore = arguments[0].onHideBefore;
            onHideAfter = arguments[0].onHide;
          };
        } else if (arguments.length === 2) {
          onHideBefore = arguments[0];
          onHideAfter = arguments[1];
        };

        if (isFunction(onHideBefore)) onHideBefore();

        $animate.showOut();
        blur.hide($notice, () => {
          callbackHanlder(enableEvent, () => {
            $notice.detach().removeClass($notice.attr('data-skin')).removeAttr('data-skin');
            $animate.detach().children().detach();
          }, onHideAfter, options.onHide);
        });
      };

      // 点击空白区域关闭
      if (options.clickSpaceHide === true) {
        $animate.on('click', (evt) => {
          if (evt.target === $animate[0]) notice.hide();
        });
      };

            // 过渡
      $animate.showIn = function() {
        let effect = (animateData.effect || 'zoom') + 'In';

        this.addClass(effect).one(animationend, () => {
          animateClass.add(effect);
        });

        return this;
      };
      $animate.showOut = function() {
        let effect = (animateData.effect || 'zoom') + 'Out';

        this.addClass(effect).one(animationend, () => {
          animateClass.remove(effect);
        });

        return this;
      };

      return notice;
    },
    Confirm = function(isAlert) {
      let allowCallback = null,
        hideCallback = null,
        notice = new Notice({
          onHide: function() {
            allowCallback = null;
            hideCallback();
          }
        }),

        $textDesc = $(createElement('p')).addClass('ui-confirm-desc'),
        $cancelBtn = $(createElement('a')).addClass('ui-confirm-btn ui-confirm-cancel-btn rightline').text('取消').on('click', notice.hide),
        $allowBtn = $(createElement('a')).addClass('ui-confirm-btn ui-confirm-allow-btn').text('确定').on('click', () => {
          notice.hide(allowCallback);
        }),
        $confirm = $(createElement('div')).addClass('ui-confirm abscenter').append($textDesc).append($allowBtn),

        confirm = function(text, callback, opts = {}) {
          if (!isString(text) && !isObject(text)) return;

          // let opts = isObject(opts) ? opts : {};

          if (isString(text)) {
            $textDesc.text(text);
          } else if (isObject(text)) {
            $textDesc.text(text.desc);

            if (text.cancel) $cancelBtn.text(text.cancel);
            if (text.button) $allowBtn.text(text.button);
          };

          notice($confirm, {
            onShowBefore: function() {
              hideCallback = function() {
                if (isObject(text)) {
                  if (text.cancel) $cancelBtn.text('取消');
                  if (text.button) $allowBtn.text('确定');
                };

                hideCallback = null;
              };

              if (isFunction(callback)) allowCallback = callback;
            },
            timeout: 0,
            skin: opts.skin,
            container: opts.container
          });
        };

      confirm.hide = notice.hide;

      if (isAlert === true) {
        $allowBtn.addClass('ui-alert-btn');
      } else {
        $allowBtn.before($cancelBtn);
      };

      return confirm;
    },
    Alert = function() {
      let confirm = new Confirm(true),
        alert = function(text) {
          if (arguments.length === 0) return;
          if (arguments.length === 2 && isObject(arguments[1])) return confirm(text, arguments[2], arguments[1]);
          confirm(text, arguments[1], arguments[2]);
        };

      alert.hide = confirm.hide;

      return alert;
    },
    Tips = function(options = {}) {
      let $tips = $(createElement('div')).addClass('ui-tips'),
        $textDesc = $(createElement('p')).addClass('ui-tips-desc').appendTo($tips),
        timer;

      $tips.clear = function(newSkin) {
        let oldSkin = this.attr('data-skin');

        if (oldSkin === newSkin) return this;
        if (oldSkin) this.removeClass(oldSkin).removeAttr('data-skin');
        if (isString(newSkin)) this.addClass(newSkin).attr('data-skin', newSkin);

        return this;
      };

      return function(text, opts = {}) {
        if (isFunction(opts.onShow)) opts.onShow();

        $textDesc.off(animationend).removeClass('scaleOut').text(text).addClass('scaleIn').one(animationend, () => {
          $textDesc.removeClass('scaleIn');
          clearTimeout(timer);

          timer = setTimeout(() => {
            clearTimeout(timer);

            $textDesc.addClass('scaleOut').one(animationend, () => {
              $textDesc.removeClass('scaleOut').empty();
              $tips.clear().removeClass('visible').remove();

              if (isFunction(opts.onHide)) opts.onHide();
            });
          }, opts.timeout || 2000);
        });

        $tips.clear(opts.skin || options.skin).addClass('visible').appendTo(document.body).css({
          zIndex: getZIndex($tips)
        });
      };
    },
    Sticky = function(sticker, content) {
      let $sticker = jquery(sticker),
        $content = jquery(content),
        sizeProp = {
          height: ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'borderTopWidth', 'borderBottomWidth', 'height']
        },
        update = this.update = function() {
          if ($content.offset().top + getSize($content, sizeProp).height + getSize($sticker, sizeProp).height > size.winHeight) {
            $sticker.css('position', 'static');
          } else {
            $sticker.css('position', 'fixed');
          };

          return update;
        };

      this.on = function() {
        $global.on('resize orientationchange', update());
      };
      this.off = function() {
        $global.off('resize orientationchange', update);
      };
    };

  class Storage {
    static get(type) {
      switch (type) {
        case 'session' :
          return global.sessionStorage;

        case 'local' :
          return global.localStorage;
      };
    }
    constructor() {
      this.tips = new Tips();
    }
    set(type, name, value, error) {
      try {
        Storage.get(type).setItem(name, typeof value === 'object' ? JSON.stringify(value) : value);
      } catch (e) {
        this.tips(error || '您的浏览器无法保存数据，可能由于您开启了无痕浏览模式，请关闭无痕浏览模式关刷新页面！');
      };
    }
    get(type, name, error) {
      try {
        return Storage.get(type).getItem(name);
      } catch (e) {
        this.tips(error || '您的浏览器无法读取数据，可能由于您开启了无痕浏览模式，请关闭无痕浏览模式关刷新页面！');
        return null;
      }
    }
    remove(type, name, error) {
      try {
        Storage.get(type).removeItem(name);
      } catch (e) {
        this.tips(error || '您的浏览器无法移除数据，可能由于您开启了无痕浏览模式，请关闭无痕浏览模式关刷新页面！');
      }
    }
    };

  return {
    // 类型判断
    is: isType,
    // 返回一个对象中包含某个值的索引
    index: indexOf,
    // 对象中是否存在某个对象（值）
    has: includes,

    isUndefined,
    isNull,
    isObject,
    isNumber,
    isArray,
    isString,
    isFunction,
    isBoolean,
    isRegExp,
    isDate,
    isElement,
    isNodeList,

    // 得到一个时间戳
    getTimeStamp,
    // 生成一个随机数
    getRandom,
    // 生成一个随机字符
    getRandomStamp,
    // 设置一个cookie
    setCookie,
    // hash转换为json
    query2json,
    // cookie 转换为json
    cookie2json,
    formatStr,
    clearStr,
    // 定义oject属性
    defineProp,
    getDate,

    // 获取UA方法
    UA,
    size,
    host: {
      query: query2json(),
      path: location.href.split('//')[1].toLowerCase().split('/')
    },

    // 得到当前元素的兄弟元素中最高ZIndex值高一层ZIndex值
    getZIndex,
    getSize,
    inViewport,
    // 是否滚动到了屏幕底部
    isPageBottom,
    isChildNode,
    px2rem,
    rem2px,
    htmlpx2rem,

    autoRootEM,
    // 页面滚动
    pageScroll,
    disableScroll,

    // blur, // 模糊效果切换
    notice: new Notice(),
    confirm: new Confirm(),
    alert: new Alert(),
    tips: new Tips(),
    storage: new Storage(),
    extend: {
      Notice,
      Confirm,
      Tips,
      Sticky
    },
    // Helper 版本号
    version: '2.0.0'
  };
});
