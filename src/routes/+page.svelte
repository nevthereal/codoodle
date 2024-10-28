<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let userId: string | null = $state();
	let username: string | null = $state();
	if (data.user) {
		userId = data.user.id;
		username = data.user.username;
	}
</script>

{#if username}
	<h3 class="h3">Hello <span class="text-primary-500">{username}</span></h3>
{/if}

<h1 class="h1 mb-8">Latest posts:</h1>

{#await data.posts}
	<p class="italic font-mono">Loading posts ...</p>
{:then posts}
	<div class="flex flex-col gap-4">
		{#each posts as post}
			<Post {post} currentUserId={userId} />
		{/each}
	</div>
{/await}
