<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	initializeStores();
</script>

<Modal />

<div>
	<a href="/create"
		><i class="fa-solid fa-plus-circle text-6xl text-primary-500 fixed bottom-4 right-4"></i></a
	>
</div>

<svelte:head>
	<title>Codoodle</title>
	<meta name="description" content="A SvelteKit social texting app" />
</svelte:head>

<AppShell>
	{#snippet header()}
	
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
		
	{/snippet}
	<main class="p-8">
		{@render children?.()}
	</main>
	{#snippet footer()}
	
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
								href="https://github.com/nevthereal/codoodle"
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
		
	{/snippet}
</AppShell>
