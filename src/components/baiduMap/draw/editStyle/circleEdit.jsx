// 编辑圆的样式 添加功能
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, InputNumber, message, Select, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setBorderType, setColorFun, setComColorFun, setNamedataFun, setWidthdataFun } from '../../utils/componutils'
import { childrencircleSelect } from '../../utils/defaultParame'
import { getRgbaAlp, hexify } from "../../utils/colorType";
// import actions from "../redux/actions";

const { Option } = Select;

class CircleEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addCircleData: {
                isClick: false,
                isDbClick: false,
                name: '',
                style: {
                    strokeColor: 'rgba(0,197,255,1)',
                    fillColor: 'rgba(0,197,255,1)',
                    strokeStyle: 'solid',
                    strokeWeight: 2,
                }
            },
        }
    }

    // in
    componentDidMount() {
        // 赋值
        this.props.init( this );
        // ref
        this.props.onRef&&this.props.onRef(this);
    };

    // out
    componentWillUnmount() {

    }

    // 添加圆数据
    addCircledataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.addCircleData;
        let chicerData = this.state.addCircleData;
        let newCircledata = Object.assign( this.props.addCircleData, this.state.addCircleData )
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
                map.removeOverlay( fatherData.info )
            }
            resultMapView( 1, 'circle', newCircledata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info )
            }
            chicerData.name = '';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.style = {
                strokeColor: 'rgba(0,197,255,1)',
                fillColor: 'rgba(0,197,255,1)',
                strokeStyle: 'solid',
                strokeWeight: 2,
            }
            this.setState( {
                addCircleData: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'circle' )
        }
    }

    // 更改
    upDataFun( _this,_type,_key ) {
        if ( _type === 'addCircleData' ) {
            let newobj = Object.assign( _this.props.addCircleData, _this.state.addCircleData );
            if ( newobj.info ) {
                if(_key==='strokeStyle'){
                    let color1 = newobj.info.getStrokeColor()
                    newobj.info.setStrokeStyle(newobj.style[_key])
                    newobj.info.setStrokeColor('#000')
                    setTimeout(function (  ) {
                        newobj.info.setStrokeColor(color1)
                    },0)
                }else if(_key==='strokeWeight'){
                    newobj.info.setStrokeWeight(newobj.style[_key])
                }else if(_key==='strokeColor'){
                    let newstrokeColor = newobj.style ?
                                         newobj.style.strokeColor ? hexify( newobj.style[_key] ) : '#195266' :
                                         '#195266';
                    let newstrokeColorOpacity = newobj.style ?
                                                newobj.style.strokeColor ? getRgbaAlp( newobj.style[_key] ) : 1.0 :
                                                1.0;
                    newobj.info.setStrokeColor(newstrokeColor)
                    newobj.info.setStrokeOpacity(newstrokeColorOpacity)
                }else if(_key==='fillColor'){
                    let newFillColor = newobj.style ?
                                       newobj.style.fillColor ? hexify( newobj.style[_key] ) : "#00c5ff" :
                                       "#00c5ff";
                    let newFillOpacity = newobj.style ?
                                         newobj.style.fillColor ? getRgbaAlp(newobj.style[_key] ) : 1.0 :
                                         1.0;
                    newobj.info.setFillColor(newFillColor)
                    newobj.info.setFillOpacity(newFillOpacity)
                }

            }
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { addCircleData } = this.state;

        return (
            <>
                <span>边框类型：</span>
                <Select size={ 'small' } style={ { width: '10rem' } } placeholder="请选择" defaultValue={ 'solid' } onChange={ setBorderType.bind( this, 'addCircleData' ) }>
                    {
                        childrencircleSelect && childrencircleSelect.map( ( item ) => {
                            return (
                                <Option key={ item.id } value={ item.title } title={ item.title }>
                                    { item.title }
                                </Option>
                            )
                        } )
                    }
                </Select><br/>
                <span>背景颜色：</span>
                {
                    isColorShowName === 'fillColor' ?
                    ( <i style={ { background: addCircleData.style.fillColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'fillColor', addCircleData.style.fillColor ) } style={ { background: addCircleData.style.fillColor } }/> )
                }
                {
                    isColorShowName === 'fillColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addCircleData', 'fillColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'fillColor', addCircleData.style.fillColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'fillColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>边框颜色：</span>
                {
                    isColorShowName === 'strokeColor' ?
                    ( <i style={ { background: addCircleData.style.strokeColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'strokeColor', addCircleData.style.strokeColor ) } style={ { background: addCircleData.style.strokeColor } }/> )
                }
                {
                    isColorShowName === 'strokeColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addCircleData', 'strokeColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'strokeColor', addCircleData.style.strokeColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'strokeColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>边宽度：</span>
                <InputNumber style={ { width: '5rem' } } size={ "small" } placeholder="请输入内容" min={ 1 } max={ 200 } value={ addCircleData.style.strokeWeight } onChange={ setWidthdataFun.bind( this, 'addCircleData', 'strokeWeight' ) }/><br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addCircleData.name } onChange={ setNamedataFun.bind( this, 'addCircleData' ) }/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCircleData.isClick } onChange={ isClickFun.bind( this, 'addCircleData' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCircleData.isDbClick } onChange={ isDbClickFun.bind( this, 'addCircleData' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addCircledataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addCircledataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

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

export default connect( mapStateToProps, mapDispatchToProps )( CircleEdit )
