import { runtime, browserEngine } from '..';
import { isV8 } from '../helper';

function isJSC() {
  try {
    throw new Error();
  } catch (err) {
    if (typeof err.sourceId === 'number') {
      return !isV8();
    }
  }
  return false;
}

export default function getJavaScriptEngine() {
  if (runtime.node) return 'v8';
  if (!runtime.browser) return 'unknown';
  if (browserEngine.gecko) return 'spidermonkey';
  if (browserEngine.blink) return 'v8';
  if (browserEngine.webkit) return 'unknown';
  if (isV8()) return 'v8';
  if (isJSC()) return 'jsc';
  return 'unknown';
}
