import 'dotenv/config';
import { StaticConfig } from '../config/StaticConfig';

function setConfig(key: string, value: any) {
	if (!key) throw new Error('UNDEFINED KEY');
	if (!value) throw new Error(key + ' NOT SET');
	StaticConfig.set(key, value);
}

export function loadProdConfig(): void {
	// APP
	setConfig('NODE_ENV', process.env.NODE_ENV);
	setConfig('PORT', process.env.PORT);
	setConfig('SESSION_SECRET', process.env.SESSION_SECRET);

	// MONGODB
	setConfig('MONGODB_HOST', process.env.MONGODB_HOST);
	setConfig('MONGODB_USER', process.env.MONGODB_USER);
	setConfig('MONGODB_PASS', process.env.MONGODB_PASS);
	setConfig('MONGODB_DATABASE', process.env.MONGODB_DATABASE);
}

export function loadEnvConfig(env: string): void {
	loadProdConfig();
}
