import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user; // Validates the session
	if (!user) redirect(302, '/signin');
	const postCount = await db.query.usersTable.findMany({
		where: eq(usersTable.id, user.id),
		with: {
			posts: true
		}
	}); // gets all the posts with the id of the user
	return { user, postCount };
};
