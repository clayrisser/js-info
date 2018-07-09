import memoize from 'lodash/memoize';
import browser from './browser';
import browserEngine from './browserEngine';
import environment from './environment';
import javascriptEngine from './javascriptEngine';
import os from './os';
import runtime from './runtime';

const engine = javascriptEngine;
const memoized = {
  isMobile: null
};

function isMobile() {
  if (!memoized.isMobile)
    memoized.isMobile = memoize(require('./isMobile').default);
  return memoized.isMobile();
}

function getInfo() {
  return {
    browser: browser.info,
    browserEngine: browserEngine.info,
    engine: engine.info,
    environment: environment.info,
    javascriptEngine: javascriptEngine.info,
    mobile: isMobile(),
    os: os.info,
    runtime: runtime.info
  };
}

export {
  browser,
  browserEngine,
  engine,
  environment,
  getInfo,
  javascriptEngine,
  isMobile,
  os,
  runtime
};
export default {
  get info() {
    return getInfo();
  },
  get mobile() {
    return isMobile();
  },
  browser,
  browserEngine,
  engine,
  environment,
  getInfo,
  javascriptEngine,
  isMobile,
  os,
  runtime
};
