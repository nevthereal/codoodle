<script lang="ts">
	import { marked } from 'marked';

	export let data;

	const posts = data.posts;

	const deletePost = async (postId: number) => {
		if (window.confirm('Do you want to delete this post?')) {
			await fetch(`/api/delete/post?postId=${postId}`, { method: 'DELETE' }).then(() => {
				location.reload();
			});
		}
	};
</script>

<div>
	<h1 class="h1 mb-4">Posts</h1>
	<div class="table-container">
		<table class="table">
			<thead>
				<tr>
					<th>Post Id</th>
					<th>Author</th>
					<th>Title</th>
					<th>Body</th>
					<th>Created At</th>
					<th>Delete Post</th>
				</tr>
			</thead>
			<tbody>
				{#each posts as post}
					<tr>
						<td>{post.id}</td>
						<td
							>{#if post.author != null}
								<a class="anchor" href={`/admin/users/${post.author.id}`}>{post.author.username}</a>
							{:else}
								<span class="italic">Deleted User</span>
							{/if}</td
						>
						<td>{post.title}</td>
						<td><div class="post-content">{@html marked(post.body)}</div></td>
						<td>{post.createdAt.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td
						>
						<td
							><button on:click={() => deletePost(post.id)} class="btn"
								><i class="fa-solid fa-trash"></i></button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
