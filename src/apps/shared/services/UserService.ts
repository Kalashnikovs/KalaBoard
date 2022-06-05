import { ModelService } from './ModelService';
import { IUser } from '../interfaces/User';
import User from '../models/User';
import { ThrowExtendedError } from '../helpers/error';
import bcrypt from 'bcryptjs';

export class UserService {
	private modelService: ModelService<IUser> = new ModelService(User);
}
