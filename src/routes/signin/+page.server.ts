import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth/lucia';

const signUpSchema = z.object({
	username: z.string({ required_error: 'Please enter your username' }).trim().toLowerCase(),
	password: z.string({ required_error: 'Please enter your password' })
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/profile');
	}
	const form = await superValidate(signUpSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signUpSchema);
		if (!form.valid) return fail(400, { form });
		try {
			const key = await auth.useKey('email', form.data.username, form.data.password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
			console.log(session);
		} catch (err) {}
	}
} satisfies Actions;
