//自定义
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, message, Select, Switch } from 'antd';
import { isClickFun, isDbClickFun,  setCustom, setNamedataFun } from '../../utils/componutils'
import $ from 'jquery'
// import actions from "../redux/actions";

const { Option } = Select;

class CustomEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addCustomOverlaydata: {
                isClick: false,
                isDbClick: false,
                name: '',
                style: {
                    dom: '',
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
                map.removeOverlay( fatherData.info )
            }
            resultMapView( 1, 'custom', newCircledata )
        }
        else if ( type === 2 ) {
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info )
            }
            chicerData.name = '';
            chicerData.isClick = false;
            chicerData.isDbClick = false;
            chicerData.style = {
                dom: '',
            }
            this.setState( {
                addCustomOverlaydata: chicerData,
            } )
            resultMapView( 2, 'custom' )
        }
    }

    // 更改
    upDataFun( _this,_type,_key ) {
        if ( _type === 'addCustomOverlaydata' ) {
            let newobj = Object.assign( _this.props.addCustomOverlaydata, _this.state.addCustomOverlaydata );
            if ( newobj.info ) {
                if(_key==='dom'){
                    $(newobj.info._div).html(newobj.style[_key])
                }
            }
        }
    }

    // 渲染
    render() {
        let { addCustomOverlaydata } = this.state;
        let {keyCustomData_BD} = this.props;

        return (
            <>
                <span>背景类型：</span>
                <Select size={ 'small' } style={ { width: '10rem' } } placeholder="请选择图片" onChange={ setCustom.bind( this ) }>
                    {
                        keyCustomData_BD && keyCustomData_BD.map( ( item,index ) => {
                            return (
                                <Option key={ index } value={ item.dom } title={ item.title }>
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
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addCustomOverlaydata.name } onChange={ setNamedataFun.bind( this, 'addCustomOverlaydata' ) }/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCustomOverlaydata.isClick } onChange={ isClickFun.bind( this, 'addCustomOverlaydata' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addCustomOverlaydata.isDbClick } onChange={ isDbClickFun.bind( this, 'addCustomOverlaydata' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addCustomdataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addCustomdataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>

            </>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        keyCustomData_BD: state.lists.keyCustomData_BD,
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
