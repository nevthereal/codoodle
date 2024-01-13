import { auth } from '$lib/server/auth/lucia';
import { redirect } from '@sveltejs/kit';

export const DELETE = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');

	await auth.deleteUser(session.user.userId);
	return new Response(String('Success'));
};
