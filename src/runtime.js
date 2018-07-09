import memoize from 'lodash/memoize';

let getRuntime = null;

class Runtime {
  get browser() {
    return this.value === 'browser';
  }

  get info() {
    return {
      browser: this.browser,
      node: this.node,
      reactNative: this.reactNative,
      value: this.value
    };
  }

  get node() {
    return this.value === 'node';
  }

  get reactNative() {
    return this.value === 'react-native';
  }

  get value() {
    if (!getRuntime) getRuntime = memoize(require('./getRuntime').default);
    return getRuntime();
  }
}

export default new Runtime();
