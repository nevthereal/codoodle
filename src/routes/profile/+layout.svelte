<script>
	import ProfileNav from '$lib/components/ProfileNav.svelte';
	import { AppShell, Modal, initializeStores } from '@skeletonlabs/skeleton';
	let signedIn = true;
	initializeStores();
</script>

<Modal />
{#if signedIn}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
			<ProfileNav />
		</svelte:fragment>
		<main class="p-8">
			<slot />
		</main>
	</AppShell>
{:else}
	<div class="text-center text-lg font-semibold">
		<p>
			Please <a href="/profile/signin" class="anchor">sign in</a> or
			<a href="/profile/signup" class="anchor">create an account</a> to continue
		</p>
	</div>
{/if}
