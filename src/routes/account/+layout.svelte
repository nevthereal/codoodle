<script lang="ts">
	import { Modal, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<svelte:head>
	<title>Your Account</title>
</svelte:head>

<Modal />

<div class="flex md:flex-row flex-col-reverse">
	<nav
		class="rounded-container-token md:bg-surface-500 p-6 font-semibold border-t-surface-500 border-t"
	>
		<ul class="flex flex-col gap-2">
			<li class="flex gap-2 items-center">
				<i class="fa-solid fa-user md:hidden"></i><a
					class="md:btn text-xl md:text-base"
					href="/account">Overview</a
				>
			</li>
			<li class="flex gap-2 items-center">
				<i class="fa-solid fa-file md:hidden"></i><a
					class="md:btn text-xl md:text-base"
					href="/account/posts">Posts</a
				>
			</li>
			<li class="flex gap-2 items-center">
				<i class="fa-solid fa-pencil md:hidden"></i><a
					class="md:btn text-xl md:text-base"
					href="/account/edit">Edit</a
				>
			</li>
			<li class="flex gap-2 items-center">
				<i class="fa-solid fa-door-open text-error-500 md:hidden"></i><a
					href="/api/signout"
					class="md:btn text-xl md:text-base md:variant-ghost-error text-error-500 md:text-white"
					>Sign out</a
				>
			</li>
		</ul>
	</nav>
	<main class="p-6">
		<slot />
	</main>
</div>
