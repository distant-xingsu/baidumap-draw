"use strict";

exports.__esModule = true;
exports.default = void 0;

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _randomNumId = _interopRequireDefault(require("../utils/randomNumId"));

var _delModal = require("../utils/delModal");

var _actions = _interopRequireDefault(require("../redux/actions"));

var _reactRedux = require("react-redux");

var _CustomOverlayDom = _interopRequireDefault(require("../utils/CustomOverlayDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PlaneCustom = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PlaneCustom, _React$Component);

  // load
  function PlaneCustom(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.timer = undefined;
    _this2.state = {};
    return _this2;
  }

  var _proto = PlaneCustom.prototype;

  // in
  _proto.componentDidMount = function componentDidMount() {
    this.creat();
  };

  // up
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    // 典型用法（不要忘记比较 props）：
    if (this.props.isEnableDragging !== prevProps.isEnableDragging) {
      this.creat();
    }

    if (this.props.isCustom !== prevProps.isCustom) {
      this.creatAdd();
    }
  } // out
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {} // 单击编辑
  ;

  _proto.editDataResultFun = function editDataResultFun(e, id, item, itemindex) {
    var _this$props = this.props,
        map = _this$props.map,
        editDataResultFun = _this$props.editDataResultFun;
    var postdata = {
      id: id,
      item: item,
      map: map,
      itemindex: itemindex,
      type: 'planeDataCustom'
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function () {
      editDataResultFun && editDataResultFun(e, postdata);
    }, 300);
  } // 双击删除事件
  ;

  _proto.delDataResultFun = function delDataResultFun(e, id, item, itemindex, info) {
    var _this$props2 = this.props,
        map = _this$props2.map,
        delDataResultFun = _this$props2.delDataResultFun,
        setdata = _this$props2.setdata;

    var _this = this;

    var postdata = {
      id: id,
      item: item,
      map: map,
      itemindex: itemindex,
      type: 'planeDataCustom'
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    (0, _delModal.showDeleteConfirm1)(function () {
      map.removeOverlay(info);
      setdata(_this, postdata);
      delDataResultFun && delDataResultFun(e, postdata);

      _message2.default.success('删除成功！');
    }, function () {
      _message2.default.info('取消删除！');
    });
  } // 鼠标双击事件
  ;

  _proto.onMouseDbFun = function onMouseDbFun(e, id, item, itemindex) {
    var _this$props3 = this.props,
        map = _this$props3.map,
        onMapdbClickFun = _this$props3.onMapdbClickFun;
    var postdata = {
      id: id,
      item: item,
      map: map,
      itemindex: itemindex,
      type: 'planeDataCustom'
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    onMapdbClickFun && onMapdbClickFun(e, postdata);
  } // 鼠标单击事件
  ;

  _proto.onMouseClickFun = function onMouseClickFun(e, id, item, itemindex) {
    var _this$props4 = this.props,
        map = _this$props4.map,
        onMapClickFun = _this$props4.onMapClickFun;
    var postdata = {
      id: id,
      item: item,
      map: map,
      itemindex: itemindex,
      type: 'planeDataCustom'
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function () {
      onMapClickFun && onMapClickFun(e, postdata);
    }, 300);
  } // 创建 line（click dblclick mouseover mousemove mouseout）
  ;

  _proto.creat = function creat() {
    var _this3 = this;

    var _this$props5 = this.props,
        planeDataCustom = _this$props5.planeDataCustom,
        map = _this$props5.map,
        isEnableDragging = _this$props5.isEnableDragging; //传过来的数据

    var getOverlay = map.getOverlays();

    if (getOverlay) {
      for (var i = 0; i < getOverlay.length; i++) {
        var newtype = getOverlay[i]._config ? getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' : '';

        if (newtype === 'planeDataCustomRoot') {
          map.removeOverlay(getOverlay[i]);
        }
      }
    }

    if (planeDataCustom) {
      var _loop = function _loop(_i) {
        var item = planeDataCustom[_i];
        var itemindex = _i;
        var itemshow = item.show ? item.show : true;

        if (item.data && itemshow) {
          var newdata = new BMapGL.Point(item.data[0], item.data[1]);
          var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
          var olddom = item.style ? item.style.dom ? item.style.dom : '' : '';
          var oldcolor = item.style ? item.style.color ? item.style.color : '#fff' : '#fff';
          var newdom = new _CustomOverlayDom.default(newdata, {
            html: /*#__PURE__*/_react.default.createElement("div", {
              id: newsdomid,
              style: {
                textAlign: 'center'
              }
            }, /*#__PURE__*/_react.default.createElement("div", {
              dangerouslySetInnerHTML: {
                __html: olddom
              }
            }), item.title && /*#__PURE__*/_react.default.createElement("span", {
              style: {
                color: oldcolor
              }
            }, item.title)),
            config: {
              domtype: 'planeDataCustomRoot',
              domid: newsdomid
            }
          });
          map.addOverlay(newdom);

          newdom._div.addEventListener('mousedown', function () {
            newdom._div.style.cursor = 'grabbing';
          });

          newdom._div.addEventListener('mouseup', function () {
            newdom._div.style.cursor = 'pointer';
          });

          if (isEnableDragging) {
            // 双击事件 双击删除
            newdom._div.addEventListener('dblclick', function (e) {
              return _this3.delDataResultFun(e, newsdomid, item, itemindex, newdom);
            }, false); // 单击事件 单击编辑
            // newdom._div.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);

          } else {
            // 双击事件
            if (item.isDbClick) {
              newdom._div.addEventListener('dblclick', function (e) {
                return _this3.onMouseDbFun(e, newsdomid, item, itemindex);
              }, false);
            } // 单击事件


            if (item.isClick) {
              newdom._div.addEventListener('click', function (e) {
                return _this3.onMouseClickFun(e, newsdomid, item, itemindex);
              }, false);
            }
          }
        }
      };

      for (var _i = 0; _i < planeDataCustom.length || 0; _i++) {
        _loop(_i);
      }
    }
  } // 添加
  ;

  _proto.creatAdd = function creatAdd() {
    var _this4 = this;

    var _this$props6 = this.props,
        planeDataCustom = _this$props6.planeDataCustom,
        map = _this$props6.map,
        isEnableDragging = _this$props6.isEnableDragging; //传过来的数据

    var newplaneDataCustom = planeDataCustom ? planeDataCustom[planeDataCustom.length - 1] : '';

    if (newplaneDataCustom) {
      var item = newplaneDataCustom;
      var itemindex = planeDataCustom.length - 1;
      var itemshow = item.show ? item.show : true;

      if (item.data && itemshow) {
        var newdata = new BMapGL.Point(item.data[0], item.data[1]);
        var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
        var olddom = item.style ? item.style.dom ? item.style.dom : '' : '';
        var oldcolor = item.style ? item.style.color ? item.style.color : '#fff' : '#fff';
        var newdom = new _CustomOverlayDom.default(newdata, {
          html: /*#__PURE__*/_react.default.createElement("div", {
            id: newsdomid,
            style: {
              textAlign: 'center'
            }
          }, /*#__PURE__*/_react.default.createElement("div", {
            dangerouslySetInnerHTML: {
              __html: olddom
            }
          }), item.title && /*#__PURE__*/_react.default.createElement("span", {
            style: {
              color: oldcolor
            }
          }, item.title)),
          config: {
            domtype: 'planeDataCustomRoot',
            domid: newsdomid
          }
        });
        map.addOverlay(newdom);

        newdom._div.addEventListener('mousedown', function () {
          newdom._div.style.cursor = 'grabbing';
        });

        newdom._div.addEventListener('mouseup', function () {
          newdom._div.style.cursor = 'pointer';
        });

        if (isEnableDragging) {
          // 双击事件 双击删除
          newdom._div.addEventListener('dblclick', function (e) {
            return _this4.delDataResultFun(e, newsdomid, item, itemindex, newdom);
          }, false); // 单击事件 单击编辑
          // newdom._div.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);

        } else {
          // 双击事件
          if (item.isDbClick) {
            newdom._div.addEventListener('dblclick', function (e) {
              return _this4.onMouseDbFun(e, newsdomid, item, itemindex);
            }, false);
          } // 单击事件


          if (item.isClick) {
            newdom._div.addEventListener('click', function (e) {
              return _this4.onMouseClickFun(e, newsdomid, item, itemindex);
            }, false);
          }
        }
      }
    }
  } // 不需要渲染
  ;

  _proto.render = function render() {
    return null;
  };

  return PlaneCustom;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    planeDataCustom_BD: state.lists.planeDataCustom_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setdata: function setdata(_this, data) {
      dispatch(_actions.default.removeItem('planeDataCustom_BD', data.itemindex));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PlaneCustom);

exports.default = _default;