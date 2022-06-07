import { Snowflake as _Snowflake } from '@sapphire/snowflake';
import { Snowflake } from '../types/Snowflake';

const epoch = new Date('2000-01-01T00:00:00.000Z');
const snowflake = new _Snowflake(epoch);

export function generateSnowflake(): Snowflake {
    return snowflake.generate().toString();
}

export function isValidSnowflake(id: string): boolean {
    return id.match(/^[0-9]+$/) != null;
}
