import { redirect } from '@sveltejs/kit';

export const DELETE = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;
	if (!session) redirect(302, '/signin');

	return new Response(String('deleted user'));
};
