import { lucia } from 'lucia';
import { client } from '../db/db';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { dev } from '$app/environment';
import { sveltekit } from 'lucia/middleware';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: libsql(client, {
		user: 'users',
		key: 'keys',
		session: 'sessions'
	}),
	getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email,
			admin: data.admin
		};
	}
});

export type Auth = typeof auth;
