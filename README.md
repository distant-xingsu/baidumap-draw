# baidumap-draw

一个对百度地图进行3D、平面编辑的组件。

------

目前 react 测试成功，期待您的使用。

## Install

首先要去百度地图api网站申请百度ak码（具体过程不做详解）：

https://lbsyun.baidu.com/index.php

https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/getkey

申请成为百度开发者，并获取密匙，然后执行：

```
npm i baidumap-draw
```

## Usage

```
import React from 'react'
import {BaiduApp} from "baidumap-draw";

class App extends React.Component {
    render() {
        return (
            <div>
                <BaiduApp BaidumapAk={'您的百度申请的Ak码'}  />
            </div>
        )
    }
}

export default App

```

此时百度地图应该已经加载完成。

## configure

#### BaiduApp:

| 参数名称            | 数据类型 | 默认值                                                       | 必填 | 备注                                               |
| ------------------- | -------- | ------------------------------------------------------------ | ---- | -------------------------------------------------- |
| BaidumapAk          | string   | null                                                         | yes  | 百度地图ak码，需要自己申请                         |
| isDeveloperEditProp | Boolean  | false                                                        | no   | 是否开启开发者模式                                 |
| isEditProp          | fun      | null                                                         | no   | 开发模式下，点击编辑，返回的函数（boolean）        |
| resuleFun           | fun      | null                                                         | no   | 开发模式下，点击完成，返回的函数（里面是数据）     |
| baiduMapFun         | fun      | null                                                         | no   | 返回地图实例，(map)                                |
| isAnimsmap          | Boolean  | false                                                        | no   | 是否开启动画                                       |
| keypatherAnim       | array    | null                                                         | no   | 动画帧                                             |
| baiduOption         | object   | {coordinateItem: {     lng: 116.40372656609907,     lat: 39.915103900724574 }, zoomItem: 18, headingItem: 0, tiltItem: 60, mapTypeItem: "normal"} | no   | 百度基础参数配置                                   |
| baiduData           | object   | null                                                         | no   | 百度地图数据                                       |
| onMapOverClickFun   | fun      | null                                                         | no   | 左键 鼠标单击某一建筑物 返回单击事件- 非编辑模式下 |
| onMapOverdbClickFun | fun      | null                                                         | no   | 左键 鼠标双击某一建筑物 返回双击事件- 非编辑模式下 |
| addDataResultFun    | fun      | null                                                         | no   | 添加时候返回的数据方法  -  编辑模式下              |
| delDataResultFun    | fun      | null                                                         | no   | 删除时候返回的数据方法  - 编辑模式下               | |      |                                                    |







#### baiduOption(object)

| 参数名称       | 数据类型 | 默认值                                                   | 必填 | 备注                                                         |
| -------------- | -------- | -------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| coordinateItem | object   | {     lng: number,     lat: number } | no   | 定位点的坐标 基础坐标中心                                    |
| zoomItem       | number   | 18                                                       | no   | 地图缩放级别                                                 |
| headingItem    | number   | 0                                                        | no   | 地图旋转角度                                                 |
| tiltItem       | number   | 60                                                       | no   | 倾斜角度                                                     |
| mapTypeItem    | string   | normal                                                   | no   | "normal" - "earth"    地图类型，普通地图或地球模式          |
| StyleItem      | array    | 暗黑模式                                                 | no   | 预加载样式（百度地图自己可配置下载json格式）https://lbsyun.baidu.com/index.php?title=open/custom |





#### baiduData(object)

| 参数名称          | 数据类型 | 默认值 | 必填 | 备注                  |
| ----------------- | -------- | ------ | ---- | --------------------- |
| layerDataMap      | array    | null   | no   | 图层数据(暂未开发)    |
| standDataPoylon   | array    | null   | no   | 3d数据-多边形         |
| planeDataPolyLine | array    | null   | no   | 数据平面-线           |
| planeDataPolyGon  | array    | null   | no   | 数据平面-多边形       |
| planeDataMarker   | array    | null   | no   | 数据平面-点           |
| planeDataLabel    | array    | null   | no   | 数据平面-文本         |
| planeDataCustom   | array    | null   | no   | 数据平面-自定义覆盖物 |
| planeDataCricle   | array    | null   | no   | 数据平面-圆           |

###### le:

```
baiduData: {
                planeDataPolyLine: [
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ [ 116.40216642578604, 39.91293345549466 ], [ 116.40567144581301, 39.912155489217305 ] ],
                        style:{
                            strokeColor:'rgba(226,14,14,0.9)',
                            strokeStyle:'solid',
                            strokeWeight:5
                        }
                    }
                ],
                planeDataCricle:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ 116.40821957491076 , 39.91658901250462 ],
                        radius:50,
                        style:{
                            strokeColor:'rgba(14,141,226,0.5)',
                            strokeStyle:'dashed',
                            strokeWeight:2,
                            fillColor:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataMarker:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data:[116.4000107001605 , 39.912210933313865],
                        title:'测试',
                        style:{
                            backgroundColor:'rgba(14,141,226,0.5)',
                            borderColor:'rgba(219,14,226,0.9)',
                            color:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataPolyGon:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ [ 116.40280645121443 , 39.91204849608175 ], [ 116.40429502869365 , 39.91101356694463 ],[ 116.40399668957616 , 39.912124108901196] ],
                        style:{
                            strokeColor:'rgba(14,141,226,0.5)',
                            strokeStyle:'dashed',
                            strokeWeight:2,
                            fillColor:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataLabel:[
                    {
                        data:[116.40430786673703 , 39.91299171941463],
                        isClick: true,
                        isDbClick: true,
                        title:'测试',
                        style:{
                            color:'rgba(14,141,226,0.9)',
                            borderColor: 'rgb(11,231,239)',
                            backgroundColor: 'rgb(160,67,164)',
                        }
                    }
                ],
                planeDataCustom:[
                    {
                        data:[116.40538449289751 , 39.91061798023587],
                        isClick: true,
                        isDbClick: true,
                        title:'测试',
                        style:{
                            dom:'<div style="color: #fdb505;width: 50px;background-color: #34658a">王永平</div>'
                        }
                    }
                ],
                standDataPoylon:[
                    {
                        data:[[116.39971617003802 , 39.91332672213205],[116.40102605137504 , 39.91339112709837],[116.4011740463095 , 39.912920112558744],[116.40002896351999 , 39.91276781108638]],
                        isClick: true,
                        isDbClick: true,
                        height:50,
                        style: {
                            topFillColor:'rgba(0,197,255,1)',
                            sideFillColor:'rgba(25,82,102,1)',
                        }
                    }
                ],
            }
```



## contact

- email:  1763907618@qq.com
- qq: 1763907618
- author: wangyongping

如果项目有bug,请及时提出，后续将持续开发，欢迎留言!!
