"use strict";

exports.__esModule = true;
exports.getIcons = exports.labelOptions = exports.styleOptions = exports.childrenSelect = exports.childrenmarkerSelect = exports.childrencircleSelect = void 0;

var _fengjiBlue = _interopRequireDefault(require("../assest/img/fengji-blue.png"));

var _fengjiRed = _interopRequireDefault(require("../assest/img/fengji-red.png"));

var _fengjiGreen = _interopRequireDefault(require("../assest/img/fengji-green.png"));

var _fengjiWhite = _interopRequireDefault(require("../assest/img/fengji-white.png"));

var _markers = _interopRequireDefault(require("../assest/img/markers.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 边框类型
// 边框类型
var childrencircleSelect = [{
  id: 0,
  title: 'solid'
}, {
  id: 1,
  title: 'dashed'
}, {
  id: 2,
  title: 'dotted'
}]; // 下拉列表选择图标

exports.childrencircleSelect = childrencircleSelect;
var childrenmarkerSelect = [{
  id: 0,
  title: 'simple_red'
}, {
  id: 1,
  title: 'simple_blue'
}, {
  id: 2,
  title: 'loc_red'
}, {
  id: 3,
  title: 'loc_blue'
}, {
  id: 4,
  title: 'start'
}, {
  id: 5,
  title: 'end'
}, {
  id: 6,
  title: 'location'
}, {
  id: 7,
  title: 'edit'
}, {
  id: 8,
  title: 'red1'
}, {
  id: 9,
  title: 'blue1'
}, {
  id: 10,
  title: 'yellow1'
}, {
  id: 11,
  title: 'red2'
}, {
  id: 12,
  title: 'red3'
}, {
  id: 13,
  title: 'red4'
}, {
  id: 14,
  title: 'red5'
}, {
  id: 15,
  title: 'red6'
}, {
  id: 16,
  title: 'red7'
}, {
  id: 17,
  title: 'red8'
}, {
  id: 18,
  title: 'red9'
}, {
  id: 19,
  title: 'red10'
}, {
  id: 20,
  title: 'blue2'
}, {
  id: 21,
  title: 'blue3'
}, {
  id: 22,
  title: 'blue4'
}, {
  id: 23,
  title: 'blue5'
}, {
  id: 24,
  title: 'blue6'
}, {
  id: 25,
  title: 'blue7'
}, {
  id: 26,
  title: 'blue8'
}, {
  id: 27,
  title: 'blue9'
}, {
  id: 28,
  title: 'blue10'
}, {
  id: 29,
  title: 'yellow2'
}, {
  id: 30,
  title: 'yellow3'
}, {
  id: 31,
  title: 'yellow4'
}, {
  id: 32,
  title: 'yellow5'
}, {
  id: 33,
  title: 'yellow6'
}, {
  id: 34,
  title: 'yellow7'
}, {
  id: 35,
  title: 'yellow8'
}, {
  id: 36,
  title: 'yellow9'
}, {
  id: 37,
  title: 'yellow10'
}]; // 下拉列表选择图片

exports.childrenmarkerSelect = childrenmarkerSelect;
var childrenSelect = [{
  id: 1,
  title: '小风机1',
  value: '图便1',
  img: _fengjiBlue.default,
  dom: '<div style="width: 3rem;height: 3rem;text-align: center;line-height: 1.5rem;background-size: cover;background-image: url(' + _fengjiBlue.default + ')"></div>'
}, {
  id: 2,
  title: '小风机2',
  value: '图便2',
  img: _fengjiRed.default,
  dom: '<div style="width: 3rem;height: 3rem;text-align: center;line-height: 1.5rem;background-size: cover;background-image: url(' + _fengjiRed.default + ')"></div>'
}, {
  id: 3,
  title: '小风机3',
  value: '图便3',
  img: _fengjiGreen.default,
  dom: '<div style="width: 3rem;height: 3rem;text-align: center;line-height: 1.5rem;background-size: cover;background-image: url(' + _fengjiGreen.default + ')"></div>'
}, {
  id: 4,
  title: '小风机4',
  value: '图便4',
  img: _fengjiWhite.default,
  dom: '<div style="width: 3rem;height: 3rem;text-align: center;line-height: 1.5rem;background-size: cover;background-image: url(' + _fengjiWhite.default + ')"></div>'
}]; // 描图形时候的样式

exports.childrenSelect = childrenSelect;
var styleOptions = {
  strokeColor: '#5E87DB',
  // 边线颜色。
  fillColor: '#5E87DB',
  // 填充颜色。当参数为空时，圆形将没有填充效果。
  strokeWeight: 2,
  // 边线的宽度，以像素为单位。
  strokeOpacity: 1,
  // 边线透明度，取值范围0 - 1。
  fillOpacity: 0.2 // 填充的透明度，取值范围0 - 1。

}; // 描的时候文字样式

exports.styleOptions = styleOptions;
var labelOptions = {
  borderRadius: '2px',
  background: '#FFFBCC',
  border: '1px solid #E1E1E1',
  color: '#703A04',
  fontSize: '12px',
  letterSpacing: '0',
  padding: '5px'
}; //Icon获取 | "simple_red" | "simple_blue" | "loc_red" | "loc_blue" | "start" | "end" | "location" | "red1" | "red2" | "red3" | "red4" | "red5" | "red6" | "red7" | "red8" | "red9" | ... 10 more ... | "blue10"*/

exports.labelOptions = labelOptions;

var defaultIcons = function defaultIcons() {
  var defaultIconUrl = _markers.default;
  var icons = {
    'simple_red': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(454 / 2, 378 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'simple_blue': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(454 / 2, 450 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'loc_red': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(46 / 2, 70 / 2), {
      imageOffset: new BMapGL.Size(400 / 2, 378 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'loc_blue': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(46 / 2, 70 / 2), {
      imageOffset: new BMapGL.Size(400 / 2, 450 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'start': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(50 / 2, 80 / 2), {
      imageOffset: new BMapGL.Size(400 / 2, 278 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'end': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(50 / 2, 80 / 2), {
      imageOffset: new BMapGL.Size(450 / 2, 278 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    'location': new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(28 / 2, 40 / 2), {
      imageOffset: new BMapGL.Size(248 / 2, 466 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    }),
    "edit": new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(60, 307.6 / 2),
      imageSize: new BMapGL.Size(480 / 2, 480 / 2)
    })
  };

  for (var i = 1; i <= 10; i++) {
    icons['red' + i] = new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(42 / 2 * (i - 1), 0),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    });
  }

  for (var _i = 1; _i <= 10; _i++) {
    icons['blue' + _i] = new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(42 / 2 * (_i - 1), 132 / 2),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    });
  }

  for (var _i2 = 1; _i2 <= 10; _i2++) {
    icons['yellow' + _i2] = new BMapGL.Icon(defaultIconUrl, new BMapGL.Size(42 / 2, 66 / 2), {
      imageOffset: new BMapGL.Size(42 / 2 * (_i2 - 1), 32),
      imageSize: new BMapGL.Size(600 / 2, 600 / 2)
    });
  }

  return icons;
};

var getIcons = function getIcons(datavalue) {
  return defaultIcons()[datavalue];
};

exports.getIcons = getIcons;