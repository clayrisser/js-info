import get from 'lodash/get';
import includes from 'lodash/includes';

const env = process ? process.env || {} : {};
const argv = process ? process.argv || {} : {};

export default function getEnvironment(environment = 'development') {
  const nodeEnv = (env.NODE_ENV || '').toLowerCase();
  if (includes(argv, '--test') || includes(argv, '--testing')) {
    environment = 'testing';
  } else if (includes(argv, '--stage') || includes(argv, '--staging')) {
    environment = 'staging';
  } else if (includes(argv, '--prod') || includes(argv, '--production')) {
    environment = 'production';
  } else if (includes(argv, '--dev') || includes(argv, '--development')) {
    environment = 'development';
  } else if (nodeEnv === 'test' || nodeEnv === 'testing') {
    environment = 'testing';
  } else if (nodeEnv === 'stage' || nodeEnv === 'staging') {
    environment = 'staging';
  } else if (nodeEnv === 'prod' || nodeEnv === 'production') {
    environment = 'production';
  } else if (nodeEnv === 'dev' || nodeEnv === 'development') {
    environment = 'development';
  } else if (get(env, '__DEV__', '').toLowerCase() === 'false') {
    environment = 'production';
  }
  return environment;
}
