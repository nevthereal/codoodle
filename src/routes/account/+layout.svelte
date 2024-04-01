<script>
	import { AppShell, Modal, initializeStores } from '@skeletonlabs/skeleton';
	let signedIn = true;
	initializeStores();
</script>

<svelte:head>
	<title>Your Account</title>
</svelte:head>

<Modal />
{#if signedIn}
	<AppShell>
		<svelte:fragment slot="sidebarLeft">
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
		</svelte:fragment>
		<main class="p-8">
			<slot />
		</main>
	</AppShell>
{:else}
	<div class="text-center text-lg font-semibold">
		<p>
			Please <a href="/account/signin" class="anchor">sign in</a> or
			<a href="/account/signup" class="anchor">create an account</a> to continue
		</p>
	</div>
{/if}
