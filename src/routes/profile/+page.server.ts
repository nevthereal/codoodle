import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signup');
	const postCount = await db.query.usersTable.findMany({
		where: eq(usersTable.id, session.user.userId),
		with: {
			posts: true
		}
	});
	return { session, postCount };
};
