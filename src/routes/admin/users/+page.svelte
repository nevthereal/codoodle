<script lang="ts">
	export let data;

	const users = data.users;
	const currentUser = data.user;

	const deleteUser = async (userId: string) => {
		if (window.confirm('Do you want to delete this user?')) {
			await fetch(`/api/delete/user?id=${userId}`, {
				method: 'DELETE'
			});
		}
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
