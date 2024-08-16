import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the User interface that extends Mongoose's Document interface
export interface User extends Document {
    _id: Types.ObjectId;
    username: string;
    password: string;
    organizationId: Types.ObjectId;
    email: string;
    // You can add more fields as needed
}

// Create the User schema
const userSchema: Schema<User> = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
    email: { type: String, required: true },
    // You can add more fields as needed
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Create and export the User model
export const userModel = mongoose.model<User>('User', userSchema);
