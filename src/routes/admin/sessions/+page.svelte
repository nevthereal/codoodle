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
				<th>State</th>
				<th>Expires at</th>
				<th>Invalidate</th>
			</tr>
		</thead>
		<tbody>
			{#each sessions as session}
				<tr>
					<td>{session.sessionId}</td>
					<td
						><a class="anchor" href={`/admin/users/${session.user.userId}`}
							>{session.user.username}</a
						></td
					>
					<td
						><span class={`${session.state === 'idle' ? 'text-error-500' : 'text-success-500'}`}
							>{session.state}</span
						></td
					>
					<td
						>{session.idlePeriodExpiresAt.toLocaleString([], {
							dateStyle: 'medium',
							timeStyle: 'short'
						})}</td
					>
					<td class="font-bold">Invalidate</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
