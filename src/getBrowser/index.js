// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769

import { runtime } from '..';

function isOpera() {
  if (!!window.opr && !!window.opr.addons) return true;
  if (!!window.opera) return true;
  const { userAgent } = window.navigator;
  if (/ opr/i.test(userAgent)) return true;
  return false;
}

function isFirefox() {
  return typeof window.InstallTrigger !== 'undefined';
}

function isSafari() {
  if (/constructor/i.test(window.HTMLElement)) return true;
  if (window.safari && typeof window.safari !== 'undefined') {
    const { pushNotification } = window.safari;
    return pushNotification.toString() === '[object SafariRemoteNotification]';
  }
  return false;
}

function isIE() {
  /* eslint-disable spaced-comment */
  // prettier-ignore
  return /*@cc_on!@*/false || !!window.document.documentMode;
  /* eslint-enable */
}

function isEdge() {
  return !isIE() && !!window.StyleMedia;
}

function isChrome() {
  if (!!window.chrome && !!window.chrome.webstore) return true;
  const { userAgent } = window.navigator;
  if (/chrome/i.test(userAgent)) return true;
  return false;
}

export default function getBrowser() {
  if (!runtime.browser) return 'na';
  if (isOpera()) return 'opera';
  if (isFirefox()) return 'firefox';
  if (isSafari()) return 'safari';
  if (isIE()) return 'ie';
  if (isEdge()) return 'edge';
  if (isChrome()) return 'chrome';
  return 'unknown';
}
