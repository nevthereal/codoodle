import { db } from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) throw redirect(302, '/signin');

	const userId = url.pathname.split('/admin/users/')[1];
	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.id, userId),
		with: {
			posts: {
				with: {
					author: true
				}
			}
		}
	});

	if (!user) throw redirect(302, '/admin/users');

	return { user };
};
