<script lang="ts">
	export let data;

	const session = data.session;
</script>

<p>
	Welcome to the admin dashboard, <span class="font-semibold">{session.user.username}</span>
</p>
