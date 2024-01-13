<script lang="ts">
	import { goto } from '$app/navigation';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

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
		fetch('/profile/edit', {
			method: 'DELETE'
		}).then(() => {
			goto('/');
		});
	};
</script>

<h1 class="h1 mb-8">Edit your profile</h1>
<button class="btn variant-ghost-error" on:click={() => modalStore.trigger(dM)}>
	Delete your account
</button>
