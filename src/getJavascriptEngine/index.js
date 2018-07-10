import { runtime, browserEngine, os } from '..';
import { isV8, browser } from '../helper';

function isJSC() {
  if ('WebkitAppearance' in window.document.documentElement.style) {
    return !isV8();
  }
  return false;
}

function isWkWebView() {
  const { userAgent } = window.navigator;
  if (
    (/safari/i.test(userAgent) &&
      /version/i.test(userAgent) &&
      !window.navigator.standalone) ||
    ((window.webkit && window.webkit.messageHandlers) ||
      !/constructor/i.test(window.HTMLElement) ||
      !!window.indexedDB)
  ) {
    return true;
  }
  return false;
}

export default function getJavaScriptEngine() {
  if (runtime.node) return 'v8';
  if (os.ios) {
    if (isWkWebView() || browser.safari) return 'nitro';
    return 'jsc';
  }
  if (!runtime.browser) return 'unknown';
  if (browserEngine.gecko) return 'spidermonkey';
  if (browserEngine.blink) return 'v8';
  if (browserEngine.edgehtml || browserEngine.trident) return 'chakra';
  if (isV8()) return 'v8';
  if (isJSC()) return 'jsc';
  return 'unknown';
}
