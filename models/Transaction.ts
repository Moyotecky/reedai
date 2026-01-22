import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number; // In Major currency unit (e.g., Naira, NOT Kobo) or keep consistent with Paystack (Kobo)
    // Paystack returns amount in Kobo (minor), but we might want to store as Naira (major) or keep as Kobo.
    // Let's store as Kobo (minor) to avoid float issues, consistent with Stripe/Paystack.
    credits: number;
    reference: string;
    status: 'pending' | 'success' | 'failed';
    packId: string;
    metadata: any;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
    },
    packId: {
        type: String,
        required: true,
    },
    metadata: {
        type: Object,
        default: {},
    }
}, {
    timestamps: true,
});

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
