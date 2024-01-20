import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Session } from 'lucia';

export const load = (async ({ locals }) => {
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

	const session: Session = await locals.auth.validate();
	return {
		posts,
		session
	};
}) satisfies PageServerLoad;
