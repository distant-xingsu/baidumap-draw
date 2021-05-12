// 编辑线的样式 添加功能
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, InputNumber, message, Select, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setBorderType, setColorFun, setComColorFun, setNamedataFun, setWidthdataFun } from '../../utils/componutils'
import { childrencircleSelect } from '../../utils/defaultParame'
// import actions from "../redux/actions";

const { Option } = Select;

class PolylineEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addPolylineData: {
                isClick: false,
                isDbClick: false,
                name: '',
                style: {
                    strokeColor: 'rgba(0,197,255,1)',
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
    };

    // out
    componentWillUnmount() {

    }

    // 添加线数据
    addPolylinedataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.addPolylineData;
        let chicerData = this.state.addPolylineData;
        let newPolylinedata = Object.assign( this.props.addPolylineData, this.state.addPolylineData )
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
            resultMapView( 1, 'polyline', newPolylinedata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            chicerData.name = '';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.style = {
                strokeColor: 'rgba(0,197,255,1)',
                strokeStyle: 'solid',
                strokeWeight: 2,
            }
            this.setState( {
                addPolylineData: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'polyline' )
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { addPolylineData } = this.state;

        return (
            <>
                <span>边类型：</span>
                <Select size={ 'small' } style={ { width: '10rem' } } placeholder="请选择" defaultValue={ 'solid' } onChange={ setBorderType.bind( this, 'addPolylineData' ) }>
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
                <span>边颜色：</span>
                {
                    isColorShowName === 'strokeColor' ?
                    ( <i style={ { background: addPolylineData.style.strokeColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'strokeColor', addPolylineData.style.strokeColor ) } style={ { background: addPolylineData.style.strokeColor } }/> )
                }
                {
                    isColorShowName === 'strokeColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addPolylineData', 'strokeColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'strokeColor', addPolylineData.style.strokeColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'strokeColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>边宽度：</span>
                <InputNumber style={ { width: '5rem' } } size={ "small" } placeholder="请输入内容" min={ 1 } max={ 200 } value={ addPolylineData.style.strokeWeight } onChange={ setWidthdataFun.bind( this, 'addPolylineData', 'strokeWeight' ) }/><br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addPolylineData.name } onChange={ setNamedataFun.bind( this, 'addPolylineData' ) }/><br/>
                <span>是否开启单击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addPolylineData.isClick } onChange={ isClickFun.bind( this, 'addPolylineData' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addPolylineData.isDbClick } onChange={ isDbClickFun.bind( this, 'addPolylineData' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addPolylinedataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addPolylinedataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

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
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PolylineEdit )
