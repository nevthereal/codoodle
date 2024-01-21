import { auth } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db/db';
import type { Session } from 'lucia';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session.user.admin) throw redirect(302, '/login');
	const qSessions = await db.query.sessionsTable.findMany({
		with: {
			user: true
		}
	});

	let sessions: {
		user: {
			username: string;
			email: string;
			admin: number;
			userId: string;
		};
		sessionId: string;
		activePeriodExpiresAt: Date;
		idlePeriodExpiresAt: Date;
		state: 'active' | 'idle';
		fresh: boolean;
	}[] = [];

	for (let session of qSessions) {
		sessions.push(await auth.getSession(session.id));
	}

	return { sessions };
};
