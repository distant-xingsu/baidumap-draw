//绘制工具  https://github.com/huiyan-fe/BMapGLLib
import React from 'react'
import actions from "../redux/actions";
import { connect } from "react-redux";
import '../assest/css/baidumap.css'
import { AppstoreFilled, BlockOutlined, BorderOutlined, BoxPlotOutlined,  EnvironmentOutlined, EuroOutlined, FontColorsOutlined, RetweetOutlined, RiseOutlined } from '@ant-design/icons'; //BuildFilled,
import { message } from 'antd';
import { labelOptions, styleOptions } from '../utils/defaultParame'
import FonttextEdit from "./editStyle/fonttextEdit";
import PolylineEdit from "./editStyle/polylineEdit";
import MarkerEdit from "./editStyle/markerEdit";
import CircleEdit from "./editStyle/circleEdit";
import PolygonAndRectangleEdit from "./editStyle/polygonAndRectangleEdit";
import CustomEdit from "./editStyle/customEdit";
import G3dPCREdit from "./editStyle/G3dPCREdit";
import M3dPCREdit from "./editStyle/m3dPCREdit";
import $ from "jquery";
import '../assest/css/DrawingManager.min.css'

class DrawingManagerUtil extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.myDrawingManager = undefined;
        this.onClickMapEdit = this.onClickMapEdit.bind( this );
        this.state = {
            drawingModeValue: '', //当前绘制模式
            drawingModeType: 'plane',//编辑大模块  默认平面 3d/plane/g3
            //// ===========数据=============  ////
            addPolylineData: {
                data: [],
            },
            addCircleData: {
                radius:50,
                data: [],
            },
            addMarkerData: {
                data: [],
            },
            addPolygonData:{
                data:[]
            },
            addLabeldata:{
                data:[],
            },
            addCustomOverlaydata:{
                data:[],
            },
            add3dPolyData:{
                data:[],
            },
        }
    }

    // in
    componentDidMount() {
        // 赋值
        this.props.init( this );
        //加载依赖 编辑
        this.loadDrawStart()
    };

    // out
    componentWillUnmount() {
        // 离开时候将数据返回给父组件
        let resultdata = {
            planeDataPolyLine: this.props.planeDataPolyLine_BD,
            planeDataCricle: this.props.planeDataCricle_BD,
            planeDataMarker: this.props.planeDataMarker_BD,
            planeDataPolyGon: this.props.planeDataPolyGon_BD,
            planeDataLabel: this.props.planeDataLabel_BD,
            planeDataCustom: this.props.planeDataCustom_BD,
            standDataPoylon: this.props.standDataPoylon_BD,
        }
        this.props.resuleFun_BD && this.props.resuleFun_BD( resultdata )
        this.myDrawingManager && this.myDrawingManager.removeEventListener( "overlaycomplete", this.onClickMapEdit );
    }

    // 加载 绘制地图模式
    loadDrawStart() {
        let { map } = this.props;
        this.myDrawingManager = new BMapGLLib.DrawingManager( map, {
            isOpen: false,  // 是否开启绘制模式，默认不开启
            drawingMode: "", //  "marker" | "polyline" | "polygon" | "rectangle" | "circle" 当前的绘制模式, 默认是绘制点
            enableDrawingTool: false,// 是否添加绘制工具栏控件，默认添加
            enableCalculate: true, //绘制是否进行测距(画线时候)、测面积(画圆、多边形、矩形)
            enableSorption: true, // 绘制线和多边形时，是否开启鼠标吸附功能
            sorptionDistance: 20, // 设置鼠标吸附的像素距离，开启enableSorption后生效
            enableLimit: true, // 是否开启限制绘制图形距离、面积功能
            enableGpc: false, // 绘制多边形时，是否开启重叠部分裁剪功能    这个功能有问题
            limitOptions: {
                area: 500000000,
                distance: 100000
            },  // 设置图形距离、面积限制的实际值，开启enableLimit后生效
            circleOptions: styleOptions,   // Circle的绘制样式与属性
            markerOptions: styleOptions,	   // Marker的绘制样式与属性
            polygonOptions: styleOptions,	   // Polygon的绘制样式与属性
            polylineOptions: styleOptions,	   // Polyline的绘制样式与属性
            rectangleOptions: styleOptions,	   // Rectangle的绘制样式与属性
            labelOptions: labelOptions,	       // 跟随鼠标的提示label的绘制样式与属性
        } );
        // 核心函数方法 绘制完地图产生回调
        this.myDrawingManager.addEventListener( "overlaycomplete", this.onClickMapEdit );
        this.addListren();
    }

    // 添加监听这个插件
    addListren() {
        let _this = this;
        $( document ).on( 'click', '#cancelOperate', function () {
            _this.myDrawingManager && _this.myDrawingManager.close();
            _this.setState( {
                drawingModeValue: '',
            } )
        } )
    }

    // 切换模式
    typeDrawingFun( value ) {
        if ( this.state.drawingModeType === value ) {
            return;
        }
        this.setState( {
            drawingModeType: value,
        } )
        this.props.ResetDataAndDraw( this );
    }

    // 鼠标点击工具框后获取当前绘画模式
    onClickToolFun( dataType ) {
        let drawingModeValue = this.state.drawingModeValue;
        if ( drawingModeValue === dataType ) {
            return
        }
        else {
            this.props.ResetDataAndDraw( this );
        }

        this.myDrawingManager.open();

        switch ( dataType ) {
            case "marker":
                this.myDrawingManager.setDrawingMode( 'marker' );
                break;
            case "circle":
                this.myDrawingManager.setDrawingMode( 'circle' );
                break;
            case "polyline":
                this.myDrawingManager.setDrawingMode( 'polyline' );
                break;
            case "polygon":
                this.myDrawingManager.setDrawingMode( 'polygon' );
                break;
            case "rectangle":
                this.myDrawingManager.setDrawingMode( 'rectangle' );
                break;
            case "fonttext":
                this.myDrawingManager.setDrawingMode( 'marker' );
                break;
            case "custom":
                this.myDrawingManager.setDrawingMode( 'marker' );
                break;
            case "3dpolygon":
                this.myDrawingManager.setDrawingMode( 'polygon' );
                break;
            case "3drectangle":
                this.myDrawingManager.setDrawingMode( 'rectangle' );
                break;
            case "3dcircle":
                this.myDrawingManager.setDrawingMode( 'circle' );
                break;
            case "G3dpolygon":
                this.myDrawingManager.setDrawingMode( 'polygon' );
                break;
            case "G3dcircle":
                this.myDrawingManager.setDrawingMode( 'circle' );
                break;
            case "G3drectangle":
                this.myDrawingManager.setDrawingMode( 'rectangle' );
                break;
            default:
                this.myDrawingManager.close();
        }

        this.setState( {
            drawingModeValue: dataType,
        } )

    }

    // 核心函数方法 绘制完地图产生回调
    onClickMapEdit( e, info ) {
        let _this = this;
        let { map,isDrowState} = this.props;
        let drawingModeValue = this.state.drawingModeValue;
        let points = info.overlay?info.overlay.points?info.overlay.points:[]:[];
        let lngvlaue= info.overlay?info.overlay.latLng?info.overlay.latLng.lng?info.overlay.latLng.lng:'':'':'';
        let latvalue= info.overlay?info.overlay.latLng?info.overlay.latLng.lat?info.overlay.latLng.lat:'':'':'';
        let radius = info.overlay?info.overlay.radius?info.overlay.radius:50:50;
        let resultpoints = [];
        let resultvalues = [lngvlaue,latvalue];
        map.removeEventListener( 'dblclick' );
        switch ( drawingModeValue ) {
            case "polyline":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let addPolylineData = _this.state.addPolylineData;
                    addPolylineData.data = resultpoints;
                    addPolylineData.info = info;
                    _this.setState( {
                        addPolylineData
                    } )
                } )
                break;
            case "circle":
                let addCircleData = _this.state.addCircleData;
                addCircleData.data = resultvalues;
                addCircleData.info = info;
                addCircleData.radius = radius;
                _this.setState({
                    addCircleData,
                })
                break;
            case "marker":
                let addMarkerData = _this.state.addMarkerData;
                addMarkerData.data = resultvalues;
                addMarkerData.info = info;
                _this.setState({
                    addMarkerData,
                })
                break;
            case "polygon":
                points.pop();
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let addPolygonData = _this.state.addPolygonData;
                    addPolygonData.data = resultpoints;
                    addPolygonData.info = info;
                    _this.setState( {
                        addPolygonData
                    } )
                } )
                break;
            case "rectangle":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let addPolygonData = _this.state.addPolygonData;
                    addPolygonData.data = resultpoints;
                    addPolygonData.info = info;
                    _this.setState( {
                        addPolygonData
                    } )
                } )
                break;
            case "fonttext":
                let addLabeldata = _this.state.addLabeldata;
                addLabeldata.data = resultvalues;
                addLabeldata.info = info;
                _this.setState({
                    addLabeldata,
                })
                break;
            case "custom":
                let addCustomOverlaydata = _this.state.addCustomOverlaydata;
                addCustomOverlaydata.data = resultvalues;
                addCustomOverlaydata.info = info;
                _this.setState({
                    addCustomOverlaydata,
                })
                break;
            case "G3dpolygon":
                points.pop();
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dPolyData = _this.state.add3dPolyData;
                    add3dPolyData.data = resultpoints;
                    add3dPolyData.info = info;
                    _this.setState( {
                        add3dPolyData
                    } )
                } )
                break;
            case "G3drectangle":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dPolyData = _this.state.add3dPolyData;
                    add3dPolyData.data = resultpoints;
                    add3dPolyData.info = info;
                    _this.setState( {
                        add3dPolyData
                    } )
                } )
                break;
            case "G3dcircle":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dPolyData = _this.state.add3dPolyData;
                    add3dPolyData.data = resultpoints;
                    add3dPolyData.info = info;
                    _this.setState( {
                        add3dPolyData
                    } )
                } )
                break;
            case "3dpolygon":
                points.pop();
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dData = _this.state.add3dData;
                    add3dData.data = resultpoints;
                    add3dData.info = info;
                    _this.setState( {
                        add3dData
                    } )
                } )
                break
            case "3drectangle":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dData = _this.state.add3dData;
                    add3dData.data = resultpoints;
                    add3dData.info = info;
                    _this.setState( {
                        add3dData
                    } )
                } )
                break
            case "3dcircle":
                this.coorConvert( points ).then( ( res ) => {
                    for ( let i = 0; i < res.length; i ++ ) {
                        let lngvlaue = res[i] ? res[i].lng : '';
                        let latvalue = res[i] ? res[i].lat : '';
                        resultpoints.push( [ lngvlaue, latvalue ] )
                    }
                    resultpoints = resultpoints.filter( item => item );// 去重
                    let add3dData = _this.state.add3dData;
                    add3dData.data = resultpoints;
                    add3dData.info = info;
                    _this.setState( {
                        add3dData
                    } )
                } )
                break
            default:
                message.warn( '发生错误，未知类型！' );
        }
        isDrowState(true);
        this.myDrawingManager.close();
    }

    // 坐标转换函数
    // 依赖百度坐标转换，但是百度依赖最多一次转换10个，所以分批转换
    coorConvert( data ) {
        return new Promise( resolve1 => {
            let datalogin = data.length ? data.length : 0;
            let result = [];
            if ( datalogin === 0 ) {
                resolve1( result );
            }
            let newdata = spArr( data, 10 )
            // 百度转换方法
            let convertor = new BMapGL.Convertor();

            async function run() {
                for ( let i = 0; i < newdata.length; i ++ ) {
                    await asyncOperate( newdata[i], i )
                }
            }

            run().then( () => {
                resolve1( result );
            } )

            function asyncOperate( data, index ) {
                return Promise.resolve( data, index )
                .then( ( res ) => {
                    return new Promise( ( resolve, reject ) => {
                        convertor.translate( res, 6, 5, function ( item ) {
                            if ( item.status === 0 ) {
                                result = result.concat( item.points );
                                resolve( result )
                            }
                            else {
                                reject( result )
                            }
                        } )
                    } )
                } )
            }

            //arr是你要分割的数组，num是以几个为一组
            function spArr( arr, num ) {
                let newArr = [] //首先创建一个新的空数组。用来存放分割好的数组
                for ( let i = 0; i < arr.length; ) { //注意：这里与for循环不太一样的是，没有i++
                    newArr.push( arr.slice( i, i += num ) );
                }
                return newArr
            }
        } );
    }

    render() {
        let { map } = this.props;
        let { drawingModeValue, drawingModeType } = this.state;
        let { addPolylineData,addCircleData,addMarkerData,addPolygonData,addLabeldata,addCustomOverlaydata,add3dPolyData,add3dData } = this.state;
        let { resultMapView } = this.props;

        return (
            <div className="DrawingManagerUtil">
                {/*工具栏切换模式*/ }
                <div className="drawingmanagerutil_type">
                    <span className="drawingmanagerutil_type_left">当前模式：</span>
                    <span>{ drawingModeType === 'plane' && '平面图层' }{ drawingModeType === '3d' && '3d图层' }{ drawingModeType === 'G3d' && '高级3d图层' }</span>
                    <div className="drawingmanagerutil_bom">
                        <span className="drawingmanagerutil_type_left" >切换模式：</span>
                        <span className={ `${ "drawingmanagerutil_type_icon" } ${ drawingModeType === 'plane' ?
                                                                                  "active" :
                                                                                  '' }` } title={ '平面图层' } onClick={ () => this.typeDrawingFun( 'plane' ) }>
                            <AppstoreFilled />
                        </span>
                        <span className={ `${ "drawingmanagerutil_type_icon" } ${ drawingModeType === 'G3d' ?
                                                                                  "active" :
                                                                                  '' }` } title={ '高级3d图层' } onClick={ () => this.typeDrawingFun( 'G3d' ) }>
                            <RetweetOutlined />
                        </span>

                        {/*<BuildFilled className={ `${ "drawingmanagerutil_type_icon" } ${ drawingModeType === '3d' ?
                                                                                           "active" :
                                                                                           '' }` } title={ '3d图层' } onClick={ () => this.typeDrawingFun( '3d' ) }/>*/}
                    </div>
                </div>
                {/*工具栏切换*/ }
                <div className={ "drawingmanagerutil_tool" }>
                    { drawingModeType === '3d' ?
                      (
                          <>
                              <span onClick={ () => this.onClickToolFun( '3dpolygon' ) } className={ `${ "span" } ${ drawingModeValue === '3dpolygon' ?
                                                                                                                     "active" :
                                                                                                                     '' }` } title={ '多边形' }><BoxPlotOutlined/></span>
                              <span onClick={ () => this.onClickToolFun( '3drectangle' ) } className={ `${ "span" } ${ drawingModeValue === '3drectangle' ?
                                                                                                                       "active" :
                                                                                                                       '' }` } title={ '矩形' }><BorderOutlined/></span>
                              <span onClick={ () => this.onClickToolFun( '3dcircle' ) } className={ `${ "span" } ${ drawingModeValue === '3dcircle' ?
                                                                                                                    "active" :
                                                                                                                    '' }` } title={ '圆' }><EuroOutlined/></span>
                          </>
                      ) : drawingModeType === 'plane' ? (
                            <>
                                <span onClick={ () => this.onClickToolFun( 'marker' ) } className={ `${ "span" } ${ drawingModeValue === 'marker' ?
                                                                                                                    "active" :
                                                                                                                    '' }` } title={ '点' }><EnvironmentOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'circle' ) } className={ `${ "span" } ${ drawingModeValue === 'circle' ?
                                                                                                                    "active" :
                                                                                                                    '' }` } title={ '圆' }><EuroOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'polyline' ) } className={ `${ "span" } ${ drawingModeValue === 'polyline' ?
                                                                                                                      "active" :
                                                                                                                      '' }` } title={ '线' }><RiseOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'polygon' ) } className={ `${ "span" } ${ drawingModeValue === 'polygon' ?
                                                                                                                     "active" :
                                                                                                                     '' }` } title={ '多边形' }><BoxPlotOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'rectangle' ) } className={ `${ "span" } ${ drawingModeValue === 'rectangle' ?
                                                                                                                       "active" :
                                                                                                                       '' }` } title={ '矩形' }><BorderOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'fonttext' ) } className={ `${ "span" } ${ drawingModeValue === 'fonttext' ?
                                                                                                                      "active" :
                                                                                                                      '' }` } title={ '文本' }><FontColorsOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'custom' ) } className={ `${ "span" } ${ drawingModeValue === 'custom' ?
                                                                                                                    "active" :
                                                                                                                    '' }` } title={ '覆盖物' }><BlockOutlined/></span>
                            </>
                        ) : drawingModeType === 'G3d' ? (
                            <>
                                <span onClick={ () => this.onClickToolFun( 'G3dpolygon' ) } className={ `${ "span" } ${ drawingModeValue === 'G3dpolygon' ?
                                                                                                                        "active" :
                                                                                                                        '' }` } title={ '多边体' }><BoxPlotOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'G3drectangle' ) } className={ `${ "span" } ${ drawingModeValue === 'G3drectangle' ?
                                                                                                                          "active" :
                                                                                                                          '' }` } title={ '矩形体' }><BorderOutlined/></span>
                                <span onClick={ () => this.onClickToolFun( 'G3dcircle' ) } className={ `${ "span" } ${ drawingModeValue === 'G3dcircle' ?
                                                                                                                       "active" :
                                                                                                                       '' }` } title={ '圆柱体' }><EuroOutlined/></span>
                            </> ) : ( <></> )
                    }
                </div>

                {/*工具下的选择样式类型*/ }
                {
                    drawingModeValue&&
                    <div className="drawingmanagerutil_class" >
                        {
                            drawingModeType === 'plane' && <>
                                {
                                    drawingModeValue === 'fonttext' &&
                                    <FonttextEdit map={map} addLabeldata={addLabeldata} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'polyline' &&
                                    <PolylineEdit map={ map } addPolylineData={ addPolylineData } resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'marker' &&
                                    <MarkerEdit map={map} addMarkerData={addMarkerData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'circle' &&
                                    <CircleEdit map={map} addCircleData={addCircleData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    ( drawingModeValue === 'polygon' || drawingModeValue === 'rectangle' ) &&
                                    <PolygonAndRectangleEdit map={map} addPolygonData={addPolygonData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'custom' &&
                                    <CustomEdit map={map} addCustomOverlaydata={addCustomOverlaydata} resultMapView={ resultMapView.bind( this ) }/>
                                }
                            </>
                        }
                        {
                            drawingModeType === 'G3d' && <>
                                {
                                    ( drawingModeValue === 'G3dpolygon' || drawingModeValue === 'G3dcircle' || drawingModeValue === 'G3drectangle' ) &&
                                    <G3dPCREdit map={map} add3dPolyData={add3dPolyData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                            </>
                        }
                        {
                            drawingModeType === '3d' && <>
                                {
                                    ( drawingModeValue === '3dpolygon' || drawingModeValue === '3drectangle' || drawingModeValue === '3dcircle' ) &&
                                    <M3dPCREdit map={map} add3dData={add3dData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                            </>
                        }
                    </div>
                }

            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
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
        isLayer_BD: state.vars.isLayer_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        init: ( _this ) => {

        },
        // 绘制是否开启
        isDrowState:(falge) =>{
            dispatch( actions.setVars( 'isDrowState_BD', falge ) )
        },
        // 重新渲染结果-添加数据
        resultMapView( drawingType, drawingModeValue, drawingDate ) {
            let _this = this;
            let objlist = [];
            let postdata = {
                type: drawingModeValue,
                data: drawingDate,
            }
            switch ( drawingModeValue ) {
                case "polyline":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataPolyLine_BD', objlist ) )
                        dispatch( actions.setVars( 'isPolyLine_BD', !_this.props.isPolyLine_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "circle":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataCricle_BD', objlist ) )
                        dispatch( actions.setVars( 'isPolyCricle_BD', !_this.props.isPolyCricle_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "marker":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataMarker_BD', objlist ) )
                        dispatch( actions.setVars( 'isMarker_BD', !_this.props.isMarker_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "polygon":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataPolyGon_BD', objlist ) )
                        dispatch( actions.setVars( 'isPolyGon_BD', !_this.props.isPolyGon_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "fonttext":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataLabel_BD', objlist ) )
                        dispatch( actions.setVars( 'isPolyLabel_BD', !_this.props.isPolyLabel_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "custom":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'planeDataCustom_BD', objlist ) )
                        dispatch( actions.setVars( 'isCustom_BD', !_this.props.isCustom_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                case "G3dpolygon":
                    if ( drawingType === 1 ) {
                        objlist.push( drawingDate )
                        dispatch( actions.appendLists( 'standDataPoylon_BD', objlist ) )
                        dispatch( actions.setVars( 'isStand_BD', !_this.props.isStand_BD ) )
                        _this.props.addDataResultFun_BD&&_this.props.addDataResultFun_BD( _this, postdata )
                    }
                    else {
                        delDoms();
                    }
                    break;
                default:
                    message.warning( '发生错误，未知类型！' );
            }
            _this.props.isDrowState( false );
            _this.props.ResetDataAndDraw( _this );

            function delDoms(  ) {
                let $cancelOperate = $( '#cancelOperate' );
                if ( $cancelOperate.length > 0 ) {
                    $cancelOperate.click();
                }
            }
        },
        //重置数据
        ResetDataAndDraw: ( _this ) => {
            let $cancelOperate = $( '#cancelOperate' );
            if ( $cancelOperate.length > 0 ) {
                $cancelOperate.click();
            }
            _this.myDrawingManager.close();

            if ( _this.state.addPolylineData.info ) {
                _this.props.map.removeOverlay( _this.state.addPolylineData.info.overlay )
            }

            _this.setState( {
                drawingModeValue: '',
                addPolylineData: {
                    data: [],
                },
                addCircleData: {
                    radius:50,
                    data: [],
                },
                addMarkerData: {
                    data: [],
                },
                addPolygonData:{
                    data:[]
                },
                addLabeldata:{
                    data:[],
                },
                addCustomOverlaydata:{
                    data:[],
                },
                add3dPolyData:{
                    data:[],
                },
            } )
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( DrawingManagerUtil )
