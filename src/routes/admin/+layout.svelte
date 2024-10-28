<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<svelte:head>
	<title>Codoodle - Admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="font-mono">
	<nav class="flex gap-2 md:justify-center overflow-x-scroll hide-scrollbar">
		<a class="btn text-xl font-bold" href="/admin">Dashboard</a>
		<a class="btn text-xl font-bold" href="/admin/users">Users</a>
		<a class="btn text-xl font-bold" href="/admin/posts">Posts</a>
	</nav>
	<main class="py-8">
		{@render children?.()}
	</main>
</div>
