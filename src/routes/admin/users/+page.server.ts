import { db } from '$lib/server/db/db';
import { usersTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { asc } from 'drizzle-orm';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) redirect(302, '/signin');

	const users = await db.query.usersTable.findMany({
		with: {
			posts: true
		},
		orderBy: [asc(usersTable.username)]
	});
	return { users, session };
};
