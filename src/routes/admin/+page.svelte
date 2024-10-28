<script lang="ts">
	let { data } = $props();

	const user = data.user;
</script>

<p>
	Welcome to the admin dashboard, <span class="font-semibold">{user.username}</span>
</p>
