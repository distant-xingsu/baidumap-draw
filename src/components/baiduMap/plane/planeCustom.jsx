// 平面-线
import React from 'react'
import GenNonDuplicateID from '../utils/randomNumId';
import { showDeleteConfirm1 } from '../utils/delModal'
import { message } from "antd";
import actions from "../redux/actions";
import { connect } from "react-redux";
import CustomOverlayDom from "../utils/CustomOverlayDom";

class PlaneCustom extends React.Component {
    // load
    constructor( props ) {
        super( props );
        this.timer = undefined
        this.state = {}
    };

    // in
    componentDidMount() {
        this.creat();
    };

    // up
    componentDidUpdate( prevProps ) {
        // 典型用法（不要忘记比较 props）：
        if ( this.props.isEnableDragging !== prevProps.isEnableDragging ) {
            this.creat();
        }
        if ( this.props.isCustom !== prevProps.isCustom ) {
            this.creatAdd();
        }
    }

    // out
    componentWillUnmount() {

    }

    // 单击编辑
    editDataResultFun( e, id, item, itemindex ) {
        let { map, editDataResultFun } = this.props;
        let postdata = {
            id, item, map, itemindex,
            type: 'planeDataCustom',
        }
        if ( this.timer ) {
            clearTimeout( this.timer );
        }
        this.timer = setTimeout( function () {
            editDataResultFun && editDataResultFun( e, postdata );
        }, 300 )
    }

    // 双击删除事件
    delDataResultFun( e, id, item, itemindex, info ) {
        let { map, delDataResultFun, setdata } = this.props;
        let _this = this;
        let postdata = {
            id, item, map, itemindex,
            type: 'planeDataCustom',
        }
        if ( this.timer ) {
            clearTimeout( this.timer );
        }
        showDeleteConfirm1( function () {
            map.removeOverlay( info )
            setdata( _this, postdata )
            delDataResultFun && delDataResultFun( e, postdata )
            message.success( '删除成功！' )
        }, function () {
            message.info( '取消删除！' )
        } )

    }

    // 鼠标双击事件
    onMouseDbFun( e, id, item, itemindex ) {
        let { map, onMapdbClickFun } = this.props;
        let postdata = {
            id, item, map, itemindex,
            type: 'planeDataCustom',
        }
        if ( this.timer ) {
            clearTimeout( this.timer );
        }
        onMapdbClickFun && onMapdbClickFun( e, postdata )
    }

    // 鼠标单击事件
    onMouseClickFun( e, id, item, itemindex ) {
        let { map, onMapClickFun } = this.props;
        let postdata = {
            id, item, map, itemindex,
            type: 'planeDataCustom',
        }
        if ( this.timer ) {
            clearTimeout( this.timer );
        }
        this.timer = setTimeout( function () {
            onMapClickFun && onMapClickFun( e, postdata );
        }, 300 )
    }

    // 创建 line（click dblclick mouseover mousemove mouseout）
    creat() {
        let { planeDataCustom, map, isEnableDragging } = this.props;//传过来的数据
        let getOverlay = map.getOverlays();
        if ( getOverlay ) {
            for ( let i = 0; i < getOverlay.length; i ++ ) {
                let newtype = getOverlay[i]._config ?
                              getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' :
                              '';
                if ( newtype === 'planeDataCustomRoot' ) {
                    map.removeOverlay( getOverlay[i] )
                }
            }
        }
        if ( planeDataCustom ) {
            for ( let i = 0; i < planeDataCustom.length || 0; i ++ ) {
                let item = planeDataCustom[i];
                let itemindex = i;
                let itemshow = item.show ? item.show : true
                if ( item.data && itemshow ) {
                    let newdata = new BMapGL.Point( item.data[0], item.data[1] );
                    let newsdomid = item.id ? item.id : GenNonDuplicateID();
                    let olddom = item.style ? item.style.dom ? item.style.dom : '' : '';
                    let newdom = new CustomOverlayDom( newdata, {
                        html: <div id={ newsdomid } style={{textAlign:'center'}}>
                            <div dangerouslySetInnerHTML={ { __html: olddom } }/>
                        </div>,
                        config: {
                            domtype: 'planeDataCustomRoot',
                            domid: newsdomid
                        }
                    } )
                    map.addOverlay( newdom );
                    newdom._div.addEventListener('mousedown',function (  ) {
                        newdom._div.style.cursor='grabbing'
                    })
                    newdom._div.addEventListener('mouseup',function (  ) {
                        newdom._div.style.cursor='pointer'
                    })
                    if ( isEnableDragging ) {
                        // 双击事件 双击删除
                        newdom._div.addEventListener( 'dblclick', ( e ) => this.delDataResultFun( e, newsdomid, item, itemindex, newdom ), false );
                        // 单击事件 单击编辑
                        // newdom._div.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
                    }
                    else {
                        // 双击事件
                        if ( item.isDbClick ) {
                            newdom._div.addEventListener( 'dblclick', ( e ) => this.onMouseDbFun( e, newsdomid, item, itemindex ), false );
                        }
                        // 单击事件
                        if ( item.isClick ) {
                            newdom._div.addEventListener( 'click', ( e ) => this.onMouseClickFun( e, newsdomid, item, itemindex ), false );
                        }
                    }

                }
            }
        }

    }

    // 添加
    creatAdd() {
        let { planeDataCustom, map, isEnableDragging } = this.props;//传过来的数据
        let newplaneDataCustom = planeDataCustom ? planeDataCustom[planeDataCustom.length - 1] : '';
        if ( newplaneDataCustom ) {
            let item = newplaneDataCustom;
            let itemindex = planeDataCustom.length - 1;
            let itemshow = item.show ? item.show : true
            if ( item.data && itemshow ) {
                let newdata = new BMapGL.Point( item.data[0], item.data[1] );
                let newsdomid = item.id ? item.id : GenNonDuplicateID();
                let olddom = item.style ? item.style.dom ? item.style.dom : '' : '';
                let newdom = new CustomOverlayDom( newdata, {
                    html: <div id={ newsdomid } style={{textAlign:'center'}}>
                        <div dangerouslySetInnerHTML={ { __html: olddom } }/>
                    </div>,
                    config: {
                        domtype: 'planeDataCustomRoot',
                        domid: newsdomid
                    }
                } )
                map.addOverlay( newdom );
                newdom._div.addEventListener('mousedown',function (  ) {
                    newdom._div.style.cursor='grabbing'
                })
                newdom._div.addEventListener('mouseup',function (  ) {
                    newdom._div.style.cursor='pointer'
                })
                if ( isEnableDragging ) {
                    // 双击事件 双击删除
                    newdom._div.addEventListener( 'dblclick', ( e ) => this.delDataResultFun( e, newsdomid, item, itemindex, newdom ), false );
                    // 单击事件 单击编辑
                    // newdom._div.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
                }
                else {
                    // 双击事件
                    if ( item.isDbClick ) {
                        newdom._div.addEventListener( 'dblclick', ( e ) => this.onMouseDbFun( e, newsdomid, item, itemindex ), false );
                    }
                    // 单击事件
                    if ( item.isClick ) {
                        newdom._div.addEventListener( 'click', ( e ) => this.onMouseClickFun( e, newsdomid, item, itemindex ), false );
                    }
                }
            }
        }
    }

    // 不需要渲染
    render() {
        return null
    }
}

const mapStateToProps = ( state ) => {
    return {
        planeDataCustom_BD: state.lists.planeDataCustom_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setdata: ( _this, data ) => {
            dispatch( actions.removeItem( 'planeDataCustom_BD', data.itemindex ) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PlaneCustom )
