<script lang="ts">
	import { marked } from 'marked';
	export let post: any;

	export let currentUserId: string | null;

	const createdAt = post.createdAt;

	const deletePost = () => {
		fetch(`/api/delete-post/?postId=${post.id}`, {
			method: 'POST'
		}).then(() => {
			location.reload();
		});
	};
</script>

<div class="card p-6 flex justify-between items-center">
	<div>
		<p>{post.createdAt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
		<h3 class="h3">{post.title}</h3>
		<p class="text-surface-500">
			by <a class="font-semibold" href={`user/${post.author.username}`}>{post.author.username}</a
			>{post.author.admin ? ' (admin)' : ''}
		</p>
		<p class="post-content">
			{@html marked(post.body)}
		</p>
	</div>
	{#if currentUserId === post.authorId}
		<button on:click={() => deletePost()} class="btn"
			><i class="fa-solid fa-trash text-2xl"></i></button
		>
	{/if}
</div>
