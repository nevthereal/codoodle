<script lang="ts">
	export let data;

	const users = data.users;
	const session = data.session;

	const deleteUser = async (userId: string) => {
		if (window.confirm('Do you want to delete this user?')) {
			await fetch(`/admin/users/delete?id=${userId}`, {
				method: 'POST'
			});
		}
	};
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>User Id</th>
				<th>Username</th>
				<th>Email</th>
				<th>Number of posts</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td><a class="anchor" href={`/admin/users/${user.id}`}>{user.id}</a></td>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.posts.length}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
