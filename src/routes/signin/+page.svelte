<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, enhance, errors, delayed } = superForm(data.form, {
		applyAction: true,
		invalidateAll: true,
		delayMs: 0,
		resetForm: true
	});
</script>

<div class="max-w-[80%] md:max-w-[50%] mx-auto">
	<h1 class="h1 mb-4">Sign In</h1>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		<input
			id="username"
			name="username"
			type="text"
			placeholder="Username"
			bind:value={$form.username}
		/>
		{#if $errors.username}
			<span class="text-error-500 font-semibold">{$errors.username}</span>
		{/if}
		<input
			id="password"
			name="password"
			type="password"
			placeholder="Password"
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<span class="text-error-500 font-semibold">{$errors.password}</span>
		{/if}
		<button
			type="submit"
			class="variant-ghost-primary mx-auto btn rounded-token text-xl font-semibold text-white"
			>{#if !$delayed}
				Sign in
			{:else}
				Loading ...
			{/if}</button
		>
	</form>

	<p>or</p>
	<a href="/signup" class="anchor">Create an account</a>
</div>
