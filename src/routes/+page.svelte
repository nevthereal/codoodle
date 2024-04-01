<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	const posts = data.posts;
	let userId: string | null;
	let username: string | null;
	if (data.user) {
		userId: data.user.id;
		username: data.user.username;
	}
</script>

{#if username}
	<h3 class="h3">Hello <span class="text-primary-500">{username}</span></h3>
{/if}
<h1 class="h1 mb-8">Latest posts:</h1>
<div class="flex flex-col gap-4">
	{#each posts as post}
		<Post {post} currentUserId={userId} />
	{/each}
</div>
