"use strict";

exports.__esModule = true;
exports.default = void 0;

var _button = _interopRequireDefault(require("antd/es/button"));

var _switch = _interopRequireDefault(require("antd/es/switch"));

var _input = _interopRequireDefault(require("antd/es/input"));

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

require("../../assest/css/baidumap.css");

var _reactColor = require("react-color");

var _componutils = require("../../utils/componutils");

var _colorType = require("../../utils/colorType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import actions from "../redux/actions";
var G3dPCREdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(G3dPCREdit, _React$Component);

  // load
  function G3dPCREdit(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.state = {
      isColorShow: false,
      // 是否显示颜色调试器
      isColorShowName: '',
      // 颜色调试器 （类型）名称
      colorData: '',
      // 颜色数据

      /* ************ ---------添加时候的缓存区域--------- ************************/
      add3dPolyData: {
        height: 20,
        isClick: false,
        isDbClick: false,
        name: '',
        style: {
          topFillColor: 'rgba(0,197,255,1)',
          sideFillColor: 'rgba(25,82,102,1)'
        }
      }
    };
    return _this2;
  } // in


  var _proto = G3dPCREdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this); // ref

    this.props.onRef && this.props.onRef(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加3d高级多边形数据
  ;

  _proto.add3dplanyDataFun = function add3dplanyDataFun(type) {
    var _this$props = this.props,
        map = _this$props.map,
        resultMapView = _this$props.resultMapView;
    var fatherData = this.props.add3dPolyData;
    var chicerData = this.state.add3dPolyData;
    var newCircledata = Object.assign(this.props.add3dPolyData, this.state.add3dPolyData);

    if (type === 1) {
      if (fatherData.data.length === 0) {
        _message2.default.warning('请先选取坐标！');

        return;
      }

      if (chicerData.name.trim() === '' || chicerData.name.trim() == null) {
        _message2.default.warning('请填写建筑物名称！');

        return;
      }

      if (fatherData.info) {
        map.removeOverlay(fatherData.info);
      }

      resultMapView(1, 'G3dpolygon', newCircledata);
    } else if (type === 2) {
      if (fatherData.info) {
        map.removeOverlay(fatherData.info);
      }

      chicerData.name = '';
      chicerData.isClick = false;
      chicerData.isDbClick = false;
      chicerData.height = 20;
      chicerData.style = {
        topFillColor: 'rgba(0,197,255,1)',
        sideFillColor: 'rgba(25,82,102,1)'
      };
      this.setState({
        add3dPolyData: chicerData,
        isColorShow: false,
        isColorShowName: '',
        colorData: ''
      });
      resultMapView(2, 'G3dpolygon');
    }
  } // 更改
  ;

  _proto.upDataFun = function upDataFun(_this, _type, _key) {
    if (_type === 'add3dPolyData') {
      var newobj = Object.assign(_this.props.add3dPolyData, _this.state.add3dPolyData);

      if (newobj.info) {
        if (_key === 'height') {
          newobj.info.setAltitude(newobj[_key]);
        } else if (_key === 'topFillColor') {
          var newtopFillColor = newobj.style ? newobj.style.topFillColor ? (0, _colorType.hexify)(newobj.style[_key]) : "#00c5ff" : "#00c5ff";
          var newtopFillOpacity = newobj.style ? newobj.style.topFillColor ? (0, _colorType.getRgbaAlp)(newobj.style[_key]) : 1.0 : 1.0;
          newobj.info.setTopFillColor(newtopFillColor);
          newobj.info.setTopFillOpacity(newtopFillOpacity);
        } else if (_key === 'sideFillColor') {
          var newsideFillColor = newobj.style ? newobj.style.sideFillColor ? (0, _colorType.hexify)(newobj.style[_key]) : '#195266' : '#195266';
          var newsideFillOpacity = newobj.style ? newobj.style.sideFillColor ? (0, _colorType.getRgbaAlp)(newobj.style[_key]) : 1.0 : 1.0;
          newobj.info.setSideFillColor(newsideFillColor);
          newobj.info.setSideFillOpacity(newsideFillOpacity);
        }
      }
    }
  } // 渲染
  ;

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        isColorShow = _this$state.isColorShow,
        isColorShowName = _this$state.isColorShowName,
        colorData = _this$state.colorData;
    var add3dPolyData = this.state.add3dPolyData;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u9AD8\u5EA6\uFF1A"), /*#__PURE__*/_react.default.createElement(_inputNumber.default, {
      min: 1,
      max: 10000,
      size: "small",
      placeholder: "\u9AD8\u5EA6",
      value: add3dPolyData.height,
      onChange: _componutils.setNewHeight.bind(this, 2)
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: add3dPolyData.name,
      onChange: _componutils.setNamedataFun.bind(this, 'add3dPolyData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u9876\u90E8\u989C\u8272\uFF1A"), isColorShowName === 'topFillColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: add3dPolyData.style.topFillColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'topFillColor', add3dPolyData.style.topFillColor),
      style: {
        background: add3dPolyData.style.topFillColor
      }
    }), isColorShowName === 'topFillColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'add3dPolyData', 'topFillColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'topFillColor', add3dPolyData.style.topFillColor)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'topFillColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u4FA7\u9762\u989C\u8272\uFF1A"), isColorShowName === 'sideFillColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: add3dPolyData.style.sideFillColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'sideFillColor', add3dPolyData.style.sideFillColor),
      style: {
        background: add3dPolyData.style.sideFillColor
      }
    }), isColorShowName === 'sideFillColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'add3dPolyData', 'sideFillColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'sideFillColor', add3dPolyData.style.sideFillColor)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'sideFillColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u70B9\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: add3dPolyData.isClick,
      onChange: _componutils.isClickFun.bind(this, 'add3dPolyData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: add3dPolyData.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'add3dPolyData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.add3dplanyDataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.add3dplanyDataFun(2);
      },
      style: {
        marginLeft: '0.2rem'
      }
    }, "\u53D6\u6D88"), isColorShow && /*#__PURE__*/_react.default.createElement("div", {
      className: "drawingmanagerutil_color"
    }, /*#__PURE__*/_react.default.createElement(_reactColor.ChromePicker, {
      color: colorData,
      onChange: _componutils.setComColorFun.bind(this)
    })));
  };

  return G3dPCREdit;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {// isDeveloperEditProp_BD:state.vars.isDeveloperEditProp_BD,
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    init: function init(_this) {// dispatch(actions.setObjs('coordinateItem_BD',_this.props.coordinateItem))
      // dispatch(actions.setVars('zoomItem_BD',_this.props.zoomItem))
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(G3dPCREdit);

exports.default = _default;