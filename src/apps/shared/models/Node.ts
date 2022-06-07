import { Schema, model } from 'mongoose';
import { INode, NodeType } from '../interfaces/Node';

const nodeSchema = new Schema<INode>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: Number,
            enum: NodeType,
            required: true,
        },
        parentId: {
            type: String,
            required: true,
            trim: true,
        },
        displayOrder: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export default model<INode>('Node', nodeSchema);
