"use strict";

exports.__esModule = true;
exports.MarkerPop = exports.BasicsPop = void 0;

//基础弹框
var BasicsPop = function BasicsPop(map) {
  // 信息窗宽度，单位像素。取值范围：0, 220 - 730。如果您指定宽度为0，则信息窗口的宽度将按照其内容自动调整
  // 信息窗高度，单位像素。取值范围：0, 60 - 650。如果您指定高度为0，则信息窗口的高度将按照其内容自动调整
  var opts = {
    width: 250,
    // 信息窗口宽度
    height: 100,
    // 信息窗口高度
    title: "Hello" // 信息窗口标题

  };
  var divDom = '<div>s世界s</div>';
  var infoWindow = new BMapGL.InfoWindow(divDom, opts); // 创建信息窗口对象

  map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
}; //marker 弹框


exports.BasicsPop = BasicsPop;

var MarkerPop = function MarkerPop(map, data, e) {
  var name = data.name ? data.name : '标题';
  var dom = data.dom ? data.dom : '无内容';
  var opts = {
    width: 0,
    height: 0,
    title: '<div style="color: #FFFFFF;font-weight: bold">' + name + '</div>'
  };
  var point = new BMapGL.Point(e[0], e[1]);
  var divDom = '<div style="color: #FFFFFF">' + dom + '</div>';
  var infoWindow = new BMapGL.InfoWindow(divDom, opts);
  map.openInfoWindow(infoWindow, point);
};

exports.MarkerPop = MarkerPop;