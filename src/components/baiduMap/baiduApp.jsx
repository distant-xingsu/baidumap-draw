import Baidumap from "./baidumap";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import PropTypes from "prop-types";
import StyleItem from "./assest/json/styleItemBaiduMap.json";
import 'antd/dist/antd.css';

class BaiduApp extends React.Component{
    //load
    constructor( props ) {
        super( props );
        this.state = {}
    }

    //in
    componentDidMount() {

    };

    //out
    componentWillUnmount() {

    }

    render() {
        return(
            <Provider store={store}>
                <Baidumap fadata={this.props}/>
            </Provider>
        )
    }
}

export default BaiduApp;

BaiduApp.propTypes = {
    // 百度码
    BaidumapAk: PropTypes.string.isRequired,
    // 百度基础参数配置
    baiduOption: PropTypes.shape( {
        // 定位点的坐标 基础坐标中心
        coordinateItem: PropTypes.shape( {
            lng: PropTypes.number,
            lat: PropTypes.number
        } ),
        // 地图缩放级别
        zoomItem: PropTypes.number,
        // 地图旋转角度
        headingItem: PropTypes.number,
        // 倾斜角度
        tiltItem: PropTypes.number,
        // "normal" | "earth"		地图类型，普通地图或地球模式
        mapTypeItem: PropTypes.oneOf( [ "normal", "earth" ] ), //字符串其中的一个
        // 预加载样式
        StyleItem: PropTypes.array,
    } ),
    // 百度数据
    baiduData: PropTypes.shape( {
        // 图层数据
        layerDataMap: PropTypes.array,
        // 3d数据-多边形
        standDataPoylon: PropTypes.array,
        // 数据平面-线
        planeDataPolyLine: PropTypes.array,
        // 数据平面-多边形
        planeDataPolyGon: PropTypes.array,
        // 数据平面-点
        planeDataMarker: PropTypes.array,
        // 数据平面-文本
        planeDataLabel: PropTypes.array,
        // 数据平面-自定义覆盖物
        planeDataCustom: PropTypes.array,
        // 数据平面-圆
        planeDataCricle: PropTypes.array,
    } ),

    // 开发者模式
    isDeveloperEditProp: PropTypes.bool,
    // 是否开始编辑 点击编辑按钮
    isEditProp: PropTypes.func,
    // 编辑完成后把数据返回
    resuleFun: PropTypes.func,
    // 地图实例
    baiduMapFun: PropTypes.func,
    // 百度自定义图层key
    keyCustomData: PropTypes.array,

    // 开启动画
    isAnimsmap: PropTypes.bool,
    // 动画帧
    keypatherAnim: PropTypes.array,

    // 左键 鼠标单击某一建筑物 返回单击事件- 非编辑模式下
    onMapOverClickFun: PropTypes.func,
    // 左键 鼠标双击某一建筑物 返回双击事件- 非编辑模式下
    onMapOverdbClickFun: PropTypes.func,
    // 添加时候返回的数据方法  -  编辑模式下
    addDataResultFun: PropTypes.func,
    // 删除时候返回的数据方法  - 编辑模式下
    delDataResultFun: PropTypes.func,
};

BaiduApp.defaultProps = {
    baiduOption: {
        coordinateItem: {
            lng: 116.40372656609907,
            lat: 39.915103900724574
        },
        zoomItem: 18,
        headingItem: 0,
        tiltItem: 60,
        mapTypeItem: "normal",
        StyleItem: StyleItem,
    },
    isDeveloperEditProp: false,
    isAnimsmap: false,
};
