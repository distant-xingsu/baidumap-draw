"use strict";

exports.__esModule = true;
exports.default = void 0;

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _colorType = require("../utils/colorType");

var _randomNumId = _interopRequireDefault(require("../utils/randomNumId"));

var _delModal = require("../utils/delModal");

var _actions = _interopRequireDefault(require("../redux/actions"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PlaneLine = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PlaneLine, _React$Component);

  // load
  function PlaneLine(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.timer = undefined;
    _this2.state = {};
    return _this2;
  }

  var _proto = PlaneLine.prototype;

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

    if (this.props.isPolyLine !== prevProps.isPolyLine) {
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
      type: 'planeDataPolyLine'
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
      type: 'planeDataPolyLine'
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
      type: 'planeDataPolyLine'
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
      type: 'planeDataPolyLine'
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
        planeDataPolyLine = _this$props5.planeDataPolyLine,
        map = _this$props5.map,
        isEnableDragging = _this$props5.isEnableDragging; //传过来的数据

    var getOverlay = map.getOverlays();

    if (getOverlay) {
      for (var i = 0; i < getOverlay.length; i++) {
        var newtype = getOverlay[i]._config ? getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' : '';

        if (newtype === 'planeDataPolyLineRoot') {
          map.removeOverlay(getOverlay[i]);
        }
      }
    }

    if (planeDataPolyLine) {
      var _loop = function _loop(_i) {
        var item = planeDataPolyLine[_i];
        var itemindex = _i;
        var itemshow = item.show ? item.show : true;

        if (item.data && itemshow) {
          var newdata = []; // 数据

          var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
          var newstrokeColor = item.style ? item.style.strokeColor ? (0, _colorType.hexify)(item.style.strokeColor) : "#00c5ff" : "#00c5ff"; // 描边颜色

          var newsstrokeOpacity = item.style ? item.style.strokeColor ? (0, _colorType.getRgbaAlp)(item.style.strokeColor) : 1.0 : 1.0; // 描边透明度

          var newsstrokeStyle = item.style ? item.style.strokeStyle ? item.style.strokeStyle : 'solid' : 'solid'; //"solid" | "dashed" | "dotted"

          var newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

          for (var j = 0; j < item.data.length; j++) {
            var resuitem = item.data[j];
            var point = new BMapGL.Point(resuitem[0], resuitem[1]);
            newdata.push(point);
          }

          var newdom = new BMapGL.Polyline(newdata, {
            domid: newsdomid,
            domtype: 'planeDataPolyLineRoot',
            //自定义类型
            domindex: itemindex,
            strokeColor: newstrokeColor,
            strokeOpacity: newsstrokeOpacity,
            strokeStyle: newsstrokeStyle,
            strokeWeight: newsstrokeWeight,
            enableEditing: false,
            //可编辑
            geodesic: false //大地线

          });
          map.addOverlay(newdom);

          if (isEnableDragging) {
            // 双击事件 双击删除
            newdom.addEventListener('dblclick', function (e) {
              return _this3.delDataResultFun(e, newsdomid, item, itemindex, newdom);
            }, false); // 单击事件 单击编辑
            // newdom.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
          } else {
            // 双击事件
            if (item.isDbClick) {
              newdom.addEventListener('dblclick', function (e) {
                return _this3.onMouseDbFun(e, newsdomid, item, itemindex);
              }, false);
            } // 单击事件


            if (item.isClick) {
              newdom.addEventListener('click', function (e) {
                return _this3.onMouseClickFun(e, newsdomid, item, itemindex);
              }, false);
            }
          }
        }
      };

      for (var _i = 0; _i < planeDataPolyLine.length || 0; _i++) {
        _loop(_i);
      }
    }
  } // 添加
  ;

  _proto.creatAdd = function creatAdd() {
    var _this4 = this;

    var _this$props6 = this.props,
        planeDataPolyLine = _this$props6.planeDataPolyLine,
        map = _this$props6.map,
        isEnableDragging = _this$props6.isEnableDragging; //传过来的数据

    var newplaneDataPolyLine = planeDataPolyLine ? planeDataPolyLine[planeDataPolyLine.length - 1] : '';

    if (newplaneDataPolyLine) {
      var item = newplaneDataPolyLine;
      var itemindex = planeDataPolyLine.length - 1;
      var itemshow = item.show ? item.show : true;

      if (item.data && itemshow) {
        var newdata = []; // 数据

        var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
        var newstrokeColor = item.style ? item.style.strokeColor ? (0, _colorType.hexify)(item.style.strokeColor) : "#00c5ff" : "#00c5ff"; // 描边颜色

        var newsstrokeOpacity = item.style ? item.style.strokeColor ? (0, _colorType.getRgbaAlp)(item.style.strokeColor) : 1.0 : 1.0; // 描边透明度

        var newsstrokeStyle = item.style ? item.style.strokeStyle ? item.style.strokeStyle : 'solid' : 'solid'; //"solid" | "dashed" | "dotted"

        var newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

        for (var j = 0; j < item.data.length; j++) {
          var resuitem = item.data[j];
          var point = new BMapGL.Point(resuitem[0], resuitem[1]);
          newdata.push(point);
        }

        var newdom = new BMapGL.Polyline(newdata, {
          domid: newsdomid,
          domtype: 'planeDataPolyLineRoot',
          //自定义类型
          domindex: itemindex,
          strokeColor: newstrokeColor,
          strokeOpacity: newsstrokeOpacity,
          strokeStyle: newsstrokeStyle,
          strokeWeight: newsstrokeWeight,
          enableEditing: false,
          //可编辑
          geodesic: false //大地线

        });
        map.addOverlay(newdom);

        if (isEnableDragging) {
          // 双击事件 双击删除
          newdom.addEventListener('dblclick', function (e) {
            return _this4.delDataResultFun(e, newsdomid, item, itemindex, newdom);
          }, false); // 单击事件 单击编辑
          // newdom.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
        } else {
          // 双击事件
          if (item.isDbClick) {
            newdom.addEventListener('dblclick', function (e) {
              return _this4.onMouseDbFun(e, newsdomid, item, itemindex);
            }, false);
          } // 单击事件


          if (item.isClick) {
            newdom.addEventListener('click', function (e) {
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

  return PlaneLine;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setdata: function setdata(_this, data) {
      dispatch(_actions.default.removeItem('planeDataPolyLine_BD', data.itemindex));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PlaneLine);

exports.default = _default;