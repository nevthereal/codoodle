import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';

const username = z.object({
	username: z
		.string({ required_error: 'Username is Required' })
		.trim()
		.toLowerCase()
		.min(3, { message: 'Your username has to be 3 characters long' })
		.max(32, { message: 'Your username is too long' })
		.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
			message: 'Username can only contain letters, numbers or an underscore'
		})
});

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user; // Validates the session
	if (!user) redirect(302, '/signin');
	const form = await superValidate(zod(username));
	return { user, form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.session;
		if (!session) redirect(302, '/signin');

		const form = await superValidate(request, zod(username));
		if (!form.valid) return fail(400, { form });

		if (
			await db.query.usersTable.findFirst({
				where: eq(usersTable.username, form.data.username)
			})
		) {
			return setError(form, 'username', 'Username is already exists');
		}

		await db
			.update(usersTable)
			.set({ username: form.data.username })
			.where(eq(usersTable.id, session.userId));
		redirect(302, '/account');
	}
} satisfies Actions;
