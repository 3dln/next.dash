import { IAuthToken } from './token';

export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

export enum Gender {
  Male = 'male',
  Female = 'female',
}
export interface IUserProfile {
  firstName: string;
  lastName: string;
  gender: Gender;
  location: string;
  website: string;
  picture: string;
}
export interface IUserBase {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  facebook: string;
  twitter: string;
  google: string;
  tokens: IAuthToken[];

  profile: IUserProfile;
}

export interface IUser extends IUserBase {
  comparePassword: comparePasswordFunction;
  gravatar?: (size: number) => string;
}
