import React , { lazy,  Suspense } from 'react'
import { connect} from 'react-redux';
import actions from './redux/actions';
import "./assest/css/baidumap.css";
import StyleItem from "./assest/json/styleItemBaiduMap.json";
import { childrenSelect } from "./utils/defaultParame";

const BaidumapStart = lazy( () => import("./baidumap_start") );

class Baidumap extends React.Component {
    //load
    constructor( props ) {
        super( props );
        sessionStorage.setItem( 'BaidumapAk', props.fadata&&props.fadata.BaidumapAk )
        this.state = {}
    }

    //in
    componentDidMount() {
        // 赋值
        this.props.init( this );
    };

    //out
    componentWillUnmount() {

    }

    render() {
        return (
            <>
                <Suspense fallback={ <div className="baiduapi_loading">loading...</div> }>
                    <div>
                        <BaidumapStart/>
                    </div>
                </Suspense>
            </>

        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        coordinateItem_BD: state.objs.coordinateItem_BD,
        zoomItem_BD: state.vars.zoomItem_BD,
        headingItem_BD: state.vars.headingItem_BD,
        tiltItem_BD: state.vars.tiltItem_BD,
        mapTypeItem_BD: state.vars.mapTypeItem_BD,
        StyleItem_BD: state.vars.StyleItem_BD,
        keyCustomData_BD: state.lists.keyCustomData_BD,

        layerDataMap_BD: state.lists.layerDataMap_BD,
        standDataPoylon_BD: state.lists.standDataPoylon_BD,
        planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD,
        planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
        planeDataMarker_BD: state.lists.planeDataMarker_BD,
        planeDataLabel_BD: state.lists.planeDataLabel_BD,
        planeDataCustom_BD: state.lists.planeDataCustom_BD,
        planeDataCricle_BD: state.lists.planeDataCricle_BD,

        isDeveloperEditProp_BD: state.vars.isDeveloperEditProp_BD,
        isEditProp_BD: state.vars.isEditProp_BD,
        resuleFun_BD: state.vars.resuleFun_BD,
        baiduMapFun_BD: state.vars.baiduMapFun_BD,

        isAnimsmap_BD: state.vars.isAnimsmap_BD,
        keypatherAnim_BD: state.vars.keypatherAnim_BD,

        onMapOverClickFun_BD: state.vars.onMapOverClickFun_BD,
        onMapOverdbClickFun_BD: state.vars.onMapOverdbClickFun_BD,
        addDataResultFun_BD: state.vars.addDataResultFun_BD,
        delDataResultFun_BD: state.vars.delDataResultFun_BD,
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        // init
        init: ( _this ) => {
            if ( _this.props.fadata&&_this.props.fadata.baiduOption ) {
                dispatch( actions.setObjs( 'coordinateItem_BD', _this.props.fadata.baiduOption.coordinateItem ?
                                                                _this.props.fadata.baiduOption.coordinateItem :
                    { lng: 116.40372656609907, lat: 39.915103900724574 } ) )
                dispatch( actions.setVars( 'zoomItem_BD', _this.props.fadata.baiduOption.zoomItem ?
                                                          _this.props.fadata.baiduOption.zoomItem :
                                                          18 ) )
                dispatch( actions.setVars( 'headingItem_BD', _this.props.fadata.baiduOption.headingItem ?
                                                             _this.props.fadata.baiduOption.headingItem :
                                                             0 ) )
                dispatch( actions.setVars( 'tiltItem_BD', _this.props.fadata.baiduOption.tiltItem ?
                                                          _this.props.fadata.baiduOption.tiltItem :
                                                          60 ) )
                dispatch( actions.setVars( 'mapTypeItem_BD', _this.props.fadata.baiduOption.mapTypeItem ?
                                                             _this.props.fadata.baiduOption.mapTypeItem :
                                                             "normal" ) )
                dispatch( actions.setVars( 'StyleItem_BD', _this.props.fadata.baiduOption.StyleItem ?
                                                           _this.props.fadata.baiduOption.StyleItem :
                                                           StyleItem ) )
            }
            if ( _this.props.fadata&&_this.props.fadata.baiduData ) {
                dispatch( actions.setLists( 'layerDataMap_BD', _this.props.fadata.baiduData.layerDataMap ) )
                dispatch( actions.setLists( 'standDataPoylon_BD', _this.props.fadata.baiduData.standDataPoylon ) )
                dispatch( actions.setLists( 'planeDataPolyLine_BD', _this.props.fadata.baiduData.planeDataPolyLine ) )
                dispatch( actions.setLists( 'planeDataPolyGon_BD', _this.props.fadata.baiduData.planeDataPolyGon ) )
                dispatch( actions.setLists( 'planeDataMarker_BD', _this.props.fadata.baiduData.planeDataMarker ) )
                dispatch( actions.setLists( 'planeDataLabel_BD', _this.props.fadata.baiduData.planeDataLabel ) )
                dispatch( actions.setLists( 'planeDataCustom_BD', _this.props.fadata.baiduData.planeDataCustom ) )
                dispatch( actions.setLists( 'planeDataCricle_BD', _this.props.fadata.baiduData.planeDataCricle ) )
            }

            dispatch( actions.setVars( 'isDeveloperEditProp_BD', _this.props.fadata&&_this.props.fadata.isDeveloperEditProp ) )
            dispatch( actions.setVars( 'isEditProp_BD', _this.props.fadata&&_this.props.fadata.isEditProp ) )
            dispatch( actions.setVars( 'resuleFun_BD', _this.props.fadata&&_this.props.fadata.resuleFun ) )
            dispatch( actions.setVars( 'baiduMapFun_BD', _this.props.fadata&&_this.props.fadata.baiduMapFun ) )
            dispatch( actions.setLists( 'keyCustomData_BD', _this.props.fadata?_this.props.fadata.keyCustomData?_this.props.fadata.keyCustomData:childrenSelect:childrenSelect ) )

            dispatch( actions.setVars( 'isAnimsmap_BD', _this.props.fadata&&_this.props.fadata.isAnimsmap ) )
            dispatch( actions.setVars( 'keypatherAnim_BD', _this.props.fadata&&_this.props.fadata.keypatherAnim ) )

            dispatch( actions.setVars( 'onMapOverClickFun_BD', _this.props.fadata&&_this.props.fadata.onMapOverClickFun ) )
            dispatch( actions.setVars( 'onMapOverdbClickFun_BD', _this.props.fadata&&_this.props.fadata.onMapOverdbClickFun ) )
            dispatch( actions.setVars( 'addDataResultFun_BD', _this.props.fadata&&_this.props.fadata.addDataResultFun ) )
            dispatch( actions.setVars( 'delDataResultFun_BD', _this.props.fadata&&_this.props.fadata.delDataResultFun ) )
        },
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Baidumap )


