import React from "react";
import { Modal } from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
const { confirm } = Modal;

function showDeleteConfirm1(onOk,onCancel) {
    confirm({
        title: '是否删除?',
        icon: <QuestionCircleOutlined style={{color:'red'}} />,
        content: '点击确认将执行删除操作',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk:onOk,
        onCancel:onCancel,
    });
}

export {
    showDeleteConfirm1
}
