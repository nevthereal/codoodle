<script lang="ts">
	export let form;
</script>

<div class="m-16">
	<h1 class="h1 mb-4">Sign Up</h1>
	<form method="POST" class="flex flex-col gap-4 text-black">
		<input class="rounded-2xl" id="email" name="email" type="email" placeholder="Email" />
		<input class="rounded-2xl" id="username" name="username" type="text" placeholder="Username" />
		<input
			class="rounded-2xl"
			id="password"
			name="password"
			type="password"
			placeholder="Password"
		/>
		<input
			class="rounded-2xl"
			id="confirmPassword"
			name="confirmPassword"
			type="password"
			placeholder="Confirm Password"
		/>
		<button
			type="submit"
			class="bg-primary-500 mx-auto p-2 rounded-2xl text-xl font-semibold text-white"
			>Sign Up</button
		>
		<div>
			{#if form?.errors}
				{#each form?.errors as err}
					<p class="text-red-500">{err.message}</p>
				{/each}
			{/if}
		</div>
	</form>

	<p>or</p>
	<a href="/signin" class="anchor">Sign In</a>
</div>
