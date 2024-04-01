import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		redirect(302, '/signin');
	}

	const posts = await db.query.postsTable.findMany({
		where: eq(postsTable.authorId, user.id),
		with: {
			author: true
		}
	});

	return { posts, user };
};
