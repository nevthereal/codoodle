<svelte:head>
	<title>Codoodle - Admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="font-mono">
	<nav class="flex gap-2 md:justify-center overflow-x-scroll hide-scrollbar">
		<a class="btn text-xl font-bold" href="/admin">Dashboard</a>
		<a class="btn text-xl font-bold" href="/admin/users">Users</a>
		<a class="btn text-xl font-bold" href="/admin/posts">Posts</a>
		<a class="btn text-xl font-bold" href="/admin/sessions">Sessions</a>
	</nav>
	<main class="py-8">
		<slot />
	</main>
</div>
