import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ url, locals }) => {
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

	const user = locals.user;

	if (!user) redirect(302, '/signin');

	const postId = Number(url.searchParams.get('postId'));
	const post = await db.query.postsTable.findFirst({
		where: eq(postsTable.id, postId)
	});

	if (!post) {
		return new Response('Post not found', { status: 400 });
	} else if (post.authorId === user?.id) {
		await db.delete(postsTable).where(eq(postsTable.id, postId));
	} else if (user.admin) {
		await db.delete(postsTable).where(eq(postsTable.id, postId));
	}
	redirect(302, '/');
};
