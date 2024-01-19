import { db } from '$lib/server/db/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth/lucia';

export const POST: RequestHandler = async ({ locals, url }) => {
	const userId = String(url.searchParams.get('id'));
	auth.invalidateAllUserSessions(userId);
	await db.delete(usersTable).where(eq(usersTable.id, userId));

	return new Response(String('Success'));
};
