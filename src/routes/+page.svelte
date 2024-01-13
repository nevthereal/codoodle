<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	const posts = data.posts;
	const session = data.session;
	let userId: string | null;
	if (data.session) {
		userId = session.user.userId;
	}
</script>

<h1 class="h1 mb-8">Latest posts:</h1>
<div class="flex flex-col gap-4">
	{#each posts as post}
		<Post {post} currentUserId={userId} />
	{/each}
</div>
