import { db } from '$lib/server/db/db.js';
import { postsTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { desc } from 'drizzle-orm';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) redirect(302, '/login');

	const posts = await db.query.postsTable.findMany({
		with: {
			author: {
				columns: {
					id: true,
					username: true
				}
			}
		},
		orderBy: [desc(postsTable.createdAt)]
	});

	return { posts };
};
