<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="rounded-container-token bg-surface-500 p-6 flex flex-col gap-2 font-semibold">
	<ul class="flex flex-col gap-2">
		<li>
			<a class="btn" href="/account">Overview</a>
		</li>
		<li>
			<a class="btn" href="/account/posts">Posts</a>
		</li>
		<li>
			<a class="btn" href="/account/edit">Edit</a>
		</li>
		<li>
			<a href="/api/signout" class="btn variant-ghost-error">Sign out</a>
		</li>
	</ul>
</nav>
