"use strict";

exports.__esModule = true;
exports.setFontdataFun = setFontdataFun;
exports.setNamedataFun = setNamedataFun;
exports.setWidthdataFun = setWidthdataFun;
exports.setBorderType = setBorderType;
exports.setColorFun = setColorFun;
exports.setComColorFun = setComColorFun;
exports.isClickFun = isClickFun;
exports.setMarker = setMarker;
exports.setCustom = setCustom;
exports.setNewHeight = setNewHeight;
exports.isDbClickFun = isDbClickFun;

// ----------------公共库
// 修改文字标题
function setFontdataFun(value, e) {
  var _this$setState;

  var _this = this;

  var data = this.state[value];
  data.title = e.target.value;
  this.setState((_this$setState = {}, _this$setState[value] = data, _this$setState), function () {
    _this.upDataFun(_this, value, 'title');
  });
} // 修改名字建筑物


function setNamedataFun(value, e) {
  var _this$setState2;

  var data = this.state[value];
  data.name = e.target.value;
  this.setState((_this$setState2 = {}, _this$setState2[value] = data, _this$setState2));
} // 修改宽度等样式


function setWidthdataFun(value, key, e) {
  var _this$setState3;

  var _this = this;

  var data = this.state[value];
  data.style[key] = e;
  this.setState((_this$setState3 = {}, _this$setState3[value] = data, _this$setState3), function () {
    _this.upDataFun(_this, value, key);
  });
} // 设置边框类型


function setBorderType(value, e) {
  var _this$setState4;

  var _this = this;

  var data = this.state[value];
  data.style.strokeStyle = e;
  this.setState((_this$setState4 = {}, _this$setState4[value] = data, _this$setState4), function () {
    _this.upDataFun(_this, value, 'strokeStyle');
  });
} // 设置并显示颜色值 类型 是否显示弹窗 数据类型 键值 数据


function setColorFun(type, falge, data, key, value) {
  var _this = this;

  if (type === 1) {
    this.setState({
      colorData: key,
      isColorShow: falge,
      isColorShowName: data
    });
  } else if (type === 2) {
    switch (data) {
      case 'addLabeldata':
        var addLabeldata = this.state.addLabeldata;
        addLabeldata.style[key] = value;
        this.setState({
          addLabeldata: addLabeldata
        }, function () {
          _this.upDataFun(_this, 'addLabeldata', key);
        });
        break;

      case 'addCustomOverlaydata':
        var addCustomOverlaydata = this.state.addCustomOverlaydata;
        addCustomOverlaydata.style[key] = value;
        this.setState({
          addCustomOverlaydata: addCustomOverlaydata
        }, function () {
          _this.upDataFun(_this, 'addCustomOverlaydata', key);
        });
        break;

      case 'addMarkerData':
        var addMarkerData = this.state.addMarkerData;
        addMarkerData.style[key] = value;
        this.setState({
          addMarkerData: addMarkerData
        }, function () {
          _this.upDataFun(_this, 'addMarkerData', key);
        });
        break;

      case 'addCircleData':
        var addCircleData = this.state.addCircleData;
        addCircleData.style[key] = value;
        this.setState({
          addCircleData: addCircleData
        }, function () {
          _this.upDataFun(_this, 'addCircleData', key);
        });
        break;

      case 'addPolylineData':
        var addPolylineData = this.state.addPolylineData;
        addPolylineData.style[key] = value;
        this.setState({
          addPolylineData: addPolylineData
        }, function () {
          _this.upDataFun(_this, 'addPolylineData', key);
        });
        break;

      case 'addPolygonData':
        var addPolygonData = this.state.addPolygonData;
        addPolygonData.style[key] = value;
        this.setState({
          addPolygonData: addPolygonData
        }, function () {
          _this.upDataFun(_this, 'addPolygonData', key);
        });
        break;

      case 'add3dPolyData':
        var add3dPolyData = this.state.add3dPolyData;
        add3dPolyData.style[key] = value;
        this.setState({
          add3dPolyData: add3dPolyData
        }, function () {
          _this.upDataFun(_this, 'add3dPolyData', key);
        });
        break;

      default:
    }

    this.setState({
      isColorShow: falge,
      isColorShowName: ''
    });
  } else if (type === 3) {
    this.setState({
      isColorShow: falge,
      isColorShowName: ''
    });
  }
} // 获取 rgba


function setComColorFun(e) {
  var newcolor = 'rgba(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')';
  this.setState({
    colorData: newcolor
  });
} // 是否开启点击功能


function isClickFun(data, e) {
  var _this$setState5;

  var newData = this.state[data];
  newData.isClick = !!e;
  this.setState((_this$setState5 = {}, _this$setState5[data] = newData, _this$setState5));
} // 是否开启双击功能


function isDbClickFun(data, e) {
  var _this$setState6;

  var newData = this.state[data];
  newData.isDbClick = !!e;
  this.setState((_this$setState6 = {}, _this$setState6[data] = newData, _this$setState6));
} // 图标-Marker


function setMarker(e) {
  var _this = this;

  var addMarkerData = this.state.addMarkerData;
  addMarkerData.imgSrc = e;
  this.setState({
    addMarkerData: addMarkerData
  }, function () {
    _this.upDataFun(_this, 'addMarkerData', 'imgSrc');
  });
} // 图标-setCustom


function setCustom(e) {
  var _this = this;

  var addCustomOverlaydata = this.state.addCustomOverlaydata;
  addCustomOverlaydata.style.dom = e;
  this.setState({
    addCustomOverlaydata: addCustomOverlaydata
  }, function () {
    _this.upDataFun(_this, 'addCustomOverlaydata', 'dom');
  });
} // 设置高度


function setNewHeight(type, e) {
  var _this = this;

  if (type === 1) {
    var add3dData = this.state.add3dData;
    add3dData.height = e;
    this.setState({
      add3dData: add3dData
    });
  } else if (type === 2) {
    var add3dPolyData = this.state.add3dPolyData;
    add3dPolyData.height = e;
    this.setState({
      add3dPolyData: add3dPolyData
    }, function () {
      _this.upDataFun(_this, 'add3dPolyData', 'height');
    });
  }
}