import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { adapter } from '../db/db';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attr) => {
		return {
			githubId: attr.github_id,
			username: attr.username,
			admin: attr.admin
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: number;
	username: string;
	admin: boolean;
}
