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

var PlaneCricle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PlaneCricle, _React$Component);

  // load
  function PlaneCricle(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.timer = undefined;
    _this2.state = {};
    return _this2;
  }

  var _proto = PlaneCricle.prototype;

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

    if (this.props.isPolyCricle !== prevProps.isPolyCricle) {
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
      type: 'planeDataCricle'
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
      type: 'planeDataCricle'
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
      type: 'planeDataCricle'
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
      type: 'planeDataCricle'
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
        planeDataCricle = _this$props5.planeDataCricle,
        map = _this$props5.map,
        isEnableDragging = _this$props5.isEnableDragging; //传过来的数据

    var getOverlay = map.getOverlays();

    if (getOverlay) {
      for (var i = 0; i < getOverlay.length; i++) {
        var newtype = getOverlay[i]._config ? getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' : '';

        if (newtype === 'planeDataCricleRoot') {
          map.removeOverlay(getOverlay[i]);
        }
      }
    }

    if (planeDataCricle) {
      var _loop = function _loop(_i) {
        var item = planeDataCricle[_i];
        var itemindex = _i;
        var itemshow = item.show ? item.show : true;

        if (item.data && itemshow) {
          var newdata = new BMapGL.Point(item.data[0], item.data[1]);
          var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
          var newstrokeColor = item.style ? item.style.strokeColor ? (0, _colorType.hexify)(item.style.strokeColor) : "#00c5ff" : "#00c5ff"; // 描边颜色

          var newsstrokeOpacity = item.style ? item.style.strokeColor ? (0, _colorType.getRgbaAlp)(item.style.strokeColor) : 1.0 : 1.0; // 描边透明度

          var newsstrokeStyle = item.style ? item.style.strokeStyle ? item.style.strokeStyle : 'solid' : 'solid'; //"solid" | "dashed" | "dotted"

          var newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

          var newfillColor = item.style ? item.style.fillColor ? (0, _colorType.hexify)(item.style.fillColor) : '#00c5ff' : '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"

          var newfillOpacity = item.style ? item.style.fillColor ? (0, _colorType.getRgbaAlp)(item.style.fillColor) : 1.0 : 1.0; // 面填充的透明度，范围0-1

          var newdom = new BMapGL.Circle(newdata, item.radius ? item.radius : 100, {
            domid: newsdomid,
            domtype: 'planeDataCricleRoot',
            //自定义类型
            domindex: itemindex,
            strokeColor: newstrokeColor,
            strokeOpacity: newsstrokeOpacity,
            strokeStyle: newsstrokeStyle,
            strokeWeight: newsstrokeWeight,
            fillColor: newfillColor,
            fillOpacity: newfillOpacity,
            enableEditing: false //可编辑

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

      for (var _i = 0; _i < planeDataCricle.length || 0; _i++) {
        _loop(_i);
      }
    }
  } // 添加
  ;

  _proto.creatAdd = function creatAdd() {
    var _this4 = this;

    var _this$props6 = this.props,
        planeDataCricle = _this$props6.planeDataCricle,
        map = _this$props6.map,
        isEnableDragging = _this$props6.isEnableDragging; //传过来的数据

    var newplaneDataCricle = planeDataCricle ? planeDataCricle[planeDataCricle.length - 1] : '';

    if (newplaneDataCricle) {
      var item = newplaneDataCricle;
      var itemindex = planeDataCricle.length - 1;
      var itemshow = item.show ? item.show : true;

      if (item.data && itemshow) {
        var newdata = new BMapGL.Point(item.data[0], item.data[1]);
        var newsdomid = item.id ? item.id : (0, _randomNumId.default)();
        var newstrokeColor = item.style ? item.style.strokeColor ? (0, _colorType.hexify)(item.style.strokeColor) : "#00c5ff" : "#00c5ff"; // 描边颜色

        var newsstrokeOpacity = item.style ? item.style.strokeColor ? (0, _colorType.getRgbaAlp)(item.style.strokeColor) : 1.0 : 1.0; // 描边透明度

        var newsstrokeStyle = item.style ? item.style.strokeStyle ? item.style.strokeStyle : 'solid' : 'solid'; //"solid" | "dashed" | "dotted"

        var newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

        var newfillColor = item.style ? item.style.fillColor ? (0, _colorType.hexify)(item.style.fillColor) : '#00c5ff' : '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"

        var newfillOpacity = item.style ? item.style.fillColor ? (0, _colorType.getRgbaAlp)(item.style.fillColor) : 1.0 : 1.0; // 面填充的透明度，范围0-1

        var newdom = new BMapGL.Circle(newdata, item.radius ? item.radius : 100, {
          domid: newsdomid,
          domtype: 'planeDataCricleRoot',
          //自定义类型
          domindex: itemindex,
          strokeColor: newstrokeColor,
          strokeOpacity: newsstrokeOpacity,
          strokeStyle: newsstrokeStyle,
          strokeWeight: newsstrokeWeight,
          fillColor: newfillColor,
          fillOpacity: newfillOpacity,
          enableEditing: false //可编辑

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

  return PlaneCricle;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    planeDataCricle_BD: state.lists.planeDataCricle_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setdata: function setdata(_this, data) {
      dispatch(_actions.default.removeItem('planeDataCricle_BD', data.itemindex));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PlaneCricle);

exports.default = _default;