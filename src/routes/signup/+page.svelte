<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, enhance, errors, delayed } = superForm(data.form, {
		applyAction: true,
		invalidateAll: true,
		delayMs: 0,
		resetForm: false
	});
</script>

<div class="max-w-[80%] md:max-w-[50%] mx-auto">
	<h1 class="h1 mb-4">Sign Up</h1>
	<form use:enhance method="POST" class="flex flex-col gap-4">
		<input id="email" name="email" type="text" placeholder="Email" bind:value={$form.email} />
		{#if $errors.email}
			<span class="text-error-500 font-semibold">{$errors.email}</span>
		{/if}
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
		<input
			id="confirmPassword"
			name="confirmPassword"
			type="password"
			placeholder="Confirm Password"
			bind:value={$form.confirmPassword}
		/>
		{#if $errors.confirmPassword}
			<span class="text-error-500 font-semibold">{$errors.confirmPassword}</span>
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
	<a href="/signin" class="anchor">Sign In</a>
</div>
