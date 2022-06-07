import session from 'express-session';
import { IUser } from '../interfaces/User';
import { Snowflake } from './Snowflake';

declare module 'express-session' {
    export interface SessionData {
        user: IUser;
        userId: Snowflake;
        isAuthenticated: boolean;
    }
}
