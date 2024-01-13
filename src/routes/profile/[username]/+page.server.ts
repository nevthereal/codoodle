import { page } from '$app/stores';
import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const usernameFromURL = url.href.split('/profile/'); // returns an array, we want user[1]

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
				orderBy: (postsTable, { desc }) => [desc(postsTable.createdAt)]
			}
		},
		columns: {
			username: true,
			admin: true,
			id: true
		}
	});
	if (!user) throw error(404, 'User not found');
	return { user };
};
