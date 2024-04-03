import { db } from '$lib/server/db/db.js';
import { sessionsTable, usersTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals, url }) => {
	const userId = url.searchParams.get('id');
	const user = locals.user;
	if (!user || !user.admin) redirect(302, '/signin');

	if (!userId) redirect(302, '/admin/users');

	if (
		// Checking if user exists
		await db.query.usersTable.findFirst({
			where: eq(usersTable.id, userId)
		})
	) {
		// Delete all sessions
		await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId));

		// Delete user
		await db.delete(usersTable).where(eq(usersTable.id, userId));
		redirect(302, '/admin/users');
	} else {
		redirect(302, '/admin/users');
	}
};
