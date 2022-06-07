import Admin from '../../shared/models/Admin';
import { Snowflake } from '../../shared/types/Snowflake';

export class AdminService {
    static async isAdmin(userId: Snowflake): Promise<boolean> {
        return (await Admin.findOne({ userId })) ? true : false;
    }
}
