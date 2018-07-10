// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769

import { runtime, os } from '..';

function isOpera() {
  if (!!window.opr && !!window.opr.addons) return true;
  if (!!window.opera) return true;
  const { userAgent } = window.navigator;
  if (/\sopr/i.test(userAgent)) return true;
  return false;
}

function isFirefox() {
  if (typeof window.InstallTrigger !== 'undefined') return true;
  const { userAgent } = window.navigator;
  if (os.ios && /fxios/i.test(userAgent)) return true;
  return false;
}

function isSafari() {
  if (/constructor/i.test(window.HTMLElement)) return true;
  if (window.safari && typeof window.safari !== 'undefined') {
    const { pushNotification } = window.safari;
    return pushNotification.toString() === '[object SafariRemoteNotification]';
  }
  const { userAgent } = window.navigator;
  if (/safari/i.test(userAgent)) return true;
  return false;
}

function isIE() {
  /* eslint-disable spaced-comment */
  // prettier-ignore
  return /*@cc_on!@*/false || !!window.document.documentMode;
  /* eslint-enable */
}

function isEdge() {
  if (!isIE() && !!window.StyleMedia) return true;
  const { userAgent } = window.navigator;
  if (os.android && /\sedg/i.test(userAgent)) return true;
  return false;
}

function isChrome() {
  if (!!window.chrome && !!window.chrome.webstore) return true;
  const { userAgent } = window.navigator;
  if (/chrome/i.test(userAgent)) return true;
  if (os.ios && /crios/i.test(userAgent)) return true;
  return false;
}

export default function getBrowser() {
  if (!runtime.browser) return 'na';
  if (isIE()) return 'ie';
  if (isEdge()) return 'edge';
  if (isFirefox()) return 'firefox';
  if (isOpera()) return 'opera';
  if (isChrome()) return 'chrome';
  if (isSafari()) return 'safari';
  return 'unknown';
}
