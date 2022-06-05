import { ThrowExtendedError } from '../../shared/helpers/error';
import { ILoginWithEmailPass } from '..//interfaces/Auth';
import { IUser } from '../../shared/interfaces/User';
import User from '../../shared/models/User';
import bcrypt from 'bcryptjs';

export class AuthService {
    static async register(user: IUser) {
        const findUser = await User.findOne({
            $or: [{ email: user.email }, { username: user.username }],
        });
        if (findUser)
            ThrowExtendedError('Username or Email Already Exists', 422);
        user.password = await bcrypt.hash(user.password, 12);
        return await User.create(user);
    }

    static async login(user: ILoginWithEmailPass) {
        const findUser = await User.findOne({
            email: user.email,
        });
        if (!findUser) ThrowExtendedError('User Not Found!', 404);

        const verifyPassword = await bcrypt.compare(
            user.password,
            findUser.password
        );
        if (!verifyPassword) ThrowExtendedError('Invalid Password', 401);

        return findUser;
    }
}
