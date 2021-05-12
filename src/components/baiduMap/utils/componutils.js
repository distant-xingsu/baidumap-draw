// ----------------公共库

// 修改文字标题
function setFontdataFun( value, e ) {
    let data = this.state[value];
    data.title = e.target.value;
    this.setState( {
        [value]: data,
    } )
}

// 修改名字建筑物
function setNamedataFun( value, e ) {
    let data = this.state[value];
    data.name = e.target.value;
    this.setState( {
        [value]: data,
    } )
}

// 修改宽度等样式
function setWidthdataFun( value, key, e ) {
    let data = this.state[value];
    data.style[key] = e;
    this.setState( {
        [value]: data,
    } )
}

// 设置边框类型
function setBorderType( value, e ) {
    let data = this.state[value];
    data.style.strokeStyle = e;
    this.setState( {
        [value]: data,
    } )
}

// 设置并显示颜色值 类型 是否显示弹窗 数据类型 键值 数据
function setColorFun( type, falge, data, key, value ) {
    if ( type === 1 ) {
        this.setState( {
            colorData: key,
            isColorShow: falge,
            isColorShowName: data
        } )
    }
    else if ( type === 2 ) {
        switch ( data ) {
            case 'addLabeldata':
                let addLabeldata = this.state.addLabeldata;
                addLabeldata.style[key] = value;
                this.setState( {
                    addLabeldata
                } )
                break
            case 'addCustomOverlaydata':
                let addCustomOverlaydata = this.state.addCustomOverlaydata;
                addCustomOverlaydata.style[key] = value;
                this.setState( {
                    addCustomOverlaydata
                } )
                break
            case 'addMarkerData':
                let addMarkerData = this.state.addMarkerData;
                addMarkerData.style[key] = value;
                this.setState( {
                    addMarkerData
                } )
                break
            case 'addCircleData':
                let addCircleData = this.state.addCircleData;
                addCircleData.style[key] = value;
                this.setState( {
                    addCircleData
                } )
                break
            case 'addPolylineData':
                let addPolylineData = this.state.addPolylineData;
                addPolylineData.style[key] = value;
                this.setState( {
                    addPolylineData
                } )
                break
            case 'addPolygonData':
                let addPolygonData = this.state.addPolygonData;
                addPolygonData.style[key] = value;
                this.setState( {
                    addPolygonData
                } )
                break
            case 'add3dPolyData':
                let add3dPolyData = this.state.add3dPolyData;
                add3dPolyData.style[key] = value;
                this.setState( {
                    add3dPolyData
                } )
                break
            default:
        }
        this.setState( {
            isColorShow: falge,
            isColorShowName: '',
        } )
    }
    else if ( type === 3 ) {
        this.setState( {
            isColorShow: falge,
            isColorShowName: '',
        } )
    }
}

// 获取 rgba
function setComColorFun( e ) {
    let newcolor = 'rgba(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')'
    this.setState( {
        colorData: newcolor
    } )
}

// 是否开启点击功能
function isClickFun( data, e ) {
    let newData = this.state[data];
    newData.isClick = !!e;
    this.setState( {
        [data]: newData,
    } )
}

// 是否开启双击功能
function isDbClickFun( data, e ) {
    let newData = this.state[data];
    newData.isDbClick = !!e;
    this.setState( {
        [data]: newData,
    } )
}

// 图标-Marker
function setMarker( e ) {
    let addMarkerData = this.state.addMarkerData;
    addMarkerData.imgSrc = e;
    this.setState( {
        addMarkerData,
    } )
}

// 图标-setCustom
function setCustom( e ) {
    let addCustomOverlaydata = this.state.addCustomOverlaydata;
    addCustomOverlaydata.style.dom = e;
    this.setState( {
        addCustomOverlaydata,
    } )
}

// 设置高度
function setNewHeight( type, e ) {
    if ( type === 1 ) {
        let add3dData = this.state.add3dData;
        add3dData.height = e;
        this.setState( {
            add3dData,
        })
    }
    else if ( type === 2 ) {
        let add3dPolyData = this.state.add3dPolyData;
        add3dPolyData.height = e;
        this.setState( {
            add3dPolyData,
        })
    }
}

export {
    setFontdataFun, setNamedataFun, setWidthdataFun, setBorderType, setColorFun, setComColorFun, isClickFun, setMarker, setCustom, setNewHeight, isDbClickFun
}
