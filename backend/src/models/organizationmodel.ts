import mongoose, { Schema, Document, Types } from 'mongoose';

interface Organization extends Document {
    _id: Types.ObjectId;
    name: string;
    owner: Types.ObjectId;
}

const organizationSchema = new Schema<Organization>({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const organizationModel = mongoose.model<Organization>('Organization', organizationSchema);
