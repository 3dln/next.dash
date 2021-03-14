import bcrypt from 'bcrypt';
import config from 'configs';
import crypto from 'crypto';
import { Gender, IUser, IUserBase, comparePasswordFunction } from 'interfaces/auth/user';
import mongoose from 'mongoose';

// A type which extends the mongoose's Document type and responsible for connect the model and the interface
export type UserDocument = mongoose.Document & IUser;

const UserSchemaFields: Record<keyof IUserBase, any> = {
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,

  tokens: Array,

  profile: {
    firstName: String,
    lastName: String,
    gender: [Gender.Male, Gender.Female],
    location: String,
    website: String,
    picture: String,
  },
};

const userSchema = new mongoose.Schema<UserDocument>(UserSchemaFields, { timestamps: true });

/**
 * Password hash middleware
 */
userSchema.pre('save', function save(next) {
  const user = this as UserDocument;

  // make sure the password field of user model is modified
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(config.auth.salt_rounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (this: any, candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.username, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * A helper method to grab user's gravatar
 */
userSchema.methods.gravatar = function (size: number = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model<UserDocument>('User', userSchema);

export { User };
