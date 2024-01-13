<script lang="ts">
	export let data;
	export const user = data.session.user;
	const postCount = data.postCount[0].posts.length;
</script>

<h1 class="h1 mb-4">Overview:</h1>
<ul class="text-lg">
	{#if user}
		<li><span class="font-semibold">Username:</span> {user.username}</li>
		<li><span class="font-semibold">Email Adress:</span> {user.email}</li>
		<li><span class="font-semibold">Post Count:</span> {postCount}</li>
	{/if}
</ul>
