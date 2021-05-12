"use strict";

exports.__esModule = true;
exports.default = void 0;

var _button = _interopRequireDefault(require("antd/es/button"));

var _switch = _interopRequireDefault(require("antd/es/switch"));

var _input = _interopRequireDefault(require("antd/es/input"));

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _componutils = require("../../utils/componutils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import actions from "../redux/actions";
var M3dPCREdit = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(M3dPCREdit, _React$Component);

  // load
  function M3dPCREdit(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.state = {
      /* ************ ---------添加时候的缓存区域--------- ************************/
      add3dData: {
        height: 20,
        isClick: false,
        isDbClick: false,
        name: ''
      }
    };
    return _this2;
  } // in


  var _proto = M3dPCREdit.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this);
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {} // 添加3d图层数据
  ;

  _proto.add3dDataFun = function add3dDataFun(type) {} // 渲染
  ;

  _proto.render = function render() {
    var _this3 = this;

    var add3dData = this.state.add3dData;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u9AD8\u5EA6\uFF1A"), /*#__PURE__*/_react.default.createElement(_inputNumber.default, {
      min: 1,
      max: 10000,
      size: "small",
      placeholder: "\u9AD8\u5EA6",
      value: add3dData.height,
      onChange: _componutils.setNewHeight.bind(this, 1)
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u5EFA\u7B51\u7269\u540D\u79F0\uFF1A"), /*#__PURE__*/_react.default.createElement(_input.default, {
      style: {
        width: '10rem'
      },
      size: "small",
      placeholder: "\u540D\u79F0",
      maxLength: 45,
      value: add3dData.name,
      onChange: _componutils.setNamedataFun.bind(this, 'add3dData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u70B9\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: add3dData.isClick,
      onChange: _componutils.isClickFun.bind(this, 'add3dData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "\u662F\u5426\u5F00\u542F\u53CC\u51FB\u529F\u80FD\uFF1A"), /*#__PURE__*/_react.default.createElement(_switch.default, {
      checkedChildren: "\u5F00\u542F",
      unCheckedChildren: "\u5173\u95ED",
      checked: add3dData.isDbClick,
      onChange: _componutils.isDbClickFun.bind(this, 'add3dData')
    }), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      size: 'small',
      onClick: function onClick() {
        return _this3.add3dDataFun(1);
      }
    }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "primary",
      danger: true,
      size: 'small',
      onClick: function onClick() {
        return _this3.add3dDataFun(2);
      },
      style: {
        marginLeft: '0.2rem'
      }
    }, "\u53D6\u6D88"));
  };

  return M3dPCREdit;
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

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(M3dPCREdit);

exports.default = _default;