import get from 'lodash/get';
import { runtime, os } from '..';

export default function isMobile() {
  if (runtime.node) return false;
  if (os.android || os.ios) return true;
  if (typeof window === 'undefined') return false;
  if (/mobile/i.test(get(window, 'navigator.userAgent', ''))) return true;
  return false;
}
