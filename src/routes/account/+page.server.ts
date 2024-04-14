import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user; // Validates the session
	if (!user) redirect(302, '/signin');
	const posts = await db.query.postsTable.findMany({
		where: eq(postsTable.authorId, user.id)
	}); // gets all the posts with the id of the user
	const postCount = posts.length;
	return { user, postCount };
};
