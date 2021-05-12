"use strict";

exports.__esModule = true;
exports.requireCss = requireCss;
exports.requireScript = requireScript;

/**
 * @file 异步加载css和script
 */
var headElement = document.head || document.getElementsByTagName('head')[0];
var _importedScript = {};

function requireCss(src) {
  return new Promise(function (resolve, reject) {
    if (src in _importedScript) {
      resolve();
      return;
    }

    var script = document.createElement('link');
    script.type = 'text/css';
    script.rel = 'stylesheet';
    script.href = src; // 加载失败

    script.onerror = function (err) {
      headElement.removeChild(script);
      reject(new URIError("The css " + src + " is no accessible."));
    }; // 加载成功


    script.onload = function () {
      _importedScript[src] = true;
      resolve();
    };

    headElement.appendChild(script);
  });
}

function requireScript(src) {
  return new Promise(function (resolve, reject) {
    if (src in _importedScript) {
      resolve();
      return;
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src; // 加载失败

    script.onerror = function (err) {
      headElement.removeChild(script);
      reject(new URIError("The Script " + src + " is no accessible."));
    }; // 加载成功


    if (isImplementedOnload(script)) {
      // Firefox, Safari, Chrome, and Opera
      script.onload = function () {
        _importedScript[src] = true;
        resolve();
      };
    } else {
      // IE
      script.onreadystatechange = function () {
        // eslint-disable-next-line
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          _importedScript[src] = true;
          resolve();
        }
      };
    }

    headElement.appendChild(script);
  });
}

function isImplementedOnload(script) {
  script = script || document.createElement('script');

  if ('onload' in script) {
    return true;
  } // @ts-ignore


  script.setAttribute('onload', '');
  return typeof script['onload'] === 'function'; // ff true ie false .
}