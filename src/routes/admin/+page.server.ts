import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) redirect(302, '/signin');
	return { session };
};
