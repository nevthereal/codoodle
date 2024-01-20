import { db } from '$lib/server/db/db';
import { desc, eq } from 'drizzle-orm';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const userId = url.pathname.split('/admin/users/')[1];
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId),
		with: {
			posts: {
				orderBy: [desc(postsTable.createdAt)]
			}
		}
	});

	if (!user) throw redirect(302, '/admin/users');

	return { user };
};
