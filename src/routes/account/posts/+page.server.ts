import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const posts = await db.query.postsTable.findMany({
		where: eq(postsTable.authorId, session.user.userId),
		with: {
			author: true
		}
	});

	return { posts, session };
};
