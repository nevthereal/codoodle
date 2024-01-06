import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate(); // Validates the session
	if (!session) throw redirect(302, '/signin');
	const postCount = await db.query.usersTable.findMany({
		where: eq(usersTable.id, session.user.userId),
		with: {
			posts: true
		}
	}); // gets all the posts with the id of the user
	return { session, postCount };
};
