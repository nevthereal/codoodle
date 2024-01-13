import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const posts = await db.query.usersTable.findMany({
		where: eq(postsTable.authorId, session.user.userId),
		with: {
			posts: true
		}
	});

	return { posts, session };
};
