[helper.js](https://github.com/shusiwei/helper)一个javascript编写的为移动浏览器提供的一个小工具集。

helper.js依赖于jQuery3

该项目代码[托管在GitHub](https://github.com/shusiwei/helper)

##阅读说明

```javascript
function(a, b[, c, d]) // 参数a, b 为必要参数，c, d为可选参数
* a = string ['app'] // 参数a的数据类型为 string , 默认参数为'app'，* 代表必填参数, [] 代表参数默认值
// 这是里条注释 ['route/a', 'route/old/a'] // 参数书写范例（仅限 [ ] 括号中的内容）
```

##安装
####git

```bash
git clone https://github.com/shusiwei/helper.git
```

####bower

```bash
bower install --save shusiwei/helper
```

##使用（Use）

####页面引入

```html
<link rel="stylesheet" type="text/css" href="../js/helper.css> // 引入样式
<script type="text/javascript" src="./js/helper.js"> // 引入JS文件
```

###AMD&CMD

```javascript
// 引入Helper模块
var Helper = require('helper');
```

##基础方法

####is

```javascript
Helper.is(type, object) // 判断一个元素是否为某种数据类型
* type = string // 检测的数据类型 'nickname' : 昵称/姓名, 'cell' : 手机号码, 'tel' : 电话号码, 'phone' : 手机和电话号码, 'email' : 邮箱号码, 'integer' : 整型数字, 'chinese' : 中文字符
* object = * // 被检测的数据
```

```javascript
Helper.isUndefined(value) // 判断一个元素是否为undefined
Helper.isNull(value) // 判断一个元素是否为 null
Helper.isObject(object) // 判断一个元素是否为object
Helper.isNumber(object) // 判断一个元素是否为一个数字
Helper.isArray(object) // 判断一个元素是否为一个数组
Helper.isString(object) // 判断一个元素是否为字符串
Helper.isFunction(object) // 判断一个元素是否为函数
Helper.isBoolean(value) // 判断一个元素是否为布尔值
Helper.isRegExp(value) // 判断一个元素是否为正则
Helper.isDate(object) // 判断一个元素是否为一个Date对象
Helper.isElement(object) // 判断一个元素是否为 DOM对象
Helper.isNodeList(object) // 判断一个元素是否为 DOM 集合
```

####indexOf

```javascript
Helper.indexOf(object, value) // 得到一个值在某个集合中的索引位置，如果不存在则返回-1
* object = array/object/string // 集合
* value = * // 值
```

####includes
```javascript
Helper.includes(object, value) // 得到一个集合中是否包含某个值
* object = array/object/string // 集合
* value = * // 值
```
##方法集合

####getTimeStamp

```javascript
Helper.getTimeStamp() // 得到当前时间戳
```

####getRandom
```javascript
Helper.getRandom() // 得到一个随机数
```

####getRandomStamp

```javascript
Helper.getRandomStamp(length, repeat) // 得到一个随机戳
length = number [16] // 长度
repeat = boolean [false] // 字符是否允许重复
```

####setCookie
```javascript
Helper.setCookie(name, value, exp) // 设计一个cookie
name = string // cookie 名称
value = string // cookie 值
exp = number // 过期时间，单位：天
```

####query2json
```javascript
Helper.query2json([queryStr, key]) // 将一个get查询参数转换为对象
queryStr = string [location.search]// 要转换的查询字符串，默认为
key = string // 要得到的特定参数，默认为空，会得到整个对象
```

####cookie2json
```javascript
Helper.cookie2json(key) // cookie 值转换为object对象
key = string // 要得到的特定参数，默认为空，会得到整个对象
```

####formatStr
```javascript
Helper.formatStr(str, pattern, maxLength, separator) // 格式化一个字符串
* str = string // 要格式化的字符串
pattern = string/number [4] // 要格式化的格式，接受字符串和数字两种模式, 如：'xxx;xxxx;xxxx' 或 4
maxLength = number // 最大长度，如果 pattern 为数字时，此值为必填项
separator = string [' '] // 分隔符，默认为 ' ' 空格
```

####clearStr
```javascript
Helper.clearStr(str, type) // 清除字符串中的特定字符
* str = string // 要清除的字符串
pattern = string/number [4] // 要格式化的格式，接受字符串和数字两种模式, 如：'xxx;xxxx;xxxx' 或 4
maxLength = number // 最大长度，如果 pattern 为数字时，此值为必填项
separator = string [' '] // 分隔符，默认为 ' ' 空格
```
####getDate
```javascript
Helper.getDate(number, start) // 得到未来日期
* number = number // 未来多少天
start = string// 从哪一天开始算起，格式如：['2016-10-01']
```
##UA
####isiOS
```javascript
Helper.UA.isiOS(ver) // 当前系统是不是iOS
ver = number // 具体的版本号
```
####isAndroid
```javascript
Helper.UA.isAndroid(ver) // 当前系统是不是安卓
ver = number // 具体的版本号
```
####isMobile
```javascript
Helper.UA.isMobile() // 当前系统是不是移动平台
```
####isKernel
```javascript
Helper.UA.isKernel() // 当前浏览器内核是否为某个浏览器内核 // wechat/qq/mqq/uc/safari/chrome/firefox
```
####isWebkit
```javascript
Helper.UA.isWebkit() // 当前浏览器是否为Webkit内核
```
####size
```javascript
Helper.size // 窗口尺寸数据

docWidth // 文档宽度
docHeight // 文档高度
winWidth // 窗口宽度
winHeight // 窗口高度
scrollTop // 滚动条y值
scrollLeft // 滚动条x值
```
##DOM 操作

####getVisibles

```javascript
Helper.getZIndex(selector, context) // 得到当前元素的兄弟元素中最高ZIndex值高一层ZIndex值

* selector = selector // 选择器
context = context // 选择器范围
```

####getSize
```javascript
Helper.getSize(selector, options) // 得到元素实际的占用尺寸

* selector = selector // 选择器
options = { // 选项
  height : array // 高的取值依据 ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth', 'height']
  width : array // 高的取值依据 ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth', 'width']
  preset : {
    paddingLeft : number // 取值预设
  }
}
```

####inViewport
```javascript
Helper.inViewport(target) // 判断一个DOM是否显示在视野范围内

* target = selector // 选择器
```

####isPageBottom
```javascript
Helper.isPageBottom(threshold) // 是否到了页面底部

threshold = number [0] // 阀值
```

####isChildNode
```javascript
Helper.isChildNode(childNode, parentNode) // 一个元素是否为别一个元素的子元素

childNode = DOM // 子元素
parentNode = DOM // 父元素
```

####px2rem
```javascript
Helper.px2rem(px) // px单位转换到rem单位
```

####rem2px
```javascript
Helper.rem2px(px) // rem转换到px单位
```

####htmlpx2rem
```javascript
Helper.htmlpx2rem(html) // 把html字符串中style属性的px单位转换到rem单位
```

####autoRootEM
```javascript
Helper.autoRootEM(width) // 为页面生成动态REM单位的style元素
width = number // 设计稿的DPI宽度值
```
