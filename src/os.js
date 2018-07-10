import memoize from 'lodash/memoize';

let getOS = null;

class OS {
  get aix() {
    return this.value === 'aix';
  }

  get amigaos() {
    return this.value === 'amigaos';
  }

  get android() {
    return this.value === 'android';
  }

  get beos() {
    return this.value === 'beos';
  }

  get bsd() {
    return this.freebsd || this.openbsd;
  }

  get centos() {
    return this.value === 'centos';
  }

  get darwin() {
    return this.value === 'darwin' || this.ios;
  }

  get debian() {
    return this.ubuntu || this.value === 'debian';
  }

  get fedora() {
    return this.value === 'fedora';
  }

  get freebsd() {
    return this.value === 'freebsd';
  }

  get info() {
    return {
      aix: this.aix,
      amigaos: this.amigaos,
      android: this.android,
      beos: this.beos,
      bsd: this.bsd,
      centos: this.centos,
      darwin: this.darwin,
      debian: this.debian,
      fedora: this.fedora,
      freebsd: this.freebsd,
      ios: this.ios,
      linux: this.linux,
      mac: this.mac,
      nintendo: this.nintendo,
      openbsd: this.openbsd,
      redhat: this.redhat,
      rhel: this.rhel,
      slackware: this.slackware,
      starBlade: this.starBlade,
      sunos: this.sunos,
      ubuntu: this.ubuntu,
      unix: this.unix,
      value: this.value,
      win: this.win,
      win32: this.win32,
      windows: this.windows
    };
  }

  get ios() {
    return this.value === 'ios';
  }

  get linux() {
    if (this.rhel) return true;
    if (this.debian) return true;
    switch (this.value) {
      case 'linux':
        return true;
      case 'android':
        return true;
      case 'slackware':
        return true;
    }
    return false;
  }

  get mac() {
    return this.darwin;
  }

  get nintendo() {
    return this.value === 'nintendo' || this.wii;
  }

  get openbsd() {
    return this.value === 'openbsd';
  }

  get redhat() {
    return this.value === 'redhat';
  }

  get rhel() {
    return this.redhat || this.centos || this.fedora;
  }

  get slackware() {
    return this.value === 'slackware';
  }

  get starBlade() {
    return this.value === 'star-blade';
  }

  get sunos() {
    return this.value === 'sunos';
  }

  get ubuntu() {
    return this.value === 'ubuntu';
  }

  get unix() {
    if (this.linux) return true;
    if (this.darwin) return true;
    if (this.bsd) return true;
    switch (this.value) {
      case 'ais':
        return true;
      case 'sunos':
        return true;
    }
    return false;
  }

  get value() {
    if (!getOS) getOS = memoize(require('./getOS').default);
    return getOS();
  }

  get wii() {
    return this.value === 'wii';
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
