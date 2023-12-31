<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header"></svelte:fragment>
	<svelte:fragment slot="sidebarLeft"></svelte:fragment>
	<slot />
</AppShell>
