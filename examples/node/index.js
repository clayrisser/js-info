import { Logger, transports } from 'winston';
import jsInfo from '../../src';

const log = new Logger({
  level: 'info',
  transports: [
    new transports.Console({
      prettyPrint: true,
      colorize: true,
      showLevel: false
    })
  ]
});

log.info(jsInfo.info);
