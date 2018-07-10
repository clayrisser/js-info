import get from 'lodash/get';
import { browser, os } from '..';

export default function getBrowserEngine() {
  if (browser.value === 'na') return 'na';
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = get(window, 'navigator.userAgent', '');
  if (os.ios) return 'webkit';
  if (
    (browser.chrome || browser.opera || (os.android && browser.edge)) &&
    !!window.CSS
  ) {
    return 'blink';
  }
  if (browser.safari) return 'webkit';
  if (browser.ie) return 'trident';
  if (browser.edge) return 'edgehtml';
  if (browser.firefox || /gecko/i.test(userAgent)) return 'gecko';
  if (/webkit/i.test(userAgent)) return 'webkit';
  return 'unknown';
}
