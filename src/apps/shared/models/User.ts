import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema = new Schema<IUser>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IUser>('User', userSchema);
