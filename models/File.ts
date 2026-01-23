import mongoose, { Schema, model, models } from 'mongoose';

const FileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String, // 'pdf', 'doc', 'image', etc.
        required: true,
    },
    size: {
        type: Number, // in bytes
        required: true,
    },
    publicId: {
        type: String, // Cloudinary ID
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const File = models.File || model('File', FileSchema);

export default File;
