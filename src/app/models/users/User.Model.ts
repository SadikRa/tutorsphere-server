import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser, UserModelInterface } from './User.Interface';

// Extend TUser with Mongoose Document to include Mongoose-specific methods
interface IUserDocument extends TUser, Document {
  // eslint-disable-next-line no-unused-vars
  isModified(path?: string): boolean;
}

const userSchema = new Schema<IUserDocument, UserModelInterface>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      select: 0,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUserDocument>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (!user.isModified('password')) return next();

  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  user.password = hashedPassword;
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isUserPasswordMatch = async function (TextPass, hasPass) {
  return await bcrypt.compare(TextPass, hasPass);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const UserModel = model<IUserDocument, UserModelInterface>(
  'User',
  userSchema,
);
