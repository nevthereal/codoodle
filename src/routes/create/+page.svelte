<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;

	const { form, enhance, errors, delayed } = superForm(data.form, {
		resetForm: false,
		delayMs: 0
	});
</script>

<div class="xl:w-1/2 xl:mx-auto">
	<h1 class="h1 mb-4">Create a post</h1>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		<input name="title" type="text" placeholder="Title" bind:value={$form.title} />
		{#if $errors.title}
			<span class="text-error-500 font-semibold">{$errors.title}</span>
		{/if}
		<textarea name="body" placeholder="Content" class="resize-none h-48" bind:value={$form.body} />
		{#if $errors.body}
			<span class="text-error-500 font-semibold">{$errors.body}</span>
		{/if}
		<button class="mx-auto btn variant-ghost-primary"
			>{#if !$delayed}
				Post
			{:else}
				Loading ...
			{/if}</button
		>
	</form>
</div>
