import memoize from 'lodash/memoize';

let getEnvironment = null;

class Environment {
  get development() {
    return this.value === 'development';
  }

  get info() {
    return {
      development: this.development,
      production: this.production,
      staging: this.staging,
      testing: this.testing,
      value: this.value
    };
  }

  get production() {
    return this.value === 'production';
  }

  get staging() {
    return this.value === 'staging';
  }

  get testing() {
    return this.value === 'testing';
  }

  get value() {
    if (!getEnvironment) {
      getEnvironment = memoize(require('./getEnvironment').default);
    }
    return getEnvironment();
  }
}

export default new Environment();
