export const isBrowser = new Function(
  'try { return this === window } catch (e) { return false }'
);

export const isNode = new Function(
  'try { return this === global } catch (e) { return false }'
);

export function isV8() {
  if (window.devicePixelRatio) {
    const v8string =
      'function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D';
    if (window.escape(window.navigator.javaEnabled.toString()) === v8string) {
      return true;
    }
  }
  return false;
}

export default { isBrowser, isNode, isV8 };
