// backend/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // ✅ Direct require/import

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, minlength: [2, 'Name must be at least 2 characters long'], maxlength: [50, 'Name cannot exceed 50 characters'] },
    email: { type: String, required: [true, 'Email is required'], unique: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    password: { type: String, required: [true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters long'], select: false },
    phone: { type: String, trim: true },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    addresses: [
      {
        label: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, default: 'US' },
        isDefault: { type: Boolean, default: false },
      },
    ],
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    lastLogin: { type: Date },
    preferences: {
      currency: { type: String, default: 'USD' },
      language: { type: String, default: 'en' },
      newsletter: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ FIXED: Generate password reset token (crypto imported directly)
userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
};

// ✅ FIXED: Generate email verification token (crypto imported directly)
userSchema.methods.generateEmailVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.emailVerificationToken = token;
  return token;
};

// To JSON transform
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    delete ret.emailVerificationToken;
    return ret;
  },
});

const User = mongoose.model('User', userSchema);
export default User;