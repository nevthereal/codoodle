<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="rounded-container-token bg-surface-500 p-6 flex flex-col gap-2 h-full">
	<ul>
		<li>
			<a class="btn" href="/profile">Overview</a>
		</li>
		<li>
			<a class="btn" href="/profile/posts">Posts</a>
		</li>
		<li>
			<a class="btn" href="/profile/edit">Edit</a>
		</li>
		<li>
			<a href="/signout" class="btn variant-ghost-primary">Sign out</a>
		</li>
	</ul>
</nav>
