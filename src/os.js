import memoize from 'lodash/memoize';

let getOS = null;

class OS {
  get android() {
    return this.value === 'android';
  }

  get darwin() {
    return this.value === 'darwin';
  }

  get freebsd() {
    return this.value === 'freebsd';
  }

  get info() {
    return {
      android: this.android,
      darwin: this.darwin,
      freebsd: this.freebsd,
      ios: this.ios,
      kindle: this.kindle,
      linux: this.linux,
      mac: this.mac,
      openbsd: this.openbsd,
      value: this.value,
      win: this.win,
      win32: this.win32,
      windows: this.windows
    };
  }

  get ios() {
    return this.value === 'ios';
  }

  get kindle() {
    return this.value === 'kindle';
  }

  get linux() {
    return this.value === 'linux';
  }

  get mac() {
    return this.darwin;
  }

  get openbsd() {
    return this.value === 'openbsd';
  }

  get value() {
    if (!getOS) getOS = memoize(require('./getOS').default);
    return getOS();
  }

  get win() {
    return this.win32;
  }

  get windows() {
    return this.win32;
  }

  get win32() {
    return this.value === 'win32';
  }
}

export default new OS();
