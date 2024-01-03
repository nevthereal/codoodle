<script lang="ts">
	import Post from '$lib/components/Post.svelte';

	export let data;
	let posts = data.posts;
</script>

<div>
	<a href="/create"
		><i class="fa-solid fa-plus-circle text-6xl text-secondary-500 fixed bottom-4 right-4"></i></a
	>
</div>

<h1 class="h1">Latest posts:</h1>
<div class="flex flex-col gap-4">
	{#each posts as post}
		<Post {post} />
	{/each}
</div>
