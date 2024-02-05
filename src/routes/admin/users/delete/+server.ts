import type { RequestHandler } from './$types';
import { auth } from '$lib/server/auth/lucia';

export const POST: RequestHandler = async ({ url }) => {
	const userId = String(url.searchParams.get('id'));
	await auth.deleteUser(userId);

	return new Response(String(`Deleted user with ID ${userId}`));
};
