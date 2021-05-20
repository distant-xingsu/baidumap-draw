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

var _componutils = require("../../utils/componutils");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import actions from "../redux/actions";
var Option = _select.default.Option;

var CustomEdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CustomEdit, _React$Component);

  // load
  function CustomEdit(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.state = {
      /* ************ ---------添加时候的缓存区域--------- ************************/
      addCustomOverlaydata: {
        isClick: false,
        isDbClick: false,
        name: '',
        style: {
          dom: ''
        }
      }
    };
    return _this2;
  } // in


  var _proto = CustomEdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this); // ref

    this.props.onRef && this.props.onRef(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加覆盖物数据
  ;

  _proto.addCustomdataFun = function addCustomdataFun(type) {
    var _this$props = this.props,
        map = _this$props.map,
        resultMapView = _this$props.resultMapView;
    var fatherData = this.props.addCustomOverlaydata;
    var chicerData = this.state.addCustomOverlaydata;
    var newCircledata = Object.assign(this.props.addCustomOverlaydata, this.state.addCustomOverlaydata);

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

      resultMapView(1, 'custom', newCircledata);
    } else if (type === 2) {
      if (fatherData.info) {
        map.removeOverlay(fatherData.info);
      }

      chicerData.name = '';
      chicerData.isClick = false;
      chicerData.isDbClick = false;
      chicerData.style = {
        dom: ''
      };
      this.setState({
        addCustomOverlaydata: chicerData
      });
      resultMapView(2, 'custom');
    }
  } // 更改
  ;

  _proto.upDataFun = function upDataFun(_this, _type, _key) {
    if (_type === 'addCustomOverlaydata') {
      var newobj = Object.assign(_this.props.addCustomOverlaydata, _this.state.addCustomOverlaydata);

      if (newobj.info) {
        if (_key === 'dom') {
          (0, _jquery.default)(newobj.info._div).html(newobj.style[_key]);
        }
      }
    }
  } // 渲染
  ;

  _proto.render = function render() {
    var _this3 = this;

    var addCustomOverlaydata = this.state.addCustomOverlaydata;
    var keyCustomData_BD = this.props.keyCustomData_BD;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u80CC\u666F\u7C7B\u578B\uFF1A"), /*#__PURE__*/_react.default.createElement(_select.default, {
      size: 'small',
      style: {
        width: '10rem'
      },
      placeholder: "\u8BF7\u9009\u62E9\u56FE\u7247",
      onChange: _componutils.setCustom.bind(this)
    }, keyCustomData_BD && keyCustomData_BD.map(function (item, index) {
      return /*#__PURE__*/_react.default.createElement(Option, {
        key: index,
        value: item.dom,
        title: item.title
      }, item.title, " ", /*#__PURE__*/_react.default.createElement("img", {
        src: item.img,
        style: {
          width: '1.5em',
          height: '1.5em',
          border: '1px solid #999',
          borderRadius: '4px',
          marginLeft: '1.1em'
        },
        alt: 'logo'
      }));
    })), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: addCustomOverlaydata.name,
      onChange: _componutils.setNamedataFun.bind(this, 'addCustomOverlaydata')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u70B9\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addCustomOverlaydata.isClick,
      onChange: _componutils.isClickFun.bind(this, 'addCustomOverlaydata')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: addCustomOverlaydata.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'addCustomOverlaydata')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.addCustomdataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.addCustomdataFun(2);
      },
      style: {
        marginLeft: '0.2rem'
      }
    }, "\u53D6\u6D88"));
  };

  return CustomEdit;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    keyCustomData_BD: state.lists.keyCustomData_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    init: function init(_this) {// dispatch(actions.setObjs('coordinateItem_BD',_this.props.coordinateItem))
      // dispatch(actions.setVars('zoomItem_BD',_this.props.zoomItem))
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomEdit);

exports.default = _default;