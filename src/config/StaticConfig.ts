import 'dotenv/config';

export class StaticConfig {
	private static settings: Map<string, string> = new Map();

	static {
		this.settings.set('NODE_ENV', process.env.NODE_ENV || '');
	}

	static set(key: string, value: string): void {
		this.settings.set(key, value);
	}

	static unset(key: string): void {
		this.settings.delete(key);
	}

	static get(key: string): string {
		const val = this.settings.get(key);
		if(!val)
			throw new Error('StaticConfig: ' + key + ' NOT FOUND');
		return val;
	}

	static reloadFromObject(obj: object) {
		this.settings = new Map(Object.entries(obj));
	}
}
