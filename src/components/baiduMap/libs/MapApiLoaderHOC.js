/* eslint-disable */
/**
 * @file 异步加载JSAPI的高阶组件
 * @author hedongran [hdr01@126.com]
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var getDisplayName_1 = tslib_1.__importDefault(require("./getDisplayName"));
/**
 * 异步加载JSAPI的高阶组件，在业务组件中使用，从而实现将JSAPI以异步形式插入，而不是提前放到`index.html`模板里。
 * @visibleName MapApiLoaderHOC 异步加载HOC
 */
exports.default = (function (hocProps) { return function (WrappedComponent) {
    var _a;
    return _a = /** @class */ (function (_super) {
            tslib_1.__extends(MapApiLoaderHOC, _super);
            function MapApiLoaderHOC(props) {
                var _this = _super.call(this, props) || this;
                _this.state = {
                    loaded: _this.isLoadReady()
                };
                _this.loadJSAPI = _this.loadJSAPI.bind(_this);
                _this.handleLoaded = _this.handleLoaded.bind(_this);
                return _this;
            }
            MapApiLoaderHOC.prototype.isLoadReady = function () {
                return !!(window.BMapGL && window.BMapGL.Map);
            };
            MapApiLoaderHOC.prototype.componentDidMount = function () {
                if (!this.isLoadReady()) {
                    if (!hocProps.ak) {
                        throw new TypeError('MapApiLoaderHOC: ak is required');
                    }
                    this.loadJSAPI();
                }
            };
            MapApiLoaderHOC.prototype.componentWillUnmount = function () {
                if (this.apiTimer) {
                    clearTimeout(this.apiTimer);
                }
                if (this.loadedTimer) {
                    clearTimeout(this.loadedTimer);
                }
            };
            MapApiLoaderHOC.prototype.loadJSAPI = function () {
                var _this = this;
                if (this.isLoadReady()) {
                    this.handleLoaded();
                    return;
                }
                if (window['loadingMap']) {
                    this.apiTimer = window.setTimeout(function () {
                        _this.loadJSAPI();
                    }, 300);
                }
                else if (!window['MapApiLoaderCallback']) {
                    window['loadingMap'] = true;
                    window['MapApiLoaderCallback'] = function () {
                        delete window['loadingMap'];
                        delete window['MapApiLoaderCallback'];
                    };
                    var ak = hocProps.ak;
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = "//api.map.baidu.com/api?type=webgl&v=1.0&ak=" + ak + "&callback=MapApiLoaderCallback";
                    document.body.appendChild(script);
                    this.loadedTimer = window.setTimeout(function () {
                        _this.handleLoaded();
                    }, 300);
                }
            };
            MapApiLoaderHOC.prototype.handleLoaded = function () {
                var _this = this;
                if (!this.isLoadReady()) {
                    this.loadedTimer = window.setTimeout(function () {
                        _this.handleLoaded();
                    }, 300);
                    return;
                }
                this.setState({
                    loaded: true
                });
            };
            MapApiLoaderHOC.prototype.render = function () {
                var loaded = this.state.loaded;
                var componentdomstyle = {
                    color: '#1890ff',
                    zIndex: 50,
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 21, 41, 0.9)',
                }
                return (
                    loaded ?
                        react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, this.props)) :
                        react_1.default.createElement("div", { style: componentdomstyle }, "loading..."));
            };
            return MapApiLoaderHOC;
        // eslint-disable-next-line no-sequences
        }(react_1.Component)),
        _a.displayName = "MapApiLoaderHOC(" + getDisplayName_1.default(WrappedComponent) + ")",
        _a;
}; });
