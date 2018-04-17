import _ from 'lodash';

const { env, argv } = process;
const customEnvironment = {};
const customDefaults = {};
// eslint-disable-next-line no-undef
const browserWindow = typeof window === 'undefined' ? null : window;

export default function nodeEnvironment() {
  return {
    runtime: getRuntime(),
    mobile: isMobile(),
    os: getOS(),
    engine: getEngine(),
    env: getEnv(),
    browser: getBrowser()
  };
}

export function setEnvironment(environment = {}, defaults = {}) {
  _.memoize.Cache = WeakMap;
  _.assign(customEnvironment, environment);
  _.assign(customEnvironment, defaults);
}

function _getRuntime() {
  if (customEnvironment.runtime) return customEnvironment.runtime;
  if (isBrowser()) return 'browser';
  if (isNode()) return 'node';
  return 'unknown';
}
export const getRuntime = _.memoize(_getRuntime);

function _isMobile() {
  if (customEnvironment.mobile) return customEnvironment.mobile;
  if (getRuntime() === 'node') return false;
  if (!browserWindow) return false;
  return /mobile/i.test(_.get(browserWindow, 'navigator.userAgent', ''));
}
export const isMobile = _.memoize(_isMobile);

function _getOS() {
  if (customEnvironment.os) return customEnvironment.os;
  if (getRuntime() === 'node') {
    return process.platform;
  }
  if (!browserWindow) return 'unknown';
  const userAgent = _.get(browserWindow, 'navigator.userAgent', '');
  if (/mac\sos\sx/i.test(userAgent)) {
    return 'darwin';
  } else if (/freebsd/i.test(userAgent)) {
    return 'freebsd';
  } else if (/openbsd/i.test(userAgent)) {
    return 'openbsd';
  } else if (/linux/i.test(userAgent)) {
    return 'linux';
  } else if (/windows/i.test(userAgent)) {
    return 'win32';
  } else if (/kindle/i.test(userAgent)) {
    return 'kindle';
  }
  return 'unknown';
}
export const getOS = _.memoize(_getOS);

function _getEngine() {
  if (customEnvironment.engine) return customEnvironment.engine;
  if (getRuntime() === 'node') return 'v8';
  if (!browserWindow) return 'unknown';
  let engine = 'unknown';
  const userAgent = _.get(browserWindow, 'navigator.userAgent', '');
  if (/gecko/i.test(userAgent)) {
    engine = 'gecko';
  } else if (/webkit/i.test(userAgent)) {
    engine = 'webkit';
  }
  try {
    throw new Error();
  } catch (exc) {
    if (_.isNumber(exc.sourceId)) {
      engine = 'jsc';
    }
  }
  const v8string =
    'function%20javaEnabled%28%29%20%7B%20%5Bnative%20code%5D%20%7D';
  if (browserWindow.devicePixelRatio) {
    // eslint-disable-next-line no-undef
    if (
      engine === 'webkit' &&
      escape(browserWindow.navigator.javaEnabled.toString()) === v8string
    ) {
      return 'v8';
    } else if (engine === 'jsc') {
      return 'jsc';
    }
  }
  return 'unknown';
}
export const getEngine = _.memoize(_getEngine);

function _getBrowser() {
  if (customEnvironment.browser) return customEnvironment.browser;
  if (getRuntime() !== 'browser') return null;
  const userAgent = _.get(browserWindow, 'navigator.userAgent', '');
  if (/chrome/i.test(userAgent)) {
    return 'chrome';
  } else if (/firefox/i.test(userAgent)) {
    return 'firefox';
  } else if (/safari/i.test(userAgent)) {
    return 'safari';
  } else if (/opera/i.test(userAgent)) {
    return 'opera';
  } else if (/edge/i.test(userAgent)) {
    return 'edge';
  }
  let ieVersion = -1;
  if (
    browserWindow.navigator.appName.toLowerCase() ===
    'microsoft internet explorer'
  ) {
    const ieRegex = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
    if (ieRegex.exec(userAgent) !== null) ieVersion = parseFloat(RegExp.$1);
  } else if (browserWindow.navigator.appName.toLowerCase() === 'netscape') {
    const ieRegex = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
    if (ieRegex.exec(userAgent) !== null) ieVersion = parseFloat(RegExp.$1);
  }
  if (ieVersion > -1) {
    return `ie${ieVersion}`;
  }
  return 'unknown';
}
export const getBrowser = _.memoize(_getBrowser);

function _getEnv() {
  if (customEnvironment.env) return customEnvironment.env;
  const nodeEnv = (env.NODE_ENV || '').toLowerCase();
  let environment = customDefaults.env || 'development';
  if (_.get(env, '__DEV__', '').toLowerCase() === 'false') {
    environment = 'production';
  }
  if (_.includes(argv, '--test') || _.includes(argv, '--testing')) {
    return 'testing';
  } else if (_.includes(argv, '--stage') || _.includes(argv, '--staging')) {
    return 'staging';
  } else if (_.includes(argv, '--prod') || _.includes(argv, '--production')) {
    return 'production';
  } else if (nodeEnv === 'test' || nodeEnv === 'testing') {
    return 'testing';
  } else if (nodeEnv === 'stage' || nodeEnv === 'staging') {
    return 'staging';
  } else if (nodeEnv === 'prod' || nodeEnv === 'production') {
    return 'production';
  }
  return environment;
}
export const getEnv = _.memoize(_getEnv);

const isBrowser = new Function(
  'try { return this === window } catch (e) { return false }'
);

const isNode = new Function(
  'try { return this === global } catch (e) { return false }'
);
