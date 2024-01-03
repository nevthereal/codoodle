import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '$lib/server/db/schema';

const signUpSchema = z.object({
	email: z.string({ required_error: 'Email is Required' }).email().trim().toLowerCase(),
	username: z
		.string({ required_error: 'Username is Required' })
		.trim()
		.toLowerCase()
		.min(3, { message: 'Your username has to be 3 characters long' })
		.max(32, { message: 'Your username is too long' }),
	password: z
		.string({ required_error: 'Password is Required' })
		.regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
			message:
				'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
		}),
	confirmPassword: z.string({ required_error: 'Confirm Password is required' })
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(signUpSchema);

	return { form };
};

export const actions = {
	default: async ({ request }) => {
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
			return setError(form, 'email', 'Email is also registered');
		}

		return { form };
	}
} satisfies Actions;
