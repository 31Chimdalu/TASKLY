import mongoose, { Schema, Document, Types } from 'mongoose';

interface Comment {
    userId: Types.ObjectId;
    text: string;
    createdAt: Date;
}

interface Task extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    labels: string[];
    status: 'todo' | 'in-progress' | 'done';
    startDate?: Date;
    dueDate?: Date;
    assignee?: Types.ObjectId;
    attachments: string[];
    comments: Comment[];
    boardId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<Comment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const taskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    labels: [{ type: String }],
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    startDate: { type: Date },
    dueDate: { type: Date },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    attachments: [{ type: String }],
    comments: [commentSchema],
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
}, { timestamps: true });

export const taskModel = mongoose.model<Task>('Task', taskSchema);
