// 编辑点的样式 添加功能
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, message, Select, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setColorFun, setComColorFun, setFontdataFun, setMarker, setNamedataFun } from '../../utils/componutils'
import { childrenmarkerSelect } from '../../utils/defaultParame'
// import actions from "../redux/actions";

const { Option } = Select;

class MarkerEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addMarkerData: {
                title: '',
                isClick: false,
                isDbClick: false,
                name: '',
                imgSrc: 'simple_red',
                style: {
                    color: '#fff',
                    borderColor: 'rgba(0,0,0,0)',
                    backgroundColor: 'rgba(0,0,0,0)',
                },
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

    // 添加点数据
    addMarkerdataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.addMarkerData;
        let chicerData = this.state.addMarkerData;
        let newCircledata = Object.assign( this.props.addMarkerData, this.state.addMarkerData )
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
            resultMapView( 1, 'marker', newCircledata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            chicerData.name = '';
            chicerData.title = '';
            chicerData.imgSrc = 'simple_red';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.style = {
                color: '#fff',
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: 'rgba(0,0,0,0)',
            }
            this.setState( {
                addMarkerData: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'marker' )
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { addMarkerData } = this.state;

        return (
            <>
                <span>图标类型：</span>
                <Select size={ 'small' } style={ { width: '10rem' } } placeholder="请选择图标" onChange={ setMarker.bind( this ) }>
                    {
                        childrenmarkerSelect && childrenmarkerSelect.map( ( item ) => {
                            return (
                                <Option key={ item.id } value={ item.title } title={ item.title }>
                                    { item.title }
                                </Option>
                            )
                        } )
                    }
                </Select><br/>
                <span>标题内容：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="请输入内容" maxLength={ 45 } value={ addMarkerData.title } onChange={ setFontdataFun.bind( this, 'addMarkerData' ) }/><br/>
                <span>背景颜色：</span>
                {
                    isColorShowName === 'backgroundColor' ?
                    ( <i style={ { background: addMarkerData.style.backgroundColor } }/> ) :
                    (
                        <i className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'backgroundColor', addMarkerData.style.backgroundColor ) } style={ { background: addMarkerData.style.backgroundColor } }/> )
                }
                {
                    isColorShowName === 'backgroundColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addMarkerData', 'backgroundColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'backgroundColor', addMarkerData.style.backgroundColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'backgroundColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>文字颜色：</span>
                {
                    isColorShowName === 'color' ?
                    ( <i style={ { background: addMarkerData.style.color } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'color', addMarkerData.style.color ) } style={ { background: addMarkerData.style.color } }/> )
                }
                {
                    isColorShowName === 'color' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addMarkerData', 'color', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'color', addMarkerData.style.color ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'color' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>边框颜色：</span>
                {
                    isColorShowName === 'borderColor' ?
                    ( <i style={ { background: addMarkerData.style.borderColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'borderColor' ) } style={ { background: addMarkerData.style.borderColor } }/> )
                }
                {
                    isColorShowName === 'borderColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addMarkerData', 'borderColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'borderColor' ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'borderColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addMarkerData.name } onChange={ setNamedataFun.bind( this, 'addMarkerData' ) }/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addMarkerData.isClick } onChange={ isClickFun.bind( this, 'addMarkerData' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addMarkerData.isDbClick } onChange={ isDbClickFun.bind( this, 'addMarkerData' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addMarkerdataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addMarkerdataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

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

export default connect( mapStateToProps, mapDispatchToProps )( MarkerEdit )
