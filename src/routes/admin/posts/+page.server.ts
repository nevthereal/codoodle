import { db } from '$lib/server/db/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) throw redirect(302, '/login');

	const posts = await db.query.postsTable.findMany({
		with: {
			author: true
		}
	});

	return { posts };
};
