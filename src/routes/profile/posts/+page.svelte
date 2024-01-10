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

<h1 class="h1">Posts</h1>
{#each posts as post}
	<Post {post} currentUserId={userId} />
{/each}
