import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByUsername, validatePassword } from 'utils/db/helpers';

//TODO: fix this temporary solution
interface IUser extends Express.User {
  username: string;
}

passport.serializeUser(function (user: IUser, done) {
  // serializes the user into session
  done(null, user.username);
});

// passport.deserializeUser(function (req, id, done) {});
