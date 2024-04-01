<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<div>
	<a href="/create"
		><i class="fa-solid fa-plus-circle text-6xl text-secondary-500 fixed bottom-4 right-4"></i></a
	>
</div>

<svelte:head>
	<title>Codoodle</title>
	<meta name="description" content="A SvelteKit blog" />
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<nav
			class="p-6 flex justify-between items-center bg-surface-500 rounded-bl-container-token rounded-br-container-token"
		>
			<a href="/" class="btn">
				<h1 class="h1">codoodle</h1>
			</a>
			<a href="/account" class="btn">
				<i class="fa-solid fa-user text-2xl"></i>
			</a>
		</nav>
	</svelte:fragment>
	<main class="p-8">
		<slot />
	</main>
	<svelte:fragment slot="footer">
		<footer
			class="p-6 font-bold border-t-2 border-primary-500 rounded-tl-container-token rounded-tr-container-token"
		>
			<div class="md:mx-32 md:grid md:grid-cols-2 text-center gap-4">
				<div class="m-auto hidden md:block">
					<h2 class="h2">codoodle.</h2>
					<p>pure innovation.</p>
				</div>
				<div class="my-2 md:my-auto">
					<p>
						See this project on <a
							href="https://github.com/nevthereal/blog-svelte"
							class="anchor"
							target="_blank">GitHub</a
						>
					</p>
				</div>
			</div>
			<p class="text-center">
				© 2024 <a href="https://github.com/nevthereal" target="_blank">Neville Brem</a>
			</p>
		</footer>
	</svelte:fragment>
</AppShell>
