import { Schema, model } from 'mongoose';
import { IUser, UserModelInterface } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModelInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Hide password by default
    role: {
      type: String,
      enum: ['student', 'tutor', 'admin'],
      required: true,
      default: 'student',
    },
    bio: { type: String },
    subjects: [{ type: String }],
    availability: [{ type: Date }],
    ratings: [{ type: Number }],
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

// Check if user exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password');
};

// Check if password matches
userSchema.statics.isUserPasswordMatch = async function (plainTextPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<IUser, UserModelInterface>('User', userSchema);