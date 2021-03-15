import { IConfig } from 'interfaces/app';
import logger from 'utils/logger';

//TODO: find a way to load configs at startup
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // anything else would be treated as 'dev'

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];

if (!SESSION_SECRET) {
  logger.error('No client secret. set SESSION_SECRET environment variable');
  process.exit(1);
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable');
  } else {
    logger.error('No mongo connection string, set MONGODB_URI_LOCAL environment variable');
  }

  process.exit(1);
}

const config: IConfig = {
  app: {
    title: '',
    version: 0.1,
    logs_dir: 'logs',
    logs_file: 'debug.log',
  },
  auth: {
    salt_rounds: 10,
    facebook: {
      callback_url: '/auth/facebook/callback',
      profile_fields: ['name', 'email', 'link', 'locale', 'timezone'],
      pass_req_to_callback: true,
    },
  },
  user: {
    gravatar_size: 200,
  },
};

export default config;
