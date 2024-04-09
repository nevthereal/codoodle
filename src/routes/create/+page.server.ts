import { redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { z } from 'zod';
import { setMessage, superValidate } from 'sveltekit-superforms';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { zod } from 'sveltekit-superforms/adapters';
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

	const form = await superValidate(zod(postSchema));

	return { form };
};

const limiter = new RateLimiter({
	IP: [5, 'h'], // IP address limiter
	IPUA: [2, 'm'] // IP + User Agent limiter
});

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(postSchema));
		if (await limiter.isLimited(event)) {
			return setMessage(form, 'You created too many posts. Please try again later', {
				status: 429
			});
		}
		if (!form.valid) return fail(400, { form });
		const user = event.locals.user;
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
