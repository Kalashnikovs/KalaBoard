import { Schema, model } from 'mongoose';
import { IForum, ForumType } from '../interfaces/Node';

const forumSchema = new Schema<IForum>(
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
            trim: true,
        },
        type: {
            type: Number,
            enum: ForumType,
            required: true,
        },
        threadCount: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export default model<IForum>('Forum', forumSchema);
