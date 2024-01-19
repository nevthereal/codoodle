import { db } from '$lib/server/db/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) throw redirect(302, '/signin');

	const users = await db.query.usersTable.findMany({});
	return { users };
};
