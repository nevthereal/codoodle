<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	const modalStore = getModalStore();

	const dM: ModalSettings = {
		type: 'confirm',
		title: 'Confirm account deletion',
		body: 'Do you really want to delete your account?',
		response: (r) => {
			if (r) deleteAcc();
		},
		buttonTextConfirm: 'Delete'
	};
	const deleteAcc = () => {
		fetch('/api/delete-account', {
			method: 'DELETE'
		}).then(() => {
			goto('/');
		});
	};

	export let data: PageData;
	const { form, enhance, errors, delayed } = superForm(data.form, {
		resetForm: true,
		delayMs: 0
	});
</script>

<h1 class="h1 mb-8">Edit your profile</h1>
<div class="flex flex-col gap-8">
	<form use:enhance method="POST" class="flex flex-col gap-2 justify-start">
		<div>
			<label for="username">Update username:</label>
			<input type="text" class="input w-min" name="username" bind:value={$form.username} />
			{#if $errors.username}
				<span class="text-error-500">{$errors.username}</span>
			{/if}
		</div>
		<button class="btn variant-ghost-primary mr-auto"
			>{#if !$delayed}
				Update
			{:else}
				Loading ...
			{/if}</button
		>
	</form>
	<button disabled class="btn variant-ghost-error w-min" on:click={() => modalStore.trigger(dM)}>
		Delete your account (currently not available)
	</button>
</div>
