import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ url }) => {
	// URL {
	// 	href: 'http://localhost:5173/delete?2',
	// 	origin: 'http://localhost:5173',
	// 	protocol: 'http:',
	// 	username: '',
	// 	password: '',
	// 	host: 'localhost:5173',
	// 	hostname: 'localhost',
	// 	port: '5173',
	// 	pathname: '/delete',
	// 	search: '?2',
	// 	searchParams: URLSearchParams { '2' => '' },
	// 	hash: ''
	//   }

	const postId = Number(url.searchParams.get('postId'));
	await db.delete(postsTable).where(eq(postsTable.id, postId));
	return new Response(String('Success'));
};
