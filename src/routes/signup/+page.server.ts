import { auth } from '$lib/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData());
		const schema = z
			.object({
				username: z.string().min(3, { message: 'Username must be 3 characters long' }),
				email: z.string().email('Invalid email adress'),
				password: z.string().min(8, { message: 'Password must be 8 characters long' }),
				confirmPassword: z.string()
			})
			.refine((data) => data.password === data.confirmPassword, {
				path: ['confirmPassword'],
				message: "Passwords don't match"
			});

		const res = await schema.safeParseAsync(data);

		if (!res.success) {
			const errors = res.error.errors.map((e) => {
				return {
					path: e.path,
					message: e.message
				};
			});
			return fail(400, { error: true, errors });
		}

		if (res.success) {
			try {
				const user = await auth.createUser({
					key: {
						providerId: 'email',
						providerUserId: res.data.password,
						password: res.data.password
					},
					attributes: {
						username: res.data.username.toLowerCase(),
						email: res.data.email
					}
				});

				const session = await auth.createSession({
					userId: user.userId,
					attributes: {}
				});

				locals.auth.setSession(session);
				throw redirect(301, '/profile');
			} catch (err) {
				console.log(err);
			}
		}
	}
};

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/profile');
	}
	return;
};
