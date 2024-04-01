import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const posts = await db.query.postsTable.findMany({
		with: {
			author: {
				columns: {
					username: true,
					id: true,
					admin: true
				}
			}
		},
		orderBy: [desc(postsTable.createdAt)]
	});

	const user = locals.user;
	return { posts, user };
};
