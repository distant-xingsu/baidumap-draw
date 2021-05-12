// 3d图层
import React from 'react'
import { connect } from "react-redux";
import { Button, Input, InputNumber, Switch } from 'antd';
import { isClickFun, isDbClickFun, setNamedataFun, setNewHeight } from '../../utils/componutils'
// import actions from "../redux/actions";

class M3dPCREdit extends React.Component {
    // load
    constructor ( props ) {
        super( props );
        this.state={
            /* ************ ---------添加时候的缓存区域--------- ************************/
            add3dData:{
                height:20,
                isClick:false,
                isDbClick:false,
                name:'',
            },
        }
    }
    // in
    componentDidMount () {
        // 赋值
        this.props.init(this);
    };
    // out
    componentWillUnmount () {

    }
    // 添加3d图层数据
    add3dDataFun (type){

    }
    // 渲染
    render () {
        let {add3dData} = this.state;

        return(
            <>
                <span>建筑物高度：</span>
                <InputNumber min={1} max={10000} size="small" placeholder="高度" value={add3dData.height} onChange={setNewHeight.bind(this,1)} /><br/>
                <span>建筑物名称：</span>
                <Input style={{width:'10rem'}} size={"small"}  placeholder="名称" maxLength={45} value={add3dData.name} onChange={setNamedataFun.bind(this,'add3dData')}/><br/>
                <span>是否开启点击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={add3dData.isClick} onChange={isClickFun.bind(this,'add3dData')}/><br/>
                <span>是否开启双击功能：</span>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={ add3dData.isDbClick } onChange={ isDbClickFun.bind( this, 'add3dData' ) }/><br/>
                <Button type="primary"  size={'small'} onClick={()=>this.add3dDataFun(1)}>保存</Button>
                <Button type="primary" danger  size={'small'} onClick={()=>this.add3dDataFun(2)} style={{marginLeft:'0.2rem'}}>取消</Button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // isDeveloperEditProp_BD:state.vars.isDeveloperEditProp_BD,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: ( _this ) => {
            // dispatch(actions.setObjs('coordinateItem_BD',_this.props.coordinateItem))
            // dispatch(actions.setVars('zoomItem_BD',_this.props.zoomItem))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(M3dPCREdit)
