import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { client } from '../db/db';
import { dev } from '$app/environment';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
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

export type Auth = typeof auth;
