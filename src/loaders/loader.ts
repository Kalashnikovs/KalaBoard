import { loadEnvConfig } from './config';
import { Logger } from '../core/Logger';
import { LoadViewEngineConfig } from './viewengine';

export function startup(env: string) {
	Logger.info(`LOADING ${env} ENVIRONMENT`);
	loadEnvConfig(env);
	LoadViewEngineConfig();
}
