import mongoose, { Schema, model, models } from 'mongoose';

const NotebookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        default: 'General'
    },
    content: {
        type: String, // Or structured data
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Notebook = models.Notebook || model('Notebook', NotebookSchema);

export default Notebook;
