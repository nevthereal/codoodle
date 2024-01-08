import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth/lucia';
import { LuciaError } from 'lucia';

const signInSchema = z.object({
	username: z.string().min(1, 'Username is required').trim().toLowerCase(),
	password: z.string().min(1, 'Password is required')
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/profile');
	}
	const form = await superValidate(signInSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signInSchema);
		if (!form.valid) return fail(400, { form });
		try {
			const key = await auth.useKey('username', form.data.username, form.data.password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (err) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || 'AUTH_INVALID_PASSWORD')
			) {
				// username or password is wrong
				return setError(form, 'password', 'Email or password is incorrect');
			}
		}
	}
} satisfies Actions;
