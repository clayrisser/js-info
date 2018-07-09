import memoize from 'lodash/memoize';

let getBrowser = null;

class Browser {
  get chrome() {
    return this.value === 'chrome';
  }

  get edge() {
    return this.value === 'edge';
  }

  get firefox() {
    return this.value === 'firefox';
  }

  get ie() {
    return this.value === 'ie';
  }

  get info() {
    return {
      chrome: this.chrome,
      edge: this.edge,
      firefox: this.firefox,
      ie: this.ie,
      opera: this.opera,
      safari: this.safari,
      value: this.value
    };
  }

  get opera() {
    return this.value === 'opera';
  }

  get safari() {
    return this.value === 'safari';
  }

  get value() {
    if (!getBrowser) getBrowser = memoize(require('./getBrowser').default);
    return getBrowser();
  }
}

export default new Browser();
