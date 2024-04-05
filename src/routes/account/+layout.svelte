<svelte:head>
	<title>Your Account</title>
</svelte:head>

<div class="flex md:flex-row flex-col">
	<nav
		class="md:rounded-container-token md:bg-surface-500 p-6 font-semibold border-b-surface-500 border-b-2 h-min"
	>
		<ul class="flex flex-col gap-2">
			<li>
				<a class="md:btn text-xl md:text-base flex gap-2 items-center" href="/account"
					><i class="fa-solid fa-user md:hidden"></i>Overview</a
				>
			</li>
			<li>
				<a class="md:btn text-xl md:text-base flex gap-2 items-center" href="/account/posts">
					<i class="fa-solid fa-file md:hidden"></i>Posts</a
				>
			</li>
			<li>
				<a class="md:btn text-xl md:text-base flex gap-2 items-center" href="/account/edit"
					><i class="fa-solid fa-pencil md:hidden"></i>Edit</a
				>
			</li>
			<li>
				<a
					href="/api/signout"
					class="md:btn text-xl md:text-base md:variant-ghost-error text-error-500 md:text-white flex gap-2 items-center"
					><i class="fa-solid fa-door-open text-error-500 md:hidden"></i>Sign out</a
				>
			</li>
		</ul>
	</nav>
	<main class="p-6">
		<slot />
	</main>
</div>
