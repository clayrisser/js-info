import memoize from 'lodash/memoize';

let getEnvironment = null;

class Environment {
  default = 'development';

  get dev() {
    return this.development;
  }

  get development() {
    return this.value === 'development';
  }

  get info() {
    return {
      dev: this.dev,
      development: this.development,
      prod: this.prod,
      production: this.production,
      stage: this.stage,
      staging: this.staging,
      test: this.test,
      testing: this.testing,
      value: this.value
    };
  }

  get prod() {
    return this.production;
  }

  get production() {
    return this.value === 'production';
  }

  get stage() {
    return this.staging;
  }

  get staging() {
    return this.value === 'staging';
  }

  get test() {
    return this.testing;
  }

  get testing() {
    return this.value === 'testing';
  }

  get value() {
    if (!getEnvironment) {
      getEnvironment = memoize(require('./getEnvironment').default);
    }
    return getEnvironment(this.default);
  }
}

export default new Environment();
