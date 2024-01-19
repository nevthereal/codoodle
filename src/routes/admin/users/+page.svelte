<script lang="ts">
	export let data;

	let users = data.users;
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>User Id</th>
				<th>Username</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td><a href={`/admin/users/${user.id}`}>{user.id}</a></td>
					<td>{user.username}</td>
					<td>{user.email}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
