import { isBrowser, isNode } from '../helper';

export default function getRuntime() {
  if (isBrowser()) return 'browser';
  if (isNode()) return 'node';
  return 'unknown';
}
