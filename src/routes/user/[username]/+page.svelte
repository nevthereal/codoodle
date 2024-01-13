<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.user;
</script>

<div class="flex flex-col gap-2 my-4">
	<h1 class="h1">{user.username}</h1>
	<h4 class="h4">
		Number of posts: <span
			class={`${
				user.posts.length < 5 ? 'text-grey-500' : user.posts.length < 10 ? 'text-amber-500' : ''
			} `}>{user.posts.length}</span
		>
	</h4>
</div>
<div class="flex flex-col gap-4">
	{#each user.posts as post}
		<Post {post} currentUserId={user.id} />
	{/each}
</div>
