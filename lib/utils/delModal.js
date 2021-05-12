"use strict";

exports.__esModule = true;
exports.showDeleteConfirm1 = showDeleteConfirm1;

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirm = _modal.default.confirm;

function showDeleteConfirm1(onOk, onCancel) {
  confirm({
    title: '是否删除?',
    icon: /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, {
      style: {
        color: 'red'
      }
    }),
    content: '点击确认将执行删除操作',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: onOk,
    onCancel: onCancel
  });
}