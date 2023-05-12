<script lang="ts">
	import { page } from '$app/stores';
	import { drawerStore } from '@skeletonlabs/skeleton';
	$: isActive = $page.url.pathname === $$props.href;
	export let href: any;
</script>

<a
	class="hover:scale-105"
	class:underline={isActive}
	class:underline-offset-8={isActive}
	class:text-secondary-900={isActive}
	on:click={drawerStore.close}
	{href}
	><span><slot /></span>
</a>
