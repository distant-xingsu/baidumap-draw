"use strict";

exports.__esModule = true;
exports.default = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 自定义覆盖物的DOM生成类
 * @param point 定位点坐标
 * @param options 传入参数，如offset等
 */
function CustomOverlayDom(point, options) {
  this._point = new BMapGL.Point(point.lng, point.lat);
  this._options = options || {};
  this._html = options.html || '';
  this._config = options.config || {};
  var extend = new BMapGL.Overlay();

  for (var key in extend) {
    if (key !== 'initialize' && key !== 'draw' && key !== 'destroy') {
      this.__proto__[key] = extend[key];
    }
  }
}

CustomOverlayDom.prototype.initialize = function (map) {
  this._map = map;
  this._div = document.createElement("div");
  this._div.style.position = "absolute";
  this._div.style.zIndex = BMapGL.Overlay.getZIndex(this._point.lat);

  _reactDom.default.render(this._html, this._div);

  this._div.onmousedown = function (event) {
    event = event || window.event;

    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    return false;
  };

  map.getPanes().floatShadow.appendChild(this._div);
  return this._div;
};

CustomOverlayDom.prototype.destroy = function () {
  _reactDom.default.unmountComponentAtNode(this._div);
};

CustomOverlayDom.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  var offset = {
    width: 0,
    height: 0
  };

  if (this._options && this._options.offset) {
    offset = this._options.offset;
  }

  var offW = offset.width;
  var offH = offset.height;

  if (this._options && this._options.unit && this._options.unit === 'm') {
    offW /= map.getZoomUnits();
    offH /= map.getZoomUnits();
  }

  this._div.style.left = pixel.x + offW + 'px';
  this._div.style.top = pixel.y + offH + 'px';
  this._div.style.transform = 'translate(-50%, -100%)';
};

var _default = CustomOverlayDom;
exports.default = _default;