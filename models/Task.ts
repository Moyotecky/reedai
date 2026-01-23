import mongoose, { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['suggested', 'in_progress', 'completed'],
        default: 'suggested',
    },
    actionLabel: {
        type: String,
        default: 'Start',
    },
    actionUrl: {
        type: String,
        default: '/dashboard/tutor',
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

const Task = models.Task || model('Task', TaskSchema);

export default Task;
