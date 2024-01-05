import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const posts = await db
		.select()
		.from(postsTable)
		.orderBy(desc(postsTable.createdAt))
		.innerJoin(usersTable, eq(postsTable.authorId, usersTable.id));
	return {
		posts
	};
}) satisfies PageServerLoad;
