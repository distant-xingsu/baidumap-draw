// 多边形编辑器
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, InputNumber, message, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setColorFun, setComColorFun, setNamedataFun, setNewHeight } from '../../utils/componutils'
// import actions from "../redux/actions";

class G3dPCREdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            add3dPolyData: {
                height: 20,
                isClick: false,
                isDbClick: false,
                name: '',
                style: {
                    topFillColor: 'rgba(0,197,255,1)',
                    sideFillColor: 'rgba(25,82,102,1)',
                }
            },
        }
    }

    // in
    componentDidMount() {
        // 赋值
        this.props.init( this );
    };

    // out
    componentWillUnmount() {

    }

    // 添加3d高级多边形数据
    add3dplanyDataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.add3dPolyData;
        let chicerData = this.state.add3dPolyData;
        let newCircledata = Object.assign( this.props.add3dPolyData, this.state.add3dPolyData )
        if ( type === 1 ) {
            if ( fatherData.data.length === 0 ) {
                message.warning( '请先选取坐标！' )
                return
            }
            if ( chicerData.name.trim() === '' || chicerData.name.trim() == null ) {
                message.warning( '请填写建筑物名称！' )
                return
            }
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            resultMapView( 1, 'G3dpolygon', newCircledata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            chicerData.name = '';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.height = 20;
            chicerData.style = {
                topFillColor: 'rgba(0,197,255,1)',
                sideFillColor: 'rgba(25,82,102,1)',
            }
            this.setState( {
                add3dPolyData: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'G3dpolygon' )
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { add3dPolyData } = this.state;

        return (
            <>
                <span>建筑物高度：</span>
                <InputNumber min={ 1 } max={ 10000 } size="small" placeholder="高度" value={ add3dPolyData.height } onChange={ setNewHeight.bind( this, 2 ) }/><br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ add3dPolyData.name } onChange={ setNamedataFun.bind( this, 'add3dPolyData' ) }/><br/>
                <span>顶部颜色：</span>
                {
                    isColorShowName === 'topFillColor' ?
                    ( <i style={ { background: add3dPolyData.style.topFillColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'topFillColor', add3dPolyData.style.topFillColor ) } style={ { background: add3dPolyData.style.topFillColor } }/> )
                }
                {
                    isColorShowName === 'topFillColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'add3dPolyData', 'topFillColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'topFillColor', add3dPolyData.style.topFillColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'topFillColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>侧面颜色：</span>
                {
                    isColorShowName === 'sideFillColor' ?
                    ( <i style={ { background: add3dPolyData.style.sideFillColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'sideFillColor', add3dPolyData.style.sideFillColor ) } style={ { background: add3dPolyData.style.sideFillColor } }/> )
                }
                {
                    isColorShowName === 'sideFillColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'add3dPolyData', 'sideFillColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'sideFillColor', add3dPolyData.style.sideFillColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'sideFillColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ add3dPolyData.isClick } onChange={ isClickFun.bind( this, 'add3dPolyData' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ add3dPolyData.isDbClick } onChange={ isDbClickFun.bind( this, 'add3dPolyData' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.add3dplanyDataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.add3dplanyDataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

                {
                    isColorShow &&
                    <div className="drawingmanagerutil_color">
                        <ChromePicker color={ colorData } onChange={ setComColorFun.bind( this ) }/>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        // isDeveloperEditProp_BD:state.vars.isDeveloperEditProp_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        init: ( _this ) => {
            // dispatch(actions.setObjs('coordinateItem_BD',_this.props.coordinateItem))
            // dispatch(actions.setVars('zoomItem_BD',_this.props.zoomItem))
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( G3dPCREdit )
