"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("./redux/actions"));

require("./assest/css/baidumap.css");

var _styleItemBaiduMap = _interopRequireDefault(require("./assest/json/styleItemBaiduMap.json"));

var _defaultParame = require("./utils/defaultParame");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BaidumapStart = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("./baidumap_start"));
  });
});

var Baidumap = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Baidumap, _React$Component);

  //load
  function Baidumap(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    sessionStorage.setItem('BaidumapAk', props.fadata && props.fadata.BaidumapAk);
    _this2.state = {};
    return _this2;
  } //in


  var _proto = Baidumap.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this);
  };

  //out
  _proto.componentWillUnmount = function componentWillUnmount() {};

  _proto.render = function render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: /*#__PURE__*/_react.default.createElement("div", {
        className: "baiduapi_loading"
      }, "loading...")
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(BaidumapStart, null))));
  };

  return Baidumap;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    coordinateItem_BD: state.objs.coordinateItem_BD,
    zoomItem_BD: state.vars.zoomItem_BD,
    headingItem_BD: state.vars.headingItem_BD,
    tiltItem_BD: state.vars.tiltItem_BD,
    mapTypeItem_BD: state.vars.mapTypeItem_BD,
    StyleItem_BD: state.vars.StyleItem_BD,
    keyCustomData_BD: state.lists.keyCustomData_BD,
    layerDataMap_BD: state.lists.layerDataMap_BD,
    standDataPoylon_BD: state.lists.standDataPoylon_BD,
    planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD,
    planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
    planeDataMarker_BD: state.lists.planeDataMarker_BD,
    planeDataLabel_BD: state.lists.planeDataLabel_BD,
    planeDataCustom_BD: state.lists.planeDataCustom_BD,
    planeDataCricle_BD: state.lists.planeDataCricle_BD,
    isDeveloperEditProp_BD: state.vars.isDeveloperEditProp_BD,
    isEditProp_BD: state.vars.isEditProp_BD,
    resuleFun_BD: state.vars.resuleFun_BD,
    baiduMapFun_BD: state.vars.baiduMapFun_BD,
    isAnimsmap_BD: state.vars.isAnimsmap_BD,
    keypatherAnim_BD: state.vars.keypatherAnim_BD,
    onMapOverClickFun_BD: state.vars.onMapOverClickFun_BD,
    onMapOverdbClickFun_BD: state.vars.onMapOverdbClickFun_BD,
    addDataResultFun_BD: state.vars.addDataResultFun_BD,
    delDataResultFun_BD: state.vars.delDataResultFun_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // init
    init: function init(_this) {
      if (_this.props.fadata && _this.props.fadata.baiduOption) {
        dispatch(_actions.default.setObjs('coordinateItem_BD', _this.props.fadata.baiduOption.coordinateItem ? _this.props.fadata.baiduOption.coordinateItem : {
          lng: 116.40372656609907,
          lat: 39.915103900724574
        }));
        dispatch(_actions.default.setVars('zoomItem_BD', _this.props.fadata.baiduOption.zoomItem ? _this.props.fadata.baiduOption.zoomItem : 18));
        dispatch(_actions.default.setVars('headingItem_BD', _this.props.fadata.baiduOption.headingItem ? _this.props.fadata.baiduOption.headingItem : 0));
        dispatch(_actions.default.setVars('tiltItem_BD', _this.props.fadata.baiduOption.tiltItem ? _this.props.fadata.baiduOption.tiltItem : 60));
        dispatch(_actions.default.setVars('mapTypeItem_BD', _this.props.fadata.baiduOption.mapTypeItem ? _this.props.fadata.baiduOption.mapTypeItem : "normal"));
        dispatch(_actions.default.setVars('StyleItem_BD', _this.props.fadata.baiduOption.StyleItem ? _this.props.fadata.baiduOption.StyleItem : _styleItemBaiduMap.default));
      }

      if (_this.props.fadata && _this.props.fadata.baiduData) {
        dispatch(_actions.default.setLists('layerDataMap_BD', _this.props.fadata.baiduData.layerDataMap));
        dispatch(_actions.default.setLists('standDataPoylon_BD', _this.props.fadata.baiduData.standDataPoylon));
        dispatch(_actions.default.setLists('planeDataPolyLine_BD', _this.props.fadata.baiduData.planeDataPolyLine));
        dispatch(_actions.default.setLists('planeDataPolyGon_BD', _this.props.fadata.baiduData.planeDataPolyGon));
        dispatch(_actions.default.setLists('planeDataMarker_BD', _this.props.fadata.baiduData.planeDataMarker));
        dispatch(_actions.default.setLists('planeDataLabel_BD', _this.props.fadata.baiduData.planeDataLabel));
        dispatch(_actions.default.setLists('planeDataCustom_BD', _this.props.fadata.baiduData.planeDataCustom));
        dispatch(_actions.default.setLists('planeDataCricle_BD', _this.props.fadata.baiduData.planeDataCricle));
      }

      dispatch(_actions.default.setVars('isDeveloperEditProp_BD', _this.props.fadata && _this.props.fadata.isDeveloperEditProp));
      dispatch(_actions.default.setVars('isEditProp_BD', _this.props.fadata && _this.props.fadata.isEditProp));
      dispatch(_actions.default.setVars('resuleFun_BD', _this.props.fadata && _this.props.fadata.resuleFun));
      dispatch(_actions.default.setVars('baiduMapFun_BD', _this.props.fadata && _this.props.fadata.baiduMapFun));
      dispatch(_actions.default.setLists('keyCustomData_BD', _this.props.fadata ? _this.props.fadata.keyCustomData ? _this.props.fadata.keyCustomData : _defaultParame.childrenSelect : _defaultParame.childrenSelect));
      dispatch(_actions.default.setVars('isAnimsmap_BD', _this.props.fadata && _this.props.fadata.isAnimsmap));
      dispatch(_actions.default.setVars('keypatherAnim_BD', _this.props.fadata && _this.props.fadata.keypatherAnim));
      dispatch(_actions.default.setVars('onMapOverClickFun_BD', _this.props.fadata && _this.props.fadata.onMapOverClickFun));
      dispatch(_actions.default.setVars('onMapOverdbClickFun_BD', _this.props.fadata && _this.props.fadata.onMapOverdbClickFun));
      dispatch(_actions.default.setVars('addDataResultFun_BD', _this.props.fadata && _this.props.fadata.addDataResultFun));
      dispatch(_actions.default.setVars('delDataResultFun_BD', _this.props.fadata && _this.props.fadata.delDataResultFun));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Baidumap);

exports.default = _default;