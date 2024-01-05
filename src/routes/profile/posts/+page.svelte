<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	const posts = data.posts;
</script>

<h1 class="h1">Posts</h1>
{#each posts as post}
	<Post {post} deletePerm={true} />
{/each}
