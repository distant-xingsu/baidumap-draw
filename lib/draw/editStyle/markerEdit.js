"use strict";

exports.__esModule = true;
exports.default = void 0;

var _button = _interopRequireDefault(require("antd/es/button"));

var _switch = _interopRequireDefault(require("antd/es/switch"));

var _input = _interopRequireDefault(require("antd/es/input"));

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

var MarkerEdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(MarkerEdit, _React$Component);

  // load
  function MarkerEdit(props) {
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
      addMarkerData: {
        title: '',
        isClick: false,
        isDbClick: false,
        name: '',
        imgSrc: 'simple_red',
        style: {
          color: '#fff',
          borderColor: 'rgba(0,0,0,0)',
          backgroundColor: 'rgba(0,0,0,0)'
        }
      }
    };
    return _this2;
  } // in


  var _proto = MarkerEdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加点数据
  ;

  _proto.addMarkerdataFun = function addMarkerdataFun(type) {
    var _this$props = this.props,
        map = _this$props.map,
        resultMapView = _this$props.resultMapView;
    var fatherData = this.props.addMarkerData;
    var chicerData = this.state.addMarkerData;
    var newCircledata = Object.assign(this.props.addMarkerData, this.state.addMarkerData);

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

      resultMapView(1, 'marker', newCircledata);
    } else if (type === 2) {
      if (fatherData.info) {
        map.removeOverlay(fatherData.info.overlay);
      }

      chicerData.name = '';
      chicerData.title = '';
      chicerData.imgSrc = 'simple_red';
      chicerData.isClick = false;
      chicerData.isDbClick = false;
      chicerData.style = {
        color: '#fff',
        borderColor: 'rgba(0,0,0,0)',
        backgroundColor: 'rgba(0,0,0,0)'
      };
      this.setState({
        addMarkerData: chicerData,
        isColorShow: false,
        isColorShowName: '',
        colorData: ''
      });
      resultMapView(2, 'marker');
    }
  } // 渲染
  ;

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        isColorShow = _this$state.isColorShow,
        isColorShowName = _this$state.isColorShowName,
        colorData = _this$state.colorData;
    var addMarkerData = this.state.addMarkerData;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u56FE\u6807\u7C7B\u578B\uFF1A"), /*#__PURE__*/_react.default.createElement(_select.default, {
      size: 'small',
      style: {
        width: '10rem'
      },
      placeholder: "\u8BF7\u9009\u62E9\u56FE\u6807",
      onChange: _componutils.setMarker.bind(this)
    }, _defaultParame.childrenmarkerSelect && _defaultParame.childrenmarkerSelect.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(Option, {
        key: item.id,
        value: item.title,
        title: item.title
      }, item.title);
    })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u6807\u9898\u5185\u5BB9\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      maxLength: 45,
      value: addMarkerData.title,
      onChange: _componutils.setFontdataFun.bind(this, 'addMarkerData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u80CC\u666F\u989C\u8272\uFF1A"), isColorShowName === 'backgroundColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addMarkerData.style.backgroundColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'backgroundColor', addMarkerData.style.backgroundColor),
      style: {
        background: addMarkerData.style.backgroundColor
      }
    }), isColorShowName === 'backgroundColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addMarkerData', 'backgroundColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'backgroundColor', addMarkerData.style.backgroundColor)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'backgroundColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u6587\u5B57\u989C\u8272\uFF1A"), isColorShowName === 'color' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addMarkerData.style.color
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'color', addMarkerData.style.color),
      style: {
        background: addMarkerData.style.color
      }
    }), isColorShowName === 'color' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addMarkerData', 'color', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'color', addMarkerData.style.color)
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'color' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u8FB9\u6846\u989C\u8272\uFF1A"), isColorShowName === 'borderColor' ? /*#__PURE__*/_react.default.createElement("i", {
      style: {
        background: addMarkerData.style.borderColor
      }
    }) : /*#__PURE__*/_react.default.createElement("i", {
      onClick: _componutils.setColorFun.bind(this, 1, true, 'borderColor'),
      style: {
        background: addMarkerData.style.borderColor
      }
    }), isColorShowName === 'borderColor' ? /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 2, false, 'addMarkerData', 'borderColor', colorData)
    }, "\u9009\u62E9") : /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 1, true, 'borderColor')
    }, "\u6253\u5F00"), isColorShow && isColorShowName === 'borderColor' && /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_classBtn",
      onClick: _componutils.setColorFun.bind(this, 3, false)
    }, "\u53D6\u6D88"), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: addMarkerData.name,
      onChange: _componutils.setNamedataFun.bind(this, 'addMarkerData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u70B9\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addMarkerData.isClick,
      onChange: _componutils.isClickFun.bind(this, 'addMarkerData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addMarkerData.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'addMarkerData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.addMarkerdataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.addMarkerdataFun(2);
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

  return MarkerEdit;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MarkerEdit);

exports.default = _default;