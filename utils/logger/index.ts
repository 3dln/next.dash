import config from 'configs';
import { createLogger, LoggerOptions, transports } from 'winston';

const options: LoggerOptions = {
  transports: [
    new transports.Console({ level: process.env.NODE_ENV === 'production' ? 'error' : 'debug' }),
    new transports.File({ filename: config.app.logs_dir + config.app.logs_file, level: 'debug' }),
  ],
};

const logger = createLogger(options);

if (process.env.NODE_ENV === 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
