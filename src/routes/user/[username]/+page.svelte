<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.user;
	let userId: string | null;
	if (data.session) userId = data.session.user.userId;
</script>

<svelte:head>
	<title>{user.username} on Codoodle</title>
</svelte:head>

<div class="flex flex-col gap-2 my-4">
	<h1 class="h1">Overview of <span class="text-primary-500">{user.username}</span></h1>
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
		<Post profileLink={false} {post} currentUserId={userId} />
	{/each}
</div>
