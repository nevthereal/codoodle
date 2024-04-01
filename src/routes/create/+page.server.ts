import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';

const postSchema = z.object({
	title: z.string().min(3, 'Please provide a meaningful title'),
	body: z.string().min(5, 'Write some more...')
});

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) {
		redirect(302, '/signin');
	}

	const form = await superValidate(postSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, postSchema);
		if (!form.valid) return fail(400, { form });
		const user = locals.user;
		if (!user) redirect(302, '/login');

		await db.insert(postsTable).values({
			title: form.data.title,
			body: form.data.body,
			authorId: user.id,
			createdAt: new Date()
		});
		redirect(302, '/');
	}
} satisfies Actions;
