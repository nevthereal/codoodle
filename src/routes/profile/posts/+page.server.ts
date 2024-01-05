import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const posts = await db
		.select()
		.from(postsTable)
		.where(eq(postsTable.authorId, session.user.userId))
		.innerJoin(usersTable, eq(postsTable.authorId, usersTable.id));

	return { posts };
};
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('postId');
		await db.delete(postsTable).where(eq(postsTable.id, id));
	}
} satisfies Actions;
