"use strict";

exports.__esModule = true;
exports.default = void 0;

var _spin = _interopRequireDefault(require("antd/es/spin"));

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _button = _interopRequireDefault(require("antd/es/button"));

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

require("./assest/css/baidumap.css");

var _reactBmapgl = require("react-bmapgl");

var _MapApiLoaderHOC = _interopRequireDefault(require("./libs/MapApiLoaderHOC"));

var _actions = _interopRequireDefault(require("./redux/actions"));

var _reactRedux = require("react-redux");

var _copyText = require("./utils/copyText");

var _drawingManagerUtil = _interopRequireDefault(require("./draw/drawingManagerUtil"));

var _planeLine = _interopRequireDefault(require("./plane/planeLine"));

var _jquery = _interopRequireDefault(require("jquery"));

var _planeCricle = _interopRequireDefault(require("./plane/planeCricle"));

var _planeMarker = _interopRequireDefault(require("./plane/planeMarker"));

var _planeGon = _interopRequireDefault(require("./plane/planeGon"));

var _planeLabel = _interopRequireDefault(require("./plane/planeLabel"));

var _planeCustom = _interopRequireDefault(require("./plane/planeCustom"));

var _standPoylon = _interopRequireDefault(require("./three/standPoylon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaidumapStart = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BaidumapStart, _React$Component);

  // load
  function BaidumapStart(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.btntimer = undefined;
    _this2.animationMap = undefined;
    _this2.copyIdDomRef = /*#__PURE__*/_react.default.createRef();
    _this2.copyMainIdDomRef = /*#__PURE__*/_react.default.createRef();
    _this2.state = {
      isLoadedMapSkeleton: true,
      //??????????????????
      isDeveloperEdit: false,
      //?????????????????????
      isShowEditBtn: false,
      //????????????????????????
      isBtnLoding: false,
      //????????????????????????????????????????????????
      isCoodCopy: false,
      // ????????????????????????
      isadnimgAnim: false //????????????????????????

    };
    return _this2;
  }

  var _proto = BaidumapStart.prototype;

  // in
  _proto.componentDidMount = function componentDidMount() {
    //???????????????????????????
    this.developerEdit(); //??????bind?????????????????? ??????????????????

    this.mousemoveMapEdit = this.mousemoveMapEdit.bind(this);
    this.oncopyClickFun = this.oncopyClickFun.bind(this); //??????bind?????????????????? ??????????????????

    this.loadedMap = this.loadedMap.bind(this); //??????????????????

    this.map && this.map.addEventListener('tilesloaded', this.loadedMap); //????????????????????????????????????????????????????????????

    this.addMapComponents(); //??????????????????

    this.props.baiduMapFun_BD && this.props.baiduMapFun_BD(this.map, this.view); // ??????

    this.props.init(this); //??????

    this.animstMapFun(this.props.isAnimsmap_BD && this.props.keypatherAnim_BD);
  };

  //??????????????????????????????????????????????????????
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.isAnimsmap_BD !== prevProps.isAnimsmap) {
      this.animstMapFun(this.props.isAnimsmap_BD && this.props.keypatherAnim_BD);
    }
  } // out
  ;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener("mousemove", this.mousemoveMapEdit);
      this.map.removeEventListener("tilesloaded", this.loadedMap);
      this.map.clearOverlays();
      this.map.destroy();
    }

    if (this.animationMap) {
      this.animationMap.removeEventListener('animationstart', this.istrueAnimfun(false));
    }

    this.copyMainIdDomRef.current && this.copyMainIdDomRef.current.removeEventListener('click', this.oncopyClickFun);
  } // ???????????????????????????
  ;

  _proto.loadedMap = function loadedMap() {
    this.setState({
      isLoadedMapSkeleton: false
    });

    require('./ignoreUtil/drawingManager.min');

    this.map && this.map.removeEventListener("tilesloaded", this.loadedMap);
  };

  // ??????????????????????????? ???????????????
  _proto.addMapComponents = function addMapComponents() {
    //????????????
    this.map && this.map.enableInertialDragging(); //????????????????????????

    this.map && this.map.disableContinuousZoom();
    this.map && this.map.disableDoubleClickZoom(); // ?????????????????????
    // let scaleCtrl = new BMapGL.ScaleControl( { offset: new BMapGL.Size( 70, 3 ) } );
    // this.map.addControl( scaleCtrl );
    // // ??????????????????
    // let zoomCtrl = new BMapGL.ZoomControl( { offset: new BMapGL.Size( 12.5, 22 ) } );
    // this.map.addControl( zoomCtrl );
    // // ??????3d??????
    // let navigationCtrl = new BMapGL.NavigationControl3D();
    // this.map.addControl( navigationCtrl );
  };

  // ???????????????????????????
  _proto.developerEdit = function developerEdit() {
    var isFlage = this.props.isDeveloperEditProp_BD;

    if (isFlage) {
      this.setState({
        isDeveloperEdit: isFlage
      });
    } else {
      this.setState({
        isDeveloperEdit: false
      });
    }
  };

  // ??????????????????????????????
  _proto.isShowOrHideBtnOnClick = function isShowOrHideBtnOnClick() {
    var isShowEditBtnflag = this.state.isShowEditBtn;
    var isDrowState = this.props.isDrowState_BD;

    var _this = this;

    if (isDrowState) {
      _message2.default.warning('???????????????????????????');

      return;
    }

    var $cancelOperate = (0, _jquery.default)('#cancelOperate');

    if ($cancelOperate.length > 0) {
      $cancelOperate.click();
    }

    this.setState({
      isBtnLoding: true
    });
    clearTimeout(this.btntimer);
    this.btntimer = setTimeout(function () {
      if (isShowEditBtnflag) {
        _this.map.removeEventListener('mousemove', _this.mousemoveMapEdit);

        _this.oncopyFun(false);

        _this.props.isEditProp_BD && _this.props.isEditProp_BD(false);

        _this.setState({
          isShowEditBtn: false,
          isBtnLoding: false
        });
      } else {
        _this.setState({
          isShowEditBtn: true,
          isBtnLoding: false
        });

        _this.props.isEditProp_BD && _this.props.isEditProp_BD(true);

        _this.map.addEventListener('mousemove', _this.mousemoveMapEdit);
      }
    }, 1500);
  };

  // ??????????????????????????????
  _proto.mousemoveMapEdit = function mousemoveMapEdit(e) {
    if (this.copyIdDomRef.current !== null) {
      this.copyIdDomRef.current.innerText = e.latlng.lng + ' , ' + e.latlng.lat;
    }
  };

  // ??????????????????????????????
  _proto.oncopyFun = function oncopyFun(e) {
    var _this3 = this;

    var flage = e;

    if (!flage) {
      this.copyMainIdDomRef.current && this.copyMainIdDomRef.current.removeEventListener('click', this.oncopyClickFun);
    }

    this.setState({
      isCoodCopy: flage
    }, function () {
      if (flage) {
        _this3.copyMainIdDomRef.current && _this3.copyMainIdDomRef.current.addEventListener('click', _this3.oncopyClickFun);
      }
    });
  } // ????????????????????????????????????
  ;

  _proto.oncopyClickFun = function oncopyClickFun() {
    (0, _copyText.copyToClipboard)('copyId');
  } // ??????????????????
  ;

  _proto.animstMapFun = function animstMapFun(isfalge, keypather) {
    // ???????????????
    var isadnimgAnim = this.state.isadnimgAnim;
    var keyFrames = keypather ? keypather : [];
    var opts = {
      duration: 40000,
      delay: 1000,
      interation: 'INFINITE' //????????????

    }; // ??????????????????

    if (isfalge) {
      this.animationMap = new BMapGL.ViewAnimation(keyFrames, opts);
      this.animationMap.addEventListener('animationstart', this.istrueAnimfun(true)); // ??????????????????

      this.map.startViewAnimation(this.animationMap);
    } else {
      if (isadnimgAnim) {
        this.animationMap.removeEventListener('animationstart', this.istrueAnimfun(false)); // ??????????????????

        this.map.cancelViewAnimation(this.animationMap);
      }
    }
  };

  // ??????????????????
  _proto.istrueAnimfun = function istrueAnimfun(data) {
    this.setState({
      isadnimgAnim: data
    });
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        isLoadedMapSkeleton = _this$state.isLoadedMapSkeleton,
        isDeveloperEdit = _this$state.isDeveloperEdit,
        isShowEditBtn = _this$state.isShowEditBtn,
        isBtnLoding = _this$state.isBtnLoding,
        isCoodCopy = _this$state.isCoodCopy;
    var _this$props = this.props,
        coordinateItem_BD = _this$props.coordinateItem_BD,
        zoomItem_BD = _this$props.zoomItem_BD,
        headingItem_BD = _this$props.headingItem_BD,
        tiltItem_BD = _this$props.tiltItem_BD,
        mapTypeItem_BD = _this$props.mapTypeItem_BD,
        StyleItem_BD = _this$props.StyleItem_BD; //??????????????????

    var _this$props2 = this.props,
        planeDataPolyLine_BD = _this$props2.planeDataPolyLine_BD,
        planeDataCricle_BD = _this$props2.planeDataCricle_BD,
        planeDataMarker_BD = _this$props2.planeDataMarker_BD,
        planeDataPolyGon_BD = _this$props2.planeDataPolyGon_BD,
        planeDataLabel_BD = _this$props2.planeDataLabel_BD,
        planeDataCustom_BD = _this$props2.planeDataCustom_BD,
        standDataPoylon_BD = _this$props2.standDataPoylon_BD; //??????????????????

    var _this$props3 = this.props,
        onMapOverClickFun_BD = _this$props3.onMapOverClickFun_BD,
        onMapOverdbClickFun_BD = _this$props3.onMapOverdbClickFun_BD,
        delDataResultFun_BD = _this$props3.delDataResultFun_BD; //??????????????????

    var _this$props4 = this.props,
        isPolyLine_BD = _this$props4.isPolyLine_BD,
        isPolyCricle_BD = _this$props4.isPolyCricle_BD,
        isMarker_BD = _this$props4.isMarker_BD,
        isPolyGon_BD = _this$props4.isPolyGon_BD,
        isPolyLabel_BD = _this$props4.isPolyLabel_BD,
        isCustom_BD = _this$props4.isCustom_BD,
        isStand_BD = _this$props4.isStand_BD;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "baidumap"
    }, /*#__PURE__*/_react.default.createElement(_reactBmapgl.Map, {
      ref: function ref(_ref2) {
        _this4.map = _ref2 && _ref2.map;
      },
      style: {
        height: '100%',
        width: '100%'
      },
      mapStyleV2: {
        styleJson: StyleItem_BD
      },
      enableDoubleClickZoom: false // ??????????????????????????????
      ,
      center: coordinateItem_BD,
      zoom: zoomItem_BD,
      heading: headingItem_BD,
      tilt: tiltItem_BD,
      enableDragging: true //?????????????????????????????????
      ,
      mapType: mapTypeItem_BD,
      enableScrollWheelZoom: true //??????????????????????????????
      ,
      maxZoom: 22,
      minZoom: 1 //????????????/???????????????

    }, /*#__PURE__*/_react.default.createElement(_planeLine.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataPolyLine: planeDataPolyLine_BD,
      delDataResultFun: delDataResultFun_BD,
      isPolyLine: isPolyLine_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_planeCricle.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataCricle: planeDataCricle_BD,
      delDataResultFun: delDataResultFun_BD,
      isPolyCricle: isPolyCricle_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_planeMarker.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataMarker: planeDataMarker_BD,
      delDataResultFun: delDataResultFun_BD,
      isMarker: isMarker_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_planeGon.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataPolyGon: planeDataPolyGon_BD,
      delDataResultFun: delDataResultFun_BD,
      isPolyGon: isPolyGon_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_planeLabel.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataLabel: planeDataLabel_BD,
      delDataResultFun: delDataResultFun_BD,
      isPolyLabel: isPolyLabel_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_planeCustom.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      planeDataCustom: planeDataCustom_BD,
      delDataResultFun: delDataResultFun_BD,
      isCustom: isCustom_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_standPoylon.default, {
      map: this.map,
      isEnableDragging: isShowEditBtn,
      standDataPoylon: standDataPoylon_BD,
      delDataResultFun: delDataResultFun_BD,
      isStand: isStand_BD,
      onMapClickFun: onMapOverClickFun_BD,
      onMapdbClickFun: onMapOverdbClickFun_BD
    }), /*#__PURE__*/_react.default.createElement(_reactBmapgl.MapvglView, {
      map: this.map,
      ref: function ref(_ref) {
        _this4.view = _ref && _ref.view;
      } // effects={["bloom"]}  //"bloom" | "bright" | "blur" //???????????????  ??????

    })), isShowEditBtn && /*#__PURE__*/_react.default.createElement(_drawingManagerUtil.default, {
      map: this.map
    }), isDeveloperEdit && /*#__PURE__*/_react.default.createElement("div", {
      className: "isDeveloperEditClass",
      onClick: function onClick() {
        return _this4.isShowOrHideBtnOnClick();
      }
    }, isShowEditBtn ? /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "text",
      loading: isBtnLoding,
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: '#29ea0a'
      }
    }, isBtnLoding ? '' : '??????')) : /*#__PURE__*/_react.default.createElement(_button.default, {
      type: "text",
      loading: isBtnLoding,
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/_react.default.createElement("span", null, isBtnLoding ? '' : '??????'))), isShowEditBtn && /*#__PURE__*/_react.default.createElement("div", {
      className: "baiduapi_main_copydombtn"
    }, /*#__PURE__*/_react.default.createElement(_checkbox.default, {
      onChange: function onChange(e) {
        return _this4.oncopyFun(e.target.checked);
      }
    })), isCoodCopy && /*#__PURE__*/_react.default.createElement("div", {
      ref: this.copyMainIdDomRef,
      className: "baiduapi_maincopydom"
    }), isShowEditBtn && /*#__PURE__*/_react.default.createElement("div", {
      className: "baiduapi_main_copydom"
    }, "\u6807\u51C6\u5750\u6807\uFF1A", /*#__PURE__*/_react.default.createElement("span", {
      id: 'copyId',
      ref: this.copyIdDomRef
    })), isLoadedMapSkeleton && /*#__PURE__*/_react.default.createElement("div", {
      className: "baiduapi_loading"
    }, /*#__PURE__*/_react.default.createElement(_spin.default, {
      size: "large",
      tip: "Loading..."
    })));
  };

  return BaidumapStart;
}(_react.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    coordinateItem_BD: state.objs.coordinateItem_BD,
    zoomItem_BD: state.vars.zoomItem_BD,
    headingItem_BD: state.vars.headingItem_BD,
    tiltItem_BD: state.vars.tiltItem_BD,
    mapTypeItem_BD: state.vars.mapTypeItem_BD,
    StyleItem_BD: state.vars.StyleItem_BD,
    isDeveloperEditProp_BD: state.vars.isDeveloperEditProp_BD,
    isEditProp_BD: state.vars.isEditProp_BD,
    resuleFun_BD: state.vars.resuleFun_BD,
    baiduMapFun_BD: state.vars.baiduMapFun_BD,
    onMapOverClickFun_BD: state.vars.onMapOverClickFun_BD,
    onMapOverdbClickFun_BD: state.vars.onMapOverdbClickFun_BD,
    addDataResultFun_BD: state.vars.addDataResultFun_BD,
    delDataResultFun_BD: state.vars.delDataResultFun_BD,
    isAnimsmap_BD: state.vars.isAnimsmap_BD,
    keypatherAnim_BD: state.vars.keypatherAnim_BD,
    layerDataMap_BD: state.lists.layerDataMap_BD,
    standDataPoylon_BD: state.lists.standDataPoylon_BD,
    planeDataPolyLine_BD: state.lists.planeDataPolyLine_BD,
    planeDataPolyGon_BD: state.lists.planeDataPolyGon_BD,
    planeDataMarker_BD: state.lists.planeDataMarker_BD,
    planeDataLabel_BD: state.lists.planeDataLabel_BD,
    planeDataCustom_BD: state.lists.planeDataCustom_BD,
    planeDataCricle_BD: state.lists.planeDataCricle_BD,
    isDrowState_BD: state.vars.isDrowState_BD,
    isPolyLine_BD: state.vars.isPolyLine_BD,
    isPolyCricle_BD: state.vars.isPolyCricle_BD,
    isMarker_BD: state.vars.isMarker_BD,
    isPolyGon_BD: state.vars.isPolyGon_BD,
    isPolyLabel_BD: state.vars.isPolyLabel_BD,
    isCustom_BD: state.vars.isCustom_BD,
    isStand_BD: state.vars.isStand_BD,
    isLayer_BD: state.vars.isLayer_BD
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    init: function init(_this) {
      dispatch(_actions.default.setVars('isDrowState_BD', false));
      dispatch(_actions.default.setVars('isPolyLine_BD', true));
      dispatch(_actions.default.setVars('isPolyCricle_BD', true));
      dispatch(_actions.default.setVars('isMarker_BD', true));
      dispatch(_actions.default.setVars('isPolyGon_BD', true));
      dispatch(_actions.default.setVars('isPolyLabel_BD', true));
      dispatch(_actions.default.setVars('isCustom_BD', true));
      dispatch(_actions.default.setVars('isStand_BD', true));
      dispatch(_actions.default.setVars('isLayer_BD', true));
    }
  };
};

var _default = (0, _MapApiLoaderHOC.default)({
  ak: sessionStorage.getItem('BaidumapAk')
})((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BaidumapStart));

exports.default = _default;