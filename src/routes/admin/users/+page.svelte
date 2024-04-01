<script lang="ts">
	export let data;

	const users = data.users;
	const user = data.user;

	const deleteUser = async (userId: string) => {
		if (window.confirm('Do you want to delete this user?')) {
			await fetch(`/admin/users/delete?id=${userId}`, {
				method: 'POST'
			});
			location.reload();
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
						>{#if user.id != user.id}
							<button on:click={() => deleteUser(user.id)} class="btn"
								><i class="fa-solid fa-trash"></i></button
							>
						{:else}
							<span class="italic">not allowed</span>
						{/if}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
