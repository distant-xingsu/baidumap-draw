"use strict";

exports.__esModule = true;
exports.default = void 0;

var _button = _interopRequireDefault(require("antd/es/button"));

var _switch = _interopRequireDefault(require("antd/es/switch"));

var _input = _interopRequireDefault(require("antd/es/input"));

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

require("../../assest/css/baidumap.css");

var _reactColor = require("react-color");

var _componutils = require("../../utils/componutils");

var _defaultParame = require("../../utils/defaultParame");

var _colorType = require("../../utils/colorType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import actions from "../redux/actions";
var Option = _select.default.Option;

var PolygonAndRectangleEdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PolygonAndRectangleEdit, _React$Component);

  // load
  function PolygonAndRectangleEdit(props) {
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
      addPolygonData: {
        isClick: false,
        isDbClick: false,
        name: '',
        style: {
          strokeColor: 'rgba(0,197,255,1)',
          fillColor: 'rgba(0,197,255,1)',
          strokeStyle: 'solid',
          strokeWeight: 2
        }
      }
    };
    return _this2;
  } // in


  var _proto = PolygonAndRectangleEdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this); // ref

    this.props.onRef && this.props.onRef(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加多边形数据
  ;

  _proto.addPolygondataFun = function addPolygondataFun(type) {
    var _this$props = this.props,
        map = _this$props.map,
        resultMapView = _this$props.resultMapView;
    var fatherData = this.props.addPolygonData;
    var chicerData = this.state.addPolygonData;
    var newCircledata = Object.assign(this.props.addPolygonData, this.state.addPolygonData);

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

      resultMapView(1, 'polygon', newCircledata);
    } else if (type === 2) {
      if (fatherData.info) {
        map.removeOverlay(fatherData.info);
      }

      chicerData.name = '';
      chicerData.isClick = false;
      chicerData.isDbClick = false;
      chicerData.style = {
        strokeColor: 'rgba(0,197,255,1)',
        fillColor: 'rgba(0,197,255,1)',
        strokeStyle: 'solid',
        strokeWeight: 2
      };
      this.setState({
        addPolygonData: chicerData,
        isColorShow: false,
        isColorShowName: '',
        colorData: ''
      });
      resultMapView(2, 'polygon');
    }
  } // 更改
  ;

  _proto.upDataFun = function upDataFun(_this, _type, _key) {
    if (_type === 'addPolygonData') {
      var newobj = Object.assign(_this.props.addPolygonData, _this.state.addPolygonData);

      if (newobj.info) {
        if (_key === 'strokeStyle') {
          var color1 = newobj.info.getStrokeColor();
          newobj.info.setStrokeStyle(newobj.style[_key]);
          newobj.info.setStrokeColor('#000');
          setTimeout(function () {
            newobj.info.setStrokeColor(color1);
          }, 0);
        } else if (_key === 'strokeWeight') {
          newobj.info.setStrokeWeight(newobj.style[_key]);
        } else if (_key === 'strokeColor') {
          var newstrokeColor = newobj.style ? newobj.style.strokeColor ? (0, _colorType.hexify)(newobj.style[_key]) : '#195266' : '#195266';
          var newstrokeColorOpacity = newobj.style ? newobj.style.strokeColor ? (0, _colorType.getRgbaAlp)(newobj.style[_key]) : 1.0 : 1.0;
          newobj.info.setStrokeColor(newstrokeColor);
          newobj.info.setStrokeOpacity(newstrokeColorOpacity);
        } else if (_key === 'fillColor') {
          var newFillColor = newobj.style ? newobj.style.fillColor ? (0, _colorType.hexify)(newobj.style[_key]) : "#00c5ff" : "#00c5ff";
          var newFillOpacity = newobj.style ? newobj.style.fillColor ? (0, _colorType.getRgbaAlp)(newobj.style[_key]) : 1.0 : 1.0;
          newobj.info.setFillColor(newFillColor);
          newobj.info.setFillOpacity(newFillOpacity);
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
    var addPolygonData = this.state.addPolygonData;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u6846\u7C7B\u578B\uFF1A"), /*#__PURE__*/_react.default.createElement(_select.default, {
      size: 'small',
      style: {
        width: '10rem'
      },
      placeholder: "\u8BF7\u9009\u62E9",
      defaultValue: 'solid',
      onChange: _componutils.setBorderType.bind(this, 'addPolygonData')
    }, _defaultParame.childrencircleSelect && _defaultParame.childrencircleSelect.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(Option, {
        key: item.id,
        value: item.title,
        title: item.title
      }, item.title);
    })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u80CC\u666F\u989C\u8272\uFF1A"), isColorShowName === 'fillColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addPolygonData.style.fillColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'fillColor', addPolygonData.style.fillColor),
      style: {
        background: addPolygonData.style.fillColor
      }
    }), isColorShowName === 'fillColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addPolygonData', 'fillColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'fillColor', addPolygonData.style.fillColor)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'fillColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u6846\u989C\u8272\uFF1A"), isColorShowName === 'strokeColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addPolygonData.style.strokeColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'strokeColor', addPolygonData.style.strokeColor),
      style: {
        background: addPolygonData.style.strokeColor
      }
    }), isColorShowName === 'strokeColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addPolygonData', 'strokeColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'strokeColor', addPolygonData.style.strokeColor)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'strokeColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u5BBD\u5EA6\uFF1A"), /*#__PURE__*/_react.default.createElement(_inputNumber.default, {
      style: {
        width: '5rem'
      },
      size: "small",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      min: 1,
      max: 200,
      value: addPolygonData.style.strokeWeight,
      onChange: _componutils.setWidthdataFun.bind(this, 'addPolygonData', 'strokeWeight')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: addPolygonData.name,
      onChange: _componutils.setNamedataFun.bind(this, 'addPolygonData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u70B9\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addPolygonData.isClick,
      onChange: _componutils.isClickFun.bind(this, 'addPolygonData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addPolygonData.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'addPolygonData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.addPolygondataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.addPolygondataFun(2);
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

  return PolygonAndRectangleEdit;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PolygonAndRectangleEdit);

exports.default = _default;