//文本
import React from 'react'
import { connect } from "react-redux";
import '../../assest/css/baidumap.css'
import { Button, Input, message, Switch } from 'antd';
import { ChromePicker } from "react-color";
import { isClickFun, isDbClickFun, setColorFun, setComColorFun, setFontdataFun, setNamedataFun } from '../../utils/componutils'
// import actions from "../redux/actions";

class FonttextEdit extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.state = {
            isColorShow: false, // 是否显示颜色调试器
            isColorShowName: '', // 颜色调试器 （类型）名称
            colorData: '', // 颜色数据
            /* ************ ---------添加时候的缓存区域--------- ************************/
            addLabeldata: {
                title: '',
                isClick: false,
                isDbClick: false,
                name: '',
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

    // 添加文本数据
    addLabeldataFun( type ) {
        let { map, resultMapView } = this.props;
        let fatherData = this.props.addLabeldata;
        let chicerData = this.state.addLabeldata;
        let newCircledata = Object.assign( this.props.addLabeldata, this.state.addLabeldata )
        if ( type === 1 ) {
            if ( fatherData.data.length === 0 ) {
                message.warning( '请先选取坐标！' )
                return
            }
            if ( chicerData.name.trim() === '' || chicerData.name.trim() == null ) {
                message.warning( '请填写建筑物名称！' )
                return
            }
            if ( chicerData.title.trim() === '' || chicerData.title.trim() == null ) {
                message.warning( '请填写文本描述！' )
                return
            }
            if ( fatherData.info ) {
                map.removeOverlay( fatherData.info.overlay )
            }
            resultMapView( 1, 'fonttext', newCircledata )
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
                borderColor: 'rgba(0,0,0,0)',
                backgroundColor: 'rgba(0,0,0,0)',
            }
            this.setState( {
                addLabeldata: chicerData,
                isColorShow: false,
                isColorShowName: '',
                colorData: '',
            } )
            resultMapView( 2, 'fonttext' )
        }
    }

    // 渲染
    render() {
        let { isColorShow, isColorShowName, colorData } = this.state;
        let { addLabeldata } = this.state;

        return (
            <>
                <span>文本内容：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="请输入内容" maxLength={ 45 } value={ addLabeldata.title } onChange={ setFontdataFun.bind( this, 'addLabeldata' ) }/><br/>
                <span>背景颜色：</span>
                {
                    isColorShowName === 'backgroundColor' ?
                    ( <i style={ { background: addLabeldata.style.backgroundColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'backgroundColor', addLabeldata.style.backgroundColor ) } style={ { background: addLabeldata.style.backgroundColor } }/> )
                }
                {
                    isColorShowName === 'backgroundColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addLabeldata', 'backgroundColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'backgroundColor', addLabeldata.style.backgroundColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'backgroundColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>文字颜色：</span>
                {
                    isColorShowName === 'color' ?
                    ( <i style={ { background: addLabeldata.style.color } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'color', addLabeldata.style.color ) } style={ { background: addLabeldata.style.color } }/> )
                }
                {
                    isColorShowName === 'color' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addLabeldata', 'color', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'color', addLabeldata.style.color ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'color' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>边框颜色：</span>
                {
                    isColorShowName === 'borderColor' ?
                    ( <i style={ { background: addLabeldata.style.borderColor } }/> ) :
                    (
                        <i onClick={ setColorFun.bind( this, 1, true, 'borderColor', addLabeldata.style.borderColor ) } style={ { background: addLabeldata.style.borderColor } }/> )
                }
                {
                    isColorShowName === 'borderColor' ?
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 2, false, 'addLabeldata', 'borderColor', colorData ) }>选择</span> ) :
                    (
                        <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 1, true, 'borderColor', addLabeldata.style.borderColor ) }>打开</span> )
                }
                {
                    isColorShow && isColorShowName === 'borderColor' &&
                    <span className="drawingmanagerutil_classBtn" onClick={ setColorFun.bind( this, 3, false ) }>取消</span>
                }<br/>
                <span>建筑物名称：</span>
                <Input style={ { width: '10rem' } } size={ "small" } placeholder="名称" maxLength={ 45 } value={ addLabeldata.name } onChange={ setNamedataFun.bind( this, 'addLabeldata' ) }/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addLabeldata.isClick } onChange={ isClickFun.bind( this, 'addLabeldata' ) }/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ addLabeldata.isDbClick } onChange={ isDbClickFun.bind( this, 'addLabeldata' ) }/><br/>

                <Button type="primary" size={ 'small' } onClick={ () => this.addLabeldataFun( 1 ) }>保存</Button>
                <Button type="primary" danger size={ 'small' } onClick={ () => this.addLabeldataFun( 2 ) } style={ { marginLeft: '0.2rem' } }>取消</Button>


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

export default connect( mapStateToProps, mapDispatchToProps )( FonttextEdit )
