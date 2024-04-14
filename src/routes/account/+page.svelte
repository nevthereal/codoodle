<script lang="ts">
	import { cn } from '$lib/utils';
	import dayjs from 'dayjs';
	import fromNow from 'dayjs/plugin/relativeTime.js';

	dayjs.extend(fromNow);

	export let data;
	export const user = data.user;
</script>

<h1 class="h1 mb-4">Overview:</h1>
<ul class="text-lg">
	{#if user}
		<li><span class="font-semibold">Username:</span> {user.username}</li>
		<li>
			<span
				class={cn(
					data.postCount >= 5 && 'text-gray-500',
					data.postCount >= 10 && 'text-amber-500',
					'font-semibold'
				)}>Post Count:</span
			>
			{data.postCount}
		</li>
		<li>
			<span class="font-semibold">Joined:</span>
			{dayjs(user.joined).fromNow()}
		</li>
		{#if user.admin}
			<li><a href="/admin" class="anchor">Admin Dashboard</a></li>
		{/if}
	{/if}
</ul>
