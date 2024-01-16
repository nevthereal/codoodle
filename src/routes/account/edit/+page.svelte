<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

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
	const { form, enhance, errors } = superForm(data.form, {
		resetForm: true
	});
</script>

<h1 class="h1 mb-8">Edit your profile</h1>
<form use:enhance method="POST" class="my-16 flex flex-col gap-2 justify-start">
	<div>
		<label for="username">Update username:</label>
		<input type="text" name="username" />
		{#if $errors.username}
			<span class="text-error-500">{$errors.username}</span>
		{/if}
	</div>
	<button class="btn variant-ghost-primary mr-auto">Update</button>
</form>
<button class="btn variant-ghost-error" on:click={() => modalStore.trigger(dM)}>
	Delete your account
</button>
