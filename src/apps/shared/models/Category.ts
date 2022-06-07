import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/Node';

const categorySchema = new Schema<ICategory>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        nodeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export default model<ICategory>('Category', categorySchema);
