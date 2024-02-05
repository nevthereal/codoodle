import { db } from '$lib/server/db/db';
import { postsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ url }) => {
	const postId = Number(url.searchParams.get('id'));

	await db.delete(postsTable).where(eq(postsTable.id, postId));

	return new Response(String(`Deleted post with ID ${postId}`));
};
