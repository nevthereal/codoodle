import { db } from '$lib/db/db';
import { postsTable } from '$lib/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await db.select().from(postsTable).orderBy(desc(postsTable.createdAt));
	return {
		posts
	};
}) satisfies PageServerLoad;
