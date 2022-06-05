import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import { StaticConfig } from '../config/StaticConfig';

const MongoDBStore = MongoDBSession(session);

export default function () {
	const MONGODB_URI = `mongodb+srv://${StaticConfig.get(
		'MONGODB_USER'
	)}:${StaticConfig.get('MONGODB_PASS')}@${StaticConfig.get('MONGODB_HOST')}/${StaticConfig.get(
		'MONGODB_DATABASE'
	)}`;

	const store = new MongoDBStore({
		uri: MONGODB_URI,
		collection: 'session',
	});

	return session({
		secret: StaticConfig.get('SESSION_SECRET'),
		resave: false,
		saveUninitialized: false,
		store: store,
	});
}
