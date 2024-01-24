import { auth } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db/db';
import { asc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { sessionsTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) redirect(302, '/login');
	const qSessions = await db.query.sessionsTable.findMany({
		with: {
			user: true
		},
		orderBy: [asc(sessionsTable.userId)]
	});

	const sessions = [];

	for (const session of qSessions) {
		sessions.push(await auth.getSession(session.id));
	}

	return { sessions };
};
