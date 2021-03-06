/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
function getDisplayName(Component) {
    if (typeof Component === 'string') {
        return Component;
    }
    if (!Component) {
        return undefined;
    }
    return Component.displayName || Component.name || 'Component';
}
exports.default = getDisplayName;
