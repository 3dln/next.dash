import crypto from 'crypto';
import { NextApiRequest } from 'next';

//TODO: find a better solution or complete them and add into the interfaces folder
interface IRequest extends NextApiRequest {
  session:ISession
}

interface ISession {
  users: IUser[]
}

interface IUser {
  username:string,
  salt: string,
  hash:string
}
export const getAllUsers = (req:IRequest) => {
  return req.session.users;
};

export const findUserByUsername = (req:IRequest, username: string) => {
  // Here we find the user based on the username or the id
  // const user = await db.findUserById(id)

  return req.session.users.find((user:IUser) => user.username === username);
};

/**
 * compares the password of an already fetched user (using findUserByUsername) and
 * compares the password for a potential match
 * @param user string
 * @param inputPassword string
 * @returns boolean
 */
export const validatePassword = (user:IUser, inputPassword:string) => {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordMatch = user.hash === inputHash;
  return passwordMatch;
};
