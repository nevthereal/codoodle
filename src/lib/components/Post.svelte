<script lang="ts">
	import { marked } from 'marked';

	interface Post {
		id: number;
		authorId: string;
		title: string;
		body: string;
		createdAt: Date;
		author: {
			id: string;
			username: string;
			admin: boolean | null;
		};
	}

	export let post: Post;
	export let profileLink = true;

	export let currentUserId: string | null;

	const deletePost = async (postId: number) => {
		if (window.confirm('Do you want to delete this post?')) {
			await fetch(`/api/delete/post?postId=${postId}`, { method: 'DELETE' }).then(() => {
				location.reload();
			});
		}
	};
</script>

<div class="card p-6 flex justify-between items-center">
	<div>
		<p class="text-surface-300">
			{post.createdAt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
		</p>
		<h3 class="h3">{post.title}</h3>
		<p class="text-surface-300">
			{#if profileLink}
				by {#if post.author != null}
					<a class="font-semibold" href={`user/${post.author.username}`}>{post.author.username}</a
					>{post.author.admin ? ' (admin)' : ''}
				{:else}
					<span class="italic">Deleted User</span>
				{/if}
			{/if}
		</p>
		<p class="post-content">
			{@html marked(post.body)}
		</p>
	</div>
	{#if currentUserId === post.authorId}
		<button on:click={() => deletePost(post.id)} class="btn"
			><i class="fa-solid fa-trash text-2xl"></i></button
		>
	{/if}
</div>
