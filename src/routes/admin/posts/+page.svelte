<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { marked } from 'marked';

	let { data } = $props();

	const posts = data.posts;

	const modalStore = getModalStore();

	const deletePost = async (postId: number) => {
		const dM: ModalSettings = {
			type: 'confirm',
			title: 'Confirm post deletion',
			body: 'Do you really want to delete this post?',
			response: (r) => {
				if (r) {
					fetch(`/api/delete/post?postId=${postId}`, { method: 'DELETE' }).then(async () => {
						await invalidateAll();
					});
				}
			},
			buttonTextConfirm: 'Delete'
		};

		modalStore.trigger(dM);
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
							><button onclick={() => deletePost(post.id)} class="btn"
								><i class="fa-solid fa-trash"></i></button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
