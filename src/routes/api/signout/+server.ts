import { lucia } from '$lib/server/auth/lucia';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals, cookies }) => {
	if (!locals.session) {
		redirect(302, '/signin');
	}
	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	redirect(302, '/signin');
};
