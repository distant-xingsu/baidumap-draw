import React from 'react'
import './assest/css/baidumap.css';
import { Map, MapvglView } from "react-bmapgl";
import MapApiLoaderHOC from './libs/MapApiLoaderHOC'
import actions from "./redux/actions";
import { connect } from "react-redux";
import { Button, Checkbox, message, Spin } from "antd";
import { copyToClipboard } from './utils/copyText'
import DrawingManagerUtil from "./draw/drawingManagerUtil";
import PlaneLine from "./plane/planeLine";
import $ from "jquery";
import PlaneCricle from "./plane/planeCricle";
import PlaneMarker from "./plane/planeMarker";
import PlaneGon from "./plane/planeGon";
import PlaneLabel from "./plane/planeLabel";
import PlaneCustom from "./plane/planeCustom";
import StandPoylon from "./three/standPoylon";

class BaidumapStart extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.btntimer = undefined;
        this.animationMap = undefined;
        this.copyIdDomRef = React.createRef();
        this.copyMainIdDomRef = React.createRef();
        this.state = {
            isLoadedMapSkeleton: true, //是否加载骨架
            isDeveloperEdit: false, //是否开发者模式
            isShowEditBtn: false, //是否显示编辑按钮
            isBtnLoding: false, //开发这模式下点击编辑按钮加载效果
            isCoodCopy: false, // 是否开启坐标复制
            isadnimgAnim: false, //是否开始加载动画
        }
    };

    // in
    componentDidMount() {
        //是否打开开发者模式
        this.developerEdit();
        //处理bind不能监听问题 注意位置顺序
        this.mousemoveMapEdit = this.mousemoveMapEdit.bind( this );
        this.oncopyClickFun = this.oncopyClickFun.bind( this );
        //处理bind不能监听问题 注意位置顺序
        this.loadedMap = this.loadedMap.bind( this );
        //加载地图过程
        this.map && this.map.addEventListener( 'tilesloaded', this.loadedMap )
        //添加地图基本控件，当然也可以直接饮用插件
        this.addMapComponents();
        //返回地图实例
        this.props.baiduMapFun_BD && this.props.baiduMapFun_BD( this.map, this.view );
        // 赋值
        this.props.init( this );
        //动画
        this.animstMapFun( this.props.isAnimsmap_BD && this.props.keypatherAnim_BD );
    };

    //这个钩子也可以进行更新数据，进行渲染
    componentDidUpdate( prevProps ) {
        if ( this.props.isAnimsmap_BD !== prevProps.isAnimsmap ) {
            this.animstMapFun( this.props.isAnimsmap_BD && this.props.keypatherAnim_BD );
        }
    }

    // out
    componentWillUnmount() {
        if ( this.map ) {
            this.map.removeEventListener( "mousemove", this.mousemoveMapEdit );
            this.map.removeEventListener( "tilesloaded", this.loadedMap )
            this.map.clearOverlays();
            this.map.destroy();
        }
        if ( this.animationMap ) {
            this.animationMap.removeEventListener( 'animationstart', this.istrueAnimfun( false ) );
        }

        this.copyMainIdDomRef.current && this.copyMainIdDomRef.current.removeEventListener( 'click', this.oncopyClickFun )
    }

    // 加载地图加载框过程
    loadedMap() {
        this.setState( { isLoadedMapSkeleton: false } )
        require('./ignoreUtil/drawingManager.min')
        this.map && this.map.removeEventListener( "tilesloaded", this.loadedMap )
    };

    // 添加地图的基本控件 事件样式等
    addMapComponents() {
        //惯性拖拽
        this.map && this.map.enableInertialDragging();
        //双击平滑缩放放大
        this.map && this.map.disableContinuousZoom();
        this.map && this.map.disableDoubleClickZoom()
        // 添加比例尺控件
        // let scaleCtrl = new BMapGL.ScaleControl( { offset: new BMapGL.Size( 70, 3 ) } );
        // this.map.addControl( scaleCtrl );
        // // 添加缩放控件
        // let zoomCtrl = new BMapGL.ZoomControl( { offset: new BMapGL.Size( 12.5, 22 ) } );
        // this.map.addControl( zoomCtrl );
        // // 添加3d控件
        // let navigationCtrl = new BMapGL.NavigationControl3D();
        // this.map.addControl( navigationCtrl );
    };

    // 开发者模式是否打开
    developerEdit() {
        let isFlage = this.props.isDeveloperEditProp_BD;
        if ( isFlage ) {
            this.setState( { isDeveloperEdit: isFlage } )
        }
        else {
            this.setState( { isDeveloperEdit: false } )
        }
    };

    // 是否展示隐藏编辑模式
    isShowOrHideBtnOnClick() {
        let isShowEditBtnflag = this.state.isShowEditBtn;
        let isDrowState = this.props.isDrowState_BD;
        let _this = this;
        if ( isDrowState ) {
            message.warning( '请先完成当前绘制！' )
            return
        }
        let $cancelOperate = $( '#cancelOperate' );
        if ( $cancelOperate.length > 0 ) {
            $cancelOperate.click();
        }
        this.setState( {
            isBtnLoding: true,
        } )
        clearTimeout( this.btntimer );
        this.btntimer = setTimeout( function () {
            if ( isShowEditBtnflag ) {
                _this.map.removeEventListener( 'mousemove', _this.mousemoveMapEdit );
                _this.oncopyFun( false )
                _this.props.isEditProp_BD && _this.props.isEditProp_BD( false )
                _this.setState( {
                    isShowEditBtn: false,
                    isBtnLoding: false,
                } )
            }
            else {
                _this.setState( {
                    isShowEditBtn: true,
                    isBtnLoding: false,
                } );
                _this.props.isEditProp_BD && _this.props.isEditProp_BD( true )
                _this.map.addEventListener( 'mousemove', _this.mousemoveMapEdit );
            }
        }, 1500 )
    };

    // 鼠标在编辑模式下移动
    mousemoveMapEdit( e ) {
        if ( this.copyIdDomRef.current !== null ) {
            this.copyIdDomRef.current.innerText =
                e.latlng.lng + ' , ' + e.latlng.lat
        }
    };

    // 是否开启复制坐标模式
    oncopyFun( e ) {
        let flage = e;
        if ( !flage ) {
            this.copyMainIdDomRef.current && this.copyMainIdDomRef.current.removeEventListener( 'click', this.oncopyClickFun )
        }
        this.setState( {
            isCoodCopy: flage
        }, () => {
            if ( flage ) {
                this.copyMainIdDomRef.current && this.copyMainIdDomRef.current.addEventListener( 'click', this.oncopyClickFun )
            }
        } )
    }

    // 开启复制坐标模式点击事件
    oncopyClickFun() {
        copyToClipboard( 'copyId' )
    }

    // 是否开启动画
    animstMapFun( isfalge, keypather ) {
        // 定义关键帧
        var isadnimgAnim = this.state.isadnimgAnim;

        var keyFrames = keypather ? keypather : [];

        var opts = {
            duration: 40000,
            delay: 1000,
            interation: 'INFINITE'  //无限循环
        };

        // 声明动画对象
        if ( isfalge ) {
            this.animationMap = new BMapGL.ViewAnimation( keyFrames, opts );
            this.animationMap.addEventListener( 'animationstart', this.istrueAnimfun( true ) );
            // 开始播放动画
            this.map.startViewAnimation( this.animationMap )
        }
        else {
            if ( isadnimgAnim ) {
                this.animationMap.removeEventListener( 'animationstart', this.istrueAnimfun( false ) );
                // 结束播放动画
                this.map.cancelViewAnimation( this.animationMap )
            }
        }
    };

    // 是否加载动画
    istrueAnimfun( data ) {
        this.setState( {
            isadnimgAnim: data,
        } )
    }

    render() {
        let { isLoadedMapSkeleton, isDeveloperEdit, isShowEditBtn, isBtnLoding, isCoodCopy } = this.state;
        let { coordinateItem_BD, zoomItem_BD, headingItem_BD, tiltItem_BD, mapTypeItem_BD, StyleItem_BD } = this.props; //接过来的配置
        let {
                planeDataPolyLine_BD, planeDataCricle_BD, planeDataMarker_BD,
                planeDataPolyGon_BD, planeDataLabel_BD, planeDataCustom_BD, standDataPoylon_BD
            } = this.props; //接过来的数据
        let { onMapOverClickFun_BD, onMapOverdbClickFun_BD, delDataResultFun_BD } = this.props; //接过来的方法
        let {
                isPolyLine_BD, isPolyCricle_BD, isMarker_BD, isPolyGon_BD,
                isPolyLabel_BD, isCustom_BD, isStand_BD
            } = this.props;

        return (
            <div className="baidumap">
                {/*加载地图*/ }
                <Map ref={ ( ref ) => {
                    this.map = ref && ref.map
                } } style={ {
                    height: '100%',
                    width: '100%'
                } } mapStyleV2={ { styleJson: StyleItem_BD } } enableDoubleClickZoom={ false } // 是否开启双击鼠标缩放
                     center={ coordinateItem_BD } zoom={ zoomItem_BD } heading={ headingItem_BD } tilt={ tiltItem_BD } enableDragging={ true } //是否开启地图可拖拽缩放
                     mapType={ mapTypeItem_BD } enableScrollWheelZoom={ true } //是否开启鼠标滚轮缩放
                     maxZoom={ 22 } minZoom={ 1 }  //地图最大/小缩放级别
                >
                    {/*平面 - 线*/ }
                    <PlaneLine map={ this.map } isEnableDragging={ isShowEditBtn } planeDataPolyLine={ planeDataPolyLine_BD }
                               delDataResultFun={ delDataResultFun_BD } isPolyLine={ isPolyLine_BD }
                               onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*平面 - 圆*/ }
                    <PlaneCricle map={ this.map } isEnableDragging={ isShowEditBtn } planeDataCricle={ planeDataCricle_BD }
                                 delDataResultFun={ delDataResultFun_BD } isPolyCricle={ isPolyCricle_BD }
                                 onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*平面 - 点*/ }
                    <PlaneMarker map={ this.map } isEnableDragging={ isShowEditBtn } planeDataMarker={ planeDataMarker_BD }
                                 delDataResultFun={ delDataResultFun_BD } isMarker={ isMarker_BD }
                                 onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*平面 - 多边形*/ }
                    <PlaneGon map={ this.map } isEnableDragging={ isShowEditBtn } planeDataPolyGon={ planeDataPolyGon_BD }
                              delDataResultFun={ delDataResultFun_BD } isPolyGon={ isPolyGon_BD }
                              onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*平面 - 文本*/ }
                    <PlaneLabel map={ this.map } isEnableDragging={ isShowEditBtn } planeDataLabel={ planeDataLabel_BD }
                                delDataResultFun={ delDataResultFun_BD } isPolyLabel={ isPolyLabel_BD }
                                onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*平面 - 自定义*/ }
                    <PlaneCustom map={ this.map } isEnableDragging={ isShowEditBtn } planeDataCustom={ planeDataCustom_BD }
                                 delDataResultFun={ delDataResultFun_BD } isCustom={ isCustom_BD }
                                 onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*立体 - 多边形*/ }
                    <StandPoylon map={ this.map } isEnableDragging={ isShowEditBtn } standDataPoylon={ standDataPoylon_BD }
                                 delDataResultFun={ delDataResultFun_BD } isStand={ isStand_BD }
                                 onMapClickFun={ onMapOverClickFun_BD } onMapdbClickFun={ onMapOverdbClickFun_BD }
                    />
                    {/*图层：立体 - 多边形*/ }
                    <MapvglView map={ this.map } ref={ ( ref ) => {
                        this.view = ref && ref.view
                    } }
                        // effects={["bloom"]}  //"bloom" | "bright" | "blur" //后处理效果  数组
                    >
                        {/*<MapvglLayers map={this.map} view={this.view} mapvglLayersdata={layerDataMap.mapvglLayersdata}*/ }
                        {/*              onMapClickFun ={(map,data,coordinate,type)=>this.onMapClickFun(map,data,coordinate,type)}*/ }
                        {/*/>*/ }
                    </MapvglView>
                </Map>


                {
                    isShowEditBtn &&
                    <DrawingManagerUtil map={ this.map }/>
                }
                {/*是否开始编辑，只在开发者模式下显示*/ }
                {
                    isDeveloperEdit &&
                    <div className="isDeveloperEditClass" onClick={ () => this.isShowOrHideBtnOnClick() }>
                        {
                            isShowEditBtn ? (
                                <Button type="text" loading={ isBtnLoding } style={ { color: '#fff' } }>
                                    <span style={ { color: '#29ea0a' } }>{ isBtnLoding ? '' : '完成' }</span>
                                </Button> ) : (
                                <Button type="text" loading={ isBtnLoding } style={ { color: '#fff' } }>
                                    <span>{ isBtnLoding ? '' : '编辑' }</span>
                                </Button> )
                        }
                    </div>
                }
                {/*显示的编辑模式下是否开启复制坐标功能*/ }
                {
                    isShowEditBtn &&
                    <div className="baiduapi_main_copydombtn">
                        <Checkbox onChange={ ( e ) => this.oncopyFun( e.target.checked ) }/>
                    </div>
                }
                {/*复制坐标功能遮罩层*/ }
                {
                    isCoodCopy && <div ref={ this.copyMainIdDomRef } className="baiduapi_maincopydom"/>
                }
                {/*显示的编辑模式下是坐标数据*/ }
                {
                    isShowEditBtn &&
                    <div className="baiduapi_main_copydom">
                        标准坐标：<span id={ 'copyId' } ref={ this.copyIdDomRef }/>
                    </div>
                }
                {/*加载span框*/ }
                {
                    isLoadedMapSkeleton &&
                    <div className="baiduapi_loading">
                        <Spin size="large" tip="Loading..."/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        coordinateItem_BD: state.objs.coordinateItem_BD,
        zoomItem_BD: state.vars.zoomItem_BD,
        headingItem_BD: state.vars.headingItem_BD,
        tiltItem_BD: state.vars.tiltItem_BD,
        mapTypeItem_BD: state.vars.mapTypeItem_BD,
        StyleItem_BD: state.vars.StyleItem_BD,

        isDeveloperEditProp_BD: state.vars.isDeveloperEditProp_BD,
        isEditProp_BD: state.vars.isEditProp_BD,
        resuleFun_BD: state.vars.resuleFun_BD,
        baiduMapFun_BD: state.vars.baiduMapFun_BD,

        onMapOverClickFun_BD: state.vars.onMapOverClickFun_BD,
        onMapOverdbClickFun_BD: state.vars.onMapOverdbClickFun_BD,
        addDataResultFun_BD: state.vars.addDataResultFun_BD,
        delDataResultFun_BD: state.vars.delDataResultFun_BD,

        isAnimsmap_BD: state.vars.isAnimsmap_BD,
        keypatherAnim_BD: state.vars.keypatherAnim_BD,

        layerDataMap_BD: state.lists.layerDataMap_BD,
        standDataPoylon_BD: state.lists.standDataPoylon_BD,
        planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD,
        planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
        planeDataMarker_BD: state.lists.planeDataMarker_BD,
        planeDataLabel_BD: state.lists.planeDataLabel_BD,
        planeDataCustom_BD: state.lists.planeDataCustom_BD,
        planeDataCricle_BD: state.lists.planeDataCricle_BD,

        isDrowState_BD: state.vars.isDrowState_BD,
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
            dispatch( actions.setVars( 'isDrowState_BD', false ) )
            dispatch( actions.setVars( 'isPolyLine_BD', true ) )
            dispatch( actions.setVars( 'isPolyCricle_BD', true ) )
            dispatch( actions.setVars( 'isMarker_BD', true ) )
            dispatch( actions.setVars( 'isPolyGon_BD', true ) )
            dispatch( actions.setVars( 'isPolyLabel_BD', true ) )
            dispatch( actions.setVars( 'isCustom_BD', true ) )
            dispatch( actions.setVars( 'isStand_BD', true ) )
            dispatch( actions.setVars( 'isLayer_BD', true ) )
        },
    }
}


export default MapApiLoaderHOC( { ak: sessionStorage.getItem( 'BaidumapAk' ) } )( connect( mapStateToProps, mapDispatchToProps )( BaidumapStart ) )
