import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const user = locals.user;
	if (!user || !user?.admin) redirect(302, '/signin');
};
