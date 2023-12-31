import { lucia } from 'lucia';
import { web } from 'lucia/middleware';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { client } from '../db/db';

export const auth = lucia({
	env: 'DEV',
	middleware: web(),
	sessionCookie: {
		expires: false
	},
	adapter: libsql(client, {
		user: 'users',
		key: 'keys',
		session: 'sessions'
	}),
	getUserAttributes: (databaseUser) => {
		return {
			username: databaseUser.username,
			email: databaseUser.email
		};
	}
});
