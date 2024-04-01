<script lang="ts">
	export let data;

	const user = data.user;
</script>

<p>
	Welcome to the admin dashboard, <span class="font-semibold">{user.username}</span>
</p>
