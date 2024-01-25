<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const sessions = data.sessions;
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<tr>
				<th>Id</th>
				<th>User</th>
				<th>Invalidate</th>
			</tr>
		</thead>
		<tbody>
			{#each sessions as session}
				<tr>
					<td>{session.id}</td>
					<td
						><a class="anchor" href={`/admin/users/${session.userId}`}>{session.user.username}</a
						></td
					>
					<td class="font-bold">Invalidate</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
