import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Gender, IUser, IUserBase } from 'interfaces/auth/user';
import { Document, Schema } from 'mongoose';

// A type which extends the mongoose's Document type and responsible for connect the model and the interface
export type UserDocument = Document & IUser;

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

const userSchema = new Schema<UserDocument>(UserSchemaFields, { timestamps: true });

/**
 * Password hash middleware
 */
userSchema.pre('save', function save(next) {
  const user = this as UserDocument;

  // make sure the password field of user model is modified
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt();
});
