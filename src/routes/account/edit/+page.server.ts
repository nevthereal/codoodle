import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';
import type { Session } from 'lucia';
import { auth } from '$lib/server/auth/lucia';

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
	const session = await locals.auth.validate(); // Validates the session
	if (!session) redirect(302, '/signin');
	const form = await superValidate(username);
	return { session, form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const session: Session = await locals.auth.validate();
		if (!session) redirect(302, '/signin');

		const form = await superValidate(request, username);
		if (!form.valid) return fail(400, { form });

		if (
			await db.query.usersTable.findFirst({
				where: eq(usersTable.username, form.data.username)
			})
		) {
			return setError(form, 'username', 'Username is already exists');
		}

		await auth.updateUserAttributes(session.user.userId, {
			username: form.data.username
		});
		redirect(302, '/account');
	}
} satisfies Actions;
