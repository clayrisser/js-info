import memoize from 'lodash/memoize';

let getBrowserEngine = null;

class BrowserEngine {
  get blink() {
    return this.value === 'blink';
  }

  get edgehtml() {
    return this.value === 'edgehtml';
  }

  get gecko() {
    return this.value === 'gecko';
  }

  get info() {
    return {
      blink: this.blink,
      edgehtml: this.edgehtml,
      gecko: this.gecko,
      trident: this.trident,
      webkit: this.webkit,
      value: this.value
    };
  }

  get trident() {
    return this.value === 'trident';
  }

  get webkit() {
    return this.value === 'webkit';
  }

  get value() {
    if (!getBrowserEngine) {
      getBrowserEngine = memoize(require('./getBrowserEngine').default);
    }
    return getBrowserEngine();
  }
}

export default new BrowserEngine();
