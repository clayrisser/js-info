import get from 'lodash/get';
import { runtime } from '..';

export default function getOS() {
  if (runtime.node) {
    const release = getRelease();
    if (/ubuntu/i.test(release)) {
      return 'ubuntu';
    } else if (/debian/i.test(release)) {
      return 'debian';
    } else if (/centos/i.test(release)) {
      return 'centos';
    } else if (/fedora/i.test(release)) {
      return 'fedora';
    } else if (/red\shat/i.test(release)) {
      return 'redhat';
    }
    if (process.platform && process.platform.length) {
      if (
        process.platform === 'win32' &&
        (/64/.test(process.arch) || process.env.PROCESSOR_ARCHITEW6432)
      ) {
        return 'win64';
      }
      if (process.platform === 'darwin') return 'mac';
      return process.platform;
    }
    return 'unknown';
  }
  if (typeof window === 'undefined') return 'unknown';
  const userAgent = get(window, 'navigator.userAgent', '');
  if (/windows/i.test(userAgent)) {
    if (
      /(x86.|win|amd|wow|x64_)64/i.test(userAgent) ||
      /x64;/i.test(userAgent)
    ) {
      return 'win64';
    }
    return 'win32';
  } else if (/ipad|iphone|ipod/i.test(userAgent)) {
    return 'ios';
  } else if (/mac\sos\sx/i.test(userAgent)) {
    return 'mac';
  } else if (/android/i.test(userAgent)) {
    return 'android';
  } else if (/debian/i.test(userAgent)) {
    return 'debian';
  } else if (/ubuntu/i.test(userAgent)) {
    return 'ubuntu';
  } else if (/centos/i.test(userAgent)) {
    return 'centos';
  } else if (/fedora/i.test(userAgent)) {
    return 'fedora';
  } else if (/red\shat/i.test(userAgent)) {
    return 'redhat';
  } else if (/slackware/i.test(userAgent)) {
    return 'slackware';
  } else if (/linux/i.test(userAgent)) {
    return 'linux';
  } else if (/freebsd/i.test(userAgent)) {
    return 'freebsd';
  } else if (/openbsd/i.test(userAgent)) {
    return 'openbsd';
  } else if (/sunos/i.test(userAgent)) {
    return 'sunos';
  } else if (/aix/i.test(userAgent)) {
    return 'aix';
  } else if (/amigaos/i.test(userAgent)) {
    return 'amigaos';
  } else if (/beos/i.test(userAgent)) {
    return 'beos';
  } else if (/star-blade/i.test(userAgent)) {
    return 'star-blade';
  } else if (/nintendo\swii/i.test(userAgent)) {
    return 'wii';
  } else if (/nintendo/i.test(userAgent)) {
    return 'nintendo';
  }
  return 'unknown';
}

function getRelease() {
  const deasync = require('deasync');
  const exec = deasync(require('child_process').exec);
  return exec('cat /etc/os-release');
}
