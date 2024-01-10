<script lang="ts">
	import { marked } from 'marked';
	export let post: {
		posts: {
			id: number;
			authorId: string;
			title: string;
			body: string;
			createdAt: Date;
		};
		users: {
			id: string;
			username: string;
			email: string;
			admin: boolean | null;
		};
	};

	export let currentUserId: string | null;

	const createdAt = post.posts.createdAt;
	const fullDate = `${createdAt.getDate()}.${
		createdAt.getMonth() + 1
	}.${createdAt.getFullYear()}, ${createdAt.getHours()}:${createdAt.getMinutes()}`;
</script>

<div class="card p-6 flex justify-between items-center">
	<div>
		<p>{fullDate}</p>
		<h3 class="h3">{post.posts.title}</h3>
		<p>{post.users.username}</p>
		<p>{@html marked(post.posts.body)}</p>
	</div>
	{#if currentUserId && currentUserId === post.posts.authorId}
		<form method="POST">
			<button name="postId" value={post.posts.id} class="btn"
				><i class="fa-solid fa-trash text-2xl"></i></button
			>
		</form>
	{/if}
</div>
