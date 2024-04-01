import { db } from '$lib/server/db/db';
import { desc, eq } from 'drizzle-orm';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const user = locals.user;
	if (!user || !user?.admin) redirect(302, '/signin');
	const userId = url.pathname.split('/admin/users/')[1];
	const qUser = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId)
	});

	const usersPosts = await db.query.postsTable.findMany({
		where: eq(postsTable.authorId, userId),
		orderBy: [desc(postsTable.createdAt)]
	});

	if (!qUser) redirect(302, '/admin/users');

	return { qUser, usersPosts };
};
