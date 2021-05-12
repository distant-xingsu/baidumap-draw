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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import actions from "../redux/actions";
var Option = _select.default.Option;

var PolylineEdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PolylineEdit, _React$Component);

  // load
  function PolylineEdit(props) {
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
      addPolylineData: {
        isClick: false,
        isDbClick: false,
        name: '',
        style: {
          strokeColor: 'rgba(0,197,255,1)',
          strokeStyle: 'solid',
          strokeWeight: 2
        }
      }
    };
    return _this2;
  } // in


  var _proto = PolylineEdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加线数据
  ;

  _proto.addPolylinedataFun = function addPolylinedataFun(type) {
    var _this$props = this.props,
        map = _this$props.map,
        resultMapView = _this$props.resultMapView;
    var fatherData = this.props.addPolylineData;
    var chicerData = this.state.addPolylineData;
    var newPolylinedata = Object.assign(this.props.addPolylineData, this.state.addPolylineData);

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
        map.removeOverlay(fatherData.info.overlay);
      }

      resultMapView(1, 'polyline', newPolylinedata);
    } else if (type === 2) {
      if (fatherData.info) {
        map.removeOverlay(fatherData.info.overlay);
      }

      chicerData.name = '';
      chicerData.isClick = false;
      chicerData.isDbClick = false;
      chicerData.style = {
        strokeColor: 'rgba(0,197,255,1)',
        strokeStyle: 'solid',
        strokeWeight: 2
      };
      this.setState({
        addPolylineData: chicerData,
        isColorShow: false,
        isColorShowName: '',
        colorData: ''
      });
      resultMapView(2, 'polyline');
    }
  } // 渲染
  ;

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        isColorShow = _this$state.isColorShow,
        isColorShowName = _this$state.isColorShowName,
        colorData = _this$state.colorData;
    var addPolylineData = this.state.addPolylineData;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u7C7B\u578B\uFF1A"), /*#__PURE__*/_react.default.createElement(_select.default, {
      size: 'small',
      style: {
        width: '10rem'
      },
      placeholder: "\u8BF7\u9009\u62E9",
      defaultValue: 'solid',
      onChange: _componutils.setBorderType.bind(this, 'addPolylineData')
    }, _defaultParame.childrencircleSelect && _defaultParame.childrencircleSelect.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(Option, {
        key: item.id,
        value: item.title,
        title: item.title
      }, item.title);
    })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u989C\u8272\uFF1A"), isColorShowName === 'strokeColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addPolylineData.style.strokeColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'strokeColor', addPolylineData.style.strokeColor),
      style: {
        background: addPolylineData.style.strokeColor
      }
    }), isColorShowName === 'strokeColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addPolylineData', 'strokeColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'strokeColor', addPolylineData.style.strokeColor)
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
      value: addPolylineData.style.strokeWeight,
      onChange: _componutils.setWidthdataFun.bind(this, 'addPolylineData', 'strokeWeight')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: addPolylineData.name,
      onChange: _componutils.setNamedataFun.bind(this, 'addPolylineData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u5355\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addPolylineData.isClick,
      onChange: _componutils.isClickFun.bind(this, 'addPolylineData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addPolylineData.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'addPolylineData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.addPolylinedataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.addPolylinedataFun(2);
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

  return PolylineEdit;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {// isDeveloperEditProp_BD:state.vars.isDeveloperEditProp_BD,
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    init: function init(_this) {// dispatch(actions.setObjs('coordinateItem_BD',_this.props.coordinateItem))
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PolylineEdit);

exports.default = _default;