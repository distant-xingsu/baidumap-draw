//绘制工具  https://github.com/huiyan-fe/BMapGLLib
import React from 'react'
import actions from "../redux/actions";
import { connect } from "react-redux";
import '../assest/css/baidumap.css'
import { AppstoreFilled, BlockOutlined, BorderOutlined, BoxPlotOutlined,  EnvironmentOutlined, EuroOutlined, FontColorsOutlined, RetweetOutlined, RiseOutlined } from '@ant-design/icons'; //BuildFilled,
import { message } from 'antd';
import { getIcons, labelOptions, styleOptions } from '../utils/defaultParame'
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
import GenNonDuplicateID from "../utils/randomNumId";
import { getRgbaAlp, hexify } from "../utils/colorType";
import CustomOverlayDom from "../utils/CustomOverlayDom";

class DrawingManagerUtil extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.onClickMapEdit = this.onClickMapEdit.bind( this );
        this.myDrawingManager = undefined;

        this.add3dPolyDataRefs = React.createRef();
        this.addLabeldataRefs = React.createRef();
        this.addPolylineDataRefs = React.createRef();
        this.addMarkerDataRefs = React.createRef();
        this.addCircleDataRefs = React.createRef();
        this.addPolygonDataRefs = React.createRef();
        this.addCustomOverlaydataRefs = React.createRef();

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
                    //addPolylineData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        addPolylineData
                    },()=>{
                        _this.addDataAll('polyline',resultpoints);
                    } )
                } )
                break;
            case "circle":
                let addCircleData = _this.state.addCircleData;
                addCircleData.data = resultvalues;
                // addCircleData.info = info;
                _this.props.map.removeOverlay(info.overlay )
                addCircleData.radius = radius;
                _this.setState({
                    addCircleData,
                },()=>{
                    _this.addDataAll('circle',resultvalues,radius);
                })
                break;
            case "marker":
                let addMarkerData = _this.state.addMarkerData;
                addMarkerData.data = resultvalues;
                // addMarkerData.info = info;
                _this.props.map.removeOverlay(info.overlay )
                _this.setState({
                    addMarkerData,
                },()=>{
                    _this.addDataAll('marker',resultvalues);
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
                    // addPolygonData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        addPolygonData
                    },()=>{
                        _this.addDataAll('polygon',resultpoints);
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
                    // addPolygonData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        addPolygonData
                    },()=>{
                        _this.addDataAll('polygon',resultpoints);
                    } )
                } )
                break;
            case "fonttext":
                let addLabeldata = _this.state.addLabeldata;
                addLabeldata.data = resultvalues;
                //addLabeldata.info = info;
                _this.props.map.removeOverlay(info.overlay )
                _this.setState({
                    addLabeldata,
                },()=>{
                    _this.addDataAll('fonttext',resultvalues);
                })
                break;
            case "custom":
                let addCustomOverlaydata = _this.state.addCustomOverlaydata;
                addCustomOverlaydata.data = resultvalues;
                // addCustomOverlaydata.info = info;
                _this.props.map.removeOverlay(info.overlay )
                _this.setState({
                    addCustomOverlaydata,
                },()=>{
                    _this.addDataAll('custom',resultvalues);
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
                    // add3dPolyData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        add3dPolyData
                    },()=>{
                        _this.addDataAll('G3dpolygon',resultpoints);
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
                    // add3dPolyData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        add3dPolyData
                    },()=>{
                        _this.addDataAll('G3dpolygon',resultpoints);
                    })
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
                    // add3dPolyData.info = info;
                    _this.props.map.removeOverlay(info.overlay )
                    _this.setState( {
                        add3dPolyData
                    } ,()=>{
                        _this.addDataAll('G3dpolygon',resultpoints);
                    })
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

    // 添加数据
    addDataAll(_type,_data,_other){
        let { map } = this.props;
        switch (_type) {
            case 'G3dpolygon':
                let G3dpolygon_item = this.add3dPolyDataRefs&&this.add3dPolyDataRefs.state.add3dPolyData;
                let add3dPolyData = this.state.add3dPolyData;
                let G3dpolygon_newdata = []; // 数据
                let G3dpolygon_newsdomid = GenNonDuplicateID();
                let G3dpolygon_newtopFillColor = G3dpolygon_item.style ?
                                                 G3dpolygon_item.style.topFillColor ? hexify( G3dpolygon_item.style.topFillColor ) : "#00c5ff" :
                                                 "#00c5ff";//顶面的颜色，同CSS颜色
                let G3dpolygon_newtopFillOpacity = G3dpolygon_item.style ?
                                                   G3dpolygon_item.style.topFillColor ? getRgbaAlp( G3dpolygon_item.style.topFillColor ) : 1.0 :
                                                   1.0;//顶面透明度，范围0-1
                let G3dpolygon_newsideFillColor = G3dpolygon_item.style ?
                                                  G3dpolygon_item.style.sideFillColor ? hexify( G3dpolygon_item.style.sideFillColor ) : '#195266' :
                                                  '#195266';//测面填充颜色，同CSS颜色  "#195266"
                let G3dpolygon_newsideFillOpacity = G3dpolygon_item.style ?
                                                    G3dpolygon_item.style.sideFillColor ? getRgbaAlp( G3dpolygon_item.style.sideFillColor ) : 1.0 :
                                                    1.0;// 测面填充的透明度，范围0-1
                for ( let j = 0; j < _data.length; j ++ ) {
                    let resuitem = _data[j];
                    let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                    G3dpolygon_newdata.push( point )
                }
                let G3dpolygon_newdom = new BMapGL.Prism( G3dpolygon_newdata, G3dpolygon_item.height ? G3dpolygon_item.height : 20, {
                    domid: G3dpolygon_newsdomid,
                    domtype: 'standDataPoylonAdd', //自定义类型
                    topFillColor: G3dpolygon_newtopFillColor,
                    topFillOpacity: G3dpolygon_newtopFillOpacity,
                    sideFillColor: G3dpolygon_newsideFillColor,
                    sideFillOpacity: G3dpolygon_newsideFillOpacity,
                    enableEditing: false,//可编辑
                } );

                map.addOverlay( G3dpolygon_newdom );

                add3dPolyData.info = G3dpolygon_newdom;
                this.setState( {
                    add3dPolyData
                })
                break
            case 'fonttext':
                let fonttext_item = this.addLabeldataRefs&&this.addLabeldataRefs.state.addLabeldata;
                let addLabeldata = this.state.addLabeldata;
                let fonttext_newdata = new BMapGL.Point( _data[0], _data[1] );
                let fonttext_newsdomid = GenNonDuplicateID();

                let fonttext_newdom = new BMapGL.Label( fonttext_item.title?fonttext_item.title:'在这里', {
                    domid: fonttext_newsdomid,
                    domtype: 'planeDataLabelAdd', //自定义类型
                    position: fonttext_newdata,
                } );

                map.addOverlay( fonttext_newdom );
                fonttext_item.style.padding = '0 5px';
                fonttext_newdom.setStyle( fonttext_item.style )
                addLabeldata.info = fonttext_newdom;
                this.setState( {
                    addLabeldata
                })
                break
            case 'polyline':
                let polyline_item = this.addPolylineDataRefs&&this.addPolylineDataRefs.state.addPolylineData;
                let addPolylineData = this.state.addPolylineData;
                let polyline_newdata = []; // 数据
                let polyline_newsdomid = GenNonDuplicateID();
                let polyline_newstrokeColor = polyline_item.style ?
                                              polyline_item.style.strokeColor ? hexify( polyline_item.style.strokeColor ) : "#00c5ff" :
                                              "#00c5ff"; // 描边颜色
                let polyline_newsstrokeOpacity = polyline_item.style ?
                                                 polyline_item.style.strokeColor ? getRgbaAlp( polyline_item.style.strokeColor ) : 1.0 :
                                                 1.0; // 描边透明度
                let polyline_newsstrokeStyle = polyline_item.style ?
                                               polyline_item.style.strokeStyle ? polyline_item.style.strokeStyle : 'solid' :
                                               'solid';  //"solid" | "dashed" | "dotted"
                let polyline_newsstrokeWeight = polyline_item.style ? polyline_item.style.strokeWeight ? polyline_item.style.strokeWeight : 2 : 2; // 描边宽度

                for ( let j = 0; j < _data.length; j ++ ) {
                    let resuitem = _data[j];
                    let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                    polyline_newdata.push( point )
                }

                let polyline_newdom = new BMapGL.Polyline( polyline_newdata, {
                    domid: polyline_newsdomid,
                    domtype: 'planeDataPolyLineAdd', //自定义类型
                    strokeColor: polyline_newstrokeColor,
                    strokeOpacity: polyline_newsstrokeOpacity,
                    strokeStyle: polyline_newsstrokeStyle,
                    strokeWeight: polyline_newsstrokeWeight,

                    enableEditing: false,//可编辑
                    geodesic: false,//大地线
                } );

                map.addOverlay( polyline_newdom );

                addPolylineData.info = polyline_newdom;
                this.setState( {
                    addPolylineData
                })

                break
            case 'marker':
                let marker_item = this.addMarkerDataRefs&&this.addMarkerDataRefs.state.addMarkerData;
                let addMarkerData = this.state.addMarkerData;
                let marker_newdata = new BMapGL.Point( _data[0], _data[1] );
                let marker_newsdomid = GenNonDuplicateID();
                let marker_newdom = new BMapGL.Marker( marker_newdata, {
                    domid: marker_newsdomid,
                    domtype: 'planeDataMarkerAdd', //自定义类型
                    icon: getIcons( marker_item.imgSrc ? marker_item.imgSrc : 'simple_red' ),
                    enableEditing: false,//可编辑
                } );
                map.addOverlay( marker_newdom );
                // 为标注添加文本标注
                let marker_markerlabel = new BMapGL.Label( marker_item.title, {
                    offset: setOfFset( marker_item.title ) // 设置文本偏移量
                } )
                marker_newdom.setLabel( marker_markerlabel )
                marker_markerlabel.setStyle( {
                    color: marker_item.style.color ? marker_item.style.color : '#fff',
                    backgroundColor: marker_item.style.backgroundColor ? marker_item.style.backgroundColor : 'rgba(0,0,0,0)',
                    borderColor: marker_item.style.borderColor ? marker_item.style.borderColor : 'rgba(0,0,0,0)',
                    fontSize: '14px',
                    padding: '0 5px'
                } )
                addMarkerData.info = marker_newdom;
                this.setState( {
                    addMarkerData
                })
                break
            case 'polygon':
                let polygon_item = this.addPolygonDataRefs&&this.addPolygonDataRefs.state.addPolygonData;
                let addPolygonData = this.state.addPolygonData;

                let polygon_newdata = []; // 数据
                let polygon_newsdomid = GenNonDuplicateID();
                let polygon_newstrokeColor = polygon_item.style ?
                                             polygon_item.style.strokeColor ? hexify( polygon_item.style.strokeColor ) : "#00c5ff" :
                                             "#00c5ff"; // 描边颜色
                let polygon_newsstrokeOpacity = polygon_item.style ?
                                                polygon_item.style.strokeColor ? getRgbaAlp( polygon_item.style.strokeColor ) : 1.0 :
                                                1.0; // 描边透明度
                let polygon_newsstrokeStyle = polygon_item.style ?
                                              polygon_item.style.strokeStyle ? polygon_item.style.strokeStyle : 'solid' :
                                              'solid';  //"solid" | "dashed" | "dotted"
                let polygon_newsstrokeWeight = polygon_item.style ? polygon_item.style.strokeWeight ? polygon_item.style.strokeWeight : 2 : 2; // 描边宽度

                let polygon_newfillColor = polygon_item.style ?
                                           polygon_item.style.fillColor ? hexify( polygon_item.style.fillColor ) : '#00c5ff' :
                                           '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"
                let polygon_newfillOpacity = polygon_item.style ? polygon_item.style.fillColor ? getRgbaAlp( polygon_item.style.fillColor ) : 1.0 : 1.0; // 面填充的透明度，范围0-1

                for ( let j = 0; j < _data.length; j ++ ) {
                    let resuitem = _data[j];
                    let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                    polygon_newdata.push( point )
                }

                let polygon_newdom = new BMapGL.Polygon( polygon_newdata, {
                    domid: polygon_newsdomid,
                    domtype: 'planeDataPolyGonAdd', //自定义类型
                    strokeColor: polygon_newstrokeColor,
                    strokeOpacity: polygon_newsstrokeOpacity,
                    strokeStyle: polygon_newsstrokeStyle,
                    strokeWeight: polygon_newsstrokeWeight,
                    fillColor: polygon_newfillColor,
                    fillOpacity: polygon_newfillOpacity,
                    enableEditing: false,//可编辑
                } );

                map.addOverlay( polygon_newdom );

                addPolygonData.info = polygon_newdom;
                this.setState( {
                    addPolygonData
                })

                break
            case 'circle':
                let circle_item = this.addCircleDataRefs&&this.addCircleDataRefs.state.addCircleData;
                let addCircleData = this.state.addCircleData;

                let circle_newdata = new BMapGL.Point( _data[0], _data[1] );
                let circle_newsdomid = GenNonDuplicateID();
                let circle_newstrokeColor = circle_item.style ?
                                            circle_item.style.strokeColor ? hexify( circle_item.style.strokeColor ) : "#00c5ff" :
                                            "#00c5ff"; // 描边颜色
                let circle_newsstrokeOpacity = circle_item.style ?
                                               circle_item.style.strokeColor ? getRgbaAlp( circle_item.style.strokeColor ) : 1.0 :
                                               1.0; // 描边透明度
                let circle_newsstrokeStyle = circle_item.style ?
                                             circle_item.style.strokeStyle ? circle_item.style.strokeStyle : 'solid' :
                                             'solid';  //"solid" | "dashed" | "dotted"
                let circle_newsstrokeWeight = circle_item.style ? circle_item.style.strokeWeight ? circle_item.style.strokeWeight : 2 : 2; // 描边宽度

                let circle_newfillColor = circle_item.style ?
                                          circle_item.style.fillColor ? hexify( circle_item.style.fillColor ) : '#00c5ff' :
                                          '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"
                let circle_newfillOpacity = circle_item.style ? circle_item.style.fillColor ? getRgbaAlp( circle_item.style.fillColor ) : 1.0 : 1.0; // 面填充的透明度，范围0-1

                let circle_newdom = new BMapGL.Circle( circle_newdata, _other ? _other : 100,  {
                    domid: circle_newsdomid,
                    domtype: 'planeDataCricleAdd', //自定义类型
                    strokeColor: circle_newstrokeColor,
                    strokeOpacity: circle_newsstrokeOpacity,
                    strokeStyle: circle_newsstrokeStyle,
                    strokeWeight: circle_newsstrokeWeight,
                    fillColor: circle_newfillColor,
                    fillOpacity: circle_newfillOpacity,

                    enableEditing: false,//可编辑
                } );

                map.addOverlay( circle_newdom );

                addCircleData.info = circle_newdom;
                this.setState( {
                    addCircleData
                })
                break
            case 'custom':
                let custom_item = this.addCustomOverlaydataRefs&&this.addCustomOverlaydataRefs.state.addCustomOverlaydata;
                let addCustomOverlaydata = this.state.addCustomOverlaydata;
                let custom_newdata = new BMapGL.Point( _data[0], _data[1] );
                let custom_newsdomid = GenNonDuplicateID();
                let custom_olddom = custom_item.style ? custom_item.style.dom ? custom_item.style.dom : '<div style="color: #fff;width: 100px;">在这里</div>' : '<div style="color: #fff;width: 100px;">在这里</div>';
                let custom_newdom = new CustomOverlayDom( custom_newdata, {
                    html: <div id={ custom_newsdomid } style={{textAlign:'center'}}>
                        <div dangerouslySetInnerHTML={ { __html: custom_olddom } }/>
                    </div>,
                    config: {
                        domtype: 'planeDataCustomAdd',
                        domid: custom_newsdomid
                    }
                } )
                map.addOverlay( custom_newdom );
                addCustomOverlaydata.info = custom_newdom;
                this.setState( {
                    addCustomOverlaydata
                })
                break
            default:
        }
        function setOfFset( data ) {
            let lodSize;
            let dataleng = data.length;
            dataleng = dataleng * 8;
            lodSize = new BMapGL.Size( - dataleng, 15 )
            return lodSize
        }
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
                                    <FonttextEdit onRef={(ref)=>this.addLabeldataRefs=ref} map={map} addLabeldata={addLabeldata} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'polyline' &&
                                    <PolylineEdit onRef={(ref)=>this.addPolylineDataRefs=ref} map={ map } addPolylineData={ addPolylineData } resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'marker' &&
                                    <MarkerEdit onRef={(ref)=>this.addMarkerDataRefs=ref} map={map} addMarkerData={addMarkerData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'circle' &&
                                    <CircleEdit onRef={(ref)=>this.addCircleDataRefs=ref} map={map} addCircleData={addCircleData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    ( drawingModeValue === 'polygon' || drawingModeValue === 'rectangle' ) &&
                                    <PolygonAndRectangleEdit  onRef={(ref)=>this.addPolygonDataRefs=ref}  map={map} addPolygonData={addPolygonData} resultMapView={ resultMapView.bind( this ) }/>
                                }
                                {
                                    drawingModeValue === 'custom' &&
                                    <CustomEdit  onRef={(ref)=>this.addCustomOverlaydataRefs=ref}   map={map} addCustomOverlaydata={addCustomOverlaydata} resultMapView={ resultMapView.bind( this ) }/>
                                }
                            </>
                        }
                        {
                            drawingModeType === 'G3d' && <>
                                {
                                    ( drawingModeValue === 'G3dpolygon' || drawingModeValue === 'G3dcircle' || drawingModeValue === 'G3drectangle' ) &&
                                    <G3dPCREdit onRef={(ref)=>this.add3dPolyDataRefs=ref} map={map} add3dPolyData={add3dPolyData} resultMapView={ resultMapView.bind( this ) }/>
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

            let newinfoList = ['addPolylineData','addCircleData','addMarkerData','addPolygonData','addLabeldata','addCustomOverlaydata','add3dPolyData']

            for ( let i = 0; i < newinfoList.length; i ++ ) {
                let ongitem =newinfoList[i];
                if ( _this.state[ongitem].info ) {
                    _this.props.map.removeOverlay( _this.state[ongitem].info )
                }
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
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( DrawingManagerUtil )
