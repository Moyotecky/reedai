import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name?: string;
    displayName?: string;
    username?: string;
    isVerified: boolean;
    verificationCode?: string;
    verificationExpires?: Date;
    avatar?: string;
    credits: number;
    preferences: {
        tutorStyle: string;
        voiceSpeed: string;
        readCalmly: boolean;
    };
    role: 'student' | 'tutor' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false, // Don't return password by default
    },
    name: {
        type: String,
        trim: true,
    },
    displayName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true, // Allow multiple nulls/undefined until set
        trim: true,
        lowercase: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        select: false,
    },
    verificationExpires: {
        type: Date,
        select: false,
    },
    avatar: {
        type: String,
        default: '',
    },
    credits: {
        type: Number,
        default: 20, // 20 free credits for everyone on signup
    },
    preferences: {
        tutorStyle: { type: String, default: 'exam' },
        voiceSpeed: { type: String, default: 'normal' },
        readCalmly: { type: Boolean, default: true },
    },
    role: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        default: 'student',
    },
}, {
    timestamps: true,
});

// Helper to check if model already exists (for hot reloading)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
