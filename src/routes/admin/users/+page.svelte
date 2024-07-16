<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data;

	const users = data.users;
	const currentUser = data.user;

	const modalStore = getModalStore();

	const deleteUser = async (userId: string) => {
		const dM: ModalSettings = {
			type: 'confirm',
			title: 'Confirm post deletion',
			body: 'Do you really want to delete this post?',
			response: (r) => {
				if (r) {
					fetch(`/api/delete/user?id=${userId}`, {
						method: 'DELETE'
					}).then(async () => await invalidateAll());
				}
			},
			buttonTextConfirm: 'Delete'
		};

		modalStore.trigger(dM);
	};
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<tr>
				<th>User Id</th>
				<th>Username</th>
				<th>Delete User</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td><a class="anchor" href={`/admin/users/${user.id}`}>{user.id}</a></td>
					<td>{user.username}</td>
					<td
						>{#if currentUser.id != user.id}
							<button on:click={() => deleteUser(user.id)} class="btn"
								><i class="fa-solid fa-trash"></i></button
							>
						{/if}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
