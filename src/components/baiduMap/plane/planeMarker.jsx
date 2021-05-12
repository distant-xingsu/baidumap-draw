// 平面-线
import React from 'react'
import GenNonDuplicateID from '../utils/randomNumId';
import { showDeleteConfirm1 } from '../utils/delModal'
import { message } from "antd";
import actions from "../redux/actions";
import { connect } from "react-redux";
import { getIcons } from '../utils/defaultParame'

class PlaneMarker extends React.Component {
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
        if ( this.props.isMarker !== prevProps.isMarker ) {
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
            type: 'planeDataMarker',
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
            type: 'planeDataMarker',
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
            type: 'planeDataMarker',
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
            type: 'planeDataMarker',
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
        let { planeDataMarker, map, isEnableDragging } = this.props;//传过来的数据
        let getOverlay = map.getOverlays();
        if ( getOverlay ) {
            for ( let i = 0; i < getOverlay.length; i ++ ) {
                let newtype = getOverlay[i]._config ?
                              getOverlay[i]._config.domtype ? getOverlay[i]._config.domtype : '' :
                              '';
                if ( newtype === 'planeDataMarkerRoot' ) {
                    map.removeOverlay( getOverlay[i] )
                }
            }
        }
        if ( planeDataMarker ) {
            for ( let i = 0; i < planeDataMarker.length || 0; i ++ ) {
                let item = planeDataMarker[i];
                let itemindex = i;
                let itemshow = item.show ? item.show : true
                if ( item.data && itemshow ) {
                    let newdata = new BMapGL.Point( item.data[0], item.data[1] );
                    let newsdomid = item.id ? item.id : GenNonDuplicateID();
                    let newdom = new BMapGL.Marker( newdata, {
                        domid: newsdomid,
                        domtype: 'planeDataMarkerRoot', //自定义类型
                        domindex: itemindex,
                        icon: getIcons( item.imgSrc ? item.imgSrc : 'simple_red' ),
                        enableEditing: false,//可编辑
                    } );

                    map.addOverlay( newdom );

                    // 为标注添加文本标注
                    if ( item.title ) {
                        let markerlabel = new BMapGL.Label( item.title, {
                            offset: setOfFset( item.title ) // 设置文本偏移量
                        } )
                        newdom.setLabel( markerlabel )
                        markerlabel.setStyle( {
                            color: item.style.color ? item.style.color : '#fff',
                            backgroundColor: item.style.backgroundColor ? item.style.backgroundColor : 'rgba(0,0,0,0)',
                            borderColor: item.style.borderColor ? item.style.borderColor : 'rgba(0,0,0,0)',
                            fontSize: '14px',
                            padding: '0 5px'
                        } )
                    }

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

        function setOfFset( data ) {
            let lodSize;
            let dataleng = data.length;
            dataleng = dataleng * 8;
            lodSize = new BMapGL.Size( - dataleng, 15 )
            return lodSize
        }
    }

    // 添加
    creatAdd() {
        let { planeDataMarker, map, isEnableDragging } = this.props;//传过来的数据
        let newplaneDataMarker = planeDataMarker ? planeDataMarker[planeDataMarker.length - 1] : '';
        if ( newplaneDataMarker ) {
            let item = newplaneDataMarker;
            let itemindex = planeDataMarker.length - 1;
            let itemshow = item.show ? item.show : true
            if ( item.data && itemshow ) {
                let newdata = new BMapGL.Point( item.data[0], item.data[1] );
                let newsdomid = item.id ? item.id : GenNonDuplicateID();

                let newdom = new BMapGL.Marker( newdata, {
                    domid: newsdomid,
                    domtype: 'planeDataMarkerRoot', //自定义类型
                    domindex: itemindex,
                    icon: getIcons( item.imgSrc ? item.imgSrc : 'simple_red' ),
                    enableEditing: false,//可编辑
                } );

                map.addOverlay( newdom );

                // 为标注添加文本标注
                if ( item.title ) {
                    let markerlabel = new BMapGL.Label( item.title, {
                        offset: setOfFset( item.title ) // 设置文本偏移量
                    } )
                    newdom.setLabel( markerlabel )
                    markerlabel.setStyle( {
                        color: item.style.color ? item.style.color : '#fff',
                        backgroundColor: item.style.backgroundColor ? item.style.backgroundColor : 'rgba(0,0,0,0)',
                        borderColor: item.style.borderColor ? item.style.borderColor : 'rgba(0,0,0,0)',
                        fontSize: '14px',
                        padding: '0 5px'
                    } )
                }

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

        function setOfFset( data ) {
            let lodSize;
            let dataleng = data.length;
            dataleng = dataleng * 8;
            lodSize = new BMapGL.Size( - dataleng, 15 )
            return lodSize
        }
    }

    // 不需要渲染
    render() {
        return null
    }
}

const mapStateToProps = ( state ) => {
    return {
        planeDataMarker_BD: state.lists.planeDataMarker_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setdata: ( _this, data ) => {
            dispatch( actions.removeItem( 'planeDataMarker_BD', data.itemindex ) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PlaneMarker )
