import { db } from '$lib/server/db/db';
import { postsTable, usersTable } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import type { Session } from 'lucia';
import { fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const posts = await db.query.postsTable.findMany({
		with: {
			author: {
				columns: {
					username: true,
					id: true,
					admin: true
				}
			}
		}
	});

	const session: Session = await locals.auth.validate();
	return {
		posts,
		session
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('postId')!.toString();
		const convId = Number(id);
		await db.delete(postsTable).where(eq(postsTable.id, convId));
	}
} satisfies Actions;
