enum DeviceType {
  PWA = 'pwa',
  Desktop = 'desktop',
  Mobile = 'mobile',
}

interface IAppConfig {
  title: string;
  version: number;
  logs_dir: string;
  logs_file: string;
}

interface IFacebookConfig {
  callback_url: string;
  profile_fields: string[];
  pass_req_to_callback: boolean;
}
interface IAuthConfig {
  salt_rounds: number;
  facebook: IFacebookConfig;
}

interface IUserConfig {
  gravatar_size: number;
}

export interface IConfig {
  app: IAppConfig;
  auth: IAuthConfig;
  user: IUserConfig;
}
