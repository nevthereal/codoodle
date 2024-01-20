<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col text-center gap-4">
	<h1 class="h1">Something went wrong ...</h1>
	<p class="">{$page.status} - {$page.error?.message}</p>
	<a href="/" class="btn variant-ghost-primary mx-auto">Go to Home</a>
</div>
