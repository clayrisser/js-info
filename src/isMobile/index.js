import get from 'lodash/get';
import { runtime } from '..';

export default function isMobile() {
  if (runtime.node) return false;
  if (typeof window === 'undefined') return false;
  return /mobile/i.test(get(window, 'navigator.userAgent', ''));
}
