<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import { cn } from '$lib/utils';
	import fromNow from 'dayjs/plugin/relativeTime.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	dayjs.extend(fromNow);

	const user = data.user;
	let userId: string | null = $state();
	if (data.session) userId = data.session.userId;
</script>

<svelte:head>
	<title>{user.username} on Codoodle</title>
</svelte:head>

<div class="flex flex-col gap-2 my-4">
	<h1 class="h1">Overview of <span class="text-primary-500">{user.username}</span></h1>
	<h4 class="h4">
		Number of posts: <span
			class={cn(
				user.posts.length >= 5 && 'text-gray-500',
				user.posts.length >= 10 && 'text-amber-500'
			)}>{user.posts.length}</span
		>
	</h4>
	<h4 class="h4">
		Joined: <span>{dayjs(user.joined).fromNow()}</span>
	</h4>
</div>
<div class="flex flex-col gap-4">
	{#each user.posts as post}
		<Post profileLink={false} {post} currentUserId={userId} />
	{/each}
</div>
