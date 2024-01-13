import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';
import { auth } from '$lib/server/auth/lucia';

const signUpSchema = z.object({
	email: z.string({ required_error: 'Email is Required' }).email().trim().toLowerCase(),
	username: z
		.string({ required_error: 'Username is Required' })
		.trim()
		.toLowerCase()
		.min(3, { message: 'Your username has to be 3 characters long' })
		.max(32, { message: 'Your username is too long' })
		.regex(new RegExp('^[a-zA-Z0-9_]*$'), {
			message: 'Username can only contain letters, numbers or an underscore'
		}),
	password: z
		.string({ required_error: 'Password is Required' })
		.regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
			message:
				'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
		}),
	confirmPassword: z.string({ required_error: 'Confirm Password is required' })
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/account');
	}
	const form = await superValidate(signUpSchema);

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signUpSchema);
		if (!form.valid) return fail(400, { form });

		if (form.data.password != form.data.confirmPassword) {
			return setError(form, 'confirmPassword', "Passwords don't match");
		}

		if (
			await db.query.usersTable.findFirst({
				where: eq(usersTable.username, form.data.username)
			})
		) {
			return setError(form, 'username', 'Username is already exists');
		}
		if (
			await db.query.usersTable.findFirst({
				where: eq(usersTable.email, form.data.email)
			})
		) {
			return setError(form, 'email', 'Email is already registered');
		}
		const user = await auth.createUser({
			key: {
				providerId: 'username',
				providerUserId: form.data.username,
				password: form.data.password
			},
			attributes: {
				username: form.data.username,
				email: form.data.email,
				admin: false
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);

		return { form };
	}
} satisfies Actions;
