import get from 'lodash/get';
import { browser } from '..';

export default function getBrowserEngine() {
  if (browser.value === 'na') return 'na';
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = get(window, 'navigator.userAgent', '');
  if ((browser.chrome || browser.opera) && !!window.CSS) {
    return 'blink';
  }
  if (browser.firefox || /gecko/i.test(userAgent)) return 'gecko';
  if (browser.ie) return 'trident';
  if (browser.edge) return 'edgehtml';
  if (/webkit/i.test(userAgent)) return 'webkit';
  return 'unknown';
}
