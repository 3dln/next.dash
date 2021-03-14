enum DeviceType {
  PWA = 'pwa',
  Desktop = 'desktop',
  Mobile = 'mobile',
}

interface IAppConfig {
  title: string;
  version: number;
}
interface IAuthConfig {
  salt_rounds: number;
}

interface IUserConfig {
  gravatar_size: number;
}

export interface IConfig {
  app: IAppConfig;
  auth: IAuthConfig;
  user: IUserConfig;
}
