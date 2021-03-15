import { IConfig } from 'interfaces/app';
import logger from 'utils/logger';

export const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  logger.error('No client secret. set SESSION_SECRET environment variable');
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
