import bcrypt from 'bcryptjs';
import mongoose, { type Model } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'viewer';
  isActive: boolean;
  lastLogin?: Date;
}

interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<User, Record<string, never>, UserMethods>;

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['admin', 'manager', 'viewer'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default (mongoose.models.User as UserModel | undefined) ??
  mongoose.model<User, UserModel>('User', userSchema);
