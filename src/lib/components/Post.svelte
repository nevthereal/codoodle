<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { marked } from 'marked';
	import fromNow from 'dayjs/plugin/relativeTime.js';
	import dayjs from 'dayjs';
	import { invalidateAll } from '$app/navigation';

	dayjs.extend(fromNow);

	interface Post {
		id: number;
		authorId: string;
		title: string;
		body: string;
		createdAt: Date;
		author: {
			id: string;
			username: string;
			admin: boolean | null;
		};
	}


	interface Props {
		post: Post;
		profileLink?: boolean;
		currentUserId: string | null;
	}

	let { post, profileLink = true, currentUserId }: Props = $props();

	const modalStore = getModalStore();

	const dM: ModalSettings = {
		type: 'confirm',
		title: 'Confirm post deletion',
		body: 'Do you really want to delete this post?',
		response: (r) => {
			if (r) deletePost(post.id);
		},
		buttonTextConfirm: 'Delete'
	};

	const deletePost = async (postId: number) => {
		await fetch(`/api/delete/post?postId=${postId}`, { method: 'DELETE' }).then(async () => {
			await invalidateAll();
		});
	};
</script>

<div class="card p-6 flex justify-between items-center">
	<div>
		<p class="text-surface-300">
			{dayjs(post.createdAt).fromNow()}
		</p>
		<h3 class="h3">{post.title}</h3>
		<p class="text-surface-300">
			{#if profileLink}
				by {#if post.author != null}
					<a class="font-semibold" href={`user/${post.author.username}`}>{post.author.username}</a
					>{post.author.admin ? ' (admin)' : ''}
				{:else}
					<span class="italic">Deleted User</span>
				{/if}
			{/if}
		</p>
		<p class="post-content">
			{@html marked(post.body)}
		</p>
	</div>
	{#if currentUserId === post.authorId}
		<button onclick={() => modalStore.trigger(dM)} class="btn"
			><i class="fa-solid fa-trash text-2xl"></i></button
		>
	{/if}
</div>
