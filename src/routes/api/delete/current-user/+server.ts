import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/db';
import { sessionsTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ locals }) => {
	const user = locals.user;

	if (!user) redirect(302, '/signin');

	if (await db.query.usersTable.findFirst({ where: eq(usersTable.id, user.id) })) {
		db.delete(sessionsTable).where(eq(sessionsTable.userId, user.id));
		db.delete(usersTable).where(eq(usersTable.id, user.id));

		return new Response(String('Succesfully deleted user'));
	} else {
		redirect(302, '/account/edit');
	}
};
