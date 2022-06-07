import { Schema, model } from 'mongoose';
import { IAdmin } from '../interfaces/User';

const adminSchema = new Schema<IAdmin>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        superuser: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<IAdmin>('Admin', adminSchema);
