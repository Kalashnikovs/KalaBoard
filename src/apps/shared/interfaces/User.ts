import { Snowflake } from '../types/Snowflake';

export interface IUser {
    id: Snowflake;
    email: string;
    username: string;
    password: string;
}

export interface IAdmin {
    id: Snowflake;
    userId: Snowflake;
    superuser: boolean;
}
