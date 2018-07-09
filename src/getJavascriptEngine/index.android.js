import { isV8 } from '../helper';

export default function getJavaScriptEngine() {
  if (isV8()) return 'v8';
  return 'jsc';
}
