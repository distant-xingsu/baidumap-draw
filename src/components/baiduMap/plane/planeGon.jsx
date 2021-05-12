// 平面-线
import React from 'react'
import { getRgbaAlp, hexify } from "../utils/colorType";
import GenNonDuplicateID from '../utils/randomNumId';
import { showDeleteConfirm1 } from '../utils/delModal'
import { message } from "antd";
import actions from "../redux/actions";
import { connect } from "react-redux";

class PlaneGon extends React.Component {
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
        if ( this.props.isPolyGon !== prevProps.isPolyGon ) {
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
            type: 'planeDataPolyGon',
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
            type: 'planeDataPolyGon',
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
            type: 'planeDataPolyGon',
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
            type: 'planeDataPolyGon',
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
        let { planeDataPolyGon, map, isEnableDragging } = this.props;//传过来的数据
        let getOverlay = map.getOverlays();
        if ( getOverlay ) {
            for ( let i = 0; i < getOverlay.length; i ++ ) {
                let newtype = getOverlay[i]._config ?
                              getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' :
                              '';
                if ( newtype === 'planeDataPolyGonRoot' ) {
                    map.removeOverlay( getOverlay[i] )
                }
            }
        }
        if ( planeDataPolyGon ) {
            for ( let i = 0; i < planeDataPolyGon.length || 0; i ++ ) {
                let item = planeDataPolyGon[i];
                let itemindex = i;
                let itemshow = item.show ? item.show : true
                if ( item.data && itemshow ) {
                    let newdata = []; // 数据
                    let newsdomid = item.id ? item.id : GenNonDuplicateID();
                    let newstrokeColor = item.style ?
                                         item.style.strokeColor ? hexify( item.style.strokeColor ) : "#00c5ff" :
                                         "#00c5ff"; // 描边颜色
                    let newsstrokeOpacity = item.style ?
                                            item.style.strokeColor ? getRgbaAlp( item.style.strokeColor ) : 1.0 :
                                            1.0; // 描边透明度
                    let newsstrokeStyle = item.style ?
                                          item.style.strokeStyle ? item.style.strokeStyle : 'solid' :
                                          'solid';  //"solid" | "dashed" | "dotted"
                    let newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

                    let newfillColor = item.style ?
                                       item.style.fillColor ? hexify( item.style.fillColor ) : '#00c5ff' :
                                       '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"
                    let newfillOpacity = item.style ? item.style.fillColor ? getRgbaAlp( item.style.fillColor ) : 1.0 : 1.0; // 面填充的透明度，范围0-1

                    for ( let j = 0; j < item.data.length; j ++ ) {
                        let resuitem = item.data[j];
                        let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                        newdata.push( point )
                    }

                    let newdom = new BMapGL.Polygon( newdata, {
                        domid: newsdomid,
                        domtype: 'planeDataPolyGonRoot', //自定义类型
                        domindex: itemindex,
                        strokeColor: newstrokeColor,
                        strokeOpacity: newsstrokeOpacity,
                        strokeStyle: newsstrokeStyle,
                        strokeWeight: newsstrokeWeight,
                        fillColor: newfillColor,
                        fillOpacity: newfillOpacity,
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
        let { planeDataPolyGon, map, isEnableDragging } = this.props;//传过来的数据
        let newplaneDataPolyGon = planeDataPolyGon ? planeDataPolyGon[planeDataPolyGon.length - 1] : '';
        if ( newplaneDataPolyGon ) {
            let item = newplaneDataPolyGon;
            let itemindex = planeDataPolyGon.length - 1;
            let itemshow = item.show ? item.show : true
            if ( item.data && itemshow ) {
                let newdata = []; // 数据
                let newsdomid = item.id ? item.id : GenNonDuplicateID();
                let newstrokeColor = item.style ?
                                     item.style.strokeColor ? hexify( item.style.strokeColor ) : "#00c5ff" :
                                     "#00c5ff"; // 描边颜色
                let newsstrokeOpacity = item.style ?
                                        item.style.strokeColor ? getRgbaAlp( item.style.strokeColor ) : 1.0 :
                                        1.0; // 描边透明度
                let newsstrokeStyle = item.style ?
                                      item.style.strokeStyle ? item.style.strokeStyle : 'solid' :
                                      'solid';  //"solid" | "dashed" | "dotted"
                let newsstrokeWeight = item.style ? item.style.strokeWeight ? item.style.strokeWeight : 2 : 2; // 描边宽度

                let newfillColor = item.style ?
                                   item.style.fillColor ? hexify( item.style.fillColor ) : '#00c5ff' :
                                   '#00c5ff'; //面填充颜色，同CSS颜色  "#195266"
                let newfillOpacity = item.style ? item.style.fillColor ? getRgbaAlp( item.style.fillColor ) : 1.0 : 1.0; // 面填充的透明度，范围0-1

                for ( let j = 0; j < item.data.length; j ++ ) {
                    let resuitem = item.data[j];
                    let point = new BMapGL.Point( resuitem[0], resuitem[1] )
                    newdata.push( point )
                }

                let newdom = new BMapGL.Polygon( newdata, {
                    domid: newsdomid,
                    domtype: 'planeDataPolyGonRoot', //自定义类型
                    domindex: itemindex,
                    strokeColor: newstrokeColor,
                    strokeOpacity: newsstrokeOpacity,
                    strokeStyle: newsstrokeStyle,
                    strokeWeight: newsstrokeWeight,
                    fillColor: newfillColor,
                    fillOpacity: newfillOpacity,
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
        planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setdata: ( _this, data ) => {
            dispatch( actions.removeItem( 'planeDataPolyGon_BD', data.itemindex ) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PlaneGon )
