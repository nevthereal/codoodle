<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	const user = data.user;
	const posts = data.posts;
	let userId: string | null;
	if (data.user) {
		userId = user.id;
	}
</script>

<h1 class="h1 mb-8">Your Posts</h1>
<div class="flex flex-col gap-4">
	{#if posts != undefined}
		{#each posts as post}
			<Post {post} currentUserId={userId} />
		{/each}
	{:else}
		<p>You have no posts</p>
	{/if}
</div>
