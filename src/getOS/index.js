import get from 'lodash/get';
import { runtime } from '../';

export default function getOS() {
  if (runtime.node) return process.platform;
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = get(window, 'navigator.userAgent', '');
  if (/mac\sos\sx/i.test(userAgent)) {
    return 'darwin';
  } else if (/freebsd/i.test(userAgent)) {
    return 'freebsd';
  } else if (/openbsd/i.test(userAgent)) {
    return 'openbsd';
  } else if (/linux/i.test(userAgent)) {
    return 'linux';
  } else if (/windows/i.test(userAgent)) {
    return 'win32';
  } else if (/kindle/i.test(userAgent)) {
    return 'kindle';
  }
  return 'unknown';
}
