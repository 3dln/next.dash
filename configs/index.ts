import { IConfig } from 'interfaces/app';

const config: IConfig = {
  app: {
    title: '',
    version: 0.1,
  },
  auth: {
    salt_rounds: 10,
  },
  user: {
    gravatar_size: 200,
  },
};

export default config;
