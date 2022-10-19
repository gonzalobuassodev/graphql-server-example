import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface InterfaceUser {
  id: string;
  username: string;
  password: string;
  name: string;
}

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    const document = this;
    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) return next(err);
      document.password = hash;
      next();
    });
  }
});

export const UserModel = mongoose.model('User', userSchema);
