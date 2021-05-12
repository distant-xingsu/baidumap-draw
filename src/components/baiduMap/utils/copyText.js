//复制内容到粘贴板
import { message } from "antd";

export const copyToClipboard=( elemId)=> {
    var elem = document.getElementById(elemId);
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    let target=''
    if (isInput) {
        // 复制选择内容
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    }
    else {
        // 必须有一个临时的元素存储复制的内容
        target = document.getElementById(targetId);
        if (!target) {
            target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // 选择内容
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    // 复制内容
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // 恢复焦点
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    if (isInput) {
        // 恢复之前的选择
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // 清除临时内容
        target.textContent = "";
    }

    message.success('复制成功！')
    return succeed;
}
