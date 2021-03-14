import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {});
