import passport from 'passport';
import passportLocal from 'passport-local';
// import passportFacebook from 'passport-facebook';
import { User, UserDocument } from 'models/User';
import { NativeError } from 'mongoose';
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ExtendedNextApiRequest } from 'interfaces/auth/api';
import _ from 'lodash';

const LocalStrategy = passportLocal.Strategy;
// const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error: NativeError, user: UserDocument) => {
    done(error, user.id);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: 'Invalid email or password.' });
      });
    });
  })
);

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */

/**
 * Login Required middleware.
 */
// export const isAuthenticated = (req: ExtendedNextApiRequest, res: NextApiResponse, next: nextha) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };

/**
 * Authorization Required middleware.
 */
// export const isAuthorized = (req: ExtendedNextApiRequest, res: NextApiResponse, next: NextApiHandler) => {
//   const provider = req.path.split('/').slice(-1)[0];

//   const user = req.user as UserDocument;
//   if (_.find(user.tokens, { kind: provider })) {
//     next();
//   } else {
//     res.redirect(`/auth/${provider}`);
//   }
// };
