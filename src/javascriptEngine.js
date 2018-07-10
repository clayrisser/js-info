import memoize from 'lodash/memoize';

let getJavascriptEngine = null;

class JavascriptEngine {
  get chakra() {
    return this.value === 'chakra';
  }

  get info() {
    return {
      chakra: this.chakra,
      jsc: this.jsc,
      nitro: this.nitro,
      spidermonkey: this.spidermonkey,
      v8: this.v8,
      value: this.value
    };
  }

  get jsc() {
    return this.value === 'jsc' || this.nitro;
  }

  get nitro() {
    return this.value === 'nitro';
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
