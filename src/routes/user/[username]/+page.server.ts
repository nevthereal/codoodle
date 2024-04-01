import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = locals.session;

	const usernameFromURL = url.href.split('/user/'); // returns an array, we want user[1]

	const username = usernameFromURL[1];

	const user = await db.query.usersTable.findFirst({
		where: eq(usersTable.username, username),
		with: {
			posts: {
				with: {
					author: {
						columns: {
							username: true,
							admin: true
						}
					}
				},
				orderBy: [desc(postsTable.createdAt)]
			}
		},
		columns: {
			username: true,
			admin: true,
			id: true
		}
	});
	if (!user) error(404, 'User not found');
	return { user, session };
};
