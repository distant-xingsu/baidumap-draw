"use strict";

exports.__esModule = true;
exports.default = void 0;

var _baidumap = _interopRequireDefault(require("./baidumap"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("./redux/store"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styleItemBaiduMap = _interopRequireDefault(require("./assest/json/styleItemBaiduMap.json"));

require("antd/dist/antd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaiduApp = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BaiduApp, _React$Component);

  //load
  function BaiduApp(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    return _this;
  } //in


  var _proto = BaiduApp.prototype;

  _proto.componentDidMount = function componentDidMount() {};

  //out
  _proto.componentWillUnmount = function componentWillUnmount() {};

  _proto.render = function render() {
    return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: _store.default
    }, /*#__PURE__*/_react.default.createElement(_baidumap.default, {
      fadata: this.props
    }));
  };

  return BaiduApp;
}(_react.default.Component);

var _default = BaiduApp;
exports.default = _default;
BaiduApp.propTypes = {
  // 百度码
  BaidumapAk: _propTypes.default.string.isRequired,
  // 百度基础参数配置
  baiduOption: _propTypes.default.shape({
    // 定位点的坐标 基础坐标中心
    coordinateItem: _propTypes.default.shape({
      lng: _propTypes.default.number,
      lat: _propTypes.default.number
    }),
    // 地图缩放级别
    zoomItem: _propTypes.default.number,
    // 地图旋转角度
    headingItem: _propTypes.default.number,
    // 倾斜角度
    tiltItem: _propTypes.default.number,
    // "normal" | "earth"		地图类型，普通地图或地球模式
    mapTypeItem: _propTypes.default.oneOf(["normal", "earth"]),
    //字符串其中的一个
    // 预加载样式
    StyleItem: _propTypes.default.array
  }),
  // 百度数据
  baiduData: _propTypes.default.shape({
    // 图层数据
    layerDataMap: _propTypes.default.array,
    // 3d数据-多边形
    standDataPoylon: _propTypes.default.array,
    // 数据平面-线
    planeDataPolyLine: _propTypes.default.array,
    // 数据平面-多边形
    planeDataPolyGon: _propTypes.default.array,
    // 数据平面-点
    planeDataMarker: _propTypes.default.array,
    // 数据平面-文本
    planeDataLabel: _propTypes.default.array,
    // 数据平面-自定义覆盖物
    planeDataCustom: _propTypes.default.array,
    // 数据平面-圆
    planeDataCricle: _propTypes.default.array
  }),
  // 开发者模式
  isDeveloperEditProp: _propTypes.default.bool,
  // 是否开始编辑 点击编辑按钮
  isEditProp: _propTypes.default.func,
  // 编辑完成后把数据返回
  resuleFun: _propTypes.default.func,
  // 地图实例
  baiduMapFun: _propTypes.default.func,
  // 百度自定义图层key
  keyCustomData: _propTypes.default.array,
  // 开启动画
  isAnimsmap: _propTypes.default.bool,
  // 动画帧
  keypatherAnim: _propTypes.default.array,
  // 左键 鼠标单击某一建筑物 返回单击事件- 非编辑模式下
  onMapOverClickFun: _propTypes.default.func,
  // 左键 鼠标双击某一建筑物 返回双击事件- 非编辑模式下
  onMapOverdbClickFun: _propTypes.default.func,
  // 添加时候返回的数据方法  -  编辑模式下
  addDataResultFun: _propTypes.default.func,
  // 删除时候返回的数据方法  - 编辑模式下
  delDataResultFun: _propTypes.default.func
};
BaiduApp.defaultProps = {
  baiduOption: {
    coordinateItem: {
      lng: 116.40372656609907,
      lat: 39.915103900724574
    },
    zoomItem: 18,
    headingItem: 0,
    tiltItem: 60,
    mapTypeItem: "normal",
    StyleItem: _styleItemBaiduMap.default
  },
  isDeveloperEditProp: false,
  isAnimsmap: false
};