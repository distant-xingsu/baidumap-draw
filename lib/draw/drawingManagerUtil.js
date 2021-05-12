"use strict";

exports.__esModule = true;
exports.default = void 0;

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _actions = _interopRequireDefault(require("../redux/actions"));

var _reactRedux = require("react-redux");

require("../assest/css/baidumap.css");

var _icons = require("@ant-design/icons");

var _defaultParame = require("../utils/defaultParame");

var _fonttextEdit = _interopRequireDefault(require("./editStyle/fonttextEdit"));

var _polylineEdit = _interopRequireDefault(require("./editStyle/polylineEdit"));

var _markerEdit = _interopRequireDefault(require("./editStyle/markerEdit"));

var _circleEdit = _interopRequireDefault(require("./editStyle/circleEdit"));

var _polygonAndRectangleEdit = _interopRequireDefault(require("./editStyle/polygonAndRectangleEdit"));

var _customEdit = _interopRequireDefault(require("./editStyle/customEdit"));

var _G3dPCREdit = _interopRequireDefault(require("./editStyle/G3dPCREdit"));

var _m3dPCREdit = _interopRequireDefault(require("./editStyle/m3dPCREdit"));

var _jquery = _interopRequireDefault(require("jquery"));

require("../assest/css/DrawingManager.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DrawingManagerUtil = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DrawingManagerUtil, _React$Component);

  // load
  function DrawingManagerUtil(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.myDrawingManager = undefined;
    _this2.onClickMapEdit = _this2.onClickMapEdit.bind(_assertThisInitialized(_this2));
    _this2.state = {
      drawingModeValue: '',
      //当前绘制模式
      drawingModeType: 'plane',
      //编辑大模块  默认平面 3d/plane/g3
      //// ===========数据=============  ////
      addPolylineData: {
        data: []
      },
      addCircleData: {
        radius: 50,
        data: []
      },
      addMarkerData: {
        data: []
      },
      addPolygonData: {
        data: []
      },
      addLabeldata: {
        data: []
      },
      addCustomOverlaydata: {
        data: []
      },
      add3dPolyData: {
        data: []
      }
    };
    return _this2;
  } // in


  var _proto = DrawingManagerUtil.prototype;

  _proto.componentDidMount = function componentDidMount() {
    // 赋值
    this.props.init(this); //加载依赖 编辑

    this.loadDrawStart();
  };

  // out
  _proto.componentWillUnmount = function componentWillUnmount() {
    // 离开时候将数据返回给父组件
    var resultdata = {
      planeDataPolyLine: this.props.planeDataPolyLine_BD,
      planeDataCricle: this.props.planeDataCricle_BD,
      planeDataMarker: this.props.planeDataMarker_BD,
      planeDataPolyGon: this.props.planeDataPolyGon_BD,
      planeDataLabel: this.props.planeDataLabel_BD,
      planeDataCustom: this.props.planeDataCustom_BD,
      standDataPoylon: this.props.standDataPoylon_BD
    };
    this.props.resuleFun_BD && this.props.resuleFun_BD(resultdata);
    this.myDrawingManager && this.myDrawingManager.removeEventListener("overlaycomplete", this.onClickMapEdit);
  } // 加载 绘制地图模式
  ;

  _proto.loadDrawStart = function loadDrawStart() {
    var map = this.props.map;
    this.myDrawingManager = new BMapGLLib.DrawingManager(map, {
      isOpen: false,
      // 是否开启绘制模式，默认不开启
      drawingMode: "",
      //  "marker" | "polyline" | "polygon" | "rectangle" | "circle" 当前的绘制模式, 默认是绘制点
      enableDrawingTool: false,
      // 是否添加绘制工具栏控件，默认添加
      enableCalculate: true,
      //绘制是否进行测距(画线时候)、测面积(画圆、多边形、矩形)
      enableSorption: true,
      // 绘制线和多边形时，是否开启鼠标吸附功能
      sorptionDistance: 20,
      // 设置鼠标吸附的像素距离，开启enableSorption后生效
      enableLimit: true,
      // 是否开启限制绘制图形距离、面积功能
      enableGpc: false,
      // 绘制多边形时，是否开启重叠部分裁剪功能    这个功能有问题
      limitOptions: {
        area: 500000000,
        distance: 100000
      },
      // 设置图形距离、面积限制的实际值，开启enableLimit后生效
      circleOptions: _defaultParame.styleOptions,
      // Circle的绘制样式与属性
      markerOptions: _defaultParame.styleOptions,
      // Marker的绘制样式与属性
      polygonOptions: _defaultParame.styleOptions,
      // Polygon的绘制样式与属性
      polylineOptions: _defaultParame.styleOptions,
      // Polyline的绘制样式与属性
      rectangleOptions: _defaultParame.styleOptions,
      // Rectangle的绘制样式与属性
      labelOptions: _defaultParame.labelOptions // 跟随鼠标的提示label的绘制样式与属性

    }); // 核心函数方法 绘制完地图产生回调

    this.myDrawingManager.addEventListener("overlaycomplete", this.onClickMapEdit);
    this.addListren();
  } // 添加监听这个插件
  ;

  _proto.addListren = function addListren() {
    var _this = this;

    (0, _jquery.default)(document).on('click', '#cancelOperate', function () {
      _this.myDrawingManager && _this.myDrawingManager.close();

      _this.setState({
        drawingModeValue: ''
      });
    });
  } // 切换模式
  ;

  _proto.typeDrawingFun = function typeDrawingFun(value) {
    if (this.state.drawingModeType === value) {
      return;
    }

    this.setState({
      drawingModeType: value
    });
    this.props.ResetDataAndDraw(this);
  } // 鼠标点击工具框后获取当前绘画模式
  ;

  _proto.onClickToolFun = function onClickToolFun(dataType) {
    var drawingModeValue = this.state.drawingModeValue;

    if (drawingModeValue === dataType) {
      return;
    } else {
      this.props.ResetDataAndDraw(this);
    }

    this.myDrawingManager.open();

    switch (dataType) {
      case "marker":
        this.myDrawingManager.setDrawingMode('marker');
        break;

      case "circle":
        this.myDrawingManager.setDrawingMode('circle');
        break;

      case "polyline":
        this.myDrawingManager.setDrawingMode('polyline');
        break;

      case "polygon":
        this.myDrawingManager.setDrawingMode('polygon');
        break;

      case "rectangle":
        this.myDrawingManager.setDrawingMode('rectangle');
        break;

      case "fonttext":
        this.myDrawingManager.setDrawingMode('marker');
        break;

      case "custom":
        this.myDrawingManager.setDrawingMode('marker');
        break;

      case "3dpolygon":
        this.myDrawingManager.setDrawingMode('polygon');
        break;

      case "3drectangle":
        this.myDrawingManager.setDrawingMode('rectangle');
        break;

      case "3dcircle":
        this.myDrawingManager.setDrawingMode('circle');
        break;

      case "G3dpolygon":
        this.myDrawingManager.setDrawingMode('polygon');
        break;

      case "G3dcircle":
        this.myDrawingManager.setDrawingMode('circle');
        break;

      case "G3drectangle":
        this.myDrawingManager.setDrawingMode('rectangle');
        break;

      default:
        this.myDrawingManager.close();
    }

    this.setState({
      drawingModeValue: dataType
    });
  } // 核心函数方法 绘制完地图产生回调
  ;

  _proto.onClickMapEdit = function onClickMapEdit(e, info) {
    var _this = this;

    var _this$props = this.props,
        map = _this$props.map,
        isDrowState = _this$props.isDrowState;
    var drawingModeValue = this.state.drawingModeValue;
    var points = info.overlay ? info.overlay.points ? info.overlay.points : [] : [];
    var lngvlaue = info.overlay ? info.overlay.latLng ? info.overlay.latLng.lng ? info.overlay.latLng.lng : '' : '' : '';
    var latvalue = info.overlay ? info.overlay.latLng ? info.overlay.latLng.lat ? info.overlay.latLng.lat : '' : '' : '';
    var radius = info.overlay ? info.overlay.radius ? info.overlay.radius : 50 : 50;
    var resultpoints = [];
    var resultvalues = [lngvlaue, latvalue];
    map.removeEventListener('dblclick');

    switch (drawingModeValue) {
      case "polyline":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue = res[i] ? res[i].lng : '';

            var _latvalue = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue, _latvalue]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var addPolylineData = _this.state.addPolylineData;
          addPolylineData.data = resultpoints;
          addPolylineData.info = info;

          _this.setState({
            addPolylineData: addPolylineData
          });
        });
        break;

      case "circle":
        var addCircleData = _this.state.addCircleData;
        addCircleData.data = resultvalues;
        addCircleData.info = info;
        addCircleData.radius = radius;

        _this.setState({
          addCircleData: addCircleData
        });

        break;

      case "marker":
        var addMarkerData = _this.state.addMarkerData;
        addMarkerData.data = resultvalues;
        addMarkerData.info = info;

        _this.setState({
          addMarkerData: addMarkerData
        });

        break;

      case "polygon":
        points.pop();
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue2 = res[i] ? res[i].lng : '';

            var _latvalue2 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue2, _latvalue2]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var addPolygonData = _this.state.addPolygonData;
          addPolygonData.data = resultpoints;
          addPolygonData.info = info;

          _this.setState({
            addPolygonData: addPolygonData
          });
        });
        break;

      case "rectangle":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue3 = res[i] ? res[i].lng : '';

            var _latvalue3 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue3, _latvalue3]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var addPolygonData = _this.state.addPolygonData;
          addPolygonData.data = resultpoints;
          addPolygonData.info = info;

          _this.setState({
            addPolygonData: addPolygonData
          });
        });
        break;

      case "fonttext":
        var addLabeldata = _this.state.addLabeldata;
        addLabeldata.data = resultvalues;
        addLabeldata.info = info;

        _this.setState({
          addLabeldata: addLabeldata
        });

        break;

      case "custom":
        var addCustomOverlaydata = _this.state.addCustomOverlaydata;
        addCustomOverlaydata.data = resultvalues;
        addCustomOverlaydata.info = info;

        _this.setState({
          addCustomOverlaydata: addCustomOverlaydata
        });

        break;

      case "G3dpolygon":
        points.pop();
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue4 = res[i] ? res[i].lng : '';

            var _latvalue4 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue4, _latvalue4]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dPolyData = _this.state.add3dPolyData;
          add3dPolyData.data = resultpoints;
          add3dPolyData.info = info;

          _this.setState({
            add3dPolyData: add3dPolyData
          });
        });
        break;

      case "G3drectangle":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue5 = res[i] ? res[i].lng : '';

            var _latvalue5 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue5, _latvalue5]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dPolyData = _this.state.add3dPolyData;
          add3dPolyData.data = resultpoints;
          add3dPolyData.info = info;

          _this.setState({
            add3dPolyData: add3dPolyData
          });
        });
        break;

      case "G3dcircle":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue6 = res[i] ? res[i].lng : '';

            var _latvalue6 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue6, _latvalue6]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dPolyData = _this.state.add3dPolyData;
          add3dPolyData.data = resultpoints;
          add3dPolyData.info = info;

          _this.setState({
            add3dPolyData: add3dPolyData
          });
        });
        break;

      case "3dpolygon":
        points.pop();
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue7 = res[i] ? res[i].lng : '';

            var _latvalue7 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue7, _latvalue7]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dData = _this.state.add3dData;
          add3dData.data = resultpoints;
          add3dData.info = info;

          _this.setState({
            add3dData: add3dData
          });
        });
        break;

      case "3drectangle":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue8 = res[i] ? res[i].lng : '';

            var _latvalue8 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue8, _latvalue8]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dData = _this.state.add3dData;
          add3dData.data = resultpoints;
          add3dData.info = info;

          _this.setState({
            add3dData: add3dData
          });
        });
        break;

      case "3dcircle":
        this.coorConvert(points).then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var _lngvlaue9 = res[i] ? res[i].lng : '';

            var _latvalue9 = res[i] ? res[i].lat : '';

            resultpoints.push([_lngvlaue9, _latvalue9]);
          }

          resultpoints = resultpoints.filter(function (item) {
            return item;
          }); // 去重

          var add3dData = _this.state.add3dData;
          add3dData.data = resultpoints;
          add3dData.info = info;

          _this.setState({
            add3dData: add3dData
          });
        });
        break;

      default:
        _message2.default.warn('发生错误，未知类型！');

    }

    isDrowState(true);
    this.myDrawingManager.close();
  } // 坐标转换函数
  // 依赖百度坐标转换，但是百度依赖最多一次转换10个，所以分批转换
  ;

  _proto.coorConvert = function coorConvert(data) {
    return new Promise(function (resolve1) {
      var datalogin = data.length ? data.length : 0;
      var result = [];

      if (datalogin === 0) {
        resolve1(result);
      }

      var newdata = spArr(data, 10); // 百度转换方法

      var convertor = new BMapGL.Convertor();

      function run() {
        return _run.apply(this, arguments);
      }

      function _run() {
        _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var i;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  i = 0;

                case 1:
                  if (!(i < newdata.length)) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 4;
                  return asyncOperate(newdata[i], i);

                case 4:
                  i++;
                  _context.next = 1;
                  break;

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return _run.apply(this, arguments);
      }

      run().then(function () {
        resolve1(result);
      });

      function asyncOperate(data, index) {
        return Promise.resolve(data, index).then(function (res) {
          return new Promise(function (resolve, reject) {
            convertor.translate(res, 6, 5, function (item) {
              if (item.status === 0) {
                result = result.concat(item.points);
                resolve(result);
              } else {
                reject(result);
              }
            });
          });
        });
      } //arr是你要分割的数组，num是以几个为一组


      function spArr(arr, num) {
        var newArr = []; //首先创建一个新的空数组。用来存放分割好的数组

        for (var i = 0; i < arr.length;) {
          //注意：这里与for循环不太一样的是，没有i++
          newArr.push(arr.slice(i, i += num));
        }

        return newArr;
      }
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var map = this.props.map;
    var _this$state = this.state,
        drawingModeValue = _this$state.drawingModeValue,
        drawingModeType = _this$state.drawingModeType;
    var _this$state2 = this.state,
        addPolylineData = _this$state2.addPolylineData,
        addCircleData = _this$state2.addCircleData,
        addMarkerData = _this$state2.addMarkerData,
        addPolygonData = _this$state2.addPolygonData,
        addLabeldata = _this$state2.addLabeldata,
        addCustomOverlaydata = _this$state2.addCustomOverlaydata,
        add3dPolyData = _this$state2.add3dPolyData,
        add3dData = _this$state2.add3dData;
    var resultMapView = this.props.resultMapView;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "DrawingManagerUtil"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "drawingmanagerutil_type"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_type_left"
    }, "\u5F53\u524D\u6A21\u5F0F\uFF1A"), /*#__PURE__*/_react.default.createElement("span", null, drawingModeType === 'plane' && '平面图层', drawingModeType === '3d' && '3d图层', drawingModeType === 'G3d' && '高级3d图层'), /*#__PURE__*/_react.default.createElement("div", {
      className: "drawingmanagerutil_bom"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_type_left"
    }, "\u5207\u6362\u6A21\u5F0F\uFF1A"), /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_type_icon" + " " + (drawingModeType === 'plane' ? "active" : ''),
      title: '平面图层',
      onClick: function onClick() {
        return _this3.typeDrawingFun('plane');
      }
    }, /*#__PURE__*/_react.default.createElement(_icons.AppstoreFilled, null)), /*#__PURE__*/_react.default.createElement("span", {
      className: "drawingmanagerutil_type_icon" + " " + (drawingModeType === 'G3d' ? "active" : ''),
      title: '高级3d图层',
      onClick: function onClick() {
        return _this3.typeDrawingFun('G3d');
      }
    }, /*#__PURE__*/_react.default.createElement(_icons.RetweetOutlined, null)))), /*#__PURE__*/_react.default.createElement("div", {
      className: "drawingmanagerutil_tool"
    }, drawingModeType === '3d' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('3dpolygon');
      },
      className: "span" + " " + (drawingModeValue === '3dpolygon' ? "active" : ''),
      title: '多边形'
    }, /*#__PURE__*/_react.default.createElement(_icons.BoxPlotOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('3drectangle');
      },
      className: "span" + " " + (drawingModeValue === '3drectangle' ? "active" : ''),
      title: '矩形'
    }, /*#__PURE__*/_react.default.createElement(_icons.BorderOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('3dcircle');
      },
      className: "span" + " " + (drawingModeValue === '3dcircle' ? "active" : ''),
      title: '圆'
    }, /*#__PURE__*/_react.default.createElement(_icons.EuroOutlined, null))) : drawingModeType === 'plane' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('marker');
      },
      className: "span" + " " + (drawingModeValue === 'marker' ? "active" : ''),
      title: '点'
    }, /*#__PURE__*/_react.default.createElement(_icons.EnvironmentOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('circle');
      },
      className: "span" + " " + (drawingModeValue === 'circle' ? "active" : ''),
      title: '圆'
    }, /*#__PURE__*/_react.default.createElement(_icons.EuroOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('polyline');
      },
      className: "span" + " " + (drawingModeValue === 'polyline' ? "active" : ''),
      title: '线'
    }, /*#__PURE__*/_react.default.createElement(_icons.RiseOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('polygon');
      },
      className: "span" + " " + (drawingModeValue === 'polygon' ? "active" : ''),
      title: '多边形'
    }, /*#__PURE__*/_react.default.createElement(_icons.BoxPlotOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('rectangle');
      },
      className: "span" + " " + (drawingModeValue === 'rectangle' ? "active" : ''),
      title: '矩形'
    }, /*#__PURE__*/_react.default.createElement(_icons.BorderOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('fonttext');
      },
      className: "span" + " " + (drawingModeValue === 'fonttext' ? "active" : ''),
      title: '文本'
    }, /*#__PURE__*/_react.default.createElement(_icons.FontColorsOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('custom');
      },
      className: "span" + " " + (drawingModeValue === 'custom' ? "active" : ''),
      title: '覆盖物'
    }, /*#__PURE__*/_react.default.createElement(_icons.BlockOutlined, null))) : drawingModeType === 'G3d' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('G3dpolygon');
      },
      className: "span" + " " + (drawingModeValue === 'G3dpolygon' ? "active" : ''),
      title: '多边体'
    }, /*#__PURE__*/_react.default.createElement(_icons.BoxPlotOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('G3drectangle');
      },
      className: "span" + " " + (drawingModeValue === 'G3drectangle' ? "active" : ''),
      title: '矩形体'
    }, /*#__PURE__*/_react.default.createElement(_icons.BorderOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
      onClick: function onClick() {
        return _this3.onClickToolFun('G3dcircle');
      },
      className: "span" + " " + (drawingModeValue === 'G3dcircle' ? "active" : ''),
      title: '圆柱体'
    }, /*#__PURE__*/_react.default.createElement(_icons.EuroOutlined, null))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null)), drawingModeValue && /*#__PURE__*/_react.default.createElement("div", {
      className: "drawingmanagerutil_class"
    }, drawingModeType === 'plane' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, drawingModeValue === 'fonttext' && /*#__PURE__*/_react.default.createElement(_fonttextEdit.default, {
      map: map,
      addLabeldata: addLabeldata,
      resultMapView: resultMapView.bind(this)
    }), drawingModeValue === 'polyline' && /*#__PURE__*/_react.default.createElement(_polylineEdit.default, {
      map: map,
      addPolylineData: addPolylineData,
      resultMapView: resultMapView.bind(this)
    }), drawingModeValue === 'marker' && /*#__PURE__*/_react.default.createElement(_markerEdit.default, {
      map: map,
      addMarkerData: addMarkerData,
      resultMapView: resultMapView.bind(this)
    }), drawingModeValue === 'circle' && /*#__PURE__*/_react.default.createElement(_circleEdit.default, {
      map: map,
      addCircleData: addCircleData,
      resultMapView: resultMapView.bind(this)
    }), (drawingModeValue === 'polygon' || drawingModeValue === 'rectangle') && /*#__PURE__*/_react.default.createElement(_polygonAndRectangleEdit.default, {
      map: map,
      addPolygonData: addPolygonData,
      resultMapView: resultMapView.bind(this)
    }), drawingModeValue === 'custom' && /*#__PURE__*/_react.default.createElement(_customEdit.default, {
      map: map,
      addCustomOverlaydata: addCustomOverlaydata,
      resultMapView: resultMapView.bind(this)
    })), drawingModeType === 'G3d' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (drawingModeValue === 'G3dpolygon' || drawingModeValue === 'G3dcircle' || drawingModeValue === 'G3drectangle') && /*#__PURE__*/_react.default.createElement(_G3dPCREdit.default, {
      map: map,
      add3dPolyData: add3dPolyData,
      resultMapView: resultMapView.bind(this)
    })), drawingModeType === '3d' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (drawingModeValue === '3dpolygon' || drawingModeValue === '3drectangle' || drawingModeValue === '3dcircle') && /*#__PURE__*/_react.default.createElement(_m3dPCREdit.default, {
      map: map,
      add3dData: add3dData,
      resultMapView: resultMapView.bind(this)
    }))));
  };

  return DrawingManagerUtil;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    // 返回的方达
    resuleFun_BD: state.vars.resuleFun_BD,
    addDataResultFun_BD: state.vars.addDataResultFun_BD,
    // 返回的数据
    layerDataMap_BD: state.lists.layerDataMap_BD,
    standDataPoylon_BD: state.lists.standDataPoylon_BD,
    planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD,
    planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
    planeDataMarker_BD: state.lists.planeDataMarker_BD,
    planeDataLabel_BD: state.lists.planeDataLabel_BD,
    planeDataCustom_BD: state.lists.planeDataCustom_BD,
    planeDataCricle_BD: state.lists.planeDataCricle_BD,
    // 是否开启渲染
    isDrowState_BD: state.vars.isDrowState_BD,
    // 是否重新渲染
    isPolyLine_BD: state.vars.isPolyLine_BD,
    isPolyCricle_BD: state.vars.isPolyCricle_BD,
    isMarker_BD: state.vars.isMarker_BD,
    isPolyGon_BD: state.vars.isPolyGon_BD,
    isPolyLabel_BD: state.vars.isPolyLabel_BD,
    isCustom_BD: state.vars.isCustom_BD,
    isStand_BD: state.vars.isStand_BD,
    isLayer_BD: state.vars.isLayer_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    init: function init(_this) {},
    // 绘制是否开启
    isDrowState: function isDrowState(falge) {
      dispatch(_actions.default.setVars('isDrowState_BD', falge));
    },
    // 重新渲染结果-添加数据
    resultMapView: function resultMapView(drawingType, drawingModeValue, drawingDate) {
      var _this = this;

      var objlist = [];
      var postdata = {
        type: drawingModeValue,
        data: drawingDate
      };

      switch (drawingModeValue) {
        case "polyline":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataPolyLine_BD', objlist));
            dispatch(_actions.default.setVars('isPolyLine_BD', !_this.props.isPolyLine_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "circle":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataCricle_BD', objlist));
            dispatch(_actions.default.setVars('isPolyCricle_BD', !_this.props.isPolyCricle_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "marker":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataMarker_BD', objlist));
            dispatch(_actions.default.setVars('isMarker_BD', !_this.props.isMarker_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "polygon":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataPolyGon_BD', objlist));
            dispatch(_actions.default.setVars('isPolyGon_BD', !_this.props.isPolyGon_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "fonttext":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataLabel_BD', objlist));
            dispatch(_actions.default.setVars('isPolyLabel_BD', !_this.props.isPolyLabel_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "custom":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('planeDataCustom_BD', objlist));
            dispatch(_actions.default.setVars('isCustom_BD', !_this.props.isCustom_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        case "G3dpolygon":
          if (drawingType === 1) {
            objlist.push(drawingDate);
            dispatch(_actions.default.appendLists('standDataPoylon_BD', objlist));
            dispatch(_actions.default.setVars('isStand_BD', !_this.props.isStand_BD));
            _this.props.addDataResultFun_BD && _this.props.addDataResultFun_BD(_this, postdata);
          } else {
            delDoms();
          }

          break;

        default:
          _message2.default.warning('发生错误，未知类型！');

      }

      _this.props.isDrowState(false);

      _this.props.ResetDataAndDraw(_this);

      function delDoms() {
        var $cancelOperate = (0, _jquery.default)('#cancelOperate');

        if ($cancelOperate.length > 0) {
          $cancelOperate.click();
        }
      }
    },
    //重置数据
    ResetDataAndDraw: function ResetDataAndDraw(_this) {
      var $cancelOperate = (0, _jquery.default)('#cancelOperate');

      if ($cancelOperate.length > 0) {
        $cancelOperate.click();
      }

      _this.myDrawingManager.close();

      if (_this.state.addPolylineData.info) {
        _this.props.map.removeOverlay(_this.state.addPolylineData.info.overlay);
      }

      _this.setState({
        drawingModeValue: '',
        addPolylineData: {
          data: []
        },
        addCircleData: {
          radius: 50,
          data: []
        },
        addMarkerData: {
          data: []
        },
        addPolygonData: {
          data: []
        },
        addLabeldata: {
          data: []
        },
        addCustomOverlaydata: {
          data: []
        },
        add3dPolyData: {
          data: []
        }
      });
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DrawingManagerUtil);

exports.default = _default;