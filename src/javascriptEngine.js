import memoize from 'lodash/memoize';

let getJavascriptEngine = null;

class JavascriptEngine {
  get info() {
    return {
      jsc: this.jsc,
      spidermonkey: this.spidermonkey,
      v8: this.v8,
      value: this.value
    };
  }

  get jsc() {
    return this.value === 'jsc';
  }

  get spidermonkey() {
    return this.value === 'spidermonkey';
  }

  get v8() {
    return this.value === 'v8';
  }

  get value() {
    if (!getJavascriptEngine) {
      getJavascriptEngine = memoize(require('./getJavascriptEngine').default);
    }
    return getJavascriptEngine();
  }
}

export default new JavascriptEngine();
