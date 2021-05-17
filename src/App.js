import React from 'react'

import {BaiduApp} from "./components/baiduMap";

class App extends React.Component {
    //load
    constructor( props ) {
        super( props );
        this.state = {
            isRoot: true,
            isAnimsmap: false,

            BaidumapAk: '',//必填
            baiduOption: {
                tiltItem: 60,//倾斜度
            },

            baiduData: {
                planeDataPolyLine: [
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ [ 116.40216642578604, 39.91293345549466 ], [ 116.40567144581301, 39.912155489217305 ] ],
                        style:{
                            strokeColor:'rgba(226,14,14,0.9)',
                            strokeStyle:'solid',
                            strokeWeight:5
                        }
                    }
                ],
                planeDataCricle:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ 116.40821957491076 , 39.91658901250462 ],
                        radius:50,
                        style:{
                            strokeColor:'rgba(14,141,226,0.5)',
                            strokeStyle:'dashed',
                            strokeWeight:2,
                            fillColor:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataMarker:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data:[116.4000107001605 , 39.912210933313865],
                        title:'测试',
                        style:{
                            backgroundColor:'rgba(14,141,226,0.5)',
                            borderColor:'rgba(219,14,226,0.9)',
                            color:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataPolyGon:[
                    {
                        isClick: true,
                        isDbClick: true,
                        data: [ [ 116.40280645121443 , 39.91204849608175 ], [ 116.40429502869365 , 39.91101356694463 ],[ 116.40399668957616 , 39.912124108901196] ],
                        style:{
                            strokeColor:'rgba(14,141,226,0.5)',
                            strokeStyle:'dashed',
                            strokeWeight:2,
                            fillColor:'rgba(14,141,226,0.9)'
                        }
                    }
                ],
                planeDataLabel:[
                    {
                        data:[116.40430786673703 , 39.91299171941463],
                        isClick: true,
                        isDbClick: true,
                        title:'测试',
                        style:{
                            color:'rgba(14,141,226,0.9)',
                            borderColor: 'rgb(11,231,239)',
                            backgroundColor: 'rgb(160,67,164)',
                        }
                    }
                ],
                planeDataCustom:[
                    {
                        data:[116.40538449289751 , 39.91061798023587],
                        isClick: true,
                        isDbClick: true,
                        title:'测试',
                        style:{
                            dom:'<div style="color: #fdb505;width: 50px;background-color: #34658a">王永平</div>'
                        }
                    }
                ],
                standDataPoylon:[
                    {
                        data:[[116.39971617003802 , 39.91332672213205],[116.40102605137504 , 39.91339112709837],[116.4011740463095 , 39.912920112558744],[116.40002896351999 , 39.91276781108638]],
                        isClick: true,
                        isDbClick: true,
                        height:50,
                        style: {
                            topFillColor:'rgba(0,197,255,1)',
                            sideFillColor:'rgba(25,82,102,1)',
                        }
                    }
                ],
            }
        }
    };

    //in
    componentDidMount() {

    };

    //out
    componentWillUnmount() {

    }

    // 返回数据
    resuleFun( data ) {
        console.log( "编辑模式下返回数据：", data )
    }

    // 百度实例
    baiduMapFun( map ) {
        console.log("map-实例：",map)
    }

    //是否编辑
    isEditPropFun( falge ) {
        console.log('是否编辑',falge)
    }

    // 返回单击事件
    onMapOverClickFun( e, value ) {
        console.log( "单击-事件：", value )
    }

    // 返回双击事件
    onMapOverdbClickFun( e, value ) {
        console.log( "双击-事件：", value )
    }

    // 删除
    delDataResultFun( e, value ) {
        console.log( "双击-删除事件：", value )
    }

    // 添加
    addDataResultFun( e, value ) {
        console.log( "添加-事件：", value )
    }

    render() {
        let { baiduData, isAnimsmap, isRoot, BaidumapAk, baiduOption } = this.state;

        return (
            <div>
                <BaiduApp BaidumapAk={ BaidumapAk }  isDeveloperEditProp={ isRoot } baiduOption={ baiduOption }
                          baiduData={ baiduData } isAnimsmap={ isAnimsmap }
                          resuleFun={ ( e ) => this.resuleFun( e ) }
                          baiduMapFun={ ( e ) => this.baiduMapFun( e ) }
                          isEditProp={ ( e ) => this.isEditPropFun( e ) }
                          onMapOverClickFun={ ( e, value ) => this.onMapOverClickFun( e, value ) }
                          onMapOverdbClickFun={ ( e, value ) => this.onMapOverdbClickFun( e, value ) }
                          delDataResultFun={ ( e, value ) => this.delDataResultFun( e, value ) }
                          addDataResultFun={ ( e, value ) => this.addDataResultFun( e, value ) }
                />
            </div>
        )
    }
}

export default App
