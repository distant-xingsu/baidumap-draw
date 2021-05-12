//自定义
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, message, Select, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setColorFun, setComColorFun, setCustom, setFontdataFun, setNamedataFun } from '../../utils/componutils'
import { childrenSelect } from '../../utils/defaultParame'
// import actions from "../redux/actions";

const { Option } = Select;

class CustomEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addCustomOverlaydata: {
                isClick: false,
                isDbClick: false,
                name: '',
                title:'',
                style: {
                    dom: '',
                    color: '#fff',
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

    // 添加覆盖物数据
    addCustomdataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.addCustomOverlaydata;
        let chicerData = this.state.addCustomOverlaydata;
        let newCircledata = Object.assign( this.props.addCustomOverlaydata, this.state.addCustomOverlaydata )
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
            resultMapView( 1, 'custom', newCircledata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            chicerData.name = '';
            chicerData.title = '';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.style = {
                color: '#fff',
                dom: '',
            }
            this.setState( {
                addCustomOverlaydata: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'custom' )
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { addCustomOverlaydata } = this.state;

        return (
            <>
                <span>背景类型：</span>
                <Select size={ 'small' } style={ { width: '10rem' } } placeholder="请选择图片" onChange={ setCustom.bind( this ) }>
                    {
                        childrenSelect && childrenSelect.map( ( item ) => {
                            return (
                                <Option key={ item.id } value={ item.dom } title={ item.title }>
                                    { item.title } <img src={ item.img } style={ {
                                    width: '1.5em',
                                    height: '1.5em',
                                    border: '1px solid #999',
                                    borderRadius: '4px',
                                    marginLeft: '1.1em'
                                } } alt={ 'logo' }/>
                                </Option>
                            )
                        } )
                    }
                </Select><br/>
                <span>文本内容：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="请输入内容" maxLength={ 45 } value={ addCustomOverlaydata.title } onChange={ setFontdataFun.bind( this, 'addCustomOverlaydata' ) }/><br/>
                <span>文字颜色：</span>
                {
                    isColorShowName === 'color' ?
                    ( <i style={ { background: addCustomOverlaydata.style.color } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'color', addCustomOverlaydata.style.color ) } style={ { background: addCustomOverlaydata.style.color } }/> )
                }
                {
                    isColorShowName === 'color' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addCustomOverlaydata', 'color', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'color', addCustomOverlaydata.style.color ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'color' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addCustomOverlaydata.name } onChange={ setNamedataFun.bind( this, 'addCustomOverlaydata' ) }/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCustomOverlaydata.isClick } onChange={ isClickFun.bind( this, 'addCustomOverlaydata' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCustomOverlaydata.isDbClick } onChange={ isDbClickFun.bind( this, 'addCustomOverlaydata' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addCustomdataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addCustomdataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

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

export default connect( mapStateToProps, mapDispatchToProps )( CustomEdit )
