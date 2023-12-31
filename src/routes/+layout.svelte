<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<header class="p-6 flex justify-between items-center bg-primary-500 rounded-b-3xl">
			<a href="/" class="btn">
				<h1 class="h1">codoodle</h1>
			</a>
			<a href="/profile" class="btn">
				<i class="fa-solid fa-user text-2xl"></i>
			</a>
		</header>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<footer class="p-6 font-bold border-t-2 border-primary-500 rounded-t-3xl">
			<div class="mx-32 grid grid-cols-2">
				<div class="m-auto">
					<h2 class="h2">codoodle.</h2>
					<p>pure innovation.</p>
				</div>
				<div class="m-auto">
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
