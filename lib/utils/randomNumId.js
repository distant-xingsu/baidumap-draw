"use strict";

exports.__esModule = true;
exports.default = GenNonDuplicateID;

/**
 * 生成一个用不重复的ID
 */
//函数将生成类似 8dlv9vabygks2cbg1spds4i 的ID
function GenNonDuplicateID() {
  return Math.random().toString(36).substr(3);
}