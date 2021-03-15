import crypto from 'crypto';
import { NextApiRequest } from 'next';

//TODO: find a better solution or complete them and add into the interfaces folder
interface IRequest extends NextApiRequest {
  session: ISession;
}

interface ISession {
  users: IUser[];
}

interface IUser {
  username: string;
  salt: string;
  hash: string;
}
export const getAllUsers = (req: IRequest): IUser[] => {
  return req.session.users;
};

export const findUserByUsername = (req: IRequest, username: string): IUser | undefined => {
  // Here we find the user based on the username or the id
  // const user = await db.findUserById(id)

  return req.session.users.find((user: IUser) => user.username === username);
};

/**
 * @name validatePassword
 * @description compares the password of an already fetched user (using findUserByUsername) and compares the password for a potential match
 * @author Ashkan Ashtiani
 * @memberof module:utils
 * @param {IUser} user the claimed to be user
 * @param {string} inputPassword provided password
 * @returns {boolean} password was a match or not
 * @requires crypto
 */
export const validatePassword = (user: IUser, inputPassword: string): boolean => {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordMatch = user.hash === inputHash;
  return passwordMatch;
};
