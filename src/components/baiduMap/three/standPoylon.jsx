// 3D面-多边形
import React from 'react'
import { getRgbaAlp, hexify } from "../utils/colorType";
import GenNonDuplicateID from '../utils/randomNumId';
import { showDeleteConfirm1 } from '../utils/delModal'
import { message } from "antd";
import actions from "../redux/actions";
import { connect } from "react-redux";

class StandPoylon extends React.Component {
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
        if ( this.props.isStand !== prevProps.isStand ) {
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
            type: 'standDataPoylon',
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
            type: 'standDataPoylon',
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
            type: 'standDataPoylon',
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
            type: 'standDataPoylon',
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
        let { standDataPoylon, map, isEnableDragging } = this.props;//传过来的数据
        let getOverlay = map.getOverlays();
        if ( getOverlay ) {
            for ( let i = 0; i < getOverlay.length; i ++ ) {
                let newtype = getOverlay[i]._config ?
                              getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' :
                              '';
                if ( newtype === 'standDataPoylonRoot' ) {
                    map.removeOverlay( getOverlay[i] )
                }
            }
        }

        if ( standDataPoylon ) {
            for ( let i = 0; i < standDataPoylon.length || 0; i ++ ) {
                let item = standDataPoylon[i];
                let itemindex = i;
                let itemshow = item.show ? item.show : true
                if ( item.data && itemshow ) {
                    let newdata = []; // 数据
                    let newsdomid = item.id ? item.id : GenNonDuplicateID();
                    let newtopFillColor = item.style ?
                                          item.style.topFillColor ? hexify( item.style.topFillColor ) : "#00c5ff" :
                                          "#00c5ff";//顶面的颜色，同CSS颜色
                    let newtopFillOpacity = item.style ?
                                            item.style.topFillColor ? getRgbaAlp( item.style.topFillColor ) : 1.0 :
                                            1.0;//顶面透明度，范围0-1
                    let newsideFillColor = item.style ?
                                           item.style.sideFillColor ? hexify( item.style.sideFillColor ) : '#195266' :
                                           '#195266';//测面填充颜色，同CSS颜色  "#195266"
                    let newsideFillOpacity = item.style ?
                                             item.style.sideFillColor ? getRgbaAlp( item.style.sideFillColor ) : 1.0 :
                                             1.0;// 测面填充的透明度，范围0-1

                    for ( let j = 0; j < item.data.length; j ++ ) {
                        let resuitem = item.data[j];
                        let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                        newdata.push( point )
                    }

                    let newdom = new BMapGL.Prism( newdata, item.height ? item.height : 20, {
                        domid: newsdomid,
                        domtype: 'standDataPoylonRoot', //自定义类型
                        domindex: itemindex,
                        topFillColor: newtopFillColor,
                        topFillOpacity: newtopFillOpacity,
                        sideFillColor: newsideFillColor,
                        sideFillOpacity: newsideFillOpacity,
                        enableEditing: false,//可编辑
                    } );

                    map.addOverlay( newdom );

                    if ( isEnableDragging ) {
                        // 双击事件 双击删除
                        newdom.addEventListener( 'dblclick', ( e ) => this.delDataResultFun( e, newsdomid, item, itemindex, newdom ), false );
                        // 单击事件 单击编辑
                        // newdom.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
                    }
                    else {
                        // 双击事件
                        if ( item.isDbClick ) {
                            newdom.addEventListener( 'dblclick', ( e ) => this.onMouseDbFun( e, newsdomid, item, itemindex ), false );
                        }
                        // 单击事件
                        if ( item.isClick ) {
                            newdom.addEventListener( 'click', ( e ) => this.onMouseClickFun( e, newsdomid, item, itemindex ), false );
                        }
                    }
                }
            }
        }
    }

    // 添加
    creatAdd() {
        let { standDataPoylon, map, isEnableDragging } = this.props;//传过来的数据
        let newstandDataPoylon = standDataPoylon ? standDataPoylon[standDataPoylon.length - 1] : '';
        if ( newstandDataPoylon ) {
            let item = newstandDataPoylon;
            let itemindex = standDataPoylon.length - 1;
            let itemshow = item.show ? item.show : true
            if ( item.data && itemshow ) {
                let newdata = []; // 数据
                let newsdomid = item.id ? item.id : GenNonDuplicateID();
                let newtopFillColor = item.style ?
                                      item.style.topFillColor ? hexify( item.style.topFillColor ) : "#00c5ff" :
                                      "#00c5ff";//顶面的颜色，同CSS颜色
                let newtopFillOpacity = item.style ?
                                        item.style.topFillColor ? getRgbaAlp( item.style.topFillColor ) : 1.0 :
                                        1.0;//顶面透明度，范围0-1
                let newsideFillColor = item.style ?
                                       item.style.sideFillColor ? hexify( item.style.sideFillColor ) : '#195266' :
                                       '#195266';//测面填充颜色，同CSS颜色  "#195266"
                let newsideFillOpacity = item.style ?
                                         item.style.sideFillColor ? getRgbaAlp( item.style.sideFillColor ) : 1.0 :
                                         1.0;// 测面填充的透明度，范围0-1

                for ( let j = 0; j < item.data.length; j ++ ) {
                    let resuitem = item.data[j];
                    let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                    newdata.push( point )
                }

                let newdom = new BMapGL.Prism( newdata, item.height ? item.height : 20, {
                    domid: newsdomid,
                    domtype: 'standDataPoylonRoot', //自定义类型
                    domindex: itemindex,
                    topFillColor: newtopFillColor,
                    topFillOpacity: newtopFillOpacity,
                    sideFillColor: newsideFillColor,
                    sideFillOpacity: newsideFillOpacity,
                    enableEditing: false,//可编辑
                } );

                map.addOverlay( newdom );

                if ( isEnableDragging ) {
                    // 双击事件 双击删除
                    newdom.addEventListener( 'dblclick', ( e ) => this.delDataResultFun( e, newsdomid, item, itemindex, newdom ), false );
                    // 单击事件 单击编辑
                    // newdom.addEventListener('click',(e)=>this.editDataResultFun(e,newsdomid,item,itemindex),false);
                }
                else {
                    // 双击事件
                    if ( item.isDbClick ) {
                        newdom.addEventListener( 'dblclick', ( e ) => this.onMouseDbFun( e, newsdomid, item, itemindex ), false );
                    }
                    // 单击事件
                    if ( item.isClick ) {
                        newdom.addEventListener( 'click', ( e ) => this.onMouseClickFun( e, newsdomid, item, itemindex ), false );
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
        standDataPoylon_BD: state.lists.standDataPoylon_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setdata: ( _this, data ) => {
            dispatch( actions.removeItem( 'standDataPoylon_BD', data.itemindex ) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( StandPoylon )
