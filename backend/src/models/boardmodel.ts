import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
});

export const boardModel = mongoose.model('Board', boardSchema);
