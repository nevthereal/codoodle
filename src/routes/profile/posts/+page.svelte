<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	const session = data.session;
	const posts = data.posts;
	let userId: string | null;
	if (data.session) {
		userId = session.user.userId;
	}
</script>

<h1 class="h1 mb-8">Posts</h1>
<div class="flex flex-col gap-4">
	{#if posts.length != 0}
		{#each posts as post}
			<Post {post} currentUserId={userId} />
		{/each}
	{:else}
		<p>You have no posts</p>
	{/if}
</div>
