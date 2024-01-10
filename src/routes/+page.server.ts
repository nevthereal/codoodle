import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Session } from 'lucia';

export const load = (async ({ locals }) => {
	const posts = await db
		.select()
		.from(postsTable)
		.orderBy(desc(postsTable.createdAt))
		.innerJoin(usersTable, eq(postsTable.authorId, usersTable.id));

	const session: Session = await locals.auth.validate();
	return {
		posts,
		session
	};
}) satisfies PageServerLoad;
