import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth/lucia';
import type { Session } from 'lucia';
import { SQLiteTimestampBuilder } from 'drizzle-orm/sqlite-core';

const postSchema = z.object({
	title: z.string().min(3, 'Please provide a meaningful title'),
	body: z.string().min(5, 'Write some more...')
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(302, '/signin');
	}

	const form = await superValidate(postSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, postSchema);
		if (!form.valid) return fail(400, { form });
		console.log(form);
		try {
			const session: Session = await locals.auth.validate();

			const date = new Date();

			await db.insert(postsTable).values({
				title: form.data.title,
				body: form.data.body,
				createdAt: date.toISOString(),
				authorId: session.user.userId
			});
		} catch (err) {
			console.log(err);
		}
	}
} satisfies Actions;
